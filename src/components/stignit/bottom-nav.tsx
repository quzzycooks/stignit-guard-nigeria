import { Link } from "@tanstack/react-router";
import { Home, Radio, Users, BookOpen } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/situation-room", label: "Situation", icon: Radio },
  { to: "/contacts", label: "Contacts", icon: Users },
  { to: "/safety", label: "Safety", icon: BookOpen },
];

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 -mx-5 mt-auto border-t border-border bg-card/95 px-3 pb-3 pt-2 backdrop-blur">
      <ul className="mx-auto flex max-w-md items-stretch justify-between">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-xs font-medium"
            >
              <Icon className="size-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
