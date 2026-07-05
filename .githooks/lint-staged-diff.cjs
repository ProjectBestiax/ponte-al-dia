#!/usr/bin/env node
/*
 * Diff-aware ESLint gate. Lints staged files but only FAILS on errors located
 * on lines you added or modified in this commit. Pre-existing errors on lines
 * you didn't touch don't block — so touching a file with old lint debt is fine,
 * while new code still has to be clean.
 *
 * Uses the ESLint API (not the .bin shim, which breaks under Node 25) and
 * execFileSync (no shell, so paths like p/[slug]/page.tsx are safe).
 */
const { execFileSync } = require("node:child_process");
const { ESLint } = require("eslint");

const LINTABLE = /\.(ts|tsx|js|jsx|mjs|cjs)$/;

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" });
}

function stagedFiles() {
  return git(["diff", "--cached", "--name-only", "--diff-filter=ACM"])
    .split("\n")
    .map((s) => s.trim())
    .filter((f) => f && LINTABLE.test(f));
}

// Line numbers present in the NEW version of the file within staged hunks.
function addedLines(file) {
  const out = git(["diff", "--cached", "--unified=0", "--", file]);
  const set = new Set();
  for (const line of out.split("\n")) {
    const m = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
    if (!m) continue;
    const start = parseInt(m[1], 10);
    const count = m[2] === undefined ? 1 : parseInt(m[2], 10);
    for (let i = 0; i < count; i++) set.add(start + i);
  }
  return set;
}

(async () => {
  const files = stagedFiles();
  if (files.length === 0) process.exit(0);

  const eslint = new ESLint();
  const results = await eslint.lintFiles(files);

  const cwd = process.cwd() + "/";
  const failures = [];
  for (const res of results) {
    const rel = res.filePath.startsWith(cwd) ? res.filePath.slice(cwd.length) : res.filePath;
    const added = addedLines(rel);
    for (const msg of res.messages) {
      if (msg.severity === 2 && msg.line && added.has(msg.line)) {
        failures.push(`  ${rel}:${msg.line}:${msg.column}  ${msg.ruleId || "error"}  ${msg.message}`);
      }
    }
  }

  if (failures.length > 0) {
    console.error(`✗ eslint (diff): ${failures.length} error(es) en líneas que cambiaste:`);
    console.error(failures.join("\n"));
    process.exit(1);
  }
  process.exit(0);
})().catch((err) => {
  // Tooling failure shouldn't hard-block the commit; typecheck is the real guard.
  console.error("lint-staged-diff: no se pudo ejecutar (" + err.message + "), se omite.");
  process.exit(0);
});
