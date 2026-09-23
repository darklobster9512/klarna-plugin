# Mobile View: Vollbild ohne Ränder

## Problem
Auf dem Handy haben alle Card-Seiten (Startseite, /payment, /payment-method, /confirm, /add-card, /bank/*, /payment-success, /loading) sichtbare graue Ränder um die weiße Karte. Auf Desktop soll die zentrierte 600px-Karte bleiben.

## Lösung
Auf mobilen Bildschirmen (< sm) füllt die weiße Karte den kompletten Viewport aus — kein Außenabstand, keine abgerundeten Ecken, kein Schatten, kein grauer Hintergrund sichtbar. Ab sm (≥ 640 px) bleibt alles wie bisher: grauer Hintergrund, zentrierte 600×1043-Card mit Rundungen und Schatten.

## Betroffene Dateien
Bei jeder Route-Datei mit dem Card-Wrapper werden die Klassen so angepasst:

- Äußerer Wrapper: `p-4` → `p-0 sm:p-4` (und ähnliche `p-4`-Varianten)
- Card-Container: `rounded-2xl shadow-xl` → `rounded-none shadow-none sm:rounded-2xl sm:shadow-xl`
- Höhe: `h-[calc(100vh-2rem)]` → `h-screen sm:h-[calc(100vh-2rem)]`

Dateien:
- src/routes/index.tsx
- src/routes/payment.tsx
- src/routes/payment-method.tsx
- src/routes/confirm.tsx
- src/routes/add-card.tsx
- src/routes/payment-success.tsx
- src/routes/loading.tsx
- src/routes/bank.index.tsx
- src/routes/bank.sparkassen.index.tsx
- src/routes/bank.sparkassen.$slug.tsx
- src/routes/bank.volksbanken.index.tsx
- src/routes/bank.volksbanken.$slug.tsx
- src/routes/bank.sparda-bank.index.tsx
- src/routes/bank.sparda-bank.$slug.tsx
- src/routes/bank.psd.index.tsx
- src/routes/bank.psd.$slug.tsx
- src/routes/bank.commerzbank.tsx
- src/routes/bank.postbank.tsx
- src/routes/bank.deutsche-bank.tsx
- src/components/BankLoginPage.tsx (deckt die 28 dünnen Bank-Routen ab)

## Verifikation
- Build-Log
- Playwright-Screenshot 390×844 (mobile) auf /, /payment-method, /bank, /bank/sparkassen — Karte randlos, füllt Screen
- Playwright-Screenshot 1280×1800 (desktop) auf denselben Routen — Card weiterhin zentriert mit Rand
