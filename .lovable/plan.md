# Feinschliff `/confirm` zur Referenz

Gezielte Anpassungen in `src/routes/confirm.tsx`, damit die Seite 1:1 der Referenz `popup5-4.png` entspricht. Bankauswahl-Weiterleitung und Layout-Grundgerüst bleiben unverändert.

## Änderungen

1. **Titel größer und kräftiger.** „Bestätigen und bezahlen" von `text-[26px]` auf `text-[30px]` mit `font-extrabold`.
2. **Untertitel-Farbe angleichen.** Untertitel bleibt `text-[14px]`, Farbe auf `text-[#0b051d]/80` bzw. gleiches Grau wie Referenz (`#373544` behalten, aber Zeilenhöhe leicht erhöhen mit `leading-snug`).
3. **Trennlinie über der Checkbox entfernen.** Die Referenz zeigt keinen sichtbaren Strich zwischen Beträgen und Newsletter-Checkbox — `border-t border-neutral-200 pt-5` wird zu reinem `pt-6` ohne Rahmen.
4. **Hinweistexte dunkler.** „Wir informieren…", „Es gilt unsere…", „Indem du fortfährst…" von `text-[#6b6b6b]` auf `text-[#373544]` (wie in der Referenz sichtbar).
5. **Bottom-Bar-Schatten entfernen.** Referenz zeigt keinen sichtbaren Schatten über dem Button — `shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.08)]` entfernen, damit die Button-Zone flach anschließt.
6. **Button leicht runder und größer.** `py-4` bleibt, aber Font auf `text-[16px]` für bessere Übereinstimmung.
7. **Kaufland-Logo-Größe.** Von `h-9 w-9` auf `h-10 w-10` angleichen, damit es mit Avatar-/Wallet-Höhe konsistent ist.
8. **Gesamtbetrag-Label leicht dunkler/größer.** „Gesamtbetrag" auf `text-[16px] font-semibold`.

Alle anderen Elemente (Reihenfolge, Icons, Links, Käuferschutz-Unterstreichung, Bank-Weiterleitung) bleiben identisch.

## Verifikation

- Build-Log prüfen (`/tmp/observability/build-errors.log`).
- Playwright-Screenshot von `/confirm` auf Desktop (1280×1800) mit `popup5-4.png` vergleichen.
