import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/bank/sparkassen")({
  head: () => ({
    meta: [
      { title: "Wähle deine Sparkasse aus — Klarna" },
      { name: "description", content: "Suche deine Sparkassen-Filiale und melde dich für die Sofortüberweisung an." },
      { property: "og:title", content: "Wähle deine Sparkasse aus — Klarna" },
      { property: "og:description", content: "Suche deine Sparkassen-Filiale und melde dich für die Sofortüberweisung an." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Outlet />,
});
