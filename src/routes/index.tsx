import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Globe2,
  Menu,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
  Users,
} from "lucide-react";
import heroImg from "@/assets/landing-hero.jpg";
import trustImg from "@/assets/landing-trust.jpg";
import gigFrontend from "@/assets/gig-frontend.jpg";
import gigCloud from "@/assets/gig-cloud.jpg";
import gigWeb from "@/assets/gig-webdesign.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZeeWork — Hire Vetted Freelancers, Fast" },
      {
        name: "description",
        content:
          "ZeeWork connects you with vetted freelancers in design, development and content. Post a job, review proposals and pay securely — all in one modern workspace.",
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
  { label: "Categories", href: "#categories" },
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

const categories = [
  { img: gigWeb, title: "Graphic & Design", items: ["Logo design", "Social graphics", "Brand kits"] },
  { img: gigFrontend, title: "Web Development", items: ["Website design", "WordPress", "E-commerce"] },
  { img: gigCloud, title: "Cloud & DevOps", items: ["AWS setup", "CI/CD", "Monitoring"] },
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
    initials: "SW",
  },
  {
    quote:
      "The quality of talent is outstanding. We built our entire product team here and couldn't be happier with the results.",
    name: "Maria L.",
    role: "TechStart Inc",
    initials: "ML",
  },
  {
    quote:
      "ZeeWork changed how we staff projects. The flexibility and cost savings are genuinely game-changing.",
    name: "David O.",
    role: "Creative Studios",
    initials: "DO",
  },
];

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
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
              to="/freelancer"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Log in
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Get started
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-surface px-5 py-3 lg:hidden">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-2 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
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
            className="pointer-events-none absolute -left-32 -top-40 size-[420px] rounded-full bg-primary-soft blur-3xl"
          />
          <div className="relative mx-auto grid max-w-[1180px] gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles className="size-3.5 text-primary" />
                The world's fastest growing freelance platform
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Forget the old rules.
                <br />
                <span className="bg-clip-text text-transparent gradient-brand">Hire the best</span>{" "}
                people, right now.
              </h1>
              <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
                ZeeWork matches your brief with vetted freelancers in minutes — then handles
                contracts, milestones and payouts so you can focus on shipping.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  Hire a freelancer
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/freelancer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  Become a freelancer
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Trending:</span>
                {trending.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImg}
                alt="Freelancers collaborating remotely on laptops"
                width={1280}
                height={1024}
                className="w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-lift)]"
              />
              <div className="surface-card absolute -bottom-6 left-4 flex items-center gap-3 p-4 sm:left-8">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-accent-foreground">
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold">4.9 / 5 average rating</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3 fill-primary text-primary" />
                    ))}
                    from 42,000 reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-6 px-5 py-10 lg:grid-cols-4 lg:px-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why */}
        <section id="why" className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Why online workteams
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Top-tier talent, on your terms.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to build a remote team that performs like an in-house one.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body }) => (
              <article key={title} className="surface-card hover-lift p-7">
                <span className="flex size-12 items-center justify-center rounded-xl gradient-brand text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="bg-surface py-20">
          <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
            <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">
              Find talent the right way.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Work with the largest network of independent professionals — from quick turnarounds
              to full business transformations.
            </p>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((s) => (
                <li key={s.n} className="rounded-2xl border border-border bg-background p-7">
                  <span className="font-display text-sm font-bold text-primary">{s.n}</span>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Guarantee */}
        <section className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Guaranteed work. Guaranteed payment.
            </h2>
            <ul className="mt-8 flex flex-col gap-6">
              {guarantees.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground">
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
          <img
            src={trustImg}
            alt="Illustration of protected payments and contracts"
            width={1200}
            height={960}
            loading="lazy"
            className="w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-soft)]"
          />
        </section>

        {/* Categories */}
        <section id="categories" className="bg-surface py-20">
          <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl">Looking for something?</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Explore the most popular categories and find the right specialist for your project.
                </p>
              </div>
              <Link
                to="/talent"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Browse all talent
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {categories.map((c) => (
                <article
                  key={c.title}
                  className="hover-lift overflow-hidden rounded-2xl border border-border bg-background"
                >
                  <img
                    src={c.img}
                    alt={c.title}
                    width={640}
                    height={512}
                    loading="lazy"
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                      {c.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                    <Link
                      to="/talent"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Explore
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="stories" className="mx-auto max-w-[1180px] px-5 py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What clients say</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="surface-card flex h-full flex-col p-7">
                <Quote className="size-6 text-primary" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft font-display text-xs font-bold text-accent-foreground">
                    {t.initials}
                  </span>
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
        <section className="mx-auto max-w-[1180px] px-5 pb-20 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-brand px-7 py-14 text-center text-primary-foreground sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
              Start your journey today
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
              Crafting your digital dreams into reality.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/85">
              You can have the best people. Right now. Right here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
              >
                Hire talent
              </Link>
              <Link
                to="/freelancer"
                className="rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                Join as freelancer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
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
