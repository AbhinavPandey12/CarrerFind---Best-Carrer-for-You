export interface AssessmentAnswerState {
  // Single-select dimensions now support: a number, an array of numbers, or 'not_clear'
  technicalOrientation: number | number[] | 'not_clear'; // 1 (Pure Business/People) to 10 (Deep Core Engineering)
  workMode: string | string[] | 'not_clear'; // 'remote' | 'hybrid' | 'onsite' | 'field' or multiples
  workLifeBalanceTolerance: number | number[] | 'not_clear'; // 1 (Strict 40h/wk) to 10 (High stakes, high pressure)
  salaryPriority: number | number[] | 'not_clear'; // 1 (Moderate) to 10 (Maximize compensation/equity)
  mathAnalyticalAptitude: number | number[] | 'not_clear'; // 1 (Low math) to 10 (High quantitative rigor)
  ambiguityTolerance: number | number[] | 'not_clear'; // 1 (Structured processes) to 10 (High chaos/entrepreneurial)
  leadershipPeopleAptitude: number | number[] | 'not_clear'; // 1 (Individual craft) to 10 (Executive command & stakeholder influence)
  helpingAndHumanImpact: number | number[] | 'not_clear'; // 1 (Detached systems) to 10 (Direct clinical patient care & human healing)
  creativeDesignAptitude: number | number[] | 'not_clear'; // 1 (Pure logic) to 10 (High aesthetic, visual, narrative expression)
  physicalDexterityTacticalCraft: number | number[] | 'not_clear'; // 1 (Pure desk work) to 10 (High physical mastery, tactical operations, piloting)
  governanceLawPublicService: number | number[] | 'not_clear'; // 1 (Private commerce) to 10 (National justice, sovereign defense, public policy)
  continuousLearning: number | number[] | 'not_clear'; // 1 (Never study after work) to 10 (Love learning every day)
  lifestylePainPoints: string[]; // Things user dislikes / wants to avoid in their career
  existingSkills: string[];
  preferredIndustries: string[];
}

export interface RecommendedCareerResult {
  careerSlug: string;
  title: string;
  category: string;
  compatibilityScore: number;
  whyMatch: string;
  possessedSkills: string[];
  missingSkills: string[];
  learningDifficulty: number;
  entryJobDifficulty: number;
  entrySalaryMin: number;
  entrySalaryMax: number;
  midSalaryMin: number;
  midSalaryMax: number;
  seniorSalaryMin: number;
  seniorSalaryMax: number;
  workLifeBalance: number;
  futureDemandOutlook: string;
  internationalOpportunities: string;
  disadvantages: string[];
  iconName: string;
}

