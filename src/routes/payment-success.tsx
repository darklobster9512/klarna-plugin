import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/payment-success")({
  head: () => ({
    meta: [
      { title: "Zahlung erfolgreich — Klarna" },
      { name: "description", content: "Deine Zahlung wurde erfolgreich veranlasst." },
      { property: "og:title", content: "Zahlung erfolgreich — Klarna" },
      { property: "og:description", content: "Deine Zahlung wurde erfolgreich veranlasst." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-0 sm:p-4">
      <div className="relative flex h-screen sm:h-[calc(100vh-2rem)] max-h-none sm:max-h-[1043px] w-[600px] max-w-full flex-col overflow-hidden bg-white sm:rounded-2xl sm:shadow-xl">
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center sm:px-10">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffb3c7]">
            <Check className="h-10 w-10 text-[#0b051d]" strokeWidth={2.5} />
          </span>
          <h1 className="mt-6 text-[26px] font-bold leading-tight text-[#0b051d]">
            Zahlung veranlasst
          </h1>
          <p className="mt-3 max-w-sm text-[15px] text-[#373544]">
            Deine Zahlung wurde erfolgreich veranlasst. Du erhältst in Kürze eine Bestätigung per E-Mail.
          </p>
        </div>

        <div className="relative bg-white px-8 pb-6 pt-3 sm:px-10">
          <Link
            to="/"
            className="block w-full rounded-full bg-[#0b051d] py-4 text-center text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Zurück zum Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
