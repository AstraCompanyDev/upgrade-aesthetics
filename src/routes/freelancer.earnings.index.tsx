import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownToLine, Settings, Wallet, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const availableBalance = 3240;
const withdrawalFee = 1.99;

const paymentMethods = [
  { id: "bank", label: "Bank transfer ••••4417", hasAccount: true },
  { id: "paypal", label: "PayPal — amelia@studio.co", hasAccount: true },
  { id: "wise", label: "Wise — EUR balance", hasAccount: true },
];

function EarningsOverview() {
  const [active, setActive] = useState<EarningBucket["id"]>("available");
  const [modalOpen, setModalOpen] = useState(false);
  const [amountMode, setAmountMode] = useState<"full" | "other">("full");
  const [otherAmount, setOtherAmount] = useState("");
  const [methodId, setMethodId] = useState("bank");
  const [requested, setRequested] = useState(false);

  const bucket = earningBuckets.find((b) => b.id === active)!;
  const rows = bucketRows[active];

  const selectedMethod = paymentMethods.find((m) => m.id === methodId)!;
  const numericAmount = amountMode === "full" ? availableBalance : Math.max(Number(otherAmount || 0), 0);
  const total = Math.max(numericAmount - withdrawalFee, 0);

  const handleGetPaid = (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
  };

  const resetModal = () => {
    setModalOpen(false);
    setAmountMode("full");
    setOtherAmount("");
    setRequested(false);
  };

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
            <div className="mt-5">
              <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Wallet className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available balance</p>
                    <p className="font-display text-2xl font-bold tracking-tight">{money(availableBalance)}</p>
                    <p className="mt-1 max-w-md text-xs text-muted-foreground">
                      Ready to withdraw. Payouts run every business day at 6pm UTC and usually
                      arrive within 3 to 5 working days.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-stretch md:flex-row md:items-center">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <ArrowDownToLine className="size-4" />
                    Get paid
                  </button>
                  <Link
                    to="/freelancer/settings"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <Settings className="size-4" />
                    Payment settings
                  </Link>
                </div>
              </div>

              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-md gap-0 overflow-hidden p-0">
                  <DialogHeader className="px-6 pt-6 pb-2 text-left">
                    <DialogTitle className="text-xl font-semibold">Get paid now</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      Withdraw your available balance to your preferred account.
                    </DialogDescription>
                  </DialogHeader>

                  {requested ? (
                    <div className="px-6 pb-6 pt-2">
                      <div className="rounded-xl border border-primary/20 bg-primary/10 p-5 text-center">
                        <CheckCircle2 className="mx-auto size-10 text-primary" />
                        <p className="mt-3 font-semibold text-foreground">Withdrawal requested</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {money(numericAmount)} is on its way to {selectedMethod.label}.
                        </p>
                        <p className="mt-4 text-xs text-muted-foreground">
                          You should receive it within 3 to 5 working days.
                        </p>
                        <button
                          onClick={resetModal}
                          className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleGetPaid} className="px-6 pb-6 pt-2">
                      <div className="space-y-5">
                        <div className="rounded-xl border border-border bg-muted/30 p-4">
                          <p className="text-xs font-medium text-muted-foreground">Available balance</p>
                          <p className="font-display text-2xl font-bold">{money(availableBalance)}</p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-semibold">Payment method</p>
                          {selectedMethod.hasAccount ? (
                            <select
                              value={methodId}
                              onChange={(e) => setMethodId(e.target.value)}
                              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                            >
                              {paymentMethods.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                                <div>
                                  <p className="font-medium">No bank account available for withdrawal</p>
                                  <p className="mt-0.5 text-xs opacity-90">
                                    Please add a bank account in your payment settings.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm font-semibold">Amount</p>
                          <RadioGroup
                            value={amountMode}
                            onValueChange={(v) => setAmountMode(v as "full" | "other")}
                            className="gap-3"
                          >
                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-muted/20 p-3 transition-colors hover:bg-muted/40 has-[[data-state=checked]]:border-primary/50 has-[[data-state=checked]]:bg-primary/5">
                              <RadioGroupItem value="full" id="amount-full" />
                              <span className="text-sm font-medium">{money(availableBalance)}</span>
                              <span className="ml-auto text-xs text-muted-foreground">Full balance</span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-muted/20 p-3 transition-colors hover:bg-muted/40 has-[[data-state=checked]]:border-primary/50 has-[[data-state=checked]]:bg-primary/5">
                              <RadioGroupItem value="other" id="amount-other" />
                              <span className="text-sm font-medium">Other amount</span>
                              {amountMode === "other" && (
                                <span className="ml-auto flex items-center gap-1">
                                  <span className="text-sm text-muted-foreground">$</span>
                                  <input
                                    autoFocus
                                    value={otherAmount}
                                    onChange={(e) => setOtherAmount(e.target.value)}
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    className="h-8 w-28 rounded-md border border-border bg-background px-2 text-right text-sm outline-none focus:ring-2 focus:ring-ring/40"
                                  />
                                </span>
                              )}
                            </label>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-4 text-sm">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Withdrawal fee</span>
                            <span>{money(withdrawalFee)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground/80">
                            <span>Other bank fees may apply</span>
                            <span>—</span>
                          </div>
                          <div className="mt-2 border-t border-border pt-3 flex justify-between font-semibold text-foreground">
                            <span>Total amount</span>
                            <span>{money(total)}</span>
                          </div>
                        </div>

                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!selectedMethod.hasAccount || numericAmount <= 0}
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                          >
                            Get paid
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
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
