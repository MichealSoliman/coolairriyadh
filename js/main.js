/**
 * Cool Air - Main JavaScript Logic
 * التحكم في شريط التنقل، القائمة المتجاوبة، الأسئلة الشائعة، المعرض، وتتبع التحويلات
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactLinks();
  initFaqAccordion();
  initGalleryModal();
  initInquiryForm();
  initConversionTracking();
  initSmoothScroll();
});

/**
 * 1. تهيئة شريط التنقل وقائمة الهواتف الذكية (Mobile Menu)
 * تدعم لوحة المفاتيح، مفتاح Escape، وتحديث خصائص ARIA
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    // Force reflow for smooth transition
    void mobileMenu.offsetWidth;
    mobileMenu.classList.add('opacity-100');
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Set focus to close button or first link
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (toggleBtn.getAttribute('aria-expanded') === 'false') {
        mobileMenu.classList.add('hidden');
      }
    }, 200);
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // إغلاق القائمة عند النقر على أي رابط بداخلها
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // إغلاق القائمة بمفتاح Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}

/**
 * 2. ربط أرقام الاتصال وروابط واتساب بناءً على SITE_CONFIG
 * منع الروابط الوهمية والأرقام غير المعتمدة
 */
function initContactLinks() {
  if (typeof SITE_CONFIG === 'undefined') return;

  const phone = SITE_CONFIG.contact?.phone?.trim();
  const whatsapp = SITE_CONFIG.contact?.whatsapp?.trim();

  // عناصر الهاتف
  const phoneLinks = document.querySelectorAll('[data-contact-phone]');
  phoneLinks.forEach(el => {
    if (phone) {
      el.href = `tel:${phone}`;
      el.classList.remove('hidden');
    } else {
      // عند عدم توفر رقم معتمد، يتم توجيه الزائر لنموذج الطلب بدل رابط وهمي مع دعم الصفحات المتداخلة
      const fallback = el.getAttribute('data-fallback-href') || (document.getElementById('inquiry') ? '#inquiry' : '/#inquiry');
      el.href = fallback;
      const label = el.querySelector('.btn-label');
      if (label && label.dataset.fallbackText) {
        label.textContent = label.dataset.fallbackText;
      }
    }
  });

  // عناصر واتساب
  const whatsappLinks = document.querySelectorAll('[data-contact-whatsapp]');
  whatsappLinks.forEach(el => {
    if (whatsapp) {
      el.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن خدمات المكيفات في الرياض.')}`;
      el.classList.remove('hidden');
    } else {
      // إخفاء زر واتساب إذا لم يتوفر رقم رسمي لمنع الروابط المعطلة
      el.classList.add('hidden');
    }
  });
}

/**
 * 3. الأكورديون للأسئلة الشائعة (FAQ Accordion)
 * قابل للاستخدام بلوحة المفاتيح وبشكل متوافق مع قارئات الشاشة
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    const icon = item.querySelector('.faq-icon');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // إغلاق العناصر الأخرى للحفاظ على تنظيم الصفحة
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherTrigger && otherPanel) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherPanel.style.maxHeight = '0px';
            otherPanel.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        }
      });

      // تبديل العنصر الحالي
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0px';
        setTimeout(() => panel.classList.add('hidden'), 200);
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.classList.remove('hidden');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });

    // دعم لوحة المفاتيح (Enter أو المسافة مفعلة تلقائيًا للأزرار، ويمكن إضافة إضافات إذا رغبنا)
  });
}

/**
 * 4. نافذة تكبير معرض الأعمال (Gallery Lightbox)
 */
function initGalleryModal() {
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');
  const modalCaption = document.getElementById('gallery-modal-caption');
  const closeBtn = document.getElementById('gallery-modal-close');
  const triggers = document.querySelectorAll('[data-gallery-item]');

  if (!modal || !modalImg || !triggers.length) return;

  function openModal(imgSrc, captionText) {
    modalImg.src = imgSrc;
    modalImg.alt = captionText || 'معاينة أعمال التكييف';
    if (modalCaption) modalCaption.textContent = captionText || '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const img = trigger.querySelector('img');
      const caption = trigger.getAttribute('data-caption') || (img ? img.alt : '');
      if (img) {
        openModal(img.currentSrc || img.src, caption);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * 5. نموذج الاستفسار وطلب الخدمة المباشر (Inquiry Form)
 */
function initInquiryForm() {
  const form = document.getElementById('service-inquiry-form');
  const alertBox = document.getElementById('inquiry-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="customer_name"]')?.value.trim();
    const phone = form.querySelector('[name="customer_phone"]')?.value.trim();
    const service = form.querySelector('[name="service_type"]')?.value;
    const district = form.querySelector('[name="district"]')?.value.trim();

    if (!name || !phone || !service) {
      showAlert('يرجى تعبئة الحقول الأساسية: الاسم، رقم الجوال، ونوع الخدمة المطلوبة.', 'error');
      return;
    }

    // تحقق مبسط من رقم الجوال السعودي
    const phoneRegex = /^(05|5|\+9665)[0-9]{8}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      showAlert('يرجى إدخال رقم جوال صحيح (مثال: 05XXXXXXXX).', 'error');
      return;
    }

    // محاكاة إرسال ناجح وتوجيه العميل بوضوح
    trackEvent('inquiry_form_submit', { service, district });

    showAlert('تم استلام طلبك بنجاح! سيتم التواصل معك لمراجعة التفاصيل وتأكيد التكلفة وموعد الخدمة.', 'success');
    form.reset();
  });

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'border-red-200', 'bg-green-50', 'text-green-800', 'border-green-200');

    if (type === 'error') {
      alertBox.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
    } else {
      alertBox.classList.add('bg-green-50', 'text-green-800', 'border', 'border-green-200');
    }
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * 6. تتبع التحويلات (Conversion Tracking Architecture)
 * جاهز لربط Google Tag Manager / GA4 عند إدخال المعرفات
 */
function initConversionTracking() {
  const trackableElements = document.querySelectorAll('[data-track-event]');

  trackableElements.forEach(el => {
    el.addEventListener('click', () => {
      const eventName = el.getAttribute('data-track-event');
      const eventCategory = el.getAttribute('data-track-category') || 'interaction';
      const eventLabel = el.getAttribute('data-track-label') || el.textContent.trim();

      trackEvent(eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
      });
    });
  });
}

function trackEvent(eventName, params = {}) {
  // فحص توفر Google Tag Manager أو Google Analytics
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: eventName,
      ...params,
      timestamp: new Date().toISOString()
    });
  } else if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    // بيئة التطوير
    console.info(`[Analytics Event Tracked]: ${eventName}`, params);
  }
}

/**
 * 7. التمرير السلس للروابط الداخلية مع مراعاة ارتفاع شريط التنقل
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('header')?.offsetHeight || 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
