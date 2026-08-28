import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownToLine, Download } from "lucide-react";
import { AgencyShell } from "@/components/agency-shell";
import { agencyMonthly, agencyTransactions } from "@/data/agency";

export const Route = createFileRoute("/agency/earnings")({
  head: () => ({
    meta: [
      { title: "Agency Earnings & Withdrawals — ZeeWork" },
      {
        name: "description",
        content:
          "Review agency revenue by month, escrow balances, member payouts and withdraw funds to your agency account on ZeeWork.",
      },
      { property: "og:title", content: "Agency Earnings & Withdrawals — ZeeWork" },
      {
        property: "og:description",
        content: "Agency revenue, escrow, member payouts and withdrawals in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgencyEarningsPage,
});

const kpis = [
  { label: "Agency balance", value: "$9,480.00", hint: "Withdraw anytime" },
  { label: "In escrow", value: "$3,000.00", hint: "2 milestones funded" },
  { label: "Billed this month", value: "$21,650.00", hint: "+24% vs last month" },
  { label: "Lifetime billings", value: "$186,420.00", hint: "Since Jan 2023" },
];

function AgencyEarningsPage() {
  const [amount, setAmount] = useState("9480.00");
  const [method, setMethod] = useState("Agency account ••••2210");
  const [requested, setRequested] = useState(false);
  const max = Math.max(...agencyMonthly.map((m) => m.value));

  return (
    <AgencyShell>
      <div className="mx-auto max-w-[1180px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Agency earnings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Revenue, escrow and withdrawals across every member contract.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
            <Download className="size-4" />
            Download statement
          </button>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="surface-card p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {k.label}
              </p>
              <p className="mt-2 font-display text-2xl font-bold">{k.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="flex flex-col gap-6">
            <section className="surface-card p-6">
              <h2 className="text-lg font-semibold">Revenue by month</h2>
              <div className="mt-6 flex h-48 items-end gap-4">
                {agencyMonthly.map((m) => (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-40 w-full items-end">
                      <div
                        className="w-full rounded-t-lg gradient-brand"
                        style={{ height: `${(m.value / max) * 100}%` }}
                        title={`${m.month}: $${(m.value * 250).toLocaleString()}`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{m.month}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="surface-card overflow-hidden">
              <div className="border-b border-border px-6 py-5">
                <h2 className="text-lg font-semibold">Recent transactions</h2>
              </div>
              <ul className="divide-y divide-border">
                {agencyTransactions.map((t) => (
                  <li key={t.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{t.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {t.member} · {t.date}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        t.positive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {t.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="surface-card h-fit p-6">
            <h2 className="text-base font-semibold">Withdraw funds</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Funds arrive in 1–3 business days.
            </p>
            <label className="mt-5 flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Amount (USD)</span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-11 rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </label>
            <label className="mt-4 flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Withdraw to</span>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="h-11 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              >
                <option>Agency account ••••2210</option>
                <option>PayPal — billing@astra.studio</option>
                <option>Wise — USD balance</option>
              </select>
            </label>
            <button
              onClick={() => setRequested(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ArrowDownToLine className="size-4" />
              Request withdrawal
            </button>
            {requested ? (
              <p className="mt-3 rounded-xl bg-primary-soft px-4 py-3 text-xs font-medium text-accent-foreground">
                Withdrawal of ${amount} requested to {method}.
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </AgencyShell>
  );
}
