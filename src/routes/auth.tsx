import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Anmelden bei Klarna" },
      { name: "description", content: "Melde dich an oder registriere dich für dein Klarna-Konto." },
      { property: "og:title", content: "Anmelden bei Klarna" },
      { property: "og:description", content: "Melde dich an oder registriere dich für dein Klarna-Konto." },
    ],
  }),
  component: AuthPage,
});

function KlarnaBadge() {
  return (
    <span className="inline-flex items-center rounded-md px-3 py-1 text-3xl font-bold text-[#0b051d]" style={{ backgroundColor: "#FFA8CD" }}>
      Klarna
    </span>
  );
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length >= 6 && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!canSubmit) return;
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const redirectTo = `${window.location.origin}/admin`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectTo },
        });
        if (error) throw error;
        if (data.session) {
          navigate({ to: "/admin" });
        } else {
          setInfo("Konto erstellt. Bitte bestätige deine E-Mail-Adresse und melde dich anschließend an.");
          setMode("login");
        }
      }
    } catch (err: any) {
      setError(err?.message ?? "Etwas ist schiefgelaufen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-0 sm:p-4">
      <div className="relative flex h-screen sm:h-[calc(100vh-2rem)] max-h-none sm:max-h-[1043px] w-[600px] max-w-full flex-col overflow-y-auto rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <div className="flex items-center gap-3">
          <KlarnaBadge />
          <span className="text-sm text-[#6b6b6b]">Admin</span>
        </div>

        <h1 className="mt-8 text-[28px] font-semibold leading-tight text-[#0B051D]">
          {mode === "login" ? "Willkommen zurück" : "Konto erstellen"}
        </h1>
        <p className="mt-2 text-[15px] text-[#373544]">
          {mode === "login"
            ? "Melde dich mit deiner E-Mail-Adresse an."
            : "Registriere dich, um auf das Admin-Dashboard zuzugreifen."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="rounded-xl border border-[rgb(112,110,123)] bg-white px-4 py-3">
            <label htmlFor="email" className="block text-[13px] text-[#6b6b6b]">E-Mail</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-transparent text-[15px] font-semibold text-[#0b051d] outline-none"
              placeholder="name@example.com"
            />
          </div>

          <div className="rounded-xl border border-[rgb(112,110,123)] bg-white px-4 py-3">
            <label htmlFor="password" className="block text-[13px] text-[#6b6b6b]">Passwort</label>
            <input
              id="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-transparent text-[15px] font-semibold text-[#0b051d] outline-none"
              placeholder="Mindestens 6 Zeichen"
            />
          </div>

          {error && <p className="text-[13px] text-red-600">{error}</p>}
          {info && <p className="text-[13px] text-[#4b3bdf]">{info}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 h-14 rounded-full bg-[#0b051d] text-[15px] font-semibold text-white disabled:opacity-40"
          >
            {loading ? "Bitte warten…" : mode === "login" ? "Anmelden" : "Registrieren"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); setInfo(null); }}
          className="mt-6 text-[14px] text-[#4b3bdf] underline"
        >
          {mode === "login" ? "Noch kein Konto? Jetzt registrieren" : "Bereits registriert? Zur Anmeldung"}
        </button>

        <div className="mt-auto pt-8 text-[12px] text-[#6b6b6b]">
          <Link to="/" className="underline">Zurück zur Startseite</Link>
        </div>
      </div>
    </div>
  );
}
