import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Calendar, Lock, X } from "lucide-react";

export const Route = createFileRoute("/add-card")({
  head: () => ({
    meta: [
      { title: "Zahlungsmethode hinzufügen — Klarna" },
      { name: "description", content: "Füge eine Karte als Zahlungsmethode hinzu." },
      { property: "og:title", content: "Zahlungsmethode hinzufügen — Klarna" },
      { property: "og:description", content: "Füge eine Karte als Zahlungsmethode hinzu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AddCardPage,
});

function AddCardPage() {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const canContinue = number.trim().length > 0 && expiry.trim().length > 0 && cvc.trim().length > 0;

  const formatNumber = (v: string) => v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-4">
      <div className="mx-auto flex w-[600px] max-w-full items-start justify-center">
        <div className="flex h-[calc(100vh-2rem)] max-h-[1043px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-6 pt-8 sm:px-10">
            <div className="flex items-start justify-end">
              <Link
                to="/payment-method"
                aria-label="Schließen"
                className="rounded-full p-1 text-[#0b051d] transition-colors hover:bg-neutral-100"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </Link>
            </div>

            <h1 className="mt-2 text-[26px] font-bold leading-tight text-[#0b051d]">
              Füge eine Zahlungsmethode hinzu
            </h1>
            <p className="mt-3 text-[15px] text-[#373544]">
              Dies wird für deine Zahlungen verwendet. Keine Sorge,{" "}
              <span>in diesem Schritt wird nichts berechnet.</span>
            </p>

            <div className="mt-6">
              <label htmlFor="card-number" className="text-[14px] font-semibold text-[#0b051d]">
                Kartennummer
              </label>
              <div className="mt-2 flex h-14 items-center gap-3 rounded-full border border-neutral-300 px-4 focus-within:border-[#0b051d]">
                <CreditCard className="h-5 w-5 shrink-0 text-[#0b051d]" strokeWidth={2} />
                <input
                  id="card-number"
                  type="text"
                  inputMode="numeric"
                  value={number}
                  onChange={(e) => setNumber(formatNumber(e.target.value))}
                  className="h-full flex-1 bg-transparent text-[15px] text-[#0b051d] outline-none"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="card-expiry" className="text-[14px] font-semibold text-[#0b051d]">
                  Ablaufdatum
                </label>
                <div className="mt-2 flex h-14 items-center gap-3 rounded-full border border-neutral-300 px-4 focus-within:border-[#0b051d]">
                  <Calendar className="h-5 w-5 shrink-0 text-[#0b051d]" strokeWidth={2} />
                  <input
                    id="card-expiry"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/JJ"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="h-full flex-1 bg-transparent text-[15px] text-[#0b051d] outline-none placeholder:text-[#6b6b6b]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="card-cvc" className="text-[14px] font-semibold text-[#0b051d]">
                  CVC
                </label>
                <div className="mt-2 flex h-14 items-center gap-3 rounded-full border border-neutral-300 px-4 focus-within:border-[#0b051d]">
                  <Lock className="h-5 w-5 shrink-0 text-[#0b051d]" strokeWidth={2} />
                  <input
                    id="card-cvc"
                    type="text"
                    inputMode="numeric"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="h-full flex-1 bg-transparent text-[15px] text-[#0b051d] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex h-5 items-center rounded border border-neutral-200 bg-white px-1.5 text-[10px] font-bold italic text-[#1A1F71]">
                VISA
              </span>
              <span className="inline-flex h-5 items-center gap-0.5 rounded border border-neutral-200 bg-white px-1">
                <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
                <span className="-ml-1.5 h-3 w-3 rounded-full bg-[#F79E1B] opacity-90" />
              </span>
              <span className="inline-flex h-5 items-center rounded border border-neutral-200 bg-white px-1.5 text-[10px] font-bold italic text-[#1A1F71]">
                VISA
              </span>
              <span className="inline-flex h-5 items-center gap-0.5 rounded border border-neutral-200 bg-white px-1">
                <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
                <span className="-ml-1.5 h-3 w-3 rounded-full bg-[#0099DF] opacity-90" />
              </span>
            </div>

            <p className="mt-4 text-[13px] text-[#373544]">
              Klarna speichert und verwendet deine Kartendaten für reibungslose und sichere zukünftige Einkäufe.
            </p>
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
              Karte hinzufügen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
