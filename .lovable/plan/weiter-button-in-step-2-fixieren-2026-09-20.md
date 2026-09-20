# Weiter-Button in Step 2 fixieren

## Ziel
Auf der Zahlungsmethoden-Seite (`/payment`) soll der „Weiter"-Button am unteren Rand der Card fixiert sein, als eigene Leiste/Card mit Schatten-Effekt – entsprechend dem angehängten Screenshot.

## Umsetzung

### Layout-Anpassung in `src/routes/payment.tsx`
- Die Haupt-Card behält ihre Größe (`w-[600px] max-w-full`, `h-[calc(100vh-2rem)] max-h-[1043px]`).
- Innerer Aufbau ändern zu:
  - Scrollbarer Bereich (`flex-1 overflow-y-auto`) für Titel, Untertitel und alle vier Zahlungsoptionen.
  - Separate untere Leiste für den „Weiter"-Button, die am unteren Rand der Card klebt (`sticky bottom-0` oder Teil des Flex-Layouts ohne Scroll).
- Der Button-Bereich bekommt:
  - weißen Hintergrund (`bg-white`),
  - horizontale Innenabstände (`px-8 pb-6 pt-3` bzw. angepasst an `sm:p-10`),
  - oberen Schatten (`shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.08)]` oder ähnlicher weicher Verlauf),
  - optional feine obere Border/Trennlinie.
- Der Button selbst bleibt unverändert: dunkel, abgerundet, deaktiviert ohne Auswahl.
- Der Schließen-Button (X) bleibt absolut oben rechts sichtbar.

### Inhaltliche Anpassungen
- Keine; Titel, Optionen, Auswahl-Logik und Texte bleiben wie bisher.
- Sicherstellen, dass der scrollbare Bereich genug unteren Abstand hat, damit die letzte Zahlungsoption nicht von der Button-Leiste verdeckt wird.

## Verifikation
- Build-Check nach der Änderung.
- Playwright-Screenshot von `/payment` auf Desktop- und Mobil-Viewport: Button sitzt fix unten, Schatten ist sichtbar, letzte Option ist scrollbar und nicht verdeckt.
