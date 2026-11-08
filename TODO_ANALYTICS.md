# دليل إعداد Google Analytics 4 وتتبع التحويلات (مؤجل / TODO)

> **الحالة:** تم تأجيل تفعيل التتبع بناءً على طلب العميل الصريح (عدم الرغبة في تتبع الاتصال، وعدم توفير معرّف القياس `G-XXXXXXXXXX`). لم يتم تعديل أي ملف HTML لإضافة أكواد تتبع في هذه المرحلة.

---

## 1. المتطلبات الأولية عند الرغبة في التفعيل مستقبلاً
1. إنشاء حساب أو خاصية (Property) في [Google Analytics](https://analytics.google.com/).
2. إنشاء تدفق بيانات للويب (Web Data Stream) لموقع `https://coolairriyadh.com/`.
3. استخراج معرّف القياس (Measurement ID) الذي يبدأ بـ `G-`.

---

## 2. كود التثبيت الأساسي لـ GA4
يتم وضعه أعلى وسم `<head>` في جميع صفحات الموقع الـ 16:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX', {
    send_page_view: true
  });
</script>
```

---

## 3. تتبع نقرات الواتساب (WhatsApp Click Tracking)
يمكن تضمين السكربت التالي قبل إغلاق وسم `</body>`:

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  // تتبع النقر على روابط الواتساب
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function(el) {
    el.addEventListener('click', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'whatsapp_click',
          page_location: window.location.href
        });
      }
    });
  });
});
</script>
```

---

## 4. تتبع إرسال نموذج التواصل (Form Submission Tracking)
في صفحة `contact-us/index.html`:

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  var contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'form',
          event_label: 'contact_form_submission',
          page_location: window.location.href
        });
      }
    });
  }
});
</script>
```

---

## 5. التحقق والاختبار (Verification)
1. استخدام ملحق المتصفح **Google Tag Assistant**.
2. فحص تدفق الأحداث في **GA4 DebugView** للتأكد من وصول أحداث `generate_lead` عند النقر أو الإرسال.

