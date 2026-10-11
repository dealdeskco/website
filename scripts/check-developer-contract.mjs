#!/usr/bin/env node
/**
 * Keeps the developer docs from drifting from the API. Every REST endpoint (method + path) and every
 * MCP tool in data/developer-contract.json -- a copy of the app's own generated contract -- must
 * appear in the developer docs of EVERY locale, or the build fails and says what is missing where.
 *
 *   endpoint: a heading such as  ### `GET /library/sources/{id}`  (":id" in the contract is "{id}")
 *   tool:     its name in backticks, e.g. `search_library`
 *
 * Runs as `prebuild`, so `npm run build` (and the deploy workflow) cannot skip it.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'data/developer-contract.json'), 'utf8'));

// The default locale's docs, then every translated locale that has developer docs.
const dirs = {en: path.join(root, 'developers')};
const i18n = path.join(root, 'i18n');
for (const loc of fs.existsSync(i18n) ? fs.readdirSync(i18n) : []) {
  const d = path.join(i18n, loc, 'docusaurus-plugin-content-docs-developers/current');
  if (fs.existsSync(d)) dirs[loc] = d;
}
// Every locale the site builds must have them: a locale without developer docs is drift too.
const config = fs.readFileSync(path.join(root, 'docusaurus.config.ts'), 'utf8');
const locales = (config.match(/locales:\s*\[([^\]]*)\]/)?.[1] || '').match(/'([^']+)'/g)?.map((s) => s.slice(1, -1)) || ['en'];

const read = (dir) =>
  fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f)).map((f) => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');

const problems = [];
for (const loc of locales) {
  if (!dirs[loc]) {
    problems.push(`${loc}: no developer docs (expected i18n/${loc}/docusaurus-plugin-content-docs-developers/current)`);
    continue;
  }
  const text = read(dirs[loc]);
  const headings = new Set(
    [...text.matchAll(/^#{2,4}\s+`(GET|POST|PUT|PATCH|DELETE) (\/[^`\s]*)`\s*$/gm)].map((m) => `${m[1]} ${m[2]}`),
  );
  for (const a of contract.api) {
    const p = a.path.replace(/^\/api\/v1/, '').replace(/:(\w+)/g, '{$1}');
    if (!headings.has(`${a.method} ${p}`)) problems.push(`${loc}: endpoint ${a.method} ${p} (${a.name}, scope ${a.scope}) has no "### \`${a.method} ${p}\`" heading`);
  }
  for (const t of contract.mcp.tools) {
    if (!text.includes('`' + t.name + '`')) problems.push(`${loc}: MCP tool \`${t.name}\` is not documented`);
  }
}

if (problems.length) {
  console.error(`Developer docs are out of step with data/developer-contract.json (${problems.length}):`);
  for (const p of problems) console.error('  - ' + p);
  console.error('Document each one in developers/ and its translations, or update the contract copy if the API changed.');
  process.exit(1);
}
console.log(`Developer docs cover all ${contract.api.length} endpoints and ${contract.mcp.tools.length} MCP tools in ${locales.join(', ')}.`);
