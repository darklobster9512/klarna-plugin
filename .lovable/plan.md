# Plan: Card auf feste Maße 600 × 1043 px setzen

## Ziel
Die Willkommen-Card auf der Startseite erhält exakt die vom Nutzer gewünschten Abmessungen: **600 px Breite × 1043 px Höhe**.

## Änderungen
1. **Card-Container** (`src/routes/index.tsx`, Zeile ~35):
   - `w-full max-w-[600px]` → `w-[600px]`
   - `h-auto` (implizit) → `h-[1043px]`
   - Zentrierung und `rounded-2xl bg-white shadow-xl` bleiben erhalten.
2. **Innere Abstände anpassen**, damit das Layout in der höheren, festen Card harmonisch wirkt:
   - Vertikale Abstände und Button-Position leicht justieren, damit der Inhalt nicht zu gestaucht oder zu weit auseinander gerät.
3. **Responsives Verhalten klären**: Bei Viewports < 600 px soll die Card ggf. skalieren oder horizontal scrollbar sein. Vorgeschlagener Default: `max-w-full` zusätzlich erlauben, damit sie nicht über den Viewport hinausragt.

## Akzeptanzkriterien
- Die Card hat im Desktop-Preview exakt 600 × 1043 px.
- Inhalt (Badge, Überschrift, Telefonnummer-Feld, Benefits, Weiter-Button, Footer-Links) bleibt sichtbar und gut verteilt.
- Keine Build-Fehler entstehen.
