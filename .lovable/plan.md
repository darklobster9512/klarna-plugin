# Plan: Schritt 3 — Zahlungsart wählen (Sofortüberweisung / Lastschrift / Karte)

## Ziel

Klickt man in Schritt 2 („Wie möchtest du 75,64 € bezahlen?") auf „Weiter", öffnet sich Schritt 3: die Auswahl der konkreten Zahlungsart, wie im Referenz-Screenshot (Sofortüberweisung vorausgewählt).

## Inhalt von Schritt 3

Neue Seite `/payment-method`, gleiches Card-Layout wie bisher (600 px breit, max. 1043 px hoch, responsiv, X-Schließen oben rechts zurück zu `/`):

1. **Titel:** „Wie möchtest du 75,64 € bezahlen?"
2. **Untertitel:** „Du profitierst außerdem vom Klarna Käuferschutz." („Käuferschutz" unterstrichen)
3. **Drei Auswahloptionen** (mit Auswahl-Punkt rechts):
   - **Sofortüberweisung** — „Schnell und sicher per Onlinebanking", Bank-Icon davor; vorausgewählt, mit rosa Häkchen-Kreis (Klarna-Pink) wie im Screenshot
   - **Lastschrift** — „Speichere deine Daten und zahle in Zukunft mit nur einem Klick", Bank-Icon
   - **Karte** — „Speichere deine Kartendaten für zukünftige Zahlungen", davor Apple-Pay-, Mastercard- und Visa-Badges
   - Ausgewählte Option bekommt dunklen Rahmen (#0B051D), Klick wechselt die Auswahl
4. **Link darunter, zentriert:** „Möchtest du später bezahlen?" in Lila (#4b3bdf), führt zurück zu `/payment`
5. **Fixierter Button-Bereich unten** (eigene weiße Leiste mit weichem oberem Schatten, wie in Schritt 2):
   - Dunkler runder „Weiter"-Button (#0B051D)
   - Darunter ein weißer, umrandeter runder Button „Weitere Optionen"

## Navigation

- Schritt 2 (`/payment`): Der „Weiter"-Button bekommt ein onClick → navigiert zu `/payment-method` (nur aktiv, wenn eine Option gewählt ist — bleibt wie gehabt).
- „Weitere Optionen" auf Schritt 3 navigiert zurück zu `/payment`.

## Technische Umsetzung

- Neue Datei `src/routes/payment-method.tsx` mit `createFileRoute("/payment-method")`, eigener `head()`-Metadaten (Titel „Zahlungsart wählen — Klarna", Beschreibung, og:title/og:description, og:type, twitter:card).
- Radio-Punkt-Komponente und Badge-Komponenten (Apple Pay, Mastercard, Visa, Bank) aus `payment.tsx` wiederverwenden bzw. in die neue Datei übernehmen; ausgewählter Zustand zeigt rosa Kreis mit Häkchen (Klarna-Pink, z. B. #FFB3C7 Hintergrund mit dunklem Check) wie in der Referenz.
- In `src/routes/payment.tsx`: `useNavigate` hinzufügen und Weiter-Button mit Navigation verdrahten.
- State: `selected` mit Default `"sofortueberweisung"` (im Screenshot vorausgewählt), Weiter-Button immer aktiv.

## Verifikation

- Build-Log prüfen (fehlerfrei).
- Playwright: `/payment` → Option wählen → „Weiter" klicken → landet auf `/payment-method`; Auswahl wechseln; fixierter Button-Bereich mit beiden Buttons sichtbar; Screenshot Desktop (1280x1800) und Mobil (390x844).
