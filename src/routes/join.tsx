import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Briefcase, Check, Search } from "lucide-react";
import { AuthLayout } from "@/components/auth-layout";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join ZeeWork — Client or Freelancer" },
      {
        name: "description",
        content:
          "Create your ZeeWork account in seconds. Join as a client to hire vetted freelancers, or as a freelancer to find your next project.",
      },
      { property: "og:title", content: "Join ZeeWork — Client or Freelancer" },
      {
        property: "og:description",
        content: "Pick your path: hire vetted talent or find great freelance work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JoinPage,
});

const roles = [
  {
    id: "client" as const,
    icon: Briefcase,
    title: "I'm a client",
    subtitle: "Hiring for a project",
    body: "Post a brief, compare proposals and hire vetted talent.",
  },
  {
    id: "freelancer" as const,
    icon: Search,
    title: "I'm a freelancer",
    subtitle: "Looking for work",
    body: "Build a profile, apply to jobs and get paid securely.",
  },
];

function JoinPage() {
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const navigate = useNavigate();

  return (
    <AuthLayout step={{ current: 1, total: 4 }}>
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Join as a client
        <br />
        or freelancer
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Choose how you'll use ZeeWork. You can switch views any time.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {roles.map(({ id, icon: Icon, title, subtitle, body }) => {
          const active = role === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setRole(id)}
              aria-pressed={active}
              className={`group relative rounded-3xl p-5 text-left transition-all ${
                active
                  ? "bg-primary-soft shadow-[var(--shadow-soft)] ring-2 ring-primary"
                  : "bg-muted hover:bg-accent"
              }`}
            >
              <span
                className={`flex size-11 items-center justify-center rounded-2xl ${
                  active ? "gradient-brand text-primary-foreground" : "bg-surface text-foreground"
                }`}
              >
                <Icon className="size-5" />
              </span>
              <span
                className={`absolute right-4 top-4 flex size-6 items-center justify-center rounded-full transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface"
                }`}
              >
                {active && <Check className="size-3.5" />}
              </span>
              <h2 className="mt-5 font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{body}</p>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() =>
          navigate({ to: role === "client" ? "/signup" : "/freelancer" })
        }
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
      >
        {role === "client" ? "Join as a client" : "Join as a freelancer"}
        <ArrowRight className="size-4" />
      </button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
