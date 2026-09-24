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
  amount_cents: z.number().int().positive(),
  customer_email: z.string().email(),
  shop_domain: z.string().min(1),
  shop_logo_url: z.string().url().optional().nullable(),
  return_url: z.string().url().optional().nullable(),
  webhook_url: z.string().url().optional().nullable(),
});

export const Route = createFileRoute("/api/public/session-create")({
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
          const b = parsed.data;
          const { sbRest } = await import("@/integrations/supabase/rest.server");
          const rows = await sbRest.insert<{ id: string }>(
            "sessions",
            {
              amount_cents: b.amount_cents,
              customer_email: b.customer_email,
              shop_domain: b.shop_domain,
              shop_logo_url: b.shop_logo_url ?? null,
              return_url: b.return_url ?? null,
              webhook_url: b.webhook_url ?? null,
              status: "pending",
            },
            "id",
          );
          const id = rows?.[0]?.id;
          if (!id) {
            return new Response(JSON.stringify({ error: "insert failed" }), {
              status: 500,
              headers: { "content-type": "application/json", ...CORS },
            });
          }
          const origin = new URL(request.url).origin;
          return new Response(
            JSON.stringify({ session_id: id, checkout_url: `${origin}/?session=${id}` }),
            { status: 200, headers: { "content-type": "application/json", ...CORS } },
          );
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
