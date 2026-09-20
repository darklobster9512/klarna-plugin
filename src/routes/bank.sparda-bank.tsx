import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/bank/sparda-bank")({
  head: () => ({
    meta: [
      { title: "Wähle deine Sparda-Bank aus — Klarna" },
      { name: "description", content: "Suche deine Sparda-Bank-Filiale und melde dich für die Sofortüberweisung an." },
      { property: "og:title", content: "Wähle deine Sparda-Bank aus — Klarna" },
      { property: "og:description", content: "Suche deine Sparda-Bank-Filiale und melde dich für die Sofortüberweisung an." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Outlet />,
});
