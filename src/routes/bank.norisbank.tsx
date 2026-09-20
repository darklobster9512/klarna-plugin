import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/norisbank")({
  head: () => ({ meta: [{ title: "Norisbank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="noris" logoSlug="norisbank" title="Norisbank" field1Label="Norisbank ID" field2Label="Passwort" />
  ),
});
