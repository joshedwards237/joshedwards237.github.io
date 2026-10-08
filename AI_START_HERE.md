# AI_START_HERE — joshedwards237.github.io

Derived 2026-10-08 from the **real** `origin/main` (`08ee6ce`, 2026-10-08, PR #40),
not from the local clone — see §1. Every figure below was produced by a command.

---

## 0. Read this paragraph before anything else

**This repository is a GitHub Pages site. The repo is public, Pages is public, and
Pages serves the repo root.** Confirmed: `visibility: "public"`,
`source: {branch: "main", path: "/"}`, `build_type: "legacy"`, `status: "built"`
(`gh api repos/joshedwards237/joshedwards237.github.io/pages`).

The consequence that is easy to miss: **there is no `src/` vs `public/` boundary
here. Every tracked file is a live URL.** `source/` is not a private build
directory — it is served.

```
source/src/components/Home.tsx            -> 200  (26 KB of TSX, world-readable)
source/DESIGN_PROPOSAL.md                 -> 200  (internal design proposal)
source/public/joshua-edwards-resume.pdf   -> 200  (169 KB)
source/src/assets/josh.jpg                -> 200  (2.8 MB)
```

Anything you commit is published the moment Pages rebuilds. There is no staging.

---

## 1. What this is, what is published, where, and whether it is live

Joshua Edwards' personal portfolio site. Two live hosts, both serving this
repo's root, byte-identical (57 372 bytes):

| URL | Status | Serves |
|---|---|---|
| `https://joshedwards237.github.io/` | **200, live** | repo root, via GitHub Pages (branch `main`, path `/`) |
| `https://joshuaedwards.me/` | **200, live** | the same artifact, via Hostinger Git deploy |

`<title>Joshua Edwards — Systems Engineer</title>` on both. `https_enforced: true`.
No `CNAME` file is tracked (it was added and deleted twice — `e3bfb1e`/`ea4fde4`,
`627a38e`/`cff18ff`), so the custom domain is **not** configured through Pages;
`cname: null` in the Pages API. joshuaedwards.me is a separate Hostinger deploy.
**Two deploy targets. A push publishes to both.** `731e7c5` says so outright:
"GitHub Pages and Hostinger both serve this artifact."

Routes:

- `/` — the current site. A **static Next.js export** (`_next/`, `index.txt`, build
  id in the RSC payload). Dark by default, theme in `localStorage`.
- `/old-design/` — the previous Vite/React site, archived but fully live, hash-routed.
- `/404.html`, `/404/` — `custom_404: true`.
- `/source/**` — the Vite project, served verbatim as source.

### The local clone is stale, in two layers

```
local HEAD        f7733e6  2026-08-26  (PR #38)
local origin/main f7133dc  2026-08-26  (PR #39)   <- remote-tracking ref is itself stale
TRUE origin/main  08ee6ce  2026-10-08  (PR #40)   <- git ls-remote origin refs/heads/main
```

`git rev-list --left-right --count origin/main...HEAD` → `2	0`. Read that
correctly: **left is `origin/main`, so `origin/main` is 2 ahead and local `HEAD` is
2 behind** — and because the tracking ref is 2 commits stale on top of that,
**local `HEAD` is 4 commits behind the real `origin/main`.** `git status` is clean.

Do not conclude anything is missing from this repo by reading the working tree.
`git ls-remote origin refs/heads/main` and the GitHub API are the ground truth
until someone fetches.

**All 20 remote branches are ancestors of `origin/main`** — no unmerged history
anywhere (`git merge-base --is-ancestor` over every ref). `git rev-list --all --count`
= 96 = `git rev-list --count origin/main`, which confirms it a second way.

---

## 2. Reading order

Only three markdown files exist. **Two of them are published content, not
documentation about the repo** — they are fetchable URLs, so write them for a
public audience.

1. **`README.md`** (125 bytes) — one sentence, "Portfolio website for Joshua
   Edwards' professional software development experience and projects." Accurate
   but says nothing operational. Published at `/README.md`. *State: thin.*
2. **`source/scripts/publish.mjs`** — not markdown, but **read it second anyway**.
   Its header comment is the only prose describing the deploy, and **the comment
   contradicts the code** (§7). *State: stale docstring, working code.*
3. **`source/src/content/updates/README.md`** — the Lab Notes content schema
   (`date`/`type`/`title`/`summary`/`link`/`linkLabel`, type ∈
   `shipped|research|changelog`). Read this before adding an entry; the schema is
   machine-enforced by `validate-content.mjs` at `prebuild`. Published at
   `/source/src/content/updates/README.md`. *State: accurate on schema, **stale on
   wiring** — line 5 says entries load via `import.meta.glob` in
   `src/components/Timeline.tsx`. That file does not exist on `origin/main`
   (deleted; `TimelinePage.tsx` replaced it). The real loader is
   `source/src/lib/updates.ts`.*
4. **`source/DESIGN_PROPOSAL.md`** — a design proposal ("adding colour & icons"),
   marked `Status: proposal, not yet implemented`. **It was implemented** — `d55fc46`
   "apply colour + icon proposal" states "Implements DESIGN_PROPOSAL.md". *State:
   **stale status line**, published at `/source/DESIGN_PROPOSAL.md`.* Its "Guardrails
   — what we will NOT do" section is still the live house style and worth reading.

There is no CLAUDE.md, no HARNESS.md, no CONTRIBUTING, no ADRs. **The commit bodies
are the documentation** (§6) — they are unusually detailed and carry WHY/WHAT/
IMPACT/TEST/NOTES blocks in the July 2026 range.

`LICENSE` is GPL v3.

---

## 3. Non-negotiable constraints

1. **Everything committed is world-readable and world-fetchable, immediately.**
   See §0. This is the only constraint that cannot be undone by a later commit —
   history is public too, and `git rm` does not unpublish.
2. **No student or FERPA-covered data, and no internal CHE specifics.** This is the
   repo's own stated rule, not an imported one: `a8c0c8c` — *"All entries kept
   public-safe: no student data, no internal specifics."* The Lab Notes describe CHE
   work (CDE audit tooling, NOI compliance, Airtable→Postgres) at the engineering
   level only. `eced3be` went further and rewrote `student data` → `sensitive,
   regulated data` in the published copy.
3. **Published claims must be attestable.** `eced3be` — *"all attested on the main
   site — nothing invented."* `549d37d` — *"Status is wip (present tense) — no
   finished-migration claims."* Lab Notes are *"drafted from GitHub evidence"*
   (`65b4901`), and `a8c0c8c` flags one entry's date as approximate rather than
   stating it as fact.
4. **Lab Notes entries must pass `validate-content.mjs`** — it runs as `prebuild`,
   so a malformed entry fails the build before `tsc`/`vite`. Unknown fields are
   rejected; `date` must be a real calendar date, not merely `YYYY-MM-DD`-shaped.
5. **The design guardrails in `DESIGN_PROPOSAL.md` are binding house style**: no
   gradients, no glassmorphism, no neon/glow, no emoji as section markers, one
   accent per palette, colour is semantic only, AA contrast in both palettes.
   `cc86e0f` exists specifically to remove "the generic AI-styled template".
6. **The build output is committed and is the deployable artifact.** You cannot
   ship a source change alone. See §4 and §7.

I found no branch protection, no CI, no pre-commit hooks, and no secret scanning
enabled (`/secret-scanning/alerts` → 404). Nothing mechanically enforces 1–3.

---

## 4. How work is done

**Branches.** Short-lived, typed, hyphenated, slash-prefixed with intent:
`fix/…`, `feat/…`, `copy/…`, `demo/…`, `chore/…`, `redesign/…`, `lab-notes/<date>`.
96 commits on `origin/main`, **39 merges / 57 non-merge** — so essentially
everything lands by PR (latest is #40). Branches are deleted at merge: the two most
recently merged (`fix/hero-mobile-gradient-buttons`,
`fix/mobile-responsive-particles-email`) are already gone from the remote and
survive only as stale tracking refs locally. 20 remote branches remain, all merged.
No open PRs.

**Build — this is the part that matters.**

`source/` is **Vite + React 18 + TypeScript + Tailwind**, not Next.js:

```
npm run dev            # vite
npm run build          # prebuild: validate-content.mjs  ->  tsc && vite build
npm run publish:root   # build, then node scripts/publish.mjs
```

`publish.mjs` copies `source/dist/` into the repo tree — **but despite its name and
its own header comment, it now targets `old-design/`, not the repo root**:

```js
const repoRoot = path.join(path.resolve(sourceDir, ".."), "old-design");
```

**The site at `/` is a static Next.js export whose source is not in this
repository.** No `next.config.*`, no `app/page.tsx`, no `app/layout.tsx` has ever
been committed on any ref (checked against all 154 paths ever added). The front
door is a committed build artifact with no reproducible source here.

**Deploy.** No GitHub Actions workflow exists. `.github/workflows/deploy.yml` lived
from `1a2ea8c` to `83c400f` ("remove FTP deploy workflow superseded by Hostinger Git
deploy") and used `secrets.HOSTINGER_FTP_SERVER/USER/PASSWORD`. So today:

```
push to main  ->  GitHub Pages rebuilds from branch main, path /   (legacy build)
              ->  Hostinger Git deploy serves the same tree at joshuaedwards.me
```

Both targets serve committed bytes. Nothing is built server-side. **A feature is
live only when the artifact is committed and both hosts return it** — verify both.

---

## 5. Dependencies

Runtime shipped to the browser: **none from a third party.** The published pages
reference only first-party origins plus `w3.org` (SVG namespace) and outbound links
to `github.com`, `apps.apple.com`, `enroll.che.school`, `glyde-run.web.app`,
`skripl.co`. Fonts are self-hosted in `_next/static/media/*.woff2`. **No analytics,
no tag manager, no trackers** — a case-sensitive sweep for `G-XXXXXXXXXX`, `UA-…`,
`GTM-…`, `googletagmanager`, `gtag(`, `plausible`, `hotjar`, `mixpanel`, `segment`,
`posthog`, `sentry`, `clarity.ms`, `fbq(`, `cloudflareinsights` and
`_vercel/insights` over **every blob on every ref** returned nothing.

`source/package.json` (dev-time only, Node/npm; `package-lock.json` committed):

- deps: `react`, `react-dom` 18.3, `framer-motion` 11, `lucide-react`,
  `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`,
  `react-intersection-observer`
- dev: `vite` 5.4, `typescript` 5.6, `tailwindcss` 3.4, `postcss`, `autoprefixer`,
  `tailwindcss-animate`, `@vitejs/plugin-react`, `@types/*`

The Next.js front door's dependencies are **not declared anywhere in this repo** —
its bundle references Tone.js (`feat(demo): procedural ambient synth`, `e8c5bde`)
and a WebGL particle system, neither of which appears in any committed manifest.

No Python, no lockfile for the live site, no pinned toolchain versions.

---

## 6. Verification practice, and the incident behind each rule

The history has **real incidents with real diagnoses**. These are mined from commit
bodies, not invented.

**1. Verify the deployed artifact, not the merged PR.** — `731e7c5`, 2026-07-04:
*"PR #8 merged the v2 source, but the deployable artifact at the repo root was still
the v1 build, so the live site had not actually changed."* The build output is
committed, so merging source changes nothing. **This has recurred and is live right
now** — see §8.

**2. Verify at the deployed URL and the deployed base path.** — `7e5b07f`:
*"next/image did not prepend basePath to the unoptimized src, so the contact portrait
requested /portrait.jpg (root, 404) instead of /redesign/portrait.jpg. … Verified it
loads (733px) against the deployed subfolder."* A local check could not see this;
only the subfolder deploy could. `a04b68e` then verified **both** routes
independently after the route swap.

**3. Check the real viewport, not a resized desktop window.** Two separate
horizontal-overflow defects reached `main`: `3a071f5` — *"remove ~143px horizontal
overflow at <=860px"*; `72c279b` — *"the footer wordmark … at --display-xl on one
line (nbsp) was wider than the viewport, forcing page-wide horizontal overflow."*
Both are measured, numbered findings, and both shipped before being caught.

**4. A coherent generator makes structure you did not ask for.** — `6f9a8ee`:
*"The line's y/z used a coherent sin(i*k), so ~15k dense points wove into a twisted
rope. Rebuilt: ~42% of points form a clean line core with INCOHERENT hash jitter."*
The bug was a correct formula producing an emergent artifact — invisible to any
assertion, visible only by looking.

**5. Clipping and masking bugs hide in the type metrics.** — `290798f`: the
`overflow:hidden` reveal mask was shorter than the glyph at `line-height: 0.92`,
clipping descenders. Fixed with padding plus a compensating negative margin so line
spacing was unchanged — i.e. the fix was checked for its own side effect.

**6. Cache-bust by hash, deliberately.** Repeated: *"new hashes = clean cache
break"* (`731e7c5`), *"JS hash bumped for cache-bust"* (`549d37d`), and `c43281e`
renamed `favicon.svg` → `favicon-je.svg` *"(fresh URL) so the JE monogram bypasses
the long-lived same-name cache."* Same-name asset replacement does not reach users.

**7. Byte-compare the published artifact against the verified build.** — `731e7c5`
TEST: *"Root files byte-identical to the verified dist build (cmp)."*

**8. Scripted browser verification for layout claims, with numbers.** — `6418fa4`,
`579d5e9`, `a8c0c8c` all ran Puppeteer and recorded measurements, not impressions:
*"exactly 2 cards sharing one row … drag pans ~1000px with momentum … Back lands
with the Lab Notes section 6px from the viewport top (screenshot verified)."*

**9. Remove dev-only tooling before publishing.** — `99b837e`: *"Baked tuning (was
a dev-only leva panel, now removed)."* A debug panel in a committed bundle is a
public debug panel.

**10. Correct published facts about yourself, in the open.** `9563aae` corrected a
GPA; `4f608cd` then replaced the GPA with the honour ("summa cum laude") and added
a missing comma before a city. Both values remain in history.

**11. Prove delivery before and after a cutover.** The newest Lab Note
(`2026-10-07-workspace-domain-cutover`) records sending *"three stamped baseline
messages beforehand to prove delivery worked and re-verifying after"*, so that when
a rollback left the domain unroutable *"the baselines made the outage window exact
instead of a question."* That is this repo's owner applying a baseline-and-control
discipline elsewhere; it is the standard to hold here too.

**Guard against your own instrument.** While deriving this document, three of my
own checks were wrong before they were right: a byte-scan "found" GPS in a published
photo (false positive — a proper EXIF parse with a positive and a negative control
says there is none); `index.txt` looked stale (I had compared it against the stale
local index instead of `origin/main`); and the divergence count read backwards.
Every one of those would have been a fabricated finding. Build the control first.

---

## 7. Afternoon-wasters

- **`publish.mjs` does not do what its header says.** The docstring reads *"copies
  the Vite build output (source/dist) to the repo root, which is the deployable
  artifact"*; the code sets `repoRoot` to `…/old-design`. **`npm run publish:root`
  publishes to the archived route, not the front door.** The script name, the npm
  script name, and the comment all lie in the same direction.
- **Editing `source/` cannot change `/`.** `source/` builds `/old-design/`. The
  front door is a Next.js export with no source in this repo. If you are asked to
  change the live site's copy or layout, **find the Next.js project first** — it is
  not here.
- **`git ls-files` and the working tree are 4 commits stale.** Asset hashes differ
  between the local checkout and production, and the local one 404s:
  `_next/static/chunks/app/page-188815e30831394c.js` (local) → **404**;
  `…page-e4740155eb55eeb0.js` (`origin/main` and live) → 200. Reading the local tree
  to answer "what is deployed" gives a wrong answer that looks right.
- **`git ls-files <path>` exits 0 when nothing matches.** It prints nothing and
  succeeds, so `if git ls-files foo; then …` is always true. Use
  `git ls-tree -r --name-only origin/main | grep -c …`, or
  `git ls-files --error-unmatch <path>` which does exit non-zero.
- **`source/` is served, so "it's only in source" is false.** 2.8 MB
  `josh.jpg` is a public download at `/source/src/assets/josh.jpg`; `a1dc602` took
  the trouble to optimize the redesign portrait *"2.8MB -> 160KB"* and the unoptimized
  original is still published under `source/`.
- **Two hosts, one artifact.** Checking `joshedwards237.github.io` and declaring
  the deploy done leaves `joshuaedwards.me` unverified. They are independent
  pipelines over the same bytes.
- **The content README points at a deleted component.** Follow `src/lib/updates.ts`,
  not `src/components/Timeline.tsx`.
- **`source/.gitignore` contains `%USERPROFILE%/`** — a literal Windows variable,
  added because `source/%USERPROFILE%/npm-cache/_update-notifier-last-checked` was
  once committed. Running npm here from a shell that does not expand that variable
  recreates the directory.
- **`black`/`ruff`/`mypy`/`pytest` do not apply.** There is no test suite and no
  linter. `tsc` inside `npm run build` is the only gate, plus `validate-content.mjs`.

---

## 8. Current state and open questions

**State.** `origin/main` = `08ee6ce` (2026-10-08, PR #40). 96 commits, 95 tracked
files on `origin/main`, 154 paths ever added across all refs, first commit
2025-01-07. Both hosts live and serving. No open PRs. All branches merged.

**Live defect — the §6.1 incident has recurred.** PR #40 (today) added three Lab
Notes and rebuilt only `/old-design/`:

```
added     source/src/content/updates/2026-10-06-agent-entry-points.json
added     source/src/content/updates/2026-10-07-pdf-signatures-teams.json
added     source/src/content/updates/2026-10-07-workspace-domain-cutover.json
renamed   old-design/assets/main.ZK3RI7OV.js
modified  old-design/index.html
```

Root `index.html` and `_next/` were untouched. Verified against the running site:
all three entries are present in `/old-design/assets/main.ZK3RI7OV.js` and **absent
from the root front door**. The Lab Notes pipeline now publishes to the archived
site only. Three days of content is live where nobody looks.

**Open questions — left open deliberately.**

1. **Where is the Next.js project that builds `/`?** Not in this repo, on any ref.
   Until it is located, the live site cannot be changed or rebuilt. Note the
   precedent: Lab Note `2026-07-03-site-rebuild` records *"The original source was
   lost, so I reconstructed the full React/TypeScript project from the production
   bundle."* **That loss has recurred for the redesign**, and `source/` is itself
   the reconstruction from the previous loss.
2. **Is the Lab Notes pipeline meant to feed `/old-design/`, or is that the bug?**
   Either `publish.mjs` should target the front door, or the pipeline should target
   the Next project. The current arrangement writes content to an archive.
3. **Do the `HOSTINGER_FTP_*` GitHub Actions secrets still exist?** The workflow
   that used them was deleted in `83c400f`; repository secrets outlive workflows.
   I could not read them (`/actions/secrets` → 403, insufficient token scope). If
   they are still configured they are live FTP credentials with no consumer.
4. **How exactly does Hostinger pull?** "Hostinger Git deploy" is named in a commit
   message and nowhere else — no config in the repo. Trigger, branch and
   authentication are unknown, so nobody can predict or re-run that deploy.
5. **Should `source/` be published at all?** It costs a 2.8 MB public image, a
   stale internal design proposal, and the whole TSX tree. A `.gitignore` cannot
   fix it — the files are tracked. Moving them out of the Pages root (or to a
   separate repo) is the only remedy, and it is a judgement call, not a defect.
6. **Secret scanning and push protection are not enabled** (`/secret-scanning/alerts`
   → 404). For a public repo whose root is a web root, that is the cheapest
   available guard and it is off.
7. **`index.txt` is a Next.js RSC flight payload served publicly.** Benign today
   (it echoes the theme-bootstrap inline script and meta tags). It will faithfully
   publish whatever the next build puts in server component output.

---

## 9. Five-command orientation

Each of these was executed against this repo; expected output is shown. Run them
in order from the repo root.

```bash
cd /Users/joshuaedwards/Development/personal/joshedwards237.github.io
```

**C1 — how stale am I, really?** The local tracking ref is not trustworthy, so
compare against the remote directly.

```bash
git status -sb
git rev-list --left-right --count origin/main...HEAD |
  awk '{print "  tracking-ref says: origin/main ahead "$1", local ahead "$2}'
printf '  local origin/main : %s\n  TRUE  origin/main : %s\n' \
  "$(git rev-parse origin/main)" "$(git ls-remote origin refs/heads/main | cut -f1)"
```
Observed: `## main...origin/main [behind 2]`, tracking-ref `origin/main ahead 2`,
and the two SHAs **differ** (`f7133dc…` vs `08ee6ce…`) — local `HEAD` is 4 behind
the real `main`. Left is `origin/main`; a non-zero left means **you** are behind.

**C2 — is what I can read the same as what is deployed?**

```bash
diff <(git show origin/main:index.html | grep -oE '_next/static/[A-Za-z0-9/._-]+' | sort -u) \
     <(curl -sS -L https://joshedwards237.github.io/ | grep -oE '_next/static/[A-Za-z0-9/._-]+' | sort -u) \
  && echo "  live root == origin/main root" \
  || echo "  DRIFT: live root differs from the ref you are reading"
```
Observed: `live root == origin/main root` — the tracking ref matches live even
though it is 2 commits stale, because PR #40 never rebuilt the root. That equality
**is** the §8 defect, not reassurance.

**C3 — the standing PII exposure. Counts only; never prints a value.**

```bash
git show origin/main:old-design/joshua-edwards-resume.pdf > /tmp/r.pdf
pdftotext /tmp/r.pdf /tmp/r.txt
printf '  phone-shaped strings : %s\n' "$(grep -oE '\(?[0-9]{3}\)?[ .-][0-9]{3}[ .-][0-9]{4}' /tmp/r.txt | wc -l | tr -d ' ')"
printf '  @gmail.com addresses : %s\n' "$(tr -d '[:space:]' < /tmp/r.txt | grep -oE '@gmail\.com' | wc -l | tr -d ' ')"
printf '  street addresses     : %s\n' "$(grep -oiE '[0-9]{2,6} +[A-Za-z]+ +(st|ave|rd|dr|ln|ct|way|blvd)\b' /tmp/r.txt | wc -l | tr -d ' ')"
printf '  copies on origin/main: %s\n' "$(git ls-tree -r --name-only origin/main | grep -c 'resume.*\.pdf')"
rm -f /tmp/r.pdf /tmp/r.txt
```
Observed: `1`, `1`, `0`, `2`. The `tr -d '[:space:]'` is load-bearing — the PDF
splits the address across two text lines, so a line-wise grep reports `0` and the
check passes while the address is published. Controls: the same two greps against
a file reading `nothing here` return `0` and `0`.

**C4 — prove that `source/` is public.** Run this before arguing anything is
"internal".

```bash
for p in source/src/components/Home.tsx source/DESIGN_PROPOSAL.md \
         source/public/joshua-edwards-resume.pdf source/src/assets/josh.jpg; do
  printf '  %-45s ' "$p"
  curl -sS -o /dev/null -w '%{http_code} %{size_download}B\n' -L "https://joshedwards237.github.io/$p"
done
```
Observed: `200` for all four (26 577 B, 3 402 B, 169 313 B, 2 796 207 B).

**C5 — secret sweep over every blob on every ref**, not just the working tree.

```bash
git rev-list --objects --all | awk '{print $1}' | git cat-file --batch-check --buffer \
  | awk '$2=="blob"{print $1}' \
  | while read -r b; do git cat-file blob "$b" 2>/dev/null \
      | LC_ALL=C grep -aoE 'AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|ghp_[0-9A-Za-z]{36}|github_pat_[0-9A-Za-z_]{22,}|sk-ant-[A-Za-z0-9_-]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}|pat[A-Za-z0-9]{14}\.[a-f0-9]{64}|-----BEGIN [A-Z ]*PRIVATE KEY-----|G-[A-Z0-9]{10}|UA-[0-9]{4,10}-[0-9]'; done \
  | sort -u | sed 's/^/  HIT: /'
echo "  (no HIT lines = clean)"
```
Observed: clean, 0 hits, over 700 objects / 303 blobs. Keep the patterns
**case-sensitive** — a case-insensitive run matches CSS custom properties
(`--g-destructive`) and npm `sha512-` integrity fragments and buries the signal in
104 false positives.

---

## Appendix — secret and PII audit, full result

Scope: every blob reachable from every ref (700 objects, 303 text-candidate blobs)
for the history through `f7133dc`, plus the two commits beyond it (`33ec61e`,
`08ee6ce`) reviewed through the GitHub API — 5 changed files, 3 of them new JSON
Lab Notes, all read and all clean. No values are reproduced below.

**Clean.** No `.env` at any path on any ref. No API keys, tokens, PATs, private
keys or JWTs. No service-account or credential files. No analytics or tag-manager
IDs, no third-party trackers. No GPS in either published photo (`portrait.jpg`,
`josh.jpg` — proper EXIF parse, positive and negative controls passed; a
`GPSLatitude` IFD is detectable by this method and neither file has one). No SSN-
or DOB-shaped strings. No street address, in the resume or anywhere else. No
database dumps, no backups. The two `key…`-shaped strings that tripped an Airtable
pattern are `sha512-` integrity fragments inside `source/package-lock.json` — false
positives, confirmed by reading their lines.

**Finding 1 — personal phone number and personal email address published in a PDF,
at four live URLs.** The file is a Google Docs export titled "Master Resume".
Contains one phone-shaped string and one personal `@gmail.com` address in its
header. No street address, no SSN, no DOB.

- Tracked on `origin/main` at **two** paths: `old-design/joshua-edwards-resume.pdf`
  and `source/public/joshua-edwards-resume.pdf`.
- Reachable on **both** hosts, so four live URLs, all `200`:
  `{joshedwards237.github.io, joshuaedwards.me}` × `{/old-design/…, /source/public/…}`.
- Present on all refs since `c4a8deb` (2026-08-02); renamed from the repo root to
  `old-design/` by `a04b68e`. **Deleting it will not unpublish it** — it stays in
  public history and the blob stays fetchable by SHA.
- The site's own on-page contact was deliberately moved off that gmail address to
  one on the `joshuaedwards.me` domain in `3a071f5`. The resume predates that change
  and still carries the old one, so the address the owner chose to retire is still
  being served.
- Verified the live HTML and JS carry no `@gmail.com` on any route — the exposure is
  **only** inside the PDF.

**Finding 2 — a personal Calendly booking handle is still live** on the archived
route, in `/old-design/assets/main.ZK3RI7OV.js` (2 occurrences) and in
`source/src/components/Home.tsx`. Added deliberately as a CTA in `c43281e`; it is
absent from the current front door. Whether a booking link should remain live on a
page that is no longer the front door is a decision, not a defect.

**Finding 3 — draft/internal content published.** `source/DESIGN_PROPOSAL.md` is an
internal design argument, served at a public URL and still labelled "proposal, not
yet implemented" after being implemented. Low harm; it is articulate and
unembarrassing. Flagged because it was never written for an audience.

**Finding 4 — superseded personal facts remain in history.** A GPA was published,
corrected (`9563aae`), then removed in favour of the honour (`4f608cd`). Both
values remain publicly readable in the commit history. No action is possible short
of a history rewrite; recorded so it is not rediscovered as news.

**Not a leak, but worth knowing:** `.github/workflows/deploy.yml` referenced
`secrets.HOSTINGER_FTP_SERVER/USER/PASSWORD` by name only — no values were ever
committed. The names tell an observer that FTP credentials for the hosting account
exist. See §8, open question 3.
