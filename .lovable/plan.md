# Sparkassen-Seite zeigt alle Banken

## Ziel
Auf `/bank/sparkassen` sollen nur die Sparkassen-Filialen erscheinen, nicht die allgemeine Bankenliste.

## Befund
Die Datei `src/routes/bank.sparkassen.tsx` ist korrekt: Sie rendert ausschließlich die Sparkassen-Liste (45 Einträge) mit eigener Suche. Das Problem liegt sehr wahrscheinlich daran, dass der Seiten-Index (die automatisch erzeugte Routen-Datei) die neue Seite noch nicht (oder veraltet) kennt und stattdessen die normale Bankenliste anzeigt.

## Vorgehen
1. Diagnose: Die erzeugte Routen-Datei prüfen (`src/routeTree.gen.ts`) und die Seite `/bank/sparkassen` im Browser aufrufen, um zu sehen, welche Liste tatsächlich gerendert wird.
2. Falls der Index veraltet ist: Vorschau-Server einmal neu starten, damit er die neue Seite korrekt einliest.
3. Falls die neue Seite geladen wird, aber falsch aussieht: den Fehler in `bank.sparkassen.tsx` beheben.
4. Verifikation: Browser-Test auf Desktop und Handy — `/bank` zeigt alle Banken, `/bank/sparkassen` zeigt nur Sparkassen, Suche funktioniert auf beiden Seiten.

## Technische Details
- Betroffene Dateien: `src/routeTree.gen.ts` (wird automatisch neu erzeugt, nicht von Hand bearbeitet), ggf. `src/routes/bank.sparkassen.tsx`.
- Keine inhaltlichen Änderungen an Bankliste, Logos oder Layout geplant.
