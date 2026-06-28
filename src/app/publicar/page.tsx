import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PublishForm } from "./PublishForm";
import { getCategories } from "@/lib/posts";

export const metadata = { title: "Publicar" };

export default async function PublishPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const categories = await getCategories();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">Publicar en Ponte al dIA</h1>
      <PublishForm categories={categories} />
    </div>
  );
}
