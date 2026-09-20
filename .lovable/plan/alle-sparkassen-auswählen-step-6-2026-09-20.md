# Alle Sparkassen auswählen (Step 6)

Wenn man auf `/bank` den Eintrag „Sparkassen" antippt, öffnet sich ein neuer Schritt mit einer Liste aller Sparkassen-Filialen (45 Einträge aus deiner Anweisung).

## Was neu ist

- Neue Seite `/bank/sparkassen` mit:
  - Kopfzeile: Zurück-Pfeil (kreisförmiger Button, führt zurück zu `/bank`) und X-Schließen (führt zu `/confirm`)
  - Titel „Wähle deine Bank aus"
  - Suchfeld „Suche nach deiner Bankfiliale" (filtert die Sparkassen-Liste)
  - Liste aller Sparkassen mit dem bereits selbst gehosteten roten Sparkassen-Logo (aus `bankLogoUrls["sparkassen"]`) — kein externer Nachlade-Aufruf.
- Auf `/bank`: Klick auf „Sparkassen" navigiert zur neuen Seite. Alle anderen Bank-Einträge bleiben unverändert (aktuell ohne eigene Zielseite).

## Sparkassen-Liste (Reihenfolge wie in der Anweisung)

Berliner Sparkasse - Landesbank Berlin, Hamburger Sparkasse, Sparkasse KölnBonn, Kreissparkasse Köln, Sparkasse Hannover, Mittelbrandenburgische Sparkasse in Potsdam, Sparkasse Leipzig, Sparkasse Dortmund, Landessparkasse zu Oldenburg, Sparkasse Duisburg, Stadtsparkasse München, Sparkasse Bremen, Sparkasse Essen, Sparkasse Aachen, Sparkasse Vest Recklinghausen, Ostsächsische Sparkasse Dresden, Frankfurter Sparkasse, Sparkasse Nürnberg, Ostseesparkasse Rostock, Saalesparkasse, Nassauische Sparkasse, Sparkasse Mittelthüringen, Sparkasse Krefeld, Stadt-Sparkasse Düsseldorf, Sparkasse Paderborn-Detmold-Höxter, Sparkasse Hildesheim Goslar Peine, Förde Sparkasse, Sparkasse Bochum, Stadtsparkasse Wuppertal, Sparkasse Neuss, Stadtsparkasse Münsterland Ost, Nord-Ostsee Sparkasse, Sparkasse Westmünsterland, Stadtsparkasse Augsburg, Sparkasse am Niederrhein, Weser-Elbe Sparkasse, NORD/LB - Norddeutsche Landesbank, Sparkasse Holstein, Sparkasse Schwaben-Bodensee, Sparkasse an Volme und Ruhr, Stadtsparkasse Gelsenkirchen, Sparkasse Celle-Gifhorn-Wolfsburg, Sparkasse Osnabrück, Stadtsparkasse Mönchengladbach, Sparkasse Pforzheim Calw.

## Technische Details

- Neue Datei `src/routes/bank.sparkassen.tsx` (Route `/bank/sparkassen`), gleiche Card-Maße/Styles wie `/bank`.
- `banks: string[]` inline, `useState`-Suche, Filter case-insensitive.
- Logo: gemeinsames `bankLogoUrls["sparkassen"]` für alle Zeilen — keine neuen Assets nötig.
- In `src/routes/bank.tsx`: der Listen-Button für „Sparkassen" wird ein `Link to="/bank/sparkassen"`; alle anderen Einträge bleiben normale Buttons.
- Zurück-Pfeil: `Link to="/bank"` im kreisförmigen Rahmen wie im Screenshot.
