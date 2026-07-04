import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import {
  badgeStyles,
  dotStyles,
  entryKey,
  formatDate,
  getUpdates,
  parseEntryDate,
  type TimelineEntry,
} from "@/lib/updates";

/** Horizontal scale: pixels per (average) month of calendar time. */
const PX_PER_MONTH = 340;
const MS_PER_MONTH = 30.44 * 24 * 60 * 60 * 1000;
/** Minimum horizontal gap between adjacent cards so they never overlap. */
const MIN_GAP = 300;
/** Keyboard pan step (~one card width). */
const KEY_STEP = 320;

interface PositionedEntry {
  entry: TimelineEntry;
  key: string;
  x: number;
  above: boolean;
}

interface MonthTick {
  x: number;
  monthLabel: string;
  yearLabel: string | null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Lay out entries oldest-to-newest with a monotonic minimum gap. */
function useTimelineLayout() {
  return useMemo(() => {
    const oldestFirst = [...getUpdates()].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    const times = oldestFirst.map((e) => parseEntryDate(e.date).getTime());
    const minTime = Math.min(...times) - MS_PER_MONTH; // pad 1 month at the start
    const pxPerMs = PX_PER_MONTH / MS_PER_MONTH;

    let prevX = -Infinity;
    const items: PositionedEntry[] = oldestFirst.map((entry, i) => {
      let x = (times[i] - minTime) * pxPerMs;
      // De-overlap: same-day / near-by entries get nudged right, and the
      // nudge cascades so gaps stay monotonic.
      if (x < prevX + MIN_GAP) x = prevX + MIN_GAP;
      prevX = x;
      return { entry, key: entryKey(entry), x, above: i % 2 === 0 };
    });

    const contentWidth = prevX + PX_PER_MONTH;

    // De-overlap nudges cards away from their true-time positions, so ticks
    // must be mapped through the same warped space or the month labels drift
    // relative to the cards. Build a piecewise-linear time->x mapping from
    // the entry anchor points and interpolate ticks through it.
    const anchors: Array<{ t: number; x: number }> = [{ t: minTime, x: 0 }];
    items.forEach((item, i) => {
      const t = times[i];
      const last = anchors[anchors.length - 1];
      if (t > last.t) anchors.push({ t, x: item.x });
      else last.x = item.x; // same-day entries: keep the rightmost anchor
    });
    const lastAnchor = anchors[anchors.length - 1];
    const warp = (t: number): number => {
      if (t <= minTime) return 0;
      if (t >= lastAnchor.t) return lastAnchor.x + (t - lastAnchor.t) * pxPerMs;
      for (let i = 1; i < anchors.length; i++) {
        if (t <= anchors[i].t) {
          const a = anchors[i - 1];
          const b = anchors[i];
          return a.x + ((t - a.t) / (b.t - a.t)) * (b.x - a.x);
        }
      }
      return lastAnchor.x;
    };

    const ticks: MonthTick[] = [];
    const cursor = new Date(minTime);
    cursor.setDate(1);
    cursor.setHours(0, 0, 0, 0);
    if (cursor.getTime() < minTime) cursor.setMonth(cursor.getMonth() + 1);
    let firstTick = true;
    while (true) {
      const x = warp(cursor.getTime());
      if (x > contentWidth) break;
      const showYear = firstTick || cursor.getMonth() === 0;
      ticks.push({
        x,
        monthLabel: cursor.toLocaleDateString("en-US", { month: "short" }),
        yearLabel: showYear ? String(cursor.getFullYear()) : null,
      });
      firstTick = false;
      cursor.setMonth(cursor.getMonth() + 1);
    }

    return { items, contentWidth, ticks };
  }, []);
}

export default function TimelinePage() {
  const { items, contentWidth, ticks } = useTimelineLayout();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const x = useMotionValue(0);
  const initializedRef = useRef(false);
  // Suppress the click that fires right after a drag ends.
  const draggingRef = useRef(false);

  const selected = selectedKey
    ? items.find((item) => item.key === selectedKey) ?? null
    : null;

  // Leftmost pan position (0 = oldest entry flush left; negative pans right).
  const minX = Math.min(0, viewportWidth - contentWidth);

  // Document title while on the route; restore on leave.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Skills Timeline — Joshua Edwards";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  // Measure the viewport (and re-measure on resize).
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Start panned to the newest entries (right end), once measured.
  useLayoutEffect(() => {
    if (viewportWidth > 0 && !initializedRef.current) {
      initializedRef.current = true;
      x.set(minX);
    }
  }, [viewportWidth, minX, x]);

  // Keep x inside the constraints if the viewport grows.
  useEffect(() => {
    if (x.get() < minX) x.set(minX);
  }, [minX, x]);

  // Wheel pan: native listener because React's synthetic wheel handlers are
  // passive at the root, so preventDefault (needed to stop page scroll /
  // browser back-swipe) only works on a manually attached listener.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (delta === 0) return;
      event.preventDefault();
      x.stop(); // cancel any in-flight momentum
      x.set(clamp(x.get() - delta, minX, 0));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [minX, x]);

