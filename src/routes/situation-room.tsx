import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Users,
  Ambulance,
  Send,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import { Panel, StatusPill, TimelineItem } from "@/components/stignit/pieces";
import { Screen, SectionTitle, TopBar } from "@/components/stignit/screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/situation-room")({
  head: () => ({
    meta: [
      { title: "Situation Room — Live Incident | StignIt" },
      {
        name: "description",
        content:
          "Follow a live StignIt incident: location shared, contacts notified, nearest responder status and a real-time updates feed.",
      },
      { property: "og:title", content: "Situation Room — Live Incident | StignIt" },
      {
        property: "og:description",
        content: "Live incident status, responder ETA and an updates feed for everyone helping.",
      },
    ],
  }),
  component: SituationRoom,
});

const feed = [
  {
    from: "StignIt",
    system: true,
    text: "Incident opened after impact detected at 09:12. Live location sharing is on.",
    time: "09:12",
  },
  {
    from: "Chidi (Brother)",
    system: false,
    text: "I've seen the alert. I'm 15 minutes away, heading there now.",
    time: "09:13",
  },
  {
    from: "Responder — LASAMBUS Unit 4",
    system: false,
    text: "Unit dispatched. Please stay in the vehicle if it is safe to do so.",
    time: "09:14",
  },
];

function SituationRoom() {
  const [message, setMessage] = useState("");

  return (
    <Screen className="pb-6">
      <TopBar
        backTo="/home"
        title="Situation Room"
        right={<StatusPill tone="danger">Live</StatusPill>}
      />

      <Panel tone="danger" className="mt-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-danger">
          Incident #SG-2481
        </p>
        <p className="mt-2 text-2xl font-bold leading-tight tracking-tight">
          Help is on the way
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Opened 09:12 · Third Mainland Bridge, Lagos · Nearest unit 6 minutes away
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="sos" className="w-full">
            <PhoneCall />
            Call responder
          </Button>
          <Button variant="safe" className="w-full" asChild>
            <Link to="/home">Mark me safe</Link>
          </Button>
        </div>
      </Panel>

      <SectionTitle>Live status</SectionTitle>
      <Panel>
        <ul>
          <TimelineItem
            icon={MapPin}
            title="Location shared"
            meta="Live GPS updating every 10 seconds · accuracy 8m"
          />
          <TimelineItem
            icon={Users}
            title="3 emergency contacts notified"
            meta="Chidi delivered · Amaka delivered · Mum ringing"
          />
          <TimelineItem
            icon={Ambulance}
            title="Nearest responder en route"
            meta="LASAMBUS Unit 4 · ETA 6 min"
            state="active"
          />
          <TimelineItem
            icon={ShieldCheck}
            title="Incident resolution"
            meta="Closes when you or a responder confirms you're safe"
            state="pending"
          />
        </ul>
      </Panel>

      <SectionTitle>Updates</SectionTitle>
      <div className="space-y-3">
        {feed.map((m) => (
          <div
            key={m.time + m.from}
            className={cn(
              "rounded-2xl border p-4",
              m.system ? "border-border bg-secondary" : "border-border bg-card shadow-soft",
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold">{m.from}</p>
              <p className="text-xs text-muted-foreground">{m.time}</p>
            </div>
            <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 -mx-5 mt-6 flex items-center gap-2 border-t border-border bg-background/95 px-5 py-3 backdrop-blur">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send an update to the room"
          className="h-13 rounded-xl bg-card px-4 text-base"
        />
        <Button size="icon" className="size-13 shrink-0" aria-label="Send update">
          <Send />
        </Button>
      </div>
    </Screen>
  );
}
