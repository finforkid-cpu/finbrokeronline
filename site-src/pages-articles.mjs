// สร้างหน้ารวมบทความ /articles/ และหน้าอ่านแต่ละบทความ /articles/<slug>/
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { breadcrumb, ctaBanner, SITE } from './layout.mjs';
import { ARTICLES, CATEGORIES } from './articles-data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const BC_HOME = ['หน้าแรก', '/'];

const THAI_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
export function thaiDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${THAI_MONTHS[m - 1]} ${y + 543}`;
}

// ภาพหน้าปก: ใช้ภาพถ่าย .jpg ถ้ามี (ดาวน์โหลดจาก Pexels) ไม่มีจึง fallback เป็น SVG generate
function cover(key) {
  return existsSync(join(ROOT, `assets/img/covers/${key}.jpg`))
    ? `/assets/img/covers/${key}.jpg`
    : `/assets/img/covers/${key}.svg`;
}
// ภาพประกอบแทรกในเนื้อหาบทความ (ถ้ามีไฟล์ <key>-in.jpg)
function inlinePhoto(key) {
  return existsSync(join(ROOT, `assets/img/covers/${key}-in.jpg`))
    ? `/assets/img/covers/${key}-in.jpg`
    : null;
}

// ---------- การ์ดบทความในหน้ารวม ----------
function articleCard(a) {
  const cat = CATEGORIES[a.cat];
  return `<article class="card post-card reveal" data-cat="${a.cat}">
  <a class="post-cover" href="/articles/${a.slug}/">
    <img src="${cover(a.cover)}" width="800" height="500" loading="lazy" alt="ภาพหน้าปกบทความ: ${a.title}">
    <span class="cover-badge">${cat.emoji} ${cat.label}</span>
    <span class="cover-time">⏱ ${a.read} นาที</span>
  </a>
  <div class="post-body">
    <h3><a href="/articles/${a.slug}/"><span class="ep">Ep.${a.ep}</span> ${a.title}</a></h3>
    <p>${a.excerpt}</p>
    <div class="post-foot">
      <span>${thaiDate(a.date)}</span>
      <a href="/articles/${a.slug}/">อ่านต่อ →</a>
    </div>
  </div>
</article>`;
}

// ---------- หน้ารวมบทความ ----------
export function articlesIndexPage() {
  const sorted = [...ARTICLES].sort((x, y) => x.ep - y.ep);
  const counts = {};
  for (const a of ARTICLES) counts[a.cat] = (counts[a.cat] || 0) + 1;

  const pills = [`<button class="pill" aria-pressed="true" data-filter="all">📚 ทั้งหมด <span class="cnt">${ARTICLES.length}</span></button>`]
    .concat(Object.entries(CATEGORIES)
      .filter(([k]) => counts[k])
      .map(([k, c]) => `<button class="pill" aria-pressed="false" data-filter="${k}">${c.emoji} ${c.label} <span class="cnt">${counts[k]}</span></button>`))
    .join('');

  const content = `
${breadcrumb([BC_HOME, ['บทความ']])}
<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="kicker">📖 ARTICLES</span>
      <h2>เลือกอ่านตามหมวดหมู่</h2>
      <p>รวมความรู้โรคฮิตในเด็ก การดูแล ป้องกัน และความรู้ประกันสุขภาพเด็ก — คัดและตรวจสอบโดยทีมงาน</p>
    </div>
    <div class="filter-pills" role="group" aria-label="กรองบทความตามหมวด">${pills}</div>
    <div class="grid grid-3" id="article-grid">
      ${sorted.map(articleCard).join('\n')}
    </div>
  </div>
</section>

<script>
(function(){
  var grid=document.getElementById('article-grid');
  document.querySelectorAll('.pill').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.pill').forEach(function(b){b.setAttribute('aria-pressed','false')});
      btn.setAttribute('aria-pressed','true');
      var f=btn.getAttribute('data-filter');
      grid.querySelectorAll('.post-card').forEach(function(c){
        c.style.display=(f==='all'||c.getAttribute('data-cat')===f)?'':'none';
      });
      if(window.finTrack) finTrack('article_filter',{category:f});
    });
  });
})();
</script>

${ctaBanner('articles', 'อ่านแล้วอยากปรึกษาเรื่องแผนประกัน?', 'ทักตัวแทนได้โดยตรงทาง LINE ช่วยแนะนำแผนที่เหมาะกับอายุลูกและตอบทุกข้อสงสัย')}
`;

  return {
    file: 'articles/index.html',
    path: '/articles/',
    title: 'บทความความรู้ประกันสุขภาพเด็กและโรคฮิตในเด็ก | FIN Broker Online',
    desc: 'รวม 30 บทความความรู้โรคฮิตในเด็ก 8 โรค การดูแล ป้องกัน วัคซีน และความรู้ประกันสุขภาพเด็ก FIN FOR KIDS PLUS เขียนและตรวจสอบโดยทีมงาน',
    page: 'articles', active: 'articles',
    content,
  };
}

// ---------- render บล็อกเนื้อหา ----------
function renderBlock(b) {
  if (b.t === 'p') return `<p>${b.c}</p>`;
  if (b.t === 'ul') return `<ul>${b.c.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  return '';
}

