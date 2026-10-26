import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Shield, Activity, Users, CreditCard, Building2, FileText, CheckCircle2,
  AlertTriangle, PhoneCall, Globe, ArrowRight, PlusCircle, RefreshCw,
  Search, Check, AlertCircle, Send, HeartHandshake, Eye, EyeOff, Sparkles, MapPin, X,
  Baby, Video, MessageSquare, Gift, Code2, Clock, CheckCircle,
  LogIn, LogOut, User, Lock, Award, TrendingUp, BarChart3, Layers, ShieldCheck, UserCheck, ChevronRight, HelpCircle, ExternalLink,
  Truck, Zap, DollarSign, Stethoscope, Package, Play, Menu,
  Landmark, Mic, Volume2
} from 'lucide-react';
import { translations } from './translations';

export const ROLE_CONFIGS = {
  executive_admin: {
    roleKey: 'executive_admin',
    roleName: 'Executive Admin',
    roleTitleHa: 'Babban Daraktan Hukumar ZAMCHEMA',
    clearanceLevel: 'Level 1: Sovereign Executive Governance',
    clearanceLevelHa: 'Matsayi na 1: Cikakken Ikon Gudanarwa na Jiha',
    color: '#059669',
    badge: 'ZAMCHEMA HQ',
    dutyPost: 'ZAMCHEMA Executive Headquarters, Gusau',
    jurisdiction: 'All 14 Zamfara LGAs (Whole State)',
    primaryTab: 'overview',
    allowedTabs: ['overview', 'plans', 'capitation', 'providers', 'benchmark', 'diaspora', 'fwa', 'fhir'],
    mandate_en: 'Universal health coverage expansion, financial solvency oversight, monthly advance capitation approval, and statutory healthcare policy governance across Zamfara State.',
    mandate_ha: 'Fadada tsarin inshora ga kowa da kowa, kula da kudaden jiha, amincewa da biyan kudin gudanarwar asibitoci, da tsara manufofin hukuma a dukkan kananan hukumomi 14.',
    capabilities: [
      { name: 'State Solvency & BHCPF Target Tracking', allowed: true },
      { name: '1st-of-Month Advance Capitation Release', allowed: true },
      { name: 'Multi-Tenant Health Plans Administration', allowed: true },
      { name: 'Strategic Private HMO Benchmarking & Gaps', allowed: true },
      { name: 'Diaspora Health Remittance Governance', allowed: true },
      { name: 'AI Fraud Sentinel & Solvency Audits', allowed: true },
      { name: 'Clinical Patient Medical Record Editing', allowed: false },
      { name: 'Field Biometric Enrolment Capture', allowed: false }
    ]
  },
  medical_director: {
    roleKey: 'medical_director',
    roleName: 'Medical Director',
    roleTitleHa: 'Babban Likita (FMC Gusau)',
    clearanceLevel: 'Level 2: Tertiary Clinical Specialist Authority',
    clearanceLevelHa: 'Matsayi na 2: Babban Ikon Kula da Marasa Lafiya na Kwararru',
    color: '#2563eb',
    badge: 'Tertiary Specialist',
    dutyPost: 'Federal Medical Centre (FMC) Gusau',
    jurisdiction: 'State Tertiary Hospital & Secondary Referral Network',
    primaryTab: 'referrals',
    allowedTabs: ['referrals', 'maternalTele', 'voiceTriage', 'providers', 'claims', 'eligibility'],
    mandate_en: 'Tertiary referral coordination, emergency surgical escalations to FMC Gusau, maternal mortality reduction tele-consultations, and clinical protocol oversight.',
    mandate_ha: 'Kula da marasa lafiya da aka tura babban asibiti (FMC Gusau), tiyata ta gaggawa, tattaunawar likitoci ta bidiyo kan masu juna biyu, da tsarin kulawa na kwararru.',
    capabilities: [
      { name: 'Tertiary Hospital Surgical Referrals & Dispatch', allowed: true },
      { name: 'Emergency C-Section 100% Fee Waiver Authorization', allowed: true },
      { name: 'Specialist Video & Encrypted Tele-Consultations', allowed: true },
      { name: 'Clinical Hausa Voice AI Symptom Validation', allowed: true },
      { name: 'Point-of-Care Eligibility Adjudication', allowed: true },
      { name: 'Executive Financial Pool Management', allowed: false },
      { name: 'Field Micro-Savings Cash Collection', allowed: false }
    ]
  },
  claims_officer: {
    roleKey: 'claims_officer',
    roleName: 'Claims Audit Officer',
    roleTitleHa: "Jami'in Tace Biyan Kudi",
    clearanceLevel: 'Level 3: Fiscal Claims & Fraud Audit Bureau',
    clearanceLevelHa: 'Matsayi na 3: Tace Biyan Kudi da Kariya daga Barna',
    color: '#d97706',
    badge: 'Audit Bureau',
    dutyPost: 'State Claims Adjudication Bureau, Gusau',
    jurisdiction: 'Statewide Claims Processing & Provider Audit',
    primaryTab: 'claims',
    allowedTabs: ['claims', 'fwa', 'benchmark', 'capitation', 'grievances', 'fhir'],
    mandate_en: 'Electronic FHIR R4 claims processing, tariff verification, AI fraud waste and abuse (FWA) sentinel, pre-authorization review, and grievance investigations.',
    mandate_ha: 'Tace takardun asibitoci ta hanyar FHIR R4, gano algush da barna a kudaden asibiti, tace bukatun tiyata, da binciken korafe-korafen marasa lafiya.',
    capabilities: [
      { name: 'Electronic FHIR R4 Claims Adjudication', allowed: true },
      { name: 'AI Fraud, Waste & Abuse (FWA) Flagging', allowed: true },
      { name: 'Surgical Pre-Authorization Clearance', allowed: true },
      { name: 'PHC Capitation Reconciliation Audit', allowed: true },
      { name: 'Drug Stockout & Citizen Grievance Resolution', allowed: true },
      { name: 'Direct Clinical Patient Treatment', allowed: false },
      { name: 'Field Biometric Enrolment Capture', allowed: false }
    ]
  },
  field_agent: {
    roleKey: 'field_agent',
    roleName: 'Field Enrolment Agent',
    roleTitleHa: "Jami'ar Rijista a Kananan Hukumomi",
    clearanceLevel: 'Level 4: LGA Biometric & Financial Inclusion Operations',
    clearanceLevelHa: 'Matsayi na 4: Rijistar Masu Cin Gajiya a Kananan Hukumomi',
    color: '#7c3aed',
    badge: 'Field Operations',
    dutyPost: 'Anka LGA Enrolment Unit (Field Operations)',
    jurisdiction: 'Anka LGA Rural Wards & Primary Clinics',
    primaryTab: 'beneficiaries',
    allowedTabs: ['beneficiaries', 'eligibility', 'wallet', 'ussd', 'rewards', 'voiceTriage'],
    mandate_en: 'Door-to-door and facility biometric citizen enrolment, NIN identity validation, offline QR token issuance, informal sector micro-savings collection, and USSD onboarding.',
    mandate_ha: 'Rijistar al\'umma a kauyuka da kananan hukumomi, tantance lambar NIN, ba da katin shaida mai lambar QR, karbar ajiyar kudi ta POS, da shigar da mutane ta USSD.',
    capabilities: [
      { name: 'Biometric Citizen Enrolment & NIN Verification', allowed: true },
      { name: 'Offline QR Eligibility Token Validation', allowed: true },
      { name: 'Naira Savings Wallet POS Micro-Sweeps', allowed: true },
      { name: 'Rural USSD Feature-Phone Onboarding', allowed: true },
      { name: 'Maternal Prevention Reward Verification', allowed: true },
      { name: 'Tertiary Surgical Pre-Authorization', allowed: false },
      { name: 'Executive Solvency & Policy Governance', allowed: false }
    ]
  },
  beneficiary: {
    roleKey: 'beneficiary',
    roleName: 'Enrolled Citizen (NIN)',
    roleTitleHa: 'Mai Cin Gajiya (Mai Lambar NIN)',
    clearanceLevel: 'Level 5: Citizen Sovereign Healthcare Beneficiary',
    clearanceLevelHa: 'Matsayi na 5: Dan Kasa Mai Cin Gajiyar Inshora',
    color: '#0891b2',
    badge: 'NIN Verified',
    dutyPost: 'State Ministry of Education (Formal Plan Enrollee)',
    jurisdiction: 'Tudan Wada Ward, Gusau LGA',
    primaryTab: 'beneficiaries',
    allowedTabs: ['beneficiaries', 'wallet', 'voiceTriage', 'eligibility', 'rewards', 'grievances', 'diaspora'],
    mandate_en: 'Manage personal digital health insurance card, track family coverage & dependents, top up savings wallet, consult Hausa Voice AI doctor, claim prevention vouchers, and report service grievances.',
    mandate_ha: 'Duba katin inshorar lafiya da iyali, ajiye kudi a aljihu domin magani, sauraron likitan murya a Hausa, karbar katin waya da kayan abinci na kyauta, da shigar da korafi.',
    capabilities: [
      { name: 'Access Personal Digital ID Card & QR Code', allowed: true },
      { name: 'Family Health Savings Wallet Top-Up', allowed: true },
      { name: 'Consult Hausa Voice AI Doctor from Home', allowed: true },
      { name: 'Check Hospital Eligibility & Plan Benefits', allowed: true },
      { name: 'Claim ₦200 Airtime & Nutrition Prevention Vouchers', allowed: true },
      { name: 'Lodge Drug Stockout or Extortion Report', allowed: true },
      { name: 'Access Other Citizens Confidential Records', allowed: false },
      { name: 'Modify State Financial Tariffs', allowed: false }
    ]
  }
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('zhims_lang') || 'en');
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Authentication & Current User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('zhims_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginInfoTab, setLoginInfoTab] = useState('portals');
  const [loginModal, setLoginModal] = useState(null);

  const demoRoles = [
    {
      roleKey: 'executive_admin',
      roleName: 'Executive Admin',
      roleTitleHa: 'Babban Daraktan Hukumar ZAMCHEMA',
      name: 'Dr. Aisha Bello Bungudu',
      identifier: 'admin@zamfarahealth.gov.ng',
      password: 'Admin@2026',
      org: 'ZAMCHEMA Executive Headquarters, Gusau',
      badge: 'ZAMCHEMA HQ',
      color: '#059669',
      icon: Shield
    },
    {
      roleKey: 'medical_director',
      roleName: 'Medical Director',
      roleTitleHa: 'Babban Likita (FMC Gusau)',
      name: 'Dr. Aminu Mohammed Gusau',
      identifier: 'fmc.gusau@zamfarahealth.gov.ng',
      password: 'Doctor@2026',
      org: 'Federal Medical Centre (FMC) Gusau',
      badge: 'Tertiary Specialist',
      color: '#2563eb',
      icon: UserCheck
    },
    {
      roleKey: 'claims_officer',
      roleName: 'Claims Audit Officer',
      roleTitleHa: 'Jami\'in Tace Biyan Kudi',
      name: 'Ibrahim Sanusi Maradun',
      identifier: 'claims.audit@zamfarahealth.gov.ng',
      password: 'Claims@2026',
      org: 'State Claims Adjudication Bureau',
      badge: 'Audit Bureau',
      color: '#d97706',
      icon: FileText
    },
    {
      roleKey: 'field_agent',
      roleName: 'Field Enrolment Agent',
      roleTitleHa: 'Jami\'ar Rijista a Kananan Hukumomi',
      name: 'Hauwa\'u Aliyu Anka',
      identifier: 'agent.anka@zamfarahealth.gov.ng',
      password: 'Agent@2026',
      org: 'Anka LGA Enrolment Unit',
      badge: 'Field Operations',
      color: '#7c3aed',
      icon: Users
    },
    {
      roleKey: 'beneficiary',
      roleName: 'Enrolled Citizen (NIN)',
      roleTitleHa: 'Mai Cin Gajiya (Mai Lambar NIN)',
      name: 'Balarabe Mohammed Gusau',
      identifier: '23419082341',
      password: 'NIN@2026',
      org: 'State Ministry of Education (Formal Plan)',
      badge: 'NIN Verified',
      color: '#0891b2',
      icon: User
    }
  ];

  const ZAMFARA_LGAS = [
    { name: 'Gusau', type: 'State Capital HQ', phcs: 18, hospital: 'FMC Gusau + Gen. Hospital' },
    { name: 'Anka', type: 'Rural Mining Ward', phcs: 12, hospital: 'Anka General Hospital' },
    { name: 'Bakura', type: 'Agricultural Hub', phcs: 10, hospital: 'Bakura Cottage Hospital' },
    { name: 'Birnin Magaji', type: 'Northern Sector', phcs: 9, hospital: 'B. Magaji Comprehensive PHC' },
    { name: 'Bukkuyum', type: 'Agrarian Basin', phcs: 11, hospital: 'Bukkuyum Rural Hospital' },
    { name: 'Bungudu', type: 'Sub-Metropolitan', phcs: 14, hospital: 'Bungudu General Hospital' },
    { name: 'Gummi', type: 'Commercial Riverine', phcs: 13, hospital: 'Gummi General Hospital' },
    { name: 'Kaura Namoda', type: 'Urban Commercial', phcs: 15, hospital: 'Kaura General Hospital' },
    { name: 'Maradun', type: 'Irrigation Sector', phcs: 11, hospital: 'Maradun Cottage Hospital' },
    { name: 'Maru', type: 'Highland Wards', phcs: 12, hospital: 'Maru Cottage Hospital' },
    { name: 'Shinkafi', type: 'Frontier Sector', phcs: 10, hospital: 'Shinkafi General Hospital' },
    { name: 'Talata Mafara', type: 'Academic City', phcs: 14, hospital: 'Mafara Specialist Hospital' },
    { name: 'Tsafe', type: 'Southern Gateway', phcs: 13, hospital: 'Tsafe General Hospital' },
    { name: 'Zurmi', type: 'Northern Border', phcs: 12, hospital: 'Zurmi Cottage Hospital' }
  ];

  const ZAMCHEMA_SCHEMES = [
    {
      id: 'formal',
      titleEn: 'Formal Sector Public Plan',
      titleHa: 'Inshorar Ma’aikatan Gwamnati',
      targetEn: 'State & LGA Civil Servants, Parastatals',
      targetHa: 'Ma’aikatan Jiha da Kananan Hukumomi',
      costEn: 'Statutory Payroll Contribution',
      costHa: 'Cirewa ta Halastacciyar Albashi',
      highlightEn: 'Comprehensive secondary & tertiary surgical coverage at FMC Gusau',
      highlightHa: 'Cikakkiyar kulawa harda tiyata a babban asibitin FMC Gusau',
      color: '#059669',
      badge: 'Public Sector'
    },
    {
      id: 'informal',
      titleEn: 'Informal Sector Micro-Savings',
      titleHa: 'Inshorar Masu Karamin Karfi da Yan Kasuwa',
      targetEn: 'Traders, Farmers, Artisans, Transport Unions',
      targetHa: 'Yan Kasuwa, Manoma, Makera, Direbobi',
      costEn: '₦12,000 / year (or ₦1,000 / month via USSD)',
      costHa: '₦12,000 a shekara (ko ₦1,000 a wata)',
      highlightEn: 'Instant USSD *966# wallet savings with airtime & nutrition reward vouchers',
      highlightHa: 'Biya cikin sauki ta *966# tare da samun katin waya da tallafin abinci',
      color: '#2563eb',
      badge: 'Micro-Savings'
    },
    {
      id: 'bhcpf',
      titleEn: 'BHCPF Vulnerable Group Fund',
      titleHa: 'Asusun Tallafin Masu Karamin Karfi (BHCPF)',
      targetEn: 'Pregnant Women, Under-5s, Indigent Elderly, Disabilities',
      targetHa: 'Mata masu juna biyu, Yara kasa da 5, Tsofaffi, Nakasassu',
      costEn: '100% Free / Federal & State Subsidized',
      costHa: 'Kyauta 100% / Tallafin Jiha da Tarayya',
      highlightEn: 'Free antenatal care, safe facility childbirth, and primary medication',
      highlightHa: 'Awon ciki, haihuwa a asibiti, da magunguna kyauta',
      color: '#d97706',
      badge: '100% Free Subsidized'
    },
    {
      id: 'students',
      titleEn: 'Tertiary Students Health Cover',
      titleHa: 'Inshorar Dalibai ta Manyan Makarantu',
      targetEn: 'Polytechnics, Universities & Nursing Colleges in Zamfara',
      targetHa: 'Daliban Jami’o’i, Kwalejoji da Makarantun Ungozoma',
      costEn: 'Institutional Session Fee',
      costHa: 'Kudin Kula na Zangon Karatu',
      highlightEn: 'Campus clinic consultation + tertiary emergency coverage',
      highlightHa: 'Kula a asibitin makaranta da kulawar gaggawa a fadin jiha',
      color: '#7c3aed',
      badge: 'Higher Ed'
    },
    {
      id: 'emergency',
      titleEn: 'Emergency Trauma & Maternal Waiver',
      titleHa: 'Asusun Gaggawa na Tiyata da Juna Biyu',
      targetEn: 'Catastrophic emergencies & Obstetric C-sections',
      targetHa: 'Hadurran gaggawa da tiyatar haihuwa ta C-Section',
      costEn: '100% Sovereign Waiver (Zero Co-Pay)',
      costHa: 'Kyauta 100% daga Hukumar ZAMCHEMA',
      highlightEn: 'Zero out-of-pocket payment required at point-of-care',
      highlightHa: 'Babu biyan ko kwabo a lokacin karbar magani ko tiyata',
      color: '#e11d48',
      badge: 'Zero Co-Pay'
    },
    {
      id: 'diaspora',
      titleEn: 'Diaspora Family Care Bonds',
      titleHa: 'Asusun Kulawar Iyaye na Yan Kasashen Waje',
      targetEn: 'Zamfara Indigenes in Diaspora (UK, US, Saudi Arabia)',
      targetHa: 'Yan Zamfara mazauna kasashen waje',
      costEn: 'Direct FX Healthcare Remittance Guarantee',
      costHa: 'Daukar nauyin iyali da dangi a gida',
      highlightEn: 'Direct blockchain & smart escrow health cover for relatives in Zamfara',
      highlightHa: 'Daukar nauyin dangi kai tsaye don tabbatar da samun ingantacciyar lafiya',
      color: '#0891b2',
      badge: 'Diaspora FX'
    }
  ];

  const handleLogin = async (e, customId, customPass) => {
    if (e) e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    const id = customId || loginIdentifier;
    const pass = customPass || loginPassword;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: id, password: pass })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('zhims_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        const roleConf = ROLE_CONFIGS[data.user.role] || ROLE_CONFIGS.executive_admin;
        setActiveTab(roleConf.primaryTab);
        showToast(
          lang === 'ha'
            ? `Barka da shigowa, ${data.user.full_name} (${data.user.role})!`
            : `Welcome, ${data.user.full_name} (${data.user.role})!`,
          'success'
        );
      } else {
        setLoginError(data.error || 'Authentication failed. Please check credentials or select a demo role.');
      }
    } catch (err) {
      setLoginError('Could not reach backend authentication service. Ensure server is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('zhims_user');
    setCurrentUser(null);
    setProfileModalOpen(false);
    showToast(lang === 'ha' ? 'An fita daga tsarin lafiya.' : 'Successfully signed out.', 'success');
  };

  // Validate active tab access whenever currentUser or activeTab changes
  useEffect(() => {
    if (currentUser) {
      const roleConfig = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.executive_admin;
      if (!roleConfig.allowedTabs.includes(activeTab)) {
        setActiveTab(roleConfig.primaryTab);
      }
    }
  }, [currentUser]);

  // Core Data States
  const [overview, setOverview] = useState(null);
  const [plans, setPlans] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [providers, setProviders] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [claims, setClaims] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [fwaAlerts, setFwaAlerts] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [telemedicine, setTelemedicine] = useState([]);
  const [maternal, setMaternal] = useState([]);
  const [diaspora, setDiaspora] = useState([]);

  // Strategic Gaps Implementation States (1 to 4)
  const [mandates, setMandates] = useState([]);
  const [preauths, setPreauths] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [inventoryMetrics, setInventoryMetrics] = useState(null);
  const [bonds, setBonds] = useState([]);
  const [bondsMetrics, setBondsMetrics] = useState(null);
  const [gapActiveTab, setGapActiveTab] = useState('all');

  // World-Class Capabilities 1, 2, 3 States
  const [capitationBatches, setCapitationBatches] = useState([]);
  const [capitationAllocations, setCapitationAllocations] = useState([]);
  const [capitationMetrics, setCapitationMetrics] = useState(null);
  const [capitationModalOpen, setCapitationModalOpen] = useState(false);

  const [preventionRewards, setPreventionRewards] = useState([]);
  const [rewardsMetrics, setRewardsMetrics] = useState(null);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  const [voiceSessions, setVoiceSessions] = useState([]);
  const [voiceMetrics, setVoiceMetrics] = useState(null);
  const [voiceInput, setVoiceInput] = useState('');
  const [voiceCitizenName, setVoiceCitizenName] = useState('Fatima Aliyu Kaura');
  const [voiceCitizenPhone, setVoiceCitizenPhone] = useState('08035544112');
  const [voiceLanguage, setVoiceLanguage] = useState('ha');
  const [voiceResult, setVoiceResult] = useState(null);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceSpeaking, setVoiceSpeaking] = useState(false);

  // Gap Modals
  const [mandateModalOpen, setMandateModalOpen] = useState(false);
  const [preauthModalOpen, setPreauthModalOpen] = useState(false);
  const [bondModalOpen, setBondModalOpen] = useState(false);
  const [benSearch, setBenSearch] = useState('');
  const [lgaFilter, setLgaFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('all');

  // Modals & Active Selections
  const [selectedBen, setSelectedBen] = useState(null);
  const [enrolModalOpen, setEnrolModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletBen, setWalletBen] = useState(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [outbreakModalOpen, setOutbreakModalOpen] = useState(false);
  const [grievanceModalOpen, setGrievanceModalOpen] = useState(false);
  const [diasporaModalOpen, setDiasporaModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Point of Care Eligibility Scan State
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);

  // USSD Interactive State
  const [ussdPhone, setUssdPhone] = useState('08035544112');
  const [ussdHistory, setUssdHistory] = useState([]);
  const [ussdScreenText, setUssdScreenText] = useState('');
  const [ussdInput, setUssdInput] = useState('');
  const [ussdActive, setUssdActive] = useState(false);

  // FHIR Inspector state
  const [fhirJson, setFhirJson] = useState(null);
  const [fhirLoading, setFhirLoading] = useState(false);
  const [fhirType, setFhirType] = useState('Patient');

  // Form states
  const [enrolForm, setEnrolForm] = useState({
    nin: '',
    full_name: '',
    gender: 'Female',
    dob: '1995-06-15',
    phone: '0803',
    lga_id: '1',
    ward: 'Tudan Wada',
    address: '',
    plan_id: '2',
    household_size: 1,
    dependents: []
  });

  const [walletDeposit, setWalletDeposit] = useState({
    amount: '1000',
    channel: 'USSD *966#'
  });

  const [claimForm, setClaimForm] = useState({
    beneficiary_id: '1',
    provider_id: '1',
    service_description: 'Malaria consultation, ACT antimalarial prescription and rapid test',
    icd11_code: '1F40.0',
    diagnosis_en: 'Plasmodium Falciparum Malaria',
    diagnosis_ha: 'Zazzabin Cizon Sauro',
    service_type: 'Outpatient PHC',
    billed_amount: '8500'
  });

  const [grievanceForm, setGrievanceForm] = useState({
    beneficiary_id: '2',
    provider_id: '8',
    category: 'drug_stockout',
    title_en: 'Stockout of Essential Antimalarial Drugs at PHC',
    title_ha: 'Rashin Maganin Zazzabin Cizon Sauro a Cibiyar Lafiya',
    description_en: 'Patient with active informal coverage was unable to receive ACT medicines.',
    description_ha: 'Mai inshora ya je asibiti amma ba a bashi maganin zazzabi ba saboda babu a ajiye.',
    sla_hours: 48
  });

  const [diasporaForm, setDiasporaForm] = useState({
    sponsor_name: 'Dr. Kabir Danbaba Gusau',
    sponsor_city: 'London',
    sponsor_country: 'United Kingdom',
    beneficiary_id: '2',
    amount_naira: '12000',
    payment_channel: 'Stripe / Visa Debit',
    message: 'Paying full annual health cover for my sister Amina in Gusau.'
  });

  // Gap Forms
  const [mandateForm, setMandateForm] = useState({
    beneficiary_id: '2',
    channel: 'Telco Airtime (MTN/Airtel)',
    phone_or_account: '08035544112',
    frequency: 'Monthly (₦500)',
    amount_naira: '500'
  });

  const [preauthForm, setPreauthForm] = useState({
    beneficiary_id: '1',
    provider_id: '1',
    procedure_name_en: 'Elective Herniorrhaphy Repair & Mesh Placement',
    procedure_name_ha: 'Tiyatar Gyaran Kabeba da Saka Raga',
    icd11_code: 'DD50.0',
    clinical_priority: 'Urgent (< 24h)',
    estimated_cost: '45000'
  });

  const [bondForm, setBondForm] = useState({
    sponsor_name: 'Dr. Kabir Danbaba Gusau',
    sponsor_city: 'London',
    sponsor_country: 'United Kingdom',
    target_lga_id: '1',
    families_count: '25',
    currency: 'GBP',
    amount_foreign: '160',
    beneficiary_category: 'Pregnant Women & Infants',
    message: 'Sponsoring 25 vulnerable pregnant women and newborns in Gusau for full annual health care.'
  });

  const [capitationForm, setCapitationForm] = useState({
    billing_month_en: 'November 2026',
    billing_month_ha: 'Nuwamba 2026',
    rate_per_enrollee: '500'
  });

  const [rewardForm, setRewardForm] = useState({
    beneficiary_id: '1',
    provider_id: '1',
    milestone_type: 'anc_visit_4',
    delivery_channel: 'airtime_mtn',
    phone_number: '08035544112'
  });

  const t = translations[lang];

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4500);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ha' : 'en';
    setLang(newLang);
    localStorage.setItem('zhims_lang', newLang);
  };

  const getActiveTabMeta = () => {
    switch (activeTab) {
      case 'overview':
        return {
          title: t.tabOverview,
          icon: Activity,
          sub: lang === 'ha' ? 'Cikakken dandalin kididdigar inshorar lafiya a kananan hukumomi 14' : 'Executive metrics, population coverage targets, and financial solvency'
        };
      case 'plans':
        return {
          title: t.tabPlans,
          icon: Shield,
          sub: lang === 'ha' ? 'Rukunonin inshora 6 da tsarin kariya na al\'umma' : 'Multi-tenant benefit packages, co-pays, and segregated financial pools'
        };
      case 'beneficiaries':
        return {
          title: t.tabBeneficiaries,
          icon: Users,
          sub: lang === 'ha' ? 'Rijistar masu cin gajiyar da katin shaida mai lambar sirri' : 'Enrolled citizens registry, biometric NIN validation, and QR digital tokens'
        };
      case 'wallet':
        return {
          title: t.tabWallet,
          icon: CreditCard,
          sub: lang === 'ha' ? 'Asusun ajiya na kudi ta hanyar USSD da POS' : 'Informal sector micro-contributions, POS sweep deposits, and recurring mandates'
        };
      case 'providers':
        return {
          title: t.tabProviders,
          icon: Building2,
          sub: lang === 'ha' ? 'Cibiyoyin lafiya da asibitocin gwamnati a kananan hukumomi' : 'GIS network, primary healthcare centers accreditation, and functionality tiers'
        };
      case 'eligibility':
        return {
          title: t.tabEligibility,
          icon: CheckCircle2,
          sub: lang === 'ha' ? 'Tabbatar da katin mai ciwon a asibiti ta hanyar QR ko NIN' : 'Offline-first QR code scanning and NIN cache verification for rural clinics'
        };
      case 'claims':
        return {
          title: t.tabClaims,
          icon: FileText,
          sub: lang === 'ha' ? 'Biyan kudin asibiti da amincewa ta injin AI' : 'Electronic FHIR R4 claims processing, plan-aware rules, and instant settlement'
        };
      case 'referrals':
        return {
          title: t.tabReferrals,
          icon: HeartHandshake,
          sub: lang === 'ha' ? 'Tura marasa lafiya zuwa manyan asibitoci (FMC Gusau)' : 'Secondary and tertiary surgical referrals with automated clinical transport'
        };
      case 'maternalTele':
        return {
          title: t.tabMaternalTele,
          icon: Baby,
          sub: lang === 'ha' ? 'Kulawar mata masu ciki da kiran likita ta bidiyo' : 'Antenatal care (ANC 1-4+), maternal vouchers, and encrypted tele-consultations'
        };
      case 'grievances':
        return {
          title: t.tabGrievances,
          icon: MessageSquare,
          sub: lang === 'ha' ? 'Korafe-korafe da magance matsalolin marasa lafiya' : 'Citizen grievance logging, drug stockout alerts, and SLA resolution tracking'
        };
      case 'diaspora':
        return {
          title: t.tabDiaspora,
          icon: Gift,
          sub: lang === 'ha' ? 'Tallafin \'yan Zamfara mazauna kasashen waje' : 'Remittance health bonds, family sponsorships, and tax exemption certificates'
        };
      case 'capitation':
        return {
          title: t.tabCapitation,
          icon: Landmark,
          sub: lang === 'ha' ? 'Biyan kudin gudanarwa na asibitocin karkara kafin farkon wata (NIBSS ₦500/mutum)' : 'Automated 1st-of-month advance primary healthcare capitation disbursements across 14 LGAs'
        };
      case 'rewards':
        return {
          title: t.tabRewards,
          icon: Sparkles,
          sub: lang === 'ha' ? 'Ladanin rigakafi: Katin waya (₦200) da kayan abinci mai gina jiki ga mata masu ciki da yara' : 'Vitality-style preventive health incentives: ₦200 airtime top-ups, LLIN mosquito nets & nutritional packs'
        };
      case 'voiceTriage':
        return {
          title: t.tabVoiceTriage,
          icon: Mic,
          sub: lang === 'ha' ? 'Likitan Murya na Harshen Hausa: Sauraron alamomin cuta, fassarar ICD-11, da tura asibiti cikin gaggawa' : 'Multimodal Indigenous Hausa Voice AI: spoken symptom triage, ICD-11 coding, and automated clinical routing'
        };
      case 'benchmark':
        return {
          title: t.tabBenchmark,
          icon: TrendingUp,
          sub: lang === 'ha' ? 'Kwatanta da manyan HMOs na Najeriya da aiwatar da gyare-gyare 1 zuwa 4' : 'Strategic comparison with Hygeia, AXA, Reliance + Active Operational Terminals for Gaps 1-4'
        };
      case 'fhir':
        return {
          title: t.tabFhir,
          icon: Code2,
          sub: lang === 'ha' ? 'Kayan aikin musayar bayanai na kasa da kasa (FHIR R4 / DHIN)' : 'HL7 FHIR R4 JSON resources and federal NHIA interoperability payload'
        };
      case 'fwa':
        return {
          title: t.tabFwa,
          icon: AlertTriangle,
          sub: lang === 'ha' ? 'Kariya daga barna da algush a asibitoci' : 'AI fraud, waste, and abuse sentinel, duplicate claim detection, and outlier audits'
        };
      case 'ussd':
        return {
          title: t.tabUssd,
          icon: PhoneCall,
          sub: lang === 'ha' ? 'Sabis na wayar salula mara intanet (*966#)' : 'Low-bandwidth telecom simulator for basic 2G feature phones across rural wards'
        };
      default:
        return { title: 'Z-HIMS Portal', icon: Activity, sub: 'Zamfara Health Insurance Management System' };
    }
  };

  // Fetch functions
  const fetchOverview = async () => {
    try {
      const res = await fetch('/api/overview');
      setOverview(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/plans');
      setPlans(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLgas = async () => {
    try {
      const res = await fetch('/api/lgas');
      setLgas(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProviders = async () => {
    try {
      const res = await fetch('/api/providers');
      setProviders(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBeneficiaries = async () => {
    try {
      const res = await fetch(`/api/beneficiaries?query=${encodeURIComponent(benSearch)}`);
      const data = await res.json();
      setBeneficiaries(data);
      if (!selectedBen && data.length > 0) {
        setSelectedBen(data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchClaims = async () => {
    try {
      const res = await fetch('/api/claims');
      setClaims(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchReferrals = async () => {
    try {
      const res = await fetch('/api/referrals');
      setReferrals(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFwa = async () => {
    try {
      const res = await fetch('/api/fwa');
      setFwaAlerts(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchGrievances = async () => {
    try {
      const res = await fetch('/api/grievances');
      setGrievances(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTelemedicine = async () => {
    try {
      const res = await fetch('/api/telemedicine');
      setTelemedicine(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMaternal = async () => {
    try {
      const res = await fetch('/api/maternal');
      setMaternal(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDiaspora = async () => {
    try {
      const res = await fetch('/api/diaspora');
      setDiaspora(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMandates = async () => {
    try {
      const res = await fetch('/api/mandates');
      setMandates(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPreauth = async () => {
    try {
      const res = await fetch('/api/preauth');
      setPreauths(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/inventory');
      const data = await res.json();
      setInventory(data.inventory || []);
      setInventoryMetrics(data.metrics || null);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBonds = async () => {
    try {
      const res = await fetch('/api/diaspora/bonds');
      const data = await res.json();
      setBonds(data.bonds || []);
      setBondsMetrics(data.metrics || null);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCapitation = async () => {
    try {
      const res = await fetch('/api/capitation/batches');
      const data = await res.json();
      setCapitationBatches(data.batches || []);
      setCapitationAllocations(data.allocations || []);
      setCapitationMetrics(data.metrics || null);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRewards = async () => {
    try {
      const res = await fetch('/api/rewards');
      const data = await res.json();
      setPreventionRewards(data.rewards || []);
      setRewardsMetrics(data.metrics || null);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTriageSessions = async () => {
    try {
      const res = await fetch('/api/triage/sessions');
      const data = await res.json();
      setVoiceSessions(data.sessions || []);
      setVoiceMetrics(data.metrics || null);
    } catch (e) {
      console.error(e);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([
      fetchOverview(),
      fetchPlans(),
      fetchLgas(),
      fetchProviders(),
      fetchBeneficiaries(),
      fetchClaims(),
      fetchReferrals(),
      fetchFwa(),
      fetchGrievances(),
      fetchTelemedicine(),
      fetchMaternal(),
      fetchDiaspora(),
      fetchMandates(),
      fetchPreauth(),
      fetchInventory(),
      fetchBonds(),
      fetchCapitation(),
      fetchRewards(),
      fetchTriageSessions()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    fetchBeneficiaries();
  }, [benSearch]);

  // Load FHIR Preview
  const loadFhirPreview = async (type, id = '1') => {
    setFhirLoading(true);
    setFhirType(type);
    try {
      const res = await fetch(`/api/fhir/${type}/${id}`);
      const data = await res.json();
      setFhirJson(data);
    } catch (err) {
      setFhirJson({ error: err.message });
    } finally {
      setFhirLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'fhir' && !fhirJson) {
      loadFhirPreview('Patient', '1');
    }
  }, [activeTab]);

  // Handle Beneficiary Enrolment
  const handleEnrolSubmit = async (e) => {
    e.preventDefault();
    if (!enrolForm.nin || enrolForm.nin.length !== 11) {
      alert(lang === 'ha' ? 'Dole ne lambar NIN ta kasance lambobi 11 daidai!' : 'NIN must be exactly 11 numeric digits!');
      return;
    }
    try {
      const res = await fetch('/api/beneficiaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrolForm)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        setEnrolModalOpen(false);
        fetchBeneficiaries();
        fetchOverview();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle Wallet Micro-Savings Deposit
  const handleWalletDeposit = async (e) => {
    e.preventDefault();
    if (!walletBen) return;
    try {
      const res = await fetch(`/api/beneficiaries/${walletBen.id}/wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: walletDeposit.amount,
          channel: walletDeposit.channel,
          notes: `Micro-savings deposit via ${walletDeposit.channel}`
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        setWalletModalOpen(false);
        fetchBeneficiaries();
        fetchOverview();
        if (selectedBen && selectedBen.id === walletBen.id) {
          setSelectedBen({ ...selectedBen, wallet_balance: data.new_balance, premium_status: data.status });
        }
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle Claim Submission
  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claimForm)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        setClaimModalOpen(false);
        fetchClaims();
        fetchOverview();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle Grievance Submission
  const handleGrievanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grievanceForm)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        setGrievanceModalOpen(false);
        fetchGrievances();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle Diaspora Sponsorship
  const handleDiasporaSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/diaspora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diasporaForm)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        setDiasporaModalOpen(false);
        fetchDiaspora();
        fetchBeneficiaries();
        fetchOverview();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle Point-of-Care Eligibility Verification
  const handleVerifyScan = async (e) => {
    if (e) e.preventDefault();
    if (!scanInput.trim()) return;
    setScanLoading(true);
    try {
      const res = await fetch('/api/eligibility/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: scanInput.trim() })
      });
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      setScanResult({ error: err.message });
    } finally {
      setScanLoading(false);
    }
  };

  // Handle Interactive USSD Simulator
  const handleDialUssd = async (initText = '') => {
    setUssdActive(true);
    try {
      const res = await fetch('/api/ussd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: ussdPhone,
          text: initText,
          lang: lang
        })
      });
      const data = await res.json();
      setUssdScreenText(data.response || 'No response from telecom gateway');
    } catch (err) {
      setUssdScreenText('Network Error: Could not reach Zamfara USSD server');
    }
  };

  const handleUssdSubmitInput = (e) => {
    e.preventDefault();
    if (!ussdInput.trim()) return;
    const nextHistory = [...ussdHistory, ussdInput.trim()];
    setUssdHistory(nextHistory);
    const fullText = nextHistory.join('*');
    setUssdInput('');
    handleDialUssd(fullText);
  };

  const resetUssd = () => {
    setUssdHistory([]);
    setUssdInput('');
    handleDialUssd('');
  };

  // Gap 1: Trigger Mandate Charge
  const handleTriggerMandate = async (id) => {
    try {
      const res = await fetch(`/api/mandates/${id}/trigger`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        fetchMandates();
        fetchBeneficiaries();
        fetchOverview();
      } else {
        alert(data.error || 'Failed to trigger charge');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateMandate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/mandates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mandateForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        setMandateModalOpen(false);
        fetchMandates();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Gap 2: Request AI Surgical Pre-Auth
  const handleRequestPreauth = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/preauth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preauthForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        setPreauthModalOpen(false);
        fetchPreauth();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Gap 3: Restock & Delivery
  const handleDispatchTruck = async (id) => {
    try {
      const res = await fetch(`/api/inventory/${id}/dispatch`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        fetchInventory();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirmDelivery = async (id) => {
    try {
      const res = await fetch(`/api/inventory/${id}/confirm-delivery`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        fetchInventory();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Gap 4: Issue Diaspora Remittance Bond
  const handleIssueBond = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/diaspora/bonds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bondForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(lang === 'ha' ? data.message_ha : data.message_en, 'success');
        setBondModalOpen(false);
        fetchBonds();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Toggle Outbreak Emergency Waiver
  const toggleOutbreakProtocol = async (outbreakId, currentActive) => {
    try {
      const res = await fetch('/api/outbreak/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: outbreakId, is_active: !currentActive })
      });
      if (res.ok) {
        showToast(lang === 'ha' ? 'An sabunta tsarin gaggawa na cututtuka!' : 'Outbreak response protocol status updated!', 'success');
        fetchOverview();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Capability 1: Advance Capitation Engine Handler
  const handleGenerateCapitation = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch('/api/capitation/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capitationForm)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(
          lang === 'ha'
            ? `An kirkiri sabon kudin gudanarwa na asibitoci: ${data.batch.batch_ref} (₦${Number(data.batch.total_amount_naira).toLocaleString()})`
            : `Advance capitation batch generated: ${data.batch.batch_ref} (₦${Number(data.batch.total_amount_naira).toLocaleString()})`,
          'success'
        );
        setCapitationModalOpen(false);
        fetchCapitation();
        fetchOverview();
      } else {
        showToast(data.error || 'Failed to generate capitation', 'error');
      }
    } catch (err) {
      showToast('Error connecting to server', 'error');
    }
  };

  // Capability 2: Prevention Rewards Trigger Handler
  const handleTriggerReward = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch('/api/rewards/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rewardForm)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(
          lang === 'ha'
            ? `An bayar da kyautar rigakafi (${data.reward.reward_code}) darajar ₦${Number(data.reward.reward_value_naira).toLocaleString()}!`
            : `Prevention incentive credited (${data.reward.reward_code}) value ₦${Number(data.reward.reward_value_naira).toLocaleString()}!`,
          'success'
        );
        setRewardModalOpen(false);
        fetchRewards();
      } else {
        showToast(data.error || 'Failed to trigger reward', 'error');
      }
    } catch (err) {
      showToast('Error connecting to server', 'error');
    }
  };

  // Capability 3: Multimodal Indigenous Hausa Voice AI Handlers
  const handleSpeakVoiceResponse = (text, language = 'ha') => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ha' ? 'ha-NG' : 'en-NG';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setVoiceSpeaking(true);
      utterance.onend = () => setVoiceSpeaking(false);
      utterance.onerror = () => setVoiceSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  };

  const handleEvaluateVoiceTriage = async (customTranscript, customLang) => {
    const transcript = customTranscript !== undefined ? customTranscript : voiceInput;
    const spokenLang = customLang || voiceLanguage;
    if (!transcript || !transcript.trim()) {
      showToast(lang === 'ha' ? 'Da fatan a yi magana ko rubuta alamomin rashin lafiya' : 'Please speak or enter symptom description', 'error');
      return;
    }
    setVoiceLoading(true);
    try {
      const res = await fetch('/api/triage/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizen_name: voiceCitizenName,
          citizen_phone: voiceCitizenPhone,
          spoken_language: spokenLang,
          transcript: transcript
        })
      });
      const data = await res.json();
      if (res.ok && data.session) {
        setVoiceResult(data);
        showToast(lang === 'ha' ? 'An kammala tantancewar murya ta AI!' : 'AI Voice Triage Completed!', 'success');
        fetchTriageSessions();
        // Play voice audio response
        const speechText = spokenLang === 'ha' ? data.session.ai_clinical_recommendation_ha : data.session.ai_clinical_recommendation_en;
        handleSpeakVoiceResponse(speechText, spokenLang);
      } else {
        showToast(data.error || 'Triage evaluation error', 'error');
      }
    } catch (err) {
      showToast('Failed to connect to AI triage engine', 'error');
    } finally {
      setVoiceLoading(false);
    }
  };

  // World Class Login Page View if not authenticated
  if (!currentUser) {
    return (
      <div className="login-page-wrapper">
        {notification && (
          <div style={{
            position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
            background: notification.type === 'success' ? '#064e3b' : '#991b1b',
            color: 'white', padding: '1rem 1.5rem', borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem',
            border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600
          }}>
            <CheckCircle2 size={20} color="#34d399" />
            <span>{notification.msg}</span>
          </div>
        )}

        {/* Sovereign Government Top Strip */}
        <div className="login-sovereign-header">
          <div className="login-sovereign-badge">
            <span style={{ fontSize: '1.1rem' }}>🇳🇬</span>
            <span>{lang === 'ha' ? 'Hukumar Inshorar Lafiya ta Jihar Zamfara (ZAMCHEMA)' : 'Zamfara State Contributory Healthcare Management Agency (ZAMCHEMA)'}</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ color: '#fbbf24', fontSize: '0.75rem' }}>NHIA Act 2022 Compliant</span>
          </div>

          <button
            className="lang-btn"
            onClick={toggleLang}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 700
            }}
          >
            <Globe size={14} color="#34d399" />
            <span>{lang === 'en' ? 'Harshen Hausa 🇳🇬' : 'English 🇬🇧'}</span>
          </button>
        </div>

        {/* Live Operational Marquee Ticker */}
        <div className="login-ticker-bar">
          <div className="login-ticker-label">
            <span className="live-pulse-dot"></span>
            <span>{t.tickerLiveText || (lang === 'ha' ? 'HALIN AIKI A YANZU' : 'LIVE OPERATIONAL PULSE')}</span>
          </div>
          <div className="login-ticker-track">
            <span className="login-ticker-item">
              <strong>14 LGAs Active</strong> · 174 Accredited PHCs & 1 Specialist Hospital (FMC Gusau)
            </span>
            <span className="login-ticker-item">
              <strong>BHCPF Solvency</strong> · ₦1.4B Equity Backing & Capitation Underwriting
            </span>
            <span className="login-ticker-item">
              <strong>Capitation Protocol</strong> · 1st-of-Month Advance Release to All 14 LGAs
            </span>
            <span className="login-ticker-item">
              <strong>Zero Maternal Out-of-Pocket</strong> · 100% C-Section & Emergency Obstetric Waivers
            </span>
            <span className="login-ticker-item">
              <strong>Indigenous Voice AI</strong> · Dial 0800-ZAMCHEMA for Live Hausa Triage
            </span>
            <span className="login-ticker-item">
              <strong>FHIR R4 Claims</strong> · Real-Time Fraud Sentinel Adjudication
            </span>
            {/* Duplicated track for continuous infinite smooth loop */}
            <span className="login-ticker-item">
              <strong>14 LGAs Active</strong> · 174 Accredited PHCs & 1 Specialist Hospital (FMC Gusau)
            </span>
            <span className="login-ticker-item">
              <strong>BHCPF Solvency</strong> · ₦1.4B Equity Backing & Capitation Underwriting
            </span>
            <span className="login-ticker-item">
              <strong>Capitation Protocol</strong> · 1st-of-Month Advance Release to All 14 LGAs
            </span>
          </div>
        </div>

        <div className="login-card-container">
          {/* Left Brand Showcase & Interactive Multi-Tab Information Deck */}
          <div className="login-left-brand">
            <div>
              {/* Sovereign State Crest & Brand Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.15rem' }}>
                <div
                  className="state-emblem"
                  style={{
                    width: 48,
                    height: 48,
                    fontSize: '1.15rem',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  ZH
                </div>
                <div>
                  <div style={{ fontSize: '1.22rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'white' }}>
                    {t.agencyTitle}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 600 }}>
                    {t.agencySub}
                  </div>
                </div>
              </div>

              {/* Operational Scope Banner */}
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1.15rem', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={16} />
                  <span>{lang === 'ha' ? 'Tsarin Inshorar Lafiya na Bai-Daya' : 'Sovereign Universal Healthcare Portal'}</span>
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4, margin: 0 }}>
                  {lang === 'ha'
                    ? 'Babban dandalin kula da inshorar lafiya a dukkan kananan hukumomi 14 na jihar Zamfara, tare da biyan kudin asibitoci a kan kari da janye kudin tiyata ga mata masu juna biyu.'
                    : 'Universal health coverage across all 14 Zamfara LGAs with statutory 1st-of-month capitation, 100% emergency C-section waivers, and indigenous Hausa voice AI clinical triage.'}
                </p>
              </div>

              {/* Multi-Tab Navigation Pills */}
              <div className="login-tabs-nav">
                <button
                  type="button"
                  className={`login-tab-pill ${loginInfoTab === 'portals' ? 'active' : ''}`}
                  onClick={() => setLoginInfoTab('portals')}
                >
                  <Award size={13} />
                  <span>{t.loginTabPortals || (lang === 'ha' ? 'Shaidun Aiki' : 'Officer Portals')}</span>
                </button>
                <button
                  type="button"
                  className={`login-tab-pill ${loginInfoTab === 'schemes' ? 'active' : ''}`}
                  onClick={() => setLoginInfoTab('schemes')}
                >
                  <Layers size={13} />
                  <span>{t.loginTabSchemes || (lang === 'ha' ? 'Shirye-shiryen Lafiya (6)' : 'Health Plans (6)')}</span>
                </button>
                <button
                  type="button"
                  className={`login-tab-pill ${loginInfoTab === 'lgas' ? 'active' : ''}`}
                  onClick={() => setLoginInfoTab('lgas')}
                >
                  <MapPin size={13} />
                  <span>{t.loginTabLgas || (lang === 'ha' ? 'Kananan Hukumomi 14' : '14 LGAs Network')}</span>
                </button>
                <button
                  type="button"
                  className={`login-tab-pill ${loginInfoTab === 'emergency' ? 'active' : ''}`}
                  onClick={() => setLoginInfoTab('emergency')}
                >
                  <PhoneCall size={13} />
                  <span>{t.loginTabEmergency || (lang === 'ha' ? 'Gaggawa & USSD' : 'Emergency & USSD')}</span>
                </button>
              </div>

              {/* Tab Content 1: Officer Clearance Portals */}
              {loginInfoTab === 'portals' && (
                <div style={{ animation: 'tabFadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Award size={13} />
                      <span>{t.demoRolesTitle}</span>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#a7f3d0', opacity: 0.85 }}>
                      {lang === 'ha' ? 'Shaidun Aiki 5' : '5 Official Profiles'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {demoRoles.map(dr => {
                      const RoleIcon = dr.icon;
                      return (
                        <div
                          key={dr.roleKey}
                          className="demo-role-card"
                          onClick={() => handleLogin(null, dr.identifier, dr.password)}
                          title={`Authenticate session as ${dr.roleName}`}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${dr.color}25`, border: `1px solid ${dr.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <RoleIcon size={15} color={dr.color} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'white' }}>
                                {lang === 'ha' ? dr.roleTitleHa : dr.roleName}
                              </div>
                              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                                {dr.name} · <span style={{ color: '#fbbf24', fontWeight: 700 }}>{dr.badge}</span>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 700, opacity: 0.9 }}>
                              {lang === 'ha' ? 'Shiga' : 'Access'}
                            </span>
                            <ChevronRight size={14} color="#fbbf24" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab Content 2: Multi-Tenant Health Schemes (6 Plans) */}
              {loginInfoTab === 'schemes' && (
                <div style={{ animation: 'tabFadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Layers size={13} />
                      <span>{lang === 'ha' ? 'Shirye-shiryen Inshora 6' : '6 Accredited Health Plans'}</span>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#a7f3d0', opacity: 0.85 }}>
                      NHIA Accredited
                    </span>
                  </div>

                  <div className="login-schemes-grid">
                    {ZAMCHEMA_SCHEMES.map(scheme => (
                      <div key={scheme.id} className="login-scheme-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.78rem', color: '#ffffff' }}>
                            {lang === 'ha' ? scheme.titleHa : scheme.titleEn}
                          </span>
                          <span className="login-scheme-badge" style={{ background: `${scheme.color}35`, color: '#fef08a', border: `1px solid ${scheme.color}60` }}>
                            {scheme.badge}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700, marginBottom: '0.15rem' }}>
                          {lang === 'ha' ? scheme.costHa : scheme.costEn}
                        </div>
                        <div style={{ fontSize: '0.67rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.35 }}>
                          {lang === 'ha' ? scheme.highlightHa : scheme.highlightEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content 3: 14 LGAs Network Matrix */}
              {loginInfoTab === 'lgas' && (
                <div style={{ animation: 'tabFadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={13} />
                      <span>{lang === 'ha' ? 'Kananan Hukumomin Jihar Zamfara' : 'Zamfara Statewide Network'}</span>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#a7f3d0', opacity: 0.85 }}>
                      14 LGAs · 174 PHCs
                    </span>
                  </div>

                  <div className="login-lgas-grid">
                    {ZAMFARA_LGAS.map(lga => (
                      <div key={lga.name} className="login-lga-pill">
                        <div>
                          <span className="lga-name">{lga.name}</span>
                          <span className="lga-hospital">{lga.hospital}</span>
                        </div>
                        <span className="lga-phc-count">{lga.phcs} PHCs</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content 4: 24/7 Emergency & USSD Micro-Savings */}
              {loginInfoTab === 'emergency' && (
                <div style={{ animation: 'tabFadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <PhoneCall size={13} />
                      <span>{lang === 'ha' ? 'Hanyoyin Sadarwa na Gaggawa' : 'Emergency & USSD Channels'}</span>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#a7f3d0', opacity: 0.85 }}>
                      24/7 Dispatch
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '10px', padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fca5a5', fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                        <PhoneCall size={14} color="#f87171" />
                        <span>0800-ZAMCHEMA (Toll-Free 24/7)</span>
                      </div>
                      <div style={{ fontSize: '0.69rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.35 }}>
                        {lang === 'ha'
                          ? 'Kira kyauta don neman motar daukar marasa lafiya, tiyata ta gaggawa, ko bayanin asibitin kusa.'
                          : 'Toll-free hotline for emergency ambulance dispatch, maternal C-section waivers, or hospital navigation.'}
                      </div>
                    </div>

                    <div style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.35)', borderRadius: '10px', padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#93c5fd', fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                        <Zap size={14} color="#60a5fa" />
                        <span>USSD *966# Informal Micro-Savings</span>
                      </div>
                      <div style={{ fontSize: '0.69rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.35 }}>
                        {lang === 'ha'
                          ? 'Danna *966# a kowace waya don duba inshora, adana kudin magani (₦200-₦1,000), da samun katin waya.'
                          : 'Dial *966# on any GSM phone to verify eligibility, deposit wallet savings, and unlock prevention airtime vouchers.'}
                      </div>
                    </div>

                    <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '10px', padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6ee7b7', fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                        <Mic size={14} color="#34d399" />
                        <span>Indigenous Hausa Voice AI Triage</span>
                      </div>
                      <div style={{ fontSize: '0.69rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.35 }}>
                        {lang === 'ha'
                          ? 'Tattaunawa da na’urar AI cikin harshen Hausa don gano cuta da jagorantar mara lafiya.'
                          : 'Speak naturally in Hausa to receive instant symptom assessment and clinic guidance.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Quick Actions Bar */}
              <div className="login-quick-actions-bar">
                <button
                  type="button"
                  className="login-quick-btn"
                  onClick={() => setLoginModal('lgaMap')}
                >
                  <MapPin size={12} color="#34d399" />
                  <span>{t.btnExploreLgas || (lang === 'ha' ? 'Taswirar LGAs 14' : '14 LGAs Network')}</span>
                </button>
                <button
                  type="button"
                  className="login-quick-btn"
                  onClick={() => setLoginModal('emergencyHelp')}
                >
                  <PhoneCall size={12} color="#f87171" />
                  <span>{t.btnEmergencyHelp || (lang === 'ha' ? 'Layin Gaggawa' : 'Emergency Hotline')}</span>
                </button>
                <button
                  type="button"
                  className="login-quick-btn"
                  onClick={() => setLoginModal('ninGuide')}
                >
                  <ShieldCheck size={12} color="#fbbf24" />
                  <span>{t.btnNinHelp || (lang === 'ha' ? 'Neman Lambar NIN' : 'NIN Self-Service')}</span>
                </button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '0.85rem', marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', opacity: 0.85 }}>
              <div>Zamfara State Healthcare Portal</div>
              <div>NHIA Act 2022 Compliant 🇳🇬</div>
            </div>
          </div>

          {/* Right Credentials Sign-in Box - NO HARDCODED CREDENTIALS EXPOSED */}
          <div className="login-right-form">
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#065f46', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                <ShieldCheck size={13} />
                <span>{lang === 'ha' ? 'Hanyar Shiga ta Musamman' : 'Official Gateway Access'}</span>
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                {t.loginTitle}
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', marginBottom: 0 }}>
                {t.loginSub}
              </p>
            </div>

            {loginError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '0.75rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: '1.15rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={14} color="#059669" />
                  <span>{t.fieldIdentifier}</span>
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  style={{ background: '#f8fafc', borderColor: '#cbd5e1', fontSize: '0.88rem', padding: '0.75rem 0.95rem' }}
                  placeholder={t.placeholderIdentifier}
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                    <Lock size={14} color="#059669" />
                    <span>{t.fieldPassword}</span>
                  </label>
                </div>
                <div className="login-input-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="form-input"
                    style={{ background: '#f8fafc', borderColor: '#cbd5e1', fontSize: '0.88rem', padding: '0.75rem 2.5rem 0.75rem 0.95rem' }}
                    placeholder={t.placeholderPassword}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Assistance Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.78rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#475569', cursor: 'pointer', margin: 0, fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: '#059669', width: '15px', height: '15px' }}
                  />
                  <span>{t.rememberMeLabel}</span>
                </label>
                <span style={{ color: '#059669', fontWeight: 700, cursor: 'pointer' }} onClick={() => setLoginModal('emergencyHelp')}>
                  {t.helpSupport}
                </span>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)'
                }}
              >
                {loginLoading ? (
                  <span>{lang === 'ha' ? 'Ana tabbatar da shiga...' : 'Authenticating clearance...'}</span>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>{t.btnLogin}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Citizen NIN Info Card (CLEAN, NO EXPOSED PASSWORDS) */}
            <div className="citizen-nin-card" style={{ cursor: 'pointer' }} onClick={() => setLoginModal('ninGuide')}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 800, color: '#0f172a' }}>
                  <span style={{ fontSize: '0.95rem' }}>🇳🇬</span>
                  <span>{t.citizenNinHeader}</span>
                </div>
                <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700 }}>
                  {lang === 'ha' ? 'Koyi Yadda Ake Yi →' : 'Learn How →'}
                </span>
              </div>
              <div style={{ fontSize: '0.73rem', color: '#64748b', lineHeight: 1.4 }}>
                {t.citizenNinDesc}
              </div>
            </div>

            {/* Bottom Security Footer */}
            <div className="login-footer-security">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Lock size={12} color="#059669" />
                <span>256-bit TLS Encrypted</span>
              </span>
              <span>•</span>
              <span>Sovereign Datastore</span>
              <span>•</span>
              <span>NDPA 2023 Compliant</span>
            </div>
          </div>
        </div>

        {/* Sovereign Multi-Column Institutional Footer */}
        <footer className="login-page-footer">
          <div className="login-footer-grid">
            {/* Col 1: Agency Brand & Mandate */}
            <div className="login-footer-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
                <div className="state-emblem" style={{ width: 36, height: 36, fontSize: '0.95rem' }}>
                  ZH
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                    {t.agencyTitle}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 600 }}>
                    ZAMCHEMA · State Headquarters, Gusau
                  </div>
                </div>
              </div>
              <p className="login-footer-text">
                {t.footerAgencyMandate}
              </p>
              <div className="login-compliance-tags">
                <span className="login-compliance-tag">
                  <ShieldCheck size={11} />
                  <span>NHIA Act 2022</span>
                </span>
                <span className="login-compliance-tag">
                  <Lock size={11} />
                  <span>NDPA 2023</span>
                </span>
                <span className="login-compliance-tag">
                  <Code2 size={11} />
                  <span>HL7® FHIR® R4</span>
                </span>
              </div>
            </div>

            {/* Col 2: Emergency & Critical Care */}
            <div className="login-footer-col">
              <div className="login-footer-heading">
                <PhoneCall size={14} color="#f87171" />
                <span>{t.footerEmergencyTitle}</span>
              </div>
              <div className="login-footer-links-list">
                <button
                  type="button"
                  className="login-footer-link"
                  onClick={() => setLoginModal('emergencyHelp')}
                  style={{ fontWeight: 800, color: '#fca5a5' }}
                >
                  <PhoneCall size={13} color="#f87171" />
                  <span>{t.footerTollFree}</span>
                </button>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '0.35rem' }}>
                  {t.footerEmergencySub}
                </div>
                <button
                  type="button"
                  className="login-footer-link"
                  onClick={() => setLoginModal('emergencyHelp')}
                >
                  <Building2 size={13} color="#60a5fa" />
                  <span>{t.footerFmcGusau}</span>
                </button>
                <div className="login-footer-link" style={{ cursor: 'default' }}>
                  <Zap size={13} color="#fbbf24" />
                  <span>{t.footerUssdChannel}</span>
                </div>
              </div>
            </div>

            {/* Col 3: Citizen Services & Direct Links */}
            <div className="login-footer-col">
              <div className="login-footer-heading">
                <Layers size={14} color="#34d399" />
                <span>{t.footerQuickLinksTitle}</span>
              </div>
              <div className="login-footer-links-list">
                <button
                  type="button"
                  className="login-footer-link"
                  onClick={() => setLoginModal('lgaMap')}
                >
                  <ChevronRight size={13} color="#34d399" />
                  <span>{t.footerLgaNetworkLink}</span>
                </button>
                <button
                  type="button"
                  className="login-footer-link"
                  onClick={() => setLoginModal('ninGuide')}
                >
                  <ChevronRight size={13} color="#34d399" />
                  <span>{t.footerNinVerifyLink}</span>
                </button>
                <button
                  type="button"
                  className="login-footer-link"
                  onClick={() => setLoginInfoTab('schemes')}
                >
                  <ChevronRight size={13} color="#34d399" />
                  <span>{t.footerSchemesLink}</span>
                </button>
                <button
                  type="button"
                  className="login-footer-link"
                  onClick={() => showToast(lang === 'ha' ? 'Nemi tallafin riga-kafi a kowace cibiyar PHC mai aiki' : 'Claim prevention nutrition voucher at your designated PHC center', 'info')}
                >
                  <ChevronRight size={13} color="#34d399" />
                  <span>{t.footerRewardsLink}</span>
                </button>
              </div>
            </div>

            {/* Col 4: Governance & Legal Standards */}
            <div className="login-footer-col">
              <div className="login-footer-heading">
                <Landmark size={14} color="#a7f3d0" />
                <span>{t.footerGovernanceTitle}</span>
              </div>
              <p className="login-footer-text" style={{ marginBottom: '0.45rem' }}>
                <MapPin size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />
                <span>{t.footerHqAddress}</span>
              </p>
              <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.35rem' }}>
                {t.footerLawCompliance}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                {t.footerDataProtection}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.65rem', fontSize: '0.7rem', color: '#34d399' }}>
                <span className="live-pulse-dot" style={{ width: 6, height: 6 }}></span>
                <span>{t.footerUptimeSla}</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Sub-Footer Legal & Sovereign Row */}
        <div className="login-page-subfooter">
          <div>{t.footerCopyright}</div>
          <div className="login-subfooter-links">
            <button
              type="button"
              className="login-subfooter-link"
              onClick={() => showToast(lang === 'ha' ? 'Kariyar Bayanan Sirri: An kiyaye daidai da dokar NDPA 2023 ta Najeriya' : 'Data Privacy: Certified compliant under Nigeria Data Protection Act (NDPA) 2023', 'info')}
            >
              {t.footerPrivacy}
            </button>
            <span>•</span>
            <button
              type="button"
              className="login-subfooter-link"
              onClick={() => showToast(lang === 'ha' ? 'Ka\'idojin Shiga: Wannan tsarin gwamnati ne don ma\'aikata da al\'ummar Zamfara' : 'Terms of Access: Authorized portal for Zamfara healthcare stakeholders and citizens', 'info')}
            >
              {t.footerTerms}
            </button>
            <span>•</span>
            <button
              type="button"
              className="login-subfooter-link"
              onClick={() => showToast(lang === 'ha' ? 'Hakkokin Mara Lafiya: Samun magani da kulawa ba tare da tsangwama ko biyan kudi ba ga masu shirin BHCPF' : 'Citizen Charter: Guaranteeing dignified, fee-waived care for all vulnerable enrollees', 'info')}
            >
              {t.footerCharter}
            </button>
            <span>•</span>
            <button
              type="button"
              className="login-subfooter-link"
              onClick={() => setLoginModal('emergencyHelp')}
              style={{ color: '#fca5a5' }}
            >
              {t.footerWhistleblower}
            </button>
          </div>
          <div style={{ color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>{t.footerSovereignty}</span>
          </div>
        </div>

        {/* Modal 1: 14 LGAs Operational Healthcare Network */}
        {loginModal === 'lgaMap' && (
          <div className="modal-overlay" onClick={() => setLoginModal(null)}>
            <div className="modal-content" style={{ maxWidth: '780px', width: '92%' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#065f46', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                    <MapPin size={13} />
                    <span>{lang === 'ha' ? 'Cibiyoyin Kula da Lafiya a Jiha' : 'Statewide Healthcare Coverage Matrix'}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    {lang === 'ha' ? 'Kananan Hukumomi 14 na Jihar Zamfara' : '14 Local Government Areas of Zamfara State'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
                    {lang === 'ha'
                      ? 'Dukkan kananan hukumomin jihar Zamfara suna da cibiyoyin kiwon lafiya na farko (PHCs) da asibitin kwararru don karbar majinyata.'
                      : 'Comprehensive coverage across all 14 LGAs with accredited primary healthcare centers and referral hospitals.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLoginModal(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '9999px', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={16} color="#64748b" />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', maxHeight: '55vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {ZAMFARA_LGAS.map((lga, idx) => (
                  <div key={lga.name} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>
                        {idx + 1}. {lga.name}
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                        {lga.phcs} PHCs
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginBottom: '0.2rem' }}>
                      {lga.type}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      <strong>Referral:</strong> {lga.hospital}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1.25rem', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Total: <strong>14 LGAs · 174 Accredited Primary Health Centres</strong>
                </span>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setLoginModal(null)}
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: '10px' }}
                >
                  {lang === 'ha' ? 'Rufe' : 'Close Matrix'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2: 24/7 Emergency Dispatch & Hotline */}
        {loginModal === 'emergencyHelp' && (
          <div className="modal-overlay" onClick={() => setLoginModal(null)}>
            <div className="modal-content" style={{ maxWidth: '640px', width: '92%' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#fee2e2', color: '#991b1b', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                    <PhoneCall size={13} />
                    <span>{lang === 'ha' ? 'Layin Taimako na Gaggawa' : 'Emergency & Rapid Response Helpdesk'}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    {lang === 'ha' ? 'Taimakon Gaggawa na ZAMCHEMA 24/7' : 'ZAMCHEMA 24/7 Emergency Assistance'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
                    {lang === 'ha'
                      ? 'Layin kira kyauta da lambobin sadarwa na gaggawa ga dukkan al\'ummar jihar Zamfara.'
                      : 'Toll-free hotlines, maternal emergency escalations, and technical IT support.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLoginModal(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '9999px', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={16} color="#64748b" />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#991b1b' }}>
                      0800-ZAMCHEMA (Toll-Free 24/7)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#4b5563', marginTop: '0.15rem' }}>
                      {lang === 'ha'
                        ? 'Kira kyauta daga kowace layin salula (MTN, Airtel, Glo, 9mobile) don gaggawar tiyata, hadari, ko motar asibiti.'
                        : 'Free toll-free call from any mobile network for trauma dispatch, emergency C-section waivers, or hospital verification.'}
                    </div>
                  </div>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e40af' }}>
                      Federal Medical Centre (FMC) Gusau Emergency Trauma Desk
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#4b5563', marginTop: '0.15rem' }}>
                      Hotline: <strong>+234 803 554 4112</strong> · Direct Tertiary Referral Adjudication Unit
                    </div>
                  </div>
                </div>

                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#065f46' }}>
                      USSD Offline Service: *966#
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#4b5563', marginTop: '0.15rem' }}>
                      {lang === 'ha'
                        ? 'Danna *966# a kowace karamar waya ba tare da bukatar data ko intanet ba.'
                        : 'Dial *966# on any basic phone without internet or smartphone requirement.'}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1.25rem', paddingTop: '0.85rem', textAlign: 'right' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setLoginModal(null)}
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: '10px' }}
                >
                  {lang === 'ha' ? 'An Fahimta' : 'Understood'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 3: Citizen NIN Self-Service Guide */}
        {loginModal === 'ninGuide' && (
          <div className="modal-overlay" onClick={() => setLoginModal(null)}>
            <div className="modal-content" style={{ maxWidth: '640px', width: '92%' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                    <ShieldCheck size={13} />
                    <span>{lang === 'ha' ? 'Hanyar Rijista da Duba Shaidar NIN' : 'Citizen NIN Verification Guide'}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    {lang === 'ha' ? 'Yadda Zaka Shiga da Lambar NIN (11)' : 'How to Access Portal with 11-digit NIN'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
                    {lang === 'ha'
                      ? 'Dukkan dan jihar Zamfara mai lambar NIN yana da damar duba matsayin inshorar lafiyarsa.'
                      : 'All citizens in Zamfara can check their health cover, wallet balance, and benefits with their National Identification Number.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLoginModal(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '9999px', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={16} color="#64748b" />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '0.85rem', borderRadius: '10px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                    1
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                    <strong>{lang === 'ha' ? 'Shigar da Lambar NIN:' : 'Enter 11-Digit NIN:'}</strong> {lang === 'ha' ? 'Sanya lambar NIN din ku mai lambobi 11 a akwatin farko.' : 'Type your 11-digit National Identity Number into the identifier box.'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '0.85rem', borderRadius: '10px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                    2
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                    <strong>{lang === 'ha' ? 'Kalmar Sirri ta Farko:' : 'Security Clearance Password:'}</strong> {lang === 'ha' ? 'Yi amfani da kalmar sirrinku ko danna alamar "Mai Cin Gajiya (Mai Lambar NIN)" a gefen hagu don shiga kai tsaye.' : 'Use your security password, or click the "Enrolled Citizen (NIN)" profile on the left for direct access.'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '0.85rem', borderRadius: '10px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                    3
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                    <strong>{lang === 'ha' ? 'Hanyar USSD *966#:' : 'Alternative USSD *966#:'}</strong> {lang === 'ha' ? 'Idan ba ka da wayar intanet, danna *966# daga lambar wayarka mai rajista don duba matsayin inshora nan take.' : 'If you do not have internet access, dial *966# from your registered phone to verify insurance eligibility instantly.'}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1.25rem', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  ZAMCHEMA Citizen Protection Unit
                </span>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setLoginModal(null)}
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderRadius: '10px' }}
                >
                  {lang === 'ha' ? 'An Fahimta' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentTabMeta = getActiveTabMeta();
  const TabIcon = currentTabMeta.icon;

  const navGroups = [
    {
      title: t.navGroupCore,
      items: [
        { id: 'overview', label: t.tabOverview, icon: Activity },
        { id: 'plans', label: t.tabPlans, icon: Shield, badge: '6 Plans' },
        { id: 'beneficiaries', label: t.tabBeneficiaries, icon: Users },
        { id: 'wallet', label: t.tabWallet, icon: CreditCard },
        { id: 'capitation', label: t.tabCapitation, icon: Landmark, badge: 'Advance 1st' }
      ]
    },
    {
      title: t.navGroupClinical,
      items: [
        { id: 'providers', label: t.tabProviders, icon: Building2, badge: '14 LGAs' },
        { id: 'eligibility', label: t.tabEligibility, icon: CheckCircle2 },
        { id: 'claims', label: t.tabClaims, icon: FileText },
        { id: 'referrals', label: t.tabReferrals, icon: HeartHandshake },
        { id: 'maternalTele', label: t.tabMaternalTele, icon: Baby },
        { id: 'rewards', label: t.tabRewards, icon: Sparkles, badge: '₦200 Rewards' }
      ]
    },
    {
      title: t.navGroupOversight,
      items: [
        { id: 'benchmark', label: t.tabBenchmark, icon: TrendingUp, badge: 'Gaps 1-4' },
        { id: 'grievances', label: t.tabGrievances, icon: MessageSquare },
        { id: 'diaspora', label: t.tabDiaspora, icon: Gift },
        { id: 'fwa', label: t.tabFwa, icon: AlertTriangle }
      ]
    },
    {
      title: t.navGroupTech,
      items: [
        { id: 'voiceTriage', label: t.tabVoiceTriage, icon: Mic, badge: 'Hausa AI' },
        { id: 'fhir', label: t.tabFhir, icon: Code2, badge: 'R4 JSON' },
        { id: 'ussd', label: t.tabUssd, icon: PhoneCall, badge: '*966#' }
      ]
    }
  ];

  const currentRoleConfig = ROLE_CONFIGS[currentUser?.role] || ROLE_CONFIGS.executive_admin;
  const allowedTabs = currentRoleConfig.allowedTabs || [];
  const filteredNavGroups = navGroups
    .map(g => ({ ...g, items: g.items.filter(item => allowedTabs.includes(item.id)) }))
    .filter(g => g.items.length > 0);

  return (
    <div className="app-shell">
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          background: notification.type === 'success' ? '#064e3b' : '#991b1b',
          color: 'white', padding: '1rem 1.5rem', borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem',
          border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600
        }}>
          <CheckCircle2 size={20} color="#34d399" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MODERN ENTERPRISE LEFT SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Brand Header */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-emblem" title="Zamfara State Coat of Arms">
            ZH
          </div>
          <div className="sidebar-brand-text">
            <h2>
              <span>Z-HIMS</span>
              <span style={{ fontSize: '0.62rem', background: '#d97706', color: '#043625', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 800 }}>STATE</span>
            </h2>
            <p>ZAMCHEMA · Gusau</p>
          </div>
        </div>

        {/* Live Outbreak Emergency Status in Sidebar (If Active) */}
        {overview?.outbreakActive && (
          <div className="sidebar-status-box">
            <div className="sidebar-pill sidebar-pill-outbreak" onClick={() => setOutbreakModalOpen(true)} title="Click to view outbreak protocol">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={12} color="#ef4444" />
                <span>{t.emergencyWaiverBadge}</span>
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>100% Free</span>
            </div>
          </div>
        )}

        {/* Sidebar Nav Items (Filtered by Role Clearance) */}
        <nav className="sidebar-nav">
          {filteredNavGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <div className="sidebar-section-header">
                <span>{group.title}</span>
              </div>
              {group.items.map(item => {
                const ItemIcon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <ItemIcon size={16} color={isActive ? '#10b981' : '#a7f3d0'} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="sidebar-item-badge">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Current User Footer - Revamped Profile Card */}
        {currentUser && (
          <div className="sidebar-user-card">
            <div
              className="sidebar-profile-box"
              onClick={() => setProfileModalOpen(true)}
              title={t.btnViewProfile}
            >
              <div className="sidebar-user-row">
                <div
                  className="sidebar-user-avatar"
                  style={{
                    border: `2px solid ${currentRoleConfig.color}`,
                    background: `${currentRoleConfig.color}25`,
                    color: currentRoleConfig.color
                  }}
                >
                  {currentUser.full_name?.charAt(0) || 'U'}
                </div>
                <div className="sidebar-user-info">
                  <span className="sidebar-user-name" title={currentUser.full_name}>
                    {currentUser.full_name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.1rem' }}>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        color: currentRoleConfig.color,
                        background: `${currentRoleConfig.color}25`,
                        padding: '0.05rem 0.35rem',
                        borderRadius: '4px'
                      }}
                    >
                      {currentRoleConfig.badge}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                      {lang === 'ha' ? currentRoleConfig.roleTitleHa : currentRoleConfig.roleName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="sidebar-clearance-tag">
                <ShieldCheck size={12} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {lang === 'ha' ? currentRoleConfig.clearanceLevelHa : currentRoleConfig.clearanceLevel}
                </span>
              </div>
            </div>

            <button
              className="sidebar-view-profile-btn"
              onClick={() => setProfileModalOpen(true)}
            >
              <UserCheck size={13} />
              <span>{t.btnViewProfile}</span>
            </button>

            <div className="sidebar-user-actions">
              <button
                onClick={handleLogout}
                style={{
                  flex: 1,
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#fca5a5',
                  borderRadius: '6px',
                  padding: '0.35rem 0.5rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem'
                }}
              >
                <LogOut size={12} />
                <span>{t.btnLogout}</span>
              </button>
              <button
                onClick={toggleLang}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}
                title="Toggle Language"
              >
                <Globe size={12} />
                <span>{lang === 'en' ? 'HA' : 'EN'}</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN WRAPPER */}
      <div className="main-wrapper">
        {/* SLEEK TOP NAVBAR */}
        <header className="top-navbar">
          <div className="navbar-left">
            <button className="nav-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)} title="Toggle Navigation Sidebar">
              <Menu size={20} />
            </button>
            <div className="page-context-box">
              <h2>
                <TabIcon size={20} color="#047857" />
                <span>{currentTabMeta.title}</span>
              </h2>
              <p>{currentTabMeta.sub}</p>
            </div>
          </div>

          <div className="navbar-right">
            {overview?.outbreakActive && (
              <button
                className="btn-gold"
                onClick={() => setOutbreakModalOpen(true)}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <AlertTriangle size={14} />
                <span>{t.btnToggleOutbreak}</span>
              </button>
            )}

            <button className="lang-btn" onClick={toggleLang}>
              <Globe size={15} color="#047857" />
              <span>{lang === 'en' ? 'Harshen Hausa 🇳🇬' : 'English 🇬🇧'}</span>
            </button>

            {/* Profile Pill Trigger Button */}
            {currentUser && (
              <button
                className="profile-pill-btn"
                onClick={() => setProfileModalOpen(true)}
                title={t.profileModalTitle}
              >
                <div
                  className="profile-pill-avatar"
                  style={{
                    border: `2px solid ${currentRoleConfig.color}`,
                    background: `${currentRoleConfig.color}25`,
                    color: currentRoleConfig.color
                  }}
                >
                  {currentUser.full_name?.charAt(0) || 'U'}
                </div>
                <div className="profile-pill-text">
                  <span className="profile-pill-name">{currentUser.full_name?.split(' ')[0]}</span>
                  <span
                    className="profile-pill-badge"
                    style={{ background: `${currentRoleConfig.color}20`, color: currentRoleConfig.color }}
                  >
                    {currentRoleConfig.badge}
                  </span>
                </div>
                <ChevronRight size={14} style={{ transform: 'rotate(90deg)', opacity: 0.6 }} />
              </button>
            )}
          </div>
        </header>

        {/* OUTBREAK EMERGENCY TICKER (IF ACTIVE) */}
        {overview?.outbreakActive && (
          <div className="emergency-banner">
            <div className="emergency-banner-inner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                <span>{t.outbreakAlert}</span>
              </div>
              <button
                onClick={() => setOutbreakModalOpen(true)}
                style={{ background: 'white', color: '#991b1b', border: 'none', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              >
                {t.btnToggleOutbreak}
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="main-content">
        {!allowedTabs.includes(activeTab) ? (
          <div className="restricted-role-guard animate-fade-in">
            <div className="restricted-guard-card">
              <div
                className="restricted-guard-icon"
                style={{
                  background: `${currentRoleConfig.color}15`,
                  color: currentRoleConfig.color,
                  borderColor: `${currentRoleConfig.color}40`
                }}
              >
                <Lock size={34} />
              </div>

              <h3>{t.roleRestrictedNotice}</h3>
              <p>{t.roleRestrictedNoticeSub}</p>

              <div className="restricted-guard-details">
                <div className="restricted-meta-row">
                  <span>{lang === 'ha' ? 'Shaidar Aiki:' : 'Active Credential:'}</span>
                  <strong style={{ color: currentRoleConfig.color }}>
                    {lang === 'ha' ? currentRoleConfig.roleTitleHa : currentRoleConfig.roleName} ({currentRoleConfig.badge})
                  </strong>
                </div>
                <div className="restricted-meta-row">
                  <span>{t.clearanceLevelLabel}:</span>
                  <strong>{lang === 'ha' ? currentRoleConfig.clearanceLevelHa : currentRoleConfig.clearanceLevel}</strong>
                </div>
                <div className="restricted-meta-row">
                  <span>{t.dutyPostLabel}:</span>
                  <strong>{currentRoleConfig.dutyPost}</strong>
                </div>
                <div className="restricted-meta-row">
                  <span>{t.jurisdictionLabel}:</span>
                  <strong>{currentRoleConfig.jurisdiction}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  onClick={() => setActiveTab(currentRoleConfig.primaryTab)}
                  style={{
                    background: currentRoleConfig.color,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.6rem 1.25rem'
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>
                    {lang === 'ha'
                      ? `Koma Dandalin ${currentRoleConfig.roleName}`
                      : `Open Authorized ${currentRoleConfig.roleName} Dashboard`}
                  </span>
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setProfileModalOpen(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.6rem 1.25rem' }}
                >
                  <UserCheck size={16} />
                  <span>{t.btnViewProfile}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* BHCPF Progress Banner */}
            <div className="bhcpf-banner-card">
              <div className="bhcpf-header">
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{t.bhcpfProgressTitle}</h2>
                  <p style={{ opacity: 0.9, fontSize: '0.88rem' }}>{t.bhcpfProgressDesc}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24' }}>
                    {overview?.bhcpf?.percentage}%
                  </span>
                  <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>Statewide BHCPF Reach</div>
                </div>
              </div>

              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${overview?.bhcpf?.percentage || 12}%` }}></div>
              </div>

              <div className="bhcpf-stats-row">
                <div>
                  <span style={{ opacity: 0.8 }}>{t.metricBhcpfCurrent}: </span>
                  <strong>{overview?.bhcpf?.enrolled?.toLocaleString()}</strong>
                </div>
                <div>
                  <span style={{ opacity: 0.8 }}>{t.metricBhcpfTarget}: </span>
                  <strong>{overview?.bhcpf?.target?.toLocaleString()}</strong>
                </div>
                <div>
                  <span style={{ opacity: 0.8 }}>{t.metricBhcpfGap}: </span>
                  <strong style={{ color: '#fca5a5' }}>{overview?.bhcpf?.gap?.toLocaleString()} unreached</strong>
                </div>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">{t.metricTotalEnrollees}</span>
                  <div className="kpi-icon green"><Users size={22} /></div>
                </div>
                <div className="kpi-value">{overview?.beneficiaries?.total || 7}</div>
                <div className="kpi-sub">
                  <Check size={14} color="#059669" />
                  <span>{overview?.beneficiaries?.active || 6} with active valid cover</span>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">{t.metricBilledNaira}</span>
                  <div className="kpi-icon gold"><CreditCard size={22} /></div>
                </div>
                <div className="kpi-value">₦{parseFloat(overview?.claims?.totalBilledNaira || 123700).toLocaleString()}</div>
                <div className="kpi-sub">
                  <span>Approved: ₦{parseFloat(overview?.claims?.totalApprovedNaira || 123700).toLocaleString()}</span>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">{t.metricAutoRate}</span>
                  <div className="kpi-icon blue"><CheckCircle2 size={22} /></div>
                </div>
                <div className="kpi-value">{overview?.claims?.autoApprovedRate}%</div>
                <div className="kpi-sub">
                  <span>FHIR R4 Clean Adjudication</span>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">{t.metricFunctionalPhcs}</span>
                  <div className="kpi-icon green"><Building2 size={22} /></div>
                </div>
                <div className="kpi-value">{overview?.infrastructure?.functionalPhcs} / {overview?.infrastructure?.totalPhcs}</div>
                <div className="kpi-sub">
                  <span>{overview?.infrastructure?.functionalityRate}% operational across 14 LGAs</span>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-label">{t.metricFwaSavings}</span>
                  <div className="kpi-icon red"><AlertTriangle size={22} /></div>
                </div>
                <div className="kpi-value">₦{parseFloat(overview?.fwa?.potentialSavingsNaira || 270500).toLocaleString()}</div>
                <div className="kpi-sub">
                  <span>{overview?.fwa?.activeFlags} flagged anomalies deterred</span>
                </div>
              </div>
            </div>

            {/* Quick Operations & 14 LGAs Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
              <div className="section-card">
                <div className="section-header">
                  <div>
                    <h3 className="section-title"><Shield size={18} color="#059669" /> Quick Operations</h3>
                    <p className="section-desc">Key clinical and financial actions for state officers and facilities</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <button className="btn-primary" onClick={() => setEnrolModalOpen(true)}>
                    <PlusCircle size={16} /> {t.btnEnrolNew}
                  </button>
                  <button className="btn-gold" onClick={() => setClaimModalOpen(true)}>
                    <FileText size={16} /> {t.btnSubmitClaim}
                  </button>
                  <button className="btn-secondary" onClick={() => setGrievanceModalOpen(true)}>
                    <MessageSquare size={16} /> {t.btnLodgeGrievance}
                  </button>
                  <button className="btn-secondary" onClick={() => setDiasporaModalOpen(true)}>
                    <Gift size={16} /> {t.btnSponsorFamily}
                  </button>
                </div>
              </div>

              <div className="section-card">
                <div className="section-header">
                  <div>
                    <h3 className="section-title"><MapPin size={18} color="#059669" /> Zamfara 14 LGAs Summary</h3>
                    <p className="section-desc">Coverage and functional PHC distribution</p>
                  </div>
                </div>
                <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>LGA</th>
                        <th>BHCPF Enrolled</th>
                        <th>Target</th>
                        <th>PHCs (Active/Total)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lgas.slice(0, 7).map(l => (
                        <tr key={l.id}>
                          <td><strong>{l.name}</strong></td>
                          <td>{l.bhcpf_enrolled.toLocaleString()}</td>
                          <td>{l.bhcpf_target.toLocaleString()}</td>
                          <td>{l.functional_phcs} / {l.total_phcs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CORE HEALTH PLANS (6) */}
        {activeTab === 'plans' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><Shield size={20} color="#059669" /> {t.plansSectionTitle}</h2>
                  <p className="section-desc">{t.plansSectionDesc}</p>
                </div>
              </div>

              <div className="plans-grid">
                {plans.map(p => (
                  <div key={p.id} className="plan-card">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                          {p.code}
                        </span>
                        <span className="badge-status active">Active</span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.6rem 0 0.2rem 0', color: '#0f172a' }}>
                        {lang === 'ha' ? p.name_ha : p.name_en}
                      </h3>
                      <div className="plan-price-tag">
                        {p.code === 'informal' && '₦12,000 / year'}
                        {p.code === 'formal' && '5% Payroll Split'}
                        {p.code === 'equity' && '₦0 (State Equity 1%)'}
                        {p.code === 'retirees' && '₦3,500 / month'}
                        {p.code === 'bhcpf' && '₦0 (Grant / 1% CRF)'}
                        {p.code === 'students' && '₦5,000 / session'}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem' }}>
                        <strong>{lang === 'ha' ? 'Hanyar Kudin:' : 'Funding Model:'}</strong> {lang === 'ha' ? p.funding_model_ha : p.funding_model_en}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem' }}>
                        <strong>{lang === 'ha' ? 'Wadanda suka dace:' : 'Target Population:'}</strong> {lang === 'ha' ? p.target_population_ha : p.target_population_en}
                      </p>
                      <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#334155' }}>
                        <strong>{lang === 'ha' ? 'Kunshin Magani:' : 'Benefit Scope:'}</strong> {lang === 'ha' ? p.benefit_scope_ha : p.benefit_scope_en}
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Co-pay: {p.copayment_rate * 100}%
                      </span>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        onClick={() => {
                          setEnrolForm({ ...enrolForm, plan_id: p.id });
                          setEnrolModalOpen(true);
                        }}
                      >
                        Enrol Beneficiary <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BENEFICIARIES & DIGITAL ID */}
        {activeTab === 'beneficiaries' && (
          <div className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
              <div className="section-card">
                <div className="section-header">
                  <div>
                    <h2 className="section-title"><Users size={20} color="#059669" /> {t.tabBeneficiaries}</h2>
                    <p className="section-desc">Search verified NIN identity registry</p>
                  </div>
                  <button className="btn-primary" onClick={() => setEnrolModalOpen(true)}>
                    <PlusCircle size={16} /> {t.btnEnrolNew}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '11px', color: '#94a3b8' }} />
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: '32px', width: '100%' }}
                      placeholder="Search by NIN, Name, Card ID, Phone..."
                      value={benSearch}
                      onChange={(e) => setBenSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Card ID / Name</th>
                        <th>NIN</th>
                        <th>Plan</th>
                        <th>LGA</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beneficiaries.map(b => (
                        <tr 
                          key={b.id} 
                          style={{ cursor: 'pointer', background: selectedBen?.id === b.id ? '#ecfdf5' : 'inherit' }}
                          onClick={() => setSelectedBen(b)}
                        >
                          <td>
                            <strong>{b.full_name}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.card_number}</div>
                          </td>
                          <td style={{ fontFamily: 'monospace' }}>{b.nin}</td>
                          <td>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                              {lang === 'ha' ? b.plan_name_ha : b.plan_name_en}
                            </span>
                          </td>
                          <td>{b.lga_name}</td>
                          <td>
                            <span className={`badge-status ${b.premium_status === 'active' ? 'active' : b.premium_status === 'pending_wallet_target' ? 'pending' : 'exempt'}`}>
                              {b.premium_status === 'active' ? 'Active' : b.premium_status === 'pending_wallet_target' ? 'Saving' : 'Subsidised'}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn-secondary" 
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setWalletBen(b);
                                setWalletModalOpen(true);
                              }}
                            >
                              Wallet
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedBen && (
                <div className="section-card">
                  <div className="section-header">
                    <h3 className="section-title"><Sparkles size={18} color="#d97706" /> Digital Z-HIMS Health Card</h3>
                    <button className="btn-secondary" onClick={() => window.print()} style={{ fontSize: '0.78rem' }}>
                      {t.btnPrintCard}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div className="digital-id-card">
                      <div className="card-top">
                        <div>
                          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fbbf24', fontWeight: 800 }}>
                            ZAMFARA STATE GOVERNMENT · Z-HIMS
                          </div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                            {lang === 'ha' ? selectedBen.plan_name_ha : selectedBen.plan_name_en}
                          </div>
                        </div>
                        <div className="card-chip"></div>
                      </div>

                      <div className="card-body-row">
                        <div className="card-photo-avatar">
                          {selectedBen.gender === 'Female' ? '🧕' : '👨'}
                        </div>
                        <div className="card-details">
                          <div className="card-patient-name">{selectedBen.full_name}</div>
                          <div className="card-meta-text">
                            DOB: {selectedBen.dob?.toString().substring(0, 10)} · {selectedBen.gender}
                          </div>
                          <div className="card-meta-text">
                            LGA: {selectedBen.lga_name} ({selectedBen.ward})
                          </div>
                          <div className="card-nin-badge">
                            NIN: {selectedBen.nin}
                          </div>
                        </div>
                      </div>

                      <div className="card-bottom">
                        <div>
                          <div style={{ fontSize: '0.65rem', color: '#a7f3d0' }}>CARD NUMBER</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 800, fontFamily: 'monospace' }}>
                            {selectedBen.card_number}
                          </div>
                        </div>
                        <div style={{ background: 'white', padding: '4px', borderRadius: '6px' }}>
                          <QRCodeSVG value={selectedBen.qr_token || selectedBen.card_number} size={54} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>
                      Household & Micro-Savings Info
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <div><span style={{ color: '#64748b' }}>Phone:</span> <strong>{selectedBen.phone}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Status:</span> <strong>{selectedBen.premium_status}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Wallet Balance:</span> <strong>₦{parseFloat(selectedBen.wallet_balance || 0).toLocaleString()}</strong></div>
                      <div><span style={{ color: '#64748b' }}>Annual Target:</span> <strong>₦{parseFloat(selectedBen.wallet_target || 12000).toLocaleString()}</strong></div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <button 
                        className="btn-gold" 
                        style={{ width: '100%' }}
                        onClick={() => {
                          setWalletBen(selectedBen);
                          setWalletModalOpen(true);
                        }}
                      >
                        <CreditCard size={16} /> Deposit Savings into Wallet (₦500 - ₦12,000)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: NAIRA SAVINGS WALLET */}
        {activeTab === 'wallet' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><CreditCard size={20} color="#d97706" /> {t.tabWallet} (Micro-Premiums)</h2>
                  <p className="section-desc">
                    Enabling rural farmers, market traders and artisans to accumulate the ₦12,000 informal premium through daily ₦500 micro-instalments via USSD and POS agents.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '1.25rem', borderRadius: '12px' }}>
                  <h4 style={{ fontWeight: 800, color: '#92400e', marginBottom: '0.5rem' }}>₦12,000 Individual Target</h4>
                  <p style={{ fontSize: '0.85rem', color: '#78350f' }}>
                    Informal workers can pay ₦500, ₦1,000, or flexible amounts anytime. As soon as the balance reaches ₦12,000, the system automatically activates 365 days of comprehensive hospital care!
                  </p>
                </div>
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.25rem', borderRadius: '12px' }}>
                  <h4 style={{ fontWeight: 800, color: '#065f46', marginBottom: '0.5rem' }}>₦50,000 Family Tier</h4>
                  <p style={{ fontSize: '0.85rem', color: '#064e3b' }}>
                    Covers principal spouse plus up to 4 children (or polygynous wives). Full annual financial protection preventing catastrophic medical impoverishment.
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Active Informal Sector Savers</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Beneficiary</th>
                      <th>LGA</th>
                      <th>Wallet Saved</th>
                      <th>Target</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiaries.filter(b => b.plan_code === 'informal' || b.wallet_balance > 0).map(b => {
                      const balance = parseFloat(b.wallet_balance);
                      const target = parseFloat(b.wallet_target || 12000);
                      const pct = Math.min(100, ((balance / target) * 100)).toFixed(0);
                      return (
                        <tr key={b.id}>
                          <td>
                            <strong>{b.full_name}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.card_number}</div>
                          </td>
                          <td>{b.lga_name}</td>
                          <td style={{ fontWeight: 800, color: '#047857' }}>₦{balance.toLocaleString()}</td>
                          <td>₦{target.toLocaleString()}</td>
                          <td style={{ minWidth: '140px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{ flex: 1, background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${pct}%`, background: '#10b981', height: '100%' }}></div>
                              </div>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{pct}%</span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge-status ${b.premium_status === 'active' ? 'active' : 'pending'}`}>
                              {b.premium_status === 'active' ? 'Active Cover' : 'Saving...'}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn-gold" 
                              style={{ padding: '0.3rem 0.7rem', fontSize: '0.75rem' }}
                              onClick={() => {
                                setWalletBen(b);
                                setWalletModalOpen(true);
                              }}
                            >
                              + Deposit Naira
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 14 LGAS & FACILITIES MAPPING */}
        {activeTab === 'providers' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><Building2 size={20} color="#059669" /> {t.facilitiesSectionTitle}</h2>
                  <p className="section-desc">{t.facilitiesSectionDesc}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select 
                    className="form-select" 
                    value={lgaFilter} 
                    onChange={(e) => setLgaFilter(e.target.value)}
                    style={{ fontSize: '0.85rem' }}
                  >
                    <option value="">All 14 Zamfara LGAs</option>
                    {lgas.map(l => (
                      <option key={l.id} value={l.id}>{l.name} ({l.functional_phcs}/{l.total_phcs} PHCs)</option>
                    ))}
                  </select>

                  <select
                    className="form-select"
                    value={facilityFilter}
                    onChange={(e) => setFacilityFilter(e.target.value)}
                    style={{ fontSize: '0.85rem' }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="functional">Functional Facilities Only (~200)</option>
                    <option value="non_functional">Non-Functional (Renovation Needed)</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Facility Code</th>
                      <th>Facility Name</th>
                      <th>LGA</th>
                      <th>Tier</th>
                      <th>Functionality Status</th>
                      <th>Accredited Plans</th>
                      <th>Edge Node (Offline)</th>
                      <th>MDCN/PCN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers
                      .filter(p => !lgaFilter || p.lga_id.toString() === lgaFilter)
                      .filter(p => facilityFilter === 'all' ? true : facilityFilter === 'functional' ? p.is_functional === 1 : p.is_functional === 0)
                      .map(p => (
                        <tr key={p.id}>
                          <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.facility_code}</td>
                          <td>
                            <strong>{p.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.address}</div>
                          </td>
                          <td>{p.lga_name}</td>
                          <td style={{ textTransform: 'capitalize' }}>{p.tier.replace('_', ' ')}</td>
                          <td>
                            <span className={`badge-status ${p.is_functional ? 'active' : 'flagged'}`}>
                              {p.is_functional ? 'Operational' : 'Non-Functional'}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.75rem' }}>{p.accredited_plans}</td>
                          <td>
                            <span style={{ color: p.has_edge_node ? '#059669' : '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>
                              {p.has_edge_node ? 'Yes (Edge Node Active)' : 'Cloud Direct'}
                            </span>
                          </td>
                          <td>
                            {p.mdcn_pcn_verified ? <Check size={16} color="#059669" /> : <X size={16} color="#dc2626" />}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CLAIMS & ADJUDICATION */}
        {activeTab === 'claims' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><FileText size={20} color="#059669" /> {t.claimsSectionTitle}</h2>
                  <p className="section-desc">{t.claimsSectionDesc}</p>
                </div>
                <button className="btn-primary" onClick={() => setClaimModalOpen(true)}>
                  <PlusCircle size={16} /> {t.btnSubmitClaim}
                </button>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Claim Number</th>
                      <th>Patient</th>
                      <th>Facility</th>
                      <th>Plan</th>
                      <th>Billed (₦)</th>
                      <th>Approved (₦)</th>
                      <th>Status</th>
                      <th>Adjudication Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map(c => (
                      <tr key={c.id}>
                        <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{c.claim_number}</td>
                        <td>
                          <strong>{c.patient_name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.card_number}</div>
                        </td>
                        <td>{c.provider_name}</td>
                        <td>{lang === 'ha' ? c.plan_name_ha : c.plan_name_en}</td>
                        <td>₦{parseFloat(c.billed_amount).toLocaleString()}</td>
                        <td style={{ fontWeight: 800, color: '#047857' }}>₦{parseFloat(c.approved_amount).toLocaleString()}</td>
                        <td>
                          <span className={`badge-status ${c.adjudication_status === 'auto_approved' ? 'active' : c.adjudication_status === 'pre_authorized' ? 'preauth' : 'flagged'}`}>
                            {c.adjudication_status}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: '#475569', maxWidth: '280px' }}>
                          {c.adjudication_rule_note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: POINT-OF-CARE ELIGIBILITY */}
        {activeTab === 'eligibility' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><CheckCircle2 size={20} color="#059669" /> {t.pocTitle}</h2>
                  <p className="section-desc">{t.pocDesc}</p>
                </div>
              </div>

              <div style={{ maxWidth: '650px', margin: '0 auto', background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <form onSubmit={handleVerifyScan} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ flex: 1, fontFamily: 'monospace' }}
                    placeholder="Scan QR token, Card ID, or enter 11-digit NIN..."
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                  />
                  <button type="submit" className="btn-primary" disabled={scanLoading}>
                    {scanLoading ? <RefreshCw className="animate-spin" size={16} /> : <Search size={16} />}
                    {t.btnVerifyIdentity}
                  </button>
                </form>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem', fontSize: '0.78rem' }}>
                  <span style={{ color: '#64748b' }}>Quick Test Identifiers:</span>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                    onClick={() => { setScanInput('23419082341'); }}
                  >
                    NIN: 23419082341 (Formal)
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                    onClick={() => { setScanInput('45678912302'); }}
                  >
                    NIN: 45678912302 (Equity IDP)
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                    onClick={() => { setScanInput('90123456704'); }}
                  >
                    NIN: 90123456704 (BHCPF Zurmi)
                  </button>
                </div>

                {scanResult && (
                  <div style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    {scanResult.verified ? (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857', background: '#d1fae5', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                              VERIFIED IDENTITY
                            </span>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.25rem' }}>
                              {scanResult.beneficiary.full_name}
                            </h3>
                          </div>
                          <span className={`badge-status ${scanResult.eligible ? 'active' : 'pending'}`}>
                            {scanResult.eligible ? 'Eligible for Treatment' : 'Coverage Pending Target'}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                          <div><strong>Card ID:</strong> {scanResult.beneficiary.card_number}</div>
                          <div><strong>NIN:</strong> {scanResult.beneficiary.nin}</div>
                          <div><strong>Plan:</strong> {lang === 'ha' ? scanResult.beneficiary.plan_name_ha : scanResult.beneficiary.plan_name_en}</div>
                          <div><strong>LGA:</strong> {scanResult.beneficiary.lga}</div>
                          <div><strong>Applicable Copay:</strong> {scanResult.beneficiary.copayment_rate * 100}%</div>
                          <div><strong>Status:</strong> {scanResult.beneficiary.premium_status}</div>
                        </div>

                        {scanResult.outbreak_waiver && (
                          <div style={{ marginTop: '1rem', background: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: '8px', color: '#991b1b', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={18} />
                            <span>{lang === 'ha' ? scanResult.outbreak_waiver.notice_ha : scanResult.outbreak_waiver.notice_en}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={18} />
                        <span>{lang === 'ha' ? scanResult.message_ha : scanResult.message_en}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: CARE & REFERRALS */}
        {activeTab === 'referrals' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><HeartHandshake size={20} color="#059669" /> Closed-Loop Referrals</h2>
                  <p className="section-desc">Digital coordination connecting rural PHCs to General Hospitals and FMC Gusau Specialist Centre</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Referral Code</th>
                      <th>Patient</th>
                      <th>From Facility</th>
                      <th>To Specialist Centre</th>
                      <th>Clinical Indication</th>
                      <th>Urgency</th>
                      <th>Closed-Loop Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map(r => (
                      <tr key={r.id}>
                        <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{r.referral_code}</td>
                        <td>
                          <strong>{r.patient_name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.card_number}</div>
                        </td>
                        <td>{r.from_provider_name}</td>
                        <td><strong>{r.to_provider_name}</strong></td>
                        <td style={{ maxWidth: '280px', fontSize: '0.82rem' }}>{r.clinical_reason}</td>
                        <td>
                          <span className={`badge-status ${r.urgency === 'Maternal Emergency' ? 'flagged' : 'pending'}`}>
                            {r.urgency}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 600 }}>
                            {r.outcome_status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: MATERNAL TRACKING & TELEMEDICINE */}
        {activeTab === 'maternalTele' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><Baby size={20} color="#059669" /> {t.maternalSectionTitle}</h2>
                  <p className="section-desc">{t.maternalSectionDesc}</p>
                </div>
              </div>

              {/* Maternal Milestones Table */}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Active Antenatal Care (ANC 1-4+) Registry</h3>
              <div className="table-responsive" style={{ marginBottom: '1.5rem' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Mother / Card ID</th>
                      <th>LGA</th>
                      <th>Estimated Delivery</th>
                      <th>ANC 1</th>
                      <th>ANC 2</th>
                      <th>ANC 3</th>
                      <th>ANC 4+ (Target)</th>
                      <th>Tetanus Toxoid</th>
                      <th>Risk Classification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maternal.map(m => (
                      <tr key={m.id}>
                        <td>
                          <strong>{m.mother_name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.card_number}</div>
                        </td>
                        <td>{m.lga_name}</td>
                        <td style={{ fontWeight: 700 }}>{m.edd?.toString().substring(0, 10)}</td>
                        <td>{m.anc1_completed ? <CheckCircle size={16} color="#059669" /> : 'Pending'}</td>
                        <td>{m.anc2_completed ? <CheckCircle size={16} color="#059669" /> : 'Pending'}</td>
                        <td>{m.anc3_completed ? <CheckCircle size={16} color="#059669" /> : 'Pending'}</td>
                        <td>{m.anc4_completed ? <CheckCircle size={16} color="#059669" /> : 'Pending'}</td>
                        <td>{m.tetanus_toxoid ? 'Administered' : 'Needed'}</td>
                        <td>
                          <span className={`badge-status ${m.risk_category.includes('High') ? 'flagged' : 'active'}`}>
                            {m.risk_category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Specialist Telemedicine Session Feed */}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Remote Specialist Tele-Consultation Queue</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                {telemedicine.map(tl => (
                  <div key={tl.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', background: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {tl.session_code}
                      </span>
                      <span className="badge-status active">{tl.status}</span>
                    </div>

                    <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                      {tl.specialty}: {tl.patient_name}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      <strong>Rural PHC:</strong> {tl.phc_name} ➔ <strong>Specialist:</strong> {tl.specialist_name}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: '#334155', background: 'white', padding: '0.65rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <strong>Directive:</strong> {tl.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: GRIEVANCES & REDRESS */}
        {activeTab === 'grievances' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><MessageSquare size={20} color="#059669" /> {t.grievancesSectionTitle}</h2>
                  <p className="section-desc">{t.grievancesSectionDesc}</p>
                </div>
                <button className="btn-primary" onClick={() => setGrievanceModalOpen(true)}>
                  <PlusCircle size={16} /> {t.btnLodgeGrievance}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
                {grievances.map(g => (
                  <div key={g.id} style={{ border: '1px solid #fed7aa', borderRadius: '12px', padding: '1.25rem', background: '#fffaf0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 800, color: '#c2410c' }}>
                        {g.ticket_number}
                      </span>
                      <span className={`badge-status ${g.status === 'resolved' ? 'active' : 'pending'}`}>
                        {g.status.toUpperCase()} (SLA: {g.sla_hours}h)
                      </span>
                    </div>

                    <h4 style={{ fontWeight: 800, color: '#7c2d12', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                      {lang === 'ha' ? g.title_ha : g.title_en}
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: '#431407', marginBottom: '0.75rem' }}>
                      {lang === 'ha' ? g.description_ha : g.description_en}
                    </p>

                    {g.resolution_notes && (
                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.6rem', borderRadius: '6px', fontSize: '0.78rem', color: '#064e3b' }}>
                        <strong>Resolution Note:</strong> {g.resolution_notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: DIASPORA PREMIUM SPONSORSHIP */}
        {activeTab === 'diaspora' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><Gift size={20} color="#d97706" /> {t.diasporaSectionTitle}</h2>
                  <p className="section-desc">{t.diasporaSectionDesc}</p>
                </div>
                <button className="btn-gold" onClick={() => setDiasporaModalOpen(true)}>
                  <Gift size={16} /> Sponsor an Enrollee (Naira)
                </button>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Sponsor Name</th>
                      <th>Location</th>
                      <th>Beneficiary Sponsored</th>
                      <th>LGA</th>
                      <th>Amount (₦)</th>
                      <th>Payment Channel</th>
                      <th>Personal Dedication Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diaspora.map(d => (
                      <tr key={d.id}>
                        <td><strong>{d.sponsor_name}</strong></td>
                        <td>{d.sponsor_city}, {d.sponsor_country}</td>
                        <td>
                          <strong>{d.recipient_name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{d.card_number}</div>
                        </td>
                        <td>{d.recipient_lga}</td>
                        <td style={{ fontWeight: 800, color: '#047857' }}>₦{parseFloat(d.amount_naira).toLocaleString()}</td>
                        <td>{d.payment_channel}</td>
                        <td style={{ fontSize: '0.8rem', fontStyle: 'italic', maxWidth: '280px' }}>
                          "{d.message}"
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: FHIR R4 / DHIN INTEROP INSPECTOR */}
        {activeTab === 'fhir' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><Code2 size={20} color="#2563eb" /> {t.fhirSectionTitle}</h2>
                  <p className="section-desc">{t.fhirSectionDesc}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className={fhirType === 'Patient' ? 'btn-primary' : 'btn-secondary'}
                    onClick={() => loadFhirPreview('Patient', '1')}
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
                  >
                    Patient/ZHIMS-1
                  </button>
                  <button 
                    className={fhirType === 'Claim' ? 'btn-primary' : 'btn-secondary'}
                    onClick={() => loadFhirPreview('Claim', '1')}
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
                  >
                    Claim/ZHIMS-CLM-1
                  </button>
                </div>
              </div>

              <div style={{ background: '#0f172a', color: '#38bdf8', borderRadius: '12px', padding: '1.25rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', maxHeight: '420px', overflowY: 'auto' }}>
                {fhirLoading ? (
                  <div style={{ color: 'white' }}>Serializing HL7 FHIR R4 JSON schema...</div>
                ) : (
                  <pre>{JSON.stringify(fhirJson, null, 2)}</pre>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 13: FWA FRAUD SENTINEL */}
        {activeTab === 'fwa' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><AlertTriangle size={20} color="#dc2626" /> {t.tabFwa}</h2>
                  <p className="section-desc">
                    Statistical and automated rules detecting duplicate billing, upcoding, and phantom beneficiaries on subsidised registers.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {fwaAlerts.map(f => (
                  <div key={f.id} style={{ border: '1px solid #fee2e2', borderRadius: '12px', padding: '1.25rem', background: '#fff5f5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#dc2626', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {f.severity} SEVERITY
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991b1b' }}>
                        Saving: ₦{parseFloat(f.potential_saving).toLocaleString()}
                      </span>
                    </div>

                    <h4 style={{ fontWeight: 800, color: '#7f1d1d', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                      {lang === 'ha' ? f.title_ha : f.title_en}
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: '#450a0a', marginBottom: '0.75rem' }}>
                      {lang === 'ha' ? f.details_ha : f.details_en}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#7f1d1d' }}>
                      <span>Ref: {f.entity_ref}</span>
                      <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>{f.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 14: FEATURE-PHONE USSD SIMULATOR */}
        {activeTab === 'ussd' && (
          <div className="animate-fade-in">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2 className="section-title"><PhoneCall size={20} color="#059669" /> {t.ussdSimTitle}</h2>
                  <p className="section-desc">{t.ussdSimDesc}</p>
                </div>
              </div>

              <div className="ussd-simulator-shell">
                <div className="ussd-screen">
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#166534', borderBottom: '1px dashed #166534', paddingBottom: '2px', marginBottom: '6px' }}>
                      MTN-NG / AIRTEL · 2G SIGNAL [OK]
                    </div>
                    {ussdActive ? (
                      <div style={{ whiteSpace: 'pre-wrap', fontWeight: 600 }}>{ussdScreenText}</div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 800 }}>DIAL *966#</div>
                        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Zamfara Contributory Health Shortcode</div>
                      </div>
                    )}
                  </div>

                  {ussdActive && (
                    <form onSubmit={handleUssdSubmitInput} style={{ marginTop: '0.75rem' }}>
                      <input
                        type="text"
                        style={{ width: '100%', background: 'rgba(0,0,0,0.1)', border: '1px solid #166534', padding: '0.35rem', fontFamily: 'inherit', fontWeight: 800 }}
                        placeholder="Reply (e.g. 1, 2, or NIN)..."
                        value={ussdInput}
                        onChange={(e) => setUssdInput(e.target.value)}
                        autoFocus
                      />
                    </form>
                  )}
                </div>

                <div className="ussd-keypad">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(k => (
                    <button key={k} className="ussd-key" onClick={() => setUssdInput(prev => prev + k)}>
                      {k}
                    </button>
                  ))}
                  <button className="ussd-key ussd-action-key" style={{ background: '#15803d' }} onClick={() => handleDialUssd('')}>
                    {t.ussdDial}
                  </button>
                  <button className="ussd-key ussd-action-key" style={{ background: '#b45309' }} onClick={resetUssd}>
                    RESET
                  </button>
                  <button className="ussd-key ussd-action-key" style={{ background: '#b91c1c' }} onClick={() => { setUssdActive(false); setUssdHistory([]); setUssdInput(''); }}>
                    {t.ussdCancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: NIGERIA HMO BENCHMARK & COMPARATIVE GAP ANALYSIS */}
        {activeTab === 'benchmark' && (
          <div className="animate-fade-in">
            {/* Hero Header */}
            <div className="section-card" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', color: 'white', border: '1px solid #059669' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ maxWidth: '780px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    <TrendingUp size={14} />
                    <span>STRATEGIC HEALTH INSURANCE BENCHMARK</span>
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', margin: '0 0 0.5rem 0' }}>
                    {t.benchmarkSectionTitle}
                  </h2>
                  <p style={{ fontSize: '0.88rem', opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
                    {t.benchmarkSectionDesc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.08)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#34d399' }}>6</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Evaluated Schemes</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fbbf24' }}>10</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Core Dimensions</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8' }}>4</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Strategic Action Plans</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scheme Profile Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="benchmark-card highlight">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 900, color: '#065f46', fontSize: '1.05rem' }}>Z-HIMS (Zamfara)</span>
                  <span className="gap-pill superior">Social Health Scheme</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  State-backed statutory scheme engineered for rural equity, insecurity resilience, offline edge nodes, Hausa parity, and ₦500 micro-savings.
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>
                  Rate: ₦12,000/yr (₦0 for Indigent Equity)
                </div>
              </div>

              <div className="benchmark-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 900, color: '#0f172a', fontSize: '1.05rem' }}>Hygeia HMO</span>
                  <span className="gap-pill commercial-lead">Private Corporate</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  Nigeria’s pioneer commercial HMO (founded 1986). Market leader in corporate employee medical benefits, executive tiers, and private tertiary networks.
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af' }}>
                  Rate: ₦35,000 – ₦250,000+ per individual/yr
                </div>
              </div>

              <div className="benchmark-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 900, color: '#0f172a', fontSize: '1.05rem' }}>AXA Mansard Health</span>
                  <span className="gap-pill commercial-lead">Multi-National Tier</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  Commercial powerhouse backed by AXA Group. Strong corporate underwriting, wellness perks, optical/dental luxury packages, and travel emergency.
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af' }}>
                  Rate: ₦45,000 – ₦400,000+ per individual/yr
                </div>
              </div>

              <div className="benchmark-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 900, color: '#0f172a', fontSize: '1.05rem' }}>Reliance HMO</span>
                  <span className="gap-pill commercial-lead">Digital-First Startup</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  Venture-backed telemedicine HMO with seamless iOS/Android consumer apps, AI symptoms chat, monthly recurring debit card payments, and SME focus.
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af' }}>
                  Rate: ₦38,000 – ₦180,000/yr (or monthly card debit)
                </div>
              </div>

              <div className="benchmark-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 900, color: '#0f172a', fontSize: '1.05rem' }}>LASHMA (Ilera Eko)</span>
                  <span className="gap-pill parity">Lagos State Agency</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  Lagos State Social Health Authority. Large urban informal market cluster enrolment, formal civil service deductions, and private partner clinics.
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e' }}>
                  Rate: ₦8,500/yr (₦40,000/family of 6)
                </div>
              </div>

              <div className="benchmark-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 900, color: '#0f172a', fontSize: '1.05rem' }}>KICHMA (Kano)</span>
                  <span className="gap-pill parity">Northern SHIA Peer</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  Kano State Contributory Healthcare Agency. Northern socio-cultural alignment, Islamic Zakat fund health co-financing, and public sector workforce.
                </p>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e' }}>
                  Rate: ₦12,000/yr (₦0 for indigent)
                </div>
              </div>
            </div>

            {/* Comprehensive Comparative Matrix Table */}
            <div className="section-card" style={{ marginBottom: '1.5rem' }}>
              <div className="section-header">
                <div>
                  <h3 className="section-title">
                    <BarChart3 size={20} color="#059669" />
                    <span>Head-to-Head Architectural & Operational Matrix</span>
                  </h3>
                  <p className="section-desc">
                    Comparative assessment of Z-HIMS vs Nigerian health insurance operators across core public health and commercial dimensions.
                  </p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '18%' }}>Capability / Dimension</th>
                      <th style={{ width: '22%', background: '#ecfdf5', color: '#064e3b' }}>Z-HIMS (Zamfara State)</th>
                      <th style={{ width: '16%' }}>Hygeia & AXA Mansard</th>
                      <th style={{ width: '15%' }}>Reliance HMO</th>
                      <th style={{ width: '15%' }}>LASHMA & KICHMA</th>
                      <th style={{ width: '14%' }}>Comparative Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Target Demographic & Social Equity</strong></td>
                      <td style={{ background: '#f0fdf4' }}>
                        <strong>Universal (All 14 LGAs):</strong> Formal employees, informal rural farmers, IDPs, and vulnerable citizens via ₦0 Equity Plan.
                      </td>
                      <td>
                        <strong>Affluent & Corporate:</strong> Blue-chip corporate workforces, mid-to-high net worth individuals in urban cities.
                      </td>
                      <td>
                        <strong>SMEs & Tech Youth:</strong> Digitally connected urban individuals, remote knowledge workers, startups.
                      </td>
                      <td>
                        <strong>State Citizens:</strong> Public civil servants and informal market associations in Lagos and Kano.
                      </td>
                      <td>
                        <span className="gap-pill superior">Z-HIMS Superior (Pro-Poor)</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Offline / Insecurity Resilience</strong></td>
                      <td style={{ background: '#f0fdf4' }}>
                        <strong>Edge Node Caching:</strong> Offline QR token validation & 2G USSD (*966#) operational in conflict-impacted rural wards.
                      </td>
                      <td>
                        <strong>Cloud-Dependent:</strong> 100% reliant on high-speed internet. Complete blackout in offline rural clinics.
                      </td>
                      <td>
                        <strong>App-Centric:</strong> Requires 4G/LTE smartphone connection; zero offline terminal capability.
                      </td>
                      <td>
                        <strong>Mixed:</strong> Central web portals with high timeout rates during peak hospital congestion.
                      </td>
                      <td>
                        <span className="gap-pill superior">Z-HIMS Industry Leader</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Linguistic & Cultural Localization</strong></td>
                      <td style={{ background: '#f0fdf4' }}>
                        <strong>100% Dual Parity:</strong> Full Hausa & English translation, localized ICD-11 vernacular diagnosis, voice USSD prompts.
                      </td>
                      <td>
                        <strong>English Only:</strong> Strictly English documentation and customer care; literacy barrier for informal artisans.
                      </td>
                      <td>
                        <strong>English Only:</strong> English mobile UI; no indigenous language support.
                      </td>
                      <td>
                        <strong>Partial:</strong> English portals with secondary Yoruba/Hausa public flyers.
                      </td>
                      <td>
                        <span className="gap-pill superior">Z-HIMS Superior</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Household & Polygynous Architecture</strong></td>
                      <td style={{ background: '#f0fdf4' }}>
                        <strong>Culturally Tailored:</strong> Models multi-wife households, extended orphans, and seasonal family dependents seamlessly.
                      </td>
                      <td>
                        <strong>Rigid Nuclear Limit:</strong> Strictly 1 Principal + 1 Spouse + 4 Children. Additional wives require separate full-cost policies.
                      </td>
                      <td>
                        <strong>Nuclear Constraint:</strong> Western individual or nuclear model only.
                      </td>
                      <td>
                        <strong>Nuclear Default:</strong> 1+1+4 baseline with manual administrative fee per extra child.
                      </td>
                      <td>
                        <span className="gap-pill superior">Z-HIMS Superior Fit</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Emergency Outbreak Response Mode</strong></td>
                      <td style={{ background: '#f0fdf4' }}>
                        <strong>Statutory Waiver:</strong> Automatic 100% emergency fee waiver for cholera IV fluids, malnutrition, and C-sections.
                      </td>
                      <td>
                        <strong>Exclusion Clauses:</strong> Standard commercial policies explicitly exclude epidemic, pandemic, or civil strife emergencies.
                      </td>
                      <td>
                        <strong>Exclusion Clauses:</strong> Epidemic public emergencies referred to public government isolation centres.
                      </td>
                      <td>
                        <strong>Ad-Hoc:</strong> Managed through separate state emergency taskforce interventions.
                      </td>
                      <td>
                        <span className="gap-pill superior">Z-HIMS State Sovereign</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Pricing & Micro-Savings Flexibility</strong></td>
                      <td style={{ background: '#f0fdf4' }}>
                        <strong>₦12,000/yr Informal:</strong> Micro-instalments of ₦500 via USSD wallet savings towards full annual coverage.
                      </td>
                      <td>
                        <strong>₦35,000 – ₦250,000+:</strong> Lump sum or quarterly payments with commercial banking surcharges.
                      </td>
                      <td>
                        <strong>₦38,000 – ₦180,000:</strong> Monthly card billing (₦3,500/mo) but requires active bank card.
                      </td>
                      <td>
                        <strong>₦8,500 – ₦12,000:</strong> Annual or bi-annual lump-sum payment through tax or market collectors.
                      </td>
                      <td>
                        <span className="gap-pill superior">Z-HIMS High Inclusivity</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>BHCPF & Federal DHIN Interoperability</strong></td>
                      <td style={{ background: '#f0fdf4' }}>
                        <strong>Direct Gateway:</strong> Native tracking of Basic Minimum Package (14,505 ➔ 133,923 target) + HL7 FHIR R4 JSON schemas.
                      </td>
                      <td>
                        <strong>Non-Participating:</strong> Commercial HMOs do not administer federal equity grants or public BHCPF funds.
                      </td>
                      <td>
                        <strong>Non-Participating:</strong> Purely commercial private underwriter.
                      </td>
                      <td>
                        <strong>Connected:</strong> State gateways integrated with federal NHIA reporting.
                      </td>
                      <td>
                        <span className="gap-pill superior">Z-HIMS Public Standard</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Corporate Luxury Perks & Global Cover</strong></td>
                      <td style={{ background: '#fef2f2' }}>
                        <strong>Basic Minimum Package:</strong> Focuses on life-saving essential interventions, not luxury executive executive retreats.
                      </td>
                      <td>
                        <strong>Market Leader:</strong> Global travel medical assistance, dental crowns, designer optical frames, executive private suites.
                      </td>
                      <td>
                        <strong>Strong:</strong> Modern lifestyle discounts, gym memberships, telehealth mental wellness counseling.
                      </td>
                      <td>
                        <strong>Basic:</strong> Standard ward accommodation in general hospitals.
                      </td>
                      <td>
                        <span className="gap-pill commercial-lead">Commercial HMO Advantage</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Consumer Mobile App & AI Triage</strong></td>
                      <td style={{ background: '#fef2f2' }}>
                        <strong>Responsive Web & USSD:</strong> Optimized for low-bandwidth web and 2G basic feature-phones (*966#).
                      </td>
                      <td>
                        <strong>Enterprise App:</strong> Mature native mobile apps with biometric claims tracking and clinic finders.
                      </td>
                      <td>
                        <strong>Best-in-Class:</strong> Slick consumer fintech UX, 24/7 in-app doctor chat, instant digital medication delivery.
                      </td>
                      <td>
                        <strong>Mobile Web:</strong> Informational web portal with basic enrolment forms.
                      </td>
                      <td>
                        <span className="gap-pill commercial-lead">Reliance HMO Advantage</span>
                      </td>
                    </tr>

                    <tr>
                      <td><strong>Payment Gateways & Direct Debit</strong></td>
                      <td style={{ background: '#fef2f2' }}>
                        <strong>USSD, POS & Telco Airtime:</strong> Focuses on cash-in at local agent POS, USSD micro-wallet (*966#), Telco Airtime micro-billing, and Diaspora Remittance portal.
                      </td>
                      <td>
                        <strong>Enterprise ACH:</strong> Multi-bank corporate payroll deductions, corporate direct debit, credit cards.
                      </td>
                      <td>
                        <strong>Automated Card Debit:</strong> Tokenized card charges, automated recurring renewals without manual intervention.
                      </td>
                      <td>
                        <strong>State Payment Gateway:</strong> Remita, Lagos Pay, commercial bank branch teller deposits.
                      </td>
                      <td>
                        <span className="gap-pill commercial-lead">Commercial HMO Advantage</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strategic Gaps & 4 Actionable Roadmap Plans */}
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h3 className="section-title">
                    <AlertTriangle size={20} color="#d97706" />
                    <span>Identified Gaps for Z-HIMS & Strategic Leapfrog Action Plan</span>
                  </h3>
                  <p className="section-desc">
                    Targeted initiatives to eliminate commercial HMO advantages while extending Zamfara’s universal social protection.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '6px', background: '#d97706', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>1</div>
                    <h4 style={{ fontWeight: 800, color: '#92400e', margin: 0, fontSize: '0.95rem' }}>Automated Recurring Micro-Debit</h4>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#b45309', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Gap: Reliance HMO has superior automated card renewals.
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.4, margin: 0 }}>
                    <strong>Action Plan:</strong> Partner with NIBSS (Nigeria Inter-Bank Settlement System) and telecom operators (MTN/Airtel) to enable automatic ₦500/month airtime micro-deductions directly from beneficiary phones, eliminating physical cash collection overheads.
                  </p>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '6px', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>2</div>
                    <h4 style={{ fontWeight: 800, color: '#1e40af', margin: 0, fontSize: '0.95rem' }}>Real-Time Pre-Auth AI Turnaround</h4>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Gap: AXA and Hygeia approve surgical admissions in &lt; 60 minutes.
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#1e3a8a', lineHeight: 1.4, margin: 0 }}>
                    <strong>Action Plan:</strong> Train the Z-HIMS adjudication engine with ICD-11 protocol boundaries so standard secondary referrals (e.g. C-Sections at FMC Gusau or appendectomies) auto-authorize in &lt; 5 minutes with zero manual auditor bottleneck.
                  </p>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '6px', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>3</div>
                    <h4 style={{ fontWeight: 800, color: '#065f46', margin: 0, fontSize: '0.95rem' }}>Pharma Stockout & Last-Mile Sentinel</h4>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Gap: Commercial HMOs leverage private pharmacy chains (Medplus).
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#064e3b', lineHeight: 1.4, margin: 0 }}>
                    <strong>Action Plan:</strong> Solve Zamfara’s #1 grievance (essential drug stockout at rural PHCs) by deploying automated minimum-stock SMS alerts directly to the State Drug Management Agency when ACT or IV stocks dip below 20%.
                  </p>
                </div>

                <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '6px', background: '#db2777', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>4</div>
                    <h4 style={{ fontWeight: 800, color: '#9d174d', margin: 0, fontSize: '0.95rem' }}>Diaspora Remittance Health Bond</h4>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#db2777', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Gap: Private HMOs dominate high-net-worth individual banking.
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#831843', lineHeight: 1.4, margin: 0 }}>
                    <strong>Action Plan:</strong> Scale the Z-HIMS Diaspora Sponsorship Portal targeting 50,000 Zamfara indigenes in Abuja, Lagos, the UK, Saudi Arabia, and North America to fund ₦12,000 annual packages for their rural villages with verifiable impact dashboards.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Operational Gap Closure Suite */}
            <div className="section-card" style={{ marginTop: '2rem', border: '2px solid #059669', background: '#fafdfb' }}>
              <div className="section-header">
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#065f46', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                    <ShieldCheck size={14} color="#059669" />
                    <span>OPERATIONAL GAP CLOSURE TERMINALS (GAPS 1 - 4)</span>
                  </div>
                  <h3 className="section-title">
                    {lang === 'ha' ? 'Dandalin Aiwatar da Rukunonin Gyara (1 zuwa 4)' : 'Active Implementation Terminals Closing Gaps 1 to 4'}
                  </h3>
                  <p className="section-desc">
                    {lang === 'ha'
                      ? 'Dukkan rukunonin gyara 4 da aka gano sun zama cikakkun tsare-tsare masu aiki a cikin manhaja don cin moriyar inshorar lafiya.'
                      : 'All four identified competitive gaps have been fully engineered into functional operational workflows.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button className={gapActiveTab === 'all' ? 'btn-primary' : 'btn-secondary'} onClick={() => setGapActiveTab('all')} style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                    All 4 Consoles
                  </button>
                  <button className={gapActiveTab === 'mandates' ? 'btn-primary' : 'btn-secondary'} onClick={() => setGapActiveTab('mandates')} style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                    Gap 1: Auto-Debit
                  </button>
                  <button className={gapActiveTab === 'preauth' ? 'btn-primary' : 'btn-secondary'} onClick={() => setGapActiveTab('preauth')} style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                    Gap 2: AI Pre-Auth (&lt; 5s)
                  </button>
                  <button className={gapActiveTab === 'pharma' ? 'btn-primary' : 'btn-secondary'} onClick={() => setGapActiveTab('pharma')} style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                    Gap 3: Pharma Sentinel
                  </button>
                  <button className={gapActiveTab === 'bonds' ? 'btn-primary' : 'btn-secondary'} onClick={() => setGapActiveTab('bonds')} style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                    Gap 4: Diaspora Bonds
                  </button>
                </div>
              </div>

              {/* CONSOLE 1: RECURRING MICRO-DEBIT & AIRTIME MANDATES */}
              {(gapActiveTab === 'all' || gapActiveTab === 'mandates') && (
                <div style={{ border: '1px solid #fde68a', borderRadius: '12px', background: '#fffbeb', padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={18} color="#d97706" />
                        <h4 style={{ fontWeight: 800, color: '#92400e', margin: 0, fontSize: '1rem' }}>
                          Gap 1: Automated Recurring Micro-Debit & Telco Airtime Engine
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#b45309', margin: '0.2rem 0 0 0' }}>
                        Enabling automatic ₦500/month airtime micro-billing directly from mobile networks (MTN/Airtel) and NIBSS direct debit.
                      </p>
                    </div>
                    <button className="btn-gold" onClick={() => setMandateModalOpen(true)} style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
                      <PlusCircle size={14} /> + Register New Mandate
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="data-table" style={{ background: 'white' }}>
                      <thead>
                        <tr>
                          <th>Mandate Ref</th>
                          <th>Beneficiary</th>
                          <th>Channel</th>
                          <th>Frequency / Amount</th>
                          <th>Total Deducted (₦)</th>
                          <th>Deductions</th>
                          <th>Status</th>
                          <th>Interactive Trigger</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mandates.map(m => (
                          <tr key={m.id}>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#b45309' }}>{m.mandate_ref}</span>
                            </td>
                            <td>
                              <strong>{m.beneficiary_name}</strong>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{m.card_number} · {m.phone_or_account}</div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.78rem', background: '#fef3c7', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#92400e', fontWeight: 700 }}>
                                {m.channel}
                              </span>
                            </td>
                            <td><strong>{m.frequency}</strong></td>
                            <td style={{ fontWeight: 800, color: '#047857' }}>₦{parseFloat(m.total_deducted_naira).toLocaleString()}</td>
                            <td>{m.successful_deductions} cycles</td>
                            <td>
                              <span className={`badge-status ${m.status === 'completed_target' ? 'active' : 'pending'}`}>
                                {m.status.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn-gold"
                                onClick={() => handleTriggerMandate(m.id)}
                                style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                title="Execute simulated charge cycle"
                              >
                                <Play size={10} />
                                <span>{lang === 'ha' ? 'Gwada Cire Kudi' : 'Trigger Charge'}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CONSOLE 2: REAL-TIME AI PRE-AUTHORIZATION ENGINE */}
              {(gapActiveTab === 'all' || gapActiveTab === 'preauth') && (
                <div style={{ border: '1px solid #bfdbfe', borderRadius: '12px', background: '#eff6ff', padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Stethoscope size={18} color="#2563eb" />
                        <h4 style={{ fontWeight: 800, color: '#1e40af', margin: 0, fontSize: '1rem' }}>
                          Gap 2: Real-Time AI Surgical Pre-Authorization Engine (&lt; 5-Second Turnaround)
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#1d4ed8', margin: '0.2rem 0 0 0' }}>
                        Instant automated clinical rule evaluation for secondary hospital surgeries, cutting turnaround from 24h to &lt; 5 seconds.
                      </p>
                    </div>
                    <button className="btn-primary" onClick={() => setPreauthModalOpen(true)} style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
                      <Zap size={14} /> + Request AI Pre-Auth (&lt; 5s)
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="data-table" style={{ background: 'white' }}>
                      <thead>
                        <tr>
                          <th>Pre-Auth Code</th>
                          <th>Beneficiary</th>
                          <th>Health Facility</th>
                          <th>Procedure & ICD-11</th>
                          <th>Approved (₦)</th>
                          <th>AI Turnaround</th>
                          <th>Decision</th>
                          <th>Clinical Rationale</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preauths.map(p => (
                          <tr key={p.id}>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#1e40af', background: '#dbeafe', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                {p.auth_code}
                              </span>
                            </td>
                            <td>
                              <strong>{p.beneficiary_name}</strong>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>NIN: {p.nin} · {p.lga_name}</div>
                            </td>
                            <td><strong>{p.provider_name}</strong></td>
                            <td>
                              <div style={{ fontWeight: 700 }}>{lang === 'ha' ? p.procedure_name_ha : p.procedure_name_en}</div>
                              <div style={{ fontSize: '0.72rem', color: '#475569' }}>ICD-11: {p.icd11_code} · {p.clinical_priority}</div>
                            </td>
                            <td style={{ fontWeight: 800, color: '#047857' }}>₦{parseFloat(p.approved_cost).toLocaleString()}</td>
                            <td>
                              <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                ⚡ {p.turnaround_seconds}s (Conf: {p.ai_confidence_score}%)
                              </span>
                            </td>
                            <td>
                              <span className="badge-status active">
                                {p.ai_decision}
                              </span>
                            </td>
                            <td style={{ fontSize: '0.75rem', maxWidth: '280px', color: '#334155' }}>
                              {lang === 'ha' ? p.clinical_rationale_ha : p.clinical_rationale_en}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CONSOLE 3: PHARMACEUTICAL STOCKOUT SENTINEL */}
              {(gapActiveTab === 'all' || gapActiveTab === 'pharma') && (
                <div style={{ border: '1px solid #bbf7d0', borderRadius: '12px', background: '#f0fdf4', padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Truck size={18} color="#059669" />
                        <h4 style={{ fontWeight: 800, color: '#065f46', margin: 0, fontSize: '1rem' }}>
                          Gap 3: Rural Pharmaceutical Stockout Sentinel & Last-Mile Logistics Tracker
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#047857', margin: '0.2rem 0 0 0' }}>
                        Real-time essential medicine inventory tracking across all 14 LGAs with automated replenishment dispatches from Gusau.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', background: 'white', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #bbf7d0', fontSize: '0.75rem', flexWrap: 'wrap' }}>
                      <div>Total: <strong>{inventoryMetrics?.total_medicines || 6}</strong></div>
                      <div>Optimal: <strong style={{ color: '#059669' }}>{inventoryMetrics?.optimal_count || 2}</strong></div>
                      <div>Warnings: <strong style={{ color: '#d97706' }}>{inventoryMetrics?.low_count || 2}</strong></div>
                      <div>Stockouts: <strong style={{ color: '#dc2626' }}>{inventoryMetrics?.critical_count || 2}</strong></div>
                      <div>Dispatches: <strong style={{ color: '#2563eb' }}>{inventoryMetrics?.active_dispatches || 3}</strong></div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="data-table" style={{ background: 'white' }}>
                      <thead>
                        <tr>
                          <th>Drug Code</th>
                          <th>Essential Medicine</th>
                          <th>Facility & LGA</th>
                          <th>Current Stock</th>
                          <th>Min Safe Level</th>
                          <th>Inventory Status</th>
                          <th>Logistics State</th>
                          <th>Supply Chain Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventory.map(item => (
                          <tr key={item.id}>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#475569' }}>{item.drug_code}</span>
                            </td>
                            <td>
                              <strong>{lang === 'ha' ? item.drug_name_ha : item.drug_name_en}</strong>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.category}</div>
                            </td>
                            <td>
                              <strong>{item.provider_name}</strong>
                              <div style={{ fontSize: '0.72rem', color: '#475569' }}>{item.lga_name} LGA</div>
                            </td>
                            <td style={{ fontWeight: 800, color: item.status === 'critical_stockout' ? '#dc2626' : item.status === 'low_warning' ? '#d97706' : '#059669' }}>
                              {item.current_stock} {item.unit_name}
                            </td>
                            <td>{item.minimum_safe_stock} {item.unit_name}</td>
                            <td>
                              <span className={`badge-status ${item.status === 'optimal' ? 'active' : item.status === 'low_warning' ? 'pending' : 'flagged'}`}>
                                {item.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.auto_dispatch_status === 'truck_dispatched' ? '#2563eb' : '#059669' }}>
                                {item.auto_dispatch_status === 'truck_dispatched' ? '🚚 En Route from Gusau' : '✓ Standby'}
                              </span>
                            </td>
                            <td>
                              {item.auto_dispatch_status === 'truck_dispatched' ? (
                                <button
                                  className="btn-gold"
                                  onClick={() => handleConfirmDelivery(item.id)}
                                  style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                >
                                  <CheckCircle size={12} /> Confirm Delivery
                                </button>
                              ) : (
                                <button
                                  className="btn-primary"
                                  onClick={() => handleDispatchTruck(item.id)}
                                  style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                >
                                  <Truck size={12} /> Dispatch Van
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CONSOLE 4: DIASPORA REMITTANCE BONDS */}
              {(gapActiveTab === 'all' || gapActiveTab === 'bonds') && (
                <div style={{ border: '1px solid #fbcfe8', borderRadius: '12px', background: '#fdf2f8', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={18} color="#db2777" />
                        <h4 style={{ fontWeight: 800, color: '#9d174d', margin: 0, fontSize: '1rem' }}>
                          Gap 4: Diaspora Health Remittance Bonds (Multi-Family & Ward Sponsorship Cohorts)
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#be185d', margin: '0.2rem 0 0 0' }}>
                        Enabling Zamfara diaspora in the UK, Saudi Arabia, and Abuja to sponsor large cohorts with verifiable tax-exempt bonds.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', background: 'white', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #fbcfe8', fontSize: '0.75rem', alignItems: 'center' }}>
                        <div>Funded: <strong style={{ color: '#047857' }}>₦{parseFloat(bondsMetrics?.total_funded_naira || 6000000).toLocaleString()}</strong></div>
                        <div>Families: <strong>{bondsMetrics?.total_families_covered || 500}</strong></div>
                        <div>Treatments: <strong style={{ color: '#db2777' }}>{bondsMetrics?.total_treatments_delivered || 129}</strong></div>
                      </div>
                      <button className="btn-gold" onClick={() => setBondModalOpen(true)} style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
                        <Gift size={14} /> + Issue New Bond
                      </button>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="data-table" style={{ background: 'white' }}>
                      <thead>
                        <tr>
                          <th>Bond Ref</th>
                          <th>Diaspora Sponsor & City</th>
                          <th>Target LGA</th>
                          <th>Families Covered</th>
                          <th>Total Funded (₦ / FX)</th>
                          <th>Beneficiary Cohort</th>
                          <th>Free Treatments Delivered</th>
                          <th>Tax Exemption Ref</th>
                          <th>Live Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bonds.map(b => (
                          <tr key={b.id}>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#9d174d', background: '#fce7f3', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                {b.bond_code}
                              </span>
                            </td>
                            <td>
                              <strong>{b.sponsor_name}</strong>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{b.sponsor_city}, {b.sponsor_country}</div>
                            </td>
                            <td><strong>{b.target_lga_name} LGA</strong></td>
                            <td style={{ fontWeight: 800 }}>{b.families_sponsored_count} Families</td>
                            <td>
                              <div style={{ fontWeight: 800, color: '#047857' }}>₦{parseFloat(b.total_amount_naira).toLocaleString()}</div>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>({b.currency} {parseFloat(b.amount_foreign).toLocaleString()})</div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.78rem', background: '#f3e8ff', color: '#7e22ce', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                                {b.beneficiary_category}
                              </span>
                            </td>
                            <td>
                              <strong style={{ color: '#047857' }}>{b.treatments_utilized_count} Free Visits</strong>
                            </td>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#475569' }}>{b.tax_exemption_ref}</span>
                            </td>
                            <td>
                              <span className="badge-status active">VERIFIED</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* WORLD-CLASS CAPABILITY 1: PHC ADVANCE CAPITATION ENGINE */}
        {/* ======================================================== */}
        {activeTab === 'capitation' && (
          <div className="tab-pane">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ background: '#ecfdf5', color: '#047857', padding: '0.35rem 0.65rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 800, border: '1px solid #a7f3d0' }}>
                    <Landmark size={14} /> 1ST-OF-THE-MONTH ENGINE · NIBSS DIRECT WIRE
                  </span>
                  <span style={{ background: '#f8fafc', color: '#475569', padding: '0.35rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #e2e8f0' }}>
                    14 LGAs COVERED
                  </span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 0.25rem 0' }}>
                  {lang === 'ha' ? 'Dandalin Biyan Kudin Gudanarwa na Asibitocin Karkara (Advance Capitation)' : 'Primary Healthcare Advance Capitation Disbursement Engine'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0, maxWidth: '850px' }}>
                  {lang === 'ha'
                    ? 'Biyan kudin gudanarwa kafin farkon kowane wata (Nuwamba 2026) domin tabbatar da magunguna da aikin likitoci a cibiyoyin lafiya na karkara kafin marasa lafiya su isa.'
                    : 'Statutory 1st-of-the-month advance capitation financing for accredited Primary Healthcare Centres (PHCs). Eliminates out-of-pocket drug stockouts and empowers clinics before monthly patient visits occur.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-secondary" onClick={fetchCapitation} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
                  <RefreshCw size={15} /> {t.btnRefresh}
                </button>
                <button className="btn-primary" onClick={() => setCapitationModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <PlusCircle size={16} />
                  <span>{lang === 'ha' ? '+ Shirya Sabon Biyan Kudi (Nuwamba 2026)' : '+ Generate Next Month Advance Capitation'}</span>
                </button>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="metrics-grid" style={{ marginBottom: '2rem' }}>
              <div className="metric-card" style={{ borderLeft: '4px solid #059669' }}>
                <div className="metric-header">
                  <span className="metric-title">{lang === 'ha' ? 'Jimillar Kudin Capitation (₦)' : 'Monthly Advance Outlay'}</span>
                  <DollarSign size={20} color="#059669" />
                </div>
                <div className="metric-value" style={{ color: '#059669' }}>
                  ₦{parseFloat(capitationMetrics?.total_disbursed_naira || 7252500).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </div>
                <div className="metric-sub" style={{ color: '#047857' }}>
                  ⚡ 100% NIBSS EFT Cleared
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #2563eb' }}>
                <div className="metric-header">
                  <span className="metric-title">{lang === 'ha' ? 'Kudin Mutum Daya (Rate)' : 'Capitation Rate'}</span>
                  <Landmark size={20} color="#2563eb" />
                </div>
                <div className="metric-value" style={{ color: '#2563eb' }}>
                  ₦{capitationBatches[0]?.capitation_rate_naira || 500}.00
                </div>
                <div className="metric-sub" style={{ color: '#1e40af' }}>
                  Per registered enrollee / month
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #7c3aed' }}>
                <div className="metric-header">
                  <span className="metric-title">{lang === 'ha' ? 'Masu Rijistar da aka Biyawa' : 'Enrollees Financed'}</span>
                  <Users size={20} color="#7c3aed" />
                </div>
                <div className="metric-value" style={{ color: '#7c3aed' }}>
                  {parseInt(capitationMetrics?.total_enrollees_covered || 14505).toLocaleString()}
                </div>
                <div className="metric-sub" style={{ color: '#6d28d9' }}>
                  Across 14 Zamfara LGAs
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #d97706' }}>
                <div className="metric-header">
                  <span className="metric-title">{lang === 'ha' ? 'Cibiyoyin da aka Biya' : 'Accredited PHCs Paid'}</span>
                  <Building2 size={20} color="#d97706" />
                </div>
                <div className="metric-value" style={{ color: '#d97706' }}>
                  {capitationAllocations.length || 7}
                </div>
                <div className="metric-sub" style={{ color: '#b45309' }}>
                  Direct to facility bank accounts
                </div>
              </div>
            </div>

            {/* Active Disbursement Batches */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lang === 'ha' ? 'Rukunonin Biyan Kudin Gudanarwa (Disbursement Batches)' : 'Advance Capitation Disbursement Batches'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                    Reconciled with Central Bank / NIBSS interbank clearing protocol
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                {capitationBatches.map((b) => (
                  <div key={b.id} style={{ border: '1px solid #a7f3d0', borderRadius: '10px', background: '#f0fdf4', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '0.9rem', color: '#065f46' }}>
                        {b.batch_ref}
                      </span>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                        {b.payment_status}
                      </span>
                    </div>

                    <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.35rem' }}>
                      {lang === 'ha' ? b.billing_month_ha : b.billing_month_en}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#475569', marginBottom: '0.5rem' }}>
                      <span>Enrollees Covered:</span>
                      <strong>{parseInt(b.total_enrollees_count).toLocaleString()} citizens</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#475569', marginBottom: '0.5rem' }}>
                      <span>Capitation Rate:</span>
                      <strong>₦{parseFloat(b.capitation_rate_naira).toLocaleString()}/head</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 900, color: '#059669', paddingTop: '0.5rem', borderTop: '1px dashed #bbf7d0' }}>
                      <span>Total Wire Disbursed:</span>
                      <span>₦{parseFloat(b.total_amount_naira).toLocaleString()}</span>
                    </div>

                    <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: '#64748b', fontFamily: 'monospace' }}>
                      NIBSS Ref: {b.nibss_batch_ref}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facility Remittance Schedule Table */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lang === 'ha' ? 'Jadawalin Biyan Asibitoci Kai Tsaye (PHC Bank Remittances)' : 'Accredited Facility Advance Remittance Schedule'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                    Direct-to-clinic account transfers calculated by registered community enrollee headcount
                  </p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Facility & Type</th>
                      <th>LGA & Ward</th>
                      <th>Enrollees</th>
                      <th>Rate</th>
                      <th>Advance Wire (₦)</th>
                      <th>Bank & Account No.</th>
                      <th>NIBSS Settlement Ref</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {capitationAllocations.map((a) => (
                      <tr key={a.id}>
                        <td>
                          <strong>{a.provider_name}</strong>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{a.facility_type}</div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600 }}>{a.lga_name}</span>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{a.ward}</div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 800, color: '#0f172a' }}>
                            {parseInt(a.assigned_enrollees).toLocaleString()}
                          </span>
                        </td>
                        <td style={{ color: '#64748b', fontSize: '0.8rem' }}>
                          ₦{parseFloat(a.capitation_rate).toLocaleString()}
                        </td>
                        <td style={{ fontWeight: 900, color: '#059669', fontSize: '0.95rem' }}>
                          ₦{parseFloat(a.monthly_payout_naira).toLocaleString()}
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>{a.bank_name}</div>
                          <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#475569' }}>
                            {a.account_number}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#475569' }}>
                            {a.remittance_ref}
                          </span>
                        </td>
                        <td>
                          <span className="badge-status active" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={12} /> {a.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* WORLD-CLASS CAPABILITY 2: VITALITY PREVENTION REWARDS LEDGER */}
        {/* ===================================================================== */}
        {activeTab === 'rewards' && (
          <div className="tab-pane">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ background: '#fef3c7', color: '#b45309', padding: '0.35rem 0.65rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 800, border: '1px solid #fde68a' }}>
                    <Sparkles size={14} /> VITALITY-STYLE BEHAVIORAL INCENTIVES
                  </span>
                  <span style={{ background: '#f8fafc', color: '#475569', padding: '0.35rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #e2e8f0' }}>
                    MATERNAL & CHILD PREVENTIVE HEALTH
                  </span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 0.25rem 0' }}>
                  {lang === 'ha' ? 'Tsarin Kyautar Rigakafi da Katin Waya (Vitality Prevention Ledger)' : 'Vitality-Style Prevention Health Incentives & Micro-Credits'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0, maxWidth: '850px' }}>
                  {lang === 'ha'
                    ? 'Biyan lada ta hanyar tura katin waya (₦200) da kayan abinci mai gina jiki ga mata masu juna biyu da suka kammala ANC 4 da kuma alluran rigakafi na yara.'
                    : 'Behavioral economic incentives: automated ₦200 instant airtime micro-credits, insecticide-treated bednets (LLIN), and child nutrition packs triggered upon clinical verification.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-secondary" onClick={fetchRewards} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
                  <RefreshCw size={15} /> {t.btnRefresh}
                </button>
                <button className="btn-gold" onClick={() => setRewardModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <Gift size={16} />
                  <span>{lang === 'ha' ? '+ Ba da Kyautar Rigakafi' : '+ Log Verified Clinical Milestone'}</span>
                </button>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="metrics-grid" style={{ marginBottom: '2rem' }}>
              <div className="metric-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <div className="metric-header">
                  <span className="metric-title">{lang === 'ha' ? 'Jimillar Kyautar da aka Raba' : 'Total Prevention Value'}</span>
                  <Award size={20} color="#f59e0b" />
                </div>
                <div className="metric-value" style={{ color: '#d97706' }}>
                  ₦{parseFloat(rewardsMetrics?.total_value_naira || 5900).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </div>
                <div className="metric-sub" style={{ color: '#b45309' }}>
                  Distributed to rural mothers & families
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #059669' }}>
                <div className="metric-header">
                  <span className="metric-title">{lang === 'ha' ? 'Allurai & ANC da aka Yi' : 'Verified Milestones Logged'}</span>
                  <CheckCircle2 size={20} color="#059669" />
                </div>
                <div className="metric-value" style={{ color: '#059669' }}>
                  {rewardsMetrics?.total_rewards || 4}
                </div>
                <div className="metric-sub" style={{ color: '#047857' }}>
                  Clinically verified by doctors
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #2563eb' }}>
                <div className="metric-header">
                  <span className="metric-title">{lang === 'ha' ? 'Katin Waya da aka Tura' : 'Airtime Micro-Credits'}</span>
                  <PhoneCall size={20} color="#2563eb" />
                </div>
                <div className="metric-value" style={{ color: '#2563eb' }}>
                  {rewardsMetrics?.claimed_count || 4}
                </div>
                <div className="metric-sub" style={{ color: '#1e40af' }}>
                  MTN & Airtel Direct Top-up APIs
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #7c3aed' }}>
                <div className="metric-header">
                  <span className="metric-title">{lang === 'ha' ? 'Tasirin Lafiya' : 'Retention Rate'}</span>
                  <Activity size={20} color="#7c3aed" />
                </div>
                <div className="metric-value" style={{ color: '#7c3aed' }}>
                  100%
                </div>
                <div className="metric-sub" style={{ color: '#6d28d9' }}>
                  Zero drop-outs in ANC 1-4 pipeline
                </div>
              </div>
            </div>

            {/* Incentive Catalog Visual Cards */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                {lang === 'ha' ? 'Rukunonin Kyaututtukan Rigakafi (Incentive Packages)' : 'Active Behavioral Health Incentive Packages'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤰</div>
                  <div style={{ fontWeight: 800, color: '#92400e', fontSize: '0.95rem' }}>
                    {lang === 'ha' ? 'ANC-4: Ziyarar Gwajin Ciki ta 4' : 'ANC-4 Full Completion'}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#b45309', margin: '0.35rem 0' }}>
                    ₦200 Instant Airtime
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#78350f', margin: 0 }}>
                    Automatically sent to pregnant mother's phone via MTN/Airtel API upon 4th antenatal visit sign-off.
                  </p>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💉</div>
                  <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '0.95rem' }}>
                    {lang === 'ha' ? 'Penta-3: Rigakafin Yaro' : 'Pentavalent-3 Immunization'}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2563eb', margin: '0.35rem 0' }}>
                    ₦200 Savings Credit
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#1e3a8a', margin: 0 }}>
                    Direct deposit into beneficiary's Z-HIMS family health savings wallet for emergency care.
                  </p>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🦟</div>
                  <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.95rem' }}>
                    {lang === 'ha' ? 'Gidan Sauro da Maganin Zazzabi' : 'Malaria IPTp + LLIN Bednet'}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#059669', margin: '0.35rem 0' }}>
                    ₦2,500 Clinic Voucher
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#064e3b', margin: 0 }}>
                    Free Long-Lasting Insecticidal Net and preventative malaria therapy voucher redeemable at clinic pharmacy.
                  </p>
                </div>

                <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🍼</div>
                  <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.95rem' }}>
                    {lang === 'ha' ? 'Bayan Haihuwa & Abincin RUTF' : 'Postnatal 48h + RUTF Food'}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#7c3aed', margin: '0.35rem 0' }}>
                    ₦3,000 Nutrition Pack
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#581c87', margin: 0 }}>
                    Ready-to-Use Therapeutic Food pack and infant health kit dispensed upon 48-hour postpartum checkup.
                  </p>
                </div>
              </div>
            </div>

            {/* Rewards Ledger Table */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lang === 'ha' ? 'Rijistar Kyaututtukan Rigakafi da aka Bayar' : 'Disbursed Prevention Rewards & Voucher Ledger'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                    Auditable proof of behavioral micro-incentives dispatched to enrolled citizens
                  </p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Reward Code</th>
                      <th>Beneficiary & Phone</th>
                      <th>Clinical Milestone</th>
                      <th>Facility</th>
                      <th>Value (₦)</th>
                      <th>Delivery Channel</th>
                      <th>Voucher Code</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preventionRewards.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0f172a' }}>
                            {r.reward_code}
                          </span>
                        </td>
                        <td>
                          <strong>{r.full_name}</strong>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            NIN: {r.nin} · {r.phone_number || r.phone}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700 }}>
                            {lang === 'ha' ? r.milestone_name_ha : r.milestone_name_en}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{r.milestone_type}</div>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: '#334155' }}>
                          {r.provider_name}
                        </td>
                        <td style={{ fontWeight: 900, color: '#d97706', fontSize: '0.95rem' }}>
                          ₦{parseFloat(r.reward_value_naira).toLocaleString()}
                        </td>
                        <td>
                          <span style={{ fontSize: '0.78rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                            {r.delivery_channel}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#475569' }}>
                            {r.voucher_code}
                          </span>
                        </td>
                        <td>
                          <span className="badge-status active" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={12} /> {r.is_claimed ? 'SENT & CLAIMED' : 'PENDING'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================================== */}
        {/* WORLD-CLASS CAPABILITY 3: MULTIMODAL INDIGENOUS HAUSA VOICE AI SYMPTOM TRIAGE */}
        {/* ============================================================================== */}
        {activeTab === 'voiceTriage' && (
          <div className="tab-pane">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ background: '#ede9fe', color: '#6d28d9', padding: '0.35rem 0.65rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 800, border: '1px solid #ddd6fe' }}>
                    <Mic size={14} /> INDIGENOUS HAUSA VOICE AI DOCTOR (SAURARI LIKITA)
                  </span>
                  <span style={{ background: '#f8fafc', color: '#475569', padding: '0.35rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #e2e8f0' }}>
                    WHO ICD-11 TRIAGE ENGINE
                  </span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0.5rem 0 0.25rem 0' }}>
                  {lang === 'ha' ? 'Likitan Murya na Harshen Hausa da Tantance Cututtuka ta AI' : 'Multimodal Indigenous Hausa Voice AI Symptom Triage'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0, maxWidth: '850px' }}>
                  {lang === 'ha'
                    ? 'Sauraron bayanin ciwo a harshen Hausa daga mazauna kauyuka da ba su iya karatu ko rubutu ba, gano cuta ta ICD-11, mayar da amsar likita ta murya, da tura agajin gaggawa ko asibiti.'
                    : 'Voice-driven diagnostic evaluator for low-literacy rural citizens. Converts spoken Hausa and English symptoms into ICD-11 triage codes, severity classification, speech synthesis audio playback, and automated care dispatches.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-secondary" onClick={fetchTriageSessions} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
                  <RefreshCw size={15} /> {t.btnRefresh}
                </button>
              </div>
            </div>

            {/* Voice Console Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Left Column: Voice Recording & Input */}
              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mic size={18} color="#7c3aed" />
                    <span>{lang === 'ha' ? 'Yi Magana da Likita / Rubuta Bayani' : 'Citizen Spoken Symptom Console'}</span>
                  </h3>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button
                      className={voiceLanguage === 'ha' ? 'btn-primary' : 'btn-secondary'}
                      onClick={() => setVoiceLanguage('ha')}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                    >
                      Hausa 🇳🇬
                    </button>
                    <button
                      className={voiceLanguage === 'en' ? 'btn-primary' : 'btn-secondary'}
                      onClick={() => setVoiceLanguage('en')}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                    >
                      English 🇬🇧
                    </button>
                  </div>
                </div>

                <div className="form-grid" style={{ marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem' }}>Citizen Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={voiceCitizenName}
                      onChange={(e) => setVoiceCitizenName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem' }}>Phone Number</label>
                    <input
                      type="text"
                      className="form-input"
                      value={voiceCitizenPhone}
                      onChange={(e) => setVoiceCitizenPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Simulated Audio Scenarios (Quick-Picks) */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>
                    {lang === 'ha' ? 'Gwada Sautin Muryar Marasa Lafiya na Kauye (One-Click Voice Simulators):' : 'One-Click Spoken Voice Simulators (Rural Audio Samples):'}
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = 'Ina jin zazzabi mai tsanani da ciwon kai da sanyi tun jiya da daddare, ba zan iya tashi ba.';
                        setVoiceInput(txt);
                        setVoiceLanguage('ha');
                        handleEvaluateVoiceTriage(txt, 'ha');
                      }}
                      style={{ textAlign: 'left', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.75rem', cursor: 'pointer', fontSize: '0.78rem', transition: 'all 0.2s' }}
                    >
                      <strong style={{ color: '#d97706' }}>🦟 Malaria / Zazzabi (Hausa):</strong> "Ina jin zazzabi mai tsanani da ciwon kai da sanyi tun jiya da daddare..."
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const txt = 'Mace mai juna biyu ce a kauyenmu tana zubar da jini sosai kuma cikinta na ciwo sosai.';
                        setVoiceInput(txt);
                        setVoiceLanguage('ha');
                        handleEvaluateVoiceTriage(txt, 'ha');
                      }}
                      style={{ textAlign: 'left', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.6rem 0.75rem', cursor: 'pointer', fontSize: '0.78rem', transition: 'all 0.2s' }}
                    >
                      <strong style={{ color: '#dc2626' }}>🚨 Obstetric Emergency / Zuban Jini (Hausa):</strong> "Mace mai juna biyu ce a kauyenmu tana zubar da jini sosai..."
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const txt = 'Yaro na dan shekara biyu yana ta gudawa da amai tun safe, ya galabaita baya shan ruwa.';
                        setVoiceInput(txt);
                        setVoiceLanguage('ha');
                        handleEvaluateVoiceTriage(txt, 'ha');
                      }}
                      style={{ textAlign: 'left', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.6rem 0.75rem', cursor: 'pointer', fontSize: '0.78rem', transition: 'all 0.2s' }}
                    >
                      <strong style={{ color: '#2563eb' }}>👶 Pediatric Diarrhea / Gudawa da Amai (Hausa):</strong> "Yaro na dan shekara biyu yana ta gudawa da amai tun safe..."
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                    {lang === 'ha' ? 'Maganar da aka Saurara (Spoken Transcript):' : 'Spoken Audio Transcript / Custom Symptoms:'}
                  </label>
                  <textarea
                    rows={3}
                    className="form-input"
                    style={{ fontSize: '0.85rem', lineHeight: '1.4' }}
                    placeholder="e.g. Ina jin zazzabi mai zafi da amai..."
                    value={voiceInput}
                    onChange={(e) => setVoiceInput(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  disabled={voiceLoading}
                  onClick={() => handleEvaluateVoiceTriage(voiceInput, voiceLanguage)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.85rem' }}
                >
                  <Mic size={18} />
                  <span>
                    {voiceLoading
                      ? (lang === 'ha' ? 'Injin AI Yana Tantance Cutar...' : 'Evaluating Spoken Voice with ICD-11 AI...')
                      : (lang === 'ha' ? 'Saurari Likita a Murya / Triage Yanzu' : 'Run Multimodal Voice AI Triage')}
                  </span>
                </button>
              </div>

              {/* Right Column: Live AI Diagnostic & Clinical Decision Output */}
              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Activity size={18} color="#059669" />
                    <span>{lang === 'ha' ? 'Sakamakon Tantancewar Likita ta AI' : 'Live Clinical AI Triage Assessment'}</span>
                  </h3>
                  {voiceResult && (
                    <span style={{
                      background: voiceResult.session.severity_level === 'EMERGENCY' ? '#fef2f2' : voiceResult.session.severity_level === 'URGENT' ? '#fffbeb' : '#f0fdf4',
                      color: voiceResult.session.severity_level === 'EMERGENCY' ? '#dc2626' : voiceResult.session.severity_level === 'URGENT' ? '#d97706' : '#15803d',
                      padding: '0.25rem 0.65rem', borderRadius: '6px', fontWeight: 900, fontSize: '0.78rem', border: '1px solid currentColor'
                    }}>
                      ⚡ {voiceResult.session.severity_level}
                    </span>
                  )}
                </div>

                {voiceResult ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>ICD-11 Diagnostic Classification</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a' }}>
                        {voiceResult.session.icd11_triage_code}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#047857', marginTop: '0.25rem', fontWeight: 700 }}>
                        Symptoms: {voiceResult.session.detected_symptoms}
                      </div>
                    </div>

                    {/* Audio Playback Controls */}
                    <div style={{ background: '#f3e8ff', borderRadius: '10px', padding: '1rem', border: '1px solid #d8b4fe' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 800, color: '#6b21a8', fontSize: '0.85rem' }}>
                            {lang === 'ha' ? 'Muryar Likita a Hausa (Audio Voice Playback)' : 'Voice Audio Response'}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#7e22ce' }}>
                            {voiceSpeaking ? '🔊 Likita yana magana ta murya yanzu...' : 'Kanna muryar likita don sauraro'}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => handleSpeakVoiceResponse(
                            voiceLanguage === 'ha' ? voiceResult.session.ai_clinical_recommendation_ha : voiceResult.session.ai_clinical_recommendation_en,
                            voiceLanguage
                          )}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#7c3aed' }}
                        >
                          <Volume2 size={16} />
                          <span>{voiceSpeaking ? 'Playing...' : (lang === 'ha' ? 'Sake Kunna Murya' : 'Play Voice Audio')}</span>
                        </button>
                      </div>
                    </div>

                    {/* Hausa Guidance Box */}
                    <div style={{ borderLeft: '4px solid #059669', background: '#f0fdf4', padding: '0.85rem 1rem', borderRadius: '0 8px 8px 0' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Shawarar Likita a Harshen Hausa:
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#064e3b', lineHeight: '1.4' }}>
                        {voiceResult.session.ai_clinical_recommendation_ha}
                      </div>
                    </div>

                    {/* English Clinical Guidance */}
                    <div style={{ borderLeft: '4px solid #2563eb', background: '#eff6ff', padding: '0.85rem 1rem', borderRadius: '0 8px 8px 0' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Clinical Protocol & Patient Care Plan:
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#1e3a8a', lineHeight: '1.4' }}>
                        {voiceResult.session.ai_clinical_recommendation_en}
                      </div>
                    </div>

                    {/* Automated State Healthcare Action */}
                    <div style={{ marginTop: 'auto', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.75rem', fontSize: '0.78rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={18} color="#d97706" />
                      <div>
                        <strong>Automated Action Taken:</strong> {voiceResult.session.action_taken}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                    <Mic size={48} strokeWidth={1.2} style={{ marginBottom: '1rem', color: '#cbd5e1' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      {lang === 'ha' ? 'Ba a tantance murya ba tukunna' : 'No Voice Triage Evaluated Yet'}
                    </div>
                    <div style={{ fontSize: '0.78rem', maxWidth: '320px' }}>
                      {lang === 'ha'
                        ? 'Danna daya daga cikin misalan muryoyin kauye ko rubuta alamomi a hagu domin ganin aikin AI.'
                        : 'Select one of the simulated audio samples or speak custom symptoms on the left to evaluate clinical severity.'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Historical Triage Sessions Log Table */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lang === 'ha' ? 'Tarihin Tantancewar Murya (Voice AI Triage Audit Log)' : 'Voice AI Clinical Triage Audit Sessions'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                    End-to-end voice consultations logged across rural Zamfara PHC catchment zones
                  </p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Session Ref</th>
                      <th>Language</th>
                      <th>Citizen & Phone</th>
                      <th>Spoken Audio Transcript (Hausa)</th>
                      <th>ICD-11 & Symptoms</th>
                      <th>Severity</th>
                      <th>Action Taken</th>
                      <th>Voice Audio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voiceSessions.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.8rem' }}>
                            {s.session_ref}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            {s.spoken_language === 'ha' ? 'Hausa 🇳🇬' : 'English 🇬🇧'}
                          </span>
                        </td>
                        <td>
                          <strong>{s.citizen_name}</strong>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{s.citizen_phone}</div>
                        </td>
                        <td style={{ fontSize: '0.78rem', maxWidth: '280px', color: '#334155' }}>
                          <em>"{s.audio_transcript_ha || s.audio_transcript_en}"</em>
                        </td>
                        <td>
                          <span style={{ fontWeight: 800, color: '#047857', fontSize: '0.8rem' }}>
                            {s.icd11_triage_code}
                          </span>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{s.detected_symptoms}</div>
                        </td>
                        <td>
                          <span style={{
                            background: s.severity_level === 'EMERGENCY' ? '#fef2f2' : s.severity_level === 'URGENT' ? '#fffbeb' : '#f0fdf4',
                            color: s.severity_level === 'EMERGENCY' ? '#dc2626' : s.severity_level === 'URGENT' ? '#d97706' : '#15803d',
                            padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem'
                          }}>
                            {s.severity_level}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.75rem', color: '#475569', maxWidth: '220px' }}>
                          {s.action_taken}
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleSpeakVoiceResponse(s.ai_clinical_recommendation_ha, s.spoken_language)}
                            style={{ background: '#ede9fe', border: '1px solid #ddd6fe', color: '#6d28d9', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}
                          >
                            <Volume2 size={13} /> Play
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </main>

      {/* MODAL: ENROL NEW BENEFICIARY */}
      {enrolModalOpen && (
        <div className="modal-overlay" onClick={() => setEnrolModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{t.btnEnrolNew}</h3>
              <button onClick={() => setEnrolModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEnrolSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t.fieldFullName}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Amina Shehu Kaura"
                    value={enrolForm.full_name}
                    onChange={(e) => setEnrolForm({ ...enrolForm, full_name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>{t.fieldNin}</label>
                  <input
                    type="text"
                    required
                    maxLength={11}
                    className="form-input"
                    placeholder="11 digits (e.g. 55667788990)"
                    value={enrolForm.nin}
                    onChange={(e) => setEnrolForm({ ...enrolForm, nin: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>{t.fieldGender}</label>
                  <select
                    className="form-select"
                    value={enrolForm.gender}
                    onChange={(e) => setEnrolForm({ ...enrolForm, gender: e.target.value })}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t.fieldDob}</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={enrolForm.dob}
                    onChange={(e) => setEnrolForm({ ...enrolForm, dob: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>{t.fieldPhone}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="080..."
                    value={enrolForm.phone}
                    onChange={(e) => setEnrolForm({ ...enrolForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>{t.fieldPlan}</label>
                  <select
                    className="form-select"
                    value={enrolForm.plan_id}
                    onChange={(e) => setEnrolForm({ ...enrolForm, plan_id: e.target.value })}
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{lang === 'ha' ? p.name_ha : p.name_en}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>{t.fieldLga}</label>
                  <select
                    className="form-select"
                    value={enrolForm.lga_id}
                    onChange={(e) => setEnrolForm({ ...enrolForm, lga_id: e.target.value })}
                  >
                    {lgas.map(l => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>{t.fieldWard}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Tudan Wada, Samaru, Galadima"
                    value={enrolForm.ward}
                    onChange={(e) => setEnrolForm({ ...enrolForm, ward: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>{t.fieldAddress}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="Street / Compound address in Zamfara"
                  value={enrolForm.address}
                  onChange={(e) => setEnrolForm({ ...enrolForm, address: e.target.value })}
                />
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setEnrolModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={16} /> Complete Enrolment & Issue Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NAIRA WALLET DEPOSIT */}
      {walletModalOpen && walletBen && (
        <div className="modal-overlay" onClick={() => setWalletModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Deposit Micro-Savings (Naira)</h3>
              <button onClick={() => setWalletModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{walletBen.full_name}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Card: {walletBen.card_number} · NIN: {walletBen.nin}</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Current Balance: <strong style={{ color: '#047857' }}>₦{parseFloat(walletBen.wallet_balance || 0).toLocaleString()}</strong> / ₦{parseFloat(walletBen.wallet_target || 12000).toLocaleString()}
              </div>
            </div>

            <form onSubmit={handleWalletDeposit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>{t.fieldAmountNaira}</label>
                <input
                  type="number"
                  required
                  min="500"
                  step="500"
                  className="form-input"
                  value={walletDeposit.amount}
                  onChange={(e) => setWalletDeposit({ ...walletDeposit, amount: e.target.value })}
                />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                  {['500', '1000', '2500', '5000', '12000'].map(amt => (
                    <button
                      type="button"
                      key={amt}
                      className="btn-secondary"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                      onClick={() => setWalletDeposit({ ...walletDeposit, amount: amt })}
                    >
                      ₦{parseInt(amt).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>{t.fieldPaymentChannel}</label>
                <select
                  className="form-select"
                  value={walletDeposit.channel}
                  onChange={(e) => setWalletDeposit({ ...walletDeposit, channel: e.target.value })}
                >
                  <option value="USSD *966#">USSD *966# (Direct Mobile Debit)</option>
                  <option value="Agent POS / Cash">Zamfara Certified POS Cash Agent</option>
                  <option value="Moniepoint / OPay">Moniepoint / OPay Agency Wallet</option>
                  <option value="Paystack">Paystack Instant Debit Card</option>
                  <option value="Direct Bank Transfer">Direct NIBSS Instant Bank Transfer</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setWalletModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-gold">
                  <CreditCard size={16} /> Confirm ₦{parseFloat(walletDeposit.amount || 0).toLocaleString()} Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT CLAIM */}
      {claimModalOpen && (
        <div className="modal-overlay" onClick={() => setClaimModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{t.btnSubmitClaim}</h3>
              <button onClick={() => setClaimModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleClaimSubmit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Select Beneficiary</label>
                <select
                  className="form-select"
                  value={claimForm.beneficiary_id}
                  onChange={(e) => setClaimForm({ ...claimForm, beneficiary_id: e.target.value })}
                >
                  {beneficiaries.map(b => (
                    <option key={b.id} value={b.id}>{b.full_name} ({b.card_number} - {b.plan_name_en})</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>{t.fieldProvider}</label>
                <select
                  className="form-select"
                  value={claimForm.provider_id}
                  onChange={(e) => setClaimForm({ ...claimForm, provider_id: e.target.value })}
                >
                  {providers.filter(p => p.is_functional).map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.lga_name})</option>
                  ))}
                </select>
              </div>

              <div className="form-grid" style={{ marginBottom: '1rem' }}>
                <div className="form-group">
                  <label>Clinical Service Type</label>
                  <select
                    className="form-select"
                    value={claimForm.service_type}
                    onChange={(e) => setClaimForm({ ...claimForm, service_type: e.target.value })}
                  >
                    <option value="Outpatient PHC">Outpatient Primary Care</option>
                    <option value="Inpatient Care">Inpatient Admission</option>
                    <option value="Maternal Antenatal (ANC)">Maternal Antenatal Care (ANC)</option>
                    <option value="Emergency C-Section">Emergency Caesarean Section</option>
                    <option value="Cholera Outbreak Care">Cholera Outbreak Care (IV / Zinc)</option>
                    <option value="Severe Malnutrition (RUTF)">Severe Malnutrition (RUTF)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t.fieldAmountNaira}</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={claimForm.billed_amount}
                    onChange={(e) => setClaimForm({ ...claimForm, billed_amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>{t.fieldServiceDescription}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={claimForm.service_description}
                  onChange={(e) => setClaimForm({ ...claimForm, service_description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setClaimModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={16} /> Run Auto-Adjudication Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LODGE GRIEVANCE */}
      {grievanceModalOpen && (
        <div className="modal-overlay" onClick={() => setGrievanceModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{t.btnLodgeGrievance}</h3>
              <button onClick={() => setGrievanceModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGrievanceSubmit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Category of Grievance</label>
                <select
                  className="form-select"
                  value={grievanceForm.category}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                >
                  <option value="drug_stockout">Drug Stockout at Facility</option>
                  <option value="illegal_out_of_pocket">Illegal Out-of-Pocket Cash Demand</option>
                  <option value="denial_of_care">Denial of Covered Treatment</option>
                  <option value="claim_delay">Delayed Claim Reimbursement</option>
                  <option value="facility_conduct">Facility Staff Attitude / Conduct</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Facility Concerned</label>
                <select
                  className="form-select"
                  value={grievanceForm.provider_id}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, provider_id: e.target.value })}
                >
                  {providers.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.lga_name})</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Title (English)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={grievanceForm.title_en}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, title_en: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Bayanin Korafi (Hausa)</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  value={grievanceForm.description_ha}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, description_ha: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setGrievanceModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={16} /> Submit Grievance (48h SLA)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DIASPORA PREMIUM SPONSORSHIP */}
      {diasporaModalOpen && (
        <div className="modal-overlay" onClick={() => setDiasporaModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Sponsor Health Cover (Diaspora)</h3>
              <button onClick={() => setDiasporaModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleDiasporaSubmit}>
              <div className="form-grid" style={{ marginBottom: '1rem' }}>
                <div className="form-group">
                  <label>Sponsor Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={diasporaForm.sponsor_name}
                    onChange={(e) => setDiasporaForm({ ...diasporaForm, sponsor_name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>City & Country of Residence</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. London, UK or Abuja, Nigeria"
                    value={diasporaForm.sponsor_city}
                    onChange={(e) => setDiasporaForm({ ...diasporaForm, sponsor_city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Select Relative or Indigent Recipient in Zamfara</label>
                <select
                  className="form-select"
                  value={diasporaForm.beneficiary_id}
                  onChange={(e) => setDiasporaForm({ ...diasporaForm, beneficiary_id: e.target.value })}
                >
                  {beneficiaries.map(b => (
                    <option key={b.id} value={b.id}>{b.full_name} ({b.lga_name} - Current Bal: ₦{parseFloat(b.wallet_balance).toLocaleString()})</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Amount in Naira (₦)</label>
                <input
                  type="number"
                  required
                  min="500"
                  step="500"
                  className="form-input"
                  value={diasporaForm.amount_naira}
                  onChange={(e) => setDiasporaForm({ ...diasporaForm, amount_naira: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Personal Message to Family Member</label>
                <input
                  type="text"
                  className="form-input"
                  value={diasporaForm.message}
                  onChange={(e) => setDiasporaForm({ ...diasporaForm, message: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setDiasporaModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-gold">
                  <Gift size={16} /> Pay ₦{parseFloat(diasporaForm.amount_naira || 0).toLocaleString()} & Credit Recipient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: OUTBREAK EMERGENCY MANAGEMENT */}
      {outbreakModalOpen && (
        <div className="modal-overlay" onClick={() => setOutbreakModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} /> {t.outbreakModalTitle}
              </h3>
              <button onClick={() => setOutbreakModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.25rem' }}>
              {t.outbreakModalDesc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {overview?.activeOutbreaks?.map(o => (
                <div key={o.id} style={{ border: '1px solid #fecaca', background: '#fef2f2', padding: '1rem', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 800, color: '#991b1b' }}>{o.outbreak_name}</h4>
                    <button
                      className={o.is_active ? 'btn-gold' : 'btn-secondary'}
                      style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={() => toggleOutbreakProtocol(o.id, o.is_active)}
                    >
                      {o.is_active ? 'Deactivate Waiver' : 'Activate 100% Free Care'}
                    </button>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#7f1d1d', marginBottom: '0.5rem' }}>
                    <strong>Affected LGAs:</strong> {o.affected_lgas}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#7f1d1d' }}>
                    <strong>Directives:</strong> {lang === 'ha' ? o.guideline_ha : o.guideline_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: GAP 1 - REGISTER NEW RECURRING MANDATE */}
      {mandateModalOpen && (
        <div className="modal-overlay" onClick={() => setMandateModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={20} color="#d97706" />
                <span>Register Automated Recurring Mandate (Gap 1)</span>
              </h3>
              <button onClick={() => setMandateModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateMandate}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Select Beneficiary</label>
                  <select
                    className="form-select"
                    value={mandateForm.beneficiary_id}
                    onChange={(e) => setMandateForm({ ...mandateForm, beneficiary_id: e.target.value })}
                  >
                    {beneficiaries.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.full_name} ({b.card_number} - {b.plan_name_en})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Recurring Deduction Channel</label>
                  <select
                    className="form-select"
                    value={mandateForm.channel}
                    onChange={(e) => setMandateForm({ ...mandateForm, channel: e.target.value })}
                  >
                    <option value="Telco Airtime (MTN/Airtel)">Telco Airtime (MTN / Airtel Mobile Network)</option>
                    <option value="NIBSS Direct Debit">NIBSS Direct Debit (Bank Account)</option>
                    <option value="Bank Card Token">Bank Card Tokenization (Mastercard/Visa/Verve)</option>
                    <option value="POS Agent Mandate">Local Village POS Agent Auto-Sweep</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Mobile Number or Bank Account</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. 08035544112 or Account Number"
                    value={mandateForm.phone_or_account}
                    onChange={(e) => setMandateForm({ ...mandateForm, phone_or_account: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Deduction Frequency</label>
                  <select
                    className="form-select"
                    value={mandateForm.frequency}
                    onChange={(e) => setMandateForm({ ...mandateForm, frequency: e.target.value })}
                  >
                    <option value="Monthly (₦500)">Monthly (₦500 / month)</option>
                    <option value="Weekly (₦250)">Weekly (₦250 / week)</option>
                    <option value="Daily (₦50)">Daily (₦50 / day)</option>
                    <option value="Quarterly (₦3,000)">Quarterly (₦3,000 / quarter)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount per Cycle (₦)</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={mandateForm.amount_naira}
                    onChange={(e) => setMandateForm({ ...mandateForm, amount_naira: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setMandateModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-gold">
                  <Zap size={16} /> Authorize Mandate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GAP 2 - REQUEST REAL-TIME AI PRE-AUTHORIZATION */}
      {preauthModalOpen && (
        <div className="modal-overlay" onClick={() => setPreauthModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Stethoscope size={20} color="#2563eb" />
                <span>Request Real-Time AI Surgical Pre-Auth (Gap 2)</span>
              </h3>
              <button onClick={() => setPreauthModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRequestPreauth}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Patient (Beneficiary)</label>
                  <select
                    className="form-select"
                    value={preauthForm.beneficiary_id}
                    onChange={(e) => setPreauthForm({ ...preauthForm, beneficiary_id: e.target.value })}
                  >
                    {beneficiaries.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.full_name} ({b.card_number} - {b.plan_name_en})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Surgical / Specialist Health Facility</label>
                  <select
                    className="form-select"
                    value={preauthForm.provider_id}
                    onChange={(e) => setPreauthForm({ ...preauthForm, provider_id: e.target.value })}
                  >
                    {providers.filter(p => p.tier !== 'phc').map(pr => (
                      <option key={pr.id} value={pr.id}>
                        {pr.name} ({pr.tier.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Surgical Procedure (English)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={preauthForm.procedure_name_en}
                    onChange={(e) => setPreauthForm({ ...preauthForm, procedure_name_en: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Procedure (Hausa)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={preauthForm.procedure_name_ha}
                    onChange={(e) => setPreauthForm({ ...preauthForm, procedure_name_ha: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>ICD-11 Diagnostic Code</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={preauthForm.icd11_code}
                    onChange={(e) => setPreauthForm({ ...preauthForm, icd11_code: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Clinical Urgency Priority</label>
                  <select
                    className="form-select"
                    value={preauthForm.clinical_priority}
                    onChange={(e) => setPreauthForm({ ...preauthForm, clinical_priority: e.target.value })}
                  >
                    <option value="Emergency (< 1h)">Emergency (&lt; 1 hour - Life Threatening)</option>
                    <option value="Urgent (< 24h)">Urgent (&lt; 24 hours)</option>
                    <option value="Elective (Standard)">Elective (Standard Scheduled Surgery)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Estimated Hospital Tariff (₦)</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={preauthForm.estimated_cost}
                    onChange={(e) => setPreauthForm({ ...preauthForm, estimated_cost: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setPreauthModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Zap size={16} /> Evaluate & Auto-Authorize (&lt; 5s)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GAP 4 - ISSUE DIASPORA REMITTANCE BOND */}
      {bondModalOpen && (
        <div className="modal-overlay" onClick={() => setBondModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Gift size={20} color="#db2777" />
                <span>Issue Diaspora Multi-Family Health Bond (Gap 4)</span>
              </h3>
              <button onClick={() => setBondModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleIssueBond}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Diaspora Sponsor Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Dr. Kabir Danbaba Gusau"
                    value={bondForm.sponsor_name}
                    onChange={(e) => setBondForm({ ...bondForm, sponsor_name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Sponsor City & Country</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="London"
                      value={bondForm.sponsor_city}
                      onChange={(e) => setBondForm({ ...bondForm, sponsor_city: e.target.value })}
                    />
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="United Kingdom"
                      value={bondForm.sponsor_country}
                      onChange={(e) => setBondForm({ ...bondForm, sponsor_country: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Target LGA in Zamfara</label>
                  <select
                    className="form-select"
                    value={bondForm.target_lga_id}
                    onChange={(e) => setBondForm({ ...bondForm, target_lga_id: e.target.value })}
                  >
                    {lgas.map(l => (
                      <option key={l.id} value={l.id}>{l.name} LGA</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Vulnerable Families to Sponsor</label>
                  <select
                    className="form-select"
                    value={bondForm.families_count}
                    onChange={(e) => setBondForm({ ...bondForm, families_count: e.target.value })}
                  >
                    <option value="10">10 Families (₦120,000 / ~$80 USD)</option>
                    <option value="25">25 Families (₦300,000 / ~$200 USD)</option>
                    <option value="50">50 Families (₦600,000 / ~$400 USD)</option>
                    <option value="100">100 Families (₦1,200,000 / ~$800 USD)</option>
                    <option value="250">250 Families (₦3,000,000 / ~$2,000 USD)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Beneficiary Cohort Priority</label>
                  <select
                    className="form-select"
                    value={bondForm.beneficiary_category}
                    onChange={(e) => setBondForm({ ...bondForm, beneficiary_category: e.target.value })}
                  >
                    <option value="Pregnant Women & Infants">Pregnant Women & Newborns (Maternal Care)</option>
                    <option value="Indigent / IDPs">Displaced Families & Conflict-Affected IDPs</option>
                    <option value="Elderly Chronic Patients">Elderly Chronic Patients (Hypertension/Diabetes)</option>
                    <option value="General Rural Artisans">General Rural Farmers & Tailors</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Dedication Message / Memorial Note</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="In honour of my late parents in Gusau..."
                    value={bondForm.message}
                    onChange={(e) => setBondForm({ ...bondForm, message: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setBondModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-gold">
                  <Gift size={16} /> Issue Verifiable Bond & Tax Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GENERATE ADVANCE CAPITATION */}
      {capitationModalOpen && (
        <div className="modal-overlay" onClick={() => setCapitationModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  {lang === 'ha' ? 'Shirya Kudin Gudanarwa na Asibitoci (Advance Capitation)' : 'Generate Advance PHC Capitation Batch'}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                  Statutory 1st-of-month advance payment across all 14 Local Government Areas
                </p>
              </div>
              <button onClick={() => setCapitationModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGenerateCapitation}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Billing Month (English)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={capitationForm.billing_month_en}
                    onChange={(e) => setCapitationForm({ ...capitationForm, billing_month_en: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Billing Month (Hausa)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={capitationForm.billing_month_ha}
                    onChange={(e) => setCapitationForm({ ...capitationForm, billing_month_ha: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Capitation Rate (₦ / Enrollee / Month)</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={capitationForm.rate_per_enrollee}
                    onChange={(e) => setCapitationForm({ ...capitationForm, rate_per_enrollee: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Clearing Interbank Network</label>
                  <select className="form-select" disabled>
                    <option>NIBSS Direct Automated Clearing (CBN Reconciled)</option>
                  </select>
                </div>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem', marginTop: '1rem', fontSize: '0.8rem', color: '#065f46' }}>
                <strong>Statutory Rule:</strong> Advance capitation funds will be wired directly into each accredited primary health facility's dedicated sovereign bank account on or before the 1st of the billing month.
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setCapitationModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Landmark size={16} /> Disburse Advance Capitation Wire
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LOG PREVENTION REWARD */}
      {rewardModalOpen && (
        <div className="modal-overlay" onClick={() => setRewardModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  {lang === 'ha' ? 'Ba da Kyautar Rigakafi (Log Prevention Reward)' : 'Log Verified Prevention Health Milestone'}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                  Trigger instant ₦200 airtime top-up, wallet cash-back, or nutrition voucher
                </p>
              </div>
              <button onClick={() => setRewardModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleTriggerReward}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Enrolled Beneficiary (Mother / Infant)</label>
                  <select
                    className="form-select"
                    value={rewardForm.beneficiary_id}
                    onChange={(e) => setRewardForm({ ...rewardForm, beneficiary_id: e.target.value })}
                  >
                    {beneficiaries.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.full_name} (NIN: {b.nin} · {b.lga_name || 'Zamfara'})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Accredited Healthcare Centre</label>
                  <select
                    className="form-select"
                    value={rewardForm.provider_id}
                    onChange={(e) => setRewardForm({ ...rewardForm, provider_id: e.target.value })}
                  >
                    {providers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.lga_name})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Clinical Prevention Milestone</label>
                  <select
                    className="form-select"
                    value={rewardForm.milestone_type}
                    onChange={(e) => setRewardForm({ ...rewardForm, milestone_type: e.target.value })}
                  >
                    <option value="anc_visit_4">4th Antenatal Care (ANC-4) Completion · ₦200 Airtime</option>
                    <option value="child_immunization_penta3">Pentavalent-3 Child Immunization · ₦200 Savings Wallet</option>
                    <option value="malaria_iptp_llin">Malaria IPTp + LLIN Treated Bednet · ₦2,500 Voucher</option>
                    <option value="postnatal_nutrition_rutf">Postnatal 48h Checkup + RUTF Nutrition · ₦3,000 Pack</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Incentive Delivery Channel</label>
                  <select
                    className="form-select"
                    value={rewardForm.delivery_channel}
                    onChange={(e) => setRewardForm({ ...rewardForm, delivery_channel: e.target.value })}
                  >
                    <option value="airtime_mtn">MTN Nigeria Airtime (Direct API Top-up)</option>
                    <option value="airtime_airtel">Airtel Nigeria Airtime (Direct API Top-up)</option>
                    <option value="wallet_credit">Z-HIMS Family Savings Wallet</option>
                    <option value="clinic_voucher">Clinic Pharmacy Physical Voucher</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Citizen Receiving Phone Number</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={rewardForm.phone_number}
                    onChange={(e) => setRewardForm({ ...rewardForm, phone_number: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.85rem', marginTop: '1rem', fontSize: '0.8rem', color: '#92400e' }}>
                <strong>Behavioral Health Incentive:</strong> The micro-credit or voucher token will be instantly routed to the citizen upon submission, logged into the auditable sovereign ledger, and notified via SMS.
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setRewardModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} /> Disburse Prevention Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: OFFICER IDENTITY & STATUTORY CLEARANCE PROFILE */}
      {profileModalOpen && (
        <div className="modal-overlay" onClick={() => setProfileModalOpen(false)}>
          <div className="modal-card profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '10px', background: `${currentRoleConfig.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={20} color={currentRoleConfig.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                    {t.profileModalTitle}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                    {t.profileModalSub}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setProfileModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Profile Hero Banner */}
            <div
              className="profile-hero-banner"
              style={{
                background: `linear-gradient(135deg, ${currentRoleConfig.color} 0%, #043625 100%)`,
                boxShadow: `0 8px 20px -4px ${currentRoleConfig.color}40`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', zIndex: 1 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'white',
                    color: currentRoleConfig.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    flexShrink: 0
                  }}
                >
                  {currentUser.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0, color: 'white' }}>
                      {currentUser.full_name}
                    </h2>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#fbbf24', color: '#043625', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                      {currentRoleConfig.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600 }}>
                    {lang === 'ha' ? currentRoleConfig.roleTitleHa : currentRoleConfig.roleName}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#fef08a', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={13} />
                    <span>{lang === 'ha' ? currentRoleConfig.clearanceLevelHa : currentRoleConfig.clearanceLevel}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', zIndex: 1 }}>
                <div style={{ fontSize: '0.68rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.activeRoleNotice}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24' }}>
                  {currentUser.role?.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Officer Duty Station & Jurisdiction */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                  {t.dutyPostLabel}
                </span>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginTop: '0.15rem' }}>
                  {currentRoleConfig.dutyPost}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                  {t.jurisdictionLabel}
                </span>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginTop: '0.15rem' }}>
                  {currentRoleConfig.jurisdiction}
                </div>
              </div>
            </div>

            {/* Operational Legal Mandate */}
            <div className="profile-mandate-card" style={{ borderLeftColor: currentRoleConfig.color }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem', color: currentRoleConfig.color, fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <Shield size={15} />
                <span>{t.operationalMandate}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                {lang === 'ha' ? currentRoleConfig.mandate_ha : currentRoleConfig.mandate_en}
              </p>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.4rem', fontWeight: 600 }}>
                Statutory Authority: Zamfara State Healthcare Agency Law 2019 & National NHIA Act 2022 Section 13(2)
              </div>
            </div>

            {/* Granular Capabilities & Access Boundaries */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.65rem' }}>
                {lang === 'ha' ? 'Rukunonin Ayyuka da Iyakokin Shaidar Aiki' : 'Role Scopes & Operational Boundaries Matrix'}
              </div>

              <div className="capabilities-matrix-grid">
                {/* Column 1: Authorized */}
                <div className="capability-column-card">
                  <div className="capability-column-header allowed">
                    <CheckCircle2 size={15} />
                    <span>{t.authorizedPermissions}</span>
                  </div>
                  <div className="capability-list">
                    {currentRoleConfig.capabilities.filter(c => c.allowed).map((cap, idx) => (
                      <div key={idx} className="capability-item">
                        <Check size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{cap.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Restricted */}
                <div className="capability-column-card">
                  <div className="capability-column-header restricted">
                    <Lock size={15} />
                    <span>{t.restrictedPermissions}</span>
                  </div>
                  <div className="capability-list">
                    {currentRoleConfig.capabilities.filter(c => !c.allowed).map((cap, idx) => (
                      <div key={idx} className="capability-item">
                        <X size={14} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: '#64748b' }}>{cap.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Role Switcher Matching the 5 Demo Cards */}
            <div className="role-switcher-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                    {t.switchRoleTitle}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {t.switchRoleSub}
                  </div>
                </div>
                <span style={{ fontSize: '0.7rem', background: '#ecfdf5', color: '#065f46', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                  5 Officer Profiles
                </span>
              </div>

              <div className="role-switcher-grid">
                {demoRoles.map(dr => {
                  const RoleIcon = dr.icon;
                  const isCurrent = currentUser.role === dr.roleKey;
                  return (
                    <div
                      key={dr.roleKey}
                      className={`role-switch-pill ${isCurrent ? 'active' : ''}`}
                      onClick={() => {
                        handleLogin(null, dr.identifier, dr.password);
                        setProfileModalOpen(false);
                      }}
                      title={`Switch to ${dr.roleName}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '8px',
                            background: `${dr.color}20`,
                            border: `1px solid ${dr.color}60`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <RoleIcon size={17} color={dr.color} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span>{lang === 'ha' ? dr.roleTitleHa : dr.roleName}</span>
                            {isCurrent && (
                              <span style={{ fontSize: '0.62rem', background: '#059669', color: 'white', padding: '0.05rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>
                                Active
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            {dr.name} · <span style={{ color: dr.color, fontWeight: 700 }}>{dr.badge}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                          {isCurrent ? 'Current Session' : 'Switch ➔'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setProfileModalOpen(false)}
                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
              >
                Close Profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  background: '#fee2e2',
                  border: '1px solid #fca5a5',
                  color: '#991b1b',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <LogOut size={14} />
                <span>{t.btnLogout}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div>
            <div style={{ fontWeight: 800, color: '#f8fafc', marginBottom: '0.25rem' }}>Z-HIMS · Zamfara Health Insurance Management System</div>
            <div>Zamfara State Contributory Healthcare Management Agency (ZAMCHEMA)</div>
            <div style={{ fontSize: '0.78rem', marginTop: '0.5rem' }}>
              Compliant with NHIA Act 2022 · FHIR R4 · Digital Health Interoperability Network (DHIN) · NDPA 2023
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, color: '#f8fafc' }}>Gusau, Zamfara State</div>
            <div style={{ fontSize: '0.78rem', marginTop: '0.35rem', opacity: 0.85 }}>Federal Republic of Nigeria</div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
