// Database schema and initial seed data for Zamfara Health Insurance Management System (Z-HIMS)

export const schemaSql = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_plain VARCHAR(100) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  role ENUM('executive_admin', 'medical_director', 'claims_officer', 'field_agent', 'beneficiary') NOT NULL,
  organization VARCHAR(150) NOT NULL,
  lga_id INT NULL,
  avatar_icon VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name_en VARCHAR(150) NOT NULL,
  name_ha VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  funding_model_en VARCHAR(255) NOT NULL,
  funding_model_ha VARCHAR(255) NOT NULL,
  premium_amount DECIMAL(12,2) DEFAULT 0.00,
  premium_type VARCHAR(50) NOT NULL,
  benefit_scope_en TEXT NOT NULL,
  benefit_scope_ha TEXT NOT NULL,
  target_population_en TEXT NOT NULL,
  target_population_ha TEXT NOT NULL,
  copayment_rate DECIMAL(5,2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lgas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  headquarters VARCHAR(100) NOT NULL,
  population INT NOT NULL,
  bhcpf_target INT NOT NULL,
  bhcpf_enrolled INT DEFAULT 0,
  total_phcs INT NOT NULL,
  functional_phcs INT NOT NULL,
  risk_level ENUM('Normal', 'High Risk Outbreak', 'Conflict Impacted') DEFAULT 'Normal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS providers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  facility_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  lga_id INT NOT NULL,
  tier ENUM('phc', 'general_hospital', 'specialist', 'private_empanelled') NOT NULL,
  is_functional BOOLEAN DEFAULT TRUE,
  accredited_plans VARCHAR(255) NOT NULL,
  mdcn_pcn_verified BOOLEAN DEFAULT TRUE,
  has_edge_node BOOLEAN DEFAULT FALSE,
  address VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  FOREIGN KEY (lga_id) REFERENCES lgas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS beneficiaries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  card_number VARCHAR(50) UNIQUE NOT NULL,
  nin VARCHAR(11) UNIQUE NOT NULL,
  bvn VARCHAR(11) NULL,
  full_name VARCHAR(200) NOT NULL,
  gender ENUM('Male', 'Female') NOT NULL,
  dob DATE NOT NULL,
  phone VARCHAR(50) NOT NULL,
  lga_id INT NOT NULL,
  ward VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  plan_id INT NOT NULL,
  is_household_head BOOLEAN DEFAULT TRUE,
  household_size INT DEFAULT 1,
  wallet_balance DECIMAL(12,2) DEFAULT 0.00,
  wallet_target DECIMAL(12,2) DEFAULT 12000.00,
  premium_status ENUM('active', 'pending_wallet_target', 'exempt_subsidized', 'expired') DEFAULT 'active',
  qr_token VARCHAR(255) NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at DATE NOT NULL,
  FOREIGN KEY (lga_id) REFERENCES lgas(id),
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

CREATE TABLE IF NOT EXISTS dependents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  principal_id INT NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  relationship ENUM('Wife', 'Child', 'Aged Parent', 'Ward') NOT NULL,
  nin VARCHAR(11) NULL,
  gender ENUM('Male', 'Female') NOT NULL,
  dob DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (principal_id) REFERENCES beneficiaries(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  beneficiary_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  channel ENUM('USSD *966#', 'Agent POS / Cash', 'Paystack', 'Moniepoint / OPay', 'Direct Bank Transfer') NOT NULL,
  reference VARCHAR(100) UNIQUE NOT NULL,
  status ENUM('successful', 'pending', 'failed') DEFAULT 'successful',
  notes VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS encounters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  encounter_code VARCHAR(50) UNIQUE NOT NULL,
  beneficiary_id INT NOT NULL,
  provider_id INT NOT NULL,
  encounter_date DATE NOT NULL,
  icd11_code VARCHAR(50) NOT NULL,
  diagnosis_en VARCHAR(255) NOT NULL,
  diagnosis_ha VARCHAR(255) NOT NULL,
  service_type ENUM('Outpatient PHC', 'Inpatient Care', 'Maternal Antenatal (ANC)', 'Emergency C-Section', 'Cholera Outbreak Care', 'Severe Malnutrition (RUTF)') NOT NULL,
  is_offline_captured BOOLEAN DEFAULT FALSE,
  status ENUM('completed', 'admitted', 'referred') DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id),
  FOREIGN KEY (provider_id) REFERENCES providers(id)
);

