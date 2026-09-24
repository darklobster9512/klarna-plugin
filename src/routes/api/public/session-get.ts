import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*, content-type, authorization, x-requested-with, accept, origin",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Expose-Headers": "*",
};

export const Route = createFileRoute("/api/public/session-get")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: async ({ request }) => {
        const id = new URL(request.url).searchParams.get("id");
        if (!id) {
          return new Response(JSON.stringify({ error: "missing id" }), {
            status: 400,
            headers: { "content-type": "application/json", ...CORS },
          });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("sessions")
          .select("amount_cents, customer_email, shop_domain, shop_logo_url, status")
          .eq("id", id)
          .maybeSingle();
        if (error || !data) {
          return new Response(JSON.stringify({ error: error?.message ?? "not found" }), {
            status: 404,
            headers: { "content-type": "application/json", ...CORS },
          });
        }
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "content-type": "application/json", ...CORS },
        });
      },
    },
  },
});
