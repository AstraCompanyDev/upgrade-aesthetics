import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Users } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Jobs — Manage Your ZeeWork Postings" },
      {
        name: "description",
        content:
          "Review open, draft and closed job postings, track applicants and post new roles from your ZeeWork jobs workspace.",
      },
      { property: "og:title", content: "Jobs — Manage Your ZeeWork Postings" },
      {
        property: "og:description",
        content: "Open, draft and closed job postings with applicant counts in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobsPage,
});

const filters = ["All", "Open", "Draft", "Closed"] as const;

const jobs = [
  {
    title: "CFL Management Team Position",
    status: "Open",
    type: "Hourly",
    rate: "$35–50 / hr",
    applicants: 4,
    posted: "8 months ago",
    skills: ["Operations", "Leadership", "Reporting"],
  },
  {
    title: "Figma Designer For Website",
    status: "Open",
    type: "Fixed",
    rate: "$350",
    applicants: 6,
    posted: "1 year ago",
    skills: ["Figma", "UI Design", "Prototyping"],
  },
  {
    title: "Business Site Backend Development",
    status: "Draft",
    type: "Hourly",
    rate: "$40–60 / hr",
    applicants: 0,
    posted: "over 1 year ago",
    skills: ["Node.js", "Postgres", "API"],
  },
  {
    title: "Brand Refresh & Style Guide",
    status: "Closed",
    type: "Fixed",
    rate: "$1,200",
    applicants: 11,
    posted: "2 years ago",
    skills: ["Branding", "Illustration"],
  },
];

const statusStyles: Record<string, string> = {
  Open: "bg-primary-soft text-accent-foreground",
  Draft: "bg-muted text-muted-foreground",
  Closed: "bg-muted text-muted-foreground",
};

function JobsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const visible = jobs.filter(
    (j) =>
      (filter === "All" || j.status === filter) &&
      j.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1180px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Jobs</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {jobs.filter((j) => j.status === "Open").length} open roles ·{" "}
              {jobs.reduce((n, j) => n + j.applicants, 0)} total applicants
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Plus className="size-4" />
            Post a job
          </button>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex gap-1 rounded-full bg-muted p-1">
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
              type="search"
              placeholder="Search job postings"
              aria-label="Search job postings"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>

        <section className="mt-5 grid gap-4">
          {visible.map((j) => (
            <article key={j.title} className="surface-card hover-lift p-6">
              <div className="flex flex-wrap items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{j.title}</h2>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[j.status]}`}
                    >
                      {j.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {j.type} · {j.rate} · Posted {j.posted}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {j.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <Users className="size-4" />
                    {j.applicants} applicants
                  </span>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-accent">
                      Edit post
                    </button>
                    <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                      View applicants
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="surface-card p-10 text-center text-sm text-muted-foreground">
              No job postings match your filters.
            </p>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
