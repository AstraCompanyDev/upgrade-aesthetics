import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Paperclip, Search, Send } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Talk to Your ZeeWork Freelancers" },
      {
        name: "description",
        content:
          "Chat with freelancers, share files and keep every hiring conversation organised in one ZeeWork inbox.",
      },
      { property: "og:title", content: "Messages — Talk to Your ZeeWork Freelancers" },
      {
        property: "og:description",
        content: "One inbox for every freelancer conversation, proposal and file.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MessagesPage,
});

type Thread = {
  id: string;
  name: string;
  initials: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
  messages: { from: "them" | "me"; text: string; time: string }[];
};

const threads: Thread[] = [
  {
    id: "mm",
    name: "Muhammad M.",
    initials: "MM",
    role: "Frontend Engineer",
    preview: "I've pushed the dashboard changes for review.",
    time: "2m",
    unread: 1,
    messages: [
      { from: "them", text: "Morning! Starting on the dashboard today.", time: "09:12" },
      { from: "me", text: "Perfect — focus on the offers section first.", time: "09:15" },
      { from: "them", text: "I've pushed the dashboard changes for review.", time: "10:41" },
    ],
  },
  {
    id: "rb",
    name: "Raj B.",
    initials: "RB",
    role: "DevOps Specialist",
    preview: "The staging pipeline is green now.",
    time: "1h",
    unread: 0,
    messages: [
      { from: "them", text: "Deploy failed on the build step, looking into it.", time: "Yesterday" },
      { from: "them", text: "The staging pipeline is green now.", time: "08:30" },
    ],
  },
  {
    id: "ck",
    name: "Clarisse K.",
    initials: "CK",
    role: "Brand Strategist",
    preview: "Sending the positioning doc this afternoon.",
    time: "3h",
    unread: 0,
    messages: [{ from: "them", text: "Sending the positioning doc this afternoon.", time: "07:05" }],
  },
  {
    id: "oa",
    name: "Oluwafemi A.",
    initials: "OA",
    role: "Web Designer",
    preview: "Thanks for the payment!",
    time: "2d",
    unread: 0,
    messages: [{ from: "them", text: "Thanks for the payment!", time: "Fri" }],
  },
];

function MessagesPage() {
  const [activeId, setActiveId] = useState(threads[0].id);
  const [draft, setDraft] = useState("");
  const active = threads.find((t) => t.id === activeId)!;

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1180px]">
        <header>
          <h1 className="font-display text-3xl font-bold">Messages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every freelancer conversation in one inbox.
          </p>
        </header>

        <div className="surface-card mt-6 grid overflow-hidden md:grid-cols-[300px_minmax(0,1fr)]">
          <div className="border-border md:border-r">
            <div className="relative border-b border-border p-4">
              <Search className="pointer-events-none absolute left-7 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search messages"
                aria-label="Search messages"
                className="h-10 w-full rounded-full border border-border bg-background pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <ul className="max-h-[420px] divide-y divide-border overflow-y-auto md:max-h-[520px]">
              {threads.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => setActiveId(t.id)}
                    className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors ${
                      t.id === activeId ? "bg-primary-soft/60" : "hover:bg-muted/60"
                    }`}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-xs font-bold text-accent-foreground">
                      {t.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold">{t.name}</span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">{t.time}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {t.preview}
                      </span>
                    </span>
                    {t.unread ? (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                        {t.unread}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <section className="flex min-h-[420px] flex-col md:min-h-[560px]">
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft font-display text-xs font-bold text-accent-foreground">
                {active.initials}
              </span>
              <div>
                <h2 className="text-sm font-semibold">{active.name}</h2>
                <p className="text-xs text-muted-foreground">{active.role}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-muted/30 px-5 py-6">
              {active.messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "me"
                      ? "self-end rounded-br-sm bg-primary text-primary-foreground"
                      : "self-start rounded-bl-sm border border-border bg-surface"
                  }`}
                >
                  <p>{m.text}</p>
                  <p
                    className={`mt-1 text-[11px] ${
                      m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDraft("");
              }}
              className="flex items-center gap-2 border-t border-border px-4 py-3"
            >
              <button
                type="button"
                aria-label="Attach file"
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <Paperclip className="size-4" />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Message ${active.name}`}
                aria-label="Write a message"
                className="h-10 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Send className="size-4" />
              </button>
            </form>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
