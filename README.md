# FIN Broker Online — เว็บไซต์ finbrokeronline.com

เว็บไซต์ประกันออนไลน์ static HTML เน้น SEO และปิดการขายผ่าน LINE OA (@finforkids)
สร้างตามสเปค `FINBROKERONLINE_Website_SEO_Design.md` (ระยะที่ 1 + หน้าเนื้อหาหลัก)

## รันดูในเครื่อง

```bash
npx http-server -p 8091
# เปิด http://localhost:8091
```

## โครงสร้าง

- `index.html` — หน้าแรก (เขียนแยก มีป๊อปอัปเลือกประกัน) **ไม่ได้ generate จาก build script**
- `go/line/index.html` — หน้า redirect ไป LINE พร้อมเก็บ intent (เขียนแยกเช่นกัน)
- หน้าอื่นทั้งหมด generate จาก `site-src/*.mjs` ด้วยคำสั่ง:

```bash
node build.mjs
```

- `site-src/layout.mjs` — header/footer/cookie banner/sticky CTA กลาง (แก้เมนูที่นี่ที่เดียว แล้ว build ใหม่ — อย่าลืมแก้ header/footer ใน index.html ให้ตรงกันด้วย)
- `site-src/pages-child.mjs` — หน้ากลุ่มประกันเด็ก 8 หน้า (รวมตารางเบี้ย/ความคุ้มครอง/เครื่องคำนวณผ่อน)
- `site-src/pages-main.mjs` — ประกันรถ เคลม บทความ เกี่ยวกับเรา ติดต่อ ใบอนุญาต ร้องเรียน
- `site-src/pages-legal.mjs` — Privacy / Cookie / Terms / Disclaimer
- build.mjs สร้าง `sitemap.xml` + `robots.txt` ให้อัตโนมัติ

## สิ่งที่ต้องทำก่อนขึ้น production

1. **โลโก้จริง** — วางไฟล์โลโก้ FIN Insurance Broker ที่ `assets/img/logo.png` แล้วแก้ `.brand` ใน layout.mjs + index.html (ตอนนี้ใช้ wordmark ตัวอักษรชั่วคราว — สเปคห้ามสร้างโลโก้ใหม่)
2. **ภาพ OG** — เพิ่ม `assets/img/og-cover.png` (1200×630) สำหรับแชร์โซเชียล
3. **ภาพ Hero** — แทนการ์ดตัวเลขในหน้าแรกด้วยภาพครอบครัวไทย+รถยนต์ (WebP ≤350KB)
4. **เลขที่ใบอนุญาต + ชื่อนิติบุคคล** — กรอกจริงใน footer (layout.mjs + index.html) และหน้า `/license/`
5. **ลิงก์ Facebook / TikTok จริง** — ตอนนี้ชี้ไปหน้าหลักของแพลตฟอร์ม
6. **LINE OA** — ตรวจว่า `@finforkids` เปิดรับ oaMessage แล้ว (ใน `go/line/index.html` เปลี่ยนเป็นลิงก์ lin.ee ได้)
7. **Google Analytics / GTM** — โค้ดยิง event เข้า `dataLayer` แล้ว (line_click, insurance_type_selected, plan_selected ฯลฯ) แค่เพิ่ม GTM snippet ในทุกหน้า
8. **Search Console** — ยืนยันโดเมนและส่ง sitemap.xml

## Deploy ขึ้น Vercel

```bash
cd finbrokeronline-website
vercel deploy --prod
# ผูกโดเมน finbrokeronline.com ใน Vercel Dashboard → Domains
```

## เฟสถัดไป (ตามสเปค)

- ระยะที่ 2: เขียนบทความจริง 8 โรค + ความรู้ประกัน (การ์ดใน /articles/ ติดป้าย "เร็ว ๆ นี้" รออยู่แล้ว)
- ระยะที่ 3: เพิ่มเคสเคลมจริง (โครงหน้า /claims/ พร้อมแล้ว — อย่าลืมปิดข้อมูลส่วนบุคคลทุกจุด)
- ระยะที่ 4: ประกันรถยนต์ — **ถูกนำออกจากเว็บตามนโยบาย (2026-07-14) แสดงเฉพาะประกันเด็ก** ถ้าจะเปิดกลับ ดู git history / สเปคต้นฉบับ
- ระยะที่ 5: ระบบสมัครออนไลน์ /apply/ (มี export package ของระบบเดิมใน `../export-package/` ใช้ต่อได้)
