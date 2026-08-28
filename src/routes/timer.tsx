import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  Apple,
  Camera,
  Check,
  Download,
  Laptop,
  MessageSquare,
  Monitor,
  Pause,
  ShieldCheck,
  Smartphone,
  Terminal,
} from "lucide-react";
import shotCode from "@/assets/shot-code.jpg";
import personDev from "@/assets/person-dev.jpg";

export const Route = createFileRoute("/timer")({
  head: () => ({
    meta: [
      { title: "ZeeWork Timer — Desktop time tracking" },
      {
        name: "description",
        content:
          "Track hours with the ZeeWork Timer desktop app. Screen captures, activity levels and hourly payment protection for every contract.",
      },
      { property: "og:title", content: "ZeeWork Timer — Desktop time tracking" },
      {
        property: "og:description",
        content:
          "Track hours with the ZeeWork Timer desktop app. Screen captures, activity levels and hourly payment protection.",
      },
    ],
  }),
  component: TimerPage,
});

const tracked = [
  "Screen captures taken at random, up to 6 times an hour",
  "Keystroke, mouse click and scroll counts as an activity level",
  "Work memos attached to each time block for context",
];

const notTracked = [
  "What you actually type or click",
  "Webcam footage or microphone audio",
  "Anything at all while the timer is paused",
];

type OsKey = "macos" | "windows" | "linux";

const platforms: { key: OsKey; label: string; note: string; icon: typeof Apple; versions: string[] }[] = [
  {
    key: "macos",
    label: "macOS",
    note: "Apple silicon & Intel",
    icon: Apple,
    versions: ["1.8.2 (latest)", "1.8.0", "1.7.4"],
  },
  {
    key: "windows",
    label: "Windows",
    note: "Windows 10 and later",
    icon: Monitor,
    versions: ["1.8.2 (latest)", "1.8.1", "1.7.4"],
  },
  {
    key: "linux",
    label: "Linux",
    note: "Ubuntu, Fedora, Debian",
    icon: Terminal,
    versions: ["1.8.2 (latest)", "1.8.0", "1.7.3"],
  },
];

function detectOs(): OsKey {
  if (typeof navigator === "undefined") return "macos";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "macos";
}

