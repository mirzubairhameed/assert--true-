import type { ArchiveEntry, Post } from "./post-types";

// Re-export the content types so `@/data/posts` stays the single import point.
export type {
  Block,
  Post,
  PostStatus,
  Difficulty,
  Category,
  ArchiveEntry,
} from "./post-types";
export { CATEGORIES } from "./post-types";

// ── The QA Learning Library — 100 notes across 13 shelves ──────────────────
// Each shelf file holds a slice of the journey: manual foundations first,
// then bugs, agile, the web, APIs, SQL, automation, Playwright/Cypress,
// CI/CD, performance/security, and career prep.

import { FUNDAMENTALS_A } from "./articles/01-fundamentals-a";
import { FUNDAMENTALS_B } from "./articles/01-fundamentals-b";
import { MANUAL_A } from "./articles/02-manual-a";
import { MANUAL_B } from "./articles/02-manual-b";
import { BUGS_A } from "./articles/03-bugs-a";
import { BUGS_B } from "./articles/03-bugs-b";
import { AGILE_A } from "./articles/04-agile-a";
import { AGILE_B } from "./articles/04-agile-b";
import { WEB_A } from "./articles/05-web-a";
import { WEB_B } from "./articles/05-web-b";
import { API_A } from "./articles/06-api-a";
import { API_B } from "./articles/06-api-b";
import { SQL_A } from "./articles/07-sql-a";
import { SQL_B } from "./articles/07-sql-b";
import { AUTOMATION_A } from "./articles/08-automation-a";
import { AUTOMATION_B } from "./articles/08-automation-b";
import { PLAYWRIGHT } from "./articles/09-playwright";
import { CYPRESS } from "./articles/10-cypress";
import { CICD_A } from "./articles/11-cicd-a";
import { CICD_B } from "./articles/11-cicd-b";
import { PLATFORMS_A } from "./articles/12-platforms-a";
import { PLATFORMS_B } from "./articles/12-platforms-b";
import { CAREER } from "./articles/13-career";

export const POSTS: Post[] = [
  ...FUNDAMENTALS_A, // 001-005
  ...FUNDAMENTALS_B, // 006-010
  ...MANUAL_A, // 011-015
  ...MANUAL_B, // 016-019
  ...BUGS_A, // 020-023
  ...BUGS_B, // 024-026
  ...AGILE_A, // 027-030
  ...AGILE_B, // 031-034
  ...WEB_A, // 035-038
  ...WEB_B, // 039-042
  ...API_A, // 043-047
  ...API_B, // 048-052
  ...SQL_A, // 053-056
  ...SQL_B, // 057-060
  ...AUTOMATION_A, // 061-064
  ...AUTOMATION_B, // 065-068
  ...PLAYWRIGHT, // 069-074
  ...CYPRESS, // 075-079
  ...CICD_A, // 080-083
  ...CICD_B, // 084-086
  ...PLATFORMS_A, // 087-090
  ...PLATFORMS_B, // 091-093
  ...CAREER, // 094-100
];

// Drafts kept from the earlier archive; numbered after the library
// (101-104) so every row on the shelf keeps a unique key.
export const ARCHIVE_DRAFTS: ArchiveEntry[] = [
  {
    num: "101",
    title: "Mutation Testing Won't Save You (But It Will Humble You)",
    date: "2026-02-02",
    tags: ["mutation", "coverage"],
    status: "draft",
  },
  {
    num: "102",
    title: "The Monday Test Data Cookbook",
    date: "2026-01-19",
    tags: ["test data", "fixtures"],
    status: "draft",
  },
  {
    num: "103",
    title: "Accessibility Is a Test Suite, Not an Audit",
    date: "2026-01-05",
    tags: ["a11y", "axe-core"],
    status: "draft",
  },
  {
    num: "104",
    title: "QA Notes on AI-Generated Code",
    date: "2025-12-15",
    tags: ["ai", "review"],
    status: "draft",
  },
];
