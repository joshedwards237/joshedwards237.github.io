import type { ReactNode } from "react";

/**
 * GitHub / Email / LinkedIn as small inline-SVG logo links.
 * Icons inherit `currentColor`; the row colours itself from the palette.
 */
interface SocialIconsProps {
  className?: string;
}

interface IconLink {
  label: string;
  href: string;
  external: boolean;
  path?: ReactNode;
  node?: ReactNode;
}

export default function SocialIcons({ className = "" }: SocialIconsProps) {
  const links: IconLink[] = [
    {
      label: "GitHub",
      href: "https://github.com/joshedwards237",
      external: true,
      path: (
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.56 22.29 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
      ),
    },
    {
      label: "Email",
      href: "mailto:joshua.edwards237@gmail.com",
      external: false,
      // envelope (stroke)
      node: (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
        </g>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joshua-edwards-0a399325a/",
      external: true,
      path: (
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
      ),
    },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          aria-label={l.label}
          title={l.label}
          {...(l.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-subtle transition-colors hover:text-brand"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            {l.node ?? l.path}
          </svg>
        </a>
      ))}
    </div>
  );
}
