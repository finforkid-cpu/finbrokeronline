// สร้างภาพหน้าปกบทความเป็น SVG (ธีมตรงหัวข้อ) — เขียนเป็นไฟล์ .svg ใน assets/img/covers/
// ใช้ emoji + ไล่สี + ลวดลายจาง ทำให้แต่ละหัวข้อมีหน้าปกเฉพาะตัว โดยไม่ต้องใช้ภาพถ่ายลิขสิทธิ์

// ธีมของแต่ละ cover key: [emoji, สีเริ่ม, สีจบ, ป้ายกำกับ]
export const COVERS = {
  flu:         ['🤧', '#3B6FB0', '#5B8FD0', 'ไข้หวัดใหญ่'],
  dengue:      ['🦟', '#B0322F', '#E5252A', 'ไข้เลือดออก'],
  rsv:         ['🫁', '#2E8B8B', '#3FB3B3', 'RSV'],
  measles:     ['🔴', '#C13B57', '#E56A82', 'โรคหัด'],
  chikungunya: ['🦵', '#8A5A2B', '#C08542', 'ชิคุนกุนยา'],
  appendicitis:['⚡', '#7A3FA0', '#A05Fc8', 'ไส้ติ่งอักเสบ'],
  hfmd:        ['🖐️', '#C86A1E', '#F0902E', 'มือ เท้า ปาก'],
  chickenpox:  ['🌡️', '#3F8F5A', '#5FB37A', 'สุกใส'],
  watch5:      ['⚠️', '#1D1B67', '#3B2F9E', '5 โรคฮิต'],
  plan8:       ['📘', '#1D1B67', '#E5252A', '8 โรคคุ้มครอง'],
  vaccine:     ['💉', '#2E7DB0', '#4FA0D0', 'วัคซีน'],
  mosquito:    ['🦟', '#3F7A4F', '#5FA070', 'กันยุงลาย'],
  rsvcold:     ['🤒', '#3572A8', '#5A94C8', 'RSV vs หวัด'],
  mmr:         ['💉', '#B0417A', '#D66FA0', 'วัคซีน MMR'],
  school:      ['🏫', '#C87A1E', '#EAA23E', 'ในโรงเรียน'],
  skincare:    ['🧴', '#3F9070', '#5FB090', 'ดูแลผิว'],
  fever:       ['🌡️', '#C13B3B', '#E56A6A', 'ลูกมีไข้'],
  immunity:    ['🥦', '#4F9A45', '#72B865', 'เสริมภูมิ'],
  emergency:   ['🚑', '#B0322F', '#E5252A', 'สัญญาณอันตราย'],
  season:      ['🌧️', '#3F6FA0', '#5F92C0', 'โรคตามฤดู'],
  whatins:     ['🛡️', '#1D1B67', '#3B2F9E', 'ประกันเด็กคือ'],
  ipdopd:      ['🏥', '#2E7D8B', '#4FA0AE', 'IPD vs OPD'],
  waiting:     ['⏳', '#8A6A2B', '#B89242', 'ระยะรอคอย'],
  newborn:     ['👶', '#C86A8A', '#E58AAA', 'เด็กแรกเกิด'],
  accident:    ['🩹', '#C85A2E', '#EA7A4E', 'อุบัติเหตุ'],
  history:     ['📋', '#5A6A8A', '#7A8AAA', 'เคยป่วยมาก่อน'],
  documents:   ['📑', '#2E7DB0', '#4FA0D0', 'เอกสารเคลม'],
  notify:      ['📞', '#3F8F7A', '#5FB09A', 'แจ้งตัวแทน'],
  payment:     ['💳', '#7A5AA0', '#9A7AC0', 'สำรองจ่าย'],
  installment: ['🧮', '#1D6FA0', '#3F92C0', 'ผ่อนค่าเบี้ย'],
};

export function coverSvg(key) {
  const [emoji, c1, c2, label] = COVERS[key] || ['📄', '#1D1B67', '#3B2F9E', 'บทความ'];
  // ลวดลายวงกลมจาง + emoji ใหญ่กลางภาพ + แถบ CI แดงด้านล่าง
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.6">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#g)"/>
  <circle cx="120" cy="110" r="150" fill="#ffffff" opacity="0.06"/>
  <circle cx="700" cy="420" r="180" fill="#ffffff" opacity="0.05"/>
  <circle cx="660" cy="90" r="70" fill="#ffffff" opacity="0.07"/>
  <rect width="800" height="500" fill="url(#glow)"/>
  <text x="400" y="230" font-size="150" text-anchor="middle" dominant-baseline="central">${emoji}</text>
  <g font-family="'Kanit','Noto Sans Thai',sans-serif">
    <rect x="0" y="380" width="800" height="120" fill="#000000" opacity="0.12"/>
    <text x="400" y="430" font-size="46" font-weight="700" fill="#ffffff" text-anchor="middle">${label}</text>
    <rect x="310" y="452" width="180" height="5" rx="2.5" fill="#E5252A"/>
  </g>
  <rect x="0" y="494" width="800" height="6" fill="#E5252A"/>
</svg>`;
}
