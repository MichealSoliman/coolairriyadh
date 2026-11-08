import fs from 'fs';

const file = 'ac-installation-riyadh/index.html';
let html = fs.readFileSync(file, 'utf8');

// 1. Add Quick Answer right after H1 description
const oldHeroDesc = `<p class="text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
                            خدمات فك ونقل وتركيب احترافية لمكيفات الاسبليت والكونسيلد والكاسيت والدولابي والشباك في مختلف أحياء الرياض. نلتزم بأعلى معايير السلامة الهندسية، استخدام مضخة الفاكيوم لتفريغ الهواء، وضمان عزل التوصيلات بدقة لضمان أعلى كفاءة تبريد ممكنة.
                        </p>`;
const oldHeroDescCRLF = oldHeroDesc.replace(/\n/g, '\r\n');

const newQuickAnswer = `<div class="p-5 rounded-card bg-cyan-light/30 border border-accent/20 mb-6 max-w-2xl text-right">
                            <p class="text-base sm:text-lg text-text leading-relaxed">
                                خدمة <strong>فك وتركيب مكيفات بالرياض</strong> تشمل تفكيك الوحدات ونقلها وإعادة تثبيتها بميزان مائي دقيق وسحب الهواء بالفاكيوم لضمان أعلى كفاءة تبريد وحماية الضاغط. تلزم الخدمة عند الانتقال لمنزل جديد أو تجديد المكيفات القديمة، وتُحدد التكلفة بناءً على نوع المكيف وعدد الوحدات وأمتار النحاس المطلوبة بعد المعاينة الميدانية وقبل البدء.
                            </p>
                        </div>`;

if (html.includes(oldHeroDesc)) {
  html = html.replace(oldHeroDesc, newQuickAnswer);
} else if (html.includes(oldHeroDescCRLF)) {
  html = html.replace(oldHeroDescCRLF, newQuickAnswer);
} else {
  html = html.replace(/<p class="text-muted text-base sm:text-lg leading-relaxed max-w-2xl">[\s\S]*?أعلى كفاءة تبريد ممكنة\.\s*<\/p>/i, newQuickAnswer);
}

