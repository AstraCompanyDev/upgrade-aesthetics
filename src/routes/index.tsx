import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
  FileSearch,
  Plus,
  RefreshCw,
  Send,
  Sparkle,
  UserPlus,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import heroDocs from "@/assets/hero-docs.jpg";
import gigFrontend from "@/assets/gig-frontend.jpg";
import gigCloud from "@/assets/gig-cloud.jpg";
import gigWeb from "@/assets/gig-webdesign.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZeeWork Client Dashboard — Hire, Manage, Ship" },
      {
        name: "description",
        content:
          "Track your team, review offers and manage every job posting from one modern ZeeWork client dashboard.",
      },
      { property: "og:title", content: "ZeeWork Client Dashboard" },
      {
        property: "og:description",
        content: "Your team, offers and job postings in one clean workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Active jobs", value: "5", delta: "+2 this month" },
  { label: "New applicants", value: "12", delta: "5 unreviewed" },
  { label: "Open proposals", value: "8", delta: "3 expiring soon" },
  { label: "Spend this month", value: "$2,450", delta: "Budget 68% used" },
];

const team = [
  { name: "Clarisse K.", role: "Executive Role", initials: "CK", verified: false },
  { name: "Sean W.", role: "Administration Work", initials: "SW", verified: true },
  { name: "Usama I.", role: "Job for Usama", initials: "UI", verified: true },
];

const offers = [
  {
    img: gigFrontend,
    author: "Muhammad M.",
    title: "I will do frontend development for your web app",
    days: 4,
    price: 100,
    status: "Pending",
  },
  {
    img: gigCloud,
    author: "Raj B.",
    title: "I will deploy your application in AWS with CI/CD",
    days: 7,
    price: 50,
    status: "Pending",
  },
  {
    img: gigWeb,
    author: "Oluwafemi A.",
    title: "I will create a professional Wix website",
    days: 5,
    price: 100,
    status: "Completed",
  },
];

const postings = [
  { title: "CFL Management Team Position", type: "Hourly", applicants: 4, posted: "8 months ago" },
  { title: "Figma Designer For Website — $350", type: "Fixed", applicants: 0, posted: "1 year ago" },
  { title: "Figma Designer — $350", type: "Fixed", applicants: 0, posted: "1 year ago" },
  { title: "Job For Clarisse", type: "Hourly", applicants: 0, posted: "1 year ago" },
  {
    title: "Business Site Backend Development",
    type: "Hourly",
    applicants: 1,
    posted: "over 1 year ago",
  },
];

const tips = [
  { label: "Add your billing method", icon: CreditCard, done: true },
  { label: "Post your first job", icon: Plus, done: true },
  { label: "Invite talent to apply", icon: UserPlus, done: false },
  { label: "Review proposals", icon: FileSearch, done: false },
  { label: "Hire your perfect freelancer", icon: Sparkle, done: false },
];

const tabs = ["All", "Pending", "Completed", "Rejected"] as const;

function Dashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const visibleOffers = offers.filter((o) => tab === "All" || o.status === tab);
  const tipsDone = tips.filter((t) => t.done).length;

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1180px]">
        <section className="relative overflow-hidden rounded-3xl gradient-brand px-7 py-8 text-primary-foreground sm:px-10 sm:py-11">
          <div className="relative z-10 max-w-lg">
            <span className="inline-flex rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              Monday, July 27th
            </span>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Good afternoon, Sean</h1>
            <p className="mt-2 max-w-sm text-sm text-primary-foreground/85">
              Three proposals are waiting on your review and two job posts have fresh applicants.
            </p>
            <Link
              to="/post-job"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
            >
              <Plus className="size-4" />
              Post a new job
            </Link>
          </div>
          <img
            src={heroDocs}
            alt="Illustration of proposal and invoice documents"
            width={900}
            height={600}
            className="pointer-events-none absolute -right-6 top-1/2 hidden w-[420px] -translate-y-1/2 mix-blend-luminosity opacity-70 lg:block"
          />
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="surface-card p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.delta}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex min-w-0 flex-col gap-6">
            <section>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your team</h2>
                <button className="text-sm font-medium text-primary hover:underline">
                  View all
                </button>
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {team.map((m) => (
                  <div key={m.name} className="surface-card hover-lift p-5 text-center">
                    <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-soft font-display text-base font-bold text-accent-foreground">
                      {m.initials}
                    </span>
                    <p className="mt-3 flex items-center justify-center gap-1 font-semibold">
                      {m.name}
                      {m.verified && <BadgeCheck className="size-4 text-primary" />}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                    <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm font-medium transition-colors hover:bg-accent">
                      <Send className="size-3.5" />
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="surface-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Latest offers</h2>
                <div className="flex gap-1 rounded-full bg-muted p-1">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        tab === t
                          ? "bg-surface text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleOffers.map((o) => (
                  <article
                    key={o.title}
                    className="hover-lift overflow-hidden rounded-xl border border-border bg-surface"
                  >
                    <img
                      src={o.img}
                      alt={o.title}
                      width={640}
                      height={512}
                      loading="lazy"
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-xs font-medium text-muted-foreground">{o.author}</p>
                      <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">
                        {o.title}
                      </h3>
                      <div className="mt-3 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Est. {o.days} days</p>
                          <p className="font-display text-lg font-bold">${o.price}</p>
                        </div>
                        <button className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                          Order
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
                {visibleOffers.length === 0 && (
                  <p className="py-8 text-sm text-muted-foreground">No {tab.toLowerCase()} offers.</p>
                )}
              </div>
            </section>

            <section className="surface-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <h2 className="text-lg font-semibold">Your job postings</h2>
                <button
                  aria-label="Refresh job postings"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
                >
                  <RefreshCw className="size-4" />
                </button>
              </div>
              <ul className="divide-y divide-border">
                {postings.map((p) => (
                  <li
                    key={p.title}
                    className="flex flex-wrap items-center gap-4 px-6 py-5 transition-colors hover:bg-muted/60"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{p.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted px-2.5 py-1 font-medium">
                          Public · {p.type}
                        </span>
                        <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-accent-foreground">
                          Open
                        </span>
                        <span>Posted {p.posted}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-semibold ${
                          p.applicants ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {p.applicants ? `${p.applicants} new applicants` : "No new applicants"}
                      </span>
                      <Link
                        to="/jobs"
                        className="rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-accent"
                      >
                        Job post
                      </Link>
                      <Link
                        to="/talent"
                        className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        Find applicants
                      </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-center gap-2 border-t border-border px-6 py-4 text-sm">
                <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground">
                  Previous
                </button>
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={`size-8 rounded-full text-sm font-medium transition-colors ${
                      n === 1
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground">
                  Next
                </button>
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <section className="surface-card p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="text-base font-semibold">Getting started</h2>
                <span className="text-xs text-muted-foreground">
                  {tipsDone}/{tips.length}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full gradient-brand"
                  style={{ width: `${(tipsDone / tips.length) * 100}%` }}
                />
              </div>
              <ul className="mt-4 flex flex-col gap-1">
                {tips.map(({ label, icon: Icon, done }) => (
                  <li key={label}>
                    <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm transition-colors hover:bg-muted">
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                          done ? "gradient-brand text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className={done ? "text-muted-foreground line-through" : "font-medium"}>
                        {label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface-card p-6">
              <h2 className="text-base font-semibold">Recent activity</h2>
              <ul className="mt-4 flex flex-col gap-4 text-sm">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  <p>
                    <span className="font-medium">Muhammad M.</span> sent a new proposal for frontend
                    development.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary/50" />
                  <p>
                    <span className="font-medium">4 applicants</span> applied to CFL Management Team
                    Position.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-muted-foreground/40" />
                  <p>Invoice #2841 was paid to Oluwafemi A.</p>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
