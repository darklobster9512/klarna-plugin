# Plan: Card-Höhe responsiv an Viewport anpassen

## Ziel
Die Card behält ihre maximale Zielgröße von **600 × 1043 px**, wird aber auf kleineren Bildschirmen an den Viewport angepasst, sodass der gesamte Inhalt sichtbar bleibt und nicht abgeschnitten wird.

## Änderungen
1. **Card-Container** (`src/routes/index.tsx`):
   - Feste Höhe `h-[1043px]` → maximale Höhe `max-h-[1043px]`
   - Höhe skaliert mit Viewport: `h-screen` oder `h-[calc(100vh-2rem)]`, damit sie nie größer als der sichtbare Bereich wird (unter Berücksichtigung des äußeren Paddings `p-4`).
   - Breite bleibt `w-[600px] max-w-full`.
2. **Scrollverhalten**:
   - Bei sehr kleinen Viewports soll der Inhalt innerhalb der Card scrollbar sein (`overflow-y-auto`), falls nötig.
   - Bevorzugt wird aber, dass alles im Viewport bleibt, daher werden Abstände kompakter.
3. **Innere Abstände skalieren**:
   - Vertikale Margins (z. B. `mt-16` beim Button) werden reduziert, damit der Inhalt auch auf kleineren Höhen passt.
   - Footer-Links und Hilfstext bleiben am unteren Rand (`mt-auto` bzw. flex-Verteilung).
4. **Sicherstellen**, dass Card weiterhin vertikal und horizontal zentriert bleibt.

## Akzeptanzkriterien
- Auf großen Bildschirmen: Card ist maximal 600 × 1043 px.
- Auf kleinen Viewports: Card-Höhe passt sich an, sodass sie komplett sichtbar ist (kein vertikales Scrollen der Seite nötig).
- Inhalt bleibt lesbar und nicht abgeschnitten.
- Keine Build-Fehler entstehen.
