import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/evangelische")({
  head: () => ({ meta: [{ title: "Evangelische Bank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="eb" logoSlug="evangelische" title="Evangelische Bank eG" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
