import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/stats")({
  component: StatsLayout,
});

const tabs = [
  { label: "Overview", to: "/stats" as const, exact: true },
  { label: "Spend details", to: "/stats/spending" as const },
];

function StatsLayout() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1180px]">
        <nav className="mb-6 inline-flex rounded-full border border-border bg-surface p-1 text-sm">
          {tabs.map((t) => (
            <Link
              key={t.label}
              to={t.to}
              activeOptions={{ exact: Boolean(t.exact) }}
              className="rounded-full px-4 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
      <Outlet />
    </DashboardShell>
  );
}
