import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { AgencyShell } from "@/components/agency-shell";
import { agencyContracts, agencyMembers } from "@/data/agency";

export const Route = createFileRoute("/agency/team")({
  head: () => ({
    meta: [
      { title: "Agency Team — Manage Members | ZeeWork" },
      {
        name: "description",
        content:
          "Manage your agency roster on ZeeWork: member availability, utilization, billable rates and the contracts they're staffed on.",
      },
      { property: "og:title", content: "Agency Team — ZeeWork" },
      {
        property: "og:description",
        content: "Roster, availability, rates and contract assignments for every agency member.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgencyTeamPage,
});

function AgencyTeamPage() {
  return (
    <AgencyShell>
      <div className="mx-auto max-w-[1100px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Your team</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {agencyMembers.length} members · availability and workload this week.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <UserPlus className="size-4" />
            Invite member
          </button>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agencyMembers.map((m) => {
            const assigned = agencyContracts.filter((c) => c.assignee === m.name);
            return (
              <article key={m.id} className="surface-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-full gradient-brand text-sm font-semibold text-primary-foreground">
                    {m.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{m.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-accent-foreground">
                    {m.status}
                  </span>
                  <span className="font-medium text-muted-foreground">{m.rate}</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Utilization</span>
                    <span className="font-semibold text-foreground">{m.utilization}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full gradient-brand"
                      style={{ width: `${m.utilization}%` }}
                    />
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  {assigned.length > 0
                    ? `Current: ${assigned.map((c) => c.title).join(", ")}`
                    : "No active contracts — available to staff."}
                </p>

                <div className="mt-5 flex gap-2">
                  <Link
                    to="/agency/find-work"
                    className="flex flex-1 items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Find work
                  </Link>
                  <Link
                    to="/messages"
                    className="flex flex-1 items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                  >
                    Message
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </AgencyShell>
  );
}
