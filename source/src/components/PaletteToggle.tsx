import { useEffect, useState } from "react";
import {
  applyPalette,
  getStoredPalette,
  setStoredPalette,
  type Palette,
} from "@/lib/palette";

/**
 * Mono ⇄ Slate palette switch. Mono is the default; Slate adds colour.
 * A small segmented control; state persists to localStorage.
 */
export default function PaletteToggle({ className = "" }: { className?: string }) {
  const [palette, setPalette] = useState<Palette>("mono");

  // Sync to whatever the pre-paint inline script already applied.
  useEffect(() => {
    setPalette(getStoredPalette());
  }, []);

  const choose = (next: Palette) => {
    setPalette(next);
    applyPalette(next);
    setStoredPalette(next);
  };

  const opt =
    "px-2.5 py-1 rounded-full font-mono text-[11px] tracking-wide transition-colors";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-edge bg-surface/80 p-1 backdrop-blur ${className}`}
      role="group"
      aria-label="Colour palette"
    >
      <button
        type="button"
        onClick={() => choose("mono")}
        aria-pressed={palette === "mono"}
        className={`${opt} ${
          palette === "mono" ? "bg-ink text-on-brand" : "text-subtle hover:text-ink"
        }`}
      >
        Mono
      </button>
      <button
        type="button"
        onClick={() => choose("slate")}
        aria-pressed={palette === "slate"}
        className={`${opt} ${
          palette === "slate"
            ? "bg-brand text-on-brand"
            : "text-subtle hover:text-ink"
        }`}
      >
        Slate
      </button>
    </div>
  );
}
