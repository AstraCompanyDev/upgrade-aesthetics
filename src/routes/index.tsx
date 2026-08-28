import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  Globe2,
  Menu,
  Search,
  ShieldCheck,
  Star,
  Wallet,
  Users,
} from "lucide-react";
import personHero from "@/assets/person-hero.jpg";
import personTeam from "@/assets/person-team.jpg";
import personDev from "@/assets/person-dev.jpg";
import personDesigner from "@/assets/person-designer.jpg";
import personMarketer from "@/assets/person-marketer.jpg";
import face1 from "@/assets/face-1.jpg";
import face2 from "@/assets/face-2.jpg";
import face3 from "@/assets/face-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZeeWork — Hire Vetted Freelancers, Fast" },
      {
        name: "description",
        content:
          "ZeeWork connects you with vetted freelancers in design, development and marketing. Post a job, review proposals and pay securely — all in one modern workspace.",
      },
      { property: "og:title", content: "ZeeWork — Hire Vetted Freelancers, Fast" },
      {
        property: "og:description",
        content:
          "Post a job, review proposals and pay securely. The modern way to build a remote team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Talent", href: "#talent" },
  { label: "Why ZeeWork", href: "#why" },
  { label: "Stories", href: "#stories" },
];

const trending = ["Designer", "Developer", "WordPress", "Copywriter", "Video editor"];

const pillars = [
  {
    icon: Clock3,
    title: "Flexibility",
    body: "Ramp up and down — from a two-day sprint to a full-time embedded team.",
  },
  {
    icon: Wallet,
    title: "Cost saving",
    body: "Pay only for hours worked. Transparent hourly rates that fit any budget.",
  },
  {
    icon: Globe2,
    title: "Access to talent",
    body: "Hire the best from 150+ countries, matched to your brief in minutes.",
  },
];

const steps = [
  { n: "01", title: "Post your brief", body: "Describe the work. Our matcher shortlists talent instantly." },
  { n: "02", title: "Compare proposals", body: "Review rates, portfolios and verified reviews side by side." },
  { n: "03", title: "Hire and pay safely", body: "Milestones, contracts and invoicing handled by ZeeWork." },
];

const guarantees = [
  {
    icon: Search,
    title: "See work as it's done",
    body: "Check in on contractors as easily as if you shared an office.",
  },
  {
    icon: Users,
    title: "Build a team of experts",
    body: "Assemble a global bench that scales with your roadmap.",
  },
  {
    icon: ShieldCheck,
    title: "Zero payroll hassle",
    body: "We manage payments, invoicing and compliance for every hire.",
  },
];

const talent = [
  {
    img: personDesigner,
    name: "Mei T.",
    role: "Brand & product designer",
    rate: "$65/hr",
    rating: "5.0",
  },
  {
    img: personDev,
    name: "Marcus A.",
    role: "Full-stack engineer",
    rate: "$80/hr",
    rating: "4.9",
  },
  {
    img: personMarketer,
    name: "Elena R.",
    role: "Growth strategist",
    rate: "$55/hr",
    rating: "4.9",
  },
];

const stats = [
  { value: "500K+", label: "Freelancers" },
  { value: "1M+", label: "Projects delivered" },
  { value: "150+", label: "Countries" },
  { value: "98%", label: "Client satisfaction" },
];

