Floating-Label weiter nach oben und Eingabetext größer

- Aktuell: gefüllter/fokussierter Zustand setzt das Label auf `top-0.5` / `text-[10px]`; der eingegebene Text ist `text-[15px]`.
- Änderungen in `src/routes/index.tsx`:
  1. Label im aktiven Zustand höher schieben: `peer-focus:top-0.5` und `peer-[:not(:placeholder-shown)]:top-0.5` auf `top-0` bzw. `top-[1px]` ändern, damit das Label noch deutlicher oben sitzt.
  2. Label-Schrift leicht vergrößern: `text-[10px]` auf `text-[11px]` oder `text-[12px]` erhöhen, damit es lesbarer bleibt.
  3. Eingabetext vergrößern: Input-Klasse `text-[15px]` auf `text-[16px]` oder `text-[17px]` anpassen.
  4. Falls nötig Padding des Inputs leicht anpassen (`pt-3 pb-0.5`), damit Text und Label nicht kollidieren.
- Validierung, Fehlermeldung und Weiter-Button bleiben unverändert.
- Build prüfen und Screenshot in der Vorschau verifizieren.
