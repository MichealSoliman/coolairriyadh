const fs = require('fs');
const html = fs.readFileSync('ac-cleaning-riyadh/index.html', 'utf8');
const results = [];

// 1. Single H1
const h1s = html.match(/<h1[\s>]/gi) || [];
results.push(h1s.length === 1 ? 'PASS: Exactly 1 H1 tag in service page' : 'FAIL: ' + h1s.length + ' H1 tags');

// 2. Canonical
results.push(html.includes('href="https://coolairriyadh.com/ac-cleaning-riyadh/"') ? 'PASS: Canonical URL correct' : 'FAIL: Canonical incorrect');

// 3. Root-relative assets
const hasRelativeCss = /href=["']css\//.test(html);
const hasRelativeJs = /src=["']js\//.test(html);
const hasRelativeAssets = /(src|href)=["']assets\//.test(html);
if (!hasRelativeCss && !hasRelativeJs && !hasRelativeAssets) {
  results.push('PASS: All asset URLs are root-relative (/css, /js, /assets)');
} else {
  results.push('FAIL: Found relative asset paths: css=' + hasRelativeCss + ', js=' + hasRelativeJs + ', assets=' + hasRelativeAssets);
}

// 4. Floating buttons and phone number
if (html.includes('floating_call_click') && html.includes('floating_whatsapp_click') && html.includes('01210568977')) {
  results.push('PASS: Floating contact buttons present with 01210568977');
} else {
  results.push('FAIL: Floating buttons missing or incomplete');
}

// 5. JSON-LD
try {
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (jsonLdMatch) {
    const parsed = JSON.parse(jsonLdMatch[1]);
    results.push('PASS: JSON-LD is valid JSON (contains ' + (parsed['@graph'] ? parsed['@graph'].length + ' nodes' : 'schema') + ')');
  } else {
    results.push('FAIL: JSON-LD script not found');
  }
} catch (e) {
  results.push('FAIL: JSON-LD parsing error: ' + e.message);
}

// 6. FAQ Accordion
const faqTriggers = (html.match(/class="[^"]*faq-trigger/g) || []).length;
const faqPanels = (html.match(/class="[^"]*faq-panel/g) || []).length;
if (faqTriggers === 8 && faqPanels === 8) {
  results.push('PASS: 8 Accessible FAQ accordion items present');
} else {
  results.push('FAIL: Expected 8 FAQs, found triggers: ' + faqTriggers + ', panels: ' + faqPanels);
}

// 7. Sitemap check
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
if (sitemap.includes('https://coolairriyadh.com/ac-cleaning-riyadh/')) {
  results.push('PASS: Service page is in sitemap.xml');
} else {
  results.push('FAIL: Service page missing from sitemap.xml');
}

// 8. Robots.txt
const robots = fs.readFileSync('robots.txt', 'utf8');
if (robots.includes('Sitemap: https://coolairriyadh.com/sitemap.xml')) {
  results.push('PASS: robots.txt contains valid sitemap link');
} else {
  results.push('FAIL: robots.txt sitemap link incorrect');
}

console.log('=== AC CLEANING PAGE VERIFICATION ===');
results.forEach(r => console.log(r));
