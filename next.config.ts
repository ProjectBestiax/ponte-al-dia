import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

// Cabeceras de seguridad aplicadas a todas las respuestas.
// (No incluimos CSP estricto para no romper AdSense/Supabase/analytics; se puede
//  añadir en modo Report-Only más adelante y endurecer sin riesgo de lanzamiento.)
const SECURITY_HEADERS = [
  // Anti-clickjacking: nadie externo puede embeber la app en un iframe.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Impide que el navegador "adivine" (MIME-sniff) tipos de contenido.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No filtrar la URL completa como referrer a terceros.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desactiva APIs sensibles que la app no usa.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Forzar HTTPS (defensa en profundidad; Vercel ya redirige).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      { source: "/tendencia", destination: "/populares", permanent: true },
      { source: "/subiendo", destination: "/tendencias", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
    ],
  },
};

// Solo envolvemos con Sentry si hay DSN (evita ruido/errores de build sin claves).
// La subida de source maps solo ocurre si además hay SENTRY_AUTH_TOKEN.
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: true,
      widenClientFileUpload: true,
      disableLogger: true,
    })
  : nextConfig;
