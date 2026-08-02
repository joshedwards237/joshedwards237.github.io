/**
 * Shared loader for Lab Notes / Skills Timeline entries.
 *
 * Every JSON file in src/content/updates/ is eagerly imported at build time.
 * The glob pattern is absolute-from-project-root ('/src/...') because
 * import.meta.glob resolves relative patterns against the importing file —
 * an absolute pattern keeps this module safe to import from anywhere.
 */

export const UPDATE_TYPES = ["shipped", "research", "changelog"] as const;
export type UpdateType = (typeof UPDATE_TYPES)[number];

export interface TimelineEntry {
  /** ISO date, YYYY-MM-DD */
  date: string;
  type: UpdateType;
  title: string;
  summary: string;
  link?: string;
  linkLabel?: string;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isTimelineEntry(value: unknown): value is TimelineEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.date === "string" &&
    DATE_PATTERN.test(entry.date) &&
    typeof entry.type === "string" &&
    (UPDATE_TYPES as readonly string[]).includes(entry.type) &&
    typeof entry.title === "string" &&
    entry.title.length > 0 &&
    typeof entry.summary === "string" &&
    entry.summary.length > 0 &&
    (entry.link === undefined || typeof entry.link === "string") &&
    (entry.linkLabel === undefined || typeof entry.linkLabel === "string")
  );
}

// Eagerly import every JSON entry. Each module's default export is the parsed
// JSON object. Entries that fail the runtime guard are skipped (the prebuild
// validator should catch them first).
const modules = import.meta.glob("/src/content/updates/*.json", {
  eager: true,
}) as Record<string, { default: unknown }>;

const entries: TimelineEntry[] = Object.values(modules)
  .map((mod) => mod.default)
  .filter(isTimelineEntry)
  .sort((a, b) => b.date.localeCompare(a.date));

/** All entries, sorted newest-first. */
export function getUpdates(): TimelineEntry[] {
  return entries;
}

/** Stable unique key for an entry (date + title). */
export function entryKey(entry: TimelineEntry): string {
  return `${entry.date}-${entry.title}`;
}

/** Badge (pill) classes per entry type — palette-driven (Mono / Slate). */
export const badgeStyles: Record<UpdateType, string> = {
  shipped: "border border-edge bg-surface text-brand",
  research: "border border-edge bg-surface text-ink",
  changelog: "border border-edge bg-surface text-subtle",
};

/** Spine-dot classes per entry type (Skills Timeline page). */
export const dotStyles: Record<UpdateType, string> = {
  shipped: "bg-brand",
  research: "bg-ink",
  changelog: "bg-subtle",
};

/** Parse a YYYY-MM-DD string as a local date (avoids UTC off-by-one). */
export function parseEntryDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(isoDate: string): string {
  return parseEntryDate(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
