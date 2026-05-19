#!/usr/bin/env node
/**
 * Patches Payload's bin/loadEnv.js to work with Next 16's @next/env package.
 *
 * Background: Payload 3.84.1 was compiled with `import x from '@next/env'`
 * (default import). Next 16's @next/env has no default export — only named
 * exports. The result: `Cannot destructure property 'loadEnvConfig' of
 * import_env.default as it is undefined`.
 *
 * Fix: change the default import to a namespace import.
 *
 * Idempotent — safe to re-run. Runs from `prepare` (after `pnpm install`).
 * Remove this file once Payload ships a fix upstream.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { glob } from "node:fs/promises";

const FROM = `import nextEnvImport from '@next/env';\nimport { findUpSync } from '../utilities/findUp.js';\nconst { loadEnvConfig } = nextEnvImport;`;
const TO = `import * as nextEnvImport from '@next/env';\nimport { findUpSync } from '../utilities/findUp.js';\nconst { loadEnvConfig } = nextEnvImport;`;

// Use a glob to find the loadEnv.js — pnpm path includes a hash so exact
// path is hard to predict.
const candidates = [];
for await (const match of glob(
  "node_modules/.pnpm/payload@*/node_modules/payload/dist/bin/loadEnv.js"
)) {
  candidates.push(match);
}

if (candidates.length === 0) {
  // Payload not installed yet — nothing to do.
  process.exit(0);
}

let patched = 0;
let alreadyOk = 0;

for (const file of candidates) {
  if (!existsSync(file)) continue;
  const src = readFileSync(file, "utf8");
  if (src.includes(TO)) {
    alreadyOk++;
    continue;
  }
  if (!src.includes(FROM)) {
    console.warn(`[patch-payload-loadenv] Unexpected content in ${file}; skipping.`);
    continue;
  }
  writeFileSync(file, src.replace(FROM, TO), "utf8");
  patched++;
}

if (patched > 0) {
  console.log(
    `[patch-payload-loadenv] Patched ${patched} file(s). (${alreadyOk} already current.)`
  );
}
