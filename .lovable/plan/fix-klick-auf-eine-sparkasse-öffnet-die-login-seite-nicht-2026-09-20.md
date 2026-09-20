# Fix: Klick auf eine Sparkasse öffnet die Login-Seite nicht

## Was passiert

Auf `/bank/sparkassen` bleibt die Seite beim Klick auf eine Sparkasse gleich – die Login-Unterseite wird nicht angezeigt.

## Ursache

`src/routes/bank.sparkassen.tsx` ist gleichzeitig Seite (mit der Filialliste) **und** Elternroute der Unterseite `/bank/sparkassen/$slug`. Weil die Elternroute kein `<Outlet />` rendert, kann die Kindroute nicht einsteigen. Genau derselbe Fall wie zuvor bei `/bank` vs. `/bank/sparkassen`.

## Fix

Gleiches Muster wie bei `/bank`:

1. `src/routes/bank.sparkassen.tsx` wird zur reinen Layout-Route und rendert nur noch `<Outlet />` (Titel `head()` bleibt).
2. Die komplette bisherige Filialliste (Suche, Zurück-Pfeil, Liste, Logo, „Keine Sparkasse gefunden.") wandert unverändert in eine neue Datei `src/routes/bank.sparkassen.index.tsx` mit Route `/bank/sparkassen/`.
3. `src/routes/bank.sparkassen.$slug.tsx` bleibt unverändert.

Danach zeigt `/bank/sparkassen` weiterhin die Liste, und ein Klick auf eine Sparkasse öffnet korrekt die Login-Seite dieser Sparkasse.

## Verifikation

Nach dem Umbau kurz per Playwright auf `/bank/sparkassen` gehen, „Berliner Sparkasse" anklicken und prüfen, dass die URL auf `/bank/sparkassen/berliner-sparkasse-landesbank-berlin` wechselt und die Login-Felder erscheinen.
