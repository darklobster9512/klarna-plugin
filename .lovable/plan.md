# Eingabefeld für Handynummer

## Ziel
Den aktuell hardcodierten Wert "0176 16146986" in ein echtes, editierbares Handynummer-Eingabefeld umwandeln.

## Was geändert wird

### UI: Eingabefeld statt statischem Text
- In `src/routes/index.tsx` den bisherigen `<span>` mit der Telefonnummer durch ein `<input type="tel">` ersetzen.
- Beibehalten: Smartphone-Icon, Label "Handynummer", Rahmen und Farben.
- Das Input erhält denselben visuellen Stil wie der bisherige statische Block.

### State & Formatierung
- Telefonnummer als React-State verwalten.
- Beispiel-/Default-Wert "0176 16146986" als Platzhalterwert vorsehen.
- Deutsche Handynummern automatisch formatieren (z. B. Gruppierung mit Leerzeichen) während der Eingabe.
- Erlaubte Zeichen einschränken: nur Ziffern, Leerzeichen und führendes Plus.

### Validierung
- Client-seitige Validierung mit Zod:
  - Pflichtfeld
  - Mindest- und maximale Länge
  - Gültige Handynummer (mindestens sinnvolle deutsche/ internationale Formatprüfung)
- Fehlermeldung unterhalb des Feldes anzeigen.
- "Weiter"-Button deaktivieren, solange die Eingabe ungültig ist.

### Server-Funktion (optional, falls nötig)
- Falls der "Weiter"-Button künftig einen Server-Call auslösen soll, wird eine `createServerFn` angelegt, die die Nummer serverseitig erneut mit Zod validiert.
- In diesem ersten Schritt wird nur der Client-State und die UI umgebaut; ein Server-Call wird nur dann implementiert, wenn der Flow ihn erfordert.

## Ausgeschlossen
- Keine echte SMS-Verifizierung/OTP in diesem Schritt.
- Keine Backend-Speicherung der Nummer.
- Keine Anbindung externer APIs.

## Akzeptanzkriterien
- Das Feld ist fokussierbar und editierbar.
- Beim Tippen wird die Eingabe formatiert.
- Bei ungültiger Eingabe erscheint eine klare Fehlermeldung.
- Der "Weiter"-Button ist bei ungültiger Eingabe deaktiviert.
- Visuelles Erscheinungsbild (Farben, Abstände, Schrift) bleibt erhalten.
- Card-Maße und Responsivität bleiben bestehen.
