# Plan: Farbanpassungen in der Willkommens-Card

## Ziel
Textfarben in der Card an die Vorgaben des Nutzers anpassen.

## Änderungen
1. **Label "Handynummer"** (`src/routes/index.tsx`):
   - Aktuell `text-[#4b3bdf]` (lila) → ändern in einen gräulichen Ton, z. B. `text-neutral-500` oder `text-[#6b6b6b]`.
2. **Titel "Willkommen bei"**:
   - Bereits `text-[#0b051d]` → unverändert lassen.
3. **Normaler Fließtext**:
   - Untertitel, Benefits-Text, Footer-Hinweis: auf `text-[#373544]` setzen.
   - Ausnahme: Das Wort **"angemeldet"** behält seine lila Farbe `text-[#4b3bdf]`.
4. **Prüfung**, dass keine anderen Texte ungewollt lila bleiben.

## Akzeptanzkriterien
- "Handynummer"-Label ist grau, nicht lila.
- Haupttitel bleibt #0B051D.
- Normaler Text (Untertitel, Benefits, Footer-Hinweis) ist #373544.
- "angemeldet" ist weiterhin lila.
- Keine Build-Fehler entstehen.
