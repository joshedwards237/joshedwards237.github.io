import { useEffect, useState, type ReactNode } from "react";
import {
  Hammer,
  Briefcase,
  Layers,
  FlaskConical,
  GraduationCap,
  User,
  Smartphone,
  MonitorPlay,
  Server,
  Music,
  Terminal,
  Mic,
  ClipboardCheck,
  Bot,
  CalendarCheck,
  ShieldCheck,
  KeyRound,
  Wallet,
  Plug,
  Database,
  type LucideIcon,
} from "lucide-react";
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
  icon: LucideIcon;
  status: "live" | "wip";
}

// Strongest / most recent — shown in the hero "Selected work".
const featuredWork: WorkItem[] = [
  {
    name: "Glyde",
    meta: "iOS · App Store",
    icon: Smartphone,
    status: "live",
    dsc: "I designed, built, and launched Glyde end to end — an iOS running coach for Type 1 diabetics that overlays CGM data on pace and heart rate and builds adaptive VDOT training plans. It's live on the App Store.",
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/glyde-running/id6780709934" },
      { label: "glyde-run.web.app", href: "https://glyde-run.web.app/" },
    ],
    more: "It runs personalized glucose and heart-rate forecasts on-device with Core ML and integrates Apple Health, Dexcom, Strava, and Tandem — with one hard rule: it never recommends insulin doses.",
    tech: "Swift · SwiftUI · Core ML (Python/TensorFlow) · Supabase/Postgres · Firebase Hosting · HealthKit",
  },
  {
    name: "CHE Enrollment Portal",
    meta: "Web · team lead",
    icon: Server,
    status: "live",
    dsc: "I planned, designed, built, tested, and shipped the CHE enrollment portal end to end — the full stack behind how families enroll students, and the platform Colorado Homeschool Enrichment runs on.",
    links: [{ label: "enroll.che.school", href: "https://enroll.che.school" }],
    more: "As tech lead I own its release discipline: staged rollouts behind build flags, a staging→production pipeline, per-PR QA verification, and conventional-commit automation that writes its own release notes — so the team ships daily without breaking a system families depend on.",
    tech: "React · Node · PostgreSQL/RDS · AWS · CI/CD",
  },
  {
    name: "Airtable → PostgreSQL Migration",
    meta: "AWS · data infra",
    icon: Database,
    status: "wip",
    dsc: "I'm architecting the migration of CHE's school-operations data out of a 130+-field denormalized Airtable base into a 22-table, 3NF PostgreSQL schema on AWS RDS — normalizing campuses, courses, class enrollments, and budget data into purpose-built tables with junction tables, enums, and a full ERD.",
    links: [],
    more: "The Python ETL on AWS Lambda extracts from Airtable, applies transforms (multi-select fields become discrete boolean columns), and idempotently upserts on a composite key, with secrets in AWS Secrets Manager. A dedicated reporting schema maps operational data into state-compliance export formats (~56 fields), replacing manual reformatting with a repeatable SQL SELECT — and I'm running a phased cutover behind a dual-write transition layer that writes to Airtable and Postgres in parallel to keep both systems consistent with zero downtime.",
    tech: "AWS (RDS · Lambda · Secrets Manager) · PostgreSQL · Python · Airtable API · ETL · 3NF",
  },
  {
    name: "Skripl",
    meta: "macOS · Web",
    icon: MonitorPlay,
    status: "live",
    dsc: "I conceived, engineered, and shipped Skripl myself — a macOS app that records and summarizes meetings with multimodal AI, capturing on-screen context alongside the audio.",
    links: [{ label: "skripl.co", href: "https://skripl.co/" }],
    more: "It turns each meeting summary into context-specific tasks pushed straight into your task manager, so what you saw and what you said stay connected.",
    tech: "Swift · SwiftUI · ScreenCaptureKit · React · Vite · TypeScript · Python · Firebase (Firestore, Cloud Functions, Hosting, iOS SDK) · Gemini · GitHub Actions CI",
  },
  {
    name: "Amanuensis",
    meta: "Open source · macOS",
    icon: Mic,
    status: "wip",
    dsc: "I specified and built Amanuensis, an open-source, local-first dictation tool — writing a detailed PRD covering the speech-to-text engine, OS-level text-injection layer, and licensing, then executing the build in phases.",
    links: [
      { label: "GitHub", href: "https://github.com/joshedwards237/Amanuensis" },
    ],
    more: "Everything stays on-device — no audio leaves the machine — and I drove the phased build through Claude Code with measured latency gates before each stage shipped.",
    tech: "Python · local speech-to-text models",
  },
  {
    name: "CDE Compliance & Audit Infrastructure",
    meta: "Python · compliance",
    icon: ClipboardCheck,
    status: "live",
    dsc: "I authored CHE's data-compliance program — a FERPA, COPPA, and Colorado Student Data Transparency Act report with a phased remediation plan — and built the data pipeline behind it.",
    links: [],
    more: "The pipeline cross-references CDE audit lists against Alma SIS exports to flag unenrolled or misclassified students, and generates the formatted distance reports (students beyond 50 miles from campus) required for audit submission.",
    tech: "Python · Alma SIS exports · report generation",
  },
  {
    name: "Claude Code Operating Practice",
    meta: "AI engineering · CHE",
    icon: Bot,
    status: "live",
    dsc: "I architected the AI-assisted development practice my team runs on — a CLAUDE.md context standard plus a companion HARNESS.md operating contract that separates project context from explicit agent-behavior rules.",
    links: [],
    more: "I built the supporting tooling too: a FERPA compliance-checking slash command and a stress-test harness with sanity/smoke/stress phases, plus a phased execution model with explicit human approval gates — so AI accelerates implementation while security and compliance decisions stay under direct engineering control.",
    tech: "Claude Code · custom MCP tooling",
  },
];

