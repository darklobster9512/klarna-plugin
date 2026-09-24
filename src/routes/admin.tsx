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
  FileText,
  ChevronLeft,
  Send,
  Trash2,
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

type SessionRow = {
  id: string;
  shop_domain: string | null;
  customer_email: string | null;
  amount_cents: number | null;
  status: string;
  created_at: string;
};

type SessionEvent = {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  created_at: string;
};

function formatEUR(cents: number | null | undefined): string {
  const c = typeof cents === "number" ? cents : 0;
  return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c / 100) + " €";
}

function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<"dashboard" | "logs" | "telegram">("dashboard");

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
            <button
              onClick={() => setView("dashboard")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left ${view === "dashboard" ? "bg-[#0b051d] text-white" : "text-[#373544] hover:bg-neutral-100"}`}
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </button>
            <button
              onClick={() => setView("logs")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left ${view === "logs" ? "bg-[#0b051d] text-white" : "text-[#373544] hover:bg-neutral-100"}`}
            >
              <FileText className="h-4 w-4" /> Logs
            </button>
            <button
              onClick={() => setView("telegram")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left ${view === "telegram" ? "bg-[#0b051d] text-white" : "text-[#373544] hover:bg-neutral-100"}`}
            >
              <Send className="h-4 w-4" /> Telegram
            </button>
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
              <h1 className="text-2xl font-semibold text-[#0B051D]">{view === "logs" ? "Logs" : view === "telegram" ? "Telegram" : "Dashboard"}</h1>
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

          {view === "logs" ? (
            <LogsView />
          ) : view === "telegram" ? (
            <TelegramView />
          ) : (
            <>
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

              <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#0B051D]">Letzte Transaktionen</h2>
                  <button onClick={() => setView("logs")} className="text-sm text-[#4b3bdf] underline">Alle Logs anzeigen</button>
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function LogsView() {
  const [rows, setRows] = useState<SessionRow[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [events, setEvents] = useState<SessionEvent[] | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    supabase
      .from("sessions")
      .select("id, shop_domain, customer_email, amount_cents, status, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => setRows((data as SessionRow[]) ?? []));
  }, []);

  useEffect(() => {
    if (!selectedId) { setEvents(null); return; }
    setLoadingDetail(true);
    supabase
      .from("session_events")
      .select("id, type, payload, created_at")
      .eq("session_id", selectedId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setEvents((data as SessionEvent[]) ?? []);
        setLoadingDetail(false);
      });
  }, [selectedId]);

  if (selectedId) {
    const sess = rows?.find((r) => r.id === selectedId);
    return (
      <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-sm text-[#4b3bdf] hover:underline">
          <ChevronLeft className="h-4 w-4" /> Zurück zur Liste
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-[#0B051D]">Session {selectedId.slice(0, 8)}…</h2>
          {sess && (
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
              <div><div className="text-[#6b6b6b]">Shop</div><div className="text-[#0B051D]">{sess.shop_domain ?? "—"}</div></div>
              <div><div className="text-[#6b6b6b]">E-Mail</div><div className="text-[#0B051D]">{sess.customer_email ?? "—"}</div></div>
              <div><div className="text-[#6b6b6b]">Betrag</div><div className="text-[#0B051D]">{formatEUR(sess.amount_cents)}</div></div>
              <div><div className="text-[#6b6b6b]">Status</div><div className="text-[#0B051D]">{sess.status}</div></div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-[#0B051D]">Events</h3>
          {loadingDetail && <p className="mt-2 text-sm text-[#6b6b6b]">Lädt…</p>}
          {!loadingDetail && events && events.length === 0 && <p className="mt-2 text-sm text-[#6b6b6b]">Keine Events.</p>}
          <ul className="mt-3 space-y-3">
            {events?.map((ev) => (
              <li key={ev.id} className="rounded-xl border border-neutral-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#0b051d] px-2 py-0.5 text-xs font-semibold uppercase text-white">{ev.type}</span>
                  <span className="text-xs text-[#6b6b6b]">{new Date(ev.created_at).toLocaleString("de-DE")}</span>
                </div>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs text-[#373544]">
{JSON.stringify(ev.payload, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#0B051D]">Sessions</h2>
        <span className="text-xs text-[#6b6b6b]">{rows?.length ?? 0} Einträge</span>
      </div>
      {rows === null && <p className="mt-4 text-sm text-[#6b6b6b]">Lädt…</p>}
      {rows && rows.length === 0 && <p className="mt-4 text-sm text-[#6b6b6b]">Noch keine Sessions.</p>}
      {rows && rows.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[#6b6b6b]">
              <tr>
                <th className="py-2 pr-4 font-normal">Datum</th>
                <th className="py-2 pr-4 font-normal">Shop</th>
                <th className="py-2 pr-4 font-normal">Betrag</th>
                <th className="py-2 pr-4 font-normal">E-Mail</th>
                <th className="py-2 pr-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="text-[#373544]">
              {rows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className="cursor-pointer border-t border-neutral-100 hover:bg-neutral-50"
                >
                  <td className="py-3 pr-4 text-xs text-[#6b6b6b]">{new Date(r.created_at).toLocaleString("de-DE")}</td>
                  <td className="py-3 pr-4">{r.shop_domain ?? "—"}</td>
                  <td className="py-3 pr-4 font-medium">{formatEUR(r.amount_cents)}</td>
                  <td className="py-3 pr-4">{r.customer_email ?? "—"}</td>
                  <td className="py-3 pr-4">
                    <span className={
                      r.status === "paid" ? "rounded-full bg-green-50 px-2 py-1 text-xs text-green-700" :
                      r.status === "pending" ? "rounded-full bg-yellow-50 px-2 py-1 text-xs text-yellow-700" :
                      "rounded-full bg-neutral-100 px-2 py-1 text-xs text-[#373544]"
                    }>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

type TelegramChat = { id: string; chat_id: string; label: string | null; created_at: string };

function TelegramView() {
  const [rows, setRows] = useState<TelegramChat[] | null>(null);
  const [chatId, setChatId] = useState("");
  const [label, setLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("telegram_chats")
      .select("id, chat_id, label, created_at")
      .order("created_at", { ascending: false });
    setRows((data as TelegramChat[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    setError(null);
    if (!chatId.trim()) { setError("Chat ID erforderlich"); return; }
    setSaving(true);
    const { error } = await supabase.from("telegram_chats").insert({ chat_id: chatId.trim(), label: label.trim() || null });
    setSaving(false);
    if (error) { setError(error.message); return; }
    setChatId(""); setLabel(""); load();
  };

  const remove = async (id: string) => {
    await supabase.from("telegram_chats").delete().eq("id", id);
    load();
  };

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-[#0B051D]">Chat ID hinzufügen</h2>
        <p className="mt-1 text-sm text-[#6b6b6b]">
          Benachrichtigungen werden bei jedem <span className="font-medium">paid</span>-Log an alle Chats gesendet.
          Chat-ID erhältst du, indem du deinem Bot eine Nachricht schreibst und <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code> aufrufst.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            value={chatId} onChange={(e) => setChatId(e.target.value)}
            placeholder="Chat ID (z. B. 123456789)"
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#0b051d]"
          />
          <input
            value={label} onChange={(e) => setLabel(e.target.value)}
            placeholder="Bezeichnung (optional)"
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#0b051d]"
          />
          <button
            onClick={add} disabled={saving}
            className="rounded-lg bg-[#0b051d] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "Speichert…" : "Hinzufügen"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-[#0B051D]">Empfänger</h2>
        {rows === null && <p className="mt-4 text-sm text-[#6b6b6b]">Lädt…</p>}
        {rows && rows.length === 0 && <p className="mt-4 text-sm text-[#6b6b6b]">Noch keine Chats.</p>}
        {rows && rows.length > 0 && (
          <ul className="mt-4 divide-y divide-neutral-100">
            {rows.map((r) => (
              <TelegramRow key={r.id} row={r} onRemove={() => remove(r.id)} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
