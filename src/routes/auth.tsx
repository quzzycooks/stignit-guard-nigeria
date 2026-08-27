import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { Screen, TopBar } from "@/components/stignit/screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to StignIt — Crash Detection Safety" },
      {
        name: "description",
        content:
          "Create your StignIt account with an email or Nigerian phone number and verify with a 6-digit code.",
      },
      { property: "og:title", content: "Sign in to StignIt" },
      {
        property: "og:description",
        content: "Fast sign-up with email or phone, verified by a 6-digit code.",
      },
    ],
  }),
  component: AuthScreen,
});

function AuthScreen() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState<"identity" | "otp">("identity");
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    if (step !== "otp" || seconds === 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, seconds]);

  if (step === "otp") {
    return (
      <Screen className="pb-8">
        <TopBar backTo="/auth" />
        <div className="flex flex-1 flex-col pt-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tight">Enter your code</h1>
          <p className="mt-3 text-base text-muted-foreground">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-foreground">{value || "your device"}</span>.
          </p>

          <div className="mt-8">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="size-13 rounded-xl border border-border bg-card text-xl font-semibold"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="mt-5">
            {seconds > 0 ? (
              <p className="text-sm text-muted-foreground">Resend code in 0:{String(seconds).padStart(2, "0")}</p>
            ) : (
              <button
                type="button"
                onClick={() => setSeconds(45)}
                className="text-sm font-semibold text-primary underline underline-offset-4"
              >
                Resend code
              </button>
            )}
          </div>
        </div>

        <div className="shrink-0 space-y-3">
          <Button
            size="lg"
            className="w-full"
            disabled={code.length < 6}
            onClick={() => navigate({ to: "/home" })}
          >
            Verify and continue
          </Button>
          <button
            type="button"
            onClick={() => setStep("identity")}
            className="w-full text-center text-sm font-semibold text-muted-foreground"
          >
            Use a different {method === "phone" ? "number" : "email"}
          </button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen className="pb-8">
      <TopBar backTo="/" />
      <div className="flex flex-1 flex-col pt-2">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
          <ShieldCheck className="size-6" />
        </span>
        <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight">
          Set up your safety profile
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Two steps. Then StignIt starts watching over your trips.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-1 rounded-2xl bg-secondary p-1">
          {(["phone", "email"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMethod(m);
                setValue("");
              }}
              className={cn(
                "h-11 rounded-xl text-sm font-semibold transition-colors",
                method === m ? "bg-card text-foreground shadow-soft" : "text-muted-foreground",
              )}
            >
              {m === "phone" ? "Phone number" : "Email"}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="identity" className="text-sm font-semibold">
            {method === "phone" ? "Mobile number" : "Email address"}
          </Label>
          <Input
            id="identity"
            inputMode={method === "phone" ? "tel" : "email"}
            autoComplete={method === "phone" ? "tel" : "email"}
            placeholder={method === "phone" ? "+234 801 234 5678" : "you@example.com"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-14 rounded-xl bg-card px-4 text-base"
          />
          <p className="text-sm text-muted-foreground">
            We only use this to verify you and reach you during an incident.
          </p>
        </div>
      </div>

      <div className="shrink-0 space-y-3">
        <Button size="lg" className="w-full" onClick={() => setStep("otp")}>
          Send verification code
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By continuing you agree to StignIt's Terms and Privacy Policy.
        </p>
      </div>
    </Screen>
  );
}