const testimonials = [
  {
    quote:
      "Working with ZeeWork gives our team everything we need to move fast. Hiring world-class freelancers is finally a breeze.",
    name: "Sean W.",
    role: "CoFoundersLab",
    img: face1,
  },
  {
    quote:
      "The quality of talent is outstanding. We built our entire product team here and couldn't be happier.",
    name: "Maria L.",
    role: "TechStart Inc",
    img: face2,
  },
  {
    quote:
      "ZeeWork changed how we staff projects. The flexibility and cost savings are genuinely game-changing.",
    name: "Amara O.",
    role: "Creative Studios",
    img: face3,
  },
];

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] items-center gap-6 px-5 py-4 lg:px-8">
          <Link to="/" aria-label="ZeeWork home" className="shrink-0">
            <img src="/zeework-logo.svg" alt="ZeeWork" width={140} height={28} className="h-7 w-auto" />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Log in
            </Link>
            <Link
              to="/join"
              className="rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Get started
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="bg-surface px-5 py-3 lg:hidden">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-full px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 -top-56 size-[520px] rounded-full bg-primary-soft blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-40 size-[360px] rounded-full bg-accent/60 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-[1180px] gap-14 px-5 pb-20 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-16">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[face1, face2, face3].map((f, i) => (
                    <img
                      key={i}
                      src={f}
                      alt=""
                      width={400}
                      height={400}
                      className="size-9 rounded-full object-cover ring-2 ring-background"
                    />
                  ))}
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  <span className="text-foreground">42,000+</span> clients hiring this week
                </p>
              </div>

              <h1 className="mt-7 text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.2rem]">
                Meet the people who
                <br />
                <span className="bg-clip-text text-transparent gradient-brand">build what's next</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                ZeeWork matches your brief with vetted freelancers in minutes — then handles
                contracts, milestones and payouts so you can focus on shipping.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
                >
                  Hire a freelancer
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  Become a freelancer
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Trending:</span>
                {trending.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-3.5 py-1.5 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="overflow-hidden rounded-[3rem] rounded-tr-[8rem]">
                <img
                  src={personHero}
                  alt="Freelance designer working on a laptop at her desk"
                  width={912}
                  height={1200}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <img
                src={personTeam}
                alt="Two freelancers collaborating in a studio"
                width={1200}
                height={912}
                loading="lazy"
                className="absolute -bottom-8 -left-6 hidden w-52 rounded-[2rem] object-cover shadow-[var(--shadow-lift)] ring-4 ring-background sm:block"
              />
              <div className="absolute -top-4 right-2 flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 shadow-[var(--shadow-lift)]">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs font-semibold">4.9 average</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-8 rounded-[2.5rem] bg-surface px-8 py-10 shadow-[var(--shadow-soft)] lg:grid-cols-4 lg:px-12">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Talent */}
        <section id="talent" className="mx-auto max-w-[1180px] px-5 py-24 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Available now
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-[2.6rem]">
                Real people, ready to start today.
              </h2>
            </div>
            <Link
              to="/talent"
              className="inline-flex items-center gap-2 rounded-full bg-muted px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Browse all talent
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {talent.map((t) => (
              <article key={t.name} className="group">
                <div className="overflow-hidden rounded-[2.5rem]">
                  <img
                    src={t.img}
                    alt={`${t.name}, ${t.role}`}
                    width={912}
                    height={1104}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-3 px-1">
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-sm font-bold">{t.rate}</p>
                    <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-primary text-primary" />
                      {t.rating}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Why */}
        <section id="why" className="bg-surface py-24">
          <div className="mx-auto grid max-w-[1180px] items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
            <div className="relative">
              <div className="overflow-hidden rounded-[3rem] rounded-bl-[8rem]">
                <img
                  src={personTeam}
                  alt="A client and freelancer reviewing work together"
                  width={1200}
                  height={912}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
              <img
                src={personMarketer}
                alt="Freelancer on a video call with a client"
                width={912}
                height={1104}
                loading="lazy"
                className="absolute -bottom-10 right-0 hidden w-44 rounded-[2rem] object-cover shadow-[var(--shadow-lift)] ring-4 ring-surface md:block"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Why ZeeWork
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-[2.6rem]">
                Top-tier talent, on your terms.
              </h2>
              <ul className="mt-9 flex flex-col divide-y divide-border">
                {pillars.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full gradient-brand text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-[1180px] px-5 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-[2.6rem]">Hiring in three moves.</h2>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="relative">
                <span className="font-display text-5xl font-bold text-primary/25">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Guarantee */}
        <section className="mx-auto max-w-[1180px] px-5 pb-24 lg:px-8">
          <div className="grid items-center gap-16 rounded-[3rem] bg-surface px-8 py-14 shadow-[var(--shadow-soft)] lg:grid-cols-[0.95fr_1.05fr] lg:px-14">
            <div>
              <h2 className="text-3xl font-bold sm:text-[2.4rem]">
                Guaranteed work. Guaranteed payment.
              </h2>
              <ul className="mt-9 flex flex-col gap-7">
                {guarantees.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-accent-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <img
                src={personDev}
                alt="Developer at work in a home office"
                width={912}
                height={1104}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-[2.25rem] object-cover"
              />
              <img
                src={personDesigner}
                alt="Designer sketching concepts in a studio"
                width={912}
                height={1104}
                loading="lazy"
                className="mt-10 aspect-[3/4] w-full rounded-[2.25rem] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="stories" className="mx-auto max-w-[1180px] px-5 pb-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Client stories
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-[2.6rem]">What clients say</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex h-full flex-col">
                <blockquote className="flex-1 text-base leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="size-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1180px] px-5 pb-24 lg:px-8">
          <div className="relative overflow-hidden rounded-[3rem] gradient-brand px-8 py-16 text-primary-foreground sm:px-14">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl font-bold sm:text-[2.6rem]">
                Your next great hire is one click away.
              </h2>
              <p className="mt-4 max-w-md text-sm text-primary-foreground/85 sm:text-base">
                Join thousands of teams building with ZeeWork freelancers today.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="rounded-full bg-primary-foreground px-7 py-3.5 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
                >
                  Hire talent
                </Link>
                <Link
                  to="/join"
                  className="rounded-full bg-primary-foreground/15 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/25"
                >
                  Join as freelancer
                </Link>
              </div>
            </div>
            <img
              src={personMarketer}
              alt=""
              width={912}
              height={1104}
              loading="lazy"
              className="pointer-events-none absolute -bottom-10 right-10 hidden w-64 rounded-[2.5rem] object-cover lg:block"
            />
          </div>
        </section>
      </main>

      <footer className="bg-surface">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <img src="/zeework-logo.svg" alt="ZeeWork" width={140} height={28} className="h-7 w-auto" />
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/talent" className="hover:text-foreground">
              Find talent
            </Link>
            <Link to="/freelancer/find-work" className="hover:text-foreground">
              Find work
            </Link>
            <Link to="/post-job" className="hover:text-foreground">
              Post a job
            </Link>
            <Link to="/timer" className="hover:text-foreground">
              ZeeWork Timer
            </Link>
            <Link to="/dashboard" className="hover:text-foreground">
              Client dashboard
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 ZeeWork. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
