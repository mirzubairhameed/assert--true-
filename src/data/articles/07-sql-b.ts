import type { Post } from "../post-types";

export const SQL_B: Post[] = [
  {
    id: "sql-insert-update-delete",
    num: "057",
    title: "INSERT, UPDATE, DELETE: Changing Data Without Regret",
    dek: "Write access is where SQL stops being safe: one missing WHERE once deactivated every account in a company. INSERT, UPDATE, DELETE, soft deletes, and the BEGIN/ROLLBACK rehearsal that keeps changes reversible.",
    date: "2026-06-24",
    read: "5 min",
    category: "SQL & Databases",
    difficulty: "beginner",
    tags: ["sql", "crud", "transactions"],
    status: "green",
    body: [
      { type: "p", text: "A tester at an earlier job wanted to retire one stale account. They typed UPDATE users SET status = 'inactive', ran it — no WHERE clause — and every account in the system went inactive at once. Logins failed, checkout failed, and the fix arrived six hours later from a backup. The statement was valid SQL the entire time. That is the lesson of write access: SQL does exactly what you say, to exactly the rows you select — or to every row if you select none." },
      { type: "p", text: "Three verbs change data. INSERT adds rows, UPDATE edits columns in existing rows, DELETE removes rows. All three are dangerous in proportion to how little they check: there is no confirmation dialog, no undo button, and no sympathy. What you get instead is discipline — the same WHERE twice, a rehearsal in a transaction, and a habit of practicing where mistakes are free." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Testers write data on purpose: seed a user for a test, fix a status to reproduce a bug, clean up afterward. The syntax takes an afternoon; the discipline is what separates a controlled change from an incident. Teams remember the person who locked every account. They also remember the person whose updates never surprised anyone — and the second reputation travels into every interview." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Two habits cover most situations. First, always name your columns on INSERT, and always carry a WHERE on UPDATE:" },
      { type: "code", lang: "sql", label: "sql/insert-and-update.sql", code: `-- Add one clean test user
INSERT INTO users (id, email, name, created_at)
VALUES (9001, 'qa+9001@example.com', 'QA Sample', '2026-06-24 09:00:00');

-- Fix a typo in exactly that row
UPDATE users
SET name = 'QA Sample Revised'
WHERE id = 9001;` },
      { type: "p", text: "Second, rehearse destructive statements where mistakes cost nothing. Any scratch database, local copy, or personal schema will do — wrap the change in a transaction, inspect it, then decide:" },
      { type: "code", lang: "sql", label: "sql/transaction-rehearsal.sql", code: `BEGIN;

UPDATE orders SET status = 'cancelled' WHERE id = 402;

SELECT id, status FROM orders WHERE id = 402;  -- looks right?

ROLLBACK;   -- or COMMIT if the check passed` },
      { type: "p", text: "BEGIN opens a sandbox: every change after it is invisible to everyone else until COMMIT makes it real or ROLLBACK throws it away. Run the UPDATE, SELECT the same rows you just touched, and only then choose. In a scratch database this costs nothing and builds the reflex that saves production." },
      { type: "p", text: "One more decision: DELETE removes a row forever, while a soft delete keeps it and marks it — UPDATE orders SET status = 'cancelled', or a deleted_at timestamp where the table has one. Shops almost always soft-delete orders, because finance, support, and audits need the history. Hard DELETE is for rows that never mattered, like your own test seeds." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Write the WHERE first as a SELECT: SELECT * FROM orders WHERE id = 402. Confirm the listed rows are exactly the ones you mean to change.",
        "Only then convert the SELECT into the change, keeping the identical WHERE.",
        "For anything beyond a scratch database, wrap it: BEGIN, the change, a verifying SELECT, then COMMIT or ROLLBACK.",
        "Name columns explicitly on INSERT so a schema change cannot silently shift your values.",
        "Target id in WHERE; statuses and dates can match far more rows than you expect.",
        "Clean up your own seeds afterward, children before parents — order_items, then orders, then users."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Running UPDATE or DELETE without WHERE — it applies to every row, instantly, with no warning. Instead, never execute a write whose WHERE you have not run as a SELECT first.",
        "Writing the statement first and the filter 'in a second' — that second is where the horror story lives. Instead, the SELECT-that-previews-the-WHERE is mandatory, not optional.",
        "Practicing writes on production 'just this once' — one typo outranks your whole history there. Instead, rehearse in a scratch copy, every time.",
        "Hard-deleting orders or users — invoices, audits, and foreign keys reference them, and the missing rows break reports downstream. Instead, soft-delete with a status or timestamp, or delete only your own seed data.",
        "Forgetting COMMIT and concluding the change failed — inside an open transaction your session sees the row and nobody else does. Instead, check for a pending transaction when 'it saved' but the UI disagrees."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Golden rule: run the SELECT with the same WHERE, read the rows, then change the verb — every write, every time.",
        "Use transactions for any multi-row or multi-table change; they turn a potential disaster into a rolled-back typo.",
        "Seed with unique markers — qa+ prefix emails, reserved id ranges — so cleanup finds exactly what you created.",
        "Keep a clearly named scratch database as the only place you practice writes.",
        "After any write, SELECT the rows again and confirm the UI agrees; both views are part of the test."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "INSERT adds, UPDATE edits, DELETE removes — and none of them ask 'are you sure?'",
        "No WHERE means every row; SELECT the same WHERE first, always.",
        "BEGIN and ROLLBACK make practice free in a scratch database.",
        "Shops soft-delete orders; hard DELETE is for your own throwaway seeds."
      ] },
      { type: "quote", text: "Interview tip: when asked how you stay safe with write queries, say 'I run the WHERE as a SELECT first, and I rehearse writes inside a transaction' — that sentence lands better than any memorized definition." }
    ]
  },
  {
    id: "sql-group-by-aggregates",
    num: "058",
    title: "COUNT, SUM, and GROUP BY: Verifying Data in Bulk",
    dek: "The dashboard claims 1,240 orders. Count them yourself: COUNT tallies rows, SUM and AVG total columns, GROUP BY splits results per status, day, or month, and HAVING filters the groups afterwards.",
    date: "2026-06-26",
    read: "5 min",
    category: "SQL & Databases",
    difficulty: "intermediate",
    tags: ["sql", "group-by", "aggregates"],
    status: "green",
    body: [
      { type: "p", text: "The stakeholder's dashboard says 1,240 orders this month. The finance export says 1,238. Someone is wrong, and 'the dashboard is usually right' is not an engineering answer. Four keywords — COUNT, SUM, AVG, and GROUP BY — let you recount the database yourself and say exactly which number is correct, and why." },
      { type: "p", text: "Aggregates collapse many rows into one answer. COUNT(*) counts rows, SUM(total_cents) adds a column up, AVG(total_cents) averages it. Alone, they answer questions about a whole table; with GROUP BY status, they answer once per group — one row for 'paid', one for 'shipped', one for 'cancelled'. WHERE filters rows before grouping; HAVING filters the groups after, which is why each has its own job." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Bulk verification is invisible in the UI. No screen shows you that cancelled orders are counted twice, that revenue sums include refunded rows, or that your 'June' query silently covered only thirty days. When you can aggregate, you can audit any dashboard, any report, any 'insight' someone slides across a meeting — and you will be surprised how often the filter or the grouping is the bug. The habit also pays forward: once you can rebuild a number from the tables, you can review the query that produced it, which report-heavy teams notice within weeks of your first audit." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Start with the question the dashboard should have answered precisely:" },
      { type: "code", lang: "sql", label: "sql/orders-per-status.sql", code: `-- How many orders, and how much revenue, per status?
SELECT status,
       COUNT(*) AS order_count,
       SUM(total_cents) AS revenue_cents
FROM orders
GROUP BY status;` },
      { type: "p", text: "One row per status, with a count and a revenue total beside it. If the dashboard's 1,240 equals the sum of order_count across statuses, the number is real; if it counts cancelled orders too, you have found the discrepancy. Average order value and monthly signups use the same shape, plus the two kinds of filters in their correct homes:" },
      { type: "code", lang: "sql", label: "sql/monthly-signups-having.sql", code: `-- Average order value, June only (WHERE runs before grouping)
SELECT AVG(total_cents) AS avg_order_cents
FROM orders
WHERE created_at >= '2026-06-01' AND created_at < '2026-07-01';

-- Signups per month, only months with 50 or more (HAVING runs after)
SELECT DATE_TRUNC('month', created_at) AS signup_month,
       COUNT(*) AS signups
FROM users
GROUP BY signup_month
HAVING COUNT(*) >= 50
ORDER BY signup_month;` },
      { type: "p", text: "The second query pairs the filters where they belong: WHERE kept June's rows before any group existed, and HAVING kept only months that reached fifty signups after the groups were formed. Mixing those two up is the most common aggregate mistake in code review. Run both halves separately the first time — watching WHERE shrink the rows before grouping, then HAVING drop whole groups after, teaches the order better than any diagram. Three more shapes worth saving in your verification kit:" },
      { type: "ul", items: [
        "Revenue per day — GROUP BY DATE(created_at) with SUM(total_cents) gives one row per day; compare the total against the payment provider's settlement report.",
        "Users per signup month — GROUP BY DATE_TRUNC('month', created_at) on users (Postgres syntax; MySQL uses DATE_FORMAT) shows growth, and empty months stand out instantly.",
        "HAVING is WHERE for groups — HAVING COUNT(*) >= 50 keeps only big months; the same condition in WHERE is an error, because single rows have no group count yet."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "SELECTing a column you did not group by — SELECT status, name, COUNT(*) mixes per-group and per-row values, and most databases reject it. Instead, group by every column you display.",
        "Filtering groups with WHERE — WHERE COUNT(*) > 10 fails, because WHERE runs before groups exist. Instead, use HAVING for conditions on counts, sums, or averages.",
        "Summing money that includes cancelled or refunded rows — the total looks official and is wrong. Instead, filter the status first, then sum, and state the filter in the ticket.",
        "Reading AVG without knowing its denominator — one unexpected zero or NULL shifts the average silently. Instead, COUNT the rows the average actually covered.",
        "Trusting a dashboard number you never reproduced — dashboards run their own queries with their own bugs. Instead, run your own aggregate and compare before you cite either."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Alias every aggregate — AS order_count — because a column literally named count is unreadable in screenshots and reports.",
        "Verify dashboards by rebuilding their numbers from the tables; matching totals build trust, mismatched totals are bugs.",
        "Write date ranges explicitly, down to the boundary — 'this month' has burned more reports than any join.",
        "Recite the order when reviewing: WHERE filters rows, GROUP BY forms groups, HAVING filters groups, ORDER BY sorts the result.",
        "Comment the business rule next to the query — cancelled excluded, tax included — so the next reader inherits your intent."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "COUNT, SUM, AVG collapse rows; GROUP BY makes one answer per group.",
        "WHERE filters before grouping; HAVING filters the groups after.",
        "GROUP BY DATE(created_at) turns a table into a daily report.",
        "A dashboard is a claim; your own aggregate query is the audit."
      ] },
      { type: "quote", text: "Rule of thumb: never argue with a dashboard — reproduce its number with one aggregate query, and either you confirm it or you walk out with a better bug than the one you were testing." }
    ]
  },
  {
    id: "database-testing-guide",
    num: "059",
    title: "Database Testing: What to Verify Beyond the UI",
    dek: "The UI says success; the database decides whether it is true. The checklist: integrity, CRUD reflection, constraints, defaults, cascades, consistency after failure — plus the orphan query that finds what screens hide.",
    date: "2026-06-27",
    read: "5 min",
    category: "SQL & Databases",
    difficulty: "intermediate",
    tags: ["database-testing", "sql", "data-integrity"],
    status: "green",
    body: [
      { type: "p", text: "The checkout screen shows a green confirmation and the customer closes the tab. Two minutes later the payment provider's webhook fires, the app crashes mid-write, and the order exists in one table but not the other. Nobody notices for nine days, because everyone tested through the screen — and the screen was, in that moment, telling the truth about a database that was not." },
      { type: "p", text: "Database testing means verifying what the application stored, not what it displayed. The UI is one rendering of the data; constraints, defaults, and relationships are the data's actual laws. You test the laws directly: read rows after actions, try to break rules at the database level, and check that related tables agree with each other. The shop schema gives you everything you need — users, orders, order_items, and the foreign keys between them." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "UI tests can pass while data is quietly wrong: totals rounded, statuses misnamed, timestamps defaulted to the wrong timezone, child rows left pointing at deleted parents. These bugs surface weeks later as support tickets, finance mismatches, and migrations that fail in staging. Database-level checks catch them at the source, and most are cheap — a handful of SELECTs per feature, written once and kept forever." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Work through this checklist per feature. Each line names the risk and the check:" },
      { type: "ul", items: [
        "Data integrity and orphans — every orders.user_id must exist in users, every order_items.order_id must exist in orders. The orphan query below finds violations the UI never renders.",
        "CRUD reflection — after Create, read the new row and compare exact values: email, total_cents, status. After Update, confirm the old value is gone. After Delete, confirm the row is truly absent or soft-deleted with the right marker.",
        "Constraints reject bad data — submit a duplicate email on signup; the unique constraint should refuse it and the UI should say so cleanly. Same for empty required fields and over-length values.",
        "Defaults and timestamps — a fresh order should arrive with the documented default status ('pending', not NULL) and a created_at within seconds of your click, in the documented timezone.",
        "Cascading deletes — delete or cancel an account in staging and watch the orders: cascaded, blocked by a constraint, or leaked as orphans. All three exist in real systems; only one is intended.",
        "Consistency after failure — kill a write mid-flight (cancel the request, stop the service in staging), then hunt for half-written data: an order without items, a charge without a row. Partial writes are a defect you verify, not assume.",
        "Totals agree across tables — SUM(price_cents * qty) per order should equal orders.total_cents. When it does not, you found a pricing bug before the finance team did."
      ] },
      { type: "p", text: "The orphan check is the one query you will reuse for years:" },
      { type: "code", lang: "sql", label: "sql/orphan-check.sql", code: `-- Orders pointing at users who do not exist
SELECT o.id, o.user_id, o.status, o.total_cents
FROM orders o
LEFT JOIN users u ON u.id = o.user_id
WHERE u.id IS NULL;` },
      { type: "p", text: "LEFT JOIN keeps every order; IS NULL keeps only the ones whose parent user vanished. Zero rows is the pass condition. Swap the table names to check order_items against orders, or run it before a migration to see the legacy mess you are inheriting." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Map the feature to its tables before testing: which rows change, which constraints apply, which columns default.",
        "Run the happy path once, then read the rows it wrote — values, timestamps, and the foreign keys.",
        "Break one rule at a time: duplicate unique value, missing required field, reference to a deleted parent.",
        "Check the neighbors: related tables should agree, and nothing unrelated should have changed.",
        "Simulate one failure — stop the service mid-write — then look for partial rows.",
        "Save every query you used as the feature's data-verification kit; the next release reuses it verbatim."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Stopping at the success screen — the toast says 'saved' and nothing else verifies it. Instead, read the row; the screen is a claim, the row is the fact.",
        "Trusting frontend validation to be the only validation — a duplicate email can sail through the API into the database. Instead, replay bad input through the API in staging.",
        "Assuming timestamps are trustworthy — created_at may default in the database, the ORM, or nowhere. Instead, check one fresh row against the clock and the documented timezone.",
        "Ignoring cascades until production — discovering the delete policy from a support ticket costs a week. Instead, test delete paths for every parent table in staging.",
        "Declaring data clean without an orphan check — orphans accumulate silently and explode during migrations. Instead, run the LEFT JOIN IS NULL query as a routine."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Use read-only database access for verification; SELECT covers almost everything here, and read-only protects everyone.",
        "Attach the exact queries to the test plan per feature, so coverage is provable and repeatable.",
        "Verify money in cents and in parts: line items sum to the order total, order totals sum to the daily revenue report.",
        "Test each constraint twice — through the UI for the message, through the API for the behavior.",
        "Schedule the orphan and totals checks to run regularly; data rot keeps a calendar."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "The UI is a claim; the row, the constraint, and the timestamp are the evidence.",
        "Every foreign key is a test: orphans are bugs the screen cannot show.",
        "Deletes need a policy — cascade, block, or soft-delete — and each is testable.",
        "Verify what happens when a write fails halfway; partial data hides longest."
      ] },
      { type: "quote", text: "Interview tip: 'I verify persistence, constraints, and relationships at the database level, and the orphan-check query is in every plan I write' — that sentence separates you from candidates who only tested screens." }
    ]
  },
  {
    id: "sql-test-data-setup",
    num: "060",
    title: "SQL for Test Data Setup and Cleanup",
    dek: "Clicking five screens to reach one test state is slow and dirty. INSERT seeds exact rows, cleanup deletes them in reverse foreign-key order, and tests start from a state you chose.",
    date: "2026-06-28",
    read: "5 min",
    category: "SQL & Databases",
    difficulty: "intermediate",
    tags: ["sql", "test-data", "seeding"],
    status: "green",
    body: [
      { type: "p", text: "How long does it take you to reach 'a user with one paid order containing two items'? Sign up, verify the email, browse, add to cart, check out, pay with the test card — ten minutes of clicks that can break at any step. Or one INSERT per table: fifteen seconds, repeatable forever. That difference is why testers learn to seed." },
      { type: "p", text: "Test data setup is arranging the database into the exact state a test needs before the test runs. SQL does it directly: INSERT creates your user, order, and items with values you chose; DELETE removes them afterward. Two rules keep it safe — uniqueness, meaning your rows carry a marker no other test uses, and order, meaning foreign keys decide that children must be removed before parents." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "UI setup breaks for reasons unrelated to your test: the coupon expired, the third screen has a bug, the payment sandbox is down. Seeded data skips all of it, behaves identically at 9 a.m. and 4 p.m., and creates states the UI cannot produce — an order from last March, a user with a 40-character name, a cart with fifty items. Precision setup is also the foundation that automation later stands on." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "One user, one paid order, one line item — seeded in foreign-key order (parents first), marked with a prefix and id range that belong to this test alone:" },
      { type: "code", lang: "sql", label: "sql/seed-checkout-state.sql", code: `-- Setup: parent first, then children
INSERT INTO users (id, email, name, created_at)
VALUES (9100, 'qa+9100@example.com', 'QA Seed User', '2026-06-28 08:00:00');

INSERT INTO orders (id, user_id, status, total_cents, created_at)
VALUES (9200, 9100, 'paid', 5998, '2026-06-28 08:01:00');

INSERT INTO order_items (id, order_id, sku, qty, price_cents)
VALUES (9300, 9200, 'KB-750', 2, 2999);

-- Teardown: children first, then parents (reverse FK order)
DELETE FROM order_items WHERE id = 9300;
DELETE FROM orders      WHERE id = 9200;
DELETE FROM users       WHERE id = 9100;` },
      { type: "p", text: "Note the order in both halves. Setup inserts users before orders before items, because orders.user_id and order_items.order_id must point at rows that already exist. Teardown runs the same three tables in reverse — items, then orders, then users — because a parent with living children refuses to die when the foreign key has a constraint behind it." },
      { type: "ul", items: [
        "Setup inserts the minimum — create only the rows the test needs; three exact rows beat a cloned production dump full of other people's history.",
        "Teardown deletes your rows in reverse foreign-key order — children before parents — or the cleanup itself fails halfway and leaves litter.",
        "Uniqueness by marker — emails like qa+202606280800@example.com or qa+9100@example.com, plus a reserved id range (9000 and up), mean two runs can never collide.",
        "Repeatable by construction — same script, same state, every run; a test that depends on whatever the last tester left behind is a test that flakes.",
        "Never on production — seed and delete only on staging, local, or ephemeral environments; a DELETE with a typo on production is the incident from article 057."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "List the exact rows your test needs: which tables, which columns, which values, which parent-first order.",
        "Write the INSERTs with explicit column lists, using ids and emails from your reserved range.",
        "Run setup, then SELECT the rows back and confirm the state before the test touches anything.",
        "Run the test and treat only feature failures as bugs — never leftover-data noise.",
        "Run the DELETEs in reverse order, then confirm zero rows remain with one final SELECT.",
        "Save setup and teardown as a named pair, versioned with the tests and reusable next sprint."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Seeding through the UI and calling it setup — it is slow, it depends on screens with their own bugs, and it cannot create edge values. Instead, write the INSERTs.",
        "Hardcoding ids or emails that other tests and real signups use — collisions fail tests randomly and blame the wrong feature. Instead, reserve an id range and an email prefix.",
        "Cleaning up in table order instead of foreign-key order — deleting the parent first either fails on the constraint or cascades away rows another test still needs. Instead, reverse your setup order exactly.",
        "Leaving teardown 'for later' — litter accumulates and the next tester debugs your debris. Instead, run teardown after every run, including failed ones.",
        "Fixing data by hand each run — manual tweaks are invisible, unrepeatable, and forgotten. Instead, put every value in the script so the state is written down."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep one seed script per scenario, checked into the repository next to the tests — not on your laptop.",
        "Use the tooling where it exists — fixtures in pytest, factories in Rails, Testcontainers for throwaway databases — it wraps exactly this pattern.",
        "Choose edge values on purpose: maximum-length names, minimum quantities, dates at month boundaries. Seeds are your chance to be precise.",
        "Verify setup with a SELECT before the test and emptiness with a SELECT after; both checks take seconds.",
        "Pin timestamps in seeds to fixed values, so date-based filters behave identically every run."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Seed parents first, delete children first — foreign keys set the order in both directions.",
        "Unique markers (qa+ emails, reserved ids) make runs collision-free and cleanup exact.",
        "SQL setup is faster, more precise, and more repeatable than clicking through screens.",
        "Never seed, delete, or 'just fix one row' on production."
      ] },
      { type: "quote", text: "Rule of thumb: if a test needs ten minutes of clicking to reach its starting state, that setup is a script waiting to be written — and a handful of INSERT statements are the script." }
    ]
  },
];
