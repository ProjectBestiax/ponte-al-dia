"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProfileState = { error: string } | null;

export async function updateProfile(_prev: ProfileState, formData: FormData): Promise<ProfileState> {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const name = (formData.get("name") as string)?.trim();
  const username = (formData.get("username") as string)?.trim().toLowerCase().replace(/\s+/g, "");
  const bio = (formData.get("bio") as string)?.trim();

  if (!name) return { error: "El nombre es obligatorio" };
  if (name.length > 60) return { error: "El nombre no puede superar 60 caracteres" };
  if (username && !/^[a-z0-9_]{3,20}$/.test(username)) {
    return { error: "Username: 3-20 caracteres, solo letras minúsculas, números y _" };
  }
  if (bio && bio.length > 200) return { error: "La bio no puede superar 200 caracteres" };

  if (username) {
    const existing = await db.user.findUnique({ where: { username } });
    if (existing && existing.id !== session.user.id) {
      return { error: "Ese username ya está en uso" };
    }
  }

  await db.user.update({
    where: { id: session.user.id },
    data: {
      name,
      username: username || null,
      bio: bio || null,
    },
  });

  revalidatePath("/perfil");
  redirect("/perfil");
}
