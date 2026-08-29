export type EarningBucket = {
  id: "in-progress" | "in-review" | "processing" | "available";
  label: string;
  amount: number;
  note: string;
};

export const earningBuckets: EarningBucket[] = [
  { id: "in-progress", label: "Work In Progress", amount: 0, note: "Hours logged this week, not yet submitted" },
  { id: "in-review", label: "Work In Review", amount: 7.5, note: "Awaiting client approval" },
  { id: "processing", label: "Processing", amount: 18.9, note: "Approved, clearing to your balance" },
  { id: "available", label: "Available Funds", amount: 3240, note: "Ready to withdraw" },
];

export type BucketRow = {
  date: string;
  contract: string;
  client: string;
  type: "Hourly" | "Fixed Job";
  hours: number;
  amount: number;
};

export const bucketRows: Record<EarningBucket["id"], BucketRow[]> = {
  "in-progress": [],
  "in-review": [
    { date: "Aug 28, 2026", contract: "Design system maintenance", client: "HypoMatrix.Inc", type: "Hourly", hours: 0.5, amount: 7.5 },
  ],
  processing: [
    { date: "Aug 29, 2026", contract: "New system design review & consultation.", client: "CoFoundersLab", type: "Fixed Job", hours: 0, amount: 18.9 },
  ],
  available: [
    { date: "Aug 24, 2026", contract: "Milestone released — Landing page sprint", client: "Halo Systems", type: "Fixed Job", hours: 0, amount: 1200 },
    { date: "Aug 18, 2026", contract: "Hourly invoice week 33", client: "Bluefin Media", type: "Hourly", hours: 24, amount: 2040 },
  ],
};

export const generalStats = [
  { label: "Applications Sent", value: "12" },
  { label: "Invitations Received", value: "2" },
  { label: "Jobs Completed", value: "18" },
  { label: "Total Hours Worked", value: "482.5" },
  { label: "Gross Earnings", value: "$74,310.70" },
];

export type WorkSheetRow = {
  id: string;
  contract: string;
  client: string;
  rate: number;
  days: number[]; // Mon..Sun
};

export const workSheet: WorkSheetRow[] = [
  { id: "ws-1", contract: "Head of Development — CoFoundersLab", client: "CoFoundersLab", rate: 8, days: [0, 0, 0, 0, 0, 0, 0] },
  { id: "ws-2", contract: "Design system maintenance", client: "Northwind Labs", rate: 65, days: [4, 3.5, 5, 2, 3.5, 0, 0] },
  { id: "ws-3", contract: "Component library audit", client: "Bluefin Media", rate: 55, days: [0, 2, 1.5, 2.5, 0, 0, 0] },
];

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type Transaction = {
  id: string;
  label: string;
  client: string;
  date: string;
  amount: number;
  kind: "Earning" | "Withdrawal" | "Fee" | "Refund";
};

export const transactions: Transaction[] = [
  { id: "t1", label: "Milestone released — Design system maintenance", client: "Northwind Labs", date: "Aug 24, 2026", amount: 1950, kind: "Earning" },
  { id: "t2", label: "Withdrawal to bank ••••4417", client: "Bank transfer", date: "Aug 18, 2026", amount: -2500, kind: "Withdrawal" },
  { id: "t3", label: "Hourly invoice week 33", client: "Bluefin Media", date: "Aug 14, 2026", amount: 1320, kind: "Earning" },
  { id: "t4", label: "Service fee", client: "ZeeWork", date: "Aug 14, 2026", amount: -132, kind: "Fee" },
  { id: "t5", label: "Milestone released — Landing page sprint", client: "Halo Systems", date: "Aug 06, 2026", amount: 1200, kind: "Earning" },
  { id: "t6", label: "Withdrawal to PayPal — amelia@studio.co", client: "PayPal", date: "Jul 31, 2026", amount: -1800, kind: "Withdrawal" },
  { id: "t7", label: "Bonus — fast delivery", client: "Roam Supply", date: "Jul 28, 2026", amount: 250, kind: "Earning" },
  { id: "t8", label: "Refund adjustment", client: "Calmly", date: "Jul 20, 2026", amount: -75, kind: "Refund" },
  { id: "t9", label: "Hourly invoice week 29", client: "Northwind Labs", date: "Jul 17, 2026", amount: 1560, kind: "Earning" },
  { id: "t10", label: "Service fee", client: "ZeeWork", date: "Jul 17, 2026", amount: -156, kind: "Fee" },
];

export const monthlyEarnings = [
  { month: "Mar", gross: 6120, fees: 612, hours: 88 },
  { month: "Apr", gross: 4480, fees: 448, hours: 64 },
  { month: "May", gross: 7640, fees: 764, hours: 112 },
  { month: "Jun", gross: 6910, fees: 691, hours: 98 },
  { month: "Jul", gross: 9200, fees: 920, hours: 131 },
  { month: "Aug", gross: 5820, fees: 582, hours: 79 },
];

export const clientBreakdown = [
  { client: "Northwind Labs", amount: 24800, contracts: 3 },
  { client: "Bluefin Media", amount: 18240, contracts: 2 },
  { client: "Halo Systems", amount: 12600, contracts: 4 },
  { client: "Roam Supply", amount: 9880, contracts: 1 },
  { client: "Calmly", amount: 8790, contracts: 2 },
];

export const money = (n: number) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
