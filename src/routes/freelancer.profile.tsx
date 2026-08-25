import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Github,
  GraduationCap,
  Link2,
  MapPin,
  Pencil,
  Plus,
  Star,
  Trash2,
  Briefcase,
  Building2,
  MessageSquareCode,
} from "lucide-react";
import { FreelancerShell } from "@/components/freelancer-shell";
import avatar from "@/assets/face-1.jpg";
import projectCover from "@/assets/gig-frontend.jpg";

export const Route = createFileRoute("/freelancer/profile")({
  head: () => ({
    meta: [
      { title: "Sagar D. — Freelancer Profile | ZeeWork" },
      {
        name: "description",
        content:
          "Full-stack freelancer profile on ZeeWork: hourly rate, skills, portfolio projects, gigs, education, experience, linked accounts and complete work history.",
      },
      { property: "og:title", content: "Sagar D. — Freelancer Profile | ZeeWork" },
      {
        property: "og:description",
        content:
          "Senior software engineer profile with skills, portfolio, gigs and verified work history on ZeeWork.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreelancerProfilePage,
});

const stats = [
  { label: "Total earnings", value: "$32.4k" },
  { label: "Jobs completed", value: "48" },
  { label: "Job success", value: "98%" },
  { label: "Total hours", value: "1,240" },
];

const skills = [
  "Sentiment Analysis",
  "Language Translation",
  "Voice-to-Text Conversion",
  "Speech Synthesis",
  "React",
  "TypeScript",
];

const education = [
  { school: "Dhaka University", degree: "CSE", years: "2024 to 2024" },
  { school: "bla bla university", degree: "Degree", years: "2024 to 2024" },
];

const experience = [
  {
    company: "CoFoundersLab",
    role: "CEO At Microsoft",
    meta: "USA | 2023 to 2024",
    note: "ABC",
  },
];

const workHistory: { title: string; rating: number | null; feedback: string; amount: string; type: string }[] = [
  {
    title: "Electron Developer",
    rating: 0,
    feedback: "Feedback message isn't available!",
    amount: "$100",
    type: "Fixed Price",
  },
  {
    title: "System Design Expert For One Hour Consultancy ($10)",
    rating: 0,
    feedback: "Feedback message isn't available!",
    amount: "$100",
    type: "Fixed Price",
  },
  {
    title: "Stripe Consultancy For 5Min.",
    rating: 5,
    feedback: "Great freelancer love his work! Highly recommended.",
    amount: "$10",
    type: "Fixed Price",
  },
  {
    title: "AI & Product Development Consultancy Needed (1hr)",
    rating: 5,
    feedback:
      "It was a really good experience working with Sagar on this project. The requirements were clear from the start, communication was smooth, and everything was handled professionally. Deadlines were realistic and Sagar was always available to discuss details when needed.",
    amount: "$100",
    type: "Fixed Price",
  },
  {
    title: "System Design Consultant (1-Hour Advisory) - $50",
    rating: 5,
    feedback: "Great Job done by this man",
    amount: "$50",
    type: "Fixed Price",
  },
  {
    title: "Hiring For Design The System.",
    rating: 5,
    feedback: "Highly recomended freelancer he did such nice job...",
    amount: "$10",
    type: "Fixed Price",
  },
  {
    title: "Backend Developer",
    rating: 5,
    feedback: "He is a great dev & team lead.",
    amount: "$45",
    type: "Hourly Rate",
  },
  {
    title: "Front End Developer",
    rating: 5,
    feedback: "Great to work with him he is a cool guy!!",
    amount: "$15",
    type: "Hourly Rate",
  },
  {
    title: "Test Marketing Job",
    rating: 0,
    feedback: "Feedback messages isn't available!",
    amount: "$10",
    type: "Fixed Price",
  },
];

const inProgress: { title: string; rating: number | null; feedback: string; amount: string; type: string }[] = [
  {
    title: "Design system refresh for fintech dashboard",
    rating: null,
    feedback: "Milestone 2 of 4 in review — on track for Friday.",
    amount: "$2,400",
    type: "Fixed Price",
  },
  {
    title: "Realtime chat feature build",
    rating: null,
    feedback: "18h logged this week.",
    amount: "$45",
    type: "Hourly Rate",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <span className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`size-3.5 ${
              i <= rating ? "fill-primary text-primary" : "fill-muted text-muted"
            }`}
          />
        ))}
      </span>
      <span className="text-xs font-semibold text-muted-foreground">{rating}</span>
    </span>
  );
}

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-semibold">{title}</h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}

