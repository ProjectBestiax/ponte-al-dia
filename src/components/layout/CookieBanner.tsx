"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Consent = "accepted" | "rejected" | "premium";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            Usamos cookies propias y de terceros para mejorar tu experiencia y mostrarte publicidad relevante.
            Puedes aceptarlas, rechazarlas, o{" "}
            <a href="/premium" className="text-indigo-600 font-medium hover:underline">
              eliminar todos los anuncios por 1,99€/mes
            </a>
            .
          </p>
          <button
            onClick={reject}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0 mt-0.5"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={accept}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Aceptar cookies
          </button>
          <button
            onClick={reject}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Solo esenciales
          </button>
          <a
            href="/premium"
            className="px-4 py-2 border border-indigo-200 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-50 transition-colors"
          >
            ✨ Sin anuncios — 1,99€/mes
          </a>
        </div>
      </div>
    </div>
  );
}
