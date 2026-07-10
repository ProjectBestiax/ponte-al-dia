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

function checkIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSSteps, setShowIOSSteps] = useState(false);
  const isStandalone = useMemo(() => checkStandalone(), []);
  const isIOS = useMemo(() => checkIOS(), []);
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

  // Android / Chrome: botón que lanza el prompt nativo
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

  // iPhone / iPad: Safari no permite lanzar la instalación por código,
  // así que el botón despliega los pasos exactos.
  if (isIOS) {
    return (
      <div>
        <button
          onClick={() => setShowIOSSteps((v) => !v)}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-zinc-900 text-white rounded-full text-sm font-bold hover:bg-zinc-700 transition-colors shadow-lg"
        >
          <Download className="w-5 h-5" />
          Instalar en iPhone
        </button>

        {showIOSSteps && (
          <div className="mt-4 bg-zinc-900 text-white rounded-2xl p-5 text-left animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-sm font-bold mb-3">Sigue estos 2 pasos en Safari:</p>
            <ol className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-center gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white text-zinc-900 flex items-center justify-center text-xs font-bold">1</span>
                <span>
                  Pulsa el botón compartir
                  <span className="inline-flex items-center mx-1.5 align-middle">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  </span>
                  (abajo en el centro)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white text-zinc-900 flex items-center justify-center text-xs font-bold">2</span>
                <span>Elige <strong className="text-white">&quot;Añadir a pantalla de inicio&quot;</strong></span>
              </li>
            </ol>
          </div>
        )}
      </div>
    );
  }

  return (
    <p className="text-xs text-zinc-400">
      Sigue las instrucciones de abajo para instalar desde tu navegador.
    </p>
  );
}
