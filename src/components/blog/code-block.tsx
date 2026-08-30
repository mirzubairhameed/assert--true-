"use client";

import { useMemo } from "react";
import { tokenize } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  lang: string;
  label?: string;
}

/**
 * Terminal-styled code block: window dots, file label, copy-flash button,
 * and regex-tokenized highlighting rendered as spans (never raw HTML).
 */
export function CodeBlock({ code, lang, label }: CodeBlockProps) {
  const tokens = useMemo(() => tokenize(code, lang), [code, lang]);

  return (
    <figure className="code-shell my-6">
      <figcaption className="code-head">
        <span className="inline-flex min-w-0 items-center gap-3">
          <span className="code-dots shrink-0" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="code-lang truncate">{label ?? lang}</span>
        </span>
        <CopyButton getText={() => code} />
      </figcaption>
      <pre className="overflow-x-auto p-5 md:p-6 text-xs md:text-[0.83rem] leading-[1.75] text-[var(--fg)]">
        <code className="font-mono">
          {tokens.map((t, i) =>
            t.cls ? (
              <span key={i} className={t.cls}>
                {t.text}
              </span>
            ) : (
              <span key={i}>{t.text}</span>
            )
          )}
        </code>
      </pre>
    </figure>
  );
}
