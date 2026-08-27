import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ShieldCheck,
  Activity,
  Timer,
  BellRing,
  MapPin,
  Bell,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

import { Screen } from "@/components/stignit/screen";
import { Panel } from "@/components/stignit/pieces";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StignIt — Automatic Crash Detection & Emergency Help" },
      {
        name: "description",
        content:
          "StignIt runs quietly in the background, detects car crashes with your phone's sensors and connects you to emergency contacts and nearby responders in seconds.",
      },
      { property: "og:title", content: "StignIt — Automatic Crash Detection" },
      {
        property: "og:description",
        content:
          "Always-on crash detection that alerts your contacts and nearby responders if you can't.",
      },
    ],
  }),
  component: Onboarding,
});

type Slide = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: { icon: LucideIcon; label: string; detail: string }[];
};

const slides: Slide[] = [
  {
    icon: ShieldCheck,
    eyebrow: "Welcome to StignIt",
    title: "Help finds you, even if you can't ask for it",
    body: "StignIt stays on quietly in the background while you drive. If something happens, you don't need to unlock your phone, find a number or explain where you are.",
  },
  {
    icon: Activity,
    eyebrow: "How detection works",
    title: "Your phone senses the impact",
    body: "Motion, speed and impact sensors work together to recognise a likely crash. When the pattern matches, StignIt opens a welfare check and starts a short countdown.",
  },
  {
    icon: Timer,
    eyebrow: "What happens next",
    title: "You have 30 seconds to say you're fine",
    body: "Tap \"I'm OK\" and everything stops there. If you don't respond, your emergency contacts and the nearest verified responders receive your live location and incident details.",
  },
  {
    icon: BellRing,
    eyebrow: "Before we continue",
    title: "Why StignIt needs these permissions",
    body: "Each one exists for a single reason: to reach you when it matters. Nothing is used for advertising, and you can review activity any time.",
    bullets: [
      {
        icon: Activity,
        label: "Background activity",
        detail: "Detection has to keep running when your screen is off.",
      },
      {
        icon: MapPin,
        label: "Location",
        detail: "Responders need an accurate place to come to.",
      },
      {
        icon: Bell,
        label: "Notifications",
        detail: "So the welfare check reaches you loudly and fast.",
      },
    ],
  },
];

function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const slide = slides[index];
  const Icon = slide.icon;
  const isLast = index === slides.length - 1;

  return (
    <Screen className="pb-8">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <span className="text-base font-bold tracking-tight">StignIt</span>
        {!isLast ? (
          <Link to="/auth" className="text-sm font-semibold text-muted-foreground">
            Skip
          </Link>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-center py-6">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Icon className="size-8" />
        </span>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {slide.eyebrow}
        </p>
        <h1 className="mt-3 text-[2rem] font-bold leading-[1.15] tracking-tight">{slide.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{slide.body}</p>

        {slide.bullets ? (
          <div className="mt-6 space-y-3">
            {slide.bullets.map((b) => (
              <Panel key={b.label} className="flex items-start gap-4 p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <b.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-base font-semibold leading-tight">{b.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{b.detail}</span>
                </span>
              </Panel>
            ))}
          </div>
        ) : null}
      </div>

      <div className="shrink-0 space-y-4">
        <div className="flex justify-center gap-2">
          {slides.map((s, i) => (
            <span
              key={s.title}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-7 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={() => (isLast ? navigate({ to: "/auth" }) : setIndex(index + 1))}
        >
          {isLast ? "Allow and continue" : "Continue"}
          <ChevronRight />
        </Button>
        {isLast ? (
          <Link
            to="/auth"
            className="block text-center text-sm font-semibold text-muted-foreground"
          >
            Not now — set up later
          </Link>
        ) : null}
      </div>
    </Screen>
  );
}
