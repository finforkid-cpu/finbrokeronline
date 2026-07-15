// หน้าเว็บหลัก: เคสเคลม · บทความ · เกี่ยวกับเรา · ติดต่อ · ใบอนุญาต · ร้องเรียน
// หมายเหตุ: นำหน้าประกันรถยนต์ออกตามนโยบาย (2026-07-14) — เว็บไซต์แสดงเฉพาะประกันสุขภาพเด็ก
import { breadcrumb, pageHero, ctaBanner, DISCLAIMER_PRODUCT, SITE } from './layout.mjs';

const BC_HOME = ['หน้าแรก', '/'];

/* ============ ข้อมูลเคสเคลมจริง (ภาพใน assets/img/claims/) ============ */
// disease: rsv | flu | hfmd — ใช้กรองด้วยปุ่ม pill
export const CLAIM_CASES = [
  { img: 'case-6', disease: 'rsv',  title: 'ลูกป่วย RSV (หลอดลมอักเสบ)', days: 2, amount: '102,571.00', note: 'เคสค่ารักษาสูง — เคลมตามวงเงินแผน ตัวแทนประสานงานขอส่วนลดค่าห้อง/ค่ารักษาให้' },
  { img: 'case-4', disease: 'rsv',  title: 'ลูกป่วย RSV', days: 8, amount: '72,142.20', note: 'นอนโรงพยาบาลยาว 8 วัน — เคลมค่าห้องและค่ารักษาตามเอกสารเคลม' },
  { img: 'case-1', disease: 'rsv',  title: 'ลูกป่วย RSV', days: 3, amount: '53,166.00', note: 'ตัวแทนประสานงานขอส่วนลดค่าห้อง/ค่ารักษาเรียบร้อย' },
  { img: 'case-3', disease: 'flu',  title: 'ลูกป่วยไข้หวัดใหญ่ สายพันธุ์ A', days: 5, amount: '33,385.30', note: 'เคลมค่าห้องและค่ารักษาพยาบาลทั่วไปตามวงเงินแผน' },
  { img: 'case-9', disease: 'flu',  title: 'ลูกป่วยไข้หวัดใหญ่', days: 2, amount: '33,268.00', note: 'เคลมไว ไม่ยุ่งยาก — ค่ารักษาพยาบาลตามเอกสารเคลม' },
  { img: 'case-5', disease: 'rsv',  title: 'ลูกป่วย RSV', days: 2, amount: '28,746.00', note: 'ตัวแทนประสานงานขอส่วนลดค่าห้อง/ค่ารักษาเรียบร้อย' },
  { img: 'case-7', disease: 'flu',  title: 'ลูกป่วยไข้หวัดใหญ่ สายพันธุ์ A', days: 2, amount: '25,028.00', note: 'ตัวแทนประสานงานขอส่วนลด ไม่มีส่วนต่างค่าห้อง' },
  { img: 'case-2', disease: 'flu',  title: 'ลูกป่วยไข้หวัดใหญ่ สายพันธุ์ A', days: 4, amount: '24,017.00', note: 'คุ้มครองเต็มจำนวนตามเอกสารเคลม ไม่มีส่วนต่าง' },
  { img: 'case-8', disease: 'hfmd', title: 'ลูกป่วยมือ เท้า ปาก', days: 2, amount: '23,216.30', note: 'โรคฮิตวัยอนุบาล — เคลมค่าห้องและค่ารักษาตามวงเงินแผน' },
];

const DISEASE_LABEL = { rsv: 'RSV', flu: 'ไข้หวัดใหญ่', hfmd: 'มือ เท้า ปาก' };

