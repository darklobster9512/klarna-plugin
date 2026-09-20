import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";

export const Route = createFileRoute("/bank")({
  head: () => ({
    meta: [
      { title: "Wähle deine Bank aus — Klarna" },
      { name: "description", content: "Suche deine Bank und melde dich für die Sofortüberweisung an." },
      { property: "og:title", content: "Wähle deine Bank aus — Klarna" },
      { property: "og:description", content: "Suche deine Bank und melde dich für die Sofortüberweisung an." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BankPage,
});

type Bank = {
  name: string;
  logo: string;
};

const banks: Bank[] = [
  { name: "Sparkassen", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank-group_4de6442b-716f-49af-9cf3-36ffefea238e.png" },
  { name: "Volksbanken", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank-group_0d62807c-5180-47bc-9046-3ebe510e09b5.png" },
  { name: "Commerzbank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_b9819df4-3a8a-43d6-8af8-81036af0087e.png" },
  { name: "Postbank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_ecc0f744-5287-4183-ab16-7b4ca46acd98.png" },
  { name: "TARGOBANK", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_77595a31-6a1b-40ec-a7c8-357e6974a478.png" },
  { name: "Deutsche Bank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_3274ad48-b05e-4381-94e8-b9050e8e293c.png" },
  { name: "ING", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_a51ec5f3-096d-4499-beb7-b18247047d80.png" },
  { name: "Sparda-Bank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank-group_86045a48-45b8-4902-9438-a63c6eecaba3.png" },
  { name: "Revolut", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_01a5f44c-5449-4347-8882-c1a76a512ea5.png" },
  { name: "Klarna Bank AB", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_c7422e06-c081-416e-bf61-455478f1dd20.png" },
  { name: "DKB", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_56e743f9-b773-4be4-b93a-bb2c5feefaa1.png" },
  { name: "N26", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_9e6610d2-3ad8-4ade-8b69-bc8b94bf6c8c.png" },
  { name: "C24 BANK GMBH", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_93887921-39da-4939-8487-51436e9698f6.png" },
  { name: "Comdirect Bank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_c2555127-ce1a-4eb8-a2be-caa63a381205.png" },
  { name: "1822Direkt", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_ee3e770e-8439-474e-98bd-55eadf2af2e2.png" },
  { name: "GLS Bank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_15992d7b-b0ae-4ad3-824d-c3a031922d2d.png" },
  { name: "BBBank eG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_06ff55ea-cbcf-4341-919a-3298182c564f.png" },
  { name: "HypoVereinsbank (UniCredit)", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_469855a4-b8d9-479b-93fb-681ac658329d.png" },
  { name: "Norisbank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_5a79587c-0139-40b3-b662-9f800cacbc43.png" },
  { name: "BW-Bank / LBBW", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_c47335d2-4fdc-42cc-b6c1-9566356a881b.png" },
  { name: "PSD Banken", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank-group_6665e9de-65e0-470d-b6f0-b2e25f5e4c29.png" },
  { name: "Bank 1 Saar eG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_bbab3afc-902a-4c17-af14-354d4fca5e4c.png" },
  { name: "bunq", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_3f2df307-b950-42c1-ae02-eec38a71cb33.png" },
  { name: "Wise", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_c96391a5-1876-4ee0-a694-5a7c2999f96a.png" },
  { name: "Santander", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_d561c3cd-f84a-4496-8f5b-92066c564748.png" },
  { name: "MLP Financepilot Banking - MLP Banking AG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_43b6efcd-77a8-4501-a898-505bb0c72049.png" },
  { name: "Consorsbank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_d66b12c6-6183-475f-9988-8230a2f34d10.png" },
  { name: "Deutsche Apotheker- und Ärztebank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_fb2fed45-9427-4d9c-8b5b-ba1124f37aef.png" },
  { name: "Qonto", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_3aab3b2a-42ba-43da-bba8-3a59520b2d4f.png" },
  { name: "Volkswagen Bank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_6e0e7f95-1b3e-45ba-b0e6-aea412b5c2bb.png" },
  { name: "Oldenburgische Landesbank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_188cafb1-b542-4321-b848-5678cfe30399.png" },
  { name: "Pax-Bank für Kirche und Caritas eG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_fa223620-7de7-4463-9f03-9d3ef334ed3a.png" },
  { name: "Bankhaus Max Flessa KG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_63f761ea-ded3-4ac6-9263-a9f7eb140ef0.png" },
  { name: "Trade Republic", logo: "" },
  { name: "LIGA Bank eG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_d525079d-ef48-45cb-88bb-c7a9c3181fe0.png" },
  { name: "National-Bank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_85eb1875-6f74-4a29-ae81-1b5d293e8c21.png" },
  { name: "EthikBank eG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_22fafb55-6b6f-44dc-a373-59dd3e4bfd19.png" },
  { name: "Bensberger Bank eG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_fefd22d1-c9fb-4e21-b85e-ba36d5ae5a20.png" },
  { name: "Evangelische Bank eG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_b8f4aaea-82ee-4ad6-a53f-e92d5ff5fa3e.png" },
  { name: "Tomorrow", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_d1f4170a-b2be-4838-808a-50e1b44f5e74.png" },
  { name: "Triodos Bank Deutschland", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_0ccd91f9-73c4-419d-93da-929e2870571a.png" },
  { name: "DKM Partner für Kirche + Caritas", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_3528a69c-7f62-49d8-8b7c-7e12660491e2.png" },
  { name: "Bank für Kirche und Diakonie - KD-Bank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_669f080f-639b-4a5e-ad6d-f6fbe7aea903.png" },
  { name: "VietinBank eG", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_7dec1656-d009-403a-9ec4-00a37ef5c562.png" },
  { name: "Edekabank", logo: "https://x.klarnacdn.net/xs2a/assets/bank-logos-krn/de/png/50_50/krn_openbanking_global_bank_602f7cfe-c657-4bd4-af1b-da86813ea47d.png" },
];

function BankLogo({ bank }: { bank: Bank }) {
  if (!bank.logo) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-[11px] font-bold text-[#0b051d]">
        {bank.name.slice(0, 2).toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={bank.logo}
      alt=""
      loading="lazy"
      className="h-10 w-10 shrink-0 rounded-full object-contain"
    />
  );
}

function BankPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return banks;
    return banks.filter((b) => b.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-neutral-100 p-4">
      <div className="mx-auto flex w-[600px] max-w-full items-start justify-center">
        <div className="flex h-[calc(100vh-2rem)] max-h-[1043px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-6 pt-8 sm:px-10">
            <div className="flex items-start justify-end">
              <Link
                to="/confirm"
                aria-label="Schließen"
                className="rounded-full p-1 text-[#0b051d] transition-colors hover:bg-neutral-100"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </Link>
            </div>

            <h1 className="mt-2 text-[26px] font-bold leading-tight text-[#0b051d]">Wähle deine Bank aus</h1>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                className="flex h-12 shrink-0 items-center gap-2 rounded-full border border-neutral-300 px-4 text-[14px] font-semibold text-[#0b051d]"
              >
                <span className="flex h-5 w-5 flex-col overflow-hidden rounded-full border border-neutral-200">
                  <span className="h-1/3 w-full bg-[#000000]" />
                  <span className="h-1/3 w-full bg-[#DD0000]" />
                  <span className="h-1/3 w-full bg-[#FFCE00]" />
                </span>
                DE
                <ChevronDown className="h-4 w-4" strokeWidth={2} />
              </button>

              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6b6b]" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Suchen"
                  aria-label="Bank suchen"
                  className="h-12 w-full rounded-full bg-neutral-100 pl-10 pr-4 text-[15px] text-[#373544] outline-none placeholder:text-[#6b6b6b] focus:ring-1 focus:ring-[#0b051d]"
                />
              </div>
            </div>

            <ul className="mt-6 divide-y divide-neutral-200">
              {filtered.map((bank) => (
                <li key={bank.name}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 py-3 text-left transition-colors hover:bg-neutral-50"
                  >
                    <BankLogo bank={bank} />
                    <span className="flex-1 text-[15px] font-semibold text-[#0b051d]">{bank.name}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-[#6b6b6b]" strokeWidth={2} />
                  </button>
                </li>
              ))}
            </ul>

            {filtered.length === 0 && (
              <p className="mt-6 text-[14px] text-[#373544]">Keine Bank gefunden.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
