import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { AuthLayout, authInputClass } from "@/components/auth-layout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In to ZeeWork" },
      {
        name: "description",
        content:
          "Log in to your ZeeWork account to manage jobs, message freelancers and track hires from one workspace.",
      },
      { property: "og:title", content: "Log In to ZeeWork" },
      {
        property: "og:description",
        content: "Access your ZeeWork client or freelancer workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <h1 className="font-display text-4xl font-bold tracking-tight">Welcome back</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Log in to pick up where you left off.
      </p>

      <form className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Email or username</span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input required placeholder="you@company.co" className={`${authInputClass} pl-11`} />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Password</span>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`${authInputClass} pl-11 pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </label>

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="size-4 rounded border-border accent-primary" />
            Keep me signed in
          </label>
          <span className="font-semibold text-primary hover:underline">Forgot password?</span>
        </div>

        <Link
          to="/dashboard"
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          Continue with email
          <ArrowRight className="size-4" />
        </Link>
      </form>

      <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        Don't have a ZeeWork account?
        <span className="h-px flex-1 bg-border" />
      </div>

      <Link
        to="/join"
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-muted px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-accent"
      >
        Create an account
      </Link>
    </AuthLayout>
  );
}
