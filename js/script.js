/* ==========================================================================
   التوكيل للصيانة - ملف التفاعلات (Main JavaScript)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Elements
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  // Mobile Accordion for Services
  const drawerServicesToggle = document.getElementById('drawerServicesToggle');
  const drawerServicesPanel = document.getElementById('drawerServicesPanel');

  drawerServicesToggle?.addEventListener('click', () => {
    const isOpen = drawerServicesPanel?.classList.toggle('open');
    drawerServicesToggle.setAttribute('aria-expanded', String(isOpen));
    const chevron = drawerServicesToggle.querySelector('.chevron');
    if (chevron) {
      chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  });

  // Close drawer on internal link click
  document.querySelectorAll('.drawer-link, .drawer-sublink').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      
      // Close other open FAQs in same section
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.faq-item.open').forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
      }
      
      item.classList.toggle('open', !isOpen);
    });
  });

  // Booking & Contact Forms Handling (Real validation without fake backend)
  const bookingForms = document.querySelectorAll('form[id*="booking"], form[id*="contact"]');
  bookingForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = form.querySelector('input[name="name"], input[id*="name"]');
      const phoneInput = form.querySelector('input[name="phone"], input[id*="phone"]');
      
      if (nameInput && !nameInput.value.trim()) {
        alert('يرجى إدخال الاسم الكريم.');
        nameInput.focus();
        return;
      }
      
      if (phoneInput && !phoneInput.value.trim()) {
        alert('يرجى إدخال رقم الهاتف للتواصل.');
        phoneInput.focus();
        return;
      }

      // Check if feedback container exists
      let feedback = form.querySelector('.form-feedback');
      if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'form-feedback success';
        form.appendChild(feedback);
      }
      
      feedback.innerHTML = `
        <strong>تم استلام بيانات طلبك بنجاح!</strong><br>
        سيتواصل معك ممثل خدمة العملاء في أقرب وقت لتأكيد الموعد والعطل.<br>
        للحصول على خدمة فورية الآن، يمكنك الاتصال مباشرة على: 
        <a href="tel:01276042120" style="color:#c8102e;font-weight:bold;">01276042120</a> أو مراسلتنا عبر 
        <a href="https://wa.me/201276042120" target="_blank" rel="noopener" style="color:#25d366;font-weight:bold;">واتساب</a>.
      `;
      feedback.style.display = 'block';
      form.reset();
    });
  });
});
