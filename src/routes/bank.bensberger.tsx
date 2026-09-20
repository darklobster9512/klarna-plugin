import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/bensberger")({
  head: () => ({ meta: [{ title: "Bensberger Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="bens" logoSlug="bensberger" title="Bensberger Bank eG" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
