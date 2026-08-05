// Options for the trainee / intern registration form.
// Mirrors the official Up Skills Hub registration form.

export const AFRICAN_COUNTRIES = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon",
  "Cape Verde", "Central African Republic", "Chad", "Comoros", "Congo Brazzaville",
  "Cote d'Ivoire", "Democratic Republic of Congo", "Djibouti", "Egypt",
  "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
  "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi",
  "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger",
  "Nigeria", "Rwanda", "Sao Tome & Principe", "Senegal", "Seychelles",
  "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland",
  "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe", "Other",
];

export const PROGRAM_OPTIONS = [
  "Cybersecurity & Ethical Hacking",
  "Frontend Development",
  "Backend Development",
  "Mobile App Development",
  "Python Programming",
  "Digital Marketing",
  "Graphic Design",
  "Microsoft Office",
  "Power BI & Data Analysis",
  "Project Management",
  "AI Engineer",
  "Machine Learning",
  "Full-Stack Development Program",
  "Academic Internship",
];

export const STUDY_LEVELS = ["Secondary", "University", "Graduate", "Other"];

export const LEARNING_MODES = [
  { value: "Onsite", label: "On-site", note: "Remera, KG 173 Street" },
  { value: "Online", label: "Online", note: "Self-coaching from anywhere" },
];

export const HEARD_FROM = ["WhatsApp", "Instagram / Facebook", "Flyer", "Website", "Ads", "A friend"];

export const GENDERS = ["Male", "Female"];

// Registration fee in both currencies.
export const FEES = {
  RWF: { amount: 5000, label: "5,000 RWF" },
  USD: { amount: 5, label: "5 USD" },
};

export const PAYMENT_METHODS = [
  {
    value: "mobile-money",
    label: "Mobile Money",
    note: "MTN / Airtel",
    detail: "Mobile Money: 1329338 (Name: UP SKILLS HUB)",
    currencies: ["RWF"],
  },
  {
    value: "card",
    label: "Credit / Debit Card",
    note: "Visa, Mastercard",
    detail: "You will receive secure card payment instructions by email.",
    currencies: ["RWF", "USD"],
  },
];

export const AGREEMENT_TEXT =
  "I confirm that the information I provided is correct and understand that my registration will be confirmed after payment. I understand that both a registration fee and a program fee are required to complete this application, and that these fees are non-refundable, even if I later change my mind. I acknowledge that my payment serves as confirmation of my commitment to participate in the selected program at Up Skills Hub.";
