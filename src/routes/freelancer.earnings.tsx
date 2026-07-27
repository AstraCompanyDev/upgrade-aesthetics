import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Download, Wallet } from "lucide-react";
import { FreelancerShell } from "@/components/freelancer-shell";

export const Route = createFileRoute("/freelancer/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings & Withdrawals — ZeeWork Freelancer" },
      {
        name: "description",
        content:
          "See lifetime earnings, monthly income, pending payments and withdraw your available balance to your bank on ZeeWork.",
      },
      { property: "og:title", content: "Earnings & Withdrawals — ZeeWork Freelancer" },
      {
        property: "og:description",
        content: "Track income, pending escrow and cash out your balance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EarningsPage,
});

const kpis = [
  { label: "Available balance", value: "$3,240.00", hint: "Withdraw anytime" },
  { label: "In escrow", value: "$1,850.00", hint: "2 milestones funded" },
  { label: "Earned this month", value: "$5,820.00", hint: "+18% vs last month" },
  { label: "Lifetime earnings", value: "$74,310.00", hint: "Since Mar 2023" },
];

const monthly = [
  { month: "Feb", value: 48 },
  { month: "Mar", value: 61 },
  { month: "Apr", value: 44 },
  { month: "May", value: 76 },
  { month: "Jun", value: 69 },
  { month: "Jul", value: 92 },
];

const transactions = [
  { id: "t1", label: "Milestone released — Design system maintenance", client: "Northwind Labs", date: "Jul 24", amount: "+$1,950.00", positive: true },
  { id: "t2", label: "Withdrawal to bank ••••4417", client: "Bank transfer", date: "Jul 18", amount: "-$2,500.00", positive: false },
  { id: "t3", label: "Hourly invoice week 28", client: "Bluefin Media", date: "Jul 14", amount: "+$1,320.00", positive: true },
  { id: "t4", label: "Service fee", client: "ZeeWork", date: "Jul 14", amount: "-$132.00", positive: false },
  { id: "t5", label: "Milestone released — Landing page sprint", client: "Halo Systems", date: "Jul 06", amount: "+$1,200.00", positive: true },
];

function EarningsPage() {
  const [amount, setAmount] = useState("3240.00");
  const [method, setMethod] = useState("Bank transfer ••••4417");
  const [requested, setRequested] = useState(false);

  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1180px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Earnings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your income, escrow and withdrawals across all contracts.
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
          <section className="surface-card p-6">
            <h2 className="text-lg font-semibold">Monthly earnings</h2>
            <p className="text-sm text-muted-foreground">Paid out per month</p>
            <div className="mt-8 flex h-56 items-end gap-4">
              {monthly.map((m) => (
                <div key={m.month} className="flex min-w-0 flex-1 flex-col items-center gap-3">
                  <div
                    className="w-full rounded-t-xl gradient-brand"
                    style={{ height: `${m.value}%` }}
                    role="img"
                    aria-label={`${m.month}: ${m.value}% of peak earnings`}
                  />
                  <span className="text-xs text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-lg font-semibold">Withdraw funds</h2>
            {requested ? (
              <div className="mt-5 rounded-xl bg-primary-soft p-5 text-sm">
                <p className="font-semibold text-accent-foreground">Withdrawal requested</p>
                <p className="mt-1 text-muted-foreground">
                  ${amount} is on its way to {method}. Funds usually arrive in 2–3 business days.
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
                className="mt-5 flex flex-col gap-4"
              >
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Amount (USD)
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    inputMode="decimal"
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
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
                <div className="rounded-lg bg-muted p-4 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Withdrawal fee</span>
                    <span className="font-medium text-foreground">$1.99</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span>You'll receive</span>
                    <span className="font-semibold text-foreground">
                      ${Math.max(Number(amount || 0) - 1.99, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <ArrowDownToLine className="size-4" />
                  Withdraw funds
                </button>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Wallet className="size-3.5" />
                  Payouts run every business day at 6pm UTC.
                </p>
              </form>
            )}
          </section>
        </div>

        <section className="surface-card mt-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <h2 className="text-lg font-semibold">Transaction history</h2>
            <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
          <ul className="divide-y divide-border">
            {transactions.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.client} · {t.date}
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
    </FreelancerShell>
  );
}
