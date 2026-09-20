import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/mlp")({
  head: () => ({ meta: [{ title: "MLP Banking — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="mlp" logoSlug="mlp" title="MLP Financepilot Banking - MLP Banking AG" field1Label="Kundennummer oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
