import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Plus, Save, X } from "lucide-react";
import { FreelancerShell } from "@/components/freelancer-shell";

export const Route = createFileRoute("/freelancer/settings")({
  head: () => ({
    meta: [
      { title: "Profile Settings — ZeeWork Freelancer" },
      {
        name: "description",
        content:
          "Update your freelancer headline, hourly rate, skills, availability, portfolio and payout details on ZeeWork.",
      },
      { property: "og:title", content: "Profile Settings — ZeeWork Freelancer" },
      {
        property: "og:description",
        content: "Manage your rate, skills, availability and payout preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreelancerSettingsPage,
});

const initialSkills = ["React", "TypeScript", "Design systems", "Tailwind", "Accessibility"];

function FreelancerSettingsPage() {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [available, setAvailable] = useState(true);
  const [saved, setSaved] = useState(false);

  const addSkill = () => {
    const value = newSkill.trim();
    if (!value || skills.includes(value)) return;
    setSkills([...skills, value]);
    setNewSkill("");
  };

  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1000px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Profile settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              This is what clients see when you send a proposal.
            </p>
          </div>
          <button
            onClick={() => setSaved(true)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Save className="size-4" />
            {saved ? "Saved" : "Save changes"}
          </button>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex flex-col gap-6">
            <section className="surface-card p-6">
              <h2 className="text-lg font-semibold">Basic info</h2>
              <div className="mt-5 flex flex-wrap items-center gap-5">
                <span className="relative flex size-20 items-center justify-center rounded-2xl gradient-brand font-display text-xl font-bold text-primary-foreground">
                  AR
                  <button
                    aria-label="Change photo"
                    className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Camera className="size-4" />
                  </button>
                </span>
                <p className="text-sm text-muted-foreground">
                  Use a clear headshot. Profiles with photos get 2× more invitations.
                </p>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Full name
                  <input
                    defaultValue="Amelia Reyes"
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Professional headline
                  <input
                    defaultValue="Senior Frontend Developer"
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Location
                  <input
                    defaultValue="Lisbon, Portugal"
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium">
                  Hourly rate (USD)
                  <input
                    defaultValue="65"
                    inputMode="decimal"
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </label>
              </div>

              <label className="mt-5 flex flex-col gap-2 text-sm font-medium">
                Overview
                <textarea
                  rows={6}
                  defaultValue="I build fast, accessible interfaces for product teams — design systems, dashboards and marketing sites. 8 years of React and TypeScript, comfortable owning delivery end to end."
                  className="rounded-lg border border-border bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </label>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-lg font-semibold">Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-accent-foreground"
                  >
                    {s}
                    <button
                      aria-label={`Remove ${s}`}
                      onClick={() => setSkills(skills.filter((k) => k !== s))}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add a skill"
                  className="h-11 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
                <button
                  onClick={addSkill}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Plus className="size-4" />
                  Add
                </button>
              </div>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-lg font-semibold">Portfolio</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {["Fintech dashboard", "Design system", "Add project"].map((item, i) => (
                  <div
                    key={item}
                    className={`flex h-28 items-center justify-center rounded-xl p-4 text-center text-sm font-medium ${
                      i === 2
                        ? "border border-dashed border-border text-muted-foreground"
                        : "gradient-brand text-primary-foreground"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="surface-card p-6">
              <h2 className="text-base font-semibold">Availability</h2>
              <label className="mt-4 flex items-center justify-between gap-3 text-sm">
                Available for new work
                <button
                  role="switch"
                  aria-checked={available}
                  onClick={() => setAvailable(!available)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    available ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 size-5 rounded-full bg-surface transition-all ${
                      available ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </label>
              <label className="mt-5 flex flex-col gap-2 text-sm font-medium">
                Hours per week
                <select className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40">
                  <option>Less than 30 hrs/week</option>
                  <option>More than 30 hrs/week</option>
                  <option>As needed — open to offers</option>
                </select>
              </label>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-base font-semibold">Payout method</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Bank transfer ending 4417 · EUR
              </p>
              <button className="mt-4 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                Manage payouts
              </button>
            </div>

            <div className="surface-card p-6">
              <h2 className="text-base font-semibold">Visibility</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Public — anyone can find your profile in search.
              </p>
              <button className="mt-4 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                Change visibility
              </button>
            </div>
          </aside>
        </div>
      </div>
    </FreelancerShell>
  );
}
