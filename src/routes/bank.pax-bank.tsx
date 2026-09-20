import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/pax-bank")({
  head: () => ({ meta: [{ title: "Pax-Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="pax" logoSlug="pax-bank" title="Pax-Bank für Kirche und Caritas eG" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
