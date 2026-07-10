"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PAGE_VIEWS_KEY = "pwa-views";
const DISMISS_KEY = "pwa-dismiss-at";
const MIN_PAGE_VIEWS = 3;
const DISMISS_DAYS = 7;

function getIsIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function shouldShow(): boolean {
  const views = parseInt(localStorage.getItem(PAGE_VIEWS_KEY) ?? "0", 10) + 1;
  localStorage.setItem(PAGE_VIEWS_KEY, String(views));

  if (views < MIN_PAGE_VIEWS) return false;

  const dismissedAt = localStorage.getItem(DISMISS_KEY);
  if (dismissedAt) {
    const elapsed = Date.now() - parseInt(dismissedAt, 10);
    if (elapsed < DISMISS_DAYS * 86_400_000) return false;
  }

  return true;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);
  const isIOS = useMemo(() => getIsIOS(), []);
  const ready = useMemo(() => {
    if (typeof window === "undefined") return false;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      || ("standalone" in navigator && (navigator as unknown as { standalone: boolean }).standalone);
    if (isStandalone) return false;
    return shouldShow();
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (isIOS) {
      const timer = setTimeout(() => setShowIOSTip(true), 3000);
      return () => clearTimeout(timer);
    }

    function onBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, [isIOS]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setDeferredPrompt(null);
    setShowIOSTip(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }, []);

  if (dismissed || !ready) return null;

  if (isIOS && showIOSTip) {
    return (
      <div className="fixed bottom-[66px] left-3 right-3 z-50 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
        <div className="bg-zinc-900 text-white rounded-2xl px-4 py-3.5 shadow-xl border border-zinc-700">
          <button onClick={handleDismiss} className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-white" aria-label="Cerrar">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Instala Ponte al dIA</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Pulsa <span className="inline-flex items-center"><svg className="w-3.5 h-3.5 mx-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg></span> y luego <strong>&quot;Añadir a la pantalla de inicio&quot;</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!deferredPrompt) return null;

  return (
    <div className="fixed bottom-[66px] left-3 right-3 z-50 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-zinc-900 text-white rounded-2xl px-4 py-3.5 shadow-xl border border-zinc-700">
        <button onClick={handleDismiss} className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-white" aria-label="Cerrar">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold">Instala Ponte al dIA</p>
            <p className="text-xs text-zinc-400 mt-0.5">Accede como una app desde tu pantalla de inicio</p>
          </div>
          <button
            onClick={handleInstall}
            className="shrink-0 text-xs font-bold bg-white text-zinc-900 px-3.5 py-2 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Instalar
          </button>
        </div>
      </div>
    </div>
  );
}
