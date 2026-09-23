import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  TrendingUp,
  Search,
  Bell,
  LogOut,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard – Klarna" },
      { name: "description", content: "Übersicht über Umsätze, Nutzer und Transaktionen im Klarna-Admin." },
      { property: "og:title", content: "Admin Dashboard – Klarna" },
      { property: "og:description", content: "Übersicht über Umsätze, Nutzer und Transaktionen im Klarna-Admin." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      setEmail(data.session.user.email ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (!ready) return <div className="min-h-screen bg-neutral-100" />;

  const stats = [
    { label: "Umsatz heute", value: "12.483,20 €", delta: "+8,2 %", up: true, icon: TrendingUp },
    { label: "Aktive Nutzer", value: "3.421", delta: "+124", up: true, icon: Users },
    { label: "Transaktionen", value: "1.208", delta: "-2,1 %", up: false, icon: CreditCard },
    { label: "Rückerstattungen", value: "47", delta: "+3", up: false, icon: ArrowDownRight },
  ];

  const transactions = [
    { id: "TX-10241", user: "Anna Müller", amount: "75,64 €", method: "Sofortüberweisung", status: "Abgeschlossen" },
    { id: "TX-10240", user: "Ben Schulz", amount: "129,00 €", method: "Kreditkarte", status: "Abgeschlossen" },
    { id: "TX-10239", user: "Clara Weber", amount: "42,90 €", method: "In 30 Tagen", status: "Ausstehend" },
    { id: "TX-10238", user: "David Krause", amount: "310,00 €", method: "3 Teilzahlungen", status: "Abgeschlossen" },
    { id: "TX-10237", user: "Elena Fischer", amount: "18,50 €", method: "Sofortüberweisung", status: "Fehlgeschlagen" },
    { id: "TX-10236", user: "Felix Braun", amount: "89,99 €", method: "Kreditkarte", status: "Abgeschlossen" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex sticky top-0 h-screen w-64 flex-col border-r border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-lg font-bold text-[#0b051d]" style={{ backgroundColor: "#FFA8CD" }}>
              Klarna
            </span>
            <span className="text-sm text-[#6b6b6b]">Admin</span>
          </div>

          <nav className="mt-8 flex flex-col gap-1 text-[14px]">
            <a className="flex items-center gap-3 rounded-lg bg-[#0b051d] px-3 py-2 text-white">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#373544] hover:bg-neutral-100">
              <Users className="h-4 w-4" /> Nutzer
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#373544] hover:bg-neutral-100">
              <CreditCard className="h-4 w-4" /> Transaktionen
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#373544] hover:bg-neutral-100">
              <TrendingUp className="h-4 w-4" /> Berichte
            </a>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] text-[#373544] hover:bg-neutral-100"
          >
            <LogOut className="h-4 w-4" /> Abmelden
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-10">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#0B051D]">Dashboard</h1>
              <p className="text-sm text-[#6b6b6b]">Willkommen zurück{email ? `, ${email}` : ""}.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2">
                <Search className="h-4 w-4 text-[#6b6b6b]" />
                <input className="w-48 bg-transparent text-sm outline-none" placeholder="Suchen…" />
              </div>
              <button className="rounded-full border border-neutral-200 bg-white p-2">
                <Bell className="h-4 w-4 text-[#373544]" />
              </button>
              <div className="h-9 w-9 rounded-full bg-[#FFA8CD] text-center text-sm font-semibold leading-9 text-[#0b051d]">
                {(email ?? "A").slice(0, 1).toUpperCase()}
              </div>
            </div>
          </header>

          {/* Stats */}
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6b6b6b]">{s.label}</span>
                    <Icon className="h-4 w-4 text-[#6b6b6b]" />
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-[#0B051D]">{s.value}</div>
                  <div className={`mt-2 inline-flex items-center gap-1 text-xs ${s.up ? "text-green-600" : "text-red-600"}`}>
                    {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {s.delta}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Chart + side */}
          <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#0B051D]">Umsatzverlauf</h2>
                  <p className="text-xs text-[#6b6b6b]">Letzte 7 Tage</p>
                </div>
                <MoreHorizontal className="h-5 w-5 text-[#6b6b6b]" />
              </div>
              <div className="mt-6 flex h-56 items-end gap-3">
                {[42, 68, 55, 80, 60, 92, 74].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-t-lg bg-[#FFA8CD]" style={{ height: `${h}%` }} />
                    <span className="text-[11px] text-[#6b6b6b]">{["Mo","Di","Mi","Do","Fr","Sa","So"][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-[#0B051D]">Zahlungsmethoden</h2>
              <p className="text-xs text-[#6b6b6b]">Verteilung diese Woche</p>
              <ul className="mt-6 space-y-4 text-sm">
                {[
                  { name: "Sofortüberweisung", pct: 48, color: "#0b051d" },
                  { name: "Kreditkarte", pct: 27, color: "#4b3bdf" },
                  { name: "In 30 Tagen", pct: 15, color: "#FFA8CD" },
                  { name: "Teilzahlungen", pct: 10, color: "#8a8a8a" },
                ].map((m) => (
                  <li key={m.name}>
                    <div className="flex items-center justify-between text-[#373544]">
                      <span>{m.name}</span><span className="font-medium">{m.pct}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-neutral-100">
                      <div className="h-2 rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Transactions */}
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#0B051D]">Letzte Transaktionen</h2>
              <a className="text-sm text-[#4b3bdf] underline">Alle anzeigen</a>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[#6b6b6b]">
                  <tr>
                    <th className="py-2 pr-4 font-normal">ID</th>
                    <th className="py-2 pr-4 font-normal">Nutzer</th>
                    <th className="py-2 pr-4 font-normal">Betrag</th>
                    <th className="py-2 pr-4 font-normal">Methode</th>
                    <th className="py-2 pr-4 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[#373544]">
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-t border-neutral-100">
                      <td className="py-3 pr-4 font-mono text-xs">{t.id}</td>
                      <td className="py-3 pr-4">{t.user}</td>
                      <td className="py-3 pr-4 font-medium">{t.amount}</td>
                      <td className="py-3 pr-4">{t.method}</td>
                      <td className="py-3 pr-4">
                        <span className={
                          t.status === "Abgeschlossen" ? "rounded-full bg-green-50 px-2 py-1 text-xs text-green-700" :
                          t.status === "Ausstehend" ? "rounded-full bg-yellow-50 px-2 py-1 text-xs text-yellow-700" :
                          "rounded-full bg-red-50 px-2 py-1 text-xs text-red-700"
                        }>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8 text-xs text-[#6b6b6b]">
            <Link to="/" className="underline">Zur Kunden-Startseite</Link>
          </div>
        </main>
      </div>
    </div>
  );
}
