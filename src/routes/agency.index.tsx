import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  Clock,
  MessageSquare,
  Plus,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { AgencyShell } from "@/components/agency-shell";
import member1 from "@/assets/face-1.jpg";
import member2 from "@/assets/face-2.jpg";
import member3 from "@/assets/face-3.jpg";

export const Route = createFileRoute("/agency/")({
  head: () => ({
    meta: [
      { title: "Agency Dashboard — HypoMass | ZeeWork" },
      {
        name: "description",
        content:
          "Track agency earnings, active contracts, member utilisation and open proposals from the HypoMass agency dashboard on ZeeWork.",
      },
      { property: "og:title", content: "Agency Dashboard — HypoMass | ZeeWork" },
      {
        property: "og:description",
        content:
          "Agency earnings, contract pipeline, team utilisation and proposals in one modern dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgencyDashboardPage,
});

const kpis = [
  { label: "Agency earnings (30d)", value: "$18,420", delta: "+12.4%", icon: Wallet },
  { label: "Active contracts", value: "7", delta: "+2 this week", icon: Briefcase },
  { label: "Hours billed", value: "312h", delta: "84% utilisation", icon: Clock },
  { label: "Agency rating", value: "4.9", delta: "38 reviews", icon: Star },
];

const revenue = [
  { label: "Mar", value: 8600 },
  { label: "Apr", value: 10400 },
  { label: "May", value: 9800 },
  { label: "Jun", value: 13200 },
  { label: "Jul", value: 15600 },
  { label: "Aug", value: 18420 },
];

const contracts = [
  {
    id: "c-hypo-1",
    title: "NFT marketplace revamp",
    client: "Lumen Labs",
    member: "Mantri Islam",
    photo: member2,
    type: "Hourly · $65/hr",
    hours: "28h / 40h this week",
    progress: 70,
    billed: "$6,240",
    status: "On track",
  },
  {
    id: "c-hypo-2",
    title: "ERP dashboard build-out",
    client: "Northwind Retail",
    member: "Rafi Ahmed",
    photo: member3,
    type: "Fixed price · $9,500",
    hours: "Milestone 3 of 5",
    progress: 55,
    billed: "$5,700",
    status: "Awaiting feedback",
  },
  {
    id: "c-hypo-3",
    title: "Growth landing pages",
    client: "Kite Health",
    member: "Sagar Deyy",
    photo: member1,
    type: "Hourly · $48/hr",
    hours: "16h / 25h this week",
    progress: 64,
    billed: "$3,120",
    status: "On track",
  },
];

const bench = [
  { name: "Mantri Islam", role: "UI/UX Designer", photo: member2, util: 92, state: "Booked" },
  { name: "Rafi Ahmed", role: "Backend Developer", photo: member3, util: 74, state: "Booked" },
  { name: "Sagar Deyy", role: "Full-stack Dev", photo: member1, util: 48, state: "Partly free" },
];

const proposals = [
  { role: "Solidity auditor", client: "ChainGate", sent: "2 days ago", state: "Interviewing" },
  { role: "Design system lead", client: "Fern & Co", sent: "4 days ago", state: "Submitted" },
  { role: "Data platform build", client: "Orbit AI", sent: "1 week ago", state: "Shortlisted" },
];

function RevenueChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...revenue.map((r) => r.value));
  const w = 560;
  const h = 170;
  const pts = revenue.map((r, i) => ({
    x: (i / (revenue.length - 1)) * w,
    y: h - (r.value / max) * (h - 24) - 8,
  }));
  const path = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-44 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="agencyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="0"
            x2={w}
            y1={h * g}
            y2={h * g}
            stroke="currentColor"
            className="text-border"
            strokeDasharray="4 6"
            strokeWidth="1"
          />
        ))}
        <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#agencyFill)" />
        <path
          d={path}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hover === i ? 6 : 4}
            fill="var(--color-primary)"
            className="cursor-pointer transition-all"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        {revenue.map((r, i) => (
          <span key={r.label} className={hover === i ? "font-semibold text-foreground" : ""}>
            {r.label}
            {hover === i ? ` · $${r.value.toLocaleString()}` : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function AgencyDashboardPage() {
  return (
    <AgencyShell>
      <div className="mx-auto max-w-[1180px] space-y-5">
        {/* Greeting */}
        <section className="surface-card relative overflow-hidden p-6 sm:p-8">
          <div className="absolute -right-16 -top-20 size-64 rounded-full gradient-brand opacity-20 blur-2xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm text-muted-foreground">Friday, Aug 28</p>
              <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                Welcome back, HypoMass
              </h1>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                Your team billed 312 hours this month across 7 active contracts — 2 proposals are
                waiting on client feedback.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/freelancer/find-work"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Plus className="size-4" />
                Find new work
              </Link>
              <Link
                to="/agency/profile"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Users className="size-4" />
                Manage members
              </Link>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map(({ label, value, delta, icon: Icon }) => (
            <article key={label} className="surface-card hover-lift p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <TrendingUp className="size-3.5" />
                  {delta}
                </span>
              </div>
              <p className="mt-4 font-display text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </article>
          ))}
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            {/* Revenue */}
            <section className="surface-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-base font-semibold">Agency revenue</h2>
                  <p className="text-xs text-muted-foreground">Last 6 months, net of fees</p>
                </div>
                <Link
                  to="/freelancer/earnings"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Earnings details
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
              <div className="mt-4">
                <RevenueChart />
              </div>
            </section>

            {/* Active contracts */}
            <section className="surface-card p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-base font-semibold">Active contracts</h2>
                  <p className="text-xs text-muted-foreground">
                    Work your members are delivering right now
                  </p>
                </div>
                <Link
                  to="/contracts"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  View all
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {contracts.map((c) => (
                  <article
                    key={c.id}
                    className="hover-lift rounded-2xl border border-border p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={c.photo}
                          alt={c.member}
                          className="size-11 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="font-display text-sm font-semibold">{c.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {c.client} · {c.member}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{c.type}</p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          c.status === "On track"
                            ? "bg-primary-soft text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="min-w-40 flex-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{c.hours}</span>
                          <span className="font-semibold text-foreground">{c.billed} billed</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full gradient-brand"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to="/messages"
                          aria-label={`Message ${c.member}`}
                          className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <MessageSquare className="size-4" />
                        </Link>
                        <Link
                          to="/contracts"
                          className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          Open contract
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <section className="surface-card p-5">
              <h2 className="font-display text-base font-semibold">Team utilisation</h2>
              <div className="mt-4 space-y-4">
                {bench.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="size-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${m.util}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">{m.util}%</span>
                  </div>
                ))}
              </div>
              <Link
                to="/agency/profile"
                className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Users className="size-3.5" />
                All members
              </Link>
            </section>

            <section className="surface-card p-5">
              <h2 className="font-display text-base font-semibold">Open proposals</h2>
              <ul className="mt-4 space-y-3">
                {proposals.map((p) => (
                  <li key={p.role} className="rounded-xl bg-muted/60 p-3">
                    <p className="text-sm font-semibold">{p.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.client} · sent {p.sent}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
                      <CheckCircle2 className="size-3" />
                      {p.state}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/freelancer/proposals"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View all proposals
              </Link>
            </section>

            <section className="surface-card p-5">
              <h2 className="font-display text-base font-semibold">Upcoming</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { t: "Milestone review · Northwind", d: "Tomorrow, 10:00" },
                  { t: "Weekly invoice generated", d: "Sun, Aug 30" },
                  { t: "Kickoff call · Orbit AI", d: "Mon, Sep 1" },
                ].map((e) => (
                  <li key={e.t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <CalendarClock className="size-4" />
                    </span>
                    <div>
                      <p className="font-medium">{e.t}</p>
                      <p className="text-xs text-muted-foreground">{e.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </AgencyShell>
  );
}
