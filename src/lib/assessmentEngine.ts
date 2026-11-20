export interface AssessmentAnswerState {
  // 21 Unique, Insightful Dimensions
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
  technicalPracticalBalance?: number | number[] | 'not_clear'; // Q11: 1 (100% Practical) | 3 (30% Tech / 70% Practical) | 6 (60% Tech / 40% Practical) | 7 (70% Tech / 30% Practical) | 9 (100% Technical)
  governanceLawPublicService: number | number[] | 'not_clear'; // Q12: 10 (Civil Services/Defence) | 8 (PSUs/Railways) | 6 (Law) | 2 (Private)
  continuousLearning: number | number[] | 'not_clear'; // Q13: 1 (Timeless Craft) to 9 (Fast Tech Shift)
  feedbackHorizon?: number | number[] | 'not_clear'; // Q14: 9 (Immediate Real-Time Live) | 7 (Monthly Sprints/Campaigns) | 5 (Medium) | 2 (Multi-Year Legacy)
  publicVisibility?: number | number[] | 'not_clear'; // Q15: 9 (Center Stage/Screen/Runway) | 7 (Brand Figurehead/Civil Leader) | 5 (Peer) | 2 (Backstage)
  pressureDynamics?: number | number[] | 'not_clear'; // Q16: 9 (Live Crisis/Audience) | 7 (Campaign Deadlines) | 4 (Steady Cadence) | 2 (Calm)
  lifestylePainPoints: string[]; // Q17: Pain points to avoid (multi-select)
  existingSkills: string[]; // Q18: Current skills (multi-select)
  preferredIndustries: string[]; // Q19: Target sectors (multi-select)
  coreLifeDriver?: number | number[] | 'not_clear'; // Q20: 10 (Sovereign Nation-Building) | 8 (Brand Commercial) | 6 (Artistic Truth) | 4 (Social/Healing)
  nonNegotiables?: string[]; // Q21: Dealbreakers & priorities (multi-select)

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

export type FitCategory = 'Excellent Fit' | 'Good Fit' | 'Moderate Fit' | 'Low Fit';

export interface CareerSuitabilityEntry extends RecommendedCareerResult {
  rank: number;
  fitCategory: FitCategory;
  scoreOutOf10: number;
  fitExplanation: string;
}

export interface UserCharacteristicDimension {
  dimension: string;
  score: number; // 0 to 10
  fullMark: number;
  level: string; // 'Exceptional' | 'Strong' | 'Moderate' | 'Developing'
  description: string;
}

export interface UserRadarDimensions {
  technicalAptitude: number;
  businessOrientation: number;
  analyticalThinking: number;
  creativity: number;
  leadership: number;
  communication: number;
  problemSolving: number;
  practicalOrientation: number;
  riskTolerance: number;
  peopleInteraction: number;
}

export interface PersonalCharacteristicsReview {
  summaryParagraph: string;
  keyStrengths: string[];
  workStyleTraits: string[];
  professionalInclinations: string[];
  technicalPracticalBalance: string;
  workEnvironmentPreference: string;
  coreDrives: string[];
  thingsToAvoid: string[];
  radarDimensions?: UserRadarDimensions;
  characteristicsList?: UserCharacteristicDimension[];
}

function fitCategory(score: number): FitCategory {
  if (score >= 85) return 'Excellent Fit';
  if (score >= 68) return 'Good Fit';
  if (score >= 48) return 'Moderate Fit';
  return 'Low Fit';
}

export const ASSESSMENT_QUESTIONS = [
  {
    id: 'technicalOrientation',
    step: 1,
    category: 'Technical & Software Depth',
    title: 'How much do you want your daily work to involve technical, software, or engineering systems?',
    description: 'Think about what you enjoy spending most of your time doing. Choose the option that best reflects your preferences and strengths.',
    options: [
      { label: 'Software, Coding & Artificial Intelligence', value: 9, description: 'Building software applications, writing code, designing web platforms, or developing artificial intelligence systems.' },
      { label: 'Physical Machines & Infrastructure Engineering', value: 7, description: 'Designing, building, or maintaining physical equipment, electronics, industrial machines, buildings, and infrastructure.' },
      { label: 'Technology Planning & Product Management', value: 5, description: 'Guiding what technology products should do, coordinating project goals, and connecting business needs with technical teams without coding yourself.' },
      { label: 'People, Creative Arts & Public Service', value: 2, description: 'Working primarily with people, healthcare, creative arts, media, athletics, legal guidance, or community public service.' },
      { label: 'Not Sure / Open to Both', value: 'not_clear', description: 'I want to explore a combination of technical and non-technical career pathways.' },
    ],
  },
  {
    id: 'workMode',
    step: 2,
    category: 'Work Environment & Setting',
    title: 'What type of daily physical work environment do you prefer?',
    description: 'Consider where you feel most productive, comfortable, and focused during a regular work week.',
    options: [
      { label: 'Fully Remote (Work from Home or Anywhere)', value: 'remote', description: 'Working entirely from home or any location using your computer and internet, with no required office commute.' },
      { label: 'Hybrid (Mix of Office and Remote)', value: 'hybrid', description: 'Spending 2 to 3 days in a shared workplace collaborating with team members and 2 to 3 days working quietly from home.' },
      { label: 'Full-Time On-Site Office or Corporate Workplace', value: 'onsite', description: 'Working on-site every day in a designated corporate office, design studio, clinic, or organization headquarters.' },
      { label: 'Active Fieldwork or On-Site Physical Setting', value: 'field', description: 'Working on your feet across dynamic environments such as factories, construction sites, hospitals, client locations, or outdoors.' },
      { label: 'Not Sure / Adaptable to Any Setting', value: 'not_clear', description: 'I am flexible and comfortable working in any physical environment.' },
    ],
  },
  {
    id: 'outputMedium',
    step: 3,
    category: 'Work Outcomes & Deliverables',
    title: 'At the end of a successful workday, what kind of tangible result would make you feel most proud and satisfied?',
    description: 'Think about what you would be most proud to point to at the end of a project as something you helped create.',
    options: [
      { label: 'Digital Software & Applications', value: 9, description: 'Websites, mobile apps, digital services, databases, or AI systems that people interact with on screens.' },
      { label: 'Physical Builds & Real-World Hardware', value: 7, description: 'Tangible physical items you can touch, like buildings, clean energy installations, industrial machinery, or electronic devices.' },
      { label: 'Creative Content, Media & Live Performance', value: 5, description: 'Video entertainment, dramatic performances, fashion presentations, published writing, or artistic design work.' },
      { label: 'Public Policies, Services & Community Welfare', value: 2, description: 'Measurable improvements in public transportation, community healthcare, government administration, or legal protections for citizens.' },
      { label: 'Not Sure / Multiple Formats', value: 'not_clear', description: 'I find several different types of work outcomes equally rewarding and meaningful.' },
    ],
  },
  {
    id: 'financialStrategy',
    step: 4,
    category: 'Income Model & Financial Strategy',
    title: 'Which income and financial model best matches your personal career goals?',
    description: 'Different professions build wealth in distinct ways. Select the financial model that best fits your appetite for risk and long-term security.',
    options: [
      { label: 'High-Risk with High Earning Upside', value: 10, description: 'Higher initial uncertainty in exchange for the potential to earn significantly more through business equity, stock options, royalties, or large bonuses.' },
      { label: 'High Corporate Salary & Regular Bonuses', value: 8, description: 'A consistently strong base salary at established companies, supplemented by predictable annual performance bonuses.' },
      { label: 'Guaranteed Government Pay & Lifetime Security', value: 4, description: 'Stable, predictable public-sector pay scales with comprehensive benefits, retirement pensions, and strong long-term job security.' },
      { label: 'Steady Living Wage with Low Stress', value: 2, description: 'A dependable, comfortable monthly income that covers your needs while keeping work hours and financial pressure low.' },
      { label: 'Not Sure / Still Evaluating', value: 'not_clear', description: 'I am still deciding how to balance high earning potential against job stability and risk.' },
    ],
  },
  {
    id: 'mathAnalyticalAptitude',
    step: 5,
    category: 'Quantitative & Analytical Rigor',
    title: 'How much mathematics, data analysis, and quantitative modeling do you want in your daily work?',
    description: 'Be honest about your comfort and interest in working with numbers, formulas, calculations, and analytical problem-solving.',
    options: [
      { label: 'Advanced Mathematics & Statistical Modeling', value: 9, description: 'Solving complex equations, applying statistical formulas, building financial models, or working with mathematical algorithms regularly.' },
      { label: 'Practical Business Math & Data Spreadsheets', value: 7, description: 'Analyzing performance metrics, interpreting charts and graphs, tracking budgets, and working comfortably with spreadsheets.' },
      { label: 'Everyday Logic & Practical Reasoning', value: 5, description: 'Using step-by-step reasoning, basic arithmetic, and common sense to make good decisions without heavy math.' },
      { label: 'Minimal to No Mathematics Required', value: 2, description: 'Focusing primarily on verbal communication, interpersonal interaction, creative expression, human care, or physical activity.' },
      { label: 'Not Sure / Open to Basic Math', value: 'not_clear', description: 'I can handle everyday math but want to explore different career paths before deciding.' },
    ],
  },
  {
    id: 'ambiguityTolerance',
    step: 6,
    category: 'Structure vs. Open Ambiguity',
    title: 'How comfortable are you working with unclear directions versus strict rules and safety protocols?',
    description: 'Some roles require figuring out solutions with no instruction manual, while others rely on established checklists and safety guidelines.',
    options: [
      { label: 'High Freedom — Inventing Solutions from Scratch', value: 9, description: 'Figuring out what to do when there is no established playbook, experimenting with new approaches, and creating solutions from scratch.' },
      { label: 'Clear Goals with Freedom in Your Method', value: 6, description: 'You are given a specific objective to reach, but you have the flexibility to choose the best way to get there.' },
      { label: 'Structured Guidelines & Proven Procedures', value: 4, description: 'Following established company processes, proven templates, and clear supervisor guidance with predictable expectations.' },
      { label: 'Strict Safety Checklists & Exact Protocols', value: 2, description: 'Following exact, mandatory safety rules and regulations where mistakes must be prevented (e.g., healthcare, aviation, railways).' },
      { label: 'Not Sure / Adaptable', value: 'not_clear', description: 'I can work comfortably in both flexible, creative settings and structured, rule-guided environments.' },
    ],
  },
  {
    id: 'leadershipScope',
    step: 7,
    category: 'Leadership & Influence Scope',
    title: 'How do you most prefer to contribute within an organization — leading others or working independently?',
    description: 'Think about whether you are energized by directing teams, guiding creative vision, helping individuals, or focusing on your own craft.',
    options: [
      { label: 'Leading Large Teams & Departments', value: 9, description: 'Setting direction for large groups, making executive decisions, and taking responsibility for entire team or organizational outcomes.' },
      { label: 'Guiding Creative, Brand or Strategic Direction', value: 7, description: 'Defining the vision, strategy, or creative style of projects and campaigns without directly managing many direct reports day-to-day.' },
      { label: 'Coaching, Teaching & Personal Mentoring', value: 5, description: 'Helping individuals learn and grow through one-on-one coaching, instruction, personal guidance, or training.' },
      { label: 'Independent Specialist Focus', value: 2, description: 'Concentrating on your own individual technical, creative, or analytical craft without managing or supervising others.' },
      { label: 'Not Sure / Open to Both', value: 'not_clear', description: 'I am happy to lead others or focus on independent specialist work depending on the role.' },
    ],
  },
  {
    id: 'helpingAndHumanImpact',
    step: 8,
    category: 'Human Care & Social Welfare',
    title: 'How central is direct human care and personal impact in the work you want to do?',
    description: 'Consider how important it is that your daily efforts directly help, heal, or support individual human beings face-to-face.',
    options: [
      { label: 'Direct Clinical Care & Patient Healing', value: 10, description: 'Diagnosing health issues, providing medical treatment, nursing patients, or responding to healthcare emergencies directly.' },
      { label: 'Teaching, Counseling & Personal Development', value: 7, description: 'Educating students, counseling individuals, coaching fitness, or helping people overcome personal challenges.' },
      { label: 'Community Welfare & Public Service', value: 5, description: 'Improving public transit, community infrastructure, civic services, or social welfare programs that benefit the wider public.' },
      { label: 'Indirect Impact via Products, Tech or Commercial Systems', value: 2, description: 'Building software, consumer products, businesses, or entertainment where the benefit to people happens through technology or commerce.' },
      { label: 'Not Sure / Open to Both', value: 'not_clear', description: 'I care about making a positive difference, whether through direct personal service or through products and systems.' },
    ],
  },
  {
    id: 'creativeDesignAptitude',
    step: 9,
    category: 'Creative Expression & Brand Storytelling',
    title: 'How drawn are you to artistic expression, visual design, or storytelling in your career?',
    description: 'Think about how much visual aesthetics, narrative communication, or creative presentation matter to your work satisfaction.',
    options: [
      { label: 'Performing Arts, Modeling & Screen Expression', value: 9, description: 'Expressing emotion and presence on camera, performing on stage, walking fashion runways, or creating dramatic performances.' },
      { label: 'Brand Storytelling & Creative Marketing', value: 7, description: 'Developing advertising campaigns, brand identities, media narratives, and compelling content that connects with audiences.' },
      { label: 'Practical Design & User Experience', value: 5, description: 'Designing practical, user-friendly digital apps, websites, physical products, architecture, or everyday spaces.' },
      { label: 'Objective Facts, Law & Technical Science', value: 2, description: 'Focusing primarily on objective data, engineering specifications, legal rules, or financial precision rather than artistic design.' },
      { label: 'Not Sure / Exploring Both', value: 'not_clear', description: 'I enjoy visual creativity but also appreciate structured, logical problem-solving.' },
    ],
  },
  {
    id: 'physicalDexterityTacticalCraft',
    step: 10,
    category: 'Physical Mastery & Tactical Presence',
    title: 'How much physical movement, athletic stamina, or hands-on dexterity do you want in your job?',
    description: 'Some careers require athletic conditioning, physical poise, or operating machinery, while others are primarily desk-based mental work.',
    options: [
      { label: 'High Athleticism & Physical Performance', value: 9, description: 'Professional sports, athletic fitness coaching, runway modeling, dance, or physical performance demanding peak conditioning.' },
      { label: 'Hands-On Technical & Industrial Operations', value: 7, description: 'Operating machinery, repairing physical equipment, installing systems, culinary cooking, or active construction work.' },
      { label: 'Active Daily Movement Across Locations', value: 4, description: 'Moving around frequently — inspecting job sites, visiting clients, walking hospital wards, or traveling between facilities.' },
      { label: 'Desk-Based Computer & Analytical Work', value: 2, description: 'Comfortably seated at a workstation for most of the day, researching, writing, coding, designing, or analyzing data.' },
      { label: 'Not Sure / Adaptable to Either', value: 'not_clear', description: 'I can easily adapt to both desk-based roles and physically active environments.' },
    ],
  },
  {
    id: 'technicalPracticalBalance',
    step: 11,
    category: 'Technical vs. Practical Work Balance',
    title: 'How much technical and practical work would you prefer in your job?',
    description: 'Technical work involves software development, programming, engineering design, and analysis. Practical work involves hands-on activities, fieldwork, operating equipment, and working with physical systems.',
    options: [
      { label: '100% Practical', value: 1, description: 'I prefer hands-on activities, fieldwork, operating equipment, implementation, and working directly with physical systems.' },
      { label: '100% Technical', value: 9, description: 'I prefer software development, programming, engineering design, technical analysis, and solving problems using technology.' },
      { label: '70% Technical – 30% Practical', value: 7, description: 'I prefer predominantly technical work, with some hands-on implementation and practical activities.' },
      { label: '60% Technical – 40% Practical', value: 6, description: 'I prefer a relatively balanced role, with slightly more technical work than practical activities.' },
      { label: '30% Technical – 70% Practical', value: 3, description: 'I prefer predominantly practical, hands-on work, with some technical analysis and problem-solving.' },
      { label: 'Not Sure / Still Evaluating', value: 'not_clear', description: 'I am open to different combinations and have not decided on my preferred balance yet.' },
    ],
  },
  {
    id: 'governanceLawPublicService',
    step: 12,
    category: 'Sovereign Service & Public Sector',
    title: 'How strongly are you drawn to government institutions, public sector enterprises, or legal administration?',
    description: 'Consider whether serving national public institutions with state authority appeals to you, or whether you prefer private and commercial businesses.',
    options: [
      { label: 'Civil Services, Police & Armed Forces', value: 10, description: 'Serving the country through civil administration (IAS, IPS, IFS), law enforcement, border security, or national defense.' },
      { label: 'Public Sector Enterprises (PSUs) & Indian Railways', value: 8, description: 'Managing operations in state-owned energy corporations (ONGC, IOCL, NTPC) or nationwide railway logistics networks.' },
      { label: 'Legal Practice, Courts & Judicial Services', value: 6, description: 'Practicing law in courts, managing corporate legal compliance, dispute resolution, or judicial service.' },
      { label: 'Private Industry, Startups & Commercial Enterprises', value: 2, description: 'Working in private companies, technology firms, consulting agencies, creative businesses, or commercial startups.' },
      { label: 'Not Sure / Exploring Both', value: 'not_clear', description: 'I want to explore career possibilities in both public government institutions and the private commercial sector.' },
    ],
  },
  {
    id: 'continuousLearning',
    step: 13,
    category: 'Lifelong Learning & Skill Evolution',
    title: 'How rapidly are you willing for your professional skills and tools to change over time?',
    description: 'Some industries require learning new software tools and methods every few months, while others rest on deep, timeless foundational knowledge.',
    options: [
      { label: 'Rapid Continuous Learning (Every Few Months)', value: 9, description: 'Constantly learning new software frameworks, AI tools, emerging technologies, and fast-shifting industry trends.' },
      { label: 'Periodic Professional Updates (Every 1–2 Years)', value: 7, description: 'Keeping your professional knowledge fresh through periodic training courses, new certifications, and industry developments.' },
      { label: 'Deep Foundational Mastery (Evolves Slowly)', value: 4, description: 'Mastering established principles in medicine, law, civil engineering, or public governance that remain steady over decades.' },
      { label: 'Hands-On Practice & Intuitive Craft', value: 2, description: 'Refining personal human talent, physical conditioning, artistic expression, or trade craft through regular practice rather than academic study.' },
      { label: 'Not Sure / Adaptable to Any Learning Pace', value: 'not_clear', description: 'I am willing and able to study whatever new skills my chosen career path demands.' },
    ],
  },
  {
    id: 'feedbackHorizon',
    step: 14,
    category: 'Feedback Cadence & Horizon of Impact',
    title: 'How quickly do you like to see the tangible results of your work?',
    description: 'Think about the timeframe of progress that gives you the greatest sense of momentum and job satisfaction.',
    options: [
      { label: 'Immediate Same-Day Results (Hours to Days)', value: 9, description: 'Seeing the outcome of your actions right away — during a completed medical procedure, a sports match, a sales call, or a day of trading.' },
      { label: 'Short-Term Monthly Sprints (Weeks to Months)', value: 7, description: 'Working on projects that complete within several weeks — like shipping a software feature, completing a marketing campaign, or finishing a client audit.' },
      { label: 'Medium-Term Annual Milestones (6 to 18 Months)', value: 5, description: 'Leading initiatives that take around a year to develop and launch — such as introducing a new product line, building an energy installation, or completing an academic year.' },
      { label: 'Long-Term Multi-Year Impact (2+ Years)', value: 2, description: 'Contributing to large-scale, enduring transformations — such as national infrastructure, major railway expansions, public policy reforms, or long-term clinical research.' },
      { label: 'Not Sure / Adaptable to Any Timeline', value: 'not_clear', description: 'I stay motivated working on both quick daily tasks and long-term multi-year initiatives.' },
    ],
  },
  {
    id: 'publicVisibility',
    step: 15,
    category: 'Public Visibility & Spotlight',
    title: 'How much public visibility, media attention, or audience spotlight do you want in your career?',
    description: 'Consider how visible you want to be to the public, media, or your broader industry community.',
    options: [
      { label: 'In Front of the Camera & Public Spotlight', value: 9, description: 'Regularly seen by the public — as an actor, professional athlete, fashion model, broadcast journalist, or public media personality.' },
      { label: 'Recognized Organization Leader or Spokesperson', value: 7, description: 'Visible as a senior executive, brand leader, government official, or spokesperson representing your organization to the public and press.' },
      { label: 'Respected within Professional Circles', value: 5, description: 'Well-known and respected by colleagues, clients, and industry peers, but with personal privacy outside of work.' },
      { label: 'Behind-the-Scenes Privacy', value: 2, description: 'Doing high-impact work quietly on code, design, engineering, data, or technical systems with complete personal privacy and no public exposure.' },
      { label: 'Not Sure / Flexible', value: 'not_clear', description: 'I am comfortable with either public visibility or behind-the-scenes work depending on the role.' },
    ],
  },
  {
    id: 'pressureDynamics',
    step: 16,
    category: 'Pressure Environment & Crisis Cadence',
    title: 'What type of workplace pace and pressure environment helps you perform at your best?',
    description: 'Think about how you respond to deadlines, unexpected challenges, and fast-moving situations.',
    options: [
      { label: 'High-Stakes Live Pressure (Decisions in Real Time)', value: 9, description: 'Performing at your sharpest when immediate, split-second decisions matter — in emergency medicine, live sports, flight operations, or critical plant incidents.' },
      { label: 'Target-Driven Project Deadlines & Milestones', value: 7, description: 'Motivated by firm target dates, upcoming product launches, client delivery commitments, and scheduled project milestones.' },
      { label: 'Structured, Predictable Work Schedule', value: 4, description: 'Working at a steady, organized pace planned well in advance with clear priorities and minimal surprise crises.' },
      { label: 'Calm Routine with Low Workplace Stress', value: 2, description: 'Performing best in a relaxed, low-anxiety work atmosphere with manageable workloads, stable hours, and no emergencies.' },
      { label: 'Not Sure / Adaptable', value: 'not_clear', description: 'I can handle different pressure levels effectively depending on team support and the situation.' },
    ],
  },
  {
    id: 'lifestylePainPoints',
    step: 17,
    category: 'Lifestyle Preferences & Avoidance Filter',
    title: 'Which work conditions or job frustrations do you want to strictly avoid? (Select all that apply)',
    description: 'Choose any work factors that you know would drain your energy, frustrate you, or lead to burnout. We will use this to steer you away from mismatched careers.',
    isMultiSelect: true,
    skills: [
      'Long daily commuting in heavy traffic (1+ hours each way every day)',
      'Sitting still at a desk for 8+ hours a day with little physical movement',
      'Doing the same repetitive tasks every single day with no variety',
      'Working in isolation with very little human interaction or teamwork',
      'Strict micromanagement and no freedom to make my own decisions',
      'Excessive bureaucracy, red tape, and slow approval processes',
      'Constant high-stress emergencies and 60+ hour work weeks regularly',
      'Low pay that does not reflect the effort and skill required',
      'No clear path for promotions or career advancement over time',
      'Work that makes no meaningful difference or contribution to the world',
      'Frequent travel away from home that disrupts family and personal life',
      'Unstable income, job insecurity, or risk of sudden layoffs',
      'Working night shifts or unpredictable irregular hours regularly',
      'Lack of appreciation or recognition for my work and contributions',
    ],
  },
  {
    id: 'existingSkills',
    step: 18,
    category: 'Current Skillset & Practical Foundations',
    title: 'Which of the following skills do you already have or are actively developing? (Select all that apply)',
    description: 'Select all areas where you have coursework, project experience, self-study, or natural ability. This helps match you with careers where your strengths give you an advantage.',
    isMultiSelect: true,
    skills: [
      'Computer Programming & Software Development (Python, Java, JavaScript, C++, etc.)',
      'Mathematics, Statistics & Quantitative Problem Solving',
      'Website Building, App Design & UI/UX Development',
      'Data Analysis, SQL, Spreadsheets & Business Intelligence',
      'Electronics, Circuit Wiring, Hardware Repair & Microcontrollers',
      '3D CAD, Mechanical Modeling & Engineering Design (AutoCAD, SolidWorks)',
      'PLC Programming, Industrial Automation & SCADA Systems',
      'Robotics, Robot Operating Systems (ROS) & Hardware Integration',
      'Clean Energy, Solar/Wind Power & Environmental Systems',
      'Medical Devices, Biomedical Technology & Hospital Systems',
      'Smart Buildings, Building Automation (BAS/BMS) & HVAC Systems',
      'Product Management, Feature Roadmapping & User Experience',
      'Enterprise Client Solutions, Technical Integration & Customer Engineering',
      'Business Budgeting, Finance & Accounting',
      'Sales, Client Negotiation & Commercial Pitching',
      'Team Leadership, Project Management & Strategic Planning',
      'Brand Marketing, Advertising, Social Media & Digital Campaigns',
      'Creative Writing, Journalism, Blogging & Content Creation',
      'Graphic Design, Illustration & Visual Art',
      'Biology, Anatomy & Medical/Life Sciences Knowledge',
      'Patient Care, First Aid, Nursing & Clinical Support',
      'Law, Legal Research, Contract Review & Public Debating',
      'Public Administration, Civil Governance & Public Policy',
      'Industrial Manufacturing, Machinery & Plant Operations',
      'Railway Logistics & Transportation Systems Operations',
      'Film Acting, Dramatic Arts, Voice Performance & Stage Work',
      'Fashion Modeling, Runway Posing & Personal Grooming',
      'Sports Training, Fitness Coaching & Athletic Conditioning',
      'Aviation, Piloting & Aeronautical Navigation',
      'Cooking, Culinary Arts & Restaurant Kitchen Management',
    ],
  },
  {
    id: 'preferredIndustries',
    step: 19,
    category: 'Target Industry Sectors',
    title: 'Which industry fields or sectors are you most curious to explore? (Select all that apply)',
    description: 'Select all areas that spark your genuine interest. Choosing multiple options allows us to compare possibilities across different fields.',
    isMultiSelect: true,
    skills: [
      'Technology & Software Development (Apps, Cloud, AI, Cybersecurity)',
      'Industrial Automation, Controls & Robotics',
      'Renewable Energy, CleanTech & Sustainability',
      'Medical Devices, Healthcare Technology & Biomedical Engineering',
      'Smart Buildings, Building Automation & Energy Management',
      'Business Strategy, Product Management & Corporate Leadership',
      'Indian Government & Public Sector (Civil Services, PSUs, Railways, Defence)',
      'Cinema, Entertainment & Creative Arts',
      'Fashion & Commercial Modeling',
      'Sports, Athletics & Physical Fitness',
      'Medicine, Surgery & Clinical Healthcare',
      'Finance, Banking, Investment & Accounting',
      'Law, Judiciary & Legal Services',
      'Civil Engineering, Architecture & Built Environment',
      'Aviation, Aerospace & Maritime Operations',
      'Hospitality, Culinary Arts & Food Service',
      'Education, Teaching & Academic Research',
    ],
  },
  {
    id: 'coreLifeDriver',
    step: 20,
    category: 'Core Professional Purpose',
    title: 'At your core, what primary purpose gives you the deepest sense of professional fulfillment?',
    description: 'When you reflect on what you want your career to stand for, which core purpose matters most to your identity?',
    options: [
      { label: 'Public Service, National Growth & Civic Duty', value: 10, description: 'Serving your nation through government administration, public infrastructure, national security, or civic welfare.' },
      { label: 'Commercial Success, Wealth Creation & Business Growth', value: 8, description: 'Building thriving businesses, launching market-leading products, and achieving personal financial independence.' },
      { label: 'Artistic Truth, Cultural Expression & Creative Reach', value: 6, description: 'Inspiring people through film acting, fashion modeling, athletic achievement, musical expression, or powerful storytelling.' },
      { label: 'Healing Others, Advancing Knowledge & Protecting the Planet', value: 4, description: 'Caring for patients, teaching future generations, discovering scientific solutions, or advancing clean sustainability.' },
      { label: 'Not Sure / A Meaningful Blend of Multiple Drivers', value: 'not_clear', description: 'I am motivated by a balanced combination of these values and want to explore multiple pathways.' },
    ],
  },
  {
    id: 'nonNegotiables',
    step: 21,
    category: 'Life Non-Negotiables & Dealbreakers',
    title: 'Which of the following are absolute essentials or non-negotiables for your career? (Select all that apply)',
    description: 'Select all requirements that are essential must-haves or absolute dealbreakers for you — we will prioritize careers that protect and fulfill these standards.',
    isMultiSelect: true,
    skills: [
      'Physical Health & Fitness Time (Protected time for workouts, physical wellness, and personal health maintenance)',
      'Scheduled & Predictable Hours (Fixed working hours with strictly no surprise weekend calls or middle-of-the-night emergencies)',
      'High Earning Potential (Strong base salary, performance bonuses, or high income growth over time)',
      'Quality Family & Personal Time (Evenings and weekends consistently free for relationships, hobbies, and personal life)',
      'Remote Work Flexibility (Freedom to work from home with zero mandatory daily office commute)',
      'Job Security & Income Stability (High job protection, steady monthly paycheck, and dependable benefits)',
      'Ethical Purpose & Positive Social Impact (Work that genuinely helps people, improves society, or protects the environment)',
      'Creative Freedom & Independent Problem-Solving (Freedom to solve problems your own way without micromanagement)',
      'Low Stress & Calm Work Culture (Manageable workload, healthy team environment, and low daily anxiety)',
      'Stay Close to Home / Minimal Required Travel (Staying rooted locally with minimal mandatory business travel)',
      'Clear Career Advancement & Promotion Pathway (Transparent career ladder where hard work is recognized and rewarded)',
      'Professional Prestige & Social Respect (A career with strong social standing, credibility, and recognized dignity)',
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

function getLogger() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { logger } = require('./logger') as typeof import('./logger');
    return logger('AssessmentEngine');
  } catch {
    return null;
  }
}

// Helper to safely extract numeric value from a typed answer field
function extractNumericValue(val: number | number[] | 'not_clear' | undefined, fallback: number): number {
  if (val === undefined || val === 'not_clear') return fallback;
  if (Array.isArray(val)) {
    const nums = (val as Array<unknown>).filter((v): v is number => typeof v === 'number');
    return nums[0] ?? fallback;
  }
  return typeof val === 'number' ? val : fallback;
}

function extractNullableNumericValue(val: number | number[] | 'not_clear' | undefined): number | null {
  if (val === undefined || val === 'not_clear') return null;
  if (Array.isArray(val)) {
    const nums = (val as Array<unknown>).filter((v): v is number => typeof v === 'number');
    return nums[0] ?? null;
  }
  return typeof val === 'number' ? val : null;
}

function buildPersonalReview(answers: AssessmentAnswerState): PersonalCharacteristicsReview {
  const techVal = extractNumericValue(answers.technicalOrientation, 5);
  const mathVal = extractNumericValue(answers.mathAnalyticalAptitude, 5);
  const helpingVal = extractNumericValue(answers.helpingAndHumanImpact, 5);
  const creativeVal = extractNumericValue(answers.creativeDesignAptitude, 5);
  const physicalVal = extractNumericValue(answers.physicalDexterityTacticalCraft, 5);
  const ambiguityVal = extractNumericValue(answers.ambiguityTolerance, 5);

  const leadershipRaw = answers.leadershipScope ?? answers.leadershipPeopleAptitude;
  const leadershipVal = extractNumericValue(leadershipRaw, 5);

  const govVal = extractNumericValue(answers.governanceLawPublicService, 5);
  const learningVal = extractNumericValue(answers.continuousLearning, 5);
  const tpVal = extractNullableNumericValue(answers.technicalPracticalBalance);

  const userSkills = (answers.existingSkills || []).filter((s) => s !== 'not_clear');
  const preferredIndustries = (answers.preferredIndustries || []).filter((i) => i !== 'not_clear');
  const painPoints = (answers.lifestylePainPoints || []).filter((p) => p !== 'not_clear');
  const nonNegotiables = (answers.nonNegotiables || []).filter((n) => n !== 'not_clear');
  const workModes = Array.isArray(answers.workMode)
    ? (answers.workMode as string[]).filter((m) => m !== 'not_clear')
    : (answers.workMode && answers.workMode !== 'not_clear' ? [answers.workMode as string] : []);

  // --- Technical-Practical Balance label ---
  let tpLabel = 'Adaptable across technical and practical work (open to various combinations)';
  if (tpVal !== null) {
    if (tpVal <= 1) tpLabel = '100% Practical — Strong preference for hands-on fieldwork, equipment operation, and physical systems';
    else if (tpVal <= 3) tpLabel = '30% Technical / 70% Practical — Primarily practical with some technical analysis';
    else if (tpVal <= 6) tpLabel = '60% Technical / 40% Practical — Balanced, with slightly more technical problem-solving than hands-on work';
    else if (tpVal <= 7) tpLabel = '70% Technical / 30% Practical — Predominantly technical (design, code, analysis) with some practical implementation';
    else tpLabel = '100% Technical — Pure technical preference: software, algorithms, engineering design, and digital systems';
  }

  // --- Work Environment ---
  const workModeLabel = workModes.length > 0
    ? workModes.map((m) => {
        if (m === 'remote') return 'Remote (work-from-home)';
        if (m === 'hybrid') return 'Hybrid (mix of office and remote)';
        if (m === 'onsite') return 'On-site / In-office';
        if (m === 'field') return 'Field-based / Client sites / On location';
        return m;
      }).join(', ')
    : 'Adaptable to any work environment';

  // --- Key Strengths ---
  const keyStrengths: string[] = [];
  if (techVal >= 7) keyStrengths.push('Strong technical aptitude and software/engineering orientation');
  if (techVal >= 5 && techVal < 7) keyStrengths.push('Balanced technical and strategic thinking');
  if (mathVal >= 7) keyStrengths.push('Advanced analytical and mathematical reasoning');
  if (mathVal >= 5 && mathVal < 7) keyStrengths.push('Solid quantitative and logical problem-solving');
  if (helpingVal >= 7) keyStrengths.push('Genuine care for human wellbeing and clinical or social impact');
  if (creativeVal >= 7) keyStrengths.push('Strong creative, design, and artistic sensibility');
  if (creativeVal >= 5 && creativeVal < 7) keyStrengths.push('Meaningful UX and product design awareness');
  if (physicalVal >= 7) keyStrengths.push('High physical dexterity and tactical hands-on execution ability');
  if (ambiguityVal >= 7) keyStrengths.push('High tolerance for ambiguity; thrives in open-ended and innovative environments');
  if (ambiguityVal >= 4 && ambiguityVal < 7) keyStrengths.push('Comfortable with structured problem-solving and iterative improvement');
  if (ambiguityVal < 4) keyStrengths.push('Preference for well-defined processes, checklists, and reliable protocols');
  if (leadershipVal >= 7) keyStrengths.push('Strong executive leadership, team management, and strategic direction abilities');
  if (leadershipVal >= 5 && leadershipVal < 7) keyStrengths.push('Coaching mindset and collaborative team-working style');
  if (govVal >= 7) keyStrengths.push('Strong civic duty orientation and public service commitment');
  if (learningVal >= 7) keyStrengths.push('High appetite for continuous learning and fast-evolving knowledge domains');
  if (userSkills.length > 0) keyStrengths.push(`Existing foundation in: ${userSkills.slice(0, 4).join(', ')}`);
  if (keyStrengths.length === 0) keyStrengths.push('Broad generalist foundation with cross-disciplinary adaptability');

  // --- Work Style Traits ---
  const workStyleTraits: string[] = [];
  if (ambiguityVal >= 7) workStyleTraits.push('Entrepreneurial and self-directed — comfortable navigating uncertainty without rigid instructions');
  else if (ambiguityVal <= 4) workStyleTraits.push('Process-driven and reliable — delivers best results within structured workflows and protocols');
  else workStyleTraits.push('Adaptable — balances structured processes with creative problem-solving as situations demand');

  if (tpVal !== null && tpVal >= 7) workStyleTraits.push('Primarily digital and analytical — works best with software, data, and computational tools');
  else if (tpVal !== null && tpVal <= 3) workStyleTraits.push('Primarily hands-on and practical — learns and delivers best through direct physical work');
  else workStyleTraits.push('Hybrid worker — integrates both technical analysis and practical hands-on delivery');

  if (workModes.includes('remote')) workStyleTraits.push('Independently focused — thrives working autonomously from flexible or remote locations');
  if (workModes.includes('field')) workStyleTraits.push('Field-oriented — energized by travel, client environments, and varied physical workplaces');
  if (workModes.includes('onsite')) workStyleTraits.push('Collaborative and office-grounded — values team proximity and in-person collaboration');

  // --- Professional Inclinations ---
  const professionalInclinations: string[] = [];
  if (preferredIndustries.length > 0) {
    professionalInclinations.push(`Target sectors: ${preferredIndustries.slice(0, 3).join(', ')}`);
  }
  if (techVal >= 7) professionalInclinations.push('Drawn to technology-first careers in engineering, software, or AI systems');
  if (helpingVal >= 7) professionalInclinations.push('Motivated by direct positive impact on human health and wellbeing');
  if (govVal >= 7) professionalInclinations.push('Interested in public governance, policy-making, or institutional leadership');
  if (creativeVal >= 7) professionalInclinations.push('Attracted to creative expression, storytelling, design, or media');
  if (physicalVal >= 7 && techVal <= 4) professionalInclinations.push('Suited to operational, tactical, or athletic careers requiring physical precision');
  if (leadershipVal >= 7) professionalInclinations.push('Aspires to leadership roles with authority over teams, strategy, or institutions');
  if (professionalInclinations.length === 0) professionalInclinations.push('Open to exploring a broad spectrum of professional career paths');

  // --- Core Drives ---
  const coreDrives: string[] = [];
  if (nonNegotiables.length > 0) coreDrives.push(...nonNegotiables.slice(0, 3));
  else {
    if (mathVal >= 7 || techVal >= 7) coreDrives.push('Intellectual challenge and mastery of complex systems');
    if (helpingVal >= 7) coreDrives.push('Making a meaningful difference in people\'s lives');
    if (govVal >= 7) coreDrives.push('Serving the nation and contributing to public institutions');
    if (creativeVal >= 7) coreDrives.push('Creative self-expression and aesthetic impact');
    if (coreDrives.length === 0) coreDrives.push('Personal growth, financial stability, and meaningful career impact');
  }

  // --- Things to Avoid ---
  const thingsToAvoid: string[] = [];
  if (painPoints.length > 0) thingsToAvoid.push(...painPoints.slice(0, 4));
  else thingsToAvoid.push('No specific dealbreakers identified — broad adaptability across workplace conditions');

  // --- Summary Paragraph ---
  const techDesc = techVal >= 7 ? 'strongly technical and software-focused'
    : techVal >= 5 ? 'broadly analytical and strategic'
    : techVal >= 3 ? 'more practical and people-oriented'
    : 'primarily driven by human impact, creativity, or public service';

  const mathDesc = mathVal >= 7 ? 'with advanced quantitative and analytical reasoning'
    : mathVal >= 5 ? 'with moderate analytical aptitude'
    : 'with a focus on qualitative, relational, or creative domains';

  const helperDesc = helpingVal >= 7 ? 'and a deep passion for direct human care and wellbeing'
    : helpingVal >= 5 ? 'and some interest in collaborative, people-facing roles'
    : '';

  const ambiguityDesc = ambiguityVal >= 7 ? 'You are highly entrepreneurial and comfortable pioneering work in ambiguous, unexplored spaces.'
    : ambiguityVal <= 4 ? 'You operate most effectively within clearly defined processes, protocols, and predictable environments.'
    : 'You balance structured methodology with the ability to innovate and adapt when circumstances require.';

  const industryRef = preferredIndustries.length > 0 ? ` with particular interest in ${preferredIndustries.slice(0, 2).join(' and ')}` : '';

  const summaryParagraph = `Your assessment profile reveals a ${techDesc} professional ${mathDesc}${helperDesc ? ' ' + helperDesc : ''}${industryRef}. ${ambiguityDesc} ${leadershipVal >= 7 ? 'Your strong leadership orientation suggests you are suited for roles that require directing teams, shaping strategy, or driving organizational outcomes.' : leadershipVal <= 3 ? 'You prefer individual contributor roles where you can focus deeply on specialized craft and technical excellence.' : 'You bring a collaborative, coaching mindset that works well in cross-functional teams.'} ${learningVal >= 7 ? 'You are highly adaptable and genuinely enjoy evolving your skill set in rapidly changing domains.' : learningVal <= 4 ? 'You value mastery of timeless skills and prefer careers with stable, long-term knowledge foundations.' : 'You balance skill depth with a willingness to continuously grow and adapt.'} ${userSkills.length > 0 ? `Your existing skills in ${userSkills.slice(0, 3).join(', ')} provide a meaningful head start in your strongest matching career areas.` : 'You bring strong foundational aptitudes that can be built upon across multiple career paths.'}`;

  // --- Characteristics Visualization Data (0 to 10 scale across 10 key dimensions) ---
  const clampScore = (val: number, min: number = 1, max: number = 10) =>
    Math.min(max, Math.max(min, Math.round(val * 10) / 10));

  const financialVal = extractNumericValue(answers.financialStrategy, 6);
  const visibilityVal = extractNumericValue(answers.publicVisibility, 5);

  const lowerSkills = userSkills.map((s) => s.toLowerCase());
  const lowerIndustries = preferredIndustries.map((i) => i.toLowerCase());

  // 1. Technical Aptitude: based on Q1, Q11, and technical skills
  const hasTechSkills = lowerSkills.some(
    (s) =>
      s.includes('programming') ||
      s.includes('software') ||
      s.includes('circuit') ||
      s.includes('electronics') ||
      s.includes('cad') ||
      s.includes('plc') ||
      s.includes('robotics') ||
      s.includes('app')
  );
  let techScoreCalc = ((techVal - 1) / 8) * 7;
  if (tpVal !== null) {
    techScoreCalc += ((tpVal - 1) / 8) * 2;
  } else {
    techScoreCalc += 1.0;
  }
  if (hasTechSkills) techScoreCalc += 1.0;
  const technicalAptitude = clampScore(techScoreCalc);

  // 2. Business Orientation: based on financial strategy, leadership, business skills
  const hasBizSkills = lowerSkills.some(
    (s) =>
      s.includes('business') ||
      s.includes('budget') ||
      s.includes('sales') ||
      s.includes('marketing') ||
      s.includes('product management') ||
      s.includes('planning') ||
      s.includes('finance')
  );
  let bizScoreCalc = ((financialVal - 2) / 8) * 4.5 + ((leadershipVal - 1) / 8) * 3;
  if (hasBizSkills) bizScoreCalc += 1.5;
  if (
    lowerIndustries.some(
      (i) => i.includes('business') || i.includes('finance') || i.includes('management')
    )
  ) {
    bizScoreCalc += 1.0;
  }
  const businessOrientation = clampScore(bizScoreCalc);

  // 3. Analytical Thinking: based on math/quant rigor and data skills
  const hasMathSkills = lowerSkills.some(
    (s) =>
      s.includes('math') ||
      s.includes('statistics') ||
      s.includes('data analysis') ||
      s.includes('sql') ||
      s.includes('accounting')
  );
  let analScoreCalc = ((mathVal - 1) / 8) * 8;
  if (hasMathSkills) analScoreCalc += 2.0;
  const analyticalThinking = clampScore(analScoreCalc);

  // 4. Creativity: creative design aptitude, output medium, artistic skills
  const hasCreativeSkills = lowerSkills.some(
    (s) =>
      s.includes('design') ||
      s.includes('art') ||
      s.includes('writing') ||
      s.includes('acting') ||
      s.includes('modeling') ||
      s.includes('content')
  );
  let creatScoreCalc = ((creativeVal - 1) / 8) * 8;
  if (hasCreativeSkills) creatScoreCalc += 2.0;
  const creativity = clampScore(creatScoreCalc);

  // 5. Leadership: leadership scope, executive strategy, team management
  const hasLeadSkills = lowerSkills.some(
    (s) =>
      s.includes('leadership') ||
      s.includes('project management') ||
      s.includes('strategic') ||
      s.includes('governance')
  );
  let leadScoreCalc = ((leadershipVal - 1) / 8) * 8;
  if (hasLeadSkills) leadScoreCalc += 2.0;
  const leadership = clampScore(leadScoreCalc);

  // 6. Communication: visibility, helping, persuasion, and public speaking skills
  const hasCommSkills = lowerSkills.some(
    (s) =>
      s.includes('sales') ||
      s.includes('debating') ||
      s.includes('law') ||
      s.includes('content') ||
      s.includes('acting') ||
      s.includes('marketing')
  );
  let commScoreCalc =
    ((visibilityVal - 1) / 8) * 4 +
    ((helpingVal - 1) / 9) * 3 +
    ((leadershipVal - 1) / 8) * 1.5;
  if (hasCommSkills) commScoreCalc += 1.5;
  const communication = clampScore(commScoreCalc);

  // 7. Problem Solving: ambiguity tolerance, continuous learning, analytical logic
  let probScoreCalc =
    ((ambiguityVal - 1) / 8) * 4.5 +
    ((learningVal - 1) / 8) * 3 +
    ((mathVal - 1) / 8) * 2.5;
  const problemSolving = clampScore(probScoreCalc);

  // 8. Practical / Field Orientation: physical dexterity, field work mode, practical balance
  const isField = workModes.includes('field');
  let practScoreCalc = ((physicalVal - 1) / 8) * 6;
  if (tpVal !== null) {
    practScoreCalc += ((9 - tpVal) / 8) * 2.5;
  }
  if (isField) practScoreCalc += 1.5;
  const practicalOrientation = clampScore(practScoreCalc);

  // 9. Risk Tolerance: ambiguity freedom, financial risk strategy
  let riskScoreCalc =
    ((ambiguityVal - 1) / 8) * 5 +
    ((financialVal - 2) / 8) * 5;
  const riskTolerance = clampScore(riskScoreCalc);

  // 10. People Interaction: clinical/helping impact, collaboration, people skills
  const hasPeopleSkills = lowerSkills.some(
    (s) =>
      s.includes('patient') ||
      s.includes('nursing') ||
      s.includes('counseling') ||
      s.includes('coaching') ||
      s.includes('teaching')
  );
  let peopleScoreCalc =
    ((helpingVal - 1) / 9) * 7 +
    ((leadershipVal - 1) / 8) * 1.5;
  if (hasPeopleSkills) peopleScoreCalc += 1.5;
  const peopleInteraction = clampScore(peopleScoreCalc);

  const getCharacteristicLevel = (score: number) => {
    if (score >= 8.0) return 'Exceptional';
    if (score >= 6.5) return 'Strong';
    if (score >= 4.5) return 'Moderate';
    return 'Developing';
  };

  const radarDimensions: UserRadarDimensions = {
    technicalAptitude,
    businessOrientation,
    analyticalThinking,
    creativity,
    leadership,
    communication,
    problemSolving,
    practicalOrientation,
    riskTolerance,
    peopleInteraction,
  };

  const characteristicsList: UserCharacteristicDimension[] = [
    { dimension: 'Technical Aptitude', score: technicalAptitude, fullMark: 10, level: getCharacteristicLevel(technicalAptitude), description: 'Orientation toward software, engineering, and digital or hardware systems' },
    { dimension: 'Business Orientation', score: businessOrientation, fullMark: 10, level: getCharacteristicLevel(businessOrientation), description: 'Drive toward commercial growth, financial strategy, and market impact' },
    { dimension: 'Analytical Thinking', score: analyticalThinking, fullMark: 10, level: getCharacteristicLevel(analyticalThinking), description: 'Quantitative rigor, mathematical modeling, and structured data deduction' },
    { dimension: 'Creativity', score: creativity, fullMark: 10, level: getCharacteristicLevel(creativity), description: 'Artistic expression, visual storytelling, and open-ended original ideation' },
    { dimension: 'Leadership', score: leadership, fullMark: 10, level: getCharacteristicLevel(leadership), description: 'Ability and motivation to direct teams, shape strategy, and guide outcomes' },
    { dimension: 'Communication', score: communication, fullMark: 10, level: getCharacteristicLevel(communication), description: 'Articulating ideas, interpersonal persuasion, and stakeholder alignment' },
    { dimension: 'Problem Solving', score: problemSolving, fullMark: 10, level: getCharacteristicLevel(problemSolving), description: 'Navigating ambiguity, tackling novel challenges, and continuous adaptation' },
    { dimension: 'Practical / Field Orientation', score: practicalOrientation, fullMark: 10, level: getCharacteristicLevel(practicalOrientation), description: 'Hands-on execution, physical dexterity, and active dynamic environments' },
    { dimension: 'Risk Tolerance', score: riskTolerance, fullMark: 10, level: getCharacteristicLevel(riskTolerance), description: 'Appetite for bold experimentation, career uncertainty, and high-upside pursuits' },
    { dimension: 'People Interaction', score: peopleInteraction, fullMark: 10, level: getCharacteristicLevel(peopleInteraction), description: 'Empathy, direct human care, collaboration, and community service' },
  ];

  return {
    summaryParagraph,
    keyStrengths,
    workStyleTraits,
    professionalInclinations,
    technicalPracticalBalance: tpLabel,
    workEnvironmentPreference: workModeLabel,
    coreDrives,
    thingsToAvoid,
    radarDimensions,
    characteristicsList,
  };
}

export function computeCareerRecommendations(
  answers: AssessmentAnswerState,
  allCareers: any[]
): {
  archetypeTitle: string;
  archetypeSubtitle: string;
  topCareers: RecommendedCareerResult[];
  allCareers: CareerSuitabilityEntry[];
  personalReview: PersonalCharacteristicsReview;
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

  // 1. Resolve every answer into normalized structures across 21 dimensions
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
  const techPractical = resolveNumericAnswer(answers.technicalPracticalBalance ?? 'not_clear', 5);
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

  const wlb = pressureDynamics;
  const salary = financialStrategy;

  // 2. Multi-Criteria Composite Archetype Determination
  const archetypeProfiles: { key: string; title: string; subtitle: string; score: number }[] = [
    {
      key: 'systems',
      title: 'The Frontier Systems Architect',
      subtitle: 'You thrive on deep algorithmic complexity, mathematical rigor, and engineering systems at the bleeding edge of software, silicon, and intelligence.',
      score: (tech.isNotClear ? 5 : tech.value) * 3.0 +
             (math.isNotClear ? 5 : math.value) * 1.8 +
             (techPractical.isNotClear ? 5 : techPractical.value >= 7 ? 4 : 1) * 1.5 +
             (learning.isNotClear ? 5 : learning.value) * 1.2 +
             (preferredIndustries.some((ind) => ind.includes('Technology') || ind.includes('Software')) ? 24 : 0) +
             (userSkills.some((s) => s.includes('code') || s.includes('software') || s.includes('programming') || s.includes('algorithm')) ? 16 : 0),
    },
    {
      key: 'sovereign_leader',
      title: 'The Sovereign Administrator & Nation Builder',
      subtitle: 'You are called to serve the nation with institutional authority, steering public infrastructure, railways, energy PSUs, defense, and sovereign governance.',
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
             (preferredIndustries.some((ind) => ind.includes('Business') || ind.includes('Fashion') || ind.includes('Product Management')) ? 26 : 0) +
             (userSkills.some((s) => s.includes('brand') || s.includes('marketing') || s.includes('advertising') || s.includes('product management')) ? 18 : 0),
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
             (preferredIndustries.some((ind) => ind.includes('Medicine') || ind.includes('Healthcare')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('biology') || s.includes('anatomy') || s.includes('patient') || s.includes('healthcare') || s.includes('medical')) ? 18 : 0),
    },
    {
      key: 'tactical',
      title: 'The High-Precision Tactical Operator',
      subtitle: 'You excel when operating sophisticated real-world machinery and physical systems under high pressure, maintaining supreme composure in cockpits, bridge decks, and acute theaters.',
      score: (physical.isNotClear ? 5 : physical.value) * 3.2 +
             (techPractical.isNotClear ? 5 : techPractical.value <= 4 ? 4 : 1) * 1.5 +
             (pressureDynamics.isNotClear ? 6 : pressureDynamics.value) * 1.2 +
             (preferredIndustries.some((ind) => ind.includes('Aviation') || ind.includes('Automation') || ind.includes('Robotics')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('aviation') || s.includes('piloting') || s.includes('plc') || s.includes('robotics')) ? 18 : 0),
    },
    {
      key: 'justice',
      title: 'The Guardian of Justice & Sovereign Policy',
      subtitle: 'You are driven by the rule of law, constitutional ethics, and sovereign diplomacy, aspiring to defend human rights, govern institutions, and shape national policy.',
      score: (governance.isNotClear ? 5 : governance.value) * 4.0 +
             (leadership.isNotClear ? 5 : leadership.value) * 1.5 +
             (preferredIndustries.some((ind) => ind.includes('Law') || ind.includes('Government')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('law') || s.includes('debating') || s.includes('speaking')) ? 16 : 0),
    },
    {
      key: 'capital',
      title: 'The Quantitative Capital Allocator',
      subtitle: 'You possess sharp numeric intuition, thriving on financial valuation, risk quantification, and structuring high-stakes investments in global capital markets.',
      score: (math.isNotClear ? 5 : math.value) * 2.8 +
             (financialStrategy.isNotClear ? 7 : financialStrategy.value) * 2.2 +
             (preferredIndustries.some((ind) => ind.includes('Finance') || ind.includes('Banking')) ? 26 : 0) +
             (userSkills.some((s) => s.includes('finance') || s.includes('accounting') || s.includes('budgeting')) ? 18 : 0),
    },
    {
      key: 'builder',
      title: 'The Master Builder & Infrastructure Architect',
      subtitle: 'You are driven to leave an indelible physical mark on the world, designing towering structures, renewable power grids, and civil marvels that endure for generations.',
      score: (physical.isNotClear ? 5 : physical.value) * 2.2 +
             (math.isNotClear ? 5 : math.value) * 2.0 +
             (techPractical.isNotClear ? 5 : (techPractical.value >= 4 && techPractical.value <= 7) ? 5 : 1) * 2.0 +
             (preferredIndustries.some((ind) => ind.includes('Engineering') || ind.includes('Renewable') || ind.includes('Built Environment') || ind.includes('Smart Buildings')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('cad') || s.includes('mechanical') || s.includes('electrical') || s.includes('solar') || s.includes('clean energy')) ? 18 : 0),
    },
    {
      key: 'automation_specialist',
      title: 'The Industrial Automation & Smart Systems Innovator',
      subtitle: 'You bridge the digital realm with the physical world, creating intelligent control systems, robotics integrations, and automated infrastructure that optimize real-world operations.',
      score: (tech.isNotClear ? 5 : tech.value) * 2.4 +
             (techPractical.isNotClear ? 5 : (techPractical.value >= 5 && techPractical.value <= 7) ? 6 : 1) * 2.5 +
             (physical.isNotClear ? 5 : physical.value) * 1.5 +
             (preferredIndustries.some((ind) => ind.includes('Automation') || ind.includes('Robotics') || ind.includes('Smart Buildings')) ? 28 : 0) +
             (userSkills.some((s) => s.includes('plc') || s.includes('automation') || s.includes('robotics') || s.includes('scada')) ? 20 : 0),
    },
  ];

  archetypeProfiles.sort((a, b) => b.score - a.score);
  const bestArchetype = archetypeProfiles[0];
  const archetypeTitle = bestArchetype.score >= 36 ? bestArchetype.title : 'The Frontier Strategic Innovator';
  const archetypeSubtitle = bestArchetype.score >= 36 ? bestArchetype.subtitle : 'You excel at bridging systemic complexity with tangible real-world outcomes, driving high-impact initiatives across modern disciplines.';

  // 3. Fair, Multi-Factor Personalized Scoring of Each Career
  const scored = allCareers.map((career) => {
    const category = career.category || '';
    const industry = career.industry || '';
    const slug = career.slug || '';
    const sLower = slug.toLowerCase();
    const cLower = category.toLowerCase();
    const indLower = industry.toLowerCase();

    // ─── Component 1: Industry & Domain Match (Weight: 25%) ───
    let domainScore = 65; // neutral baseline when no industries specified
    if (preferredIndustries.length > 0) {
      let bestMatch = 25; // default when non-matching
      for (const pref of preferredIndustries) {
        const p = pref.toLowerCase();

        // Exact category or industry containment
        if (p.includes(cLower) || indLower.includes(p)) {
          bestMatch = Math.max(bestMatch, 95);
        }

        // 1. Technology & Software Development
        if (p.includes('technology & software') || p.includes('apps, cloud, ai') || p.includes('cybersecurity')) {
          if (cLower === 'technology & engineering') {
            if (sLower.includes('software') || sLower.includes('developer') || sLower.includes('ai-') || sLower.includes('ml-') || sLower.includes('data-') || sLower.includes('cloud') || sLower.includes('devops') || sLower.includes('full-stack') || sLower.includes('cybersecurity') || sLower.includes('generative-ai')) {
              bestMatch = Math.max(bestMatch, 100);
            } else {
              bestMatch = Math.max(bestMatch, 85);
            }
          } else if (sLower === 'product-manager' || sLower === 'ai-product-manager') {
            bestMatch = Math.max(bestMatch, 60); // adjacent tech-business, NOT top engineering
          }
        }

        // 2. Industrial Automation, Controls & Robotics
        if (p.includes('automation') || p.includes('controls') || p.includes('robotics')) {
          if (sLower.includes('automation') || sLower.includes('robotics') || sLower.includes('controls') || indLower.includes('automation') || indLower.includes('robotics')) {
            bestMatch = Math.max(bestMatch, 100);
          } else if (cLower === 'technology & engineering' || cLower === 'engineering & built environment') {
            bestMatch = Math.max(bestMatch, 75);
          }
        }

        // 3. Renewable Energy & Sustainability
        if (p.includes('renewable') || p.includes('cleantech') || p.includes('sustainability')) {
          if (sLower.includes('renewable') || sLower.includes('climate') || sLower.includes('clean') || indLower.includes('renewable') || indLower.includes('energy') || indLower.includes('sustainability')) {
            bestMatch = Math.max(bestMatch, 100);
          } else if (cLower === 'engineering & built environment') {
            bestMatch = Math.max(bestMatch, 75);
          }
        }

        // 4. Medical Devices & Healthcare Tech
        if (p.includes('medical device') || p.includes('biomedical') || p.includes('healthcare tech')) {
          if (sLower.includes('medical-tech') || sLower.includes('biomedical') || indLower.includes('medical device') || indLower.includes('biomedical')) {
            bestMatch = Math.max(bestMatch, 100);
          } else if (cLower === 'medicine & healthcare' || cLower === 'technology & engineering') {
            bestMatch = Math.max(bestMatch, 80);
          }
        }

        // 5. Smart Buildings & Energy Automation
        if (p.includes('smart buildings') || p.includes('building automation')) {
          if (sLower.includes('smart-buildings') || sLower.includes('building') || indLower.includes('smart buildings')) {
            bestMatch = Math.max(bestMatch, 100);
          } else if (cLower === 'engineering & built environment') {
            bestMatch = Math.max(bestMatch, 80);
          }
        }

        // 6. Business Strategy, Product Management & Corporate Leadership
        if (p.includes('business strategy') || p.includes('product management') || p.includes('corporate leadership')) {
          if (sLower.includes('product-manager') || sLower.includes('strategy') || sLower.includes('management-consultant') || sLower.includes('corporate') || sLower.includes('entrepreneur')) {
            bestMatch = Math.max(bestMatch, 100);
          } else if (cLower === 'business & management') {
            bestMatch = Math.max(bestMatch, 90);
          } else if (cLower === 'finance & banking') {
            bestMatch = Math.max(bestMatch, 70);
          }
        }

        // 7. Indian Government & Public Sector
        if (p.includes('government') || p.includes('public sector') || p.includes('psu') || p.includes('railways') || p.includes('civil services')) {
          if (sLower.includes('upsc') || sLower.includes('psu') || sLower.includes('railways') || sLower.includes('police') || sLower.includes('armed-forces') || sLower.includes('diplomat')) {
            bestMatch = Math.max(bestMatch, 100);
          } else if (cLower === 'law & government') {
            bestMatch = Math.max(bestMatch, 85);
          }
        }

        // 8. Cinema, Entertainment & Creative Arts
        if (p.includes('cinema') || p.includes('entertainment') || p.includes('creative arts')) {
          if (sLower.includes('actor') || sLower.includes('filmmaker') || sLower.includes('musician') || sLower.includes('content-creator') || cLower === 'creative & media') {
            bestMatch = Math.max(bestMatch, 100);
          }
        }

        // 9. Fashion & Modeling
        if (p.includes('fashion') || p.includes('modeling')) {
          if (sLower.includes('model') || sLower.includes('fashion') || indLower.includes('fashion')) {
            bestMatch = Math.max(bestMatch, 100);
          } else if (cLower === 'creative & media') {
            bestMatch = Math.max(bestMatch, 75);
          }
        }

        // 10. Sports & Physical Fitness
        if (p.includes('sports') || p.includes('athletics') || p.includes('fitness')) {
          if (cLower === 'sports & fitness' || sLower.includes('athlete') || sLower.includes('coach') || sLower.includes('fitness')) {
            bestMatch = Math.max(bestMatch, 100);
          }
        }

        // 11. Medicine, Surgery & Clinical Healthcare
        if (p.includes('medicine') || p.includes('surgery') || p.includes('clinical healthcare')) {
          if (sLower.includes('doctor') || sLower.includes('surgeon') || sLower.includes('nurse') || sLower.includes('dentist') || sLower.includes('pharmacist') || sLower.includes('physiotherapist')) {
            bestMatch = Math.max(bestMatch, 100);
          } else if (cLower === 'medicine & healthcare') {
            bestMatch = Math.max(bestMatch, 90);
          }
        }

        // 12. Finance, Banking & Investment
        if (p.includes('finance') || p.includes('banking') || p.includes('investment')) {
          if (cLower === 'finance & banking') {
            bestMatch = Math.max(bestMatch, 100);
          }
        }

        // 13. Law, Judiciary & Legal Services
        if (p.includes('law') || p.includes('judiciary') || p.includes('legal')) {
          if (sLower.includes('lawyer') || sLower.includes('judge') || cLower === 'law & government') {
            bestMatch = Math.max(bestMatch, 100);
          }
        }

        // 14. Civil Engineering & Architecture
        if (p.includes('civil engineering') || p.includes('architecture') || p.includes('built environment')) {
          if (sLower.includes('civil') || sLower.includes('architect') || sLower.includes('construction') || cLower === 'engineering & built environment') {
            bestMatch = Math.max(bestMatch, 100);
          }
        }

        // 15. Aviation & Maritime Operations
        if (p.includes('aviation') || p.includes('aerospace') || p.includes('maritime')) {
          if (cLower === 'aviation & maritime operations' || sLower.includes('pilot') || sLower.includes('air-traffic') || sLower.includes('merchant-navy')) {
            bestMatch = Math.max(bestMatch, 100);
          }
        }

        // 16. Hospitality & Culinary Arts
        if (p.includes('hospitality') || p.includes('culinary') || p.includes('food')) {
          if (cLower === 'hospitality & food' || sLower.includes('chef') || sLower.includes('hotel')) {
            bestMatch = Math.max(bestMatch, 100);
          }
        }

        // 17. Education & Academic Research
        if (p.includes('education') || p.includes('teaching') || p.includes('academic research')) {
          if (cLower === 'education & research' || sLower.includes('teacher') || sLower.includes('professor') || sLower.includes('scientist')) {
            bestMatch = Math.max(bestMatch, 100);
          }
        }
      }
      domainScore = bestMatch;
    }

    // ─── Component 2: Core Aptitude & Rigor Match (Weight: 25%) ───
    const techSim = computeDimSimilarity(tech, career.technicalComplexity || 5);
    const mathSim = computeDimSimilarity(math, career.mathRequirements || 5);
    const wlbSim = computeDimSimilarity(wlb, career.workPressure || 7);
    const learningSim = computeDimSimilarity(learning, career.learningDifficulty || 6);

    const aptitudeScore = (techSim * 0.35 + mathSim * 0.25 + wlbSim * 0.20 + learningSim * 0.20) * 100;

    // ─── Component 3: Work Environment & Setting (Weight: 12%) ───
    const remoteOpp = career.remoteOpportunities || 5;
    let workModeScore = 70;
    if (!mode.isNotClear && mode.modes.length > 0) {
      let bestModeMatch = 30;
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
        if (remoteOpp <= 6 || cLower === 'finance & banking' || cLower === 'law & government' || cLower === 'business & management' || cLower === 'education & research') {
          bestModeMatch = Math.max(bestModeMatch, 95);
        }
      }
      if (mode.modes.includes('field')) {
        const isFieldCareer =
          cLower === 'aviation & maritime operations' ||
          cLower === 'sports & fitness' ||
          cLower === 'engineering & built environment' ||
          cLower === 'hospitality & food' ||
          cLower === 'medicine & healthcare' ||
          sLower.includes('forward-deployed') ||
          sLower.includes('controls') ||
          sLower.includes('automation') ||
          remoteOpp <= 3;
        if (isFieldCareer) {
          bestModeMatch = Math.max(bestModeMatch, 100);
        } else if (remoteOpp <= 5) {
          bestModeMatch = Math.max(bestModeMatch, 65);
        } else {
          bestModeMatch = Math.max(bestModeMatch, 35);
        }
      }
      workModeScore = bestModeMatch;
    }

    // ─── Component 4: Salary Alignment (Weight: 8%) ───
    const seniorMax = career.seniorSalaryMax || 200;
    let salaryScore = 75;
    if (!salary.isNotClear) {
      if (salary.values.some((v) => v >= 9)) {
        if (seniorMax >= 280) salaryScore = 100;
        else if (seniorMax >= 200) salaryScore = 80;
        else salaryScore = 40;
      } else if (salary.values.some((v) => v <= 4)) {
        if (cLower === 'medicine & healthcare' || cLower === 'education & research' || cLower === 'law & government') {
          salaryScore = 95;
        } else {
          salaryScore = 80;
        }
      } else {
        if (seniorMax >= 180) salaryScore = 95;
        else salaryScore = 80;
      }
    }

    // ─── Component 5: Dynamic Skill Matching Across All Careers (Weight: 10%) ───
    let essentialTech: string[] = [];
    try {
      essentialTech = JSON.parse(career.essentialTechSkills || '[]');
    } catch {
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

    const skillRatio = essentialTech.length > 0 ? possessed.length / essentialTech.length : 0.35;
    let skillScore = skillRatio * 15;
    if (possessed.length >= 3) skillScore += 5;
    else if (possessed.length >= 1) skillScore += 2;

    // ─── Component 6: Technical Orientation Specificity (Q1) ───
    let techOrientationDelta = 0;
    if (!tech.isNotClear) {
      const tv = tech.value;
      if (tv >= 8) { // Software, Coding & AI
        if (cLower === 'technology & engineering') {
          if (sLower.includes('software') || sLower.includes('developer') || sLower.includes('ai-') || sLower.includes('ml-') || sLower.includes('data-') || sLower.includes('cloud') || sLower.includes('full-stack') || sLower.includes('generative-ai')) {
            techOrientationDelta += 24;
          } else {
            techOrientationDelta += 14;
          }
        } else if (sLower.includes('product-manager')) {
          techOrientationDelta -= 8; // User specifically wants coding, not coordination/PM
        } else if (cLower === 'medicine & healthcare' || cLower === 'law & government' || cLower === 'creative & media' || cLower === 'sports & fitness') {
          techOrientationDelta -= 14;
        }
      } else if (tv >= 6) { // Physical Machines & Infrastructure
        if (cLower === 'engineering & built environment' || sLower.includes('automation') || sLower.includes('robotics') || sLower.includes('controls') || sLower.includes('mechanical') || sLower.includes('electrical') || sLower.includes('civil') || sLower.includes('hardware')) {
          techOrientationDelta += 22;
        } else if (cLower === 'technology & engineering') {
          techOrientationDelta += 10;
        } else if (cLower === 'creative & media' || cLower === 'hospitality & food') {
          techOrientationDelta -= 10;
        }
      } else if (tv >= 4) { // Technology Planning & Product Management
        if (sLower.includes('product-manager') || sLower.includes('technical-program-manager') || sLower.includes('solutions-consultant') || sLower.includes('digital-transformation')) {
          techOrientationDelta += 26; // Exact target role for this response!
        } else if (cLower === 'business & management' || cLower === 'technology & engineering') {
          techOrientationDelta += 10;
        }
      } else { // People, Creative Arts & Public Service
        if (cLower === 'medicine & healthcare' || cLower === 'law & government' || cLower === 'creative & media' || cLower === 'sports & fitness' || cLower === 'education & research') {
          techOrientationDelta += 24;
        } else if (cLower === 'technology & engineering') {
          techOrientationDelta -= 18;
        }
      }
    }

    // ─── Component 7: Leadership Scope & Contribution Style (Q7) ───
    let leadershipScopeDelta = 0;
    if (!leadership.isNotClear) {
      const lv = leadership.value;
      if (lv >= 8) { // Leading Large Teams & Departments
        if (sLower.includes('director') || sLower.includes('upsc') || sLower.includes('psu') || sLower.includes('railways') || sLower.includes('entrepreneur') || sLower.includes('corporate-strategy') || sLower.includes('police')) {
          leadershipScopeDelta += 20;
        } else if (cLower === 'business & management' || cLower === 'law & government') {
          leadershipScopeDelta += 12;
        } else if (career.technicalComplexity >= 8) {
          leadershipScopeDelta -= 8;
        }
      } else if (lv >= 6) { // Guiding Strategic, Brand or Product Direction
        if (sLower.includes('product-manager') || sLower.includes('brand-manager') || sLower.includes('management-consultant') || sLower.includes('architect') || sLower.includes('strategy')) {
          leadershipScopeDelta += 22;
        } else if (cLower === 'business & management' || cLower === 'creative & media') {
          leadershipScopeDelta += 10;
        }
      } else if (lv >= 4) { // Coaching, Teaching & Mentoring
        if (cLower === 'education & research' || cLower === 'sports & fitness' || sLower.includes('psychologist') || sLower.includes('physiotherapist') || sLower.includes('coach') || sLower.includes('nurse') || sLower.includes('doctor')) {
          leadershipScopeDelta += 22;
        }
      } else { // Independent Specialist Focus (lv <= 3)
        // High boost for solo individual craft
        if ((cLower === 'technology & engineering' && !sLower.includes('manager') && !sLower.includes('consultant')) ||
            sLower.includes('data-scientist') || sLower.includes('senior-software') || sLower.includes('full-stack') ||
            sLower.includes('ai-engineer') || sLower.includes('actuary') || sLower.includes('scientist') ||
            sLower.includes('researcher') || sLower.includes('writer') || sLower.includes('artist')) {
          leadershipScopeDelta += 22;
        }
        // Meaningful penalty for management/PM roles that require heavy coordination
        if (sLower.includes('product-manager') || sLower.includes('director') || sLower.includes('manager') || sLower.includes('hr-')) {
          leadershipScopeDelta -= 22;
        }
      }
    }

    // ─── Component 8: Helping & Human Impact (Q8) ───
    let helpingDelta = 0;
    if (!helping.isNotClear) {
      const hv = helping.value;
      if (hv >= 9) { // Direct clinical healing
        if (cLower === 'medicine & healthcare' || sLower.includes('doctor') || sLower.includes('surgeon') || sLower.includes('nurse') || sLower.includes('physiotherapist') || sLower.includes('psychologist')) {
          helpingDelta += 26;
        } else if (cLower === 'technology & engineering' || cLower === 'finance & banking') {
          helpingDelta -= 16;
        }
      } else if (hv >= 6) { // Teaching, counseling, personal development
        if (cLower === 'education & research' || cLower === 'sports & fitness' || sLower.includes('psychologist') || sLower.includes('counsellor') || sLower.includes('coach')) {
          helpingDelta += 22;
        } else if (cLower === 'medicine & healthcare') {
          helpingDelta += 14;
        }
      } else if (hv >= 4) { // Community welfare & public service
        if (cLower === 'law & government' || sLower.includes('civil') || sLower.includes('railways') || sLower.includes('psu') || sLower.includes('renewable') || sLower.includes('smart-buildings')) {
          helpingDelta += 18;
        }
      } else { // Indirect commercial / products
        if (cLower === 'technology & engineering' || cLower === 'finance & banking' || cLower === 'business & management') {
          helpingDelta += 12;
        } else if (cLower === 'medicine & healthcare') {
          helpingDelta -= 14;
        }
      }
    }

    // ─── Component 9: Creative Expression & Design (Q9) ───
    let creativeDelta = 0;
    if (!creative.isNotClear) {
      const cv = creative.value;
      if (cv >= 8) { // Screen, runway, performing arts
        if (sLower.includes('actor') || sLower.includes('model') || sLower.includes('filmmaker') || sLower.includes('musician') || cLower === 'creative & media') {
          creativeDelta += 26;
        } else if (cLower === 'technology & engineering' || cLower === 'finance & banking' || cLower === 'law & government') {
          creativeDelta -= 16;
        }
      } else if (cv >= 6) { // Brand storytelling & creative marketing
        if (sLower.includes('brand-manager') || sLower.includes('marketing') || sLower.includes('content') || sLower.includes('journalist')) {
          creativeDelta += 22;
        } else if (cLower === 'business & management') {
          creativeDelta += 8;
        }
      } else if (cv >= 4) { // Practical design & UX
        if (sLower.includes('graphic') || sLower.includes('ux') || sLower.includes('architect') || sLower.includes('interior') || sLower.includes('product-manager')) {
          creativeDelta += 14;
        }
      } else { // Objective facts, law, technical science
        if (cLower === 'technology & engineering' || cLower === 'finance & banking' || cLower === 'law & government' || cLower === 'medicine & healthcare') {
          creativeDelta += 12;
        } else if (sLower.includes('actor') || sLower.includes('model')) {
          creativeDelta -= 20;
        }
      }
    }

    // ─── Component 10: Physical Dexterity & Tactical Mastery (Q10) ───
    let physicalDelta = 0;
    if (!physical.isNotClear) {
      const pv = physical.value;
      if (pv >= 8) { // High athleticism & physical performance
        if (cLower === 'sports & fitness' || sLower.includes('athlete') || sLower.includes('pilot') || sLower.includes('model')) {
          physicalDelta += 26;
        } else if (remoteOpp >= 7) {
          physicalDelta -= 16;
        }
      } else if (pv >= 6) { // Hands-on technical & industrial operations
        if (cLower === 'aviation & maritime operations' || sLower.includes('controls') || sLower.includes('electrician') || sLower.includes('surgeon') || sLower.includes('chef') || sLower.includes('mechanical') || sLower.includes('robotics')) {
          physicalDelta += 20;
        }
      } else if (pv >= 4) { // Active movement across locations
        if (cLower === 'medicine & healthcare' || cLower === 'engineering & built environment' || sLower.includes('forward-deployed')) {
          physicalDelta += 10;
        }
      } else { // Desk-based mental & software work (pv <= 3)
        if (remoteOpp >= 7 || cLower === 'technology & engineering' || cLower === 'finance & banking') {
          physicalDelta += 14;
        } else if (cLower === 'sports & fitness' || sLower.includes('pilot') || sLower.includes('chef')) {
          physicalDelta -= 20;
        }
      }
    }

    // ─── Component 11: Sovereign Service vs Private Sector (Q12) ───
    let governanceDelta = 0;
    if (!governance.isNotClear) {
      const gv = governance.value;
      if (gv >= 9) { // Civil services, police & armed forces
        if (sLower.includes('upsc') || sLower.includes('police') || sLower.includes('armed-forces') || sLower.includes('diplomat')) {
          governanceDelta += 30;
        } else if (cLower === 'law & government') {
          governanceDelta += 16;
        } else if (cLower === 'business & management' || cLower === 'technology & engineering') {
          governanceDelta -= 10;
        }
      } else if (gv >= 7) { // PSUs & Indian Railways
        if (sLower.includes('psu') || sLower.includes('railways')) {
          governanceDelta += 30;
        } else if (cLower === 'engineering & built environment') {
          governanceDelta += 12;
        }
      } else if (gv >= 5) { // Legal practice & judiciary
        if (sLower.includes('lawyer') || sLower.includes('judge') || cLower === 'law & government') {
          governanceDelta += 26;
        }
      } else { // Private industry & startups
        if (cLower === 'technology & engineering' || cLower === 'business & management' || cLower === 'finance & banking') {
          governanceDelta += 14;
        } else if (sLower.includes('upsc') || sLower.includes('psu') || sLower.includes('railways')) {
          governanceDelta -= 18;
        }
      }
    }

    // ─── Component 12: Technical vs. Practical Balance (Q11) ───
    let tpDelta = 0;
    if (!techPractical.isNotClear) {
      let careerTP = 5;
      if (cLower === 'technology & engineering') {
        if (sLower.includes('software') || sLower.includes('developer') || sLower.includes('data-') || sLower.includes('ai-') || sLower.includes('ml-') || sLower.includes('cloud') || sLower.includes('cybersecurity')) {
          careerTP = 9; // 100% technical
        } else if (sLower.includes('controls') || sLower.includes('robotics') || sLower.includes('automation') || sLower.includes('hardware')) {
          careerTP = 6.5; // balanced technical + practical
        } else {
          careerTP = 7.5;
        }
      } else if (cLower === 'engineering & built environment') {
        if (sLower.includes('renewable') || sLower.includes('smart-buildings') || sLower.includes('civil') || sLower.includes('mechanical')) {
          careerTP = 6;
        } else {
          careerTP = 3.5;
        }
      } else if (cLower === 'medicine & healthcare') {
        careerTP = sLower.includes('surgeon') || sLower.includes('nurse') ? 3 : 4.5;
      } else if (cLower === 'business & management') {
        careerTP = sLower.includes('product-manager') ? 5.5 : 4;
      } else if (cLower === 'aviation & maritime operations' || cLower === 'sports & fitness' || cLower === 'hospitality & food') {
        careerTP = 2; // hands-on practical
      } else if (cLower === 'finance & banking') {
        careerTP = 7.5; // analytical
      } else if (cLower === 'creative & media') {
        careerTP = sLower.includes('graphic') ? 6 : 3;
      }

      const diff = Math.abs(techPractical.value - careerTP);
      if (diff <= 1.0) tpDelta += 16;
      else if (diff <= 2.5) tpDelta += 8;
      else if (diff >= 5.0) tpDelta -= 16;
    }

    // ─── Component 13: Financial Strategy & Career Drive (Q4 & Q20) ───
    let financialDelta = 0;
    if (!financialStrategy.isNotClear) {
      const fv = financialStrategy.value;
      if (fv >= 9) { // High risk / high upside (equity/royalties)
        if (sLower.includes('entrepreneur') || sLower.includes('founder') || sLower.includes('trader') || sLower.includes('model') || sLower.includes('actor') || sLower.includes('venture-capital')) {
          financialDelta += 16;
        } else if (sLower.includes('upsc') || sLower.includes('psu') || sLower.includes('railways')) {
          financialDelta -= 10;
        }
      } else if (fv <= 4) { // Sovereign pension / stable pay
        if (sLower.includes('upsc') || sLower.includes('psu') || sLower.includes('railways') || sLower.includes('armed-forces') || sLower.includes('police') || sLower.includes('judge') || cLower === 'education & research') {
          financialDelta += 18;
        } else if (sLower.includes('entrepreneur') || sLower.includes('trader')) {
          financialDelta -= 14;
        }
      }
    }

    // ─── Component 14: Ambiguity & Structure (Q6) ───
    let ambiguityDelta = 0;
    if (!ambiguity.isNotClear) {
      const av = ambiguity.value;
      if (av >= 8) { // High freedom / invent from scratch
        if (sLower.includes('entrepreneur') || sLower.includes('founder') || sLower.includes('researcher') || sLower.includes('ai-builder') || sLower.includes('product-manager')) {
          ambiguityDelta += 10;
        } else if (sLower.includes('pilot') || sLower.includes('air-traffic') || sLower.includes('railways')) {
          ambiguityDelta -= 10;
        }
      } else if (av <= 3) { // Strict safety checklists & protocols
        if (sLower.includes('pilot') || sLower.includes('air-traffic') || sLower.includes('surgeon') || sLower.includes('railways') || sLower.includes('actuary') || sLower.includes('judge')) {
          ambiguityDelta += 14;
        } else if (sLower.includes('entrepreneur') || sLower.includes('founder')) {
          ambiguityDelta -= 14;
        }
      }
    }

    // ─── Component 15: Non-Negotiables & Lifestyle Pain Points (Q17 & Q21) ───
    let nonNegotiablesDelta = 0;
    const fulfilledNonNegotiables: string[] = [];

    if (nonNegotiables.length > 0) {
      const wlbVal = career.workLifeBalance || 7;
      const pressureVal = career.workPressure || 7;
      const remoteOppVal = career.remoteOpportunities || 5;
      const seniorMaxVal = career.seniorSalaryMax || 200;

      if (nonNegotiables.some((n) => n.includes('Health') || n.includes('Fitness'))) {
        if (wlbVal >= 6 && pressureVal <= 7) {
          nonNegotiablesDelta += 14;
          fulfilledNonNegotiables.push('daily health & wellness balance');
        } else if (cLower === 'sports & fitness') {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('active physical movement');
        } else if (wlbVal <= 4 || pressureVal >= 9) {
          nonNegotiablesDelta -= 22;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Scheduled') || n.includes('Predictable Hours'))) {
        if (wlbVal >= 7 && pressureVal <= 6) {
          nonNegotiablesDelta += 16;
          fulfilledNonNegotiables.push('predictable scheduled hours');
        } else if (sLower.includes('surgeon') || sLower.includes('forward-deployed') || sLower.includes('investment-banker')) {
          nonNegotiablesDelta -= 26;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Earning Potential') || n.includes('High Earning') || n.includes('Money'))) {
        if (seniorMaxVal >= 250) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('top-tier compensation upside');
        } else if (seniorMaxVal <= 120) {
          nonNegotiablesDelta -= 20;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Family') || n.includes('Personal Time'))) {
        if (wlbVal >= 7 && pressureVal <= 6) {
          nonNegotiablesDelta += 16;
          fulfilledNonNegotiables.push('family & personal time');
        } else if (sLower.includes('pilot') || sLower.includes('forward-deployed') || pressureVal >= 9 || wlbVal <= 4) {
          nonNegotiablesDelta -= 26;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Remote') || n.includes('Location Freedom'))) {
        if (remoteOppVal >= 8) {
          nonNegotiablesDelta += 20;
          fulfilledNonNegotiables.push('location freedom & remote work');
        } else if (remoteOppVal >= 6) {
          nonNegotiablesDelta += 10;
          fulfilledNonNegotiables.push('hybrid flexibility');
        } else if (remoteOppVal <= 2) {
          nonNegotiablesDelta -= 28;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Job Security') || n.includes('Stability'))) {
        if (cLower === 'medicine & healthcare' || cLower === 'law & government' || (career.careerStability || 7) >= 8) {
          nonNegotiablesDelta += 16;
          fulfilledNonNegotiables.push('strong career stability');
        } else if (sLower.includes('entrepreneur') || sLower.includes('founder') || sLower.includes('trader')) {
          nonNegotiablesDelta -= 20;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Ethical') || n.includes('Social Impact'))) {
        if (cLower === 'medicine & healthcare' || cLower === 'education & research' || sLower.includes('renewable') || sLower.includes('smart-buildings')) {
          nonNegotiablesDelta += 16;
          fulfilledNonNegotiables.push('ethical social impact');
        }
      }
      if (nonNegotiables.some((n) => n.includes('Creative Freedom') || n.includes('Autonomy'))) {
        if (cLower === 'creative & media' || sLower.includes('entrepreneur') || sLower.includes('architect') || sLower.includes('product')) {
          nonNegotiablesDelta += 14;
          fulfilledNonNegotiables.push('creative problem-solving autonomy');
        }
      }
      if (nonNegotiables.some((n) => n.includes('Low Stress') || n.includes('Calm'))) {
        if (wlbVal >= 7 && pressureVal <= 5) {
          nonNegotiablesDelta += 16;
          fulfilledNonNegotiables.push('calm workplace culture');
        } else if (pressureVal >= 8 || wlbVal <= 4) {
          nonNegotiablesDelta -= 22;
        }
      }
    }

    // ─── Total Composite Raw Score ───
    const weightedBase =
      domainScore * 0.30 +
      aptitudeScore * 0.25 +
      workModeScore * 0.12 +
      salaryScore * 0.08 +
      skillScore;

    const totalRawScore =
      weightedBase +
      techOrientationDelta +
      leadershipScopeDelta +
      helpingDelta +
      creativeDelta +
      physicalDelta +
      governanceDelta +
      tpDelta +
      financialDelta +
      ambiguityDelta +
      nonNegotiablesDelta;

    // ─── Tailored, Explainable whyMatch Rationale ───
    let whyMatch = '';
    if (sLower === 'doctor-physician' || sLower === 'surgeon' || sLower === 'nurse' || sLower === 'dentist') {
      whyMatch = `Directly fulfills your deep passion for clinical human healing, patient care, and frontline healthcare impact.`;
    } else if (sLower.includes('software') || sLower.includes('full-stack') || sLower.includes('developer')) {
      whyMatch = `Leverages your passion for deep coding, software architecture, and building powerful digital platforms.`;
    } else if (sLower.includes('ai-engineer') || sLower.includes('ml-engineer') || sLower.includes('generative-ai')) {
      whyMatch = `Aligns with your excitement for cutting-edge artificial intelligence, mathematical algorithms, and frontier intelligent systems.`;
    } else if (sLower.includes('data-scientist')) {
      whyMatch = `Harmonizes your analytical rigor, statistical modeling aptitude, and passion for turning complex data into actionable insight.`;
    } else if (sLower === 'product-manager' || sLower === 'ai-product-manager') {
      whyMatch = `Empowers your product vision, cross-functional leadership, and tech strategy to drive transformative applications.`;
    } else if (sLower === 'industrial-automation-controls-engineer') {
      whyMatch = `Combines your passion for automated control systems, PLC programming, robotics, and smart manufacturing operations.`;
    } else if (sLower === 'renewable-energy-project-developer') {
      whyMatch = `Channels your dedication to clean energy infrastructure, sustainability, and large-scale renewable project development.`;
    } else if (sLower === 'upsc-civil-services' || sLower.includes('diplomat')) {
      whyMatch = `Directly reflects your commitment to sovereign governance, public policy, and national civic leadership.`;
    } else if (sLower.includes('psu') || sLower.includes('railways')) {
      whyMatch = `Channels your dedication to national engineering and sovereign public infrastructure within prestigious state enterprises.`;
    } else if (sLower.includes('actor') || sLower.includes('film')) {
      whyMatch = `Directly reflects your passion for dramatic screen performance, emotional embodiment, and cinematic storytelling.`;
    } else if (sLower.includes('model')) {
      whyMatch = `Matches your physical presence, visual aesthetic intuition, and excitement for high-visibility fashion and media.`;
    } else if (sLower.includes('banker') || sLower.includes('trader') || sLower.includes('quant')) {
      whyMatch = `Leverages your sharp numeric intuition, financial modeling skills, and appetite for high-stakes capital allocation.`;
    } else if (sLower.includes('pilot')) {
      whyMatch = `Fulfills your ambition for high-precision physical command, aeronautical navigation, and real-time operational mastery.`;
    } else if (cLower === 'technology & engineering') {
      whyMatch = `Directly leverages your appetite for technological problem-solving, engineering systems, and digital innovation.`;
    } else if (cLower === 'medicine & healthcare') {
      whyMatch = `Harmonizes with your calling for direct human care, medical science, and personal patient wellbeing.`;
    } else if (cLower === 'law & government') {
      whyMatch = `Aligns with your dedication to legal advocacy, institutional integrity, and public service.`;
    } else if (cLower === 'business & management') {
      whyMatch = `Empowers your commercial acumen, strategic decision-making, and cross-functional leadership.`;
    } else if (cLower === 'creative & media') {
      whyMatch = `Gives full expression to your creative storytelling, aesthetic vision, and audience engagement.`;
    } else if (cLower === 'engineering & built environment') {
      whyMatch = `Channels your engineering and spatial problem-solving to create enduring physical infrastructure.`;
    } else {
      whyMatch = `Strong overall alignment with your assessed working preferences, aptitudes, and career goals.`;
    }

    if (fulfilledNonNegotiables.length > 0) {
      const topFulfilled = fulfilledNonNegotiables.slice(0, 2).join(' and ');
      whyMatch += ` Perfectly protects your priority for ${topFulfilled}.`;
    }

    let disadvantages: string[] = [];
    try {
      disadvantages = JSON.parse(career.disadvantages || '[]');
    } catch {
      disadvantages = ['High continuous learning requirements', 'Competitive hiring landscape'];
    }

    return {
      rawScore: totalRawScore,
      careerSlug: slug,
      title: career.title,
      category,
      compatibilityScore: 0, // replaced during calibration
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

  scored.sort((a, b) => b.rawScore - a.rawScore);

  // --- Calibrate scores across all careers using raw score range ---
  const maxRaw = scored[0]?.rawScore ?? 1;
  const minRaw = scored[scored.length - 1]?.rawScore ?? 0;
  const rawRange = maxRaw - minRaw || 1;

  const allScoredCalibratedRaw = scored.map((item, idx) => {
    // Blend: 70% based on raw score position, 30% based on rank position
    const rawRatio = (item.rawScore - minRaw) / rawRange;
    const rankRatio = 1 - idx / (scored.length - 1 || 1);
    const blended = rawRatio * 0.70 + rankRatio * 0.30;
    let calibrated = Math.round(22 + blended * (98 - 22));
    // Enforce monotonic decrease
    calibrated = Math.min(calibrated, 98);
    calibrated = Math.max(calibrated, 18);
    return { ...item, _calibratedScore: calibrated };
  });

  // Enforce strict monotonic decrease (each rank <= previous)
  for (let i = 1; i < allScoredCalibratedRaw.length; i++) {
    if (allScoredCalibratedRaw[i]._calibratedScore > allScoredCalibratedRaw[i - 1]._calibratedScore) {
      allScoredCalibratedRaw[i]._calibratedScore = allScoredCalibratedRaw[i - 1]._calibratedScore;
    }
  }

  const top10 = allScoredCalibratedRaw.slice(0, 10).map((item) => {
    const { rawScore, _calibratedScore, ...rest } = item;
    return { ...rest, compatibilityScore: _calibratedScore };
  });

  // Build full career suitability list (all careers)
  const allCareersRanked: CareerSuitabilityEntry[] = allScoredCalibratedRaw.map((item, idx) => {
    const { rawScore, _calibratedScore, ...rest } = item;
    const score = _calibratedScore;
    const fc = fitCategory(score);
    const scoreOutOf10 = parseFloat((score / 10).toFixed(1));

    // Brief fit explanation
    let fitExplanation: string;
    if (fc === 'Excellent Fit') {
      fitExplanation = `Strong alignment across your technical depth, work environment preferences, industry interests, and professional strengths. This role directly matches your most important career priorities.`;
    } else if (fc === 'Good Fit') {
      fitExplanation = `Good alignment with your core preferences. This career matches your aptitudes and interests in key dimensions, with a few areas that may require additional development or adjustment.`;
    } else if (fc === 'Moderate Fit') {
      fitExplanation = `Partial alignment with your profile. While some aspects of this role fit your preferences, there are notable gaps between your stated priorities and what this career typically demands.`;
    } else {
      fitExplanation = `Limited alignment with your assessed profile. This role requires characteristics, skills, or working conditions that significantly differ from your stated preferences and aptitudes.`;
    }

    return {
      ...rest,
      compatibilityScore: score,
      rank: idx + 1,
      fitCategory: fc,
      scoreOutOf10,
      fitExplanation,
    };
  });

  const personalReview = buildPersonalReview(answers);

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
    allCareers: allCareersRanked,
    personalReview,
  };
}
