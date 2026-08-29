import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownToLine, Wallet } from "lucide-react";
import {
  bucketRows,
  earningBuckets,
  generalStats,
  money,
  weekdays,
  workSheet,
  type EarningBucket,
} from "@/data/earnings";

export const Route = createFileRoute("/freelancer/earnings/")({
  head: () => ({
    meta: [
      { title: "Earnings Overview — ZeeWork Freelancer" },
      {
        name: "description",
        content:
          "See work in progress, work in review, processing payments, available funds, general stats and your current work sheet on ZeeWork.",
      },
      { property: "og:title", content: "Earnings Overview — ZeeWork Freelancer" },
      {
        property: "og:description",
        content: "Track escrow, pending payments and withdraw your available balance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EarningsOverview,
});

function EarningsOverview() {
  const [active, setActive] = useState<EarningBucket["id"]>("available");
  const [amount, setAmount] = useState("3240.00");
  const [method, setMethod] = useState("Bank transfer ••••4417");
  const [requested, setRequested] = useState(false);

  const bucket = earningBuckets.find((b) => b.id === active)!;
  const rows = bucketRows[active];

  return (
    <div className="pb-4">
      <section className="mt-6">
        <h2 className="font-display text-xl font-semibold">Earnings overview</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {earningBuckets.map((b) => {
            const isActive = b.id === active;
            return (
              <button
                key={b.id}
                onClick={() => setActive(b.id)}
                aria-pressed={isActive}
                className={`surface-card p-6 text-left transition-all ${
                  isActive
                    ? "ring-2 ring-primary/60 shadow-lg -translate-y-0.5"
                    : "hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <p className="font-display text-3xl font-bold tracking-tight">{money(b.amount)}</p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{b.label}</p>
              </button>
            );
          })}
        </div>

        <div className="surface-card mt-4 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold">{bucket.label}</h3>
            <p className="text-xs text-muted-foreground">{bucket.note}</p>
          </div>

          {active === "available" ? (
            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div>
                {rows.length ? <RowTable rows={rows} /> : null}
                <p className="mt-4 text-xs text-muted-foreground">
                  Payment requests are processed and may take 3 to 5 working days.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-muted/40 p-5">
                <h4 className="text-sm font-semibold">Get paid now</h4>
                {requested ? (
                  <div className="mt-3 text-sm">
                    <p className="font-medium text-primary">Withdrawal requested</p>
                    <p className="mt-1 text-muted-foreground">
                      ${amount} is on its way to {method}.
                    </p>
                    <button
                      onClick={() => setRequested(false)}
                      className="mt-4 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium"
                    >
                      Make another withdrawal
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRequested(true);
                    }}
                    className="mt-3 flex flex-col gap-3"
                  >
                    <label className="flex flex-col gap-1.5 text-xs font-medium">
                      Amount (USD)
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        inputMode="decimal"
                        className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs font-medium">
                      Withdraw to
                      <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                      >
                        <option>Bank transfer ••••4417</option>
                        <option>PayPal — amelia@studio.co</option>
                        <option>Wise — EUR balance</option>
                      </select>
                    </label>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>You'll receive (after $1.99 fee)</span>
                      <span className="font-semibold text-foreground">
                        {money(Math.max(Number(amount || 0) - 1.99, 0))}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <ArrowDownToLine className="size-4" />
                      Get paid now
                    </button>
                    <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Wallet className="size-3.5" />
                      Payouts run every business day at 6pm UTC.
                    </p>
                  </form>
                )}
              </div>
            </div>
          ) : rows.length ? (
            <div className="mt-5">
              <RowTable rows={rows} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No {bucket.label.toLowerCase()}.
            </p>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">General stats</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {generalStats.map((s) => (
            <div key={s.label} className="surface-card p-5">
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <WorkSheet />
    </div>
  );
}

function RowTable({ rows }: { rows: { date: string; contract: string; client: string; type: string; hours: number; amount: number }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
            <th className="py-2 pr-6 text-left font-semibold">Date</th>
            <th className="py-2 pr-6 text-left font-semibold">Contract</th>
            <th className="py-2 pr-6 text-left font-semibold">Client</th>
            <th className="py-2 pr-6 text-left font-semibold">Type</th>
            <th className="py-2 text-right font-semibold">Hours</th>
            <th className="py-2 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.contract + r.date} className="border-b border-border/60 last:border-0">
              <td className="py-3 pr-6 whitespace-nowrap text-muted-foreground">{r.date}</td>
              <td className="py-3 pr-6 font-medium">{r.contract}</td>
              <td className="py-3 pr-6 whitespace-nowrap text-muted-foreground">{r.client}</td>
              <td className="py-3 pr-6">
                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">{r.type}</span>
              </td>
              <td className="py-3 text-right">{r.hours || "—"}</td>
              <td className="py-3 text-right font-semibold">{money(r.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WorkSheet() {
  const [week, setWeek] = useState(0);
  const label = week === 0 ? "Aug 24 – 30, 2026" : week === -1 ? "Aug 17 – 23, 2026" : "Aug 10 – 16, 2026";
  const factor = week === 0 ? 1 : week === -1 ? 0.8 : 0.6;

  const rows = workSheet.map((r) => {
    const days = r.days.map((d) => Math.round(d * factor * 2) / 2);
    const hours = days.reduce((a, b) => a + b, 0);
    return { ...r, days, hours, amount: hours * r.rate };
  });
  const total = rows.reduce((a, r) => a + r.amount, 0);

  return (
    <section className="surface-card mt-8 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold">Current work sheet</h2>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
        <div className="flex gap-2">
          {[0, -1, -2].map((w) => (
            <button
              key={w}
              onClick={() => setWeek(w)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                week === w ? "bg-primary text-primary-foreground" : "border border-border bg-surface hover:bg-accent"
              }`}
            >
              {w === 0 ? "This week" : w === -1 ? "Last week" : "2 weeks ago"}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-6 py-3 text-left font-semibold">Hourly contracts</th>
              {weekdays.map((d) => (
                <th key={d} className="px-2 py-3 text-center font-semibold">
                  {d}
                </th>
              ))}
              <th className="px-3 py-3 text-right font-semibold">Hours</th>
              <th className="px-3 py-3 text-right font-semibold">Rate</th>
              <th className="px-6 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border/60">
                <td className="px-6 py-4">
                  <p className="font-medium text-primary">{r.contract}</p>
                  <p className="text-xs text-muted-foreground">{r.client}</p>
                </td>
                {r.days.map((d, i) => (
                  <td
                    key={i}
                    className={`px-2 py-4 text-center ${d ? "font-semibold" : "text-muted-foreground"}`}
                  >
                    {d || 0}
                  </td>
                ))}
                <td className="px-3 py-4 text-right font-semibold">{r.hours}</td>
                <td className="px-3 py-4 text-right text-muted-foreground">${r.rate}/hr</td>
                <td className="px-6 py-4 text-right font-semibold">{money(r.amount)}</td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 text-sm font-semibold" colSpan={10}>
                Week total
              </td>
              <td className="px-6 py-4 text-right font-display text-lg font-bold">{money(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
