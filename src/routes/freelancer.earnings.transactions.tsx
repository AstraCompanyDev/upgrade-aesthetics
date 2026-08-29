import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { money, transactions, type Transaction } from "@/data/earnings";

export const Route = createFileRoute("/freelancer/earnings/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — ZeeWork Freelancer Earnings" },
      {
        name: "description",
        content:
          "Search and filter every ZeeWork earning, withdrawal, service fee and refund with running totals for your freelance account.",
      },
      { property: "og:title", content: "Transactions — ZeeWork Freelancer Earnings" },
      {
        property: "og:description",
        content: "Full transaction history with filters, search and CSV export.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TransactionsPage,
});

const filters = ["All", "Earning", "Withdrawal", "Fee", "Refund"] as const;

function TransactionsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      transactions.filter(
        (t: Transaction) =>
          (filter === "All" || t.kind === filter) &&
          (t.label + t.client).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [filter, query],
  );

  const credits = rows.filter((r) => r.amount > 0).reduce((a, r) => a + r.amount, 0);
  const debits = rows.filter((r) => r.amount < 0).reduce((a, r) => a + r.amount, 0);

  const exportCsv = () => {
    const csv = [
      "Date,Description,Client,Type,Amount",
      ...rows.map((r) => `${r.date},"${r.label}",${r.client},${r.kind},${r.amount}`),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "zeework-transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-4">
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="surface-card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Money in</p>
          <p className="mt-2 font-display text-2xl font-bold text-primary">{money(credits)}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Money out</p>
          <p className="mt-2 font-display text-2xl font-bold">{money(debits)}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Net</p>
          <p className="mt-2 font-display text-2xl font-bold">{money(credits + debits)}</p>
        </div>
      </section>

      <section className="surface-card mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-6 py-5">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface hover:bg-accent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative ml-auto min-w-[200px] flex-1 md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search transactions"
              aria-label="Search transactions"
              className="h-10 w-full rounded-full border border-border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button
            onClick={exportCsv}
            className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
          >
            Export CSV
          </button>
        </div>

        {rows.length ? (
          <ul className="divide-y divide-border">
            {rows.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-4 px-6 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.client} · {t.date}
                  </p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">{t.kind}</span>
                <span
                  className={`w-28 text-right text-sm font-semibold ${
                    t.amount > 0 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {money(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">
            No transactions match your filters.
          </p>
        )}
      </section>
    </div>
  );
}
