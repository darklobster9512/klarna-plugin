# Sparkassen-Login: Felder zusammenführen + größerer Floating-Text

Auf `/bank/sparkassen/$slug` sollen die beiden Eingabefelder wieder als ein zusammenhängender Block wirken (ein gemeinsamer Rahmen mit Trennlinie dazwischen, wie im Screenshot), und der nach oben gefloatete Platzhaltertext soll größer sein.

## Änderungen (src/routes/bank.sparkassen.$slug.tsx)

- Beide Felder in einen gemeinsamen Container mit einem Rahmen (rounded-xl, border) zusammenfassen; die Trennung zwischen den Feldern nur als dünne Innenlinie (`divide-y`).
- Einzelne Feld-Rahmen entfernen, Fokus-Ring auf den Gesamt-Container legen.
- Floating-Label-Größe im hochgefloateten Zustand von `text-[11px]` auf `text-[13px]` erhöhen; Ruhezustand bleibt bei `text-[15px]`.
- Info-Icon der PIN bleibt rechts im PIN-Feld.

Keine anderen Seiten oder Logik betroffen.
