import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Solo jpg, png o webp" }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "Máximo 2MB" }, { status: 400 });

  const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `avatars/${session.user.id}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("pontealdia")
    .upload(filename, buffer, { contentType: file.type, upsert: true });

  if (error) return NextResponse.json({ error: "Error subiendo imagen" }, { status: 500 });

  const { data } = supabase.storage.from("pontealdia").getPublicUrl(filename);

  await db.user.update({
    where: { id: session.user.id },
    data: { image: data.publicUrl },
  });

  revalidatePath("/perfil");
  return NextResponse.json({ url: data.publicUrl });
}
