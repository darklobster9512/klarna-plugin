import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/direkt1822")({
  head: () => ({ meta: [{ title: "1822Direkt — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="d1822" logoSlug="direkt1822" title="1822Direkt" field1Label="Online-Kennung" field2Label="Online-PIN" />
  ),
});
