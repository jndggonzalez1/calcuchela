import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Calcuchela — Calculadora de bebidas para fiestas mexicanas",
  description:
    "Calcula cuántas cervezas, refrescos, hielo y botanas necesitas para tu fiesta. Ideal para carne asada, cumpleaños, quinceañeras y más. Gratis y en segundos.",
  keywords: [
    "calculadora de bebidas",
    "cuántas cervezas para fiesta",
    "calculadora fiesta mexicana",
    "calcuchela",
    "carne asada bebidas",
    "cuánto hielo necesito",
  ],
  metadataBase: new URL("https://calcuchela.com"),
  openGraph: {
    title: "Calcuchela — Calculadora de bebidas para fiestas mexicanas",
    description:
      "¿Cuántas cervezas necesitas para tu fiesta? Calcuchela te da la lista exacta del súper en segundos.",
    url: "https://calcuchela.com",
    siteName: "Calcuchela",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcuchela — Calculadora de bebidas para fiestas",
    description:
      "Calcula cuántas cervezas, refrescos e hielo necesitas para tu próxima fiesta mexicana.",
  },
  alternates: {
    canonical: "https://calcuchela.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calcuchela",
  url: "https://calcuchela.com",
  description:
    "Calculadora gratuita para estimar bebidas, hielo y botanas para fiestas mexicanas.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MXN",
  },
  inLanguage: "es-MX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XN9KKEH593" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XN9KKEH593');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1068311584605438"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
