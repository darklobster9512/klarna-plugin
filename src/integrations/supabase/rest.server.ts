// Server-only thin REST wrapper around Supabase PostgREST.
// Avoids @supabase/supabase-js so no WebSocket/Realtime code runs in the Worker.

function config() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variable(s): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud.",
    );
  }
  return { url: url.replace(/\/$/, ""), key };
}

function headers(extra: Record<string, string> = {}) {
  const { key } = config();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
    ...extra,
  };
}

async function handle(res: Response) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

function qsEq(filters: Record<string, string | number>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) p.append(k, `eq.${v}`);
  return p;
}

export const sbRest = {
  async insert<T = unknown>(table: string, row: Record<string, unknown>, select?: string): Promise<T[]> {
    const { url } = config();
    const p = new URLSearchParams();
    if (select) p.set("select", select);
    const qs = p.toString();
    const res = await fetch(`${url}/rest/v1/${table}${qs ? `?${qs}` : ""}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(row),
    });
    return (await handle(res)) as T[];
  },
  async select<T = unknown>(
    table: string,
    opts: { select?: string; eq?: Record<string, string | number>; limit?: number } = {},
  ): Promise<T[]> {
    const { url } = config();
    const p = opts.eq ? qsEq(opts.eq) : new URLSearchParams();
    if (opts.select) p.set("select", opts.select);
    if (opts.limit) p.set("limit", String(opts.limit));
    const res = await fetch(`${url}/rest/v1/${table}?${p.toString()}`, { headers: headers() });
    return (await handle(res)) as T[];
  },
  async update<T = unknown>(
    table: string,
    patch: Record<string, unknown>,
    eq: Record<string, string | number>,
  ): Promise<T[]> {
    const { url } = config();
    const p = qsEq(eq);
    const res = await fetch(`${url}/rest/v1/${table}?${p.toString()}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(patch),
    });
    return (await handle(res)) as T[];
  },
};
