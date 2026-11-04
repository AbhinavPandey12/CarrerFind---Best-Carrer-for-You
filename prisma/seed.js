const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { allCareers } = require('./data');
const videosData = require('./data/videosData');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CareerFind platform database with comprehensive career encyclopedia...');

  // 1. Clear existing data
  await prisma.platformReport.deleteMany({});
  await prisma.bookmarkedVideo.deleteMany({});
  await prisma.savedCareer.deleteMany({});
  await prisma.jobShadowBooking.deleteMany({});
  await prisma.availabilitySlot.deleteMany({});
  await prisma.mentorProfile.deleteMany({});
  await prisma.studentProfile.deleteMany({});
  await prisma.assessmentResult.deleteMany({});
  await prisma.video.deleteMany({});
  await prisma.career.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);

  // 2. Create Admin and Student Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@careerfind.com',
      passwordHash,
      name: 'Sarah Miller',
      role: 'ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      headline: 'Platform Director & Head of Trust & Safety',
      bio: 'Overseeing education partnerships, mentor credential verification, and student career outcomes at CareerFind.',
      location: 'San Francisco, CA',
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      email: 'alex.chen@university.edu',
      passwordHash,
      name: 'Alex Chen',
      role: 'STUDENT',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      headline: 'Undergraduate Student & Career Explorer',
      bio: 'Exploring frontier careers across artificial intelligence, aviation, medicine, and corporate strategy before committing to a post-grad track.',
      location: 'Berkeley, CA',
      studentProfile: {
        create: {
          academicLevel: 'Undergraduate',
          majorOrField: 'Computer Science & Cognitive Science',
          targetGraduationYear: 2026,
          skillsPossessed: JSON.stringify(['Python', 'Data Structures', 'React', 'Problem Solving', 'Linear Algebra']),
          preferredWorkMode: 'Hybrid',
          preferredLocations: 'San Francisco, Seattle, New York, London',
          interests: JSON.stringify(['Artificial Intelligence & Deep Tech', 'Commercial Aviation & Aerospace', 'Clinical Medicine & Surgery', 'Enterprise Software']),
        },
      },
    },
  });

  // 3. Create Diverse Verified Industry Mentors
  const mentorsData = [
    {
      email: 'priya.sharma@deepmind.com',
      name: 'Dr. Priya Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      headline: 'Staff AI/ML Research Engineer @ Google DeepMind',
      bio: 'PhD from CMU. 8+ years building frontier multimodal architectures and alignment systems. Passionate about guiding aspiring engineers from underrepresented backgrounds.',
      location: 'London, UK / Remote',
      profile: {
        company: 'Google DeepMind',
        title: 'Staff AI/ML Research Engineer',
        industry: 'Artificial Intelligence & Deep Tech',
        experienceYears: 8,
        linkedInUrl: 'https://linkedin.com/in/priyasharma-ai',
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationNotes: 'Verified via corporate domain email and academic publication citations.',
        aboutDayInLife: 'My day begins at 9:00 AM analyzing overnight distributed training runs on TPU clusters. At 10:30 AM, our cross-functional research group reviews ablation metrics. Afternoon is heads-down time for PyTorch architecture exploration, paper reading, and mentoring junior engineers on our tensor parallelism stack.',
        offersVirtual: true,
        offersInPerson: true,
        inPersonLocation: 'Google Kings Cross Campus, London',
        sessionDurationMin: 45,
        maxStudentsPerSession: 2,
        isPaid: false,
        priceAmount: 0,
        prerequisites: 'Foundational understanding of Python and calculus or linear algebra. Bring 3 thoughtful questions on production ML.',
        rating: 4.95,
        reviewsCount: 28,
      },
    },
    {
      email: 'marcus.vance@palantir.com',
      name: 'Marcus Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      headline: 'Lead Forward Deployed Engineer (FDE) @ Palantir Technologies',
      bio: 'Bridging frontline client problem spaces with mission-critical software engineering. Deployed across defense logistics, aviation supply chains, and hospital triage systems.',
      location: 'New York, NY',
      profile: {
        company: 'Palantir Technologies',
        title: 'Lead Forward Deployed Engineer (FDE)',
        industry: 'Enterprise Software & High-Impact Tech',
        experienceYears: 6,
        linkedInUrl: 'https://linkedin.com/in/marcus-vance-fde',
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationNotes: 'Verified through corporate credentials and engineering portfolio.',
        aboutDayInLife: 'FDE is 50% hardcore distributed systems engineering and 50% high-stakes strategic consulting. I spend mornings in white-glove code pairing with defense and healthcare clients on streaming data pipelines. After lunch, I write TypeScript/Java plugins and refine ontology models that solve urgent operational bottlenecks in real time.',
        offersVirtual: true,
        offersInPerson: false,
        sessionDurationMin: 60,
        maxStudentsPerSession: 1,
        isPaid: false,
        priceAmount: 0,
        prerequisites: 'Familiarity with full-stack concepts, databases, and a desire to see how tech interfaces with real-world enterprise operations.',
        rating: 4.9,
        reviewsCount: 19,
      },
    },
    {
      email: 'catherine.brooks@hopkinsmedicine.org',
      name: 'Dr. Catherine Brooks, MD',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
      headline: 'Attending Trauma Surgeon & Associate Professor @ Johns Hopkins Medicine',
      bio: 'FACS board-certified surgeon with 12+ years in acute care surgery, robotic laparoscopy, and clinical medical education. Mentoring aspiring physicians and surgeons.',
      location: 'Baltimore, MD',
      profile: {
        company: 'Johns Hopkins Medicine',
        title: 'Attending Trauma Surgeon',
        industry: 'Medicine & Healthcare',
        experienceYears: 12,
        linkedInUrl: 'https://linkedin.com/in/catherine-brooks-md',
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationNotes: 'Verified via state medical board license and hospital credentials.',
        aboutDayInLife: 'Morning operating room cases from 7:30 AM to 1:00 PM performing laparoscopic procedures. Afternoons include surgical ICU rounds, evaluating pre-operative clinical consults, and running trauma simulation labs with residents.',
        offersVirtual: true,
        offersInPerson: true,
        inPersonLocation: 'Johns Hopkins Hospital, Surgical Pavilion, Baltimore',
        sessionDurationMin: 45,
        maxStudentsPerSession: 1,
        isPaid: false,
        priceAmount: 0,
        prerequisites: 'Passion for medicine or surgery. Willingness to observe clinical case reviews and discuss medical residency training.',
        rating: 5.0,
        reviewsCount: 31,
      },
    },
    {
      email: 'vikram.malhotra@skywings.com',
      name: 'Capt. Vikram Malhotra',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      headline: 'Senior Boeing 777/787 Captain & Line Check Airman',
      bio: '18+ years flying commercial long-haul international flights across 6 continents. Over 14,000 flight hours. Passionate about aviation safety and flight crew mentoring.',
      location: 'Dubai / London',
      profile: {
        company: 'International Airways',
        title: 'Senior Airline Captain (B777/B787)',
        industry: 'Aviation & Maritime Operations',
        experienceYears: 18,
        linkedInUrl: 'https://linkedin.com/in/capt-vikram-malhotra',
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationNotes: 'Verified through ICAO/FAA Airline Transport Pilot License and carrier employment.',
        aboutDayInLife: 'Pre-flight dispatch briefing covering oceanic winds and turbulence radar, cockpit setup and FMS programming, line operations at 37,000 feet, and debriefing flight simulator check rides.',
        offersVirtual: true,
        offersInPerson: true,
        inPersonLocation: 'Flight Training Flight Simulator Center, Heathrow',
        sessionDurationMin: 60,
        maxStudentsPerSession: 2,
        isPaid: false,
        priceAmount: 0,
        prerequisites: 'Enthusiasm for aviation, aerodynamics, or commercial piloting. Bring questions on flight training and flight deck operations.',
        rating: 4.96,
        reviewsCount: 22,
      },
    },
    {
      email: 'rajeshwar.sen@senassociates.law',
      name: 'Adv. Rajeshwar Sen',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      headline: 'Senior Advocate & Managing Partner @ Sen & Partners Legal',
      bio: '20+ years arguing before High Courts and the Supreme Court in corporate disputes, constitutional law, and cross-border arbitration. Alumnus of NLSIU & Oxford BCL.',
      location: 'New Delhi / London',
      profile: {
        company: 'Sen & Partners Legal',
        title: 'Senior Advocate & Managing Partner',
        industry: 'Law & Government',
        experienceYears: 20,
        linkedInUrl: 'https://linkedin.com/in/rajeshwar-sen-law',
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationNotes: 'Verified via Bar Council senior enrollment and reported court judgments.',
        aboutDayInLife: 'Court hearings from 10:30 AM to 4:00 PM advocating motions, cross-examining expert witnesses, followed by evening chamber conferences with clients and junior associates preparing case briefs.',
        offersVirtual: true,
        offersInPerson: true,
        inPersonLocation: 'Supreme Court Lawyers Chambers, New Delhi',
        sessionDurationMin: 45,
        maxStudentsPerSession: 2,
        isPaid: false,
        priceAmount: 0,
        prerequisites: 'Interest in law, constitutional justice, or corporate litigation. Read one landmark legal case prior to the session.',
        rating: 4.92,
        reviewsCount: 17,
      },
    },
    {
      email: 'julian.reynolds@gs.com',
      name: 'Julian Reynolds',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      headline: 'Managing Director & Head of Tech M&A @ Goldman Sachs',
      bio: '14+ years on Wall Street advising enterprise software and cloud leaders on multi-billion dollar mergers, hostile acquisitions, and IPOs. Wharton MBA.',
      location: 'New York, NY',
      profile: {
        company: 'Goldman Sachs',
        title: 'Managing Director, M&A',
        industry: 'Finance & Capital Markets',
        experienceYears: 14,
        linkedInUrl: 'https://linkedin.com/in/julian-reynolds-banking',
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationNotes: 'Verified via corporate executive verification tier.',
        aboutDayInLife: 'Structuring complex acquisition terms, meeting corporate CFOs, reviewing discounted cash flow valuation decks, and negotiating transaction milestones under intense market timing.',
        offersVirtual: true,
        offersInPerson: false,
        sessionDurationMin: 45,
        maxStudentsPerSession: 2,
        isPaid: false,
        priceAmount: 0,
        prerequisites: 'Familiarity with financial statements and curiosity about investment banking deal structures.',
        rating: 4.89,
        reviewsCount: 26,
      },
    },
    {
      email: 'tariq.mansoor@nexteraenergy.com',
      name: 'Tariq Mansoor, PE',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      headline: 'Lead Renewable Energy & Grid Interconnect Engineer',
      bio: 'Licensed Professional Engineer (PE). Designed and commissioned over 2.4 GW of utility-scale solar, wind farms, and battery energy storage facilities across North America.',
      location: 'Austin, TX',
      profile: {
        company: 'NextEra Energy',
        title: 'Lead Renewable Grid Engineer',
        industry: 'CleanTech & Energy Transition',
        experienceYears: 9,
        linkedInUrl: 'https://linkedin.com/in/tariq-mansoor-energy',
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationNotes: 'PE license verified and certified utility filings confirmed.',
        aboutDayInLife: 'Balancing CAD line diagrams with PSCAD electromagnetic transient modeling and field visits to sub-station test installations.',
        offersVirtual: true,
        offersInPerson: true,
        inPersonLocation: 'Austin Energy Innovation Center, Austin TX',
        sessionDurationMin: 60,
        maxStudentsPerSession: 2,
        isPaid: false,
        priceAmount: 0,
        prerequisites: 'Interest in electrical power systems, sustainability, or clean tech.',
        rating: 4.97,
        reviewsCount: 14,
      },
    },
    {
      email: 'marcus.chef@atelier.com',
      name: 'Chef Jean-Luc Dubois',
      avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
      headline: 'Executive Chef & Culinary Director (Two Michelin Stars)',
      bio: 'Trained in Paris and Lyon. 16+ years directing world-class gastronomy kitchens, mentoring rising line cooks, and championing sustainable farm-to-table cuisine.',
      location: 'New York, NY / Paris',
      profile: {
        company: 'Atelier Dubois Gastronomy',
        title: 'Executive Chef & Restaurateur',
        industry: 'Hospitality & Food',
        experienceYears: 16,
        linkedInUrl: 'https://linkedin.com/in/jeanluc-dubois-chef',
        verificationStatus: 'APPROVED',
        isVerified: true,
        verificationNotes: 'Verified through Michelin Guide accreditation and restaurant ownership.',
        aboutDayInLife: 'Morning farm market inspections, tasting menu recipe experimentation, kitchen brigade prep supervision, and expediting a 140-cover dinner service at the pass.',
        offersVirtual: true,
        offersInPerson: true,
        inPersonLocation: 'Atelier Dubois Kitchen, Tribeca, New York',
        sessionDurationMin: 60,
        maxStudentsPerSession: 1,
        isPaid: false,
        priceAmount: 0,
        prerequisites: 'Genuine passion for culinary arts, gastronomy, or restaurant entrepreneurship.',
        rating: 5.0,
        reviewsCount: 18,
      },
    },
  ];

  const createdMentors = [];
  for (const m of mentorsData) {
    const user = await prisma.user.create({
      data: {
        email: m.email,
        passwordHash,
        name: m.name,
        role: 'MENTOR',
        avatarUrl: m.avatarUrl,
        headline: m.headline,
        bio: m.bio,
        location: m.location,
        mentorProfile: {
          create: m.profile,
        },
      },
      include: { mentorProfile: true },
    });
    createdMentors.push(user);
  }

  // 4. Create Availability Slots for Mentors
  for (const mentor of createdMentors) {
    if (!mentor.mentorProfile) continue;
    await prisma.availabilitySlot.createMany({
      data: [
        {
          mentorProfileId: mentor.mentorProfile.id,
          date: '2026-11-15',
          startTime: '14:00',
          endTime: '14:45',
          mode: 'VIRTUAL',
          isBooked: false,
        },
        {
          mentorProfileId: mentor.mentorProfile.id,
          date: '2026-11-18',
          startTime: '16:00',
          endTime: '16:45',
          mode: 'VIRTUAL',
          isBooked: false,
        },
        {
          mentorProfileId: mentor.mentorProfile.id,
          date: '2026-11-22',
          startTime: '10:00',
          endTime: '11:00',
          mode: mentor.mentorProfile.offersInPerson ? 'IN_PERSON' : 'VIRTUAL',
          isBooked: false,
        },
      ],
    });
  }

  // 5. Create a sample upcoming booking for Alex Chen
  const priyaMentor = createdMentors[0];
  if (priyaMentor && priyaMentor.mentorProfile) {
    const bookedSlot = await prisma.availabilitySlot.create({
      data: {
        mentorProfileId: priyaMentor.mentorProfile.id,
        date: '2026-11-12',
        startTime: '15:00',
        endTime: '15:45',
        mode: 'VIRTUAL',
        isBooked: true,
      },
    });

    await prisma.jobShadowBooking.create({
      data: {
        studentId: studentUser.id,
        mentorProfileId: priyaMentor.mentorProfile.id,
        slotId: bookedSlot.id,
        sessionDate: '2026-11-12',
        sessionTime: '15:00 - 15:45',
        sessionMode: 'VIRTUAL',
        meetingUrl: 'https://meet.google.com/cfs-deepmind-shadow',
        studentIntroduction: 'Hi Dr. Sharma! I am an undergraduate student exploring AI engineering and model evaluation. I would love to observe how research engineers at DeepMind evaluate distributed training runs.',
        status: 'APPROVED',
      },
    });
  }

  // 6. Seed All 74 Comprehensive Careers
  console.log(`Seeding ${allCareers.length} full-profile careers...`);
  for (const c of allCareers) {
    await prisma.career.create({ data: c });
  }

  // 7. Seed Curated Day-in-the-Life Videos
  console.log(`Seeding ${videosData.length} curated Day in the Life videos...`);
  for (const v of videosData) {
    await prisma.video.create({ data: v });
  }

  // 8. Seed Sample Assessment Result for Alex Chen
  await prisma.assessmentResult.create({
    data: {
      userId: studentUser.id,
      archetypeTitle: 'The Frontier Systems Architect',
      archetypeSubtitle: 'You excel at deep technical mastery, thrive on solving complex multi-layered puzzles, and seek high-leverage careers at the cutting edge of software and intelligence.',
      answersSnapshot: JSON.stringify({
        technicalOrientation: 8,
        workMode: 'hybrid',
        workLifeBalanceTolerance: 6,
        salaryPriority: 8,
        mathAnalyticalAptitude: 8,
        creativeDesignAptitude: 5,
        leadershipPeopleAptitude: 6,
        ambiguityTolerance: 7,
        peopleLeadershipOrientation: 6,
        helpingAndHumanImpact: 4,
        creativeExpressionDesign: 5,
        physicalDexterityTacticalCraft: 6,
        governanceLawPublicService: 4,
      }),
      recommendedCareers: JSON.stringify([
        {
          careerSlug: 'ai-ml-engineer',
          score: 96,
          whyMatch: 'Your passion for deep algorithmic problem solving and strong mathematical foundation align seamlessly with AI engineering.',
          possessedSkills: ['Python', 'Linear Algebra', 'Problem Solving'],
          missingSkills: ['PyTorch / JAX', 'CUDA / GPU Compute', 'vLLM / Triton'],
        },
        {
          careerSlug: 'software-development-engineer',
          score: 94,
          whyMatch: 'Your core software foundations and curiosity about distributed systems make SDE an ideal high-growth path.',
          possessedSkills: ['Data Structures', 'Python', 'React'],
          missingSkills: ['Go / C++ / Rust', 'Kubernetes', 'System Design'],
        },
        {
          careerSlug: 'forward-deployed-engineer',
          score: 91,
          whyMatch: 'You combine strong software craftsmanship with curiosity about how high-impact client systems operate in the real world.',
          possessedSkills: ['React', 'Data Structures', 'Python'],
          missingSkills: ['Distributed Systems', 'Enterprise Ontologies', 'Executive Presence'],
        },
        {
          careerSlug: 'physical-ai-engineer',
          score: 89,
          whyMatch: 'Your interest in cognitive science and systems makes embodied robotics and spatial AI a natural high-growth exploration.',
          possessedSkills: ['Python', 'Linear Algebra'],
          missingSkills: ['C++', 'ROS2', 'Physics Simulation (Isaac Sim)'],
        },
      ]),
    },
  });

  // 9. Seed Saved Careers & Bookmarked Videos for Alex Chen
  await prisma.savedCareer.create({
    data: {
      userId: studentUser.id,
      careerSlug: 'ai-ml-engineer',
    },
  });
  await prisma.savedCareer.create({
    data: {
      userId: studentUser.id,
      careerSlug: 'airline-pilot',
    },
  });

  const firstVideo = await prisma.video.findFirst();
  if (firstVideo) {
    await prisma.bookmarkedVideo.create({
      data: {
        userId: studentUser.id,
        videoId: firstVideo.id,
      },
    });
  }

  console.log('✅ Seeding completed successfully with all professions and curated assets!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
