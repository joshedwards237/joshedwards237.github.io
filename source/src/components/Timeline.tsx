import { ArrowUpRight, FlaskConical, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { badgeStyles, entryKey, formatDate, getUpdates } from "@/lib/updates";

// Homepage teaser: only the latest two entries (one bento row: wide + normal).
// The full history lives on the Skills Timeline page (#/timeline).
const entries = getUpdates().slice(0, 2);

export default function Timeline() {
  if (entries.length === 0) return null;

  return (
    <section id="lab-notes" className="py-20 px-8 scroll-mt-4">
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
                key={entryKey(entry)}
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
          <div className="mt-12 flex justify-center">
            <a
              href="#/timeline"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              <History className="w-5 h-5" />
              Enter the Skills Timeline
            </a>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
