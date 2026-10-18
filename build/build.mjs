#!/usr/bin/env node
// Builds the Chrome and Firefox release zips into dist/.
// The version in package.json is the single source of truth. It replaces every
// __VERSION__ placeholder in the manifest templates (build/manifest.<target>.json)
// and the shipped files. The build refuses to run without a matching entry in
// documentation/ReleaseNotes.md.

import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SHARED = ["icons", "public", "scripts"];
const PLACEHOLDER = "__VERSION__";
// Files that must contain the placeholder exactly once.
const STAMPED = [
  "scripts/content.js",
  "public/popup.html",
  "public/error.html",
];
const TARGETS = ["chrome", "firefox"];

function fail(message) {
  console.error(`\nBuild failed: ${message}`);
  process.exit(1);
}

function readVersion() {
  const { version } = JSON.parse(
    readFileSync(join(ROOT, "package.json"), "utf8"),
  );
  if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`invalid version "${version}"`);

  const notes = readFileSync(
    join(ROOT, "documentation/ReleaseNotes.md"),
    "utf8",
  );
  const heading = new RegExp(`^#{1,2} ${version.replaceAll(".", "\\.")}\\s*$`, "m");
  if (!heading.test(notes)) {
    fail(`documentation/ReleaseNotes.md has no entry for ${version}`);
  }
  return version;
}

function countPlaceholders(text) {
  return text.split(PLACEHOLDER).length - 1;
}

function build(target, version) {
  const out = join(DIST, target);
  mkdirSync(out, { recursive: true });

  for (const dir of SHARED) {
    cpSync(join(ROOT, dir), join(out, dir), {
      recursive: true,
      filter: (src) => !/(^|\/)(\.DS_Store|__MACOSX)$/.test(src),
    });
  }

  const files = {
    "manifest.json": readFileSync(
      join(ROOT, `build/manifest.${target}.json`),
      "utf8",
    ),
  };
  for (const file of STAMPED) {
    files[file] = readFileSync(join(out, file), "utf8");
  }

  for (const [file, source] of Object.entries(files)) {
    if (countPlaceholders(source) !== 1) {
      fail(`expected exactly one ${PLACEHOLDER} in ${file} (${target})`);
    }
    writeFileSync(join(out, file), source.replace(PLACEHOLDER, version));
  }

  const zip = join(DIST, `tubemod-${target}-v${version}.zip`);
  // Zipping from inside out/ keeps manifest.json at the zip root; -X drops extra file attributes.
  execFileSync("zip", ["-X", "-r", "-q", zip, "."], { cwd: out });
  return zip;
}

const version = readVersion();
if (existsSync(DIST)) rmSync(DIST, { recursive: true });

console.log(`Building TubeMod ${version}`);
for (const target of TARGETS) {
  console.log(`  ${target}: ${build(target, version)}`);
}
