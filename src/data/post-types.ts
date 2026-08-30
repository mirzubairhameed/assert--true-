/**
 * Core types for the assert(true) content library.
 * posts.ts re-exports everything here, so `@/data/posts` stays
 * the single import point for the rest of the app.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | {
      type: "code";
      lang: "ts" | "python" | "yaml" | "bash" | "sql" | "java" | "json";
      label: string;
      code: string;
    };

export type PostStatus = "green" | "flaky" | "quarantined" | "draft";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Post {
  id: string; // slug, unique — used as React key
  num: string; // "001".."100", unique
  title: string;
  dek: string; // excerpt shown on the card and under the modal title
  date: string; // ISO "2026-04-01"
  read: string; // e.g. "6 min"
  category: string; // one of CATEGORIES
  difficulty: Difficulty;
  tags: string[];
  status: PostStatus;
  body: Block[];
}

/** The 13 shelves of the QA learning library, in journey order. */
export const CATEGORIES = [
  "Fundamentals",
  "Manual Testing",
  "Bugs & Process",
  "Agile & Jira",
  "Web & API Basics",
  "API Testing",
  "SQL & Databases",
  "Automation",
  "Playwright",
  "Cypress",
  "CI/CD & Git",
  "Performance & Security",
  "Career",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface ArchiveEntry {
  num: string;
  title: string;
  date: string;
  tags: string[];
  status: PostStatus;
  postId?: string;
}
