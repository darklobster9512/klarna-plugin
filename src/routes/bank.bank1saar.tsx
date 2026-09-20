import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/bank1saar")({
  head: () => ({ meta: [{ title: "Bank 1 Saar eG — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="b1s" logoSlug="bank1saar" title="Bank 1 Saar eG" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