function FreelancerProfilePage() {
  const [tab, setTab] = useState<"completed" | "progress">("completed");
  const items = tab === "completed" ? workHistory : inProgress;

  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1180px] space-y-5">
        {/* Identity header */}
        <header className="surface-card overflow-hidden">
          <div className="gradient-brand h-24" />
          <div className="flex flex-wrap items-end justify-between gap-4 px-6 pb-6">
            <div className="flex items-end gap-4">
              <div className="relative -mt-10">
                <img
                  src={avatar}
                  alt="Sagar D."
                  className="size-20 rounded-2xl border-4 border-card object-cover"
                />
                <button
                  type="button"
                  aria-label="Change photo"
                  className="absolute -right-2 -top-2 inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                >
                  <Pencil className="size-3.5" />
                </button>
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold">Sagar D.</h1>
                  <BadgeCheck className="size-5 text-primary" />
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  India, 2:48 PM local time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <IconButton label="Edit profile details">
                <Pencil className="size-4" />
              </IconButton>
              <Link
                to="/freelancer/settings"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Profile settings
              </Link>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Sidebar column */}
          <div className="space-y-5">
            <SectionCard title="Freelance stats">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-muted/60 p-3">
                    <p className="font-display text-lg font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Associated with">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  ZP
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary">Zero Plex</p>
                  <p className="text-xs text-muted-foreground">From 12/24 to Present</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Education"
              action={
                <IconButton label="Add education">
                  <Plus className="size-4" />
                </IconButton>
              }
            >
              <ul className="space-y-4">
                {education.map((e) => (
                  <li key={e.school} className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <GraduationCap className="mt-0.5 size-4 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">{e.school}</p>
                        <p className="text-xs text-muted-foreground">{e.degree}</p>
                        <p className="text-xs text-muted-foreground">{e.years}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <IconButton label={`Edit ${e.school}`}>
                        <Pencil className="size-3.5" />
                      </IconButton>
                      <IconButton label={`Delete ${e.school}`}>
                        <Trash2 className="size-3.5" />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard
              title="Experience"
              action={
                <IconButton label="Add experience">
                  <Plus className="size-4" />
                </IconButton>
              }
            >
              <ul className="space-y-4">
                {experience.map((x) => (
                  <li key={x.company} className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <Building2 className="mt-0.5 size-4 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">{x.company}</p>
                        <p className="text-xs font-medium">{x.role}</p>
                        <p className="text-xs text-muted-foreground">{x.meta}</p>
                        <p className="text-xs text-muted-foreground">{x.note}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <IconButton label={`Edit ${x.company}`}>
                        <Pencil className="size-3.5" />
                      </IconButton>
                      <IconButton label={`Delete ${x.company}`}>
                        <Trash2 className="size-3.5" />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard
              title="Linked accounts"
              action={
                <IconButton label="Link an account">
                  <Plus className="size-4" />
                </IconButton>
              }
            >
              <div className="space-y-3">
                <div className="rounded-xl border border-border p-3">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Github className="size-4" /> GitHub
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Not connected</p>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <MessageSquareCode className="size-4" /> StackOverflow
                    </p>
                    <span className="text-[11px] text-muted-foreground">Since 2020</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Sagar Dey</p>
                  <button className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                    <Link2 className="size-3.5" /> View profile
                  </button>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Main column */}
          <div className="space-y-5">
            <section className="surface-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="font-display text-xl font-semibold">
                  Senior Software Engineer | Full-Stack Developer
                </h2>
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl font-bold text-primary">$45/hr</span>
                  <IconButton label="Edit headline and rate">
                    <Pencil className="size-4" />
                  </IconButton>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Seasoned software engineer with over a decade of experience in full-stack
                development. With a passion for building robust and scalable applications, Sagar
                has a proven track record of delivering high-quality software solutions tailored to
                meet client needs across fintech, AI tooling and marketplace products.
              </p>
              <button className="mt-2 text-sm font-semibold text-primary hover:underline">
                more
              </button>
            </section>

            <SectionCard
              title="Skills"
              action={
                <IconButton label="Edit skills">
                  <Pencil className="size-4" />
                </IconButton>
              }
            >
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-foreground"
                  >
                    <Briefcase className="size-3.5 text-primary" />
                    {s}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Portfolio projects"
              action={
                <IconButton label="Add portfolio project">
                  <Plus className="size-4" />
                </IconButton>
              }
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <article className="hover-lift overflow-hidden rounded-2xl border border-border">
                  <img
                    src={projectCover}
                    alt="Test project cover"
                    className="h-32 w-full object-cover"
                    loading="lazy"
                  />
                  <p className="p-3 text-sm font-semibold text-primary">This is a test project</p>
                </article>
                <button className="flex h-full min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Plus className="size-5" />
                  Add project
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Your gigs">
              <p className="text-sm text-muted-foreground">
                Gigs are a new way to earn on ZeeWork. Create project offerings that highlight your
                strengths and attract more clients.
              </p>
              <Link
                to="/freelancer/find-work"
                className="mt-4 inline-flex rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
              >
                Manage gigs
              </Link>
            </SectionCard>

            <section className="surface-card p-6">
              <h2 className="font-display text-base font-semibold">Work history</h2>
              <div className="mt-4 flex gap-6 border-b border-border">
                {(
                  [
                    ["completed", `Completed jobs (${workHistory.length})`],
                    ["progress", `In progress (${inProgress.length})`],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${
                      tab === key
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <ul className="divide-y divide-border">
                {items.map((job) => (
                  <li key={job.title} className="py-5">
                    <p className="font-medium text-primary">{job.title}</p>
                    {job.rating !== null ? (
                      <div className="mt-2">
                        <Stars rating={job.rating} />
                      </div>
                    ) : null}
                    <p className="mt-2 text-sm text-muted-foreground">{job.feedback}</p>
                    <div className="mt-3 flex items-center gap-6 text-sm">
                      <span className="font-display font-semibold">{job.amount}</span>
                      <span className="text-muted-foreground">{job.type}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </FreelancerShell>
  );
}
