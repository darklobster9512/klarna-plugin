import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/dkb")({
  head: () => ({ meta: [{ title: "DKB — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="dkb" logoSlug="dkb" title="DKB" field1Label="Anmeldename" field2Label="Passwort" />
  ),
});
