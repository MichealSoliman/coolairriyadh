import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const schemaDataPath = path.join(rootDir, 'schema-data.json');
const data = JSON.parse(fs.readFileSync(schemaDataPath, 'utf8'));

const forbiddenKeys = [
  'aggregateRating',
  'review',
  'reviews',
  'AggregateOffer',
  'priceRange',
  'geo'
];

let totalErrors = 0;
let passedPages = 0;
const results = [];

for (const page of data.pages) {
  const filePath = path.join(rootDir, page.file);
  const pageErrors = [];

  if (!fs.existsSync(filePath)) {
    pageErrors.push(`File missing: ${page.file}`);
    results.push({ file: page.file, errors: pageErrors });
    totalErrors++;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const scriptMatches = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  if (!scriptMatches) {
    pageErrors.push('No application/ld+json script tag found');
  } else if (scriptMatches.length > 1) {
    pageErrors.push(`Multiple application/ld+json script tags found (${scriptMatches.length})`);
  } else {
    const jsonStr = scriptMatches[0].replace(/<script\s+type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      pageErrors.push(`JSON parse error: ${e.message}`);
    }

    if (parsed) {
      if (parsed['@context'] !== 'https://schema.org') {
        pageErrors.push(`Invalid @context: ${parsed['@context']}`);
      }
      if (!Array.isArray(parsed['@graph'])) {
        pageErrors.push('@graph is missing or not an array');
      } else {
        const graph = parsed['@graph'];
        for (const entity of graph) {
          if (!entity['@type']) pageErrors.push(`Entity missing @type`);
          if (!entity['@id']) pageErrors.push(`Entity missing @id`);

          const checkForbidden = (obj, pathStr) => {
            if (!obj || typeof obj !== 'object') return;
            for (const key of Object.keys(obj)) {
              if (forbiddenKeys.includes(key)) {
                pageErrors.push(`Forbidden property '${key}' found at ${pathStr}.${key}`);
              }
              if (key === 'streetAddress') {
                pageErrors.push(`Forbidden streetAddress found at ${pathStr}.${key}`);
              }
              if (key === 'author' && obj[key]['@type'] === 'Person') {
                pageErrors.push(`Forbidden author type Person found`);
              }
              checkForbidden(obj[key], `${pathStr}.${key}`);
            }
          };
          checkForbidden(entity, entity['@type'] || 'Entity');
        }
      }
    }
  }

  if (pageErrors.length === 0) {
    passedPages++;
    results.push({ file: page.file, status: 'PASS' });
  } else {
    totalErrors += pageErrors.length;
    results.push({ file: page.file, status: 'FAIL', errors: pageErrors });
  }
}

console.log(`Validation result: ${passedPages}/${data.pages.length} pages passed.`);
if (totalErrors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
