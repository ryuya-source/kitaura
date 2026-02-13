"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

type Props = {
  permalinks: string[];
  className?: string;
};

function loadInstagramScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // already loaded
    if (window.instgrm?.Embeds?.process) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("failed to load instagram embed.js")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("failed to load instagram embed.js"));
    document.body.appendChild(script);
  });
}

export default function InstagramEmbeds({ permalinks, className }: Props) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadInstagramScript();
        if (cancelled) return;
        window.instgrm?.Embeds?.process?.();
      } catch {
        // 埋め込み不可（ネットワーク/ブロック）でも画面は壊さない
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [permalinks.join("|")]);

  if (!permalinks.length) return null;

  return (
    <div className={className}>
      {permalinks.map((url) => (
        <div key={url} className="sp8-media__insta-embed">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ margin: 0 }}
          />
        </div>
      ))}
    </div>
  );
}

