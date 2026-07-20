import Link from "next/link";
import { auth } from "@/lib/auth";
import { NewDebateForm } from "./NewDebateForm";

export default async function NewDebatePage() {
  const session = await auth();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1
        className="text-xl font-bold text-zinc-900 mb-4"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Abrir un debate
      </h1>

      {session ? (
        <NewDebateForm />
      ) : (
        <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-600 text-center">
          <Link href="/login" className="text-accent-700 font-medium hover:underline">Entra</Link> para abrir un debate
        </div>
      )}
    </div>
  );
}
