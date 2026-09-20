import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/santander")({
  head: () => ({ meta: [{ title: "Santander — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="san" logoSlug="santander" title="Santander" field1Label="Benutzerkennung" field2Label="Passwort" />
  ),
});
