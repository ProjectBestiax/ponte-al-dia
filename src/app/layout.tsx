import type { Metadata } from "next";
import { Geist, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { BottomNav } from "@/components/layout/BottomNav";
import { TopLoader } from "@/components/layout/TopLoader";
import { Analytics } from "@vercel/analytics/next";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";

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
    images: [
      {
        url: "/api/og?title=Descubre+lo+mejor+de+la+IA%2C+sin+humo+ni+FOMO",
        width: 1200,
        height: 630,
        alt: "Ponte al dIA — Comunidad de IA en español",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ponte al dIA",
    description: "Comunidad de IA en español. Votado por la comunidad.",
    images: ["/api/og?title=Descubre+lo+mejor+de+la+IA%2C+sin+humo+ni+FOMO"],
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
    <html lang="es" className={`${geist.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full overflow-x-hidden`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ponte al dIA" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* Critical layout CSS inlined so the grid never flashes unstyled during streaming */}
        <style dangerouslySetInnerHTML={{ __html: `
          .feed-wrapper{max-width:1280px;margin:0 auto;padding:30px 36px 48px}
          .feed-grid{display:grid;grid-template-columns:226px 1fr 318px;gap:36px}
          @media(max-width:1100px){.feed-grid{grid-template-columns:200px 1fr}.feed-grid .feed-right-sidebar{display:none}}
          @media(max-width:767px){.feed-wrapper{padding:14px 16px 40px;overflow:hidden}.feed-grid{grid-template-columns:1fr}.feed-grid .feed-left-sidebar{display:none}.feed-grid .feed-right-sidebar{display:none}}
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{})` }} />
        {ADSENSE_PUBLISHER_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-white antialiased overflow-x-hidden max-w-[100vw]">
        <Providers>
          <TopLoader />
          <Navbar />
          <main className="flex-1 w-full pb-[58px] sm:pb-0">
            {children}
          </main>
          <footer className="sm:hidden flex flex-wrap justify-center gap-x-4 gap-y-1.5 px-6 py-5 pb-[70px] text-[11px] text-zinc-400" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
            <a href="/instalar" className="hover:text-zinc-600 transition-colors font-semibold text-zinc-600">Instalar app</a>
            <a href="/sobre-nosotros" className="hover:text-zinc-600 transition-colors">Quiénes somos</a>
            <a href="/contacto" className="hover:text-zinc-600 transition-colors">Contacto</a>
            <a href="/privacidad" className="hover:text-zinc-600 transition-colors">Privacidad</a>
            <a href="/cookies" className="hover:text-zinc-600 transition-colors">Cookies</a>
            <span className="w-full text-center text-zinc-300 mt-1">© {new Date().getFullYear()} Ponte al dIA</span>
          </footer>
          <BottomNav />
          <CookieBanner />
          <InstallPrompt />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
