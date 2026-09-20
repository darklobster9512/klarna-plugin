import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/bbbank")({
  head: () => ({ meta: [{ title: "BBBank eG — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="bbbank" logoSlug="bbbank" title="BBBank eG" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
