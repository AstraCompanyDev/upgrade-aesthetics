import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, TrendingUp, Users, Wallet } from "lucide-react";
import { AgencyShell } from "@/components/agency-shell";
import { agencyContracts, agencyMembers, agencyProposals, agencyStats } from "@/data/agency";
import { openJobs } from "@/data/freelancer";

export const Route = createFileRoute("/agency/")({
  head: () => ({
    meta: [
      { title: "Agency Dashboard — ZeeWork" },
      {
        name: "description",
        content:
          "Run your agency on ZeeWork: track team utilization, active contracts, proposals in flight and recommended jobs for your members.",
      },
      { property: "og:title", content: "Agency Dashboard — ZeeWork" },
      {
        property: "og:description",
        content: "Team utilization, contracts, proposals and agency earnings in one dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgencyDashboard,
});

function AgencyDashboard() {
  return (
    <AgencyShell>
      <div className="mx-auto max-w-[1180px]">
        <section className="surface-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-6 gradient-brand px-7 py-8">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-surface font-display text-xl font-bold text-foreground">
              AS
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-primary-foreground/80">
                Agency · Design & Engineering
              </p>
              <h1 className="font-display text-3xl font-bold text-primary-foreground">
                Astra Studio
              </h1>
              <p className="mt-1 text-sm text-primary-foreground/80">
                4 members · 4 active contracts · 2 clients interviewing your team this week.
              </p>
            </div>
            <Link
              to="/agency/find-work"
              className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              <Search className="size-4" />
              Find work
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {agencyStats.map((s) => (
            <div key={s.label} className="surface-card p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-6">
            <section className="surface-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <h2 className="text-lg font-semibold">Active contracts</h2>
                <Link
                  to="/agency/contracts"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              <ul className="divide-y divide-border">
                {agencyContracts.slice(0, 3).map((c) => (
                  <li key={c.id} className="px-6 py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{c.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.client} · {c.rate} · {c.assignee}
                        </p>
                      </div>
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {c.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full gradient-brand"
                          style={{ width: `${(c.hoursThisWeek / c.weeklyLimit) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {c.hoursThisWeek}/{c.weeklyLimit} hrs this week
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <h2 className="text-lg font-semibold">Recommended for your team</h2>
                <Link
                  to="/agency/find-work"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Browse all
                </Link>
              </div>
              <ul className="divide-y divide-border">
                {openJobs.slice(0, 3).map((job) => (
                  <li
                    key={job.id}
                    className="flex flex-wrap items-center gap-4 px-6 py-5 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{job.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {job.client} · {job.budget} · {job.proposals} proposals
                      </p>
                    </div>
                    <Link
                      to="/freelancer/find-work/$jobId"
                      params={{ jobId: job.id }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      View job
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="flex flex-col gap-6">
            <section className="surface-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Team utilization</h2>
                <Users className="size-4 text-primary" />
              </div>
              <ul className="mt-4 flex flex-col gap-4">
                {agencyMembers.map((m) => (
                  <li key={m.id}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-full bg-muted text-[11px] font-semibold">
                        {m.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{m.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                      </div>
                      <span className="text-xs font-semibold">{m.utilization}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full gradient-brand"
                        style={{ width: `${m.utilization}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                to="/agency/team"
                className="mt-5 flex w-full items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                Manage team
              </Link>
            </section>

            <section className="surface-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Proposals in flight</h2>
                <TrendingUp className="size-4 text-primary" />
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {agencyProposals.slice(0, 3).map((p) => (
                  <li key={p.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.assignee} · {p.bid} · {p.status}
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                to="/agency/proposals"
                className="mt-5 flex w-full items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                All proposals
              </Link>
            </section>

            <section className="surface-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Agency balance</h2>
                <Wallet className="size-4 text-primary" />
              </div>
              <p className="mt-3 font-display text-3xl font-bold">$9,480</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Available to withdraw to the agency account.
              </p>
              <Link
                to="/agency/earnings"
                className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Withdraw funds
              </Link>
            </section>
          </div>
        </div>
      </div>
    </AgencyShell>
  );
}
