// หน้าเว็บกลุ่มประกันสุขภาพเด็ก
import { breadcrumb, pageHero, ctaBanner, DISCLAIMER_PRODUCT, SITE } from './layout.mjs';

const BC_HOME = ['หน้าแรก', '/'];
const BC_CHILD = ['ประกันสุขภาพเด็ก', '/child-insurance/'];

/* ---------- ตารางความคุ้มครอง (ใช้ซ้ำหลายหน้า) ---------- */
const COVERAGE_TABLE = `<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>ความคุ้มครอง</th><th>Plus 1</th><th>Plus 2</th><th>Plus 3</th></tr></thead>
<tbody>
<tr><td>อุบัติเหตุต่อครั้ง</td><td class="num">20,000 บาท</td><td class="num">30,000 บาท</td><td class="num">50,000 บาท</td></tr>
<tr><td>IPD ต่อการเจ็บป่วยแต่ละครั้ง</td><td class="num">50,000 บาท</td><td class="num">75,000 บาท</td><td class="num">100,000 บาท</td></tr>
<tr><td>OPD โรคที่ระบุต่อครั้ง</td><td class="num">1,000 บาท</td><td class="num">1,500 บาท</td><td class="num">2,000 บาท</td></tr>
<tr><td>ค่าห้องผู้ป่วยปกติต่อวัน</td><td class="num">3,000 บาท</td><td class="num">3,000 บาท</td><td class="num">3,000 บาท</td></tr>
<tr><td>ห้อง ICU ต่อวัน</td><td class="num">6,000 บาท</td><td class="num">6,000 บาท</td><td class="num">6,000 บาท</td></tr>
<tr><td>อุบัติเหตุผู้เอาประกันภัย</td><td class="num">500,000 บาท</td><td class="num">500,000 บาท</td><td class="num">500,000 บาท</td></tr>
<tr><td>ค่าปลงศพตามเงื่อนไข</td><td class="num">10,000 บาท</td><td class="num">10,000 บาท</td><td class="num">10,000 บาท</td></tr>
</tbody></table></div>
<ul style="margin:16px 0 0 22px;color:var(--gray);font-size:.9rem">
<li>OPD คุ้มครองสูงสุด 30 วันต่อปี หรือ 7 ครั้งต่อโรค ตามรายละเอียดในกรมธรรม์</li>
<li>อุบัติเหตุไม่คุ้มครองกรณีที่เกิดจากการขับขี่หรือโดยสารรถจักรยานยนต์</li>
<li>มีระยะรอคอยการเจ็บป่วย 15 วัน</li>
<li>เงื่อนไขและข้อยกเว้นเป็นไปตามกรมธรรม์</li>
</ul>`;

const PREMIUM_TABLE = `<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>อายุบุตร/หลาน</th><th>Plus 1</th><th>Plus 2</th><th>Plus 3</th></tr></thead>
<tbody>
<tr><td>15 วัน–น้อยกว่า 1 ปี</td><td class="num">24,420 บาท</td><td class="num">32,620 บาท</td><td class="num">37,670 บาท</td></tr>
<tr><td>1–5 ปี</td><td class="num">23,050 บาท</td><td class="num">30,810 บาท</td><td class="num">35,930 บาท</td></tr>
<tr><td>6–20 ปี</td><td class="num">9,150 บาท</td><td class="num">11,660 บาท</td><td class="num">13,850 บาท</td></tr>
</tbody></table></div>
<p style="margin-top:10px;font-size:.9rem;color:var(--gray)">เบี้ยประกันภัยรายปี รวมอากรแสตมป์</p>`;

const DISEASES_TABS = `<div>
<div class="tabs" role="tablist">
  <button class="tab-btn" role="tab" aria-selected="true" data-tab="tab-infant">15 วัน–น้อยกว่า 1 ปี</button>
  <button class="tab-btn" role="tab" aria-selected="false" data-tab="tab-kid">1–20 ปี</button>
</div>
<div class="tab-panel card" id="tab-infant">
  <h3>อายุ 15 วัน–น้อยกว่า 1 ปี คุ้มครอง 5 โรค</h3>
  <ul>
    <li>ไข้หวัดใหญ่</li>
    <li>ไข้เลือดออก</li>
    <li>RSV</li>
    <li>โรคหัด</li>
    <li>โรคชิคุนกุนยา หรือโรคไข้ปวดข้อยุงลาย</li>
  </ul>
</div>
<div class="tab-panel card" id="tab-kid" hidden>
  <h3>อายุ 1–20 ปี คุ้มครอง 8 โรค</h3>
  <ul>
    <li>ไข้หวัดใหญ่</li>
    <li>ไข้เลือดออก</li>
    <li>RSV</li>
    <li>โรคหัด</li>
    <li>โรคชิคุนกุนยา หรือโรคไข้ปวดข้อยุงลาย</li>
    <li>โรคไส้ติ่งอักเสบเฉียบพลัน</li>
    <li>โรคมือ เท้า ปาก</li>
    <li>โรคสุกใส</li>
  </ul>
</div>
<p class="note" style="margin-top:16px">เด็กอายุต่ำกว่า 1 ปีได้รับความคุ้มครอง 5 โรค (ไม่ครบ 8 โรค) — โปรดเลือกดูตามช่วงอายุของบุตรหลาน</p>
</div>`;

