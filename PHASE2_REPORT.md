# تقرير إنجاز المرحلة 2: البيانات المنظمة (Structured Data) وتوحيد الهوية (NAP)

**المشروع:** كول إير لخدمات المكيفات بالرياض (Cool Air)  
**النطاق:** `https://coolairriyadh.com/`  
**الفرع الحالي:** `phase-2-schema`  
**التاريخ:** 8 نوفمبر 2026  

---

## 1. الملخص التنفيذي
تم في هذه المرحلة إعادة بناء البنية التحتية للبيانات المنظمة (Structured Data - JSON-LD) وتوحيد بيانات الكيان والاتصال (NAP) عبر صفحات الموقع الـ 16 بالكامل وفق أفضل ممارسات محركات البحث (Google Search Central) وSchema.org.

### أبرز ما تم إنجازه:
1. **بناء رسم بياني دلالي موحد (Unified `@graph`)**:
   - تعريف الكيان التجاري الأساسي مرة واحدة فقط في الصفحة الرئيسية عبر المعرّف الفريد `https://coolairriyadh.com/#business` من نوع `HVACBusiness`.
   - تعريف الموقع الإلكتروني بالمعرّف `https://coolairriyadh.com/#website` من نوع `WebSite`.
   - ربط جميع الصفحات الفرعية والخدمات والمقالات بكيان الشركة والموقع عبر الإشارة الدلالية `{"@id": "..."}` بدلاً من إعادة تعريف الشركة بشكل مكرر ومشتت لمحركات البحث.
2. **تطهير الـ Schema من البيانات الوهمية وغير المؤكدة**:
   - حذف جميع وسوم التقييمات الوهمية (`AggregateRating`) لعدم وجود مراجعات حقيقية معروضة بالموقع (تجنباً لمخالفات Google المانويل penalty).
   - إزالة نطاقات الأسعار غير المؤكدة (`priceRange`).
   - إزالة عنوان الشارع الافتراضي الوهمي ("شارع الملك فهد") والإحداثيات الجغرافية الافتراضية، وتحويل تعريف الكيان إلى نموذج **Service Area Business (SAB)** يغطي مدينة الرياض رسمياً عبر `PostalAddress` و `areaServed`.
3. **توحيد اسم البراند وبيانات الاتصال (Brand & NAP Unification)**:
   - اعتماد الاسم المعتمد والصحيح لغوياً **"كول إير"** (بالهمزة على الياء) في جميع المواضع بدلاً من "كول اير".
   - توحيد وسوم التواصل الاجتماعي والمؤلف: `<meta property="og:site_name" content="كول إير | Cool Air">` و `<meta name="author" content="كول إير | Cool Air">` عبر الـ 16 صفحة.
   - توحيد الصيغة التقنية للاتصال الهاتفي إلى المعيار الدولي `tel:+966558577619` مع بقاء النص الظاهري للمستخدم `0558577619`.
4. **توليد السكيما وأتمتتها آلياً**:
   - إنشاء ملف مرجعي موحد للبيانات `schema-data.json`.
   - برمجة سكربت توليد السكيما وحقنها `scripts/build-schema.mjs`.
   - برمجة سكربت فحص ومطابقة السكيما `scripts/validate-schema.mjs`.
   - إضافة أوامر التشغيل لملف `package.json`: `npm run schema` و `npm run schema:validate`.
5. **معالجة تتبع Google Analytics 4**:
   - استجابةً لطلب العميل الصريح: تم استبعاد أكواد تتبع الاتصال، ولعدم وجود معرّف قياس GA4، تم إنشاء دليل التوثيق المستقل `TODO_ANALYTICS.md` دون المساس بملفات الـ HTML.

---

## 2. جدول المقارنة الشامل (قبل وبعد) للـ Structured Data

