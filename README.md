# StignIt Safety Hub

Design a mobile app UI for StignIt — a crash-detection safety app for the

Nigerian market. It runs always-on in the background, automatically

detects car crashes via phone sensors, and connects the user to nearby

help fast. Tone: calm, trustworthy, reassuring — this is a safety-critical

app, not a flashy consumer app. Avoid anything that feels gimmicky; think

closer to a modern insurance/emergency-services app than a social app.

Color direction: a clear "alert red" as the primary accent (used sparingly,

only for emergency/SOS actions), a reassuring secondary green for

"safe/resolved" states, neutral light background, high contrast, large

tap targets — this has to be usable one-handed, possibly by someone

shaken up after an incident.

Screens needed:

1. ONBOARDING (3–4 slides)

   - What StignIt does: detects crashes automatically, no need to manually

     call for help

   - How detection works: phone senses impact, starts a countdown

   - What happens next: emergency contacts + nearby responders get

     notified if you don't cancel in time

   - Permission priming: explain why background/location/notification

     access is needed before the OS permission prompts appear

2. SIGN UP / LOG IN

   - Toggle or tab between email and phone number sign-up

   - OTP verification step (code entry, 6 digits, resend timer)

   - Keep it to as few taps as possible — this is a safety app, friction

     here matters

3. HOME DASHBOARD (post-login)

   - Status card at top: "Monitoring active" with a clear on/off state

   - Quick-access SOS button — large, unmistakable, but not something

     that triggers by accident

   - Recent activity / nothing-to-show empty state

   - Navigation to: Situation Room (live incident view), Emergency

     Contacts, Welfare Check history, Safety Knowledge/Drills

4. WELFARE CHECK / IMPACT DETECTED (critical screen)

   - Full-screen alert state: "We detected a possible crash"

   - Large countdown timer

   - Two clear actions: "I'm OK, cancel" vs "Get help now"

   - This screen needs to be readable and operable in a stressful moment

     — big text, minimal decision load

5. SITUATION ROOM (active incident)

   - Live status of an ongoing incident: location shared, contacts

     notified, nearest help status

   - Chat/updates feed (this maps to a breakout-room chat in the backend)

Generate these as a connected flow I can click through, using a component

system (not one-off screens) so the button styles, cards, and typography

stay consistent across all five screens.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://stignit-guard-nigeria.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3099cafe-0da7-431f-a7e6-b3092a43b2d6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
