Eingabefeld-Höhe leicht reduzieren

- Aktuell: innerer Container `h-11` (44 px Höhe) + `px-4` horizontal ohne vertikales Padding.
- Änderung: innerer Container auf `h-9` (36 px Höhe) setzen, damit das Feld insgesamt schlanker wirkt.
- Bei Bedarf Padding des Inputs anpassen: `pt-4 pb-1` auf `pt-3 pb-0.5` reduzieren, damit Text und Label im schmaleren Feld nicht anecken.
- Floating-Label-Positionen beibehalten (`top-1/2` mittig im Leerzustand, `top-0.5` im gefüllten/fokussierten Zustand).
- Validierung, Fehlermeldung und Weiter-Button bleiben unverändert.
- Nach der Änderung Build prüfen und Screenshot in der Vorschau verifizieren.
