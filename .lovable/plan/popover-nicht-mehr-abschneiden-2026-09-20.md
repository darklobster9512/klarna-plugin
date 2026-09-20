# Popover nicht mehr abschneiden

Der Info-Popover neben dem PIN-Feld wird aktuell vom Eingabefeld-Container abgeschnitten, weil dieser `overflow-hidden` hat.

## Änderung

In `src/routes/bank.sparkassen.$slug.tsx` und `src/routes/bank.volksbanken.$slug.tsx`:

- Popover-Element bekommt `z-50` (höhere Stapelebene).
- Info-Icon-Wrapper (`group`) bekommt `static`-Position hebt bei Bedarf – primär: dem Popover explizit `z-50` geben und sicherstellen, dass es über dem Feldrahmen liegt.
- Der eigentliche Fix gegen das Abschneiden: der äußere Feld-Container darf den Popover nicht clippen. Statt `overflow-hidden` auf dem Feld-Container zu entfernen (bricht abgerundete Ecken), wird der Popover aus dem clippenden Container gelöst, indem er `position: fixed`-artig nicht möglich ist – Alternative: das PIN-Feld selbst ist die clip-Grenze; wir entfernen dort das Clipping und behalten es nur am äußersten Rahmen? Nein: der äußere Rahmen hat `overflow-hidden rounded-xl`. Wir tauschen das gegen abgerundete Ecken via `rounded-xl` ohne `overflow-hidden` und geben den einzelnen Feldern selbst runde Innenkanten nicht nötig, weil die Trennlinie mittig sitzt.

Konkret: `overflow-hidden` vom gemeinsamen Feld-Container entfernen und dem Popover `z-50` geben. Abgerundete Ecken bleiben durch `rounded-xl` erhalten (der Border selbst rundet); nur Kind-Hintergründe könnten überstehen – da die Felder transparent/weiß sind wie der Container, entsteht kein sichtbarer Überstand.
