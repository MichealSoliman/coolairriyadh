const fs = require('fs');
const path = require('path');

const results = [];

function assert(condition, message) {
  if (condition) {
    results.push('PASS: ' + message);
  } else {
    results.push('FAIL: ' + message);
  }
}

// 1. Verify freon page exists
const pagePath = './ac-freon-recharging-riyadh/index.html';
assert(fs.existsSync(pagePath), 'ac-freon-recharging-riyadh/index.html exists');

if (fs.existsSync(pagePath)) {
  const html = fs.readFileSync(pagePath, 'utf8');

  // Single H1 test
  const h1Matches = html.match(/<h1[\s>][\s\S]*?<\/h1>/gi) || [];
  assert(h1Matches.length === 1, 'Exactly 1 H1 tag found on freon page');
  if (h1Matches.length === 1) {
    assert(h1Matches[0].includes('شحن فريون مكيفات بالرياض بعد فحص سبب ضعف التبريد'), 'H1 text matches required title');
  }

  // Canonical and robots
  assert(html.includes('<link rel="canonical" href="https://coolairriyadh.com/ac-freon-recharging-riyadh/">'), 'Canonical URL correct and absolute');
  assert(html.includes('<meta name="robots" content="index, follow">'), 'Robots meta tag is index, follow');

  // Meta Title & Description
  assert(html.includes('<title>شحن فريون مكيفات بالرياض | فحص التسرب | Cool Air</title>'), 'Title tag matches specification');
  assert(html.includes('خدمة فحص وشحن فريون المكيفات بالرياض عند الحاجة'), 'Meta description matches specification');

  // OG and Twitter
  assert(html.includes('property="og:url" content="https://coolairriyadh.com/ac-freon-recharging-riyadh/"'), 'Open Graph URL correct');
  assert(html.includes('name="twitter:url" content="https://coolairriyadh.com/ac-freon-recharging-riyadh/"'), 'Twitter URL correct');

  // Root-relative asset URLs
  const relativeAssetMatches = html.match(/(src|href)=["'](?!\/|https?:\/\/|mailto:|tel:|#|data:)[^"']+\.(css|js|webp|png|jpg|svg|woff2)/gi) || [];
  assert(relativeAssetMatches.length === 0, 'All asset URLs are properly root-relative (/css/, /js/, /assets/): ' + (relativeAssetMatches.length ? relativeAssetMatches.join(', ') : 'OK'));

  // Verified contact data
  assert(html.includes('tel:01210568977') && html.includes('201210568977'), 'Floating contact buttons present with verified phone 01210568977 and WhatsApp 201210568977');

  // JSON-LD validation
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      assert(parsed['@graph'] && parsed['@graph'].length >= 2, 'JSON-LD is valid and contains BreadcrumbList and Service entities');
      const hasBreadcrumbs = parsed['@graph'].some(n => n['@type'] === 'BreadcrumbList');
      const hasService = parsed['@graph'].some(n => n['@type'] === 'Service');
      assert(hasBreadcrumbs && hasService, 'JSON-LD contains both BreadcrumbList and Service nodes');
    } catch (e) {
      assert(false, 'JSON-LD is not valid JSON: ' + e.message);
    }
  } else {
    assert(false, 'JSON-LD script missing on freon page');
  }

  // FAQ Accordion (8 items)
  const faqItems = html.match(/class="[^"]*faq-item[^"]*"/gi) || [];
  assert(faqItems.length === 8, '8 Accessible FAQ accordion items present (found: ' + faqItems.length + ')');

  // Check section target IDs
  const requiredIds = ['when-check', 'signs', 'causes', 'process', 'refrigerant-types', 'pricing', 'faq'];
  const allIdsPresent = requiredIds.every(id => html.includes('id="' + id + '"'));
  assert(allIdsPresent, 'All required section IDs present: ' + requiredIds.join(', '));

  // Check cross-links to maintenance and cleaning pages
  assert(html.includes('/air-conditioner-maintenance-riyadh/'), 'Cross-link to /air-conditioner-maintenance-riyadh/ present');
  assert(html.includes('/ac-cleaning-riyadh/'), 'Cross-link to /ac-cleaning-riyadh/ present');

  // Hero image check
  assert(html.includes('/assets/images/ac-freon-maintenance.webp'), 'Primary freon hero image present');
}

// 2. Sitemap check
const sitemap = fs.readFileSync('./sitemap.xml', 'utf8');
assert(sitemap.includes('https://coolairriyadh.com/ac-freon-recharging-riyadh/'), 'Freon page present in sitemap.xml');
assert(sitemap.startsWith('<?xml') && sitemap.includes('</urlset>'), 'sitemap.xml has valid XML structure');

// 3. Link back from index.html
const indexHtml = fs.readFileSync('./index.html', 'utf8');
assert(indexHtml.includes('/ac-freon-recharging-riyadh/'), 'index.html links to /ac-freon-recharging-riyadh/');

// 4. Link back from air-conditioner-maintenance-riyadh
const maintHtml = fs.readFileSync('./air-conditioner-maintenance-riyadh/index.html', 'utf8');
assert(maintHtml.includes('/ac-freon-recharging-riyadh/'), 'air-conditioner-maintenance-riyadh links to /ac-freon-recharging-riyadh/');

// 5. Link back from ac-cleaning-riyadh
const cleanHtml = fs.readFileSync('./ac-cleaning-riyadh/index.html', 'utf8');
assert(cleanHtml.includes('/ac-freon-recharging-riyadh/'), 'ac-cleaning-riyadh links to /ac-freon-recharging-riyadh/');

// 6. Robots.txt check
const robots = fs.readFileSync('./robots.txt', 'utf8');
assert(robots.includes('Sitemap: https://coolairriyadh.com/sitemap.xml'), 'robots.txt points to correct domain sitemap');

console.log('=== FREON PAGE TEST REPORT ===');
results.forEach(r => console.log(r));

const failed = results.filter(r => r.startsWith('FAIL'));
if (failed.length > 0) {
  process.exit(1);
} else {
  console.log('\nALL ' + results.length + ' CHECKS PASSED SUCCESSFULLY!');
}
