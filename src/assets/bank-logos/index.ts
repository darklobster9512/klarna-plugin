const slugs = [
  "apobank","bank1saar","bbbank","bensberger","bunq","bw-bank","c24-bank",
  "comdirect","commerzbank","consorsbank","deutsche-bank","direkt1822","dkb",
  "dkm","edekabank","ethikbank","evangelische","flessa","gls-bank",
  "hypovereinsbank","ing","kd-bank","klarna-bank","liga-bank","mlp","n26",
  "national-bank","norisbank","olb","pax-bank","postbank","psd-banken","qonto",
  "revolut","santander","sparda-bank","sparkassen","targobank","tomorrow",
  "trade-republic","triodos","vietinbank","volksbanken","vw-bank","wise",
];

export const bankLogoUrls: Record<string, string> = Object.fromEntries(
  slugs.map((s) => [s, `/bank-logos/${s}.png`]),
);
