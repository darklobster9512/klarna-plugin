# Trade-Republic-Logo in der Bankauswahl ergänzen

## Ziel
Auf `/bank` soll Trade Republic wie die anderen Banken mit dem echten Logo erscheinen. Aktuell ist für diesen Eintrag kein Logo hinterlegt, weshalb nur der neutrale „TR“-Kreis angezeigt wird.

## Umsetzung
1. Eine passende offizielle Trade-Republic-Logodatei beschaffen und prüfen.
2. Das Bild auf den bereits verwendeten internen Bild-Speicher hochladen.
3. Den neuen Logo-Verweis in die bestehende Logo-Sammlung aufnehmen.
4. Dem Trade-Republic-Eintrag auf `/bank` den neuen Logo-Schlüssel zuweisen; Namen, Reihenfolge, Suche und übriges Layout bleiben unverändert.
5. Die Bankauswahl auf Desktop und Mobil prüfen und sicherstellen, dass das Logo ohne Ladefehler angezeigt wird.

## Technische Details
- Neuer Asset-Pointer unter `src/assets/bank-logos/`.
- Ergänzung der `bankLogoUrls`-Map in `src/assets/bank-logos/index.ts`.
- `logo` für Trade Republic in `src/routes/bank.tsx` von leer auf den neuen Schlüssel setzen.
- Abschließend Build- und Darstellungsprüfung auf `/bank`.
