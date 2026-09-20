# Persönliche Daten als Schritt 2

## Ziel
Eine neue Seite unter `/step2` erstellen, die dem angehängten Screenshot entspricht. Der bestehende „Weiter“-Button öffnet diese Seite, sobald die Handynummer gültig ist.

## Schritt 1 verbinden
- Den „Weiter“-Button auf der Startseite mit `/step2` verbinden.
- Die bestehende Prüfung der Handynummer beibehalten; bei ungültiger Nummer bleibt der Button deaktiviert.
- Die aktuelle Gestaltung von Schritt 1 unverändert lassen.

## Neue Seite `/step2`
- Dieselbe responsive 600-px-Card und die bestehende Klarna-Farbwelt verwenden.
- Kopfbereich wie in der Referenz: Zurück-Pfeil links, kleines rosa Klarna-Badge mittig und Schließen-Symbol rechts.
- Überschrift und Beschreibung exakt mit den vorgegebenen deutschen Texten übernehmen.
- Formular visuell wie im Screenshot aufbauen:
  - zusammenhängender Rahmen mit drei übereinanderliegenden Feldern für Vorname, Nachname und Geburtsdatum
  - Trennlinien zwischen den drei Feldern
  - Info-Symbol beim Geburtsdatum
  - Hinweis zur deutschen Meldeadresse
  - separates Feld für die Meldeadresse
  - großer dunkler Button „Klarna Account erstellen“ am unteren Rand
- Alle Eingabefelder starten leer; die Beispielnamen „Fabian“ und „Schmidt“ werden nicht vorausgefüllt.
- Labels verhalten sich wie beim bestehenden Feld: zunächst als Platzhalter, bei Fokus oder Eingabe klein nach oben verschoben.
- Zurück führt zu Schritt 1; das Schließen-Symbol bleibt rein visuell ohne neuen Ablauf.

## Eingaben und Prüfung
- Vorname und Nachname als Pflichtfelder mit sinnvoller Maximallänge prüfen.
- Geburtsdatum als echtes Datumsfeld erfassen und auf ein gültiges Datum prüfen.
- Meldeadresse als Pflichtfeld mit Maximallänge prüfen.
- Klare Fehlermeldungen anzeigen und den Erstellen-Button deaktivieren, solange Angaben fehlen oder ungültig sind.
- Da noch keine Speicherung oder Kontoerstellung beauftragt ist, verlassen die Angaben die Seite nicht; der Button führt noch keinen Backend-Vorgang aus.

## Technische Details
- Neue TanStack-Seite `src/routes/step2.tsx` mit eigenen Metadaten für Titel, Beschreibung und Social Preview anlegen.
- Navigation mit TanStack Router umsetzen.
- Bestehende Button-Komponente für die neuen Bedienelemente verwenden.
- Metadaten der Startseite um die noch fehlenden Standardangaben ergänzen.

## Prüfung
- Navigation von Schritt 1 zu `/step2` und zurück testen.
- Leere, fokussierte, ausgefüllte und fehlerhafte Feldzustände prüfen.
- Darstellung mit der Referenz auf Desktop und Mobilgerät vergleichen.
- Abschließend den fehlerfreien Seitenaufbau prüfen.
