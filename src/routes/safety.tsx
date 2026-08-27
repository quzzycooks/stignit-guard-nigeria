import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, PlayCircle, Flame, Droplets } from "lucide-react";

import { BottomNav } from "@/components/stignit/bottom-nav";
import { NavTile, Panel } from "@/components/stignit/pieces";
import { Screen, SectionTitle, TopBar } from "@/components/stignit/screen";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety Knowledge & Drills — StignIt" },
      {
        name: "description",
        content:
          "Short guides and practice drills so you know exactly what StignIt does during a crash before it ever happens.",
      },
      { property: "og:title", content: "Safety Knowledge & Drills — StignIt" },
      {
        property: "og:description",
        content: "Practice the welfare check flow and read short roadside safety guides.",
      },
    ],
  }),
  component: SafetyScreen,
});

function SafetyScreen() {
  return (
    <Screen className="pb-0">
      <TopBar backTo="/home" title="Safety Knowledge" />

      <Panel className="flex flex-col gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
          <PlayCircle className="size-6" />
        </span>
        <div>
          <p className="text-xl font-bold leading-tight tracking-tight">Run a 30-second drill</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Practise the welfare check exactly as it appears after a real impact. Nobody is
            notified during a drill.
          </p>
        </div>
        <Button size="lg" className="w-full" asChild>
          <Link to="/welfare-check">Start drill</Link>
        </Button>
      </Panel>

      <SectionTitle>Guides</SectionTitle>
      <div className="space-y-3 pb-6">
        <NavTile
          to="/safety"
          icon={BookOpen}
          label="First 60 seconds after a crash"
          hint="What to check before you move"
        />
        <NavTile
          to="/safety"
          icon={Flame}
          label="Roadside fire risk"
          hint="When to leave the vehicle immediately"
        />
        <NavTile
          to="/safety"
          icon={Droplets}
          label="Basic bleeding control"
          hint="Pressure, elevation and what not to do"
        />
      </div>

      <BottomNav />
    </Screen>
  );
}
