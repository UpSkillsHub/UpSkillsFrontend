// Shared testimonials store. Built-in trainee stories + any submitted via the
// footer "Share Your Story" modal (persisted in localStorage). Components can
// subscribe to re-render when a new story is added.

const STORAGE_KEY = "ush_testimonials";

export const defaultTestimonials = [
  { name: "Ardent Matabaro", role: "Frontend Developer", img: "/images/testimonials/ardent.jpg", text: "I joined Up Skills Hub with only basic HTML knowledge and left building full, responsive web apps in React. The real projects and my mentor's feedback made everything click, and within weeks of finishing I was hired as a junior frontend developer." },
  { name: "DonBéni Effata", role: "Backend Developer", img: "/images/testimonials/donbeni.jpg", text: "The backend track was hands-on from day one. I built real APIs, worked with databases, and learned how production systems actually fit together. The Talent Marketplace even connected me to my first paid client task." },
  { name: "Jean-Luc Matabaro", role: "Cybersecurity Analyst", img: "/images/testimonials/jeanluc.jpg", text: "The Cybersecurity & Ethical Hacking program was intense and practical. I learned to find vulnerabilities and defend real systems, not just theory. Today I work as a security analyst, and it all started right here." },
  { name: "Joseph Courbon", role: "Data Analyst", img: "/images/testimonials/joseph.jpg", text: "Power BI and data analysis felt intimidating until Up Skills Hub broke it down into real dashboards and real decisions. I now turn messy data into insights every day at work, and I owe that confidence to my trainers." },
  { name: "Rodruigue Shabani", role: "Mobile Developer", img: null, text: "I always wanted to build apps but never knew where to start. The mobile development track gave me real projects to ship, and the internship taught me to work to deadlines. I published my first app before I even graduated." },
  { name: "Guillain Bengehya", role: "Full-Stack Developer", img: null, text: "What sets Up Skills Hub apart is that you actually build things people use. The mentorship, the real tasks, the exposure on their website, it all made me job-ready. I went from student to full-stack developer faster than I imagined." },
  { name: "Ntare Bright", role: "Digital Marketing Specialist", img: "/images/testimonials/ntare.jpg", text: "The Digital Marketing & SEO track was practical from the first lesson. I built real WordPress sites, ran real campaigns, and learned to read analytics properly. I now lead marketing for a growing local business." },
  { name: "Aurora Dragnir", role: "UI/UX & Graphic Designer", img: "/images/testimonials/aurora.jpg", text: "I came in loving design but lacking direction. The graphic design program and real client briefs sharpened both my skills and my portfolio. The Talent Marketplace helped me land freelance work while I was still learning." },
  { name: "Uwase Leiss", role: "Project Coordinator", img: null, text: "The Business and Project Management course taught me how real teams plan and deliver. The internship put me in charge of actual tasks and deadlines, exactly the experience that got me my current project coordinator role." },
  { name: "Victor Jacker", role: "IT Support Specialist", img: null, text: "Up Skills Hub gave me both the technical skills and the professional habits employers look for. From Microsoft Office mastery to real IT support tasks, I walked into my first interview genuinely prepared and confident." },
];

const listeners = new Set();

function loadSubmitted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveSubmitted(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {
    /* storage full or unavailable — ignore */
  }
}

// Submitted stories appear first so a new submitter sees theirs right away.
export function getTestimonials() {
  return [...loadSubmitted(), ...defaultTestimonials];
}

export function addTestimonial({ name, role, text, img = null }) {
  const entry = { name: name?.trim(), role: role?.trim() || "Up Skills Hub Trainee", text: text?.trim(), img, id: Date.now() };
  const next = [entry, ...loadSubmitted()];
  saveSubmitted(next);
  listeners.forEach((cb) => cb());
  return entry;
}

export function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
