import { useEffect, useState, type ReactNode } from "react";
import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";
import PaletteToggle from "@/components/PaletteToggle";
import { formatDate, getUpdates } from "@/lib/updates";

/* ----------------------------- data ----------------------------- */

interface Link {
  label: string;
  href: string;
}
interface WorkItem {
  name: string;
  meta: string;
  dsc: string;
  links: Link[];
  more?: ReactNode;
  tech?: string;
}

const work: WorkItem[] = [
  {
    name: "Glyde",
    meta: "iOS · TestFlight",
    dsc: "A running coach for Type 1 diabetics that overlays CGM data on pace and heart rate and builds adaptive VDOT training plans.",
    links: [{ label: "glyde-run.web.app", href: "https://glyde-run.web.app/" }],
    more: "Runs personalized glucose and heart-rate forecasts on-device with Core ML, and integrates Apple Health, Dexcom, Strava, and Tandem — with one hard rule: it never recommends insulin doses.",
    tech: "Swift · SwiftUI · Core ML · HealthKit",
  },
  {
    name: "Skripl",
    meta: "Web",
    dsc: "A meeting recorder built around visual context — capture screenshots and annotate your screen while recording.",
    links: [{ label: "skripl.co", href: "https://skripl.co/" }],
    more: "Turns the meeting summary into context-specific tasks pushed straight into your task-management system, so what you saw and what you said stay connected.",
    tech: "TypeScript · React",
  },
  {
    name: "Teacher Attendance Portal",
    meta: "Web · in production",
    dsc: "A web portal that streamlines how teachers record attendance — real-time updates, class management, and automated reporting.",
    links: [{ label: "GitHub", href: "https://github.com/joshedwards237" }],
    more: "Built with Python and HTML/CSS on Airtable and AWS. In production at Colorado Homeschool Enrichment, where it runs school-wide and replaced a manual, error-prone process.",
    tech: "Python · Airtable · AWS",
  },
  {
    name: "NeoPad",
    meta: "Windows",
    dsc: "Pad software for musicians during live performances — customizable pad layouts, real-time effects, and audio routing.",
    links: [{ label: "GitHub", href: "https://github.com/joshedwards237/NeoPad" }],
    more: "Built with modern UI/UX principles for a clear, easy-to-use interface that bridges beginner and professional needs.",
  },
  {
    name: "cadence-bpm",
    meta: "Script",
    dsc: "Pairs the Spotify API with a verified-BPM database to build playlists from your liked songs in a target BPM range — cadence-locked running music.",
    links: [
      { label: "GitHub", href: "https://github.com/joshedwards237/cadence-bpm" },
    ],
    tech: "Python · Spotify API",
  },
];

interface Role {
  title: string;
  org: string;
  when: string;
  dsc: string;
  more?: ReactNode;
  tech?: string;
}

const roles: Role[] = [
  {
    title: "Systems Engineer & Tech Team Lead",
    org: "Colorado Homeschool Enrichment",
    when: "2024 → present",
    dsc: "Lead the tech team — planning, code review, mentoring, and delivery across web, data, and infrastructure.",
    more: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li>
          Design and operate full-stack systems on AWS backed by PostgreSQL/RDS,
          supporting school-wide operations.
        </li>
        <li>
          Own the security posture: access control, hardening, and safe handling
          of student data.
        </li>
        <li>
          Built Python/Airtable/AWS automation that eliminated hours of weekly
          manual work, including the attendance portal used school-wide.
        </li>
      </ul>
    ),
    tech: "AWS · PostgreSQL/RDS · Python · React",
  },
  {
    title: "IT Service Desk Technician",
    org: "Rooted Software",
    when: "2023",
    dsc: "Front-line technical support across Microsoft 365, Azure, and Google Admin environments.",
    more: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li>Managed client communication and support, in person and by phone.</li>
        <li>
          Addressed security issues and maintained network and hardware
          infrastructure, working with Active Directory.
        </li>
      </ul>
    ),
  },
  {
    title: "Owner & Manager",
    org: "Self-employed",
    when: "2018 → present",
    dsc: "Founded and grew a yard-work and home-maintenance business — starting at 14.",
    more: "Expanded to serve 50+ households with two employees, building customer relations, time management, and a bias for ownership.",
  },
];

