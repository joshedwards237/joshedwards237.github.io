/**
 * Colour palette for the Field Notes design.
 *  - "mono"  (default): ink-only, no chroma.
 *  - "slate": opt-in colour — cool light ground, teal accent, bronze highlights.
 *
 * The choice is stored in localStorage and applied as a `data-palette`
 * attribute on <html>. An inline script in index.html applies it before first
 * paint (no flash); this module keeps React in sync with that state.
 */
export type Palette = "mono" | "slate";

const STORAGE_KEY = "palette";

export function getStoredPalette(): Palette {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "slate"
      ? "slate"
      : "mono";
  } catch {
    return "mono";
  }
}

export function applyPalette(palette: Palette): void {
  const root = document.documentElement;
  if (palette === "slate") root.setAttribute("data-palette", "slate");
  else root.removeAttribute("data-palette");
}

export function setStoredPalette(palette: Palette): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, palette);
  } catch {
    /* ignore (private mode, etc.) */
  }
}
