import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, MessageSquare, Search, Wallet } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { activeContracts, contractStatusStyles } from "@/data/contracts";
import { formatHours, money } from "@/data/spending";

export const Route = createFileRoute("/contracts")({
  head: () => ({
    meta: [
      { title: "Active Contracts — ZeeWork Client Workspace" },
      {
        name: "description",
        content:
          "See every active ZeeWork contract in one place: hourly time logs, fixed-price milestones, spend to date and the next action for each freelancer.",
      },
      { property: "og:title", content: "Active Contracts — ZeeWork Client Workspace" },
      {
        property: "og:description",
        content:
          "All active hourly and fixed-price contracts with spend to date and next actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContractsPage,
});

const filters = ["All contracts", "Hourly", "Fixed price", "Awaiting feedback"] as const;

function ContractsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All contracts");
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      activeContracts.filter((c) => {
        const matchesFilter =
          filter === "All contracts" ||
          (filter === "Hourly" && c.kind === "hourly") ||
          (filter === "Fixed price" && c.kind === "fixed") ||
          (filter === "Awaiting feedback" && c.status === "Awaiting feedback");
        const q = query.trim().toLowerCase();
        return (
          matchesFilter &&
          (!q ||
            c.title.toLowerCase().includes(q) ||
            c.freelancer.toLowerCase().includes(q))
        );
      }),
    [filter, query],
  );

  const totalSpend = activeContracts.reduce((s, c) => s + c.spentToDate, 0);
  const hourlyCount = activeContracts.filter((c) => c.kind === "hourly").length;

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1180px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Active contracts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeContracts.length} contracts · {hourlyCount} hourly ·{" "}
              {money(totalSpend)} billed to date
            </p>
          </div>
          <Link
            to="/stats/spending"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
          >
            <Wallet className="size-4" />
            Spend details
          </Link>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1 rounded-full bg-muted p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative ml-auto w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search contracts or freelancers"
              aria-label="Search contracts"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {visible.map((c) => {
            const detail =
              c.kind === "hourly" ? (
                <Link
                  to="/stats/spending/contract/$contractId"
                  params={{ contractId: c.id }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {c.cta}
                  <ArrowRight className="size-4" />
                </Link>
              ) : (
                <Link
                  to="/stats/spending/payment/$paymentId"
                  params={{ paymentId: c.id }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {c.cta}
                  <ArrowRight className="size-4" />
                </Link>
              );

            return (
              <article
                key={`${c.kind}-${c.id}`}
                className="surface-card flex flex-wrap items-center gap-5 p-5 transition-shadow hover:shadow-md"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full gradient-brand text-sm font-semibold text-primary-foreground">
                  {c.initials}
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-display text-base font-semibold">
                    {c.title} — {c.rateLabel}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">{c.freelancer}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`rounded-full px-2.5 py-1 font-medium ${contractStatusStyles[c.status]}`}
                    >
                      {c.status === "Active" ? "Active contract" : c.status}
                    </span>
                    <span className="text-muted-foreground">{c.started}</span>
                    {c.kind === "hourly" ? (
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-3.5" />
                        {formatHours(c.hoursThisWeek ?? 0)} of {c.weeklyLimit}h this week
                      </span>
                    ) : null}
                  </div>
                </div>

                <p className="hidden max-w-[220px] text-sm text-muted-foreground xl:block">
                  {c.nextAction}
                </p>

                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Billed to date
                  </p>
                  <p className="font-display text-lg font-bold tabular-nums">
                    {money(c.spentToDate)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {detail}
                  <Link
                    to="/messages"
                    aria-label={`Message ${c.freelancer}`}
                    className="relative flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <MessageSquare className="size-4" />
                    {c.unread ? (
                      <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-primary-foreground">
                        {c.unread}
                      </span>
                    ) : null}
                  </Link>
                </div>
              </article>
            );
          })}

          {!visible.length ? (
            <p className="surface-card px-6 py-12 text-center text-sm text-muted-foreground">
              No contracts match this filter.
            </p>
          ) : null}
        </div>
      </div>
    </DashboardShell>
  );
}
