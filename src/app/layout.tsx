import type { Metadata } from "next";
import { Fraunces, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Belegcheck — Rechnungs-PDFs verstehen, prüfen, nachverfolgen",
  description:
    "Belegcheck liest Rechnungs-PDFs, prüft Beträge und Positionen und behält Zahlungsstatus im Blick. Gebaut für Unternehmen in Deutschland.",
  openGraph: {
    title: "Belegcheck",
    description:
      "Rechnungs-PDFs verstehen, Beträge prüfen, Zahlungen und Positionen im Blick behalten.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
