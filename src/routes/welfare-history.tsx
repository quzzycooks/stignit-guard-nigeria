import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Car } from "lucide-react";

import { BottomNav } from "@/components/stignit/bottom-nav";
import { Panel, StatusPill } from "@/components/stignit/pieces";
import { Screen, SectionTitle, TopBar } from "@/components/stignit/screen";

export const Route = createFileRoute("/welfare-history")({
  head: () => ({
    meta: [
      { title: "Welfare Check History — StignIt" },
      {
        name: "description",
        content:
          "A record of every welfare check StignIt has raised, how it was resolved and how long it took.",
      },
      { property: "og:title", content: "Welfare Check History — StignIt" },
      {
        property: "og:description",
        content: "Every welfare check, how it resolved and how quickly.",
      },
    ],
  }),
  component: HistoryScreen,
});

const history = [
  {
    title: "Hard braking on Lekki–Epe Expressway",
    date: "12 Aug · 18:42",
    outcome: "Cancelled by you in 6 seconds",
  },
  {
    title: "Possible impact near Yaba",
    date: "27 Jul · 07:15",
    outcome: "Cancelled by you in 11 seconds",
  },
  {
    title: "Drill: simulated crash",
    date: "14 Jul · 12:03",
    outcome: "Practice run completed",
  },
];

function HistoryScreen() {
  return (
    <Screen className="pb-0">
      <TopBar backTo="/home" title="Welfare Checks" />
      <Panel tone="safe" className="flex items-center gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-safe/15 text-safe">
          <CheckCircle2 className="size-6" />
        </span>
        <div>
          <p className="text-base font-semibold leading-tight">No unresolved checks</p>
          <p className="text-sm text-muted-foreground">Every check so far ended safely.</p>
        </div>
      </Panel>

      <SectionTitle>Past 90 days</SectionTitle>
      <div className="space-y-3 pb-6">
        {history.map((h) => (
          <Panel key={h.date} className="flex items-start gap-4 p-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <Car className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold leading-tight">{h.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{h.date}</p>
              <span className="mt-2 inline-block">
                <StatusPill tone="safe">{h.outcome}</StatusPill>
              </span>
            </div>
          </Panel>
        ))}
      </div>
      <BottomNav />
    </Screen>
  );
}
