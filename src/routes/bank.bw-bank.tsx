import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/bw-bank")({
  head: () => ({ meta: [{ title: "BW-Bank / LBBW — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="bw" logoSlug="bw-bank" title="BW-Bank / LBBW" field1Label="Anmeldename oder Legitimations-ID" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
