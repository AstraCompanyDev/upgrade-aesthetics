import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, MapPin, Search, Send, Star } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/talent")({
  head: () => ({
    meta: [
      { title: "Talent — Discover Vetted ZeeWork Freelancers" },
      {
        name: "description",
        content:
          "Browse vetted developers, designers and marketers, filter by skill and invite the right freelancer to your job in seconds.",
      },
      { property: "og:title", content: "Talent — Discover Vetted ZeeWork Freelancers" },
      {
        property: "og:description",
        content: "Search vetted freelancers by skill, rate and rating, then invite them to apply.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TalentPage,
});

const skills = ["All", "Development", "Design", "Marketing"] as const;

const talent = [
  {
    name: "Muhammad M.",
    initials: "MM",
    role: "Senior Frontend Engineer",
    category: "Development",
    location: "Lahore, PK",
    rate: "$45/hr",
    rating: "5.0",
    jobs: 32,
    verified: true,
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    name: "Raj B.",
    initials: "RB",
    role: "Cloud & DevOps Specialist",
    category: "Development",
    location: "Bengaluru, IN",
    rate: "$52/hr",
    rating: "4.9",
    jobs: 24,
    verified: true,
    tags: ["AWS", "CI/CD", "Terraform"],
  },
  {
    name: "Oluwafemi A.",
    initials: "OA",
    role: "Web Designer",
    category: "Design",
    location: "Lagos, NG",
    rate: "$38/hr",
    rating: "4.8",
    jobs: 19,
    verified: false,
    tags: ["Figma", "Wix", "Webflow"],
  },
  {
    name: "Clarisse K.",
    initials: "CK",
    role: "Brand Strategist",
    category: "Marketing",
    location: "Paris, FR",
    rate: "$60/hr",
    rating: "4.9",
    jobs: 14,
    verified: true,
    tags: ["Positioning", "Copywriting"],
  },
  {
    name: "Sofia L.",
    initials: "SL",
    role: "Product Designer",
    category: "Design",
    location: "Lisbon, PT",
    rate: "$55/hr",
    rating: "5.0",
    jobs: 27,
    verified: true,
    tags: ["UX Research", "Design Systems"],
  },
  {
    name: "Daniel O.",
    initials: "DO",
    role: "Growth Marketer",
    category: "Marketing",
    location: "Austin, US",
    rate: "$48/hr",
    rating: "4.7",
    jobs: 11,
    verified: false,
    tags: ["SEO", "Paid Social"],
  },
];

function TalentPage() {
  const [skill, setSkill] = useState<(typeof skills)[number]>("All");
  const [query, setQuery] = useState("");

  const visible = talent.filter(
    (t) =>
      (skill === "All" || t.category === skill) &&
      (t.name + t.role + t.tags.join(" ")).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1180px]">
        <section className="relative overflow-hidden rounded-3xl gradient-brand px-7 py-8 text-primary-foreground sm:px-10">
          <h1 className="text-3xl font-bold">Find your next hire</h1>
          <p className="mt-2 max-w-md text-sm text-primary-foreground/85">
            Every freelancer below is vetted, rated and ready to start this week.
          </p>
          <div className="relative mt-6 max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search by name, role or skill"
              aria-label="Search talent"
              className="h-12 w-full rounded-full bg-surface pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary-foreground/50"
            />
          </div>
        </section>

        <div className="mt-6 flex gap-1 rounded-full bg-muted p-1 sm:w-fit">
          {skills.map((s) => (
            <button
              key={s}
              onClick={() => setSkill(s)}
              className={`flex-1 rounded-full px-4 py-1.5 text-xs font-medium transition-colors sm:flex-none ${
                skill === s
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((t) => (
            <article key={t.name} className="surface-card hover-lift p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-bold text-accent-foreground">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 font-semibold">
                    {t.name}
                    {t.verified && <BadgeCheck className="size-4 text-primary" />}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {t.location}
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-foreground">
                  <Star className="size-3.5 text-primary" />
                  {t.rating}
                </span>
                <span>{t.jobs} jobs</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="font-display text-lg font-bold">{t.rate}</p>
                <div className="flex gap-2">
                  <button
                    aria-label={`Message ${t.name}`}
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Send className="size-4" />
                  </button>
                  <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                    Invite to job
                  </button>
                </div>
              </div>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="surface-card p-10 text-center text-sm text-muted-foreground sm:col-span-2 xl:col-span-3">
              No freelancers match your search.
            </p>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
