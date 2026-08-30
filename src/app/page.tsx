"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FlaskConical,
  Github,
  SkipForward,
  TerminalSquare,
} from "lucide-react";
import { ARCHIVE_DRAFTS, CATEGORIES, POSTS, type Post } from "@/data/posts";
import { ProgressBar } from "@/components/blog/progress-bar";
import { Typewriter } from "@/components/blog/typewriter";
import { ThemeToggle } from "@/components/blog/theme-toggle";
import { GitHubHeroStats, GitHubPill } from "@/components/blog/github-stats";
import { CodeBlock } from "@/components/blog/code-block";
import { ArticleCard, StatusChip } from "@/components/blog/article-card";
import { ArticleModal } from "@/components/blog/article-modal";

const NAV_LINKS = [
  { href: "#notes", label: "notes" },
  { href: "#snippets", label: "snippets" },
  { href: "#archive", label: "archive" },
  { href: "#about", label: "about" },
];

const TYPEWRITER_HOOK_CODE = `import { useEffect, useState } from "react";

// The hook powering this page's greeting. No deps, ~30 lines.
const LINES = [
  "expect(reality).toMatch(spec);",
  "breaking builds so users don't have to.",
];

export function useTypewriter(holdMs = 1900) {
  const [text, setText] = useState("");

  useEffect(() => {
    let line = 0, chars = 0, erasing = false, timer;

    const tick = () => {
      const current = LINES[line];
      if (!erasing) {
        chars++;
        setText(current.slice(0, chars));
        if (chars === current.length) {
          erasing = true;
          timer = setTimeout(tick, holdMs);   // hold the thought
          return;
        }
        timer = setTimeout(tick, 62 + Math.random() * 46);
        return;
      }
      chars--;
      setText(current.slice(0, chars));
      if (chars === 0) {
        erasing = false;
        line = (line + 1) % LINES.length;
        timer = setTimeout(tick, 420);
        return;
      }
      timer = setTimeout(tick, 26);
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [holdMs]);

  return text;
}`;

const PLAYWRIGHT_SNIPPET = `import { test, expect } from "@playwright/test";

test("regression: discount survives a page refresh (QA-208)", async ({ page }) => {
  await page.goto("/cart?sku=QA-TEE&code=FLAKE-FREE");

  await page.reload(); // the step that used to hide the bug

  const banner = page.getByTestId("discount-banner");
  await expect(banner).toBeVisible();
  await expect(banner).toContainText("FLAKE-FREE applied");

  await expect(page.getByTestId("cart-total")).toHaveText("$45.00");
});`;

const PYTEST_FIXTURE_SNIPPET = `import pytest

@pytest.fixture
def fresh_cart(db, clock):
    """One cart per test, its own schema, deterministic clock.

    The single-writer rule: no two running tests ever touch
    the same rows, so order cannot change outcomes.
    """
    with db.isolate_schema() as schema:
        yield Cart(repository=db.for_schema(schema), now=clock.frozen_at)`;

function SectionHeader({
  eyebrow,
  title,
  dek,
}: {
  eyebrow: string;
  title: string;
  dek: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="mb-4 font-mono text-xs tracking-[0.18em] text-[var(--muted)]">{eyebrow}</p>
      <h2 className="font-display mb-5 text-4xl font-black leading-[1.04] tracking-tight text-[var(--fg)] md:text-6xl">
        {title}
      </h2>
      <p className="max-w-2xl text-[1.02rem] leading-[1.8] text-[var(--fg-dim)]">{dek}</p>
    </div>
  );
}

