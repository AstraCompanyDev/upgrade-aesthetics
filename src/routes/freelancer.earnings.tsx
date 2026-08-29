import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { FreelancerShell } from "@/components/freelancer-shell";

export const Route = createFileRoute("/freelancer/earnings")({
  component: EarningsLayout,
});

const tabs = [
  { label: "Overview", to: "/freelancer/earnings" as const, exact: true },
  { label: "Transactions", to: "/freelancer/earnings/transactions" as const },
  { label: "My Reports", to: "/freelancer/earnings/reports" as const },
];

function EarningsLayout() {
  return (
    <FreelancerShell>
      <div className="mx-auto max-w-[1180px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Earnings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your income, escrow, transactions and reports across all contracts.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
            <Download className="size-4" />
            Download statement
          </button>
        </header>

        <nav className="mt-6 inline-flex rounded-full border border-border bg-surface p-1">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.to}
              activeOptions={{ exact: Boolean(tab.exact) }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <Outlet />
      </div>
    </FreelancerShell>
  );
}
