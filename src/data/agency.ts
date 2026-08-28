export type AgencyMember = {
  id: string;
  name: string;
  role: string;
  initials: string;
  utilization: number;
  rate: string;
  activeContracts: number;
  status: "Available" | "Fully booked" | "On leave";
};

export const agencyMembers: AgencyMember[] = [
  {
    id: "m-1",
    name: "Amelia R.",
    role: "Senior Frontend Developer",
    initials: "AR",
    utilization: 82,
    rate: "$65 / hr",
    activeContracts: 2,
    status: "Fully booked",
  },
  {
    id: "m-2",
    name: "Timofiy R.",
    role: "Product Designer",
    initials: "TR",
    utilization: 54,
    rate: "$52 / hr",
    activeContracts: 1,
    status: "Available",
  },
  {
    id: "m-3",
    name: "Oleg K.",
    role: "DevOps Engineer",
    initials: "OK",
    utilization: 71,
    rate: "$78 / hr",
    activeContracts: 2,
    status: "Available",
  },
  {
    id: "m-4",
    name: "Sylvester D.",
    role: "Motion & Video Editor",
    initials: "SD",
    utilization: 18,
    rate: "$44 / hr",
    activeContracts: 0,
    status: "On leave",
  },
];

export type AgencyContract = {
  id: string;
  title: string;
  client: string;
  assignee: string;
  rate: string;
  status: "Active" | "Ending soon" | "Awaiting feedback";
  hoursThisWeek: number;
  weeklyLimit: number;
  billed: string;
};

export const agencyContracts: AgencyContract[] = [
  {
    id: "ac-1",
    title: "Design system maintenance",
    client: "Northwind Labs",
    assignee: "Amelia R.",
    rate: "$65 / hr",
    status: "Active",
    hoursThisWeek: 18,
    weeklyLimit: 30,
    billed: "$12,480",
  },
  {
    id: "ac-2",
    title: "Cloud cost optimisation retainer",
    client: "Bluefin Media",
    assignee: "Oleg K.",
    rate: "$78 / hr",
    status: "Active",
    hoursThisWeek: 22,
    weeklyLimit: 35,
    billed: "$18,930",
  },
  {
    id: "ac-3",
    title: "Mobile app UI kit",
    client: "Calmly",
    assignee: "Timofiy R.",
    rate: "$1,800 fixed",
    status: "Awaiting feedback",
    hoursThisWeek: 6,
    weeklyLimit: 12,
    billed: "$1,800",
  },
  {
    id: "ac-4",
    title: "Landing page sprint",
    client: "Halo Systems",
    assignee: "Amelia R.",
    rate: "$1,200 fixed",
    status: "Ending soon",
    hoursThisWeek: 4,
    weeklyLimit: 10,
    billed: "$1,200",
  },
];

export type AgencyProposal = {
  id: string;
  title: string;
  client: string;
  assignee: string;
  bid: string;
  submitted: string;
  status: "Submitted" | "Viewed" | "Interviewing" | "Declined";
};

export const agencyProposals: AgencyProposal[] = [
  {
    id: "ap-1",
    title: "Headless Shopify storefront with Next.js",
    client: "Roam Supply",
    assignee: "Amelia R.",
    bid: "$4,800 fixed",
    submitted: "2 days ago",
    status: "Interviewing",
  },
  {
    id: "ap-2",
    title: "AWS infrastructure cost audit and cleanup",
    client: "Bluefin Media",
    assignee: "Oleg K.",
    bid: "$88 / hr",
    submitted: "3 days ago",
    status: "Viewed",
  },
  {
    id: "ap-3",
    title: "Marketing site build in Webflow for a B2B SaaS",
    client: "Halo Systems",
    assignee: "Timofiy R.",
    bid: "$2,300 fixed",
    submitted: "5 days ago",
    status: "Submitted",
  },
  {
    id: "ap-4",
    title: "Lifecycle email copywriting",
    client: "Fern & Oak",
    assignee: "Sylvester D.",
    bid: "$46 / hr",
    submitted: "1 week ago",
    status: "Declined",
  },
];

export const agencyStats = [
  { label: "Agency balance", value: "$9,480", hint: "Ready to withdraw" },
  { label: "Billed this month", value: "$21,650", hint: "+24% vs last month" },
  { label: "Active contracts", value: "4", hint: "Across 3 members" },
  { label: "Team utilization", value: "61%", hint: "Target 75%" },
];

export const agencyMonthly = [
  { month: "Feb", value: 38 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 62 },
  { month: "May", value: 71 },
  { month: "Jun", value: 84 },
  { month: "Jul", value: 96 },
];

export const agencyTransactions = [
  {
    id: "at-1",
    label: "Hourly invoice week 34 — Bluefin Media",
    member: "Oleg K.",
    date: "Aug 24",
    amount: "+$1,716.00",
    positive: true,
  },
  {
    id: "at-2",
    label: "Milestone released — Mobile app UI kit",
    member: "Timofiy R.",
    date: "Aug 21",
    amount: "+$1,800.00",
    positive: true,
  },
  {
    id: "at-3",
    label: "Withdrawal to agency account ••••2210",
    member: "Bank transfer",
    date: "Aug 18",
    amount: "-$6,000.00",
    positive: false,
  },
  {
    id: "at-4",
    label: "Hourly invoice week 33 — Northwind Labs",
    member: "Amelia R.",
    date: "Aug 17",
    amount: "+$1,170.00",
    positive: true,
  },
  {
    id: "at-5",
    label: "Agency service fee",
    member: "ZeeWork",
    date: "Aug 17",
    amount: "-$268.60",
    positive: false,
  },
];