| الصفحة | الحالة قبل التعديل | الحالة بعد التعديل (المعتمدة) | النتيجة والفائدة لمحركات البحث |
| :--- | :--- | :--- | :--- |
| `index.html` | كتلة واحدة تحوي `HVACBusiness` مع تقييم وهمي، عنوان شارع وهمي، ساعات وهمية، وأسعار غير مؤكدة. | كتلة واحدة `@graph` تحوي: `HVACBusiness`، `WebSite`، `WebPage`، `FAQPage` (8 أسئلة). | تعريف الكيان الرئيسي للعلامة التجارية والموقع وحذف المخالفات. |
| `our-services/index.html` | تكرار تعريف `HVACBusiness` مع مسار تنقل ناقص ومكرر. | كتلة واحدة `@graph` تحوي: `CollectionPage`، `BreadcrumbList` (الرئيسية > خدماتنا) مرتبطة بـ `#business`. | صفحة تجميعية رسمية لخدمات التكييف. |
| `about-us/index.html` | تكرار تعريف `HVACBusiness` مع بيانات غير مؤكدة. | كتلة واحدة `@graph` تحوي: `AboutPage`، `BreadcrumbList` (الرئيسية > من نحن) مرتبطة بـ `#business`. | صفحة تعريفية موثقة للكيان التجاري. |
| `contact-us/index.html` | تكرار تعريف `HVACBusiness` مع إحداثيات وعنوان شارع وهمي. | كتلة واحدة `@graph` تحوي: `ContactPage`، `BreadcrumbList` (الرئيسية > اتصل بنا) مرتبطة بـ `#business`. | صفحة اتصال رسمية مرتبطة بالكيان دون عناوين وهمية. |
| `ac-cleaning-riyadh/index.html` | تكرار `HVACBusiness`، وسكيما `Service` غير مكتملة. | كتلة واحدة `@graph` تحوي: `WebPage`، `BreadcrumbList`، `Service` (provider: #business). | استهداف دقيق لخدمة تنظيف المكيفات. |
| `air-conditioner-maintenance-riyadh/index.html` | تكرار `HVACBusiness`، وسكيما خدمة وأسئلة غير موحدة. | كتلة واحدة `@graph` تحوي: `WebPage`، `BreadcrumbList`، `Service`، `FAQPage` (4 أسئلة). | إظهار نتائج غنية (Rich Results) لخدمة الصيانة والأسئلة الشائعة. |
| `ac-sanitization-riyadh/index.html` | تكرار `HVACBusiness`، وسكيما غير مرتبطة بموقع الشركة. | كتلة واحدة `@graph` تحوي: `WebPage`، `BreadcrumbList`، `Service`، `FAQPage` (4 أسئلة). | إظهار نتائج غنية لخدمة تعقيم المكيفات. |
| `ac-installation-riyadh/index.html` | تكرار `HVACBusiness`. | كتلة واحدة `@graph` تحوي: `WebPage`، `BreadcrumbList`، `Service`، `FAQPage` (5 أسئلة). | إظهار نتائج غنية لخدمة فك وتركيب المكيفات. |
| `ac-freon-recharging-riyadh/index.html` | تكرار `HVACBusiness`. | كتلة واحدة `@graph` تحوي: `WebPage`، `BreadcrumbList`، `Service` (provider: #business). | توثيق خدمة شحن الفريون. |
| `ac-copper-piping-riyadh/index.html` | تكرار `HVACBusiness`. | كتلة واحدة `@graph` تحوي: `WebPage`، `BreadcrumbList`، `Service` (provider: #business). | توثيق خدمة تمديد النحاس. |
| `blog/index.html` | تكرار `HVACBusiness` بدون ربط مناسب للمدونة. | كتلة واحدة `@graph` تحوي: `Blog`، `BreadcrumbList` (الرئيسية > المدونة) ناشرها `#business`. | تصنيف الصفحة كمدونة رسمية للموقع. |
| `blog/causes-of-ac-not-cooling-riyadh/index.html` | وسم `Article` بدون تواريخ دقيقة، وتكرار للكيان. | كتلة واحدة `@graph` تحوي: `BlogPosting`، `WebPage`، `BreadcrumbList`، `FAQPage` (3 أسئلة). | ربط المقال بالشركة كناشر ومؤلف، وتوثيق تواريخ النشر والتعديل. |
| `blog/how-often-to-clean-ac-riyadh/index.html` | وسم `Article` بدون تواريخ دقيقة، وتكرار للكيان. | كتلة واحدة `@graph` تحوي: `BlogPosting`، `WebPage`، `BreadcrumbList`، `FAQPage` (3 أسئلة). | ربط المقال بالشركة كناشر ومؤلف، وتوثيق تواريخ النشر والتعديل. |
| `blog/signs-of-ac-freon-leak-and-recharging-guide/index.html` | وسم `Article` بدون تواريخ دقيقة، وتكرار للكيان. | كتلة واحدة `@graph` تحوي: `BlogPosting`، `WebPage`، `BreadcrumbList`، `FAQPage` (3 أسئلة). | ربط المقال بالشركة كناشر ومؤلف، وتوثيق تواريخ النشر والتعديل. |
| `privacy-policy/index.html` | **لا توجد أي سكيما نهائياً**. | كتلة واحدة `@graph` تحوي: `WebPage`، `BreadcrumbList` (الرئيسية > سياسة الخصوصية). | اكتمال التغطية الدلالية للصفحات القانونية. |
| `terms/index.html` | **لا توجد أي سكيما نهائياً**. | كتلة واحدة `@graph` تحوي: `WebPage`، `BreadcrumbList` (الرئيسية > الشروط والأحكام). | اكتمال التغطية الدلالية للصفحات القانونية. |

---

## 3. تقرير توحيد الهوية وبيانات الاتصال (NAP Audit)
1. **الاسم التجاري العربي**:
   - تم استبدال جميع حالات "كول اير" إلى **"كول إير"** (بإثبات الهمزة) بإجمالي **50 تعديلاً** شملت العناوين والنصوص وأوصاف الصور في كافة ملفات HTML.
2. **وسوم الـ Meta الموحدة**:
   - `og:site_name`: موحد على `كول إير | Cool Air` في 16 صفحة.
   - `meta name="author"`: موحد على `كول إير | Cool Air` في 16 صفحة.
3. **روابط الاتصال**:
   - تم تحديث جميع وسوم روابط الاتصال من `href="tel:0558577619"` إلى الصيغة القياسية الدولية `href="tel:+966558577619"`، مع الحفاظ الكامل على المظهر الرقمي المحلي المعروض للزائر `0558577619`.
   - روابط الواتساب مطابقة وموحدة على `https://wa.me/966558577619`.

---

## 4. فحص وسم التحقق وملف الفهرسة
1. **وسم التحقق من ملكية الموقع (Google Site Verification)**:
   - تم فحص وتأكيد وجود الوسم بالرمز المعتمد التالي في جميع صفحات الموقع الـ 16 دون أي تغيير:
     `<meta name="google-site-verification" content="qv-FNhrOl1P7gp0JkxFIGM5DPJyxn2FV-oBz2RktgtM">`
2. **ملف robots.txt وخريطة الموقع**:
   - تم فحص ملف `robots.txt` والتأكد من إتاحته لمجلدات الأصول الأساسية `/css/` و `/js/` و `/assets/`.
   - رابط خريطة الموقع مسجل بشكل صحيح ومتاح لمحركات البحث: `https://coolairriyadh.com/sitemap.xml`.

---

## 5. نتائج الفحص الآلي للـ Schema (`npm run schema:validate`)
تم تشغيل سكربت التحقق الآلي الصارم الذي يفحص:
- سلامة الـ JSON وصحة صياغته.
- وجود كتلة سكيما واحدة فقط لكل صفحة.
- خلو البيانات تماماً من: `aggregateRating`, `priceRange`, `geo`, `streetAddress` الوهمية، والأشخاص كمؤلفين للمقالات.
- ترقيم مسارات التنقل (BreadcrumbList) بدقة (1، 2، 3).
- سلامة هيكل الأسئلة والأجوبة (FAQPage).

**النتيجة الرسمية للفحص:**
```text
============================================================
SCHEMA VALIDATION SUMMARY: 16/16 Pages Passed
============================================================
[PASS] index.html
[PASS] our-services/index.html
[PASS] about-us/index.html
[PASS] contact-us/index.html
[PASS] ac-cleaning-riyadh/index.html
[PASS] air-conditioner-maintenance-riyadh/index.html
[PASS] ac-sanitization-riyadh/index.html
[PASS] ac-installation-riyadh/index.html
[PASS] ac-freon-recharging-riyadh/index.html
[PASS] ac-copper-piping-riyadh/index.html
[PASS] blog/index.html
[PASS] blog/causes-of-ac-not-cooling-riyadh/index.html
[PASS] blog/how-often-to-clean-ac-riyadh/index.html
[PASS] blog/signs-of-ac-freon-leak-and-recharging-guide/index.html
[PASS] privacy-policy/index.html
[PASS] terms/index.html
============================================================
ALL SCHEMA TESTS PASSED 100%!
```

---

## 6. الخطوات القادمة (المرحلة 3)
1. **تحسين On-Page SEO واستراتيجية الكلمات المفتاحية**:
   - تدعيم الكلمة المفتاحية المستهدفة ("شركة مكيفات بالرياض") وتوزيعها الطبيعي في العناوين والفقرات.
   - تحسين وسوم العناوين (Title Tags) وتخصيص أوصاف الميتا (Meta Descriptions) لكل صفحة بدون حشو.
2. **تحسين سرعة الموقع وأداء Core Web Vitals**:
   - فحص تحميل الصور وحجوم ملفات الـ WebP والخطوط.

