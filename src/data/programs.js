// Official Up Skills Hub program structure and fees.
// Source: "Program Structure and Fees for Up Skills Hub" document.
// All amounts are in RWF. Registration fee is paid once; program fee is per month.

export const REGISTRATION_FEE = 5000;

// Online learning or self-coaching flat rate, per month, for any course.
export const ONLINE_MONTHLY_FEE = 100000;

export const courses = [
  {
    slug: "cybersecurity-ethical-hacking",
    name: "Cybersecurity & Ethical Hacking",
    description:
      "Learn to protect systems and networks — penetration testing, threat analysis, and ethical hacking tools used by security professionals.",
    durationMonths: 3,
    monthlyFee: 100000,
    category: "IT & Security",
  },
  {
    slug: "frontend-development",
    name: "Frontend Development",
    description:
      "Build modern, responsive websites and web apps with HTML, CSS, JavaScript, and React.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Software Development",
  },
  {
    slug: "backend-development",
    name: "Backend Development",
    description:
      "Create servers, APIs, and databases — the engine behind every application.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Software Development",
  },
  {
    slug: "python-with-programming",
    name: "Python with Programming",
    description:
      "Master programming fundamentals with Python — from basics to automation and real projects.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Software Development",
  },
  {
    slug: "web-design",
    name: "Web Design",
    description:
      "Design clean, attractive websites with strong layouts, colors, and user experience.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Design",
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    description:
      "Train models that learn from data — prediction, classification, and practical ML workflows.",
    durationMonths: 3,
    monthlyFee: 80000,
    category: "AI & Data",
  },
  {
    slug: "ai-engineer",
    name: "AI Engineer",
    description:
      "Build and deploy AI-powered applications using modern tools and large language models.",
    durationMonths: 3,
    monthlyFee: 80000,
    category: "AI & Data",
  },
  {
    slug: "mobile-development",
    name: "Mobile Development",
    description:
      "Build mobile apps for Android and iOS and publish them to real users.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "Software Development",
  },
  {
    slug: "digital-marketing-seo-wordpress",
    name: "Digital Marketing & SEO with WordPress",
    description:
      "Grow businesses online — SEO, social media, content marketing, and WordPress websites.",
    durationMonths: 2,
    monthlyFee: 100000,
    category: "Marketing",
  },
  {
    slug: "copy-writing",
    name: "Copy Writing",
    description:
      "Write words that sell — ads, websites, emails, and content that converts readers into customers.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Marketing",
  },
  {
    slug: "multimedia-videography",
    name: "Multimedia and Videography",
    description:
      "Shoot and edit professional video and multimedia content for brands and events.",
    durationMonths: 2,
    monthlyFee: 100000,
    category: "Media",
  },
  {
    slug: "microsoft-office",
    name: "Microsoft Office",
    description:
      "Work confidently with Word, Excel, PowerPoint, and the tools every office relies on.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Office Skills",
  },
  {
    slug: "graphic-design-ui-ux",
    name: "Graphic Design & UI/UX Design",
    description:
      "Design beautiful, user-friendly products and brand visuals using Figma and proven design principles.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Design",
  },
  {
    slug: "power-bi-data-analysis",
    name: "Power BI & Data Analysis",
    description:
      "Turn raw data into insights and dashboards decision-makers actually use.",
    durationMonths: 3,
    monthlyFee: 70000,
    category: "AI & Data",
  },
  {
    slug: "project-management",
    name: "Project Management",
    description:
      "Plan, run, and deliver projects on time — methods, tools, and team leadership.",
    durationMonths: 2,
    monthlyFee: 70000,
    category: "Business",
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
