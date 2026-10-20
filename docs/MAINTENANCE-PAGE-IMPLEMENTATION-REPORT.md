# تقرير تنفيذ صفحة صيانة مكيفات بالرياض — Cool Air (المرحلة الثالثة)

**تاريخ التقرير:** 20 أكتوبر 2026  
**المشروع:** كول إير — Cool Air ([https://coolairriyadh.com/](https://coolairriyadh.com/))  
**الخدمة المستهدفة:** صيانة وإصلاح المكيفات بالرياض  
**المسار النهائي للصفحة:** `air-conditioner-maintenance-riyadh/index.html`  
**الرابط المعتمد (Canonical URL):** [https://coolairriyadh.com/air-conditioner-maintenance-riyadh/](https://coolairriyadh.com/air-conditioner-maintenance-riyadh/)

---

## 1. نظرة عامة والالتزام بالقيود الأساسية
تم بناء صفحة خدمة مستقلة ومتكاملة لخدمة **«صيانة مكيفات بالرياض»** بما يتطابق مع بنية المشروع الفعلية والهوية البصرية ونظام التصميم المعتمد لموقع Cool Air:
1. **الالتزام بمسار الجذر المباشر:** الصفحة أُنشئت داخل المجلد المباشر `air-conditioner-maintenance-riyadh/index.html` تحت جذر الموقع تماماً، **دون إنشاء مجلد `services/`** تماشياً مع التعليمات الصارمة.
2. **استخدام الأصول المشتركة والمسارات الجذرية:** استخدام نفس ملف الستايل المحلي المجمّع `/css/style.css`، وملفات الجافاسكريبت `/js/config.js` و`/js/main.js`، والخطوط المحلية Cairo، مع استخدام مسارات جذرية تبدأ بـ `/` لضمان عدم البحث عن الموارد داخل المجلد الفرعي.
3. **عدم استخدام Tailwind CDN:** الاعتماد كلياً على بيئة Tailwind CSS v3 المحلية بعد تحديث `tailwind.config.js` لتضمين مسار الصفحة وتوليد الستايلات المينيفايد بنجاح.
4. **تثبيت وسيلة التواصل المعتمدة:** تضمين رقم الهاتف الموحد `01210568977` ورابط الواتساب الدولي `201210568977` في شريط التنقل، وأزرار الحث على اتخاذ القرار (CTAs)، والفوتر، مع الزرين العائمين (Floating Action Buttons).
5. **المحتوى العربي المتخصص والحيادي:** صياغة محتوى فني دقيق بدون ادعاءات قطعية غير مثبتة، والتركيز على التشخيص الميداني قبل الإصلاح وتوضيح التكلفة ونطاق العمل مسبقاً.

---

## 2. الملفات التي أُنشئت والتي عُدّلت

### أ. الملفات التي أُنشئت:
1. **`air-conditioner-maintenance-riyadh/index.html`**: ملف الصفحة المستقلة الكاملة لخدمة صيانة المكيفات.
2. **`test-maintenance-page.js`**: ملف اختبار آلي يتحقق من 11 معياراً فنياً وتقنياً وسيوياً للصفحة.
3. **`docs/MAINTENANCE-PAGE-IMPLEMENTATION-REPORT.md`**: هذا التقرير الشامل والمفصل للمرحلة الثالثة.

### ب. الملفات التي عُدّلت:
1. **`tailwind.config.js`**: إضافة مسار `"./air-conditioner-maintenance-riyadh/**/*.html"` ضمن مصفوفة `content`.
2. **`index.html`**:
   - تحديث بطاقة الخدمة الثانية (صيانة وإصلاح المكيفات) في قسم الخدمات (`#services`) لتربط مباشرة بصفحة `/air-conditioner-maintenance-riyadh/` مع زر تفاصيل وزر طلب.
   - تحديث رابط "صيانة وإصلاح المكيفات" في الفوتر ليوجه إلى `/air-conditioner-maintenance-riyadh/`.
3. **`ac-cleaning-riyadh/index.html`**:
   - تحديث بطاقة الصيانة في قسم مقارنة (تنظيف أم صيانة أم فريون) لتربط بـ `/air-conditioner-maintenance-riyadh/`.
   - تحديث بطاقة الصيانة في قسم الخدمات ذات الصلة لتربط بـ `/air-conditioner-maintenance-riyadh/`.
   - تحديث رابط الصيانة في الفوتر ليوجه إلى الرابط الجديد.
4. **`sitemap.xml`**: إضافة رابط الصفحة الجديدة `https://coolairriyadh.com/air-conditioner-maintenance-riyadh/` بأولوية `0.9` وتردد `weekly`.
5. **`package.json`**: تحديث أمر `npm test` ليشمل فحص الصفحة الرئيسية، صفحة التنظيف، وصفحة الصيانة تتابعياً.
6. **`css/style.css`**: إعادة تجميع ملف الستايل المحلي عبر `npm run build` لشمول جميع فئات وأصناف صفحة الصيانة.

---

## 3. مواصفات السيو التقني (Technical SEO) ومحتوى الميتا

| البند | القيمة المنفذة |
| :--- | :--- |
| **Title Tag** | `صيانة مكيفات بالرياض \| فحص وإصلاح الأعطال \| Cool Air` |
| **Meta Description** | `خدمات صيانة مكيفات بالرياض لفحص مشكلات التشغيل وضعف التبريد وتسرب المياه والأعطال. تعرّف على خطوات الفحص وتحديد التكلفة واطلب الخدمة من كول إير.` |
| **Canonical URL** | `https://coolairriyadh.com/air-conditioner-maintenance-riyadh/` |
| **Open Graph Title** | `صيانة مكيفات بالرياض \| فحص وإصلاح الأعطال \| Cool Air` |
| **Open Graph Image** | `https://coolairriyadh.com/assets/images/hero-ac-technician.webp` |
| **Heading Structure** | **H1 واحد فقط:** «صيانة مكيفات بالرياض لفحص الأعطال وتحديد الحل المناسب» |
| **H2 للأقسام** | 10 أقسام رئيسية بعناوين H2 واضحة تلائم نية البحث |
| **H3 للبطاقات والأسئلة** | بطاقات الأعطال الـ 6، والخدمات الـ 8، وأنواع المكيفات الـ 4، والأسئلة الشائعة الـ 8 |
| **Robots Meta** | `index, follow` |
| **Preload Assets** | الخطوط المحلية Cairo 600 و Cairo 400 |
| **الكلمات المستهدفة** | صيانة مكيفات بالرياض (رئيسية)، شركة صيانة مكيفات بالرياض، فني مكيفات بالرياض، فني صيانة مكيفات بالرياض، إصلاح مكيفات بالرياض، تصليح مكيفات الرياض، صيانة مكيفات سبليت بالرياض، فحص أعطال المكيفات بالرياض |

---

## 4. بنية أقسام الصفحة (Page Sections Architecture)

1. **Accessibility Skip Link:** رابط تخطي إلى `#main-content` لدعم قارئات الشاشة وسهولة الوصول.
2. **Navbar (شريط التنقل):** شعار Cool Air، روابط داخلية (`/#top`، `/#services`، `#problems`، `#services-scope`، `#process`، `#pricing`، `#faq`)، زر اتصال مباشر `tel:01210568977`، وزر واتساب، مع قائمة موبايل متجاوبة تعمل بـ ARIA attributes.
3. **Breadcrumb (مسار التنقل):** الرئيسية ← خدمات المكيفات (`/#services`) ← صيانة مكيفات بالرياض.
4. **Hero Section (القسم الرئيسي):** 
   - عنوان H1 الفريد.
   - وصف الخدمة ومنهجية التقييم وتوضيح التكلفة مسبقاً.
   - أزرار الدعوة للاتصال المباشر واستعراض الأعطال الشائعة.
   - صورة LCP رئيسية محسنة بالأبعاد 600x450 وخاصية `fetchpriority="high"` بدون Lazy Loading.
5. **Introduction (المقدمة ومنهجية الفحص):** عنوان «خدمات صيانة المكيفات بحسب العطل وحالة الجهاز» مع إبراز أهمية التشخيص الصحيح لتجنب استبدال قطع غير تالفة.
6. **Common AC Problems (الأعطال الشائعة الستة):**
   - ضعف التبريد.
   - المكيف لا يعمل (مع التنبيه بعدم فتح الأجزاء الكهربائية الخطرة من قبل العميل).
   - تسرب المياه.
   - أصوات أو اهتزازات غير طبيعية.
   - المكيف يفصل ويعمل بصورة متكررة.
   - روائح غير معتادة (دون مزاعم صحية غير مؤكدة).
7. **Maintenance Services Scope (نطاق الصيانة الفعلي):** 8 خدمات تفصيلية (فحص أعطال التشغيل، تشخيص ضعف التبريد، فحص تسرب المياه، فحص المروحة وتدفق الهواء، فحص المكونات الكهربائية والميكانيكية بواسطة فني مؤهل، إصلاح الأعطال المحددة، استبدال قطع الغيار عند الحاجة بعد موافقة العميل، فحص التشغيل بعد الإصلاح).
8. **Types of AC (أنواع المكيفات المشمولة):** سبليت، شباك، دولابي، كاسيت مع تنويه بأن التغطية تتحدد ميدانياً بحسب الجهاز.
9. **Maintenance Process (خطوات الصيانة الـ 5):** استقبال الطلب ← تحديد المعاينة ← تشخيص العطل ← توضيح التكلفة ← التنفيذ ومراجعة التشغيل.
10. **Cleaning vs Maintenance (مقارنة عملية):** توضيح الفرق مع رابط مباشر لصفحة تنظيف المكيفات `/ac-cleaning-riyadh/`.
11. **Why Choose Us (منهجية الخدمة الشفافة):** 6 معايير واقعية تركز على التشخيص وعدم استبدال قطع دون داعٍ وشرح التكلفة مسبقاً.
12. **Pricing & Cost Factors (عوامل التكلفة):** تفصيل العوامل الستة المؤثرة في السعر دون أسعار وهمية مع زر اتصال وزر توجيه لنموذج الاستفسار بالرئيسية `/#inquiry`.
13. **Service Areas (تغطية الرياض):** صياغة واقعية تؤكد أن التغطية تعتمد على النطاق الفعلي والموقع ونوع العمل المطلوب.
14. **Gallery (معرض الصور الفني):** 4 صور حقيقية من مجلد الأصول المحلي بأبعاد محددة وأوصاف بديلة دقيقة وLazy loading.
15. **FAQ Accordion (الأسئلة الشائعة الـ 8):** أداء أكورديون متوافق مع لوحة المفاتيح والـ ARIA (`aria-expanded`, `aria-controls`, `role="region"`).
16. **Related Services (الخدمات ذات الصلة):** بطاقات لخدمات تنظيف المكيفات (تربط بصفحتها المستقلة)، وشحن الفريون، وتمديد النحاس، والتركيب والفك.
17. **Final CTA (القسم الختامي):** عنوان جذاب، أزرار اتصال وواتساب مباشرة برقم `01210568977`.
18. **Footer (الفوتر):** فوتر كول إير الموحد، روابط سليمة بدون روابط مكسورة، رابط خريطة الموقع، وحقوق سنة 2026.
19. **Floating Quick Actions (الأزرار العائمة):** زران عائمان مثبتان أسفل يسار الشاشة للاتصال الهاتفي ومحادثة الواتساب.
20. **Structured Data (JSON-LD):** مصفوفة `@graph` تتضمن `BreadcrumbList` كاملة و`Service` من نوع صيانة وإصلاح المكيفات لمزود الخدمة Cool Air.

---

## 5. حالة شبكة الروابط الداخلية (Internal Linking Status)

- **الربط من الرئيسية `index.html`:**
  - تم تحويل بطاقة الصيانة الثانية في قسم الخدمات إلى رابط تشعبي يقود إلى `/air-conditioner-maintenance-riyadh/`.
  - تم توفير زرين داخل البطاقة: «تفاصيل خدمة صيانة المكيفات» يقود إلى الصفحة الجديدة، و«طلب الخدمة» يقود إلى `/#inquiry`.
  - تم تحديث رابط "صيانة وإصلاح المكيفات" في الفوتر ليقود إلى `/air-conditioner-maintenance-riyadh/`.
- **الربط العكسي من صفحة التنظيف `ac-cleaning-riyadh/index.html`:**
  - تم تحديث زر المقارنة في قسم "تنظيف أم صيانة؟" ليوجه إلى `/air-conditioner-maintenance-riyadh/`.
  - تم تحديث بطاقة صيانة المكيفات في قسم الخدمات ذات الصلة لتوجه إلى `/air-conditioner-maintenance-riyadh/`.
  - تم تحديث رابط الفوتر ليوجه إلى صفحة الصيانة الجديدة.
- **الربط من صفحة الصيانة الجديدة:**
  - روابط علوية وسفلية للصفحة الرئيسية `/` وقسم الخدمات `/#services`.
  - رابط مباشر لصفحة تنظيف المكيفات `/ac-cleaning-riyadh/` في قسم المقارنة وفي قسم الخدمات ذات الصلة وفي الفوتر.
  - جميع الأصول وروابط التصفح تستخدم مسارات تبدأ من الجذر `/` لتجنب أي أخطاء في الروابط النسبية داخل المجلد الفرعي.

---

## 6. حالة خريطة الموقع (Sitemap) وملف Robots

- **ملف `sitemap.xml`:** تم إدراج الرابط النهائي:
  ```xml
  <url>
    <loc>https://coolairriyadh.com/air-conditioner-maintenance-riyadh/</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ```
- **ملف `robots.txt`:** يشير بالفعل إلى `Sitemap: https://coolairriyadh.com/sitemap.xml` ويسمح بفهرسة الموارد الأساسية `/css/` و `/js/` و `/assets/`.

---

## 7. حالة CSS وعملية البناء (Build Process)

- تم إدراج المسار في `tailwind.config.js`:
  ```javascript
  content: [
    "./index.html",
    "./404.html",
    "./ac-cleaning-riyadh/**/*.html",
    "./air-conditioner-maintenance-riyadh/**/*.html",
    "./js/**/*.js",
    "./src/**/*.{html,js}"
  ]
  ```
- تم تنفيذ أمر البناء المصغر:
  ```bash
  npm run build
  ```
- نتيجة البناء:
  - **حالة الخروج:** `0` (Success).
  - **الوقت المستغرق:** 1609ms.
  - **الحجم النهائي للملف:** `css/style.css` بحجم 27.9 كيلوبايت شاملاً كافة الأصناف المستخدمة ومضغوطاً بنسبة ممتازة دون الحاجة لأي مكتبات خارجية أو CDNs.

---

## 8. نتائج الاختبارات الفعلية المؤكدة

تم تشغيل حزمة الفحص الشاملة بواسطة `npm test` والتي نفذت 3 حزم اختبارية متتالية بنجاح تام 100%:

### أ. اختبارات التحقق العامة (`test-verify.js`):
- `PASS: js/config.js syntax and configuration export valid`
- `PASS: css/style.css exists (size: 27928 bytes, locally compiled)`
- `PASS: Exactly 1 H1 tag found on page`
- `PASS: dir="rtl" and lang="ar" correctly configured on html element`
- `PASS: Canonical and robots meta tags present`
- `PASS: Structured Data (JSON-LD) present for LocalBusiness/HomeAndConstructionBusiness`
- `PASS: Accessible skip-link present`
- `PASS: All 4 local Cairo font weights present in assets/fonts/ (woff2)`
- `PASS: All hero and gallery images exist in assets/images/`
- `PASS: 404.html exists`
- `PASS: robots.txt exists`
- `PASS: sitemap.xml exists`

### ب. اختبارات صفحة تنظيف المكيفات (`test-cleaning-page.js`):
- `PASS: Exactly 1 H1 tag in service page`
- `PASS: Canonical URL correct`
- `PASS: All asset URLs are root-relative (/css, /js, /assets)`
- `PASS: Floating contact buttons present with 01210568977`
- `PASS: JSON-LD is valid JSON (contains 2 nodes)`
- `PASS: 8 Accessible FAQ accordion items present`
- `PASS: Service page is in sitemap.xml`
- `PASS: robots.txt contains valid sitemap link`

### ج. اختبارات صفحة صيانة المكيفات الجديدة (`test-maintenance-page.js`):
- `PASS: Exactly 1 H1 tag in maintenance page`
- `PASS: Canonical URL correct and absolute`
- `PASS: All asset URLs are properly root-relative (/css/, /js/, /assets/)`
- `PASS: Floating contact buttons present with verified phone 01210568977 and WhatsApp 201210568977`
- `PASS: JSON-LD is valid and contains BreadcrumbList and Service entities`
- `PASS: 8 Accessible FAQ accordion items present`
- `PASS: Common problems and service scope sections exist with target IDs`
- `PASS: Cross-link to /ac-cleaning-riyadh/ present in comparison and related services`
- `PASS: Maintenance page present in sitemap.xml`
- `PASS: index.html links to /air-conditioner-maintenance-riyadh/`
- `PASS: ac-cleaning-riyadh links to /air-conditioner-maintenance-riyadh/`

---

## 9. الاختبارات غير المنفذة والبيانات المطلوبة

### أ. الاختبارات غير المنفذة في هذه البيئة:
- **فحص المتصفح الحقيقي الحي (Live Headless Browser DOM / Network Tab):** نظراً لطبيعة البيئة السريعة لم يتم تشغيل سيرفر حي أو فحص Lighthouse للأداء عبر الإنترنت؛ ومع ذلك تم التأكد برمجياً من كود HTML5 الصالح، والتناسق الهيكلي، وإعدادات التحميل المحسنة للصور LCP ومسارات الخطوط.
- **اختبار النشر الفعلي على استضافة الويب:** حيث لم يُطلب رفع الموقع إلى الاستضافة السحابية أو الخادم الخارجي في هذه المرحلة.

### ب. البيانات الواقعية التي ما زالت مطلوبة من العميل مستقبلاً:
- **صور فوتوغرافية حقيقية إضافية من ورش أو مواقع العمل:** لتوثيق أعمال صيانة محددة واستبدال الصور العامة التوضيحية عند الرغبة.
- **قائمة أنواع المكيفات المعتمدة نهائياً:** تأكيد ما إذا كانت صيانة التكييف المركزي والمخفي (Concealed/Chiller) مشمولة رسمياً ضمن الفريق أم تقتصر على السبليت والشباك والدولابي والكاسيت.
- **تحديد قائمة الأحياء المغطاة فعلياً بالرياض:** لتخصيص محتوى مناطق التغطية مستقبلاً بدقة.

---

## 10. المشكلات التي تم حلها والتي لم يتم حلها
- **المشكلات التي تم حلها بنجاح:**
  - الالتزام التام بعدم إنشاء مجلد `services/` واعتماد مسار المجلد المباشر.
  - تجنب تكرار كود الـ CSS وتوليد كافة الأصناف المطلوبة داخل الباندل المحلي.
  - ضمان سلامة جميع المسارات الجذرية للخطوط والأيقونات والسكربتات من داخل المجلد الفرعي.
  - اكتمال شبكة الربط الداخلي بين الصفحة الرئيسية، صفحة التنظيف، وصفحة الصيانة الجديدة.
  - تطبيق رقم الاتصال المعتمد `01210568977` والزرين العائمين بدقة.
- **المشكلات المعلقة:** لا توجد مشكلات فنية أو أخطاء برمجية معلقة في المشروع.

---

## 11. الخطوة التالية المقترحة
- **المرحلة الرابعة:** بناء صفحات الخدمات التالية بنفس المنهجية (مثل صفحة «شحن فريون المكيفات بالرياض» أو «تمديد نحاس المكيفات بالرياض») لتعزيز الترابط العنقودي (Topic Cluster) لموقع Cool Air في الرياض.
