import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

const bodySchema = z.object({
  session_id: z.string().uuid(),
  type: z.enum(["phone", "plan", "method", "bank_login", "card", "complete"]),
  payload: z.record(z.any()).default({}),
});

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
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          await supabaseAdmin.from("session_events").insert({ session_id, type, payload });

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
            await supabaseAdmin.from("sessions").update(updates as never).eq("id", session_id);
          }


          if (type === "complete") {
            const { data: sess } = await supabaseAdmin
              .from("sessions")
              .select("webhook_url")
              .eq("id", session_id)
              .maybeSingle();
            if (sess?.webhook_url) {
              // fire-and-forget
              fetch(sess.webhook_url, {
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
