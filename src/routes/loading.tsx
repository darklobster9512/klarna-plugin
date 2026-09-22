import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  to: z.string().default("/"),
  ms: z.coerce.number().default(3000),
});

export const Route = createFileRoute("/loading")({
  head: () => ({
    meta: [
      { title: "Wird geladen — Klarna" },
      { name: "description", content: "Bitte warte einen Moment." },
      { property: "og:title", content: "Wird geladen — Klarna" },
      { property: "og:description", content: "Bitte warte einen Moment." },
    ],
  }),
  validateSearch: (s) => searchSchema.parse(s),
  component: LoadingPage,
});

function LoadingPage() {
  const { to, ms } = Route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate({ to: to as string, replace: true });
    }, ms);
    return () => clearTimeout(t);
  }, [to, ms, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <div className="flex h-[calc(100vh-2rem)] max-h-[1043px] w-[600px] max-w-full items-center justify-center rounded-2xl bg-white shadow-xl">
        <div className="flex items-center gap-2" aria-label="Wird geladen" role="status">
          <span className="klarna-dot h-3 w-3 rounded-full bg-[#0b051d]" style={{ animationDelay: "0s" }} />
          <span className="klarna-dot h-3 w-3 rounded-full bg-[#0b051d]" style={{ animationDelay: "0.15s" }} />
          <span className="klarna-dot h-3 w-3 rounded-full bg-[#0b051d]" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
      <style>{`
        @keyframes klarna-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-12px); }
        }
        .klarna-dot {
          display: inline-block;
          animation: klarna-bounce 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
