// สร้างไฟล์ HTML ทุกหน้า (ยกเว้นหน้าแรก index.html และ go/line ที่เขียนแยกไว้)
// วิธีใช้: node build.mjs
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, SITE } from './site-src/layout.mjs';
import { childPages } from './site-src/pages-child.mjs';
import { mainPages } from './site-src/pages-main.mjs';
import { legalPages } from './site-src/pages-legal.mjs';
import { articlesIndexPage, allArticlePages } from './site-src/pages-articles.mjs';
import { ARTICLES } from './site-src/articles-data.mjs';
import { COVERS, coverSvg } from './site-src/covers.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));

// ---------- 1) ภาพหน้าปกบทความ ----------
// ใช้ภาพถ่าย .jpg เป็นหลัก (assets/img/covers/<key>.jpg) — สร้าง SVG เป็น fallback
// เฉพาะปกที่ยังไม่มีภาพถ่ายเท่านั้น
const usedCovers = new Set(ARTICLES.map((a) => a.cover));
mkdirSync(join(ROOT, 'assets/img/covers'), { recursive: true });
let photoN = 0, svgN = 0;
for (const key of usedCovers) {
  if (existsSync(join(ROOT, `assets/img/covers/${key}.jpg`))) { photoN++; continue; }
  if (!COVERS[key]) { console.warn('⚠ ไม่มีทั้งภาพถ่ายและธีมหน้าปกสำหรับ:', key); continue; }
  writeFileSync(join(ROOT, `assets/img/covers/${key}.svg`), coverSvg(key), 'utf8');
  svgN++;
}
console.log(`✓ หน้าปกบทความ: ภาพถ่าย ${photoN} ปก, SVG fallback ${svgN} ปก`);

// ---------- 2) รวมทุกหน้า ----------
const pages = [
  ...childPages,
  ...mainPages,
  ...legalPages,
  articlesIndexPage(),
  ...allArticlePages(),
];

for (const p of pages) {
  const html = layout(p);
  const out = join(ROOT, p.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, 'utf8');
}
console.log(`✓ สร้างหน้าเว็บ ${pages.length} หน้า (รวมบทความ ${ARTICLES.length} บทความ)`);

// ---------- 3) sitemap.xml (เฉพาะหน้าที่ให้ index — ไม่รวม /go/) ----------
const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...pages.map((p) => p.path)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
console.log('✓ sitemap.xml (' + urls.length + ' URLs)');

// ---------- 4) robots.txt ----------
const robots = `User-agent: *
Allow: /
Disallow: /go/

Sitemap: ${SITE}/sitemap.xml
`;
writeFileSync(join(ROOT, 'robots.txt'), robots, 'utf8');
console.log('✓ robots.txt');
