# i-Punkt-Popover vergrößern

## Ziel
Der Info-Popover beim PIN-Feld auf den Bank-Login-Seiten (`/bank/sparkassen/$slug` und `/bank/volksbanken/$slug`) soll größer und der Text darin größer dargestellt werden.

## Aktueller Zustand
- Popover-Breite: `w-64` (256 px)
- Padding: `px-3 py-2`
- Textgröße: `text-[12px]`
- Position: links neben dem Info-Icon (`right-full`)

## Geplante Änderung
- Popover-Breite auf `w-72` oder `w-80` erhöhen.
- Padding vergrößern, z. B. `px-4 py-3`.
- Textgröße auf `text-[14px]` oder `text-[15px]` erhöhen.
- Weiche Schatten und abgerundete Ecken beibehalten.
- Änderung in beiden Dateien anwenden:
  - `src/routes/bank.sparkassen.$slug.tsx`
  - `src/routes/bank.volksbanken.$slug.tsx`

## Technische Details
- Popover-Element befindet sich innerhalb des PIN-Felds neben dem `<Info />`-Icon.
- Keine Änderung an Funktionalität, nur Tailwind-Klassen.
- Build anschließend prüfen.
