# Eingabefeld schlanker machen

## Ziel
Das Handynummer-Eingabefeld soll visuall schlanker werden und der Referenz im Screenshot entsprechen – mit beibehaltenem Floating-Label-Verhalten.

## Aktuelles Problem
- Das Feld ist aktuell zu dick: Äußerer Container hat `px-4 py-3`, innerer Flex-Container hat `h-[52px]`.
- Das ergibt eine sehr hohe Box, die nicht mehr wie im Screenshot aussieht.

## Geplante Änderung
- Padding des äußeren Containers auf `px-4` reduzieren (kein vertikales `py-3`).
- Höhe des inneren Feldbereichs von `h-[52px]` auf etwa `h-11` (44 px) oder `h-12` (48 px) reduzieren.
- Floating-Label-Animation beibehalten:
  - Label zentriert im leeren Feld.
  - Beim Fokussieren/Tippen rutscht es klein nach oben.
- Input-Padding (`pt-5 pb-2`) leicht anpassen, damit Text und Label bei der neuen Höhe nicht kollidieren.
- Validierung, Fehlermeldung und Weiter-Button-Verhalten bleiben unverändert.

## Validierung
- Visueller Screenshot-Vergleich mit der Referenz.
- Test der Zustände: leer, fokussiert, gefüllt, Fehler.