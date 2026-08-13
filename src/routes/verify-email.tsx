import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MailCheck, RefreshCw } from "lucide-react";
import { AuthLayout } from "@/components/auth-layout";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify Your Email — ZeeWork" },
      {
        name: "description",
        content:
          "Confirm your email address to activate your ZeeWork account and start hiring vetted freelancers.",
      },
      { property: "og:title", content: "Verify Your Email — ZeeWork" },
      {
        property: "og:description",
        content: "One quick step: confirm your email to activate your ZeeWork account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const [resent, setResent] = useState(false);

  return (
    <AuthLayout step={{ current: 3, total: 4 }}>
      <span className="flex size-14 items-center justify-center rounded-3xl gradient-brand text-primary-foreground shadow-[var(--shadow-soft)]">
        <MailCheck className="size-6" />
      </span>

      <h1 className="mt-7 font-display text-4xl font-bold tracking-tight">Verify your email</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        We sent a verification link to{" "}
        <span className="font-semibold text-foreground">dylan@astracompany.co</span>. Click the link
        to activate your account — it expires in 24 hours.
      </p>

      <div className="mt-8 rounded-3xl bg-muted p-5">
        <h2 className="text-sm font-semibold">Didn't get the email?</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
          <li>• Check your spam or promotions folder</li>
          <li>• Make sure the address above is correct</li>
          <li>• Add hello@zeework.co to your contacts</li>
        </ul>
        <button
          type="button"
          onClick={() => setResent(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
        >
          <RefreshCw className="size-4" />
          {resent ? "Verification email sent" : "Resend verification email"}
        </button>
      </div>

      <Link
        to="/onboarding/business"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
      >
        I've verified my email
        <ArrowRight className="size-4" />
      </Link>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Wrong address?{" "}
        <Link to="/signup" className="font-semibold text-primary hover:underline">
          Go back and edit it
        </Link>
      </p>
    </AuthLayout>
  );
}
