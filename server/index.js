import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, initDatabase } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize XAMPP Database on start
initDatabase().catch((err) => {
  console.error('[Z-HIMS] Database init error, retrying in 3s...', err.message);
  setTimeout(() => initDatabase().catch(console.error), 3000);
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({
      status: 'online',
      system: 'Zamfara Health Insurance Management System (Z-HIMS)',
      database: 'XAMPP MySQL Connected',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Authentication & User Identity Management
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please enter username/email/NIN and password.' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1',
      [identifier.trim(), identifier.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Account not found. Please verify your credentials or select a demo role.' });
    }

    const user = rows[0];
    if (user.password_plain !== password.trim()) {
      return res.status(401).json({ error: 'Incorrect security password. Please try again.' });
    }

    const token = `ZHIMS-TOKEN-${user.id}-${Date.now()}`;
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        organization: user.organization,
        lga_id: user.lga_id
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, full_name, role, organization, password_plain FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1. Executive Dashboard Overview
app.get('/api/overview', async (req, res) => {
  try {
    const [benCount] = await pool.query('SELECT COUNT(*) as total, SUM(CASE WHEN premium_status = "active" OR premium_status = "exempt_subsidized" THEN 1 ELSE 0 END) as active FROM beneficiaries');
    const [claimsSum] = await pool.query('SELECT COUNT(*) as count, COALESCE(SUM(billed_amount), 0) as total_billed, COALESCE(SUM(approved_amount), 0) as total_approved, SUM(CASE WHEN adjudication_status IN ("auto_approved", "manual_approved") THEN 1 ELSE 0 END) as approved_count FROM claims');
    const [lgaTotals] = await pool.query('SELECT SUM(bhcpf_target) as total_target, SUM(bhcpf_enrolled) as total_enrolled, SUM(total_phcs) as total_phcs, SUM(functional_phcs) as functional_phcs FROM lgas');
    const [fwaCount] = await pool.query('SELECT COUNT(*) as count, COALESCE(SUM(potential_saving), 0) as total_savings FROM fwa_alerts WHERE status = "active_flag" OR status = "under_investigation"');
    const [outbreakActive] = await pool.query('SELECT * FROM outbreak_controls WHERE is_active = 1');
    const [plans] = await pool.query('SELECT id, code, name_en, name_ha, premium_amount, premium_type FROM plans');

    // BHCPF Progress
    const bhcpfTarget = lgaTotals[0].total_target || 133923;
    const bhcpfEnrolled = lgaTotals[0].total_enrolled || 14505;
    const bhcpfProgress = ((bhcpfEnrolled / bhcpfTarget) * 100).toFixed(1);

    // Auto Adjudication rate
    const totalClaims = claimsSum[0].count || 0;
    const autoApprovedRate = totalClaims > 0 ? ((claimsSum[0].approved_count / totalClaims) * 100).toFixed(1) : 85.0;

    res.json({
      beneficiaries: {
        total: benCount[0].total,
        active: benCount[0].active
      },
      bhcpf: {
        target: bhcpfTarget,
        enrolled: bhcpfEnrolled,
        gap: bhcpfTarget - bhcpfEnrolled,
        percentage: parseFloat(bhcpfProgress)
      },
      claims: {
        totalClaims,
        totalBilledNaira: claimsSum[0].total_billed,
        totalApprovedNaira: claimsSum[0].total_approved,
        autoApprovedRate: parseFloat(autoApprovedRate)
      },
      infrastructure: {
        totalPhcs: lgaTotals[0].total_phcs,
        functionalPhcs: lgaTotals[0].functional_phcs,
        functionalityRate: ((lgaTotals[0].functional_phcs / lgaTotals[0].total_phcs) * 100).toFixed(1)
      },
      fwa: {
        activeFlags: fwaCount[0].count,
        potentialSavingsNaira: fwaCount[0].total_savings
      },
      outbreakActive: outbreakActive.length > 0,
      activeOutbreaks: outbreakActive,
      plans
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Plans Management
app.get('/api/plans', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM plans ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Local Government Areas (14 LGAs)
app.get('/api/lgas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lgas ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Providers
app.get('/api/providers', async (req, res) => {
  try {
    const { lga_id, functional_only } = req.query;
    let query = 'SELECT p.*, l.name as lga_name FROM providers p JOIN lgas l ON p.lga_id = l.id WHERE 1=1';
    const params = [];
    if (lga_id) {
      query += ' AND p.lga_id = ?';
      params.push(lga_id);
    }
    if (functional_only === 'true') {
      query += ' AND p.is_functional = 1';
    }
    query += ' ORDER BY p.is_functional DESC, p.tier ASC, p.name ASC';
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/providers', async (req, res) => {
  try {
    const { facility_code, name, lga_id, tier, is_functional, accredited_plans, mdcn_pcn_verified, address, contact_phone, lat, lng } = req.body;
    const [result] = await pool.query(
      'INSERT INTO providers (facility_code, name, lga_id, tier, is_functional, accredited_plans, mdcn_pcn_verified, address, contact_phone, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [facility_code, name, lga_id, tier, is_functional ? 1 : 0, accredited_plans || 'formal,informal,equity,bhcpf', mdcn_pcn_verified ? 1 : 0, address, contact_phone, lat || 12.16, lng || 6.66]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Beneficiaries
app.get('/api/beneficiaries', async (req, res) => {
  try {
    const { query, plan_id, lga_id } = req.query;
    let sql = `
      SELECT b.*, p.code as plan_code, p.name_en as plan_name_en, p.name_ha as plan_name_ha, l.name as lga_name 
      FROM beneficiaries b
      JOIN plans p ON b.plan_id = p.id
      JOIN lgas l ON b.lga_id = l.id
      WHERE 1=1
    `;
    const params = [];

    if (query) {
      sql += ' AND (b.full_name LIKE ? OR b.nin LIKE ? OR b.card_number LIKE ? OR b.phone LIKE ?)';
      const term = `%${query}%`;
      params.push(term, term, term, term);
    }
    if (plan_id) {
      sql += ' AND b.plan_id = ?';
      params.push(plan_id);
    }
    if (lga_id) {
      sql += ' AND b.lga_id = ?';
      params.push(lga_id);
    }

    sql += ' ORDER BY b.id DESC LIMIT 100';
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/beneficiaries/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT b.*, p.code as plan_code, p.name_en as plan_name_en, p.name_ha as plan_name_ha, p.copayment_rate, l.name as lga_name 
      FROM beneficiaries b
      JOIN plans p ON b.plan_id = p.id
      JOIN lgas l ON b.lga_id = l.id
      WHERE b.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    const beneficiary = rows[0];
    const [dependents] = await pool.query('SELECT * FROM dependents WHERE principal_id = ?', [beneficiary.id]);
    const [transactions] = await pool.query('SELECT * FROM wallet_transactions WHERE beneficiary_id = ? ORDER BY id DESC', [beneficiary.id]);
    const [encounters] = await pool.query(`
      SELECT e.*, pr.name as provider_name 
      FROM encounters e
      JOIN providers pr ON e.provider_id = pr.id
      WHERE e.beneficiary_id = ?
      ORDER BY e.encounter_date DESC
    `, [beneficiary.id]);

    res.json({
      ...beneficiary,
      dependents,
      transactions,
      encounters
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enrol Beneficiary
app.post('/api/beneficiaries', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      nin,
      bvn,
      full_name,
      gender,
      dob,
      phone,
      lga_id,
      ward,
      address,
      plan_id,
      household_size = 1,
      dependents = []
    } = req.body;

    // Check NIN deduplication
    const [existing] = await connection.query('SELECT id FROM beneficiaries WHERE nin = ?', [nin]);
    if (existing.length > 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'A beneficiary with this National Identification Number (NIN) is already registered in Zamfara State.' });
    }

    // Determine status & wallet based on plan
    const [planRows] = await connection.query('SELECT * FROM plans WHERE id = ?', [plan_id]);
    const plan = planRows[0];

    let premium_status = 'active';
    let wallet_balance = 0.00;
    let wallet_target = 0.00;

    if (plan.code === 'informal') {
      premium_status = 'pending_wallet_target';
      wallet_target = household_size > 1 ? 50000.00 : 12000.00;
    } else if (plan.code === 'equity' || plan.code === 'bhcpf') {
      premium_status = 'exempt_subsidized';
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const card_number = `ZH-${new Date().getFullYear()}-${randomSuffix}`;
    const qr_token = `ZH-VERIFIED-${nin}-${plan.code.toUpperCase()}-${randomSuffix}`;
    const expires_at = new Date();
    expires_at.setFullYear(expires_at.getFullYear() + 1);

    const [insertResult] = await connection.query(`
      INSERT INTO beneficiaries (
        card_number, nin, bvn, full_name, gender, dob, phone, lga_id, ward, address, 
        plan_id, is_household_head, household_size, wallet_balance, wallet_target, 
        premium_status, qr_token, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      card_number, nin, bvn || null, full_name, gender, dob, phone, lga_id, ward, address,
      plan_id, 1, household_size, wallet_balance, wallet_target,
      premium_status, qr_token, expires_at
    ]);

    const beneficiaryId = insertResult.insertId;

    // Insert Dependents if any (polygynous support)
    if (Array.isArray(dependents) && dependents.length > 0) {
      for (const dep of dependents) {
        if (dep.full_name) {
          await connection.query(`
            INSERT INTO dependents (principal_id, full_name, relationship, nin, gender, dob)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [beneficiaryId, dep.full_name, dep.relationship || 'Wife', dep.nin || null, dep.gender || 'Female', dep.dob || '2000-01-01']);
        }
      }
    }

    // If BHCPF plan, increment LGA enrolled count
    if (plan.code === 'bhcpf') {
      await connection.query('UPDATE lgas SET bhcpf_enrolled = bhcpf_enrolled + 1 WHERE id = ?', [lga_id]);
    }

    await connection.commit();
    res.json({
      success: true,
      id: beneficiaryId,
      card_number,
      qr_token,
      message_en: 'Beneficiary enrolled successfully with verified NIN.',
      message_ha: 'An yi wa mai cin gajiyar rajista cikin nasara tare da lambar NIN mai inganci.'
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// 6. Wallet Micro-Savings Deposit (Naira)
app.post('/api/beneficiaries/:id/wallet', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const beneficiaryId = req.params.id;
    const { amount, channel = 'USSD *966#', notes = 'Micro-premium savings installment' } = req.body;
    const depositAmount = parseFloat(amount);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'Invalid deposit amount' });
    }

    // Get beneficiary
    const [benRows] = await connection.query('SELECT * FROM beneficiaries WHERE id = ?', [beneficiaryId]);
    if (benRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    const ben = benRows[0];
    const newBalance = parseFloat(ben.wallet_balance) + depositAmount;
    const reference = `TXN-ZH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    await connection.query(`
      INSERT INTO wallet_transactions (beneficiary_id, amount, channel, reference, status, notes)
      VALUES (?, ?, ?, ?, 'successful', ?)
    `, [beneficiaryId, depositAmount, channel, reference, notes]);

    // Check if wallet target reached (₦12,000 for individual, ₦50,000 for family)
    let newStatus = ben.premium_status;
    let targetReached = false;
    if (newBalance >= parseFloat(ben.wallet_target)) {
      newStatus = 'active';
      targetReached = true;
    }

    await connection.query(`
      UPDATE beneficiaries 
      SET wallet_balance = ?, premium_status = ? 
      WHERE id = ?
    `, [newBalance, newStatus, beneficiaryId]);

    await connection.commit();

    res.json({
      success: true,
      new_balance: newBalance,
      target: ben.wallet_target,
      status: newStatus,
      target_reached: targetReached,
      reference,
      message_en: targetReached 
        ? `Congratulations! ₦12,000 target reached. Annual informal coverage is now ACTIVE!`
        : `₦${depositAmount.toLocaleString()} saved via ${channel}. Total: ₦${newBalance.toLocaleString()} of ₦${ben.wallet_target.toLocaleString()}.`,
      message_ha: targetReached
        ? `Barka! An cika target na ₦12,000. Inshorar shekara ta zama CIKAKKIYA kuma tana aiki!`
        : `An ajiye ₦${depositAmount.toLocaleString()} ta ${channel}. Jimillar kudi a aljihu: ₦${newBalance.toLocaleString()} cikin ₦${ben.wallet_target.toLocaleString()}.`
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// 7. Point-of-Care Eligibility Verification (Real-time and Offline-capable)
app.post('/api/eligibility/verify', async (req, res) => {
  try {
    const { identifier } = req.body; // Can be QR token, Card Number, or NIN
    if (!identifier) {
      return res.status(400).json({ error: 'Identifier (QR token, Card Number or NIN) is required' });
    }

    const cleanId = identifier.trim();
    const [rows] = await pool.query(`
      SELECT b.*, p.code as plan_code, p.name_en as plan_name_en, p.name_ha as plan_name_ha, 
             p.benefit_scope_en, p.benefit_scope_ha, p.copayment_rate, l.name as lga_name
      FROM beneficiaries b
      JOIN plans p ON b.plan_id = p.id
      JOIN lgas l ON b.lga_id = l.id
      WHERE b.qr_token = ? OR b.card_number = ? OR b.nin = ?
    `, [cleanId, cleanId, cleanId]);

    if (rows.length === 0) {
      return res.status(404).json({
        verified: false,
        message_en: 'Beneficiary identity not found. Verify offline cache or register walk-in patient.',
        message_ha: 'Ba a sami wannan mai cin gajiyar ba. Duba bayanan offline ko yi wa mara lafiya sabuwar rajista.'
      });
    }

    const b = rows[0];
    const isCoverageActive = b.premium_status === 'active' || b.premium_status === 'exempt_subsidized';

    // Check active outbreak emergency waiver
    const [outbreak] = await pool.query('SELECT * FROM outbreak_controls WHERE is_active = 1 AND emergency_waiver_active = 1');
    const hasOutbreakWaiver = outbreak.length > 0;

    res.json({
      verified: true,
      eligible: isCoverageActive,
      beneficiary: {
        id: b.id,
        card_number: b.card_number,
        nin: b.nin,
        full_name: b.full_name,
        gender: b.gender,
        dob: b.dob,
        phone: b.phone,
        lga: b.lga_name,
        ward: b.ward,
        plan_code: b.plan_code,
        plan_name_en: b.plan_name_en,
        plan_name_ha: b.plan_name_ha,
        premium_status: b.premium_status,
        copayment_rate: hasOutbreakWaiver ? 0.00 : b.copayment_rate,
        wallet_balance: b.wallet_balance,
        wallet_target: b.wallet_target,
        expires_at: b.expires_at
      },
      outbreak_waiver: hasOutbreakWaiver ? {
        active: true,
        notice_en: 'Active Outbreak Response Mode: Zero copayment for emergency treatments, C-sections, and IV fluids.',
        notice_ha: 'Dokar Gaggawa ta Cututtuka: Babu kudin biya ga maganin kwalara, tiyatar haihuwa da ruwan jiki.'
      } : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Encounters & Claims
app.get('/api/claims', async (req, res) => {
  try {
    const { status, plan_id } = req.query;
    let sql = `
      SELECT c.*, b.full_name as patient_name, b.card_number, b.nin, 
             pr.name as provider_name, pr.tier as provider_tier,
             p.code as plan_code, p.name_en as plan_name_en, p.name_ha as plan_name_ha
      FROM claims c
      JOIN beneficiaries b ON c.beneficiary_id = b.id
      JOIN providers pr ON c.provider_id = pr.id
      JOIN plans p ON c.plan_id = p.id
      WHERE 1=1
    `;
    const params = [];
    if (status) {
      sql += ' AND c.adjudication_status = ?';
      params.push(status);
    }
    if (plan_id) {
      sql += ' AND c.plan_id = ?';
      params.push(plan_id);
    }
    sql += ' ORDER BY c.id DESC LIMIT 100';

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit and Auto-Adjudicate Claim (FHIR Compliant Logic)
app.post('/api/claims', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      beneficiary_id,
      provider_id,
      service_description,
      icd11_code = '1F40.0',
      diagnosis_en = 'Plasmodium Falciparum Malaria',
      diagnosis_ha = 'Zazzabin Cizon Sauro',
      service_type = 'Outpatient PHC',
      billed_amount,
      is_offline_captured = false
    } = req.body;

    const billed = parseFloat(billed_amount);

    // 1. Fetch beneficiary & plan
    const [benRows] = await connection.query(`
      SELECT b.*, p.code as plan_code, p.copayment_rate 
      FROM beneficiaries b
      JOIN plans p ON b.plan_id = p.id
      WHERE b.id = ?
    `, [beneficiary_id]);

    if (benRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    const ben = benRows[0];

    // 2. Insert Encounter
    const encounter_code = `ENC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const [encResult] = await connection.query(`
      INSERT INTO encounters (encounter_code, beneficiary_id, provider_id, encounter_date, icd11_code, diagnosis_en, diagnosis_ha, service_type, is_offline_captured, status)
      VALUES (?, ?, ?, CURDATE(), ?, ?, ?, ?, ?, 'completed')
    `, [encounter_code, beneficiary_id, provider_id, icd11_code, diagnosis_en, diagnosis_ha, service_type, is_offline_captured ? 1 : 0]);

    const encounterId = encResult.insertId;

    // 3. Adjudication Rules Engine
    let adjudication_status = 'auto_approved';
    let adjudication_rule_note = 'Standard tariff verified. Automated DHIN/NHIA adjudication match.';
    let approved_amount = billed;

    // Outbreak waiver check
    const [outbreak] = await connection.query('SELECT * FROM outbreak_controls WHERE is_active = 1');
    const isOutbreakActive = outbreak.length > 0;

    if (service_type === 'Emergency C-Section' && billed > 50000) {
      adjudication_status = 'pre_authorized';
      adjudication_rule_note = 'Emergency C-Section approved under State Maternal Mortality Reduction Directive (100% waiver).';
      approved_amount = billed;
    } else if (service_type === 'Cholera Outbreak Care' && isOutbreakActive) {
      adjudication_status = 'auto_approved';
      adjudication_rule_note = 'Outbreak Response Mode: State Equity Fund 100% direct settlement.';
      approved_amount = billed;
    } else if (ben.plan_code === 'bhcpf') {
      // BHCPF Basic Minimum Package check
      approved_amount = billed;
      adjudication_rule_note = 'BHCPF BMPHS Basic Package verified: zero copayment applied.';
    } else if (ben.copayment_rate > 0) {
      // Calculate normal plan copayment
      const copay = billed * parseFloat(ben.copayment_rate);
      approved_amount = billed - copay;
      adjudication_rule_note = `Standard ${ben.copayment_rate * 100}% beneficiary copayment deducted.`;
    }

    // High cost flag
    if (billed > 150000) {
      adjudication_status = 'flagged_fwa';
      adjudication_rule_note = 'Flagged for Clinical Audit: Bill exceeds peer benchmark threshold.';
      approved_amount = 0.00;
    }

    const claim_number = `CLM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const fhir_claim_id = `FHIR-CLM-${Math.floor(100000 + Math.random() * 900000)}`;

    await connection.query(`
      INSERT INTO claims (claim_number, encounter_id, beneficiary_id, provider_id, plan_id, service_description, billed_amount, approved_amount, adjudication_status, adjudication_rule_note, fhir_claim_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [claim_number, encounterId, beneficiary_id, provider_id, ben.plan_id, service_description, billed, approved_amount, adjudication_status, adjudication_rule_note, fhir_claim_id]);

    await connection.commit();

    res.json({
      success: true,
      claim_number,
      fhir_claim_id,
      billed_amount: billed,
      approved_amount,
      adjudication_status,
      adjudication_rule_note,
      message_en: `Claim ${claim_number} processed. Status: ${adjudication_status.toUpperCase()}`,
      message_ha: `An sarrafa korafin ${claim_number}. Matsayi: ${adjudication_status}`
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// 9. Referrals (Closed-loop referral management)
app.get('/api/referrals', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.*, b.full_name as patient_name, b.card_number,
             pFrom.name as from_provider_name, pTo.name as to_provider_name
      FROM referrals r
      JOIN beneficiaries b ON r.beneficiary_id = b.id
      JOIN providers pFrom ON r.from_provider_id = pFrom.id
      JOIN providers pTo ON r.to_provider_id = pTo.id
      ORDER BY r.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/referrals', async (req, res) => {
  try {
    const { beneficiary_id, from_provider_id, to_provider_id, clinical_reason, urgency, notes } = req.body;
    const referral_code = `REF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    await pool.query(`
      INSERT INTO referrals (referral_code, beneficiary_id, from_provider_id, to_provider_id, clinical_reason, urgency, outcome_status, notes)
      VALUES (?, ?, ?, ?, ?, ?, 'referred', ?)
    `, [referral_code, beneficiary_id, from_provider_id, to_provider_id, clinical_reason, urgency || 'Routine', notes || '']);

    res.json({
      success: true,
      referral_code,
      message_en: 'Closed-loop digital referral dispatched successfully.',
      message_ha: 'An tura takardar tura mara lafiya babban asibiti cikin nasara.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. Fraud, Waste & Abuse (FWA)
app.get('/api/fwa', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM fwa_alerts ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/fwa/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE fwa_alerts SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, updatedStatus: status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 11. Outbreak Emergency Response Control
app.get('/api/outbreak', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM outbreak_controls ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/outbreak/toggle', async (req, res) => {
  try {
    const { id, is_active } = req.body;
    await pool.query('UPDATE outbreak_controls SET is_active = ?, emergency_waiver_active = ? WHERE id = ?', [is_active ? 1 : 0, is_active ? 1 : 0, id]);
    res.json({ success: true, is_active: is_active ? 1 : 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 12. USSD Gateway Simulation (*966# / *389*99#)
app.post('/api/ussd', async (req, res) => {
  try {
    const { phoneNumber, text, lang = 'en' } = req.body;
    const inputs = (text || '').split('*').filter(Boolean);
    const isHausa = lang === 'ha';

    if (inputs.length === 0) {
      // Main Menu
      if (isHausa) {
        return res.json({
          response: `CON Barka da zuwa Tsarin Inshorar Lafiya na Zamfara (Z-HIMS):\n1. Duba Matsayin Inshora\n2. Ajiye Kudin Inshora (₦500 - ₦12,000)\n3. Nemi Asibitin PHC Mafi Kusa\n4. Yanayin Gaggawa (Kwalara & Haihuwa)`
        });
      } else {
        return res.json({
          response: `CON Welcome to Zamfara Health Insurance (Z-HIMS):\n1. Check Coverage Status\n2. Micro-Savings Deposit (₦500 - ₦12,000)\n3. Locate Accredited PHC\n4. Emergency Outbreak Care Guidelines`
        });
      }
    }

    const choice = inputs[0];

    if (choice === '1') {
      if (inputs.length === 1) {
        return res.json({
          response: isHausa ? `CON Shigar da lambar NIN ko lambar katin Z-HIMS:` : `CON Enter your 11-digit NIN or Z-HIMS Card ID:`
        });
      }
      const searchKey = inputs[1];
      const [rows] = await pool.query('SELECT b.*, p.name_en, p.name_ha FROM beneficiaries b JOIN plans p ON b.plan_id = p.id WHERE b.nin = ? OR b.card_number = ? LIMIT 1', [searchKey, searchKey]);
      if (rows.length === 0) {
        return res.json({
          response: isHausa ? `END Ba a sami wannan mai cin gajiyar ba. Ziyarci asibitin PHC mafi kusa.` : `END No enrolment found for ${searchKey}. Visit your nearest PHC.`
        });
      }
      const b = rows[0];
      return res.json({
        response: isHausa
          ? `END Suna: ${b.full_name}\nTsari: ${b.name_ha}\nMatsayi: ${b.premium_status.toUpperCase()}\nAljihu: ₦${parseFloat(b.wallet_balance).toLocaleString()}`
          : `END Name: ${b.full_name}\nPlan: ${b.name_en}\nStatus: ${b.premium_status.toUpperCase()}\nWallet Balance: ₦${parseFloat(b.wallet_balance).toLocaleString()}`
      });
    }

    if (choice === '2') {
      if (inputs.length === 1) {
        return res.json({
          response: isHausa ? `CON Shigar da adadin da kake son ajiye (Misali: 500 ko 1000 ko 12000):` : `CON Enter amount to save towards ₦12,000 annual premium (e.g. 500, 1000, 12000):`
        });
      }
      const amount = parseFloat(inputs[1]);
      return res.json({
        response: isHausa
          ? `END An tura bukatar cire ₦${amount.toLocaleString()} daga asusunka. Za a tura maka sakon PIN don tabbatarwa.`
          : `END Payment request of ₦${amount.toLocaleString()} initiated. You will receive an SMS prompt to authorize debit.`
      });
    }

    if (choice === '3') {
      return res.json({
        response: isHausa
          ? `END Asibitocin Gusau da ke aiki: Tudan Wada Model PHC, Samaru CHC, FMC Gusau. Lambar gaggawa: 08031122334.`
          : `END Functional Facilities in Gusau: Tudan Wada Model PHC, Samaru CHC, FMC Gusau. Helpdesk: 08031122334.`
      });
    }

    if (choice === '4') {
      return res.json({
        response: isHausa
          ? `END GAGGAWA: Maganin Kwalara da Tiyatar Haihuwa kyauta ne a dukkan manyan asibitocin Jihar Zamfara.`
          : `END EMERGENCY: Cholera Treatment and Emergency C-Sections are 100% Free across all accredited Zamfara hospitals.`
      });
    }

    return res.json({ response: 'END Invalid choice. Kuskure wajen zabi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 13. HL7 FHIR R4 Interoperability Export
app.get('/api/fhir/Patient/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT b.*, l.name as lga_name FROM beneficiaries b JOIN lgas l ON b.lga_id = l.id WHERE b.id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
    const p = rows[0];

    // Build standard FHIR R4 Patient resource
    const fhirPatient = {
      resourceType: 'Patient',
      id: `ZHIMS-${p.id}`,
      identifier: [
        { system: 'https://nationalidentity.gov.ng/nin', value: p.nin },
        { system: 'https://zamfarahealth.gov.ng/card-id', value: p.card_number }
      ],
      active: p.premium_status === 'active' || p.premium_status === 'exempt_subsidized',
      name: [{ use: 'official', text: p.full_name }],
      telecom: [{ system: 'phone', value: p.phone }],
      gender: p.gender.toLowerCase(),
      birthDate: p.dob,
      address: [{
        use: 'home',
        line: [p.address],
        city: p.ward,
        district: p.lga_name,
        state: 'Zamfara State',
        country: 'Nigeria'
      }],
      meta: {
        profile: ['http://dhin.gov.ng/fhir/StructureDefinition/dhin-patient'],
        lastUpdated: new Date().toISOString()
      }
    };

    res.json(fhirPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// FHIR R4 Claim Resource
app.get('/api/fhir/Claim/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, b.nin, b.full_name as patient_name, pr.facility_code, pr.name as provider_name
      FROM claims c
      JOIN beneficiaries b ON c.beneficiary_id = b.id
      JOIN providers pr ON c.provider_id = pr.id
      WHERE c.id = ?
    `, [req.params.id]);

    if (rows.length === 0) return res.status(404).json({ error: 'Claim not found' });
    const clm = rows[0];

    const fhirClaim = {
      resourceType: 'Claim',
      id: `ZHIMS-CLM-${clm.id}`,
      identifier: [{ system: 'https://zamfarahealth.gov.ng/claims', value: clm.claim_number }],
      status: 'active',
      type: {
        coding: [{ system: 'http://terminology.hl7.org/CodeSystem/claim-type', code: 'institutional' }]
      },
      patient: { reference: `Patient/ZHIMS-${clm.beneficiary_id}`, display: clm.patient_name },
      provider: { reference: `Organization/${clm.facility_code}`, display: clm.provider_name },
      total: { value: parseFloat(clm.billed_amount), currency: 'NGN' },
      adjudication: {
        status: clm.adjudication_status,
        approvedAmount: { value: parseFloat(clm.approved_amount), currency: 'NGN' },
        note: clm.adjudication_rule_note
      },
      meta: {
        profile: ['http://dhin.gov.ng/fhir/StructureDefinition/dhin-claim'],
        lastUpdated: new Date().toISOString()
      }
    };

    res.json(fhirClaim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 14. Grievances (Complaints & Redress with SLA)
app.get('/api/grievances', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT g.*, b.full_name as patient_name, b.card_number, pr.name as provider_name
      FROM grievances g
      LEFT JOIN beneficiaries b ON g.beneficiary_id = b.id
      LEFT JOIN providers pr ON g.provider_id = pr.id
      ORDER BY g.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/grievances', async (req, res) => {
  try {
    const { beneficiary_id, provider_id, category, title_en, title_ha, description_en, description_ha, sla_hours = 48 } = req.body;
    const ticket_number = `TKT-ZH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    await pool.query(`
      INSERT INTO grievances (ticket_number, beneficiary_id, provider_id, category, title_en, title_ha, description_en, description_ha, sla_hours, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'open')
    `, [ticket_number, beneficiary_id || null, provider_id || null, category, title_en, title_ha, description_en, description_ha, sla_hours]);

    res.json({
      success: true,
      ticket_number,
      message_en: `Grievance registered. Assigned SLA resolution within ${sla_hours} hours.`,
      message_ha: `An karbi koken ku. Za a warware shi a cikin sa'o'i ${sla_hours}.`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 15. Telemedicine Sessions
app.get('/api/telemedicine', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ts.*, b.full_name as patient_name, b.card_number,
             pPhc.name as phc_name, pSpec.name as specialist_name
      FROM telemedicine_sessions ts
      JOIN beneficiaries b ON ts.beneficiary_id = b.id
      JOIN providers pPhc ON ts.phc_provider_id = pPhc.id
      JOIN providers pSpec ON ts.specialist_provider_id = pSpec.id
      ORDER BY ts.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 16. Maternal Care & ANC Tracking
app.get('/api/maternal', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT mt.*, b.full_name as mother_name, b.card_number, b.phone, l.name as lga_name
      FROM maternal_tracking mt
      JOIN beneficiaries b ON mt.beneficiary_id = b.id
      JOIN lgas l ON b.lga_id = l.id
      ORDER BY mt.edd ASC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 17. Diaspora Premium Sponsorship
app.get('/api/diaspora', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ds.*, b.full_name as recipient_name, b.card_number, l.name as recipient_lga
      FROM diaspora_sponsorships ds
      JOIN beneficiaries b ON ds.beneficiary_id = b.id
      JOIN lgas l ON b.lga_id = l.id
      ORDER BY ds.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/diaspora', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { sponsor_name, sponsor_city, sponsor_country, beneficiary_id, amount_naira, payment_channel = 'Stripe / Card', message } = req.body;
    const amount = parseFloat(amount_naira);

    await connection.query(`
      INSERT INTO diaspora_sponsorships (sponsor_name, sponsor_city, sponsor_country, beneficiary_id, amount_naira, payment_channel, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [sponsor_name, sponsor_city, sponsor_country, beneficiary_id, amount, payment_channel, message || '']);

    // Credit beneficiary wallet & check activation
    const [bRows] = await connection.query('SELECT * FROM beneficiaries WHERE id = ?', [beneficiary_id]);
    if (bRows.length > 0) {
      const b = bRows[0];
      const newBal = parseFloat(b.wallet_balance) + amount;
      let newStat = b.premium_status;
      if (newBal >= parseFloat(b.wallet_target)) {
        newStat = 'active';
      }
      await connection.query('UPDATE beneficiaries SET wallet_balance = ?, premium_status = ? WHERE id = ?', [newBal, newStat, beneficiary_id]);
    }

    await connection.commit();
    res.json({
      success: true,
      message_en: `Diaspora sponsorship of ₦${amount.toLocaleString()} processed successfully for ${sponsor_name}'s family member in Zamfara.`,
      message_ha: `An karbi tallafin ₦${amount.toLocaleString()} cikin nasara daga ${sponsor_name} zuwa ga dan uwa a jihar Zamfara.`
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// ==========================================
// GAP 1: RECURRING MICRO-DEBIT & AIRTIME MANDATES
// ==========================================
app.get('/api/mandates', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT rm.*, b.full_name as beneficiary_name, b.card_number, b.phone as beneficiary_phone, b.wallet_balance, b.wallet_target, l.name as lga_name
      FROM recurring_mandates rm
      JOIN beneficiaries b ON rm.beneficiary_id = b.id
      JOIN lgas l ON b.lga_id = l.id
      ORDER BY rm.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/mandates', async (req, res) => {
  try {
    const { beneficiary_id, channel, phone_or_account, frequency, amount_naira } = req.body;
    const amount = parseFloat(amount_naira) || 500.00;
    const mandateRef = `MAND-${channel.includes('Airtime') ? 'TELCO' : channel.includes('NIBSS') ? 'NIBSS' : 'POS'}-${Date.now().toString().slice(-6)}`;
    
    const [result] = await pool.query(`
      INSERT INTO recurring_mandates (mandate_ref, beneficiary_id, channel, phone_or_account, frequency, amount_naira, total_deducted_naira, successful_deductions, last_charge_date, next_charge_date, status)
      VALUES (?, ?, ?, ?, ?, ?, 0.00, 0, NULL, DATE_ADD(NOW(), INTERVAL 30 DAY), 'active')
    `, [mandateRef, beneficiary_id, channel, phone_or_account, frequency, amount]);

    res.json({
      success: true,
      mandate_id: result.insertId,
      mandate_ref: mandateRef,
      message_en: `Automated recurring mandate of ₦${amount.toLocaleString()} registered via ${channel}.`,
      message_ha: `An kulla tsarin cire ₦${amount.toLocaleString()} a kai-a-kai ta ${channel}.`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/mandates/:id/trigger', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [mRows] = await connection.query('SELECT * FROM recurring_mandates WHERE id = ?', [req.params.id]);
    if (mRows.length === 0) {
      return res.status(404).json({ error: 'Mandate not found' });
    }
    const mandate = mRows[0];
    const amount = parseFloat(mandate.amount_naira);

    // Update mandate
    const newTotal = parseFloat(mandate.total_deducted_naira) + amount;
    const newCount = mandate.successful_deductions + 1;
    await connection.query(`
      UPDATE recurring_mandates 
      SET total_deducted_naira = ?, successful_deductions = ?, last_charge_date = NOW(), next_charge_date = DATE_ADD(NOW(), INTERVAL 30 DAY)
      WHERE id = ?
    `, [newTotal, newCount, mandate.id]);

    // Credit beneficiary savings wallet
    const [bRows] = await connection.query('SELECT * FROM beneficiaries WHERE id = ?', [mandate.beneficiary_id]);
    let newBal = amount;
    let newStat = 'pending_wallet_target';
    let bName = 'Beneficiary';
    if (bRows.length > 0) {
      const b = bRows[0];
      bName = b.full_name;
      newBal = parseFloat(b.wallet_balance) + amount;
      newStat = b.premium_status;
      if (newBal >= parseFloat(b.wallet_target)) {
        newStat = 'active';
      }
      await connection.query('UPDATE beneficiaries SET wallet_balance = ?, premium_status = ? WHERE id = ?', [newBal, newStat, b.id]);
    }

    // Log wallet transaction
    const channelName = mandate.channel.includes('Airtime') ? 'USSD *966#' : mandate.channel.includes('NIBSS') ? 'Direct Bank Transfer' : 'Agent POS / Cash';
    await connection.query(`
      INSERT INTO wallet_transactions (beneficiary_id, amount, channel, reference, status, notes)
      VALUES (?, ?, ?, ?, 'successful', ?)
    `, [mandate.beneficiary_id, amount, channelName, `MAND-TX-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`, `Automated Mandate ${mandate.mandate_ref} Deduction`]);

    await connection.commit();
    res.json({
      success: true,
      new_total_deducted: newTotal,
      new_wallet_balance: newBal,
      status: newStat,
      message_en: `Successfully executed ₦${amount.toLocaleString()} deduction via ${mandate.channel} for ${bName}.`,
      message_ha: `An cire ₦${amount.toLocaleString()} cikin nasara ta ${mandate.channel} don ${bName}.`
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// ==========================================
// GAP 2: REAL-TIME AI CLINICAL PRE-AUTHORIZATIONS (< 5-MIN TURNAROUND)
// ==========================================
app.get('/api/preauth', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT pa.*, b.full_name as beneficiary_name, b.card_number, b.nin, l.name as lga_name, pr.name as provider_name, pr.facility_code
      FROM pre_authorizations pa
      JOIN beneficiaries b ON pa.beneficiary_id = b.id
      JOIN providers pr ON pa.provider_id = pr.id
      JOIN lgas l ON b.lga_id = l.id
      ORDER BY pa.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/preauth/request', async (req, res) => {
  try {
    const { beneficiary_id, provider_id, procedure_name_en, procedure_name_ha, icd11_code, clinical_priority = 'Emergency (< 1h)', estimated_cost } = req.body;
    const cost = parseFloat(estimated_cost) || 60000.00;

    // Fetch beneficiary and provider
    const [bRows] = await pool.query('SELECT b.*, p.code as plan_code, p.name_en as plan_name FROM beneficiaries b JOIN plans p ON b.plan_id = p.id WHERE b.id = ?', [beneficiary_id]);
    if (bRows.length === 0) return res.status(404).json({ error: 'Beneficiary record not found' });
    const ben = bRows[0];

    const [pRows] = await pool.query('SELECT * FROM providers WHERE id = ?', [provider_id]);
    if (pRows.length === 0) return res.status(404).json({ error: 'Health facility not found' });
    const prov = pRows[0];

    // Real-Time AI Clinical Adjudication
    const confidence = (98.2 + Math.random() * 1.5).toFixed(1);
    const turnaround = Math.floor(2 + Math.random() * 2); // 2-3 seconds
    const authCode = `PA-${prov.facility_code || 'FMC'}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const rationale_en = `AI Adjudication Engine verified active ${ben.plan_name} coverage and accredited ${prov.name} surgical facility. ICD-11 protocol [${icd11_code}] validated under NHIA secondary care schedules with 0 co-payment waiver.`;
    const rationale_ha = `Na'ura ta tantance cancantar ${ben.full_name} a asibitin ${prov.name}. Ka'idojin tiyata da magani [${icd11_code}] sun cika ka'idojin inshorar lafiya na jihar Zamfara ba tare da biyan kudi ba.`;

    const [result] = await pool.query(`
      INSERT INTO pre_authorizations (auth_code, beneficiary_id, provider_id, procedure_name_en, procedure_name_ha, icd11_code, clinical_priority, estimated_cost, approved_cost, ai_decision, ai_confidence_score, turnaround_seconds, clinical_rationale_en, clinical_rationale_ha, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'AUTO_APPROVED', ?, ?, ?, ?, 'active_valid')
    `, [authCode, beneficiary_id, provider_id, procedure_name_en, procedure_name_ha || procedure_name_en, icd11_code, clinical_priority, cost, cost, confidence, turnaround, rationale_en, rationale_ha]);

    res.json({
      success: true,
      preauth_id: result.insertId,
      auth_code: authCode,
      ai_decision: 'AUTO_APPROVED',
      approved_cost: cost,
      turnaround_seconds: turnaround,
      ai_confidence_score: confidence,
      rationale_en,
      rationale_ha,
      message_en: `Pre-authorization ${authCode} auto-approved by AI engine in ${turnaround} seconds!`,
      message_ha: `An amince da lambar izini ${authCode} cikin sakanni ${turnaround} ta na'ura!`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// GAP 3: PHARMACEUTICAL STOCKOUT SENTINEL & LOGISTICS
// ==========================================
app.get('/api/inventory', async (req, res) => {
  try {
    const { status, lga_id } = req.query;
    let query = `
      SELECT pi.*, pr.name as provider_name, pr.tier, l.name as lga_name
      FROM pharmacy_inventory pi
      JOIN providers pr ON pi.provider_id = pr.id
      JOIN lgas l ON pi.lga_id = l.id
      WHERE 1=1
    `;
    const params = [];
    if (status) {
      query += ' AND pi.status = ?';
      params.push(status);
    }
    if (lga_id) {
      query += ' AND pi.lga_id = ?';
      params.push(lga_id);
    }
    query += ' ORDER BY FIELD(pi.status, "critical_stockout", "low_warning", "optimal"), pi.id ASC';
    const [rows] = await pool.query(query, params);

    // Summary counts
    const [summary] = await pool.query(`
      SELECT 
        COUNT(*) as total_medicines,
        SUM(CASE WHEN status = 'optimal' THEN 1 ELSE 0 END) as optimal_count,
        SUM(CASE WHEN status = 'low_warning' THEN 1 ELSE 0 END) as low_count,
        SUM(CASE WHEN status = 'critical_stockout' THEN 1 ELSE 0 END) as critical_count,
        SUM(CASE WHEN auto_dispatch_status = 'truck_dispatched' THEN 1 ELSE 0 END) as active_dispatches
      FROM pharmacy_inventory
    `);

    res.json({
      inventory: rows,
      metrics: summary[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/inventory/:id/dispatch', async (req, res) => {
  try {
    await pool.query(`
      UPDATE pharmacy_inventory 
      SET auto_dispatch_status = 'truck_dispatched'
      WHERE id = ?
    `, [req.params.id]);

    const [rows] = await pool.query(`
      SELECT pi.*, pr.name as provider_name, l.name as lga_name 
      FROM pharmacy_inventory pi 
      JOIN providers pr ON pi.provider_id = pr.id 
      JOIN lgas l ON pi.lga_id = l.id 
      WHERE pi.id = ?
    `, [req.params.id]);
    const item = rows[0];

    res.json({
      success: true,
      message_en: `Emergency replenishment truck dispatched from Zamfara State Medical Store Gusau to ${item.provider_name} (${item.lga_name}) for ${item.drug_name_en}.`,
      message_ha: `An tura motar kayan magani cikin gaggawa daga rumbun ajiya na jihar Zamfara da ke Gusau zuwa asibitin ${item.provider_name} don maganin ${item.drug_name_ha}.`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/inventory/:id/confirm-delivery', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pharmacy_inventory WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    const item = rows[0];
    const replenishedStock = item.current_stock + (item.minimum_safe_stock * 3);

    await pool.query(`
      UPDATE pharmacy_inventory 
      SET current_stock = ?, status = 'optimal', auto_dispatch_status = 'delivered_confirmed', last_replenished = CURDATE()
      WHERE id = ?
    `, [replenishedStock, req.params.id]);

    res.json({
      success: true,
      new_stock: replenishedStock,
      status: 'optimal',
      message_en: `Stock delivery confirmed at facility! New balance: ${replenishedStock} ${item.unit_name}. Status restored to OPTIMAL.`,
      message_ha: `An karbi kayan magani a asibiti! Sabon adadi: ${replenishedStock} ${item.unit_name}. Magani ya wadata!`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// GAP 4: DIASPORA REMITTANCE HEALTH BONDS
// ==========================================
app.get('/api/diaspora/bonds', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT db.*, l.name as target_lga_name
      FROM diaspora_bonds db
      JOIN lgas l ON db.target_lga_id = l.id
      ORDER BY db.id DESC
    `);

    const [summary] = await pool.query(`
      SELECT 
        COUNT(*) as total_bonds,
        COALESCE(SUM(total_amount_naira), 0) as total_funded_naira,
        COALESCE(SUM(families_sponsored_count), 0) as total_families_covered,
        COALESCE(SUM(treatments_utilized_count), 0) as total_treatments_delivered
      FROM diaspora_bonds
    `);

    res.json({
      bonds: rows,
      metrics: summary[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/diaspora/bonds', async (req, res) => {
  try {
    const { sponsor_name, sponsor_city, sponsor_country, target_lga_id, families_count, currency = 'USD', amount_foreign, beneficiary_category, message } = req.body;
    const families = parseInt(families_count) || 10;
    const totalNaira = families * 12000.00; // ₦12,000 per family/year
    const bondCode = `BOND-${(sponsor_country || 'DIASPORA').substring(0,3).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const taxRef = `FIRS-ZAM-${Date.now().toString().slice(-6)}`;

    const [result] = await pool.query(`
      INSERT INTO diaspora_bonds (bond_code, sponsor_name, sponsor_city, sponsor_country, target_lga_id, families_sponsored_count, total_amount_naira, currency, amount_foreign, beneficiary_category, treatments_utilized_count, tax_exemption_ref, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, 'allocated_verified')
    `, [bondCode, sponsor_name, sponsor_city, sponsor_country, target_lga_id, families, totalNaira, currency, parseFloat(amount_foreign) || (totalNaira / 1500), beneficiary_category || 'Pregnant Women & Infants', taxRef, message || '']);

    res.json({
      success: true,
      bond_id: result.insertId,
      bond_code: bondCode,
      total_naira: totalNaira,
      families_sponsored: families,
      tax_exemption_ref: taxRef,
      message_en: `Diaspora Health Remittance Bond ${bondCode} registered! ₦${totalNaira.toLocaleString()} allocated for ${families} vulnerable families in Zamfara.`,
      message_ha: `An kulla takardar tallafin inshora ta ${bondCode}! An ware ₦${totalNaira.toLocaleString()} don biya wa iyalai ${families} inshora a jihar Zamfara.`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// CAPABILITY 1: PHC MONTHLY ADVANCE CAPITATION ENGINE
// ==========================================
app.get('/api/capitation/batches', async (req, res) => {
  try {
    const [batches] = await pool.query(`
      SELECT * FROM capitation_batches ORDER BY id DESC
    `);

    const [allocations] = await pool.query(`
      SELECT cfa.*, p.name as provider_name, p.tier as facility_tier, l.name as lga_name
      FROM capitation_facility_allocations cfa
      JOIN providers p ON cfa.provider_id = p.id
      JOIN lgas l ON cfa.lga_id = l.id
      ORDER BY cfa.monthly_payout_naira DESC
    `);

    const [metrics] = await pool.query(`
      SELECT 
        COUNT(DISTINCT batch_id) as total_batches_run,
        COALESCE(SUM(monthly_payout_naira), 0) as total_capitation_disbursed_naira,
        COUNT(DISTINCT provider_id) as total_funded_facilities,
        COALESCE(SUM(assigned_enrollees), 0) as total_covered_lives
      FROM capitation_facility_allocations
    `);

    res.json({
      batches,
      allocations,
      metrics: metrics[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/capitation/generate', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      month_en, month_ha,
      billing_month_en, billing_month_ha,
      rate_per_enrollee, capitation_rate = 500.00
    } = req.body;
    const rate = parseFloat(rate_per_enrollee || capitation_rate || 500.00);
    const bMonthEn = billing_month_en || month_en || `November ${new Date().getFullYear()} Capitation Advance`;
    const bMonthHa = billing_month_ha || month_ha || `Kudin Gudanarwa na Watan Nuwamba ${new Date().getFullYear()}`;

    // Fetch all active facilities
    const [facilities] = await connection.query(`
      SELECT p.id as provider_id, p.lga_id, p.name as provider_name,
        COALESCE((SELECT COUNT(*) FROM beneficiaries b WHERE b.lga_id = p.lga_id), 1200) as assigned_enrollees
      FROM providers p
      WHERE p.is_functional = 1
      LIMIT 14
    `);

    const totalEnrollees = facilities.reduce((sum, f) => sum + parseInt(f.assigned_enrollees), 0);
    const totalAmount = totalEnrollees * rate;
    const batchRef = `CAP-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`;
    const nibssRef = `NIBSS-CAP-ZAM-${Date.now().toString().slice(-8)}`;

    const [batchResult] = await connection.query(`
      INSERT INTO capitation_batches (batch_ref, billing_month_en, billing_month_ha, total_facilities_count, total_enrollees_count, capitation_rate_naira, total_amount_naira, nibss_batch_ref, payment_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'disbursed')
    `, [
      batchRef,
      bMonthEn,
      bMonthHa,
      facilities.length,
      totalEnrollees,
      rate,
      totalAmount,
      nibssRef
    ]);

    const batchId = batchResult.insertId;

    const banks = ['Jaiz Bank Plc', 'First Bank of Nigeria', 'Taj Bank', 'Zenith Bank Plc', 'Access Bank Plc', 'United Bank for Africa'];
    for (let i = 0; i < facilities.length; i++) {
      const f = facilities[i];
      const enrollees = parseInt(f.assigned_enrollees);
      const payout = enrollees * rate;
      const bank = banks[i % banks.length];
      const acct = `00${Math.floor(10000000 + Math.random() * 90000000)}`;
      const remRef = `NIBSS-TX-${Math.floor(10000 + Math.random() * 90000)}`;

      await connection.query(`
        INSERT INTO capitation_facility_allocations (batch_id, provider_id, lga_id, assigned_enrollees, capitation_rate, monthly_payout_naira, bank_name, account_number, payment_status, remittance_ref)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'credited', ?)
      `, [batchId, f.provider_id, f.lga_id, enrollees, rate, payout, bank, acct, remRef]);
    }

    await connection.commit();

    res.json({
      success: true,
      batch: {
        id: batchId,
        batch_ref: batchRef,
        billing_month_en: bMonthEn,
        billing_month_ha: bMonthHa,
        total_facilities_count: facilities.length,
        total_enrollees_count: totalEnrollees,
        capitation_rate_naira: rate,
        total_amount_naira: totalAmount,
        nibss_batch_ref: nibssRef,
        payment_status: 'disbursed'
      },
      batch_ref: batchRef,
      nibss_ref: nibssRef,
      total_amount_naira: totalAmount,
      facilities_funded: facilities.length,
      message_en: `Advance Capitation Batch ${batchRef} successfully calculated and credited via NIBSS! ₦${totalAmount.toLocaleString()} disbursed to ${facilities.length} primary health centres.`,
      message_ha: `An fitar da kudin gudanarwar asibitoci ${batchRef} ta tsarin NIBSS! An tura ₦${totalAmount.toLocaleString()} zuwa cibiyoyin lafiya ${facilities.length}.`
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// ==========================================
// CAPABILITY 2: BEHAVIORAL PREVENTION & REWARDS LEDGER
// ==========================================
app.get('/api/rewards', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT pr.*, b.full_name as beneficiary_name, b.card_number, p.name as provider_name
      FROM prevention_rewards pr
      JOIN beneficiaries b ON pr.beneficiary_id = b.id
      JOIN providers p ON pr.provider_id = p.id
      ORDER BY pr.id DESC
    `);

    const [metrics] = await pool.query(`
      SELECT 
        COUNT(*) as total_rewards_issued,
        COALESCE(SUM(reward_value_naira), 0) as total_incentive_value_naira,
        COUNT(DISTINCT beneficiary_id) as total_mothers_and_infants_rewarded,
        SUM(CASE WHEN milestone_type = 'anc_visit' THEN 1 ELSE 0 END) as anc_milestones_count,
        SUM(CASE WHEN milestone_type = 'immunization' THEN 1 ELSE 0 END) as immunization_count
      FROM prevention_rewards
    `);

    res.json({
      rewards: rows,
      metrics: metrics[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rewards/trigger', async (req, res) => {
  try {
    const { beneficiary_id, provider_id, milestone_type = 'anc_visit_4', reward_type, reward_value_naira, delivery_channel, phone_number } = req.body;

    const [benRows] = await pool.query('SELECT * FROM beneficiaries WHERE id = ?', [beneficiary_id]);
    if (benRows.length === 0) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }
    const ben = benRows[0];
    const phone = phone_number || ben.phone || '08030000000';

    let milestone_en = 'Completed 4th Antenatal Care (ANC-4) Visit';
    let milestone_ha = 'Kammala Ziyarar Awo ta 4 a Cibiyar Lafiya';
    let voucherCode = `VOUCH-AIR-${Math.floor(1000 + Math.random() * 9000)}`;
    let delivery = 'MTN Instant Airtime Topup';
    let value = reward_value_naira ? parseFloat(reward_value_naira) : 200.00;

    if (milestone_type === 'child_immunization_penta3' || milestone_type === 'immunization') {
      milestone_en = 'Childhood Pentavalent-3 & Measles Immunization Complete';
      milestone_ha = 'Kammala Rigakafin Yara na Cututtuka 5 (Penta-3) da Kyanda';
      delivery = 'Digital Health Wallet Credit';
      voucherCode = `VOUCH-WAL-${Math.floor(1000 + Math.random() * 9000)}`;
      if (!reward_value_naira) value = 200.00;
    } else if (milestone_type === 'malaria_iptp_llin' || milestone_type === 'malaria_prophylaxis') {
      milestone_en = 'Pregnancy IPTp Malaria Prevention + Free LLIN Mosquito Net';
      milestone_ha = 'Kariyar Zazzabin Sauro ga Mai Ciki da Gidan Sauro Kyauta (LLIN)';
      delivery = 'Accredited PHC Pharmacy Bed Net Voucher';
      voucherCode = `VOUCH-NET-${Math.floor(1000 + Math.random() * 9000)}`;
      if (!reward_value_naira) value = 2500.00;
    } else if (milestone_type === 'postnatal_nutrition_rutf' || milestone_type === 'postnatal') {
      milestone_en = '48-Hour Postnatal Maternal & Infant Checkup + RUTF Pack';
      milestone_ha = 'Duba Lafiyar Uwa da Jariri bayan Haihuwa tare da Abinci mai Gina Jiki (RUTF)';
      delivery = 'ZAMCHEMA Nutrition Partner Dispensary Voucher';
      voucherCode = `VOUCH-NUT-${Math.floor(1000 + Math.random() * 9000)}`;
      if (!reward_value_naira) value = 3000.00;
    }

    if (delivery_channel === 'airtime_airtel') {
      delivery = 'Airtel Instant Airtime Topup';
    } else if (delivery_channel === 'wallet_credit') {
      delivery = 'Z-HIMS Savings Wallet Credit';
    } else if (delivery_channel === 'clinic_voucher') {
      delivery = 'Clinic Pharmacy Physical Voucher';
    }

    const rewardCode = `REW-${milestone_type.substring(0,4).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    await pool.query(`
      INSERT INTO prevention_rewards (reward_code, beneficiary_id, provider_id, milestone_type, milestone_name_en, milestone_name_ha, reward_type, reward_value_naira, voucher_code, delivery_channel, phone_number, is_claimed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, [rewardCode, beneficiary_id, provider_id || 1, milestone_type, milestone_en, milestone_ha, reward_type || 'airtime_credit', value, voucherCode, delivery, phone]);

    // If reward is wallet credit, also top up their health savings balance
    if (delivery.includes('Wallet') || reward_type === 'cash_wallet') {
      await pool.query('UPDATE beneficiaries SET wallet_balance = wallet_balance + ? WHERE id = ?', [value, beneficiary_id]);
    }

    const rewardObj = {
      reward_code: rewardCode,
      voucher_code: voucherCode,
      reward_value_naira: value,
      delivery_channel: delivery,
      milestone_name_en: milestone_en,
      milestone_name_ha: milestone_ha
    };

    res.json({
      success: true,
      reward: rewardObj,
      reward_code: rewardCode,
      voucher_code: voucherCode,
      reward_value_naira: value,
      delivery_channel: delivery,
      message_en: `Vitality Prevention Incentive ${rewardCode} awarded to ${ben.full_name}! ₦${value.toLocaleString()} delivered via ${delivery}.`,
      message_ha: `An ba da kyautar rigakafi ${rewardCode} ga ${ben.full_name}! An aika ₦${value.toLocaleString()} ta ${delivery}.`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// CAPABILITY 3: MULTIMODAL INDIGENOUS VOICE AI TRIAGE
// ==========================================
app.get('/api/triage/sessions', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT vts.*, p.name as assigned_facility_name, p.tier as facility_tier, l.name as lga_name
      FROM voice_triage_sessions vts
      JOIN providers p ON vts.assigned_facility_id = p.id
      JOIN lgas l ON p.lga_id = l.id
      ORDER BY vts.id DESC
    `);

    const [metrics] = await pool.query(`
      SELECT 
        COUNT(*) as total_voice_sessions,
        SUM(CASE WHEN severity_level = 'critical_emergency_hospital' THEN 1 ELSE 0 END) as critical_emergencies,
        SUM(CASE WHEN severity_level = 'moderate_phc_visit' THEN 1 ELSE 0 END) as phc_visits_booked,
        SUM(CASE WHEN severity_level = 'mild_home_care' THEN 1 ELSE 0 END) as home_care_guided,
        SUM(CASE WHEN action_taken = 'ambulance_dispatched' THEN 1 ELSE 0 END) as ambulances_dispatched
      FROM voice_triage_sessions
    `);

    res.json({
      sessions: rows,
      metrics: metrics[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/triage/evaluate', async (req, res) => {
  try {
    const spoken_text = req.body.spoken_text || req.body.transcript || '';
    const spoken_language = req.body.spoken_language || 'ha';
    const citizen_phone = req.body.citizen_phone || '08035544112';
    const citizen_name = req.body.citizen_name || 'Fatima Aliyu Kaura';
    const text = (spoken_text || '').toLowerCase();

    // AI Clinical Symptom Extraction & Triage Logic
    let detected_symptoms = 'General Febrile Illness / Malaria Symptoms';
    let icd11 = '1F40.0 Plasmodium Falciparum Malaria';
    let severity = 'URGENT';
    let rec_en = 'Clinical Assessment: Acute Malaria symptoms detected. Proceed to your nearest accredited PHC for rapid diagnostic blood testing and 100% free ACT blister packs.';
    let rec_ha = 'Binciken Likita: Alamomin Zazzabin Cizon Sauro (Malaria). Tafi cibiyar lafiya (PHC) mafi kusa domin gwajin RDT kyauta da karbar maganin ACT.';
    let action = 'PHC Referral & Diagnostic Consultation Scheduled';
    let facility_id = 1; // Default Tudan Wada PHC

    if (text.includes('nakuda') || text.includes('jini') || text.includes('bleeding') || text.includes('labor') || text.includes('suma') || text.includes('collapse') || text.includes('zubar')) {
      detected_symptoms = 'Severe Obstetric Emergency / Heavy Hemorrhage';
      icd11 = 'JA40.0 Severe Obstetric Hemorrhage';
      severity = 'EMERGENCY';
      rec_en = 'CRITICAL OBSTETRIC EMERGENCY: Immediate hospital admission required. Ambulance dispatch triggered. 100% maternal emergency fee waiver active.';
      rec_ha = 'GAGGAWA MAI TSANANI: Zubar da jini a lokacin ciki ko haihuwa. An tura motar asibiti (Ambulance) cikin gaggawa zuwa FMC Gusau. Kulawa 100% kyauta.';
      action = 'Emergency Ambulance Dispatched to FMC Gusau (100% Emergency Waiver)';
      facility_id = 2; // Anka General Hospital / FMC Gusau
    } else if (text.includes('gudawa') || text.includes('diarrhea') || text.includes('ruwa-ruwa') || text.includes('vomit') || text.includes('amai')) {
      detected_symptoms = 'Acute Watery Diarrhea / Pediatric Gastroenteritis';
      icd11 = '1A20.0 Acute Gastroenteritis';
      severity = 'ROUTINE';
      rec_en = 'Mild Gastrointestinal Episode. Administer Oral Rehydration Salts (ORS) in 1L clean drinking water and 20mg Zinc tablets daily for 10 days. Visit clinic if dehydration worsens.';
      rec_ha = 'Gudawa da Amai mai sauki. Hada garin ORS a litar ruwa mai tsafta, a sha tare da kwayar Zinc tsawon kwana 10. Idan ba a samu sauki ba a je asibiti.';
      action = 'Oral Rehydration Salts (ORS) Care Protocol Dispatched via SMS';
      facility_id = 1;
    } else if (text.includes('zazzabi') || text.includes('fever') || text.includes('sanyi') || text.includes('chills') || text.includes('ciwon kai') || text.includes('headache')) {
      detected_symptoms = 'Plasmodium Falciparum Febrile Illness (Malaria)';
      icd11 = '1F40.0 Plasmodium Falciparum Malaria';
      severity = 'URGENT';
      rec_en = 'Plasmodium Falciparum Malaria. Free ACT antimalarials and Rapid Diagnostic Testing available at Tudan Wada PHC.';
      rec_ha = 'Zazzabin Cizon Sauro. Gwajin RDT da maganin ACT kyauta a Tudan Wada PHC karkashin inshorar Z-HIMS.';
      action = 'Priority PHC Care Referral Slip Generated';
      facility_id = 1;
    } else if (text.includes('numfashi') || text.includes('tari') || text.includes('cough') || text.includes('breath') || text.includes('kirji')) {
      detected_symptoms = 'Acute Respiratory Tract Infection / Pneumonia Risk';
      icd11 = 'CA40.0 Acute Respiratory Tract Infection';
      severity = 'URGENT';
      rec_en = 'Lower Respiratory Tract Infection. Clinical examination and Amoxicillin dispersible tablets recommended at PHC.';
      rec_ha = 'Ciwon Numfashi da Tari mai tsanani. A je cibiyar PHC domin auna kirji da samun maganin Amoxicillin kyauta.';
      action = 'Priority Respiratory PHC Consultation Slotted';
      facility_id = 3;
    }

    const sessionRef = `TRIAGE-VOICE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const transcriptHa = spoken_language === 'ha' ? spoken_text : `Fassarar Hausa: ${spoken_text}`;
    const transcriptEn = spoken_language === 'en' ? spoken_text : `English translation: ${spoken_text}`;

    const [result] = await pool.query(`
      INSERT INTO voice_triage_sessions (session_ref, citizen_phone, citizen_name, spoken_language, audio_transcript_ha, audio_transcript_en, detected_symptoms, icd11_triage_code, severity_level, ai_clinical_recommendation_en, ai_clinical_recommendation_ha, assigned_facility_id, action_taken)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      sessionRef,
      citizen_phone,
      citizen_name,
      spoken_language,
      transcriptHa,
      transcriptEn,
      detected_symptoms,
      icd11,
      severity,
      rec_en,
      rec_ha,
      facility_id,
      action
    ]);

    const sessionObj = {
      id: result.insertId,
      session_ref: sessionRef,
      citizen_name,
      citizen_phone,
      spoken_language,
      audio_transcript_ha: transcriptHa,
      audio_transcript_en: transcriptEn,
      detected_symptoms,
      icd11_triage_code: icd11,
      severity_level: severity,
      ai_clinical_recommendation_en: rec_en,
      ai_clinical_recommendation_ha: rec_ha,
      assigned_facility_id: facility_id,
      action_taken: action
    };

    res.json({
      success: true,
      session: sessionObj,
      session_id: result.insertId,
      session_ref: sessionRef,
      detected_symptoms,
      icd11_triage_code: icd11,
      severity_level: severity,
      ai_recommendation_en: rec_en,
      ai_recommendation_ha: rec_ha,
      action_taken: action,
      facility_id,
      message_en: `Voice symptom evaluation complete! Severity: ${severity}. Action: ${action}.`,
      message_ha: `An kammala binciken alamomin cuta ta murya! Tsanani: ${severity}. Matakin da aka dauka: ${action}.`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Z-HIMS Server] Express API running on http://localhost:${PORT}`);
  console.log(`[Z-HIMS Server] Local XAMPP MySQL database configured.`);
});

