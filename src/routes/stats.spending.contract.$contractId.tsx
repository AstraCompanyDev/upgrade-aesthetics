import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Clock,
  Keyboard,
  MousePointerClick,
  Receipt,
} from "lucide-react";
import {
  contractSessions,
  formatHours,
  hourlyWeeksFor,
  money,
} from "@/data/spending";

export const Route = createFileRoute("/stats/spending/contract/$contractId")({
  loader: ({ params }) => {
    const weeks = hourlyWeeksFor(params.contractId);
    if (!weeks.length) throw notFound();
    return { contract: weeks[0]!.entry.contract, freelancer: weeks[0]!.entry.freelancer };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.contract} — Time log`
      : "Contract time log";
    return {
      meta: [
        { title: `${title} | ZeeWork` },
        {
          name: "description",
          content: loaderData
            ? `Work diary for ${loaderData.contract} with ${loaderData.freelancer}: daily hours, memos, activity levels and screenshots.`
            : "Hourly contract work diary with daily time logs and screenshots.",
        },
        { property: "og:title", content: `${title} | ZeeWork` },
        {
          property: "og:description",
          content: "Day-by-day hourly time log with work memos and screen captures.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ContractDetailPage,
});

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function ContractDetailPage() {
  const { contractId } = Route.useParams();
  const weeks = useMemo(() => hourlyWeeksFor(contractId), [contractId]);
  const [weekIdx, setWeekIdx] = useState(0);
  const active = weeks[Math.min(weekIdx, weeks.length - 1)]!;
  const entry = active.entry;
  const week = active.week;

  const sessions = useMemo(() => contractSessions(entry), [entry]);
  const [dayFilter, setDayFilter] = useState<number | null>(null);
  const shown = dayFilter === null ? sessions : sessions.filter((s) => s.dayIndex === dayFilter);

  const totalHours = entry.days.reduce((a, b) => a + b, 0);
  const loggedDays = entry.days.filter((d) => d > 0).length;

  return (
    <div className="mx-auto max-w-[1180px]">
      <Link
        to="/stats/spending"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to spend details
      </Link>

      <header className="surface-card mt-4 flex flex-wrap items-center gap-4 p-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary-soft font-display text-base font-bold text-accent-foreground">
          {entry.initials}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-bold">{entry.contract}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {entry.freelancer} · Hourly contract · ${entry.rate}/hr
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Metric label="Hours this week" value={`${formatHours(totalHours)} hrs`} />
          <Metric label="Billed" value={money(totalHours * entry.rate)} />
          <Metric label="Days logged" value={`${loggedDays} / 7`} />
        </div>
      </header>

      <section className="mt-6 flex flex-wrap items-center gap-2">
        {weeks.map((w, i) => (
          <button
            key={w.week.id}
            onClick={() => {
              setWeekIdx(i);
              setDayFilter(null);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              i === weekIdx
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {w.week.label}
          </button>
        ))}
      </section>

      <section className="surface-card mt-6 p-6">
        <h2 className="inline-flex items-center gap-2 text-base font-semibold">
          <Clock className="size-4 text-primary" />
          Daily breakdown
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a day to filter the work diary below.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {dayNames.map((d, i) => {
            const hours = entry.days[i] ?? 0;
            const isActive = dayFilter === i;
            return (
              <button
                key={d}
                disabled={!hours}
                onClick={() => setDayFilter(isActive ? null : i)}
                className={`rounded-2xl border p-4 text-left transition-colors disabled:opacity-50 ${
                  isActive
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-surface hover:bg-accent"
                }`}
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {d} · {week.days[i]}
                </p>
                <p className="mt-2 font-display text-xl font-bold tabular-nums">
                  {formatHours(hours)}
                </p>
                <p className="text-xs text-muted-foreground">{money(hours * entry.rate)}</p>
              </button>
            );
          })}
        </div>
        {dayFilter !== null ? (
          <button
            onClick={() => setDayFilter(null)}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Clear day filter
          </button>
        ) : null}
      </section>

      <section className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
              <Camera className="size-4 text-primary" />
              Work diary & screenshots
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Each session includes the memo, activity level and a screen capture from{" "}
              {entry.freelancer}.
            </p>
          </div>
          <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            {shown.length} sessions
          </span>
        </div>

        {shown.length ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((s) => (
              <article key={s.id} className="surface-card overflow-hidden">
                <img
                  src={s.screenshot}
                  alt={`Screen capture from ${entry.freelancer}: ${s.memo}`}
                  loading="lazy"
                  width={960}
                  height={600}
                  className="aspect-[8/5] w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>
                      {dayNames[s.dayIndex]} {week.days[s.dayIndex]}
                    </span>
                    <span className="tabular-nums">
                      {s.start} – {s.end}
                    </span>
                  </div>
                  <p className="mt-2 font-medium">{s.memo}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.activity}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {formatHours(s.hours)} hrs
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Keyboard className="size-3.5" />
                      {s.keystrokes.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MousePointerClick className="size-3.5" />
                      {s.clicks}
                    </span>
                    <span className="ml-auto font-semibold text-foreground tabular-nums">
                      {money(s.hours * entry.rate)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="surface-card mt-5 px-6 py-10 text-center text-sm text-muted-foreground">
            No sessions logged for this day.
          </p>
        )}
      </section>

      <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Receipt className="size-4" />
        Hourly time is billed automatically each Monday afternoon (UTC).
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold tabular-nums">{value}</p>
    </div>
  );
}
