# Eingabefeld-Höhe an Referenz anpassen

## Ziel
Das Handynummer-Feld erhält wieder die deutlich höhere horizontale Form aus dem angehängten Screenshot.

## Änderung
- Die aktuelle Gesamthöhe von etwa 38 px auf etwa 60 px erhöhen.
- Dafür den inneren Feldbereich von `h-9` auf `h-[58px]` setzen; zusammen mit dem Rahmen ergibt das ungefähr 60 px.
- Smartphone-Icon, Breite, Rundung und Rahmen unverändert lassen.
- Floating-Label und Telefonnummer innerhalb der neuen Höhe neu ausrichten, damit das Label oben und der Wert darunter wie in der Referenz sitzen.
- Das Label bleibt regular, die Telefonnummer bleibt größer und semibold.
- Validierung und „Weiter“-Button bleiben unverändert.

## Prüfung
- Höhe im Browser messen und mit der Referenz vergleichen.
- Leeren, fokussierten und ausgefüllten Zustand prüfen.
- Darstellung auf Desktop und Mobilgerät kontrollieren.
