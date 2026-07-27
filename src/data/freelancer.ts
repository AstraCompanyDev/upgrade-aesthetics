export type OpenJob = {
  id: string;
  title: string;
  client: string;
  clientInitials: string;
  budget: string;
  type: "Hourly" | "Fixed";
  level: "Entry" | "Intermediate" | "Expert";
  posted: string;
  proposals: number;
  category: string;
  location: string;
  verified: boolean;
  summary: string;
  skills: string[];
};

export const openJobs: OpenJob[] = [
  {
    id: "react-dashboard-revamp",
    title: "React dashboard revamp for a fintech product",
    client: "Northwind Labs",
    clientInitials: "NL",
    budget: "$45 – $70 / hr",
    type: "Hourly",
    level: "Expert",
    posted: "2 hours ago",
    proposals: 6,
    category: "Development",
    location: "United States",
    verified: true,
    summary:
      "We need a senior frontend engineer to rebuild our analytics dashboard in React with a clean component library and solid accessibility.",
    skills: ["React", "TypeScript", "Tailwind", "Charts"],
  },
  {
    id: "brand-site-webflow",
    title: "Marketing site build in Webflow for a B2B SaaS",
    client: "Halo Systems",
    clientInitials: "HS",
    budget: "$2,400 fixed",
    type: "Fixed",
    level: "Intermediate",
    posted: "5 hours ago",
    proposals: 14,
    category: "Web Design",
    location: "United Kingdom",
    verified: true,
    summary:
      "Five-page marketing site from an existing Figma file. Needs CMS blog, responsive breakpoints and basic on-page SEO.",
    skills: ["Webflow", "Figma", "SEO", "CMS"],
  },
  {
    id: "aws-cost-audit",
    title: "AWS infrastructure cost audit and cleanup",
    client: "Bluefin Media",
    clientInitials: "BM",
    budget: "$60 – $95 / hr",
    type: "Hourly",
    level: "Expert",
    posted: "1 day ago",
    proposals: 9,
    category: "Cloud & DevOps",
    location: "Canada",
    verified: false,
    summary:
      "Audit our AWS footprint, right-size instances, tidy up unused resources and document a plan to cut monthly spend by 30%.",
    skills: ["AWS", "Terraform", "FinOps", "Docker"],
  },
  {
    id: "mobile-app-ui-kit",
    title: "Design a mobile app UI kit for a wellness startup",
    client: "Calmly",
    clientInitials: "CA",
    budget: "$1,800 fixed",
    type: "Fixed",
    level: "Intermediate",
    posted: "2 days ago",
    proposals: 21,
    category: "Design",
    location: "Australia",
    verified: true,
    summary:
      "Create a reusable UI kit covering onboarding, home, tracking and settings screens, delivered as a Figma library.",
    skills: ["Figma", "Mobile UI", "Design systems"],
  },
  {
    id: "content-lifecycle-emails",
    title: "Lifecycle email copywriting for an e-commerce brand",
    client: "Fern & Oak",
    clientInitials: "FO",
    budget: "$35 – $50 / hr",
    type: "Hourly",
    level: "Intermediate",
    posted: "3 days ago",
    proposals: 11,
    category: "Marketing",
    location: "Germany",
    verified: true,
    summary:
      "Write a 9-email welcome and win-back sequence with subject line variants for A/B testing in Klaviyo.",
    skills: ["Copywriting", "Klaviyo", "CRO"],
  },
  {
    id: "shopify-headless",
    title: "Headless Shopify storefront with Next.js",
    client: "Roam Supply",
    clientInitials: "RS",
    budget: "$5,000 fixed",
    type: "Fixed",
    level: "Expert",
    posted: "4 days ago",
    proposals: 8,
    category: "Development",
    location: "United States",
    verified: true,
    summary:
      "Migrate an existing Shopify theme to a headless storefront with fast PDPs, cart drawer and Stripe checkout hand-off.",
    skills: ["Next.js", "Shopify", "GraphQL", "Stripe"],
  },
];

export const jobCategories = [
  "All work",
  "Development",
  "Design",
  "Web Design",
  "Cloud & DevOps",
  "Marketing",
];

export function getOpenJob(id: string) {
  return openJobs.find((job) => job.id === id);
}

export type Contract = {
  id: string;
  title: string;
  client: string;
  rate: string;
  status: "Active" | "Ending soon" | "Paused";
  hoursThisWeek: number;
  weeklyLimit: number;
};

export const contracts: Contract[] = [
  {
    id: "c-1",
    title: "Design system maintenance",
    client: "Northwind Labs",
    rate: "$65 / hr",
    status: "Active",
    hoursThisWeek: 18,
    weeklyLimit: 30,
  },
  {
    id: "c-2",
    title: "Landing page sprint",
    client: "Halo Systems",
    rate: "$1,200 fixed",
    status: "Ending soon",
    hoursThisWeek: 6,
    weeklyLimit: 10,
  },
  {
    id: "c-3",
    title: "Component library audit",
    client: "Bluefin Media",
    rate: "$55 / hr",
    status: "Paused",
    hoursThisWeek: 0,
    weeklyLimit: 15,
  },
];

export type Proposal = {
  id: string;
  title: string;
  client: string;
  submitted: string;
  status: "Viewed" | "Submitted" | "Interviewing" | "Declined";
  bid: string;
};

export const proposals: Proposal[] = [
  {
    id: "p-1",
    title: "React dashboard revamp for a fintech product",
    client: "Northwind Labs",
    submitted: "2 days ago",
    status: "Interviewing",
    bid: "$62 / hr",
  },
  {
    id: "p-2",
    title: "Headless Shopify storefront with Next.js",
    client: "Roam Supply",
    submitted: "4 days ago",
    status: "Viewed",
    bid: "$4,800 fixed",
  },
  {
    id: "p-3",
    title: "Design a mobile app UI kit",
    client: "Calmly",
    submitted: "1 week ago",
    status: "Submitted",
    bid: "$1,750 fixed",
  },
];
