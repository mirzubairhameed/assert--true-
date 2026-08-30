import type { Post } from "../post-types";

export const CAREER: Post[] = [
  {
    id: "qa-career-roadmap",
    num: "094",
    title: "The QA Career Roadmap: Zero to First Job",
    dek: "A week-by-week route from zero to hired: manual foundations, Jira and Postman, Playwright, a three-project portfolio, and an honest paragraph about ISTQB.",
    date: "2026-08-19",
    read: "5 min",
    category: "Career",
    difficulty: "beginner",
    tags: ["career", "roadmap", "learning-plan", "istqb"],
    status: "green",
    body: [
      { type: "p", text: "It is March, and Priya refreshes a job board for the third time tonight, reading 'QA Engineer, 0-2 years' posts that all mention automation experience and API testing. She has tested nothing but her own patience so far. The gap between her resume and those listings is real, but it is smaller than it looks — and it can be crossed on a schedule instead of by luck." },
      { type: "p", text: "Getting hired in QA is a sequence, not a leap. First you learn to think in test cases and bug reports, because that is the daily work. Then you add tools: Jira for tracking, Postman for APIs, basic SQL for checking data. Then automation with Playwright or Cypress plus Git, then a three-project portfolio that proves it, then applications that point at the portfolio. Each stage feeds the next, and skipping one shows up in interviews." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without a sequence, beginners do the fun part first — install Playwright, record a test, get stuck when it fails — and quit by week three. Hiring managers also probe the layers in order: expect manual questions even in interviews for automation roles. A written plan protects your calendar, too. Ninety focused evenings with a schedule beat two years of random tutorials." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is a 90-day plan for roughly ten hours a week — evenings and one weekend morning. Adjust the pace, keep the order:" },
      { type: "ul", items: [
        "Weeks 1-2 — Manual foundations. Learn what testing is and the seven principles; write 20 test cases by hand for a login and a signup form; be able to draw the software development life cycle and its testing twin, the STLC, from memory.",
        "Weeks 3-4 — Bug reporting. Learn the bug life cycle, then file practice reports against public demo sites with title, steps, evidence, and severity; move three bugs through Jira's free tier from New to Closed yourself.",
        "Weeks 5-6 — Technique. Apply equivalence partitioning and boundary value analysis to an age field and a password field; run two 60-minute exploratory charters on a demo shop and write the debrief.",
        "Weeks 7-8 — APIs and SQL. Send your first requests in Postman against a practice API and learn GET vs POST; write SELECT queries with WHERE and ORDER BY on a sample database.",
        "Weeks 9-11 — Automation. Pick Playwright and automate the login and search flows you already tested by hand; learn Git alongside it — clone, branch, commit, push, open a pull request.",
        "Weeks 12-13 — Portfolio and applications. Polish three projects: a manual suite document, a Postman collection, and the Playwright suite in a public repo with a README; send the first ten tailored applications."
      ] },
      { type: "p", text: "A word on ISTQB, because someone will insist it is mandatory. The ISTQB Foundation Level is the standard software testing certification; its syllabus teaches shared vocabulary — test basis, test oracle, exit criteria — and it passes an HR filter in some markets, notably India and enterprise hiring in Europe. Startups rarely ask for it. Treat it as an optional add-on around week 6 if your target ads mention it, but never as a substitute for practice: no interviewer has ever hired a candidate for defining 'test oracle' instead of testing something." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Starting with automation — this hides weak fundamentals and ends in a recorded test you cannot debug. Instead, earn the manual layer first; automation is that layer made fast.",
        "Living in tutorial videos — this hides the absence of any artifact after months of watching. Instead, follow a 70/30 split: 70 percent doing, 30 percent watching.",
        "Collecting certificates instead of projects — this hides the fact that a repo argues better than a badge. Instead, build the three projects before paying for any exam.",
        "Applying only to ads that say 'no experience required' — this hides most real openings, because junior ads rarely say it. Instead, apply to every 0-2 years posting and let the portfolio speak.",
        "Practicing only on apps you invented — this hides the mess of real software. Instead, test public demo shops and APIs where actual edge cases live.",
        "Keeping work private — this hides your progress from the people who would hire you. Instead, push everything to GitHub from week 9 onward."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Put the plan on the calendar with fixed hours; a schedule you can see is the one you keep.",
        "Join one testing community and answer one beginner question a week; explaining is the fastest way to keep knowledge.",
        "Track artifacts, not hours — cases written, bugs filed, tests automated — and review the list every Sunday.",
        "Ask three working testers for 15-minute chats; one referral is worth fifty cold applications.",
        "Rehearse talking about your work out loud; interviews are spoken, and fluency is a skill."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Sequence beats talent: manual foundations, tools, automation, portfolio, applications.",
        "Three finished projects outweigh any certificate on a junior resume.",
        "ISTQB buys vocabulary and an HR filter in some markets; it never replaces practice.",
        "Ninety structured days is enough to become a credible junior candidate."
      ] },
      { type: "quote", text: "Interview tip: when you get 'tell me about yourself', walk the order you learned in — what you can test manually, the tools you use, what you have automated — and stop after the portfolio." }
    ]
  },
  {
    id: "qa-resume-and-portfolio",
    num: "095",
    title: "Building a QA Resume and Portfolio That Gets Calls",
    dek: "One page, real impact numbers, and proof you can test: build the resume and the GitHub portfolio that make recruiters actually call you back.",
    date: "2026-08-20",
    read: "5 min",
    category: "Career",
    difficulty: "beginner",
    tags: ["career", "resume", "portfolio", "github"],
    status: "green",
    body: [
      { type: "p", text: "Seven seconds. That is roughly what a recruiter spends on your resume before deciding keep or pass, and in that window she is asking three questions: can this person test, can they prove it, and can I forward this without embarrassment. Every choice below exists to win those seven seconds — and then the click that follows." },
      { type: "p", text: "Think of the resume and the portfolio as a shop window and the shop. The resume gets the glance; the portfolio — a public GitHub profile holding real testing artifacts — is what serious readers walk into. Certificates belong in the window too, but they are the mannequins. The merchandise is a test suite, bug reports, and a collection someone can actually run." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Junior QA postings draw hundreds of applications, and most are skill lists without evidence. A row reading 'Playwright, Postman, SQL, Jira' tells the reader nothing about whether you can find or describe a bug. One sentence with a number does more than a page of tools: 'Cut checkout regression time from 4 hours to 25 minutes by prioritizing the 40 cases that cover paid flows.' Proof beats vocabulary every time." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "The resume stays one page: a two-line summary, experience with impact numbers, a skills row naming only tools you can be grilled on, and the GitHub link at the top next to your email. The portfolio is the stronger half for a junior. A complete one contains this checklist:" },
      { type: "ul", items: [
        "A public repo, for example qa-playwright-suite, holding a Playwright suite against SauceDemo — the demo shop built for exactly this practice — with one behavior per test.",
        "A README at the top of that repo: what the suite covers, how to install and run it in two commands, and what a failure report looks like.",
        "Three bug reports written properly — exact title, environment, steps, expected vs actual, severity — saved as markdown files in a bugs folder, from defects you actually found.",
        "A Postman collection for a public API with at least ten requests including negative cases, exported into the repo.",
        "A SQL file with five queries you ran against a sample database, each with a one-line comment naming what it verifies.",
        "A GitHub profile worth clicking: real name, a one-line bio such as 'QA engineer — manual plus Playwright', and only finished repos pinned."
      ] },
      { type: "p", text: "The GitHub link matters more than candidates believe, because recruiters genuinely click it. A profile with one abandoned repo from 2023 reads worse than no link at all, so finish and pin before the first application goes out. Then hold the resume to the same standard: every tool named must be one you can demonstrate on a screen share." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Test a demo shop manually for two evenings and keep notes on everything odd.",
        "Automate five to eight of those flows in Playwright, one behavior per test.",
        "Turn your three best findings into formal bug reports as markdown files.",
        "Export the Postman collection and write the SQL file into the same repo.",
        "Write the README last, as if the reader is a busy hiring manager.",
        "Tailor the resume to each posting: mirror its exact tools and phrases.",
        "Have one working tester review the resume and the repo before you apply."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Two-page resumes — this hides the numbers that matter below the fold. Instead, cut to one page; nothing a junior needs gets lost in the cut.",
        "Skill lists without context — 'Postman, SQL, Jira' proves access, not ability. Instead, name each tool inside a sentence about what you did with it.",
        "Claiming expertise after a weekend tutorial — this hides nothing; one follow-up question exposes it. Instead, claim only what you can demonstrate live.",
        "A portfolio of cloned course repos — this hides the absence of your own decisions. Instead, add a paragraph to each README about choices you made and bugs you found.",
        "One generic resume for every application — this hides you from filters tuned to each posting. Instead, spend ten minutes retitling and reordering per job.",
        "Decorating with certificates only — this hides the lack of artifacts. Instead, let the repo carry the proof and give the certificate a single line."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Quantify everything you can: time saved, bugs found per release, cases written, coverage added.",
        "Use the ad's exact phrases — 'regression testing', 'REST API', 'test cases' — so both the resume filter and the human can match you to the role.",
        "Commit to the portfolio monthly; a living repo reads as a living tester.",
        "Link to the specific repo, not just the profile; recruiters follow one click, not three.",
        "Get the resume reviewed by someone who hires, and fix what they circle first."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "One page, impact numbers, tools in context.",
        "The portfolio is the proof; the resume is the pointer.",
        "Recruiters click GitHub links, so the profile and README must earn the visit.",
        "Tailored keywords beat generic resumes every single time."
      ] },
      { type: "quote", text: "Interview tip: 'Walk me through your portfolio' really means 'prove you did this yourself.' Open with the bug you found, not with the tools you installed." }
    ]
  },
  {
    id: "manual-testing-interview-questions",
    num: "096",
    title: "Manual Testing Interview Questions, With Strong Answers",
    dek: "Twelve manual testing interview questions with model answers that sound like a tester, not a textbook — severity pairs, smoke vs sanity, and when to stop testing.",
    date: "2026-08-21",
    read: "5 min",
    category: "Career",
    difficulty: "beginner",
    tags: ["interview-prep", "manual-testing", "career"],
    status: "green",
    body: [
      { type: "p", text: "'What is software testing?' Simple — until you are three minutes into an interview, mid-answer, and you have drifted into a fog of 'ensuring quality' that means nothing to anyone. The manual testing interview is won and lost on a dozen questions exactly this size, each answered in one or two clean sentences." },
      { type: "p", text: "Interviewers are not grading memory; they are grading whether you sound like someone who has tested things. Reciting a textbook actually hurts, because working testers compress definitions and attach an example. Copy that pattern: definition in one sentence, example in the next, stop talking." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "These questions gate everything else. Fumble 'severity vs priority' and the rest of the hour turns into damage control, with the interviewer quietly checking whether you were bluffing. Strong short answers buy the opposite: trust. Trust earns harder, more interesting questions — which is where you get to look good." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Twelve questions that appear again and again, with answers shaped the way working testers give them:" },
      { type: "ul", items: [
        "What is software testing? — Checking a product against what it should do and hunting for where it does not, using the inputs real users bring. It is information for a release decision, not just clicking around.",
        "How is STLC different from SDLC? — The SDLC is the product's whole journey from idea to release; the STLC is the testing thread inside it, running requirement analysis through test closure. One builds the thing, the other checks it.",
        "Severity vs priority, with an example pair? — Severity is how badly the product is hurt; priority is how fast the business wants it fixed. A crashed checkout is high on both; a misspelled executive name in the footer is low severity, high priority.",
        "Smoke vs sanity? — Smoke is a shallow pass over critical paths to decide whether a build is worth testing at all; sanity is a narrow check of one area after a small change. Smoke asks 'is this build alive?'; sanity asks 'is this fix clean?'",
        "Regression vs retesting? — Retesting confirms the exact bug you filed is fixed; regression checks that the fix, or anything else shipped, broke nothing nearby. Retest the ticket first, then run the pack around it.",
        "Test scenario vs test case? — A scenario names what to test at feature level, like 'verify password reset'; a case is one exact path with steps and an expected result, like 'reset with a valid email, expect the success screen'.",
        "What are the bug life cycle states? — New, assigned, open or in progress, fixed, retest, verified or reopened, closed, with rejected, duplicate, and deferred as side exits. Knowing that reopened means your retest failed is what they listen for.",
        "What goes into a test plan? — Scope, approach, schedule, environments, entry and exit criteria, roles, and risks. Day to day you will live in its schedule and its exit criteria, so know both cold.",
        "Boundary value analysis, with an example? — Bugs cluster at edges, so test the edges: for an age field accepting 18 to 60, run 17, 18, 19, 59, 60, and 61 and skip the middle entirely.",
        "Equivalence partitioning, with an example? — Split inputs into groups that should behave alike and test one from each: for that same age field, under 18, 18 to 60, over 60, and garbage like 'abc'.",
        "When do you stop testing? — When the exit criteria are met: planned cases run, serious bugs fixed and verified, remaining risks accepted and documented. Exhaustive testing is impossible, so stopping is a risk decision, not a fatigue one.",
        "A developer rejects your bug as 'not reproducible' — what now? — Return with evidence: exact build and environment, precise steps, a video or logs, and a failure rate like '3 of 10 attempts'. If it still will not repeat, propose deferring with the notes attached rather than dropping it."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Reciting textbook definitions word for word — this hides whether you understand anything. Instead, compress to one sentence and attach an example you actually ran.",
        "Mixing up the classic pairs under pressure — smoke with sanity, severity with priority — this hides your preparation. Instead, drill each pair as a contrast until the difference is automatic.",
        "Answering 'when do you stop testing' with 'when time runs out' — this hides how releases actually work. Instead, name exit criteria and accepted risk.",
        "Getting defensive about a rejected bug — this hides the collaboration they are really probing. Instead, tell the evidence-first story; the question is about temperament, not process.",
        "Rambling past the point — this hides the sharp sentence you already said. Instead, finish, pause, and let them pull the next question from you."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Rehearse out loud, not in your head; your mouth needs the reps more than your eyes.",
        "Anchor every abstract answer to something you tested, even a practice demo shop.",
        "Prepare one small story for each classic pair from your own testing notes.",
        "Pausing two seconds to think is allowed and reads as careful, not slow.",
        "Bring your own questions about their release cadence and regression pack; interviews are two-way."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Definition in one sentence, example in the next, then stop.",
        "Own the three classic pairs; they appear in almost every manual round.",
        "Never claim perfect testing is possible; speak in exit criteria and risk.",
        "Rejected-bug questions grade temperament, so answer with evidence, never ego."
      ] },
      { type: "quote", text: "Interview tip: the strongest answer in a manual testing interview is short, carries an example, and stops. Silence after a good answer is a feature, not a gap." }
    ]
  },
  {
    id: "api-sql-interview-questions",
    num: "097",
    title: "API and SQL Interview Questions You Will Actually Get",
    dek: "The API and SQL questions interviewers really ask: status codes, headers, one query for duplicate emails, and proving a payment actually saved to the database.",
    date: "2026-08-23",
    read: "5 min",
    category: "Career",
    difficulty: "intermediate",
    tags: ["interview-prep", "api-testing", "sql", "career"],
    status: "green",
    body: [
      { type: "p", text: "On a hiring panel last month, four candidates in a row described exactly how they would test a payment flow in the UI — and not one mentioned the database. The role went to the fifth candidate, who said: 'then I would query the orders table to confirm the row saved.' One sentence, one offer. The questions below decide rounds like that." },
      { type: "p", text: "API and SQL interview questions check whether you understand the system behind the screen. The UI is a shell over endpoints — the URLs an API exposes — and endpoints are shells over tables, where requests carry data formatted as JSON. A tester who can reason at those layers, or at least explain how they would, is more useful from day one than a click-only tester." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Most products are now built API-first: the web app, the mobile app, and partner integrations all hit the same endpoints, so UI-only testing covers one client and misses the rest. SQL matters for the same reason. The database is where the truth about your data lives, and 'the screen said success' is not evidence." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Ten questions that keep coming up, with answers sized for a breath or two:" },
      { type: "ul", items: [
        "What is an API? — A contract that lets one program request something from another without knowing its internals. In testing terms: instead of clicking Pay, you send a POST request with a JSON body and read the response back.",
        "GET vs POST? — GET retrieves data and carries parameters in the URL, so repeating it is harmless; POST sends a body and changes something, so repeating it can create two identical orders. That is why GET should never have side effects.",
        "200 vs 201 vs 204? — 200 is plain success with a body, 201 means a resource was created — expect it from POST /orders — and 204 means success with nothing to return, which you will usually see after a DELETE.",
        "401 vs 403? — 401 means we do not know who you are: missing or expired token. 403 means we know exactly who you are and you still cannot do this. A customer poking an admin endpoint should get the second one.",
        "Which headers would you set when testing an API? — Authorization for the token, Content-Type: application/json on requests with a body, Accept for the response format, plus whatever custom header the API requires, like an idempotency key.",
        "How do you test an endpoint with no UI? — Drive it directly with Postman, curl, or a framework's request client: valid input first, then wrong types, missing fields, expired auth, and an assertion on the status code and body for each case.",
        "How would you find duplicate emails in a users table? — Group the rows by email and keep only the groups with more than one row: SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1; every row it returns is a duplicate.",
        "LEFT JOIN vs INNER JOIN? — INNER JOIN returns only rows that match in both tables; LEFT JOIN keeps every row from the left table and fills the gaps with NULL. Finding users with no orders is a LEFT JOIN plus a check for that NULL.",
        "How would you verify a payment shown in the UI actually saved? — Take the payment or order id from the response or the URL, query the payments table for that id, and check that status, amount, and currency match what the screen claimed. Screens can lie; rows rarely do.",
        "How would you test a login API? — Positive: valid credentials return 200 with a token. Negative: wrong password, unknown user, empty fields, malformed JSON — each with its expected 400 or 401 and a generic message. Edges: expired tokens, a locked account, and whether the error reveals which field was wrong."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Memorizing status codes without a story — this hides the moment they ask 'when would you actually see 201?'. Instead, tie each code to a verb: created from POST, empty after DELETE.",
        "Answering SQL questions with theory — this hides the practical skill they asked about. Instead, say the query out loud; the GROUP BY plus HAVING shape is what earns the nod.",
        "Testing only positive cases on an API — this hides the 400-class behavior where most real defects live. Instead, make negatives at least half of any answer.",
        "Blurring 401 into 403 — this hides a core concept. Instead, use the two-word version: 401 is 'who are you', 403 is 'no'.",
        "Skipping headers entirely — this hides daily API work. Instead, name two or three and say what breaks when they are missing."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Practice against a public API and a sample database until answers come from memory of doing, not memory of reading.",
        "Offer the database check before being asked; it is the sentence that separates candidates in final rounds.",
        "Keep answers to two sentences, then offer to walk through an example — let them choose the depth.",
        "Attach one real tool to each answer: Postman for status codes, a sample database for joins."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "The UI is a shell; endpoints and tables hold the truth.",
        "201 created, 204 empty, 401 unknown caller, 403 known and refused.",
        "GROUP BY plus HAVING COUNT(*) > 1 finds duplicates — asked constantly, so know it cold.",
        "Login APIs have three lanes: positive, negative, and auth edges."
      ] },
      { type: "quote", text: "Interview tip: finish any payment or order answer with 'and I would confirm the row in the database.' It is the most senior-sounding sentence a junior candidate can say." }
    ]
  },
  {
    id: "automation-interview-questions",
    num: "098",
    title: "Automation Interview Questions: Frameworks and Tools",
    dek: "Nine automation interview questions with short, senior-sounding answers: locator strategy, waits, flaky tests, framework layers, and the bug only automation could find.",
    date: "2026-08-25",
    read: "5 min",
    category: "Career",
    difficulty: "intermediate",
    tags: ["interview-prep", "automation", "flaky-tests", "career"],
    status: "green",
    body: [
      { type: "p", text: "The most common mistake in automation interviews is answering 'how do you handle flaky tests?' with 'I add retries.' Every interviewer hears the same confession: tests that lie, and a candidate who makes them lie more quietly. Nine questions like this one decide automation roles, and none of them are about syntax." },
      { type: "p", text: "Automation interviews grade judgment more than tool knowledge. Anyone can write a click in Playwright after a weekend; the conversation is about which checks deserve automating, how you keep a suite trustworthy, and how your framework survives change. Answer from your own projects — practice projects count if you frame them honestly." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Every hiring manager has inherited a haunted suite: flaky tests nobody trusts, sleeps scattered everywhere, locators that break with each redesign. That history is why the questions circle trust rather than code. Talk about quarantine, root causes, and layered design, and you sound like the person who will not build the next haunted suite." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Nine questions worth rehearsing — adapt the details to projects you actually ran:" },
      { type: "ul", items: [
        "Why automate, and when should you not? — Automate repetitive checks that must run every release: regression packs, smoke flows, API contracts. Leave one-off exploratory sessions and fast-changing UI alone; automating chaos just produces faster chaos.",
        "What is your locator strategy? — Start from the accessible layer: roles, labels, and stable test ids, because they survive redesigns. Prefer CSS over XPath when both work, and never trust auto-generated classes or positional nth selectors.",
        "How do waits work? — Never sleep. Modern tools auto-wait until an element is visible, enabled, and stable before acting; add explicit waits only for element-less conditions like a network response or a URL change. Fixed sleeps make suites slow and still flaky.",
        "What are the benefits of the Page Object Model, and its critics? — POM gives each page or component one class that owns its locators and actions, so a UI change is one edit instead of forty. The criticism lands too: over-abstracted page objects become unmaintainable temples, so keep them thin.",
        "How do you handle flaky tests? — Quarantine the test so the suite stays trustworthy, then find the root cause: timing, test data, environment, or a genuine intermittent bug. Fix it or delete it; blind retries teach the suite to lie more quietly.",
        "What is your experience running tests in CI? — CI is continuous integration: the suite runs automatically on a server after every change. My Playwright suite runs in GitHub Actions on each pull request — install, run headless against a test environment, upload traces on failure, block the merge when red.",
        "What does your framework look like? — Layers: specs that read like scenarios, page objects owning locators and actions, a helpers folder for API and data setup, config per environment, and utilities for screenshots and traces. Tests describe behavior; everything reusable lives beneath them.",
        "How do you version-control your tests? — Same discipline as product code: the suite lives in a repo, changes go through branches and small pull requests, commit messages say what changed, and nothing is pushed straight to main on a Friday.",
        "Tell me about a bug you found only through automation. — Bring a real one. Mine was a pagination bug where the last search page dropped one result — a boundary no human would click forty times to reach, but a data-driven loop caught it on the first run."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Quoting tool documentation instead of your own decisions — this hides whether you have run anything. Instead, say 'in my suite I chose...' and welcome the follow-up.",
        "Claiming 100 percent automation — this hides your judgment, since some checks should stay manual. Instead, name what you deliberately left alone and why.",
        "Answering flakiness with retries alone — this hides the root cause and rots trust in the suite. Instead, quarantine, diagnose, then fix or delete.",
        "Describing a framework as 'Selenium with Java' — that lists tools, not design. Instead, walk the layers and say what each one buys.",
        "Never admitting a mistake — this hides the learning interviewers actually hire for. Instead, own a suite you once let get flaky, and what you did about it."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Automate one small suite end to end — login, search, checkout — so every answer has a real project behind it.",
        "Learn one tool deeply rather than three shallowly; depth survives follow-up questions.",
        "Read your own failing-test reports carefully; a debugging story told calmly is interview gold.",
        "Practice drawing your framework on a whiteboard: spec, page object, helper, config — four boxes and arrows."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Automation interviews are trust interviews; the flaky-test answer carries the most weight.",
        "Locators and waits reveal real experience faster than any syntax recital.",
        "Name your layers; a framework is a design decision, not an install.",
        "Have one true 'only automation caught it' story ready to tell."
      ] },
      { type: "quote", text: "Interview tip: 'never sleep, always auto-wait' plus 'quarantine, then root-cause' pre-answers two of the most common questions before the interviewer finishes asking them." }
    ]
  },
  {
    id: "scenario-interview-questions",
    num: "099",
    title: "How Would You Test X? Scenario Questions Decoded",
    dek: "Never freeze on 'How would you test X?' again — one answering framework plus three walkthroughs: a login page, an elevator, and a vending machine.",
    date: "2026-08-26",
    read: "5 min",
    category: "Career",
    difficulty: "beginner",
    tags: ["interview-prep", "test-strategy", "career"],
    status: "green",
    body: [
      { type: "p", text: "'So — how would you test an elevator?' The candidate laughs, lists four things, and runs dry in forty seconds. The interviewer writes nothing down, because there was nothing to write. Ten minutes later a different candidate asks two questions, walks her answer in buckets, and talks about the same elevator for six confident minutes. The difference was never elevator knowledge." },
      { type: "p", text: "Scenario questions are not quizzes with right answers; they are a view into how your mind organizes testing. The trick is a fixed route you walk every time: clarify, happy path, inputs, integrations, non-functional, automation advice. Structure is the answer — the specific examples are decoration on top. You are being graded on method, not memory." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Interviewers use 'test X' questions because real work hands you features with thin requirements and expects order, not panic. A tester who free-associates looks risky; a tester with a route sounds senior on day one. The same route also works on the actual job, which is exactly why the question exists at every level." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is the route, as buckets to say out loud in order:" },
      { type: "ul", items: [
        "Clarify first: who uses this, what 'working' means, which platforms, what the top risks are. Two good questions often score more than ten good cases.",
        "Happy path: one clean run of the main flow before you break anything.",
        "Inputs: valid, invalid, empty, boundary, and weird — pasted text, emoji, rapid double clicks.",
        "Integrations: what it talks to — the APIs behind the feature, what the database should contain afterwards, which other screens are affected.",
        "Non-functional: performance under load, permission checks, other languages and locales, accessibility with a keyboard and a screen reader.",
        "Close with automation advice: which of these become regression candidates, and what you would leave manual."
      ] },
      { type: "p", text: "Now the route on three classics — notice they are the same question wearing different costumes:" },
      { type: "ul", items: [
        "Test a login page — Clarify: password login, single sign-on, or both, and is there a lockout policy? Happy path with a registered user. Inputs: wrong password, empty fields, a 300-character paste, boundaries on any length rules. Integrations: does the session token arrive, does the last-login column update. Non-functional: five wrong passwords should lock or throttle, the error must not reveal which field was wrong, and the form must work by keyboard alone. Automate the happy path plus the top three negatives.",
        "Test an elevator — Clarify: freight or passenger, how many floors, what happens on power loss. Happy path: call it, ride it, doors open at the correct floor. Inputs: two buttons pressed fast, door held open, overload. Integrations: a fire alarm forces a recall to the ground floor, and the door sensor must never close on an obstruction. Non-functional: travel time between floors, noise, and the safety cases — a passenger stepping in as doors close. Say plainly that much of this stays physical testing; that judgment scores too.",
        "Test a vending machine — Clarify: cash, card, or both, and what 'sold out' looks like. Happy path: insert money, choose, collect item and change. Inputs: exact change, short payment, invalid code, a tilted machine, a stuck item. Integrations: a declined card must refund or retry cleanly, and inventory must update so a sold-out slot stops dispensing. Non-functional: a thousand cycles without jamming, a readable screen in sunlight, and a reachable slot for a customer in a wheelchair."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Dumping random ideas in the order they occur — this hides whether you think in risks. Instead, walk the buckets out loud so the interviewer can follow the structure.",
        "Skipping clarification — this hides the collaboration interviewers want to see. Instead, ask two or three questions; 'what does working mean here?' is always safe.",
        "Camping on the happy path — this hides the range of your thinking. Instead, spend most of your airtime on negatives, boundaries, and integrations.",
        "Forgetting the non-functional layer — this hides senior awareness. Instead, name performance, permissions, localization, and accessibility, even briefly.",
        "Never mentioning automation — this hides your tooling awareness. Instead, close with which checks become regression candidates and which stay manual."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Rehearse the six buckets until they are reflex; under pressure you fall to the level of your structure.",
        "Practice on odd objects — a parking meter, a toaster — until the route works on anything.",
        "Narrate your thinking; silence reads as stuck even when you are not.",
        "Tie answers to something you actually tested, even a practice demo shop, for credibility."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Scenario questions grade structure, not imagination.",
        "Clarify, happy path, inputs, integrations, non-functional, automation — same order every time.",
        "The elevator and the vending machine are the login page in costume.",
        "Two clarifying questions up front beat ten scattered cases."
      ] },
      { type: "quote", text: "Interview tip: open every 'how would you test X' answer with one clarifying question. It buys thinking time and signals a tester who works with requirements rather than vibes." }
    ]
  },
  {
    id: "first-90-days-in-qa",
    num: "100",
    title: "Your First 90 Days as a QA Engineer",
    dek: "A concrete plan for your first three months: learn the product like a user, own a feature, ship one automation win, and earn the regression pack.",
    date: "2026-08-27",
    read: "5 min",
    category: "Career",
    difficulty: "beginner",
    tags: ["career", "onboarding", "first-90-days"],
    status: "green",
    body: [
      { type: "p", text: "Ninety days. That is roughly how long a team needs to decide what kind of tester you are, and the label sticks for years — the person who filed one crisp, reproducible bug in week two is 'careful' long after everyone forgot the bug. The good news: those ninety days are mostly a checklist. Here it is." },
      { type: "p", text: "Think of joining a team as being handed a map someone already drew. Month one, you trace the map in your own hand: product, suites, people. Month two, you start leading small parts of the journey. By month three, people begin asking you for directions. Nobody expects a redrawn map in week one — they expect you to learn the current one." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "First impressions in QA are unusually sticky because so much of the job is trust. The tester who breaks staging and stays quiet about it becomes 'careless' just as permanently as the careful one became careful. A deliberate 90-day plan converts luck into reputation, and reputation is what gets you the interesting work later." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Days 1-30 are for learning, and learning still has deliverables:" },
      { type: "ul", items: [
        "Use the product like a customer for two full days — sign up, buy something, request a refund — and keep notes on every confusion; each one is a future test case.",
        "Read what exists: test plans, wikis, release notes, the onboarding doc nobody touched since 2023 — then fix the parts you can fix.",
        "Run the existing suites once by hand and once through CI, the automated pipeline, so you know what green means here and what flaky looks like.",
        "Map who does what: who owns checkout, who reviews your bugs, whom to ping when staging dies — in a private note you actually maintain.",
        "Fix your environment early — accounts, test data, VPN, browser profiles — so day-20 you is not blocked by day-3 problems."
      ] },
      { type: "p", text: "Days 31-60 are ownership in small doses:" },
      { type: "ul", items: [
        "Take one feature end to end: write its cases, run them on every build, and be the person who says 'this is ready' or 'this is not'.",
        "Write your first ten bugs to a strict standard — exact title, steps, evidence, severity — and ask a senior to tear two of them apart.",
        "Ask the annoying questions in refinement: what happens if the payment fails halfway, what error should an expired card produce, how do we test refunds? Annoying questions are the cheapest bugs ever caught.",
        "Volunteer for one regression cycle so you learn the pack's shape, its gaps, and its pain.",
        "Shadow a support or sales afternoon; real user pain reorders your priorities faster than any document."
      ] },
      { type: "p", text: "Days 61-90 are for paying rent beyond finding bugs:" },
      { type: "ul", items: [
        "Ship one small automation win: a five-test smoke suite over the critical path, running in CI, results posted in the team channel.",
        "Make one process improvement, however small — a release checklist, a bug report template, a shared environment-status note.",
        "Earn trust for the regression pack: run it, document its gaps, and propose which ten cases to add or retire.",
        "Ask your lead for a 90-day review and bring your own list of what shipped and what you want next.",
        "Write down what you still do not understand and turn it into next quarter's learning plan."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Staying silent about blockers — this hides problems a five-minute question would solve and burns days you cannot spare. Instead, ask early, in writing, with what you already tried.",
        "Filing dozens of nitpick bugs in week one — this hides your judgment and annoys the team. Instead, file fewer, better reports and learn the severity culture first.",
        "Redesigning the process before understanding it — this hides disrespect you do not intend. Instead, ask 'why is it this way?' before proposing 'what if we...'.",
        "Going straight to tools and skipping the product — this hides the domain knowledge that makes bugs obvious. Instead, spend the first days as a user, not a tester.",
        "Treating the 90-day review as a formality — this hides your best chance to shape the role. Instead, arrive with your shipped list and your questions."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a daily log from day one; it becomes your review material and, later, your interview stories.",
        "Under-promise on timelines and over-deliver on clarity: 'cases drafted by Thursday' — then actually do it.",
        "Find the person who knows where everything is and buy them coffee; every team has an archivist, and they are rarely on the org chart.",
        "Say yes to regression and release duty early; unglamorous work is where trust gets stored."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Month one: learn the product, the suites, and the people; fix your environment.",
        "Month two: own a feature and write bugs that need no follow-up questions.",
        "Month three: one automation win, one process improvement, and trust for the regression pack.",
        "The reputation you build in 90 days collects interest for years."
      ] },
      { type: "quote", text: "You have reached article 100, the last page of this library and the first page of your own logbook. Keep the checklist habit, keep asking the annoying questions — the journey from here is yours to test." }
    ]
  }
];
