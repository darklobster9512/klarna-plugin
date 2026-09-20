import { createFileRoute } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const Route = createFileRoute("/bank/edekabank")({
  head: () => ({ meta: [{ title: "Edekabank — Login" }] }),
  component: () => (
    <BankLoginPage idPrefix="edeka" logoSlug="edekabank" title="Edekabank" field1Label="VR-NetKey oder Alias" field2Label="PIN" field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte" />
  ),
});
