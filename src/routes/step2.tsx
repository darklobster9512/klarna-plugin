import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Info, X } from "lucide-react";

export const Route = createFileRoute("/step2")({
  head: () => ({
    meta: [
      { title: "Persönliche Daten bestätigen" },
      {
        name: "description",
        content:
          "Gib deinen vollständigen rechtsgültigen Namen und deine Meldeadresse ein, um deine Identität zu verifizieren.",
      },
      { property: "og:title", content: "Persönliche Daten bestätigen" },
      {
        property: "og:description",
        content:
          "Gib deinen vollständigen rechtsgültigen Namen und deine Meldeadresse ein, um deine Identität zu verifizieren.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Step2,
});

function KlarnaBadge() {
  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-0.5 text-[15px] font-bold text-[#0b051d]"
      style={{ backgroundColor: "#FFA8CD" }}
    >
      Klarna
    </span>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  trailing?: React.ReactNode;
};

function FloatingField({ id, label, value, onChange, trailing }: FieldProps) {
  return (
    <div className="flex items-center gap-3 px-4">
      <div className="relative flex h-[58px] flex-1 flex-col justify-center">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className="peer block h-full w-full bg-transparent pb-1 pt-6 text-[16px] font-semibold text-[#373544] outline-none placeholder:text-transparent"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[15px] font-normal text-[#6b6b6b] transition-all duration-200 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
        >
          {label}
        </label>
      </div>
      {trailing}
    </div>
  );
}

function Step2() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");

  const isValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    birthDate.trim().length > 0 &&
    address.trim().length > 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <div className="relative flex h-[calc(100vh-2rem)] max-h-[1043px] w-[600px] max-w-full flex-col overflow-y-auto rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Zurück" className="text-[#0b051d] transition-opacity hover:opacity-70">
            <ArrowLeft className="h-6 w-6" strokeWidth={2} />
          </Link>
          <KlarnaBadge />
          <button
            type="button"
            aria-label="Schließen"
            className="text-[#0b051d] transition-opacity hover:opacity-70"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col">
          <h1 className="mt-7 text-[28px] font-bold leading-tight text-[#0b051d]">
            Bestätige deine persönlichen Daten
          </h1>

          <p className="mt-3 text-[15px] leading-6 text-[#373544]">
            Gib bitte deinen <strong>vollständigen rechtsgültigen Namen</strong> und deine{" "}
            <strong>Meldeadresse</strong> ein, damit wir deine Identität verifizieren können
          </p>

          <div className="mt-6 divide-y divide-neutral-300 rounded-xl border border-neutral-300">
            <FloatingField
              id="firstName"
              label="Vorname(n) laut Ausweis"
              value={firstName}
              onChange={setFirstName}
            />
            <FloatingField
              id="lastName"
              label="Nachname(n) laut Ausweis"
              value={lastName}
              onChange={setLastName}
            />
            <FloatingField
              id="birthDate"
              label="Geburtsdatum"
              value={birthDate}
              onChange={setBirthDate}
              trailing={
                <Info className="h-5 w-5 shrink-0 text-[#6b6b6b]" strokeWidth={1.75} aria-hidden="true" />
              }
            />
          </div>

          <p className="mt-4 text-[13px] text-[#373544]">
            Deine Meldeadresse sollte in <strong>Deutschland</strong> sein
          </p>

          <div className="mt-3 rounded-xl border border-neutral-300">
            <FloatingField
              id="address"
              label="Meldeadresse (zum Suchen eingeben)"
              value={address}
              onChange={setAddress}
            />
          </div>

          <button
            type="button"
            disabled={!isValid}
            className="mt-auto w-full rounded-full bg-[#0b051d] py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Klarna Account erstellen
          </button>
        </div>
      </div>
    </div>
  );
}
