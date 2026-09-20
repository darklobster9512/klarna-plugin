import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/comdirect")({
  head: () => ({ meta: [{ title: "Comdirect Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="comdirect" logoSlug="comdirect" title="Comdirect Bank" field1Label="Zugangsnummer" field2Label="PIN / Passwort" />
  ),
});
