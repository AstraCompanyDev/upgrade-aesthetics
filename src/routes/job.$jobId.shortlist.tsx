import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, MessageSquare, Star, Users, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { getApplicants, getJob } from "@/data/jobs";

export const Route = createFileRoute("/job/$jobId/shortlist")({
  head: () => ({
    meta: [
      { title: "Shortlist — ZeeWork Hiring" },
      {
        name: "description",
        content:
          "Build and compare your shortlist for a ZeeWork job posting, then move candidates to interview or decline them.",
      },
      { property: "og:title", content: "Shortlist — ZeeWork Hiring" },
      {
        property: "og:description",
        content: "Compare shortlisted freelancers side by side and pick who to interview.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShortlistPage,
});

function ShortlistPage() {
  const { jobId } = Route.useParams();
  const job = getJob(jobId);
  const applicants = getApplicants(jobId);
  const [shortlisted, setShortlisted] = useState<string[]>(
    applicants.filter((a) => a.status === "Shortlisted").map((a) => a.id),
  );

  const toggle = (id: string) =>
    setShortlisted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const picked = applicants.filter((a) => shortlisted.includes(a.id));
  const others = applicants.filter((a) => !shortlisted.includes(a.id));
  const avg = picked.length
    ? (picked.reduce((s, a) => s + a.rating, 0) / picked.length).toFixed(1)
    : "—";

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1080px]">
        <Link
          to="/job/$jobId/applicants"
          params={{ jobId }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to applicants
        </Link>

        <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Shortlist</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {job ? `${job.title} · ` : ""}
              {picked.length} of {applicants.length} candidates shortlisted
            </p>
          </div>
          <Link
            to="/messages"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Message shortlist
          </Link>
        </header>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Shortlisted", value: String(picked.length), icon: Users },
            { label: "Avg. rating", value: avg, icon: Star },
            {
              label: "Interviewing",
              value: String(applicants.filter((a) => a.status === "Interviewing").length),
              icon: MessageSquare,
            },
          ].map((s) => (
            <div key={s.label} className="surface-card p-5">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft">
                <s.icon className="size-4 text-primary" />
              </span>
              <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
              <p className="font-display text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="font-display text-lg font-bold">Your shortlist</h2>
          {picked.length === 0 ? (
            <p className="surface-card mt-3 p-10 text-center text-sm text-muted-foreground">
              Nobody shortlisted yet — add candidates from the list below.
            </p>
          ) : (
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {picked.map((a) => (
                <article key={a.id} className="surface-card hover-lift p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full gradient-brand text-sm font-semibold text-primary-foreground">
                      {a.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{a.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.role} · {a.rate}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold">
                      <Star className="size-4 fill-primary text-primary" />
                      {a.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{a.pitch}</p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      to="/job/$jobId/applicants/$applicantId/message"
                      params={{ jobId, applicantId: a.id }}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium transition-colors hover:bg-accent"
                    >
                      <MessageSquare className="size-3.5" />
                      Message
                    </Link>
                    <button
                      onClick={() => toggle(a.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <X className="size-3.5" />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-bold">Other applicants</h2>
          {others.length === 0 ? (
            <p className="surface-card mt-3 p-8 text-center text-sm text-muted-foreground">
              Everyone who applied is on your shortlist.
            </p>
          ) : (
            <ul className="surface-card mt-3 divide-y divide-border">
              {others.map((a) => (
                <li key={a.id} className="flex flex-wrap items-center gap-4 p-5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-accent-foreground">
                    {a.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.role} · {a.location} · {a.status}
                    </p>
                  </div>
                  <button
                    onClick={() => toggle(a.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Check className="size-3.5" />
                    Shortlist
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