CREATE TABLE IF NOT EXISTS claims (
  id INT AUTO_INCREMENT PRIMARY KEY,
  claim_number VARCHAR(50) UNIQUE NOT NULL,
  encounter_id INT NOT NULL,
  beneficiary_id INT NOT NULL,
  provider_id INT NOT NULL,
  plan_id INT NOT NULL,
  service_description VARCHAR(255) NOT NULL,
  billed_amount DECIMAL(12,2) NOT NULL,
  approved_amount DECIMAL(12,2) NOT NULL,
  adjudication_status ENUM('auto_approved', 'manual_approved', 'pre_authorized', 'flagged_fwa', 'rejected') DEFAULT 'auto_approved',
  adjudication_rule_note VARCHAR(255),
  fhir_claim_id VARCHAR(100),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (encounter_id) REFERENCES encounters(id),
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id),
  FOREIGN KEY (provider_id) REFERENCES providers(id),
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

CREATE TABLE IF NOT EXISTS referrals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  referral_code VARCHAR(50) UNIQUE NOT NULL,
  beneficiary_id INT NOT NULL,
  from_provider_id INT NOT NULL,
  to_provider_id INT NOT NULL,
  clinical_reason VARCHAR(255) NOT NULL,
  urgency ENUM('Routine', 'Urgent', 'Maternal Emergency') DEFAULT 'Routine',
  outcome_status ENUM('referred', 'in_transit', 'consulted', 'closed_loop_completed') DEFAULT 'referred',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id),
  FOREIGN KEY (from_provider_id) REFERENCES providers(id),
  FOREIGN KEY (to_provider_id) REFERENCES providers(id)
);

CREATE TABLE IF NOT EXISTS fwa_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alert_code VARCHAR(50) UNIQUE NOT NULL,
  alert_type ENUM('phantom_beneficiary', 'duplicate_billing', 'unbundling', 'upcoding', 'doctor_shopping') NOT NULL,
  severity ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
  entity_type ENUM('claim', 'beneficiary', 'provider') NOT NULL,
  entity_id INT NOT NULL,
  entity_ref VARCHAR(100) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_ha VARCHAR(255) NOT NULL,
  details_en TEXT NOT NULL,
  details_ha TEXT NOT NULL,
  potential_saving DECIMAL(12,2) DEFAULT 0.00,
  status ENUM('active_flag', 'under_investigation', 'recovered', 'dismissed') DEFAULT 'active_flag',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outbreak_controls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  outbreak_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  emergency_waiver_active BOOLEAN DEFAULT TRUE,
  affected_lgas TEXT NOT NULL,
  guideline_en TEXT NOT NULL,
  guideline_ha TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS grievances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  beneficiary_id INT NULL,
  provider_id INT NULL,
  category ENUM('illegal_out_of_pocket', 'drug_stockout', 'denial_of_care', 'claim_delay', 'facility_conduct') NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_ha VARCHAR(255) NOT NULL,
  description_en TEXT NOT NULL,
  description_ha TEXT NOT NULL,
  sla_hours INT DEFAULT 72,
  status ENUM('open', 'investigating', 'resolved', 'escalated') DEFAULT 'open',
  resolution_notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE SET NULL,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS telemedicine_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_code VARCHAR(50) UNIQUE NOT NULL,
  beneficiary_id INT NOT NULL,
  phc_provider_id INT NOT NULL,
  specialist_provider_id INT NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  chief_complaint VARCHAR(255) NOT NULL,
  recommendation TEXT NULL,
  status ENUM('scheduled', 'in_progress', 'completed') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id),
  FOREIGN KEY (phc_provider_id) REFERENCES providers(id),
  FOREIGN KEY (specialist_provider_id) REFERENCES providers(id)
);

CREATE TABLE IF NOT EXISTS maternal_tracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  beneficiary_id INT NOT NULL,
  edd DATE NOT NULL,
  anc1_completed BOOLEAN DEFAULT TRUE,
  anc2_completed BOOLEAN DEFAULT FALSE,
  anc3_completed BOOLEAN DEFAULT FALSE,
  anc4_completed BOOLEAN DEFAULT FALSE,
  tetanus_toxoid BOOLEAN DEFAULT TRUE,
  iron_folate_issued BOOLEAN DEFAULT TRUE,
  risk_category ENUM('Low Risk', 'High Risk (Prior C-Section)', 'Severe Malnutrition Alert') DEFAULT 'Low Risk',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS diaspora_sponsorships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sponsor_name VARCHAR(150) NOT NULL,
  sponsor_city VARCHAR(100) NOT NULL,
  sponsor_country VARCHAR(100) NOT NULL,
  beneficiary_id INT NOT NULL,
  amount_naira DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'NGN',
  payment_channel VARCHAR(50) NOT NULL,
  message VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE
);

