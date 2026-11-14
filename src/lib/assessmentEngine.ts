export interface AssessmentAnswerState {
  // 20 Unique, Insightful Dimensions
  technicalOrientation: number | number[] | 'not_clear'; // Q1: 1 (Human/Creative) to 9 (Deep Software & AI)
  workMode: string | string[] | 'not_clear'; // Q2: 'remote' | 'hybrid' | 'onsite' | 'field'
  outputMedium?: number | number[] | 'not_clear'; // Q3: 9 (Digital Software) | 7 (Physical Builds) | 5 (Human Performance/Art) | 2 (Sovereign/Public)
  financialStrategy?: number | number[] | 'not_clear'; // Q4: 10 (High-risk equity/royalties) | 8 (Elite Corporate) | 4 (Sovereign PSU/Gov Pension) | 2 (Fair Wage)
  mathAnalyticalAptitude: number | number[] | 'not_clear'; // Q5: 1 (Little/No Math) to 9 (Advanced Math/Algorithms)
  ambiguityTolerance: number | number[] | 'not_clear'; // Q6: 1 (Strict SOPs/Checklists) to 9 (Invent from scratch)
  leadershipScope?: number | number[] | 'not_clear'; // Q7: 9 (Executive Command) | 7 (Brand/Creative Direction) | 5 (Coaching/Mentoring) | 2 (Solo Craft)
  helpingAndHumanImpact: number | number[] | 'not_clear'; // Q8: 1 (Commercial/Tech) to 10 (Clinical Healing)
  creativeDesignAptitude: number | number[] | 'not_clear'; // Q9: 9 (Cinematic/Runway) | 7 (Brand/Campaigns) | 5 (UX/Design) | 2 (Logic)
  physicalDexterityTacticalCraft: number | number[] | 'not_clear'; // Q10: 9 (Athletics/Modeling/Tactical) | 7 (Industrial Craft) | 4 (Active) | 2 (Desk)
  governanceLawPublicService: number | number[] | 'not_clear'; // Q11: 10 (Civil Services/Defence) | 8 (PSUs/Railways) | 6 (Law) | 2 (Private)
  continuousLearning: number | number[] | 'not_clear'; // Q12: 1 (Timeless Craft) to 9 (Fast Tech Shift)
  feedbackHorizon?: number | number[] | 'not_clear'; // Q13: 9 (Immediate Real-Time Live) | 7 (Monthly Sprints/Campaigns) | 5 (Medium) | 2 (Multi-Year Legacy)
  publicVisibility?: number | number[] | 'not_clear'; // Q14: 9 (Center Stage/Screen/Runway) | 7 (Brand Figurehead/Civil Leader) | 5 (Peer) | 2 (Backstage)
  pressureDynamics?: number | number[] | 'not_clear'; // Q15: 9 (Live Crisis/Audience) | 7 (Campaign Deadlines) | 4 (Steady Cadence) | 2 (Calm)
  lifestylePainPoints: string[]; // Q16: Pain points to avoid (multi-select)
  existingSkills: string[]; // Q17: Current skills (multi-select)
  preferredIndustries: string[]; // Q18: Target sectors (multi-select)
  coreLifeDriver?: number | number[] | 'not_clear'; // Q19: 10 (Sovereign Nation-Building) | 8 (Brand Commercial) | 6 (Artistic Truth) | 4 (Social/Healing)
  nonNegotiables?: string[]; // Q20: Dealbreakers & priorities (multi-select)

  // Backward-compatibility aliases for legacy fields
  workLifeBalanceTolerance?: number | number[] | 'not_clear';
  salaryPriority?: number | number[] | 'not_clear';
  leadershipPeopleAptitude?: number | number[] | 'not_clear';
  financialRiskAppetite?: number | number[] | 'not_clear';
  socialInteractionPreference?: number | number[] | 'not_clear';
  emotionalResilienceUnderPressure?: number | number[] | 'not_clear';
  missionDrivenOrientation?: number | number[] | 'not_clear';
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
    category: 'Technical & Engineering Orientation',
    title: 'How deep into technical, software, or engineering systems do you want your daily work to be?',
    description: 'Do you prefer coding algorithms, designing physical machines, connecting tech with business, or working primarily with people, creative arts, or public service?',
    options: [
      { label: 'Software & AI Development', value: 9, description: 'Writing computer code, building web and mobile apps, or creating artificial intelligence systems.' },
      { label: 'Physical & Civil Engineering', value: 7, description: 'Designing and constructing physical structures, machines, bridges, power plants, and electronics.' },
      { label: 'Technology Strategy & Product Management', value: 5, description: 'Guiding how tech products are built, managing projects, and connecting business goals with technical teams.' },
      { label: 'People, Creative Arts & Public Service', value: 2, description: 'Focusing on human care, creative performance, brand storytelling, athletics, law, or public governance.' },
      { label: 'Not Sure / Open to Both', value: 'not_clear', description: 'I want to explore both technical and non-technical career paths.' },
    ],
  },
  {
    id: 'workMode',
    step: 2,
    category: 'Work Environment',
    title: 'What is your ideal physical workplace setting and daily work mode?',
    description: 'Where do you picture yourself operating at your highest energy and fulfillment?',
    options: [
      { label: 'Fully Remote (Work from Home or Anywhere)', value: 'remote', description: 'Working on a laptop from home or anywhere in the world with flexible daily scheduling.' },
      { label: 'Hybrid (Mix of Office and Remote)', value: 'hybrid', description: 'Splitting the week between working with colleagues in an office and working quietly from home.' },
      { label: 'Full-Time Office or Corporate Workplace', value: 'onsite', description: 'Working on-site every day in a corporate office, design studio, or company headquarters.' },
      { label: 'Active Field or On-Site Environment', value: 'field', description: 'Working on your feet in film studios, sports facilities, hospitals, construction sites, or train stations.' },
      { label: 'Not Sure / Flexible', value: 'not_clear', description: 'I am open and comfortable with different workplace settings.' },
    ],
  },
  {
    id: 'outputMedium',
    step: 3,
    category: 'Output & Medium of Creation',
    title: 'What is the primary medium or tangible artifact you want to create and deliver?',
    description: 'When you look back on your day\'s work, what tangible outcome makes you feel most proud?',
    options: [
      { label: 'Digital Software & Applications', value: 9, description: 'Building websites, mobile applications, software tools, databases, or AI models.' },
      { label: 'Physical Builds & Machinery', value: 7, description: 'Constructing buildings, roads, bridges, industrial machines, or physical consumer hardware.' },
      { label: 'Creative Arts & Live Performance', value: 5, description: 'Screen acting, modeling, athletic achievements, artwork, or creative media content.' },
      { label: 'Public Administration & Public Welfare', value: 2, description: 'Administering public laws, city operations, national railway systems, or citizen welfare programs.' },
      { label: 'Not Sure / Multiple Formats', value: 'not_clear', description: 'I am interested in creating more than one type of work product.' },
    ],
  },
  {
    id: 'financialStrategy',
    step: 4,
    category: 'Financial Trajectory & Wealth Mindset',
    title: 'Which financial model and income trajectory best matches your aspirations?',
    description: 'Different careers build wealth through completely different mechanisms. What suits your risk and lifestyle preferences?',
    options: [
      { label: 'High-Risk with High Earning Upside', value: 10, description: 'Higher initial uncertainty with potential for large financial gains through business equity, royalties, or bonuses.' },
      { label: 'High Corporate Salary & Bonuses', value: 8, description: 'Reliable high salary with strong annual performance bonuses in established private companies.' },
      { label: 'Government Pay & Guaranteed Job Security', value: 4, description: 'Stable civil service or public sector career with fixed salary scales, pension, and lifetime job security.' },
      { label: 'Steady Living Wage with Low Stress', value: 2, description: 'Predictable, comfortable pay that prioritizes low stress, balanced hours, and peace of mind.' },
      { label: 'Not Sure / Still Evaluating', value: 'not_clear', description: 'I am still deciding how to balance high earning potential against job stability.' },
    ],
  },
  {
    id: 'mathAnalyticalAptitude',
    step: 5,
    category: 'Quantitative & Analytical Rigor',
    title: 'How much mathematics, quantitative modeling, and data analytics do you want in your role?',
    description: 'How comfortable and enthusiastic are you working with statistical formulas, numbers, and quantitative datasets?',
    options: [
      { label: 'Advanced Math & Statistical Modeling', value: 9, description: 'Solving complex equations, working with data formulas, financial models, and mathematical algorithms.' },
      { label: 'Practical Business Math & Budgeting', value: 7, description: 'Reviewing sales figures, managing team budgets, analyzing charts, and organizing spreadsheets.' },
      { label: 'Practical Everyday Logic', value: 5, description: 'Using step-by-step reasoning, basic arithmetic, and common sense to solve everyday work problems.' },
      { label: 'Little to No Mathematics', value: 2, description: 'Focusing primarily on verbal communication, writing, creative performance, human care, or physical skills.' },
      { label: 'Not Sure / Open to Basic Math', value: 'not_clear', description: 'I can do basic math but want to explore different roles before deciding.' },
    ],
  },
  {
    id: 'ambiguityTolerance',
    step: 6,
    category: 'Structure vs Ambiguity',
    title: 'How comfortable are you with ambiguity versus strict rules and safety protocols?',
    description: 'Do you prefer exploring uncharted territory without a playbook, or operating within well-defined, safety-critical guidelines?',
    options: [
      { label: 'Inventing from Scratch with High Freedom', value: 9, description: 'Tackling open-ended challenges where there is no manual or step-by-step guide to follow.' },
      { label: 'Clear Goals with Freedom in Method', value: 6, description: 'You are given a clear target to achieve, but have full freedom in how you choose to achieve it.' },
      { label: 'Structured Standards & Proven Workflows', value: 4, description: 'Following established company procedures, standard templates, and clear supervisor guidance.' },
      { label: 'Strict Safety Rules & Checklists', value: 2, description: 'Following exact safety checklists where zero mistakes are allowed (e.g., healthcare, railways, aviation).' },
      { label: 'Not Sure / Adaptable', value: 'not_clear', description: 'I am comfortable working in both structured and flexible work environments.' },
    ],
  },
  {
    id: 'leadershipScope',
    step: 7,
    category: 'Leadership & Influence Scope',
    title: 'What style of leadership, influence, and interpersonal scope brings out your best?',
    description: 'How do you envision leading, influencing, or contributing within an organization?',
    options: [
      { label: 'Executive & Department Leadership', value: 9, description: 'Leading large teams, overseeing departments, or directing public administration programs.' },
      { label: 'Creative & Campaign Direction', value: 7, description: 'Guiding the creative style, visual branding, or marketing vision for projects and products.' },
      { label: 'Coaching, Teaching & Mentoring', value: 5, description: 'Guiding individuals one-on-one, coaching athletes or students, and helping others develop.' },
      { label: 'Independent Specialist', value: 2, description: 'Focusing on your own individual work—such as writing code, designing, research, or performing—without managing people.' },
      { label: 'Not Sure / Open to Both', value: 'not_clear', description: 'I am happy to lead others or focus on my own independent work.' },
    ],
  },
  {
    id: 'helpingAndHumanImpact',
    step: 8,
    category: 'Human Care & Social Welfare',
    title: 'How central is direct human care, physical healing, or personal patient welfare in your work?',
    description: 'How important is it that your daily work directly heals, protects, or improves individual human lives?',
    options: [
      { label: 'Direct Medical & Patient Care', value: 10, description: 'Diagnosing illnesses, performing clinical treatments, nursing, or emergency life-saving response.' },
      { label: 'Teaching, Counseling & Personal Guidance', value: 7, description: 'Educating students, fitness coaching, therapy, or helping people improve their daily lives.' },
      { label: 'Public Service & Community Benefit', value: 5, description: 'Improving public transport, public health, local city services, or community welfare initiatives.' },
      { label: 'Commercial, Creative, or Tech Systems', value: 2, description: 'Building software tools, business products, entertainment, or commercial services.' },
      { label: 'Not Sure / Open to Both', value: 'not_clear', description: 'I care about helping others, but am flexible on whether it is direct patient care or broader work.' },
    ],
  },
  {
    id: 'creativeDesignAptitude',
    step: 9,
    category: 'Creative Expression & Brand Storytelling',
    title: 'How drawn are you to artistic expression, cinematic performance, fashion aesthetics, or brand storytelling?',
    description: 'How significant is visual beauty, narrative drama, or brand design in what you want to do?',
    options: [
      { label: 'Acting, Modeling & Live Performance', value: 9, description: 'Expressing characters on camera, walking high-fashion runways, or live artistic performance.' },
      { label: 'Brand Strategy & Visual Storytelling', value: 7, description: 'Creating advertising campaigns, product branding, media stories, and visual identities.' },
      { label: 'Practical Design & User Experience', value: 5, description: 'Designing easy-to-use software apps, websites, physical products, or architectural spaces.' },
      { label: 'Objective Facts, Law & Structured Sciences', value: 2, description: 'Focusing on data facts, legal rules, engineering requirements, or financial accounting.' },
      { label: 'Not Sure / Exploring', value: 'not_clear', description: 'I appreciate creative work, but also enjoy logical and structured tasks.' },
    ],
  },
  {
    id: 'physicalDexterityTacticalCraft',
    step: 10,
    category: 'Physical Mastery & Tactical Presence',
    title: 'How much do you value physical athleticism, bodily presence, or tactical hands-on mastery?',
    description: 'Some careers demand athletic conditioning, on-camera poise, or operating heavy machinery. What suits your physical preferences?',
    options: [
      { label: 'Athletics, Modeling & Physical Performance', value: 9, description: 'Competing in professional sports, fitness coaching, runway modeling, or on-camera presence.' },
      { label: 'Hands-On Technical & Industrial Work', value: 7, description: 'Operating machinery, performing culinary cooking, mechanical repairs, or physical construction.' },
      { label: 'Active Daily Movement', value: 4, description: 'Walking around, visiting client offices, inspecting job sites, or moving between workspaces.' },
      { label: 'Desk-Based Computer Work', value: 2, description: 'Comfortable sitting at a computer desk, analyzing documents, writing, and researching.' },
      { label: 'Not Sure / Comfortable Either Way', value: 'not_clear', description: 'I can easily adapt to both desk-based work and physically active roles.' },
    ],
  },
  {
    id: 'governanceLawPublicService',
    step: 11,
    category: 'Sovereign Service & Public Sector',
    title: 'How drawn are you to Indian Government service, public sector enterprises (PSUs), Railways, or sovereign administration?',
    description: 'Do you aspire to serve national public institutions with state authority, or do you prefer private corporate and creative industries?',
    options: [
      { label: 'Civil Services, Police & Armed Forces', value: 10, description: 'Serving the nation through public administration (IAS/IPS), foreign services, or defense forces.' },
      { label: 'Public Sector Enterprises (PSUs) & Indian Railways', value: 8, description: 'Managing state-owned energy companies, infrastructure enterprises, or national railway operations.' },
      { label: 'Law Courts & Legal Services', value: 6, description: 'Practicing law in courts, legal compliance, dispute resolution, or judicial service.' },
      { label: 'Private Companies & Creative Agencies', value: 2, description: 'Working in private businesses, tech startups, advertising agencies, or media entertainment.' },
      { label: 'Not Sure / Exploring Both', value: 'not_clear', description: 'I want to explore careers in both government institutions and the private sector.' },
    ],
  },
  {
    id: 'continuousLearning',
    step: 12,
    category: 'Lifelong Learning & Skill Evolution',
    title: 'How rapidly are you willing for your professional skills to evolve and require study?',
    description: 'Some fields require studying new frameworks and tools every year, while others rely on timeless foundational mastery. Where do you stand?',
    options: [
      { label: 'Fast-Paced Constant Learning', value: 9, description: 'Eagerly learning new software tools, AI advancements, and changing industry trends every few months.' },
      { label: 'Periodic Professional Updates', value: 7, description: 'Keeping skills sharp through periodic training courses, new certifications, and industry reading.' },
      { label: 'Deep Foundational Knowledge', value: 4, description: 'Relying on deep core fundamentals in medicine, engineering, law, or public administration that evolve slowly.' },
      { label: 'Hands-On Intuitive Craft', value: 2, description: 'Sharpening personal human talent, physical conditioning, acting, or artistic technique over time.' },
      { label: 'Not Sure / Balanced', value: 'not_clear', description: 'I am willing to study whatever new skills my job requires.' },
    ],
  },
  {
    id: 'feedbackHorizon',
    step: 13,
    category: 'Feedback Cadence & Horizon of Impact',
    title: 'What pace of feedback and operational timeline gives you the greatest sense of momentum?',
    description: 'Do you crave real-time adrenaline with immediate results, or do you thrive on multi-year institutional projects?',
    options: [
      { label: 'Immediate Real-Time Feedback', value: 9, description: 'Seeing results right away—such as during a sports match, a film take, or a daily trading session.' },
      { label: 'Monthly Project Sprints', value: 7, description: 'Working on deliverables that launch in a few weeks or months, such as marketing campaigns or app updates.' },
      { label: 'Annual Project Milestones', value: 5, description: 'Leading projects that take 6 to 18 months, such as launching a new product line or building project.' },
      { label: 'Multi-Year Long-Term Impact', value: 2, description: 'Building major public infrastructure, nationwide railway systems, or long-term policy reforms.' },
      { label: 'Not Sure / Adaptable', value: 'not_clear', description: 'I work well with both quick daily feedback and long-term project schedules.' },
    ],
  },
  {
    id: 'publicVisibility',
    step: 14,
    category: 'Public Visibility & Spotlight',
    title: 'How much public visibility, media attention, or audience spotlight do you want in your career?',
    description: 'Do you thrive on being front-and-center in public media, or do you prefer high impact behind the scenes?',
    options: [
      { label: 'In Front of the Camera & Public Spotlight', value: 9, description: 'Working in the public eye as an actor, professional athlete, fashion model, or media host.' },
      { label: 'Prominent Organization or Brand Spokesperson', value: 7, description: 'Representing a major consumer brand, public agency, or corporate department as a visible leader.' },
      { label: 'Respected within Professional Circles', value: 5, description: 'Known and respected by colleagues, clients, and industry peers without broad public media fame.' },
      { label: 'Behind-the-Scenes Privacy', value: 2, description: 'Working quietly on code, research, data, or technical systems with complete personal privacy.' },
      { label: 'Not Sure / Flexible', value: 'not_clear', description: 'I am comfortable with either public visibility or behind-the-scenes work.' },
    ],
  },
  {
    id: 'pressureDynamics',
    step: 15,
    category: 'Pressure Environment & Crisis Cadence',
    title: 'What kind of pressure environment brings out your sharpest focus and highest performance?',
    description: 'How do you prefer handling high-stakes moments, deadlines, and operational challenges?',
    options: [
      { label: 'High-Stakes Live Pressure', value: 9, description: 'Thriving in moments where quick decisions matter immediately—live sports, film cameras, or emergency care.' },
      { label: 'Target-Driven Project Deadlines', value: 7, description: 'Focusing best when working against upcoming project launch dates, client deliveries, or campaigns.' },
      { label: 'Organized & Predictable Pace', value: 4, description: 'Preferring structured milestones planned well in advance with clear schedules and minimal surprises.' },
      { label: 'Calm Routine with Low Stress', value: 2, description: 'Working in a calm, steady environment with low workplace anxiety and strictly no crisis emergencies.' },
      { label: 'Not Sure / Adaptable', value: 'not_clear', description: 'I can handle different pressure levels depending on the team and situation.' },
    ],
  },
  {
    id: 'lifestylePainPoints',
    step: 16,
    category: 'Lifestyle Preferences & Avoidance Filter',
    title: 'What bothers you most about typical jobs or the kind of lifestyle you want to strictly avoid?',
    description: 'Select all work conditions you want to avoid — this helps us steer you away from careers that would frustrate or burn you out.',
    isMultiSelect: true,
    skills: [
      'Long daily commuting in heavy traffic',
      'Sitting still at a desk all day long',
      'Lack of appreciation or credit for my work',
      'Strict micromanagement with no independence',
      'Working in isolation with very little human contact',
      'High stress, constant emergencies, and 60+ hour work weeks',
      'Feeling that my work makes no meaningful difference',
      'Low pay compared to the effort and skill required',
      'No clear path for promotions or career growth',
      'Doing the exact same repetitive tasks every single day',
      'Too much rigid bureaucracy and red tape',
      'Frequent travel that keeps me away from home and family',
      'Unstable income or fear of sudden layoffs',
      'Working night shifts or unpredictable irregular hours',
    ],
  },
  {
    id: 'existingSkills',
    step: 17,
    category: 'Current Skillset & Practical Foundations',
    title: 'Which of the following skills do you already possess or are actively studying?',
    description: 'Select all skills that apply to help us match your natural strengths with fitting career pathways.',
    isMultiSelect: true,
    skills: [
      'Brand Marketing, Advertising & Social Media',
      'Film Acting, Dramatic Arts & Voice Over',
      'Fashion Modeling, Posing & Personal Grooming',
      'Sports Training, Fitness & Athletic Conditioning',
      'Public Administration, Civil Governance & Policy',
      'Industrial Manufacturing, Machinery & Plant Operations',
      'Railway Logistics & Transportation Systems',
      'Computer Programming & Software Development',
      'Math, Statistics & Logical Problem Solving',
      'Website Building & App Design',
      'Business Budgeting, Finance & Accounting',
      'Biology, Anatomy & Medical Knowledge',
      'Patient Care, First Aid & Nursing',
      'Law, Legal Research & Public Debating',
      'Creative Writing, Journalism & Content Creation',
      '3D CAD, Architecture & Mechanical Modeling',
      'Electronics, Circuit Wiring & Hardware Repair',
      'Aviation, Piloting & Navigation',
      'Sales, Client Negotiation & Pitching',
      'Team Leadership & Project Management',
      'Cooking & Culinary Arts',
      'Graphic Design, UI/UX & Visual Art',
    ],
  },
  {
    id: 'preferredIndustries',
    step: 18,
    category: 'Target Industry Sectors',
    title: 'Which industry domains are you most genuinely curious to explore?',
    description: 'Select all sectors that spark your genuine interest.',
    isMultiSelect: true,
    skills: [
      'Technology & Software',
      'Business, Marketing & Management',
      'Indian Government & Public Sector (Civil Services, PSUs, Railways, Defence)',
      'Cinema, Entertainment & Creative Arts',
      'Fashion & Commercial Modeling',
      'Sports, Athletics & Fitness',
      'Medicine & Healthcare',
      'Finance, Banking & Accounting',
      'Law & Judicial Services',
      'Engineering, Architecture & Construction',
      'Aviation, Logistics & Transport',
      'Hospitality & Culinary Arts',
      'Education, Teaching & Research',
    ],
  },
  {
    id: 'coreLifeDriver',
    step: 19,
    category: 'Core Professional Purpose',
    title: 'At your core, what primary driver gives you the deepest sense of professional worth?',
    description: 'When you reflect on your life\'s work, which of these values matters most to your identity?',
    options: [
      { label: 'Public Service & Nation Building', value: 10, description: 'Serving the country through government leadership, national infrastructure, public railways, or defense.' },
      { label: 'Commercial Success & Wealth Creation', value: 8, description: 'Building popular consumer brands, growing profitable businesses, and achieving financial independence.' },
      { label: 'Artistic Expression & Cultural Reach', value: 6, description: 'Inspiring audiences through film acting, fashion modeling, athletic achievement, or creative storytelling.' },
      { label: 'Healing Others & Advancing Knowledge', value: 4, description: 'Caring for patients, teaching students, advancing scientific discoveries, or protecting the environment.' },
      { label: 'Not Sure / Balanced Blend', value: 'not_clear', description: 'I am motivated by a combination of these values and want to explore multiple paths.' },
    ],
  },
  {
    id: 'nonNegotiables',
    step: 20,
    category: 'Life Non-Negotiables & Dealbreakers',
    title: 'What are the things which are non-negotiable for you in your career?',
    description: 'Select all priorities that are essential requirements or absolute dealbreakers for you — we will find the careers that protect and fulfill these standards.',
    isMultiSelect: true,
    skills: [
      'Daily Fitness & Health (Protected time for workouts, physical movement, and personal well-being)',
      'Scheduled & Predictable Hours (Fixed work hours with strictly no surprise weekend or late-night calls)',
      'High Earning Potential (Strong salary, performance bonuses, or high income growth over time)',
      'Family & Personal Time (Evenings and weekends free for relationships, hobbies, and home life)',
      'Remote Work Flexibility (Freedom to work from home with zero mandatory daily office commute)',
      'Job Security & Income Stability (High job protection, steady monthly paycheck, and reliable medical/retirement benefits)',
      'Ethical Purpose & Social Impact (Work that genuinely helps people, improves society, or protects nature)',
      'Creative & Independent Freedom (Freedom to solve problems your own way without micromanagement)',
      'Low Stress & Calm Work Culture (Manageable workload, healthy team culture, and low daily anxiety)',
      'Sleeping at Home / Minimal Travel (Staying rooted locally with very little mandatory business travel)',
      'Clear Promotions & Upward Mobility (Transparent career ladder where hard work is recognized and rewarded)',
      'Social Respect & Professional Prestige (A respected role with strong social standing, credibility, and dignity)',
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

// Lazy import of the server-side logger to keep this file browser-safe.
// The logger will only actually be called in a Node.js environment.
function getLogger() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { logger } = require('./logger') as typeof import('./logger');
    return logger('AssessmentEngine');
  } catch {
    return null;
  }
}