export const childPages = [

/* ============ /child-insurance/ ============ */
{
  file: 'child-insurance/index.html',
  path: '/child-insurance/',
  title: 'ประกันสุขภาพเด็ก FIN FOR KIDS PLUS ราคาและความคุ้มครอง',
  desc: 'ประกันสุขภาพเด็ก FIN FOR KIDS PLUS สำหรับเด็กอายุ 15 วัน–20 ปี คุ้มครองโรคฮิตตามช่วงอายุ IPD OPD และอุบัติเหตุ เลือกได้ 3 แผน รับประกันภัยโดย MSIG พร้อมตัวแทนดูแลทาง LINE',
  page: 'child-insurance', active: 'child',
  ldjson: [{
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'ประกันสุขภาพเด็ก FIN FOR KIDS PLUS', serviceType: 'ประกันสุขภาพเด็ก',
    provider: { '@type': 'Organization', name: 'FIN Insurance Broker' },
    areaServed: 'TH', url: SITE + '/child-insurance/',
  }],
  content: `
${breadcrumb([BC_HOME, ['ประกันสุขภาพเด็ก']])}
${pageHero({
  h1: 'ประกันสุขภาพเด็ก FIN FOR KIDS PLUS ดูแลโรคฮิต พร้อมอุบัติเหตุ',
  sub: 'สำหรับเด็กอายุ 15 วัน–20 ปี เลือกวงเงินความคุ้มครองได้ 3 แผน พร้อมตัวแทนช่วยอธิบายรายละเอียด',
  badges: ['รับประกันภัยโดย MSIG', 'ผ่อน 0% สูงสุด 6 งวด ตามเงื่อนไข', 'ระยะรอคอยโรค 15 วัน', 'มีตัวแทนดูแล'],
  btns: `<a class="btn btn-red" href="/child-insurance/premium/">เช็กแผนตามอายุลูก</a>
<a class="btn btn-outline" style="background:#fff" href="/child-insurance/coverage/">ดูตารางความคุ้มครอง</a>
<a class="btn btn-line" href="/go/line/?intent=child-home" data-line-intent="child-home">ปรึกษาทาง LINE</a>`,
})}

<section class="section">
  <div class="container">
    <div class="section-head"><span class="kicker">โรคที่ได้รับความคุ้มครอง</span><h2>คุ้มครองโรคฮิตเด็กตามช่วงอายุ</h2></div>
    ${DISEASES_TABS}
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-head"><span class="kicker">ตารางเปรียบเทียบ</span><h2>ความคุ้มครอง 3 แผน</h2></div>
    ${COVERAGE_TABLE}
    <div style="text-align:center;margin-top:26px"><a class="btn btn-red" href="/child-insurance/plans/">เปรียบเทียบแผนแบบละเอียด →</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><span class="kicker">ค่าเบี้ยประกันภัย</span><h2>เบี้ยรายปีตามช่วงอายุ</h2></div>
    ${PREMIUM_TABLE}
    <div style="text-align:center;margin-top:26px"><a class="btn btn-outline-red" href="/child-insurance/premium/">ดูตารางค่าเบี้ย + คำนวณการผ่อน →</a></div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="section-head"><span class="kicker">ข้อมูลเพิ่มเติม</span><h2>ทุกเรื่องที่ควรรู้ก่อนตัดสินใจ</h2></div>
    <div class="grid grid-3">
      <div class="card"><div class="icon">🧾</div><h3>FIN FOR KIDS PLUS</h3><p>รายละเอียดผลิตภัณฑ์ครบทุกหัวข้อ ตั้งแต่แผนนี้เหมาะกับใคร ถึงวิธีสมัคร</p><div class="card-cta"><a class="btn btn-outline-red btn-sm" href="/child-insurance/fin-for-kids-plus/">อ่านต่อ →</a></div></div>
      <div class="card"><div class="icon">🛡️</div><h3>ความคุ้มครองละเอียด</h3><p>วงเงินแต่ละหมวด เงื่อนไข OPD/IPD ค่าห้อง และข้อยกเว้นสำคัญ</p><div class="card-cta"><a class="btn btn-outline-red btn-sm" href="/child-insurance/coverage/">อ่านต่อ →</a></div></div>
      <div class="card"><div class="icon">🦠</div><h3>โรคที่คุ้มครอง</h3><p>รวมโรคฮิตเด็กที่แผนนี้คุ้มครอง แยกตามช่วงอายุอย่างชัดเจน</p><div class="card-cta"><a class="btn btn-outline-red btn-sm" href="/child-insurance/diseases/">อ่านต่อ →</a></div></div>
      <div class="card"><div class="icon">📑</div><h3>วิธีใช้สิทธิ์และการเคลม</h3><p>ขั้นตอนเมื่อลูกป่วยหรือเกิดอุบัติเหตุ เอกสารที่ต้องใช้ และผู้ช่วยประสานงาน</p><div class="card-cta"><a class="btn btn-outline-red btn-sm" href="/child-insurance/how-to-claim/">อ่านต่อ →</a></div></div>
      <div class="card"><div class="icon">❓</div><h3>คำถามที่พบบ่อย</h3><p>รวมคำตอบเรื่องอายุที่สมัครได้ ระยะรอคอย การผ่อน และอื่น ๆ</p><div class="card-cta"><a class="btn btn-outline-red btn-sm" href="/child-insurance/faq/">อ่านต่อ →</a></div></div>
      <div class="card"><div class="icon">📚</div><h3>บทความสุขภาพเด็ก</h3><p>ความรู้โรคฮิตเด็กและวิธีดูแล เขียนโดยทีมงานและตรวจสอบข้อมูล</p><div class="card-cta"><a class="btn btn-outline-red btn-sm" href="/articles/">อ่านต่อ →</a></div></div>
    </div>
  </div>
</section>

${ctaBanner('child-home', 'ให้ตัวแทนช่วยเช็กแผนตามอายุลูก', 'ส่งอายุบุตรหลานมาทาง LINE ตัวแทนจะช่วยตรวจสอบแผนและค่าเบี้ยที่เหมาะสมให้ฟรี ไม่มีข้อผูกมัด')}
${DISCLAIMER_PRODUCT}
`,
},

/* ============ /child-insurance/fin-for-kids-plus/ ============ */
{
  file: 'child-insurance/fin-for-kids-plus/index.html',
  path: '/child-insurance/fin-for-kids-plus/',
  title: 'ประกันสุขภาพเด็ก FIN FOR KIDS PLUS ราคาและความคุ้มครอง 2569',
  desc: 'ดูราคาและความคุ้มครอง FIN FOR KIDS PLUS สำหรับเด็กอายุ 15 วัน–20 ปี คุ้มครองโรคฮิตตามช่วงอายุ IPD OPD และอุบัติเหตุ พร้อมตัวแทนให้คำแนะนำทาง LINE',
  page: 'product', active: 'child',
  ldjson: [{
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'FIN FOR KIDS PLUS', serviceType: 'ประกันสุขภาพเด็ก',
    provider: { '@type': 'Organization', name: 'FIN Insurance Broker' },
    description: 'ประกันภัยโรคสุดฮิตสำหรับเด็กอายุ 15 วัน–20 ปี คุ้มครองโรคตามช่วงอายุ พร้อม IPD, OPD และอุบัติเหตุ เลือกได้ 3 แผน',
    url: SITE + '/child-insurance/fin-for-kids-plus/',
  }],
  content: `
${breadcrumb([BC_HOME, BC_CHILD, ['FIN FOR KIDS PLUS']])}
${pageHero({
  h1: 'FIN FOR KIDS PLUS ประกันสุขภาพเด็กโรคฮิต เลือกได้ 3 แผน',
  sub: 'จ่ายงวดแรก เริ่มความคุ้มครองตามวันที่ระบุในกรมธรรม์ โดยความคุ้มครองการเจ็บป่วยมีระยะรอคอย 15 วัน',
  badges: ['รับประกันภัยโดย MSIG', 'อายุ 15 วัน–20 ปี', 'ผ่อน 0% สูงสุด 6 งวด ตามเงื่อนไข'],
  btns: `<a class="btn btn-red" href="/child-insurance/premium/">ดูค่าเบี้ยและการผ่อน</a>
<a class="btn btn-line" href="/go/line/?intent=fin-for-kids-plus" data-line-intent="fin-for-kids-plus">เช็กแผนให้ลูกทาง LINE</a>`,
})}

<section class="section"><div class="container prose" style="max-width:860px">

<h2>1. แผนนี้เหมาะกับใคร</h2>
<ul>
<li>ผู้ปกครองที่ต้องการความคุ้มครองโรคฮิตเด็ก เช่น RSV มือเท้าปาก ไข้หวัดใหญ่ ไข้เลือดออก</li>
<li>ครอบครัวที่ต้องการวงเงิน IPD สำหรับการนอนโรงพยาบาล และ OPD สำหรับผู้ป่วยนอกในโรคที่ระบุ</li>
<li>ผู้ที่ต้องการความคุ้มครองอุบัติเหตุของบุตรหลานควบคู่กัน</li>
<li>ผู้ที่ต้องการแบ่งชำระค่าเบี้ยเป็นงวดตามเงื่อนไข</li>
</ul>

<h2>2. อายุที่สมัครได้</h2>
<p>รับสมัครสำหรับเด็กอายุ <b>15 วัน ถึง 20 ปี</b> โดยแบ่งช่วงอายุสำหรับการคำนวณเบี้ยเป็น 3 กลุ่ม ได้แก่ 15 วัน–น้อยกว่า 1 ปี, 1–5 ปี และ 6–20 ปี</p>

<h2>3. โรคที่คุ้มครองตามช่วงอายุ</h2>
${DISEASES_TABS}

<h2>4. ตารางความคุ้มครอง</h2>
${COVERAGE_TABLE}

<h2>5. ตารางค่าเบี้ย</h2>
${PREMIUM_TABLE}
<p style="margin-top:12px"><a class="btn btn-outline-red btn-sm" href="/child-insurance/premium/">คำนวณการผ่อนชำระ →</a></p>

<h2>6. ระยะรอคอย</h2>
<p>ความคุ้มครองการเจ็บป่วยมี<b>ระยะรอคอย 15 วัน</b>นับจากวันที่กรมธรรม์เริ่มความคุ้มครอง การเจ็บป่วยที่เกิดขึ้นภายในระยะรอคอยจะไม่อยู่ในความคุ้มครอง ส่วนความคุ้มครองอุบัติเหตุเริ่มตามเงื่อนไขที่ระบุในกรมธรรม์</p>

<h2>7. ข้อยกเว้นสำคัญ</h2>
<ul>
<li>โรคหรือการเจ็บป่วยที่เป็นมาก่อนทำประกันภัย (Pre-existing Condition) เป็นไปตามเงื่อนไขกรมธรรม์</li>
<li>การเจ็บป่วยภายในระยะรอคอย 15 วัน</li>
<li>อุบัติเหตุจากการขับขี่หรือโดยสารรถจักรยานยนต์</li>
<li>ข้อยกเว้นอื่น ๆ เป็นไปตามที่ระบุในกรมธรรม์ — ตัวแทนสามารถอธิบายรายละเอียดก่อนตัดสินใจ</li>
</ul>

<h2>8. เอกสารที่ใช้สมัคร</h2>
<ul>
<li>ข้อมูลผู้ปกครอง (ชื่อ เบอร์โทร อีเมล อาชีพ)</li>
<li>สูติบัตรหรือบัตรประชาชนของบุตรหลาน</li>
<li>บัตรประชาชนผู้ปกครอง</li>
<li>หลักฐานการชำระเงินงวดแรก</li>
</ul>

<h2>9. วิธีชำระและการผ่อน</h2>
<ul>
<li>ชำระเต็มจำนวนรายปี หรือแบ่งชำระ 3, 4 หรือ 6 งวด ตามเงื่อนไข</li>
<li>กรณี 6 งวด: งวดแรกประมาณ 20% ของเบี้ยรายปี ส่วนที่เหลือแบ่งเท่ากัน 5 งวด</li>
<li>ชำระผ่านการโอนเข้าบัญชีบริษัท และส่งสลิปให้ตัวแทนตรวจสอบ</li>
</ul>
<p class="note">จำนวนเงินผ่อนเป็นข้อมูลประกอบการพิจารณา การอนุมัติและเงื่อนไขการผ่อนเป็นไปตามข้อกำหนดของผู้ให้บริการและกรมธรรม์</p>

<h2>10. ขั้นตอนใช้สิทธิ์</h2>
<ol class="steps" style="margin-top:18px">
<li><b>แจ้งตัวแทนทันทีที่เข้ารับการรักษา</b><span>ทัก LINE @finforkids พร้อมแจ้งชื่อผู้เอาประกันภัยและอาการ</span></li>
<li><b>เข้ารับการรักษาและเก็บเอกสาร</b><span>ใบรับรองแพทย์ ใบเสร็จรับเงิน และผลตรวจ (Lab Report) ตามที่โรคนั้นต้องใช้</span></li>
<li><b>ส่งเอกสารเคลม</b><span>ตัวแทนช่วยตรวจสอบความครบถ้วนและประสานงานกับบริษัทผู้รับประกันภัย</span></li>
<li><b>รอผลการพิจารณา</b><span>ผลการพิจารณาเป็นไปตามข้อเท็จจริง เอกสาร และเงื่อนไขกรมธรรม์</span></li>
</ol>
<p><a class="btn btn-outline-red btn-sm" href="/child-insurance/how-to-claim/">ดูวิธีใช้สิทธิ์แบบละเอียด →</a></p>

<h2>11. เคสเคลมที่เกี่ยวข้อง</h2>
<p>ดูตัวอย่างเคสเคลมจริงที่ได้รับการพิจารณาแล้ว (ปิดข้อมูลส่วนบุคคลทุกเคส) ได้ที่ <a href="/claims/">หน้าเคสเคลมจริง</a></p>

<h2>12. คำถามที่พบบ่อย</h2>
<p>รวมคำถามยอดนิยม เช่น ลูกเคยป่วยสมัครได้ไหม ระยะรอคอยนับอย่างไร อ่านได้ที่ <a href="/child-insurance/faq/">คำถามที่พบบ่อย</a></p>

</div></section>

${ctaBanner('fin-for-kids-plus', 'เช็กแผนและค่าเบี้ยกับตัวแทนทาง LINE', 'ส่งอายุบุตรหลานมาได้เลย ตัวแทนจะช่วยเลือกแผนที่เหมาะกับงบประมาณและตอบทุกข้อสงสัย')}
${DISCLAIMER_PRODUCT}
`,
},

/* ============ /child-insurance/plans/ ============ */
{
  file: 'child-insurance/plans/index.html',
  path: '/child-insurance/plans/',
  title: 'เปรียบเทียบแผน FIN FOR KIDS PLUS 1, Plus 2 และ Plus 3',
  desc: 'เปรียบเทียบความคุ้มครองและค่าเบี้ย FIN FOR KIDS PLUS ทั้ง 3 แผน เลือกวงเงินที่เหมาะกับงบประมาณ พร้อมคำแนะนำว่าแต่ละแผนเหมาะกับใคร',
  page: 'plans', active: 'plans',
  content: `
${breadcrumb([BC_HOME, BC_CHILD, ['เปรียบเทียบแผน']])}
${pageHero({
  h1: 'เปรียบเทียบ FIN FOR KIDS PLUS 1, Plus 2 และ Plus 3',
  sub: 'เลือกวงเงินความคุ้มครองให้เหมาะกับงบประมาณและความต้องการของครอบครัว',
  btns: `<a class="btn btn-line" href="/go/line/?intent=plans-compare" data-line-intent="plans-compare">ให้ตัวแทนช่วยเลือกแผน</a>`,
})}

<section class="section"><div class="container">
  <div class="grid grid-3">
    <div class="card">
      <div class="icon">🥉</div>
      <h3>Plus 1</h3>
      <p class="num" style="font-family:var(--font-head);font-size:1.5rem;color:var(--navy);font-weight:700">เริ่ม 9,150.-<span style="font-size:.85rem;color:var(--gray);font-weight:400">/ปี (อายุ 6–20 ปี)</span></p>
      <b style="font-family:var(--font-head);color:var(--navy)">เหมาะกับ</b>
      <ul>
        <li>ผู้ปกครองที่ต้องการวงเงินพื้นฐาน</li>
        <li>เน้นประหยัดค่าเบี้ย</li>
        <li>ต้องการความคุ้มครองโรคฮิตและอุบัติเหตุ</li>
      </ul>
      <div class="card-cta"><a class="btn btn-line btn-sm" href="/go/line/?intent=plus-1" data-line-intent="plus-1">สอบถามแผน Plus 1</a></div>
    </div>
    <div class="card card-featured">
      <span class="ribbon">ยอดนิยม</span>
      <div class="icon">🥈</div>
      <h3>Plus 2</h3>
      <p class="num" style="font-family:var(--font-head);font-size:1.5rem;color:var(--navy);font-weight:700">เริ่ม 11,660.-<span style="font-size:.85rem;color:var(--gray);font-weight:400">/ปี (อายุ 6–20 ปี)</span></p>
      <b style="font-family:var(--font-head);color:var(--navy)">เหมาะกับ</b>
      <ul>
        <li>ผู้ปกครองที่ต้องการวงเงินระดับกลาง</li>
        <li>ต้องการ IPD 75,000 บาท</li>
        <li>ต้องการ OPD 1,500 บาทต่อครั้ง</li>
      </ul>
      <div class="card-cta"><a class="btn btn-line btn-sm" href="/go/line/?intent=plus-2" data-line-intent="plus-2">สอบถามแผน Plus 2</a></div>
    </div>
    <div class="card">
      <div class="icon">🥇</div>
      <h3>Plus 3</h3>
      <p class="num" style="font-family:var(--font-head);font-size:1.5rem;color:var(--navy);font-weight:700">เริ่ม 13,850.-<span style="font-size:.85rem;color:var(--gray);font-weight:400">/ปี (อายุ 6–20 ปี)</span></p>
      <b style="font-family:var(--font-head);color:var(--navy)">เหมาะกับ</b>
      <ul>
        <li>ผู้ปกครองที่ต้องการวงเงินสูงสุดในชุดแผน</li>
        <li>ต้องการ IPD สูงสุด 100,000 บาท</li>
        <li>ต้องการอุบัติเหตุสูงสุด 50,000 บาทต่อครั้ง</li>
      </ul>
      <div class="card-cta"><a class="btn btn-line btn-sm" href="/go/line/?intent=plus-3" data-line-intent="plus-3">สอบถามแผน Plus 3</a></div>
    </div>
  </div>
</div></section>

<section class="section section-alt"><div class="container">
  <div class="section-head"><span class="kicker">ตารางเปรียบเทียบ</span><h2>ความคุ้มครองแบบเทียบกันชัด ๆ</h2></div>
  ${COVERAGE_TABLE}
  <div style="margin-top:26px">${PREMIUM_TABLE}</div>
</div></section>

${ctaBanner('plans-compare', 'ให้ตัวแทนช่วยเลือกแผนตามอายุลูกและงบประมาณ', 'บอกอายุบุตรหลานและงบต่อปีที่วางไว้ ตัวแทนจะเทียบทั้ง 3 แผนให้เห็นภาพก่อนตัดสินใจ')}
${DISCLAIMER_PRODUCT}
`,
},

/* ============ /child-insurance/premium/ ============ */
{
  file: 'child-insurance/premium/index.html',
  path: '/child-insurance/premium/',
  title: 'ตารางค่าเบี้ย FIN FOR KIDS PLUS แยกตามอายุ 15 วัน–20 ปี',
  desc: 'ตารางค่าเบี้ยประกันสุขภาพเด็ก FIN FOR KIDS PLUS รายปีรวมอากรแสตมป์ แยกตามช่วงอายุ พร้อมเครื่องคำนวณการผ่อนชำระ 3, 4 และ 6 งวด',
  page: 'premium', active: 'child',
  content: `
${breadcrumb([BC_HOME, BC_CHILD, ['ตารางค่าเบี้ย']])}
${pageHero({
  h1: 'ตารางค่าเบี้ยประกันภัย FIN FOR KIDS PLUS',
  sub: 'เบี้ยประกันภัยรายปี รวมอากรแสตมป์ แยกตามช่วงอายุบุตรหลาน พร้อมเครื่องคำนวณการผ่อนชำระ',
  btns: `<a class="btn btn-line" href="/go/line/?intent=premium" data-line-intent="premium">เช็กเบี้ยกับตัวแทน</a>`,
})}

<section class="section"><div class="container">
  ${PREMIUM_TABLE}

  <div class="card" style="margin-top:36px;max-width:720px;margin-left:auto;margin-right:auto">
    <h3>🧮 เครื่องคำนวณการผ่อนชำระ</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
      <label style="display:flex;flex-direction:column;gap:6px;font-size:.9rem">ช่วงอายุบุตร
        <select id="calc-age" style="padding:10px;border-radius:10px;border:1.5px solid var(--border);font-family:var(--font-body)">
          <option value="INFANT">15 วัน–น้อยกว่า 1 ปี</option>
          <option value="TODDLER">1–5 ปี</option>
          <option value="KID" selected>6–20 ปี</option>
        </select>
      </label>
      <label style="display:flex;flex-direction:column;gap:6px;font-size:.9rem">แผน
        <select id="calc-plan" style="padding:10px;border-radius:10px;border:1.5px solid var(--border);font-family:var(--font-body)">
          <option value="1">Plus 1</option>
          <option value="2" selected>Plus 2</option>
          <option value="3">Plus 3</option>
        </select>
      </label>
      <label style="display:flex;flex-direction:column;gap:6px;font-size:.9rem">จำนวนงวด
        <select id="calc-inst" style="padding:10px;border-radius:10px;border:1.5px solid var(--border);font-family:var(--font-body)">
          <option value="1">ชำระเต็มจำนวน</option>
          <option value="3">3 งวด</option>
          <option value="4">4 งวด</option>
          <option value="6" selected>6 งวด</option>
        </select>
      </label>
    </div>
    <div id="calc-result" style="background:var(--red-soft);border-radius:14px;padding:18px 20px;margin-top:14px;font-family:var(--font-head)"></div>
    <p class="disclaimer" style="margin-top:12px">จำนวนเงินผ่อนเป็นข้อมูลประกอบการพิจารณา การอนุมัติและเงื่อนไขการผ่อนเป็นไปตามข้อกำหนดของผู้ให้บริการและกรมธรรม์</p>
  </div>

  <script>
  (function(){
    var PREMIUM={INFANT:{1:24420,2:32620,3:37670},TODDLER:{1:23050,2:30810,3:35930},KID:{1:9150,2:11660,3:13850}};
    var fmt=function(n){return n.toLocaleString('th-TH')};
    function calc(){
      var age=document.getElementById('calc-age').value;
      var plan=document.getElementById('calc-plan').value;
      var n=parseInt(document.getElementById('calc-inst').value,10);
      var premium=PREMIUM[age][plan];
      var out;
      if(n===1){ out='ชำระครั้งเดียว <b style="font-size:1.5rem;color:var(--red)">'+fmt(premium)+' บาท</b>/ปี'; }
      else if(n===6){
        var first=Math.ceil(premium*0.20), rest=Math.ceil((premium-first)/5);
        out='งวดแรก <b style="font-size:1.5rem;color:var(--red)">'+fmt(first)+' บาท</b> · งวดที่ 2–6 งวดละ <b>'+fmt(rest)+' บาท</b><br><span style="font-size:.85rem;color:var(--gray)">รวมทั้งสิ้น '+fmt(first+rest*5)+' บาท</span>';
      } else {
        var per=Math.ceil(premium/n);
        out=n+' งวด งวดละ <b style="font-size:1.5rem;color:var(--red)">'+fmt(per)+' บาท</b><br><span style="font-size:.85rem;color:var(--gray)">รวมทั้งสิ้น '+fmt(per*n)+' บาท</span>';
      }
      document.getElementById('calc-result').innerHTML=out;
      if(window.finTrack) finTrack('plan_selected',{age_group:age,plan:'plus-'+plan,installments:n});
    }
    ['calc-age','calc-plan','calc-inst'].forEach(function(id){document.getElementById(id).addEventListener('change',calc)});
    calc();
  })();
  </script>
</div></section>

${ctaBanner('premium', 'อยากรู้ว่าลูกเราอยู่ช่วงอายุไหน เบี้ยเท่าไร?', 'ส่งวันเกิดบุตรหลานมาทาง LINE ตัวแทนจะคำนวณเบี้ยและตารางผ่อนให้ทันที')}
${DISCLAIMER_PRODUCT}
`,
},

/* ============ /child-insurance/coverage/ ============ */
{
  file: 'child-insurance/coverage/index.html',
  path: '/child-insurance/coverage/',
  title: 'ตารางความคุ้มครอง FIN FOR KIDS PLUS ทั้ง 3 แผน',
  desc: 'รายละเอียดความคุ้มครอง FIN FOR KIDS PLUS: อุบัติเหตุ IPD OPD ค่าห้อง ICU และเงื่อนไขสำคัญ เปรียบเทียบทั้ง 3 แผนในตารางเดียว',
  page: 'coverage', active: 'child',
  content: `
${breadcrumb([BC_HOME, BC_CHILD, ['ความคุ้มครอง']])}
${pageHero({
  h1: 'รายละเอียดความคุ้มครอง FIN FOR KIDS PLUS',
  sub: 'จ่ายงวดแรก เริ่มความคุ้มครองตามวันที่ระบุในกรมธรรม์ โดยความคุ้มครองการเจ็บป่วยมีระยะรอคอย 15 วัน',
})}

<section class="section"><div class="container">
  ${COVERAGE_TABLE}

  <div class="grid grid-4" style="margin-top:36px">
    <div class="card"><div class="icon">🛡️</div><h3>อุบัติเหตุ</h3><p>คุ้มครองค่ารักษาจากอุบัติเหตุต่อครั้ง สูงสุด 50,000 บาท (Plus 3) และอุบัติเหตุผู้เอาประกันภัย 500,000 บาททุกแผน</p></div>
    <div class="card"><div class="icon">🏥</div><h3>IPD ผู้ป่วยใน</h3><p>ค่ารักษาเมื่อนอนโรงพยาบาลต่อการเจ็บป่วยแต่ละครั้ง สูงสุด 100,000 บาท (Plus 3)</p></div>
    <div class="card"><div class="icon">💊</div><h3>OPD ผู้ป่วยนอก</h3><p>ค่ารักษาผู้ป่วยนอกสำหรับโรคที่ระบุ สูงสุด 2,000 บาทต่อครั้ง (Plus 3) ไม่เกิน 30 วัน/ปี หรือ 7 ครั้ง/โรค</p></div>
    <div class="card"><div class="icon">🛏️</div><h3>ค่าห้อง</h3><p>ค่าห้องผู้ป่วยปกติ 3,000 บาท/วัน และห้อง ICU 6,000 บาท/วัน เท่ากันทุกแผน</p></div>
  </div>

  <div class="note note-red" style="margin-top:32px">
    <b>ข้อควรทราบ:</b> อุบัติเหตุไม่คุ้มครองกรณีที่เกิดจากการขับขี่หรือโดยสารรถจักรยานยนต์ · การเจ็บป่วยมีระยะรอคอย 15 วัน · เงื่อนไขและข้อยกเว้นเป็นไปตามกรมธรรม์
  </div>
</div></section>

${ctaBanner('coverage', 'อยากเข้าใจเงื่อนไขก่อนตัดสินใจ?', 'ตัวแทนอธิบายความคุ้มครองและข้อยกเว้นให้ฟังแบบเข้าใจง่ายทาง LINE ฟรี ไม่มีข้อผูกมัด')}
${DISCLAIMER_PRODUCT}
`,
},

/* ============ /child-insurance/diseases/ ============ */
{
  file: 'child-insurance/diseases/index.html',
  path: '/child-insurance/diseases/',
  title: 'โรคที่ได้รับความคุ้มครอง FIN FOR KIDS PLUS แยกตามช่วงอายุ',
  desc: 'รวมโรคฮิตเด็กที่ FIN FOR KIDS PLUS คุ้มครอง: RSV มือเท้าปาก ไข้หวัดใหญ่ ไข้เลือดออก หัด สุกใส ไส้ติ่งอักเสบ ชิคุนกุนยา แยกตามช่วงอายุ 15 วัน–20 ปี',
  page: 'diseases', active: 'child',
  content: `
${breadcrumb([BC_HOME, BC_CHILD, ['โรคที่คุ้มครอง']])}
${pageHero({
  h1: 'โรคที่ได้รับความคุ้มครอง แยกตามช่วงอายุ',
  sub: 'ความคุ้มครองโรคแตกต่างกันตามช่วงอายุของบุตรหลาน โปรดเลือกดูตามช่วงอายุเพื่อความเข้าใจที่ถูกต้อง',
})}

<section class="section"><div class="container">
  ${DISEASES_TABS}

  <div class="section-head" style="margin-top:48px"><span class="kicker">รู้จักแต่ละโรค</span><h2>โรคฮิตเด็กที่แผนนี้ดูแล</h2></div>
  <div class="grid grid-4">
    <div class="card"><div class="icon">🤧</div><h3>ไข้หวัดใหญ่</h3><p>ไข้สูง ปวดเมื่อยตัว พบบ่อยช่วงฤดูฝนและปลายปี ทุกช่วงอายุ</p></div>
    <div class="card"><div class="icon">🦟</div><h3>ไข้เลือดออก</h3><p>ติดจากยุงลาย ไข้สูงเฉียบพลัน ต้องเฝ้าระวังภาวะช็อก</p></div>
    <div class="card"><div class="icon">🫁</div><h3>RSV</h3><p>ไวรัสทางเดินหายใจ อันตรายในเด็กเล็ก มักระบาดหน้าฝน</p></div>
    <div class="card"><div class="icon">🔴</div><h3>โรคหัด</h3><p>ไข้ ผื่นแดง ติดต่อง่ายในเด็กที่ยังรับวัคซีนไม่ครบ</p></div>
    <div class="card"><div class="icon">🦵</div><h3>ชิคุนกุนยา</h3><p>โรคไข้ปวดข้อยุงลาย ไข้สูงร่วมกับปวดข้ออย่างมาก</p></div>
    <div class="card"><div class="icon">⚡</div><h3>ไส้ติ่งอักเสบเฉียบพลัน</h3><p>ปวดท้องรุนแรง ต้องผ่าตัดฉุกเฉิน (คุ้มครองช่วงอายุ 1–20 ปี)</p></div>
    <div class="card"><div class="icon">🖐️</div><h3>มือ เท้า ปาก</h3><p>ตุ่มแผลในปาก ฝ่ามือฝ่าเท้า ระบาดในเนิร์สเซอรี่/อนุบาล (1–20 ปี)</p></div>
    <div class="card"><div class="icon">🌡️</div><h3>สุกใส</h3><p>ตุ่มน้ำใสทั่วตัว ติดต่อง่ายมากในวัยเรียน (1–20 ปี)</p></div>
  </div>
</div></section>

${ctaBanner('diseases', 'ลูกอยู่วัยไหน คุ้มครองโรคอะไรบ้าง?', 'ส่งอายุลูกมาทาง LINE ตัวแทนสรุปโรคที่คุ้มครองและวงเงินให้เห็นชัด ๆ ในข้อความเดียว')}
${DISCLAIMER_PRODUCT}
`,
},

/* ============ /child-insurance/how-to-claim/ ============ */
{
  file: 'child-insurance/how-to-claim/index.html',
  path: '/child-insurance/how-to-claim/',
  title: 'วิธีใช้สิทธิ์และการเคลม FIN FOR KIDS PLUS ทีละขั้นตอน',
  desc: 'ขั้นตอนใช้สิทธิ์ประกันสุขภาพเด็ก FIN FOR KIDS PLUS ตั้งแต่เข้าโรงพยาบาล เอกสารที่ต้องเตรียม จนถึงการติดตามผล พร้อมตัวแทนช่วยประสานงานทุกขั้นตอน',
  page: 'how-to-claim', active: 'child',
  content: `
${breadcrumb([BC_HOME, BC_CHILD, ['วิธีใช้สิทธิ์และการเคลม']])}
${pageHero({
  h1: 'วิธีใช้สิทธิ์และการเคลม ทีละขั้นตอน',
  sub: 'มีตัวแทนช่วยแนะนำและประสานงานตลอดการใช้สิทธิ์ ตั้งแต่วันแรกที่เข้าโรงพยาบาลจนทราบผลการพิจารณา',
  btns: `<a class="btn btn-line" href="/go/line/?intent=claim-guide" data-line-intent="claim-guide">แจ้งเคลม / สอบถามทาง LINE</a>`,
})}

<section class="section"><div class="container prose" style="max-width:860px">

<h2>กรณีเจ็บป่วยด้วยโรคที่คุ้มครอง</h2>
<ol class="steps" style="margin-top:18px">
<li><b>แจ้งตัวแทนทันที</b><span>ทัก LINE @finforkids แจ้งชื่อผู้เอาประกันภัย อาการ และโรงพยาบาลที่จะเข้ารักษา</span></li>
<li><b>เข้ารับการรักษา</b><span>แจ้งโรงพยาบาลว่ามีประกัน และตรวจสอบว่าเป็นโรงพยาบาลในเครือหรือไม่ (กรณีในเครืออาจไม่ต้องสำรองจ่ายตามเงื่อนไข)</span></li>
<li><b>เก็บเอกสารให้ครบ</b><span>ใบรับรองแพทย์ระบุการวินิจฉัย · ใบเสร็จรับเงินตัวจริง · ผลตรวจทางห้องปฏิบัติการ (Lab Report) สำหรับโรคที่ต้องยืนยันผล เช่น RSV ไข้หวัดใหญ่ ไข้เลือดออก</span></li>
<li><b>ส่งเอกสารผ่านตัวแทน</b><span>ตัวแทนตรวจสอบความครบถ้วนก่อนส่งบริษัทผู้รับประกันภัย ลดโอกาสเอกสารตีกลับ</span></li>
<li><b>ติดตามผลการพิจารณา</b><span>ตัวแทนติดตามสถานะและแจ้งความคืบหน้าให้ทราบเป็นระยะ</span></li>
</ol>

<h2>กรณีอุบัติเหตุ</h2>
<ol class="steps" style="margin-top:18px">
<li><b>เข้ารักษาได้ทันที</b><span>เข้าโรงพยาบาลที่สะดวกที่สุดก่อน แล้วรีบแจ้งตัวแทน</span></li>
<li><b>เก็บเอกสารการรักษา</b><span>ใบรับรองแพทย์ระบุสาเหตุการบาดเจ็บ และใบเสร็จรับเงิน</span></li>
<li><b>ส่งเคลมผ่านตัวแทน</b><span>หมายเหตุ: อุบัติเหตุจากการขับขี่/โดยสารรถจักรยานยนต์ไม่อยู่ในความคุ้มครอง</span></li>
</ol>

<h2>เอกสารที่ใช้ประกอบการเคลม</h2>
<ul>
<li>แบบฟอร์มเรียกร้องค่าสินไหม (ตัวแทนจัดเตรียมให้)</li>
<li>ใบรับรองแพทย์ฉบับจริง ระบุการวินิจฉัยโรค</li>
<li>ใบเสร็จรับเงินฉบับจริง</li>
<li>ผลตรวจ Lab ยืนยันโรค (กรณีโรคที่ต้องตรวจยืนยัน)</li>
<li>สำเนาสมุดบัญชีสำหรับรับเงินค่าสินไหม</li>
</ul>

<div class="note" style="margin-top:24px">ผลการพิจารณาค่าสินไหมขึ้นอยู่กับข้อเท็จจริง เอกสาร และเงื่อนไขกรมธรรม์ของแต่ละกรณี</div>

</div></section>

${ctaBanner('claim-guide', 'ต้องเคลมตอนนี้ หรือมีข้อสงสัยเรื่องเอกสาร?', 'ทักตัวแทนได้ทันที ทีมงานช่วยตรวจเอกสารและประสานงานให้จนจบเรื่อง')}
${DISCLAIMER_PRODUCT}
`,
},

/* ============ /child-insurance/faq/ ============ */
{
  file: 'child-insurance/faq/index.html',
  path: '/child-insurance/faq/',
  title: 'คำถามที่พบบ่อย ประกันสุขภาพเด็ก FIN FOR KIDS PLUS',
  desc: 'รวมคำถามที่พบบ่อยเกี่ยวกับ FIN FOR KIDS PLUS: อายุที่สมัครได้ ระยะรอคอย OPD IPD ค่าห้อง การผ่อนชำระ เอกสารสมัครและเคลม',
  page: 'faq', active: 'child',
  ldjson: [{
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'เด็กอายุเท่าไรสมัครได้', acceptedAnswer: { '@type': 'Answer', text: 'รับสมัครเด็กอายุ 15 วัน ถึง 20 ปี' } },
      { '@type': 'Question', name: 'เด็กอายุต่ำกว่า 1 ปีคุ้มครองกี่โรค', acceptedAnswer: { '@type': 'Answer', text: 'คุ้มครอง 5 โรค ได้แก่ ไข้หวัดใหญ่ ไข้เลือดออก RSV โรคหัด และโรคชิคุนกุนยา' } },
      { '@type': 'Question', name: 'เด็กอายุ 1 ปีขึ้นไปคุ้มครองกี่โรค', acceptedAnswer: { '@type': 'Answer', text: 'คุ้มครอง 8 โรค เพิ่มโรคไส้ติ่งอักเสบเฉียบพลัน โรคมือเท้าปาก และโรคสุกใส' } },
      { '@type': 'Question', name: 'ระยะรอคอยกี่วัน', acceptedAnswer: { '@type': 'Answer', text: 'ความคุ้มครองการเจ็บป่วยมีระยะรอคอย 15 วันนับจากวันที่กรมธรรม์เริ่มความคุ้มครอง' } },
      { '@type': 'Question', name: 'ผ่อนได้กี่งวด', acceptedAnswer: { '@type': 'Answer', text: 'แบ่งชำระได้ 3, 4 หรือ 6 งวด ตามเงื่อนไข โดยกรณี 6 งวด งวดแรกประมาณ 20% ของเบี้ยรายปี' } },
    ],
  }],
  content: `
${breadcrumb([BC_HOME, BC_CHILD, ['คำถามที่พบบ่อย']])}
${pageHero({
  h1: 'คำถามที่พบบ่อย (FAQ)',
  sub: 'รวมคำตอบจากตัวแทน สำหรับคำถามยอดนิยมเกี่ยวกับ FIN FOR KIDS PLUS',
})}

<section class="section"><div class="container" style="max-width:820px">

<details class="faq-item"><summary>เด็กอายุเท่าไรสมัครได้?</summary><div class="faq-body">รับสมัครเด็กอายุ <b>15 วัน ถึง 20 ปี</b> โดยเบี้ยประกันภัยแบ่งตามช่วงอายุ 3 กลุ่ม: 15 วัน–น้อยกว่า 1 ปี, 1–5 ปี และ 6–20 ปี</div></details>
<details class="faq-item"><summary>เด็กอายุต่ำกว่า 1 ปีคุ้มครองกี่โรค?</summary><div class="faq-body">คุ้มครอง <b>5 โรค</b> ได้แก่ ไข้หวัดใหญ่ ไข้เลือดออก RSV โรคหัด และโรคชิคุนกุนยา (โรคไข้ปวดข้อยุงลาย)</div></details>
<details class="faq-item"><summary>เด็กอายุ 1 ปีขึ้นไปคุ้มครองกี่โรค?</summary><div class="faq-body">คุ้มครอง <b>8 โรค</b> โดยเพิ่มโรคไส้ติ่งอักเสบเฉียบพลัน โรคมือ เท้า ปาก และโรคสุกใส จากชุด 5 โรคของเด็กเล็ก</div></details>
<details class="faq-item"><summary>ระยะรอคอยกี่วัน?</summary><div class="faq-body">ความคุ้มครองการเจ็บป่วยมี<b>ระยะรอคอย 15 วัน</b>นับจากวันที่กรมธรรม์เริ่มความคุ้มครอง การเจ็บป่วยภายในช่วงนี้ไม่อยู่ในความคุ้มครอง</div></details>
<details class="faq-item"><summary>OPD คุ้มครองอย่างไร?</summary><div class="faq-body">คุ้มครองค่ารักษาผู้ป่วยนอกสำหรับโรคที่ระบุ ต่อครั้งสูงสุด 1,000 / 1,500 / 2,000 บาท ตามแผน โดยคุ้มครองสูงสุด 30 วันต่อปี หรือ 7 ครั้งต่อโรค ตามรายละเอียดในกรมธรรม์</div></details>
<details class="faq-item"><summary>IPD คุ้มครองอย่างไร?</summary><div class="faq-body">คุ้มครองค่ารักษากรณีนอนโรงพยาบาล ต่อการเจ็บป่วยแต่ละครั้งสูงสุด 50,000 / 75,000 / 100,000 บาท ตามแผนที่เลือก</div></details>
<details class="faq-item"><summary>อุบัติเหตุคุ้มครองอย่างไร?</summary><div class="faq-body">คุ้มครองค่ารักษาจากอุบัติเหตุต่อครั้ง 20,000 / 30,000 / 50,000 บาท ตามแผน และอุบัติเหตุผู้เอาประกันภัย 500,000 บาททุกแผน — ยกเว้นอุบัติเหตุจากการขับขี่หรือโดยสารรถจักรยานยนต์</div></details>
<details class="faq-item"><summary>ค่าห้องได้วันละเท่าไร?</summary><div class="faq-body">ค่าห้องผู้ป่วยปกติ <b>3,000 บาทต่อวัน</b> เท่ากันทุกแผน</div></details>
<details class="faq-item"><summary>ห้อง ICU ได้วันละเท่าไร?</summary><div class="faq-body">ห้อง ICU <b>6,000 บาทต่อวัน</b> เท่ากันทุกแผน</div></details>
<details class="faq-item"><summary>ผ่อนได้กี่งวด?</summary><div class="faq-body">แบ่งชำระได้ <b>3, 4 หรือ 6 งวด</b> ตามเงื่อนไข กรณี 6 งวด งวดแรกประมาณ 20% ของเบี้ยรายปี ส่วนที่เหลือแบ่งเท่ากัน 5 งวด ลองคำนวณได้ที่<a href="/child-insurance/premium/">เครื่องคำนวณการผ่อน</a></div></details>
<details class="faq-item"><summary>ลูกเคยป่วยสมัครได้หรือไม่?</summary><div class="faq-body">สมัครได้ แต่โรคที่เป็นมาก่อนทำประกันภัย (Pre-existing Condition) อาจไม่อยู่ในความคุ้มครองตามเงื่อนไขกรมธรรม์ แนะนำแจ้งประวัติสุขภาพตามจริงกับตัวแทนเพื่อรับคำแนะนำที่ถูกต้อง</div></details>
<details class="faq-item"><summary>โรงพยาบาลในเครือมีที่ใดบ้าง?</summary><div class="faq-body">รายชื่อโรงพยาบาลในเครืออาจมีการเปลี่ยนแปลง กรุณาสอบถามตัวแทนทาง LINE หรือตรวจสอบกับบริษัทผู้รับประกันภัยก่อนเข้ารับบริการ</div></details>
<details class="faq-item"><summary>ใช้เอกสารอะไรสมัคร?</summary><div class="faq-body">ข้อมูลผู้ปกครอง สูติบัตรหรือบัตรประชาชนของบุตร บัตรประชาชนผู้ปกครอง และหลักฐานการชำระเงินงวดแรก</div></details>
<details class="faq-item"><summary>ใช้เอกสารอะไรเคลม?</summary><div class="faq-body">ใบรับรองแพทย์ฉบับจริง ใบเสร็จรับเงินฉบับจริง ผลตรวจ Lab (กรณีโรคที่ต้องยืนยัน) และสำเนาสมุดบัญชี ดูรายละเอียดที่<a href="/child-insurance/how-to-claim/">วิธีใช้สิทธิ์และการเคลม</a></div></details>
<details class="faq-item"><summary>ตัวแทนช่วยประสานงานได้หรือไม่?</summary><div class="faq-body">ได้ — ตัวแทนช่วยตั้งแต่เลือกแผน ตรวจเอกสารสมัคร แจ้งเคลม ตรวจความครบถ้วนของเอกสาร และติดตามผลการพิจารณาให้จนจบเรื่อง</div></details>

</div></section>

${ctaBanner('faq', 'มีคำถามที่ไม่อยู่ในนี้?', 'ทักถามตัวแทนได้โดยตรงทาง LINE ตอบทุกคำถามก่อนตัดสินใจ ไม่มีข้อผูกมัด')}
${DISCLAIMER_PRODUCT}
`,
},
];
