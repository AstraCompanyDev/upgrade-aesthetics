import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageSquare, Search } from "lucide-react";
import { AgencyShell } from "@/components/agency-shell";
import { agencyContracts } from "@/data/agency";

export const Route = createFileRoute("/agency/contracts")({
  head: () => ({
    meta: [
      { title: "Agency Contracts — ZeeWork" },
      {
        name: "description",
        content:
          "See every active agency contract, who it's assigned to, weekly hours logged and amount billed to date on ZeeWork.",
      },
      { property: "og:title", content: "Agency Contracts — ZeeWork" },
      {
        property: "og:description",
        content: "Active hourly and fixed-price agency contracts with hours and billing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgencyContractsPage,
});

const filters = ["All", "Active", "Ending soon", "Awaiting feedback"] as const;

function AgencyContractsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const list = useMemo(
    () =>
      agencyContracts.filter((c) => {
        const matchesFilter = filter === "All" || c.status === filter;
        const q = query.toLowerCase();
        const matchesQuery =
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.client.toLowerCase().includes(q) ||
          c.assignee.toLowerCase().includes(q);
        return matchesFilter && matchesQuery;
      }),
    [filter, query],
  );

  return (
    <AgencyShell>
      <div className="mx-auto max-w-[1100px]">
        <header>
          <h1 className="font-display text-3xl font-bold">Agency contracts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {agencyContracts.length} active contracts across your team.
          </p>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search contracts, clients or members"
              aria-label="Search contracts"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-6 grid gap-4">
          {list.map((c) => (
            <article key={c.id} className="surface-card p-6">
              <div className="flex flex-wrap items-start gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg font-semibold">{c.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {c.client} · {c.rate} · Assigned to {c.assignee}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full gradient-brand"
                        style={{ width: `${(c.hoursThisWeek / c.weeklyLimit) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {c.hoursThisWeek}/{c.weeklyLimit} hrs this week
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {c.status}
                  </span>
                  <p className="font-display text-xl font-bold">{c.billed}</p>
                  <p className="text-xs text-muted-foreground">Billed to date</p>
                  <Link
                    to="/messages"
                    className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                  >
                    <MessageSquare className="size-3.5" />
                    Message client
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {list.length === 0 ? (
            <p className="surface-card px-6 py-12 text-center text-sm text-muted-foreground">
              No contracts match that view.
            </p>
          ) : null}
        </section>
      </div>
    </AgencyShell>
  );
}
