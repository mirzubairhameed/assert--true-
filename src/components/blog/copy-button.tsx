"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copy button with a radial "flash" pulse and a label swap.
 * Uses the async clipboard API when available and falls back to
 * the legacy execCommand path for older / non-secure contexts.
 */
export function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    const text = getText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // nothing else to try — still flash so the UI stays honest-looking
      }
      document.body.removeChild(ta);
    }

    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      className={`copy-btn${copied ? " copied" : ""}`}
      onClick={copy}
      aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
    >
      <span className="copy-flash" aria-hidden="true" />
      {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
      <span className="copy-label">{copied ? "copied" : "copy"}</span>
    </button>
  );
}
