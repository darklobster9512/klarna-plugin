import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Zahlungsmethode wählen — Klarna" },
      { name: "description", content: "Wähle, wie du deine Bestellung bei Klarna bezahlen möchtest." },
      { property: "og:title", content: "Zahlungsmethode wählen — Klarna" },
      { property: "og:description", content: "Wähle, wie du deine Bestellung bei Klarna bezahlen möchtest." },
    ],
  }),
  component: PaymentPage,
});

type OptionId = "sofort" | "spaeter" | "sechs" | "drei";

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
        selected ? "border-[#0b051d]" : "border-neutral-300"
      }`}
    >
      {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#0b051d]" />}
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
function BankBadge() {
  return (
    <span className="inline-flex h-5 w-6 items-center justify-center rounded border border-neutral-200 bg-white text-[#0b051d]">
      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
        <path d="M12 2 2 7v2h20V7L12 2Zm-8 9v7H2v2h20v-2h-2v-7h-2v7h-3v-7h-2v7h-2v-7H9v7H6v-7H4Z" />
      </svg>
    </span>
  );
}

function PaymentPage() {
  const [selected, setSelected] = useState<OptionId | null>(null);
  const navigate = useNavigate();
  const total = "75,64 €";

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-0 sm:p-4">
      <div className="relative flex mt-6 h-[calc(100vh-1.5rem)] sm:mt-0 sm:h-[calc(100vh-2rem)] max-h-none sm:max-h-[1043px] w-[600px] max-w-full flex-col overflow-hidden bg-white rounded-t-2xl sm:rounded-2xl shadow-xl">
        <Link
          to="/"
          aria-label="Schließen"
          className="absolute right-5 top-5 z-10 text-[#0b051d] transition-opacity hover:opacity-70"
        >
          <X className="h-6 w-6" />
        </Link>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 pb-4 pt-10 sm:px-10 sm:pt-10">
            <h1 className="mt-2 text-[26px] font-bold leading-tight text-[#0b051d]">
              Wie möchtest du {total} bezahlen?
            </h1>
            <p className="mt-2 text-[14px] text-[#373544]">
              Du profitierst außerdem vom Klarna{" "}
              <a href="#" className="underline">Käuferschutz.</a>
            </p>

            {/* Sofort bezahlen */}
            <button
              type="button"
              onClick={() => setSelected("sofort")}
              className={`mt-6 flex w-full items-start justify-between rounded-xl border p-4 text-left transition-colors ${
                selected === "sofort" ? "border-[#0b051d]" : "border-neutral-200"
              }`}
            >
              <div className="flex-1">
                <div className="text-[14px] text-[#373544]">Sofort bezahlen</div>
                <div className="mt-1 text-[16px] font-bold text-[#0b051d]">{total} heute</div>
                <div className="mt-1 text-[13px] text-[#6b6b6b]">Sichere Zahlung in Sekunden</div>
                <div className="mt-3 flex items-center gap-2">
                  <ApplePayBadge />
                  <MastercardBadge />
                  <VisaBadge />
                  <BankBadge />
                </div>
              </div>
              <RadioDot selected={selected === "sofort"} />
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-[13px] text-[#6b6b6b]">Flexible Zahlungsmethoden</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <div className="space-y-4">
              {/* Bezahle später */}
              <button
                type="button"
                onClick={() => setSelected("spaeter")}
                className={`w-full rounded-xl border text-left transition-colors ${
                  selected === "spaeter" ? "border-[#0b051d]" : "border-neutral-200"
                }`}
              >
                <div className="flex items-start justify-between p-4">
                  <div className="flex-1">
                    <div className="text-[14px] text-[#373544]">Bezahle später</div>
                    <div className="mt-1 text-[16px] font-bold text-[#0b051d]">{total} in bis zu 30 Tagen</div>
                    <div className="mt-1 text-[13px] text-[#0a8a4a]">0 € Zinsen</div>
                  </div>
                  <RadioDot selected={selected === "spaeter"} />
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-[13px] text-[#373544]">
                  <span>0,00 € heute fällig</span>
                  <span>Gesamt {total}</span>
                </div>
              </button>

              {/* 6 Zahlungen */}
              <button
                type="button"
                onClick={() => setSelected("sechs")}
                className={`w-full rounded-xl border text-left transition-colors ${
                  selected === "sechs" ? "border-[#0b051d]" : "border-neutral-200"
                }`}
              >
                <div className="flex items-start justify-between p-4">
                  <div className="flex-1">
                    <div className="text-[14px] text-[#373544]">6 Zahlungen</div>
                    <div className="mt-1 text-[16px] font-bold text-[#0b051d]">13,15 € pro Monat</div>
                    <div className="mt-1 text-[13px] text-[#6b6b6b]">3,17 € Zinsen insgesamt · 13,27 % eff. Jahreszins</div>
                  </div>
                  <RadioDot selected={selected === "sechs"} />
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-[13px] text-[#373544]">
                  <span>0,00 € heute fällig</span>
                  <span>Gesamt 78,81 €</span>
                </div>
              </button>

              {/* 3 zinsfreie Teilzahlungen */}
              <button
                type="button"
                onClick={() => setSelected("drei")}
                className={`w-full rounded-xl border text-left transition-colors ${
                  selected === "drei" ? "border-[#0b051d]" : "border-neutral-200"
                }`}
              >
                <div className="flex items-start justify-between p-4">
                  <div className="flex-1">
                    <div className="text-[14px] text-[#373544]">Bezahle in 3 zinsfreien Teilzahlungen</div>
                    <div className="mt-1 text-[16px] font-bold text-[#0b051d]">25,21 € pro Monat</div>
                    <div className="mt-1 text-[13px] text-[#0a8a4a]">0 € Zinsen</div>
                  </div>
                  <RadioDot selected={selected === "drei"} />
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-[13px] text-[#373544]">
                  <span>25,21 € heute fällig</span>
                  <span>Gesamt {total}</span>
                </div>
              </button>
            </div>

            <div className="h-4" />
          </div>

          <div className="relative bg-white px-8 pb-6 pt-3 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.08)] sm:px-10">
            <button
              type="button"
              disabled={!selected}
              onClick={() => navigate({ to: "/payment-method" })}
              className="w-full rounded-full bg-[#0b051d] py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
