# Bankauswahl: Echte Bank-Logos aus der Anweisung verwenden

## Ziel
Auf der Bankauswahl-Seite (`/bank`) ersetzen die echten Logo-Bilder aus der hochgeladenen Anweisung (`anweisung-8.txt`) die bisher selbst gebauten Platzhalter-Kreise mit Buchstaben. Die Liste enthält dann alle Banken aus der Anweisung mit ihren Original-Logos.

## Änderungen (nur `src/routes/bank.tsx`)

1. **Bankenliste ersetzen**: Die bisherige `banks`-Liste (24 Einträge mit `bg`/`fg`/`label`-Platzhaltern) wird durch die vollständige Liste aus der Anweisung ersetzt — rund 45 Banken in derselben Reihenfolge, z. B. Sparkassen, Volksbanken, Commerzbank, Postbank, TARGOBANK, Deutsche Bank, ING, Sparda-Bank, Revolut, Klarna Bank AB, DKB, N26, C24, Comdirect, 1822Direkt, GLS Bank, BBBank, HypoVereinsbank, Norisbank, BW-Bank/LBBW, PSD Banken, Bank 1 Saar, bunq, Wise, Santander, MLP, Consorsbank, apoBank, Qonto, Volkswagen Bank, OLB, Pax-Bank, Flessa, Trade Republic, LIGA Bank, National-Bank, EthikBank, Bensberger Bank, Evangelische Bank, Tomorrow, Triodos, DKM, KD-Bank, VietinBank, Edekabank.
2. **Datenmodell**: `Bank` wird zu `{ name: string; logo: string }` — `logo` ist die jeweilige Bild-URL aus der Anweisung.
3. **Logo-Darstellung**: `BankLogo` rendert statt des Farbkreises ein rundes Bild: `<img src={bank.logo} alt="" className="h-10 w-10 rounded-full object-contain" />` (Größe und Zeilenlayout bleiben wie bisher).
4. **Suche bleibt**: Die Filterung über das Suchfeld funktioniert unverändert über die Banknamen.

## Technik
- Die Logo-Bilder werden direkt über ihre Web-URLs eingebunden (keine Kopien im Projekt).
- Keine Änderungen an anderen Seiten, kein neues Routing.
- Danach Build-Check und Screenshot-Prüfung der Seite (Desktop + Mobil), inkl. Suche nach z. B. „Sparkasse".

## Hinweis
Die Bild-Links stammen aus der bereitgestellten Anweisungsdatei; falls ein Link nicht lädt, erscheint ein leerer Kreis — die Bank bleibt per Name und Suche auffindbar.
