import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/apobank")({
  head: () => ({ meta: [{ title: "apoBank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="apo" logoSlug="apobank" title="Deutsche Apotheker- und Ärztebank" field1Label="Benutzername" field2Label="Passwort" />
  ),
});