const stack: { k: string; t: string }[] = [
  {
    k: "Languages",
    t: "Python · Swift · TypeScript · JavaScript · Java · C# · C++ · C · SQL · Bash",
  },
  {
    k: "Platform & tools",
    t: "AWS · PostgreSQL / RDS · React · SwiftUI · Django · Node.js · Git · Airtable · Azure · Microsoft 365",
  },
  {
    k: "Practices",
    t: "Full-stack delivery · Team leadership · DevOps & CI/CD · Security · Systems integration · API design · UI/UX",
  },
];

const education: { name: string; meta: string; dsc: string }[] = [
  {
    name: "University of Colorado Colorado Springs",
    meta: "B.S. Computer Science · 2025",
    dsc: "Graduated December 2025 with a 3.9 GPA from the ABET-accredited program. Coursework across software & algorithm design, calculus, linear algebra, and physics.",
  },
  {
    name: "Pikes Peak State College",
    meta: "A.S. Computer Science · 2023",
    dsc: "Earned a 4.0 associate's degree and Certificate of Programming by age 18, concurrently with high school.",
  },
];

const labNotes = getUpdates().slice(0, 3);
const typeTag: Record<string, string> = {
  shipped: "shipped",
  research: "research",
  changelog: "changelog",
};

/* --------------------------- components -------------------------- */

function SectionLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p
      id={id}
      className="mb-4 mt-11 scroll-mt-24 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle first:mt-0"
    >
      {children}
    </p>
  );
}