export const ASSESSMENT_QUESTIONS = [
  {
    id: 'technicalOrientation',
    step: 1,
    category: 'Work Orientation',
    title: 'How deep into technical and engineering systems do you prefer your day-to-day work to be?',
    description: 'Do you prefer building software, electronics, and machines, or working primarily with people, patients, laws, or business deals?',
    options: [
      { label: 'Building Deep Tech & Software', value: 9, description: 'Writing computer code, building artificial intelligence, designing microchips, or engineering complex digital systems.' },
      { label: 'Practical Engineering & Technical Solutions', value: 7, description: 'Using engineering principles to build structures, manage cloud servers, fix machinery, or solve real-world technical problems.' },
      { label: 'Connecting Tech with People & Business', value: 5, description: 'Acting as the bridge between technical experts and non-technical clients, managers, or everyday users.' },
      { label: 'Working with People, Healthcare, or Law', value: 2, description: 'Focusing on patient care, teaching students, arguing in court, closing business deals, or artistic creation.' },
      { label: 'Not Clear', value: 'not_clear', description: 'I am not sure yet how much technical or engineering work I want to do.' },
    ],
  },
  {
    id: 'workMode',
    step: 2,
    category: 'Work Environment',
    title: 'What is your ideal work environment and physical setting?',
    description: 'Where do you picture yourself doing your best work every day?',
    options: [
      { label: 'Work from Home / Anywhere (Remote)', value: 'remote', description: 'Working on a laptop from home or anywhere in the world with high schedule freedom.' },
      { label: 'Mix of Office and Home (Hybrid)', value: 'hybrid', description: '2 to 3 days in a modern office with teammates, combined with quiet work-from-home days.' },
      { label: 'Traditional Office Setting', value: 'onsite', description: 'Working in an office, bank branch, school, corporate boardroom, or consulting room with colleagues.' },
      { label: 'Active Field, Hospital, Cockpit, or Outdoor Site', value: 'field', description: 'Working on your feet in hospitals, construction sites, airplane cockpits, naval ships, or kitchens.' },
      { label: 'Not Clear', value: 'not_clear', description: "I am open to different work settings and haven't settled on one yet." },
    ],
  },
  {
    id: 'workLifeBalanceTolerance',
    step: 3,
    category: 'Pace & Lifestyle',
    title: 'What is your preference regarding work pace, pressure, and weekly commitments?',
    description: 'How many hours and how much daily pressure are you comfortable handling in exchange for career growth?',
    options: [
      { label: 'Strict 9-to-5 / Predictable Hours (35–40 hrs/wk)', value: 3, description: 'Clear boundaries between work and life, minimal overtime or weekend calls, prioritizing personal hobbies and family.' },
      { label: 'Balanced with Occasional Busy Sprints (40–50 hrs/wk)', value: 6, description: 'A steady full-time pace with occasional late nights when important projects launch or deadlines arrive.' },
      { label: 'High Intensity & Fast Pace (50–65 hrs/wk)', value: 8, description: 'Fast-moving environments with tight deadlines, high responsibility, and substantial dedication required.' },
      { label: 'Maximum Dedication & High-Stakes (65+ hrs/wk)', value: 10, description: 'Willing to put in demanding long hours and emergency duty in exchange for elite compensation or top-tier impact.' },
      { label: 'Not Clear', value: 'not_clear', description: 'I am not sure yet what weekly workload and pace will suit my lifestyle best.' },
    ],
  },
  {
    id: 'salaryPriority',
    step: 4,
    category: 'Financial Aspirations',
    title: 'What role does financial compensation and equity upside play in your career decisions?',
    description: 'How important is earning a very high salary compared to job stability, work-life balance, and personal passion?',
    options: [
      { label: 'Maximizing Wealth & Highest Possible Pay', value: 10, description: 'Reaching top-tier income through bonuses, company stock, sales commissions, or building a valuable business.' },
      { label: 'High Salary with Long-Term Security', value: 7, description: 'Earning a comfortable, well-paying salary with job stability, health benefits, and a steady career path.' },
      { label: 'Fair, Livable Wage with Low Stress', value: 5, description: 'Earning enough to live comfortably and pay bills, while prioritizing low stress and good work-life balance.' },
      { label: 'Mission, Helping Others & Passion First', value: 3, description: 'Doing meaningful work that heals patients, upholds justice, teaches students, or expresses art, even if pay is modest.' },
      { label: 'Not Clear', value: 'not_clear', description: "I haven't decided how to balance salary ambitions against personal fulfillment." },
    ],
  },
  {
    id: 'mathAnalyticalAptitude',
    step: 5,
    category: 'Aptitude & Methods',
    title: 'How much quantitative analysis, mathematics, and data modeling do you want in your career?',
    description: 'How comfortable and excited are you about working with math, numbers, calculations, and data?',
    options: [
      { label: 'Advanced Math, Algorithms & Statistics', value: 9, description: 'Solving difficult equations, statistical formulas, quantitative finance models, or deep machine learning math.' },
      { label: 'Practical Business Numbers & Data Analysis', value: 7, description: 'Working with financial budgets, company metrics, engineering calculations, and data charts to make decisions.' },
      { label: 'Everyday Problem-Solving & Basic Math', value: 5, description: 'Using common-sense logic, basic arithmetic, and step-by-step organization to solve everyday work problems.' },
      { label: 'People, Words, Stories & Visuals (Little to No Math)', value: 2, description: 'Focusing on writing, speaking, listening to people, patient care, design, or legal arguments rather than numbers.' },
      { label: 'Not Clear', value: 'not_clear', description: 'I am not sure how much math or data analysis I would like in my daily routine.' },
    ],
  },
  {
    id: 'ambiguityTolerance',
    step: 6,
    category: 'Problem Style',
    title: 'How comfortable are you with ambiguity and undefined operational territory?',
    description: 'Do you prefer having step-by-step instructions and clear rules, or figuring things out on your own when there is no guide?',
    options: [
      { label: 'Invent from Scratch / Thrive in Uncertainty', value: 9, description: 'You enjoy situations where no guide exists yet, such as launching a new startup or exploring uncharted ideas.' },
      { label: 'Goal-Oriented / Figure Out the Best Strategy', value: 6, description: 'You like having a clear goal or project, but you enjoy deciding the best strategy and steps to get it done.' },
      { label: 'Clear Guidelines with Helpful Mentorship', value: 4, description: 'You work best when there are proven examples, best practices, and experienced leaders to guide your work.' },
      { label: 'Strict Rules, Standard Procedures & Safety Checklists', value: 2, description: 'You prefer following well-tested safety protocols, established laws, or flight/medical checklists where precision is key.' },
      { label: 'Not Clear', value: 'not_clear', description: 'I am not sure how much structure versus freedom I prefer in my day-to-day tasks.' },
    ],
  },
  {
    id: 'leadershipPeopleAptitude',
    step: 7,
    category: 'People & Leadership',
    title: 'How much do you enjoy direct leadership, stakeholder negotiation, and influencing people?',
    description: 'How do you prefer working with others: leading the group, coaching people, or working independently on your own?',
    options: [
      { label: 'Executive Leadership & High-Stakes Negotiation', value: 9, description: 'Inspiring teams, running organizations, pitching to executives, closing major deals, or commanding operations.' },
      { label: 'Mentoring, Teaching & Coaching', value: 7, description: 'Guiding students, coaching athletes, training new teammates, or counseling people one-on-one.' },
      { label: 'Collaborative Team Contributor', value: 5, description: 'Enjoying teamwork and sharing responsibilities with friendly colleagues without having to manage everyone.' },
      { label: 'Independent Specialist / Solo Contributor', value: 3, description: 'Focusing deeply on your own craft, writing code, doing research, or analyzing problems with minimal meetings.' },
      { label: 'Not Clear', value: 'not_clear', description: "I haven't figured out whether I prefer managing others, teamwork, or working independently." },
    ],
  },
  {
    id: 'helpingAndHumanImpact',
    step: 8,
    category: 'Social Impact & Care',
    title: 'How important is direct human care, physical healing, or personal patient welfare in your work?',
    description: 'How important is it that your work directly heals, teaches, or cares for other people or animals?',
    options: [
      { label: 'Direct Medical Healing & Saving Lives', value: 10, description: 'Diagnosing illnesses, performing surgery, caring for hospital patients, or responding to health emergencies.' },
      { label: 'Personal Support, Teaching & Mental Wellbeing', value: 7, description: 'Teaching students, counseling people through difficulties, physical rehabilitation, or caring for animals.' },
      { label: 'Broad Community & Public Benefit', value: 5, description: 'Improving public services, city infrastructure, environmental protection, or creating helpful everyday products.' },
      { label: 'Commercial, Technical, or Systems Focus', value: 2, description: 'Building software, engineering machines, managing financial investments, or running commercial businesses.' },
      { label: 'Not Clear', value: 'not_clear', description: 'I am not sure how central direct personal care should be in my professional life.' },
    ],
  },
  {
    id: 'creativeDesignAptitude',
    step: 9,
    category: 'Creative Expression',
    title: 'How drawn are you to artistic expression, visual design, cinematic storytelling, or culinary craft?',
    description: 'How important is artistic expression, visual creativity, or aesthetic design in what you want to do?',
    options: [
      { label: 'Pure Artistic Creation & Storytelling', value: 9, description: 'Filmmaking, music composition, photography, creative writing, acting, visual arts, or fashion design.' },
      { label: 'Applied Visual, Spatial & UX Design', value: 7, description: 'Designing beautiful websites and apps, architectural spaces, interior decor, or gourmet culinary dining.' },
      { label: 'Practical Problem-Solving Creativity', value: 5, description: 'Finding creative solutions to everyday technical, business, or marketing challenges without making fine art.' },
      { label: 'Objective Logic, Rules & Scientific Facts', value: 2, description: 'Focusing on clear facts, scientific evidence, numbers, legal statutes, and systematic procedures.' },
      { label: 'Not Clear', value: 'not_clear', description: 'I am still exploring how much artistic creativity I want in my daily work.' },
    ],
  },
  {
    id: 'physicalDexterityTacticalCraft',
    step: 10,
    category: 'Tactical & Physical Mastery',
    title: 'How excited are you by high-dexterity physical craft, tactical operations, piloting, or athletics?',
    description: 'Do you prefer hands-on physical action, operating equipment and vehicles, or working quietly at a computer desk?',
    options: [
      { label: 'High-Stakes Piloting, Navigation & Tactical Action', value: 9, description: 'Flying commercial airplanes or helicopters, commanding ships, delicate surgery, policing, or professional sports.' },
      { label: 'Hands-On Craft, Machinery & Physical Building', value: 6, description: 'Working on construction projects, electrical installations, fixing engines, restaurant cooking, or laboratory work.' },
      { label: 'Active & On-the-Move (Visiting Sites & People)', value: 4, description: 'A job where you walk around, inspect buildings, visit clients, or travel rather than sitting still in one spot all day.' },
      { label: 'Desk & Computer-Based Work', value: 2, description: 'Sitting comfortably at a desk, researching, coding, analyzing documents, and communicating via screens and calls.' },
      { label: 'Not Clear', value: 'not_clear', description: 'I am not sure yet whether I prefer hands-on physical work or desk-based work.' },
    ],
  },
  {
    id: 'governanceLawPublicService',
    step: 11,
    category: 'Justice & Public Governance',
    title: 'How drawn are you to constitutional justice, sovereign diplomacy, public safety, or national defense?',
    description: 'Are you drawn to public service, national defense, and upholding the law, or do you prefer the private business world?',
    options: [
      { label: 'National Service, Justice, Defense & Diplomacy', value: 9, description: 'Serving as a lawyer or judge, diplomat in foreign service, police officer, or military officer protecting society.' },
      { label: 'Government Policy, Regulations & Public Ethics', value: 6, description: 'Working in public administration, environmental protection, financial auditing standards, or healthcare policy.' },
      { label: 'Non-Governmental Trades & Independent Careers', value: 4, description: 'Working in private healthcare clinics, engineering firms, creative studios, or local community businesses.' },
      { label: 'Private Sector Innovation & Commerce', value: 2, description: 'Building private market businesses, commercial tech startups, entertainment media, or corporate finance.' },
      { label: 'Not Clear', value: 'not_clear', description: "I haven't decided between government service, legal careers, and private business." },
    ],
  },
  {
    id: 'continuousLearning',
    step: 12,
    category: 'Learning & Growth',
    title: 'How much are you willing to study and learn new skills outside of working hours?',
    description: 'Some careers require constant self-improvement, certifications, and lifelong learning even after a long working day. How do you feel about that?',
    options: [
      { label: 'I love it — studying after work excites me', value: 9, description: 'You actively read books, take online courses, attend workshops, and love growing your knowledge every single day.' },
      { label: 'Happy to learn a few hours a week', value: 7, description: 'You enjoy occasional online courses, podcasts, or reading after work to stay current and improve yourself.' },
      { label: 'Minimal — just a short course or book now and then', value: 4, description: 'You prefer mostly relaxing after work, but are okay with learning something new every few months when needed.' },
      { label: 'I want a job where skills stay stable and rarely need updating', value: 2, description: 'You prefer to master a skill set once and apply it reliably without constantly needing to study new things.' },
      { label: 'Not Clear', value: 'not_clear', description: 'I am not sure how much self-study I would be willing or able to do outside of office hours.' },
    ],
  },
  {
    id: 'lifestylePainPoints',
    step: 13,
    category: 'Lifestyle Preferences',
    title: 'What bothers you most about typical jobs or the kind of lifestyle you want to avoid?',
    description: 'Select everything that applies — this helps us steer you away from careers that would frustrate or exhaust you.',
    isMultiSelect: true,
    skills: [
      'Commuting long distances to work every day',
      'Sitting at a desk all day without moving',
      'Not getting recognized or appreciated for my work',
      'Having no creative freedom or variety in tasks',
      'Working alone with little human interaction',
      'Extreme stress, pressure, and very long hours',
      'Feeling my work makes no real difference to anyone',
      'Earning too little compared to the effort I put in',
      'No clear promotion or career growth path',
      'Doing the same repetitive tasks every single day',
      'Too many rules and rigid procedures to follow',
      'Constant travel and long time away from home/family',
      'Being micromanaged with no independence',
      'Unstable income or job insecurity',
    ],
  },
  {
    id: 'existingSkills',
    step: 14,
    category: 'Current Skillset',
    title: 'Which of the following skills do you already possess or are actively studying?',
    description: 'Select all that apply to help us identify your immediate natural advantages and growth areas.',
    isMultiSelect: true,
    skills: [
      'Coding & Software (Python, JavaScript, Apps)',
      'Algorithms & Logic Problem Solving',
      'Web Development & Design (HTML, React)',
      'Mathematics & Statistics',
      'Finance & Business Budgeting',
      'Accounting & Financial Records',
      'Biology & Human Anatomy',
      'Healthcare & Patient Care',
      'Scientific Lab Experiments',
      'Law, Legal Analysis & Debating',
      'Public Speaking & Presenting',
      'Writing, Journalism & Communication',
      '3D CAD & Mechanical Building',
      'Electrical Wiring & Electronics',
      'Aviation, Piloting & Navigation',
      'Athletics, Fitness & Physical Coaching',
      'Sales, Negotiation & Customer Pitching',
      'Project Planning & Team Leadership',
      'Cooking & Culinary Arts',
      'Graphic Design, UX & Visual Arts',
    ],
  },
  {
    id: 'preferredIndustries',
    step: 15,
    category: 'Industry Interests',
    title: 'Which industry domains are you most genuinely curious to explore?',
    description: 'Select up to 4 sectors that spark your greatest professional enthusiasm.',
    isMultiSelect: true,
    skills: [
      'Technology & Engineering',
      'Business & Management',
      'Medicine & Healthcare',
      'Law & Government',
      'Finance & Banking',
      'Education & Research',
      'Engineering & Built Environment',
      'Creative & Media',
      'Aviation & Maritime Operations',
      'Hospitality & Food',
      'Sports & Fitness',
    ],
  },
];