// ---------- หน้าอ่านบทความ ----------
export function articlePage(a) {
  const cat = CATEGORIES[a.cat];
  const related = ARTICLES.filter((x) => x.slug !== a.slug && x.cat === a.cat).slice(0, 3);
  const relatedFill = related.length < 3
    ? related.concat(ARTICLES.filter((x) => x.slug !== a.slug && !related.includes(x)).slice(0, 3 - related.length))
    : related;

  const toc = a.sections.map((s, i) => `<li><a href="#sec-${i + 1}">${s.title}</a></li>`).join('');
  const inline = inlinePhoto(a.cover);
  const inlineFig = inline
    ? `<figure class="art-photo"><img src="${inline}" width="1200" height="675" loading="lazy" alt="ภาพประกอบ: ${a.title}"></figure>`
    : '';
  const body = a.sections.map((s, i) =>
    `<h2 id="sec-${i + 1}"><span class="no">${i + 1}</span>${s.title}</h2>
${s.body.map(renderBlock).join('\n')}${i === 0 ? '\n' + inlineFig : ''}`).join('\n');

  const ldjson = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: a.title, description: a.excerpt,
      image: SITE + cover(a.cover),
      datePublished: a.date, dateModified: a.date,
      author: { '@type': 'Organization', name: 'ทีมงาน FIN Insurance Broker' },
      publisher: { '@type': 'Organization', name: 'FIN Insurance Broker' },
      mainEntityOfPage: SITE + `/articles/${a.slug}/`,
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'บทความ', item: SITE + '/articles/' },
        { '@type': 'ListItem', position: 3, name: a.title },
      ],
    },
  ];

  const content = `
${breadcrumb([BC_HOME, ['บทความ', '/articles/'], [`Ep.${a.ep}`]])}

<section class="article-hero">
  <div class="container">
    <span class="cat-chip">${cat.emoji} ${cat.label}</span>
    <h1><span class="ep">Ep.${a.ep}</span> ${a.title}</h1>
    <div class="art-meta">
      <span>📅 เผยแพร่ ${thaiDate(a.date)}</span>
      <span>⏱ อ่าน ${a.read} นาที</span>
      <span>✍️ โดย ทีมงาน FIN Insurance Broker</span>
    </div>
  </div>
  <div class="bg-emoji" aria-hidden="true">${cat.emoji}</div>
</section>

<section class="section"><div class="container prose article-body" style="max-width:820px">

  <figure class="art-photo art-cover-photo">
    <img src="${cover(a.cover)}" width="800" height="500" alt="ภาพหน้าปกบทความ: ${a.title}">
  </figure>

  <div class="answer-box">
    <div class="lbl">💡 สรุปคำตอบ</div>
    <p style="margin:0">${a.answer}</p>
  </div>

  <div class="toc">
    <b>📑 สารบัญ</b>
    <ol>${toc}</ol>
  </div>

  ${body}

  <div class="author-line">
    <span>✍️ ผู้เขียน: ทีมงาน FIN Insurance Broker</span>
    <span>🔎 ตรวจสอบโดย: ตัวแทนผู้มีใบอนุญาตนายหน้าประกันภัย</span>
    <span>🗓️ อัปเดตล่าสุด: ${thaiDate(a.date)}</span>
  </div>

  <div class="plan-cta">
    <div class="t">
      <b>สนใจประกันสุขภาพเด็ก FIN FOR KIDS PLUS?</b>
      <p>คุ้มครองโรคฮิตในเด็กสูงสุด 8 โรค พร้อม IPD, OPD และอุบัติเหตุ — ให้ตัวแทนช่วยเช็กแผนตามอายุลูก</p>
    </div>
    <a class="btn btn-line" href="/go/line/?intent=article-${a.slug}" data-line-intent="article-${a.slug}">💬 ปรึกษาทาง LINE</a>
  </div>

  <div class="note" style="margin-top:8px">บทความนี้จัดทำเพื่อให้ความรู้ทั่วไป ไม่ใช่คำวินิจฉัยหรือคำแนะนำทางการแพทย์ หากบุตรหลานมีอาการเจ็บป่วยควรปรึกษาแพทย์ · ข้อมูลความคุ้มครองเป็นไปตามเงื่อนไขในกรมธรรม์ · ภาพประกอบจาก Pexels (Pexels License)</div>

  <h2 style="margin-top:44px">🔗 แผนประกันที่เกี่ยวข้อง</h2>
  <ul>
    <li><a href="/child-insurance/fin-for-kids-plus/">FIN FOR KIDS PLUS — รายละเอียดผลิตภัณฑ์</a></li>
    <li><a href="/child-insurance/diseases/">โรคที่ได้รับความคุ้มครอง แยกตามช่วงอายุ</a></li>
    <li><a href="/child-insurance/premium/">ตารางค่าเบี้ย + เครื่องคำนวณการผ่อน</a></li>
  </ul>

</div></section>

<section class="section section-alt"><div class="container">
  <div class="section-head"><span class="kicker">อ่านต่อ</span><h2>บทความที่เกี่ยวข้อง</h2></div>
  <div class="grid grid-3">
    ${relatedFill.map(articleCard).join('\n')}
  </div>
</div></section>
`;

  return {
    file: `articles/${a.slug}/index.html`,
    path: `/articles/${a.slug}/`,
    title: `${a.title} | FIN Broker Online`,
    desc: a.excerpt,
    page: 'article', active: 'articles',
    ogType: 'article', published: a.date, modified: a.date,
    ogImage: SITE + cover(a.cover),
    ldjson,
    content,
  };
}

export function allArticlePages() {
  return ARTICLES.map(articlePage);
}
