import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/bank/volksbanken")({
  head: () => ({
    meta: [
      { title: "Wähle deine Volksbank aus — Klarna" },
      { name: "description", content: "Suche deine Volksbanken-Filiale und melde dich für die Sofortüberweisung an." },
      { property: "og:title", content: "Wähle deine Volksbank aus — Klarna" },
      { property: "og:description", content: "Suche deine Volksbanken-Filiale und melde dich für die Sofortüberweisung an." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Outlet />,
});
