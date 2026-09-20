# Schritt 2: Persönliche Daten

## Ziel
Eine zweite Seite unter `/step2` als Designvorlage im gleichen Stil wie die erste Karte. Der „Weiter“-Knopf der ersten Seite führt dorthin, sobald die Handynummer gültig ist.

## Inhalt der neuen Seite
Gleiche weiße Karte (600 breit, Höhe passt sich dem Bildschirm an), oben ein Zurück-Pfeil links, das rosa „Klarna“-Zeichen in der Mitte, ein Schließen-Kreuz rechts.

Darunter:
- Überschrift „Bestätige deine persönlichen Daten“
- Erklärtext „Gib bitte deinen vollständigen rechtsgültigen Namen und deine Meldeadresse ein, damit wir deine Identität verifizieren können“ (Teile fett wie im Bild)
- Ein zusammenhängender Eingabeblock mit drei Zeilen und Trennlinien:
  - „Vorname(n) laut Ausweis“
  - „Nachname(n) laut Ausweis“
  - „Geburtsdatum“ mit kleinem Info-Symbol rechts
- Hinweiszeile „Deine Meldeadresse sollte in Deutschland sein“
- Ein eigenes Feld „Meldeadresse (zum Suchen eingeben)“
- Unten der dunkle Knopf „Klarna Account erstellen“

Alle Felder starten leer, mit dem gleichen mitwandernden Beschriftungstext wie auf Seite 1: leer und unfokussiert steht die Beschriftung mittig, beim Tippen rutscht sie klein nach oben. Das Adressfeld zeigt den Text als einfachen Platzhalter, wie im Bild.

## Verhalten
- Zurück-Pfeil führt zurück zur ersten Seite.
- Der Knopf „Klarna Account erstellen“ ist aktiv, sobald Vorname, Nachname, Geburtsdatum und Adresse ausgefüllt sind; er löst noch keine weitere Seite aus (kein Schritt 3 bekannt).
- Farben und Schriftgrößen wie auf Seite 1: Titel #0B051D, Text #373544, Beschriftungen grau.

## Technische Details
- Neue Route `src/routes/step2.tsx` mit eigener `head()`-Metadaten (Titel/Beschreibung für den Schritt).
- Wiederverwendbare Teile (Klarna-Badge, Floating-Label-Feld) werden in `src/components/` ausgelagert, damit beide Seiten identisch aussehen.
- Navigation von Seite 1 über `<Link to="/step2">` bzw. `navigate`, nur bei gültiger Nummer.
- Zod-Validierung pro Feld (nicht leer, Geburtsdatum als Datum im Format TT.MM.JJJJ), Fehlertext unter dem Feld.
- Keine Datenspeicherung, keine Server-Anbindung — reine Designvorlage.
