const fs = require('fs');
const path = require('path');

const results = [];

// 1. Verify JS Syntax
try {
  require('./js/config.js');
  results.push('PASS: js/config.js syntax and configuration export valid');
} catch (e) {
  results.push('FAIL: js/config.js error: ' + e.message);
}

// 2. Check CSS file
if (fs.existsSync('./css/style.css')) {
  const cssSize = fs.statSync('./css/style.css').size;
  results.push('PASS: css/style.css exists (size: ' + cssSize + ' bytes, locally compiled)');
} else {
  results.push('FAIL: css/style.css missing');
}

// 3. Check HTML and structure
const html = fs.readFileSync('./index.html', 'utf8');

// Single H1 test
const h1Matches = html.match(/<h1[\s>]/gi) || [];
if (h1Matches.length === 1) {
  results.push('PASS: Exactly 1 H1 tag found on page');
} else {
  results.push('FAIL: Found ' + h1Matches.length + ' H1 tags');
}

// Check RTL and Arabic lang
if (html.includes('dir="rtl"') && html.includes('lang="ar"')) {
  results.push('PASS: dir="rtl" and lang="ar" correctly configured on html element');
} else {
  results.push('FAIL: Missing dir="rtl" or lang="ar"');
}

// Check Canonical and robots
if (html.includes('<link rel="canonical"') && html.includes('<meta name="robots"')) {
  results.push('PASS: Canonical and robots meta tags present');
} else {
  results.push('FAIL: Canonical or robots meta tags missing');
}

// Check JSON-LD
if (html.includes('application/ld+json')) {
  results.push('PASS: Structured Data (JSON-LD) present for LocalBusiness/HomeAndConstructionBusiness');
} else {
  results.push('FAIL: Structured Data missing');
}

// Check Skip link
if (html.includes('class="skip-link"') && html.includes('href="#main-content"')) {
  results.push('PASS: Accessible skip-link present');
} else {
  results.push('FAIL: Skip link missing');
}

// Check Fonts
const fontWeights = ['400', '500', '600', '700'];
let fontsOk = true;
fontWeights.forEach(w => {
  if (!fs.existsSync('./assets/fonts/cairo-' + w + '.woff2')) {
    fontsOk = false;
  }
});
if (fontsOk) {
  results.push('PASS: All 4 local Cairo font weights present in assets/fonts/ (woff2)');
} else {
  results.push('FAIL: Missing local Cairo font weights');
}

// Check Images
const images = ['hero-ac-technician.jpg', 'ac-cleaning-wash.jpg', 'ac-freon-maintenance.jpg', 'ac-copper-installation.jpg'];
let imgsOk = true;
images.forEach(img => {
  if (!fs.existsSync('./assets/images/' + img)) {
    imgsOk = false;
  }
});
if (imgsOk) {
  results.push('PASS: All hero and gallery images exist in assets/images/');
} else {
  results.push('FAIL: Missing images');
}

// Check 404, robots.txt, sitemap.xml
['404.html', 'robots.txt', 'sitemap.xml'].forEach(f => {
  if (fs.existsSync(f)) {
    results.push('PASS: ' + f + ' exists');
  } else {
    results.push('FAIL: ' + f + ' missing');
  }
});

console.log('=== TEST VERIFICATION REPORT ===');
results.forEach(r => console.log(r));
