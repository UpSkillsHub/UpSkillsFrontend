// Official Up Skills Hub program structure and fees.
// Source: "Program Structure and Fees for Up Skills Hub" document.
// All amounts are in RWF. Registration fee is paid once; program fee is per month.

export const REGISTRATION_FEE = 5000;

// Online learning or self-coaching flat rate, per month, for any course.
export const ONLINE_MONTHLY_FEE = 100000;

// Shared schedule shown on every course's details.
export const courseSchedule = [
  "New cohorts start every month, so you can enroll anytime.",
  "On-site: weekday sessions at our Kigali campus (KG 173 Street, Remera).",
  "Online: flexible, self-paced learning with weekly mentor check-ins.",
];

export const courses = [
  {
    slug: "cybersecurity-ethical-hacking",
    name: "Cybersecurity & Ethical Hacking",
    description:
      "Learn to protect systems and networks through penetration testing, threat analysis, and the ethical hacking tools used by security professionals.",
    durationMonths: 3,
    monthlyFee: 100000,
    category: "IT & Security",
    skills: [
      "Network security fundamentals",
      "Penetration testing",
      "Vulnerability assessment",
      "Ethical hacking tools",
      "Threat analysis and reporting",
      "Security best practices",
    ],
    requirements: [
      "Basic computer literacy",
      "A laptop is recommended",
      "Curiosity about how systems work",
    ],
  },
  {
    slug: "frontend-development",
    name: "Frontend Development",
    description:
      "Build modern, responsive websites and web apps with HTML, CSS, JavaScript, and React.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Software Development",
    skills: [
      "HTML5 and CSS3",
      "Modern JavaScript",
      "React",
      "Responsive design",
      "Tailwind CSS",
      "Git and GitHub",
    ],
    requirements: ["Basic computer literacy", "A laptop is recommended"],
  },
  {
    slug: "backend-development",
    name: "Backend Development",
    description:
      "Create the servers, APIs, and databases that power every modern application.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Software Development",
    skills: [
      "Node.js and Express",
      "REST API design",
      "Databases (MySQL)",
      "Authentication and security",
      "Deployment",
      "Git workflows",
    ],
    requirements: [
      "Basic computer literacy",
      "A laptop is recommended",
      "Some programming basics are helpful",
    ],
  },
  {
    slug: "python-with-programming",
    name: "Python with Programming",
    description:
      "Master programming fundamentals with Python, from the basics all the way to automation and real projects.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Software Development",
    skills: [
      "Python fundamentals",
      "Data structures",
      "Object-oriented programming",
      "Automation scripts",
      "Working with files and APIs",
      "Debugging and testing",
    ],
    requirements: ["Basic computer literacy", "A laptop is recommended", "No prior coding needed"],
  },
  {
    slug: "web-design",
    name: "Web Design",
    description:
      "Design clean, attractive websites with strong layouts, colors, and user experience.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Design",
    skills: [
      "Layout and composition",
      "Figma",
      "HTML and CSS basics",
      "Responsive design",
      "Color and typography",
      "Prototyping",
    ],
    requirements: ["Basic computer literacy", "A laptop is recommended", "An eye for detail"],
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    description:
      "Train models that learn from data, covering prediction, classification, and practical machine learning workflows.",
    durationMonths: 3,
    monthlyFee: 80000,
    category: "AI & Data",
    skills: [
      "Python for machine learning",
      "Data preprocessing",
      "Supervised learning",
      "Model evaluation",
      "scikit-learn",
      "Real-world ML projects",
    ],
    requirements: [
      "Basic computer literacy",
      "A laptop is recommended",
      "Python basics are helpful (covered early in the course)",
    ],
  },
  {
    slug: "ai-engineer",
    name: "AI Engineer",
    description:
      "Build and deploy AI-powered applications using modern tools and large language models.",
    durationMonths: 3,
    monthlyFee: 80000,
    category: "AI & Data",
    skills: [
      "Large language models",
      "Prompt engineering",
      "Building AI-powered apps",
      "Working with AI model APIs",
      "Python",
      "Deploying AI applications",
    ],
    requirements: [
      "Basic computer literacy",
      "A laptop is recommended",
      "Programming basics are helpful",
    ],
  },
  {
    slug: "mobile-development",
    name: "Mobile Development",
    description:
      "Build mobile apps for Android and iOS and publish them to real users.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Software Development",
    skills: [
      "Cross-platform app development",
      "Mobile UI design",
      "State management",
      "Connecting apps to APIs",
      "Testing",
      "Publishing to app stores",
    ],
    requirements: [
      "Basic computer literacy",
      "A laptop is recommended",
      "Programming basics are helpful",
    ],
  },
  {
    slug: "digital-marketing-seo-wordpress",
    name: "Digital Marketing & SEO with WordPress",
    description:
      "Grow businesses online with SEO, social media, content marketing, and WordPress websites.",
    durationMonths: 2,
    monthlyFee: 100000,
    category: "Marketing",
    skills: [
      "Search engine optimization (SEO)",
      "Content marketing",
      "Social media strategy",
      "Building WordPress websites",
      "Web analytics",
      "Campaign management",
    ],
    requirements: ["Basic computer literacy", "A laptop is recommended"],
  },
  {
    slug: "copy-writing",
    name: "Copy Writing",
    description:
      "Learn to write words that sell: ads, websites, emails, and content that converts readers into customers.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Marketing",
    skills: [
      "Persuasive writing",
      "Ad copy",
      "Email marketing",
      "Landing page copy",
      "Brand voice",
      "Editing and proofreading",
    ],
    requirements: ["Good written English", "Basic computer literacy"],
  },
  {
    slug: "multimedia-videography",
    name: "Multimedia and Videography",
    description:
      "Shoot and edit professional video and multimedia content for brands and events.",
    durationMonths: 2,
    monthlyFee: 100000,
    category: "Media",
    skills: [
      "Camera operation",
      "Video editing",
      "Lighting and sound",
      "Visual storytelling",
      "Motion graphics basics",
      "Publishing content",
    ],
    requirements: ["Basic computer literacy", "A laptop is recommended"],
  },
  {
    slug: "microsoft-office",
    name: "Microsoft Office",
    description:
      "Work confidently with Word, Excel, PowerPoint, and the tools every office relies on.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Office Skills",
    skills: [
      "Microsoft Word",
      "Excel formulas and charts",
      "PowerPoint presentations",
      "Email and calendar tools",
      "File management",
      "Office productivity workflows",
    ],
    requirements: ["Basic computer literacy", "No prior experience needed"],
  },
  {
    slug: "graphic-design-ui-ux",
    name: "Graphic Design & UI/UX Design",
    description:
      "Design beautiful, user-friendly products and brand visuals using Figma and proven design principles.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Design",
    skills: [
      "Figma",
      "UI design",
      "UX principles",
      "Brand identity",
      "Logo and poster design",
      "Building a design portfolio",
    ],
    requirements: ["Basic computer literacy", "A laptop is recommended", "An eye for detail"],
  },
  {
    slug: "power-bi-data-analysis",
    name: "Power BI & Data Analysis",
    description:
      "Turn raw data into insights and dashboards decision-makers actually use.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Business",
    skills: [
      "Excel for analysis",
      "Power BI dashboards",
      "Data modeling",
      "DAX basics",
      "Data visualization",
      "Reporting insights",
    ],
    requirements: ["Basic computer literacy", "A laptop is recommended"],
  },
  {
    slug: "project-management",
    name: "Project Management",
    description:
      "Plan, run, and deliver projects on time using proven methods, tools, and team leadership skills.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Business",
    skills: [
      "Project planning",
      "Agile and Scrum basics",
      "Budgeting",
      "Risk management",
      "Team leadership",
      "Progress reporting",
    ],
    requirements: ["Basic computer literacy", "No prior experience needed"],
  },
];

// Academic internship program (fees from the official structure).
export const internshipPrograms = [
  {
    slug: "internship-secondary",
    name: "For Secondary Students in IT Trade",
    duration: "Based on recommendation letter",
    registrationFee: REGISTRATION_FEE,
    programFee: 0,
    mentorshipCertificateFee: 25000,
  },
  {
    slug: "internship-university",
    name: "For University Students in IT Fields",
    duration: "Based on recommendation letter",
    registrationFee: REGISTRATION_FEE,
    programFee: 0,
    mentorshipCertificateFee: 35000,
  },
];

export const whoCanApply = ["University students", "Secondary school students"];

export const eligibility = [
  "Information Technology (IT)",
  "Software Engineering",
  "Business Information Technology (BIT)",
  "Computer Science",
  "Other computer-related subjects or trades",
  "Faculty of Information Technology",
  "Faculty of Business Administration",
  "Faculty of Education",
];

export const feeNotes = [
  "All courses are available both on-site and online.",
  "If you choose online learning or self-coaching, the program fee is 100,000 RWF per month.",
  "Upon successful completion, trainees receive a recognized certificate.",
];
