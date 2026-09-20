import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/trade-republic")({
  head: () => ({ meta: [{ title: "Trade Republic — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="tr" logoSlug="trade-republic" title="Trade Republic" field1Label="Telefonnummer" field2Label="Passwort" />
  ),
});
