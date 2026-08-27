import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function StatusPill({
  tone = "safe",
  children,
}: {
  tone?: "safe" | "danger" | "warning" | "muted";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
        tone === "safe" && "bg-safe-soft text-safe",
        tone === "danger" && "bg-danger-soft text-danger",
        tone === "warning" && "bg-warning-soft text-warning",
        tone === "muted" && "bg-secondary text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          tone === "safe" && "bg-safe",
          tone === "danger" && "bg-danger",
          tone === "warning" && "bg-warning",
          tone === "muted" && "bg-muted-foreground",
        )}
      />
      {children}
    </span>
  );
}

export function Panel({
  children,
  className,
  tone = "card",
}: {
  children: ReactNode;
  className?: string;
  tone?: "card" | "safe" | "danger" | "muted";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        tone === "card" && "border-border bg-card shadow-soft",
        tone === "safe" && "border-safe/20 bg-safe-soft",
        tone === "danger" && "border-danger/20 bg-danger-soft",
        tone === "muted" && "border-border bg-secondary",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function NavTile({
  to,
  icon: Icon,
  label,
  hint,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
  hint: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-colors hover:bg-secondary"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold leading-tight">{label}</span>
        <span className="block truncate text-sm text-muted-foreground">{hint}</span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
    </Link>
  );
}

export function TimelineItem({
  icon: Icon,
  title,
  meta,
  state = "done",
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
  state?: "done" | "active" | "pending";
}) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-full",
            state === "done" && "bg-safe-soft text-safe",
            state === "active" && "bg-danger-soft text-danger",
            state === "pending" && "bg-secondary text-muted-foreground",
          )}
        >
          <Icon className="size-4" />
        </span>
        <span className="mt-1 w-px flex-1 bg-border last:hidden" />
      </div>
      <div className="pb-6">
        <p className="text-base font-semibold leading-tight">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
      </div>
    </li>
  );
}
