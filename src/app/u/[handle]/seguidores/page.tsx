import type { Metadata } from "next";
import { FollowListPage } from "@/components/users/FollowListPage";

// Listas de seguidores: contenido fino y duplicado, no aportan nada en Google.
export const metadata: Metadata = { robots: { index: false, follow: true } };

export const dynamic = "force-dynamic";

export default async function SeguidoresPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return <FollowListPage handle={handle} mode="followers" />;
}
