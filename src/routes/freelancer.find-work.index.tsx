import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, Bookmark, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { FreelancerShell } from "@/components/freelancer-shell";
import { jobCategories, openJobs } from "@/data/freelancer";

export const Route = createFileRoute("/freelancer/find-work/")({
  head: () => ({
    meta: [
      { title: "Find Work — Search Freelance Jobs on ZeeWork" },
      {
        name: "description",
        content:
          "Search freelance jobs by category, budget and experience level, then send a proposal in minutes on ZeeWork.",
      },
      { property: "og:title", content: "Find Work — Search Freelance Jobs on ZeeWork" },
      {
        property: "og:description",
        content: "Browse open contracts matched to your skills and apply with one click.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FindWorkPage,
});

const jobTypes = ["Any type", "Hourly", "Fixed"] as const;

function FindWorkPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All work");
  const [type, setType] = useState<(typeof jobTypes)[number]>("Any type");
  const [saved, setSaved] = useState<string[]>([]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return openJobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.client.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));
      const matchesCategory = category === "All work" || job.category === category;
      const matchesType = type === "Any type" || job.type === type;
      return matchesQuery && matchesCategory && matchesType;
    });
  }, [query, category, type]);

  const toggleSave = (id: string) =>
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1180px]">
        <header>
          <h1 className="font-display text-3xl font-bold">Find work</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {openJobs.length} open jobs matched to your skills and rate.
          </p>
        </header>

        <section className="surface-card mt-6 p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search by role, skill or client"
              aria-label="Search jobs"
              className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {jobCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
            <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="size-4" />
              {jobTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    type === t ? "bg-accent text-accent-foreground" : "hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-4">
          {results.map((job) => (
            <article key={job.id} className="surface-card p-6">
              <div className="flex flex-wrap items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to="/freelancer/find-work/$jobId"
                      params={{ jobId: job.id }}
                      className="font-display text-lg font-semibold hover:text-primary"
                    >
                      {job.title}
                    </Link>
                    {job.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                        <BadgeCheck className="size-3" />
                        Payment verified
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {job.type} · {job.level} · Posted {job.posted} · {job.proposals} proposals
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
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {job.client} · {job.location}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <p className="font-display text-lg font-bold">{job.budget}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSave(job.id)}
                      aria-label={saved.includes(job.id) ? "Remove from saved" : "Save job"}
                      className={`flex size-10 items-center justify-center rounded-full border border-border transition-colors ${
                        saved.includes(job.id)
                          ? "bg-primary-soft text-accent-foreground"
                          : "bg-surface text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Bookmark className="size-4" />
                    </button>
                    <Link
                      to="/freelancer/find-work/$jobId/apply"
                      params={{ jobId: job.id }}
                      className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Apply now
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {results.length === 0 ? (
            <div className="surface-card p-10 text-center">
              <p className="font-semibold">No jobs match those filters</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different category or clear your search.
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </FreelancerShell>
  );
}
