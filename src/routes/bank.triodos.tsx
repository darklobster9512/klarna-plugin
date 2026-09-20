import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/triodos")({
  head: () => ({ meta: [{ title: "Triodos Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="trio" logoSlug="triodos" title="Triodos Bank Deutschland" field1Label="Triodos-Zugang oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
