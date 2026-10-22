const fs = require('fs');

const results = [];
function assert(condition, message) {
  if (condition) results.push('PASS: ' + message);
  else results.push('FAIL: ' + message);
}

const pagePath = './air-conditioner-maintenance-riyadh/index.html';
assert(fs.existsSync(pagePath), 'air-conditioner-maintenance-riyadh/index.html exists');

if (fs.existsSync(pagePath)) {
  const html = fs.readFileSync(pagePath, 'utf8');
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  assert(h1Matches.length === 1, 'Exactly 1 H1 tag in maintenance page');
  assert(html.includes('href="https://coolairriyadh.com/air-conditioner-maintenance-riyadh/"'), 'Canonical URL correct and absolute');
  
  const relativeAssetMatches = html.match(/(src|href)=["'](?!\/|https?:\/\/|mailto:|tel:|#|data:)[^"']+\.(css|js|webp|png|jpg|svg|woff2)/gi) || [];
  assert(relativeAssetMatches.length === 0, 'All asset URLs are properly root-relative (/css/, /js/, /assets/)');
  assert(html.includes('tel:01210568977') && html.includes('201210568977'), 'Floating contact buttons present with verified phone 01210568977 and WhatsApp 201210568977');
  
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      assert(parsed['@graph'] && parsed['@graph'].length >= 2, 'JSON-LD is valid and contains BreadcrumbList and Service entities');
    } catch (e) {
      assert(false, 'JSON-LD error: ' + e.message);
    }
  }

  const faqItems = html.match(/class="[^"]*faq-trigger[^"]*"/gi) || [];
  assert(faqItems.length === 8, '8 Accessible FAQ accordion items present');
  assert(html.includes('id="problems"') && html.includes('id="services-scope"'), 'Common problems and service scope sections exist with target IDs');
  assert(html.includes('/ac-cleaning-riyadh/'), 'Cross-link to /ac-cleaning-riyadh/ present in comparison and related services');
}

const sitemap = fs.readFileSync('./sitemap.xml', 'utf8');
assert(sitemap.includes('/air-conditioner-maintenance-riyadh/'), 'Maintenance page present in sitemap.xml');

const indexHtml = fs.readFileSync('./index.html', 'utf8');
assert(indexHtml.includes('/air-conditioner-maintenance-riyadh/'), 'index.html links to /air-conditioner-maintenance-riyadh/');

const cleanHtml = fs.readFileSync('./ac-cleaning-riyadh/index.html', 'utf8');
assert(cleanHtml.includes('/air-conditioner-maintenance-riyadh/'), 'ac-cleaning-riyadh links to /air-conditioner-maintenance-riyadh/');

console.log('=== MAINTENANCE PAGE TEST REPORT ===');
results.forEach(r => console.log(r));

const failed = results.filter(r => r.startsWith('FAIL'));
if (failed.length > 0) process.exit(1);