// 2. Add "ما تشمله وما لا تشمله" + "خصوصية الرياض" replacing Section 2 (types)
const newScopeAndRiyadh = `<!-- ========================================================
           ما تشمله خدمة الفك والتركيب وما لا تشمله
      ======================================================== -->
        <section id="scope" class="py-14 sm:py-18 bg-surface border-y border-border">
            <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl mx-auto text-center mb-10">
                    <span class="text-accent text-sm font-bold uppercase tracking-wider block mb-2">نطاق العمل المحدد</span>
                    <h2 class="text-2xl sm:text-3xl font-bold text-primary mb-3">
                        ما تشمله خدمة فك وتركيب مكيفات بالرياض وما لا تشمله
                    </h2>
                    <p class="text-muted text-sm sm:text-base">
                        نوضح تفاصيل العمل الهندسي لفك وتركيب المكيفات لضمان سلامة الأجهزة أثناء النقل والتشغيل:
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
                    <div class="bg-white p-6 sm:p-7 rounded-card-lg border border-border shadow-soft text-right">
                        <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">✓</span>
                            ما تشمله خدمة الفك والتركيب:
                        </h3>
                        <ul class="space-y-3 text-sm text-text">
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span><span>حبس غاز الفريون داخل الوحدة الخارجية قبل الفك لمنع هدر وسيط التبريد.</span></li>
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span><span>تفكيك وتثبيت الحوامل الجدارية والقواعد بدقة ميزان تمنع تسرب المياه.</span></li>
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span><span>ربط مواسير النحاس وعزلها حرارياً وتوصيل الأسلاك الكهربائية بأمان.</span></li>
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span><span>تفريغ الهواء والرطوبة من المواسير بمضخة الفاكيوم قبل فتح محابس الغاز.</span></li>
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span><span>تشغيل المكيف واختبار ضغط التبريد وسريان ماء الصرف في الموقع الجديد.</span></li>
                        </ul>
                    </div>

                    <div class="bg-white p-6 sm:p-7 rounded-card-lg border border-border shadow-soft text-right">
                        <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">✕</span>
                            ما لا تشمله الخدمة (خدمات مستقلة):
                        </h3>
                        <ul class="space-y-3 text-sm text-text">
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span><span>تأسيس شبكات النحاس الإنشائية وتوفرها خدمة <a href="/ac-copper-piping-riyadh/" class="text-accent font-semibold hover:underline">تمديد نحاس المكيفات للمباني الجديدة</a>.</span></li>
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span><span>شحن الفريون المفقود في حال وجود تسريب سابق وتوفره خدمة <a href="/ac-freon-recharging-riyadh/" class="text-accent font-semibold hover:underline">فحص الفريون بعد التركيب</a>.</span></li>
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span><span>إصلاح الأعطال الكهربائية السابقة عبر <a href="/air-conditioner-maintenance-riyadh/" class="text-accent font-semibold hover:underline">صيانة وإصلاح المكيفات</a>.</span></li>
                            <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span><span>الغسيل المتخصص للأجهزة المتسخة عبر <a href="/ac-cleaning-riyadh/" class="text-accent font-semibold hover:underline">تنظيف مكيفات بالرياض</a>.</span></li>
                        </ul>
                    </div>
                </div>

                <!-- خصوصية الرياض -->
                <div class="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-card-lg border border-border shadow-soft text-right">
                    <div class="flex items-center gap-3 mb-3">
                        <span class="w-3 h-3 rounded-full bg-accent"></span>
                        <h3 class="text-xl font-bold text-primary">أثر طبيعة مباني الرياض على تركيب المكيفات</h3>
                    </div>
                    <p class="text-sm text-muted leading-relaxed">
                        تتسم مدينة الرياض بكثرة حركة الانتقال السكني بين الشقق والفلل الحديثة، مع تنوع ارتفاعات المباني والواجهات المعمارية المعرضة للشمس المباشرة. ويتطلب التركيب في بيئة الرياض شديدة الحرارة عناية فائقة بعزل مواسير النحاس الخارجية ضد الأشعة فوق البنفسجية، وتفريغ الدائرة بالكامل بواسطة الفاكيوم لمنع اختلاط رطوبة الهواء بذرات الفريون والزيت، مما يحمي الضاغط من التلف المبكر ويضمن أداء تبريد قوي يواجه لهيب الصيف.
                    </p>
                </div>
            </div>
        </section>\n\n        `;

html = html.replace(/<!-- =+\s*أنواع المكيفات التي نخدمها[\s\S]*?(?=<!-- =+\s*خطوات الفك والتركيب الاحترافية)/i, newScopeAndRiyadh);

// 3. Update FAQs with 6 unique installation questions
const faqs = [
  {
    q: 'هل يضيع غاز الفريون أثناء عملية فك المكيف ونقله؟',
    a: 'لا، يقوم فنيونا بحبس وسيط التبريد داخل الوحدة الخارجية بالكامل قبل فك المواسير وإغلاق المحابس بإحكام، مما يحافظ على كمية الفريون الأصلية دون هدر لتستأنف عملها فور إعادة التركيب.'
  },
  {
    q: 'لماذا يعد تفريغ الهواء بالفاكيوم خطوة ضرورية عند تركيب المكيف؟',
    a: 'سحب الهواء والرطوبة من مواسير النحاس بواسطة مضخة الفاكيوم يمنع تجمد الرطوبة داخل دائرة التبريد ويحمي زيت الكمبروسر من الأكسدة، وهو معيار هندسي ضروري لضمان كفاءة التبريد في حرارة الرياض.'
  },
  {
    q: 'هل تشمل خدمة التركيب توفير مواسير نحاس جديدة؟',
    a: 'تعتمد الخدمة الأساسية على توصيل أمتار النحاس القائمة والسليمة للجهاز. وفي حال كان المسار الجديد يتطلب أمتاراً إضافية، يتم توضيح تكلفة المتر قبل التمديد، كما نوفر خدمة تمديد نحاس المكيفات التأسيسية.'
  },
  {
    q: 'كم يستغرق فك وتركيب مكيف سبليت من موقع لآخر؟',
    a: 'تستغرق عملية فك المكيف نحو 30 إلى 45 دقيقة، بينما يستغرق التركيب في الموقع الجديد بين ساعة إلى ساعة ونصف شاملة تثبيت القواعد، التوصيل، سحب الهواء بالفاكيوم، وفحص تصريف الماء والتشغيل.'
  },
  {
    q: 'هل يشمل التركيب فحص وضبط مستوى غاز الفريون؟',
    a: 'نعم، بعد اكتمال التركيب والتشغيل، يتم قياس ضغوط وسيط التبريد بساعة القياس للتأكد من استقرار الدورة، ويتم توجيه العميل لـ خدمة فحص وشحن الفريون إذا تبين وجود نقص ناتج عن تسريب سابق.'
  },
  {
    q: 'كيف يتم احتساب تكلفة فك وتركيب المكيفات؟',
    a: 'تتحدد التكلفة بناءً على نوع المكيف (سبليت أو دولابي أو كاسيت)، وعدد الوحدات، وما إذا كانت الخدمة تشمل النقل بين أحياء الرياض أو الفك والتركيب في نفس الموقع، ويتم تأكيد السعر قبل البدء.'
  }
];

