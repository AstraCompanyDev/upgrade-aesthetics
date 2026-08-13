import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import { AuthLayout, authInputClass } from "@/components/auth-layout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up to Hire Talent — ZeeWork" },
      {
        name: "description",
        content:
          "Create a free ZeeWork client account to post jobs, review proposals and hire vetted freelancers with secure payments.",
      },
      { property: "og:title", content: "Sign Up to Hire Talent — ZeeWork" },
      {
        property: "og:description",
        content: "Create your free client account and start hiring vetted freelancers today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

const countries = [
  "Ireland",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "Australia",
  "Singapore",
];

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      setError(true);
      return;
    }
    navigate({ to: "/verify-email" });
  };

  return (
    <AuthLayout step={{ current: 2, total: 4 }}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Client account</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Sign up to hire talent</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Free to join. You only pay when you hire.
      </p>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">First name</span>
            <input required placeholder="Dylan" className={authInputClass} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Last name</span>
            <input required placeholder="Chambers" className={authInputClass} />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Work email</span>
          <input
            required
            type="email"
            placeholder="you@company.co"
            className={authInputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Password</span>
          <div className="relative">
            <input
              required
              minLength={8}
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className={`${authInputClass} pr-12`}
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

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Country</span>
          <select required defaultValue="" className={authInputClass}>
            <option value="" disabled>
              Select country
            </option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-2 flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 rounded border-border accent-primary"
          />
          <span className="text-muted-foreground">
            Send me tips on how to find the best talent
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
              if (e.target.checked) setError(false);
            }}
            className="mt-0.5 size-4 shrink-0 rounded border-border accent-primary"
          />
          <span className="text-muted-foreground">
            I agree to the ZeeWork{" "}
            <span className="font-semibold text-primary">Terms of Service</span> and Privacy Policy
          </span>
        </label>

        {error && (
          <p className="flex items-center gap-1.5 text-sm text-destructive">
            <AlertCircle className="size-4" />
            You must accept the Terms of Service
          </p>
        )}

        <button
          type="submit"
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          Create an account
          <ArrowRight className="size-4" />
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
