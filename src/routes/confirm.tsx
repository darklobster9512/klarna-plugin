import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, CreditCard, Wallet, X } from "lucide-react";
import { bankLogoUrls } from "@/assets/bank-logos";

export const Route = createFileRoute("/confirm")({
  head: () => ({
    meta: [
      { title: "Bestätigen und bezahlen — Klarna" },
      { name: "description", content: "Überprüfe deine Angaben und schließe die Zahlung mit Sofortüberweisung ab." },
      { property: "og:title", content: "Bestätigen und bezahlen — Klarna" },
      { property: "og:description", content: "Überprüfe deine Angaben und schließe die Zahlung mit Sofortüberweisung ab." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConfirmPage,
});

function KauflandLogo() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#E10915] text-[15px] font-black text-white">
      K
    </span>
  );
}

type Plan = "sofort" | "spaeter" | "sechs" | "drei";

const PLAN_INFO: Record<Plan, { today: string; total: string }> = {
  sofort: { today: "75,64 €", total: "75,64 €" },
  spaeter: { today: "0,00 €", total: "75,64 €" },
  sechs: { today: "0,00 €", total: "78,81 €" },
  drei: { today: "25,21 €", total: "75,64 €" },
};

function ConfirmPage() {
  const navigate = useNavigate();
  const [newsletter, setNewsletter] = useState(false);
  const [method, setMethod] = useState<"sofort" | "card" | null>(null);
  const [bankName, setBankName] = useState<string | null>(null);
  const [bankLogo, setBankLogo] = useState<string | null>(null);
  const [plan, setPlan] = useState<Plan>("sofort");

  useEffect(() => {
    try {
      setMethod(sessionStorage.getItem("paymentMethod") === "card" ? "card" : "sofort");
      setBankName(sessionStorage.getItem("bankName"));
      setBankLogo(sessionStorage.getItem("bankLogo"));
      const p = sessionStorage.getItem("paymentPlan") as Plan | null;
      if (p && p in PLAN_INFO) setPlan(p);
    } catch {
      setMethod("sofort");
    }
  }, []);

  if (method === null) return null;

  const hasBank = method === "sofort" && !!bankName;
  const bankLogoUrl = bankLogo ? bankLogoUrls[bankLogo] : undefined;
  const { today, total } = PLAN_INFO[plan];



  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-0 sm:p-4">
      <div className="relative flex h-screen sm:h-[calc(100vh-2rem)] max-h-none sm:max-h-[1043px] w-[600px] max-w-full flex-col overflow-hidden bg-white sm:rounded-2xl sm:shadow-xl">
        <Link
          to="/payment-method"
          aria-label="Schließen"
          className="absolute right-5 top-5 z-10 text-[#0b051d] transition-opacity hover:opacity-70"
        >
          <X className="h-6 w-6" />
        </Link>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-4 pt-14 sm:px-10 sm:pt-16">
            <h1 className="text-[26px] font-bold leading-tight text-[#0b051d]">
              Bestätigen und bezahlen
            </h1>
            <p className="mt-2 text-[15px] text-[#373544]">
              Überprüfe vor der Zahlung noch einmal alle Angaben. Du profitierst außerdem vom Klarna{" "}
              <a href="#" className="underline">Käuferschutz.</a>
            </p>

            <div className="mt-6 divide-y divide-neutral-200 border-b border-neutral-200">
              {/* Kontakt */}
              <button type="button" className="flex w-full items-center gap-3 py-5 text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b051d] text-[12px] font-bold text-white">
                  FS
                </span>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[#0b051d]">fabianschmidt253@yopmail.com</div>
                  <div className="text-[14px] text-[#373544]">0176 16146986</div>
                </div>
                <ChevronRight className="h-5 w-5 text-[#0b051d]" />
              </button>

              {/* Händler */}
              <button type="button" className="flex w-full items-center gap-3 py-5 text-left">
                <KauflandLogo />
                <div className="flex-1 text-[15px] font-semibold text-[#0b051d]">Kaufland.de</div>
                <ChevronRight className="h-5 w-5 text-[#0b051d]" />
              </button>

              {/* Zahlungsart */}
              <div className="flex w-full items-center gap-3 py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#0b051d]">
                  {hasBank && bankLogoUrl ? (
                    <img src={bankLogoUrl} alt="" className="h-10 w-10 rounded-full object-contain" />
                  ) : method === "card" ? (
                    <CreditCard className="h-5 w-5" strokeWidth={1.75} />
                  ) : (
                    <Wallet className="h-5 w-5" strokeWidth={1.75} />
                  )}
                </span>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[#0b051d]">
                    {hasBank ? bankName : method === "card" ? "Kreditkarte" : "Sofortüberweisung"}
                  </div>
                  <div className="text-[14px] text-[#373544]">
                    {hasBank
                      ? "Sofortüberweisung"
                      : method === "card"
                        ? "Zahle sicher mit deiner Karte"
                        : "Schnell und sicher per Onlinebanking"}
                  </div>
                </div>
                <Link to="/payment-method" className="text-[14px] font-semibold text-[#4b3bdf] hover:underline">
                  Ändern
                </Link>
              </div>
            </div>

            <div className="mt-auto space-y-2 pt-8">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#373544]">Bestellbetrag</span>
                <span className="text-[#373544]">75,64 €</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#373544]">Gesamtbetrag</span>
                <span className="text-[#373544]">{total}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[15px] font-normal text-[#0b051d]">Heute fällig</span>
                <span className="text-[22px] font-bold text-[#0b051d]">{today}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                   className="peer sr-only"
                />
                 <span
                   aria-hidden="true"
                   className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border-[0.5px] border-neutral-400 bg-white text-white peer-checked:border-[#0b051d] peer-checked:bg-[#0b051d] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0b051d]"
                 >
                   {newsletter && <Check className="h-3.5 w-3.5" strokeWidth={2} />}
                 </span>
                <span className="text-[12px] text-[#6b6b6b]">
                  Erhalte Partnerdeals, Angebote und mehr von Klarna.
                </span>
              </label>
              <p className="text-[12px] text-[#6b6b6b]">
                Wir informieren dich weiterhin über ähnliche Services von Klarna.{" "}
                <a href="#" className="text-black underline">Abmelden</a>
              </p>
              <div className="space-y-1">
                <p className="text-[12px] text-[#6b6b6b]">
                  Es gilt unsere <a href="#" className="text-black underline">Datenschutzrichtlinie</a> für Sofortüberweisungen.
                </p>
                <p className="text-[12px] text-[#6b6b6b]">
                  Indem du fortfährst, akzeptierst du die <a href="#" className="text-black underline">AGB für Sofortüberweisungen</a>.
                </p>
              </div>
            </div>

            <div className="h-4" />
          </div>

          <div className="relative bg-white px-8 pb-6 pt-3 sm:px-10">
            <button
              type="button"
              onClick={() => {
                if (method === "card" || hasBank) {
                  navigate({ to: "/loading", search: { to: "/payment-success", ms: 3000 } });
                } else {
                  navigate({ to: "/bank" });
                }
              }}
              className="block w-full rounded-full bg-[#0b051d] py-4 text-center text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {method === "card"
                ? "Zahlung bestätigen"
                : hasBank
                  ? "Zahlung abschließen"
                  : "Weiter zur Sofortüberweisung"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