function TimerPage() {
  const detected = useMemo(detectOs, []);
  const [selected, setSelected] = useState<OsKey>(detected);
  const [version, setVersion] = useState(0);
  const active = platforms.find((p) => p.key === selected)!;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] items-center gap-6 px-5 py-4 lg:px-8">
          <Link to="/" aria-label="ZeeWork home" className="shrink-0">
            <img src="/zeework-logo.svg" alt="ZeeWork" width={140} height={28} className="h-7 w-auto" />
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Link
              to="/freelancer"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Freelancer dashboard
            </Link>
            <a
              href="#download"
              className="rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Download
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1180px] px-5 pb-6 pt-8 lg:px-8">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-primary-soft md:grid-cols-2">
            <div className="p-8 sm:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="size-3.5" /> Hourly payment protection
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
                Get the ZeeWork Timer on your desktop
              </h1>
              <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
                Log hours as you work, add memos to every block and stay covered by hourly payment
                protection — with clients seeing exactly what they pay for.
              </p>
              <div id="download" className="mt-7 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                  <Download className="size-4" /> Download for macOS
                </button>
                <span className="text-xs text-muted-foreground">Free with every ZeeWork account</span>
              </div>
            </div>

            {/* Timer widget mock */}
            <div className="flex items-center justify-center bg-sidebar p-8 sm:p-12">
              <div className="w-full max-w-[300px] rounded-3xl bg-surface p-5 shadow-[var(--shadow-lift)]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">Design system maintenance</p>
                  <span className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                    <span className="ml-auto size-4 rounded-full bg-primary-foreground" />
                  </span>
                </div>
                <p className="mt-4 font-display text-4xl font-semibold tabular-nums">03:58</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>1.30 hrs this block</span>
                  <span>7:10 of 40 hrs</span>
                </div>
                <div className="mt-4 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
                  Memo: refactoring the table component
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Latest screen capture
                </p>
                <img
                  src={shotCode}
                  alt="Latest screen capture from the work diary"
                  loading="lazy"
                  className="mt-2 aspect-[16/10] w-full rounded-xl object-cover"
                />
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Pause className="size-3.5" /> Pause any time — nothing is recorded.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment protection */}
        <section className="mx-auto grid max-w-[1180px] items-center gap-8 px-5 py-16 md:grid-cols-2 lg:px-8">
          <div className="rounded-[2.5rem] gradient-brand p-10">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-surface/90 text-primary">
              <ShieldCheck className="size-8" />
            </div>
            <p className="mt-8 font-display text-2xl font-semibold text-primary-foreground">
              Every tracked hour is billed, verified and protected.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold">Payment protection and peace of mind</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Hours logged with the timer are automatically added to the weekly invoice and backed by
              hourly payment protection. If a dispute comes up, the work diary is the record.
            </p>
            <Link
              to="/freelancer/earnings"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5"
            >
              See how earnings work
            </Link>
          </div>
        </section>

        {/* What it tracks */}
        <section className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-8 md:grid-cols-2 lg:px-8">
          <div className="order-2 md:order-1">
            <h2 className="font-display text-3xl font-semibold">What the app tracks</h2>
            <ul className="mt-6 space-y-3">
              {tracked.map((t) => (
                <li key={t} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-semibold">What it never tracks</p>
            <ul className="mt-3 space-y-2">
              {notTracked.map((t) => (
                <li key={t} className="text-sm text-muted-foreground">
                  — {t}
                </li>
              ))}
            </ul>
          </div>
          <img
            src={personDev}
            alt="Freelancer working with the ZeeWork Timer running"
            loading="lazy"
            className="order-1 aspect-[4/5] w-full rounded-[2.5rem] object-cover md:order-2"
          />
        </section>

        {/* Feature trio */}
        <section className="mx-auto grid max-w-[1180px] gap-4 px-5 py-16 sm:grid-cols-3 lg:px-8">
          {[
            {
              icon: Camera,
              title: "Visual work diary",
              body: "Captures and memos group into readable time blocks clients can scan in seconds.",
            },
            {
              icon: Activity,
              title: "Activity levels",
              body: "Keystrokes and clicks become a simple activity bar — never raw input data.",
            },
            {
              icon: MessageSquare,
              title: "Stay connected",
              body: "Messages, calls and file sharing from the same window you track time in.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card hover-lift p-6">
              <Icon className="size-5 text-primary" />
              <p className="mt-4 font-display text-lg font-semibold">{title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </section>

        {/* Platforms */}
        <section className="mx-auto max-w-[1180px] px-5 pb-16 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <h2 className="font-display text-3xl font-semibold md:w-64">Also available for</h2>
            <div className="grid flex-1 gap-3 sm:grid-cols-3">
              {platforms.map(({ label, note, icon: Icon }) => (
                <button
                  key={label}
                  className="surface-card hover-lift flex items-center gap-3 p-5 text-left"
                >
                  <Icon className="size-5 text-primary" />
                  <span>
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="block text-xs text-muted-foreground">{note}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile CTA */}
        <section className="mx-auto max-w-[1180px] px-5 pb-20 lg:px-8">
          <div className="flex flex-col items-start gap-6 rounded-[2.5rem] bg-sidebar p-10 text-sidebar-foreground sm:flex-row sm:items-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-sidebar-accent">
              <Smartphone className="size-6" />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl font-semibold">Looking for the mobile app?</p>
              <p className="mt-2 max-w-xl text-sm text-sidebar-foreground/70">
                Check messages, review offers and keep an eye on contracts from iOS or Android. Time
                tracking stays on desktop for accuracy.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
              <Laptop className="size-4" /> Get the app
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-surface">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <img src="/zeework-logo.svg" alt="ZeeWork" width={140} height={28} className="h-7 w-auto" />
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/freelancer/find-work" className="hover:text-foreground">
              Find work
            </Link>
            <Link to="/freelancer/earnings" className="hover:text-foreground">
              Earnings
            </Link>
            <Link to="/dashboard" className="hover:text-foreground">
              Client dashboard
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 ZeeWork. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
