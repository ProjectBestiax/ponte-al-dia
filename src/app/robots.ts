import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  // Solo bloqueamos lo que NUNCA debe rastrearse (admin, API). Las páginas de
  // utilidad (/perfil, /login, /registro, /publicar, /alertas) llevan noindex
  // en su metadata: si las bloqueáramos aquí, Google no podría rastrearlas para
  // VER el noindex y las indexaría igual desde enlaces externos (justo el aviso
  // "indexada aunque robots.txt la bloqueaba" de Search Console). Dejarlas
  // rastreables permite que el noindex las saque del índice de verdad.
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
