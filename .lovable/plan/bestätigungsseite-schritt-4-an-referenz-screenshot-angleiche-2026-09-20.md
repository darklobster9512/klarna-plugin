# Bestätigungsseite (Schritt 4) an Referenz-Screenshot angleichen

Die Seite `/confirm` soll exakter wie im angehängten Screenshot aussehen.

## Anpassungen in `src/routes/confirm.tsx`

1. **Bestellbetrag-Zeile**
   - Label „Bestellbetrag" von Lila (`#4b3bdf`) auf Grau (`#373544`) ändern — im Screenshot ist es schlicht grau.

2. **Betragsblock ans Ende schieben**
   - Im Screenshot sitzt der Betragsblock (Bestellbetrag / Gesamtbetrag) unten, direkt über Checkbox und Button — mit großzügigem Abstand zum Zahlungsart-Block. Den Block mit `mt-auto`-Abstand nach unten drücken, damit die Zeilen oben kompakt bleiben.

3. **Trennlinie über der Checkbox**
   - Unter dem Gesamtbetrag eine horizontale Linie (`border-t border-neutral-200`) einfügen, dann Checkbox und Hinweistexte, wie im Screenshot.

4. **Listenzeilen verfeinern**
   - Oberen Rahmen der Zeilenliste entfernen (nur Trennlinien zwischen den Zeilen + Linie unten, wie im Screenshot).
   - Avatar „FS" etwas größer (ca. `h-10 w-10`).
   - Zeilenabstände/Paddings an Screenshot angleichen (`py-5`).

5. **Typografie**
   - E-Mail und „Kaufland.de" semibold in `#0b051d` (bleibt), Telefonnummer und Unterzeilen grau `#373544` (bleibt).
   - „Gesamtbetrag"-Betrag groß und fett (bleibt `text-[22px] font-bold`).

## Verifikation

- Build-Log prüfen (`/tmp/observability/build-errors.log`).
- Playwright: `/payment-method` → „Weiter" → Screenshot von `/confirm` auf Desktop (1280×1800) und Mobil (390×844), Vergleich mit Referenz.
