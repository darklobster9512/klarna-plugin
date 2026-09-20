import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/qonto")({
  head: () => ({ meta: [{ title: "Qonto — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="qonto" logoSlug="qonto" title="Qonto" field1Label="E-Mail Adresse" field2Label="Passwort" />
  ),
});
