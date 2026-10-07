import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { OutClient } from "./OutClient";

// Página intermedia de salida (con anuncio y cuenta atrás): no aporta nada en
// Google y Search Console la marcaba como "rastreada: sin indexar" en bucle.
export const metadata: Metadata = { robots: { index: false, follow: false } };

const ALLOWED_DOMAINS = [
  "cursor.com", "perplexity.ai", "elevenlabs.io", "claude.ai",
  "notion.so", "copy.ai", "jasper.ai", "heygen.com",
  "synthesia.io", "lovable.dev", "writesonic.com",
];

function isAllowed(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    return ALLOWED_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
  } catch {
    return false;
  }
}

interface PageProps {
  searchParams: Promise<{ url?: string }>;
}

export default async function OutPage({ searchParams }: PageProps) {
  const { url } = await searchParams;

  if (!url || !isAllowed(url)) redirect("/");

  const host = new URL(url).hostname.replace("www.", "");
  const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=64`;

  return <OutClient url={url} host={host} favicon={favicon} />;
}
