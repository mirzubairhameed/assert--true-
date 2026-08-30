import type { Post } from "../post-types";

export const FUNDAMENTALS_B: Post[] = [
  {
    id: "verification-vs-validation",
    num: "006",
    title: "Verification vs Validation: Right Build vs Right Product",
    dek: "Verification checks the recipe; validation tastes the dish. One reviews documents without running code, the other tests the real app — see both on a checkout that must show GST.",
    date: "2026-04-09",
    read: "4 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["verification", "validation", "qa-basics"],
    status: "green",
    body: [
      { type: "p", text: "Is checking that the chef followed the recipe the same as tasting the dish? Both are quality work, and they catch completely different failures — a wrong step in the method versus a dish nobody enjoys. Software borrows this split with two words every interviewer loves: verification and validation." },
      { type: "p", text: "Verification asks 'are we building it right?' — comparing each work product against its specification through reviews, walkthroughs, and inspections, without running the application. Validation asks 'are we building the right thing?' — exercising the real product to confirm it serves a real need. In the restaurant, verification is a senior chef reading the recipe card and checking the prep against it; validation is tasting the finished dish, and asking whether anyone even wanted it on the menu." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Documents breed defects faster than code does, and verification is the only filter cheap enough to catch them minutes after birth — a wrong sentence fixed in a review costs almost nothing. But verification alone can ratify a precise, polished, wrong document: a team can build the wrong product perfectly. Validation alone is not enough either, because it starts late and tests whatever was built. The two together are the check: verify the steps match the plan, then validate that the plan matches reality." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "The requirement says the payment screen must show GST (the goods and services tax added to orders in some regions) as a separate 18% line. Follow that one rule through both words:" },
      { type: "ul", items: [
        "Verification, no code run: a reviewer reads the requirement and challenges it — is 18% the current rate for this region, and does the rule apply to gift-card orders? The ambiguities are fixed in the document that afternoon.",
        "Verification: a walkthrough with the business analyst confirms the tax rule and that the emailed invoice must carry the same line.",
        "Verification: a design review confirms the invoice service can output a separate tax field, so the plan is actually buildable.",
        "Validation, code running: on the real app, add a dish to the cart, pay, and check the payment screen shows GST 18% as its own line with the total matching.",
        "Validation: open the emailed invoice and confirm the same line appears there with the same amount.",
        "Validation: test the edges — a tax-exempt order hides the line, and a cancelled order never charges the tax at all."
      ] },
      { type: "p", text: "Notice the difference in evidence. Verification argued with words: the document, the meeting, the design. Validation argued with the running application and real numbers. If the document had been wrong, validation would still have caught it — weeks later and far more expensively." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Calling all testing verification — if the application is running, you are validating. Instead, reserve verification for reviews of documents, designs, and code that is not executed.",
        "Skipping document reviews because 'the build will show it' — the build shows it late and at full price. Instead, spend the review hour; it is the cheapest defect filter you own.",
        "Validating only against the document — a signed-off but wrong document still produces a wrong verdict. Instead, anchor validation in the user's real need first, then check the document.",
        "Treating approved specifications as unquestionable — approval means reviewed, not flawless. Instead, verify with the same skepticism you bring to code."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Plan both calendars: reviews for documents and tests for builds, so neither crowds out the other.",
        "Bring test conditions to requirement reviews — reading with test questions in mind finds different gaps.",
        "Keep a verification log of what was reviewed, by whom, and what changed; it becomes evidence during audits.",
        "When validation fails, trace back to the document — every validation defect is also a verification defect somewhere.",
        "Use the two-question phrasing in tickets and reports so the whole team shares the vocabulary."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Verification: are we building it right? No code required.",
        "Validation: are we building the right thing? Real app, real data.",
        "Recipe reviews catch wrong steps early; tasting catches wrong dishes late.",
        "A defect-free build of the wrong requirement is still a failure."
      ] },
      { type: "quote", text: "Interview tip: answer with the two questions — verification asks 'are we building it right?', validation asks 'are we building the right thing?' — then land the recipe-versus-tasting analogy." }
    ]
  },
  {
    id: "levels-of-testing",
    num: "007",
    title: "The Four Levels of Testing: Unit, Integration, System, UAT",
    dek: "Unit tests check a discount function, integration tests check the cart against the pricing service, system tests check the full order, and UAT checks that the owner approves payouts.",
    date: "2026-04-10",
    read: "4 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["test-levels", "unit-testing", "uat", "qa-basics"],
    status: "green",
    body: [
      { type: "p", text: "Four levels stand between a line of code and a customer's dinner. Each level widens the lens: one function, then a conversation between services, then the whole application, then a real user's judgment. Interviewers ask about the levels constantly, because they explain who tests what, when, and where a failure points." },
      { type: "p", text: "The four classic levels are unit, integration, system, and user acceptance testing (UAT). In the kitchen: taste a single ingredient, taste the combined sauce, serve the full plated dish to a stranger, and finally have the owner sign off before the item is printed on the menu. Each level answers a question the previous one cannot." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Levels localize blame. A failing unit test points at a function; a failing integration test points at the contract between two components; a failing system test points at configuration or flow; a UAT failure points at a misunderstanding of the business itself. Without the levels, every bug is 'somewhere', and somewhere takes a week to search." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The food-delivery app, level by level — who writes it, what it checks, and a concrete example:" },
      { type: "ul", items: [
        "Unit — written by developers as they code, with frameworks like Jest or JUnit. Checks the smallest piece in isolation, with fake inputs standing in for the outside world. Example: the discount function takes a cart total of 500 and coupon FEST20 and must return exactly 400 — proven in milliseconds, thousands of times a day.",
        "Integration — written by developers and testers together. Checks that separate modules speak the same language across their interface. Example: the cart sends its items to the pricing service and the displayed total matches the pricing response, coupon included, with no hidden rounding.",
        "System — led by the QA team on the fully assembled application in a production-like environment. Checks complete flows end to end. Example: search a dish, add it to the cart, apply the coupon, pay by card, watch the order status move to 'preparing', and receive the confirmation email.",
        "UAT — performed by real users, the client, or the product owner in a production-like environment, using their own business scenarios. Checks the business need, not the code. Example: a restaurant owner logs into the partner portal and approves that the week's payouts match their bank deposits before the feature ships to every city."
      ] },
      { type: "p", text: "The levels also form a shape worth knowing: many small unit tests, fewer integration tests, fewer system tests, one focused acceptance pass. Teams that invert this — a mountain of slow end-to-end tests and no units — pay for it in flakiness and slow feedback. When you join a team, ask which levels exist and who owns each; the answer tells you where defects are being caught today, and where they are not." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Treating UAT as free QA — acceptance testing checks business fit, not defect density. Instead, hand UAT a stable build, a list of business scenarios, and a named sign-off owner.",
        "Skipping integration because 'the units pass' — units prove parts work alone, not together. Instead, test every real interface: cart to pricing, app to payments, order to notifications.",
        "Covering everything with end-to-end tests — they are slow and brittle at volume. Instead, push checks down the levels and save system tests for the critical flows.",
        "Assuming unit tests make QA redundant — units cannot see a misread requirement. Instead, spend your hours on system-level behavior and business rules.",
        "Running UAT against the production database 'to be realistic' — real data means real emails to real customers. Instead, build a production-like environment with masked data."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Name an owner per level and make the handoffs explicit: units green before merge, integration green before QA, system green before UAT.",
        "Write UAT scenarios with the business, in their language, before the build is ready.",
        "Track defects by level for one month — the distribution shows which level is underfed.",
        "Keep unit tests fast enough to run on every commit; a slow unit suite quietly stops being run.",
        "When a defect escapes, ask which level should have caught it, then feed the answer back into that level."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Unit, integration, system, UAT — each level widens the lens and localizes blame.",
        "Developers own units, QA owns system, the business owns acceptance.",
        "The healthy shape is many units, fewer integration tests, fewer system tests, one acceptance pass.",
        "Every escaped defect is a level that needed more support."
      ] },
      { type: "quote", text: "Interview tip: recite the four levels with one example each — the food-app answer (discount function, cart versus pricing service, full order flow, payout sign-off) lands better than textbook definitions." }
    ]
  },
  {
    id: "functional-vs-non-functional",
    num: "008",
    title: "Functional vs Non-Functional Testing: What Is the Difference?",
    dek: "Functional testing asks whether checkout applies the coupon; non-functional asks whether it does that in under 2 seconds for 10,000 users on a slow phone. You need both.",
    date: "2026-04-11",
    read: "4 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["non-functional", "performance", "usability", "qa-basics"],
    status: "green",
    body: [
      { type: "p", text: "The checkout demo was flawless. The order processed, the receipt appeared, the room clapped. Eleven days later the launch stalled — not because checkout was wrong, but because it took 14 seconds on a mid-range phone over a weak network, and a wave of first-time users abandoned their carts. The feature worked. The product did not." },
      { type: "p", text: "Functional testing asks what the system does: does search return matching dishes, does the coupon cap correctly, does login reject a wrong one-time password (OTP). Non-functional testing asks how well it does those things: how fast, how stable, how safe, how pleasant, and on which devices. In the kitchen: functional is whether the plate matches the order at all; non-functional is whether it arrives hot, within 20 minutes, tasting the same as last week." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "The classic line makes the difference vivid: 'works' versus 'works well for 10,000 users on a slow phone.' Users rarely report non-functional failures as bugs — they just leave, quietly, for a faster competitor. And because qualities like speed and security live in the architecture rather than in one button, they are expensive to bolt on late. That is why performance and security questions belong in refinement, not in a post-launch retrospective." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Functional checks first, for contrast — each has a right answer:" },
      { type: "ul", items: [
        "Search returns dishes matching the query 'biryani', including the misspelling 'biriyani'.",
        "Coupon SAVE50 caps the discount at 200 even when 50% of a 600 total would give more.",
        "Login rejects a wrong OTP with 'Incorrect OTP. 2 attempts left' and locks the account after the fifth failure.",
        "A cancelled order changes status to 'cancelled' and never charges the card."
      ] },
      { type: "p", text: "Then the non-functional family — each is a measurable degree, not a yes or no:" },
      { type: "ul", items: [
        "Performance — checkout completes in under 2 seconds at the 95th percentile (the level 95% of users experience) with 5,000 concurrent users.",
        "Usability — a first-time user places an order in three taps with no instructions, and every error message names the fix.",
        "Security — passwords are stored hashed, the payment page enforces HTTPS, and an OTP expires after five minutes.",
        "Reliability — an order still goes through when the recommendation service is down, and a dropped network never empties the cart.",
        "Compatibility — the same flow works on Chrome and Safari, on a mid-range Android and a small screen, with the keyboard open."
      ] },
      { type: "p", text: "Write non-functional expectations as numbers wherever you can. 'Fast' cannot fail a test; 'under 2 seconds at the 95th percentile' can. Numbers turn opinions into exit criteria that a release decision can lean on." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Scheduling non-functional testing for 'later' — later means after the architecture is frozen. Instead, raise load and security questions while designs are still cheap to change.",
        "Testing performance only on a flagship device — your best phone lies to you. Instead, keep one mid-range, two-year-old device in the test kit.",
        "Accepting 'fast' or 'user-friendly' as criteria — unmeasurable words pass everything. Instead, convert them to numbers with the team: seconds, percentiles, user counts.",
        "Assuming performance is the developers' problem alone — testers are the ones who surface what users feel. Instead, own the measurements and the reports.",
        "Confusing reliability with functionality — a feature that works but dies whenever a neighboring service hiccups is unreliable. Instead, test with dependencies deliberately broken."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Add at least one measurable non-functional criterion to every feature's acceptance list.",
        "Profile one real user journey per release on a slow device with a throttled network.",
        "Keep a small compatibility matrix — two browsers, two device tiers, one small screen — and run the happy path on it weekly.",
        "Agree on performance targets with developers early; a percentile report is only useful if the team knows the target.",
        "Read abandoned sessions and support tickets as non-functional evidence; users vote with exits, not bug reports."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Functional = what it does; non-functional = how well it does it.",
        "'Works' is functional; 'works for 10,000 users on a slow phone' is non-functional.",
        "Non-functional qualities are designed early and bolted on never.",
        "Write them as numbers, or they cannot fail."
      ] },
      { type: "quote", text: "Interview tip: 'login works' is functional, 'login responds in under a second under 5,000 concurrent users' is non-functional — one sentence, and the difference is yours." }
    ]
  },
  {
    id: "test-scenario-vs-test-case",
    num: "009",
    title: "Test Scenarios vs Test Cases vs Test Conditions",
    dek: "A test condition is one rule, a test scenario is a user-sized situation, and a test case is the turn-by-turn script. See all three on one login page.",
    date: "2026-04-13",
    read: "4 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["test-cases", "test-scenarios", "test-design"],
    status: "green",
    body: [
      { type: "p", text: "The fastest way to look busy while testing nothing is to write 180 test cases with no scenarios behind them. In a coverage review, a project manager asks what has been tested; one tester answers with a spreadsheet of case IDs and eyes glaze over, while another answers with twelve situations a user can be in and gets a nod. Same effort, two vocabularies — and only one of them communicates." },
      { type: "p", text: "QA writes at three heights. A test condition is a single rule that must hold: 'the password must be at least 8 characters.' A test scenario is a high-level, user-sized situation: 'verify a registered user can log in with valid credentials.' A test case is the turn-by-turn script under a scenario — numbered steps, exact data, and one exact expected result. Read the ladder top-down and it goes from vague to precise; each rung has its own audience." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Confusing the levels fails in two opposite directions. Present cases to executives and you bury them in detail; execute from scenarios alone and two testers will test two different things. The ladder also protects coverage: every condition should hang under some scenario, and every scenario worth shipping should have at least one case. When something is untested, the ladder shows exactly which rung is missing." },
      { type: "h", text: "In practice" },
      { type: "p", text: "One login page, at all three heights:" },
      { type: "ul", items: [
        "Condition — 'the password must be at least 8 characters' (and two more: a locked account stays locked for 30 minutes; the error message must not reveal whether the email or the password was wrong). One line each — a feature has dozens.",
        "Scenario — 'verify a registered user can log in with valid credentials' (and: 'verify login is blocked after five failed attempts'). One line each, readable by anyone in the company.",
        "Case — under the first scenario: open the app and tap 'Login'; enter the registered email qa@example.com; enter the correct password Passw0rd!; tap 'Sign in'. Expected: the dashboard loads within 2 seconds and the greeting shows the user's first name."
      ] },
      { type: "p", text: "Each rung earns its keep at a different moment:" },
      { type: "ul", items: [
        "Scenarios for coverage conversations — twelve lines let a project manager or client see and challenge the plan before a single case is written.",
        "Cases for execution — steps and data make the run repeatable and handoff-safe, so any tester, including someone on their first week, gets the same result.",
        "Conditions for traceability — mapping every rule to the scenario that covers it means nothing slips through with 'nobody wrote a test for that rule'.",
        "The whole ladder for interviews — 'here are my scenarios; let me expand one into a full case' is a structured answer that stands out."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Writing cases with no scenario behind them — you get random coverage that only looks organized. Instead, group cases under named scenarios so gaps are visible.",
        "Quoting case counts as coverage — 300 cases can all live under three scenarios. Instead, report scenario coverage and flag conditions with no case.",
        "Keeping one case per scenario forever — the happy path is a minority of reality. Instead, add negative, boundary, and interruption cases under each scenario.",
        "Writing vague steps like 'test the login' — two testers, two results. Instead, use numbered steps with exact data and one exact expected result.",
        "Presenting the full case suite to stakeholders — detail buries decisions. Instead, carry scenarios into meetings and keep cases in the tracker."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Draft scenarios during requirement analysis, then expand the risky ones into cases first.",
        "Give each case one expected result; a case that can half-pass is really two cases.",
        "Keep condition-to-case traceability in a simple spreadsheet or the requirements tool, and update it in the same sitting.",
        "Review scenarios with the project manager before case writing — it is the cheapest feedback you will ever get.",
        "Retire duplicate cases under the same scenario so the suite stays fast and readable."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Condition = one rule; scenario = one user-sized situation; case = steps, data, expected result.",
        "Scenarios talk to people; cases talk to testers.",
        "Every condition needs a home under a scenario; every shipped scenario needs a case.",
        "Coverage conversations run on scenarios, not case counts."
      ] },
      { type: "quote", text: "Interview tip: asked for test cases for a login page, give three scenarios first, then expand one into steps with exact data — the two-level answer shows the structure the question is fishing for." }
    ]
  },
  {
    id: "test-plan-guide",
    num: "010",
    title: "The Test Plan: How to Read (and Write) One That Gets Used",
    dek: "A test plan is a team agreement, not a filing cabinet: scope, approach, schedule, environments, risks, criteria, and roles — plus the habit that keeps it alive past sprint one.",
    date: "2026-04-15",
    read: "5 min",
    category: "Fundamentals",
    difficulty: "beginner",
    tags: ["test-plan", "test-planning", "process"],
    status: "green",
    body: [
      { type: "p", text: "Most test plans are written once, approved by email, and never opened again. Ask the authors a month later what the exit criteria were and you get shrugs. The document did not fail; the habit did. A plan earns its keep only if it answers this week's questions: what are we testing, how, when, where, and what could sink us." },
      { type: "p", text: "A test plan is the team's written agreement about how testing will run — plain words, no ceremony. Think trip itinerary: the destination (scope), the route (approach), the dates (schedule), the vehicle and the weather (environments and risks), and who drives (roles). A good test of the document: a stranger on the team could read your plan and start testing correctly on Monday." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without a living plan, three things happen at once: new testers discover scope by accident, releases ship with untested areas nobody owned, and estimates swing wildly because the effort was never written down. With one, arguments like 'did we agree to test mobile?' end in a link. The plan is also where you negotiate honestly — saying 'with one tester, this scope needs two weeks' beats silently skipping the riskiest module." },
      { type: "h", text: "In practice" },
      { type: "p", text: "What goes inside, in plain words:" },
      { type: "ul", items: [
        "Scope — what is in and what is out, named precisely: 'web checkout and the order APIs are ours; the native apps are another team's plan.'",
        "Approach — how you will test: 'manual exploratory for new flows, scripted cases for money paths, automated reruns of older tests for the rest.'",
        "Schedule — when, tied to real milestones: 'case writing in sprint 4, execution in sprints 5-6, user acceptance support in the release week.'",
        "Environments — where: 'staging with seeded data, Chrome and Safari, one mid-range Android and one iPhone, plus a shared payment sandbox.'",
        "Risks — what could sink testing and the answer: 'the payment sandbox is shared and flaky, so daily slots are booked; one tester is on leave in week 3, so a contractor is arranged.'",
        "Entry and exit criteria — when testing may start ('a new build passes smoke on staging — the quick is-it-stable check') and when it may stop ('all planned cases run, no open critical defects, known-risk list signed off').",
        "Roles — who owns what: 'Priya writes cases for the cart, Arun for payments, the lead owns the release report.'"
      ] },
      { type: "p", text: "Beginners expect a template with twelve sections and a cover page. Use this skeleton instead — one page, and people actually read it:" },
      { type: "ul", items: [
        "Feature or release name and version under test.",
        "Scope in, scope out — two short lists.",
        "Approach: what is manual, what is automated, what is exploratory.",
        "Schedule with dates tied to build and release milestones.",
        "Environments and devices, including accounts and test data.",
        "Entry and exit criteria, one line each.",
        "Risks, each with an owner and a mitigation.",
        "Sign-off names: who agrees this plan is good enough."
      ] },
      { type: "p", text: "Keeping the plan alive is a habit, not a document feature: cap it at five pages, link to Jira tickets (the team's work items) instead of pasting status, review it at every sprint boundary, and delete sections that stopped being true. A plan that changes weekly is working; a plan frozen since kickoff is a museum piece." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Writing forty pages nobody reads — length is not rigor. Instead, cap it at five pages and let details live in linked tickets.",
        "Copying last release's plan and renaming the date — stale scope and old risks leak through. Instead, start from the skeleton and answer every line for this release.",
        "Pasting status updates into the document — it is stale the moment you save. Instead, link live tickets and dashboards.",
        "Treating exit criteria as decoration — without them, 'done' gets negotiated under deadline pressure. Instead, write measurable exits before execution starts.",
        "Hiding risks to sound confident — unwritten risks still happen, just unprepared. Instead, name each one with an owner and a mitigation."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Write the plan with the team, not alone — an unapproved plan is a private diary.",
        "Review and re-approve at every sprint boundary; fifteen minutes keeps it truthful.",
        "Keep the skeleton headings stable so readers always know where to look.",
        "Tie every schedule line to a real ticket or milestone; if nothing links to it, the line is fiction.",
        "After release, spend ten minutes noting which predictions were wrong; the next plan gets sharper."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A test plan is a team agreement: scope, approach, schedule, environments, risks, criteria, roles.",
        "Five living pages beat forty archived ones.",
        "Link tickets, review at sprint boundaries, delete what stopped being true.",
        "If a stranger could start testing from your plan on Monday, it works."
      ] },
      { type: "quote", text: "Interview tip: asked to write a test plan, sketch the eight skeleton headings on the whiteboard in two minutes — interviewers grade structure and honesty about risks, not formatting." }
    ]
  }
];
