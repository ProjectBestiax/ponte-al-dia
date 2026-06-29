import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { EditProfileForm } from "./EditProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editar perfil · Ponte al dIA" };

export default async function EditarPerfilPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, username: true, bio: true, image: true, email: true, emailReplies: true, emailDigest: true },
  });

  if (!user) redirect("/login");

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 24px 64px" }}>
      <EditProfileForm user={user} />
    </div>
  );
}
