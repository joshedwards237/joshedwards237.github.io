import { ArrowUpRight, FlaskConical } from "lucide-react";
import { Card } from "@/components/ui/card";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const UPDATE_TYPES = ["shipped", "research", "changelog"] as const;
type UpdateType = (typeof UPDATE_TYPES)[number];

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

function isTimelineEntry(value: unknown): value is TimelineEntry {
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

const badgeStyles: Record<UpdateType, string> = {
  shipped:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  research:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  changelog:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

// Eagerly import every JSON entry in src/content/updates/. Each module's
// default export is the parsed JSON object. Entries that fail the runtime
// guard are skipped (the prebuild validator should catch them first).
const modules = import.meta.glob("../content/updates/*.json", {
  eager: true,
}) as Record<string, { default: unknown }>;

const entries: TimelineEntry[] = Object.values(modules)
  .map((mod) => mod.default)
  .filter(isTimelineEntry)
  .sort((a, b) => b.date.localeCompare(a.date));

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Timeline() {
  if (entries.length === 0) return null;

  return (
    <section className="py-20 px-8">
      <ScrollAnimationWrapper>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <FlaskConical className="w-8 h-8" />
              Lab Notes
            </h2>
            <p className="mt-2 text-muted-foreground">
              A running log of what I'm building, learning, and shipping.
            </p>
          </div>
          {/* Bento grid: newest entry spans two columns on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {entries.map((entry, index) => (
              <Card
                key={`${entry.date}-${entry.title}`}
                className={`p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5 flex flex-col gap-3 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${badgeStyles[entry.type]}`}
                  >
                    {entry.type}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {entry.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                  {entry.summary}
                </p>
                {entry.link && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 self-start text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {entry.linkLabel ?? "Learn more"}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
