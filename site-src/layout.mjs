// Layout กลางของทุกหน้า — แก้ header/footer ที่นี่ที่เดียว แล้วรัน node build.mjs
// หมายเหตุ: หน้าแรก (index.html) เขียนแยกไว้ต่างหาก ไม่ได้ generate จากไฟล์นี้
// โดเมนหลัก (canonical) — ต้องตรงกับ primary domain ใน Vercel (www → redirect มาที่นี่)
export const SITE = 'https://finbrokeronline.com';

// ===== เครื่องมือ SEO / Analytics =====
// ใส่ค่าแล้วรัน node build.mjs — ถ้าเว้นว่างจะไม่ render อะไรลงหน้าเว็บ
// ⚠ หน้าแรก index.html เขียนมือ: ต้องวางแท็ก GSC เองในไฟล์ (ดู SEO-SETUP.md)
export const SEO_TOOLS = {
  GSC_VERIFICATION: '',  // โค้ดยืนยัน Google Search Console (เฉพาะส่วน content ของ meta google-site-verification)
};

// JSON-LD Organization + WebSite — ใส่ทุกหน้าเพื่อให้ Google รู้จักแบรนด์
export const ORG_LD = {
  '@context': 'https://schema.org', '@type': 'InsuranceAgency',
  '@id': SITE + '/#organization',
  name: 'FIN Insurance Broker', alternateName: 'FIN Broker Online',
  legalName: 'บริษัท ฟิน อินชัวรันส์ โบรคเกอร์ จำกัด',
  identifier: '0105562119691',
  url: SITE + '/', logo: SITE + '/assets/img/icon-512.png',
  slogan: 'เรื่องประกัน ✓ เราชัดเจน',
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'ใบอนุญาตนายหน้าประกันวินาศภัย เลขที่ ว00021/2562 (คปภ.)' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'ใบอนุญาตนายหน้าประกันชีวิต เลขที่ ช00008/2564 (คปภ.)' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'ใบอนุญาตเสนอขายอิเล็กทรอนิกส์ เลขที่ อลว021021000/2564 (คปภ.)' },
  ],
  sameAs: ['https://www.facebook.com/finforkid', 'https://www.tiktok.com/@finforkid'],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', url: SITE + '/contact/', availableLanguage: 'th' }],
};
export const WEBSITE_LD = {
  '@context': 'https://schema.org', '@type': 'WebSite',
  '@id': SITE + '/#website',
  name: 'FIN Broker Online', url: SITE + '/', inLanguage: 'th',
  publisher: { '@id': SITE + '/#organization' },
};

const NAV = [
  ['/', 'หน้าแรก', 'home'],
  ['/child-insurance/', 'ประกันเด็ก', 'child'],
  ['/child-insurance/plans/', 'เปรียบเทียบแผน', 'plans'],
  ['/claims/', 'เคสเคลมจริง', 'claims'],
  ['/articles/', 'บทความ', 'articles'],
  ['/about/', 'เกี่ยวกับเรา', 'about'],
  ['/contact/', 'ติดต่อเรา', 'contact'],
];

export function breadcrumb(items) {
  // items: [['ชื่อ','/path/'],...] ตัวสุดท้ายคือหน้าปัจจุบัน (ไม่มีลิงก์)
  const lis = items.map((it, i) =>
    i === items.length - 1
      ? `<li aria-current="page">${it[0]}</li>`
      : `<li><a href="${it[1]}">${it[0]}</a></li>`
  ).join('');
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it[0],
      ...(i < items.length - 1 ? { item: SITE + it[1] } : {}),
    })),
  };
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><div class="container"><ol>${lis}</ol></div></nav>
<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
}

export function pageHero({ h1, sub, badges = [], btns = '' }) {
  return `<section class="page-hero"><div class="container">
<h1>${h1}</h1>
${sub ? `<p>${sub}</p>` : ''}
${badges.length ? `<div class="hero-badges" style="margin-top:18px">${badges.map(b => `<span class="hero-badge">${b}</span>`).join('')}</div>` : ''}
${btns ? `<div class="hero-btns">${btns}</div>` : ''}
</div></section>`;
}