// Everything else — revealed by the "Show all projects" toggle.
const moreWork: WorkItem[] = [
  {
    name: "Firebase Attendance Tracking System",
    meta: "Firebase · CHE",
    icon: CalendarCheck,
    status: "live",
    dsc: "I rebuilt CHE's attendance tracking from the ground up on Firebase, designing the Firestore schema and writing the Cloud Functions that handle the attendance logic.",
    links: [],
    more: "I ran a parallel-run migration so the legacy system stayed live and verifiable while the new one came online — no downtime and no data loss during cutover.",
    tech: "Firebase (Firestore, Cloud Functions) · Python",
  },
  {
    name: "Campus Leader Portal",
    meta: "Web · CHE",
    icon: ShieldCheck,
    status: "live",
    dsc: "I built a role-based admin portal for campus leadership, enforcing access control server-side with Firebase Auth custom claims rather than trusting the frontend.",
    links: [],
    more: "I designed the permission model and the UI shells from scratch.",
    tech: "Firebase Auth · React · Firestore",
  },
  {
    name: "Google Workspace 2SV Enforcement Rollout",
    meta: "Google Workspace · CHE",
    icon: KeyRound,
    status: "live",
    dsc: "I led an org-wide two-step-verification rollout — phased enforcement via configuration groups, exception handling for edge cases, and staff-facing documentation to keep it low-friction.",
    links: [],
    tech: "Google Workspace Admin",
  },
  {
    name: "Financial Accountability App",
    meta: "React Native",
    icon: Wallet,
    status: "wip",
    dsc: "I'm building a household finance app that connects bank accounts through Plaid, with selective account visibility shared between accountability partners and budget-based spending alerts.",
    links: [],
    tech: "React Native · Firebase · Plaid API",
  },
  {
    name: "Custom MCP Servers",
    meta: "Node · Python",
    icon: Plug,
    status: "live",
    dsc: "I built Model Context Protocol servers that extend Claude Code's tool access, including an iMessage integration and an Apple developer-documentation search tool.",
    links: [],
    tech: "Node.js / Python · MCP",
  },
  {
    name: "NeoPad",
    meta: "Windows",
    icon: Music,
    status: "wip",
    dsc: "I built NeoPad, pad software musicians use during live performances, with customizable pad layouts, real-time effects, and audio routing.",
    links: [{ label: "GitHub", href: "https://github.com/joshedwards237/NeoPad" }],
    more: "I designed it around clear, modern UI/UX so it bridges beginner and professional needs.",
  },
  {
    name: "cadence-bpm",
    meta: "Script",
    icon: Terminal,
    status: "live",
    dsc: "I wrote cadence-bpm, a script that pairs the Spotify API with a verified-BPM database to build playlists from your liked songs within a target BPM range — cadence-locked running music.",
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
    dsc: "I lead the tech team across web, data, and infrastructure — planning, code review, mentoring, and delivery.",
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
    dsc: "I provided front-line technical support across Microsoft 365, Azure, and Google Admin environments.",
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
    title: "Founder & Owner",
    org: "Odd Job Bros",
    when: "2018 → present",
    dsc: "I founded and grew a yard-work and home-maintenance business, starting at 14.",
    more: "Expanded to serve 50+ households with two employees, building customer relations, time management, and a bias for ownership.",
  },
];

const stack: { k: string; t: string }[] = [
  {
    k: "Languages",
    t: "Swift · TypeScript · Python · SQL · PL/pgSQL · C# · C++ · JavaScript · Bash",
  },
  {
    k: "Platform & tools",
    t: "AWS · Google Cloud · PostgreSQL / RDS · React · SwiftUI · Node.js · Claude · AI · Git · Airtable · Microsoft 365",
  },
  {
    k: "Practices",
    t: "Platform engineering · Team leadership · DevOps & CI/CD · Full-stack delivery · Security · Systems integration · API design · UI/UX",
  },
];

