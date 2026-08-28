import { spendWeeks, type FixedEntry } from "./spending";

export type ActiveContract = {
  id: string;
  /** where clicking the row goes */
  kind: "hourly" | "fixed";
  title: string;
  freelancer: string;
  initials: string;
  status: "Active" | "Awaiting feedback" | "Paused";
  started: string;
  rateLabel: string;
  /** total billed to date on this contract */
  spentToDate: number;
  hoursToDate: number;
  weeklyLimit?: number;
  hoursThisWeek?: number;
  nextAction: string;
  cta: string;
  unread: number;
};

const startedOn: Record<string, string> = {
  "dev-ops-raj": "Started Jul 14",
  "expert-media-buyer": "Started Aug 6",
  "design-system": "Started Jun 2",
};

const weeklyLimits: Record<string, number> = {
  "dev-ops-raj": 10,
  "expert-media-buyer": 20,
  "design-system": 15,
};

function hourlyContracts(): ActiveContract[] {
  const byId = new Map<string, ActiveContract>();

  spendWeeks.forEach((week, weekIndex) => {
    week.hourly.forEach((entry) => {
      const hours = entry.days.reduce((a, b) => a + b, 0);
      const existing = byId.get(entry.contractId);
      if (existing) {
        existing.spentToDate += hours * entry.rate;
        existing.hoursToDate += hours;
        return;
      }
      byId.set(entry.contractId, {
        id: entry.contractId,
        kind: "hourly",
        title: entry.contract,
        freelancer: entry.freelancer,
        initials: entry.initials,
        status: hours > 0 ? "Active" : "Paused",
        started: startedOn[entry.contractId] ?? "Started Aug 1",
        rateLabel: `$${entry.rate}/hr`,
        spentToDate: hours * entry.rate,
        hoursToDate: hours,
        weeklyLimit: weeklyLimits[entry.contractId] ?? 20,
        hoursThisWeek: weekIndex === 0 ? hours : 0,
        nextAction:
          hours > 0
            ? `Time logged this week — review the work diary for ${entry.freelancer.split(" ")[0]}`
            : `No hours logged this week by ${entry.freelancer.split(" ")[0]}`,
        cta: "View time log",
        unread: 0,
      });
    });
  });

  const list = [...byId.values()];
  list[0] && (list[0].unread = 2);
  return list;
}

function fixedContracts(): ActiveContract[] {
  const seen = new Set<string>();
  const out: ActiveContract[] = [];

  spendWeeks.forEach((week) => {
    week.fixed.forEach((payment: FixedEntry) => {
      if (seen.has(payment.contract)) return;
      seen.add(payment.contract);
      out.push({
        id: payment.id,
        kind: "fixed",
        title: payment.contract,
        freelancer: payment.freelancer,
        initials: payment.initials,
        status: payment.status === "Released" ? "Active" : "Awaiting feedback",
        started: `Funded ${payment.date}`,
        rateLabel: "Fixed price",
        spentToDate: payment.amount,
        hoursToDate: 0,
        nextAction:
          payment.status === "Released"
            ? `${payment.milestone} released — fund the next milestone to keep working`
            : `${payment.milestone} is in escrow, awaiting your approval`,
        cta: payment.status === "Released" ? "Fund next milestone" : "Review & release",
        unread: payment.status === "Released" ? 0 : 1,
      });
    });
  });

  return out;
}

export const activeContracts: ActiveContract[] = [...hourlyContracts(), ...fixedContracts()];

export const contractStatusStyles: Record<ActiveContract["status"], string> = {
  Active: "bg-primary-soft text-accent-foreground",
  "Awaiting feedback": "bg-amber-100 text-amber-800",
  Paused: "bg-muted text-muted-foreground",
};
