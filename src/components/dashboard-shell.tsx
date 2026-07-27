import { Link } from "@tanstack/react-router";
import {
  Bell,
  Briefcase,
  ChartNoAxesColumn,
  LayoutGrid,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { label: "Dashboard", icon: LayoutGrid, to: "/" as const, exact: true },
  { label: "My Stats", icon: ChartNoAxesColumn, to: "/stats" as const },
  { label: "Jobs", icon: Briefcase, to: "/jobs" as const },
  { label: "Talent", icon: Users, to: "/talent" as const },
  { label: "Messages", icon: MessageSquare, to: "/messages" as const, badge: 1 },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar px-5 py-6 text-sidebar-foreground lg:flex">
        <Link to="/" className="flex items-center px-2" aria-label="ZeeWork home">
          <img src="/zeework-logo-light.svg" alt="ZeeWork" className="h-7 w-auto" />
        </Link>

        <nav className="mt-9 flex flex-col gap-1">
          {nav.map(({ label, icon: Icon, to, exact, badge }) => (
            <Link
              key={label}
              to={to}
              activeOptions={{ exact: Boolean(exact) }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-sidebar-accent-foreground"
            >
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
          <p className="font-display text-sm font-semibold">Hiring faster?</p>
          <p className="mt-1 text-xs text-sidebar-foreground/70">
            Invite vetted talent straight to your shortlist.
          </p>
          <button className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Invite talent
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-background/80 px-5 py-4 backdrop-blur-md lg:px-10">
          <img src="/zeework-logo.svg" alt="ZeeWork" className="h-6 w-auto lg:hidden" />
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search talent, jobs, offers"
              aria-label="Search"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/freelancer"
              className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <ArrowLeftRight className="size-3.5" />
              Freelancer view
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
              to="/settings/profile"
              aria-label="Settings"
              className="hidden size-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <Settings className="size-4" />
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3 transition-colors hover:bg-accent"
            >
              <span className="flex size-8 items-center justify-center rounded-full gradient-brand text-xs font-semibold text-primary-foreground">
                SW
              </span>
              <span className="hidden text-sm font-medium sm:block">Sean W.</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 px-5 pb-16 pt-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
