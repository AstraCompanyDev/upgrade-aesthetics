import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, MapPin, Search } from "lucide-react";
import { AgencyShell } from "@/components/agency-shell";
import { agencyMembers } from "@/data/agency";
import { jobCategories, openJobs } from "@/data/freelancer";

export const Route = createFileRoute("/agency/find-work")({
  head: () => ({
    meta: [
      { title: "Agency Find Work — Match Jobs to Your Team | ZeeWork" },
      {
        name: "description",
        content:
          "Search open contracts as an agency, assign the right member and submit proposals on their behalf from one ZeeWork workspace.",
      },
      { property: "og:title", content: "Agency Find Work — ZeeWork" },
      {
        property: "og:description",
        content: "Browse jobs and assign the best-fit agency member before you bid.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgencyFindWorkPage,
});

const jobTypes = ["Any type", "Hourly", "Fixed"] as const;

function AgencyFindWorkPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(jobCategories[0]);
  const [type, setType] = useState<(typeof jobTypes)[number]>("Any type");
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  const list = useMemo(
    () =>
      openJobs.filter((job) => {
        const matchesQuery =
          !query ||
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
        const matchesCategory = category === jobCategories[0] || job.category === category;
        const matchesType = type === "Any type" || job.type === type;
        return matchesQuery && matchesCategory && matchesType;
      }),
    [query, category, type],
  );

  return (
    <AgencyShell>
      <div className="mx-auto max-w-[1180px]">
        <header>
          <h1 className="font-display text-3xl font-bold">Find work for your team</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {list.length} open contracts matched to your agency's skills. Assign a member, then
            submit a proposal on their behalf.
          </p>
        </header>

        <div className="surface-card mt-6 flex flex-wrap items-center gap-3 p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs or skills"
              aria-label="Search jobs"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category"
            className="h-10 rounded-full border border-border bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          >
            {jobCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as (typeof jobTypes)[number])}
            aria-label="Job type"
            className="h-10 rounded-full border border-border bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          >
            {jobTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <section className="mt-6 flex flex-col gap-4">
          {list.map((job) => (
            <article key={job.id} className="surface-card p-6">
              <div className="flex flex-wrap items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-semibold">{job.title}</h2>
                    {job.verified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        <BadgeCheck className="size-3.5" />
                        Payment verified
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {job.type} · {job.budget} · {job.level} · Posted {job.posted}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{job.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {job.client} · {job.location} · {job.proposals} proposals
                  </p>
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-56">
                  <label className="text-xs font-medium text-muted-foreground">
                    Assign member
                    <select
                      value={assignments[job.id] ?? ""}
                      onChange={(e) =>
                        setAssignments((prev) => ({ ...prev, [job.id]: e.target.value }))
                      }
                      className="mt-1 h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/40"
                    >
                      <option value="">Choose a member…</option>
                      {agencyMembers.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name} · {m.status}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Link
                    to="/freelancer/find-work/$jobId/apply"
                    params={{ jobId: job.id }}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Submit proposal
                  </Link>
                  <Link
                    to="/freelancer/find-work/$jobId"
                    params={{ jobId: job.id }}
                    className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {list.length === 0 ? (
            <p className="surface-card px-6 py-12 text-center text-sm text-muted-foreground">
              No jobs match those filters yet.
            </p>
          ) : null}
        </section>
      </div>
    </AgencyShell>
  );
}
