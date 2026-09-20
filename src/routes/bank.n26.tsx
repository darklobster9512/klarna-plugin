import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/n26")({
  head: () => ({ meta: [{ title: "N26 — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="n26" logoSlug="n26" title="N26" field1Label="E-Mail" field2Label="Passwort" />
  ),
});
