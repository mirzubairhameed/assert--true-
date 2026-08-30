import type { Post } from "../post-types";

export const SQL_A: Post[] = [
  {
    id: "databases-for-testers",
    num: "053",
    title: "Databases for Testers: Tables, Keys, and Relationships",
    dek: "Every app is a spreadsheet with rules. Learn tables, primary keys, foreign keys, and the three relationship shapes — because the database, not the UI, is where the truth lives.",
    date: "2026-06-18",
    read: "5 min",
    category: "SQL & Databases",
    difficulty: "beginner",
    tags: ["sql", "databases", "data-model"],
    status: "green",
    body: [
      { type: "p", text: "The developer says 'I cannot reproduce it' while the customer's screenshot says otherwise. You open the orders table, spot a row with status 'pending' where the screen claimed 'paid', and the argument ends in thirty seconds. That moment — reading raw rows instead of arguing with a rendered page — is why testers learn databases." },
      { type: "p", text: "A relational database stores data in tables, and a table is a spreadsheet with rules. Rows are records: one user, one order. Columns are fields with fixed types. Two rules matter most. Every row gets a primary key, an id that is unique and never reused, and tables point at each other with foreign keys. The shop you will see all through these SQL notes has exactly three tables." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "The UI is a rendering of the database, filtered through code that can be wrong at every step. When the screen and the data disagree, the data wins, because the next request reads the data, not the screen. Testers who can query get the truth directly: they confirm persistence, spot orphans, and settle 'is it saved?' arguments without guessing. It is also the fastest way to build test states the UI cannot produce." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is the shop schema on one slide, three tables and the wires between them:" },
      { type: "code", lang: "sql", label: "sql/shop-schema.sql", code: `users       (id, email, name, created_at)
orders      (id, user_id, status, total_cents, created_at)
order_items (id, order_id, sku, qty, price_cents)

-- orders.user_id      points at users.id   (who bought)
-- order_items.order_id points at orders.id (what was bought)` },
      { type: "ul", items: [
        "users — one row per account: id 7, email maya@example.com, name Maya, created_at 2026-06-01. The id column is the primary key: unique, never null, never recycled.",
        "orders — one row per checkout: id 402 belongs to user_id 7, status 'paid', total_cents 5999. That user_id is the foreign key; point it at a user who does not exist and you have an orphan, the classic integrity bug.",
        "order_items — one row per line inside an order: id 911 ties order_id 402 to sku 'KB-750', qty 2, price_cents 2999. One order, many item rows."
      ] },
      { type: "p", text: "Three shapes cover every relationship you will meet in any schema:" },
      { type: "ul", items: [
        "One-to-one (1:1) — one row matches exactly one row elsewhere, like users to a user_settings table. Rare in healthy schemas; when you see one, ask why the two tables were not simply one.",
        "One-to-many (1:N) — one user places many orders. The foreign key always lives on the many side, which is why orders carries user_id and users carries no order ids.",
        "Many-to-many (M:N) — many orders contain many skus, and neither table can store the other's ids. A junction table resolves it: order_items sits between orders and products, splitting one M:N into two clean 1:N links."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Get the schema: migration files, an ERD diagram, or DESCRIBE users; in any SQL client shows columns, types, and keys.",
        "Find each table's primary key — usually id — and confirm it is unique and never null.",
        "Trace every foreign key: which column points at which table, and what the policy is on delete.",
        "Pick one real row per table and follow its keys across: user 7, their orders, their items.",
        "Write one SELECT per relationship and keep the queries; they are your first verification kit."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Judging data by the screen alone — the UI can round, cache, or crash before the truth shows. Instead, read the row yourself before calling a behavior a bug.",
        "Assuming id order means time order — restarts, imports, and manual inserts break that. Instead, sort or filter by created_at.",
        "Hunting NULLs with equals signs — NULL means unknown and matches nothing, not even another NULL. Instead, use IS NULL, which article 056 covers properly.",
        "Deleting rows in a shared test database to tidy up — other tests may depend on them. Instead, seed your own rows and delete only those, as article 060 shows."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Spend ten minutes with the schema before testing a feature; every later check gets sharper.",
        "Ask for read-only credentials to staging — SELECT is all a tester needs, and all you should have.",
        "After any UI action succeeds, follow it to the database: right row, right values, right timestamp.",
        "Sketch unfamiliar tables as boxes and arrows; missing or mysterious foreign keys jump out on paper."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A table is a spreadsheet with rules; the id column is the primary key.",
        "Foreign keys are the wires: orders.user_id points at users.id.",
        "1:N covers most of the app; M:N needs a junction table like order_items.",
        "The UI is a claim; the row in the database is the verdict."
      ] },
      { type: "quote", text: "Interview tip: when a database question comes up, answer with relationships rather than syntax — 'one user to many orders, foreign key on the many side, junction table for many-to-many' is the answer they are listening for." }
    ]
  },
  {
    id: "sql-select-basics",
    num: "054",
    title: "SQL SELECT: Your First Data-Reading Queries",
    dek: "SELECT is read-only, safe to run, and answers the question every tester asks: what is actually in there? Read rows, pick columns, count results — no risk of breaking anything.",
    date: "2026-06-20",
    read: "4 min",
    category: "SQL & Databases",
    difficulty: "beginner",
    tags: ["sql", "select", "queries"],
    status: "green",
    body: [
      { type: "p", text: "What does the database actually hold right now? Not what the admin page claims, not what the API returns after three transformations — the raw rows. One line of SQL answers that, and it cannot damage anything, because SELECT only reads. It is the first command every tester should learn and the last one they should fear." },
      { type: "p", text: "SELECT names the columns you want, then the table they live in, and the database hands back a result set: rows arranged like a filtered spreadsheet, columns as headers, rows in no particular order unless you ask for one. Reading queries are where every tester starts because they are safe to run anywhere — nothing changes, so nothing breaks." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Half of QA work is answering 'what is the current state?' — did the import finish, is that account active, how many orders landed overnight. Clicking through screens to find out is slow, and the screens themselves can be buggy. A SELECT gives you the state in seconds. It also doubles as the safety net for every UPDATE and DELETE you will ever write, as article 057 shows." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Run these three against the shop database, smallest first:" },
      { type: "code", lang: "sql", label: "sql/read-all-users.sql", code: `SELECT * FROM users;` },
      { type: "p", text: "The star means every column. Fine for a first peek at a small table; noisy and wasteful on anything with dozens of columns." },
      { type: "code", lang: "sql", label: "sql/read-names-and-emails.sql", code: `SELECT name, email, created_at AS joined_on
FROM users
WHERE created_at >= '2026-06-01';` },
      { type: "p", text: "Two upgrades at once. The column list replaces the star — name and email, nothing else — and AS renames a column in the result, so joined_on reads better than created_at in a screenshot for a bug report. The WHERE line filters rows to accounts created since June 1; WHERE is article 055's whole subject, so treat this as the preview." },
      { type: "code", lang: "sql", label: "sql/count-users.sql", code: `SELECT COUNT(*) FROM users;` },
      { type: "p", text: "One row, one number: how many users exist. When a stakeholder says 'we have about 2,000 signups', this is how you replace 'about' with a fact. Aggregates get a full article later (058); for now, COUNT is the row total." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Open any SQL client your team already has — DBeaver, pgAdmin, TablePlus, or the query console in the cloud dashboard.",
        "Run SELECT * FROM users; and just look: which columns exist, which are empty, what real values look like.",
        "Rewrite it with three columns you care about and run again; notice how much easier the result is to read.",
        "Add one WHERE line and re-run; confirm the row count drops the way you expect.",
        "Finish with SELECT COUNT(*); and compare the number against what the UI's user list claims.",
        "Save every query in a notes file; by next week you have a personal verification kit."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Running SELECT * on a huge table in a shared environment — a million rows come back and the client chokes. Instead, pair the star with a LIMIT while exploring.",
        "Reading only the first screen of results and calling it checked — row 4,000 may hold the duplicate. Instead, count first, then scan or filter.",
        "Sharing queries that start with * — column order follows the table definition, not your screen, so the reader gets a different shape. Instead, name columns explicitly in anything you keep.",
        "Running heavy reads against production out of convenience — even read-only, a big query slows a shared database. Instead, point the client at staging or a copy."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Start every exploration with a row count; it calibrates everything that follows.",
        "Prefer explicit column lists in queries you save or share — they document exactly what you verified.",
        "Alias columns when the name is unclear: SELECT total_cents AS total_in_cents saves the next reader a question.",
        "Keep a scratch file of queries per feature; verification queries are reusable test assets.",
        "Learn your client's export-to-CSV button; attaching the actual rows to a bug report ends debates."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "SELECT reads and never changes data, so it is the safe first command.",
        "Name columns instead of * whenever the query outlives the moment.",
        "AS renames a column in the result; WHERE filters rows — more on both soon.",
        "COUNT(*) turns 'about 2,000' into a number you can defend."
      ] },
      { type: "quote", text: "Interview tip: if they hand you a whiteboard and say 'write a query', SELECT name, email FROM users; plus one WHERE line is a complete, correct answer — say it out loud and let them ask for more." }
    ]
  },
  {
    id: "sql-filter-sort-limit",
    num: "055",
    title: "Filtering and Sorting: WHERE, ORDER BY, and LIMIT",
    dek: "Ten operators, two sort directions, and the pagination check that page 2 is OFFSET 20 with LIMIT 20 — ending in one query for the latest ten paid orders over $50.",
    date: "2026-06-21",
    read: "5 min",
    category: "SQL & Databases",
    difficulty: "beginner",
    tags: ["sql", "where", "pagination"],
    status: "green",
    body: [
      { type: "p", text: "3,412 orders sit in the shop's orders table, and the ticket says 'checkout looks wrong for expensive orders — please check the recent ones'. Scrolling is not a plan. Three clauses — WHERE, ORDER BY, and LIMIT — turn that pile into the exact ten rows you need, sorted and justified, in a single run." },
      { type: "p", text: "WHERE keeps only rows that match a condition; it is the filter arrow on a spreadsheet header. ORDER BY sorts what survives, ascending or descending, by any column. LIMIT caps the result at N rows, and OFFSET skips N rows before returning any — together they are pagination. The database applies them in exactly that order: filter, sort, then trim." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Almost no tester question is about all rows. It is about the paid ones, the failed ones, the ones over $50, the ones from yesterday. Filtering is also where SQL starts catching real bugs: a status that never appears, a total that is negative, an email that is not an email. And when pagination breaks in the UI, OFFSET is how you prove it from the data side." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is the combined query that answers the ticket — the latest ten paid orders over $50, most expensive first:" },
      { type: "code", lang: "sql", label: "sql/paid-orders-over-50.sql", code: `SELECT id, user_id, status, total_cents, created_at
FROM orders
WHERE status = 'paid'
  AND total_cents > 5000          -- 5000 cents = $50.00
ORDER BY total_cents DESC, created_at DESC
LIMIT 10;` },
      { type: "p", text: "Every other operator slots into the same WHERE line:" },
      { type: "ul", items: [
        "= and != — status = 'paid' keeps matches; status != 'paid' keeps everything else, which is how you hunt for the weird statuses nobody documented.",
        "> and < — total_cents > 5000, created_at < '2026-06-01'. Dates written as '2026-06-01' compare correctly because ISO format sorts as text.",
        "IN — status IN ('paid', 'shipped') keeps rows matching any listed value; it is a tidy, readable OR.",
        "BETWEEN — created_at BETWEEN '2026-06-01' AND '2026-06-30' keeps the range, inclusive at both ends.",
        "LIKE with % — email LIKE '%@gmail.com' matches any string ending in @gmail.com; % is the wildcard for anything.",
        "AND and OR — AND narrows, OR widens, and parentheses decide precedence: WHERE (status = 'paid' OR status = 'shipped') AND total_cents > 5000."
      ] },
      { type: "p", text: "Then there is the pagination check every web tester should run once. If the UI shows twenty orders per page, page 2 is not 'the next batch it feels like' — it is OFFSET 20 with LIMIT 20:" },
      { type: "code", lang: "sql", label: "sql/orders-page-2.sql", code: `SELECT id, created_at
FROM orders
ORDER BY created_at DESC
LIMIT 20 OFFSET 20;   -- page 2 of 20-per-page` },
      { type: "p", text: "Run the same ORDER BY without LIMIT and check that this query's first row is the twenty-first overall. If the UI's page 2 repeats a row you already saw on page 1, this pair of queries is your evidence. Sorting both queries identically is what makes the comparison valid — change the ORDER BY between them and you are comparing two different lists." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Writing OR without parentheses — WHERE status = 'paid' OR status = 'shipped' AND total_cents > 5000 silently changes meaning, because AND binds tighter. Instead, bracket every OR group.",
        "Filtering text with a guessed exact value — 'Paid' with a capital P matches nothing and the query just looks empty. Instead, list the honest values first with SELECT DISTINCT status FROM orders.",
        "Sorting without a tiebreaker — two orders with the same total can swap places between runs, which makes pagination evidence shaky. Instead, add a second sort column like created_at DESC.",
        "Assuming BETWEEN is exclusive — it includes both endpoints, so the June range above counts midnight-on-the-30th rows too. Instead, choose the boundary on purpose.",
        "Comparing dollars against a cents column — WHERE total_cents > 50 returns almost everything. Instead, keep the unit in a comment and your head."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Run SELECT DISTINCT on a status or type column before filtering; it shows the real list of values to match.",
        "Write conditions for human readers first — the database does not care about your line order, but the reviewer does.",
        "Verify pagination from the data: run the LIMIT/OFFSET pair yourself and compare first and last ids against the screen.",
        "Save your best filters as named queries; 'paid over 50' will be requested again by the dashboard team.",
        "Comment the units and the boundary dates inline — six months later, 5000 will not explain itself."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "WHERE filters, ORDER BY sorts, LIMIT trims — applied in that order.",
        "Parenthesize every OR; AND binds tighter and will surprise you.",
        "LIKE '%@gmail.com' matches endings; % is the wildcard.",
        "Page N of size S is OFFSET (N-1)*S with LIMIT S; verify it against the screen."
      ] },
      { type: "quote", text: "Rule of thumb: before you believe any list on a screen, run the same filter and sort in SQL — a matching row count means you tested the query layer for free; a mismatch is a bug with evidence attached." }
    ]
  },
  {
    id: "sql-joins-for-testers",
    num: "056",
    title: "SQL JOINs Explained With Tables You Can Picture",
    dek: "One query, two tables: INNER JOIN shows only users who ordered, LEFT JOIN shows everyone and marks the rest NULL — which is how you find users who never checked out.",
    date: "2026-06-22",
    read: "5 min",
    category: "SQL & Databases",
    difficulty: "intermediate",
    tags: ["sql", "joins", "null"],
    status: "green",
    body: [
      { type: "p", text: "A launch report claimed 'all registered users can see their orders'. Support disagreed: users with fresh accounts saw an empty orders page and a crash. The report's query used INNER JOIN, so the very users it needed to count — the ones with no orders — were filtered out of the evidence before anyone looked. One word, INNER versus LEFT, hid the bug." },
      { type: "p", text: "A JOIN reads rows from two tables side by side, matching them through a foreign key. INNER JOIN returns only rows that match in both tables. LEFT JOIN returns every row from the left table, filling the right table's columns with NULL wherever there is no match. Picture the spreadsheet again: users on the left, orders on the right, and the join deciding what happens to users with an empty orders side." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "INNER JOIN quietly deletes exactly the rows testers care most about: users who never ordered, orders with no items, accounts with no settings. Any report, export, or dashboard built on INNER joins carries that blind spot with no error and no warning. Knowing which join a query uses tells you who is missing from the answer — and NULL handling is where junior SQL visibly turns senior." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Same shop, same two tables. First, only the users who have at least one order:" },
      { type: "code", lang: "sql", label: "sql/users-with-orders.sql", code: `SELECT u.name, u.email, o.id AS order_id, o.status
FROM users u
INNER JOIN orders o ON o.user_id = u.id
ORDER BY u.id;` },
      { type: "p", text: "The u and o are table aliases — short names so the ON line reads like a sentence: match orders whose user_id equals the user's id. Maya with three orders appears three times; a user with none appears zero times. Now flip the question:" },
      { type: "code", lang: "sql", label: "sql/users-never-ordered.sql", code: `SELECT u.id, u.name, u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;` },
      { type: "p", text: "LEFT JOIN keeps every user and fills the order columns with NULL for the ones who never ordered, so WHERE o.id IS NULL selects exactly them — the support team's whole complaint list in one result. LEFT JOIN plus IS NULL is the standard 'find the missing side' pattern, and it returns in article 059 as the orphan-row detector." },
      { type: "p", text: "NULL brings two traps that bite everyone exactly once:" },
      { type: "ul", items: [
        "NULL is not equal to NULL — each NULL means 'unknown', and unknown does not match unknown, not even itself. o.id = NULL returns zero rows forever; the correct test is o.id IS NULL.",
        "= never finds NULLs — WHERE o.status = NULL returns nothing instead of erroring, so the mistake looks like clean data. Search for NULLs only with IS NULL or IS NOT NULL.",
        "NULL spreads through math — after a LEFT JOIN, any right-table column is NULL for unmatched rows, and one NULL inside a calculation makes the whole result NULL."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Defaulting to INNER JOIN because the tutorial did — you lose the unmatched left rows silently. Instead, ask 'should users with zero orders appear here?' before every join.",
        "Putting a right-table condition in WHERE after a LEFT JOIN — WHERE o.status = 'paid' discards the NULL rows and the join now behaves like INNER. Instead, keep that condition in the ON clause or handle IS NULL explicitly.",
        "Joining without checking the join key for duplicates — one user matching two rows doubles your counts. Instead, compare row counts before and after the join during verification.",
        "Reading NULL rows as bad data — with LEFT JOIN, NULL on the right is the expected, meaningful answer: this user never ordered. Instead, interpret NULLs before fixing anything.",
        "Writing ON o.user_id = o.id — wrong-table keys produce nonsense that still looks plausible. Instead, read the ON line aloud: the child's foreign key matches the parent's primary key."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Default to LEFT JOIN when the question says 'all users' or 'every order'; switch to INNER only when both sides must exist.",
        "Alias tables with short names — u, o — so the ON clause stays readable and reviewable.",
        "Sanity-check any join with counts: users alone, orders alone, joined rows. The three numbers tell you if rows duplicated or vanished.",
        "Memorize LEFT JOIN with WHERE right.id IS NULL; it answers 'who is missing' across a dozen features.",
        "Never compare anything to NULL with equals; IS NULL and IS NOT NULL are the only correct tests."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "INNER JOIN: matches only. LEFT JOIN: all left rows, NULLs where the right is missing.",
        "Users who never ordered = LEFT JOIN plus IS NULL.",
        "NULL never equals NULL; only IS NULL can find it.",
        "If a report ignores the empty side, the join type is the first suspect."
      ] },
      { type: "quote", text: "Interview tip: 'inner join returns matching rows; left join returns all left rows plus matches with NULL fill' is the sentence they want — follow it with the never-ordered-users example and the question is yours." }
    ]
  },
];
