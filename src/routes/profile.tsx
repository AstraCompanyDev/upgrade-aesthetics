import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Briefcase,
  MapPin,
  Pencil,
  Star,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { jobs } from "@/data/jobs";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — ZeeWork Client Account" },
      {
        name: "description",
        content:
          "See how freelancers view your ZeeWork client profile: hiring history, reviews, verification and open roles.",
      },
      { property: "og:title", content: "Your Profile — ZeeWork Client Account" },
      {
        property: "og:description",
        content: "Hiring history, reviews and open roles on your ZeeWork client profile.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const highlights = [
  { label: "Jobs posted", value: "18" },
  { label: "Hires made", value: "11" },
  { label: "Total spend", value: "$24,800" },
  { label: "Avg. rating", value: "4.9" },
];

const reviews = [
  {
    name: "Muhammad M.",
    initials: "MM",
    rating: 5,
    text: "Clear brief and fast feedback loops. Payment released the same day.",
    job: "Figma Designer For Website",
  },
  {
    name: "Kwame B.",
    initials: "KB",
    rating: 5,
    text: "Great client to build with — knew exactly what they wanted from the API.",
    job: "Business Site Backend Development",
  },
  {
    name: "Amelia R.",
    initials: "AR",
    rating: 4,
    text: "Well organised team, occasionally slow on approvals but always fair.",
    job: "CFL Management Team Position",
  },
];

function ProfilePage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1080px]">
        <section className="surface-card overflow-hidden">
          <div className="h-28 gradient-brand" />
          <div className="flex flex-wrap items-end gap-5 px-6 pb-6">
            <span className="-mt-10 flex size-20 items-center justify-center rounded-2xl border-4 border-surface gradient-brand text-xl font-bold text-primary-foreground">
              SW
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold">Sean W.</h1>
                <BadgeCheck className="size-5 text-primary" />
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-4" />
                  ZeeWork Client · Administration Work
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  London, UK
                </span>
              </p>
            </div>
            <Link
              to="/settings/profile"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Pencil className="size-4" />
              Edit profile
            </Link>
          </div>
        </section>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="surface-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{h.label}</p>
              <p className="mt-2 font-display text-2xl font-bold">{h.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section>
            <h2 className="font-display text-xl font-bold">About</h2>
            <p className="mt-3 surface-card p-6 text-sm leading-relaxed text-muted-foreground">
              We are a small operations and product team hiring specialists for design, frontend and
              backend work. Briefs are written up front, feedback lands within 24 hours and
              milestones are released as soon as work is approved.
            </p>

            <h2 className="mt-8 font-display text-xl font-bold">Reviews from freelancers</h2>
            <div className="mt-3 grid gap-4">
              {reviews.map((r) => (
                <article key={r.name} className="surface-card p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full gradient-brand text-xs font-semibold text-primary-foreground">
                      {r.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.job}</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold">
                      <Star className="size-4 fill-primary text-primary" />
                      {r.rating}.0
                    </span>
                  </div>
                  <p className="mt-3 text-sm">{r.text}</p>
                </article>
              ))}
            </div>
          </section>

          <aside>
            <h2 className="font-display text-xl font-bold">Open roles</h2>
            <div className="mt-3 grid gap-3">
              {jobs
                .filter((j) => j.status === "Open")
                .map((j) => (
                  <Link
                    key={j.id}
                    to="/job/$jobId/applicants"
                    params={{ jobId: j.id }}
                    className="surface-card hover-lift block p-5"
                  >
                    <p className="text-sm font-semibold">{j.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {j.type} · {j.rate} · {j.applicants} applicants
                    </p>
                  </Link>
                ))}
            </div>

            <div className="mt-6 surface-card p-5">
              <p className="font-display text-sm font-semibold">Verification</p>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-primary" /> Email verified
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-primary" /> Payment method verified
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-primary" /> Company details verified
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
