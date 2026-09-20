import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/vietinbank")({
  head: () => ({ meta: [{ title: "VietinBank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="viet" logoSlug="vietinbank" title="VietinBank eG" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