interface ResolvedNumeric {
  value: number;
  isNotClear: boolean;
  values: number[];
}

function resolveNumericAnswer(val: any, neutralDefault: number = 5): ResolvedNumeric {
  if (val === 'not_clear') {
    return { value: neutralDefault, isNotClear: true, values: [] };
  }
  if (Array.isArray(val)) {
    if (val.length === 0 || (val.length === 1 && val[0] === 'not_clear')) {
      return { value: neutralDefault, isNotClear: true, values: [] };
    }
    const filtered = val.filter((v: any) => v !== 'not_clear');
    if (filtered.length === 0) {
      return { value: neutralDefault, isNotClear: true, values: [] };
    }
    const nums = filtered.map(Number).filter((n: number) => !isNaN(n));
    if (nums.length === 0) {
      return { value: neutralDefault, isNotClear: true, values: [] };
    }
    const sum = nums.reduce((a: number, b: number) => a + b, 0);
    return { value: sum / nums.length, isNotClear: false, values: nums };
  }
  if (typeof val === 'number') {
    return { value: val, isNotClear: false, values: [val] };
  }
  const parsed = Number(val);
  if (!isNaN(parsed) && val !== null && val !== undefined && val !== '') {
    return { value: parsed, isNotClear: false, values: [parsed] };
  }
  return { value: neutralDefault, isNotClear: true, values: [] };
}

