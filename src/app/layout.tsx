import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-brand",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bukasovii.vercel.app"),
  title: "Bukasovii · Papas Legendarias",
  description:
    "Nuestra carta: papas legendarias, alitas, hamburguesas, arepas y más. Mira el menú completo con fotos y precios.",
  openGraph: {
    title: "Bukasovii · Papas Legendarias",
    description:
      "Papas legendarias, alitas, hamburguesas, arepas y más. Mira la carta completa con fotos y precios.",
    type: "website",
    locale: "es_CO",
    siteName: "Bukasovii",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-text">{children}</body>
    </html>
  );
}
