import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Briefcase,
  Check,
  CreditCard,
  MessageSquare,
  Star,
  UserPlus,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — ZeeWork Activity Feed" },
      {
        name: "description",
        content:
          "Every proposal, message, hire and payment update across your ZeeWork account in one activity feed.",
      },
      { property: "og:title", content: "Notifications — ZeeWork Activity Feed" },
      {
        property: "og:description",
        content: "Proposals, messages, hires and payment updates in one feed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotificationsPage,
});

const tabs = ["All", "Proposals", "Messages", "Payments"] as const;

type Item = {
  id: number;
  group: (typeof tabs)[number];
  icon: typeof Bell;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

const items: Item[] = [
  {
    id: 1,
    group: "Proposals",
    icon: UserPlus,
    title: "Priya N. applied to CFL Management Team Position",
    body: "Delivery manager, $50 / hr, 5.0 rating.",
    time: "12 minutes ago",
    unread: true,
  },
  {
    id: 2,
    group: "Messages",
    icon: MessageSquare,
    title: "New message from Sofia L.",
    body: "“Sharing two layout options for the homepage hero…”",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    group: "Payments",
    icon: CreditCard,
    title: "Milestone released — $350",
    body: "Figma Designer For Website · paid to Muhammad M.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    group: "Proposals",
    icon: Briefcase,
    title: "Your posting expires in 3 days",
    body: "Business Site Backend Development is still a draft.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 5,
    group: "Messages",
    icon: Star,
    title: "Kwame B. left you a 5-star review",
    body: "“Clear brief, fast feedback, would work with again.”",
    time: "5 days ago",
    unread: false,
  },
];

function NotificationsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [read, setRead] = useState<number[]>([]);

  const visible = items.filter((i) => tab === "All" || i.group === tab);
  const unreadCount = items.filter((i) => i.unread && !read.includes(i.id)).length;

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Notifications</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {unreadCount} unread updates
            </p>
          </div>
          <button
            onClick={() => setRead(items.map((i) => i.id))}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            <Check className="size-4" />
            Mark all read
          </button>
        </header>

        <div className="mt-6 flex gap-1 overflow-x-auto rounded-full bg-muted p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                tab === t
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <section className="mt-5 grid gap-3">
          {visible.map((i) => {
            const isUnread = i.unread && !read.includes(i.id);
            const Icon = i.icon;
            return (
              <article
                key={i.id}
                className={`surface-card flex gap-4 p-5 transition-colors ${
                  isUnread ? "border-primary/40 bg-primary-soft/30" : ""
                }`}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{i.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{i.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{i.time}</p>
                </div>
                {isUnread && (
                  <button
                    onClick={() => setRead([...read, i.id])}
                    aria-label="Mark as read"
                    className="size-2.5 shrink-0 rounded-full bg-primary"
                  />
                )}
              </article>
            );
          })}
        </section>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Want fewer emails?{" "}
          <Link to="/settings/profile" className="font-medium text-primary hover:underline">
            Update notification settings
          </Link>
        </p>
      </div>
    </DashboardShell>
  );
}
