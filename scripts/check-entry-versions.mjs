// Fails when a plugin entry in the Claude Code catalog carries a version: each plugin's version lives only in its own
// plugin.json, and claude plugin validate checks an entry version only for a relative-path source.
import { readFileSync } from 'node:fs';

const CATALOG_PATH = '.claude-plugin/marketplace.json';

const catalog = JSON.parse(readFileSync(CATALOG_PATH, 'utf8'));
const entriesWithVersion = catalog.plugins.filter((entry) => 'version' in entry).map((entry) => entry.name);

if (entriesWithVersion.length > 0) {
  console.error(`${CATALOG_PATH}: entries with a version: ${entriesWithVersion.join(', ')}`);
  process.exit(1);
}
console.log(`${CATALOG_PATH}: ${catalog.plugins.length} entries, none with a version`);
