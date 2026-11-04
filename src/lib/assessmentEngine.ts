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

export function computeCareerRecommendations(
  answers: AssessmentAnswerState,
  allCareers: any[]
): {
  archetypeTitle: string;
  archetypeSubtitle: string;
  topCareers: RecommendedCareerResult[];
} {
  // Resolve each input dimension gracefully handling Multiple Selections, Single Values, and "Not Clear"
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

  const hasHigh = (dim: ResolvedNumeric, threshold: number = 8) =>
    !dim.isNotClear && (dim.values.some((v) => v >= threshold) || dim.value >= threshold);

  const hasLow = (dim: ResolvedNumeric, threshold: number = 5) =>
    !dim.isNotClear && (dim.values.some((v) => v <= threshold) || dim.value <= threshold);

  // Determine Student Archetype based on multi-dimensional profile
  let archetypeTitle = 'The Frontier Strategic Innovator';
  let archetypeSubtitle = 'You excel at bridging systemic complexity with tangible real-world outcomes, driving high-impact initiatives across modern disciplines.';

  if (hasHigh(helping, 8)) {
    archetypeTitle = 'The Compassionate Clinical Healer';
    archetypeSubtitle = 'You possess a profound dedication to human physical and emotional wellbeing, thriving in environments where clinical knowledge directly restores health and saves lives.';
  } else if (hasHigh(physical, 8) && hasHigh(wlb, 7)) {
    archetypeTitle = 'The High-Precision Tactical Operator';
    archetypeSubtitle = 'You excel when operating sophisticated real-world machinery and physical systems under high pressure, maintaining supreme composure in cockpits, bridge decks, and acute theaters.';
  } else if (hasHigh(governance, 8)) {
    archetypeTitle = 'The Guardian of Justice & Sovereign Policy';
    archetypeSubtitle = 'You are driven by the rule of law, constitutional ethics, and sovereign diplomacy, aspiring to defend human rights, govern institutions, and shape national policy.';
  } else if (hasHigh(tech, 8) && hasHigh(math, 7)) {
    archetypeTitle = 'The Frontier Systems Architect';
    archetypeSubtitle = 'You thrive on deep algorithmic complexity, mathematical rigor, and engineering systems at the bleeding edge of software, silicon, and intelligence.';
  } else if (hasHigh(math, 7) && hasHigh(salary, 8)) {
    archetypeTitle = 'The Quantitative Capital Allocator';
    archetypeSubtitle = 'You possess sharp numeric intuition, thriving on financial valuation, risk quantification, and structuring high-stakes investments in global capital markets.';
  } else if (hasHigh(creative, 8)) {
    archetypeTitle = 'The Expressive Storyteller & Creative Visionary';
    archetypeSubtitle = 'You combine refined artistic taste with narrative intuition, driven to evoke profound human emotion through cinematic visuals, music, literature, or bespoke design.';
  } else if (hasHigh(ambiguity, 8) && hasHigh(salary, 8)) {
    archetypeTitle = 'The High-Conviction Venture Founder';
    archetypeSubtitle = 'You possess an extraordinary appetite for high ambiguity, leadership under uncertainty, and building groundbreaking companies from absolute scratch.';
  } else if (hasHigh(leadership, 8) && hasLow(tech, 5)) {
    archetypeTitle = 'The Strategic Commercial Dealmaker';
    archetypeSubtitle = 'You excel in fast-paced executive rooms, orchestrating multi-million dollar contracts, building strategic coalitions, and driving organizational transformation.';
  } else if (hasHigh(physical, 7) && (answers.preferredIndustries?.includes('Sports & Fitness') || answers.preferredIndustries?.includes('Hospitality & Food'))) {
    archetypeTitle = 'The Master Craftsman & Human Performance Optimizer';
    archetypeSubtitle = 'You embody tactile mastery, physical discipline, and sensory precision, inspiring physical excellence in athletics or culinary artistry.';
  } else if (answers.preferredIndustries?.includes('Engineering & Built Environment')) {
    archetypeTitle = 'The Master Builder & Infrastructure Architect';
    archetypeSubtitle = 'You are driven to leave an indelible physical mark on the world, designing towering structures, renewable power grids, and civil marvels that endure for generations.';
  } else if (answers.preferredIndustries?.includes('Education & Research')) {
    archetypeTitle = 'The Knowledge Pioneer & Academic Mentor';
    archetypeSubtitle = 'You are animated by the pursuit of fundamental truth, scientific discovery, and nurturing the intellectual curiosity of the next generation.';
  }

  const getAffinity = (dim: ResolvedNumeric): number => {
    if (dim.isNotClear) return 0;
    return dim.value - 5;
  };

  // Score each career against student answers
  const scored = allCareers.map((career) => {
    let score = 50; // base score

    // 1. Technical Complexity alignment:
    // If not clear, grant neutral baseline without distortion; if multiple choices selected, match closest desired level
    if (tech.isNotClear) {
      score += 15;
    } else {
      const minTechDiff = Math.min(...tech.values.map((v) => Math.abs(v - (career.technicalComplexity || 5))));
      score += (10 - minTechDiff) * 2.0;
    }

    // 2. Math & Quantitative alignment
    if (math.isNotClear) {
      score += 13.5;
    } else {
      const minMathDiff = Math.min(...math.values.map((v) => Math.abs(v - (career.mathRequirements || 5))));
      score += (10 - minMathDiff) * 1.8;
    }

    // 3. Work Pressure vs Tolerance
    if (wlb.isNotClear) {
      score += 10.5;
    } else {
      const minWlbDiff = Math.min(...wlb.values.map((v) => Math.abs(v - (career.workPressure || 7))));
      score += (10 - minWlbDiff) * 1.4;
    }

    // 4. Work Environment / Mode alignment (multi-select mode supported)
    if (!mode.isNotClear && mode.modes.length > 0) {
      if (mode.modes.includes('remote') && (career.remoteOpportunities || 5) >= 8) score += 10;
      if (mode.modes.includes('field') && (career.remoteOpportunities || 5) <= 4) score += 12;
      if (mode.modes.includes('onsite') && career.category === 'Finance & Banking') score += 6;
      if (mode.modes.includes('hybrid') && (career.remoteOpportunities || 5) >= 5 && (career.remoteOpportunities || 5) <= 8) score += 8;
    } else {
      score += 6; // neutral mode baseline
    }

    // 5. Salary Aspirations
    if (!salary.isNotClear) {
      if (salary.values.some((v) => v >= 8) && (career.seniorSalaryMax || 200) >= 300) score += 10;
      if (salary.values.some((v) => v <= 5) && (career.category === 'Education & Research' || career.category === 'Medicine & Healthcare')) score += 8;
    } else {
      score += 5; // neutral salary baseline
    }

    // 6. Domain-Specific Affinity Drivers (0 impact if marked Not Clear)
    const category = career.category || '';
    if (category === 'Medicine & Healthcare') {
      score += getAffinity(helping) * 3.5;
    } else if (category === 'Law & Government') {
      score += getAffinity(governance) * 3.5;
    } else if (category === 'Aviation & Maritime Operations') {
      score += getAffinity(physical) * 3.5;
    } else if (category === 'Creative & Media') {
      score += getAffinity(creative) * 3.5;
    } else if (category === 'Sports & Fitness') {
      score += getAffinity(physical) * 3.0;
    } else if (category === 'Hospitality & Food') {
      score += getAffinity(creative) * 2.0 + getAffinity(physical) * 2.0;
    } else if (category === 'Engineering & Built Environment') {
      score += getAffinity(math) * 2.0 + getAffinity(physical) * 1.5;
    } else if (category === 'Finance & Banking') {
      score += getAffinity(math) * 2.2 + (salary.isNotClear ? 0 : (salary.value - 5)) * 1.8;
    } else if (category === 'Business & Management') {
      score += getAffinity(leadership) * 3.0;
    } else if (category === 'Education & Research') {
      score += getAffinity(helping) * 2.0 + getAffinity(math) * 2.0;
    } else if (category === 'Technology & Engineering') {
      score += getAffinity(tech) * 3.0;
    }

    // 7. Ambiguity matching
    if (!ambiguity.isNotClear) {
      if (ambiguity.values.some((v) => v >= 8) && (career.slug.includes('entrepreneur') || career.slug.includes('founder') || career.slug.includes('investor') || career.slug.includes('content-creator'))) {
        score += 10;
      } else if (ambiguity.values.some((v) => v <= 4) && (career.slug.includes('pilot') || career.slug.includes('judge') || career.slug.includes('actuary') || career.slug.includes('controller') || career.slug.includes('accountant'))) {
        score += 10;
      }
    }

    // 8. Preferred Industries Boost
    if (answers.preferredIndustries && Array.isArray(answers.preferredIndustries)) {
      if (answers.preferredIndustries.includes(category) || answers.preferredIndustries.includes(career.industry)) {
        score += 16;
      }
    }

    // 9. Continuous Learning alignment (study after office hours)
    if (learning.isNotClear) {
      score += 8; // neutral baseline
    } else {
      const minLearningDiff = Math.min(...learning.values.map((v) => Math.abs(v - (career.learningDifficulty || 6))));
      score += (10 - minLearningDiff) * 1.5;

      // Extra bonus if user loves after-hours study and career rewards continuous mastery
      if (learning.values.some((v) => v >= 8) && (career.learningDifficulty || 6) >= 8) {
        score += 6;
      }
      // If user wants stable/minimal study, favor careers with established standard operating procedures
      if (learning.values.some((v) => v <= 4) && (career.learningDifficulty || 6) <= 6) {
        score += 6;
      }
    }

    // 10. Lifestyle Pain Points & Frustration Avoidance
    if (painPoints.length > 0) {
      const remoteOpp = career.remoteOpportunities || 5;
      const wlbVal = career.workLifeBalance || 7;
      const pressureVal = career.workPressure || 7;
      const seniorMax = career.seniorSalaryMax || 200;

      // Dislikes long daily commutes -> reward remote/hybrid, penalize traditional daily office commute
      if (painPoints.includes('Commuting long distances to work every day')) {
        if (remoteOpp >= 7) score += 8;
        if (remoteOpp <= 3 && category !== 'Aviation & Maritime Operations') score -= 6;
      }

      // Dislikes sitting at a desk all day -> reward active/physical/field careers, penalize pure sedentary desk roles
      if (painPoints.includes('Sitting at a desk all day without moving')) {
        if (category === 'Aviation & Maritime Operations' || category === 'Sports & Fitness' || category === 'Hospitality & Food' || category === 'Engineering & Built Environment') {
          score += 14;
        } else if (category === 'Medicine & Healthcare' && (career.slug.includes('surgeon') || career.slug.includes('physiotherapist') || career.slug.includes('nurse') || career.slug.includes('doctor') || career.slug.includes('dentist') || career.slug.includes('veterinarian'))) {
          score += 10;
        } else if (category === 'Technology & Engineering' || category === 'Finance & Banking' || career.slug.includes('lawyer') || career.slug.includes('accountant') || career.slug.includes('actuary')) {
          score -= 10;
        }
      }

      // Wants recognition and clear impact
      if (painPoints.includes('Not getting recognized or appreciated for my work')) {
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' || career.slug.includes('founder') || career.slug.includes('consultant') || career.slug.includes('pilot')) {
          score += 6;
        }
      }

      // Wants creative freedom and variety
      if (painPoints.includes('Having no creative freedom or variety in tasks')) {
        if (category === 'Creative & Media' || career.slug.includes('founder') || career.slug.includes('product') || career.slug.includes('architect')) {
          score += 7;
        }
      }

      // Needs human connection / dislikes solitary isolation
      if (painPoints.includes('Working alone with little human interaction')) {
        if (category === 'Education & Research' || category === 'Medicine & Healthcare' || category === 'Business & Management') {
          score += 6;
        }
      }

      // Severe burnout / hates extreme pressure and long hours
      if (painPoints.includes('Extreme stress, pressure, and very long hours')) {
        if (wlbVal >= 7 && pressureVal <= 6) score += 9;
        if (pressureVal >= 8 || wlbVal <= 4) score -= 9;
      }

      // Needs deep meaning and societal impact
      if (painPoints.includes('Feeling my work makes no real difference to anyone')) {
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' || category === 'Law & Government' || career.slug.includes('renewable')) {
          score += 8;
        }
      }

      // Feels underpaid relative to effort -> prioritize strong earnings trajectory
      if (painPoints.includes('Earning too little compared to the effort I put in')) {
        if (seniorMax >= 250) score += 8;
      }

      // Needs strong growth / hates dead-end roles
      if (painPoints.includes('No clear promotion or career growth path')) {
        if (category === 'Finance & Banking' || category === 'Technology & Engineering' || category === 'Business & Management') {
          score += 5;
        }
      }

      // Dislikes rigid bureaucracy and too many rules
      if (painPoints.includes('Too many rules and rigid procedures to follow')) {
        if (career.slug.includes('founder') || category === 'Creative & Media' || category === 'Business & Management') {
          score += 6;
        }
        if (category === 'Law & Government' || career.slug.includes('pilot') || career.slug.includes('controller') || career.slug.includes('actuary')) {
          score -= 7;
        }
      }

      // Cannot travel constantly / wants to stay close to home
      if (painPoints.includes('Constant travel and long time away from home/family')) {
        if (career.slug.includes('pilot') || career.slug.includes('merchant-navy') || career.slug.includes('field-service') || career.slug.includes('offshore')) {
          score -= 12;
        } else if (remoteOpp >= 6) {
          score += 5;
        }
      }

      // Prioritizes income stability and job security
      if (painPoints.includes('Unstable income or job insecurity')) {
        if (category === 'Medicine & Healthcare' || category === 'Law & Government' || category === 'Education & Research') {
          score += 7;
        }
        if (career.slug.includes('founder') || career.slug.includes('content-creator') || career.slug.includes('trader')) {
          score -= 6;
        }
      }
    }

    // 11. Skills Matching: calculate possessed vs missing skills
    let essentialTech: string[] = [];
    try {
      essentialTech = JSON.parse(career.essentialTechSkills || '[]');
    } catch (e) {
      essentialTech = [];
    }

    const userSkills = (answers.existingSkills || []).map((s) => s.toLowerCase());
    const possessed: string[] = [];
    const missing: string[] = [];

    essentialTech.forEach((skill) => {
      const skillLower = skill.toLowerCase();
      const hasMatch = userSkills.some((us) => {
        const words = us.split(/[\s/()]+/);
        return words.some((w) => w.length > 2 && skillLower.includes(w));
      });

      if (hasMatch) {
        possessed.push(skill);
      } else {
        missing.push(skill);
      }
    });

    // Skill match score bonus
    score += possessed.length * 4;

    // Normalize final score between 48% and 98%
    const normalizedScore = Math.min(98, Math.max(48, Math.round(score / 1.25)));

    // Generate tailored, explainable whyMatch reason
    let whyMatch = `Strong overall alignment with your preference for ${category.toLowerCase()} and strategic problem solving.`;
    if (category === 'Medicine & Healthcare' && !helping.isNotClear && helping.value >= 6) {
      whyMatch = `Harmonizes with your deep calling for human healing, direct clinical care, and patient impact under demanding conditions.`;
    } else if (category === 'Aviation & Maritime Operations' && !physical.isNotClear && physical.value >= 6) {
      whyMatch = `Matches your enthusiasm for real-world vehicular command, high situational awareness, and navigational mastery.`;
    } else if (category === 'Law & Government' && !governance.isNotClear && governance.value >= 6) {
      whyMatch = `Directly reflects your commitment to constitutional justice, sovereign diplomacy, public service, and rule of law.`;
    } else if (category === 'Creative & Media' && !creative.isNotClear && creative.value >= 6) {
      whyMatch = `Celebrates your creative aesthetic intuition, visual storytelling, and desire to evoke powerful emotional resonance.`;
    } else if (category === 'Finance & Banking' && !salary.isNotClear && salary.value >= 6) {
      whyMatch = `Directly aligns with your quantitative rigor, commercial ambition, and high financial compensation trajectory.`;
    } else if (category === 'Engineering & Built Environment') {
      whyMatch = `Leverages your mathematical abilities to leave an enduring physical mark through structural design and infrastructure.`;
    } else if (category === 'Technology & Engineering' && !tech.isNotClear && tech.value >= 6) {
      whyMatch = `Matches your appetite for deep systems complexity, hands-on engineering craftsmanship, and frontier technology.`;
    } else if (category === 'Sports & Fitness') {
      whyMatch = `Capitalizes on your passion for physical conditioning, athletic competition, biomechanics, and human performance.`;
    } else if (category === 'Hospitality & Food') {
      whyMatch = `Blends sensory culinary artistry with high-energy operational discipline and memorable guest experiences.`;
    } else if (category === 'Education & Research') {
      whyMatch = `Aligns with your passion for scholarly inquiry, intellectual exploration, and mentoring the minds of tomorrow.`;
    } else if (category === 'Business & Management' && !leadership.isNotClear && leadership.value >= 6) {
      whyMatch = `Capitalizes on your executive leadership, cross-functional stakeholder diplomacy, and commercial dealmaking acumen.`;
    }

    let disadvantages: string[] = [];
    try {
      disadvantages = JSON.parse(career.disadvantages || '[]');
    } catch (e) {
      disadvantages = ['High continuous learning requirements', 'Competitive hiring landscape'];
    }

    return {
      rawScore: score,
      careerSlug: career.slug,
      title: career.title,
      category,
      compatibilityScore: Math.min(98, Math.max(48, Math.round(score / 1.5))),
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
