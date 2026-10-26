# Z-HIMS · Zamfara Health Insurance Management System 🇳🇬

A World-Class, Sovereign Health Insurance and Healthcare Operations Portal engineered for the **Zamfara State Contributory Healthcare Management Agency (ZAMCHEMA)** in compliance with the **National Health Insurance Authority (NHIA) Act 2022**, **FHIR R4**, and **NDPA 2023**.

---

## 🌟 Strategic Key Capabilities

1. **Sovereign RBAC Clearance Profiles**:
   - **Executive Admin** (*Dr. Aisha Bello Bungudu · ZAMCHEMA HQ*): State solvency tracking, BHCPF coverage expansion, multi-tenant health plans, statutory advance capitation release, and strategic HMO benchmarking.
   - **Medical Director** (*Dr. Aminu Mohammed Gusau · FMC Gusau*): Tertiary hospital surgical dispatch, encrypted maternal telemedicine, and 100% emergency C-section waiver governance.
   - **Claims Audit Officer** (*Ibrahim Sanusi Maradun · Audit Bureau*): Electronic FHIR R4 claims processing, AI Fraud, Waste & Abuse (FWA) sentinel, and drug stockout audits.
   - **Field Enrolment Agent** (*Hauwa'u Aliyu Anka · Anka LGA Field Unit*): Citizen biometric registration, NIN verification, offline QR token issuance, POS micro-savings sweeps, and rural USSD simulation (*966#).
   - **Enrolled Citizen (NIN)** (*Balarabe Mohammed Gusau · NIN Verified*): Self-service digital ID card with QR token, family coverage, micro-savings wallet, and 24/7 indigenous Hausa Voice AI doctor.

2. **Multimodal Indigenous Hausa Voice AI Doctor**:
   - Real-time spoken symptom consultation in fluent Hausa (`ha-NG`) and English.
   - Clinical translation to ICD-11 diagnosis codes and automated primary/tertiary facility referral routing.

3. **1st-of-Month Advance Primary Healthcare Capitation**:
   - Automated ₦500/enrollee monthly capitation dispatches to accredited PHCs across all 14 Zamfara Local Government Areas via NIBSS/remittance integration.

4. **Vitality-Style Prevention Incentives**:
   - Micro-rewards for health milestones: ANC-4 completion, Pentavalent-3 child immunization, malaria IPTp + LLIN bednets, and postnatal checkups via ₦200 direct airtime top-ups and nutrition vouchers.

5. **Diaspora Remittance Health Bonds**:
   - Direct sponsorship channel for Zamfarawa in the diaspora (UK, US, Middle East) to purchase healthcare vouchers and annual bonds for vulnerable families back home.

6. **Offline-Resilient Point-of-Care Terminal**:
   - Encrypted QR code scanning and cached NIN lookup for rural and IDP camp clinics with intermittent or zero internet connectivity.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, Vite, Lucide Icons, QRCode SVG, Vanilla Modern CSS design system.
- **Backend**: Node.js, Express, RESTful APIs, HL7 FHIR R4 JSON schemas.
- **Database**: Sovereign MySQL datastore (`zhims_db`) with transactional schemas and automated seeding.
- **Localization**: 100% bilingual parity (English 🇬🇧 & Harshen Hausa 🇳🇬).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL (e.g. XAMPP on port 3306)

### 1. Database Setup
Ensure MySQL is running on port 3306. Create database `zhims_db` or allow the server to automatically initialize schema and seeds on startup.

### 2. Backend Installation & Start
```bash
cd server
npm install
node index.js
```
The server will start on `http://localhost:5000`.

### 3. Frontend Installation & Start
```bash
cd client
npm install
npm run dev
```
The client portal will be accessible at `http://localhost:3000`.

---

## 📜 Regulatory Standards & Compliance
- **NHIA Act 2022 Section 13(2)** (Mandatory Health Insurance)
- **FHIR R4 (Fast Healthcare Interoperability Resources)**
- **Nigeria Data Protection Act (NDPA 2023)**
- **Digital Health Interoperability Network (DHIN)**

---

*Zamfara State Contributory Healthcare Management Agency (ZAMCHEMA) · Gusau, Zamfara State, Federal Republic of Nigeria.*
