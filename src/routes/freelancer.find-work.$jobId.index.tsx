import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Bookmark, Clock, MapPin, Users } from "lucide-react";
import { FreelancerShell } from "@/components/freelancer-shell";
import { getOpenJob } from "@/data/freelancer";

export const Route = createFileRoute("/freelancer/find-work/$jobId/")({
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
        { title: `${job.title} — ZeeWork` },
        { name: "description", content: job.summary },
        { property: "og:title", content: `${job.title} — ZeeWork` },
        { property: "og:description", content: job.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: JobMissing,
  component: JobDetailPage,
});

function JobMissing() {
  return (
    <FreelancerShell>
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="font-display text-2xl font-bold">This job is no longer open</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The client may have closed the posting or hired someone already.
        </p>
        <Link
          to="/freelancer/find-work"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to find work
        </Link>
      </div>
    </FreelancerShell>
  );
}

function JobDetailPage() {
  const { job } = Route.useLoaderData();

  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1000px]">
        <Link
          to="/freelancer/find-work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to find work
        </Link>

        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="surface-card p-7">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {job.category}
            </span>
            <h1 className="mt-3 font-display text-2xl font-bold">{job.title}</h1>
            <p className="mt-2 text-xs text-muted-foreground">
              Posted {job.posted} · {job.type} · {job.level} level
            </p>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>

            <h2 className="mt-8 text-base font-semibold">What you'll do</h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>· Work with the in-house team through weekly check-ins.</li>
              <li>· Ship reviewable increments with clear hand-off notes.</li>
              <li>· Own quality, accessibility and performance of your work.</li>
            </ul>

            <h2 className="mt-8 text-base font-semibold">Skills required</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="surface-card p-6">
              <p className="font-display text-xl font-bold">{job.budget}</p>
              <p className="mt-1 text-xs text-muted-foreground">{job.type} contract</p>
              <Link
                to="/freelancer/find-work/$jobId/apply"
                params={{ jobId: job.id }}
                className="mt-5 flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Apply to this job
              </Link>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
                <Bookmark className="size-4" />
                Save job
              </button>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-base font-semibold">About the client</h2>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-bold text-accent-foreground">
                  {job.clientInitials}
                </span>
                <div>
                  <p className="text-sm font-semibold">{job.client}</p>
                  <p className="text-xs text-muted-foreground">{job.location}</p>
                </div>
              </div>
              <ul className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-primary" />
                  {job.verified ? "Payment verified" : "Payment not verified"}
                </li>
                <li className="flex items-center gap-2">
                  <Users className="size-4 text-primary" />
                  {job.proposals} proposals so far
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="size-4 text-primary" />
                  Usually replies within a day
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  {job.location}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </FreelancerShell>
  );
}
