import type { Metadata } from "next";
import { Geist, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { TopLoader } from "@/components/layout/TopLoader";

const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ponte al dIA — Comunidad de IA en español",
    template: "%s | Ponte al dIA",
  },
  description:
    "La comunidad hispanohablante para descubrir lo mejor de la IA. Sin humo, sin FOMO. Solo lo que de verdad funciona.",
  keywords: ["inteligencia artificial", "IA", "comunidad", "herramientas", "modelos", "tutoriales"],
  authors: [{ name: "Ponte al dIA" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Ponte al dIA",
    title: "Ponte al dIA — Comunidad de IA en español",
    description: "Descubre lo mejor de la IA sin humo ni FOMO. Votado por la comunidad.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ponte al dIA",
    description: "Comunidad de IA en español. Votado por la comunidad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geist.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <head>
        {ADSENSE_PUBLISHER_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-white antialiased">
        <Providers>
          <TopLoader />
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
