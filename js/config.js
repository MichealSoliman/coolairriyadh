/**
 * Cool Air Configuration
 * إعدادات موقع كول اير  لخدمات المكيفات بالرياض
 *
 * تنبيه: لا يتم وضع أرقام وهمية أو عناوين غير حقيقية أو تقييمات مفبركة.
 * تفعيل الروابط والأزرار يتم ديناميكيًا فقط عند إدخال البيانات المعتمدة هنا.
 */

const SITE_CONFIG = {
  // اسم النشاط التجاري
  brandName: 'Cool Air',
  brandNameAr: 'كول اير ',
  tagline: 'خدمات التكييف والمكيفات في الرياض',

  // النطاق الجغرافي
  city: 'الرياض',
  country: 'المملكة العربية السعودية',
  coverageNote: 'يتم تأكيد إمكانية تقديم الخدمة في الحي المطلوب وتحديد الموعد المناسب بعد التواصل.',

  // بيانات الاتصال الفعلية
  contact: {
    phone: '01210568977',      // رقم الاتصال المعتمد
    whatsapp: '201210568977',   // رقم واتساب بصيغة دولية صالحة لمحادثات واتساب
    displayPhone: '01210568977', // صيغة العرض للمستخدم
    email: 'info@coolairriyadh.com',
    address: 'الرياض، المملكة العربية السعودية',
  },

  // إعدادات التقييمات وآراء العملاء وأزرار الاتصال
  features: {
    showTestimonials: false, // إذا كانت false، يُعرض بديل احترافي لمعايير الجودة والالتزام المهني
    enableCallButtons: true, // تفعيل أزرار الاتصال المباشر
    enableWhatsAppButtons: true, // تفعيل أزرار واتساب المباشرة
  },

  // أحياء الرياض المؤكدة أو المقترحة للتحقق عند الطلب
  serviceDistricts: [
    { name: 'النرجس', region: 'شمال الرياض' },
    { name: 'الملقا', region: 'شمال الرياض' },
    { name: 'الياسمين', region: 'شمال الرياض' },
    { name: 'العارض', region: 'شمال الرياض' },
    { name: 'الصحافة', region: 'شمال الرياض' },
    { name: 'حطين', region: 'شمال الرياض' },
    { name: 'العقيق', region: 'شمال الرياض' },
    { name: 'قرطبة', region: 'شرق الرياض' },
    { name: 'اليرموك', region: 'شرق الرياض' },
    { name: 'الحمراء', region: 'شرق الرياض' }
  ],

  // خدمات المكيفات الأساسية ومساراتها المستقبلية المخططة
  services: [
    {
      id: 'cleaning',
      title: 'تنظيف المكيفات',
      slug: 'air-conditioner-cleaning-riyadh',
      targetPath: '/services/air-conditioner-cleaning-riyadh/',
      shortDesc: 'تنظيف المكيفات وإزالة الأتربة المتراكمة وفق نوع الوحدة وحالتها، مع العناية بالفلاتر والأجزاء المناسبة للتنظيف.',
      icon: 'sparkles'
    },
    {
      id: 'maintenance',
      title: 'صيانة وإصلاح المكيفات',
      slug: 'air-conditioner-maintenance-riyadh',
      targetPath: '/services/air-conditioner-maintenance-riyadh/',
      shortDesc: 'فحص مشكلات التشغيل وضعف التبريد والأعطال الكهربائية أو الميكانيكية، وتحديد الإجراء المناسب بعد التشخيص.',
      icon: 'wrench'
    },
    {
      id: 'sanitization',
      title: 'تعقيم وغسيل المكيفات',
      slug: 'ac-sanitization-riyadh',
      targetPath: '/services/ac-sanitization-riyadh/',
      shortDesc: 'تنظيف الأجزاء المناسبة وتعقيمها عند ملاءمة ذلك لنوع الوحدة، باستخدام مواد وأساليب متوافقة مع تعليمات المصنع.',
      icon: 'shield-check'
    },
    {
      id: 'freon',
      title: 'شحن فريون المكيفات',
      slug: 'ac-freon-recharging-riyadh',
      targetPath: '/services/ac-freon-recharging-riyadh/',
      shortDesc: 'فحص أداء التبريد والتحقق من احتمال وجود تسرب، ثم تحديد الحاجة إلى الإصلاح وشحن وسيط التبريد المناسب وفق مواصفات الجهاز.',
      icon: 'gauge'
    },
    {
      id: 'copper',
      title: 'تمديد نحاس المكيفات',
      slug: 'ac-copper-piping-riyadh',
      targetPath: '/services/ac-copper-piping-riyadh/',
      shortDesc: 'تنفيذ تمديدات مواسير النحاس المناسبة لنوع المكيف ومتطلبات التركيب، مع مراعاة العزل والتوصيلات واختبارات العمل اللازمة.',
      icon: 'git-commit'
    },
    {
      id: 'installation',
      title: 'تركيب وفك المكيفات',
      slug: 'air-conditioner-installation-riyadh',
      targetPath: '/services/air-conditioner-installation-riyadh/',
      shortDesc: 'تركيب المكيفات أو فكها وإعادة تركيبها وفق مواصفات الجهاز ومتطلبات الموقع، مع التحقق من التوصيلات والتشغيل.',
      icon: 'box'
    }
  ],

  // تتبع التحويلات والإحصاءات (جاهزة للربط فور إدخال المعرفات المعتمدة)
  analytics: {
    gtmId: '',  // مثال: 'GTM-XXXXXXX'
    ga4Id: '',  // مثال: 'G-XXXXXXXXXX'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
