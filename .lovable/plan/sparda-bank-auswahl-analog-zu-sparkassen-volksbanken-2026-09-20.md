# Sparda-Bank-Auswahl analog zu Sparkassen/Volksbanken

Klick auf „Sparda-Bank" in der Bankliste öffnet eine Filialauswahl mit allen 14 Sparda-Banken aus der Anweisung, jeweils mit dem intern gehosteten Sparda-Bank-Logo.

## Filialen (aus der Anweisung, in dieser Reihenfolge)
Sparda-Bank Augsburg, Sparda-Bank Baden-Württemberg, Sparda-Bank Berlin, Sparda-Bank Hamburg, Sparda-Bank Hannover, Sparda-Bank Hessen, Sparda-Bank München, Sparda-Bank Nürnberg, Sparda-Bank Ostbayern, Sparda-Bank Südwest, Sparda-Bank West Düsseldorf, Sparda-Bank West Köln, Sparda-Bank West Münster, Sparda-Bank West Wuppertal.

## Änderungen
- Neue Layout-Route `src/routes/bank.sparda-bank.tsx` (nur `<Outlet />` + head()-Meta), analog zu `bank.sparkassen.tsx`.
- Neue Seite `src/routes/bank.sparda-bank.index.tsx` mit der Filialliste (Struktur 1:1 wie `bank.sparkassen.index.tsx`): Zurück-Pfeil → `/bank`, X → `/confirm`, Suchfeld „Suche nach deiner Bankfiliale", Fallback „Keine Sparda-Bank gefunden.", Logo `bankLogoUrls["sparda-bank"]`, jede Zeile ein Button (noch keine Login-Seite pro Filiale).
- `src/routes/bank.index.tsx`: der Sparda-Bank-Eintrag wird zu `<Link to="/bank/sparda-bank">` (statt Button).

## Nicht Teil dieses Plans
Login-Seite pro einzelner Sparda-Bank (wie bei Sparkassen/Volksbanken $slug) — kann später ergänzt werden, falls gewünscht.