interface ResolvedWorkMode {
  modes: string[];
  isNotClear: boolean;
}

function resolveWorkMode(val: any): ResolvedWorkMode {
  if (val === 'not_clear') return { modes: [], isNotClear: true };
  if (Array.isArray(val)) {
    if (val.length === 0 || (val.length === 1 && val[0] === 'not_clear')) {
      return { modes: [], isNotClear: true };
    }
    const modes = val.filter((m: any) => m !== 'not_clear' && typeof m === 'string');
    return { modes, isNotClear: modes.length === 0 };
  }
  if (typeof val === 'string' && val.trim() !== '' && val !== 'not_clear') {
    return { modes: [val], isNotClear: false };
  }
  return { modes: [], isNotClear: true };
}

function computeDimSimilarity(dim: ResolvedNumeric, targetVal: number, neutralScore: number = 0.75): number {
  if (dim.isNotClear || dim.values.length === 0) return neutralScore;
  const minDiff = Math.min(...dim.values.map((v) => Math.abs(v - targetVal)));
  return Math.max(0, 1 - minDiff / 9);
}

export function computeCareerRecommendations(
  answers: AssessmentAnswerState,
  allCareers: any[]
): {
  archetypeTitle: string;
  archetypeSubtitle: string;
  topCareers: RecommendedCareerResult[];
} {
  // 1. Resolve every answer into normalized structures
  const tech = resolveNumericAnswer(answers.technicalOrientation, 5);
  const mode = resolveWorkMode(answers.workMode);
  const wlb = resolveNumericAnswer(answers.workLifeBalanceTolerance, 6);
  const salary = resolveNumericAnswer(answers.salaryPriority, 7);
  const math = resolveNumericAnswer(answers.mathAnalyticalAptitude, 5);
  const ambiguity = resolveNumericAnswer(answers.ambiguityTolerance, 6);
  const leadership = resolveNumericAnswer(answers.leadershipPeopleAptitude, 5);
  const helping = resolveNumericAnswer(answers.helpingAndHumanImpact, 5);
  const creative = resolveNumericAnswer(answers.creativeDesignAptitude, 5);
  const physical = resolveNumericAnswer(answers.physicalDexterityTacticalCraft, 5);
  const governance = resolveNumericAnswer(answers.governanceLawPublicService, 5);
  const learning = resolveNumericAnswer(answers.continuousLearning, 5);
  const painPoints: string[] = Array.isArray(answers.lifestylePainPoints) ? answers.lifestylePainPoints : [];
  const preferredIndustries = Array.isArray(answers.preferredIndustries) ? answers.preferredIndustries : [];
  const userSkills = (answers.existingSkills || []).map((s) => s.toLowerCase());

  // 2. Multi-Criteria Composite Archetype Determination
  // Evaluates every archetype profile comprehensively rather than brittle if-else ladders
  const archetypeProfiles: { key: string; title: string; subtitle: string; score: number }[] = [
    {
      key: 'systems',
      title: 'The Frontier Systems Architect',
      subtitle: 'You thrive on deep algorithmic complexity, mathematical rigor, and engineering systems at the bleeding edge of software, silicon, and intelligence.',
      score: (tech.isNotClear ? 5 : tech.value) * 3.2 +
             (math.isNotClear ? 5 : math.value) * 1.8 +
             (learning.isNotClear ? 5 : learning.value) * 1.2 +
             (preferredIndustries.includes('Technology & Engineering') ? 24 : 0) +
             (userSkills.some((s) => s.includes('code') || s.includes('software') || s.includes('algorithm')) ? 16 : 0),
    },
    {
      key: 'healer',
      title: 'The Compassionate Clinical Healer',
      subtitle: 'You possess a profound dedication to human physical and emotional wellbeing, thriving in environments where clinical knowledge directly restores health and saves lives.',
      score: (helping.isNotClear ? 5 : helping.value) * 4.0 +
             (physical.isNotClear ? 5 : physical.value) * 1.2 +
             (preferredIndustries.includes('Medicine & Healthcare') ? 28 : 0) +
             (userSkills.some((s) => s.includes('biology') || s.includes('anatomy') || s.includes('patient') || s.includes('healthcare')) ? 18 : 0),
    },
    {
      key: 'tactical',
      title: 'The High-Precision Tactical Operator',
      subtitle: 'You excel when operating sophisticated real-world machinery and physical systems under high pressure, maintaining supreme composure in cockpits, bridge decks, and acute theaters.',
      score: (physical.isNotClear ? 5 : physical.value) * 3.5 +
             (wlb.isNotClear ? 6 : wlb.value) * 1.2 +
             (preferredIndustries.includes('Aviation & Maritime Operations') ? 28 : 0) +
             (userSkills.some((s) => s.includes('aviation') || s.includes('piloting') || s.includes('navigation') || s.includes('electronics')) ? 18 : 0),
    },
    {
      key: 'justice',
      title: 'The Guardian of Justice & Sovereign Policy',
      subtitle: 'You are driven by the rule of law, constitutional ethics, and sovereign diplomacy, aspiring to defend human rights, govern institutions, and shape national policy.',
      score: (governance.isNotClear ? 5 : governance.value) * 4.0 +
             (leadership.isNotClear ? 5 : leadership.value) * 1.5 +
             (preferredIndustries.includes('Law & Government') ? 28 : 0) +
             (userSkills.some((s) => s.includes('law') || s.includes('debating') || s.includes('speaking')) ? 16 : 0),
    },
    {
      key: 'capital',
      title: 'The Quantitative Capital Allocator',
      subtitle: 'You possess sharp numeric intuition, thriving on financial valuation, risk quantification, and structuring high-stakes investments in global capital markets.',
      score: (math.isNotClear ? 5 : math.value) * 2.8 +
             (salary.isNotClear ? 7 : salary.value) * 2.2 +
             (preferredIndustries.includes('Finance & Banking') ? 26 : 0) +
             (userSkills.some((s) => s.includes('finance') || s.includes('accounting') || s.includes('budgeting')) ? 18 : 0),
    },
    {
      key: 'creative',
      title: 'The Expressive Storyteller & Creative Visionary',
      subtitle: 'You combine refined artistic taste with narrative intuition, driven to evoke profound human emotion through cinematic visuals, music, literature, or bespoke design.',
      score: (creative.isNotClear ? 5 : creative.value) * 4.2 +
             (ambiguity.isNotClear ? 5 : ambiguity.value) * 1.5 +
             (preferredIndustries.includes('Creative & Media') ? 28 : 0) +
             (userSkills.some((s) => s.includes('design') || s.includes('writing') || s.includes('arts') || s.includes('cooking')) ? 18 : 0),
    },
    {
      key: 'founder',
      title: 'The High-Conviction Venture Founder',
      subtitle: 'You possess an extraordinary appetite for high ambiguity, leadership under uncertainty, and building groundbreaking companies from absolute scratch.',
      score: (ambiguity.isNotClear ? 5 : ambiguity.value) * 3.0 +
             (salary.isNotClear ? 7 : salary.value) * 1.8 +
             (leadership.isNotClear ? 5 : leadership.value) * 2.0 +
             (preferredIndustries.includes('Business & Management') ? 15 : 0),
    },
    {
      key: 'dealmaker',
      title: 'The Strategic Commercial Dealmaker',
      subtitle: 'You excel in fast-paced executive rooms, orchestrating multi-million dollar contracts, building strategic coalitions, and driving organizational transformation.',
      score: (leadership.isNotClear ? 5 : leadership.value) * 3.5 +
             (salary.isNotClear ? 7 : salary.value) * 1.5 +
             (preferredIndustries.includes('Business & Management') ? 26 : 0) +
             (userSkills.some((s) => s.includes('sales') || s.includes('negotiation') || s.includes('leadership')) ? 18 : 0),
    },
    {
      key: 'builder',
      title: 'The Master Builder & Infrastructure Architect',
      subtitle: 'You are driven to leave an indelible physical mark on the world, designing towering structures, renewable power grids, and civil marvels that endure for generations.',
      score: (physical.isNotClear ? 5 : physical.value) * 2.5 +
             (math.isNotClear ? 5 : math.value) * 2.0 +
             (preferredIndustries.includes('Engineering & Built Environment') ? 28 : 0) +
             (userSkills.some((s) => s.includes('cad') || s.includes('mechanical') || s.includes('electrical') || s.includes('circuits')) ? 18 : 0),
    },
    {
      key: 'craftsman',
      title: 'The Master Craftsman & Human Performance Optimizer',
      subtitle: 'You embody tactile mastery, physical discipline, and sensory precision, inspiring physical excellence in athletics or culinary artistry.',
      score: (physical.isNotClear ? 5 : physical.value) * 3.2 +
             (creative.isNotClear ? 5 : creative.value) * 1.5 +
             (preferredIndustries.includes('Sports & Fitness') || preferredIndustries.includes('Hospitality & Food') ? 28 : 0) +
             (userSkills.some((s) => s.includes('athletics') || s.includes('fitness') || s.includes('cooking') || s.includes('culinary')) ? 18 : 0),
    },
    {
      key: 'academic',
      title: 'The Knowledge Pioneer & Academic Mentor',
      subtitle: 'You are animated by the pursuit of fundamental truth, scientific discovery, and nurturing the intellectual curiosity of the next generation.',
      score: (learning.isNotClear ? 5 : learning.value) * 2.8 +
             (helping.isNotClear ? 5 : helping.value) * 2.0 +
             (preferredIndustries.includes('Education & Research') ? 28 : 0) +
             (userSkills.some((s) => s.includes('teaching') || s.includes('tutoring') || s.includes('experiments') || s.includes('lab')) ? 18 : 0),
    },
  ];

  archetypeProfiles.sort((a, b) => b.score - a.score);
  const bestArchetype = archetypeProfiles[0];
  const archetypeTitle = bestArchetype.score >= 38 ? bestArchetype.title : 'The Frontier Strategic Innovator';
  const archetypeSubtitle = bestArchetype.score >= 38 ? bestArchetype.subtitle : 'You excel at bridging systemic complexity with tangible real-world outcomes, driving high-impact initiatives across modern disciplines.';

  // 3. Multi-Vector Scoring of Each Career
  const scored = allCareers.map((career) => {
    const category = career.category || '';
    const industry = career.industry || '';
    const slug = career.slug || '';

    // --- Component 1: Industry & Domain Match (Weight: 35%) ---
    let domainScore = 55; // Neutral baseline when user has no strict preference
    const hasPreferred = preferredIndustries.length > 0;

    if (hasPreferred) {
      if (preferredIndustries.includes(category) || preferredIndustries.includes(industry)) {
        domainScore = 100;
      } else {
        // Significantly deprioritize unrelated industries when user has explicit targets
        domainScore = 18;
      }
    }

    // Natural category affinity computed from question answers
    let categoryAffinity = 0;
    if (category === 'Medicine & Healthcare') {
      if (!helping.isNotClear) categoryAffinity += (helping.value - 5) * 8;
      if (!physical.isNotClear && (slug.includes('surgeon') || slug.includes('dentist'))) categoryAffinity += (physical.value - 5) * 3;
    } else if (category === 'Technology & Engineering') {
      if (!tech.isNotClear) categoryAffinity += (tech.value - 5) * 8;
      if (!math.isNotClear) categoryAffinity += (math.value - 5) * 3;
      if (!learning.isNotClear) categoryAffinity += (learning.value - 5) * 3;
    } else if (category === 'Finance & Banking') {
      if (!math.isNotClear) categoryAffinity += (math.value - 5) * 7;
      if (!salary.isNotClear) categoryAffinity += (salary.value - 5) * 5;
    } else if (category === 'Law & Government') {
      if (!governance.isNotClear) categoryAffinity += (governance.value - 5) * 9;
      if (!leadership.isNotClear) categoryAffinity += (leadership.value - 5) * 3;
    } else if (category === 'Business & Management') {
      if (!leadership.isNotClear) categoryAffinity += (leadership.value - 5) * 8;
      if (!ambiguity.isNotClear) categoryAffinity += (ambiguity.value - 5) * 4;
    } else if (category === 'Creative & Media') {
      if (!creative.isNotClear) categoryAffinity += (creative.value - 5) * 10;
      if (!tech.isNotClear) categoryAffinity += (5 - tech.value) * 3;
    } else if (category === 'Aviation & Maritime Operations') {
      if (!physical.isNotClear) categoryAffinity += (physical.value - 5) * 9;
      if (!ambiguity.isNotClear) categoryAffinity += (5 - ambiguity.value) * 3;
    } else if (category === 'Engineering & Built Environment') {
      if (!math.isNotClear) categoryAffinity += (math.value - 5) * 4;
      if (!physical.isNotClear) categoryAffinity += (physical.value - 5) * 6;
    } else if (category === 'Hospitality & Food') {
      if (!creative.isNotClear) categoryAffinity += (creative.value - 5) * 5;
      if (!physical.isNotClear) categoryAffinity += (physical.value - 5) * 5;
    } else if (category === 'Sports & Fitness') {
      if (!physical.isNotClear) categoryAffinity += (physical.value - 5) * 9;
      if (!helping.isNotClear) categoryAffinity += (helping.value - 5) * 3;
    } else if (category === 'Education & Research') {
      if (!helping.isNotClear) categoryAffinity += (helping.value - 5) * 5;
      if (!learning.isNotClear) categoryAffinity += (learning.value - 5) * 5;
    }

    // --- Component 2: Core Aptitude & Difficulty Match (Weight: 30%) ---
    const techSim = computeDimSimilarity(tech, career.technicalComplexity || 5);
    const mathSim = computeDimSimilarity(math, career.mathRequirements || 5);
    const wlbSim = computeDimSimilarity(wlb, career.workPressure || 7);
    const learningSim = computeDimSimilarity(learning, career.learningDifficulty || 6);

    const aptitudeScore = (techSim * 0.35 + mathSim * 0.25 + wlbSim * 0.20 + learningSim * 0.20) * 100;

    // --- Component 3: Work Environment & Physical Setting (Weight: 15%) ---
    const remoteOpp = career.remoteOpportunities || 5;
    let workModeScore = 70; // neutral default
    if (!mode.isNotClear && mode.modes.length > 0) {
      let bestModeMatch = 25;
      if (mode.modes.includes('remote')) {
        if (remoteOpp >= 8) bestModeMatch = Math.max(bestModeMatch, 100);
        else if (remoteOpp >= 6) bestModeMatch = Math.max(bestModeMatch, 75);
        else if (remoteOpp <= 2) bestModeMatch = Math.min(bestModeMatch, 15);
      }
      if (mode.modes.includes('hybrid')) {
        if (remoteOpp >= 4 && remoteOpp <= 8) bestModeMatch = Math.max(bestModeMatch, 100);
        else bestModeMatch = Math.max(bestModeMatch, 65);
      }
      if (mode.modes.includes('onsite')) {
        if (remoteOpp <= 6 || category === 'Finance & Banking' || category === 'Law & Government' || category === 'Business & Management') {
          bestModeMatch = Math.max(bestModeMatch, 95);
        }
      }
      if (mode.modes.includes('field')) {
        if (remoteOpp <= 4 || category === 'Aviation & Maritime Operations' || category === 'Sports & Fitness' || category === 'Engineering & Built Environment' || category === 'Hospitality & Food' || category === 'Medicine & Healthcare') {
          bestModeMatch = Math.max(bestModeMatch, 100);
        } else {
          bestModeMatch = Math.min(bestModeMatch, 25);
        }
      }
      workModeScore = bestModeMatch;
    }

    // --- Component 4: Salary Expectations & Ceiling (Weight: 10%) ---
    const seniorMax = career.seniorSalaryMax || 200;
    let salaryScore = 75;
    if (!salary.isNotClear) {
      if (salary.values.some((v) => v >= 9)) {
        if (seniorMax >= 300) salaryScore = 100;
        else if (seniorMax >= 220) salaryScore = 80;
        else salaryScore = 40;
      } else if (salary.values.some((v) => v <= 4)) {
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' || category === 'Law & Government' || category === 'Creative & Media') {
          salaryScore = 95;
        } else {
          salaryScore = 75;
        }
      } else {
        if (seniorMax >= 180 && seniorMax <= 300) salaryScore = 95;
        else salaryScore = 80;
      }
    }

    // --- Component 5: Skills Possessed & Gap Analysis (Weight: 10%) ---
    let essentialTech: string[] = [];
    try {
      essentialTech = JSON.parse(career.essentialTechSkills || '[]');
    } catch (e) {
      essentialTech = [];
    }

    const possessed: string[] = [];
    const missing: string[] = [];

    essentialTech.forEach((skill) => {
      const skillLower = skill.toLowerCase();
      const hasMatch = userSkills.some((us) => {
        const words = us.split(/[\s/(),.-]+/);
        return words.some((w) => w.length > 2 && skillLower.includes(w));
      });

      if (hasMatch) {
        possessed.push(skill);
      } else {
        missing.push(skill);
      }
    });

    const skillRatio = essentialTech.length > 0 ? possessed.length / essentialTech.length : 0.4;
    const skillBonus = possessed.length * 4;

    // --- Component 6: Lifestyle Pain Points & Frustration Penalties/Bonuses ---
    let painPointDelta = 0;
    if (painPoints.length > 0) {
      const wlbVal = career.workLifeBalance || 7;
      const pressureVal = career.workPressure || 7;

      // 1. Commute
      if (painPoints.includes('Commuting long distances to work every day')) {
        if (remoteOpp >= 7) painPointDelta += 8;
        if (remoteOpp <= 3 && category !== 'Aviation & Maritime Operations') painPointDelta -= 8;
      }
      // 2. Desk sitting
      if (painPoints.includes('Sitting at a desk all day without moving')) {
        if (category === 'Aviation & Maritime Operations' || category === 'Sports & Fitness' || category === 'Hospitality & Food' || category === 'Engineering & Built Environment') {
          painPointDelta += 16;
        } else if (category === 'Medicine & Healthcare' && (slug.includes('surgeon') || slug.includes('physiotherapist') || slug.includes('nurse') || slug.includes('doctor') || slug.includes('dentist') || slug.includes('veterinarian'))) {
          painPointDelta += 12;
        } else if (category === 'Technology & Engineering' || category === 'Finance & Banking' || slug.includes('lawyer') || slug.includes('accountant') || slug.includes('actuary')) {
          painPointDelta -= 16;
        }
      }
      // 3. Recognition
      if (painPoints.includes('Not getting recognized or appreciated for my work')) {
        if (category === 'Medicine & Healthcare' || slug.includes('founder') || slug.includes('director') || slug.includes('lead') || slug.includes('pilot')) {
          painPointDelta += 6;
        }
      }
      // 4. Creative freedom
      if (painPoints.includes('Having no creative freedom or variety in tasks')) {
        if (category === 'Creative & Media' || slug.includes('founder') || slug.includes('product') || slug.includes('architect')) {
          painPointDelta += 8;
        }
        if (slug.includes('accountant') || slug.includes('actuary') || slug.includes('controller')) {
          painPointDelta -= 8;
        }
      }
      // 5. Working alone
      if (painPoints.includes('Working alone with little human interaction')) {
        if (category === 'Education & Research' || category === 'Medicine & Healthcare' || category === 'Business & Management' || category === 'Hospitality & Food') {
          painPointDelta += 7;
        }
      }
      // 6. Extreme stress and long hours
      if (painPoints.includes('Extreme stress, pressure, and very long hours')) {
        if (wlbVal >= 7 && pressureVal <= 6) painPointDelta += 10;
        if (pressureVal >= 8 || wlbVal <= 4) painPointDelta -= 14;
      }
      // 7. No real difference / purpose
      if (painPoints.includes('Feeling my work makes no real difference to anyone')) {
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' || category === 'Law & Government' || slug.includes('renewable')) {
          painPointDelta += 10;
        }
      }
      // 8. Low earnings relative to effort
      if (painPoints.includes('Earning too little compared to the effort I put in')) {
        if (seniorMax >= 250) painPointDelta += 8;
        if (seniorMax < 130) painPointDelta -= 8;
      }
      // 9. Rigid rules & bureaucracy
      if (painPoints.includes('Too many rules and rigid procedures to follow')) {
        if (slug.includes('founder') || category === 'Creative & Media' || category === 'Business & Management') {
          painPointDelta += 8;
        }
        if (category === 'Law & Government' || slug.includes('pilot') || slug.includes('controller') || slug.includes('actuary')) {
          painPointDelta -= 10;
        }
      }
      // 10. Constant travel
      if (painPoints.includes('Constant travel and long time away from home/family')) {
        if (slug.includes('pilot') || slug.includes('merchant-navy') || slug.includes('field-service') || slug.includes('offshore')) {
          painPointDelta -= 18;
        } else if (remoteOpp >= 6) {
          painPointDelta += 6;
        }
      }
      // 11. Income instability
      if (painPoints.includes('Unstable income or job insecurity')) {
        if (category === 'Medicine & Healthcare' || category === 'Law & Government' || (career.careerStability || 7) >= 8) {
          painPointDelta += 8;
        }
        if (slug.includes('founder') || slug.includes('content-creator') || slug.includes('trader')) {
          painPointDelta -= 10;
        }
      }
    }

    // --- Ambiguity Preference Alignment ---
    let ambiguityDelta = 0;
    if (!ambiguity.isNotClear) {
      if (ambiguity.values.some((v) => v >= 8)) {
        if (slug.includes('founder') || slug.includes('entrepreneur') || slug.includes('investor') || slug.includes('content-creator')) ambiguityDelta += 8;
      } else if (ambiguity.values.some((v) => v <= 4)) {
        if (slug.includes('pilot') || slug.includes('judge') || slug.includes('actuary') || slug.includes('controller') || slug.includes('accountant')) ambiguityDelta += 8;
      }
    }

    // Assemble Weighted Composite Score
    const weightedComposite =
      domainScore * 0.35 +
      aptitudeScore * 0.30 +
      workModeScore * 0.15 +
      salaryScore * 0.10 +
      skillRatio * 100 * 0.10;

    const totalRawScore = weightedComposite + categoryAffinity * 0.9 + painPointDelta + ambiguityDelta + skillBonus;

    // Generate Tailored, Explainable whyMatch Rationale
    let whyMatch = `Strong overall match based on your domain preferences for ${category.toLowerCase()} and strategic career goals.`;
    if (category === 'Medicine & Healthcare' && (!helping.isNotClear || userSkills.some((s) => s.includes('biology')))) {
      whyMatch = `Directly harmonizes with your calling for direct human care, medical diagnostics, and personal patient impact.`;
    } else if (category === 'Aviation & Maritime Operations' && (!physical.isNotClear || painPoints.includes('Sitting at a desk all day without moving'))) {
      whyMatch = `Matches your enthusiasm for real-world vehicular command, active spatial awareness, and hands-on navigational mastery outside a desk.`;
    } else if (category === 'Technology & Engineering' && (!tech.isNotClear || userSkills.some((s) => s.includes('code')))) {
      whyMatch = `Directly leverages your appetite for deep software systems, technological problem solving, and modern digital platforms.`;
    } else if (category === 'Finance & Banking' && (!math.isNotClear || !salary.isNotClear)) {
      whyMatch = `Capitalizes on your quantitative analytical mindset, commercial ambition, and high financial compensation trajectory.`;
    } else if (category === 'Law & Government' && !governance.isNotClear) {
      whyMatch = `Reflects your commitment to constitutional justice, institutional policy, public safety, and statutory rule of law.`;
    } else if (category === 'Creative & Media' && !creative.isNotClear) {
      whyMatch = `Celebrates your aesthetic intuition, narrative storytelling, and desire to create impactful visual or multimedia experiences.`;
    } else if (category === 'Engineering & Built Environment') {
      whyMatch = `Leverages your mathematical and spatial abilities to leave an enduring physical mark through structural design and infrastructure.`;
    } else if (category === 'Business & Management' && !leadership.isNotClear) {
      whyMatch = `Empowers your executive communication, team leadership, cross-functional diplomacy, and commercial execution.`;
    } else if (category === 'Sports & Fitness') {
      whyMatch = `Combines your passion for athletic discipline, biomechanics, physical wellness, and human performance coaching.`;
    } else if (category === 'Hospitality & Food') {
      whyMatch = `Blends sensory culinary craft with high-energy service discipline and memorable guest hospitality experiences.`;
    } else if (category === 'Education & Research') {
      whyMatch = `Aligns with your passion for lifelong intellectual exploration, academic research, and mentoring the next generation.`;
    }

    let disadvantages: string[] = [];
    try {
      disadvantages = JSON.parse(career.disadvantages || '[]');
    } catch (e) {
      disadvantages = ['High continuous learning requirements', 'Competitive hiring landscape'];
    }

    return {
      rawScore: totalRawScore,
      careerSlug: slug,
      title: career.title,
      category,
      compatibilityScore: 85, // will be calibrated below based on true ranking
      whyMatch,
      possessedSkills: possessed.length > 0 ? possessed : ['Critical Thinking', 'Analytical Foundation'],
      missingSkills: missing.slice(0, 4),
      learningDifficulty: career.learningDifficulty || 7,
      entryJobDifficulty: career.entryJobDifficulty || 7,
      entrySalaryMin: career.entrySalaryMin || 70,
      entrySalaryMax: career.entrySalaryMax || 100,
      midSalaryMin: career.midSalaryMin || 120,
      midSalaryMax: career.midSalaryMax || 180,
      seniorSalaryMin: career.seniorSalaryMin || 190,
      seniorSalaryMax: career.seniorSalaryMax || 300,
      workLifeBalance: career.workLifeBalance || 7,
      futureDemandOutlook: career.futureDemandOutlook || 'Positive growth across the decade.',
      internationalOpportunities: career.internationalOpportunities || 'Strong global opportunities.',
      disadvantages,
      iconName: career.iconName || 'Briefcase',
    };
  });

  // Sort descending by rawScore first so the true highest-match careers rank at the top
  scored.sort((a, b) => b.rawScore - a.rawScore);

  // Calibrate top 10 compatibility percentages with realistic graduation
  const top10 = scored.slice(0, 10).map((item, idx) => {
    // Dynamic top-tier distribution from 98% down to 78% for top 10
    const calibratedScore = Math.max(68, Math.min(98, Math.round(98 - idx * 2.2)));
    const { rawScore, ...rest } = item;
    return {
      ...rest,
      compatibilityScore: calibratedScore,
    };
  });

  return {
    archetypeTitle,
    archetypeSubtitle,
    topCareers: top10,
  };
}
