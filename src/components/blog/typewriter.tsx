"use client";

import { useEffect, useState } from "react";

const GREETINGS = [
  "expect(reality).toMatch(spec);",
  "breaking builds so users don't have to.",
  "given · when · then · ship.",
  "green pipelines, quiet pagers.",
  "bugs fear the merge queue.",
  "tested by hand, shipped by CI.",
];

const TYPE_MS = 62;
const ERASE_MS = 26;
const HOLD_MS = 1900;
const GAP_MS = 420;
const START_DELAY_MS = 500;

/**
 * Typewriter that types, pauses, erases, and advances through
 * a loop of QA greetings. Falls back to static text when the
 * visitor prefers reduced motion.
 */
export function Typewriter() {
  const [text, setText] = useState("");

  useEffect(() => {
    let gIdx = 0;
    let cIdx = 0;
    let erasing = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = GREETINGS[gIdx];

      if (!erasing) {
        cIdx += 1;
        setText(current.slice(0, cIdx));
        if (cIdx === current.length) {
          erasing = true;
          timer = setTimeout(tick, HOLD_MS);
          return;
        }
        timer = setTimeout(tick, TYPE_MS + Math.random() * 46);
        return;
      }

      cIdx -= 1;
      setText(current.slice(0, cIdx));
      if (cIdx === 0) {
        erasing = false;
        gIdx = (gIdx + 1) % GREETINGS.length;
        timer = setTimeout(tick, GAP_MS);
        return;
      }
      timer = setTimeout(tick, ERASE_MS);
    };

    const start = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        // No animation: show the first greeting, no loop.
        setText(GREETINGS[0]);
        return;
      }
      tick();
    };

    timer = setTimeout(start, START_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span aria-hidden="true">
      {text}
      <span className="tw-caret" />
    </span>
  );
}
