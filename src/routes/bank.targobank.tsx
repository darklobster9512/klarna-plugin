import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/targobank")({
  head: () => ({ meta: [{ title: "TARGOBANK — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="targobank" logoSlug="targobank" title="TARGOBANK" field1Label="Benutzername" field2Label="Passwort" />
  ),
});
