import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Paperclip } from "lucide-react";
import { FreelancerShell } from "@/components/freelancer-shell";
import { getOpenJob } from "@/data/freelancer";

export const Route = createFileRoute("/freelancer/find-work/$jobId/apply")({
  loader: ({ params }) => {
    const job = getOpenJob(params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Job unavailable — ZeeWork" }, { name: "robots", content: "noindex" }],
      };
    }
    const { job } = loaderData;
    return {
      meta: [
        { title: `Apply: ${job.title} — ZeeWork` },
        {
          name: "description",
          content: `Send a proposal for ${job.title} with ${job.client}. Set your rate, timeline and cover letter.`,
        },
        { property: "og:title", content: `Apply: ${job.title} — ZeeWork` },
        { property: "og:description", content: `Submit your proposal to ${job.client} on ZeeWork.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ApplyMissing,
  component: ApplyPage,
});

function ApplyMissing() {
  return (
    <FreelancerShell>
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="font-display text-2xl font-bold">You can't apply to this job</h1>
        <p className="mt-2 text-sm text-muted-foreground">The posting is closed or was removed.</p>
        <Link
          to="/freelancer/find-work"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Find other work
        </Link>
      </div>
    </FreelancerShell>
  );
}

function ApplyPage() {
  const { job } = Route.useLoaderData();
  const [sent, setSent] = useState(false);
  const [rate, setRate] = useState(job.type === "Hourly" ? "62" : "2200");
  const [duration, setDuration] = useState("1 to 3 months");
  const [letter, setLetter] = useState("");

  if (sent) {
    return (
      <FreelancerShell>
        <div className="mx-auto max-w-lg py-20 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-soft">
            <CheckCircle2 className="size-7 text-primary" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold">Proposal sent</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {job.client} received your proposal for “{job.title}”. You'll be notified when they
            reply.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Link
              to="/freelancer/proposals"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              View my proposals
            </Link>
            <Link
              to="/freelancer/find-work"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Keep browsing
            </Link>
          </div>
        </div>
      </FreelancerShell>
    );
  }

  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1000px]">
        <Link
          to="/freelancer/find-work/$jobId"
          params={{ jobId: job.id }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to job
        </Link>

        <h1 className="mt-4 font-display text-3xl font-bold">Submit a proposal</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {job.title} · {job.client}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
        >
          <div className="flex flex-col gap-6">
            <section className="surface-card p-6">
              <h2 className="text-lg font-semibold">Terms</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium">
                  {job.type === "Hourly" ? "Your hourly rate (USD)" : "Your fixed bid (USD)"}
                  <input
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    inputMode="decimal"
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Estimated duration
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  >
                    <option>Less than 1 month</option>
                    <option>1 to 3 months</option>
                    <option>3 to 6 months</option>
                    <option>More than 6 months</option>
                  </select>
                </label>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                ZeeWork service fee of 10% applies. You'll receive{" "}
                <span className="font-semibold text-foreground">
                  ${(Number(rate || 0) * 0.9).toFixed(2)}
                </span>{" "}
                {job.type === "Hourly" ? "per hour" : "in total"}.
              </p>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-lg font-semibold">Cover letter</h2>
              <textarea
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                rows={9}
                placeholder="Explain why you're a great fit, and mention similar work you've delivered."
                className="mt-4 w-full rounded-lg border border-border bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-accent"
                >
                  <Paperclip className="size-3.5" />
                  Attach portfolio file
                </button>
                <span className="text-xs text-muted-foreground">{letter.length}/5000</span>
              </div>
            </section>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Send proposal
              </button>
              <Link
                to="/freelancer/find-work"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                Cancel
              </Link>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="surface-card p-6">
              <h2 className="text-base font-semibold">Job summary</h2>
              <p className="mt-3 text-sm text-muted-foreground">{job.summary}</p>
              <dl className="mt-5 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Budget</dt>
                  <dd className="font-medium">{job.budget}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Level</dt>
                  <dd className="font-medium">{job.level}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Proposals</dt>
                  <dd className="font-medium">{job.proposals}</dd>
                </div>
              </dl>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-base font-semibold">Connects</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This proposal uses 4 connects. You have 62 remaining this month.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </FreelancerShell>
  );
}
