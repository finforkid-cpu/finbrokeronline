# FIN FOR KIDS PLUS — ระบบสมัครประกันภัยออนไลน์

หน้าสมัครประกันภัยโรคสุดฮิต FIN FOR KIDS PLUS (MSIG) เชื่อมต่อฐานข้อมูล **Supabase** เต็มรูปแบบ
อ้างอิงผลิตภัณฑ์: QD-UDW-097 PI-008/1 RV No.:04 Effective 01.07.2026

## วิธีใช้งาน

เปิดไฟล์ `index.html` ในเบราว์เซอร์ได้เลย (ดับเบิลคลิก) หรือขึ้น hosting ใดก็ได้ (Netlify, Vercel, GitHub Pages ฯลฯ)

รองรับ UTM tracking: `index.html?utm_source=line` / `facebook` / `tiktok` (ค่าเริ่มต้น `web`)

## สถาปัตยกรรม

- **Supabase project**: `lrhatlgcmnpusopodvkn` (https://lrhatlgcmnpusopodvkn.supabase.co)
- หน้าเว็บใช้ **publishable key** (ปลอดภัยที่จะอยู่ในโค้ดฝั่ง client)
- การส่งใบสมัครทำผ่านฟังก์ชัน `submit_application` (SECURITY DEFINER) เพียงช่องทางเดียว:
  - ตรวจสอบข้อมูลซ้ำทั้งหมดฝั่งเซิร์ฟเวอร์ (อายุ, เลขบัตร checksum, เบอร์โทร, อีเมล, PDPA)
  - **ไม่เชื่อยอดเงินจาก client** — ดึงเบี้ยจากตาราง `plan_premiums` และคำนวณงวดผ่อนเอง
  - เข้ารหัสเลขบัตรประชาชน (pgcrypto + กุญแจใน Supabase Vault) เก็บ SHA-256 hash ไว้ค้นหา
  - บังคับเงื่อนไข **1 กรมธรรม์ ต่อเด็ก 1 คน** (เช็กจาก hash เลขบัตร)
  - สร้างเลขอ้างอิง `FFKYYMMDD-XXXX` และบันทึก audit log อัตโนมัติ (trigger)
- ไฟล์แนบ (สลิป/บัตร ปชช./สูติบัตร) อัปโหลดเข้า Storage bucket `applications`
  (private · จำกัด 10MB · รับเฉพาะรูปภาพและ PDF · anon อัปโหลดได้อย่างเดียว อ่าน/ลบไม่ได้)
- **RLS เปิดทุกตาราง**: คนทั่วไปอ่านได้เฉพาะ `plans` และ `plan_premiums`
  ข้อมูลผู้สมัครทั้งหมดเข้าถึงได้เฉพาะฝั่งหลังบ้าน (Supabase Dashboard / service role)

## ตารางในฐานข้อมูล

| ตาราง | หน้าที่ |
|---|---|
| `plans`, `plan_premiums` | แผนประกันและเบี้ยตามช่วงอายุ — **แก้เบี้ยใน DB ได้เลย หน้าเว็บดึงอัตโนมัติ** |
| `applications` | คำขอเอาประกันภัย (1 คำขอ = 1 กรมธรรม์) + สถานะ |
| `applicants` | ผู้ปกครอง (เลขบัตรเข้ารหัส) |
| `insured_children` | บุตร/หลาน (เลขบัตรเข้ารหัส, กันซ้ำด้วย hash) |
| `addresses` | ที่อยู่จัดส่งกรมธรรม์ |
| `payment_installments` | งวดชำระ (เต็มจำนวน/3/4/6 งวด · งวด 6 = แรก 20% ปัดขึ้น) |
| `documents` | เอกสารแนบ (path ชี้ไป Storage) |
| `advisors` | เจ้าหน้าที่ผู้มีใบอนุญาต (OIC) |
| `application_status_log` | ประวัติเปลี่ยนสถานะ (audit trail) |

## คิวรีที่ใช้บ่อย (รันใน Supabase SQL Editor)

```sql
-- งานค้างรอเจ้าหน้าที่ตรวจวันนี้
select ref_no, created_at from applications
where status = 'PENDING_ADVISOR_REVIEW' order by created_at;

-- งวดผ่อนครบกำหนดใน 3 วัน (สำหรับแจ้งเตือน LINE OA)
select a.ref_no, i.inst_no, i.due_date, i.amount
from payment_installments i join applications a on a.app_id = i.app_id
where i.status = 'PENDING' and i.due_date <= current_date + 3;

-- ถอดรหัสเลขบัตรประชาชน (ทำได้เฉพาะใน SQL Editor/หลังบ้าน)
select full_name,
       pgp_sym_decrypt(citizen_id_enc,
         (select decrypted_secret from vault.decrypted_secrets where name='citizen_id_key')) as cid
from applicants;
```

## สถานะคำขอ (application status flow)

`DRAFT` → `SLIP_UPLOADED` → `PENDING_ADVISOR_REVIEW` (หน้าเว็บส่งเข้าสถานะนี้)
→ `PENDING_UNDERWRITING` → `APPROVED` / `REJECTED` / `CANCELLED`
