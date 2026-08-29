import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { clientBreakdown, money, monthlyEarnings } from "@/data/earnings";

export const Route = createFileRoute("/freelancer/earnings/reports")({
  head: () => ({
    meta: [
      { title: "My Reports — ZeeWork Freelancer Earnings" },
      {
        name: "description",
        content:
          "Monthly earnings trend, service fees, hours billed and top clients — build and download freelance earning reports on ZeeWork.",
      },
      { property: "og:title", content: "My Reports — ZeeWork Freelancer Earnings" },
      {
        property: "og:description",
        content: "Earnings trend, fees, hours and client breakdown reports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

const metrics = [
  { id: "gross", label: "Gross earnings" },
  { id: "fees", label: "Service fees" },
  { id: "hours", label: "Hours billed" },
] as const;

function ReportsPage() {
  const [metric, setMetric] = useState<(typeof metrics)[number]["id"]>("gross");
  const values = monthlyEarnings.map((m) => m[metric]);
  const peak = Math.max(...values);
  const total = values.reduce((a, b) => a + b, 0);
  const format = (v: number) => (metric === "hours" ? `${v} hrs` : money(v));

  return (
    <div className="pb-4">
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {metrics.map((m) => (
          <button
            key={m.id}
            onClick={() => setMetric(m.id)}
            className={`surface-card p-5 text-left transition-all ${
              metric === m.id ? "ring-2 ring-primary/60" : "hover:shadow-md"
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{m.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">
              {m.id === "hours"
                ? `${monthlyEarnings.reduce((a, x) => a + x.hours, 0)} hrs`
                : money(monthlyEarnings.reduce((a, x) => a + x[m.id], 0))}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Last 6 months</p>
          </button>
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="surface-card p-6">
          <h2 className="text-lg font-semibold">
            {metrics.find((m) => m.id === metric)!.label} by month
          </h2>
          <p className="text-sm text-muted-foreground">Total {format(total)} across 6 months</p>
          <div className="mt-8 flex h-56 items-end gap-4">
            {monthlyEarnings.map((m) => (
              <div key={m.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-3">
                <span className="text-[11px] font-medium text-muted-foreground">{format(m[metric])}</span>
                <div
                  className="w-full rounded-t-xl gradient-brand transition-all"
                  style={{ height: `${Math.max((m[metric] / peak) * 100, 4)}%` }}
                  role="img"
                  aria-label={`${m.month}: ${format(m[metric])}`}
                />
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card p-6">
          <h2 className="text-lg font-semibold">Top clients</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {clientBreakdown.map((c) => (
              <li key={c.client}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{c.client}</span>
                  <span className="font-semibold">{money(c.amount)}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full gradient-brand"
                    style={{ width: `${(c.amount / clientBreakdown[0].amount) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.contracts} contracts</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="surface-card mt-6 overflow-hidden">
        <div className="border-b border-border px-6 py-5">
          <h2 className="text-lg font-semibold">Saved reports</h2>
          <p className="text-xs text-muted-foreground">Generated statements ready to download</p>
        </div>
        <ul className="divide-y divide-border">
          {[
            { name: "Earnings statement — August 2026", size: "PDF · 148 KB" },
            { name: "Certificate of earnings — 2026 YTD", size: "PDF · 96 KB" },
            { name: "Transaction export — Q2 2026", size: "CSV · 22 KB" },
          ].map((r) => (
            <li key={r.name} className="flex items-center gap-4 px-6 py-4">
              <FileText className="size-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.size}</p>
              </div>
              <button className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent">
                Download
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
