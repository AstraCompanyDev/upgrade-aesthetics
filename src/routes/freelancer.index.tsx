import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Search, Star, Wallet } from "lucide-react";
import { FreelancerShell } from "@/components/freelancer-shell";
import { contracts, openJobs, proposals } from "@/data/freelancer";

export const Route = createFileRoute("/freelancer/")({
  head: () => ({
    meta: [
      { title: "Freelancer Dashboard — ZeeWork" },
      {
        name: "description",
        content:
          "Track active contracts, weekly hours, proposal status and recommended jobs from one freelancer dashboard on ZeeWork.",
      },
      { property: "og:title", content: "Freelancer Dashboard — ZeeWork" },
      {
        property: "og:description",
        content: "Contracts, proposals, earnings and recommended jobs in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreelancerDashboard,
});

const stats = [
  { label: "Available balance", value: "$3,240", hint: "Ready to withdraw" },
  { label: "Earned this month", value: "$5,820", hint: "+18% vs last month" },
  { label: "Active contracts", value: "3", hint: "24 hrs logged this week" },
  { label: "Job success", value: "97%", hint: "Top rated" },
];

function FreelancerDashboard() {
  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1180px]">
        <section className="surface-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-6 gradient-brand px-7 py-8">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-surface font-display text-xl font-bold text-foreground">
              AR
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-primary-foreground/80">
                Senior Frontend Developer
              </p>
              <h1 className="font-display text-3xl font-bold text-primary-foreground">
                Welcome back, Amelia
              </h1>
              <p className="mt-1 text-sm text-primary-foreground/80">
                You have 2 interviews scheduled and 14 new jobs matching your skills.
              </p>
            </div>
            <Link
              to="/freelancer/find-work"
              className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              <Search className="size-4" />
              Find work
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
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
                  to="/freelancer/earnings"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View earnings
                </Link>
              </div>
              <ul className="divide-y divide-border">
                {contracts.map((c) => (
                  <li key={c.id} className="px-6 py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{c.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.client} · {c.rate}
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
                <h2 className="text-lg font-semibold">Recommended for you</h2>
                <Link
                  to="/freelancer/find-work"
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
              <h2 className="text-base font-semibold">Proposal status</h2>
              <ul className="mt-4 flex flex-col gap-4">
                {proposals.map((p) => (
                  <li key={p.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.client} · {p.bid}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                      <Clock className="size-3" />
                      {p.status} · {p.submitted}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/freelancer/proposals"
                className="mt-5 flex w-full items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                All proposals
              </Link>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-base font-semibold">Grow your profile</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li className="flex items-center gap-3">
                  <Star className="size-4 text-primary" />
                  Add 2 more portfolio items
                </li>
                <li className="flex items-center gap-3">
                  <Wallet className="size-4 text-primary" />
                  Confirm your withdrawal method
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-4 text-primary" />
                  Set your weekly availability
                </li>
              </ul>
              <Link
                to="/freelancer/settings"
                className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Profile settings
              </Link>
            </section>
          </div>
        </div>
      </div>
    </FreelancerShell>
  );
}
