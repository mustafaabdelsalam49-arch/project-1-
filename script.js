/* ==========================================================================
   مدير الصيانة - ملف التفاعلات (Main JavaScript)
   ========================================================================== */

(function () {
  'use strict';

  // 1. Idempotent initialization guard to prevent duplicate event listener bindings
  if (window.__APP_SCRIPT_INITIALIZED__) {
    return;
  }
  window.__APP_SCRIPT_INITIALIZED__ = true;

  // Automatically sync active state for navigation links across all pages
  function syncActiveNavLinks() {
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentFile = rawPath.split('#')[0] || 'index.html';

    // Desktop nav items
    document.querySelectorAll('.desktop-nav > .nav-item').forEach((item) => {
      const href = item.getAttribute('href');
      if (href) {
        const itemFile = href.split('/').pop().split('#')[0];
        item.classList.toggle('active', itemFile === currentFile);
      }
    });

    // Special category highlights for Services vs Coldair
    const megaWrapper = document.getElementById('megaMenuWrapper');
    const coldairWrapper = document.getElementById('coldairNavWrapper');

    if (currentFile === 'service-coldair.html') {
      coldairWrapper?.classList.add('active');
      megaWrapper?.classList.remove('active');
    } else if (
      currentFile === 'services.html' ||
      currentFile.startsWith('service-') ||
      currentFile.startsWith('brand-')
    ) {
      megaWrapper?.classList.add('active');
      coldairWrapper?.classList.remove('active');
    }

    // Mobile drawer links
    document.querySelectorAll('.drawer-content .drawer-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        const linkFile = href.split('/').pop().split('#')[0];
        link.classList.toggle('active', linkFile === currentFile);
      }
    });
  }

  function initApp() {
    if (window.__APP_INIT_DONE__) return;
    window.__APP_INIT_DONE__ = true;

    // Apply active navigation state
    syncActiveNavLinks();

    // Mobile Drawer Elements
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');

    function openDrawer() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.add('open');
      drawerBackdrop?.classList.add('active');
      hamburgerBtn?.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.remove('open');
      drawerBackdrop?.classList.remove('active');
      hamburgerBtn?.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    // Toggle drawer open on hamburger click/tap
    hamburgerBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });

    // Close drawer on X button
    closeDrawerBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });

    // Close drawer when tapping backdrop
    drawerBackdrop?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
        closeDrawer();
      }
    });

    // 2. Mobile Accordion for "الخدمات" in Drawer (Legacy & Dual)
    const drawerServicesToggle = document.getElementById('drawerServicesToggle');
    const drawerServicesPanel = document.getElementById('drawerServicesPanel');

    if (drawerServicesToggle && drawerServicesPanel) {
      drawerServicesToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = drawerServicesPanel.classList.toggle('open');
        drawerServicesToggle.setAttribute('aria-expanded', String(isOpen));

        const chevron = drawerServicesToggle.querySelector('.chevron');
        if (chevron) {
          chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    }

    // 3. Robust link navigation handling inside mobile drawer
    document.querySelectorAll('.drawer-link, .drawer-sublink').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Skip tel:, mailto:, external protocols, and new-tab links
        if (
          href.startsWith('tel:') ||
          href.startsWith('mailto:') ||
          href.startsWith('http') ||
          link.getAttribute('target') === '_blank'
        ) {
          return;
        }

        // Handle pure in-page hash links (e.g. #booking)
        if (href.startsWith('#')) {
          e.preventDefault();
          closeDrawer();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        // Handle same-page hash links (e.g. index.html#booking when on index.html)
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const [linkPage, linkHash] = href.split('#');

        if (linkHash && (linkPage === '' || linkPage === currentPath)) {
          e.preventDefault();
          closeDrawer();
          const target = document.getElementById(linkHash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        // Standard multi-page navigation allowed naturally
      });
    });

    // 4. Dual-Path Mega Menu Controller (Desktop & Mobile)
    const tabApplianceTrigger = document.getElementById('tabApplianceTrigger');
    const tabBrandTrigger = document.getElementById('tabBrandTrigger');
    const panelByAppliance = document.getElementById('panelByAppliance');
    const panelByBrand = document.getElementById('panelByBrand');

    function switchDesktopMode(activeBtn, targetPanel) {
      [tabApplianceTrigger, tabBrandTrigger].forEach((btn) => {
        if (!btn) return;
        btn.classList.toggle('active', btn === activeBtn);
        btn.setAttribute('aria-selected', String(btn === activeBtn));
      });
      [panelByAppliance, panelByBrand].forEach((panel) => {
        if (!panel) return;
        panel.classList.toggle('active', panel === targetPanel);
      });
    }

    tabApplianceTrigger?.addEventListener('click', (e) => {
      e.preventDefault();
      switchDesktopMode(tabApplianceTrigger, panelByAppliance);
    });

    tabBrandTrigger?.addEventListener('click', (e) => {
      e.preventDefault();
      switchDesktopMode(tabBrandTrigger, panelByBrand);
    });

    // 4b. Standalone Coldair Direct Navigation on Click
    const coldairNavPill = document.querySelector('.coldair-nav-pill');
    if (coldairNavPill) {
      coldairNavPill.addEventListener('click', (e) => {
        // If clicking call or WhatsApp buttons, let them trigger their own direct actions
        if (e.target.closest('.coldair-pill-actions')) {
          return;
        }
        // Direct navigation to Coldair service page
        window.location.href = 'service-coldair.html';
      });
    }

    // Master-Detail Category Switcher (Hover & Click)
    const applianceNavButtons = document.querySelectorAll('.appliance-nav-btn');
    const subpanels = document.querySelectorAll('.mega-subpanel');

    function activateSubpanel(targetId, activeBtn) {
      applianceNavButtons.forEach((btn) => btn.classList.toggle('active', btn === activeBtn));
      subpanels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === targetId);
      });
    }

    applianceNavButtons.forEach((btn) => {
      const targetId = btn.getAttribute('data-target');
      btn.addEventListener('mouseenter', () => activateSubpanel(targetId, btn));
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        activateSubpanel(targetId, btn);
      });
    });

    // Mobile Segmented Tab Controller
    const mobTabApplianceBtn = document.getElementById('mobTabApplianceBtn');
    const mobTabBrandBtn = document.getElementById('mobTabBrandBtn');
    const mobPanelAppliance = document.getElementById('mobPanelAppliance');
    const mobPanelBrand = document.getElementById('mobPanelBrand');

    function switchMobileSegment(activeBtn, targetPanel) {
      [mobTabApplianceBtn, mobTabBrandBtn].forEach((btn) => {
        btn?.classList.toggle('active', btn === activeBtn);
      });
      [mobPanelAppliance, mobPanelBrand].forEach((panel) => {
        panel?.classList.toggle('active', panel === targetPanel);
      });
    }

    mobTabApplianceBtn?.addEventListener('click', () => {
      switchMobileSegment(mobTabApplianceBtn, mobPanelAppliance);
    });

    mobTabBrandBtn?.addEventListener('click', () => {
      switchMobileSegment(mobTabBrandBtn, mobPanelBrand);
    });

    // Mobile Sub-Accordion Toggle
    document.querySelectorAll('.mob-accordion-header').forEach((header) => {
      header.addEventListener('click', (e) => {
        e.preventDefault();
        const body = header.nextElementSibling;
        const isOpen = body?.classList.toggle('open');
        header.setAttribute('aria-expanded', String(isOpen));

        const chevron = header.querySelector('.chevron');
        if (chevron) {
          chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('open');

        // Close other open FAQs in same section
        const parent = item.parentElement;
        parent?.querySelectorAll('.faq-item.open').forEach((other) => {
          if (other !== item) other.classList.remove('open');
        });

        item.classList.toggle('open', !isOpen);
      });
    });

    // Booking & Contact Forms Handling
    const bookingForms = document.querySelectorAll('form[id*="booking"], form[id*="contact"]');
    bookingForms.forEach((form) => {
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
          <a href="tel:+201271524415" style="color:#c8102e;font-weight:bold;">01271524415</a> أو مراسلتنا عبر 
          <a href="https://wa.me/201271524415" target="_blank" rel="noopener" style="color:#25d366;font-weight:bold;">واتساب</a>.
        `;
        feedback.style.display = 'block';
        form.reset();
      });
    });
  }

  // Support Web Component <site-navbar> & placeholder dynamic injection
  function checkDynamicNavbar(callback) {
    const placeholder = document.querySelector('site-navbar, #navbar-placeholder, [data-navbar-placeholder]');
    if (placeholder && placeholder.innerHTML.trim() === '') {
      fetch('navbar.html')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then((html) => {
          placeholder.innerHTML = html;
          callback();
        })
        .catch((err) => {
          console.warn('Dynamic navbar fetch skipped (running locally or network error):', err);
          callback();
        });
    } else {
      callback();
    }
  }

  if (typeof customElements !== 'undefined' && !customElements.get('site-navbar')) {
    customElements.define('site-navbar', class extends HTMLElement {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => checkDynamicNavbar(initApp));
  } else {
    checkDynamicNavbar(initApp);
  }
})();