export function claimCard(c) {
  return `<article class="card claim-card reveal" data-cat="${c.disease}">
  <button class="claim-thumb" type="button" data-lightbox="/assets/img/claims/${c.img}.jpg" data-lightbox-alt="รีวิวเคสเคลมจริง: ${c.title} นอนโรงพยาบาล ${c.days} วัน ค่ารักษา ${c.amount} บาท" aria-label="ดูภาพเคส ${c.title} ขนาดเต็ม">
    <img src="/assets/img/claims/${c.img}.jpg" width="1254" height="1254" loading="lazy" alt="รีวิวเคสเคลมจริง ${c.title} นอนโรงพยาบาล ${c.days} วัน ค่ารักษา ${c.amount} บาท พร้อมภาพเอกสารเคลมที่ปิดข้อมูลส่วนบุคคล">
    <span class="zoom-hint"><svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><use href="#i-search"/></svg> กดเพื่อดูขนาดเต็ม</span>
  </button>
  <div class="post-body">
    <div class="claim-chips">
      <span class="claim-chip chip-disease">${DISEASE_LABEL[c.disease]}</span>
      <span class="claim-chip">🛏 นอน รพ. ${c.days} วัน</span>
      <span class="claim-chip chip-amount">฿ ${c.amount}</span>
    </div>
    <h3>${c.title}</h3>
    <p>${c.note}</p>
  </div>
</article>`;
}

