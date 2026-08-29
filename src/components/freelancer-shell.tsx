import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  LayoutGrid,
  Search,
  Settings,
  Wallet,
  Building2,
  Briefcase,
  MessageSquare,
  ArrowLeftRight,
  UserRound,
  Timer,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const navTop = [
  { label: "Dashboard", icon: LayoutGrid, to: "/freelancer" as const, exact: true },
  { label: "Find work", icon: Search, to: "/freelancer/find-work" as const },
  { label: "My proposals", icon: Briefcase, to: "/freelancer/proposals" as const },
];

const earningsChildren = [
  { label: "Overview", to: "/freelancer/earnings" as const, exact: true },
  { label: "Transactions", to: "/freelancer/earnings/transactions" as const },
  { label: "My Reports", to: "/freelancer/earnings/reports" as const },
];

const navBottom = [
  { label: "ZeeWork Timer", icon: Timer, to: "/timer" as const },
  { label: "My profile", icon: UserRound, to: "/freelancer/profile" as const },
  { label: "Agency profile", icon: Building2, to: "/agency/profile" as const },
  { label: "Messages", icon: MessageSquare, to: "/messages" as const, badge: 2 },
];

const itemClass =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-sidebar-accent-foreground";

function EarningsNav() {
  const onEarnings = useRouterState({
    select: (s) => s.location.pathname.startsWith("/freelancer/earnings"),
  });
  const [open, setOpen] = useState(onEarnings);
  const expanded = open || onEarnings;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!expanded)}
        aria-expanded={expanded}
        className={`w-full ${itemClass} ${
          onEarnings ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : ""
        }`}
      >
        <Wallet className="size-4" />
        Earnings
        <ChevronDown
          className={`ml-auto size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded ? (
        <div className="mt-1 ml-6 flex flex-col gap-0.5 border-l border-sidebar-accent/60 pl-3">
          {earningsChildren.map((child) => (
            <Link
              key={child.label}
              to={child.to}
              activeOptions={{ exact: Boolean(child.exact) }}
              className="rounded-lg px-3 py-2 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent/70 data-[status=active]:font-medium data-[status=active]:text-sidebar-accent-foreground"
            >
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function FreelancerShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto bg-sidebar px-5 py-6 text-sidebar-foreground lg:flex">
        <Link to="/freelancer" className="flex items-center px-2" aria-label="ZeeWork home">
          <img src="/zeework-logo-light.svg" alt="ZeeWork" className="h-7 w-auto" />
        </Link>

        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-sidebar-accent/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sidebar-accent-foreground">
          Freelancer
        </span>

        <nav className="mt-6 flex flex-col gap-1">
          {navTop.map(({ label, icon: Icon, to, exact }) => (
            <Link key={label} to={to} activeOptions={{ exact: Boolean(exact) }} className={itemClass}>
              <Icon className="size-4" />
              {label}
            </Link>
          ))}

          <EarningsNav />

          {navBottom.map(({ label, icon: Icon, to, badge }) => (
            <Link key={label} to={to} className={itemClass}>
              <Icon className="size-4" />
              {label}
              {badge ? (
                <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {badge}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-xl bg-sidebar-accent/60 p-4">
          <p className="font-display text-sm font-semibold">Available for work</p>
          <p className="mt-1 text-xs text-sidebar-foreground/70">
            Your profile is visible to clients hiring this week.
          </p>
          <Link
            to="/freelancer/settings"
            className="mt-3 flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Edit profile
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-background/80 px-5 py-4 backdrop-blur-md lg:px-10">
          <img src="/zeework-logo.svg" alt="ZeeWork" className="h-6 w-auto lg:hidden" />
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search jobs, clients, skills"
              aria-label="Search jobs"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/dashboard"
              className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <ArrowLeftRight className="size-3.5" />
              Client view
            </Link>
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
            >
              <Bell className="size-4" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive" />
            </Link>
            <Link
              to="/freelancer/settings"
              aria-label="Profile settings"
              className="hidden size-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <Settings className="size-4" />
            </Link>
            <Link
              to="/freelancer/settings"
              className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3 transition-colors hover:bg-accent"
            >
              <span className="flex size-8 items-center justify-center rounded-full gradient-brand text-xs font-semibold text-primary-foreground">
                AR
              </span>
              <span className="hidden text-sm font-medium sm:block">Amelia R.</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 px-5 pb-16 pt-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
