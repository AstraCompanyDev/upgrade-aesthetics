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

/* ---------- Time log detail (work diary) ---------- */

import shotCode from "@/assets/shot-code.jpg";
import shotAds from "@/assets/shot-ads.jpg";
import shotDesign from "@/assets/shot-design.jpg";

export type WorkSession = {
  id: string;
  dayIndex: number;
  start: string;
  end: string;
  hours: number;
  memo: string;
  activity: string;
  screenshot: string;
  keystrokes: number;
  clicks: number;
};

const contractMeta: Record<
  string,
  { screenshot: string; activity: string; memos: string[] }
> = {
  "dev-ops-raj": {
    screenshot: shotCode,
    activity: "Infra & deploys",
    memos: [
      "Fixing staging deploy pipeline",
      "Reviewing container logs and alerts",
      "Rotating secrets, patching CI runner",
      "Cache layer tuning on API gateway",
    ],
  },
  "expert-media-buyer": {
    screenshot: shotAds,
    activity: "Ad campaign setup",
    memos: [
      "Building new campaign structure",
      "Creative testing + audience split",
      "Daily budget pacing review",
      "Reporting dashboard for week",
    ],
  },
  "design-system": {
    screenshot: shotDesign,
    activity: "Design system",
    memos: [
      "Component audit and token cleanup",
      "Building new table + toast variants",
      "Documenting spacing scale",
      "Design QA pass on dashboard",
    ],
  },
};

function fallbackMeta(contractId: string) {
  return (
    contractMeta[contractId] ?? {
      screenshot: shotCode,
      activity: "General work",
      memos: ["Working on assigned tasks"],
    }
  );
}

function addMinutes(base: number, minutes: number) {
  const total = base + minutes;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Deterministically splits each day's logged hours into work-diary sessions. */
export function contractSessions(entry: HourlyEntry): WorkSession[] {
  const meta = fallbackMeta(entry.contractId);
  const sessions: WorkSession[] = [];
  entry.days.forEach((hours, dayIndex) => {
    if (!hours) return;
    let remaining = Math.round(hours * 60);
    let cursor = 9 * 60;
    let block = 0;
    while (remaining > 0) {
      const length = Math.min(remaining, 150);
      const memo = meta.memos[(dayIndex + block) % meta.memos.length]!;
      sessions.push({
        id: `${entry.contractId}-${dayIndex}-${block}`,
        dayIndex,
        start: addMinutes(cursor, 0),
        end: addMinutes(cursor, length),
        hours: length / 60,
        memo,
        activity: meta.activity,
        screenshot: meta.screenshot,
        keystrokes: 400 + ((length * 13 + dayIndex * 37) % 900),
        clicks: 60 + ((length * 7 + block * 19) % 240),
      });
      cursor += length + 30;
      remaining -= length;
      block += 1;
    }
  });
  return sessions;
}

export function findHourly(contractId: string) {
  for (const week of spendWeeks) {
    const entry = week.hourly.find((h) => h.contractId === contractId);
    if (entry) return { week, entry };
  }
  return null;
}

export function hourlyWeeksFor(contractId: string) {
  return spendWeeks
    .map((week) => ({ week, entry: week.hourly.find((h) => h.contractId === contractId) }))
    .filter((r): r is { week: SpendWeek; entry: HourlyEntry } => Boolean(r.entry));
}

/* ---------- Fixed price payment detail ---------- */

export type PaymentEvent = { label: string; date: string; note: string; done: boolean };

export function findFixed(paymentId: string) {
  for (const week of spendWeeks) {
    const payment = week.fixed.find((f) => f.id === paymentId);
    if (payment) return { week, payment };
  }
  return null;
}

export function paymentTimeline(payment: FixedEntry): PaymentEvent[] {
  const released = payment.status === "Released";
  return [
    {
      label: "Milestone funded",
      date: payment.date,
      note: `${money(payment.amount)} moved into escrow`,
      done: true,
    },
    {
      label: "Work submitted",
      date: payment.date,
      note: `${payment.freelancer} submitted the deliverables for review`,
      done: payment.status !== "Pending approval",
    },
    {
      label: "Client approval",
      date: released ? payment.date : "Awaiting",
      note: released ? "You approved the submitted work" : "Review the submission to release funds",
      done: released,
    },
    {
      label: "Payment released",
      date: released ? payment.date : "Pending",
      note: released
        ? `${money(payment.amount)} paid to ${payment.freelancer}`
        : `${money(payment.amount)} still held in escrow`,
      done: released,
    },
  ];
}