export const mainPages = [

/* ============ /claims/ ============ */
{
  file: 'claims/index.html',
  path: '/claims/',
  title: 'เคสเคลมจริงประกันสุขภาพเด็ก รวม 9 เคส RSV ไข้หวัดใหญ่ มือเท้าปาก | FIN Broker Online',
  desc: 'รีวิวเคสเคลมจริงประกันเด็ก FIN FOR KIDS PLUS ที่ได้รับการพิจารณาแล้ว 9 เคส — RSV, ไข้หวัดใหญ่, มือเท้าปาก ค่ารักษาสูงสุดกว่า 100,000 บาท พร้อมภาพเอกสารจริงที่ปิดข้อมูลส่วนบุคคล',
  page: 'claims', active: 'claims',
  ogImage: SITE + '/assets/img/claims/case-6.jpg',
  content: `
${breadcrumb([BC_HOME, ['เคสเคลมจริง']])}
${pageHero({
  h1: 'รีวิวเคสเคลมจริง ที่ได้รับการพิจารณาแล้ว',
  sub: 'ทุกเคสเป็นเหตุการณ์จริงจากลูกค้า FIN FOR KIDS PLUS — ภาพเอกสารปิดข้อมูลส่วนบุคคลก่อนเผยแพร่ทุกครั้ง',
  badges: ['🛡 เคลมไว ไม่ยุ่งยาก', '📄 ค่ารักษาตามเอกสารเคลม', '🤝 ตัวแทนประสานงานให้ทุกขั้นตอน'],
})}

<section class="stats-band" aria-label="สรุปเคสเคลม">
  <div class="container">
    <div class="stats-grid">
      <div class="stat"><b>9 เคส</b><span>รีวิวเคสเคลมจริงที่เผยแพร่</span></div>
      <div class="stat"><b>395,000+</b><span>บาท รวมค่ารักษาตามเอกสารเคลมทุกเคส</span></div>
      <div class="stat"><b>102,571.-</b><span>เคสค่ารักษาสูงสุด (RSV นอน รพ. 2 วัน)</span></div>
    </div>
    <p class="stats-note">ผลการพิจารณาแต่ละกรณีแตกต่างกันตามการรักษา เอกสาร ข้อเท็จจริง และเงื่อนไขกรมธรรม์</p>
  </div>
</section>

<section class="section"><div class="container">
  <div class="section-head">
    <span class="kicker">💼 CLAIM CASES</span>
    <h2>เลือกดูตามโรค</h2>
    <p>กดที่ภาพเพื่อขยายดูเอกสารเคลมขนาดเต็ม</p>
  </div>
  <div class="filter-pills" role="group" aria-label="กรองเคสตามโรค">
    <button class="pill" aria-pressed="true" data-filter="all">📚 ทั้งหมด <span class="cnt">${CLAIM_CASES.length}</span></button>
    <button class="pill" aria-pressed="false" data-filter="rsv">🫁 RSV <span class="cnt">${CLAIM_CASES.filter(c => c.disease === 'rsv').length}</span></button>
    <button class="pill" aria-pressed="false" data-filter="flu">🤧 ไข้หวัดใหญ่ <span class="cnt">${CLAIM_CASES.filter(c => c.disease === 'flu').length}</span></button>
    <button class="pill" aria-pressed="false" data-filter="hfmd">🖐 มือ เท้า ปาก <span class="cnt">${CLAIM_CASES.filter(c => c.disease === 'hfmd').length}</span></button>
  </div>
  <div class="grid grid-3" id="claim-grid">
    ${CLAIM_CASES.map(claimCard).join('\n')}
  </div>
  <p class="note" style="margin-top:24px">ภาพเอกสารทุกฉบับปิดข้อมูลส่วนบุคคล (ชื่อผู้เอาประกันภัย เลขกรมธรรม์ เบอร์โทรศัพท์) ก่อนเผยแพร่ · เคสที่เผยแพร่เป็นตัวอย่างจากเหตุการณ์จริง ผลการพิจารณาแต่ละกรณีอาจแตกต่างกันตามรายละเอียดการรักษา เอกสาร ข้อเท็จจริง และเงื่อนไขกรมธรรม์</p>
</div></section>

<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true"><defs><g id="i-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></g></defs></svg>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="ภาพขยาย">
  <button class="lightbox-close" aria-label="ปิดภาพขยาย">✕</button>
  <img src="" alt="">
</div>

<script>
(function(){
  var grid=document.getElementById('claim-grid');
  document.querySelectorAll('.pill').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.pill').forEach(function(b){b.setAttribute('aria-pressed','false')});
      btn.setAttribute('aria-pressed','true');
      var f=btn.getAttribute('data-filter');
      grid.querySelectorAll('.claim-card').forEach(function(c){
        c.style.display=(f==='all'||c.getAttribute('data-cat')===f)?'':'none';
      });
      if(window.finTrack) finTrack('claim_filter',{disease:f});
    });
  });
})();
</script>

${ctaBanner('claim-cases', 'อยากให้ลูกได้รับความคุ้มครองแบบเคสเหล่านี้?', 'ส่งอายุลูกให้ตัวแทนช่วยเช็คแผนและเบี้ยได้ทาง LINE — ตัวแทนดูแลตั้งแต่สมัครจนถึงวันเคลม')}
`,
},

/* หมายเหตุ: หน้า /articles/ ย้ายไป generate จาก site-src/pages-articles.mjs (30 บทความ) */

/* ============ /about/ ============ */
{
  file: 'about/index.html',
  path: '/about/',
  title: 'เกี่ยวกับ FIN Insurance Broker | เรื่องประกัน ✓ เราชัดเจน',
  desc: 'รู้จัก FIN Insurance Broker นายหน้าประกันวินาศภัย ผู้ให้บริการประกันสุขภาพเด็ก FIN FOR KIDS PLUS พร้อมมาตรฐานการดูแลลูกค้าและช่องทางตรวจสอบใบอนุญาต',
  page: 'about', active: 'about',
  content: `
${breadcrumb([BC_HOME, ['เกี่ยวกับเรา']])}
${pageHero({
  h1: 'เกี่ยวกับ FIN Insurance Broker',
  sub: 'เรื่องประกัน ✓ เราชัดเจน — เปรียบเทียบ อธิบาย และดูแลลูกค้าโดยตัวแทนที่มีใบอนุญาต',
})}

<section class="section"><div class="container prose" style="max-width:860px">

<h2>เราคือใคร</h2>
<p>FIN Insurance Broker เป็นนายหน้าประกันวินาศภัยที่ตั้งใจทำให้เรื่องประกัน "ชัดเจน" สำหรับทุกครอบครัว เราเชื่อว่าการตัดสินใจทำประกันที่ดีเริ่มจากการเข้าใจความคุ้มครอง เงื่อนไข และข้อยกเว้นอย่างครบถ้วน ไม่ใช่แค่ราคาถูกที่สุด</p>

<h2>ประเภทประกันที่ให้บริการ</h2>
<ul>
<li><b>ประกันสุขภาพเด็ก</b> — FIN FOR KIDS PLUS คุ้มครองโรคฮิตเด็กพร้อมอุบัติเหตุ (รับประกันภัยโดย MSIG)</li>
</ul>

<h2>มาตรฐานการดูแลลูกค้า</h2>
<ul>
<li>อธิบายความคุ้มครองและข้อยกเว้นก่อนตัดสินใจ ไม่กล่าวเกินจริง</li>
<li>ตัวแทนทุกคนมีใบอนุญาตนายหน้าประกันภัย ตรวจสอบได้</li>
<li>ช่วยประสานงานเมื่อใช้สิทธิ์ ตั้งแต่แจ้งเคลมจนทราบผล</li>
<li>เก็บรักษาข้อมูลส่วนบุคคลตามนโยบายความเป็นส่วนตัว</li>
</ul>

<h2>บริษัทประกันภัยที่เป็นผู้รับประกัน</h2>
<p>ผลิตภัณฑ์ประกันสุขภาพเด็ก FIN FOR KIDS PLUS รับประกันภัยโดย MSIG โดย FIN Insurance Broker ทำหน้าที่เป็นนายหน้าผู้ให้คำแนะนำและประสานงาน</p>

<h2>ใบอนุญาตและข้อมูลนิติบุคคล</h2>
<p>ดูรายละเอียดใบอนุญาตนายหน้าประกันวินาศภัยและข้อมูลนิติบุคคลได้ที่ <a href="/license/">หน้าข้อมูลใบอนุญาต</a> หรือตรวจสอบกับสำนักงาน คปภ. โดยตรง</p>
<p><a class="btn btn-outline-red" href="https://smart.oic.or.th/EService/Menu5" target="_blank" rel="noopener">ตรวจสอบใบอนุญาตนายหน้ากับ คปภ. →</a></p>

<h2>นโยบายการตรวจสอบและแก้ไขเนื้อหา</h2>
<p>เนื้อหาบนเว็บไซต์ผ่านการตรวจสอบโดยตัวแทนที่มีใบอนุญาตก่อนเผยแพร่ และมีการทบทวนเมื่อผลิตภัณฑ์หรือเงื่อนไขเปลี่ยนแปลง ทุกหน้าผลิตภัณฑ์ระบุข้อความกำกับให้ศึกษารายละเอียดในกรมธรรม์ก่อนตัดสินใจ หากพบข้อมูลที่ไม่ถูกต้อง แจ้งทีมงานได้ที่<a href="/contact/">หน้าติดต่อเรา</a></p>

<h2>ช่องทางร้องเรียน</h2>
<p>หากไม่ได้รับความเป็นธรรมจากการให้บริการ ติดต่อได้ที่<a href="/complaints/">ช่องทางร้องเรียน</a> เราถือทุกเรื่องร้องเรียนเป็นเรื่องสำคัญและติดตามจนได้ข้อยุติ</p>

</div></section>

${ctaBanner('about', 'อยากคุยกับทีมงานโดยตรง?', 'แอด LINE @finforkids มีตัวแทนที่มีใบอนุญาตพร้อมให้คำแนะนำทุกวัน')}
`,
},

/* ============ /contact/ ============ */
{
  file: 'contact/index.html',
  path: '/contact/',
  title: 'ติดต่อ FIN Insurance Broker | LINE @finforkids',
  desc: 'ติดต่อ FIN Insurance Broker ทาง LINE OA @finforkids, Facebook ฟินประกันเด็ก และ TikTok สอบถามแผนประกันสุขภาพเด็ก FIN FOR KIDS PLUS ได้ทุกวัน',
  page: 'contact', active: 'contact',
  content: `
${breadcrumb([BC_HOME, ['ติดต่อเรา']])}
${pageHero({
  h1: 'ติดต่อ FIN Insurance Broker',
  sub: 'ช่องทางหลักคือ LINE OA — มีตัวแทนดูแลและให้คำแนะนำ ตอบไวทุกวัน',
})}

<section class="section"><div class="container">
  <div class="grid grid-3">
    <div class="card card-featured" style="text-align:center">
      <span class="ribbon">ช่องทางหลัก</span>
      <div class="icon" style="margin:0 auto;background:#E8FBF0">💬</div>
      <h3>LINE OA</h3>
      <p style="font-family:var(--font-head);font-size:1.3rem;color:var(--navy);font-weight:600">@finforkids</p>
      <p>บัญชีทางการ มีตัวแทนดูแลและให้คำแนะนำ</p>
      <div class="card-cta"><a class="btn btn-line" href="/go/line/?intent=contact-page" data-line-intent="contact-page">แอด LINE เพื่อสอบถามแผน</a></div>
    </div>
    <div class="card" style="text-align:center">
      <div class="icon" style="margin:0 auto;background:#EDF3FE">📘</div>
      <h3>Facebook</h3>
      <p style="font-family:var(--font-head);font-size:1.1rem;color:var(--navy);font-weight:600">ฟินประกันเด็ก</p>
      <p>ติดตามความรู้และข่าวสาร พร้อมทักแชทได้</p>
      <div class="card-cta"><a class="btn btn-navy" href="https://www.facebook.com/" target="_blank" rel="noopener">ส่งข้อความทาง Facebook</a></div>
    </div>
    <div class="card" style="text-align:center">
      <div class="icon" style="margin:0 auto;background:#F6F6F6">🎵</div>
      <h3>TikTok</h3>
      <p style="font-family:var(--font-head);font-size:1.1rem;color:var(--navy);font-weight:600">ฟินประกันเด็ก</p>
      <p>คลิปสั้นความรู้ประกันและสุขภาพเด็ก</p>
      <div class="card-cta"><a class="btn btn-outline" href="https://www.tiktok.com/" target="_blank" rel="noopener">ดู TikTok ของเรา</a></div>
    </div>
  </div>

  <div class="card" style="max-width:720px;margin:40px auto 0">
    <h3>📝 ฝากข้อมูลให้ติดต่อกลับ</h3>
    <p style="color:var(--gray);font-size:.9rem">กรอกข้อมูลเบื้องต้น ตัวแทนจะติดต่อกลับตามช่องทางที่สะดวก — <b>ไม่ต้องส่ง</b>เลขบัตรประชาชน สำเนาบัตร สูติบัตร หรือข้อมูลสุขภาพละเอียดในแบบฟอร์มนี้</p>
    <form action="/go/line/?intent=contact-form" method="get" style="display:flex;flex-direction:column;gap:12px;margin-top:8px" onsubmit="if(window.finTrack)finTrack('contact_form_submit',{})">
      <label style="font-size:.9rem">ชื่อ<br><input required name="name" style="width:100%;padding:11px;border-radius:10px;border:1.5px solid var(--border);font-family:var(--font-body)"></label>
      <label style="font-size:.9rem">ประเภทประกันที่สนใจ<br>
        <select name="interest" style="width:100%;padding:11px;border-radius:10px;border:1.5px solid var(--border);font-family:var(--font-body)">
          <option>ประกันสุขภาพเด็ก</option><option>อื่น ๆ</option>
        </select></label>
      <label style="font-size:.9rem">อายุบุตร/หลาน<br><input name="detail" style="width:100%;padding:11px;border-radius:10px;border:1.5px solid var(--border);font-family:var(--font-body)"></label>
      <label style="font-size:.9rem">ช่องทางให้ติดต่อกลับ (LINE ID หรืออีเมล)<br><input required name="callback" style="width:100%;padding:11px;border-radius:10px;border:1.5px solid var(--border);font-family:var(--font-body)"></label>
      <label style="font-size:.9rem">รายละเอียดเพิ่มเติม<br><textarea name="message" rows="3" style="width:100%;padding:11px;border-radius:10px;border:1.5px solid var(--border);font-family:var(--font-body)"></textarea></label>
      <label style="font-size:.85rem;display:flex;gap:10px;align-items:flex-start"><input type="checkbox" required style="margin-top:4px"> ข้าพเจ้ายินยอมให้เก็บและใช้ข้อมูลข้างต้นเพื่อการติดต่อกลับ ตาม<a href="/privacy-policy/">นโยบายความเป็นส่วนตัว</a></label>
      <button class="btn btn-red" type="submit">ส่งข้อมูลให้ติดต่อกลับ</button>
      <p style="font-size:.78rem;color:var(--gray)">หรือสะดวกกว่า: ทัก LINE @finforkids ได้เลย ตัวแทนตอบไวกว่า</p>
    </form>
  </div>
</div></section>
`,
},

/* ============ /license/ ============ */
{
  file: 'license/index.html',
  path: '/license/',
  title: 'ข้อมูลใบอนุญาตนายหน้าประกันภัย | FIN Insurance Broker',
  desc: 'ข้อมูลใบอนุญาตนายหน้าประกันวินาศภัยของ FIN Insurance Broker และช่องทางตรวจสอบสถานะใบอนุญาตกับสำนักงาน คปภ.',
  page: 'license', active: 'about',
  content: `
${breadcrumb([BC_HOME, ['เกี่ยวกับเรา', '/about/'], ['ข้อมูลใบอนุญาต']])}
${pageHero({ h1: 'ข้อมูลใบอนุญาตนายหน้าประกันภัย', sub: 'โปร่งใส ตรวจสอบได้ — มาตรฐานแรกของการเป็นนายหน้าที่ดี' })}

<section class="section"><div class="container prose" style="max-width:760px">
<h2>ข้อมูลนิติบุคคล</h2>
<div class="tbl-wrap"><table class="tbl">
<tbody>
<tr><td>ชื่อผู้ประกอบการ</td><td style="text-align:left">FIN Insurance Broker (ระบุชื่อนิติบุคคลเต็ม)</td></tr>
<tr><td>ประเภทใบอนุญาต</td><td style="text-align:left">นายหน้าประกันวินาศภัย</td></tr>
<tr><td>เลขที่ใบอนุญาต</td><td style="text-align:left">(ระบุเลขที่ใบอนุญาต)</td></tr>
<tr><td>ผลิตภัณฑ์หลัก</td><td style="text-align:left">ประกันสุขภาพเด็ก FIN FOR KIDS PLUS (รับประกันภัยโดย MSIG)</td></tr>
</tbody></table></div>
<p class="note" style="margin-top:16px">โปรดกรอกเลขที่ใบอนุญาตและชื่อนิติบุคคลจริงก่อนเผยแพร่เว็บไซต์</p>

<h2>ตรวจสอบใบอนุญาตด้วยตนเอง</h2>
<p>ผู้บริโภคสามารถตรวจสอบสถานะใบอนุญาตนายหน้าประกันภัยได้โดยตรงกับสำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.)</p>
<p><a class="btn btn-outline-red" href="https://smart.oic.or.th/EService/Menu5" target="_blank" rel="noopener">ตรวจสอบใบอนุญาตนายหน้ากับ คปภ. →</a></p>
</div></section>
`,
},

/* ============ /complaints/ ============ */
{
  file: 'complaints/index.html',
  path: '/complaints/',
  title: 'ช่องทางร้องเรียน | FIN Insurance Broker',
  desc: 'ช่องทางร้องเรียนการให้บริการของ FIN Insurance Broker และช่องทางร้องเรียนต่อสำนักงาน คปภ. เราถือทุกเรื่องร้องเรียนเป็นเรื่องสำคัญ',
  page: 'complaints', active: 'about',
  content: `
${breadcrumb([BC_HOME, ['ช่องทางร้องเรียน']])}
${pageHero({ h1: 'ช่องทางร้องเรียน', sub: 'เราถือทุกเรื่องร้องเรียนเป็นเรื่องสำคัญ และติดตามจนได้ข้อยุติ' })}

<section class="section"><div class="container prose" style="max-width:760px">
<h2>ร้องเรียนกับเราโดยตรง</h2>
<ol class="steps" style="margin-top:18px">
<li><b>แจ้งเรื่องผ่าน LINE OA @finforkids</b><span>ระบุว่า "ต้องการร้องเรียน" พร้อมรายละเอียดเหตุการณ์ วันเวลา และชื่อผู้เกี่ยวข้อง (ถ้ามี)</span></li>
<li><b>ทีมงานรับเรื่องและยืนยันกลับภายใน 3 วันทำการ</b><span>พร้อมแจ้งกรอบเวลาการตรวจสอบ</span></li>
<li><b>แจ้งผลการตรวจสอบและแนวทางแก้ไข</b><span>ติดตามจนเรื่องได้ข้อยุติ</span></li>
</ol>

<h2>ร้องเรียนต่อหน่วยงานกำกับ</h2>
<p>หากไม่พอใจผลการดำเนินการ ท่านมีสิทธิ์ร้องเรียนต่อสำนักงาน คปภ. ได้โดยตรง</p>
<ul>
<li>สายด่วน คปภ. โทร <b>1186</b></li>
<li>เว็บไซต์ <a href="https://www.oic.or.th" target="_blank" rel="noopener">www.oic.or.th</a></li>
</ul>
</div></section>

${ctaBanner('complaints', 'ต้องการแจ้งเรื่องร้องเรียน?', 'ทัก LINE @finforkids แล้วพิมพ์ว่า "ร้องเรียน" ทีมงานจะรับเรื่องทันที')}
`,
},
];
