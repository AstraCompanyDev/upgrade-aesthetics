import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { getJob } from "@/data/jobs";

export const Route = createFileRoute("/job/$jobId/edit")({
  head: () => ({
    meta: [
      { title: "Edit Job Posting — ZeeWork" },
      {
        name: "description",
        content:
          "Update the title, budget, skills and description of your ZeeWork job posting before it goes back live.",
      },
      { property: "og:title", content: "Edit Job Posting — ZeeWork" },
      {
        property: "og:description",
        content: "Adjust budget, skills and details for an existing job posting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EditJobPage,
});

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40";

function EditJobPage() {
  const { jobId } = Route.useParams();
  const navigate = useNavigate();
  const job = getJob(jobId);

  const [title, setTitle] = useState(job?.title ?? "");
  const [rate, setRate] = useState(job?.rate ?? "");
  const [type, setType] = useState(job?.type ?? "Hourly");
  const [status, setStatus] = useState(job?.status ?? "Open");
  const [description, setDescription] = useState(job?.description ?? "");
  const [skills, setSkills] = useState<string[]>(job?.skills ?? []);
  const [skillDraft, setSkillDraft] = useState("");
  const [saved, setSaved] = useState(false);

  if (!job) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-2xl surface-card p-10 text-center">
          <h1 className="font-display text-2xl font-bold">Job posting not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This posting may have been removed or archived.
          </p>
          <Link
            to="/jobs"
            className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Back to jobs
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const addSkill = () => {
    const value = skillDraft.trim();
    if (value && !skills.includes(value)) setSkills([...skills, value]);
    setSkillDraft("");
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to jobs
        </Link>

        <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Edit post</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {job.applicants} applicants · Posted {job.posted}
            </p>
          </div>
          <Link
            to="/job/$jobId/applicants"
            params={{ jobId }}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            View applicants
          </Link>
        </header>

        <form
          className="mt-6 grid gap-5 surface-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <label className="grid gap-2">
            <span className="text-sm font-medium">Job title</span>
            <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <div className="grid gap-5 sm:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Payment type</span>
              <select
                className={inputClass}
                value={type}
                onChange={(e) => setType(e.target.value as typeof type)}
              >
                <option>Hourly</option>
                <option>Fixed</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Budget</span>
              <input className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Status</span>
              <select
                className={inputClass}
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof status)}
              >
                <option>Open</option>
                <option>Draft</option>
                <option>Closed</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface p-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
            />
          </label>

          <div className="grid gap-2">
            <span className="text-sm font-medium">Skills</span>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {s}
                  <button
                    type="button"
                    aria-label={`Remove ${s}`}
                    onClick={() => setSkills(skills.filter((x) => x !== s))}
                    className="transition-colors hover:text-foreground"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className={inputClass}
                placeholder="Add a skill"
                value={skillDraft}
                onChange={(e) => setSkillDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-4 text-sm font-medium transition-colors hover:bg-accent"
              >
                <Plus className="size-4" />
                Add
              </button>
            </div>
          </div>

          {saved && (
            <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-medium text-accent-foreground">
              Changes saved to your posting.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/jobs" })}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="button"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-destructive transition-opacity hover:opacity-80"
            >
              <Trash2 className="size-4" />
              Delete posting
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
