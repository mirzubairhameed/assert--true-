import type { Post } from "../post-types";

export const BUGS_B: Post[] = [
  {
    id: "requirements-traceability-matrix",
    num: "024",
    title: "The Requirements Traceability Matrix, Demystified",
    dek: "An auditor asks which tests covered the refund requirement. The traceability matrix answers in one page: requirement, scenarios, test cases, defects — and the gaps in between.",
    date: "2026-05-05",
    read: "5 min",
    category: "Bugs & Process",
    difficulty: "intermediate",
    tags: ["traceability", "requirements", "test-coverage"],
    status: "green",
    body: [
      { type: "p", text: "An auditor, a client, or a new manager asks one simple question: 'We paid for the refund feature — show me it was tested.' Ten people start scrolling through Jira, Confluence, and somebody's old spreadsheet, piecing the answer together from memory. The evidence exists, but assembling it takes an hour and a meeting. A requirements traceability matrix, or RTM, is the document that answers the question on one page: every requirement mapped to the scenarios, test cases, and defects that cover it." },
      { type: "p", text: "An RTM is a thread you can pull from either end. Start at a requirement and follow it forward to the tests that exercise it; start at a failing test and trace it back to the requirement it endangers. Think of luggage tags at an airport: every bag is tied to a passenger, so nothing travels unclaimed. Forward and backward, the chain stays unbroken." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Clients and auditors demand traceability because they need evidence, not assurance — especially in regulated industries like banking, healthcare, and aviation, where an inspector can ask for the chain from rule to test to result. The matrix also exposes gaps while they are still cheap: a requirement with no test cases is a silent risk, and a test case with no requirement is effort spent on something nobody asked for. When scope changes mid-project, the matrix shows exactly which tests to update. Without it, coverage is a feeling; with it, coverage is a table." },
      { type: "h", text: "In practice" },
      { type: "p", text: "A minimal RTM has four columns: requirement, scenarios, test cases, defects. Here is one full row for a refund policy:" },
      { type: "ul", items: [
        "REQ-12 — Refunds are processed within 5 business days and the customer is notified by email.",
        "Scenarios — full refund of an order; partial refund of one item; refund attempted after the 30-day window.",
        "TC-45 — Request a full refund for order 8841; verify the order status becomes 'Refunded' and a confirmation email arrives.",
        "TC-46 — Attempt a refund 31 days after delivery; verify the request is rejected with a clear message.",
        "Defects — QA-301: refund confirmation email sent twice, found by TC-45, fixed in build 2.3.2."
      ] },
      { type: "p", text: "That single row answers three questions at once: was REQ-12 tested, how, and what went wrong along the way. A real matrix is this row repeated for every requirement — usually a Confluence table or a shared sheet with one row per requirement, kept beside the test plan rather than in a drawer." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "List the requirement IDs from the spec or the user stories as the first column.",
        "Add the scenarios you derived from each requirement, one line per requirement.",
        "Link the concrete test case IDs that execute those scenarios.",
        "Add defect IDs as testing finds them, so failures trace back to requirements automatically.",
        "Scan the matrix for empty cells: requirements without tests, tests without requirements.",
        "Update the affected rows whenever scope changes, and re-check them before sign-off."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Building a giant spreadsheet nobody updates — this hides drift until the audit, when the matrix lies. Instead, keep it where the work lives and update rows as you go.",
        "Tracing only forward, from requirement to test — this hides orphan tests that verify nothing anyone asked for. Instead, check backward too, from every test to a requirement.",
        "Recording only pass or fail — this hides the defects that reveal requirement quality. Instead, include defect IDs and their current status in the row.",
        "Waiting until release week to fill it in — this hides coverage gaps until they are expensive to close. Instead, maintain it while cases are being written.",
        "Pasting requirement text instead of IDs — this hides the single source of truth. Instead, link IDs so spec updates propagate to your matrix."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "In Jira, use link types like 'covers' and 'tested by' so filters assemble most of the matrix for you.",
        "Keep a lightweight Confluence table with one row per requirement for stakeholder reviews.",
        "Review the matrix when you review the test plan, while adding coverage is still cheap.",
        "On regulated projects, version the matrix with each release so the audit trail is built in."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "An RTM maps requirement to scenarios to test cases to defects.",
        "It answers 'show me it was tested' with one page instead of a meeting.",
        "Empty rows are risks; orphan tests are waste.",
        "Keep it next to the work, not in a file that only opens for audits."
      ] },
      { type: "quote", text: "Rule of thumb: if you cannot trace a test back to a requirement, or a requirement forward to a test, one of the two is a liability — find it before an auditor does." }
    ]
  },
  {
    id: "qa-metrics-that-matter",
    num: "025",
    title: "QA Metrics That Matter (and the Ones That Lie)",
    dek: "Four thousand test cases written, nine hundred bugs logged — and zero insight. The six metrics that inform real decisions, and the two vanity numbers that quietly reward junk.",
    date: "2026-05-07",
    read: "5 min",
    category: "Bugs & Process",
    difficulty: "intermediate",
    tags: ["qa-metrics", "defect-leakage", "reporting"],
    status: "green",
    body: [
      { type: "p", text: "Two QA teams report to the same board. Team A wrote 4,000 test cases and logged 900 bugs this quarter. Team B wrote 700 test cases, logged 180 bugs, and let zero critical defects escape to production. If you picked Team A, you picked the team whose numbers say nothing about quality. Metrics are only as honest as the decisions they inform — and a couple of popular ones inform nothing at all." },
      { type: "p", text: "A useful QA metric is a gauge on a car dashboard: it exists to trigger a decision, the way a fuel light makes you stop at a station. A vanity metric is the sticker on the bumper: it looks fine and changes nothing. Before you track any number, ask what decision changes when the number moves. If the answer is none, it is decoration." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Bad metrics do not just fail to help — they change behavior for the worse. Count bugs found per tester and you will get junk bugs filed by the dozen, plus developers who resent QA for scoring points. Count test cases written and you will get a bloated suite full of duplicates nobody runs. Teams that choose metrics well steer testing toward risk; teams that choose badly reward paperwork." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here are the metrics that earn a dashboard, each with the decision it informs:" },
      { type: "ul", items: [
        "Test pass rate trend — the share of executed tests that pass, tracked across builds. A falling trend after a quiet sprint says the build is getting riskier; the decision is whether to hold the release.",
        "Defect discovery rate — bugs found per day or per sprint, plotted across the cycle. A curve that flattens too early suggests testing is finding less, not that the product is clean; the decision is where to aim the next testing push.",
        "Defect leakage — bugs found in production divided by total bugs found, production and pre-release combined. A leak rate of 15 percent means one bug in seven reached users; the decision is which module gets more coverage, usually the one the escapees came from.",
        "Escaped-critical count — how many critical or blocker defects reached production in the period. Anything above zero on a payments flow triggers a review of that area's test design; the decision is where deeper testing goes next cycle.",
        "Automation coverage of critical flows — the share of checkout, login, or refund journeys that run automatically on every build. The decision is what to automate next so regression risk drops where it hurts most.",
        "Reopen rate — the share of fixed defects that fail retest and come back. A rising reopen rate means fixes are rushed or environments drift; the decision is whether the team needs a fix-quality conversation."
      ] },
      { type: "p", text: "And the two that lie:" },
      { type: "ul", items: [
        "'Test cases written' — a pure volume counter. A team can write 500 redundant cases and cover nothing new; the number measures activity, not protection, and it grows fastest where review is weakest.",
        "'Bugs found' as a personal KPI — it turns QA into a scoring game. It rewards junk bugs and duplicate reports, quietly punishes the tester whose module was genuinely stable, and sours the developer relationship it was supposed to reflect."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Pick two or three metrics tied to a decision the team keeps making anyway.",
        "Define each one in writing: formula, data source, and reporting period.",
        "Baseline for a month before reacting, so you compare movement rather than moods.",
        "Review trends, not single points; one bad week is noise, three in a row is a signal.",
        "Pair every number with context: release size, scope changes, staffing changes.",
        "Retire a metric the moment it stops informing a decision or starts being gamed."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Presenting metrics without the decision they inform — this hides the point and turns reviews into theater. Instead, show each number with the action it suggests.",
        "Ranking testers by bug counts — this hides real risk behind a competition. Instead, compare modules and trends over time.",
        "Celebrating a high pass rate on a shallow suite — this hides weak coverage behind a green number. Instead, read pass rate next to coverage of critical flows.",
        "Chasing zero leakage at any cost — this hides what the last percentage point costs in effort. Instead, set a target per release type and review the exceptions.",
        "Copying another team's dashboard — this hides your product's actual risks. Instead, start from the decisions your team owes someone."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Tie metrics to risk: track the areas where failure costs money, data, or trust.",
        "Collect the data automatically from Jira or your test runner so reporting never becomes a chore.",
        "Fit the trends on one page: pass rate, discovery rate, leakage, reopen rate.",
        "Share metrics with developers, not just managers — leakage is a team number, not a QA number."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A metric earns its place by informing a decision; otherwise it is decoration.",
        "Defect leakage and escaped-critical count measure what users actually experience.",
        "Pass rate and discovery rate are trends, never single snapshots.",
        "Case counts and bug quotas measure activity — and they lie by rewarding it."
      ] },
      { type: "quote", text: "Interview tip: when asked about QA metrics, name defect leakage first, give the formula — production bugs over total bugs — and say what you would change if the number rose." }
    ]
  },
  {
    id: "uat-explained",
    num: "026",
    title: "User Acceptance Testing: The Last Mile Before Release",
    dek: "The client opened a report for her Tokyo store and spotted what three test passes missed: dates off by a day. That is UAT — the last mile before release.",
    date: "2026-05-09",
    read: "5 min",
    category: "Bugs & Process",
    difficulty: "beginner",
    tags: ["uat", "acceptance-testing", "release"],
    status: "green",
    body: [
      { type: "p", text: "For months, a client's reporting dashboard showed daily revenue with orders dated one day early whenever they were placed after 5 p.m. UTC. QA had tested the report twice, the developer had checked it, and every number looked plausible to everyone inside the team. Then the client ran her own acceptance pass, opened the report for her store in Tokyo, and the dates were wrong in a way only a business owner would notice on sight. That is UAT doing its job: the last mile before release, walked by the people who will live with the product." },
      { type: "p", text: "User acceptance testing, or UAT, is the phase where real users — or people who genuinely represent them — validate the product against their needs before it ships. QA tests whether the system meets the requirements; users test whether the requirements meet reality. It is the difference between a building inspector approving the wiring and the family deciding whether the kitchen actually works for cooking dinner." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Users catch what test cases cannot: the workflow that is technically correct but awkward at 7 a.m. on a phone, the report column that means nothing to an accountant, the timezone, the currency, the industry term nobody on the team uses. UAT is also the milestone where the business takes ownership of the release decision, in writing. Skip it, and the need does not disappear — the discovery just moves into production, where every issue costs the most." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Acceptance-style testing comes in three flavors, and interviews love to ask about them:" },
      { type: "ul", items: [
        "Alpha testing — people inside your own organization exercise the product in a development-like environment, before any outside eyes. Fast feedback, low risk, limited realism.",
        "Beta testing — a limited group of real external users tries a nearly final build in their own environments. You get breadth and real-world variety, with little control and slower feedback.",
        "UAT — the paying client or designated user representatives execute planned acceptance scenarios in a prepared environment, with a pass or fail per scenario and a formal sign-off at the end."
      ] },
      { type: "p", text: "Of the three, UAT is the one with your name on the schedule. Here is how QA supports it:" },
      { type: "ul", items: [
        "Prepare UAT scenarios from the acceptance criteria — translate each criterion of the user stories into plain language, like 'As a store owner, I refund one item and see my balance update within a day'.",
        "Provide a clean environment with realistic test data — a staging copy that resembles production, with sample customers, orders, and reports, plus a reset plan for each UAT day.",
        "Write a short guide — how to log in, where to record results, whom to ask when stuck.",
        "Triage feedback daily — sort findings into bugs (send them through the defect flow in your report format), questions (answer or route to the product owner), and change requests (log them for the roadmap instead of silently absorbing them into the release).",
        "Track sign-off — record which scenarios passed, which failed, and what the client agreed to accept anyway; the release note needs that truth."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Collect the acceptance criteria for every story in the release.",
        "Draft one UAT scenario per criterion, in the user's language rather than the system's.",
        "Prepare the environment, the data, and the accounts a day early, and test the login yourself.",
        "Walk the client through the guide so the first hour is not spent fighting access.",
        "Triage every finding the same day into bug, question, or change request.",
        "Fix bugs, rerun the affected scenarios, and capture the sign-off with open items listed."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Handing users a blank environment and asking for 'general feedback' — this hides the acceptance criteria the release is actually judged on. Instead, give planned scenarios with room to explore.",
        "Seeding the environment with fake data like 'Test User 1' — this hides the realism that surfaces timezone, currency, and naming issues. Instead, load production-like sample data.",
        "Absorbing every client request into the release — this hides scope creep until the date slips. Instead, route change requests to the roadmap with a recorded decision.",
        "Letting QA decide alone whether something is a bug — this hides business intent only the product owner knows. Instead, triage together.",
        "Treating sign-off as a formality — this hides the client's real reservations. Instead, list accepted risks in writing on the sign-off."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Schedule UAT with buffer before the release date, not the evening before.",
        "Hold a 15-minute feedback review each day so issues never pile up.",
        "Pair each UAT scenario with the story ID so traceability stays intact.",
        "Close the loop: show users what changed because of their feedback, so they return for the next round."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "UAT is real users validating the product against their needs before release.",
        "Alpha is internal, beta is external and informal, UAT is planned and signed off.",
        "QA's job in UAT is scenarios, environment, data, and triage — not doing it for them.",
        "The client's eyes catch what the requirement never wrote down."
      ] },
      { type: "quote", text: "Rule of thumb: if nobody outside the team has touched the release before it ships, your UAT is happening in production — with your users as the testers." }
    ]
  }
];
