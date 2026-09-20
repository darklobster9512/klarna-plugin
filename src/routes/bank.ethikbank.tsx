import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/ethikbank")({
  head: () => ({ meta: [{ title: "EthikBank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="ethik" logoSlug="ethikbank" title="EthikBank eG" field1Label="NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
