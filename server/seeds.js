// Seeds for Zamfara Health Insurance Management System (Z-HIMS)

export const seedData = async (pool) => {
  console.log('Verifying Z-HIMS Initial Data in XAMPP MySQL...');

  // 0. Seed Users
  const [usersCount] = await pool.query('SELECT COUNT(*) as count FROM users');
  if (usersCount[0].count === 0) {
    const defaultUsers = [
      ['admin', 'admin@zamfarahealth.gov.ng', 'Admin@2026', 'Dr. Aisha Bello Bungudu', 'executive_admin', 'ZAMCHEMA Executive Headquarters, Gusau', 1, 'shield'],
      ['dr.aminu', 'fmc.gusau@zamfarahealth.gov.ng', 'Doctor@2026', 'Dr. Aminu Mohammed Gusau', 'medical_director', 'Federal Medical Centre (FMC) Gusau', 1, 'user-check'],
      ['claims.audit', 'claims.audit@zamfarahealth.gov.ng', 'Claims@2026', 'Ibrahim Sanusi Maradun', 'claims_officer', 'State Claims Adjudication Bureau', 1, 'file-text'],
      ['agent.anka', 'agent.anka@zamfarahealth.gov.ng', 'Agent@2026', 'Hauwa\'u Aliyu Anka', 'field_agent', 'Anka LGA Enrolment Unit', 2, 'users'],
      ['23419082341', 'balarabe.gusau@zamfara.ng', 'NIN@2026', 'Balarabe Mohammed Gusau', 'beneficiary', 'State Ministry of Education (Formal)', 1, 'user']
    ];

    for (const u of defaultUsers) {
      await pool.query(
        `INSERT IGNORE INTO users (username, email, password_plain, full_name, role, organization, lga_id, avatar_icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        u
      );
    }
  }

  // 1. Seed Plans
  const [plansCount] = await pool.query('SELECT COUNT(*) as count FROM plans');
  if (plansCount[0].count === 0) {
  const plans = [
    [
      'formal',
      'Formal Sector Health Plan',
      'Tsarin Inshorar Ma\'aikatan Gwamnati',
      'contributory_payroll',
      'Payroll deduction (5% basic salary shared employee/employer)',
      'Cirewa daga albashi (kashi 5% tsakanin ma\'aikaci da gwamnati)',
      0.00,
      'payroll_percentage',
      'Comprehensive: outpatient, inpatient, maternal & child health, surgery, pharmaceuticals, diagnostics',
      'Cikakken magani: kula a asibiti, kwanciya, haihuwa, tiyata, magunguna da gwaje-gwaje',
      'State and Local Government employees & direct dependents',
      'Ma\'aikatan jihar Zamfara da kananan hukumomi da iyalansu',
      0.10
    ],
    [
      'informal',
      'Informal Sector Health Plan',
      'Tsarin Bangaren Masu Sana\'ar Hannu da Kasuwanci',
      'voluntary_micro',
      '₦12,000/year individual, ₦50,000/family of six; micro-savings from ₦500',
      '₦12,000 a shekara ga mutum daya, ₦50,000 ga iyali; ajiyar aljihu daga ₦500',
      12000.00,
      'wallet_savings',
      'Comprehensive: outpatient, maternal/child care, essential surgeries, lab diagnostics, malaria treatment',
      'Cikakkiyar kulawa: maganin zazzabi, haihuwa, kananan tiyata, gwajin jini da magunguna',
      'Traders, artisans, farmers, transport operators, micro-enterprises',
      'Yan kasuwa, manoma, magina, direbobi da masu kananan sana\'o\'i',
      0.10
    ],
    [
      'equity',
      'Equity Health Plan (Subsidised)',
      'Tsarin Tallafin Lafiya na Masu Karamin Karfi (Equity)',
      'subsidised_state',
      'State Equity Fund (1% of Zamfara Consolidated Revenue)',
      'Asusun Tallafin Jiha (Kashi 1% na kudin shiga na Jihar Zamfara)',
      0.00,
      'state_subsidized',
      'Basic to comprehensive emergency care, maternal care, child nutrition, free C-section at state hospitals',
      'Kula da marasa galihu kyauta: haihuwa, tiyatar C-section, kula da yara masu tamowa da cututtuka',
      'Indigent citizens, IDPs, orphans, disabled, elderly over 70, under-5 children',
      'Gajiyayyu, marasa galihu, yan gudun hijira (IDPs), tsofaffi sama da 70 da yara',
      0.00
    ],
    [
      'retirees',
      'Retirees Health Plan',
      'Tsarin Inshorar Masu Ritaya',
      'pension_pooled',
      'Pooled pension deduction with state medical subsidy',
      'Cirewa daga kudaden fansho tare da tallafin jihar Zamfara',
      3500.00,
      'pension_pooled',
      'Chronic care management (hypertension, diabetes), cardiology, specialized geriatric care, pharmaceuticals',
      'Kulawa ta musamman ga cututtukan manya (hawan jini, ciwon siga), magunguna na yau da kullun',
      'State and Local Government retirees and their spouses',
      'Tsofaffin ma\'aikatan gwamnatin jihar Zamfara da suka yi ritaya',
      0.05
    ],
    [
      'bhcpf',
      'Basic Health Care Provision Fund (BHCPF)',
      'Shirin Kula da Lafiya na Bai-Daya (BHCPF)',
      'federal_state_partner',
      'Federal Statutory Allocation (1% CRF) + State Matching Fund + Donor Gateway',
      'Kudin tallafi na kasa (BHCPF) da hadin gwiwar gwamnatin jiha da abokan ci gaba',
      0.00,
      'grant_subsidized',
      'Basic Minimum Package of Health Services (BMPHS): antenatal, immunization, malaria, child health, emergency referral',
      'Kunshin Kula da Lafiya na Musamman (BMPHS): rigakafi, zazzabi, lafiyar uwa da yaro, maganin gaggawa',
      'Vulnerable populations, pregnant mothers, infants, poorest quintile',
      'Mata masu juna biyu, jarirai, da mutanen karkara marasa karfi',
      0.00
    ],
    [
      'students',
      'Tertiary Students Health Plan (T-SHIP)',
      'Tsarin Inshorar Daliban Manyan Makarantu',
      'institutional_bulk',
      'Institutional bulk registration fee (₦5,000 per academic session)',
      'Kudin rajista na makaranta (₦5,000 ga kowane zango/shekarar karatu)',
      5000.00,
      'institutional_bulk',
      'Campus clinic primary care, emergency ambulance, secondary care referral, youth wellness, diagnostics',
      'Kula da lafiyar dalibai a asibitin makaranta da manyan asibitoci, magunguna da gwaje-gwaje',
      'Students in Zamfara State University, Poly Talata Mafara, COE Maru, Nursing Gusau',
      'Daliban jami\'o\'i, kwalejoji da makarantun jinya a jihar Zamfara',
      0.00
    ]
  ];

  for (const p of plans) {
    await pool.query(
      `INSERT IGNORE INTO plans (code, name_en, name_ha, category, funding_model_en, funding_model_ha, premium_amount, premium_type, benefit_scope_en, benefit_scope_ha, target_population_en, target_population_ha, copayment_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      p
    );
  }
}

  // 2. Seed all 14 Local Government Areas (LGAs) of Zamfara State
  const lgas = [
    ['Gusau', 'Gusau', 485000, 22000, 3120, 68, 38, 'Normal'],
    ['Anka', 'Anka', 198000, 9500, 890, 48, 11, 'Conflict Impacted'],
    ['Bakura', 'Bakura', 225000, 10200, 1150, 52, 16, 'Normal'],
    ['Birnin Magaji', 'Birnin Magaji', 210000, 9100, 780, 46, 12, 'High Risk Outbreak'],
    ['Bukkuyum', 'Bukkuyum', 260000, 11400, 940, 56, 13, 'Conflict Impacted'],
    ['Bungudu', 'Bungudu', 320000, 12800, 1420, 62, 19, 'Normal'],
    ['Gummi', 'Gummi', 285000, 11900, 1260, 58, 17, 'Normal'],
    ['Kaura Namoda', 'Kaura Namoda', 345000, 13400, 1680, 64, 23, 'Normal'],
    ['Maradun', 'Maradun', 175000, 7800, 690, 42, 10, 'High Risk Outbreak'],
    ['Maru', 'Maru', 360000, 14100, 1050, 66, 14, 'Conflict Impacted'],
    ['Shinkafi', 'Shinkafi', 180000, 7900, 485, 44, 9, 'Conflict Impacted'],
    ['Talata Mafara', 'Talata Mafara', 290000, 11800, 1510, 58, 22, 'Normal'],
    ['Tsafe', 'Tsafe (Chafe)', 335000, 12600, 1130, 60, 18, 'Conflict Impacted'],
    ['Zurmi', 'Zurmi', 220000, 9423, 500, 48, 8, 'High Risk Outbreak']
  ];

  for (const l of lgas) {
    await pool.query(
      `INSERT IGNORE INTO lgas (name, headquarters, population, bhcpf_target, bhcpf_enrolled, total_phcs, functional_phcs, risk_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      l
    );
  }

  // 3. Seed Providers
  const providers = [
    ['ZH-HOSP-001', 'Ahmad Sani Yariman Bakura Specialist Hospital', 1, 'specialist', 1, 'formal,informal,equity,retirees,bhcpf,students', 1, 1, 'Sokoto Road, Gusau, Zamfara State', '08031122334', 12.1628, 6.6613],
    ['ZH-HOSP-002', 'Federal Medical Centre (FMC) Gusau', 1, 'specialist', 1, 'formal,informal,equity,retirees,bhcpf,students', 1, 1, 'Zaria-Sokoto By-Pass, Gusau', '08032233445', 12.1705, 6.6740],
    ['ZH-HOSP-003', 'General Hospital Talata Mafara', 12, 'general_hospital', 1, 'formal,informal,equity,retirees,bhcpf,students', 1, 1, 'Hospital Road, Talata Mafara', '08033344556', 12.5687, 6.0623],
    ['ZH-HOSP-004', 'General Hospital Kaura Namoda', 8, 'general_hospital', 1, 'formal,informal,equity,retirees,bhcpf,students', 1, 1, 'Shehu Shagari Way, Kaura Namoda', '08034455667', 12.5937, 6.5865],
    ['ZH-HOSP-005', 'General Hospital Anka', 2, 'general_hospital', 1, 'equity,bhcpf,informal', 1, 1, 'Anka Central Road, Anka', '08035566778', 12.1120, 5.9280],
    ['ZH-HOSP-006', 'General Hospital Gummi', 7, 'general_hospital', 1, 'formal,informal,equity,retirees,bhcpf', 1, 1, 'Gummi Main Road, Gummi', '08036677889', 12.1432, 5.1235],
    ['ZH-HOSP-007', 'General Hospital Bukkuyum', 5, 'general_hospital', 1, 'equity,bhcpf,informal', 1, 1, 'Bukkuyum Township, Bukkuyum', '08037788990', 12.1340, 5.4670],
    ['ZH-PHC-001', 'Tudan Wada Model Primary Health Centre', 1, 'phc', 1, 'bhcpf,equity,informal', 1, 1, 'Tudan Wada Ward, Gusau', '08038899001', 12.1550, 6.6580],
    ['ZH-PHC-002', 'Samaru Comprehensive Health Centre', 1, 'phc', 1, 'bhcpf,equity,informal,formal', 1, 1, 'Samaru Area, Gusau', '08039900112', 12.1810, 6.6490],
    ['ZH-PHC-003', 'Anka Model PHC & IDP Clinic', 2, 'phc', 1, 'bhcpf,equity', 1, 1, 'Near Emirs Palace, Anka', '08041122334', 12.1100, 5.9250],
    ['ZH-PHC-004', 'Damba Ward Health Post', 1, 'phc', 1, 'bhcpf,equity', 1, 0, 'Damba Village, Gusau LGA', '08042233445', 12.1400, 6.7020],
    ['ZH-PHC-005', 'Kiyaw Rural Health Centre', 4, 'phc', 1, 'bhcpf,equity', 1, 0, 'Kiyaw Ward, Birnin Magaji', '08043344556', 12.5400, 6.8120],
    ['ZH-PHC-006', 'Zurmi Central PHC & Cholera Response Post', 14, 'phc', 1, 'bhcpf,equity', 1, 1, 'Zurmi Main Gate, Zurmi', '08044455667', 12.7750, 6.7890],
    ['ZH-PHC-007', 'ZASU Campus Health Centre', 12, 'phc', 1, 'students,informal', 1, 1, 'Zamfara State University Campus, Talata Mafara', '08045566778', 12.5720, 6.0680],
    ['ZH-PHC-008', 'Bayan Ruwa Non-Functional PHC (Renovation Needed)', 11, 'phc', 0, 'none', 0, 0, 'Bayan Ruwa, Shinkafi LGA', '08046677889', 13.0500, 6.5100],
    ['ZH-PHC-009', 'Dan Sadau Inactive Dispensary (Insecurity Closure)', 10, 'phc', 0, 'none', 0, 0, 'Dan Sadau District, Maru LGA', '08047788990', 11.8900, 6.4200]
  ];

  for (const pr of providers) {
    await pool.query(
      `INSERT IGNORE INTO providers (facility_code, name, lga_id, tier, is_functional, accredited_plans, mdcn_pcn_verified, has_edge_node, address, contact_phone, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      pr
    );
  }

  // 4. Seed Beneficiaries
  const beneficiaries = [
    ['ZH-2026-001001', '23419082341', '22119933441', 'Balarabe Mohammed Gusau', 'Male', '1982-04-12', '08035544112', 1, 'Tudan Wada', 'No 14 Canteen Daji, Gusau', 1, 1, 5, 0.00, 0.00, 'active', 'ZH-NIN-23419082341-FORMAL-ACTIVE', '2027-10-25'],
    ['ZH-2026-001002', '78912345601', null, 'Amina Kabir Danbaba', 'Female', '1991-08-20', '08149988221', 1, 'Samaru', 'Behind Central Market, Gusau', 2, 1, 3, 4500.00, 12000.00, 'pending_wallet_target', 'ZH-NIN-78912345601-INFORMAL-SAVING', '2027-10-25'],
    ['ZH-2026-001003', '45678912302', null, 'Hauwa\'u Aliyu Bukkuyum', 'Female', '2001-02-14', '07021133445', 5, 'Zauma Ward', 'IDP Settlement, Bukkuyum', 3, 1, 4, 0.00, 0.00, 'exempt_subsidized', 'ZH-NIN-45678912302-EQUITY-ACTIVE', '2027-10-25'],
    ['ZH-2026-001004', '89012345603', '22446688112', 'Alhaji Usman Tsafe', 'Male', '1954-11-03', '08027788991', 13, 'Chafe Central', 'Gidan Sarkin Tsafe Area', 4, 1, 2, 0.00, 0.00, 'active', 'ZH-NIN-89012345603-RETIREE-ACTIVE', '2027-10-25'],
    ['ZH-2026-001005', '90123456704', null, 'Zainab Ibrahim Zurmi', 'Female', '1998-06-18', '08130099443', 14, 'Zurmi South', 'Unguwar Dandutse, Zurmi', 5, 1, 3, 0.00, 0.00, 'active', 'ZH-NIN-90123456704-BHCPF-ACTIVE', '2027-10-25'],
    ['ZH-2026-001006', '34567890105', null, 'Faruk Sanusi Mafara', 'Male', '2004-09-27', '09012233994', 12, 'Mafara West', 'ZASU Male Hostel Block B, Talata Mafara', 6, 1, 1, 0.00, 5000.00, 'active', 'ZH-NIN-34567890105-STUDENT-ACTIVE', '2027-10-25'],
    ['ZH-2026-001007', '67890123406', null, 'Fatima Sani Anka', 'Female', '1995-12-05', '08154433221', 2, 'Anka North', 'Near Primary School, Anka', 3, 1, 4, 0.00, 0.00, 'exempt_subsidized', 'ZH-NIN-67890123406-EQUITY-ACTIVE', '2027-10-25']
  ];

  for (const b of beneficiaries) {
    await pool.query(
      `INSERT IGNORE INTO beneficiaries (card_number, nin, bvn, full_name, gender, dob, phone, lga_id, ward, address, plan_id, is_household_head, household_size, wallet_balance, wallet_target, premium_status, qr_token, enrolled_at, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
      b
    );
  }

  // 5. Seed Dependents
  const dependents = [
    [1, 'Aisha Balarabe Gusau', 'Wife', '34511223344', 'Female', '1987-03-15'],
    [1, 'Hadiza Balarabe Gusau', 'Wife', '45622334455', 'Female', '1992-07-22'],
    [1, 'Ibrahim Balarabe', 'Child', null, 'Male', '2012-09-10'],
    [1, 'Khadija Balarabe', 'Child', null, 'Female', '2016-01-30'],
    [2, 'Mustapha Danbaba', 'Child', null, 'Male', '2019-05-18'],
    [3, 'Halima Bukkuyum (Infant)', 'Child', null, 'Female', '2024-03-10']
  ];

  for (const dep of dependents) {
    await pool.query(
      `INSERT IGNORE INTO dependents (principal_id, full_name, relationship, nin, gender, dob) VALUES (?, ?, ?, ?, ?, ?)`,
      dep
    );
  }

  // 6. Seed Wallet Transactions
  const walletTxns = [
    [2, 1000.00, 'USSD *966#', 'TXN-ZH-2026-901', 'successful', 'Initial USSD savings toward ₦12,000 annual premium'],
    [2, 500.00, 'Agent POS / Cash', 'TXN-ZH-2026-902', 'successful', 'Market day micro-installment Gusau Central Market'],
    [2, 1500.00, 'Moniepoint / OPay', 'TXN-ZH-2026-903', 'successful', 'Transfer from Moniepoint POS agent'],
    [2, 1500.00, 'USSD *966#', 'TXN-ZH-2026-904', 'successful', 'Weekly savings (Current balance: ₦4,500 / ₦12,000)']
  ];

  for (const w of walletTxns) {
    await pool.query(
      `INSERT IGNORE INTO wallet_transactions (beneficiary_id, amount, channel, reference, status, notes) VALUES (?, ?, ?, ?, ?, ?)`,
      w
    );
  }

  // 7. Seed Encounters
  const encounters = [
    ['ENC-2026-0081', 1, 1, '2026-10-20', '1F40.0', 'Severe Plasmodium Falciparum Malaria', 'Zazzabin Cizon Sauro mai Tsanani', 'Outpatient PHC', 0, 'completed'],
    ['ENC-2026-0082', 3, 5, '2026-10-22', '1A00', 'Cholera with Moderate Dehydration (Outbreak Protocol)', 'Cutar Kwalara tare da Rashin Ruwa a Jiki', 'Cholera Outbreak Care', 1, 'completed'],
    ['ENC-2026-0083', 5, 13, '2026-10-23', 'QA42', 'Antenatal Routine Care (ANC-4th Visit)', 'Awo na Hudu na Juna Biyu (ANC-4)', 'Maternal Antenatal (ANC)', 0, 'completed'],
    ['ENC-2026-0084', 7, 5, '2026-10-24', 'JA00', 'Obstructed Labour requiring Emergency C-Section', 'Matsalar Haihuwa da ke bukatar Tiyatar Gaggawa', 'Emergency C-Section', 0, 'admitted']
  ];

  for (const enc of encounters) {
    await pool.query(
      `INSERT IGNORE INTO encounters (encounter_code, beneficiary_id, provider_id, encounter_date, icd11_code, diagnosis_en, diagnosis_ha, service_type, is_offline_captured, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      enc
    );
  }

  // 8. Seed Claims
  const claims = [
    ['CLM-2026-00101', 1, 1, 1, 1, 'Outpatient consultation, ACT Artemether, RDT malaria test', 8500.00, 8500.00, 'auto_approved', 'Standard NHIA tariff applied. Clean auto-adjudication.', 'FHIR-CLM-99101'],
    ['CLM-2026-00102', 2, 3, 5, 3, 'Cholera IV infusion, ORS, Zinc, Isolation care', 24000.00, 24000.00, 'auto_approved', 'Outbreak Emergency Waiver: 100% covered under State Equity Fund.', 'FHIR-CLM-99102'],
    ['CLM-2026-00103', 3, 5, 13, 5, 'Routine ANC examination, Iron/Folate, Ultrasound scan', 6200.00, 6200.00, 'auto_approved', 'BHCPF BMPHS Basic Package verified: Capitation zero copay.', 'FHIR-CLM-99103'],
    ['CLM-2026-00104', 4, 7, 5, 3, 'Emergency Caesarean Section, Anaesthesia, Post-op ward 4 days', 85000.00, 85000.00, 'pre_authorized', 'State Executive C-Section Free Waiver for Indigents approved by Medical Director.', 'FHIR-CLM-99104']
  ];

  for (const clm of claims) {
    await pool.query(
      `INSERT IGNORE INTO claims (claim_number, encounter_id, beneficiary_id, provider_id, plan_id, service_description, billed_amount, approved_amount, adjudication_status, adjudication_rule_note, fhir_claim_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      clm
    );
  }

  // 9. Seed Referrals
  const referrals = [
    ['REF-2026-0041', 7, 10, 5, 'Obstructed labour not progressing at Anka PHC, transfer to General Hospital Anka for theatre', 'Maternal Emergency', 'closed_loop_completed', 'Patient arrived safely via state rural ambulance. C-section completed successfully.'],
    ['REF-2026-0042', 4, 8, 1, 'Refractory Hypertension with suspected ischemic changes, cardiologist referral', 'Urgent', 'in_transit', 'Referred from Tudan Wada PHC to Yariman Bakura Specialist Hospital Gusau.']
  ];

  for (const ref of referrals) {
    await pool.query(
      `INSERT IGNORE INTO referrals (referral_code, beneficiary_id, from_provider_id, to_provider_id, clinical_reason, urgency, outcome_status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ref
    );
  }

  // 10. Seed FWA Alerts
  const fwa = [
    ['FWA-2026-001', 'duplicate_billing', 'High', 'claim', 1, 'CLM-2026-DUPL-99', 'Potential Duplicate Anti-Malaria Injection Billing', 'Biyan Kudin Maganin Zazzabi sau biyu ba bisa ka\'ida ba', 'Same beneficiary billed for Artemether injection 3 times in 48 hours across two private clinics.', 'An lura an caji maganin zazzabin cizon sauro sau 3 a cikin sa\'o\'i 48 ga mutum guda a asibitoci daban-daban.', 18500.00, 'under_investigation'],
    ['FWA-2026-002', 'phantom_beneficiary', 'Critical', 'beneficiary', 2, 'NIN-UNVERIFIED-88', 'NIN Biometric Discrepancy Flag on Subsidised Equity Register', 'Rashin dacewar bayanan lambar NIN a rajistar tallafin gajiyayyu', 'Enrolment record in Zurmi LGA lacks verifiable NIN fingerprint template; automated deduplication flagged match in Sokoto.', 'An gano rashin sahihancin yatsa a rajistar shirin tallafi na Zurmi; an tsaida shirin don bincike.', 12000.00, 'active_flag'],
    ['FWA-2026-003', 'upcoding', 'Medium', 'provider', 3, 'ZH-HOSP-003', 'Unusual Spike in Caesarean Section Ratio (>42% of deliveries)', 'Yawaitar rahoton tiyatar haihuwa da ya wuce kima a asibiti', 'General Hospital reported 42% C-section rate compared to peer average of 14% in similar secondary facilities.', 'Rahoton asibiti ya nuna kashi 42% na masu haihuwa anyi musu tiyata, wanda ya zarce matsakaicin kashi 14%.', 240000.00, 'under_investigation']
  ];

  for (const f of fwa) {
    await pool.query(
      `INSERT IGNORE INTO fwa_alerts (alert_code, alert_type, severity, entity_type, entity_id, entity_ref, title_en, title_ha, details_en, details_ha, potential_saving, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      f
    );
  }

  // 11. Seed Outbreak Emergency Controls
  const outbreaks = [
    [
      'Zamfara Cholera Surge (Active Response)',
      1,
      1,
      'Zurmi, Anka, Bukkuyum, Birnin Magaji, Maradun, Gusau',
      'Outbreak Response Mode ACTIVE: All co-payments waived for acute watery diarrhoea, IV fluids, ORS, and antibiotics across all 14 LGAs. Rapid claim auto-approval enabled.',
      'YANA CIKIN AIKI: An janye dukkan kudaden biya ga cutar kwalara, ruwan roba (IV fluids), da magungunan kashe kwayoyin cuta a dukkan kananan hukumomi 14 na jihar Zamfara.'
    ],
    [
      'Severe Acute Malnutrition (SAM) Fast-Track',
      1,
      1,
      'Anka, Bukkuyum, Maru, Shinkafi, Zurmi',
      '100% Free RUTF (Ready-to-Use Therapeutic Food) and pediatric inpatient stabilization covered under State Equity & BHCPF fund.',
      'Abinci mai gina jiki (RUTF) da maganin yara masu tamowa kyauta ne a karkashin asusun tallafin jiha.'
    ]
  ];

  for (const o of outbreaks) {
    await pool.query(
      `INSERT IGNORE INTO outbreak_controls (outbreak_name, is_active, emergency_waiver_active, affected_lgas, guideline_en, guideline_ha) VALUES (?, ?, ?, ?, ?, ?)`,
      o
    );
  }

  // 12. Seed Grievances (Complaint Redress Mechanism)
  const [grievancesCount] = await pool.query('SELECT COUNT(*) as count FROM grievances');
  if (grievancesCount[0].count === 0) {
    const grievances = [
      [
        'TKT-ZH-2026-001',
        2,
        8,
        'drug_stockout',
        'Artemether Anti-Malaria Injection Stockout at Tudan Wada PHC',
        'Rashin Maganin Zazzabi na Artemether a Cibiyar Lafiya ta Tudan Wada',
        'Patient with high fever arrived at PHC but was told malaria medicines were out of stock despite active coverage.',
        'Mai jinya ya isa asibiti amma an shaida masa babu maganin zazzabi a ajiye duk da cewa yana da inshora.',
        48,
        'investigating',
        'Emergency replenishment batch dispatched by State Central Medical Stores Gusau.'
      ],
      [
        'TKT-ZH-2026-002',
        3,
        5,
        'illegal_out_of_pocket',
        'Demand for ₦3,500 Delivery Kit Payment for Indigent Mother in Bukkuyum',
        'Korafe-korafen Karbar Kudin Haihuwa ₦3,500 ga Marar Galihu a Bukkuyum',
        'Equity Plan beneficiary was asked to pay ₦3,500 for delivery pack in violation of the Executive 100% Free Maternal Directive.',
        'An nemi matar da ke karkashin shirin tallafin jiha ta biya ₦3,500 na kayan haihuwa sabanin dokar gwamna ta magani kyauta.',
        24,
        'resolved',
        'Full refund of ₦3,500 issued to patient. Facility in-charge issued formal caution.'
      ]
    ];

    for (const g of grievances) {
      await pool.query(
        `INSERT IGNORE INTO grievances (ticket_number, beneficiary_id, provider_id, category, title_en, title_ha, description_en, description_ha, sla_hours, status, resolution_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        g
      );
    }
  }

  // 13. Seed Telemedicine Sessions
  const [teleCount] = await pool.query('SELECT COUNT(*) as count FROM telemedicine_sessions');
  if (teleCount[0].count === 0) {
    const tele = [
      [
        'TEL-2026-0091',
        4,
        8,
        1,
        'Cardiology Specialist Review',
        'Hypertensive crisis with persistent angina in elderly retiree',
        'Prescribe Amlodipine 10mg + Telmisartan 40mg. Request ECG at General Hospital.',
        'completed'
      ],
      [
        'TEL-2026-0092',
        7,
        10,
        1,
        'Obstetric Tele-Consultation',
        'Antepartum haemorrhage at Anka Rural Clinic, specialist transfer protocol',
        'Initiate 500ml Ringer Lactate immediately, place patient in left lateral position, expedite rural ambulance transfer.',
        'completed'
      ]
    ];

    for (const tel of tele) {
      await pool.query(
        `INSERT IGNORE INTO telemedicine_sessions (session_code, beneficiary_id, phc_provider_id, specialist_provider_id, specialty, chief_complaint, recommendation, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        tel
      );
    }
  }

  // 14. Seed Maternal Tracking (ANC4+ Milestone Monitoring)
  const [maternalCount] = await pool.query('SELECT COUNT(*) as count FROM maternal_tracking');
  if (maternalCount[0].count === 0) {
    const maternal = [
      [3, '2027-01-15', 1, 1, 1, 0, 1, 1, 'Low Risk'],
      [5, '2026-12-10', 1, 1, 1, 1, 1, 1, 'Low Risk'],
      [7, '2026-11-20', 1, 1, 0, 0, 1, 1, 'High Risk (Prior C-Section)']
    ];

    for (const m of maternal) {
      await pool.query(
        `INSERT IGNORE INTO maternal_tracking (beneficiary_id, edd, anc1_completed, anc2_completed, anc3_completed, anc4_completed, tetanus_toxoid, iron_folate_issued, risk_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        m
      );
    }
  }

  // 15. Seed Diaspora Sponsorships
  const [diasporaCount] = await pool.query('SELECT COUNT(*) as count FROM diaspora_sponsorships');
  if (diasporaCount[0].count === 0) {
    const diaspora = [
      [
        'Dr. Mansur Aliyu Gusau',
        'London',
        'United Kingdom',
        3,
        50000.00,
        'NGN',
        'Mastercard / Stripe',
        'Annual family health premium sponsorship for vulnerable relatives in Bukkuyum IDP camp.'
      ],
      [
        'Hajiya Fatima Bello',
        'Abuja',
        'Nigeria',
        2,
        12000.00,
        'NGN',
        'Paystack Instant Transfer',
        'Full annual premium paid for artisanal tailor in Gusau market.'
      ]
    ];

    for (const d of diaspora) {
      await pool.query(
        `INSERT IGNORE INTO diaspora_sponsorships (sponsor_name, sponsor_city, sponsor_country, beneficiary_id, amount_naira, currency, payment_channel, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        d
      );
    }
  }

  // 16. Seed Recurring Mandates (Gap 1: Automated Recurring Micro-Debit & Airtime Billing)
  const [mandatesCount] = await pool.query('SELECT COUNT(*) as count FROM recurring_mandates');
  if (mandatesCount[0].count === 0) {
    const mandates = [
      [
        'MAND-AIRTEL-001',
        2,
        'Telco Airtime (MTN/Airtel)',
        '08035544112',
        'Monthly (₦500)',
        500.00,
        2500.00,
        5,
        '2026-10-01 08:30:00',
        '2026-11-01 08:30:00',
        'active'
      ],
      [
        'MAND-MTN-002',
        4,
        'Telco Airtime (MTN/Airtel)',
        '08139988771',
        'Weekly (₦250)',
        250.00,
        3000.00,
        12,
        '2026-10-20 10:15:00',
        '2026-10-27 10:15:00',
        'active'
      ],
      [
        'MAND-NIBSS-003',
        3,
        'NIBSS Direct Debit',
        '0123456789 (Jaiz Bank)',
        'Monthly (₦500)',
        1000.00,
        4000.00,
        4,
        '2026-10-05 14:00:00',
        '2026-11-05 14:00:00',
        'active'
      ],
      [
        'MAND-POS-004',
        1,
        'POS Agent Mandate',
        'POS-AGENT-GUSAU-44',
        'Monthly (₦500)',
        500.00,
        12000.00,
        24,
        '2026-09-30 17:00:00',
        '2026-10-30 17:00:00',
        'completed_target'
      ]
    ];

    for (const m of mandates) {
      await pool.query(
        `INSERT IGNORE INTO recurring_mandates (mandate_ref, beneficiary_id, channel, phone_or_account, frequency, amount_naira, total_deducted_naira, successful_deductions, last_charge_date, next_charge_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        m
      );
    }
  }

  // 17. Seed Real-Time Pre-Authorizations (Gap 2: < 5-Minute AI Surgical & Secondary Pre-Auth)
  const [preauthCount] = await pool.query('SELECT COUNT(*) as count FROM pre_authorizations');
  if (preauthCount[0].count === 0) {
    const preauths = [
      [
        'PA-FMC-2026-9041',
        7,
        1,
        'Emergency Caesarean Section (Secondary Care)',
        'Tiyatar Haihuwa ta Gaggawa a Babban Asibiti',
        'JA60.0',
        'Emergency (< 1h)',
        85000.00,
        85000.00,
        'AUTO_APPROVED',
        99.40,
        2,
        'Verified active maternal enrollment with documented obstructed labour; qualified under 100% state emergency waiver.',
        'An amince ta inji cikin sakanni 2: Tana da ciki mai hadari kuma ta cancanci tallafin jihar Zamfara 100% kyauta.',
        'utilized_at_hospital'
      ],
      [
        'PA-KFA-2026-8812',
        2,
        2,
        'Severe Preeclampsia Stabilization & Blood Transfusion',
        'Kula da Hawan Jinin Haihuwa da Karin Jini',
        'JA21.0',
        'Urgent (< 24h)',
        42000.00,
        42000.00,
        'AUTO_APPROVED',
        98.70,
        3,
        'Clinical triage matches NHIA secondary benefit thresholds with verified accredited King Fahad Specialist provider.',
        'An amince ta inji cikin sakanni 3: Bayanan sun cika ka\'idojin magani na asibitin kwararru.',
        'active_valid'
      ],
      [
        'PA-ANKA-2026-7733',
        4,
        3,
        'Compound Fracture Surgical Debridement & Fixation',
        'Tiyatar Karyewar Kashi da Gyara a Asibiti',
        'NC32.0',
        'Urgent (< 24h)',
        65000.00,
        65000.00,
        'AUTO_APPROVED',
        97.80,
        4,
        'Trauma criteria validated against Z-HIMS surgical schedules with primary provider empanelment verified.',
        'An amince ta inji cikin sakanni 4: Karaya mai tsanani da take bukatar tiyata a asibitin Anka.',
        'active_valid'
      ]
    ];

    for (const p of preauths) {
      await pool.query(
        `INSERT IGNORE INTO pre_authorizations (auth_code, beneficiary_id, provider_id, procedure_name_en, procedure_name_ha, icd11_code, clinical_priority, estimated_cost, approved_cost, ai_decision, ai_confidence_score, turnaround_seconds, clinical_rationale_en, clinical_rationale_ha, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        p
      );
    }
  }

  // 18. Seed Pharmacy Inventory (Gap 3: Rural Pharma Stockout Sentinel & Last-Mile Logistics)
  const [pharmacyCount] = await pool.query('SELECT COUNT(*) as count FROM pharmacy_inventory');
  if (pharmacyCount[0].count === 0) {
    const medicines = [
      [
        1,
        1,
        'MED-ACT-01',
        'Artemether-Lumefantrine (ACT 20/120mg Tablet)',
        'Maganin Zazzabin Cizon Sauro na Manyan (Kwayoyi)',
        'Antimalarial (ACT)',
        1450,
        300,
        'Packs',
        'optimal',
        '2026-10-18',
        'standby'
      ],
      [
        9,
        2,
        'MED-CHOL-02',
        'Ringer Lactate IV Infusion 500ml (Cholera Rehydration)',
        'Ruwan Drip na Kwalara da Amai da Zawo (500ml)',
        'IV Infusion (Cholera)',
        8,
        60,
        'Infusion Bags',
        'critical_stockout',
        '2026-09-10',
        'truck_dispatched'
      ],
      [
        10,
        10,
        'MED-OXY-03',
        'Oxytocin Injection 10 IU (Maternal PPH Prevention)',
        'Allurar Tsayar da Zubar Jini bayan Haihuwa',
        'Maternal Oxytocin / Iron',
        14,
        50,
        'Ampoules',
        'low_warning',
        '2026-09-25',
        'truck_dispatched'
      ],
      [
        12,
        14,
        'MED-AMOX-04',
        'Amoxicillin Dispersible 250mg Tablets for Pediatric Pneumonia',
        'Maganin Ciwon Kirji da Numfashi na Kananan Yara',
        'Antibiotic',
        22,
        100,
        'Blister Packs',
        'low_warning',
        '2026-09-28',
        'truck_dispatched'
      ],
      [
        4,
        12,
        'MED-RDT-05',
        'Malaria Rapid Diagnostic Test (Pf/Pv RDT Kits)',
        'Kayan Gwajin Zazzabin Cizon Sauro cikin Gaggawa',
        'Diagnostic RDT',
        520,
        120,
        'Cassettes',
        'optimal',
        '2026-10-15',
        'standby'
      ],
      [
        11,
        11,
        'MED-SYR-06',
        'Artesunate Pediatric Suspension (Under-5 Malaria)',
        "Kagaggen Maganin Zazzabi na Ruwa ga Yara 'yan kasa da Shekara 5",
        'Antimalarial (ACT)',
        5,
        50,
        'Bottles',
        'critical_stockout',
        '2026-09-12',
        'truck_dispatched'
      ]
    ];

    for (const med of medicines) {
      await pool.query(
        `INSERT IGNORE INTO pharmacy_inventory (provider_id, lga_id, drug_code, drug_name_en, drug_name_ha, category, current_stock, minimum_safe_stock, unit_name, status, last_replenished, auto_dispatch_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        med
      );
    }
  }

  // 19. Seed Diaspora Bonds (Gap 4: Multi-Family & Ward Sponsorship Cohorts)
  const [bondsCount] = await pool.query('SELECT COUNT(*) as count FROM diaspora_bonds');
  if (bondsCount[0].count === 0) {
    const bonds = [
      [
        'BOND-UK-2026-001',
        'Dr. Kabir Danbaba Gusau (Zamfara Diaspora UK)',
        'London',
        'United Kingdom',
        1,
        150,
        1800000.00,
        'GBP',
        950.00,
        'Pregnant Women & Infants',
        38,
        'HMRC-UK-ZAM-2026-881',
        'Sponsored 150 pregnant mothers in Gusau maternal wards for complete ANC1-4+ and safe delivery coverage.',
        'allocated_verified'
      ],
      [
        'BOND-KSA-2026-002',
        'Alh. Mukhtar Aliyu Maradun (Saudi Arabia Community)',
        'Jeddah',
        'Saudi Arabia',
        9,
        250,
        3000000.00,
        'SAR',
        7500.00,
        'Indigent / IDPs',
        64,
        'ZAKAT-KSA-ZAM-2026-442',
        'Zakat health pooling for 250 displaced families and vulnerable farming households in Maradun.',
        'allocated_verified'
      ],
      [
        'BOND-ABUJA-2026-003',
        'Hajiya Maryam Bello Anka (Zamfara Abuja Professionals)',
        'Abuja',
        'Nigeria',
        2,
        100,
        1200000.00,
        'NGN',
        1200000.00,
        'Elderly Chronic Patients',
        27,
        'FIRS-NG-ZAM-2026-193',
        'Annual health cover for 100 vulnerable elderly patients in Anka LGA for hypertension and diabetes care.',
        'allocated_verified'
      ]
    ];

    for (const b of bonds) {
      await pool.query(
        `INSERT IGNORE INTO diaspora_bonds (bond_code, sponsor_name, sponsor_city, sponsor_country, target_lga_id, families_sponsored_count, total_amount_naira, currency, amount_foreign, beneficiary_category, treatments_utilized_count, tax_exemption_ref, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        b
      );
    }
  }

  // 20. Seed Capitation Batches & Allocations (Capability 1)
  const [capCount] = await pool.query('SELECT COUNT(*) as count FROM capitation_batches');
  if (capCount[0].count === 0) {
    const [batchResult] = await pool.query(
      `INSERT INTO capitation_batches (batch_ref, billing_month_en, billing_month_ha, total_facilities_count, total_enrollees_count, capitation_rate_naira, total_amount_naira, nibss_batch_ref, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'CAP-2026-10-ZAM',
        'October 2026 Advance Capitation',
        'Kudin Gudanarwa na Watan Oktoba 2026',
        14,
        14505,
        500.00,
        7252500.00,
        'NIBSS-CAP-ZAM-20261001-992',
        'disbursed'
      ]
    );
    const batchId = batchResult.insertId;

    const allocations = [
      [batchId, 1, 1, 2850, 500.00, 1425000.00, 'Jaiz Bank Plc', '0023419081', 'credited', 'NIBSS-TX-9901'],
      [batchId, 2, 2, 1950, 500.00, 975000.00, 'First Bank of Nigeria', '3091823741', 'credited', 'NIBSS-TX-9902'],
      [batchId, 3, 3, 1420, 500.00, 710000.00, 'Zenith Bank Plc', '1019283742', 'credited', 'NIBSS-TX-9903'],
      [batchId, 4, 12, 1680, 500.00, 840000.00, 'United Bank for Africa', '2081923847', 'credited', 'NIBSS-TX-9904'],
      [batchId, 5, 8, 1890, 500.00, 945000.00, 'Taj Bank', '0019283749', 'credited', 'NIBSS-TX-9905'],
      [batchId, 6, 7, 1540, 500.00, 770000.00, 'Access Bank Plc', '0192837461', 'credited', 'NIBSS-TX-9906'],
      [batchId, 11, 11, 3175, 500.00, 1587500.00, 'Jaiz Bank Plc', '0039281745', 'credited', 'NIBSS-TX-9907']
    ];

    for (const alloc of allocations) {
      await pool.query(
        `INSERT INTO capitation_facility_allocations (batch_id, provider_id, lga_id, assigned_enrollees, capitation_rate, monthly_payout_naira, bank_name, account_number, payment_status, remittance_ref) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        alloc
      );
    }
  }

  // 21. Seed Vitality-Style Prevention Rewards (Capability 2)
  const [rewardsCount] = await pool.query('SELECT COUNT(*) as count FROM prevention_rewards');
  if (rewardsCount[0].count === 0) {
    const rewards = [
      [
        'REW-ANC4-2026-8912',
        1,
        1,
        'anc_visit',
        'Completed 4th Antenatal Care (ANC-4) Visit',
        'Kammala Ziyarar Awo ta Hudu (ANC-4)',
        'airtime_credit',
        200.00,
        'VOUCH-AIR-8912',
        'MTN Instant Airtime Topup',
        '08035544112',
        true
      ],
      [
        'REW-IMM-2026-7731',
        2,
        2,
        'immunization',
        'Child Pentavalent-3 & Measles Immunization Complete',
        'Kammala Rigakafin Cututtuka 5 na Jariri da Kyanda',
        'cash_wallet',
        200.00,
        'VOUCH-WAL-7731',
        'Digital Health Savings Wallet Credit',
        '08021199334',
        true
      ],
      [
        'REW-NET-2026-5542',
        3,
        11,
        'malaria_prophylaxis',
        'First Trimester IPTp Malaria Prophylaxis + Free LLIN Bed Net',
        'Rigakafin Zazzabin Cizon Sauro da Gidan Sauro mai Magani',
        'mosquito_net_voucher',
        2500.00,
        'VOUCH-NET-ZUR-41',
        'Accredited Clinic Pharmacy Voucher',
        '07019922883',
        true
      ],
      [
        'REW-PNC-2026-3390',
        4,
        2,
        'postnatal',
        '48-Hour Postnatal Maternal & Newborn Checkup + RUTF Pack',
        'Binciken Lafiyar Uwa da Jariri bayan Haihuwa (Kwana 2)',
        'nutrition_voucher',
        3000.00,
        'VOUCH-NUT-ANK-90',
        'ZAMCHEMA Nutrition Partner Dispensary',
        '08139944002',
        true
      ]
    ];

    for (const rew of rewards) {
      await pool.query(
        `INSERT IGNORE INTO prevention_rewards (reward_code, beneficiary_id, provider_id, milestone_type, milestone_name_en, milestone_name_ha, reward_type, reward_value_naira, voucher_code, delivery_channel, phone_number, is_claimed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        rew
      );
    }
  }

  // 22. Seed Voice Triage Sessions (Capability 3: Spoken Hausa Symptom AI Triage)
  const [triageCount] = await pool.query('SELECT COUNT(*) as count FROM voice_triage_sessions');
  if (triageCount[0].count === 0) {
    const sessions = [
      [
        'TRIAGE-VOICE-2026-4401',
        '08035544112',
        'Malam Aliyu Danbaba Gusau',
        'ha',
        'Ina fama da zazzabi mai zafi, da ciwon kai da kuma sanyi sosai tun kwana biyu da suka wuce.',
        'I have been suffering from high fever, severe headache, and intense chills for the past two days.',
        'High Fever, Rigors, Chills, Headache',
        '1F40.0',
        'moderate_phc_visit',
        'Clinical Assessment: Acute Plasmodium Falciparum Malaria. Directive: Proceed immediately to Tudan Wada PHC for free RDT blood test and ACT antimalarial blister pack under Z-HIMS basic package.',
        'Binciken Likita: Zazzabin Cizon Sauro (Malaria). Umarni: Tafi Tudan Wada PHC cikin gaggawa domin yin gwajin jini na RDT da karbar maganin ACT kyauta karkashin inshorar Z-HIMS.',
        1,
        'phc_appointment_booked'
      ],
      [
        'TRIAGE-VOICE-2026-4402',
        '08021199334',
        'Balarabe Garba Anka',
        'ha',
        'Mata ta tana nakuda sosai a gida, kuma jini yana zuba mata da yawa, tana suma.',
        'My wife is in intense labor at home, bleeding heavily, and losing consciousness.',
        'Active Labor, Severe Obstetric Hemorrhage, Altered Consciousness',
        'JA40.0',
        'critical_emergency_hospital',
        'EMERGENCY ALERT: Imminent Postpartum Hemorrhage & Obstructed Labor. Directive: Emergency Ambulance dispatched from Anka General Hospital. 100% emergency fee waiver active.',
        'GAGGAWA MAI TSANANI: Zubar da jini a lokacin haihuwa. Umarni: An tura motar asibiti (Ambulance) daga Asibitin Anka kai tsaye. Kula da lafiya 100% kyauta karkashin tsarin gaggawa.',
        2,
        'ambulance_dispatched'
      ],
      [
        'TRIAGE-VOICE-2026-4403',
        '07019922883',
        'Amina Sani Zurmi',
        'ha',
        'Yarona dan shekara 3 yana gudawa ruwa-ruwa sau hudu yau, amma yana cin abinci kuma yana shan ruwa.',
        'My 3-year-old child had watery diarrhea 4 times today, but is still eating and drinking water.',
        'Pediatric Watery Diarrhea, Mild Dehydration Risk',
        '1A20.0',
        'mild_home_care',
        'Home Care Management: Mild Acute Diarrheal Episode. Directive: Mix 1 packet of Oral Rehydration Salts (ORS) in 1L clean water; administer with 20mg Zinc tablets daily for 10 days.',
        'Kula a Gida: Gudawa mai sauki ga yaro. Umarni: Hada ruwan gishiri da sukari (ORS) a litar ruwa mai tsafta, a bashi tare da kwayar Zinc tsawon kwana 10. Idan ya tsananta a je asibiti.',
        11,
        'home_care_prescribed'
      ]
    ];

    for (const s of sessions) {
      await pool.query(
        `INSERT IGNORE INTO voice_triage_sessions (session_ref, citizen_phone, citizen_name, spoken_language, audio_transcript_ha, audio_transcript_en, detected_symptoms, icd11_triage_code, severity_level, ai_clinical_recommendation_en, ai_clinical_recommendation_ha, assigned_facility_id, action_taken) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        s
      );
    }
  }

  console.log('Z-HIMS XAMPP MySQL database seeded successfully with all Gap & World-Class features!');
};