function LatestRunCard() {
  return (
    <div className="code-shell rotate-[0.6deg]">
      <div className="code-head">
        <span className="inline-flex items-center gap-3">
          <span className="code-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="code-lang">ci · latest run on main</span>
        </span>
        <span className="status-chip" data-status="green">
          <span className="dot" aria-hidden="true" />
          green
        </span>
      </div>
      <div className="p-5 md:p-6" style={{ background: "var(--code-bg)" }}>
        <div className="term-line" style={{ color: "var(--fg-dim)" }}>
          <span style={{ color: "var(--muted)" }}>$ </span>
          pytest -q --flake-report
        </div>
        <div className="term-line" style={{ color: "var(--fg-dim)" }}>
          tests/test_checkout.py{" "}
          <span style={{ color: "var(--pass)" }}>..............</span>{" "}
          <span style={{ color: "var(--muted)" }}>[100%]</span>
        </div>
        <div className="term-line mt-2">
          <span style={{ color: "var(--pass)" }}>18 passed</span>
          <span style={{ color: "var(--muted)" }}>, </span>
          <span style={{ color: "var(--warn)" }}>2 skipped</span>
          <span style={{ color: "var(--muted)" }}>, 0 failed in 4.31s</span>
        </div>
        <div className="term-line mt-4" style={{ color: "var(--muted)" }}>
          flake rate (30d) 0.31% ▁▂▁▁▂▁▁▁▁▁
        </div>
        <div className="term-line" style={{ color: "var(--muted)" }}>
          suites green 14/14 · coverage 87.2% · budget p95 &lt; 180ms
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => {
      if (activeCat !== "all" && p.category !== activeCat) return false;
      if (!q) return true;
      const haystack =
        p.title + " " + p.dek + " " + p.category + " " + p.difficulty + " " + p.tags.join(" ") + " #" + p.num;
      return haystack.toLowerCase().includes(q);
    });
  }, [activeCat, query]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeCat, query]);

  return (
    <div className="flex min-h-screen flex-col">
      <ProgressBar />

      <a
        href="#notes"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[var(--bg)]"
      >
        Skip to content
      </a>

      {/* ============ NAV ============ */}
      <header className="nav-blur fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <a
            href="#top"
            className="font-mono text-sm font-bold tracking-tight text-[var(--fg)]"
            aria-label="assert(true) — back to top"
          >
            <span style={{ color: "var(--accent)" }}>&gt;</span> assert(true)
          </a>

          <div className="hidden items-center gap-7 font-mono text-[0.78rem] md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover-link">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <GitHubPill />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* ============ HERO ============ */}
        <section
          className="bg-grid relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
          aria-label="Introduction"
        >
          <div
            className="glow-orb left-[-10%] top-[-20%] h-[480px] w-[480px]"
            style={{ background: "var(--glow)" }}
            aria-hidden="true"
          />
          <div
            className="glow-orb bottom-[-30%] right-[-5%] h-[420px] w-[420px]"
            style={{ background: "var(--glow)", opacity: 0.7 }}
            aria-hidden="true"
          />

          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div>
              <p className="mb-7 font-mono text-xs tracking-[0.18em] text-[var(--muted)]">
                {"// software quality assurance — field notes from the test trenches"}
              </p>

              <h1
                className="font-mono mb-8 font-bold"
                style={{
                  fontSize: "clamp(2.1rem, 6.5vw, 5.2rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.045em",
                }}
              >
                <span style={{ color: "var(--muted)" }}>$</span>{" "}
                <Typewriter />
              </h1>

              <p className="mb-10 max-w-xl text-[1.05rem] leading-[1.85] text-[var(--fg-dim)]">
                A QA engineer&apos;s public notebook — test strategy, flaky-test forensics, CI
                gates that hold the line, and the craft of breaking software on purpose,
                before your users do it for free.
              </p>

              <div className="mb-12 flex flex-wrap items-center gap-4">
                <a
                  href="#notes"
                  className="hero-cta"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  read the notes
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <a
                  href="#snippets"
                  className="hero-cta"
                  style={{ color: "var(--fg-dim)", background: "var(--bg-elev)" }}
                >
                  <TerminalSquare size={15} aria-hidden="true" />
                  steal the snippets
                </a>
              </div>

              <GitHubHeroStats />
            </div>

            <LatestRunCard />
          </div>
        </section>

        {/* ============ FIELD NOTES ============ */}
        <section id="notes" className="scroll-mt-20 py-24 md:py-32" aria-label="Field notes">
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal">
              <SectionHeader
                eyebrow={"// 01 — qa learning library"}
                title="The QA learning library"
                dek="One hundred practical notes that walk you from your first test case through bugs, Agile, APIs, SQL, automation, Playwright and Cypress, CI/CD, and interview prep. Pick a shelf below, or search the whole desk."
              />
            </div>

            <div className="reveal mb-10 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {["all", ...CATEGORIES].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCat(c)}
                    aria-pressed={activeCat === c}
                    className="rounded-md px-3 py-1.5 font-mono text-[0.72rem] transition-colors"
                    style={
                      activeCat === c
                        ? { background: "var(--accent)", color: "var(--bg)", border: "1px solid var(--accent)" }
                        : { border: "1px solid var(--border)", color: "var(--fg-dim)", background: "var(--bg-elev)" }
                    }
                  >
                    {c === "all" ? "all notes" : c}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="search the library — try severity, waits, or interview"
                  aria-label="Search the QA learning library"
                  className="w-full max-w-md rounded-lg px-4 py-2.5 font-mono text-[0.82rem] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  style={{ border: "1px solid var(--border)", background: "var(--bg-elev)", color: "var(--fg)" }}
                />
                <span className="font-mono text-[0.7rem] text-[var(--muted)]">
                  {filtered.length} / {POSTS.length} notes
                </span>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div
                className="reveal rounded-2xl px-6 py-14 text-center"
                style={{ border: "1px solid var(--border)" }}
              >
                <p className="font-mono text-sm text-[var(--fg-dim)]">
                  no notes match <span style={{ color: "var(--accent)" }}>{query}</span> on this shelf
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCat("all");
                  }}
                  className="mt-5 rounded-md px-4 py-2 font-mono text-[0.75rem]"
                  style={{ border: "1px solid var(--border)", color: "var(--fg-dim)", background: "var(--bg-elev)" }}
                >
                  clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((post) => (
                  <div key={post.id} className="reveal">
                    <ArticleCard post={post} onOpen={setOpenPost} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ============ SNIPPET LIBRARY ============ */}
        <section
          id="snippets"
          className="scroll-mt-20 py-24 md:py-32"
          style={{ background: "var(--bg-elev)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          aria-label="Snippet library"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal">
              <SectionHeader
                eyebrow={"// 02 — snippet library"}
                title="Steal these"
                dek="Small, dependency-free pieces that survived production. The greeting at the top of this page is not a CSS trick — it is the first snippet below, running live. Hit copy and it is yours."
              />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="reveal">
                <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                  react hook
                </p>
                <h3 className="font-display mb-3 text-2xl font-bold tracking-tight">useTypewriter</h3>
                <p className="mb-4 text-[0.92rem] leading-[1.8] text-[var(--fg-dim)]">
                  Type, pause, delete, advance. It is the loop behind this page&apos;s hero —
                  honest work done by two state updates and a timeout, and it respects
                  reduced-motion preferences when you wire it up.
                </p>
                <CodeBlock code={TYPEWRITER_HOOK_CODE} lang="ts" label="hooks/useTypewriter.ts" />
              </div>

              <div className="flex flex-col gap-8">
                <div className="reveal">
                  <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                    e2e regression
                  </p>
                  <h3 className="font-display mb-3 text-2xl font-bold tracking-tight">
                    The refresh that catches the bug
                  </h3>
                  <p className="mb-4 text-[0.92rem] leading-[1.8] text-[var(--fg-dim)]">
                    A regression test named after the ticket it closes. The reload in the middle
                    is the whole trick: it is the step that used to hide the discount bug from
                    every test that only clicked through happily.
                  </p>
                  <CodeBlock code={PLAYWRIGHT_SNIPPET} lang="ts" label="tests/regressions/qa-208.spec.ts" />
                </div>

                <div className="reveal">
                  <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                    pytest fixture
                  </p>
                  <h3 className="font-display mb-3 text-2xl font-bold tracking-tight">
                    The single-writer cart
                  </h3>
                  <p className="mb-4 text-[0.92rem] leading-[1.8] text-[var(--fg-dim)]">
                    Test isolation as a fixture: every test gets its own schema and a frozen
                    clock, which quietly deletes an entire category of order-dependent flakes.
                  </p>
                  <CodeBlock code={PYTEST_FIXTURE_SNIPPET} lang="python" label="tests/conftest.py" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ARCHIVE ============ */}
        <section id="archive" className="scroll-mt-20 py-24 md:py-32" aria-label="Archive">
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal">
              <SectionHeader
                eyebrow={"// 03 — archive"}
                title="The backlog, shipped and brewing"
                dek="Every note ever merged onto this desk, newest first. Rows marked drafting are still in the quarantine list — they will ship when they pass."
              />
            </div>

            <div className="reveal overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border)" }}>
              {[...POSTS, ...ARCHIVE_DRAFTS].map((entry) => {
                const post = "body" in entry ? (entry as Post) : null;
                return (
                  <div
                    key={entry.num}
                    className="archive-row flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 md:px-7"
                    data-clickable={post ? "true" : "false"}
                    onClick={post ? () => setOpenPost(post) : undefined}
                    role={post ? "button" : undefined}
                    tabIndex={post ? 0 : undefined}
                    onKeyDown={
                      post
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setOpenPost(post);
                            }
                          }
                        : undefined
                    }
                    aria-label={post ? `Open note ${entry.num}: ${entry.title}` : undefined}
                  >
                    <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                      #{entry.num}
                    </span>
                    <span
                      className="min-w-0 flex-1 text-[0.95rem] font-medium"
                      style={{ color: post ? "var(--fg)" : "var(--muted)" }}
                    >
                      {entry.title}
                    </span>
                    <span className="hidden font-mono text-[0.65rem] text-[var(--muted)] md:inline">
                      {entry.tags.join(" · ")}
                    </span>
                    <span className="font-mono text-[0.7rem]" style={{ color: "var(--muted)" }}>
                      {entry.date}
                    </span>
                    <StatusChip status={entry.status} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section
          id="about"
          className="scroll-mt-20 py-24 md:py-32"
          style={{ background: "var(--bg-elev)", borderTop: "1px solid var(--border)" }}
          aria-label="About the author"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
              <div className="reveal">
                <SectionHeader
                  eyebrow={"// 04 — about"}
                  title="The engineer behind the assertion"
                  dek="Fifteen years of breaking software on purpose — across payment rails, design systems, and one unforgettable Y2K-style cutover that taught me to distrust every 'temporary' script."
                />
                <div className="flex flex-col gap-5 text-[0.98rem] leading-[1.85] text-[var(--fg-dim)]">
                  <p>
                    This blog is the notebook I wish I had been handed on day one: the strategies
                    that survived real pipelines, the fixtures I keep re-typing, and the
                    post-mortems that turned into test gates. Nothing here is theoretical — every
                    snippet shipped in anger somewhere first, and every post is named after a bug
                    that paid for my coffee at some point.
                  </p>
                  <p>
                    My working philosophy is short. Quality is not a phase you exit; it is a
                    signal you maintain. Tests are not compliance, they are the cheapest
                    conversation your team will ever have about correctness. And a pipeline
                    people trust is worth more than a coverage number people quote.
                  </p>
                  <p>
                    When I am not shrinking a flake rate, I am writing here, reviewing pull
                    requests with suspicious enthusiasm, and reminding one more team that
                    &quot;it works on my machine&quot; is a start, not a strategy.
                  </p>
                </div>
              </div>

              <div className="reveal">
                <div
                  className="rounded-2xl p-7"
                  style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                >
                  <p className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                    currently on the bench
                  </p>
                  <ul className="flex flex-col gap-4">
                    {[
                      { icon: <CheckCircle2 size={15} aria-hidden="true" />, text: "cutting a 2.1% flake rate down to double digits below one" },
                      { icon: <FlaskConical size={15} aria-hidden="true" />, text: "property-testing a pricing engine with fast-check" },
                      { icon: <SkipForward size={15} aria-hidden="true" />, text: "retiring the last time.sleep() in the monorepo" },
                      { icon: <ArrowUpRight size={15} aria-hidden="true" />, text: "drafting the mutation-testing post from the archive" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[0.9rem] leading-[1.7]" style={{ color: "var(--fg-dim)" }}>
                        <span style={{ color: "var(--accent)" }} className="mt-0.5 shrink-0">
                          {item.icon}
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-7 rounded-xl p-4 font-mono text-[0.78rem] leading-[1.8]"
                    style={{ background: "var(--code-bg)", color: "var(--tk-str)" }}
                  >
                    <span style={{ color: "var(--tk-com)" }}>{"# house rules"}</span>
                    <br />
                    if (itMoves) {"{"} testIt() {"}"}
                    <br />
                    if (itHurts) {"{"} automateIt() {"}"}
                    <br />
                    <span style={{ color: "var(--pass)" }}>assert</span>(shipIt == <span style={{ color: "var(--tk-kw)" }}>true</span>)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="mt-auto border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-mono text-sm font-bold text-[var(--fg)]">
              <span style={{ color: "var(--accent)" }}>&gt;</span> assert(true)
            </p>
            <p className="mt-2 font-mono text-[0.7rem] text-[var(--muted)]">
              tested by hand · shipped by CI · static-friendly, deploys anywhere
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.78rem]">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover-link">
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/mirzubairhameed"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link inline-flex items-center gap-1.5"
              aria-label="GitHub profile — mirzubairhameed"
            >
              <Github size={15} aria-hidden="true" />
              github
            </a>
          </div>

          <p className="font-mono text-[0.7rem] text-[var(--muted)]">
            © 2026 assert(true) — no bugs were harmed*
          </p>
        </div>
      </footer>

      {openPost && <ArticleModal post={openPost} onClose={() => setOpenPost(null)} />}
    </div>
  );
}
