import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/kd-bank")({
  head: () => ({ meta: [{ title: "KD-Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="kd" logoSlug="kd-bank" title="Bank für Kirche und Diakonie - KD-Bank" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
