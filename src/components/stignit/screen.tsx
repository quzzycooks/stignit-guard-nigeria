import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Screen({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "alert" | "ink";
}) {
  return (
    <div
      className={cn(
        "min-h-dvh w-full",
        tone === "neutral" && "bg-background",
        tone === "alert" && "bg-danger",
        tone === "ink" && "bg-primary",
      )}
    >
      <div className={cn("mx-auto flex min-h-dvh w-full max-w-md flex-col px-5", className)}>
        {children}
      </div>
    </div>
  );
}

export function TopBar({
  title,
  backTo,
  right,
}: {
  title?: string;
  backTo?: string;
  right?: ReactNode;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      {backTo ? (
        <Link
          to={backTo}
          aria-label="Go back"
          className="-ml-2 flex h-11 w-11 items-center justify-center rounded-xl text-foreground hover:bg-secondary"
        >
          <ChevronLeft className="size-6" />
        </Link>
      ) : null}
      {title ? <h1 className="text-lg font-semibold tracking-tight">{title}</h1> : null}
      <div className="ml-auto flex items-center gap-2">{right}</div>
    </header>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-7 flex items-baseline justify-between">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {children}
      </h2>
      {action}
    </div>
  );
}
