import { createFileRoute } from "@tanstack/react-router";
import { Plus, Phone } from "lucide-react";

import { BottomNav } from "@/components/stignit/bottom-nav";
import { Panel, StatusPill } from "@/components/stignit/pieces";
import { Screen, SectionTitle, TopBar } from "@/components/stignit/screen";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Emergency Contacts — StignIt" },
      {
        name: "description",
        content:
          "Manage the people StignIt alerts with your live location when a crash is detected and you can't respond.",
      },
      { property: "og:title", content: "Emergency Contacts — StignIt" },
      {
        property: "og:description",
        content: "The people StignIt calls and texts on your behalf during an incident.",
      },
    ],
  }),
  component: ContactsScreen,
});

const contacts = [
  { name: "Chidi Okafor", relation: "Brother", phone: "+234 803 221 8890", primary: true },
  { name: "Amaka Bello", relation: "Partner", phone: "+234 807 554 1120", primary: false },
  { name: "Mrs. Ngozi Eze", relation: "Mother", phone: "+234 811 909 4432", primary: false },
];

function ContactsScreen() {
  return (
    <Screen className="pb-0">
      <TopBar backTo="/home" title="Emergency Contacts" />
      <p className="text-base leading-relaxed text-muted-foreground">
        These people receive your location, incident details and a link to the Situation Room the
        moment a welfare check goes unanswered.
      </p>

      <SectionTitle>Your circle</SectionTitle>
      <div className="space-y-3">
        {contacts.map((c) => (
          <Panel key={c.phone} className="flex items-center gap-4 p-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-base font-bold text-primary">
              {c.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold leading-tight">{c.name}</p>
              <p className="text-sm text-muted-foreground">
                {c.relation} · {c.phone}
              </p>
              {c.primary ? (
                <span className="mt-2 inline-block">
                  <StatusPill tone="safe">First to be called</StatusPill>
                </span>
              ) : null}
            </div>
            <Button variant="outline" size="icon" aria-label={`Call ${c.name}`}>
              <Phone />
            </Button>
          </Panel>
        ))}
      </div>

      <Button size="lg" variant="outline" className="mt-5 w-full">
        <Plus />
        Add a contact
      </Button>

      <div className="pb-6" />
      <BottomNav />
    </Screen>
  );
}
