# Floating-Label-Eingabefeld für Handynummer

## Ziel
Die gewählte Designrichtung „Floating label pattern“ auf das bestehende Handynummer-Feld in `src/routes/index.tsx` anwenden.

## Was geändert wird

### Struktur
- Innerhalb des bisherigen Rahmens bleiben Smartphone-Icon links erhalten.
- Rechts davon wird ein `relative`-Wrapper um `<input>` und `<label>` gelegt.
- Das bisherige separate Label oberhalb des Werts entfällt.

### Verhalten
- Das Input ist ein controlled Component (`value={phone}`, `onChange={handleChange}`).
- Der Platzhalter wird auf `placeholder=" "` gesetzt, damit CSS `:placeholder-shown` funktioniert.
- Solange das Feld leer und nicht fokussiert ist, erscheint „Handynummer“ mittig im Eingabefeld.
- Beim Fokus oder sobald ein Wert vorhanden ist, schiebt sich das Label nach oben und verkleinert sich (Floating-Label-Effekt).

### Styling (angelehnt an Richtung v1)
- Rahmen: `rounded-xl`, neutral-300, bei Fokus schwarzer Rahmen (`focus:border-[#0b051d]`, `focus:ring-1 focus:ring-[#0b051d]`).
- Label: grau (#6b6b6b), im gefüllten/fokussierten Zustand kleiner und oben positioniert.
- Eingabetext: `#373544`, 15 px, semibold.
- Keine Änderung an Hintergrund, Karte, Button, Benefits oder Footer.

### Validierung
- Bestehende Zod-Validierung und Fehlermeldung bleiben erhalten.
- Fehlermeldung erscheint nach wie vor unter dem Feld, wenn die Eingabe ungültig ist.
- Weiter-Button bleibt bei ungültiger Eingabe deaktiviert.

## Ausgeschlossen
- Keine Änderung an der restlichen Card, Farben oder Typografie.
- Keine neue Animation-Bibliothek; der Effekt kommt rein über Tailwind `peer-*` und `transition-all`.

## Akzeptanzkriterien
- Leeres Feld zeigt „Handynummer“ als großen Text innerhalb des Eingabefelds.
- Fokus oder Eingabe hebt das Label nach oben.
- Initialer Wert „0176 16146986“ zeigt das Label direkt oben.
- Icon, Fokus-Ring, Validierung und Button-Verhalten bleiben funktional.
- Build läuft fehlerfrei.
