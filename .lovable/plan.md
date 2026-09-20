# Bank-Logos selbst hosten

Aktuell lädt die Bankauswahl alle 44 Logos direkt von Klarnas Server. Fällt der aus oder blockiert er uns, sind die Bilder weg. Die Logos werden deshalb einmal heruntergeladen und bei uns gehostet.

## Was passiert

1. Alle 44 Logo-Bilder aus der Bankauswahl werden heruntergeladen.
2. Jedes Bild wird auf unseren eigenen Bild-Speicher (Lovable CDN) hochgeladen.
3. In der Bankauswahl werden die externen Adressen durch unsere eigenen ersetzt.
4. Die Bankenliste (Namen, Reihenfolge, Suche, Layout) bleibt unverändert; Trade Republic behält den neutralen Kreis mit „TR", da es dort kein Logo gibt.
5. Danach Kontrolle: Seite öffnen, Screenshot prüfen, dass jedes Logo lädt und kein Bild auf Klarna verweist.

Die Dateien sind winzig (50x50 Pixel), das Laden bleibt also gleich schnell.

## Technische Details

- Download der 44 URLs aus `bankLogos`/`banks` in `src/routes/bank.tsx` nach `/tmp/bank-logos/` mit sprechenden Dateinamen (z. B. `sparkassen.png`).
- Upload je Datei mit `lovable-assets create --file ... --filename <slug>.png`, Ausgabe nach `src/assets/bank-logos/<slug>.png.asset.json`.
- Neues Modul `src/assets/bank-logos/index.ts`: importiert alle Pointer und exportiert eine Map `slug -> url`.
- `src/routes/bank.tsx`: das `logo`-Feld jeder Bank hält künftig den Slug; `<img src={bankLogoUrls[bank.logo]} />`. Keine `x.klarnacdn.net`-Referenz bleibt im Code.
- Verifikation: `rg "klarnacdn" src/` ohne Treffer, Build-Log prüfen, Playwright-Screenshot von `/bank` (Desktop + Mobil) plus Netzwerkcheck auf 404er.
