import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/payment-method")({
  head: () => ({
    meta: [
      { title: "Zahlungsart wählen — Klarna" },
      { name: "description", content: "Wähle deine Zahlungsart: Sofortüberweisung, Lastschrift oder Karte." },
      { property: "og:title", content: "Zahlungsart wählen — Klarna" },
      { property: "og:description", content: "Wähle deine Zahlungsart: Sofortüberweisung, Lastschrift oder Karte." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaymentMethodPage,
});

type MethodId = "sofortueberweisung" | "karte";

function SelectionDot({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffb3c7]">
        <Check className="h-3 w-3 text-[#0b051d]" strokeWidth={3} />
      </span>
    );
  }
  return <span className="h-5 w-5 shrink-0 rounded-full border border-neutral-300" />;
}

function BankIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center text-[#0b051d]">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M12 2 2 7v2h20V7L12 2Zm-8 9v7H2v2h20v-2h-2v-7h-2v7h-3v-7h-2v7h-2v-7H9v7H6v-7H4Z" />
      </svg>
    </span>
  );
}

function ApplePayBadge() {
  return (
    <span className="inline-flex h-5 items-center rounded border border-neutral-200 bg-white px-1.5 text-[10px] font-semibold text-black">
       Pay
    </span>
  );
}
function MastercardBadge() {
  return (
    <span className="inline-flex h-5 items-center gap-0.5 rounded border border-neutral-200 bg-white px-1">
      <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
      <span className="-ml-1.5 h-3 w-3 rounded-full bg-[#F79E1B] opacity-90" />
    </span>
  );
}
function VisaBadge() {
  return (
    <span className="inline-flex h-5 items-center rounded border border-neutral-200 bg-white px-1.5 text-[10px] font-bold italic text-[#1A1F71]">
      VISA
    </span>
  );
}

function PaymentMethodPage() {
  const [selected, setSelected] = useState<MethodId>("sofortueberweisung");
  const total = "75,64 €";

  const optionClass = (id: MethodId) =>
    `flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-colors ${
      selected === id ? "border-2 border-[#0b051d]" : "border-neutral-200"
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#8a8a8a] p-0 sm:bg-neutral-100 sm:p-4">
      <div className="relative flex mt-6 h-[calc(100vh-1.5rem)] sm:mt-0 sm:h-[calc(100vh-2rem)] max-h-none sm:max-h-[1043px] w-[600px] max-w-full flex-col overflow-hidden bg-white rounded-t-[32px] sm:rounded-2xl shadow-xl">
        <Link
          to="/"
          aria-label="Schließen"
          className="absolute right-5 top-5 z-10 text-[#0b051d] transition-opacity hover:opacity-70"
        >
          <X className="h-6 w-6" />
        </Link>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="h-14 shrink-0" />
          <div className="flex-1 overflow-y-auto px-8 pb-4 pt-0 sm:px-10">
            <h1 className="mt-2 text-[26px] font-bold leading-tight text-[#0b051d]">
              Wie möchtest du {total} bezahlen?
            </h1>
            <p className="mt-2 text-[14px] text-[#373544]">
              Du profitierst außerdem vom Klarna{" "}
              <a href="#" className="underline">Käuferschutz.</a>
            </p>

            <div className="mt-6 space-y-3">
              {/* Sofortüberweisung */}
              <button type="button" onClick={() => setSelected("sofortueberweisung")} className={optionClass("sofortueberweisung")}>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[#0b051d]">Sofortüberweisung</div>
                  <div className="mt-1 text-[13px] text-[#373544]">Schnell und sicher per Onlinebanking</div>
                </div>
                <span className="flex items-center gap-3">
                  <BankIcon />
                  <SelectionDot selected={selected === "sofortueberweisung"} />
                </span>
              </button>

              {/* Karte */}
              <button type="button" onClick={() => setSelected("karte")} className={optionClass("karte")}>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[#0b051d]">Karte</div>
                  <div className="mt-1 text-[13px] text-[#373544]">Speichere deine Kartendaten für zukünftige Zahlungen</div>
                </div>
                <span className="flex items-center gap-2">
                  <ApplePayBadge />
                  <MastercardBadge />
                  <VisaBadge />
                  <SelectionDot selected={selected === "karte"} />
                </span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link to="/payment" className="text-[15px] font-semibold text-[#4b3bdf] hover:underline">
                Möchtest du später bezahlen?
              </Link>
            </div>

            <div className="h-4" />
          </div>

          <div className="relative bg-white px-8 pb-6 pt-3 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.08)] sm:px-10">
            <Link
              to="/loading"
              search={{ to: selected === "karte" ? "/add-card" : "/confirm", ms: 3000 }}
              onClick={() => {
                try {
                  if (selected === "sofortueberweisung") {
                    sessionStorage.removeItem("paymentMethod");
                    sessionStorage.removeItem("bankName");
                    sessionStorage.removeItem("bankLogo");
                  }
                } catch {
                  // ignore
                }
              }}
              className="block w-full rounded-full bg-[#0b051d] py-4 text-center text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Weiter
            </Link>
            <Link
              to="/payment"
              className="mt-3 block w-full rounded-full border border-[#0b051d] bg-white py-4 text-center text-[15px] font-semibold text-[#0b051d] transition-colors hover:bg-neutral-50"
            >
              Weitere Optionen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
