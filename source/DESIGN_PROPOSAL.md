# Proposal — adding colour & icons (tastefully)

**Author:** design pass for joshuaedwards.me · **Status:** proposal, not yet implemented

## Goal

The site is deliberately restrained ("Field Notes" — ink-first, editorial). That
restraint reads as confident, but right now it's *flat*: nothing guides the eye,
and every section looks the same weight. The job here is to add **just enough**
colour and iconography to improve scanning and warmth — without tipping into the
generic, AI-typical look we intentionally avoided.

### Guardrails — what we will NOT do
- No purple/indigo (or any) gradients, no glassmorphism, no neon, no glow.
- No emoji as section markers; no icon on *every* element.
- We keep **one** accent per palette (ink in Mono, teal in Slate). New colour is
  **semantic only** (status/category), never decorative rainbow.
- Everything must work in **both** palettes and stay AA-contrast on the light ground.
- Icons are monoline, one weight, one size — a system, not stickers.

---

## 1. Icons (highest impact, lowest risk)

Use **lucide-react** (already a dependency; monoline, consistent, `currentColor`).

- **Section labels** — one 14px icon before each mono label, in `--fn-muted`:
  Selected work `→`, Experience `briefcase`, Stack `layers`, Lab Notes `flask-conical`,
  Education `graduation-cap`, About `user`. Subtle; it structures the page's rhythm.
- **Project meta glyphs** — a small platform icon next to each work item's meta so
  the medium reads at a glance: iOS `apple`, Web `globe`, Script `terminal`,
  internal platform `server`.
- **Contact / social** — already iconified; leave as-is.
- **Rule:** 16px, ~1.75px stroke, inherit colour, never more than one per line.

## 2. A tiny semantic colour set (status)

Introduce **three** status colours — used only as a small dot or a 1px-bordered
chip on work items and Lab Notes, never as fills or backgrounds:

| token | Mono (light) | Slate | meaning |
|---|---|---|---|
| `--ok`   | `#3f9d6b` (muted green)  | same | live / shipped |
| `--wip`  | `#c98a2b` (amber)        | same | in progress / beta |
| `--info` | `#3b7ea1` (slate blue)   | teal `--fn-accent` in Slate | research / neutral |

Applied as: a 6px status **dot** before a work item's meta ("● iOS · App Store"),
and to re-colour the existing Lab Notes type badges (shipped/research/changelog),
which are currently near-monochrome. Saturation stays moderate so it never shouts.

## 3. Warmth, used sparingly
- A **very faint dot-grid** (≈4% ink) behind the hero/identity panel only — adds
  texture without noise (kept off the reading column).
- Let the accent do a little more work: accent-coloured section-label icons and
  the active "Now" marker, so the eye has one or two warm anchors per screen.

---

## Rollout (each step independently shippable)
1. **Icons on section labels + project meta** — structural, palette-safe, no new colour.
2. **Status dots + recoloured Lab Notes badges** — introduces the 3-colour semantic set.
3. **Hero dot-grid texture** — optional final flourish.

## Why this stays out of "AI-slop" territory
Colour appears *only* where it encodes real information (what platform, what
status), icons form a consistent system rather than decoration, and we never
reach for the gradient/glass/emoji tells. It's the difference between a page
that's *coloured in* and one that's *colour-coded*.
