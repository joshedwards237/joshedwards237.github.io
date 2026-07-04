#!/usr/bin/env node
/**
 * Validates every Lab Notes entry in src/content/updates/*.json against the
 * schema documented in src/content/updates/README.md. Runs as the "prebuild"
 * npm script so a malformed entry fails the build before tsc/vite run.
 *
 * Schema:
 *   date      (required) string, YYYY-MM-DD and a real calendar date
 *   type      (required) "shipped" | "research" | "changelog"
 *   title     (required) non-empty string
 *   summary   (required) non-empty string
 *   link      (optional) string
 *   linkLabel (optional) string
 */
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const UPDATES_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "content",
  "updates"
);

const KNOWN_TYPES = ["shipped", "research", "changelog"];
const REQUIRED_STRING_FIELDS = ["date", "type", "title", "summary"];
const OPTIONAL_STRING_FIELDS = ["link", "linkLabel"];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function validateEntry(entry) {
  const errors = [];

  if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
    return ["entry must be a JSON object"];
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof entry[field] !== "string" || entry[field].trim() === "") {
      errors.push(`missing or empty required string field "${field}"`);
    }
  }

  for (const field of OPTIONAL_STRING_FIELDS) {
    if (field in entry && typeof entry[field] !== "string") {
      errors.push(`optional field "${field}" must be a string when present`);
    }
  }

  if (typeof entry.date === "string") {
    if (!DATE_PATTERN.test(entry.date)) {
      errors.push(`"date" must match YYYY-MM-DD (got "${entry.date}")`);
    } else {
      const [year, month, day] = entry.date.split("-").map(Number);
      const parsed = new Date(Date.UTC(year, month - 1, day));
      const isReal =
        parsed.getUTCFullYear() === year &&
        parsed.getUTCMonth() === month - 1 &&
        parsed.getUTCDate() === day;
      if (!isReal) {
        errors.push(`"date" is not a real calendar date ("${entry.date}")`);
      }
    }
  }

  if (typeof entry.type === "string" && !KNOWN_TYPES.includes(entry.type)) {
    errors.push(
      `"type" must be one of ${KNOWN_TYPES.join(", ")} (got "${entry.type}")`
    );
  }

  const knownFields = [...REQUIRED_STRING_FIELDS, ...OPTIONAL_STRING_FIELDS];
  for (const field of Object.keys(entry)) {
    if (!knownFields.includes(field)) {
      errors.push(`unknown field "${field}"`);
    }
  }

  return errors;
}

async function main() {
  let fileNames;
  try {
    fileNames = (await readdir(UPDATES_DIR)).filter((name) =>
      name.endsWith(".json")
    );
  } catch (error) {
    console.error(`validate-content: cannot read ${UPDATES_DIR}: ${error.message}`);
    process.exit(1);
  }

  if (fileNames.length === 0) {
    console.warn("validate-content: no JSON entries found in src/content/updates/");
    return;
  }

  let failed = false;

  for (const name of fileNames.sort()) {
    const filePath = join(UPDATES_DIR, name);
    let entry;
    try {
      entry = JSON.parse(await readFile(filePath, "utf8"));
    } catch (error) {
      console.error(`  FAIL ${name}: invalid JSON (${error.message})`);
      failed = true;
      continue;
    }

    const errors = validateEntry(entry);
    if (errors.length > 0) {
      failed = true;
      console.error(`  FAIL ${name}:`);
      for (const message of errors) {
        console.error(`    - ${message}`);
      }
    } else {
      console.log(`  ok   ${name}`);
    }
  }

  if (failed) {
    console.error("validate-content: one or more Lab Notes entries are invalid.");
    process.exit(1);
  }

  console.log(`validate-content: ${fileNames.length} entries valid.`);
}

main();
