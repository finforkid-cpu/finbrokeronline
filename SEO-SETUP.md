# คู่มือ SEO + ติดตั้งเครื่องมือ — finbrokeronline.com

> อัปเดต 2026-07-15 · on-page SEO ทำครบทุกหน้าแล้ว (ดูรายการท้ายไฟล์)
> เหลือขั้นตอนที่ต้องทำ **หลัง deploy เว็บขึ้นโดเมนจริง** ตามลำดับด้านล่าง

---

## 1) Google Search Console (สำคัญที่สุด — ทำก่อน)

1. ไปที่ https://search.google.com/search-console → Add property แบบ **URL prefix**: `https://www.finbrokeronline.com/`
2. เลือกวิธียืนยัน **HTML tag** จะได้แท็กแบบ `<meta name="google-site-verification" content="AbCdEf...">`
3. เอาเฉพาะค่าใน `content` ไปใส่ 2 ที่:
   - `site-src/layout.mjs` → `SEO_TOOLS.GSC_VERIFICATION = 'AbCdEf...'` แล้วรัน `node build.mjs`
   - `index.html` (หน้าแรกเขียนมือ) → วางแท็กเต็มใต้คอมเมนต์ `<!-- Google Search Console: ... -->`
4. Deploy แล้วกด Verify
5. เมนู **Sitemaps** → ส่ง `https://www.finbrokeronline.com/sitemap.xml`
6. เมนู **URL Inspection** → วาง URL หน้าแรก + หน้าสำคัญ → กด **Request Indexing** (เร่งให้ Google เก็บเร็วขึ้น)

## 2) Google Analytics 4

1. ไปที่ https://analytics.google.com → สร้าง Property ใหม่ (ประเทศไทย, สกุลเงิน THB)
2. สร้าง Web Data Stream ด้วยโดเมน `www.finbrokeronline.com` → ได้ **Measurement ID** รูปแบบ `G-XXXXXXXXXX`
3. เปิดไฟล์ `assets/js/main.js` บรรทัดบน ๆ → ใส่ `var GA4_ID = 'G-XXXXXXXXXX';` → เซฟ (ไม่ต้อง build ใหม่ ใช้ได้ทุกหน้าทันที)
4. ระบบที่วางไว้ให้แล้ว:
   - **Consent Mode v2** — เริ่มต้น denied ทั้งหมด และอัปเดตตามที่ผู้ใช้เลือกใน cookie banner (ตรงตาม PDPA/GDPR)
   - Event ที่ยิงเข้า GA อัตโนมัติ: `line_click` (พร้อม intent + หน้า), `plan_selected`, `article_filter`, `brochure_view`, `cookie_consent` ฯลฯ
   - แนะนำไปที่ GA4 → Admin → Events → ตั้ง `line_click` เป็น **Key event (Conversion)** เพราะเป้าหมายเว็บคือทัก LINE

*(ทางเลือก: ถ้าอยากใช้ Google Tag Manager ให้ใส่ `GTM_ID` แทนและเว้น `GA4_ID` ว่าง แล้วตั้งค่า GA4 tag ใน GTM)*

## 3) Bing Webmaster Tools (ฟรี ได้ traffic เพิ่ม)

- https://www.bing.com/webmasters → เลือก **Import from Google Search Console** (ง่ายสุด ทำหลังข้อ 1 เสร็จ)

## 4) Google Business Profile (ถ้ามีที่อยู่ออฟฟิศ/พื้นที่ให้บริการ)

- https://business.google.com → สร้างโปรไฟล์ "FIN Insurance Broker" หมวด Insurance broker
- ช่วยให้ติดผลค้นหาแบรนด์ + Google Maps และเพิ่มความน่าเชื่อถือ E-E-A-T

## 5) หลังเว็บติด index แล้ว (2–4 สัปดาห์แรก)

- ดู Search Console → **Performance** ว่าติดคำไหนบ้าง อันดับเท่าไหร่ → ปรับ title/เนื้อหาหน้าที่อันดับ 5–20 ให้ตรง search intent มากขึ้น
- เขียนบทความใหม่สม่ำเสมอ (ระบบบทความมีอยู่แล้ว — เพิ่มใน `site-src/articles-data.mjs` แล้ว build)
- หา backlink คุณภาพ: โปรไฟล์ Facebook/TikTok ใส่ลิงก์เว็บ, ไดเรกทอรีธุรกิจ, กลุ่มแม่และเด็ก (แบบไม่สแปม)

---

## แผนคีย์เวิร์ดหลักของแต่ละหน้า (ทำไว้แล้วใน title/H1/เนื้อหา)

| หน้า | คีย์เวิร์ดเป้าหมาย |
|---|---|
| หน้าแรก | ประกันสุขภาพเด็ก, FIN FOR KIDS PLUS, ประกันเด็ก 8 โรคฮิต |
| /child-insurance/fin-for-kids-plus/ | ประกันสุขภาพเด็ก ราคา, ความคุ้มครอง |
| /child-insurance/plans/ | เปรียบเทียบแผนประกันเด็ก |
| /child-insurance/premium/ | ค่าเบี้ยประกันเด็ก, ผ่อนค่าเบี้ย |
| /child-insurance/diseases/ | โรคที่ประกันเด็กคุ้มครอง แยกช่วงอายุ |
| บทความ Ep.1–8 | ชื่อโรค + "ในเด็ก" (ไข้หวัดใหญ่ในเด็ก, RSV ในเด็ก, ไข้เลือดออกในเด็ก ฯลฯ) |
| บทความ Ep.21–30 | คำถามประกัน (IPD OPD ต่างกันอย่างไร, ระยะรอคอย, เอกสารเคลม ฯลฯ) |

## ความคาดหวังที่ตรงความจริง

- SEO ใช้เวลา: เว็บใหม่มักเริ่มเห็นอันดับใน 1–3 เดือน และไต่อันดับจริงจังใน 3–6 เดือน
- คำแข่งสูง ("ประกันสุขภาพเด็ก") ต้องอาศัยเวลา + backlink + คอนเทนต์ต่อเนื่อง
- คำ long-tail (ชื่อโรค + ในเด็ก, คำถามเคลม) คือจุดแข็งของเว็บนี้ — บทความ 30 ตัวถูกออกแบบมาชิงคำกลุ่มนี้ และมีโอกาสติดหน้าแรกเร็วกว่า

---

## รายการ on-page SEO ที่ทำเสร็จแล้ว (2026-07-15)

- ✅ ทุกหน้า: title + meta description เฉพาะหน้า, canonical, robots (max-image-preview:large)
- ✅ Open Graph ครบ (type/site_name/title/desc/url/image/locale) + Twitter Card
- ✅ บทความ: og:type=article + article:published_time + schema.org Article + BreadcrumbList
- ✅ Schema Organization + WebSite ทุกหน้า (มี @id เชื่อมโยงกัน), FAQPage ที่หน้าแรก
- ✅ Favicon ครบชุด (SVG + PNG 32/180/512) + theme-color
- ✅ sitemap.xml (49 URLs) + robots.txt (บล็อก /go/ หน้า redirect)
- ✅ หน้า /go/line เป็น noindex, nofollow
- ✅ รูปทุกรูปมี alt, width/height (กัน CLS), lazy loading
- ✅ ภาษาไทย lang="th", ฟอนต์ preconnect + display=swap
- ✅ GA4/GTM loader + Consent Mode v2 (รอใส่ ID)
