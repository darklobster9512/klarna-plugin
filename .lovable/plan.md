# Plan: Unterstrich beim Hinweistext entfernen

## Ziel
Auf der Seite „Karte hinzufügen" (/add-card) soll der Hinweis „in diesem Schritt wird nichts berechnet." nicht mehr unterstrichen sein.

## Änderung
- In `src/routes/add-card.tsx` die Klasse `underline` beim Hinweistext entfernen (Farbe und Rest unverändert).

## Technische Details
- Betroffene Zeile: `<span className="underline">in diesem Schritt wird nichts berechnet.</span>` → ohne `underline`.
