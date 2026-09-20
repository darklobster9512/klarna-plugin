# Popover: schmaler, höher, größerer Text

## Änderung
Popover beim i-Punkt (PIN-Feld) auf `/bank/sparkassen/$slug` und `/bank/volksbanken/$slug`:

- Breite reduzieren: `w-80` → `w-48`
- Padding erhöhen für mehr vertikale Höhe: `px-4 py-3` → `px-4 py-5`
- Textgröße vergrößern: `text-[14px]` → `text-[16px]`
- Text bricht dadurch auf mehrere Zeilen um → schmaler und höher.

## Dateien
- `src/routes/bank.sparkassen.$slug.tsx`
- `src/routes/bank.volksbanken.$slug.tsx`
