import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/olb")({
  head: () => ({ meta: [{ title: "Oldenburgische Landesbank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="olb" logoSlug="olb" title="Oldenburgische Landesbank" field1Label="Zugangsnummer / Alias" field2Label="PIN / Passwort" />
  ),
});
