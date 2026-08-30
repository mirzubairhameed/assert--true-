import type { Post } from "../post-types";

export const FUNDAMENTALS_A: Post[] = [
  {
    id: "what-is-software-testing",
    num: "001",
    title: "What Is Software Testing? A Plain-English Introduction",
    dek: "Testing is the food inspector's job in a software kitchen: taste before serving, report what is wrong, and never promise the dish is perfect. Here is what testers actually do.",
    date: "2026-04-01",
    read: "5 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["qa-basics", "testing-fundamentals", "career-start"],
    status: "green",
    body: [
      { type: "p", text: "A food inspector walks into a restaurant kitchen before service. She cooks nothing and fixes nothing — she tastes the dishes, notes exactly which pan is under-salted, and sends precise notes back to the chef. If she is thorough, bad plates never reach your table. If the kitchen skips her, you become the quality check, bite by bite, and you pay for the privilege." },
      { type: "p", text: "Software testing works the same way. A tester runs an application on purpose, trying the things users do and plenty they never should, so defects surface before customers find them. The developer is the chef: when the tester sends back a note about a broken feature, the developer digs into the cause and repairs it — that repair work is called debugging. Quality assurance (QA) is the bigger system around both: the standards, processes, and habits that make defects less likely in the first place. Testing is a core activity inside QA, not a synonym for it." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Software fails in ordinary ways that hurt real people: a card is charged twice, a saved address comes back blank, a delivery rider is routed to the wrong street. A defect caught by a tester is a ticket; the same defect caught by a customer is a refund, a one-star review, and a support queue. Testing is also honest work in a specific way — it can show that defects exist, but it cannot prove that none remain. After the cleanest test week of your career, the most you can say is that you found no bugs under the conditions you tried." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Job listings make the role sound mysterious. A working tester's week is a loop of concrete activities:" },
      { type: "ul", items: [
        "Read each requirement or user story (a short description of what a user needs) and list every rule that could be broken — before any build exists.",
        "Turn those rules into test cases: short recipes that say what to do, with what data, and exactly what should happen.",
        "Run the new features by hand, mixing happy paths with wrong passwords, empty carts, and double taps.",
        "Write bug reports a developer can act on: exact steps, expected versus actual, screenshots, build number.",
        "Retest each fix on the build where it landed, then rerun older checks to make sure nothing else broke.",
        "Verify what the system stored, not just what the screen said — the database row and the API response count too.",
        "Join standups and sprint planning, flag risky requirements early, and tell the team plainly what is still untested."
      ] },
      { type: "p", text: "Notice that only some of those bullets involve clicking through an app. The rest is thinking, writing, and communicating — which is why a careful tester is valuable even before a build arrives." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Doing the developer's job with vague bug reports — 'it does not work' hides the actual failure and wastes a day. Instead, name the steps, the expected result, and the actual result.",
        "Promising the product is bug-free after a passing run — testing can never prove the absence of defects. Instead, report what you covered and what you did not.",
        "Treating QA as a phase at the end — by then the wrong decisions are built and expensive. Instead, join requirement discussions while your questions still cost a conversation, not a rewrite.",
        "Testing only like a polite ideal user — real users type nonsense, lose network, and tap twice. Instead, plan rough, distracted, and hostile input from the first pass.",
        "Calling your own investigation debugging — debugging is the developer's repair work after a defect is found. Instead, expose the failure precisely and hand the chef a plate worth fixing."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Start with the requirement, not the build; a question on day one is cheaper than a bug on day thirty.",
        "Keep a personal checklist per screen type — login, cart, payment — and sharpen it after every escaped defect.",
        "Verify in layers: the on-screen message, the API response, and the database row should all agree.",
        "Track coverage honestly, so 'untested' is a statement you can defend, not a guess.",
        "Read one public incident report each month; escaped defects teach patterns no course covers."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Testing finds defects on purpose; debugging fixes them; QA is the system that makes defects rare.",
        "A tester is an inspector, not a repairperson — your power is precise reporting.",
        "Testing shows defects exist; it can never prove none remain.",
        "Most of the job is thinking and writing, not clicking."
      ] },
      { type: "quote", text: "Interview tip: asked 'what is testing?', answer in three parts — testing finds defects, debugging fixes them, QA prevents them — then add the inspector line: testing shows defects exist and can never prove there are none." }
    ]
  },
  {
    id: "cost-of-bugs",
    num: "002",
    title: "Why Bugs Cost More the Later You Find Them",
    dek: "A bug found during requirements costs a conversation; the same bug in production costs millions. The Knight Capital story shows what 45 minutes of untested code can erase.",
    date: "2026-04-03",
    read: "4 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["defect-cost", "quality-economics", "bug-stories"],
    status: "green",
    body: [
      { type: "p", text: "Forty-five minutes. That is how long it took the trading firm Knight Capital to lose about $440 million on June 1, 2012. An old flag — a switch that turns a piece of code on or off — was reused for new logic, and one of eight servers still carried the retired code it used to control. When the new system set that flag, the dead code woke up and fired millions of bogus orders into the market. The company survived only by selling itself days later." },
      { type: "p", text: "The disaster is the extreme version of a rule every quality assurance (QA) engineer learns early: the later a defect is found, the more it costs to fix. A common industry rule of thumb puts a requirement-stage fix at 1x — the cost of editing a sentence. Find the same defect while coding and it is roughly 10x, because rework, reviews, and retests pile on. Reach production and you are at 100x or worse: emergency release, refunds, support tickets, and reputation damage all at once." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Money is the easy part to count; trust is the part that compounds. A customer who watches a failed payment charge twice does not come back because the changelog says fixed. Early defects are cheap because so little exists to unwind — no code, no release, no angry users. Knight Capital's flag was never tested because everyone assumed the retired code could never run again. Cheap early checks exist precisely so that no path is ever left to 'impossible'." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Watch one requirement — 'the cart must round money to two decimals, half up' — travel through the phases:" },
      { type: "ul", items: [
        "Requirements stage (1x) — a tester reading the draft asks what happens to 499.995, the analyst writes the rounding rule into the document, and the fix is one conversation.",
        "Coding stage (about 10x) — the flaw survives into code; a developer's unit test catches it, and the function is rewritten and reviewed. Cost: rework and a delayed ticket.",
        "QA stage (tens of x) — the defect is caught before release; the fix needs coding, code review, a retest, and reruns of the older tests around it. Cost: days of several people's time.",
        "Production (100x and up) — customers see wrong totals; the team ships an emergency fix, issues refunds, answers support tickets, and explains itself to the payment partner. Cost: weeks and trust.",
        "Every stage also multiplies risk — the later the fix, the more systems have already been built on top of the wrong behavior."
      ] },
      { type: "p", text: "Cheap early checks are unglamorous: one question in refinement, a fifteen-minute document review, a unit test for a single rounding edge. None feels heroic. Together they are why most releases stay boring — and boring is the goal." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Deferring hard questions to test time — by then the wrong rule is coded and wired to payments. Instead, raise them in requirement review while the fix is still a sentence.",
        "Skipping unit-level checks because 'QA will catch it' — QA is one filter, not a mop. Instead, let developers own unit tests for money, dates, and boundaries.",
        "Treating a hotfix as the end of the incident — the wrong behavior may live on in reports, exports, and caches. Instead, sweep the surroundings before declaring victory.",
        "Learning only from your own project's bugs — one team's history is a tiny sample. Instead, read public incident reports and copy their checklists.",
        "Praising dramatic late rescues — heroics are expensive by definition. Instead, celebrate the releases where nothing caught fire."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Review requirements with a defect hunter's eye: rounding, time zones, empty states, and concurrency deserve questions every time.",
        "Write acceptance criteria with exact values — 499.995, not 'correct rounding' — so tests can be exact too.",
        "Add a lightweight unit test for every money, date, or boundary rule before the feature leaves the branch.",
        "Rehearse the production failure once a quarter: who rolls back, who writes the customer note, who counts the damage.",
        "Keep a 'caught early' log of questions and document fixes; it is the evidence that earns QA a seat in refinement."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Defect cost multiplies by stage: requirements 1x, coding about 10x, production 100x and beyond.",
        "Knight Capital lost $440 million in 45 minutes to an untested reused flag — the ceiling of 'later' is that high.",
        "Early checks are cheap because little exists to unwind.",
        "Boring releases are the scoreboard win, not dramatic rescues."
      ] },
      { type: "quote", text: "Interview tip: 'why do bugs cost more later?' is an invitation for the 1x-10x-100x answer plus one story — the Knight Capital flag turns a textbook answer into a memorable one." }
    ]
  },
  {
    id: "seven-principles-of-testing",
    num: "003",
    title: "The Seven Principles of Testing (And How to Use Them)",
    dek: "Seven assumptions sit under every good test effort, from defect clustering to the pesticide paradox. Learn each with a concrete example and you will spot them in your own sprint.",
    date: "2026-04-04",
    read: "5 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["testing-principles", "istqb", "qa-basics"],
    status: "green",
    body: [
      { type: "p", text: "Why does a product that passed every test still embarrass a team on launch day? Why does the same test suite keep passing while customers keep complaining? Both questions were answered decades ago, in seven short principles of testing — the field's shared assumptions about what testing can and cannot do. They are short enough to memorize and sharp enough to change how you work this week." },
      { type: "p", text: "The principles come from classic industry wisdom; the ISTQB syllabus (the International Software Testing Qualifications Board, the main testing certification body) lists all seven, and interviewers ask for them worldwide. None is a technique you run; each is a rule about reality. Treat them as guardrails — when a plan violates one, expect trouble in a specific direction." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Beginners break these principles by accident: promising zero bugs, spreading effort evenly across every screen, or rerunning one unchanged suite for a year. Each mistake has a price — wrong promises to managers, wasted hours, and suites that stay green while the product rots. Learning the seven is far cheaper than rediscovering them through a failed release." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here are all seven, each with its one-line meaning and a concrete example:" },
      { type: "ul", items: [
        "Testing shows the presence of defects, not their absence — passing tests say nothing about paths you never tried. Example: 500 green tests, and checkout still fails for gift-card users because no test ever used one.",
        "Exhaustive testing is impossible — no team can try every input, path, and timing combination. Example: a 50-character name field has more valid inputs than you could run in a lifetime, so you test boundaries, empties, and typical values instead.",
        "Early testing saves time and money — defects are cheapest before the code exists. Example: spotting a missing GST (goods and services tax) rule during a document review takes five minutes; the same defect found at user acceptance testing costs a developer-week of rework.",
        "Defect clustering — bugs bunch together in a small share of modules. Example: the payments module owned 80% of last release's defects, so this release it gets the deepest effort, not an equal slice.",
        "The pesticide paradox — the same tests stop finding new bugs, just as the same pesticide stops killing new pests. Example: a 200-case regression suite has passed unchanged for six sprints, so you vary the data, add fresh cases, and add exploratory passes.",
        "Testing is context-dependent — different products need different testing. Example: a banking app lives or dies on security and accuracy; a food-delivery app is judged on speed, usability, and bad networks.",
        "The absence-of-errors fallacy — a defect-free system can still fail if it is the wrong system. Example: a flawless checkout that cannot apply the discount campaign marketing promised is still a failure."
      ] },
      { type: "p", text: "Use the principles as conversation tools, not trivia. 'Testing shows presence' resets a manager who promises zero bugs. 'Defect clustering' justifies three days on payments and one on settings. 'Context-dependent' wins the argument for device coverage when someone asks why mobile needs separate effort." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Treating a 100% pass rate as 'ready to ship' — passes only describe what you covered. Instead, pair every pass report with a note on coverage and remaining risk.",
        "Rerunning an identical suite forever — the pesticide paradox guarantees it goes blind. Instead, rotate data, add cases, and retire obsolete ones every release.",
        "Spreading effort evenly across features — clustering says risk is uneven. Instead, aim deep testing at modules with the worst history and the most change.",
        "Starting test work only when code arrives — early testing is a principle, not a luxury. Instead, review requirements and draft scenarios during refinement.",
        "Chasing 'no bugs found' as a goal — a silent run can mean weak testing, not a clean product. Instead, measure coverage of risky paths and keep questioning your own suite."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Memorize the seven with one example each; the whole set fits into two minutes of any interview.",
        "Review your regression suite every release: what to add, what to vary, what to delete.",
        "Rank modules by change rate and defect history, and let that ranking drive your hours.",
        "Write the principles, one sentence each, into your team's test notes so new joiners inherit the guardrails.",
        "When a stakeholder says 'it passed, so it works', answer with principle one and principle seven in plain words."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Testing can show bugs exist; it can never prove none remain.",
        "You cannot test everything, so choose by risk, history, and change.",
        "Fresh tests find new bugs; frozen suites go blind.",
        "Zero defects still is not success if you built the wrong thing."
      ] },
      { type: "quote", text: "Interview tip: name the seven principles in order and attach one concrete example to each — a list with stories beats a memorized definition every time." }
    ]
  },
  {
    id: "sdlc-for-testers",
    num: "004",
    title: "The SDLC Explained: Where Testing Fits in Every Model",
    dek: "Waterfall tests at the end, the V-model tests in parallel, Agile tests inside the sprint. Follow one food-delivery feature through all three models and watch where bugs surface.",
    date: "2026-04-05",
    read: "5 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["sdlc", "agile", "waterfall", "process"],
    status: "green",
    body: [
      { type: "p", text: "The most expensive myth in software is that testing happens at the end. Teams that believe it discover requirement mistakes after the code exists and pay full price for every one. Where testing actually sits depends on the development model a team follows — and that model changes your week more than any tool does." },
      { type: "p", text: "The Software Development Life Cycle (SDLC) is the path a product travels: requirements, design, coding, testing, release, maintenance. Waterfall walks that path once, top to bottom, finishing each stage before the next begins. The V-model bends the path into a V so every build stage is mirrored by a test stage planned from the start. Agile replaces the single trip with sprints (short fixed cycles, usually two weeks) that run analysis, build, and test together, over and over." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Your model decides when you can influence a requirement, when bugs get found, and how the team is shaped around you. In one model you are a phase at the end; in another you are a partner who never leaves the room. Knowing the pure forms also stops the confusion most new testers feel — plenty of companies run hybrids, and being able to name what you see is half the battle." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is the comparison that matters, dimension by dimension:" },
      { type: "ul", items: [
        "Waterfall — testing phase: one dedicated block after all coding ends. Bugs found: months after they were written, when context is stale and fixes cost the most. Team shape: developers finish, then hand off to a separate test team, with little contact between them.",
        "V-model — testing phase: paired with every build stage, because each level of the V has a matching test level. Bugs found: early, since acceptance and design tests are defined alongside requirements and design. Team shape: dev and test roles paired level by level — requirements mirrored by user acceptance testing (UAT), design by integration and system tests, code by unit tests.",
        "Agile — testing phase: continuous, inside every sprint, on the same days code is written. Bugs found: within the sprint, often the same day. Team shape: one cross-functional squad — developers, a tester or two, and a product owner — sharing a single board."
      ] },
      { type: "p", text: "One feature — 'customers can reorder last week's order in one tap' — shows how differently the same bug travels:" },
      { type: "ul", items: [
        "Waterfall: the rule sits in a 60-page specification written in January; coding ends in May; testing starts in June, and the misread rule — reorders must exclude out-of-stock dishes, which nobody encoded — surfaces two days before launch, at the worst possible price.",
        "V-model: while requirements for the reorder button are written in March, the UAT cases for it are drafted the same week, so the out-of-stock question is asked in March and answered in the document.",
        "Agile: the story enters a two-week sprint; cases are written on day two, the build is tested on day six, the out-of-stock gap is logged on day seven, and the fix ships with the sprint on day ten."
      ] },
      { type: "p", text: "Same bug, same app — three arrival times and three very different repair bills. That is the whole argument for caring which model you are in." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Waiting for a 'complete build' before thinking about tests — that is waterfall thinking imported into a sprint team. Instead, draft scenarios the day a story is refined.",
        "Treating testers as a phase instead of a role — handoffs lose context and multiply defects. Instead, keep one tester in the loop from requirement to release.",
        "Assuming the diagram on the wall is the real process — many teams say Agile and run waterfall sprints. Instead, watch when bugs actually surface and name the model you truly have.",
        "Skipping test planning because sprints are short — short cycles need tighter planning, not none. Instead, keep a lightweight per-sprint plan of scope, environments, and risks.",
        "Copying another team's process wholesale — their model and their risks are not yours. Instead, match your testing rhythm to how your team actually delivers."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Ask in week one which model your team follows in practice, not in theory.",
        "In waterfall, push for requirement reviews and staged test entries on partial builds — big-bang testing at the end finds bugs at maximum price.",
        "In the V-model, claim your mirrored level: write the acceptance cases while the matching requirements are still being written.",
        "In Agile, help design the 'ready for QA' handoff with clear entry criteria, so builds arrive testable.",
        "Match reporting to the model: stage-gate summaries for waterfall, sprint-board status for Agile."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Waterfall tests late; the V-model tests in parallel by design; Agile tests continuously.",
        "The later a model finds bugs, the more each one costs to fix.",
        "Team shape follows the model: separate phase, paired levels, or one cross-functional squad.",
        "Most real teams are hybrids; learn the pure forms so you can name what you see."
      ] },
      { type: "quote", text: "Rule of thumb: in every model, test planning belongs at the same table as requirement writing — only the length of the loop changes." }
    ]
  },
  {
    id: "stlc-explained",
    num: "005",
    title: "STLC: The Software Testing Life Cycle, Stage by Stage",
    dek: "Six stages carry every feature from a rough requirement to a signed-off release. Here is each stage of the testing life cycle with real entry and exit criteria.",
    date: "2026-04-07",
    read: "5 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["stlc", "process", "test-planning"],
    status: "green",
    body: [
      { type: "p", text: "Monday, 10 a.m., sprint planning. The product owner reads a story aloud: 'As a customer, I want to reorder my last meal in one tap.' The instinct of most beginners is to wait for the build next week. On a healthy team, testing work on that story starts the moment the words are spoken, and it follows a loop called the Software Testing Life Cycle (STLC)." },
      { type: "p", text: "STLC is the sequence testing goes through for every feature or release: requirement analysis, test planning, test case development, environment setup, test execution, and test closure. Think of it as a pilot's checklist — the same loop before every flight, whatever the destination. Each stage has entry criteria (what must exist before you start) and exit criteria (what must be true before you call it done), and those two lists turn the loop into something a team can audit instead of a mood." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without a defined loop, testing becomes whatever time is left over: cases written after the build arrives, environment surprises on test day, and a 'done' that means someone got tired. With STLC, a tester who joins mid-project can see exactly which stage the team is in and what should already exist. The stage names also give you words for pushback — 'execution cannot start, the entry criteria are not met' is an argument, not a complaint." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The six stages, with realistic entry and exit criteria for each:" },
      { type: "ul", items: [
        "Requirement analysis — entry: draft requirements or user stories exist. Work: read them, ask what is missing, and list testable conditions. Exit: questions answered with the analyst and test conditions captured.",
        "Test planning — entry: requirements are stable enough to estimate. Work: define scope, approach, schedule, environments, risks, and roles. Exit: a test plan the team has actually reviewed and an estimate the sprint can afford.",
        "Test case development — entry: the plan is approved. Work: write cases with steps, data, and expected results; get them peer-reviewed; prepare test data. Exit: cases reviewed, traceable to requirements, with data ready.",
        "Environment setup — entry: cases are ready and a build is imminent. Work: prepare the test environment, accounts, devices, and seeded data; deploy the build; run a smoke test (a quick is-it-stable check). Exit: smoke test passed and the team agrees the environment is stable.",
        "Test execution — entry: the build passed smoke and landed in QA. Work: run cases, log defects with exact steps, retest fixes, and rerun the older tests around touched areas. Exit: all planned cases executed, defects triaged, no critical bugs open.",
        "Test closure — entry: execution is complete and the release decision is made. Work: collect metrics, write the closure summary, archive cases and reports, note lessons learned. Exit: closure report shared and accepted by stakeholders."
      ] },
      { type: "p", text: "In Agile, this loop does not run once per release — it runs inside every sprint, compressed. Refinement (the meeting where stories are prepared) covers requirement analysis; sprint planning covers test planning; cases are written by mid-sprint while code is still moving; the environment is a standing build pipeline instead of a setup day; execution runs as stories reach 'ready for QA'; and closure happens at review and retrospective. The stage names survive; only their duration shrinks." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Starting execution the hour a build lands — entry criteria exist to stop exactly this. Instead, require a passed smoke test before running a single case.",
        "Writing cases after the build arrives — you inherit the developer's assumptions instead of challenging them. Instead, draft cases while the requirement is still negotiable.",
        "Leaving environment setup to test day — surprises there eat your execution window. Instead, prepare data, accounts, and devices while cases are being written.",
        "Skipping closure because the next sprint 'is busier' — unharvested lessons repeat as next quarter's defects. Instead, take thirty minutes for metrics and one written lesson.",
        "Treating exit criteria as optional bureaucracy — vague exits make 'done' a mood. Instead, write measurable exits: all planned cases run, critical defects closed, report shared."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep entry and exit criteria visible on the sprint board so the whole team sees the state of testing.",
        "Compress the loop per sprint, but never merge requirement analysis into execution — the thinking stages stay sacred.",
        "Version your test plan and cases with the feature so closure archives something meaningful.",
        "Track one small metric per stage — questions raised in analysis, defects per build — and watch the trend, not the single number.",
        "Reuse a checklist per stage; the loop repeats, so the checklist compounds."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Six stages: analysis, planning, cases, environment, execution, closure.",
        "Entry and exit criteria turn testing from a mood into an auditable process.",
        "In Agile the same loop runs inside every sprint, just smaller.",
        "Execution is one stage of six — the other five decide its quality."
      ] },
      { type: "quote", text: "Interview tip: walk the six STLC stages in order and attach one entry and one exit criterion to each — it is the fastest way to sound like a working tester, not a textbook." }
    ]
  }
];
