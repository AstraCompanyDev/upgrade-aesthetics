import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, FileText, ShieldCheck } from "lucide-react";
import { findFixed, money, paymentTimeline } from "@/data/spending";

export const Route = createFileRoute("/stats/spending/payment/$paymentId")({
  loader: ({ params }) => {
    const found = findFixed(params.paymentId);
    if (!found) throw notFound();
    return { contract: found.payment.contract, milestone: found.payment.milestone };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.contract} — Payment` : "Milestone payment";
    return {
      meta: [
        { title: `${title} | ZeeWork` },
        {
          name: "description",
          content: loaderData
            ? `Payment detail for ${loaderData.milestone} on ${loaderData.contract}: escrow status, approval timeline and receipt.`
            : "Fixed price milestone payment detail with escrow status and timeline.",
        },
        { property: "og:title", content: `${title} | ZeeWork` },
        {
          property: "og:description",
          content: "Milestone payment breakdown, escrow status and approval timeline.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PaymentDetailPage,
});

function PaymentDetailPage() {
  const { paymentId } = Route.useParams();
  const found = findFixed(paymentId)!;
  const { payment, week } = found;
  const timeline = paymentTimeline(payment);
  const fee = payment.amount * 0.05;

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
          {payment.initials}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-bold">{payment.contract}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {payment.milestone} · {payment.freelancer} · {payment.date}, {week.label}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-bold tabular-nums">{money(payment.amount)}</p>
          <span
            className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              payment.status === "Released"
                ? "bg-primary-soft text-accent-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {payment.status === "Released" ? <ShieldCheck className="size-3.5" /> : null}
            {payment.status}
          </span>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="surface-card p-6">
          <h2 className="text-base font-semibold">Payment timeline</h2>
          <ol className="mt-5 flex flex-col">
            {timeline.map((e, i) => (
              <li key={e.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${
                      e.done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-surface text-muted-foreground"
                    }`}
                  >
                    {e.done ? (
                      <Check className="size-4" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-current" />
                    )}
                  </span>
                  {i < timeline.length - 1 ? (
                    <span className="my-1 w-px flex-1 bg-border" />
                  ) : null}
                </div>
                <div className="pb-6">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="font-medium">{e.label}</p>
                    <span className="text-xs text-muted-foreground">{e.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="surface-card p-6">
          <h2 className="inline-flex items-center gap-2 text-base font-semibold">
            <FileText className="size-4 text-primary" />
            Receipt
          </h2>
          <dl className="mt-4 text-sm">
            <Row label="Milestone amount" value={money(payment.amount)} />
            <Row label="Contract type" value="Fixed price" />
            <Row label="Client marketplace fee" value={money(fee)} />
            <Row label="Escrow held" value={payment.status === "Released" ? money(0) : money(payment.amount)} />
            <div className="flex items-baseline justify-between pt-4">
              <dt className="font-medium">Total charged</dt>
              <dd className="font-display text-2xl font-bold tabular-nums">
                {money(payment.amount + fee)}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">
            Funds stay in escrow until you approve the submitted work. Approving releases the
            milestone to {payment.freelancer}.
          </p>
        </section>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-border py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
