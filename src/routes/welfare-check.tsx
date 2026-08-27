import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, MapPin, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

import { Screen } from "@/components/stignit/screen";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/welfare-check")({
  head: () => ({
    meta: [
      { title: "Possible Crash Detected — StignIt Welfare Check" },
      {
        name: "description",
        content:
          "StignIt detected a possible impact. Confirm you're OK to cancel, or get help now — contacts and nearby responders are alerted when the countdown ends.",
      },
      { property: "og:title", content: "Possible Crash Detected — StignIt" },
      {
        property: "og:description",
        content: "A full-screen welfare check with a countdown, cancel and get-help actions.",
      },
    ],
  }),
  component: WelfareCheck,
});

function WelfareCheck() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds === 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) navigate({ to: "/situation-room" });
  }, [seconds, navigate]);

  const progress = (seconds / 30) * 100;

  return (
    <Screen tone="alert" className="pb-8 text-danger-foreground">
      <div className="flex flex-1 flex-col justify-center py-10 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white/15">
          <AlertTriangle className="size-8" />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] opacity-90">
          Impact detected
        </p>
        <h1 className="mt-3 text-[2.5rem] font-bold leading-[1.1] tracking-tight">
          We detected a possible crash
        </h1>

        <div className="mx-auto mt-9 flex size-56 items-center justify-center rounded-full border-8 border-white/20">
          <div className="text-center">
            <p className="text-7xl font-bold leading-none tabular-nums">{seconds}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider opacity-90">
              seconds
            </p>
          </div>
        </div>

        <div className="mx-auto mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mx-auto mt-6 max-w-xs text-lg leading-relaxed opacity-95">
          If you don't respond, we'll share your location with your emergency contacts and the
          nearest responders.
        </p>

        <div className="mx-auto mt-6 flex items-center gap-2 text-sm opacity-90">
          <MapPin className="size-4" />
          Third Mainland Bridge, Lagos
        </div>
      </div>

      <div className="shrink-0 space-y-3">
        <Button variant="safe" size="xl" className="h-20 w-full text-2xl" asChild>
          <Link to="/home">I'm OK — cancel</Link>
        </Button>
        <Button
          size="xl"
          className="h-20 w-full bg-card text-2xl text-danger hover:bg-card/90"
          asChild
        >
          <Link to="/situation-room">
            <PhoneCall className="!size-7" />
            Get help now
          </Link>
        </Button>
      </div>
    </Screen>
  );
}
