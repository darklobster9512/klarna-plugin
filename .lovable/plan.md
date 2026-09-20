# Volksbanken-Auswahl auf /bank/volksbanken

Analog zur Sparkassen-Seite: Klick auf „Volksbanken" in der Bankenliste öffnet eine neue Seite mit allen Volksbanken-Filialen (Namen aus der Anweisung), Suche und Zurück-Pfeil. Alle Zeilen verwenden das bereits intern gehostete Volksbanken-Logo.

## Was passiert für den Nutzer
- Auf `/bank` führt „Volksbanken" jetzt zu einer eigenen Seite.
- Die neue Seite listet 45 Volksbanken-Filialen mit Suchfeld, Zurück-Pfeil und Schließen-X.
- Layout, Farben und Verhalten sind identisch zur Sparkassen-Seite.

## Technische Umsetzung
- Neue Datei `src/routes/bank.volksbanken.tsx` (Route `/bank/volksbanken`), Struktur 1:1 wie `bank.sparkassen.tsx`:
  - Inline-Array `banks: string[]` mit den 45 Namen aus `anweisung-10.txt` (Berliner Volksbank eG … Volksbank Oberberg eG).
  - Titel „Wähle deine Bank aus", Suchfeld „Suche nach deiner Bankfiliale", Fallback „Keine Volksbank gefunden."
  - Zurück-Pfeil `Link to="/bank"`, X-Schließen `Link to="/confirm"`.
  - Alle Zeilen verwenden `bankLogoUrls["volksbanken"]` (bereits vorhanden).
- In `src/routes/bank.index.tsx` den Volksbanken-Eintrag zu einem `Link to="/bank/volksbanken"` machen (analog zum Sparkassen-Eintrag). Sonstige Einträge bleiben unverändert.
