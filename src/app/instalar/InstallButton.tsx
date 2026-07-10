"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function checkStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches
    || ("standalone" in navigator && (navigator as unknown as { standalone: boolean }).standalone);
}

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const isStandalone = useMemo(() => checkStandalone(), []);
  const [installed, setInstalled] = useState(isStandalone);

  useEffect(() => {
    if (isStandalone) return;

    function onBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, [isStandalone]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  if (installed) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-100 text-green-800 rounded-full text-sm font-bold">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        App instalada
      </div>
    );
  }

  if (deferredPrompt) {
    return (
      <button
        onClick={handleInstall}
        className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-zinc-900 text-white rounded-full text-sm font-bold hover:bg-zinc-700 transition-colors shadow-lg"
      >
        <Download className="w-5 h-5" />
        Instalar app
      </button>
    );
  }

  return (
    <p className="text-xs text-zinc-400">
      Sigue las instrucciones de abajo para instalar desde tu navegador.
    </p>
  );
}
