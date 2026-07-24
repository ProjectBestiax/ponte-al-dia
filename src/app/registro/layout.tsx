import type { Metadata } from "next";

// Noindex: formulario de registro, no contenido indexable de cara a AdSense/SEO.
export const metadata: Metadata = {
  title: "Crea tu cuenta · Ponte al dIA",
  robots: { index: false, follow: true },
};

export default function RegistroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
