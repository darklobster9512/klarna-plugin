import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*, content-type, authorization, x-requested-with, accept, origin",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Expose-Headers": "*",
};

const bodySchema = z.object({ chat_id: z.string().min(1) });

export const Route = createFileRoute("/api/public/telegram-test")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        try {
          const parsed = bodySchema.safeParse(await request.json());
          if (!parsed.success) {
            return new Response(JSON.stringify({ error: "invalid body" }), { status: 400, headers: { "content-type": "application/json", ...CORS } });
          }
          const token = process.env["TELEGRAM_BOT_TOKEN"];
          if (!token) {
            return new Response(JSON.stringify({ error: "TELEGRAM_BOT_TOKEN not configured" }), { status: 200, headers: { "content-type": "application/json", ...CORS } });
          }
          const text = [
            "<b>✅ Test-Nachricht</b>",
            "",
            "Deine Klarna-Admin-Benachrichtigungen funktionieren.",
            `<i>${new Date().toISOString()}</i>`,
          ].join("\n");
          const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ chat_id: parsed.data.chat_id, text, parse_mode: "HTML", disable_web_page_preview: true }),
          });
          const body = await r.text();
          if (!r.ok) {
            return new Response(JSON.stringify({ error: `Telegram ${r.status}: ${body}` }), { status: 502, headers: { "content-type": "application/json", ...CORS } });
          }
          return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json", ...CORS } });
        } catch (e) {
          return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { "content-type": "application/json", ...CORS } });
        }
      },
    },
  },
});
