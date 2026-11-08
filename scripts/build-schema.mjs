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

function createFaqEntities(faqs, pageUrl) {
  if (!faqs || faqs.length === 0) return null;
  const baseUrl = pageUrl.endsWith('/') ? pageUrl : `${pageUrl}/`;
  return {
    '@type': 'FAQPage',
    '@id': `${baseUrl}#faq`,
    'isPartOf': { '@id': `${baseUrl}#webpage` },
    'mainEntity': faqs.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };
}

function generateGraphForPage(page, data) {
  const graph = [];

  if (page.type === 'home') {
    // 1. Business
    graph.push(data.business);

    // 2. Website
    graph.push(data.website);

    // 3. WebPage
    const webPage = {
      '@type': 'WebPage',
      '@id': `${page.url}#webpage`,
      'url': page.url,
      'name': page.name,
      'description': page.description,
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'about': { '@id': 'https://coolairriyadh.com/#business' },
      'inLanguage': 'ar'
    };
    graph.push(webPage);

    // 4. FAQPage
    if (page.faqs && page.faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': 'https://coolairriyadh.com/#faq',
        'isPartOf': { '@id': 'https://coolairriyadh.com/#webpage' },
        'mainEntity': page.faqs.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a
          }
        }))
      });
    }
  } else if (page.type === 'service') {
    // WebPage
    graph.push({
      '@type': 'WebPage',
      '@id': `${page.url}#webpage`,
      'url': page.url,
      'name': page.serviceName,
      'description': page.description,
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'breadcrumb': { '@id': `${page.url}#breadcrumb` },
      'inLanguage': 'ar'
    });

    // BreadcrumbList
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'الرئيسية',
          'item': 'https://coolairriyadh.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'خدماتنا',
          'item': 'https://coolairriyadh.com/our-services/'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': page.breadcrumbName || page.serviceName,
          'item': page.url
        }
      ]
    });

    // Service entity
    const serviceObj = {
      '@type': 'Service',
      '@id': `${page.url}#service`,
      'name': page.serviceName,
      'serviceType': page.serviceType,
      'description': page.description,
      'provider': { '@id': 'https://coolairriyadh.com/#business' },
      'areaServed': {
        '@type': 'City',
        'name': 'الرياض',
        'addressCountry': 'SA'
      },
      'url': page.url
    };
    if (page.image) {
      serviceObj.image = page.image;
    }
    graph.push(serviceObj);

    // FAQPage if present
    if (page.faqs && page.faqs.length > 0) {
      graph.push(createFaqEntities(page.faqs, page.url));
    }
  } else if (page.type === 'collection') {
    // CollectionPage
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${page.url}#webpage`,
      'url': page.url,
      'name': page.name,
      'description': page.description,
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'about': { '@id': 'https://coolairriyadh.com/#business' },
      'breadcrumb': { '@id': `${page.url}#breadcrumb` },
      'inLanguage': 'ar'
    });

    // BreadcrumbList
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'الرئيسية',
          'item': 'https://coolairriyadh.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': page.breadcrumbName || 'خدماتنا',
          'item': page.url
        }
      ]
    });
  } else if (page.type === 'about') {
    // AboutPage
    graph.push({
      '@type': 'AboutPage',
      '@id': `${page.url}#webpage`,
      'url': page.url,
      'name': page.name,
      'description': page.description,
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'about': { '@id': 'https://coolairriyadh.com/#business' },
      'breadcrumb': { '@id': `${page.url}#breadcrumb` },
      'inLanguage': 'ar'
    });

    // BreadcrumbList
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'الرئيسية',
          'item': 'https://coolairriyadh.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': page.breadcrumbName || 'من نحن',
          'item': page.url
        }
      ]
    });
  } else if (page.type === 'contact') {
    // ContactPage
    graph.push({
      '@type': 'ContactPage',
      '@id': `${page.url}#webpage`,
      'url': page.url,
      'name': page.name,
      'description': page.description,
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'about': { '@id': 'https://coolairriyadh.com/#business' },
      'breadcrumb': { '@id': `${page.url}#breadcrumb` },
      'inLanguage': 'ar'
    });

    // BreadcrumbList
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'الرئيسية',
          'item': 'https://coolairriyadh.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': page.breadcrumbName || 'اتصل بنا',
          'item': page.url
        }
      ]
    });
  } else if (page.type === 'blog') {
    // Blog
    graph.push({
      '@type': 'Blog',
      '@id': `${page.url}#webpage`,
      'url': page.url,
      'name': page.name,
      'description': page.description,
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'publisher': { '@id': 'https://coolairriyadh.com/#business' },
      'breadcrumb': { '@id': `${page.url}#breadcrumb` },
      'inLanguage': 'ar'
    });

    // BreadcrumbList
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'الرئيسية',
          'item': 'https://coolairriyadh.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': page.breadcrumbName || 'المدونة',
          'item': page.url
        }
      ]
    });
  } else if (page.type === 'blogPosting') {
    // BlogPosting
    const blogPosting = {
      '@type': 'BlogPosting',
      '@id': `${page.url}#article`,
      'headline': page.headline,
      'description': page.description,
      'image': page.image,
      'datePublished': page.datePublished,
      'dateModified': page.dateModified,
      'mainEntityOfPage': page.url,
      'author': { '@id': 'https://coolairriyadh.com/#business' },
      'publisher': { '@id': 'https://coolairriyadh.com/#business' },
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'inLanguage': 'ar'
    };
    graph.push(blogPosting);

    // WebPage
    graph.push({
      '@type': 'WebPage',
      '@id': `${page.url}#webpage`,
      'url': page.url,
      'name': page.headline,
      'description': page.description,
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'breadcrumb': { '@id': `${page.url}#breadcrumb` },
      'inLanguage': 'ar'
    });

    // BreadcrumbList
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'الرئيسية',
          'item': 'https://coolairriyadh.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'المدونة',
          'item': 'https://coolairriyadh.com/blog/'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': page.breadcrumbName || page.headline,
          'item': page.url
        }
      ]
    });

    // FAQPage if present
    if (page.faqs && page.faqs.length > 0) {
      graph.push(createFaqEntities(page.faqs, page.url));
    }
  } else if (page.type === 'legal') {
    // WebPage
    graph.push({
      '@type': 'WebPage',
      '@id': `${page.url}#webpage`,
      'url': page.url,
      'name': page.name,
      'description': page.description,
      'isPartOf': { '@id': 'https://coolairriyadh.com/#website' },
      'breadcrumb': { '@id': `${page.url}#breadcrumb` },
      'inLanguage': 'ar'
    });

    // BreadcrumbList
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'الرئيسية',
          'item': 'https://coolairriyadh.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': page.breadcrumbName || page.name,
          'item': page.url
        }
      ]
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

let modifiedCount = 0;

for (const page of data.pages) {
  const filePath = path.join(rootDir, page.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove any existing SCHEMA:START ... SCHEMA:END blocks
  html = html.replace(/<!--\s*SCHEMA:START\s*-->[\s\S]*?<!--\s*SCHEMA:END\s*-->\s*/gi, '');

  // 2. Remove any other loose <script type="application/ld+json">...</script>
  html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>\s*/gi, '');

  // 3. Generate schema object
  const schemaObj = generateGraphForPage(page, data);
  const jsonString = JSON.stringify(schemaObj, null, 2);

  const schemaMarkup = `<!-- SCHEMA:START -->\n<script type="application/ld+json">\n${jsonString}\n</script>\n<!-- SCHEMA:END -->\n`;

  // 4. Inject right before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${schemaMarkup}</head>`);
  } else {
    // Fallback if no </head>
    html += `\n${schemaMarkup}`;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated schema in: ${page.file} (${schemaObj['@graph'].length} entities)`);
  modifiedCount++;
}

console.log(`\nSuccessfully injected Schema into ${modifiedCount} pages.`);
