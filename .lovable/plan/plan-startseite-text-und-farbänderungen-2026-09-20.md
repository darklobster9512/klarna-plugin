# Plan: Startseite-Text- und Farbänderungen

## Ziel
Auf `/` (src/routes/index.tsx) drei kleine visuelle Korrekturen vornehmen.

## Änderungen

1. **„angemeldet"-Textfarbe**
   - Der markierte Text `angemeldet` in „Du bleibst angemeldet, damit du schneller zugreifen kannst" soll die Farbe `rgb(92, 50, 184)` erhalten.
   - Vorgang: `text-[#4b3bdf]` durch `text-[rgb(92,50,184)]` ersetzen.

2. **Untertitel-Zeilenumbruch**
   - Der Untertitel „Wir machen Zahlungen einfach und flexibel. Lass uns deine Nummer verifizieren." soll breiter werden, sodass bei der Standard-Kartenbreite (600 px) nur noch „verifizieren." in einer zweiten Zeile steht.
   - Vorgang: `max-w-md` im Untertitel entfernen oder auf einen größeren Wert setzen, während `text-center` erhalten bleibt.

3. **Footer-Links-Farbe**
   - Die Links „Nutzungsbedingungen", „Datenschutz", „Cookies" sollen explizit die Farbe `rgb(55, 53, 68)` tragen.
   - Vorgang: Klassen der drei `<a>`-Elemente auf `text-[rgb(55,53,68)] underline` setzen.

## Technische Details
- Betroffene Datei: `src/routes/index.tsx`
- Keine neuen Routen, keine neuen Abhängigkeiten.
- Validierung: Build prüfen und Playwright-Screenshot auf `/` erstellen.