import { ArrowUpRight, BookOpen } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import glydeScreenshot from "@/assets/glyde.png";
import skriplScreenshot from "@/assets/skripl.png";

interface FlagshipProject {
  title: string;
  badge?: string;
  description: string;
  linkLabel: string;
  linkUrl: string;
  imageUrl: string;
  imageAlt: string;
}

interface SmallProject {
  title: string;
  description: string;
  linkLabel: string;
  linkUrl: string;
  note?: string;
}

const flagshipProjects: FlagshipProject[] = [
  {
    title: "Glyde",
    badge: "iOS · TestFlight beta",
    description:
      "Training that reads your blood sugar. A running coach for Type 1 diabetics that overlays CGM data on pace and heart rate, builds adaptive VDOT training plans, and runs personalized glucose and heart-rate forecasts on-device with Core ML. Integrates Apple Health, Dexcom, Strava, and Tandem — with one hard rule: it never recommends insulin doses.",
    linkLabel: "Visit Glyde",
    linkUrl: "https://glyde-run.web.app/",
    imageUrl: glydeScreenshot,
    imageAlt: "Glyde homepage — training that reads your blood sugar, with a run-detail glucose overlay",
  },
  {
    title: "Skripl",
    description:
      "A meeting recorder built around visual context: capture screenshots and annotate your screen while recording, then turn the meeting summary into context-specific tasks pushed straight into your task-management system.",
    linkLabel: "Visit Skripl",
    linkUrl: "https://skripl.co/",
    imageUrl: skriplScreenshot,
    imageAlt: "Skripl homepage — what you say and what you see, finally in the same place",
  },
];

const smallProjects: SmallProject[] = [
  {
    title: "Teacher Attendance Portal",
    description:
      "A web portal that streamlines how teachers record attendance — built with Python and HTML/CSS on Airtable and AWS, with real-time updates, class management, and automated reporting. In production at Colorado Homeschool Enrichment, where it runs school-wide.",
    linkLabel: "View Project",
    linkUrl: "https://github.com/joshedwards237",
  },
  {
    title: "NeoPad",
    description:
      "A Windows pad software for musicians during live performances, bridging beginner and professional needs with customizable pad layouts, real-time effects processing, and seamless audio routing. Built with modern UI/UX principles for a clear, easy-to-use interface.",
    linkLabel: "View Project",
    linkUrl: "https://github.com/joshedwards237/NeoPad",
  },
  {
    title: "cadence-bpm",
    description:
      "A small script that pairs the Spotify API with a verified-BPM database to build playlists from your liked songs within a target BPM range — cadence-locked running music.",
    linkLabel: "View Project",
    linkUrl: "https://github.com/joshedwards237/cadence-bpm",
  },
];

export default function Projects() {
  return (
    <section className="py-20 px-8">
      <ScrollAnimationWrapper>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-8 h-8" />
            Projects
          </h2>
          <div className="space-y-12">
            {/* Flagship projects */}
            {flagshipProjects.map((project) => (
              <div className="relative group" key={project.title}>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000" />
                <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {project.title}
                        </h3>
                        {project.badge && (
                          <span className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-700 dark:text-indigo-400 text-sm font-medium">
                            {project.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      <a
                        href={project.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                      >
                        {project.linkLabel}
                      </a>
                    </div>
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-video rounded-lg overflow-hidden block border border-black/5 dark:border-white/10"
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Smaller projects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {smallProjects.map((project) => (
                <div className="relative group" key={project.title}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-1000" />
                  <div className="relative bg-white dark:bg-gray-900 rounded-lg p-5 h-full flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                      {project.description}
                    </p>
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block self-start bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      {project.linkLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Trailing GitHub link */}
            <div className="text-center">
              <a
                href="https://github.com/joshedwards237"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                More on GitHub
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
