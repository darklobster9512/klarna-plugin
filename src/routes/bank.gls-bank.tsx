import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/gls-bank")({
  head: () => ({ meta: [{ title: "GLS Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="gls" logoSlug="gls-bank" title="GLS Bank" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
