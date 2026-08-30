"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Post } from "@/data/posts";
import { ArticleBody, StatusChip } from "./article-card";

interface ArticleModalProps {
  post: Post;
  onClose: () => void;
}

export function ArticleModal({ post, onClose }: ArticleModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
        <div
          ref={panelRef}
          className="modal-panel flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border outline-none sm:rounded-2xl"
          style={{
            background: "var(--bg-elev)",
            borderColor: "var(--border-strong)",
            boxShadow: "var(--shadow-raise)",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div
            className="flex items-start justify-between gap-4 border-b p-6 md:p-8"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-[var(--muted)]">#{post.num}</span>
                <StatusChip status={post.status} />
                <span className="font-mono text-[0.7rem] text-[var(--muted)]">
                  {post.category} · {post.difficulty} · {post.date} · {post.read} read
                </span>
              </div>
              <h2
                id="article-modal-title"
                className="font-display text-3xl font-black leading-[1.12] tracking-tight text-[var(--fg)] md:text-4xl"
              >
                {post.title}
              </h2>
              <p className="mt-3 font-display text-base italic text-[var(--muted)]">{post.dek}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close article"
              className="shrink-0 rounded-full p-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              style={{ border: "1px solid var(--border)" }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {/* body */}
          <div className="overflow-y-auto p-6 md:p-8" style={{ background: "var(--bg-elev-2)" }}>
            <ArticleBody body={post.body} />

            <div
              className="mt-10 flex items-center justify-between border-t pt-5 font-mono text-[0.7rem] text-[var(--muted)]"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span>— written, tested, and signed off at the QA desk</span>
              <span>assert(true)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
