import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/post-job")({
  head: () => ({
    meta: [
      { title: "Post a Job — Hire Freelancers on ZeeWork" },
      {
        name: "description",
        content:
          "Describe the role, set your budget and publish a job posting to reach vetted ZeeWork freelancers in minutes.",
      },
      { property: "og:title", content: "Post a Job — Hire Freelancers on ZeeWork" },
      {
        property: "og:description",
        content: "Publish a new job posting and start receiving proposals from vetted talent.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PostJobPage,
});

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40";

const steps = ["Describe the role", "Budget & timeline", "Review & publish"];

function PostJobPage() {
  const [step, setStep] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillDraft, setSkillDraft] = useState("");
  const [published, setPublished] = useState(false);

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

        <h1 className="mt-4 font-display text-3xl font-bold">Post a new job</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Good postings get proposals within a few hours.
        </p>

        <ol className="mt-6 flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex-1 min-w-[160px]">
              <button
                onClick={() => setStep(i)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  i === step
                    ? "border-primary bg-primary-soft font-semibold text-accent-foreground"
                    : "border-border bg-surface text-muted-foreground hover:bg-accent"
                }`}
              >
                <span className="block text-xs">Step {i + 1}</span>
                {s}
              </button>
            </li>
          ))}
        </ol>

        <form
          className="mt-5 grid gap-5 surface-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setPublished(true);
          }}
        >
          {step === 0 && (
            <>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Job title</span>
                <input className={inputClass} placeholder="e.g. Figma designer for marketing site" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Category</span>
                <select className={inputClass} defaultValue="Design">
                  <option>Design</option>
                  <option>Development</option>
                  <option>Marketing</option>
                  <option>Operations</option>
                  <option>Writing</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Description</span>
                <textarea
                  rows={6}
                  placeholder="What needs doing, what does success look like, and what should applicants send you?"
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
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Payment type</span>
                  <select className={inputClass} defaultValue="Hourly">
                    <option>Hourly</option>
                    <option>Fixed price</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Budget</span>
                  <input className={inputClass} placeholder="$35–50 / hr" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Experience level</span>
                  <select className={inputClass} defaultValue="Intermediate">
                    <option>Entry</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Project length</span>
                  <select className={inputClass} defaultValue="1–3 months">
                    <option>Less than a month</option>
                    <option>1–3 months</option>
                    <option>3–6 months</option>
                    <option>Ongoing</option>
                  </select>
                </label>
              </div>
              <label className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3 text-sm">
                <input type="checkbox" className="size-4 accent-[var(--primary)]" defaultChecked />
                Invite matching talent from my shortlist automatically
              </label>
            </>
          )}

          {step === 2 && (
            <div className="grid gap-3 text-sm">
              <p className="text-muted-foreground">
                Your posting will be visible to vetted freelancers and stay open until you close it.
                You can edit everything later from the jobs page.
              </p>
              <ul className="grid gap-2 rounded-xl bg-muted p-4">
                <li>Proposals are free to receive — you only pay on hire.</li>
                <li>Applicants land in your applicants view for shortlisting.</li>
                <li>You can pause or close the posting at any time.</li>
              </ul>
            </div>
          )}

          {published && (
            <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-medium text-accent-foreground">
              Your job is live. Proposals will appear in your applicants view.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Publish job
              </button>
            )}
            <button
              type="button"
              className="ml-auto text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Save as draft
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