function Entry({
  title,
  meta,
  dsc,
  links,
  more,
  tech,
}: {
  title: string;
  meta: string;
  dsc: string;
  links?: Link[];
  more?: ReactNode;
  tech?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-edge py-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
        <span className="whitespace-nowrap font-mono text-xs text-subtle">
          {meta}
        </span>
      </div>
      <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-body">{dsc}</p>
      {(links?.length || more) && (
        <div className="mt-2.5 flex flex-wrap items-center gap-4">
          {links?.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent font-mono text-xs text-subtle transition-colors hover:border-brand hover:text-brand"
            >
              {l.label} ↗
            </a>
          ))}
          {more && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-brand"
            >
              Details
              <span
                className={`inline-block transition-transform ${
                  open ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
          )}
        </div>
      )}
      {more && (
        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-w-[64ch] text-sm leading-relaxed text-body">
              {more}
            </div>
            {tech && (
              <p className="mt-2.5 font-mono text-[11px] tracking-wide text-subtle">
                {tech}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ page ----------------------------- */

export default function Home() {
  // Cursor spotlight on the identity panel (skipped when reduced-motion).
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const root = document.documentElement;
      root.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
      root.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Returning from the timeline (#lab-notes): land on the Lab Notes section.
  useEffect(() => {
    if (window.location.hash === "#lab-notes") {
      document.getElementById("lab-notes")?.scrollIntoView({ block: "start" });
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* signature: cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,25%) var(--my,15%), var(--fn-spot), transparent 72%)",
        }}
      />

      <PaletteToggle className="fixed right-4 top-4 z-50" />

      <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-0 px-6 md:grid-cols-[0.82fr_1.18fr]">
        {/* ---------- identity panel ---------- */}
        <aside className="flex flex-col border-edge py-14 md:sticky md:top-0 md:h-screen md:self-start md:border-r md:py-16 md:pr-10">
          <a href="#" aria-label="Home" className="mb-8 inline-block text-ink">
            <Logo className="h-10 w-10" />
          </a>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-brand">
            Colorado · systems engineer
          </p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight text-ink">
            Joshua Edwards
          </h1>
          <p className="mt-3 font-mono text-sm text-subtle">
            Systems Engineer &amp; Tech Team Lead
          </p>
          <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-body">
            I build and run the platforms a school org depends on every day —{" "}
            <span className="font-semibold text-ink">
              full-stack apps, AWS &amp; PostgreSQL infrastructure, and the team
              that ships them
            </span>
            . On the side, iOS and local-first tools.
          </p>
          <p className="mt-6 border-t border-edge pt-4 font-mono text-xs leading-relaxed text-subtle">
            <span className="font-medium text-brand">Now</span> — leading CHE's
            tech team; <span className="text-ink">Glyde is in TestFlight beta.</span>
          </p>

          <div className="mt-auto pt-8">
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-on-brand transition hover:brightness-110"
              >
                See my work
              </a>
              <a
                href="https://calendly.com/blackbeltjje/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-edge px-5 py-2.5 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
              >
                Book a call
              </a>
            </div>
            <SocialIcons className="mt-6" />
          </div>
        </aside>

        {/* ---------- content ---------- */}
        <main className="pb-20 md:py-16 md:pl-11">
          <SectionLabel id="work">Selected work</SectionLabel>
          {work.map((w) => (
            <Entry
              key={w.name}
              title={w.name}
              meta={w.meta}
              dsc={w.dsc}
              links={w.links}
              more={w.more}
              tech={w.tech}
            />
          ))}
          <a
            href="https://github.com/joshedwards237"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-mono text-xs text-subtle transition-colors hover:text-brand"
          >
            More on GitHub ↗
          </a>

          <SectionLabel id="experience">Experience</SectionLabel>
          {roles.map((r) => (
            <Entry
              key={r.title}
              title={r.title}
              meta={r.when}
              dsc={`${r.org} — ${r.dsc}`}
              more={r.more}
              tech={r.tech}
            />
          ))}

          <SectionLabel id="stack">Stack</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2">
            {stack.map((s) => (
              <div key={s.k}>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.09em] text-brand">
                  {s.k}
                </p>
                <p className="text-sm leading-relaxed text-body">{s.t}</p>
              </div>
            ))}
          </div>

          <SectionLabel id="lab-notes">
            Lab Notes <span className="text-subtle">· updated weekly</span>
          </SectionLabel>
          <div className="space-y-0">
            {labNotes.map((entry) => (
              <div
                key={`${entry.date}-${entry.title}`}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-edge py-3"
              >
                <span className="w-20 shrink-0 font-mono text-xs text-subtle">
                  {formatDate(entry.date).replace(/, \d{4}$/, "")}
                </span>
                <span className="flex-1 text-sm font-medium text-ink">
                  {entry.title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-brand">
                  {typeTag[entry.type]}
                </span>
              </div>
            ))}
          </div>
          <a
            href="#/timeline"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-edge px-5 py-2.5 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
          >
            Enter the Skills Timeline →
          </a>

          <SectionLabel id="education">Education</SectionLabel>
          {education.map((e) => (
            <Entry key={e.name} title={e.name} meta={e.meta} dsc={e.dsc} />
          ))}

          <SectionLabel id="about">About</SectionLabel>
          <p className="max-w-[66ch] text-[15px] leading-relaxed text-body">
            I lead the tech team at Colorado Homeschool Enrichment — full-stack
            development, DevOps, security, and a PostgreSQL/RDS data platform —
            while mentoring the engineers building alongside me. I've been leading
            since before I could drive: at 14 I started a yard-work business that
            grew to 50 households and two employees. That bias for ownership shows
            up in everything I ship. Off the clock: black belt, pad controllers
            and live music, and Colorado trails.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-edge pt-6">
            <a
              href="mailto:joshua.edwards237@gmail.com"
              className="font-mono text-sm text-brand hover:underline"
            >
              joshua.edwards237@gmail.com
            </a>
            <a
              href="https://calendly.com/blackbeltjje/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-subtle transition-colors hover:text-brand"
            >
              Book 30 min ↗
            </a>
            <SocialIcons className="sm:ml-auto" />
          </div>
          <p className="mt-6 font-mono text-xs text-subtle">
            © {new Date().getFullYear()} Joshua Edwards
          </p>
        </main>
      </div>
    </div>
  );
}