-- Gap 1: Automated Recurring Micro-Debit & Airtime Billing Mandates
CREATE TABLE IF NOT EXISTS recurring_mandates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mandate_ref VARCHAR(50) UNIQUE NOT NULL,
  beneficiary_id INT NOT NULL,
  channel ENUM('Telco Airtime (MTN/Airtel)', 'NIBSS Direct Debit', 'Bank Card Token', 'POS Agent Mandate') NOT NULL,
  phone_or_account VARCHAR(50) NOT NULL,
  frequency ENUM('Daily (₦50)', 'Weekly (₦250)', 'Monthly (₦500)', 'Quarterly (₦3,000)') NOT NULL,
  amount_naira DECIMAL(12,2) NOT NULL,
  total_deducted_naira DECIMAL(12,2) DEFAULT 0.00,
  successful_deductions INT DEFAULT 0,
  last_charge_date TIMESTAMP NULL,
  next_charge_date TIMESTAMP NULL,
  status ENUM('active', 'paused', 'completed_target', 'failed_insufficient_funds') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE
);

-- Gap 2: Real-Time AI Surgical & Secondary Pre-Authorization Engine (< 5 Min Turnaround)
CREATE TABLE IF NOT EXISTS pre_authorizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  auth_code VARCHAR(50) UNIQUE NOT NULL,
  beneficiary_id INT NOT NULL,
  provider_id INT NOT NULL,
  procedure_name_en VARCHAR(200) NOT NULL,
  procedure_name_ha VARCHAR(200) NOT NULL,
  icd11_code VARCHAR(50) NOT NULL,
  clinical_priority ENUM('Emergency (< 1h)', 'Urgent (< 24h)', 'Elective (Standard)') NOT NULL,
  estimated_cost DECIMAL(12,2) NOT NULL,
  approved_cost DECIMAL(12,2) NOT NULL,
  ai_decision ENUM('AUTO_APPROVED', 'CONDITIONAL_REVIEW', 'ESCALATED_MD') NOT NULL,
  ai_confidence_score DECIMAL(5,2) DEFAULT 98.50,
  turnaround_seconds INT DEFAULT 3,
  clinical_rationale_en TEXT NOT NULL,
  clinical_rationale_ha TEXT NOT NULL,
  status ENUM('active_valid', 'utilized_at_hospital', 'expired') DEFAULT 'active_valid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE
);

-- Gap 3: Rural Pharmaceutical Stockout Sentinel & Last-Mile Logistics Tracker
CREATE TABLE IF NOT EXISTS pharmacy_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  provider_id INT NOT NULL,
  lga_id INT NOT NULL,
  drug_code VARCHAR(50) NOT NULL,
  drug_name_en VARCHAR(200) NOT NULL,
  drug_name_ha VARCHAR(200) NOT NULL,
  category ENUM('Antimalarial (ACT)', 'IV Infusion (Cholera)', 'Antibiotic', 'Maternal Oxytocin / Iron', 'Diagnostic RDT') NOT NULL,
  current_stock INT NOT NULL,
  minimum_safe_stock INT NOT NULL,
  unit_name VARCHAR(50) DEFAULT 'Doses / Packs',
  status ENUM('optimal', 'low_warning', 'critical_stockout') NOT NULL,
  last_replenished DATE NOT NULL,
  auto_dispatch_status ENUM('standby', 'truck_dispatched', 'delivered_confirmed') DEFAULT 'standby',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE,
  FOREIGN KEY (lga_id) REFERENCES lgas(id) ON DELETE CASCADE
);

