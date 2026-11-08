import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const schemaDataPath = path.join(rootDir, 'schema-data.json');
if (!fs.existsSync(schemaDataPath)) {
  console.error('schema-data.json not found!');
  process.exit(1);
}

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

  // Check script tag occurrences
  const scriptMatches = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  if (!scriptMatches) {
    pageErrors.push('No application/ld+json script tag found');
  } else if (scriptMatches.length > 1) {
    pageErrors.push(`Multiple application/ld+json script tags found (${scriptMatches.length})`);
  } else {
    // Extract JSON
    const jsonStr = scriptMatches[0].replace(/<script\s+type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      pageErrors.push(`JSON parse error: ${e.message}`);
    }

    if (parsed) {
      // Must have @context and @graph
      if (parsed['@context'] !== 'https://schema.org') {
        pageErrors.push(`Invalid @context: ${parsed['@context']}`);
      }
      if (!Array.isArray(parsed['@graph'])) {
        pageErrors.push('@graph is missing or not an array');
      } else {
        const graph = parsed['@graph'];
        const entityTypes = graph.map(e => e['@type']);

        // Check each entity in graph
        for (const entity of graph) {
          if (!entity['@type']) {
            pageErrors.push(`Entity missing @type`);
          }
          if (!entity['@id']) {
            pageErrors.push(`Top-level entity of type ${entity['@type']} missing @id`);
          }

          // Check forbidden properties deeply
          const checkForbidden = (obj, pathStr) => {
            if (!obj || typeof obj !== 'object') return;
            for (const key of Object.keys(obj)) {
              if (forbiddenKeys.includes(key)) {
                pageErrors.push(`Forbidden property '${key}' found at ${pathStr}.${key}`);
              }
              if (key === 'streetAddress') {
                pageErrors.push(`Forbidden streetAddress found at ${pathStr}.${key}: ${obj[key]}`);
              }
              if (key === 'author') {
                if (obj[key]['@type'] === 'Person') {
                  pageErrors.push(`Forbidden author type Person found at ${pathStr}.${key}`);
                }
              }
              checkForbidden(obj[key], `${pathStr}.${key}`);
            }
          };
          checkForbidden(entity, entity['@type'] || 'Entity');

          // Check breadcrumbs
          if (entity['@type'] === 'BreadcrumbList') {
            if (!Array.isArray(entity.itemListElement) || entity.itemListElement.length === 0) {
              pageErrors.push(`BreadcrumbList missing itemListElement array`);
            } else {
              entity.itemListElement.forEach((item, idx) => {
                if (item.position !== idx + 1) {
                  pageErrors.push(`Breadcrumb position mismatch at index ${idx}: expected ${idx + 1}, got ${item.position}`);
                }
                if (!item.name || !item.item) {
                  pageErrors.push(`Breadcrumb item at position ${item.position} missing name or item URL`);
                }
              });
            }
          }

          // Check BlogPosting
          if (entity['@type'] === 'BlogPosting') {
            if (!entity.datePublished || !/^\d{4}-\d{2}-\d{2}$/.test(entity.datePublished)) {
              pageErrors.push(`BlogPosting invalid datePublished: ${entity.datePublished}`);
            }
            if (!entity.dateModified || !/^\d{4}-\d{2}-\d{2}$/.test(entity.dateModified)) {
              pageErrors.push(`BlogPosting invalid dateModified: ${entity.dateModified}`);
            }
            if (!entity.author || entity.author['@id'] !== 'https://coolairriyadh.com/#business') {
              pageErrors.push(`BlogPosting author does not link to #business`);
            }
            if (!entity.publisher || entity.publisher['@id'] !== 'https://coolairriyadh.com/#business') {
              pageErrors.push(`BlogPosting publisher does not link to #business`);
            }
          }

          // Check FAQPage
          if (entity['@type'] === 'FAQPage') {
            if (!Array.isArray(entity.mainEntity) || entity.mainEntity.length === 0) {
              pageErrors.push(`FAQPage missing or empty mainEntity`);
            } else {
              entity.mainEntity.forEach((q, idx) => {
                if (q['@type'] !== 'Question' || !q.name || !q.acceptedAnswer || q.acceptedAnswer['@type'] !== 'Answer' || !q.acceptedAnswer.text) {
                  pageErrors.push(`FAQ question ${idx} missing question or answer structure`);
                }
              });
            }
          }
        }
      }
    }
  }

  if (pageErrors.length === 0) {
    passedPages++;
    results.push({ file: page.file, status: 'PASS', entities: scriptMatches ? 'Valid Graph' : 'N/A' });
  } else {
    totalErrors += pageErrors.length;
    results.push({ file: page.file, status: 'FAIL', errors: pageErrors });
  }
}

console.log('='.repeat(60));
console.log(`SCHEMA VALIDATION SUMMARY: ${passedPages}/${data.pages.length} Pages Passed`);
console.log('='.repeat(60));

results.forEach(r => {
  if (r.status === 'PASS') {
    console.log(`[PASS] ${r.file}`);
  } else {
    console.error(`[FAIL] ${r.file}:`);
    r.errors.forEach(err => console.error(`   - ${err}`));
  }
});

console.log('='.repeat(60));
if (totalErrors === 0 && passedPages === data.pages.length) {
  console.log('ALL SCHEMA TESTS PASSED 100%!');
  process.exit(0);
} else {
  console.error(`VALIDATION FAILED with ${totalErrors} errors.`);
  process.exit(1);
}

