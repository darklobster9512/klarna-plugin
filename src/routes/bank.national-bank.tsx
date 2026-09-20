import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/national-bank")({
  head: () => ({ meta: [{ title: "National-Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="nb" logoSlug="national-bank" title="National-Bank" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
