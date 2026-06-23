import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import { CookieBanner } from "@/components/layout/CookieBanner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
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
    <html lang="es" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-gray-50 antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
            {children}
          </main>
          <CookieBanner />
          <footer className="border-t border-gray-200 bg-white py-6 mt-12">
            <div className="container mx-auto px-4 max-w-5xl text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Ponte al dIA · <a href="/privacidad" className="hover:underline">Privacidad</a> · <a href="/cookies" className="hover:underline">Cookies</a></p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
