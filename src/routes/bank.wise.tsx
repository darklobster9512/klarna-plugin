import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/wise")({
  head: () => ({ meta: [{ title: "Wise — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="wise" logoSlug="wise" title="Wise" field1Label="E-Mail Adresse" field2Label="Passwort" />
  ),
});
