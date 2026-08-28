import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Download, CalendarDays, TrendingUp } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/stats/")({
  head: () => ({
    meta: [
      { title: "My Stats — ZeeWork Hiring Analytics" },
      {
        name: "description",
        content:
          "Track hiring spend, proposal conversion, time-to-hire and freelancer performance across all your ZeeWork jobs.",
      },
      { property: "og:title", content: "My Stats — ZeeWork Hiring Analytics" },
      {
        property: "og:description",
        content: "Spend, conversion and time-to-hire metrics for your ZeeWork workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatsPage,
});

const kpis = [
  { label: "Total spend", value: "$18,420", delta: "+12.4%", up: true },
  { label: "Hires made", value: "9", delta: "+3", up: true },
  { label: "Avg. time to hire", value: "6.2 days", delta: "-1.4 days", up: false },
  { label: "Proposal accept rate", value: "38%", delta: "+4.1%", up: true },
];

type SpendPoint = { label: string; value: number; detail: string };

const spendByWeek: SpendPoint[] = [
  { label: "Week 1", value: 42, detail: "$2,840" },
  { label: "Week 2", value: 58, detail: "$3,920" },
  { label: "Week 3", value: 35, detail: "$2,365" },
  { label: "Week 4", value: 72, detail: "$4,865" },
  { label: "Week 5", value: 64, detail: "$4,325" },
  { label: "Week 6", value: 88, detail: "$5,950" },
];

const spendByDay: SpendPoint[] = [
  { label: "Mon", value: 38, detail: "$1,520" },
  { label: "Tue", value: 55, detail: "$2,200" },
  { label: "Wed", value: 48, detail: "$1,920" },
  { label: "Thu", value: 72, detail: "$2,880" },
  { label: "Fri", value: 64, detail: "$2,560" },
  { label: "Sat", value: 28, detail: "$1,120" },
  { label: "Sun", value: 22, detail: "$880" },
];

const categories = [
  { label: "Development", pct: 46 },
  { label: "Design", pct: 27 },
  { label: "Marketing", pct: 16 },
  { label: "Operations", pct: 11 },
];

const performers = [
  { name: "Muhammad M.", initials: "MM", jobs: 4, spend: "$5,200", rating: "5.0" },
  { name: "Raj B.", initials: "RB", jobs: 3, spend: "$3,850", rating: "4.9" },
  { name: "Oluwafemi A.", initials: "OA", jobs: 2, spend: "$2,100", rating: "4.8" },
];

function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[Math.min(points.length - 1, i + 2)]!;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function SpendChart({ data }: { data: SpendPoint[] }) {
  const [active, setActive] = useState<number | null>(null);
  const W = 720;
  const H = 240;
  const PAD_X = 16;
  const PAD_TOP = 28;
  const PAD_BOTTOM = 34;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  const max = Math.max(...data.map((d) => d.value)) * 1.15;

  const points = data.map((d, i) => ({
    x: PAD_X + (i / (data.length - 1)) * innerW,
    y: PAD_TOP + innerH - (d.value / max) * innerH,
  }));
  const line = smoothPath(points);
  const area = `${line} L ${points[points.length - 1]!.x} ${PAD_TOP + innerH} L ${points[0]!.x} ${PAD_TOP + innerH} Z`;
  const gridLines = [0.25, 0.5, 0.75, 1].map((f) => PAD_TOP + innerH - f * innerH);

  return (
    <div className="mt-8">
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Total spend chart"
          onMouseLeave={() => setActive(null)}
        >
          <defs>
            <linearGradient id="spend-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="spend-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent-green, var(--primary))" />
            </linearGradient>
          </defs>

          {gridLines.map((y) => (
            <line
              key={y}
              x1={PAD_X}
              x2={W - PAD_X}
              y1={y}
              y2={y}
              stroke="var(--border)"
              strokeDasharray="4 6"
              strokeWidth="1"
            />
          ))}

          <path d={area} fill="url(#spend-area)" />
          <path
            d={line}
            fill="none"
            stroke="url(#spend-line)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {active !== null && points[active] ? (
            <line
              x1={points[active]!.x}
              x2={points[active]!.x}
              y1={PAD_TOP - 6}
              y2={PAD_TOP + innerH}
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="3 4"
              opacity="0.6"
            />
          ) : null}

          {points.map((p, i) => (
            <g key={data[i]!.label}>
              <circle
                cx={p.x}
                cy={p.y}
                r="14"
                fill="transparent"
                onMouseEnter={() => setActive(i)}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={active === i ? 6 : 4}
                fill="var(--background)"
                stroke="var(--primary)"
                strokeWidth={active === i ? 3 : 2}
                className="pointer-events-none transition-all"
              />
            </g>
          ))}

          {points.map((p, i) => (
            <text
              key={data[i]!.label}
              x={Math.min(Math.max(p.x, 34), W - 34)}
              y={H - 10}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {data[i]!.label}
            </text>
          ))}
        </svg>

        {active !== null && points[active] ? (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-xl border border-border bg-surface px-3 py-2 shadow-lg"
            style={{
              left: `${(points[active]!.x / W) * 100}%`,
              top: `${(points[active]!.y / H) * 100}%`,
            }}
          >
            <p className="text-[11px] font-medium text-muted-foreground">{data[active]!.label}</p>
            <p className="font-display text-sm font-bold">{data[active]!.detail}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatsPage() {
  const [spendView, setSpendView] = useState<"week" | "day">("week");
  const spendData = spendView === "week" ? spendByWeek : spendByDay;

  return (
    <div className="mx-auto max-w-[1180px]">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">My Stats</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How your hiring is performing over the last 6 months.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
          <Download className="size-4" />
          Export report
        </button>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="surface-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {k.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold">{k.value}</p>
            <p
              className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
                k.up ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {k.up ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {k.delta}
            </p>
            {k.label === "Total spend" ? (
              <Link
                to="/stats/spending"
                className="mt-3 inline-flex items-center gap-1 border-t border-border pt-3 text-xs font-semibold text-primary hover:underline w-full"
              >
                See where it went
                <ArrowUpRight className="size-3.5" />
              </Link>
            ) : null}
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="surface-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Total spend</h2>
              <p className="text-sm text-muted-foreground">
                {spendView === "week" ? "Invoiced per week" : "Invoiced per day"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-full border border-border bg-surface p-1">
                <button
                  type="button"
                  onClick={() => setSpendView("week")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    spendView === "week"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={spendView === "week"}
                >
                  <CalendarDays className="size-3.5" />
                  Week
                </button>
                <button
                  type="button"
                  onClick={() => setSpendView("day")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    spendView === "day"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={spendView === "day"}
                >
                  <TrendingUp className="size-3.5" />
                  Day
                </button>
              </div>
              <Link
                to="/stats/spending"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/15"
              >
                View spend details
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
          <SpendChart data={spendData} />
        </section>

        <section className="surface-card p-6">
          <h2 className="text-base font-semibold">Spend by category</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {categories.map((c) => (
              <li key={c.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.label}</span>
                  <span className="text-muted-foreground">{c.pct}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full gradient-brand"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="surface-card mt-6 overflow-hidden">
        <div className="border-b border-border px-6 py-5">
          <h2 className="text-lg font-semibold">Top freelancers</h2>
        </div>
        <ul className="divide-y divide-border">
          {performers.map((p) => (
            <li
              key={p.name}
              className="flex flex-wrap items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/60"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-bold text-accent-foreground">
                {p.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.jobs} jobs completed</p>
              </div>
              <span className="text-sm font-medium">{p.spend}</span>
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                ★ {p.rating}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
