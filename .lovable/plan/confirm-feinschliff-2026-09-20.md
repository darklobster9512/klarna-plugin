# /confirm Feinschliff

## Ziel
Zwei visuelle Korrekturen auf der Bestätigungsseite (`/confirm`) umsetzen.

## Änderungen

### 1. Checkbox „Erhalte Partnerdeals..." dezenter gestalten
- Input bleibt natives `<input type="checkbox">`.
- Rahmen auf `border` (1 px) belassen, aber der Browser-Fokusring wird entfernt (`focus:outline-none focus:ring-0`), damit keine dicke Outline beim Anklicken erscheint.
- Ecken leicht abgerundet (`rounded-[4px]`).
- Größe und Abstand bleiben erhalten.

### 2. Kein Divider über dem Button
- In der fixierten Button-Leiste am unteren Rand wird `border-t border-neutral-100` entfernt.
- Hintergrund und Padding bleiben unverändert, sodass die Leiste weiterhin sauber auf weißem Grund sitzt.

## Validierung
- Build ausführen lassen.
- Playwright-Screenshot von `/confirm` auf Desktop und Mobil prüfen: Checkbox ohne dicken Fokusring, keine Trennlinie über dem Button.
