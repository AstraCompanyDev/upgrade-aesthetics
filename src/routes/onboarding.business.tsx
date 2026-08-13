import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { AuthLayout, authInputClass } from "@/components/auth-layout";

export const Route = createFileRoute("/onboarding/business")({
  head: () => ({
    meta: [
      { title: "Tell Us About Your Business — ZeeWork" },
      {
        name: "description",
        content:
          "Add your business details and hiring needs so ZeeWork can match you with the right freelancers from day one.",
      },
      { property: "og:title", content: "Tell Us About Your Business — ZeeWork" },
      {
        property: "og:description",
        content: "Share a few details so we can tailor freelancer matches to your business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingBusinessPage,
});

const needs = ["Design", "Development", "Marketing", "Video", "Writing", "Data & AI"];
const sizes = ["Just me", "2–10", "11–50", "51–200", "200+"];

function OnboardingBusinessPage() {
  const [selected, setSelected] = useState<string[]>(["Design"]);
  const [size, setSize] = useState("2–10");

  const toggle = (n: string) =>
    setSelected((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  return (
    <AuthLayout step={{ current: 4, total: 4 }}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Almost there</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
        Tell us about your business
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        We'll use this to shortlist talent that fits your work.
      </p>

      <form className="mt-8 flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Business name</span>
          <input placeholder="Astra Company" className={authInputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">What do you do?</span>
          <textarea
            rows={4}
            placeholder="We build subscription products for independent studios…"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
          />
        </label>

        <div>
          <p className="text-xs font-medium text-muted-foreground">Team size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  size === s
                    ? "gradient-brand text-primary-foreground"
                    : "bg-muted hover:bg-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground">What do you need help with?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {needs.map((n) => {
              const active = selected.includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggle(n)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary-soft text-accent-foreground ring-1 ring-primary"
                      : "bg-muted hover:bg-accent"
                  }`}
                >
                  {active && <Check className="size-3.5" />}
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-3xl bg-muted p-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl gradient-brand text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <p className="text-sm text-muted-foreground">
            Profiles with business details get{" "}
            <span className="font-semibold text-foreground">3x more proposals</span> from top-rated
            freelancers.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          Save & continue
          <ArrowRight className="size-4" />
        </Link>
        <Link
          to="/dashboard"
          className="text-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Skip for now
        </Link>
      </form>
    </AuthLayout>
  );
}
