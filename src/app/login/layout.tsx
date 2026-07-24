import type { Metadata } from "next";

// Noindex: formulario de login, no contenido indexable de cara a AdSense/SEO.
export const metadata: Metadata = {
  title: "Iniciar sesión · Ponte al dIA",
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
