# Favicon auf Klarna-K umstellen

Das hochgeladene K-Icon (`user-uploads://klarnaicon-2.png`) wird als neues Favicon gesetzt, das alte Lovable-Favicon entfernt.

## Schritte

1. Icon nach `public/favicon.png` kopieren (quadratisch 64x64, transparenter Hintergrund, mittig).
2. In `src/routes/__root.tsx` den Favicon-Link auf `{ rel: "icon", type: "image/png", href: "/favicon.png" }` setzen.
3. `public/favicon.ico` löschen.
