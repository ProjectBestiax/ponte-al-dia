"use client";

import { useState } from "react";

export function PromptBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard no disponible — no-op
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2.5 py-1 text-xs font-semibold rounded-md bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
      >
        {copied ? "Copiado ✓" : "Copiar"}
      </button>
      <pre
        className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 text-sm whitespace-pre-wrap"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        {text}
      </pre>
    </div>
  );
}
