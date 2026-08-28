export type HourlyEntry = {
  contractId: string;
  contract: string;
  freelancer: string;
  initials: string;
  rate: number;
  /** hours logged Mon → Sun, decimal hours */
  days: number[];
};

export type FixedEntry = {
  id: string;
  contract: string;
  freelancer: string;
  initials: string;
  milestone: string;
  date: string;
  amount: number;
  status: "Released" | "In escrow" | "Pending approval";
};

export type SpendWeek = {
  id: string;
  label: string;
  days: string[];
  hourly: HourlyEntry[];
  fixed: FixedEntry[];
  activities: { label: string; hours: number }[];
};

export const spendWeeks: SpendWeek[] = [
  {
    id: "2026-08-24",
    label: "Aug 24 – 30, 2026",
    days: ["8/24", "8/25", "8/26", "8/27", "8/28", "8/29", "8/30"],
    hourly: [
      {
        contractId: "dev-ops-raj",
        contract: "Dev Ops – Raj",
        freelancer: "Raj Beladiya",
        initials: "RB",
        rate: 15,
        days: [1.5, 1.33, 0, 0.5, 0, 0, 0],
      },
      {
        contractId: "expert-media-buyer",
        contract: "Expert Media Buyer",
        freelancer: "Joseph Olagunju",
        initials: "JO",
        rate: 10,
        days: [0, 10.33, 4.17, 0, 0, 0, 0],
      },
      {
        contractId: "design-system",
        contract: "Design system maintenance",
        freelancer: "Amelia Rowe",
        initials: "AR",
        rate: 48,
        days: [2, 3.5, 0, 4, 1.5, 0, 0],
      },
    ],
    fixed: [
      {
        id: "f1",
        contract: "Figma Designer For Website",
        freelancer: "Muhammad M.",
        initials: "MM",
        milestone: "Milestone 2 — Page designs",
        date: "Aug 27",
        amount: 350,
        status: "Released",
      },
      {
        id: "f2",
        contract: "Brand Refresh & Style Guide",
        freelancer: "Oluwafemi A.",
        initials: "OA",
        milestone: "Milestone 1 — Identity concepts",
        date: "Aug 25",
        amount: 600,
        status: "In escrow",
      },
    ],
    activities: [
      { label: "Frontend build", hours: 9.5 },
      { label: "Ad campaign setup", hours: 8.2 },
      { label: "Infra & deploys", hours: 3.3 },
      { label: "Design QA", hours: 2.4 },
    ],
  },
  {
    id: "2026-08-17",
    label: "Aug 17 – 23, 2026",
    days: ["8/17", "8/18", "8/19", "8/20", "8/21", "8/22", "8/23"],
    hourly: [
      {
        contractId: "dev-ops-raj",
        contract: "Dev Ops – Raj",
        freelancer: "Raj Beladiya",
        initials: "RB",
        rate: 15,
        days: [2, 2, 1.5, 0, 1, 0, 0],
      },
      {
        contractId: "design-system",
        contract: "Design system maintenance",
        freelancer: "Amelia Rowe",
        initials: "AR",
        rate: 48,
        days: [3, 3, 3, 2.5, 0, 0, 0],
      },
    ],
    fixed: [
      {
        id: "f3",
        contract: "Landing page sprint",
        freelancer: "Halo Systems",
        initials: "HS",
        milestone: "Final delivery",
        date: "Aug 21",
        amount: 1200,
        status: "Released",
      },
    ],
    activities: [
      { label: "Design system", hours: 11.5 },
      { label: "Infra & deploys", hours: 6.5 },
    ],
  },
  {
    id: "2026-08-10",
    label: "Aug 10 – 16, 2026",
    days: ["8/10", "8/11", "8/12", "8/13", "8/14", "8/15", "8/16"],
    hourly: [
      {
        contractId: "expert-media-buyer",
        contract: "Expert Media Buyer",
        freelancer: "Joseph Olagunju",
        initials: "JO",
        rate: 10,
        days: [4, 4, 4, 3, 2, 0, 0],
      },
    ],
    fixed: [],
    activities: [{ label: "Ad campaign setup", hours: 17 }],
  },
];

export function formatHours(h: number) {
  if (!h) return "—";
  const hours = Math.floor(h);
  const minutes = Math.round((h - hours) * 60);
  return `${hours}:${String(minutes).padStart(2, "0")}`;
}

export function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function weekTotals(week: SpendWeek) {
  const hourlyHours = week.hourly.reduce((s, c) => s + c.days.reduce((a, b) => a + b, 0), 0);
  const hourlyAmount = week.hourly.reduce(
    (s, c) => s + c.days.reduce((a, b) => a + b, 0) * c.rate,
    0,
  );
  const fixedAmount = week.fixed.reduce((s, f) => s + f.amount, 0);
  const escrow = week.fixed
    .filter((f) => f.status !== "Released")
    .reduce((s, f) => s + f.amount, 0);
  return { hourlyHours, hourlyAmount, fixedAmount, escrow, total: hourlyAmount + fixedAmount };
}

export function contractTotals(week: SpendWeek) {
  const hourly = week.hourly.map((c) => {
    const hours = c.days.reduce((a, b) => a + b, 0);
    return { label: `${c.contract} — $${c.rate}/hr`, hours, amount: hours * c.rate };
  });
  const fixed = week.fixed.map((f) => ({ label: f.contract, hours: 0, amount: f.amount }));
  return [...hourly, ...fixed].sort((a, b) => b.amount - a.amount).slice(0, 5);
}
