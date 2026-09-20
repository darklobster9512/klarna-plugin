import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/c24-bank")({
  head: () => ({ meta: [{ title: "C24 Bank — Login" }] }),
  component: () => (
    <BankLoginPage
      idPrefix="c24"
      logoSlug="c24-bank"
      title="C24 Bank"
      field1Label="Mobilnummer"
      field2Label="PIN"
      field2Tooltip="Bitte verwenden Sie die PIN, die Sie auch zum Login in die C24 Bank App benötigen."
    />
  ),
});
