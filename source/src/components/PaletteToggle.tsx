import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Contrast } from "lucide-react";
import Logo from "@/components/Logo";
import {
  applyPalette,
  getStoredPalette,
  setStoredPalette,
  type Palette,
} from "@/lib/palette";

/**
 * Palette control (top-right).
 *  - Collapsed: JE logo circle + the *current* palette's icon.
 *  - Hover (desktop) / tap (touch) springs open to reveal the other option,
 *    pushing the logo aside with a velocity-curve (spring) animation.
 *  - Click an option to switch; leaving (or an outside tap) springs it closed.
 *  - The logo scrolls to top.
 * Spring transitions become instant under prefers-reduced-motion via the app's
 * global MotionConfig reducedMotion="user".
 */
const spring = { type: "spring", stiffness: 440, damping: 30, mass: 0.7 } as const;

const WHEEL =
  "conic-gradient(from 90deg, #ef4444, #f59e0b, #eab308, #22c55e, #14b8a6, #3b82f6, #8b5cf6, #ef4444)";

export default function PaletteToggle({ className = "" }: { className?: string }) {
  const [palette, setPalette] = useState<Palette>("mono");
  const [open, setOpen] = useState(false);
  const canHover = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPalette(getStoredPalette());
    canHover.current = window.matchMedia?.("(hover: hover)").matches ?? true;
  }, []);

  // Touch: close when tapping outside the control.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const choose = (p: Palette) => {
    setPalette(p);
    applyPalette(p);
    setStoredPalette(p);
  };

  const onOption = (p: Palette) => {
    // On touch, the first tap opens; subsequent taps choose + close.
    if (!canHover.current && !open) {
      setOpen(true);
      return;
    }
    choose(p);
    if (!canHover.current) setOpen(false);
  };

  const options: Palette[] = open ? ["mono", "slate"] : [palette];

  const iconFor = (p: Palette) =>
    p === "mono" ? (
      <Contrast className="h-4 w-4" />
    ) : (
      <span
        className="h-[18px] w-[18px] rounded-full"
        style={{ background: WHEEL }}
        aria-hidden="true"
      />
    );

  const stateClass = (p: Palette) =>
    palette === p
      ? p === "mono"
        ? "bg-ink text-on-brand"
        : "ring-2 ring-brand"
      : "text-subtle hover:text-ink";

  return (
    <motion.div
      ref={ref}
      layout
      transition={spring}
      onHoverStart={() => canHover.current && setOpen(true)}
      onHoverEnd={() => canHover.current && setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      className={`flex items-center gap-1 rounded-full border border-edge bg-surface/85 p-1 backdrop-blur ${className}`}
      role="group"
      aria-label="Colour palette"
    >
      <motion.button
        layout
        transition={spring}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
        className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-ink"
      >
        <Logo className="h-full w-full" />
      </motion.button>

      <AnimatePresence mode="popLayout" initial={false}>
        {options.map((p) => (
          <motion.button
            key={p}
            layout
            transition={spring}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            type="button"
            onClick={() => onOption(p)}
            aria-pressed={palette === p}
            aria-label={p === "mono" ? "Mono — monochrome" : "Slate — add colour"}
            title={p === "mono" ? "Mono" : "Slate · add colour"}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${stateClass(p)}`}
          >
            {iconFor(p)}
          </motion.button>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
