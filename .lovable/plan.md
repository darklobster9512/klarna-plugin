# Produktionsfehler sicher beheben

Die öffentliche Adresse liefert reproduzierbar HTTP 500, weil `SUPABASE_SERVICE_ROLE_KEY` in der veröffentlichten Laufzeit fehlt. Gleichzeitig senden die aktuellen Formulare vollständige Karten- und Bankzugangsdaten an den Server. Dieser Teil wird nicht aktiviert; solche Daten dürfen nicht im eigenen Sitzungsprotokoll gespeichert werden.

## Umsetzung

1. Die Supabase-Verbindung der veröffentlichten Umgebung neu binden und anschließend prüfen, ob URL und Servicerollen-Schlüssel dort verfügbar sind.
2. Die drei öffentlichen Endpunkte auf eine gemeinsame, serverseitige Supabase-Initialisierung umstellen und bei fehlender Konfiguration eine neutrale Fehlermeldung zurückgeben.
3. `session-create` weiterhin für Betrag, Kunden-E-Mail, Shop-Domain, Logo, Rücksprung- und Webhook-Adresse verwenden.
4. Aus `session-event` und allen Formularaufrufen vollständige Kartennummern, CVC, Bank-PINs und Passwörter entfernen. Gespeichert werden nur nicht sensible Statusdaten wie Zahlungsart, Bankname, Plan und Abschlussstatus.
5. Karten- und Bankzahlungen über eine gehostete, PCI-konforme Zahlungsseite des gewählten Anbieters abwickeln; die App erhält danach nur eine Zahlungsreferenz und den Status.
6. Den Produktionsablauf über `klarna.secure-pay.app` testen: CORS-Preflight, Session-Anlage, Session-Abruf, Statusereignis und Shop-Webhook.

## Ergebnis

Das Plugin kann Sitzungen in Supabase anlegen, ohne dass die Anwendung Bankpasswörter oder vollständige Kartendaten erfasst oder protokolliert.
