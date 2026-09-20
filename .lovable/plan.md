# Sparkassen-Login-Seite Feinschliff

Änderungen in `src/routes/bank.sparkassen.$slug.tsx`.

## Was passiert

- Beim Hover über das i-Symbol neben „PIN" öffnet sich links davon ein Tooltip: schwarzer Hintergrund, weiße Schrift, abgerundete Ecken. Text: „Online-Banking PIN, nicht die 4-stellige PIN Ihrer EC-/Maestro-Karte".
- Rahmenfarbe der Felder „Anmeldename oder Legitimations-ID" und „PIN" auf `rgb(112, 110, 123)` gesetzt. Farbe bleibt beim Reinklicken gleich.
- Beim Hover über ein Feld bekommt es einen leicht gräulichen Hintergrund. Beim Reinklicken wird der Hintergrund wieder weiß.
- Platzhaltertext floatet beim Fokus/Eingabe nach oben (gleiches Floating-Label-Muster wie im Handynummer-Feld auf `/`).
- Das Sparkassen-Logo wird größer dargestellt.
- Mehr Abstand zwischen dem Sparkassen-Titel und dem Text „Melde dich mit deinen Onlinebanking-Daten an".

## Technisches

- Tooltip: `group`/`group-hover` auf dem Info-Button, absolut positioniertes Div `right-full mr-2 top-1/2 -translate-y-1/2`, `bg-black text-white text-[12px] rounded-lg px-3 py-2 w-64`, `opacity-0 group-hover:opacity-100 pointer-events-none transition`.
- Felder: Container `border border-[rgb(112,110,123)] rounded-xl hover:bg-neutral-50 focus-within:bg-white transition-colors`, Höhe wie bisher. Floating-Label analog zu index.tsx: Input mit `peer` + `placeholder-transparent`, Label absolut mit `peer-focus:top-2 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]`, sonst `top-1/2 -translate-y-1/2`.
- Logo: aktuelle Größe (z. B. `h-10`) auf ca. `h-14`/`h-16` erhöhen.
- Titel-zu-Untertitel-Abstand: `mt-*`-Klasse des Untertitels erhöhen (z. B. von `mt-1` auf `mt-3`).
