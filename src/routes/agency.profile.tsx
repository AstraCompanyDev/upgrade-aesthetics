import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  ClipboardList,
  Globe2,
  Hash,
  Languages,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { AgencyShell } from "@/components/agency-shell";
import banner from "@/assets/landing-trust.jpg";
import member1 from "@/assets/face-1.jpg";
import member2 from "@/assets/face-2.jpg";
import member3 from "@/assets/face-3.jpg";

export const Route = createFileRoute("/agency/profile")({
  head: () => ({
    meta: [
      { title: "HypoMass — Agency Profile | ZeeWork" },
      {
        name: "description",
        content:
          "Manage your ZeeWork agency profile: overview, services, skills, projects, work history, company information and agency members.",
      },
      { property: "og:title", content: "HypoMass — Agency Profile | ZeeWork" },
      {
        property: "og:description",
        content:
          "Agency overview, services, team members and work history on your ZeeWork agency profile.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgencyProfilePage,
});

const services = ["Development & IT", "Sales & Marketing", "Design & Creative"];
const specialities = ["Blockchain, NFT & Cryptocurrency", "ERP/CRM Software", "Software Development"];
const skills = ["React", "Node.js", "Solidity", "Product Design", "Go-to-market"];

const companyInfo = [
  { label: "Add your agency size", icon: Users },
  { label: "Add year agency founded", icon: CalendarDays },
  { label: "Add your client focus", icon: UserRound },
  { label: "Add languages", icon: Languages },
];

const members = {
  active: [
    { name: "Mantri Islam", role: "UI/UX Designer", tag: "Figma Designer", photo: member2 },
    { name: "Rafi Ahmed", role: "Backend Developer", tag: "Node.js", photo: member3 },
  ],
  pending: [{ name: "Lina Karim", role: "Motion Designer", tag: "Invited", photo: member2 }],
  rejected: [{ name: "Tom Reyes", role: "QA Engineer", tag: "Declined", photo: member3 }],
};

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
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

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof ClipboardList;
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="size-5" />
      </span>
      <p className="mt-1 text-sm font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
      {action ? (
        <button className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft">
          <Plus className="size-3.5" />
          {action}
        </button>
      ) : null}
    </div>
  );
}

function AgencyProfilePage() {
  const [memberTab, setMemberTab] = useState<keyof typeof members>("active");
  const list = members[memberTab];

  return (
    <AgencyShell>
      <div className="mx-auto max-w-[1180px] space-y-5">
        {/* Cover banner */}
        <section className="surface-card relative overflow-hidden">
          <img
            src={banner}
            alt="HypoMass agency cover"
            className="h-48 w-full object-cover sm:h-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sidebar/90 via-sidebar/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-3 px-6 sm:px-10">
            <p className="font-display text-3xl font-bold text-sidebar-foreground sm:text-4xl">
              HypoMass
            </p>
            <p className="max-w-sm text-sm text-sidebar-foreground/80">
              We build products that create impact — design, engineering and growth in one team.
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sidebar-accent/80 px-4 py-1.5 text-xs font-medium text-sidebar-accent-foreground">
              <Globe2 className="size-3.5" />
              www.hypomass.com
            </span>
          </div>
          <div className="absolute right-4 top-4 flex gap-2">
            <button
              type="button"
              aria-label="Edit cover"
              className="inline-flex size-9 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm backdrop-blur transition-colors hover:text-primary"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Remove cover"
              className="inline-flex size-9 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm backdrop-blur transition-colors hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </section>

        {/* Identity row */}
        <section className="surface-card flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-4">
            <span className="relative flex size-14 items-center justify-center rounded-2xl gradient-brand font-display text-xl font-bold text-primary-foreground">
              H
              <button
                type="button"
                aria-label="Change agency logo"
                className="absolute -bottom-1.5 -right-1.5 inline-flex size-6 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground"
              >
                <Pencil className="size-3" />
              </button>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold">HypoMass</h1>
                <BadgeCheck className="size-5 text-primary" />
                <IconButton label="Edit agency name">
                  <Pencil className="size-3.5" />
                </IconButton>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                Agency tagline · Add office location
              </p>
            </div>
          </div>
          <Link
            to="/freelancer/profile"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Switch to freelancer profile
          </Link>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <div className="space-y-5">
            <SectionCard
              title="Overview"
              action={
                <IconButton label="Edit overview">
                  <Pencil className="size-4" />
                </IconButton>
              }
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                Add an agency overview so clients understand what you build, who you build it for
                and how your team works together on delivery.
              </p>
            </SectionCard>

            <SectionCard
              title="Services"
              action={
                <IconButton label="Edit services">
                  <Pencil className="size-4" />
                </IconButton>
              }
            >
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-foreground"
                  >
                    <Hash className="size-3.5 text-primary" />
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {specialities.map((s) => (
                  <span
                    key={s}
                    className="inline-flex rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Skills"
              action={
                <IconButton label="Add skills">
                  <Plus className="size-4" />
                </IconButton>
              }
            >
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Projects"
              action={
                <IconButton label="Add project">
                  <Plus className="size-4" />
                </IconButton>
              }
            >
              <EmptyState
                icon={Building2}
                title="You haven't added any projects yet"
                description="Showcase your best agency work here."
                action="Add project"
              />
            </SectionCard>

            <SectionCard title="Work history">
              <EmptyState
                icon={ClipboardList}
                title="You haven't completed any jobs yet"
                description="Complete your first project to build agency history."
              />
            </SectionCard>
          </div>

          {/* Sidebar column */}
          <div className="space-y-5">
            <SectionCard title="Your agency activity">
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-muted/60 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Hourly rate</p>
                    <p className="font-display text-lg font-bold">$0</p>
                  </div>
                  <IconButton label="Edit hourly rate">
                    <Pencil className="size-3.5" />
                  </IconButton>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Wallet className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Total completed jobs</p>
                    <p className="font-display text-lg font-bold">0</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Office location"
              action={
                <IconButton label="Add office location">
                  <Plus className="size-4" />
                </IconButton>
              }
            >
              <p className="text-sm text-muted-foreground">
                Add where your agency is based so clients can filter by timezone.
              </p>
            </SectionCard>

            <SectionCard title="Company information">
              <ul className="space-y-2">
                {companyInfo.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <button className="flex w-full items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-left text-sm font-medium transition-colors hover:border-primary hover:text-primary">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <Icon className="size-3.5" />
                      </span>
                      {label}
                      <Plus className="ml-auto size-4 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>

        {/* Agency members */}
        <section className="surface-card p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold">Your agency members</h2>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              <Plus className="size-4" />
              Invite member
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl bg-muted/50 p-4">
            <img
              src={member1}
              alt="Sagar Deyy"
              className="size-14 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold">Sagar Deyy</p>
              <p className="text-xs text-muted-foreground">Test developer</p>
            </div>
            <span className="ml-auto rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              Manager
            </span>
          </div>

          <div className="mt-6 flex gap-6 border-b border-border">
            {(
              [
                ["active", `Active members (${members.active.length})`],
                ["pending", `Pending members (${members.pending.length})`],
                ["rejected", `Rejected members (${members.rejected.length})`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setMemberTab(key)}
                className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${
                  memberTab === key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((m) => (
              <article key={m.name} className="hover-lift rounded-2xl border border-border p-5 text-center">
                <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {m.tag}
                </span>
                <img
                  src={m.photo}
                  alt={m.name}
                  className="mx-auto mt-4 size-16 rounded-full object-cover"
                  loading="lazy"
                />
                <p className="mt-3 text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
                <Link
                  to="/freelancer/profile"
                  className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Visit profile
                </Link>
              </article>
            ))}
            <button className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <Plus className="size-5" />
              Add member
            </button>
          </div>
        </section>
      </div>
    </AgencyShell>
  );
}