-- Gap 4: Diaspora Health Remittance Bonds (Multi-Family & Ward Sponsorship Cohorts)
CREATE TABLE IF NOT EXISTS diaspora_bonds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bond_code VARCHAR(50) UNIQUE NOT NULL,
  sponsor_name VARCHAR(150) NOT NULL,
  sponsor_city VARCHAR(100) NOT NULL,
  sponsor_country VARCHAR(100) NOT NULL,
  target_lga_id INT NOT NULL,
  families_sponsored_count INT NOT NULL,
  total_amount_naira DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  amount_foreign DECIMAL(10,2) NOT NULL,
  beneficiary_category ENUM('Pregnant Women & Infants', 'Indigent / IDPs', 'Elderly Chronic Patients', 'General Rural Artisans') NOT NULL,
  treatments_utilized_count INT DEFAULT 0,
  tax_exemption_ref VARCHAR(100) NOT NULL,
  message TEXT NULL,
  status ENUM('active_funded', 'allocated_verified') DEFAULT 'active_funded',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (target_lga_id) REFERENCES lgas(id) ON DELETE CASCADE
);

-- Capability 1: Automated PHC Monthly Advance Capitation Disbursement Engine
CREATE TABLE IF NOT EXISTS capitation_batches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch_ref VARCHAR(50) UNIQUE NOT NULL,
  billing_month_en VARCHAR(50) NOT NULL,
  billing_month_ha VARCHAR(50) NOT NULL,
  total_facilities_count INT NOT NULL,
  total_enrollees_count INT NOT NULL,
  capitation_rate_naira DECIMAL(10,2) DEFAULT 500.00,
  total_amount_naira DECIMAL(14,2) NOT NULL,
  nibss_batch_ref VARCHAR(50) NOT NULL,
  payment_status ENUM('calculated', 'approved', 'disbursed') DEFAULT 'disbursed',
  disbursed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS capitation_facility_allocations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch_id INT NOT NULL,
  provider_id INT NOT NULL,
  lga_id INT NOT NULL,
  assigned_enrollees INT NOT NULL,
  capitation_rate DECIMAL(10,2) DEFAULT 500.00,
  monthly_payout_naira DECIMAL(12,2) NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  account_number VARCHAR(20) NOT NULL,
  payment_status ENUM('pending', 'credited') DEFAULT 'credited',
  remittance_ref VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (batch_id) REFERENCES capitation_batches(id) ON DELETE CASCADE,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE,
  FOREIGN KEY (lga_id) REFERENCES lgas(id) ON DELETE CASCADE
);

-- Capability 2: Vitality-Style Behavioral Prevention & Micro-Incentive Ledger
CREATE TABLE IF NOT EXISTS prevention_rewards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reward_code VARCHAR(50) UNIQUE NOT NULL,
  beneficiary_id INT NOT NULL,
  provider_id INT NOT NULL,
  milestone_type ENUM('anc_visit', 'immunization', 'postnatal', 'malaria_prophylaxis', 'wellness_check') NOT NULL,
  milestone_name_en VARCHAR(150) NOT NULL,
  milestone_name_ha VARCHAR(150) NOT NULL,
  reward_type ENUM('airtime_credit', 'cash_wallet', 'nutrition_voucher', 'mosquito_net_voucher') NOT NULL,
  reward_value_naira DECIMAL(10,2) DEFAULT 200.00,
  voucher_code VARCHAR(50) NOT NULL,
  delivery_channel VARCHAR(60) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  is_claimed BOOLEAN DEFAULT TRUE,
  awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE CASCADE,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE
);

-- Capability 3: Multimodal Indigenous Voice AI Symptom Triage Sessions
CREATE TABLE IF NOT EXISTS voice_triage_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_ref VARCHAR(50) UNIQUE NOT NULL,
  citizen_phone VARCHAR(30) NOT NULL,
  citizen_name VARCHAR(150) DEFAULT 'Zamfara Rural Citizen',
  spoken_language ENUM('ha', 'en') DEFAULT 'ha',
  audio_transcript_ha TEXT NOT NULL,
  audio_transcript_en TEXT NOT NULL,
  detected_symptoms VARCHAR(255) NOT NULL,
  icd11_triage_code VARCHAR(50) NOT NULL,
  severity_level ENUM('mild_home_care', 'moderate_phc_visit', 'critical_emergency_hospital') NOT NULL,
  ai_clinical_recommendation_en TEXT NOT NULL,
  ai_clinical_recommendation_ha TEXT NOT NULL,
  assigned_facility_id INT NOT NULL,
  action_taken ENUM('home_care_prescribed', 'phc_appointment_booked', 'ambulance_dispatched') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_facility_id) REFERENCES providers(id) ON DELETE CASCADE
);
`;
