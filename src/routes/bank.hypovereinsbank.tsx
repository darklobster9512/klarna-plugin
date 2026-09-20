import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/hypovereinsbank")({
  head: () => ({ meta: [{ title: "HypoVereinsbank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="hvb" logoSlug="hypovereinsbank" title="HypoVereinsbank (UniCredit)" field1Label="Direct B@nking Nummer" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
