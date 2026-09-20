# Bestätigungsseite /confirm finalisieren

Ziel: Feinschliff an `src/routes/confirm.tsx` für exaktere Typografie/Abstände.

## 1. Oberen Abstand vergrößern

- Scrollbarer Inhaltsbereich (`<div className="flex flex-1 flex-col overflow-y-auto ...">`) bekommt mehr oberes Padding: `pt-14` (statt `pt-10`) auf Mobil, `sm:pt-16` (statt `sm:pt-10`).
- Schließen-X (`absolute right-5 top-5`) bleibt unverändert an ihrer Position.

## 2. Gesamtbetrag-Label entfetten

- Label „Gesamtbetrag": Klasse von `text-[15px] font-semibold text-[#0b051d]` auf `text-[15px] font-normal text-[#0b051d]` ändern.
- Betrag „75,64 €" rechts davon bleibt `text-[22px] font-bold text-[#0b051d]`.

## 3. Kleinere Texte minimal vergrößern

Folgende Texte von `text-[14px]` auf `text-[15px]` bzw. von `text-[13px]` auf `text-[14px]` heben:

- Einleitungstext „Überprüfe vor der Zahlung ..." von `text-[14px]` → `text-[15px]`.
- E-Mail `fabianschmidt253@yopmail.com` von `text-[14px]` → `text-[15px]`.
- Telefonnummer `0176 16146986` von `text-[13px]` → `text-[14px]`.
- `Kaufland.de` von `text-[14px]` → `text-[15px]`.
- `Sofortüberweisung` von `text-[14px]` → `text-[15px]`.
- Unterzeile „Schnell und sicher per Onlinebanking" von `text-[13px]` → `text-[14px]`.

## 4. Schatten unter dem Button entfernen

- Button-Leiste: `shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.08)]` entfernen.
- Optional einen schmalen oberen Rahmen `border-t border-neutral-100` einfügen, falls der weiße Streifen sonst zu „schwebend" wirkt.

## 5. Abstand zwischen den zwei letzten Hinweistexten verringern

- „Es gilt unsere Datenschutzrichtlinie ..." und „Indem du fortfährst ..." bekommen weniger Abstand zueinander.
- Möglichkeit: einzelne `<p>`-Elemente ohne `space-y-3`-Trennung platzieren, stattdessen `space-y-1` innerhalb eines separaten Containers.

## 6. Checkbox-Optik anpassen

- Checkbox: Rahmen dünner (`border` statt aktuell `border-neutral-400`, ggf. `border-[1px]`) und Ecken leicht abgerundet (`rounded` bzw. `rounded-[4px]`).
- Größe bleibt `h-5 w-5`.

## 7. Newsletter-Text an die Hinweistexte anpassen

- „Erhalte Partnerdeals, Angebote und mehr von Klarna." soll gleiche Schriftgröße und Farbe haben wie die Hinweistexte darunter.
- Klasse von `text-[13px] text-[#373544]` auf `text-[12px] text-[#6b6b6b]` ändern (sofern das die aktuelle Farbe der Hinweise ist).

## 8. Verlinkte Hinweistexte schwarz darstellen

- `Abmelden`, `Datenschutzrichtlinie`, `AGB für Sofortüberweisungen`-Links innerhalb der Hinweise sollen schwarz sein.
- Eltern-Container `text-[#6b6b6b]` entfernen bzw. Links explizit `text-black` / `text-[#0b051d]` geben.
- Unterstreichung bleibt.

## Verifikation

- Build-Log prüfen (`/tmp/observability/build-errors.log`).
- Playwright: `/confirm` auf 1280×1800 und 390×844 screenshotten; prüfen: Titel hat mehr oberen Abstand, Button-Leiste ohne Schatten, verlinkte Texte schwarz, Gesamtbetrag-Label nicht fett.
