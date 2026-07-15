/* ============================================================
   FIN Broker Online — สคริปต์กลาง
   ป๊อปอัปเลือกประกัน · เมนูมือถือ · Cookie banner · Event tracking
   ============================================================ */
(function () {
  'use strict';

  var LINE_OA_URL = 'https://line.me/R/ti/p/%40finforkids';
  var CHOICE_KEY = 'fin_ins_choice';        // จำการเลือกประเภทประกัน 30 วัน
  var CONSENT_KEY = 'fin_cookie_consent';   // การยินยอมคุกกี้

  /* ---------- Google Analytics 4 / Google Tag Manager ----------
     ใส่ ID แล้วเซฟ — ใช้ได้ทุกหน้าทันทีโดยไม่ต้อง build ใหม่
     GA4_ID เช่น 'G-XXXXXXXXXX' (สร้างที่ analytics.google.com)
     GTM_ID เช่น 'GTM-XXXXXXX' (ถ้าใช้ GTM ให้เว้น GA4_ID ว่างไว้ แล้วตั้ง GA4 ใน GTM แทน)
     โหลดแบบเคารพ Consent Mode v2: เริ่มต้น denied ทั้งหมด แล้วอัปเดตตามที่ผู้ใช้กดใน cookie banner */
  var GA4_ID = '';
  var GTM_ID = '';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function consentSignals(c) {
    return {
      analytics_storage: c && c.analytics ? 'granted' : 'denied',
      ad_storage: c && c.ads ? 'granted' : 'denied',
      ad_user_data: c && c.ads ? 'granted' : 'denied',
      ad_personalization: c && c.ads ? 'granted' : 'denied'
    };
  }
  function loadScript(src) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    document.head.appendChild(s);
  }
  (function initAnalytics() {
    if (!GA4_ID && !GTM_ID) return;
    var stored = null;
    try { stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); } catch (e) {}
    gtag('consent', 'default', consentSignals(null));           // เริ่มต้น: ปฏิเสธทั้งหมด
    if (stored) gtag('consent', 'update', consentSignals(stored)); // เคยเลือกไว้แล้ว → ใช้ค่าที่เลือก
    if (GTM_ID) {
      dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      loadScript('https://www.googletagmanager.com/gtm.js?id=' + GTM_ID);
    } else if (GA4_ID) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + GA4_ID);
      gtag('js', new Date());
      gtag('config', GA4_ID, { anonymize_ip: true });
    }
  })();

  /* ---------- Event tracking (ส่งเข้า dataLayer ถ้ามี GA/GTM) ---------- */
  function track(eventName, params) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
    } catch (e) { /* ignore */ }
  }
  window.finTrack = track;

  /* ---------- ลิงก์ไป LINE: แนบ intent + ยิง event ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-line-intent]');
    if (!a) return;
    track('line_click', { intent: a.getAttribute('data-line-intent'), page: location.pathname });
  });

  /* ---------- เมนูมือถือ ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- ป๊อปอัปเลือกประกัน (เฉพาะหน้าแรก) ---------- */
  var overlay = document.getElementById('insurance-picker');
  if (overlay && document.body.dataset.page === 'home') {
    var stored = null;
    try { stored = JSON.parse(localStorage.getItem(CHOICE_KEY) || 'null'); } catch (e) {}
    var fresh = stored && stored.until && Date.now() < stored.until;
    // ไม่แสดงถ้า: เคยเลือกใน 30 วัน หรือเข้ามาจากลิงก์ภายในเว็บเอง
    var internalRef = document.referrer && document.referrer.indexOf(location.host) > -1;
    if (!fresh && !internalRef) {
      setTimeout(function () { openPicker(); }, 600);
    }
  }
  function openPicker() {
    overlay.classList.add('open');
    overlay.removeAttribute('aria-hidden');
    var first = overlay.querySelector('a,button');
    if (first) first.focus();
    document.addEventListener('keydown', escClose);
  }
  function closePicker() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', escClose);
  }
  function escClose(e) { if (e.key === 'Escape') closePicker(); }
  function rememberChoice(type) {
    try {
      localStorage.setItem(CHOICE_KEY, JSON.stringify({ type: type, until: Date.now() + 30 * 864e5 }));
    } catch (e) {}
    track('insurance_type_selected', { insurance_type: type });
  }
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePicker();
      var choice = e.target.closest('[data-choice]');
      if (choice) rememberChoice(choice.getAttribute('data-choice'));
      if (e.target.closest('[data-close]')) { rememberChoice('none'); closePicker(); }
    });
  }

  /* ---------- Cookie banner ---------- */
  var banner = document.getElementById('cookie-banner');
  var prefsBox = document.getElementById('cookie-prefs');
  function getConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); } catch (e) { return null; }
  }
  function saveConsent(c) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch (e) {}
    if (banner) banner.classList.remove('show');
    gtag('consent', 'update', consentSignals(c)); // แจ้ง Google tag ตาม Consent Mode v2
    track('cookie_consent', c);
  }
  if (banner && !getConsent()) banner.classList.add('show');
  document.addEventListener('click', function (e) {
    if (e.target.id === 'cookie-accept-all') saveConsent({ necessary: true, analytics: true, ads: true });
    if (e.target.id === 'cookie-reject') saveConsent({ necessary: true, analytics: false, ads: false });
    if (e.target.id === 'cookie-settings' && prefsBox) prefsBox.hidden = !prefsBox.hidden;
    if (e.target.id === 'cookie-save' && prefsBox) {
      saveConsent({
        necessary: true,
        analytics: !!prefsBox.querySelector('[name="analytics"]:checked'),
        ads: !!prefsBox.querySelector('[name="ads"]:checked')
      });
    }
    if (e.target.id === 'cookie-reopen') { if (banner) banner.classList.add('show'); }
  });

  /* ---------- Tabs (หน้าโรคที่คุ้มครอง ฯลฯ) ---------- */
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab-btn');
      if (!btn) return;
      tabs.querySelectorAll('.tab-btn').forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
      btn.setAttribute('aria-selected', 'true');
      var wrap = tabs.parentElement;
      wrap.querySelectorAll('.tab-panel').forEach(function (p) { p.hidden = true; });
      var panel = document.getElementById(btn.getAttribute('data-tab'));
      if (panel) panel.hidden = false;
    });
  });

  /* ---------- Lightbox ขยายรูป (โบรชัวร์ ฯลฯ) ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(function (el) {
      el.addEventListener('click', function () {
        lbImg.src = el.getAttribute('data-lightbox');
        lbImg.alt = el.getAttribute('data-lightbox-alt') || 'ภาพขยาย';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        track('brochure_view', { src: lbImg.src });
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target !== lbImg) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  /* ---------- Reveal ตอน scroll (ปิดอัตโนมัติเมื่อผู้ใช้ลดการเคลื่อนไหว) ---------- */
  var cards = document.querySelectorAll('.card, .section-head, .cta-banner, .steps li');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    cards.forEach(function (el, i) {
      el.classList.add('reveal');
      if (el.classList.contains('card')) el.classList.add('reveal-d' + ((i % 3) + 1));
      io.observe(el);
    });
  }

  /* ---------- Page view events ---------- */
  var pg = document.body.dataset.page || '';
  if (pg === 'child-insurance') track('child_insurance_view', {});
  if (pg === 'car-insurance') track('car_insurance_view', {});
  if (pg === 'premium') track('premium_table_view', {});
  if (pg === 'claims') track('claim_case_view', {});
})();
