"use client";

import { useEffect, useRef } from "react";
import type { EmbedInfo } from "@/lib/embed";

export function EmbedPlayer({ embed }: { embed: EmbedInfo }) {
  const twitterRef = useRef<HTMLDivElement>(null);

  // Carga el script de Twitter/X solo cuando hace falta
  useEffect(() => {
    if (embed.type !== "twitter") return;
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).twttr?.widgets) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).twttr.widgets.load(twitterRef.current);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.head.appendChild(script);
  }, [embed.type]);

  if (embed.type === "youtube") {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mt-4">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${embed.id}?rel=0`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  if (embed.type === "tiktok") {
    return (
      <div className="mt-4 flex justify-center">
        <blockquote
          className="tiktok-embed"
          cite={embed.originalUrl}
          data-video-id={embed.id}
          style={{ maxWidth: 605, minWidth: 325 }}
        >
          <section>
            <a href={embed.originalUrl} target="_blank" rel="noopener noreferrer">
              Ver en TikTok
            </a>
          </section>
        </blockquote>
        <script async src="https://www.tiktok.com/embed.js" />
      </div>
    );
  }

  if (embed.type === "twitter") {
    return (
      <div ref={twitterRef} className="mt-4 flex justify-center">
        <blockquote className="twitter-tweet" data-dnt="true">
          <a href={embed.originalUrl} target="_blank" rel="noopener noreferrer">
            Ver en X / Twitter
          </a>
        </blockquote>
      </div>
    );
  }

  if (embed.type === "instagram") {
    return (
      <div className="mt-4 flex justify-center">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={embed.originalUrl}
          data-instgrm-version="14"
          style={{ maxWidth: 540, minWidth: 326, width: "100%" }}
        >
          <a href={embed.originalUrl} target="_blank" rel="noopener noreferrer">
            Ver en Instagram
          </a>
        </blockquote>
        <script async src="//www.instagram.com/embed.js" />
      </div>
    );
  }

  return null;
}
