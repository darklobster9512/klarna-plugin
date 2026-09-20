import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/dkm")({
  head: () => ({ meta: [{ title: "DKM — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="dkm" logoSlug="dkm" title="DKM Partner für Kirche + Caritas" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
