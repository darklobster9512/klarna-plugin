# Dickerer Rahmen für ausgewählte Zahlungsmethode

## Ziel
Der ausgewählte Zahlungsmethode-Button in Schritt 3 (`/payment-method`) soll einen deutlich dickeren Rahmen erhalten, wie auf dem Referenz-Screenshot zu sehen.

## Änderung
- Datei: `src/routes/payment-method.tsx`
- In der `optionClass`-Funktion den Rahmen für den ausgewählten Zustand von `border-[#0b051d]` auf `border-2 border-[#0b051d]` ändern.
- Nicht ausgewählte Optionen behalten den aktuellen dünnen Rahmen (`border-neutral-200`).

## Verifikation
- Build-Check über `build-errors.log`.
- Screenshot der `/payment-method`-Route prüfen: ausgewählte Option zeigt 2 px dicken Rahmen.