export function computeCareerRecommendations(
  answers: AssessmentAnswerState,
  allCareers: any[]
): {
  archetypeTitle: string;
  archetypeSubtitle: string;
  topCareers: RecommendedCareerResult[];
} {
  const log = getLogger();
  const startMs = Date.now();

  if (!answers || typeof answers !== 'object') {
    const err = new Error('computeCareerRecommendations: answers must be a non-null object');
    log?.error(err.message);
    throw err;
  }

  if (!Array.isArray(allCareers)) {
    const err = new Error('computeCareerRecommendations: allCareers must be an array');
    log?.error(err.message);
    throw err;
  }

  if (allCareers.length === 0) {
    log?.warn('computeCareerRecommendations called with 0 careers — results may be empty');
  }

  log?.debug('Starting recommendation computation', {
    totalCareers: allCareers.length,
    answeredDimensions: Object.keys(answers).filter(
      (k) => {
        const v = (answers as any)[k];
        return Array.isArray(v) ? v.length > 0 : v != null;
      }
    ).length,
  });
  // 1. Resolve every answer into normalized structures across 20 dimensions
  const tech = resolveNumericAnswer(answers.technicalOrientation, 5);
  const mode = resolveWorkMode(answers.workMode);
  const outputMedium = resolveNumericAnswer(answers.outputMedium ?? 'not_clear', 5);
  const financialStrategy = resolveNumericAnswer(answers.financialStrategy ?? answers.salaryPriority ?? answers.financialRiskAppetite ?? 'not_clear', 6);
  const math = resolveNumericAnswer(answers.mathAnalyticalAptitude, 5);
  const ambiguity = resolveNumericAnswer(answers.ambiguityTolerance, 6);
  const leadership = resolveNumericAnswer(answers.leadershipScope ?? answers.leadershipPeopleAptitude ?? 'not_clear', 5);
  const helping = resolveNumericAnswer(answers.helpingAndHumanImpact, 5);
  const creative = resolveNumericAnswer(answers.creativeDesignAptitude, 5);
  const physical = resolveNumericAnswer(answers.physicalDexterityTacticalCraft, 5);
  const governance = resolveNumericAnswer(answers.governanceLawPublicService, 5);
  const learning = resolveNumericAnswer(answers.continuousLearning, 5);
  const feedbackHorizon = resolveNumericAnswer(answers.feedbackHorizon ?? 'not_clear', 5);
  const publicVisibility = resolveNumericAnswer(answers.publicVisibility ?? 'not_clear', 5);
  const pressureDynamics = resolveNumericAnswer(answers.pressureDynamics ?? answers.workLifeBalanceTolerance ?? answers.emotionalResilienceUnderPressure ?? 'not_clear', 6);
  const painPoints: string[] = Array.isArray(answers.lifestylePainPoints) ? answers.lifestylePainPoints : [];
  const nonNegotiables: string[] = Array.isArray(answers.nonNegotiables) ? answers.nonNegotiables : [];
  const preferredIndustries = Array.isArray(answers.preferredIndustries) ? answers.preferredIndustries : [];
  const userSkills = (answers.existingSkills || []).map((s) => s.toLowerCase());
  const coreLifeDriver = resolveNumericAnswer(answers.coreLifeDriver ?? answers.missionDrivenOrientation ?? 'not_clear', 5);

  // Backward compatibility helpers
  const wlb = pressureDynamics;
  const salary = financialStrategy;

  // 2. Multi-Criteria Composite Archetype Determination
  // Evaluates every archetype profile comprehensively across technology, public sector, business & creative arts
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
      key: 'sovereign_leader',
      title: 'The Sovereign Administrator & Nation Builder',
      subtitle: 'You are called to serve the nation with institutional authority, steering Indian public infrastructure, railways, energy PSUs, defense, and sovereign governance.',
      score: (governance.isNotClear ? 5 : governance.value) * 3.8 +
             (coreLifeDriver.isNotClear ? 5 : coreLifeDriver.value) * 2.2 +
             (outputMedium.isNotClear ? 5 : outputMedium.value === 2 ? 10 : 3) * 1.5 +
             (preferredIndustries.some((ind) => ind.includes('Public Sector') || ind.includes('Government')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('administration') || s.includes('governance') || s.includes('rail') || s.includes('refinery')) ? 18 : 0),
    },
    {
      key: 'brand_architect',
      title: 'The Brand Architect & Consumer Visionary',
      subtitle: 'You combine consumer psychology, creative brand storytelling, and commercial acumen to shape products that define modern culture and market trends.',
      score: (creative.isNotClear ? 5 : creative.value) * 2.5 +
             (leadership.isNotClear ? 5 : leadership.value) * 2.5 +
             (publicVisibility.isNotClear ? 5 : publicVisibility.value) * 1.8 +
             (preferredIndustries.includes('Business & Management') || preferredIndustries.some((ind) => ind.includes('Fashion')) ? 26 : 0) +
             (userSkills.some((s) => s.includes('brand') || s.includes('marketing') || s.includes('advertising') || s.includes('consumer')) ? 18 : 0),
    },
    {
      key: 'screen_artist',
      title: 'The Cinematic Screen Artist & Magnetic Performer',
      subtitle: 'You captivate audiences through emotional truth, physical poise, and commanding dramatic presence across film soundstages, runways, and creative entertainment.',
      score: (creative.isNotClear ? 5 : creative.value) * 3.2 +
             (publicVisibility.isNotClear ? 5 : publicVisibility.value) * 2.5 +
             (physical.isNotClear ? 5 : physical.value) * 1.8 +
             (preferredIndustries.some((ind) => ind.includes('Cinema') || ind.includes('Fashion') || ind.includes('Creative')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('acting') || s.includes('modeling') || s.includes('drama') || s.includes('runway')) ? 20 : 0),
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
             (pressureDynamics.isNotClear ? 6 : pressureDynamics.value) * 1.2 +
             (preferredIndustries.includes('Aviation & Maritime Operations') ? 28 : 0) +
             (userSkills.some((s) => s.includes('aviation') || s.includes('piloting') || s.includes('navigation') || s.includes('electronics')) ? 18 : 0),
    },
    {
      key: 'justice',
      title: 'The Guardian of Justice & Sovereign Policy',
      subtitle: 'You are driven by the rule of law, constitutional ethics, and sovereign diplomacy, aspiring to defend human rights, govern institutions, and shape national policy.',
      score: (governance.isNotClear ? 5 : governance.value) * 4.0 +
             (leadership.isNotClear ? 5 : leadership.value) * 1.5 +
             (preferredIndustries.includes('Law & Government') || preferredIndustries.some((i) => i.includes('Judiciary')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('law') || s.includes('debating') || s.includes('speaking')) ? 16 : 0),
    },
    {
      key: 'capital',
      title: 'The Quantitative Capital Allocator',
      subtitle: 'You possess sharp numeric intuition, thriving on financial valuation, risk quantification, and structuring high-stakes investments in global capital markets.',
      score: (math.isNotClear ? 5 : math.value) * 2.8 +
             (financialStrategy.isNotClear ? 7 : financialStrategy.value) * 2.2 +
             (preferredIndustries.includes('Finance & Banking') ? 26 : 0) +
             (userSkills.some((s) => s.includes('finance') || s.includes('accounting') || s.includes('budgeting')) ? 18 : 0),
    },
    {
      key: 'creative',
      title: 'The Expressive Storyteller & Creative Visionary',
      subtitle: 'You combine refined artistic taste with narrative intuition, driven to evoke profound human emotion through cinematic visuals, music, literature, or bespoke design.',
      score: (creative.isNotClear ? 5 : creative.value) * 4.2 +
             (ambiguity.isNotClear ? 5 : ambiguity.value) * 1.5 +
             (preferredIndustries.some((i) => i.includes('Creative')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('design') || s.includes('writing') || s.includes('arts') || s.includes('cooking')) ? 18 : 0),
    },
    {
      key: 'founder',
      title: 'The High-Conviction Venture Founder',
      subtitle: 'You possess an extraordinary appetite for high ambiguity, leadership under uncertainty, and building groundbreaking companies from absolute scratch.',
      score: (ambiguity.isNotClear ? 5 : ambiguity.value) * 3.0 +
             (financialStrategy.isNotClear ? 7 : financialStrategy.value) * 1.8 +
             (leadership.isNotClear ? 5 : leadership.value) * 2.0 +
             (preferredIndustries.includes('Business & Management') ? 15 : 0),
    },
    {
      key: 'dealmaker',
      title: 'The Strategic Commercial Dealmaker',
      subtitle: 'You excel in fast-paced executive rooms, orchestrating multi-million dollar contracts, building strategic coalitions, and driving organizational transformation.',
      score: (leadership.isNotClear ? 5 : leadership.value) * 3.5 +
             (financialStrategy.isNotClear ? 7 : financialStrategy.value) * 1.5 +
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
             (preferredIndustries.some((i) => i.includes('Sports') || i.includes('Hospitality')) ? 28 : 0) +
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
    {
      key: 'ai_builder',
      title: 'The Independent AI Builder & Maker',
      subtitle: 'You combine strong technical ability with an entrepreneurial instinct to rapidly ship AI-powered products and tools solo or in a small team.',
      score: (tech.isNotClear ? 5 : tech.value) * 2.0 +
             (ambiguity.isNotClear ? 5 : ambiguity.value) * 2.5 +
             (financialStrategy.isNotClear ? 5 : financialStrategy.value) * 1.5 +
             (preferredIndustries.includes('Technology & Engineering') ? 15 : 0) +
             (userSkills.some((s) => s.includes('code') || s.includes('software') || s.includes('algorithm')) ? 14 : 0),
    },
    {
      key: 'mission_engineer',
      title: 'The Mission-Driven Climate & Systems Engineer',
      subtitle: 'You want to apply engineering skills and analytical rigour to fix humanity\'s biggest infrastructure, climate, and sustainability challenges.',
      score: (coreLifeDriver.isNotClear ? 5 : coreLifeDriver.value) * 2.5 +
             (tech.isNotClear ? 5 : tech.value) * 1.8 +
             (math.isNotClear ? 5 : math.value) * 1.5 +
             (preferredIndustries.includes('Technology & Engineering') || preferredIndustries.includes('Engineering & Built Environment') ? 18 : 0) +
             (userSkills.some((s) => s.includes('cad') || s.includes('electrical') || s.includes('algorithm') || s.includes('code')) ? 12 : 0),
    },
    {
      key: 'public_servant',
      title: 'The Dedicated Public Servant & Policy Leader',
      subtitle: 'You are driven by an unwavering commitment to serve your nation through civil administration, law enforcement, or diplomatic service.',
      score: (governance.isNotClear ? 5 : governance.value) * 3.5 +
             (coreLifeDriver.isNotClear ? 5 : coreLifeDriver.value) * 2.0 +
             (leadership.isNotClear ? 5 : leadership.value) * 1.5 +
             (preferredIndustries.includes('Law & Government') || preferredIndustries.some((i) => i.includes('Public Sector')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('law') || s.includes('speaking') || s.includes('debating')) ? 16 : 0),
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
      const isDomainMatch = preferredIndustries.some((pref: string) => {
        const p = pref.toLowerCase();
        const c = category.toLowerCase();
        const ind = industry.toLowerCase();
        if (p === c || p === ind) return true;
        if (p.includes('fashion') && (ind.includes('fashion') || slug.includes('model'))) return true;
        if ((p.includes('cinema') || p.includes('creative') || p.includes('entertainment')) && (c.includes('creative') || ind.includes('media') || ind.includes('entertainment') || slug.includes('actor') || slug.includes('film'))) return true;
        if ((p.includes('public sector') || p.includes('government') || p.includes('railways') || p.includes('psu') || p.includes('civil services')) && (c.includes('government') || ind.includes('public') || ind.includes('railway') || slug.includes('psu') || slug.includes('railway') || slug.includes('upsc'))) return true;
        if (p.includes('sports') && (c.includes('sports') || ind.includes('fitness') || slug.includes('athlete'))) return true;
        if (p.includes('law') && (c.includes('law') || ind.includes('legal'))) return true;
        if (p.includes('technology') && (c.includes('technology') || ind.includes('software'))) return true;
        if (p.includes('business') && (c.includes('business') || ind.includes('management'))) return true;
        if (p.includes('medicine') && (c.includes('medicine') || ind.includes('healthcare'))) return true;
        if (p.includes('finance') && (c.includes('finance') || ind.includes('banking'))) return true;
        if (p.includes('built environment') && (c.includes('built') || ind.includes('engineering') || ind.includes('construction'))) return true;
        if (p.includes('aviation') && (c.includes('aviation') || ind.includes('maritime'))) return true;
        if (p.includes('hospitality') && (c.includes('hospitality') || ind.includes('food'))) return true;
        if (p.includes('education') && (c.includes('education') || ind.includes('research'))) return true;
        return false;
      });

      if (isDomainMatch) {
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
      if (!tech.isNotClear) categoryAffinity += (tech.value - 5) * 9;
      if (!math.isNotClear) categoryAffinity += (math.value - 5) * 4;
      if (!learning.isNotClear) categoryAffinity += (learning.value - 5) * 3;
    } else if (category === 'Finance & Banking') {
      if (!math.isNotClear) categoryAffinity += (math.value - 5) * 7;
      if (!salary.isNotClear) categoryAffinity += (salary.value - 5) * 5;
    } else if (category === 'Law & Government') {
      if (!governance.isNotClear) categoryAffinity += (governance.value - 5) * 9;
      if (!leadership.isNotClear) categoryAffinity += (leadership.value - 5) * 3;
    } else if (category === 'Business & Management') {
      if (!leadership.isNotClear) categoryAffinity += (leadership.value - 5) * 7;
      if (!ambiguity.isNotClear) categoryAffinity += (ambiguity.value - 5) * 4;
      if (!creative.isNotClear && (slug.includes('brand') || slug.includes('marketing') || slug.includes('digital-marketer'))) categoryAffinity += (creative.value - 5) * 5;
      if (!salary.isNotClear) categoryAffinity += (salary.value - 5) * 2;
    } else if (category === 'Creative & Media') {
      if (!creative.isNotClear) categoryAffinity += (creative.value - 5) * 10;
      if (!publicVisibility.isNotClear) categoryAffinity += (publicVisibility.value - 5) * 4;
      if (!tech.isNotClear) categoryAffinity += (5 - tech.value) * 2;
    } else if (category === 'Aviation & Maritime Operations') {
      if (!physical.isNotClear) categoryAffinity += (physical.value - 5) * 9;
      if (!ambiguity.isNotClear) categoryAffinity += (5 - ambiguity.value) * 3;
    } else if (category === 'Engineering & Built Environment') {
      if (!math.isNotClear) categoryAffinity += (math.value - 5) * 4;
      if (!physical.isNotClear) categoryAffinity += (physical.value - 5) * 6;
      if (!tech.isNotClear) categoryAffinity += (tech.value - 5) * 3;
    } else if (category === 'Hospitality & Food') {
      if (!creative.isNotClear) categoryAffinity += (creative.value - 5) * 7;
      if (!physical.isNotClear) categoryAffinity += (physical.value - 5) * 7;
      if (!helping.isNotClear) categoryAffinity += (helping.value - 5) * 4;
      // Dedicated cuisine/hospitality affinity signal
      if (slug.includes('chef') || slug.includes('culinary') || slug.includes('hotel') || slug.includes('restaurant')) {
        if (userSkills.some((s) => s.includes('cook') || s.includes('culinary') || s.includes('hospitality'))) categoryAffinity += 20;
      }
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
        if (remoteOpp <= 6 || category === 'Finance & Banking' || category === 'Law & Government' || category === 'Business & Management' || category === 'Education & Research') {
          bestModeMatch = Math.max(bestModeMatch, 95);
        }
      }
      if (mode.modes.includes('field')) {
        // Field work broadly applies to physical, active, hands-on and creative careers
        const isFieldCareer =
          category === 'Aviation & Maritime Operations' ||
          category === 'Sports & Fitness' ||
          category === 'Engineering & Built Environment' ||
          category === 'Hospitality & Food' ||
          category === 'Medicine & Healthcare' ||
          category === 'Creative & Media' ||
          remoteOpp <= 3;
        if (isFieldCareer) {
          bestModeMatch = Math.max(bestModeMatch, 100);
        } else if (remoteOpp <= 5) {
          bestModeMatch = Math.max(bestModeMatch, 70);
        } else {
          bestModeMatch = Math.max(bestModeMatch, 40);
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
    let skillBonus = possessed.length * 4;

    // Targeted specialization bonuses for distinct domain skills
    if (slug.includes('model') && userSkills.some((s) => s.includes('modeling') || s.includes('runway') || s.includes('editorial'))) {
      skillBonus += 18;
    }
    if (slug.includes('athlete') && userSkills.some((s) => s.includes('athletic') || s.includes('sports training') || s.includes('conditioning'))) {
      skillBonus += 18;
    }
    if (slug.includes('railways') && userSkills.some((s) => s.includes('rail') || s.includes('locomotive') || s.includes('transit'))) {
      skillBonus += 20;
    }
    if (slug.includes('psu') && userSkills.some((s) => s.includes('refinery') || s.includes('petrochemical') || s.includes('industrial plant'))) {
      skillBonus += 20;
    }
    if (slug.includes('brand-manager') && userSkills.some((s) => s.includes('brand strategy') || s.includes('consumer marketing'))) {
      skillBonus += 20;
    }
    if (slug.includes('actor') && userSkills.some((s) => s.includes('acting') || s.includes('dramatic') || s.includes('voice artistry'))) {
      skillBonus += 20;
    }
    if (slug.includes('upsc') && userSkills.some((s) => s.includes('civil governance') || s.includes('public administration') || s.includes('policy'))) {
      skillBonus += 14;
    }
    // Tech subtype specialization bonuses
    if ((slug.includes('chef') || slug.includes('culinary') || slug.includes('hotel') || slug.includes('restaurant')) &&
        userSkills.some((s) => s.includes('cook') || s.includes('culinary') || s.includes('hospitality'))) {
      skillBonus += 24;
    }
    if ((slug.includes('ml-engineer') || slug.includes('ai-engineer') || slug.includes('ai-ml') || slug.includes('generative-ai') ||
         slug.includes('mlops') || slug.includes('physical-ai')) &&
        userSkills.some((s) => s.includes('algorithm') || s.includes('code') || s.includes('software'))) {
      skillBonus += 14;
    }
    if ((slug.includes('cloud') || slug.includes('devops') || slug.includes('cybersecurity') || slug.includes('network-admin') ||
         slug.includes('full-stack') || slug.includes('senior-software') || slug.includes('software-development')) &&
        userSkills.some((s) => s.includes('code') || s.includes('web development') || s.includes('algorithm'))) {
      skillBonus += 14;
    }
    if ((slug.includes('vlsi') || slug.includes('fintech') || slug.includes('quantum')) &&
        userSkills.some((s) => s.includes('electrical') || s.includes('algorithm') || s.includes('mathematics'))) {
      skillBonus += 14;
    }
    if ((slug.includes('digital-marketer') || slug.includes('marketing-manager') || slug.includes('hr-manager') ||
         slug.includes('corporate-strategy') || slug.includes('real-estate') || slug.includes('supply-chain') ||
         slug.includes('event') || slug.includes('entrepreneur')) &&
        userSkills.some((s) => s.includes('brand strategy') || s.includes('sales') || s.includes('project planning') || s.includes('leadership') || s.includes('finance'))) {
      skillBonus += 12;
    }

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
        if (category === 'Creative & Media' || category === 'Hospitality & Food' ||
            slug.includes('founder') || slug.includes('product') || slug.includes('architect') ||
            slug.includes('chef') || slug.includes('brand-manager') || slug.includes('designer')) {
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
        if (slug.includes('founder') || slug.includes('entrepreneur') || slug.includes('investor') || slug.includes('content-creator') || slug.includes('ai-builder') || slug.includes('go-to-market')) ambiguityDelta += 8;
      } else if (ambiguity.values.some((v) => v <= 4)) {
        if (slug.includes('pilot') || slug.includes('judge') || slug.includes('actuary') || slug.includes('controller') || slug.includes('accountant') || slug.includes('upsc')) ambiguityDelta += 8;
      }
    }

    // --- New: Financial Strategy & Trajectory Alignment ---
    let financialStrategyDelta = 0;
    if (!financialStrategy.isNotClear) {
      const fsVal = financialStrategy.value;
      if (fsVal >= 9) {
        // High-risk exponential upside (startups, royalties, endorsements)
        if (slug.includes('founder') || slug.includes('entrepreneur') || slug.includes('venture') || slug.includes('trader') ||
            slug.includes('model') || slug.includes('actor') || slug.includes('athlete') || slug.includes('content-creator') ||
            slug.includes('ai-builder')) financialStrategyDelta += 14;
        if (slug.includes('psu') || slug.includes('railways') || slug.includes('upsc') || slug.includes('teacher') ||
            slug.includes('armed-forces') || slug.includes('police')) financialStrategyDelta -= 8;
      } else if (fsVal >= 7) {
        // Elite corporate pay & bonuses — broad tech & business coverage
        if (category === 'Technology & Engineering' || category === 'Finance & Banking' ||
            category === 'Business & Management' ||
            slug.includes('brand-manager') || slug.includes('investment-banker') || slug.includes('management-consultant') ||
            slug.includes('lawyer') || slug.includes('surgeon') || slug.includes('pilot')) financialStrategyDelta += 12;
        if (slug.includes('psu') || slug.includes('railways') || slug.includes('upsc')) financialStrategyDelta -= 4;
      } else if (fsVal <= 5) {
        // Guaranteed sovereign stability & government benefits
        if (slug.includes('psu') || slug.includes('railways') || slug.includes('upsc') || slug.includes('armed-forces') ||
            slug.includes('police') || slug.includes('judge') || category === 'Education & Research') financialStrategyDelta += 18;
        if (slug.includes('founder') || slug.includes('model') || slug.includes('trader') || slug.includes('venture')) financialStrategyDelta -= 12;
      }
    }

    // --- New: Output Medium & Tangibility Alignment ---
    let outputMediumDelta = 0;
    if (!outputMedium.isNotClear) {
      const omVal = outputMedium.value;
      if (omVal >= 8) {
        // Digital & Algorithmic systems
        if (category === 'Technology & Engineering') outputMediumDelta += 14;
        if (slug.includes('model') || slug.includes('railways') || slug.includes('actor')) outputMediumDelta -= 8;
      } else if (omVal >= 6) {
        // Physical engineering & industrial plants
        if (slug.includes('psu')) outputMediumDelta += 24;
        else if (category === 'Engineering & Built Environment' || slug.includes('civil') || slug.includes('mechanical') || slug.includes('electrical')) outputMediumDelta += 15;
      } else if (omVal === 5) {
        // Human bodily performance, creative arts & entertainment
        if (slug.includes('actor') || slug.includes('model') || slug.includes('athlete') || category === 'Creative & Media' || category === 'Sports & Fitness') outputMediumDelta += 18;
        if (slug.includes('actuary') || slug.includes('data-engineer') || slug.includes('accountant')) outputMediumDelta -= 10;
      } else if (omVal <= 3) {
        // Public systems & sovereign rail networks
        if (slug.includes('railways')) outputMediumDelta += 24;
        else if (slug.includes('psu') || slug.includes('upsc') || slug.includes('police') || category === 'Law & Government') outputMediumDelta += 16;
        if (slug.includes('model') || slug.includes('fashion') || slug.includes('game-designer')) outputMediumDelta -= 10;
      }
    }

    // --- New: Public Visibility & Spotlight Alignment ---
    let publicVisibilityDelta = 0;
    if (!publicVisibility.isNotClear) {
      const pvVal = publicVisibility.value;
      if (pvVal >= 8) {
        // Center stage & front of camera
        if (slug.includes('actor') || slug.includes('model') || slug.includes('athlete') || slug.includes('content-creator')) publicVisibilityDelta += 20;
        if (slug.includes('actuary') || slug.includes('data-engineer') || slug.includes('cloud-architect') ||
            slug.includes('network-admin') || slug.includes('devops') || slug.includes('cybersecurity')) publicVisibilityDelta -= 15;
      } else if (pvVal >= 6) {
        // High-profile institutional, brand or commercial leadership
        if (slug.includes('brand-manager') || slug.includes('upsc') || slug.includes('railways') || slug.includes('diplomat') ||
            slug.includes('lawyer') || slug.includes('marketing') || slug.includes('management-consultant') ||
            slug.includes('ceo') || slug.includes('director') || slug.includes('chef') || slug.includes('hotel') ||
            category === 'Business & Management') publicVisibilityDelta += 14;
      } else if (pvVal <= 3) {
        // Quiet behind-the-scenes mastery & anonymity
        if (category === 'Technology & Engineering' || slug.includes('actuary') || slug.includes('data') ||
            slug.includes('lab') || slug.includes('researcher') || slug.includes('engineer') ||
            slug.includes('developer') || slug.includes('analyst')) publicVisibilityDelta += 14;
        if (slug.includes('actor') || slug.includes('model') || slug.includes('athlete')) publicVisibilityDelta -= 22;
      }
    }

    // --- New: Feedback Horizon Alignment ---
    let feedbackHorizonDelta = 0;
    if (!feedbackHorizon.isNotClear) {
      const fhVal = feedbackHorizon.value;
      if (fhVal >= 8) {
        // Immediate real-time feedback (live performances, trading, surgery, sport)
        if (slug.includes('athlete') || slug.includes('actor') || slug.includes('trader') || slug.includes('surgeon') ||
            slug.includes('chef') || slug.includes('hotel') || slug.includes('restaurant') || slug.includes('pilot') ||
            slug.includes('content-creator')) feedbackHorizonDelta += 15;
      } else if (fhVal >= 6) {
        // Fast monthly/quarterly sprints — broad tech & business
        if (category === 'Technology & Engineering' || category === 'Business & Management' ||
            category === 'Finance & Banking' || slug.includes('brand-manager') || slug.includes('marketer') ||
            slug.includes('product') || slug.includes('digital')) feedbackHorizonDelta += 12;
      } else if (fhVal <= 3) {
        // Multi-year national legacy & long-horizon impact
        if (slug.includes('railways') || slug.includes('psu') || slug.includes('upsc') || slug.includes('armed-forces') ||
            slug.includes('renewable') || slug.includes('scientist') || slug.includes('professor') ||
            category === 'Engineering & Built Environment' || category === 'Education & Research') feedbackHorizonDelta += 16;
      }
    }

    // --- New: Core Professional Purpose / Driver Alignment ---
    let coreLifeDriverDelta = 0;
    if (!coreLifeDriver.isNotClear) {
      const cldVal = coreLifeDriver.value;
      if (cldVal >= 9) {
        // Sovereign nation building & public duty
        if (slug.includes('railways') || slug.includes('psu') || slug.includes('upsc') || slug.includes('armed-forces') || slug.includes('police')) coreLifeDriverDelta += 22;
        if (slug.includes('model') || slug.includes('trader')) coreLifeDriverDelta -= 10;
      } else if (cldVal >= 7) {
        // Commercial wealth & brand dominance — broad tech, finance, business
        if (slug.includes('brand-manager') || slug.includes('founder') || slug.includes('sales') || slug.includes('investment-banker') ||
            slug.includes('venture') || slug.includes('trader') || slug.includes('lawyer') ||
            category === 'Technology & Engineering' || category === 'Finance & Banking' ||
            category === 'Business & Management') coreLifeDriverDelta += 16;
      } else if (cldVal >= 5) {
        // Artistic truth, performance & cultural impact
        if (slug.includes('actor') || slug.includes('model') || slug.includes('athlete') ||
            category === 'Creative & Media' || category === 'Sports & Fitness' ||
            category === 'Hospitality & Food') coreLifeDriverDelta += 20;
      } else if (cldVal <= 4) {
        // Scientific truth, patient healing & environmental regeneration
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' ||
            slug.includes('scientist') || slug.includes('climate') || slug.includes('renewable') ||
            slug.includes('lab') || slug.includes('researcher')) coreLifeDriverDelta += 18;
      }
    }

    // --- New: Leadership Scope Alignment ---
    let leadershipScopeDelta = 0;
    if (!leadership.isNotClear) {
      const lsVal = leadership.value;
      if (lsVal >= 8) {
        // Executive command & institutional governance
        if (slug.includes('railways') || slug.includes('psu') || slug.includes('upsc') || slug.includes('armed-forces') ||
            slug.includes('director') || slug.includes('ceo') || slug.includes('president') ||
            slug.includes('strategy') || slug.includes('corporate') || slug.includes('entrepreneur')) leadershipScopeDelta += 15;
      } else if (lsVal >= 6) {
        // Creative brand vision, commercial & general management
        if (category === 'Business & Management' ||
            slug.includes('brand-manager') || slug.includes('product-manager') || slug.includes('marketing') ||
            slug.includes('hr-manager') || slug.includes('supply-chain') || slug.includes('event') ||
            slug.includes('hotel') || slug.includes('restaurant') || slug.includes('chef')) leadershipScopeDelta += 14;
      } else if (lsVal === 5) {
        // Coaching & mentoring
        if (slug.includes('coach') || slug.includes('trainer') || slug.includes('teacher') ||
            slug.includes('psychologist') || slug.includes('consultant')) leadershipScopeDelta += 14;
      } else if (lsVal <= 3) {
        // Solo craft mastery & deep individual contributor
        if (slug.includes('sde') || slug.includes('actor') || slug.includes('model') || slug.includes('data') ||
            slug.includes('developer') || slug.includes('engineer') || slug.includes('architect') ||
            slug.includes('analyst') || slug.includes('researcher')) leadershipScopeDelta += 10;
      }
    }

    // --- Component 7: Non-Negotiables Alignment (Priority Dealbreakers & Core Needs) ---
    let nonNegotiablesDelta = 0;
    const fulfilledNonNegotiables: string[] = [];

    if (nonNegotiables.length > 0) {
      const wlbVal = career.workLifeBalance || 7;
      const pressureVal = career.workPressure || 7;
      const remoteOppVal = career.remoteOpportunities || 5;
      const seniorMaxVal = career.seniorSalaryMax || 200;
      const entryMaxVal = career.entrySalaryMax || 100;

      // 1. Fitness & Health
      if (nonNegotiables.some((n) => n.includes('Fitness') || n.includes('Health'))) {
        if (wlbVal >= 6 && pressureVal <= 7) {
          nonNegotiablesDelta += 16;
          fulfilledNonNegotiables.push('daily fitness & health routines');
        } else if (category === 'Sports & Fitness') {
          nonNegotiablesDelta += 20;
          fulfilledNonNegotiables.push('active physical movement');
        } else if (wlbVal <= 4 || pressureVal >= 9) {
          nonNegotiablesDelta -= 26;
        }
      }

      // 2. Scheduled & Predictable Hours
      if (nonNegotiables.some((n) => n.includes('Scheduled') || n.includes('Predictable Hours'))) {
        if (wlbVal >= 7 && pressureVal <= 6) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('predictable scheduled hours');
        } else if (category === 'Education & Research' || category === 'Law & Government' || slug.includes('actuary') || slug.includes('accountant') || slug.includes('paralegal')) {
          nonNegotiablesDelta += 14;
          fulfilledNonNegotiables.push('structured work hours');
        } else if (slug.includes('surgeon') || slug.includes('emergency') || slug.includes('forward-deployed') || slug.includes('investment-banker') || slug.includes('trader')) {
          nonNegotiablesDelta -= 30;
        }
      }

      // 3. High Money & Wealth Potential
      if (nonNegotiables.some((n) => n.includes('Money') || n.includes('Wealth'))) {
        if (seniorMaxVal >= 250 || entryMaxVal >= 115) {
          nonNegotiablesDelta += 22;
          fulfilledNonNegotiables.push('top-tier compensation upside');
        } else if (seniorMaxVal >= 190) {
          nonNegotiablesDelta += 10;
        } else if (seniorMaxVal <= 130) {
          nonNegotiablesDelta -= 25;
        }
      }

      // 4. Family & Personal Life
      if (nonNegotiables.some((n) => n.includes('Family') || n.includes('Personal Life'))) {
        if (wlbVal >= 7 && pressureVal <= 6) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('family & personal time');
        } else if (slug.includes('pilot') || slug.includes('merchant-navy') || slug.includes('investment-banker') || pressureVal >= 9 || wlbVal <= 4) {
          nonNegotiablesDelta -= 30;
        }
      }

      // 5. Location Freedom & Remote Flexibility
      if (nonNegotiables.some((n) => n.includes('Location Freedom') || n.includes('Remote Flexibility'))) {
        if (remoteOppVal >= 8) {
          nonNegotiablesDelta += 22;
          fulfilledNonNegotiables.push('location freedom & remote work');
        } else if (remoteOppVal >= 6) {
          nonNegotiablesDelta += 12;
          fulfilledNonNegotiables.push('hybrid flexibility');
        } else if (remoteOppVal <= 2) {
          nonNegotiablesDelta -= 32;
        }
      }

      // 6. Job Security & Income Stability
      if (nonNegotiables.some((n) => n.includes('Job Security') || n.includes('Income Stability'))) {
        if (category === 'Medicine & Healthcare' || category === 'Law & Government' || category === 'Education & Research' || (career.careerStability || 7) >= 8) {
          nonNegotiablesDelta += 16;
          fulfilledNonNegotiables.push('strong career stability');
        } else if (slug.includes('founder') || slug.includes('trader') || slug.includes('creator')) {
          nonNegotiablesDelta -= 22;
        }
      }

      // 7. Ethical Alignment & Social Impact
      if (nonNegotiables.some((n) => n.includes('Ethical Alignment') || n.includes('Social Impact'))) {
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' || slug.includes('climate') || slug.includes('renewable') || slug.includes('public-defender')) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('ethical social impact');
        }
      }

      // 8. Creative & Intellectual Autonomy
      if (nonNegotiables.some((n) => n.includes('Autonomy'))) {
        if (category === 'Creative & Media' || slug.includes('founder') || slug.includes('architect') || slug.includes('ai-builder') || slug.includes('researcher')) {
          nonNegotiablesDelta += 15;
          fulfilledNonNegotiables.push('intellectual autonomy');
        } else if (slug.includes('controller') || slug.includes('actuary') || slug.includes('compliance')) {
          nonNegotiablesDelta -= 12;
        }
      }

      // 9. Low Stress & Calm Work Culture
      if (nonNegotiables.some((n) => n.includes('Low Stress') || n.includes('Calm Work'))) {
        if (wlbVal >= 7 && pressureVal <= 5) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('peaceful work culture');
        } else if (pressureVal >= 8 || wlbVal <= 4) {
          nonNegotiablesDelta -= 26;
        }
      }

      // 10. Minimal Travel & Rooted Living
      if (nonNegotiables.some((n) => n.includes('Minimal Travel') || n.includes('Rooted Living'))) {
        if (remoteOppVal >= 6 || (category !== 'Aviation & Maritime Operations' && !slug.includes('consultant'))) {
          nonNegotiablesDelta += 10;
        }
        if (slug.includes('pilot') || slug.includes('merchant-navy') || slug.includes('management-consultant') || slug.includes('field-service')) {
          nonNegotiablesDelta -= 28;
        }
      }

      // 11. Rapid Career Growth & Promotion
      if (nonNegotiables.some((n) => n.includes('Rapid Career Growth') || n.includes('Promotion'))) {
        if (category === 'Technology & Engineering' || category === 'Finance & Banking' || slug.includes('product-manager') || slug.includes('venture')) {
          nonNegotiablesDelta += 14;
          fulfilledNonNegotiables.push('fast career growth');
        }
      }

      // 12. Professional Prestige & Respect
      if (nonNegotiables.some((n) => n.includes('Prestige') || n.includes('Respect'))) {
        if (slug.includes('surgeon') || slug.includes('judge') || slug.includes('pilot') || slug.includes('investment-banker') || slug.includes('architect') || slug.includes('professor')) {
          nonNegotiablesDelta += 15;
          fulfilledNonNegotiables.push('high professional prestige');
        }
      }
    }

    // Assemble Weighted Composite Score
    const weightedComposite =
      domainScore * 0.35 +
      aptitudeScore * 0.30 +
      workModeScore * 0.15 +
      salaryScore * 0.10 +
      skillRatio * 100 * 0.10;

    // --- Career Sub-specialization Differentiator (tiebreaker within same category) ---
    // Gives each career a unique signal boost when the user's skill/industry preference strongly
    // matches its very specific sub-domain, ensuring every career is reachable and accurate.
    let subSpecDelta = 0;
    if (category === 'Technology & Engineering') {
      const hasMath = userSkills.some((s) => s.includes('mathematics') || s.includes('statistics'));
      const hasAlgorithms = userSkills.some((s) => s.includes('algorithm'));
      const hasWeb = userSkills.some((s) => s.includes('web development'));
      const hasElectronics = userSkills.some((s) => s.includes('electrical') || s.includes('wiring') || s.includes('electronics'));
      const hasSales = userSkills.some((s) => s.includes('sales') || s.includes('customer pitching') || s.includes('negotiation'));
      const hasProjectPlanning = userSkills.some((s) => s.includes('project planning') || s.includes('leadership'));
      const hasFinance = userSkills.some((s) => s.includes('finance') || s.includes('budgeting'));
      const has3DCad = userSkills.some((s) => s.includes('3d cad') || s.includes('mechanical'));

      if ((slug === 'data-scientist' || slug === 'data-scientist-data-engineer') && hasMath && hasAlgorithms) subSpecDelta += 24;
      else if ((slug === 'data-engineer' || slug === 'big-data-specialist') && hasMath) subSpecDelta += 22;

      if (slug === 'technical-program-manager' && hasProjectPlanning) subSpecDelta += 24;
      if (slug === 'cloud-architect' && (hasElectronics || hasWeb) && (career.seniorSalaryMax || 0) >= 220) subSpecDelta += 22;
      if (slug === 'devops-cloud-platform-sre' && hasAlgorithms && hasElectronics) subSpecDelta += 22;
      if (slug === 'network-administrator' && hasElectronics && (career.workPressure || 0) <= 7) subSpecDelta += 24;
      if (slug === 'cybersecurity-analyst' && (hasAlgorithms || hasElectronics || userSkills.some((s) => s.includes('code'))) && !hasSales) subSpecDelta += 24;

      if (slug === 'full-stack-developer' && hasWeb) subSpecDelta += 24;
      if ((slug === 'senior-software-developer' || slug === 'software-development-engineer') && hasAlgorithms && !hasWeb) subSpecDelta += 22;
      if ((slug === 'go-to-market-engineer' || slug === 'solutions-consultant' || slug === 'digital-transformation-consultant' || slug === 'forward-deployed-engineer') && hasSales) subSpecDelta += 24;
      if ((slug === 'vlsi-physical-design-engineer' || slug === 'physical-ai-engineer' || slug === 'quantum-computing-engineer') && hasElectronics) subSpecDelta += 24;
      if (slug === 'climate-tech-engineer' && has3DCad) subSpecDelta += 24;
      if (slug === 'fintech-engineer' && hasFinance) subSpecDelta += 24;
    }
    if (category === 'Finance & Banking') {
      const hasMath = userSkills.some((s) => s.includes('mathematics') || s.includes('statistics'));
      const hasBudgeting = userSkills.some((s) => s.includes('finance') || s.includes('budgeting'));
      const hasAccounting = userSkills.some((s) => s.includes('accounting') || s.includes('financial records'));
      const hasWriting = userSkills.some((s) => s.includes('writing') || s.includes('journalism'));

      if (slug === 'actuary' && hasMath && (career.careerStability || 0) >= 8) subSpecDelta += 26;
      if (slug === 'financial-analyst' && (hasBudgeting || hasAccounting) && (career.workPressure || 0) <= 7) subSpecDelta += 24;
      if (slug === 'economist' && (hasMath || hasWriting)) subSpecDelta += 26;
      if (slug === 'chartered-accountant-ca' && hasAccounting) subSpecDelta += 24;
      if ((slug === 'stock-trader' || slug === 'quantitative-trader') && hasMath) subSpecDelta += 20;
      if (slug === 'investment-banker' && hasBudgeting) subSpecDelta += 20;
    }
    if (category === 'Engineering & Built Environment') {
      if (slug === 'offshore-oil-gas-manager' && userSkills.some((s) => s.includes('cad') || s.includes('mechanical') || s.includes('refinery'))) subSpecDelta += 26;
    }
    if (category === 'Business & Management') {
      const isMktgFocused = userSkills.some((s) => s.includes('brand strategy') || s.includes('writing'));
      const isConsultFocused = userSkills.some((s) => s.includes('finance') || s.includes('project planning'));
      const isStartupFocused = userSkills.some((s) => s.includes('code') || s.includes('sales'));
      const isEventFocused = userSkills.some((s) => s.includes('project planning') || s.includes('sales'));
      const isSupplyFocused = userSkills.some((s) => s.includes('project planning') || s.includes('mathematics'));
      const isRealEstateFocused = userSkills.some((s) => s.includes('finance') || s.includes('sales'));
      const isSalesFocused = userSkills.some((s) => s.includes('sales') || s.includes('public speaking'));
      const isHRFocused = userSkills.some((s) => s.includes('project planning') || s.includes('public speaking'));

      if ((slug === 'marketing-manager' || slug === 'digital-marketer') && isMktgFocused) subSpecDelta += 20;
      if ((slug === 'management-consultant' || slug === 'corporate-strategy-director') && isConsultFocused) subSpecDelta += 20;
      if ((slug === 'entrepreneur-founder' || slug === 'ai-builder') && isStartupFocused) subSpecDelta += 20;
      if (slug === 'international-event-director' && isEventFocused) subSpecDelta += 20;
      if (slug === 'supply-chain-operations-manager' && isSupplyFocused) subSpecDelta += 20;
      if (slug === 'real-estate-developer' && isRealEstateFocused) subSpecDelta += 20;
      if (slug === 'enterprise-sales-account-manager' && isSalesFocused) subSpecDelta += 20;
      if (slug === 'hr-manager' && isHRFocused) subSpecDelta += 20;
    }

    const totalRawScore =
      weightedComposite +
      categoryAffinity * 0.9 +
      painPointDelta +
      ambiguityDelta +
      skillBonus +
      financialStrategyDelta +
      outputMediumDelta +
      publicVisibilityDelta +
      feedbackHorizonDelta +
      coreLifeDriverDelta +
      leadershipScopeDelta +
      nonNegotiablesDelta +
      subSpecDelta;

    // Generate Tailored, Explainable whyMatch Rationale
    let whyMatch = `Strong overall match based on your domain preferences for ${category.toLowerCase()} and strategic career goals.`;
    if (fulfilledNonNegotiables.length > 0) {
      const topFulfilled = fulfilledNonNegotiables.slice(0, 2).join(' and ');
      whyMatch = `Protects your non-negotiables (${topFulfilled}) while aligning with your ${category.toLowerCase()} aptitudes.`;
    } else if (slug === 'brand-manager') {
      whyMatch = `Harmonizes with your creative brand vision, consumer marketing acumen, and commercial leadership strengths.`;
    } else if (slug === 'fashion-commercial-model') {
      whyMatch = `Matches your physical presence, visual aesthetic intuition, and excitement for high-visibility fashion and media.`;
    } else if (slug === 'film-artist-actor') {
      whyMatch = `Directly reflects your passion for dramatic screen performance, emotional embodiment, and cinematic storytelling.`;
    } else if (slug === 'indian-psu-officer') {
      whyMatch = `Channels your dedication to national energy and industrial engineering within India's prestigious Maharatna/Navratna public sector.`;
    } else if (slug === 'indian-railways-officer') {
      whyMatch = `Aligns with your commitment to sovereign governance, large-scale transportation logistics, and commanding Indian Railways infrastructure.`;
    } else if (category === 'Medicine & Healthcare' && (!helping.isNotClear || userSkills.some((s) => s.includes('biology')))) {
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

  const durationMs = Date.now() - startMs;
  log?.info('Recommendation computation completed', {
    archetypeKey: bestArchetype.key,
    archetypeScore: bestArchetype.score,
    totalCareersScored: scored.length,
    top1Slug: top10[0]?.careerSlug ?? 'none',
    top1Score: top10[0]?.compatibilityScore ?? 0,
    duration_ms: durationMs,
  });

  return {
    archetypeTitle,
    archetypeSubtitle,
    topCareers: top10,
  };
}