export function layout({ title, desc, path, page, active, content, ldjson = [], ogImage, ogType = 'website', published, modified, noindex = false }) {
  const og = ogImage || `${SITE}/assets/img/FFKP001.jpg`;
  const nav = NAV.map(([href, label, key]) =>
    `<a href="${href}"${key === active ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ');
  const allLd = [ORG_LD, WEBSITE_LD, ...ldjson];
  const ld = allLd.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const gsc = SEO_TOOLS.GSC_VERIFICATION
    ? `\n<meta name="google-site-verification" content="${SEO_TOOLS.GSC_VERIFICATION}">` : '';
  const articleMeta = ogType === 'article' && published
    ? `\n<meta property="article:published_time" content="${published}">\n<meta property="article:modified_time" content="${modified || published}">` : '';
  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">${gsc}
<link rel="canonical" href="${SITE}${path}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="FIN Broker Online">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${og}">
<meta property="og:locale" content="th_TH">${articleMeta}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#1D1B67">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/main.css">
${ld}
</head>
<body data-page="${page}">

<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/">
      <span class="brand-mark">FIN</span>
      <span class="brand-text">Insurance Broker<small>เรื่องประกัน ✓ เราชัดเจน</small></span>
    </a>
    <nav class="main-nav" aria-label="เมนูหลัก">
      ${nav}
    </nav>
    <div class="header-cta">
      <a class="btn btn-line btn-sm" href="/go/line/?intent=header" data-line-intent="header">💬 แอด LINE ปรึกษาตัวแทน</a>
      <button class="nav-toggle" aria-label="เปิดเมนู" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

${content}

<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="brand-mark">FIN <em>Insurance Broker</em></div>
        <div class="slogan">เรื่องประกัน <em>✓</em> เราชัดเจน</div>
        <p>บริษัท ฟิน อินชัวรันส์ โบรคเกอร์ จำกัด<br>ใบอนุญาตนายหน้าประกันวินาศภัย เลขที่ ว00021/2562<br>ผลิตภัณฑ์ประกันสุขภาพเด็กรับประกันภัยโดย MSIG</p>
      </div>
      <div>
        <h4>ประกันสุขภาพเด็ก</h4>
        <ul>
          <li><a href="/child-insurance/fin-for-kids-plus/">FIN FOR KIDS PLUS</a></li>
          <li><a href="/child-insurance/coverage/">ตารางความคุ้มครอง</a></li>
          <li><a href="/child-insurance/premium/">ค่าเบี้ย</a></li>
          <li><a href="/child-insurance/how-to-claim/">วิธีเคลม</a></li>
          <li><a href="/child-insurance/faq/">คำถามที่พบบ่อย</a></li>
        </ul>
      </div>
      <div>
        <h4>เมนูลัด</h4>
        <ul>
          <li><a href="/child-insurance/plans/">เปรียบเทียบแผน</a></li>
          <li><a href="/claims/">เคสเคลมจริง</a></li>
          <li><a href="/articles/">บทความ</a></li>
          <li><a href="/about/">เกี่ยวกับเรา</a></li>
          <li><a href="/contact/">ติดต่อเรา</a></li>
        </ul>
      </div>
      <div>
        <h4>ติดตามเรา</h4>
        <ul>
          <li><a href="/go/line/?intent=footer" data-line-intent="footer">LINE: @finforkids</a></li>
          <li><a href="https://www.facebook.com/finforkid" rel="noopener" target="_blank">Facebook: ฟินประกันเด็ก</a></li>
          <li><a href="https://m.me/finforkid" rel="noopener" target="_blank">Messenger: Fin For Kids</a></li>
          <li><a href="https://www.tiktok.com/@finforkid" rel="noopener" target="_blank">TikTok: @finforkid</a></li>
          <li><a href="/complaints/">ช่องทางร้องเรียน</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-company">
      <div class="fc-info">
        <b>บริษัท ฟิน อินชัวรันส์ โบรคเกอร์ จำกัด</b>
        <p>เราดำเนินธุรกิจที่ปรึกษาด้านประกันวินาศภัย · ทะเบียนพาณิชย์เลขที่ 0105562119691 (ทุนจดทะเบียน 100 ล้านบาท)<br>ภายใต้การกำกับดูแลของ คปภ. (สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย)</p>
        <ul class="fc-licenses">
          <li>✓ ใบอนุญาตนายหน้าประกันวินาศภัย เลขที่ ว00021/2562</li>
          <li>✓ ใบอนุญาตนายหน้าประกันชีวิต เลขที่ ช00008/2564</li>
          <li>✓ ใบอนุญาตเสนอขายอิเล็กทรอนิกส์ เลขที่ อลว021021000/2564</li>
        </ul>
      </div>
      <div class="fc-certs">
        <a href="/license/" aria-label="ดูรายละเอียดใบอนุญาตนายหน้าประกันวินาศภัย">
          <img src="/assets/img/license-oic-nonlife.jpg" width="1205" height="819" loading="lazy" alt="ใบอนุญาตนายหน้าประกันวินาศภัย เลขที่ ว00021/2562 จาก คปภ. — บริษัท ฟิน อินชัวรันส์ โบรคเกอร์ จำกัด">
          <span>ใบอนุญาตนายหน้าประกันวินาศภัย</span>
        </a>
        <a href="/license/" aria-label="ดูรายละเอียดใบอนุญาตนายหน้าประกันชีวิต">
          <img src="/assets/img/license-oic-life.jpg" width="1007" height="638" loading="lazy" alt="ใบอนุญาตนายหน้าประกันชีวิต เลขที่ ช00008/2564 จาก คปภ. — บริษัท ฟิน อินชัวรันส์ โบรคเกอร์ จำกัด">
          <span>ใบอนุญาตนายหน้าประกันชีวิต</span>
        </a>
      </div>
    </div>
    <div class="footer-legal">
      <a href="/privacy-policy/">Privacy Policy</a>
      <a href="/cookie-policy/">Cookie Policy</a>
      <a href="/terms/">Terms</a>
      <a href="/disclaimer/">Disclaimer</a>
      <a href="/license/">ใบอนุญาต</a>
      <a href="/sitemap.xml">Sitemap</a>
      <a href="#" id="cookie-reopen">ตั้งค่าคุกกี้</a>
    </div>
    <p class="footer-note">ข้อมูลความคุ้มครอง เบี้ยประกัน และการพิจารณารับประกันภัย เป็นไปตามเงื่อนไขกรมธรรม์และบริษัทรับประกันภัยกำหนด · ข้อมูลบนเว็บไซต์เป็นข้อมูลเบื้องต้นเพื่อประกอบการพิจารณา ผู้ขอเอาประกันภัยควรศึกษารายละเอียดความคุ้มครอง เงื่อนไข และข้อยกเว้นในกรมธรรม์ก่อนตัดสินใจทุกครั้ง</p>
    <p class="footer-copy">© 2026 บริษัท ฟิน อินชัวรันส์ โบรคเกอร์ จำกัด · FIN FOR KIDS PLUS รับประกันภัยโดย บริษัท เอ็ม เอส ไอ จี ประกันภัย (ประเทศไทย) จำกัด (มหาชน)</p>
  </div>
</footer>

<div class="cookie-banner" id="cookie-banner" role="region" aria-label="การตั้งค่าคุกกี้">
  <p>เว็บไซต์นี้ใช้คุกกี้เพื่อการทำงานที่จำเป็น การวิเคราะห์ และการตลาด อ่านรายละเอียดได้ที่ <a href="/cookie-policy/">นโยบายคุกกี้</a></p>
  <div id="cookie-prefs" class="cookie-prefs" hidden>
    <label><input type="checkbox" checked disabled> คุกกี้จำเป็น (ปิดไม่ได้)</label>
    <label><input type="checkbox" name="analytics" checked> คุกกี้วิเคราะห์</label>
    <label><input type="checkbox" name="ads"> คุกกี้โฆษณา</label>
    <button class="btn btn-red btn-sm" id="cookie-save" style="margin:8px 0 12px">บันทึกการตั้งค่า</button>
  </div>
  <div class="cookie-btns">
    <button class="btn btn-red btn-sm" id="cookie-accept-all">ยอมรับทั้งหมด</button>
    <button class="btn btn-outline btn-sm" id="cookie-reject">ปฏิเสธที่ไม่จำเป็น</button>
    <button class="btn btn-outline btn-sm" id="cookie-settings">ตั้งค่า</button>
  </div>
</div>

<div class="sticky-cta">
  <div class="sticky-cta-inner">
    <a class="btn btn-red" href="/child-insurance/plans/">ดูแผนประกัน</a>
    <a class="btn btn-line" href="/go/line/?intent=sticky-mobile" data-line-intent="sticky-mobile">แอด LINE</a>
  </div>
</div>

<div class="float-chat" aria-label="ช่องทางแชทด่วน">
  <a class="float-btn float-msgr" href="https://m.me/finforkid" target="_blank" rel="noopener" aria-label="แชทผ่าน Facebook Messenger" title="แชทผ่าน Messenger" onclick="window.finTrack&&finTrack('messenger_click',{page:location.pathname})">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.444 5.544 3.7 7.24V22l3.398-1.874c.906.252 1.871.39 2.902.39 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.062 12.44-2.554-2.727-4.98 2.727 5.48-5.82 2.613 2.727 4.92-2.727-5.479 5.82z"/></svg>
  </a>
  <a class="float-btn float-line" href="/go/line/?intent=float" data-line-intent="float" aria-label="แอด LINE ปรึกษาตัวแทนฟรี" title="แอด LINE @finforkids">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
  </a>
</div>

<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

export function ctaBanner(intent, h2 = 'ยังไม่แน่ใจว่าควรเลือกแผนไหน?', p = 'ส่งอายุบุตรหลานให้ตัวแทนช่วยตรวจสอบและแนะนำแผนได้ทาง LINE') {
  return `<section class="section"><div class="container">
<div class="cta-banner">
  <h2>${h2}</h2>
  <p>${p}</p>
  <a class="btn btn-line btn-lg" href="/go/line/?intent=${intent}" data-line-intent="${intent}">💬 แอด LINE @finforkids</a>
</div>
</div></section>`;
}

export const DISCLAIMER_PRODUCT = `<div class="container" style="padding-bottom:48px"><p class="disclaimer">ข้อมูลความคุ้มครองและค่าเบี้ยบนเว็บไซต์เป็นข้อมูลเบื้องต้นเพื่อประกอบการพิจารณา รายละเอียดความคุ้มครอง เงื่อนไข ระยะรอคอย ข้อยกเว้น และการพิจารณารับประกันภัยเป็นไปตามกรมธรรม์และหลักเกณฑ์ของบริษัทผู้รับประกันภัย ผู้ขอเอาประกันภัยควรศึกษารายละเอียดก่อนตัดสินใจทำประกันภัยทุกครั้ง</p></div>`;
