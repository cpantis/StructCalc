import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StructCalc — Evaluare Încărcări Structurale",
  description:
    "Calculator online pentru încărcări structurale conform normativelor românești: P100-1/2013 (seismic), CR 1-1-3/2012 (zăpadă), CR 1-1-4/2012 (vânt), EN 1990 (combinații).",
  keywords: [
    "structcalc",
    "încărcări structurale",
    "P100-1/2013",
    "seismic România",
    "zăpadă CR 1-1-3",
    "vânt CR 1-1-4",
    "combinații EN 1990",
    "calculator inginerie",
  ],
  openGraph: {
    title: "StructCalc — Evaluare Încărcări Structurale România",
    description:
      "Calculator gratuit pentru încărcări permanente, zăpadă, vânt și seismice conform normativelor românești în vigoare.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