let faqHtml = '';
faqs.forEach((item, idx) => {
  faqHtml += `
                    <!-- سؤال ${idx + 1} -->
                    <div class="faq-item border border-border rounded-xl bg-white overflow-hidden transition-colors">
                        <button type="button" class="faq-trigger w-full flex items-center justify-between p-5 text-right font-bold text-primary hover:text-accent focus:outline-hidden transition-colors" aria-expanded="false">
                            <span class="text-base sm:text-lg">${item.q}</span>
                            <svg class="faq-icon w-5 h-5 text-accent transition-transform duration-200 shrink-0 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div class="faq-panel hidden max-h-0 overflow-hidden transition-all duration-200">
                            <div class="p-5 pt-0 text-muted text-sm leading-relaxed border-t border-border/40">
                                ${item.a}
                            </div>
                        </div>
                    </div>`;
});

const newFaqSection = `<!-- ========================================================
           الأسئلة الشائعة (FAQ Accordion)
      ======================================================== -->
        <section id="faq" class="py-14 sm:py-18 bg-surface border-y border-border">
            <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl mx-auto text-center mb-10">
                    <span class="text-accent text-sm font-bold uppercase tracking-wider block mb-2">إجابات الخبراء</span>
                    <h2 class="text-2xl sm:text-3xl font-bold text-primary mb-3">
                        الأسئلة الشائعة عن فك وتركيب مكيفات بالرياض
                    </h2>
                    <p class="text-muted text-base sm:text-lg">
                        إجابات عملية عن أبرز تساؤلات نقل وتركيب المكيفات:
                    </p>
                </div>

                <div class="max-w-3xl mx-auto space-y-3">
${faqHtml}
                </div>
            </div>
        </section>\n\n        `;

html = html.replace(/<!-- =+\s*الأسئلة الشائعة[\s\S]*?(?=<!-- =+\s*خدمات مكيفات ذات صلة)/i, newFaqSection);

// 4. Update JSON-LD FAQPage
const schemaMatch = html.match(/<!--\s*SCHEMA:START\s*-->[\s\S]*?<!--\s*SCHEMA:END\s*-->/i);
if (schemaMatch) {
  const jsonMatch = schemaMatch[0].match(/<script[\s\S]*?>([\s\S]*?)<\/script>/i);
  if (jsonMatch) {
    const schemaObj = JSON.parse(jsonMatch[1]);
    schemaObj['@graph'] = schemaObj['@graph'].filter(e => e['@type'] !== 'FAQPage');
    schemaObj['@graph'].push({
      '@type': 'FAQPage',
      '@id': 'https://coolairriyadh.com/ac-installation-riyadh/#faq',
      'isPartOf': { '@id': 'https://coolairriyadh.com/ac-installation-riyadh/#webpage' },
      'mainEntity': faqs.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.a.replace(/<[^>]+>/g, '')
        }
      }))
    });

    const newSchemaMarkup = `<!-- SCHEMA:START -->\n<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>\n<!-- SCHEMA:END -->`;
    html = html.replace(schemaMatch[0], newSchemaMarkup);
  }
}

// 5. Update WhatsApp text
html = html.replace(/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/g, '%D8%AE%D8%AF%D9%85%D8%A9%20%D9%81%D9%83%20%D9%88%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA%20%D8%A8%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6');

fs.writeFileSync(file, html, 'utf8');
console.log('Successfully updated installation page!');

