import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/bank/psd")({
  head: () => ({
    meta: [
      { title: "Wähle deine PSD Bank aus — Klarna" },
      { name: "description", content: "Suche deine PSD-Bank-Filiale und melde dich für die Sofortüberweisung an." },
      { property: "og:title", content: "Wähle deine PSD Bank aus — Klarna" },
      { property: "og:description", content: "Suche deine PSD-Bank-Filiale und melde dich für die Sofortüberweisung an." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Outlet />,
});
