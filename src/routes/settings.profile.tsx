import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CreditCard, Lock, ShieldCheck, User } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/settings/profile")({
  head: () => ({
    meta: [
      { title: "Profile Settings — ZeeWork Account" },
      {
        name: "description",
        content:
          "Update your ZeeWork name, company details, notification preferences, password and billing method.",
      },
      { property: "og:title", content: "Profile Settings — ZeeWork Account" },
      {
        property: "og:description",
        content: "Manage your account details, notifications, security and billing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfileSettingsPage,
});

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40";

const sections = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
] as const;

const toggles = [
  { label: "New proposals on my jobs", desc: "Email me as soon as someone applies." },
  { label: "Messages", desc: "Push notification for every new message." },
  { label: "Payment receipts", desc: "Email a receipt when a milestone is released." },
  { label: "Product updates", desc: "Occasional news about new ZeeWork features." },
];

function ProfileSettingsPage() {
  const [section, setSection] = useState<(typeof sections)[number]["id"]>("account");
  const [saved, setSaved] = useState(false);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1080px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Profile settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage how you appear to freelancers and how we reach you.
            </p>
          </div>
          <Link
            to="/profile"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            View public profile
          </Link>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm transition-colors ${
                  section === id
                    ? "bg-primary-soft font-semibold text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </nav>

          <form
            className="grid gap-5 surface-card p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            {section === "account" && (
              <>
                <div className="flex items-center gap-4">
                  <span className="flex size-16 items-center justify-center rounded-2xl gradient-brand text-lg font-bold text-primary-foreground">
                    SW
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Upload photo
                  </button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Full name</span>
                    <input className={inputClass} defaultValue="Sean W." />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Email</span>
                    <input className={inputClass} type="email" defaultValue="sean@zeework.co" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Company</span>
                    <input className={inputClass} defaultValue="ZeeWork Operations" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Location</span>
                    <input className={inputClass} defaultValue="London, UK" />
                  </label>
                </div>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">About</span>
                  <textarea
                    rows={4}
                    defaultValue="We hire specialists for design, frontend and backend work."
                    className="w-full rounded-xl border border-border bg-surface p-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
                  />
                </label>
              </>
            )}

            {section === "notifications" && (
              <div className="grid gap-3">
                {toggles.map((t, i) => (
                  <label
                    key={t.label}
                    className="flex items-start gap-3 rounded-xl border border-border p-4"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={i < 3}
                      className="mt-0.5 size-4 accent-[var(--primary)]"
                    />
                    <span>
                      <span className="block text-sm font-medium">{t.label}</span>
                      <span className="block text-sm text-muted-foreground">{t.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            )}

            {section === "security" && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Current password</span>
                    <input className={inputClass} type="password" placeholder="••••••••" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">New password</span>
                    <input className={inputClass} type="password" placeholder="••••••••" />
                  </label>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-muted p-4">
                  <ShieldCheck className="mt-0.5 size-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Two-factor authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add a second step when signing in from a new device.
                    </p>
                    <button
                      type="button"
                      className="mt-3 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </>
            )}

            {section === "billing" && (
              <>
                <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border p-4">
                  <CreditCard className="size-5 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">Visa ending 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 08 / 2028 · Default</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                  >
                    Replace
                  </button>
                </div>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Billing email</span>
                  <input className={inputClass} type="email" defaultValue="billing@zeework.co" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">VAT number</span>
                  <input className={inputClass} placeholder="GB123456789" />
                </label>
              </>
            )}

            {saved && (
              <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-medium text-accent-foreground">
                Settings saved.
              </p>
            )}

            <div className="flex flex-wrap gap-3 border-t border-border pt-5">
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Save changes
              </button>
              <button
                type="button"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
