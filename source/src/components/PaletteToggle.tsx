import { useEffect, useState } from "react";
import { Contrast } from "lucide-react";
import {
  applyPalette,
  getStoredPalette,
  setStoredPalette,
  type Palette,
} from "@/lib/palette";

/**
 * Mono ⇄ Slate palette switch, as icons:
 *  - Mono: a monochrome contrast glyph (inherits the ink colour).
 *  - Slate: an always-colourful colour wheel that stays vivid even in Mono,
 *    to signal that colour is available.
 * State persists to localStorage.
 */
export default function PaletteToggle({ className = "" }: { className?: string }) {
  const [palette, setPalette] = useState<Palette>("mono");

  useEffect(() => {
    setPalette(getStoredPalette());
  }, []);

  const choose = (next: Palette) => {
    setPalette(next);
    applyPalette(next);
    setStoredPalette(next);
  };

  const base =
    "flex h-8 w-8 items-center justify-center rounded-full transition-colors";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-edge bg-surface/85 p-1 backdrop-blur ${className}`}
      role="group"
      aria-label="Colour palette"
    >
      <button
        type="button"
        onClick={() => choose("mono")}
        aria-pressed={palette === "mono"}
        aria-label="Mono — monochrome"
        title="Mono"
        className={`${base} ${
          palette === "mono"
            ? "bg-ink text-on-brand"
            : "text-subtle hover:text-ink"
        }`}
      >
        <Contrast className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => choose("slate")}
        aria-pressed={palette === "slate"}
        aria-label="Slate — add colour"
        title="Slate · add colour"
        className={`${base} ${
          palette === "slate" ? "ring-2 ring-brand" : "hover:opacity-80"
        }`}
      >
        <span
          className="h-[18px] w-[18px] rounded-full"
          aria-hidden="true"
          style={{
            background:
              "conic-gradient(from 90deg, #ef4444, #f59e0b, #eab308, #22c55e, #14b8a6, #3b82f6, #8b5cf6, #ef4444)",
          }}
        />
      </button>
    </div>
  );
}
