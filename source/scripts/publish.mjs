/**
 * publish.mjs — copies the Vite build output (source/dist) to the repo root,
 * which is the deployable artifact (GitHub Pages serves the repo root).
 *
 * Steps:
 *   1. Delete stale compiled bundles at <repo root>/assets (only files that
 *      match main.*.js / main.*.css — never josh.S4J4sZk1.jpg or any other
 *      non-"main.*" file).
 *   2. Copy dist/index.html to <repo root>/index.html.
 *   3. Copy every file in dist/assets/ to <repo root>/assets/.
 *
 * Run via: npm run publish:root  (which runs the build first)
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, "..");        // source/
const distDir = path.join(sourceDir, "dist");           // source/dist
const distAssets = path.join(distDir, "assets");
const repoRoot = path.resolve(sourceDir, "..");         // repo root
const rootAssets = path.join(repoRoot, "assets");

if (!existsSync(distDir) || !existsSync(path.join(distDir, "index.html"))) {
  console.error("dist/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

// 1. Remove old compiled bundles from the root assets folder.
//    Only main.*.js and main.*.css are build artifacts; everything else
//    (e.g. josh.S4J4sZk1.jpg) must be left untouched.
const STALE_BUNDLE = /^main\..+\.(js|css)$/;
if (existsSync(rootAssets)) {
  for (const name of readdirSync(rootAssets)) {
    if (STALE_BUNDLE.test(name)) {
      unlinkSync(path.join(rootAssets, name));
      console.log(`deleted  assets/${name}`);
    }
  }
} else {
  mkdirSync(rootAssets, { recursive: true });
}

// 2. Copy every top-level file in dist/ to the repo root (index.html plus
//    anything from source/public/ like favicon.svg).
for (const name of readdirSync(distDir)) {
  const src = path.join(distDir, name);
  if (statSync(src).isFile()) {
    copyFileSync(src, path.join(repoRoot, name));
    console.log(`copied   ${name}`);
  }
}

// 3. Copy all built assets to the root assets folder.
if (existsSync(distAssets)) {
  for (const name of readdirSync(distAssets)) {
    const src = path.join(distAssets, name);
    if (statSync(src).isFile()) {
      copyFileSync(src, path.join(rootAssets, name));
      console.log(`copied   assets/${name}`);
    }
  }
}

console.log("\nPublish complete — repo root is up to date with the latest build.");
