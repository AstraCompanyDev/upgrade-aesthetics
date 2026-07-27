import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Paperclip, Send, Star } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { getApplicant, getJob } from "@/data/jobs";

export const Route = createFileRoute("/job/$jobId/applicants/$applicantId/message")({
  head: () => ({
    meta: [
      { title: "Message Applicant — ZeeWork" },
      {
        name: "description",
        content:
          "Send a direct message to an applicant, pick a saved reply template and share the job context in one place.",
      },
      { property: "og:title", content: "Message Applicant — ZeeWork" },
      {
        property: "og:description",
        content: "Write to a freelancer who applied to your ZeeWork posting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MessageApplicantPage,
});

const templates = [
  {
    label: "Invite to interview",
    body: "Hi there — thanks for applying. Your experience looks like a strong fit. Are you free for a 30 minute call this week to talk through the role?",
  },
  {
    label: "Ask for portfolio",
    body: "Hi there — thanks for applying. Could you share two or three recent examples of similar work, plus a short note on your role in each?",
  },
  {
    label: "Confirm availability",
    body: "Hi there — thanks for applying. Before we move forward, could you confirm your weekly availability and earliest start date?",
  },
];

function MessageApplicantPage() {
  const { jobId, applicantId } = Route.useParams();
  const job = getJob(jobId);
  const applicant = getApplicant(jobId, applicantId);
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  if (!applicant) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-[720px]">
          <h1 className="font-display text-2xl font-bold">Applicant not found</h1>
          <Link
            to="/job/$jobId/applicants"
            params={{ jobId }}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to applicants
          </Link>
        </div>
      </DashboardShell>
    );
  }

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

        <header className="mt-4">
          <h1 className="font-display text-3xl font-bold">Message {applicant.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {job ? `About ${job.title}` : "About your job posting"}
          </p>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="surface-card p-6">
            {sent ? (
              <div className="py-10 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-soft">
                  <Send className="size-5 text-primary" />
                </span>
                <h2 className="mt-4 font-display text-xl font-bold">Message sent</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {applicant.name} will get a notification and can reply in your inbox.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/messages"
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Open inbox
                  </Link>
                  <button
                    onClick={() => {
                      setSent(false);
                      setBody("");
                    }}
                    className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Write another
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label className="text-sm font-medium" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  defaultValue={job ? `Re: ${job.title}` : "About your application"}
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                />

                <label className="mt-5 block text-sm font-medium" htmlFor="body">
                  Message
                </label>
                <textarea
                  id="body"
                  rows={9}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={`Hi ${applicant.name.split(" ")[0]}, thanks for applying…`}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  {templates.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setBody(t.body)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Paperclip className="size-3.5" />
                    Attach file
                  </button>
                  <div className="flex gap-3">
                    <Link
                      to="/job/$jobId/applicants"
                      params={{ jobId }}
                      className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={!body.trim()}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                      <Send className="size-4" />
                      Send message
                    </button>
                  </div>
                </div>
              </form>
            )}
          </section>

          <aside className="space-y-4">
            <div className="surface-card p-6 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full gradient-brand text-base font-semibold text-primary-foreground">
                {applicant.initials}
              </span>
              <p className="mt-3 font-semibold">{applicant.name}</p>
              <p className="text-xs text-muted-foreground">{applicant.role}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                <Star className="size-4 fill-primary text-primary" />
                {applicant.rating.toFixed(1)}
              </p>
              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-left text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Rate</dt>
                  <dd className="font-medium">{applicant.rate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="font-medium">{applicant.location}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Stage</dt>
                  <dd className="font-medium">{applicant.status}</dd>
                </div>
              </dl>
              <Link
                to="/job/$jobId/shortlist"
                params={{ jobId }}
                className="mt-5 block rounded-full border border-border py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                Manage shortlist
              </Link>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-sm font-semibold">Their pitch</h2>
              <p className="mt-2 text-sm text-muted-foreground">{applicant.pitch}</p>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
