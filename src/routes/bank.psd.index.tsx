import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Search, X } from "lucide-react";
import { bankLogoUrls } from "@/assets/bank-logos";
import { slugifyPsd } from "./bank.psd.$slug";

export const Route = createFileRoute("/bank/psd/")({
  component: PsdBankPage,
});

const psdBanken: string[] = [
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

function PsdBankPage() {
  const [query, setQuery] = useState("");
  const logo = bankLogoUrls["psd-banken"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return psdBanken;
    return psdBanken.filter((n) => n.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-[#8a8a8a] p-0 sm:bg-neutral-100 sm:p-4">
      <div className="mx-auto flex w-[600px] max-w-full items-start justify-center">
        <div className="flex mt-6 h-[calc(100vh-1.5rem)] sm:mt-0 sm:h-[calc(100vh-2rem)] max-h-none sm:max-h-[1043px] w-full flex-col overflow-hidden bg-white rounded-t-3xl sm:rounded-2xl shadow-xl">
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
              <Link
                to="/bank"
                aria-label="Zurück"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-[#0b051d] transition-colors hover:bg-neutral-50"
              >
                <ArrowLeft className="h-5 w-5" strokeWidth={2} />
              </Link>

              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6b6b]" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Suche nach deiner Bankfiliale"
                  aria-label="PSD Bank suchen"
                  className="h-12 w-full rounded-full bg-neutral-100 pl-10 pr-4 text-[15px] text-[#373544] outline-none placeholder:text-[#6b6b6b] focus:ring-1 focus:ring-[#0b051d]"
                />
              </div>
            </div>

            <ul className="mt-6 divide-y divide-neutral-200">
              {filtered.map((name) => (
                <li key={name}>
                  <Link
                    to="/bank/psd/$slug"
                    params={{ slug: slugifyPsd(name) }}
                    className="flex w-full items-center gap-4 py-3 text-left transition-colors hover:bg-neutral-50"
                  >
                    <img
                      src={logo}
                      alt=""
                      loading="lazy"
                      className="h-10 w-10 shrink-0 rounded-full object-contain"
                    />
                    <span className="flex-1 text-[15px] font-semibold text-[#0b051d]">{name}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-[#6b6b6b]" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>

            {filtered.length === 0 && (
              <p className="mt-6 text-[14px] text-[#373544]">Keine PSD Bank gefunden.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
