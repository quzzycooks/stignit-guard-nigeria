import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Radio,
  Users,
  HeartPulse,
  BookOpen,
  Car,
  Settings,
  Inbox,
} from "lucide-react";
import { useState } from "react";

import { BottomNav } from "@/components/stignit/bottom-nav";
import { NavTile, Panel, StatusPill } from "@/components/stignit/pieces";
import { Screen, SectionTitle } from "@/components/stignit/screen";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Your Safety Dashboard — StignIt" },
      {
        name: "description",
        content:
          "See whether crash monitoring is active, trigger an SOS, and reach your emergency contacts, situation room and welfare check history.",
      },
      { property: "og:title", content: "Your Safety Dashboard — StignIt" },
      {
        property: "og:description",
        content: "Monitoring status, SOS and emergency contacts in one calm dashboard.",
      },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  const [monitoring, setMonitoring] = useState(true);

  return (
    <Screen className="pb-0">
      <header className="flex h-16 shrink-0 items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good morning,</p>
          <p className="text-lg font-bold leading-tight tracking-tight">Adaeze</p>
        </div>
        <button
          type="button"
          aria-label="Settings"
          className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"
        >
          <Settings className="size-5" />
        </button>
      </header>

      <Panel tone={monitoring ? "safe" : "muted"} className="mt-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <StatusPill tone={monitoring ? "safe" : "muted"}>
              {monitoring ? "Monitoring active" : "Monitoring paused"}
            </StatusPill>
            <p className="mt-4 text-2xl font-bold leading-tight tracking-tight">
              {monitoring ? "You're covered" : "Detection is off"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {monitoring
                ? "Crash detection is running in the background. Sensors last checked 12 seconds ago."
                : "StignIt won't detect an impact until you turn monitoring back on."}
            </p>
          </div>
          <Switch
            checked={monitoring}
            onCheckedChange={setMonitoring}
            aria-label="Toggle crash monitoring"
            className="mt-1"
          />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border/60 pt-4 text-center">
          <Stat label="Contacts" value="3" />
          <Stat label="Trips today" value="2" />
          <Stat label="Incidents" value="0" />
        </div>
      </Panel>

      <SectionTitle>Emergency</SectionTitle>
      <Panel className="flex flex-col items-center gap-4 py-7">
        <Button
          variant="sos"
          size="xl"
          className="size-40 flex-col gap-1 rounded-full animate-pulse-ring"
          asChild
        >
          <Link to="/welfare-check">
            <ShieldCheck className="!size-8" />
            <span className="text-2xl font-bold">SOS</span>
            <span className="text-xs font-medium opacity-90">Press and hold</span>
          </Link>
        </Button>
        <p className="max-w-xs text-center text-sm text-muted-foreground">
          Hold for 3 seconds to open a live incident. A short hold prevents accidental alerts.
        </p>
      </Panel>

      <SectionTitle>Recent activity</SectionTitle>
      <Panel className="flex flex-col items-center py-9 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
          <Inbox className="size-6" />
        </span>
        <p className="mt-4 text-base font-semibold">Nothing to show — that's good news</p>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Welfare checks and incidents will appear here. Your last 14 days have been clear.
        </p>
        <Button variant="outline" size="sm" className="mt-5" asChild>
          <Link to="/welfare-history">View welfare check history</Link>
        </Button>
      </Panel>

      <SectionTitle>Go to</SectionTitle>
      <div className="space-y-3 pb-6">
        <NavTile
          to="/situation-room"
          icon={Radio}
          label="Situation Room"
          hint="Live incident view and responder updates"
        />
        <NavTile
          to="/contacts"
          icon={Users}
          label="Emergency Contacts"
          hint="3 people notified when you can't respond"
        />
        <NavTile
          to="/welfare-history"
          icon={HeartPulse}
          label="Welfare Checks"
          hint="Every check StignIt has raised for you"
        />
        <NavTile
          to="/safety"
          icon={BookOpen}
          label="Safety Knowledge & Drills"
          hint="Practice the flow before you ever need it"
        />
        <NavTile
          to="/welfare-check"
          icon={Car}
          label="Simulate impact detection"
          hint="Preview the welfare check screen"
        />
      </div>

      <BottomNav />
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xl font-bold leading-none">{value}</p>
      <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
