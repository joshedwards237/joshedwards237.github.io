# Lab Notes entries

Each `.json` file in this directory becomes one card in the "Lab Notes"
timeline section on the site. Files are loaded at build time via
`import.meta.glob` in `src/components/Timeline.tsx` and validated by
`scripts/validate-content.mjs`, which runs automatically as the `prebuild`
npm script — a malformed entry fails the build.

## Schema

One JSON object per file:

| Field       | Required | Type   | Rules                                          |
| ----------- | -------- | ------ | ---------------------------------------------- |
| `date`      | yes      | string | `YYYY-MM-DD` (e.g. `2026-07-03`)               |
| `type`      | yes      | string | One of: `shipped`, `research`, `changelog`     |
| `title`     | yes      | string | Non-empty. Card headline.                      |
| `summary`   | yes      | string | Non-empty. One or two sentences.               |
| `link`      | no       | string | URL. Rendered as a trailing link on the card.  |
| `linkLabel` | no       | string | Label for `link`. Defaults to "Learn more".    |

## Example

```json
{
  "date": "2026-07-03",
  "type": "shipped",
  "title": "Glyde is in TestFlight beta",
  "summary": "A glucose-aware running coach for Type 1 diabetics.",
  "link": "https://glyde-run.web.app/",
  "linkLabel": "Visit Glyde"
}
```

## Conventions

- File name: `YYYY-MM-DD-short-slug.json` (the name itself is not parsed;
  it just keeps the directory sorted).
- Entries render newest-first; the newest entry gets the wide (2-column)
  card in the bento grid.
- Type badge colors: `shipped` = emerald, `research` = indigo,
  `changelog` = amber.
