const fs = require('fs');

const results = [];
function assert(condition, message) {
  if (condition) results.push('PASS: ' + message);
  else results.push('FAIL: ' + message);
}

const pagePath = './ac-cleaning-riyadh/index.html';
assert(fs.existsSync(pagePath), 'ac-cleaning-riyadh/index.html exists');

if (fs.existsSync(pagePath)) {
  const html = fs.readFileSync(pagePath, 'utf8');
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  assert(h1Matches.length === 1, 'Exactly 1 H1 tag in service page');
  assert(html.includes('href="https://coolairriyadh.com/ac-cleaning-riyadh/"'), 'Canonical URL correct');
  
  const relativeAssetMatches = html.match(/(src|href)=["'](?!\/|https?:\/\/|mailto:|tel:|#|data:)[^"']+\.(css|js|webp|png|jpg|svg|woff2)/gi) || [];
  assert(relativeAssetMatches.length === 0, 'All asset URLs are root-relative (/css, /js, /assets)');
  assert(html.includes('01210568977'), 'Floating contact buttons present with 01210568977');
  
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      assert(parsed['@graph'] && parsed['@graph'].length >= 2, 'JSON-LD is valid JSON (contains ' + parsed['@graph'].length + ' nodes)');
    } catch (e) {
      assert(false, 'JSON-LD error: ' + e.message);
    }
  }

  const faqItems = html.match(/class="[^"]*faq-item[^"]*"/gi) || [];
  assert(faqItems.length === 8, '8 Accessible FAQ accordion items present');
}

const sitemap = fs.readFileSync('./sitemap.xml', 'utf8');
assert(sitemap.includes('/ac-cleaning-riyadh/'), 'Service page is in sitemap.xml');

const robots = fs.readFileSync('./robots.txt', 'utf8');
assert(robots.includes('Sitemap: https://coolairriyadh.com/sitemap.xml'), 'robots.txt contains valid sitemap link');

console.log('=== CLEANING PAGE TEST REPORT ===');
results.forEach(r => console.log(r));

const failed = results.filter(r => r.startsWith('FAIL'));
if (failed.length > 0) process.exit(1);
