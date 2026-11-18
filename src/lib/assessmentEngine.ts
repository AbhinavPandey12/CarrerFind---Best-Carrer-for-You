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

  // 3. Multi-Vector Scoring of Each Career
  const scored = allCareers.map((career) => {
    const category = career.category || '';
    const industry = career.industry || '';
    const slug = career.slug || '';

    // --- Component 1: Industry & Domain Match (Weight: 35%) ---
    let domainScore = 55;
    const hasPreferred = preferredIndustries.length > 0;

    if (hasPreferred) {
      const isDomainMatch = preferredIndustries.some((pref: string) => {
        const p = pref.toLowerCase();
        const c = category.toLowerCase();
        const ind = industry.toLowerCase();
        if (p === c || p === ind) return true;
        if ((p.includes('industrial automation') || p.includes('controls') || p.includes('robotics') || p.includes('smart manufacturing')) &&
            (ind.includes('automation') || ind.includes('robotics') || slug.includes('automation') || slug.includes('robotics'))) return true;
        if ((p.includes('renewable') || p.includes('cleantech') || p.includes('sustainability') || p.includes('clean energy')) &&
            (ind.includes('renewable') || ind.includes('clean') || ind.includes('energy') || slug.includes('renewable') || slug.includes('energy'))) return true;
        if ((p.includes('medical technology') || p.includes('medical device') || p.includes('biomedical') || p.includes('healthcare tech')) &&
            (ind.includes('medical') || ind.includes('device') || slug.includes('medical-tech') || slug.includes('medical-technology'))) return true;
        if ((p.includes('smart buildings') || p.includes('building automation') || p.includes('energy management')) &&
            (ind.includes('smart buildings') || ind.includes('building automation') || slug.includes('smart-buildings') || slug.includes('energy-automation'))) return true;
        if ((p.includes('product management') || p.includes('technology strategy') || p.includes('business strategy')) &&
            (slug.includes('product-manager') || ind.includes('product management') || ind.includes('technology strategy'))) return true;
        if ((p.includes('enterprise software') || p.includes('customer engineering')) &&
            (slug.includes('forward-deployed') || ind.includes('enterprise software'))) return true;
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
        domainScore = 18;
      }
    }

    let categoryAffinity = 0;
    if (category === 'Medicine & Healthcare') {
      if (!helping.isNotClear) categoryAffinity += (helping.value - 5) * 8;
      if (!physical.isNotClear && (slug.includes('surgeon') || slug.includes('dentist'))) categoryAffinity += (physical.value - 5) * 3;
      if (!techPractical.isNotClear && slug === 'medical-technology-application-specialist') {
        const tpBalance = techPractical.value;
        if (tpBalance >= 5 && tpBalance <= 7) categoryAffinity += 12;
      }
    } else if (category === 'Technology & Engineering') {
      if (!tech.isNotClear) categoryAffinity += (tech.value - 5) * 9;
      if (!math.isNotClear) categoryAffinity += (math.value - 5) * 4;
      if (!learning.isNotClear) categoryAffinity += (learning.value - 5) * 3;
      if (!techPractical.isNotClear) categoryAffinity += (techPractical.value - 5) * 4;
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
      if (!techPractical.isNotClear) {
        const tpVal = techPractical.value;
        if (tpVal >= 4 && tpVal <= 7) categoryAffinity += 10;
        else if (tpVal === 1) categoryAffinity += 8;
      }
    } else if (category === 'Hospitality & Food') {
      if (!creative.isNotClear) categoryAffinity += (creative.value - 5) * 7;
      if (!physical.isNotClear) categoryAffinity += (physical.value - 5) * 7;
      if (!helping.isNotClear) categoryAffinity += (helping.value - 5) * 4;
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
    let workModeScore = 70;
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
        const isFieldCareer =
          category === 'Aviation & Maritime Operations' ||
          category === 'Sports & Fitness' ||
          category === 'Engineering & Built Environment' ||
          category === 'Hospitality & Food' ||
          category === 'Medicine & Healthcare' ||
          category === 'Creative & Media' ||
          slug.includes('forward-deployed') ||
          slug.includes('automation') ||
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

    // Specialized domain skill bonuses
    if (slug.includes('model') && userSkills.some((s) => s.includes('modeling') || s.includes('runway') || s.includes('editorial'))) skillBonus += 18;
    if (slug.includes('athlete') && userSkills.some((s) => s.includes('athletic') || s.includes('sports training') || s.includes('conditioning'))) skillBonus += 18;
    if (slug.includes('railways') && userSkills.some((s) => s.includes('rail') || s.includes('locomotive') || s.includes('transit'))) skillBonus += 20;
    if (slug.includes('psu') && userSkills.some((s) => s.includes('refinery') || s.includes('petrochemical') || s.includes('industrial plant'))) skillBonus += 20;
    if (slug.includes('brand-manager') && userSkills.some((s) => s.includes('brand strategy') || s.includes('consumer marketing'))) skillBonus += 20;
    if (slug.includes('actor') && userSkills.some((s) => s.includes('acting') || s.includes('dramatic') || s.includes('voice artistry'))) skillBonus += 20;
    if (slug.includes('upsc') && userSkills.some((s) => s.includes('civil governance') || s.includes('public administration') || s.includes('policy'))) skillBonus += 14;

    // ─── 7 Roles Specialization Skill Bonuses ───
    if (slug === 'industrial-automation-controls-engineer' && userSkills.some((s) => s.includes('plc') || s.includes('automation') || s.includes('scada') || s.includes('machinery'))) skillBonus += 24;
    if (slug === 'forward-deployed-ai-robotics-engineer' && userSkills.some((s) => s.includes('robotics') || s.includes('ros') || s.includes('hardware integration'))) skillBonus += 24;
    if (slug === 'renewable-energy-project-developer' && userSkills.some((s) => s.includes('clean energy') || s.includes('solar') || s.includes('environmental'))) skillBonus += 24;
    if (slug === 'medical-technology-application-specialist' && userSkills.some((s) => s.includes('medical device') || s.includes('biomedical') || s.includes('hospital'))) skillBonus += 24;
    if (slug === 'smart-buildings-energy-automation-consultant' && userSkills.some((s) => s.includes('smart buildings') || s.includes('building automation') || s.includes('hvac'))) skillBonus += 24;
    if (slug === 'ai-product-manager' && userSkills.some((s) => s.includes('product management') || s.includes('roadmapping') || s.includes('user experience'))) skillBonus += 24;
    if (slug === 'forward-deployed-engineer' && userSkills.some((s) => s.includes('enterprise client') || s.includes('technical integration') || s.includes('customer engineering'))) skillBonus += 24;

    // General Tech subtypes
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

    // --- Component 6: Lifestyle Pain Points & Frustration Penalties/Bonuses ---
    let painPointDelta = 0;
    if (painPoints.length > 0) {
      const wlbVal = career.workLifeBalance || 7;
      const pressureVal = career.workPressure || 7;

      if (painPoints.some((p) => p.includes('commuting') || p.includes('heavy traffic'))) {
        if (remoteOpp >= 7) painPointDelta += 8;
        if (remoteOpp <= 3 && category !== 'Aviation & Maritime Operations') painPointDelta -= 8;
      }
      if (painPoints.some((p) => p.includes('Sitting still') || p.includes('desk'))) {
        if (category === 'Aviation & Maritime Operations' || category === 'Sports & Fitness' || category === 'Hospitality & Food' || category === 'Engineering & Built Environment' || slug.includes('automation') || slug.includes('robotics')) {
          painPointDelta += 16;
        } else if (category === 'Medicine & Healthcare' && (slug.includes('surgeon') || slug.includes('nurse') || slug.includes('specialist'))) {
          painPointDelta += 12;
        } else if (category === 'Technology & Engineering' || category === 'Finance & Banking' || slug.includes('lawyer') || slug.includes('accountant') || slug.includes('actuary')) {
          painPointDelta -= 16;
        }
      }
      if (painPoints.some((p) => p.includes('appreciation') || p.includes('credit') || p.includes('recognition'))) {
        if (category === 'Medicine & Healthcare' || slug.includes('founder') || slug.includes('director') || slug.includes('lead') || slug.includes('pilot') || slug.includes('product-manager')) {
          painPointDelta += 6;
        }
      }
      if (painPoints.some((p) => p.includes('repetitive tasks') || p.includes('variety') || p.includes('creative freedom'))) {
        if (category === 'Creative & Media' || category === 'Hospitality & Food' ||
            slug.includes('founder') || slug.includes('product') || slug.includes('architect') ||
            slug.includes('forward-deployed') || slug.includes('automation') || slug.includes('developer')) {
          painPointDelta += 8;
        }
        if (slug.includes('accountant') || slug.includes('actuary') || slug.includes('controller')) {
          painPointDelta -= 8;
        }
      }
      if (painPoints.some((p) => p.includes('isolation') || p.includes('little human contact') || p.includes('interaction'))) {
        if (category === 'Education & Research' || category === 'Medicine & Healthcare' || category === 'Business & Management' || category === 'Hospitality & Food' || slug.includes('forward-deployed') || slug.includes('product-manager')) {
          painPointDelta += 7;
        }
      }
      if (painPoints.some((p) => p.includes('stress') || p.includes('emergencies') || p.includes('60+ hour'))) {
        if (wlbVal >= 7 && pressureVal <= 6) painPointDelta += 10;
        if (pressureVal >= 8 || wlbVal <= 4) painPointDelta -= 14;
      }
      if (painPoints.some((p) => p.includes('meaningful difference') || p.includes('no real difference'))) {
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' || category === 'Law & Government' || slug.includes('renewable') || slug.includes('smart-buildings')) {
          painPointDelta += 10;
        }
      }
      if (painPoints.some((p) => p.includes('Low pay') || p.includes('Earning too little'))) {
        if (seniorMax >= 250) painPointDelta += 8;
        if (seniorMax < 130) painPointDelta -= 8;
      }
      if (painPoints.some((p) => p.includes('bureaucracy') || p.includes('red tape') || p.includes('rigid rules'))) {
        if (slug.includes('founder') || category === 'Creative & Media' || category === 'Business & Management' || slug.includes('forward-deployed')) {
          painPointDelta += 8;
        }
        if (category === 'Law & Government' || slug.includes('pilot') || slug.includes('controller') || slug.includes('actuary')) {
          painPointDelta -= 10;
        }
      }
      if (painPoints.some((p) => p.includes('travel') || p.includes('away from home'))) {
        if (slug.includes('pilot') || slug.includes('merchant-navy') || slug.includes('forward-deployed') || slug.includes('offshore')) {
          painPointDelta -= 18;
        } else if (remoteOpp >= 6) {
          painPointDelta += 6;
        }
      }
      if (painPoints.some((p) => p.includes('Unstable income') || p.includes('layoffs') || p.includes('insecurity'))) {
        if (category === 'Medicine & Healthcare' || category === 'Law & Government' || (career.careerStability || 7) >= 8) {
          painPointDelta += 8;
        }
        if (slug.includes('founder') || slug.includes('content-creator') || slug.includes('trader') || slug.includes('model')) {
          painPointDelta -= 10;
        }
      }
    }

    // --- Ambiguity Preference Alignment ---
    let ambiguityDelta = 0;
    if (!ambiguity.isNotClear) {
      if (ambiguity.values.some((v) => v >= 8)) {
        if (slug.includes('founder') || slug.includes('entrepreneur') || slug.includes('forward-deployed') || slug.includes('ai-product-manager') || slug.includes('product-manager') || slug.includes('ai-builder')) ambiguityDelta += 8;
      } else if (ambiguity.values.some((v) => v <= 4)) {
        if (slug.includes('pilot') || slug.includes('judge') || slug.includes('actuary') || slug.includes('controller') || slug.includes('accountant') || slug.includes('upsc') || slug.includes('industrial-automation')) ambiguityDelta += 8;
      }
    }

    // --- Financial Strategy Alignment ---
    let financialStrategyDelta = 0;
    if (!financialStrategy.isNotClear) {
      const fsVal = financialStrategy.value;
      if (fsVal >= 9) {
        if (slug.includes('founder') || slug.includes('entrepreneur') || slug.includes('forward-deployed') || slug.includes('ai-product-manager') ||
            slug.includes('model') || slug.includes('actor') || slug.includes('athlete') || slug.includes('ai-builder')) financialStrategyDelta += 14;
        if (slug.includes('psu') || slug.includes('railways') || slug.includes('upsc') || slug.includes('teacher')) financialStrategyDelta -= 8;
      } else if (fsVal >= 7) {
        if (category === 'Technology & Engineering' || category === 'Finance & Banking' || category === 'Business & Management' ||
            slug.includes('brand-manager') || slug.includes('investment-banker') || slug.includes('management-consultant') ||
            slug.includes('lawyer') || slug.includes('surgeon') || slug.includes('pilot') || slug.includes('controls-engineer')) financialStrategyDelta += 12;
        if (slug.includes('psu') || slug.includes('railways') || slug.includes('upsc')) financialStrategyDelta -= 4;
      } else if (fsVal <= 5) {
        if (slug.includes('psu') || slug.includes('railways') || slug.includes('upsc') || slug.includes('armed-forces') ||
            slug.includes('police') || slug.includes('judge') || category === 'Education & Research') financialStrategyDelta += 18;
        if (slug.includes('founder') || slug.includes('model') || slug.includes('trader')) financialStrategyDelta -= 12;
      }
    }

    // --- Output Medium Alignment ---
    let outputMediumDelta = 0;
    if (!outputMedium.isNotClear) {
      const omVal = outputMedium.value;
      if (omVal >= 8) {
        if (category === 'Technology & Engineering' || slug.includes('software') || slug.includes('ai')) outputMediumDelta += 14;
        if (slug.includes('model') || slug.includes('railways') || slug.includes('actor')) outputMediumDelta -= 8;
      } else if (omVal >= 6) {
        if (slug.includes('psu') || slug.includes('automation') || slug.includes('renewable') || slug.includes('smart-buildings')) outputMediumDelta += 24;
        else if (category === 'Engineering & Built Environment' || slug.includes('civil') || slug.includes('mechanical')) outputMediumDelta += 15;
      } else if (omVal === 5) {
        if (slug.includes('actor') || slug.includes('model') || slug.includes('athlete') || category === 'Creative & Media') outputMediumDelta += 18;
      } else if (omVal <= 3) {
        if (slug.includes('railways') || slug.includes('psu') || slug.includes('upsc') || category === 'Law & Government') outputMediumDelta += 20;
      }
    }

    // --- Public Visibility Alignment ---
    let publicVisibilityDelta = 0;
    if (!publicVisibility.isNotClear) {
      const pvVal = publicVisibility.value;
      if (pvVal >= 8) {
        if (slug.includes('actor') || slug.includes('model') || slug.includes('athlete') || slug.includes('content-creator')) publicVisibilityDelta += 20;
        if (slug.includes('actuary') || slug.includes('data-engineer') || slug.includes('controls-engineer')) publicVisibilityDelta -= 15;
      } else if (pvVal >= 6) {
        if (slug.includes('brand-manager') || slug.includes('upsc') || slug.includes('ai-product-manager') || slug.includes('forward-deployed') ||
            slug.includes('lawyer') || slug.includes('management-consultant') || category === 'Business & Management') publicVisibilityDelta += 14;
      } else if (pvVal <= 3) {
        if (category === 'Technology & Engineering' || slug.includes('actuary') || slug.includes('data') ||
            slug.includes('controls-engineer') || slug.includes('developer')) publicVisibilityDelta += 14;
        if (slug.includes('actor') || slug.includes('model') || slug.includes('athlete')) publicVisibilityDelta -= 22;
      }
    }

    // --- Feedback Horizon Alignment ---
    let feedbackHorizonDelta = 0;
    if (!feedbackHorizon.isNotClear) {
      const fhVal = feedbackHorizon.value;
      if (fhVal >= 8) {
        if (slug.includes('athlete') || slug.includes('actor') || slug.includes('trader') || slug.includes('surgeon') ||
            slug.includes('chef') || slug.includes('pilot')) feedbackHorizonDelta += 15;
      } else if (fhVal >= 6) {
        if (category === 'Technology & Engineering' || category === 'Business & Management' || slug.includes('forward-deployed') ||
            slug.includes('ai-product-manager') || slug.includes('brand-manager')) feedbackHorizonDelta += 12;
      } else if (fhVal <= 3) {
        if (slug.includes('railways') || slug.includes('psu') || slug.includes('renewable') || slug.includes('smart-buildings') ||
            category === 'Engineering & Built Environment') feedbackHorizonDelta += 16;
      }
    }

    // --- Core Life Driver Alignment ---
    let coreLifeDriverDelta = 0;
    if (!coreLifeDriver.isNotClear) {
      const cldVal = coreLifeDriver.value;
      if (cldVal >= 9) {
        if (slug.includes('railways') || slug.includes('psu') || slug.includes('upsc') || slug.includes('armed-forces')) coreLifeDriverDelta += 22;
      } else if (cldVal >= 7) {
        if (slug.includes('brand-manager') || slug.includes('founder') || slug.includes('ai-product-manager') || slug.includes('forward-deployed') ||
            category === 'Technology & Engineering' || category === 'Finance & Banking' || category === 'Business & Management') coreLifeDriverDelta += 16;
      } else if (cldVal >= 5) {
        if (slug.includes('actor') || slug.includes('model') || slug.includes('athlete') || category === 'Creative & Media') coreLifeDriverDelta += 20;
      } else if (cldVal <= 4) {
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' ||
            slug.includes('renewable') || slug.includes('medical-tech') || slug.includes('smart-buildings') || slug.includes('climate')) coreLifeDriverDelta += 18;
      }
    }

    // --- Leadership Scope Alignment ---
    let leadershipScopeDelta = 0;
    if (!leadership.isNotClear) {
      const lsVal = leadership.value;
      if (lsVal >= 8) {
        if (slug.includes('railways') || slug.includes('psu') || slug.includes('upsc') || slug.includes('director') || slug.includes('ceo')) leadershipScopeDelta += 15;
      } else if (lsVal >= 6) {
        if (category === 'Business & Management' || slug.includes('ai-product-manager') || slug.includes('product-manager') || slug.includes('brand-manager')) leadershipScopeDelta += 14;
      } else if (lsVal <= 3) {
        if (slug.includes('developer') || slug.includes('engineer') || slug.includes('controls-engineer') || slug.includes('actor')) leadershipScopeDelta += 10;
      }
    }

    // --- Non-Negotiables Alignment ---
    let nonNegotiablesDelta = 0;
    const fulfilledNonNegotiables: string[] = [];

    if (nonNegotiables.length > 0) {
      const wlbVal = career.workLifeBalance || 7;
      const pressureVal = career.workPressure || 7;
      const remoteOppVal = career.remoteOpportunities || 5;
      const seniorMaxVal = career.seniorSalaryMax || 200;

      if (nonNegotiables.some((n) => n.includes('Health') || n.includes('Fitness'))) {
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
      if (nonNegotiables.some((n) => n.includes('Scheduled') || n.includes('Predictable Hours'))) {
        if (wlbVal >= 7 && pressureVal <= 6) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('predictable scheduled hours');
        } else if (slug.includes('surgeon') || slug.includes('forward-deployed') || slug.includes('investment-banker')) {
          nonNegotiablesDelta -= 30;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Earning Potential') || n.includes('High Earning') || n.includes('Money'))) {
        if (seniorMaxVal >= 250) {
          nonNegotiablesDelta += 22;
          fulfilledNonNegotiables.push('top-tier compensation upside');
        } else if (seniorMaxVal >= 190) {
          nonNegotiablesDelta += 10;
        } else if (seniorMaxVal <= 130) {
          nonNegotiablesDelta -= 25;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Family') || n.includes('Personal Time'))) {
        if (wlbVal >= 7 && pressureVal <= 6) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('family & personal time');
        } else if (slug.includes('pilot') || slug.includes('forward-deployed') || pressureVal >= 9 || wlbVal <= 4) {
          nonNegotiablesDelta -= 30;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Remote') || n.includes('Location Freedom'))) {
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
      if (nonNegotiables.some((n) => n.includes('Job Security') || n.includes('Stability'))) {
        if (category === 'Medicine & Healthcare' || category === 'Law & Government' || (career.careerStability || 7) >= 8) {
          nonNegotiablesDelta += 16;
          fulfilledNonNegotiables.push('strong career stability');
        } else if (slug.includes('founder') || slug.includes('trader')) {
          nonNegotiablesDelta -= 22;
        }
      }
      if (nonNegotiables.some((n) => n.includes('Ethical') || n.includes('Social Impact'))) {
        if (category === 'Medicine & Healthcare' || category === 'Education & Research' || slug.includes('renewable') || slug.includes('smart-buildings')) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('ethical social impact');
        }
      }
      if (nonNegotiables.some((n) => n.includes('Creative Freedom') || n.includes('Autonomy'))) {
        if (category === 'Creative & Media' || slug.includes('founder') || slug.includes('product') || slug.includes('ai-builder')) {
          nonNegotiablesDelta += 15;
          fulfilledNonNegotiables.push('creative problem-solving autonomy');
        }
      }
      if (nonNegotiables.some((n) => n.includes('Low Stress') || n.includes('Calm'))) {
        if (wlbVal >= 7 && pressureVal <= 5) {
          nonNegotiablesDelta += 18;
          fulfilledNonNegotiables.push('calm workplace culture');
        } else if (pressureVal >= 8 || wlbVal <= 4) {
          nonNegotiablesDelta -= 26;
        }
      }
    }

    // --- Component: Technical vs. Practical Balance Alignment (Q11) ---
    let techPracticalDelta = 0;
    if (!techPractical.isNotClear) {
      let careerTP = 5; // Default balanced
      
      if (slug === 'industrial-automation-controls-engineer') careerTP = 6; // 60% Tech, 40% Practical
      else if (slug === 'forward-deployed-ai-robotics-engineer') careerTP = 7; // 70% Tech, 30% Practical
      else if (slug === 'forward-deployed-engineer') careerTP = 7; // 70% Tech, 30% Practical
      else if (slug === 'renewable-energy-project-developer') careerTP = 6; // 60% Tech, 40% Practical
      else if (slug === 'medical-technology-application-specialist') careerTP = 6; // 60% Tech, 40% Practical
      else if (slug === 'smart-buildings-energy-automation-consultant') careerTP = 6; // 60% Tech, 40% Practical
      else if (slug === 'ai-product-manager' || slug === 'product-manager') careerTP = 7; // 70% Tech, 30% Practical
      else if (category === 'Technology & Engineering') {
        if (slug.includes('hardware') || slug.includes('vlsi') || slug.includes('robotics') || slug.includes('embedded')) careerTP = 7;
        else careerTP = 9; // 100% Technical pure software / algorithms / cloud
      } else if (category === 'Engineering & Built Environment') {
        careerTP = 6;
      } else if (category === 'Medicine & Healthcare') {
        if (slug.includes('surgeon') || slug.includes('nurse') || slug.includes('dentist') || slug.includes('paramedic')) careerTP = 3;
        else if (slug.includes('specialist') || slug.includes('biomedical')) careerTP = 6;
        else careerTP = 5;
      } else if (category === 'Aviation & Maritime Operations' || category === 'Sports & Fitness' || category === 'Hospitality & Food') {
        careerTP = 2; // Predominantly hands-on/practical
      } else if (category === 'Finance & Banking') {
        careerTP = 8;
      } else if (category === 'Creative & Media') {
        if (slug.includes('animator') || slug.includes('video-editor') || slug.includes('sound-designer')) careerTP = 7;
        else careerTP = 3;
      } else if (category === 'Law & Government') {
        careerTP = 5;
      }

      const tpDiff = Math.abs(techPractical.value - careerTP);
      if (tpDiff <= 1) {
        techPracticalDelta = 16;
      } else if (tpDiff <= 2.5) {
        techPracticalDelta = 8;
      } else if (tpDiff >= 5) {
        techPracticalDelta = -14;
      }
    }

    const weightedComposite =
      domainScore * 0.35 +
      aptitudeScore * 0.30 +
      workModeScore * 0.15 +
      salaryScore * 0.10 +
      skillRatio * 100 * 0.10;

    // --- Career Sub-specialization Differentiator ---
    let subSpecDelta = 0;
    if (category === 'Technology & Engineering') {
      const hasMath = userSkills.some((s) => s.includes('mathematics') || s.includes('statistics'));
      const hasAlgorithms = userSkills.some((s) => s.includes('algorithm'));
      const hasWeb = userSkills.some((s) => s.includes('web development') || s.includes('app design'));
      const hasElectronics = userSkills.some((s) => s.includes('electrical') || s.includes('wiring') || s.includes('electronics'));
      const hasSales = userSkills.some((s) => s.includes('sales') || s.includes('negotiation') || s.includes('client'));
      const hasProjectPlanning = userSkills.some((s) => s.includes('project planning') || s.includes('leadership'));

      if ((slug === 'data-scientist' || slug === 'data-scientist-data-engineer') && hasMath && hasAlgorithms) subSpecDelta += 24;
      if (slug === 'technical-program-manager' && hasProjectPlanning) subSpecDelta += 24;
      if (slug === 'full-stack-developer' && hasWeb) subSpecDelta += 24;
      if (slug === 'senior-software-developer' && hasAlgorithms) subSpecDelta += 22;
      if (slug === 'vlsi-physical-design-engineer' && hasElectronics) subSpecDelta += 24;

      // New 7 Roles Sub-Specializations in Technology & Engineering:
      if (slug === 'industrial-automation-controls-engineer') {
        const hasAutomation = userSkills.some((s) => s.includes('plc') || s.includes('automation') || s.includes('scada') || s.includes('control') || s.includes('industrial'));
        const hasElec = userSkills.some((s) => s.includes('electronics') || s.includes('circuits') || s.includes('electrical'));
        const hasMech = userSkills.some((s) => s.includes('cad') || s.includes('mechanical') || s.includes('machinery'));
        if (hasAutomation) subSpecDelta += 30;
        else if (hasElec || hasMech) subSpecDelta += 18;
        if (!techPractical.isNotClear && (techPractical.value >= 5 && techPractical.value <= 7)) subSpecDelta += 12;
      }
      if (slug === 'forward-deployed-ai-robotics-engineer') {
        const hasRobotics = userSkills.some((s) => s.includes('robotics') || s.includes('ros') || s.includes('automation') || s.includes('electronics'));
        const hasCode = userSkills.some((s) => s.includes('code') || s.includes('software') || s.includes('programming') || s.includes('algorithm'));
        if (hasRobotics && hasCode) subSpecDelta += 32;
        else if (hasRobotics || hasCode) subSpecDelta += 18;
        if (!techPractical.isNotClear && (techPractical.value >= 6 && techPractical.value <= 8)) subSpecDelta += 12;
      }
      if (slug === 'forward-deployed-engineer') {
        const hasFDE = userSkills.some((s) => s.includes('enterprise client') || s.includes('technical integration') || s.includes('customer engineering'));
        const hasCode = userSkills.some((s) => s.includes('code') || s.includes('software') || s.includes('programming') || s.includes('sql') || s.includes('data analysis'));
        if (hasFDE) subSpecDelta += 30;
        else if (hasCode && hasSales) subSpecDelta += 26;
        else if (hasCode) subSpecDelta += 18;
        if (!techPractical.isNotClear && (techPractical.value >= 6 && techPractical.value <= 8)) subSpecDelta += 12;
      }
    }

    if (category === 'Engineering & Built Environment') {
      if (slug === 'renewable-energy-project-developer') {
        const hasCleanEnergy = userSkills.some((s) => s.includes('clean energy') || s.includes('solar') || s.includes('wind') || s.includes('environmental'));
        const hasEng = userSkills.some((s) => s.includes('cad') || s.includes('mechanical') || s.includes('civil') || s.includes('finance') || s.includes('budgeting'));
        if (hasCleanEnergy) subSpecDelta += 30;
        else if (hasEng) subSpecDelta += 18;
        if (preferredIndustries.some((i) => i.toLowerCase().includes('renewable') || i.toLowerCase().includes('clean') || i.toLowerCase().includes('sustainability'))) subSpecDelta += 24;
        if (!techPractical.isNotClear && (techPractical.value >= 5 && techPractical.value <= 7)) subSpecDelta += 10;
      }
      if (slug === 'smart-buildings-energy-automation-consultant') {
        const hasSmartBuildings = userSkills.some((s) => s.includes('smart buildings') || s.includes('building automation') || s.includes('bas') || s.includes('bms') || s.includes('hvac'));
        const hasAutomation = userSkills.some((s) => s.includes('plc') || s.includes('automation') || s.includes('electronics') || s.includes('electrical'));
        if (hasSmartBuildings) subSpecDelta += 30;
        else if (hasAutomation) subSpecDelta += 18;
        if (preferredIndustries.some((i) => i.toLowerCase().includes('smart buildings') || i.toLowerCase().includes('building automation') || i.toLowerCase().includes('energy management'))) subSpecDelta += 24;
        if (!techPractical.isNotClear && (techPractical.value >= 5 && techPractical.value <= 7)) subSpecDelta += 10;
      }
    }

    if (category === 'Medicine & Healthcare') {
      if (slug === 'medical-technology-application-specialist') {
        const hasMedTech = userSkills.some((s) => s.includes('medical device') || s.includes('biomedical') || s.includes('hospital'));
        const hasBio = userSkills.some((s) => s.includes('biology') || s.includes('anatomy') || s.includes('patient') || s.includes('medical') || s.includes('healthcare'));
        if (hasMedTech) subSpecDelta += 30;
        else if (hasBio) subSpecDelta += 18;
        if (preferredIndustries.some((i) => i.toLowerCase().includes('medical technology') || i.toLowerCase().includes('devices') || i.toLowerCase().includes('healthcare tech'))) subSpecDelta += 24;
        if (!techPractical.isNotClear && (techPractical.value >= 4 && techPractical.value <= 7)) subSpecDelta += 12;
      }
    }

    if (category === 'Business & Management') {
      if (slug === 'ai-product-manager') {
        const hasPM = userSkills.some((s) => s.includes('product management') || s.includes('roadmapping') || s.includes('user experience') || s.includes('agile'));
        const hasTech = userSkills.some((s) => s.includes('code') || s.includes('software') || s.includes('programming') || s.includes('data analysis'));
        if (hasPM) subSpecDelta += 30;
        else if (hasTech) subSpecDelta += 20;
        if (preferredIndustries.some((i) => i.toLowerCase().includes('product management') || i.toLowerCase().includes('technology strategy') || i.toLowerCase().includes('software'))) subSpecDelta += 22;
        if (!techPractical.isNotClear && (techPractical.value >= 6 && techPractical.value <= 8)) subSpecDelta += 10;
      }
      if (slug === 'brand-manager' && userSkills.some((s) => s.includes('brand strategy') || s.includes('marketing') || s.includes('advertising'))) subSpecDelta += 24;
      if (slug === 'management-consultant' && userSkills.some((s) => s.includes('finance') || s.includes('project planning'))) subSpecDelta += 20;
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
      techPracticalDelta +
      subSpecDelta;

    // Tailored, Explainable whyMatch Rationale
    let whyMatch = `Strong overall match based on your domain preferences for ${category.toLowerCase()} and strategic career goals.`;
    if (fulfilledNonNegotiables.length > 0) {
      const topFulfilled = fulfilledNonNegotiables.slice(0, 2).join(' and ');
      whyMatch = `Protects your non-negotiables (${topFulfilled}) while aligning with your ${category.toLowerCase()} aptitudes.`;
    } else if (slug === 'industrial-automation-controls-engineer') {
      whyMatch = 'Combines your passion for automated control systems, PLC programming, robotics, and smart manufacturing operations.';
    } else if (slug === 'forward-deployed-ai-robotics-engineer') {
      whyMatch = 'Directly aligns with your desire to deploy cutting-edge AI perception and physical robotics directly at high-impact client sites.';
    } else if (slug === 'renewable-energy-project-developer') {
      whyMatch = 'Channels your dedication to clean energy infrastructure, sustainability, and large-scale renewable project development.';
    } else if (slug === 'medical-technology-application-specialist') {
      whyMatch = 'Harmonizes your interest in advanced medical devices, surgical technology, and clinical healthcare partnership.';
    } else if (slug === 'smart-buildings-energy-automation-consultant') {
      whyMatch = 'Bridges your enthusiasm for building automation, energy efficiency, IoT sensor systems, and sustainable architecture.';
    } else if (slug === 'ai-product-manager') {
      whyMatch = 'Empowers your product vision, technical strategy, and leadership to shape transformative AI applications people love.';
    } else if (slug === 'forward-deployed-engineer') {
      whyMatch = 'Leverages your full-stack engineering chops, client problem-solving skills, and mission-driven deployment impact.';
    } else if (slug === 'brand-manager') {
      whyMatch = 'Harmonizes with your creative brand vision, consumer marketing acumen, and commercial leadership strengths.';
    } else if (slug === 'fashion-commercial-model') {
      whyMatch = 'Matches your physical presence, visual aesthetic intuition, and excitement for high-visibility fashion and media.';
    } else if (slug === 'film-artist-actor') {
      whyMatch = 'Directly reflects your passion for dramatic screen performance, emotional embodiment, and cinematic storytelling.';
    } else if (slug === 'indian-psu-officer') {
      whyMatch = 'Channels your dedication to national energy and industrial engineering within India\'s prestigious Maharatna/Navratna public sector.';
    } else if (slug === 'indian-railways-officer') {
      whyMatch = 'Aligns with your commitment to sovereign governance, large-scale transportation logistics, and commanding Indian Railways infrastructure.';
    } else if (category === 'Medicine & Healthcare' && (!helping.isNotClear || userSkills.some((s) => s.includes('biology')))) {
      whyMatch = 'Directly harmonizes with your calling for direct human care, medical diagnostics, and personal patient impact.';
    } else if (category === 'Technology & Engineering' && (!tech.isNotClear || userSkills.some((s) => s.includes('code')))) {
      whyMatch = 'Directly leverages your appetite for deep software systems, technological problem solving, and modern digital platforms.';
    } else if (category === 'Engineering & Built Environment') {
      whyMatch = 'Leverages your mathematical and spatial abilities to leave an enduring physical mark through structural design and infrastructure.';
    } else if (category === 'Business & Management' && !leadership.isNotClear) {
      whyMatch = 'Empowers your executive communication, team leadership, cross-functional diplomacy, and commercial execution.';
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
      compatibilityScore: 85,
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

  const top10 = scored.slice(0, 10).map((item, idx) => {
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
