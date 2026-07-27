import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MessageSquare, Star } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { applicantsByJob, defaultApplicants, getJob, statusStyles } from "@/data/jobs";

export const Route = createFileRoute("/job/$jobId/applicants")({
  head: () => ({
    meta: [
      { title: "Applicants — ZeeWork Job Posting" },
      {
        name: "description",
        content:
          "Review, shortlist and message everyone who applied to your ZeeWork job posting from one screen.",
      },
      { property: "og:title", content: "Applicants — ZeeWork Job Posting" },
      {
        property: "og:description",
        content: "Shortlist, interview and message applicants for your posting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ApplicantsPage,
});

const tabs = ["All", "New", "Shortlisted", "Interviewing", "Declined"] as const;

const applicantStatusStyles: Record<string, string> = {
  New: "bg-primary-soft text-accent-foreground",
  Shortlisted: "bg-primary text-primary-foreground",
  Interviewing: "bg-muted text-foreground",
  Declined: "bg-muted text-muted-foreground",
};

function ApplicantsPage() {
  const { jobId } = Route.useParams();
  const job = getJob(jobId);
  const applicants = applicantsByJob[jobId] ?? defaultApplicants;
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");

  const visible = applicants.filter((a) => tab === "All" || a.status === tab);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1080px]">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to jobs
        </Link>

        <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl font-bold">Applicants</h1>
              {job && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[job.status]}`}
                >
                  {job.status}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {job ? `${job.title} · ` : ""}
              {applicants.length} people applied
            </p>
          </div>
          {job && (
            <Link
              to="/job/$jobId/edit"
              params={{ jobId }}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Edit post
            </Link>
          )}
        </header>

        <div className="mt-6 flex gap-1 overflow-x-auto rounded-full bg-muted p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                tab === t
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <section className="mt-5 grid gap-4">
          {visible.map((a) => (
            <article key={a.name} className="surface-card hover-lift p-6">
              <div className="flex flex-wrap items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full gradient-brand text-sm font-semibold text-primary-foreground">
                  {a.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold">{a.name}</h2>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${applicantStatusStyles[a.status]}`}
                    >
                      {a.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {a.role} · {a.rate} · {a.location}
                  </p>
                  <p className="mt-3 text-sm">{a.pitch}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                    <Star className="size-4 fill-primary text-primary" />
                    {a.rating.toFixed(1)}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to="/job/$jobId/applicants/$applicantId/message"
                      params={{ jobId, applicantId: a.id }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-accent"
                    >
                      <MessageSquare className="size-3.5" />
                      Message
                    </Link>
                    <Link
                      to="/job/$jobId/shortlist"
                      params={{ jobId }}
                      className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Shortlist
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="surface-card p-10 text-center text-sm text-muted-foreground">
              No applicants in this stage yet.
            </p>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
