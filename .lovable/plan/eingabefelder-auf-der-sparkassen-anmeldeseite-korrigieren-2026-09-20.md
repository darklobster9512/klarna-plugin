# Eingabefelder auf der Sparkassen-Anmeldeseite korrigieren

## Änderungen
- Die mittlere Trennlinie erhält exakt dieselbe Farbe wie der äußere Rahmen der beiden Eingabefelder.
- Der graue Hintergrund erscheint nur beim Darüberfahren mit der Maus und verschwindet sofort, sobald das jeweilige Feld fokussiert ist.
- Der gemeinsame Feldrahmen behält seine abgerundeten Ecken auch während Fokus, Eingabe und Hover; die Inhalte werden sauber innerhalb der Rundung begrenzt.
- Aufbau, Texte, Größen und Eingabelogik bleiben unverändert.

## Prüfung
- Beide Felder auf `/bank/sparkassen/$slug` nacheinander per Maus und Tastatur testen.
- Desktopansicht visuell prüfen: gleiche Rahmenfarben, weißer Fokuszustand und durchgehend sichtbare Rundungen.
- Abschließend den aktuellen Build-Status kontrollieren.
