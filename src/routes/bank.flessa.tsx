import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/flessa")({
  head: () => ({ meta: [{ title: "Bankhaus Flessa — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="flessa" logoSlug="flessa" title="Bankhaus Max Flessa KG" field1Label="NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
