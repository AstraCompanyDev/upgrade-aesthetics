export type Job = {
  id: string;
  title: string;
  status: "Open" | "Draft" | "Closed";
  type: "Hourly" | "Fixed";
  rate: string;
  applicants: number;
  posted: string;
  skills: string[];
  description: string;
};

export const jobs: Job[] = [
  {
    id: "cfl-management-team",
    title: "CFL Management Team Position",
    status: "Open",
    type: "Hourly",
    rate: "$35–50 / hr",
    applicants: 4,
    posted: "8 months ago",
    skills: ["Operations", "Leadership", "Reporting"],
    description:
      "Lead a small operations pod, own weekly reporting and keep delivery on schedule across three client accounts.",
  },
  {
    id: "figma-designer-website",
    title: "Figma Designer For Website",
    status: "Open",
    type: "Fixed",
    rate: "$350",
    applicants: 6,
    posted: "1 year ago",
    skills: ["Figma", "UI Design", "Prototyping"],
    description:
      "Design a 6-page marketing site in Figma with a reusable component library and an interactive prototype.",
  },
  {
    id: "business-site-backend",
    title: "Business Site Backend Development",
    status: "Draft",
    type: "Hourly",
    rate: "$40–60 / hr",
    applicants: 0,
    posted: "over 1 year ago",
    skills: ["Node.js", "Postgres", "API"],
    description:
      "Build the API layer, auth and Postgres schema behind our new business website and admin panel.",
  },
  {
    id: "brand-refresh-style-guide",
    title: "Brand Refresh & Style Guide",
    status: "Closed",
    type: "Fixed",
    rate: "$1,200",
    applicants: 11,
    posted: "2 years ago",
    skills: ["Branding", "Illustration"],
    description:
      "Refresh our visual identity and deliver a style guide covering logo usage, colour, type and iconography.",
  },
];

export function getJob(id: string) {
  return jobs.find((j) => j.id === id);
}

export const statusStyles: Record<string, string> = {
  Open: "bg-primary-soft text-accent-foreground",
  Draft: "bg-muted text-muted-foreground",
  Closed: "bg-muted text-muted-foreground",
};

export type Applicant = {
  id: string;
  name: string;
  initials: string;
  role: string;
  rate: string;
  rating: number;
  location: string;
  status: "New" | "Shortlisted" | "Interviewing" | "Declined";
  pitch: string;
};


export const applicantsByJob: Record<string, Applicant[]> = {
  "cfl-management-team": [
    {
      id: "amelia-r",
      name: "Amelia R.",
      initials: "AR",
      role: "Operations Lead",
      rate: "$45 / hr",
      rating: 4.9,
      location: "Manchester, UK",
      status: "Shortlisted",
      pitch: "Ten years running delivery pods for agencies; I live in spreadsheets and standups.",
    },
    {
      id: "daniel-o",
      name: "Daniel O.",
      initials: "DO",
      role: "Project Manager",
      rate: "$38 / hr",
      rating: 4.7,
      location: "Lisbon, PT",
      status: "New",
      pitch: "PMP certified, comfortable owning weekly client reporting end to end.",
    },
    {
      id: "priya-n",
      name: "Priya N.",
      initials: "PN",
      role: "Delivery Manager",
      rate: "$50 / hr",
      rating: 5,
      location: "Bengaluru, IN",
      status: "Interviewing",
      pitch: "Scaled a 12-person ops team; strong on process design and hiring.",
    },
    {
      id: "marcus-t",
      name: "Marcus T.",
      initials: "MT",
      role: "Ops Generalist",
      rate: "$32 / hr",
      rating: 4.4,
      location: "Austin, US",
      status: "Declined",
      pitch: "Startup generalist, happy to jump between reporting and vendor management.",
    },
  ],
};

export const defaultApplicants: Applicant[] = [
  {
    id: "sofia-l",
      name: "Sofia L.",
    initials: "SL",
    role: "Product Designer",
    rate: "$40 / hr",
    rating: 4.8,
    location: "Barcelona, ES",
    status: "New",
    pitch: "Portfolio of SaaS dashboards; I can start this week and share progress daily.",
  },
  {
    id: "kwame-b",
      name: "Kwame B.",
    initials: "KB",
    role: "Full-stack Developer",
    rate: "$55 / hr",
    rating: 4.9,
    location: "Accra, GH",
    status: "Shortlisted",
    pitch: "Shipped 20+ client projects on Node and Postgres with clean handover docs.",
  },
  {
    id: "yuki-m",
      name: "Yuki M.",
    initials: "YM",
    role: "Brand Designer",
    rate: "$1,000 fixed",
    rating: 4.6,
    location: "Osaka, JP",
    status: "Interviewing",
    pitch: "Identity systems for small teams — logo, type scale and a practical style guide.",
  },
];

export function getApplicants(jobId: string) {
  return applicantsByJob[jobId] ?? defaultApplicants;
}

export function getApplicant(jobId: string, applicantId: string) {
  return getApplicants(jobId).find((a) => a.id === applicantId);
}
