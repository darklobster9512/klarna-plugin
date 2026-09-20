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
  bg: string;
  fg: string;
  label: string;
  ring?: boolean;
};

const banks: Bank[] = [
  { name: "Sparkassen", bg: "#E3000F", fg: "#ffffff", label: "S" },
  { name: "Volksbanken", bg: "#0066B3", fg: "#ffffff", label: "V" },
  { name: "Commerzbank", bg: "#ffffff", fg: "#FFCC00", label: "C", ring: true },
  { name: "Postbank", bg: "#FFCC00", fg: "#003087", label: "P" },
  { name: "TARGOBANK", bg: "#ffffff", fg: "#0b2a4a", label: "T", ring: true },
  { name: "Deutsche Bank", bg: "#12234B", fg: "#ffffff", label: "D" },
  { name: "ING", bg: "#FF6200", fg: "#ffffff", label: "I" },
  { name: "Sparda-Bank", bg: "#00699E", fg: "#ffffff", label: "SB" },
  { name: "Revolut", bg: "#ffffff", fg: "#0b051d", label: "R", ring: true },
  { name: "Klarna Bank AB", bg: "#FFB3C7", fg: "#0b051d", label: "K" },
  { name: "DKB", bg: "#ffffff", fg: "#1D8AC4", label: "DKB", ring: true },
  { name: "N26", bg: "#1A1A1A", fg: "#ffffff", label: "N" },
  { name: "comdirect", bg: "#FFF200", fg: "#0b051d", label: "cd" },
  { name: "HypoVereinsbank", bg: "#E2001A", fg: "#ffffff", label: "H" },
  { name: "Consorsbank", bg: "#005E85", fg: "#ffffff", label: "C" },
  { name: "norisbank", bg: "#E2001A", fg: "#ffffff", label: "n" },
  { name: "Santander", bg: "#EC0000", fg: "#ffffff", label: "S" },
  { name: "Deutsche Apotheker- und Ärztebank", bg: "#0067B1", fg: "#ffffff", label: "apo" },
  { name: "Openbank", bg: "#EC0000", fg: "#ffffff", label: "O" },
  { name: "Triodos Bank", bg: "#00856F", fg: "#ffffff", label: "T" },
  { name: "GLS Bank", bg: "#F39200", fg: "#ffffff", label: "GLS" },
  { name: "Oldenburgische Landesbank", bg: "#00447C", fg: "#ffffff", label: "OLB" },
  { name: "Bank11", bg: "#003D7C", fg: "#ffffff", label: "11" },
  { name: "Wüstenrot Bank", bg: "#E30613", fg: "#ffffff", label: "W" },
];

function BankLogo({ bank }: { bank: Bank }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${bank.ring ? "border border-neutral-200" : ""}`}
      style={{ backgroundColor: bank.bg, color: bank.fg }}
    >
      {bank.label}
    </div>
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
