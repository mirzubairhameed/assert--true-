"use client";

import { ArrowRight, Clock } from "lucide-react";
import type { Block, Post } from "@/data/posts";
import { CodeBlock } from "./code-block";

export function StatusChip({ status }: { status: Post["status"] }) {
  const labels: Record<Post["status"], string> = {
    green: "passing",
    flaky: "flaky",
    quarantined: "quarantined",
    draft: "drafting",
  };
  return (
    <span className="status-chip" data-status={status}>
      <span className="dot" aria-hidden="true" />
      {labels[status]}
    </span>
  );
}

/** Renders structured post blocks (paragraphs, headings, lists, quotes, code). */
export function ArticleBody({ body }: { body: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {body.map((b, i) => {
        switch (b.type) {
          case "h":
            return (
              <h3 key={i} className="font-display mt-3 text-xl font-bold text-[var(--fg)]">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[0.95rem] leading-[1.85] text-[var(--fg-dim)]">
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2.5 pl-1">
                {b.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[0.92rem] leading-[1.75] text-[var(--fg-dim)]"
                  >
                    <span
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 pl-5 font-display text-lg italic leading-relaxed text-[var(--fg)]"
                style={{ borderColor: "var(--accent)" }}
              >
                {b.text}
              </blockquote>
            );
          case "code":
            return <CodeBlock key={i} code={b.code} lang={b.lang} label={b.label} />;
        }
      })}
    </div>
  );
}

interface ArticleCardProps {
  post: Post;
  onOpen: (post: Post) => void;
}

export function ArticleCard({ post, onOpen }: ArticleCardProps) {
  return (
    <button
      type="button"
      className="article-card"
      onClick={() => onOpen(post)}
      aria-label={`Read note ${post.num}: ${post.title}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-[var(--muted)]">#{post.num}</span>
        <StatusChip status={post.status} />
      </div>

      <h3 className="font-display mb-3 text-[1.45rem] font-black leading-[1.15] tracking-tight text-[var(--fg)]">
        {post.title}
      </h3>

      <p className="mb-6 flex-1 text-[0.9rem] leading-[1.75] text-[var(--fg-dim)]">{post.dek}</p>

      <div className="mb-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md px-2 py-0.5 font-mono text-[0.65rem] text-[var(--muted)]"
            style={{
              border: "1px solid var(--border)",
              background: "var(--bg-elev)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="flex items-center justify-between pt-4 font-mono text-[0.7rem] text-[var(--muted)]"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span className="inline-flex items-center gap-1.5">
          <Clock size={11} aria-hidden="true" />
          {post.date} · {post.read}
        </span>
        <span className="card-arrow inline-flex items-center gap-1.5 text-[var(--fg-dim)]">
          read note
          <ArrowRight size={13} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}
