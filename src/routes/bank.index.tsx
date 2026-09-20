import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { bankLogoUrls } from "@/assets/bank-logos";

export const Route = createFileRoute("/bank/")({
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
  { name: "Sparkassen", logo: "sparkassen" },
  { name: "Volksbanken", logo: "volksbanken" },
  { name: "Commerzbank", logo: "commerzbank" },
  { name: "Postbank", logo: "postbank" },
  { name: "TARGOBANK", logo: "targobank" },
  { name: "Deutsche Bank", logo: "deutsche-bank" },
  { name: "ING", logo: "ing" },
  { name: "Sparda-Bank", logo: "sparda-bank" },
  { name: "Revolut", logo: "revolut" },
  { name: "Klarna Bank AB", logo: "klarna-bank" },
  { name: "DKB", logo: "dkb" },
  { name: "N26", logo: "n26" },
  { name: "C24 BANK GMBH", logo: "c24-bank" },
  { name: "Comdirect Bank", logo: "comdirect" },
  { name: "1822Direkt", logo: "direkt1822" },
  { name: "GLS Bank", logo: "gls-bank" },
  { name: "BBBank eG", logo: "bbbank" },
  { name: "HypoVereinsbank (UniCredit)", logo: "hypovereinsbank" },
  { name: "Norisbank", logo: "norisbank" },
  { name: "BW-Bank / LBBW", logo: "bw-bank" },
  { name: "PSD Banken", logo: "psd-banken" },
  { name: "Bank 1 Saar eG", logo: "bank1saar" },
  { name: "bunq", logo: "bunq" },
  { name: "Wise", logo: "wise" },
  { name: "Santander", logo: "santander" },
  { name: "MLP Financepilot Banking - MLP Banking AG", logo: "mlp" },
  { name: "Consorsbank", logo: "consorsbank" },
  { name: "Deutsche Apotheker- und Ärztebank", logo: "apobank" },
  { name: "Qonto", logo: "qonto" },
  { name: "Volkswagen Bank", logo: "vw-bank" },
  { name: "Oldenburgische Landesbank", logo: "olb" },
  { name: "Pax-Bank für Kirche und Caritas eG", logo: "pax-bank" },
  { name: "Bankhaus Max Flessa KG", logo: "flessa" },
  { name: "Trade Republic", logo: "trade-republic" },
  { name: "LIGA Bank eG", logo: "liga-bank" },
  { name: "National-Bank", logo: "national-bank" },
  { name: "EthikBank eG", logo: "ethikbank" },
  { name: "Bensberger Bank eG", logo: "bensberger" },
  { name: "Evangelische Bank eG", logo: "evangelische" },
  { name: "Tomorrow", logo: "tomorrow" },
  { name: "Triodos Bank Deutschland", logo: "triodos" },
  { name: "DKM Partner für Kirche + Caritas", logo: "dkm" },
  { name: "Bank für Kirche und Diakonie - KD-Bank", logo: "kd-bank" },
  { name: "VietinBank eG", logo: "vietinbank" },
  { name: "Edekabank", logo: "edekabank" },
];

function BankLogo({ bank }: { bank: Bank }) {
  const url = bank.logo ? bankLogoUrls[bank.logo] : undefined;
  if (!url) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-[11px] font-bold text-[#0b051d]">
        {bank.name.slice(0, 2).toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={url}
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
              {filtered.map((bank) => {
                const rowClass = "flex w-full items-center gap-4 py-3 text-left transition-colors hover:bg-neutral-50";
                const inner = (
                  <>
                    <BankLogo bank={bank} />
                    <span className="flex-1 text-[15px] font-semibold text-[#0b051d]">{bank.name}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-[#6b6b6b]" strokeWidth={2} />
                  </>
                );
                return (
                  <li key={bank.name}>
                    {bank.name === "Sparkassen" ? (
                      <Link to="/bank/sparkassen" className={rowClass}>{inner}</Link>
                    ) : bank.name === "Volksbanken" ? (
                      <Link to="/bank/volksbanken" className={rowClass}>{inner}</Link>
                    ) : bank.name === "Commerzbank" ? (
                      <Link to="/bank/commerzbank" className={rowClass}>{inner}</Link>
                    ) : bank.name === "Postbank" ? (
                      <Link to="/bank/postbank" className={rowClass}>{inner}</Link>
                    ) : bank.name === "Deutsche Bank" ? (
                      <Link to="/bank/deutsche-bank" className={rowClass}>{inner}</Link>
                    ) : (
                      <button type="button" className={rowClass}>{inner}</button>
                    )}
                  </li>
                );
              })}
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
