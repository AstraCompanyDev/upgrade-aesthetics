import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FreelancerShell } from "@/components/freelancer-shell";
import { proposals } from "@/data/freelancer";

export const Route = createFileRoute("/freelancer/proposals")({
  head: () => ({
    meta: [
      { title: "My Proposals — ZeeWork Freelancer" },
      {
        name: "description",
        content:
          "See every proposal you've submitted on ZeeWork, its status, your bid and which clients are interviewing.",
      },
      { property: "og:title", content: "My Proposals — ZeeWork Freelancer" },
      {
        property: "og:description",
        content: "Track submitted, viewed and interviewing proposals in one list.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProposalsPage,
});

const filters = ["All", "Submitted", "Viewed", "Interviewing", "Declined"] as const;

function ProposalsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = proposals.filter((p) => filter === "All" || p.status === filter);

  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1000px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">My proposals</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {proposals.length} active proposals · 62 connects remaining
            </p>
          </div>
          <Link
            to="/freelancer/find-work"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Find more work
          </Link>
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
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

        <section className="surface-card mt-6 overflow-hidden">
          <ul className="divide-y divide-border">
            {list.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-4 px-6 py-5">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {p.client} · Submitted {p.submitted}
                  </p>
                </div>
                <span className="text-sm font-medium">{p.bid}</span>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
          {list.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              No proposals with that status yet.
            </p>
          ) : null}
        </section>
      </div>
    </FreelancerShell>
  );
}
