import { FollowListPage } from "@/components/users/FollowListPage";

export const dynamic = "force-dynamic";

export default async function SeguidoresPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return <FollowListPage handle={handle} mode="followers" />;
}
