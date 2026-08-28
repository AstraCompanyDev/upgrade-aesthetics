import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Info,
  ShieldCheck,
  Upload,
} from "lucide-react";
import {
  contractTotals,
  formatHours,
  money,
  spendWeeks,
  weekTotals,
} from "@/data/spending";

export const Route = createFileRoute("/stats/spending/")({
  head: () => ({
    meta: [
      { title: "Spend Details — ZeeWork Client Analytics" },
      {
        name: "description",
        content:
          "Weekly spend breakdown for your ZeeWork contracts: hourly time logged per day, contract costs, milestone payments and escrow, with CSV export.",
      },
      { property: "og:title", content: "Spend Details — ZeeWork Client Analytics" },
      {
        property: "og:description",
        content: "See exactly where your hiring budget went, week by week and contract by contract.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpendDetailsPage,
});

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function SpendDetailsPage() {
  const [index, setIndex] = useState(0);
  const week = spendWeeks[index]!;
  const totals = useMemo(() => weekTotals(week), [week]);
  const top = useMemo(() => contractTotals(week), [week]);
  const topMax = top[0]?.amount ?? 1;
  const activityMax = Math.max(...week.activities.map((a) => a.hours), 1);

  const dayTotals = dayNames.map((_, i) =>
    week.hourly.reduce((s, c) => s + (c.days[i] ?? 0), 0),
  );

  function exportCsv() {
    const rows: string[][] = [
      ["Contract", "Freelancer", "Rate", ...week.days, "Hours", "Amount"],
      ...week.hourly.map((c) => {
        const hours = c.days.reduce((a, b) => a + b, 0);
        return [
          c.contract,
          c.freelancer,
          `$${c.rate}/hr`,
          ...c.days.map((d) => formatHours(d)),
          formatHours(hours),
          money(hours * c.rate),
        ];
      }),
      [],
      ["Fixed price payments"],
      ["Contract", "Freelancer", "Milestone", "Date", "Status", "Amount"],
      ...week.fixed.map((f) => [
        f.contract,
        f.freelancer,
        f.milestone,
        f.date,
        f.status,
        money(f.amount),
      ]),
      [],
      ["Week total", money(totals.total)],
    ];
    const csv = rows
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `zeework-spend-${week.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-[1180px]">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Spend details</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Weekly summary of every contract you paid for. Times shown in UTC.
          </p>
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Upload className="size-4" />
          Export CSV
        </button>
      </header>

      <section className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
          <button
            onClick={() => setIndex((i) => Math.min(i + 1, spendWeeks.length - 1))}
            disabled={index >= spendWeeks.length - 1}
            aria-label="Previous week"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="min-w-[168px] text-center text-sm font-semibold">{week.label}</span>
          <button
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            disabled={index === 0}
            aria-label="Next week"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="size-3.5" />
          Hourly contracts bill automatically Monday afternoon (UTC).
        </p>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="surface-card p-6">
          <h2 className="text-base font-semibold">Totals</h2>
          <dl className="mt-4 text-sm">
            <div className="flex items-baseline justify-between border-b border-border py-3">
              <dt className="text-muted-foreground">
                Hourly{" "}
                <span className="font-medium text-foreground">
                  ({formatHours(totals.hourlyHours)} hrs)
                </span>
              </dt>
              <dd className="font-semibold">{money(totals.hourlyAmount)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-b border-border py-3">
              <dt className="text-muted-foreground">Fixed price and other</dt>
              <dd className="font-semibold">{money(totals.fixedAmount)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-b border-border py-3">
              <dt className="text-muted-foreground">Held in escrow</dt>
              <dd className="font-semibold">{money(totals.escrow)}</dd>
            </div>
            <div className="flex items-baseline justify-between pt-4">
              <dt className="text-sm font-medium">Week total</dt>
              <dd className="font-display text-2xl font-bold">{money(totals.total)}</dd>
            </div>
          </dl>
        </section>

        <section className="surface-card p-6">
          <h2 className="text-base font-semibold">Top 5 contracts</h2>
          {top.length ? (
            <ul className="mt-5 flex flex-col gap-4">
              {top.map((c) => (
                <li key={c.label}>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full gradient-brand"
                      style={{ width: `${Math.max((c.amount / topMax) * 100, 6)}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate font-medium">{c.label}</span>
                    <span className="shrink-0 font-semibold">{money(c.amount)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote />
          )}
        </section>

        <section className="surface-card p-6">
          <h2 className="text-base font-semibold">Top 5 activities</h2>
          {week.activities.length ? (
            <ul className="mt-5 flex flex-col gap-4">
              {week.activities.slice(0, 5).map((a) => (
                <li key={a.label} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{a.label}</span>
                    <span className="text-muted-foreground">{formatHours(a.hours)} hrs</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary/70"
                      style={{ width: `${(a.hours / activityMax) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote />
          )}
        </section>
      </div>

      <section className="surface-card mt-6 overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-6 py-5">
          <div>
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
              <Clock className="size-4 text-primary" />
              Hourly time logged
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Daily hours per contract for {week.label}.
            </p>
          </div>
          <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            {week.hourly.length} active hourly contracts
          </span>
        </div>

        {week.hourly.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-3 text-left font-medium">Contract</th>
                  {dayNames.map((d, i) => (
                    <th key={d} className="px-3 py-3 text-center font-medium">
                      <span className="block">{d}</span>
                      <span className="block text-[11px] font-normal">{week.days[i]}</span>
                    </th>
                  ))}
                  <th className="px-3 py-3 text-right font-medium">Hours</th>
                  <th className="px-6 py-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {week.hourly.map((c) => {
                  const hours = c.days.reduce((a, b) => a + b, 0);
                  return (
                    <tr key={c.contractId} className="transition-colors hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <Link
                          to="/stats/spending/contract/$contractId"
                          params={{ contractId: c.contractId }}
                          className="group flex items-center gap-3"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-xs font-bold text-accent-foreground">
                            {c.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-medium group-hover:text-primary group-hover:underline">
                              {c.contract} — ${c.rate}/hr
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {c.freelancer} · View time log
                            </p>
                          </div>
                        </Link>
                      </td>
                      {c.days.map((d, i) => (
                        <td
                          key={i}
                          className={`px-3 py-4 text-center tabular-nums ${
                            d ? "font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {formatHours(d)}
                        </td>
                      ))}
                      <td className="px-3 py-4 text-right font-semibold tabular-nums">
                        {formatHours(hours)}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold tabular-nums">
                        {money(hours * c.rate)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/40 text-sm font-semibold">
                  <td className="px-6 py-4">Total</td>
                  {dayTotals.map((d, i) => (
                    <td key={i} className="px-3 py-4 text-center tabular-nums">
                      {formatHours(d)}
                    </td>
                  ))}
                  <td className="px-3 py-4 text-right tabular-nums">
                    {formatHours(totals.hourlyHours)}
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums">
                    {money(totals.hourlyAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">
            No hourly time was logged this week.
          </p>
        )}
      </section>

      <section className="surface-card mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
            <CreditCard className="size-4 text-primary" />
            Fixed price and other payments
          </h2>
          <span className="text-sm font-semibold">{money(totals.fixedAmount)}</span>
        </div>
        {week.fixed.length ? (
          <ul className="divide-y divide-border">
            {week.fixed.map((f) => (
              <li key={f.id}>
                <Link
                  to="/stats/spending/payment/$paymentId"
                  params={{ paymentId: f.id }}
                  className="group flex flex-wrap items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-bold text-accent-foreground">
                    {f.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium group-hover:text-primary group-hover:underline">
                      {f.contract}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {f.milestone} · {f.freelancer} · {f.date}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      f.status === "Released"
                        ? "bg-primary-soft text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {f.status === "Released" ? <ShieldCheck className="size-3.5" /> : null}
                    {f.status}
                  </span>
                  <span className="font-semibold tabular-nums">{money(f.amount)}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">
            No fixed price payments this week.
          </p>
        )}
      </section>

      <p className="mt-6 text-sm text-muted-foreground">
        Need per-job context?{" "}
        <Link to="/jobs" className="font-medium text-primary hover:underline">
          Open your job postings
        </Link>
        .
      </p>
    </div>
  );
}

function EmptyNote() {
  return (
    <p className="mt-10 text-center text-sm text-muted-foreground">
      There is no data for
      <br />
      the selected week
    </p>
  );
}