  const panBy = useCallback(
    (offset: number) => {
      animate(x, clamp(x.get() + offset, minX, 0), {
        type: "spring",
        stiffness: 300,
        damping: 35,
      });
    },
    [minX, x]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      panBy(KEY_STEP); // reveal older entries to the left
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      panBy(-KEY_STEP); // reveal newer entries to the right
    }
  };

  const closeDetail = useCallback(() => setSelectedKey(null), []);

  // Escape closes the detail overlay.
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDetail();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeDetail]);

  return (
    <div className="relative min-h-screen h-screen flex flex-col overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-neutral-900 dark:to-purple-950 -z-10" />

      {/* Top bar */}
      <header className="relative z-10 px-6 pt-6 pb-2 flex flex-col items-center gap-2 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
        <a
          href="#lab-notes"
          className="self-start md:self-auto md:justify-self-start inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </a>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Skills Timeline
          </h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Everything I've been building, learning, and shipping — drag to
            explore.
          </p>
        </div>
        <div className="hidden md:block" aria-hidden="true" />
      </header>

      {/* Pannable canvas */}
      <div
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="Skills timeline — use arrow keys, mouse drag, or scroll to pan"
        onKeyDown={handleKeyDown}
        className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.08}
          dragMomentum
          onDragStart={() => {
            draggingRef.current = true;
          }}
          onDragEnd={() => {
            // Let the click event that follows pointerup be ignored first.
            window.setTimeout(() => {
              draggingRef.current = false;
            }, 0);
          }}
          style={{ x, width: contentWidth }}
          className="relative h-full"
        >
          {/* Spine */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300 dark:from-indigo-700 dark:via-purple-500 dark:to-indigo-700" />

          {/* Month/year ticks */}
          {ticks.map((tick) => (
            <div
              key={`tick-${tick.x}`}
              className="absolute top-1/2 -translate-x-1/2 pointer-events-none"
              style={{ left: tick.x }}
            >
              <div className="w-px h-2.5 bg-indigo-300 dark:bg-indigo-600 mx-auto" />
              <div className="mt-1 text-[10px] leading-tight text-center whitespace-nowrap text-muted-foreground">
                {tick.monthLabel}
                {tick.yearLabel && (
                  <span className="ml-1 font-semibold text-indigo-500 dark:text-indigo-400">
                    {tick.yearLabel}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Entries */}
          {items.map((item) => (
            <div key={item.key}>
              {/* Dot on the spine */}
              <div
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-4 ring-white/70 dark:ring-neutral-900/70 ${dotStyles[item.entry.type]}`}
                style={{ left: item.x }}
              />
              {/* Connector from dot to card */}
              <div
                className="absolute w-px bg-gradient-to-b from-indigo-300 to-purple-300 dark:from-indigo-700 dark:to-purple-700"
                style={{
                  left: item.x,
                  height: 36,
                  ...(item.above
                    ? { bottom: "calc(50% + 6px)" }
                    : { top: "calc(50% + 6px)" }),
                }}
              />
              {/* Card */}
              <div
                className="absolute -translate-x-1/2 w-64 md:w-72"
                style={{
                  left: item.x,
                  ...(item.above
                    ? { bottom: "calc(50% + 42px)" }
                    : { top: "calc(50% + 42px)" }),
                }}
              >
                <motion.div
                  layoutId={item.key}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    if (draggingRef.current) return;
                    setSelectedKey(item.key);
                  }}
                  role="button"
                  tabIndex={-1}
                  className="rounded-xl border bg-white/70 dark:bg-white/5 backdrop-blur shadow hover:shadow-lg transition-shadow p-4 flex flex-col gap-2 cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${badgeStyles[item.entry.type]}`}
                    >
                      {item.entry.type}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(item.entry.date)}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug text-gray-900 dark:text-gray-100">
                    {item.entry.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {item.entry.summary}
                  </p>
                  <span className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400">
                    Click to expand
                  </span>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Edge fade affordances */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-indigo-50/90 dark:from-indigo-950/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-purple-50/90 dark:from-purple-950/90 to-transparent" />
      </div>

      {/* Detail overlay */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeDetail}
              className="fixed inset-0 z-40 bg-black/40"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={selected.key}
                className="pointer-events-auto w-full max-w-lg rounded-xl border bg-white/95 dark:bg-neutral-900/95 backdrop-blur shadow-2xl p-6 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${badgeStyles[selected.entry.type]}`}
                    >
                      {selected.entry.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(selected.entry.date)}
                    </span>
                  </div>
                  <button
                    onClick={closeDetail}
                    aria-label="Close details"
                    className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {selected.entry.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.entry.summary}
                </p>
                {selected.entry.link && (
                  <a
                    href={selected.entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 self-start bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {selected.entry.linkLabel ?? "Learn more"}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
