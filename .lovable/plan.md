Floating-Label nicht fett darstellen

- Aktuell: das Label trägt `font-semibold`, wirkt im aktiven Floating-Zustand daher zu dick.
- Änderung in `src/routes/index.tsx`: Label-Klasse von `font-semibold` auf `font-normal` umstellen, damit es im gefüllten/fokussierten Zustand regular dargestellt wird.
- Größe, Farbe und Position des Labels bleiben unverändert.
- Validierung, Fehlermeldung und Weiter-Button bleiben unverändert.
- Build prüfen und Screenshot in der Vorschau verifizieren.
