# Ecken der Anmeldefelder bleiben rund

Ursache: Der äußere Feld-Container hat abgerundete Ecken, aber kein `overflow-hidden` mehr (damit der Popover nicht abgeschnitten wird). Der Hover-Hintergrund `bg-neutral-100` bzw. Fokus-Weiß der inneren Felder ist selbst nicht abgerundet und überdeckt daher die abgerundeten Ecken des Containers.

## Änderung

In `src/routes/bank.sparkassen.$slug.tsx` und `src/routes/bank.volksbanken.$slug.tsx`:

- Erstes Feld (Anmeldename): `rounded-t-xl` ergänzen.
- Zweites Feld (PIN): `rounded-b-xl` ergänzen.

Damit folgen die Hover- und Fokus-Hintergründe der Innenfelder den Rundungen des Containers, und der Popover bleibt sichtbar (kein Clipping am Container).