const education: { name: string; meta: string; dsc: string }[] = [
  {
    name: "University of Colorado, Colorado Springs",
    meta: "B.S. Computer Science · 2025",
    dsc: "Graduated December 2025 summa cum laude from the ABET-accredited program. Coursework across software and algorithm design, advanced mathematics and physics, and systems development.",
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
const typeColor: Record<string, string> = {
  shipped: "text-ok",
  research: "text-info",
  changelog: "text-wip",
};

/* --------------------------- components -------------------------- */

function SectionLabel({
  children,
  id,
  icon: Icon,
}: {
  children: ReactNode;
  id?: string;
  icon?: LucideIcon;
}) {
  return (
    <p
      id={id}
      className="mb-4 mt-11 flex items-center gap-2 scroll-mt-24 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle first:mt-0"
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />}
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
  icon: Icon,
  status,
}: {
  title: string;
  meta: string;
  dsc: string;
  links?: Link[];
  more?: ReactNode;
  tech?: string;
  icon?: LucideIcon;
  status?: "live" | "wip";
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-edge py-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
        <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-subtle">
          {status && (
            <span
              className={`h-1.5 w-1.5 rounded-full ${status === "live" ? "bg-ok" : "bg-wip"}`}
              aria-hidden="true"
            />
          )}
          {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
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
  const [allProjects, setAllProjects] = useState(false);

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
        <aside
          className="flex flex-col border-edge py-14 md:sticky md:top-0 md:h-screen md:self-start md:overflow-y-auto md:border-r md:py-16 md:pr-10"
          style={{
            backgroundImage:
              "radial-gradient(var(--fn-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
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
            . On the side, I build iOS and local-first tools.
          </p>
          <div className="mt-6 border-t border-edge pt-4">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-brand">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              About
            </p>
            <hr className="my-3 border-0 border-t border-edge" />
            <p className="text-sm leading-relaxed text-body">
              I lead the tech team at Colorado Homeschool Enrichment — full-stack
              development, DevOps, security, and a PostgreSQL/RDS data platform —
              while mentoring the engineers building alongside me. I've been
              leading since before I could drive: at 14 I started a yard-work
              business that grew to 50 households and two employees. That bias for
              ownership shows up in everything I ship. Off the clock: black belt,
              pad controllers and live music, and Colorado trails.
            </p>
          </div>
          <p className="mt-6 border-t border-edge pt-4 font-mono text-xs leading-relaxed text-subtle">
            <span className="font-medium text-brand">Now</span> — leading CHE's
            tech team; <span className="text-ink">Glyde just shipped to the App Store.</span>
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
                href="/joshua-edwards-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-edge px-5 py-2.5 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
              >
                Résumé
              </a>
              <a
                href="https://calendly.com/blackbeltjje/new-meeting"
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
          <SectionLabel id="work" icon={Hammer}>Selected work</SectionLabel>
          {featuredWork.map((w) => (
            <Entry
              key={w.name}
              title={w.name}
              meta={w.meta}
              dsc={w.dsc}
              links={w.links}
              more={w.more}
              tech={w.tech}
              icon={w.icon}
              status={w.status}
            />
          ))}

          <button
            type="button"
            onClick={() => setAllProjects((o) => !o)}
            aria-expanded={allProjects}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-edge px-5 py-2.5 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
          >
            {allProjects
              ? "Show fewer projects"
              : `Show all projects (${moreWork.length} more)`}
            <span
              className={`inline-block transition-transform ${
                allProjects ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          <div
            className={`grid transition-all duration-300 ease-out ${
              allProjects
                ? "mt-1 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              {moreWork.map((w) => (
                <Entry
                  key={w.name}
                  title={w.name}
                  meta={w.meta}
                  dsc={w.dsc}
                  links={w.links}
                  more={w.more}
                  tech={w.tech}
                  icon={w.icon}
                  status={w.status}
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
            </div>
          </div>

          <SectionLabel id="experience" icon={Briefcase}>Experience</SectionLabel>
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

          <SectionLabel id="stack" icon={Layers}>Stack</SectionLabel>
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

          <SectionLabel id="lab-notes" icon={FlaskConical}>
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
                <span className={`font-mono text-[11px] uppercase tracking-wide ${typeColor[entry.type]}`}>
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

          <SectionLabel id="education" icon={GraduationCap}>Education</SectionLabel>
          {education.map((e) => (
            <Entry key={e.name} title={e.name} meta={e.meta} dsc={e.dsc} />
          ))}

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-edge pt-6">
            <a
              href="mailto:joshua.edwards237@gmail.com"
              className="font-mono text-sm text-brand hover:underline"
            >
              joshua.edwards237@gmail.com
            </a>
            <a
              href="/joshua-edwards-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-subtle transition-colors hover:text-brand"
            >
              Résumé ↗
            </a>
            <a
              href="https://calendly.com/blackbeltjje/new-meeting"
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
