import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Star } from "lucide-react";
import personHero from "@/assets/person-hero.jpg";
import face1 from "@/assets/face-1.jpg";
import face2 from "@/assets/face-2.jpg";
import face3 from "@/assets/face-3.jpg";

type Props = {
  children: ReactNode;
  step?: { current: number; total: number };
};

export function AuthLayout({ children, step }: Props) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      {/* Form side */}
      <div className="flex min-h-screen flex-col px-5 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="ZeeWork home">
            <img src="/zeework-logo.svg" alt="ZeeWork" width={140} height={28} className="h-7 w-auto" />
          </Link>
          {step && (
            <p className="text-xs font-medium text-muted-foreground">
              Step <span className="text-foreground">{step.current}</span> of {step.total}
            </p>
          )}
        </div>

        {step && (
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full gradient-brand transition-all duration-500"
              style={{ width: `${(step.current / step.total) * 100}%` }}
            />
          </div>
        )}

        <div className="flex flex-1 items-center py-10">
          <div className="w-full max-w-[460px]">{children}</div>
        </div>

        <p className="text-xs text-muted-foreground">© 2026 ZeeWork. All rights reserved.</p>
      </div>

      {/* Visual side */}
      <aside className="relative hidden overflow-hidden lg:block">
        <img
          src={personHero}
          alt="Freelancer working at her desk"
          width={912}
          height={1200}
          className="size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 gradient-brand opacity-70 mix-blend-multiply"
        />
        <div className="absolute inset-x-10 bottom-12 text-primary-foreground">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-5 text-2xl font-semibold leading-snug">
            “ZeeWork has enabled me to increase my rates. I know what I'm bringing to the table.”
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-3">
              {[face1, face2, face3].map((f, i) => (
                <img
                  key={i}
                  src={f}
                  alt=""
                  width={400}
                  height={400}
                  className="size-9 rounded-full object-cover ring-2 ring-primary-foreground/70"
                />
              ))}
            </div>
            <p className="text-sm text-primary-foreground/85">
              Join 42,000+ teams hiring on ZeeWork
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export const authInputClass =
  "h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40";
