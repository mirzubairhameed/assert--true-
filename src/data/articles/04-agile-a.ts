import type { Post } from "../post-types";

export const AGILE_A: Post[] = [
  {
    id: "agile-manifesto-for-testers",
    num: "027",
    title: "The Agile Manifesto, Translated for Testers",
    dek: "Four values from 2001, rewritten for the person with the test cases: what each manifesto line means on a two-week sprint, in plain words.",
    date: "2026-05-10",
    read: "5 min",
    category: "Agile & Jira",
    difficulty: "beginner",
    tags: ["agile", "agile-manifesto", "qa-mindset"],
    status: "green",
    body: [
      { type: "p", text: "It is your first day on a team that runs two-week sprints, and you ask the obvious question: when does the test phase start? The answer is that there is no test phase. No gate, no sign-off document, no hand-off meeting. If your last project was a waterfall relay, this looks like the whole team running at once." },
      { type: "p", text: "The Agile Manifesto is a one-page statement from 2001 built on four value pairs, such as 'working software over comprehensive documentation.' It was written by developers, yet every pair describes how testing has to change too. Read the values as a testing handbook instead of a poster, and your daily choices start to make sense." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Teams that skip this translation end up running waterfall testing inside agile ceremonies: eight finished stories land on the tester's desk on day nine of a ten-day sprint. It is the old test-phase crunch, now with a daily standup attached. When you can translate each value into a testing habit, you can also point at the exact value a decision is breaking — with the source document on your side." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Give each of the four values a job for the person holding the test cases:" },
      { type: "ul", items: [
        "Working software over comprehensive documentation — test what the running build does, not what an artifact promises. A passing demo is evidence; a 40-page test plan last touched in sprint one is not.",
        "Individuals and interactions over processes and tools — when a bug looks serious, talk to the developer for two minutes before writing a novel in the ticket. Conversation finds root causes; ticket ping-pong finds blame.",
        "Customer collaboration over contract negotiation — sit with the Product Owner in refinement and test what the customer actually needs to happen, not what you assume from a paragraph of requirements.",
        "Responding to change over following a plan — keep suites light: short checklists, automated happy paths, test data you can rebuild in minutes. A heavyweight suite that needs a week to rerun becomes the reason change is feared."
      ] },
      { type: "p", text: "The values show up fastest in the calendar. Put a two-week agile sprint beside the test phase of a six-month waterfall project:" },
      { type: "ul", items: [
        "Feedback speed — waterfall: the first formal test results arrive around month five, with months of code stacked up. Sprint: the first bug report lands on day two or three, while the code is fresh.",
        "Team shape — waterfall: a separate QA department receives the build after development is 'complete.' Sprint: testers and developers are one team, testing during the sprint, not after it.",
        "Requirements — waterfall: a specification frozen in month one, changed only through a change board. Sprint: the backlog reorders every sprint, so your test approach must expect movement.",
        "The test phase — waterfall: a distinct QA phase with entry and exit criteria. Sprint: no QA phase exists; testing is part of the definition of done for every story.",
        "Quality ownership — waterfall: 'QA missed it' is the sentence people say after a failed release. Sprint: the whole team owns quality, and the tester makes that ownership visible.",
        "Evidence — waterfall: sign-off documents prove each stage happened. Sprint: the working increment proves it, demonstrated to real stakeholders at the Review."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Ask in planning which acceptance criteria came from the customer, and test those first.",
        "Replace your longest test document with a one-page checklist per story, kept in the ticket.",
        "Set a personal rule: any bug above minor gets a two-minute conversation before the ticket is filed.",
        "Time your regression suite; if it cannot finish inside a morning, trim it until it can.",
        "Demo one tested flow yourself at the sprint Review, so you hear the customer's reaction firsthand."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Treating the manifesto as a developer concern — this keeps testing outside the team's real decisions. Instead, translate each value into one testing habit and bring it to the Retro.",
        "Keeping the waterfall test phase and calling the result agile — eight stories arriving on day nine is a phase with a standup attached. Instead, test each story the day its code lands.",
        "Maintaining heavyweight test documentation — it goes stale within two sprints and slows every change. Instead, keep checklists and automation code, and let the ticket history be the record.",
        "Avoiding stakeholders because requirements are 'the PO's job' — this leaves you testing a guess. Instead, ask one clarifying question per story in refinement, directly if you can.",
        "Fighting every change to protect the test plan — this makes QA the reason the team cannot respond. Instead, keep the suite light so a change costs a checklist edit, not a rewrite."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Re-read the four values before each Retro and bring one example of the team honoring or breaking one.",
        "Write acceptance criteria with the Product Owner during refinement, so customer intent is in the ticket before code starts.",
        "In every quality debate, prefer evidence from the running build over quotations from documents.",
        "Hold your regression suite under an hour; speed is what makes responding to change affordable.",
        "Say 'we' when discussing quality in team channels — small wording, real shift in ownership."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Agile testing is continuous, whole-team, and phase-free.",
        "Test behavior in the running build, not artifacts that describe it.",
        "Light suites make change cheap; heavy suites make change scary.",
        "The manifesto is a tool — quote it when a decision goes wrong."
      ] },
      { type: "quote", text: "Interview tip: when asked how agile testing differs from waterfall, name the move from a QA phase to continuous whole-team quality, then give the day-nine crunch as your counterexample." }
    ]
  },
  {
    id: "scrum-in-15-minutes",
    num: "028",
    title: "Scrum in 15 Minutes: Roles, Events, and Artifacts",
    dek: "Three roles, five events, three artifacts — the whole Scrum machine with real timeboxes for a two-week sprint, plus exactly what to say at standup.",
    date: "2026-05-11",
    read: "5 min",
    category: "Agile & Jira",
    difficulty: "beginner",
    tags: ["scrum", "agile", "standup", "sprint"],
    status: "green",
    body: [
      { type: "p", text: "Two weeks. Three roles. Five events. Three artifacts. That is the entire machinery of Scrum, and you can learn the parts in fifteen minutes. The harder skill is knowing where a tester plugs into each moving part — which is exactly what this page gives you." },
      { type: "p", text: "Think of a restaurant kitchen. A head chef decides the menu and the order of dishes — that is the Product Owner. A floor manager keeps the crew supplied and unblocked — the Scrum Master. The cooks cook, and in Scrum the word Developers covers everyone who builds the increment, testers included. Every two weeks the kitchen serves a complete set of dishes rather than one grand banquet after a year." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without the map, new testers attend ceremonies without knowing what each one decides, and they miss the moments where testing has the most influence. Knowing the roles, events, and artifacts tells you when to raise risks, when to demo, and when the team inspects its own process. It also tells you which parts are negotiable in your company's local version of Scrum." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Start with the roles, then the events with their standard timeboxes for a two-week sprint:" },
      { type: "ul", items: [
        "Product Owner — owns the Product Backlog, orders it by value, and shapes the acceptance criteria you will test against.",
        "Scrum Master — owns the process, not the people: clears blockers, holds events to their timeboxes, and shields the sprint from mid-flight surprises.",
        "Developers — everyone who builds the increment, QA included. If you test, you are a Developer in Scrum terms; the framework has no separate tester role."
      ] },
      { type: "ul", items: [
        "Sprint — the container itself: two weeks with a fixed end date. No extensions; unfinished work returns to the backlog.",
        "Sprint Planning (max 4 hours at this length) — the team pulls items from the Product Backlog into the Sprint Backlog. Your move: testability questions and a testing estimate.",
        "Daily Standup (15 minutes, daily) — each person covers yesterday, today, and blockers. It is the team syncing with itself, not a status report upward.",
        "Sprint Review (max 2 hours) — the team demonstrates the increment to stakeholders. Testers often demo the flows they exercised and hear acceptance feedback live.",
        "Sprint Retrospective (max 90 minutes) — the team inspects its own process. Bring quality data: escaped bugs, environment flakiness, stories that waited days for a first test."
      ] },
      { type: "p", text: "And the three artifacts, which are objects with commitments attached:" },
      { type: "ul", items: [
        "Product Backlog — the ordered list of everything that might get built. It never empties, and only the Product Owner reorders it.",
        "Sprint Backlog — the items pulled into this sprint plus the plan for building them. It belongs to the team, not to the Product Owner.",
        "Increment — the working product at sprint's end: every done story combined, tested, and usable. If a story is not done, it is not in it."
      ] },
      { type: "p", text: "Your daily slot in the standup is three sentences. A tester's update sounds like this:" },
      { type: "ul", items: [
        "'Yesterday: tested payment refunds — two bugs filed, both fixed and retested.'",
        "'Today: the checkout regression pack, then the saved-cards story if it lands.'",
        "'Blockers: staging data is stale, so refund amounts look wrong — I need a fresh seed from DevOps.'"
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Read the top of the Product Backlog before your first planning; note what you would test on the top five items.",
        "In planning, ask one testability question per story: data, environment, or acceptance criteria.",
        "Speak at every standup, even when the update is 'continuing regression on story A.'",
        "Attend the Review and watch which demo moments make stakeholders lean forward — that is where acceptance lives.",
        "Bring exactly one testing suggestion to each Retro; one gets done, five gets ignored."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Treating standup as a report to the Scrum Master — this turns a sync into surveillance. Instead, speak to the team about what unblocks the day.",
        "Skipping Retrospectives because testing is 'too busy' — this guarantees the same crunch next sprint. Instead, bring one suggestion and one piece of data.",
        "Waiting for the Review to see the product — surprises at the demo are bugs found too late. Instead, test during the sprint and demo what already passed.",
        "Adding work to the Sprint Backlog mid-sprint because a stakeholder asked — this breaks the sprint's protection. Instead, route new requests through the Product Owner into the Product Backlog for next sprint.",
        "Assuming 'Developer' excludes you — this makes QA a spectator in commitments. Instead, estimate, commit, and speak as one of the Developers."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a standing note of testability questions and raise the top one at every planning.",
        "Timebox your standup updates to three sentences; detail belongs in the ticket.",
        "Test the Increment yourself before the Review — demo surprises should never come from QA.",
        "Track how long stories sit in Testing and raise the pattern at the Retro with numbers."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Three roles, five events, three artifacts — that is all of Scrum.",
        "QA are Developers in Scrum terms; commit like it.",
        "Timeboxes for a two-week sprint: 4 hours planning, 15 minutes daily, 2 hours Review, 90 minutes Retro.",
        "The Increment is the only proof that counts at the Review."
      ] },
      { type: "quote", text: "Rule of thumb: if you cannot say what each event decides, you are attending ceremonies — Scrum is five conversations with jobs to do, not five meetings." }
    ]
  },
  {
    id: "qa-role-in-scrum",
    num: "029",
    title: "What QA Actually Does in a Scrum Team",
    dek: "A real sprint day from a working QA: refinement questions, testing on preview environments, daily bug triage, and why the safety net is yours to own.",
    date: "2026-05-13",
    read: "5 min",
    category: "Agile & Jira",
    difficulty: "beginner",
    tags: ["scrum", "qa-role", "sprint", "collaboration"],
    status: "green",
    body: [
      { type: "p", text: "Day three of the sprint: a tester opens the preview environment, taps 'Apply promo code' twice in a row, and the cart discounts twice. The story is still marked In Progress. The developer gets the bug while the code is still open in the editor, fixes it before lunch, and nobody waited for a test phase. That afternoon is the job description." },
      { type: "p", text: "In Scrum, QA is not a stage at the end — it is a running function across the whole sprint. The work has five beats: sharpen stories in refinement, write cases while developers code, test on the feature branch or preview environment as soon as code lands, triage bugs daily, and support the demo at the Review. Quality is the whole team's job; the safety net is yours." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "When QA work is queued to the sprint's final days, every bug arrives when there is no time to fix it, and the Review demos software nobody has verified. Working inside the sprint flips the economics: bugs surface while the relevant code is warm, and the increment shown to stakeholders is genuinely done, not hopefully done." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is one Tuesday, hour by hour, from a tester on a food-delivery app team:" },
      { type: "ul", items: [
        "9:00 — Daily standup: refunds tested yesterday, regression pack today, one blocker on stale staging data.",
        "9:15 — Bug triage: walk the four open bugs with the developers, agree severity, and close one as working-as-designed with the Product Owner's agreement.",
        "10:00 — Refinement for next sprint: ask how the new courier-tipping feature rounds amounts, and whether a courier sees the tip before delivery — one question covering both testability and privacy.",
        "11:30 — Write cases for the saved-addresses story while its developer codes; the cases double as acceptance checks in the ticket.",
        "13:30 — The saved-addresses branch deploys to preview; run the happy path within the hour and file a bug about duplicate addresses.",
        "15:00 — Pair with the developer on that duplicate bug; together you trace it to a missing uniqueness check in ten minutes.",
        "16:00 — Regression slice: twenty automated checks plus a manual pass over checkout, because payment code changed yesterday.",
        "17:00 — Update tickets, prep tomorrow's data seed, and chase the failed staging refresh — the same blocker you raised at 9:00."
      ] },
      { type: "p", text: "Notice the pairing at 15:00. Developers write unit tests, the Product Owner clarifies rules, the Scrum Master unblocks environments — quality is shared. But the net that catches what everyone else missed belongs to you. Own the net, share the game." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Enter refinement with three questions ready: how is this tested, what data does it need, what does done look like?",
        "Write cases while code is being written, so they are ready the day the branch deploys.",
        "Ask for the preview link to be pasted into the ticket, so testing starts without a permission hunt.",
        "Hold fifteen minutes after standup for bug triage so nothing ages in silence.",
        "Offer to run part of the Review demo — testers explain edge cases better than anyone."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Waiting for a hand-off to QA — this resurrects the waterfall phase Scrum removed. Instead, test the branch the day it deploys to preview.",
        "Testing only through the screen — half the causes live at the API, invisible in the UI. Instead, open the network tab or hit the endpoint directly when a screen misbehaves.",
        "Hoarding bugs until Friday — small issues become sprint-ending surprises. Instead, triage daily and let severity, not convenience, set the order.",
        "Saying quality is everyone's job while testing nothing yourself — the slogan hides abdication. Instead, own the safety net explicitly and let others join you there.",
        "Skipping refinement because next sprint feels far away — untestable stories are born in that silence. Instead, ask one testability question per story, every session."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a running list of testability questions and spend the top one at each refinement.",
        "Draft acceptance criteria as test cases before code starts and paste them into the ticket.",
        "Verify every fix the same day it lands, so the board tells the truth.",
        "Pair with a developer at least once per sprint — on their bug or your test.",
        "Track how long stories wait for a first test and raise the number at the Retro."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "QA runs through the sprint, not after it.",
        "Test on preview the day the code lands.",
        "Triage bugs daily; nothing ages in silence.",
        "Quality is shared; the safety net is yours."
      ] },
      { type: "quote", text: "Interview tip: narrate a sprint in beats — refinement questions, cases while coding, same-day testing, daily triage, demo support — and the interviewer hears someone who has done the job, not read about it." }
    ]
  },
  {
    id: "user-stories-and-gherkin",
    num: "030",
    title: "User Stories and Acceptance Criteria With Gherkin",
    dek: "Turn 'make transfers work' into a story with a reason, then into Given/When/Then scenarios a developer can build and you can test, using a money-transfer example.",
    date: "2026-05-15",
    read: "5 min",
    category: "Agile & Jira",
    difficulty: "beginner",
    tags: ["user-stories", "gherkin", "acceptance-criteria"],
    status: "green",
    body: [
      { type: "p", text: "What should the app actually do? Nearly every bad release starts with a mushy answer to that question. A board card that says 'Fix transfers' is not a story; it is a shrug. The remedy is a sentence format older than most frameworks, plus a script style the whole team can read." },
      { type: "p", text: "A user story follows one format: 'As a [type of user], I want [goal], so that [reason].' The reason is the load-bearing part — it defines when the feature succeeds. Acceptance criteria then pin the behavior down in Gherkin: Given (the starting state), When (the action), Then (the observable result). Plain words, but strict ones." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without the 'so that', teams build the wrong feature efficiently. Without testable criteria, 'done' collapses into 'code pushed'. Stories and Gherkin scenarios give testers something rare: a written agreement to test against, produced before the code, in language the business can correct." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is a vague request rebuilt properly, for a banking app's transfer screen. The story: 'As a bank customer, I want to transfer money between my own accounts, so that I can cover a bill in the account that is short.' Its acceptance criteria, written as Gherkin scenarios in plain text:" },
      { type: "ul", items: [
        "Given Priya has 500 dollars in Savings and 50 dollars in Checking — the starting state, set before anything happens.",
        "When she transfers 100 dollars to Checking and taps Confirm — the one action under test.",
        "Then Savings shows 400, Checking shows 150, and a confirmation with a reference number appears — an outcome a person can see.",
        "A second scenario covers the refusal: Given Savings holds 20 dollars, When she tries to move 100, Then the transfer is rejected with a clear message and both balances stay unchanged."
      ] },
      { type: "p", text: "The story format passes a fitness test called INVEST:" },
      { type: "ul", items: [
        "Independent — the transfer story does not wait on the statements feature to be testable.",
        "Negotiable — 'so that I can cover a bill' invites discussion of limits and timing instead of a fixed design.",
        "Valuable — a customer can move money; that alone is worth shipping.",
        "Estimable — clear criteria let developers size the build and you size the testing.",
        "Small — transfers between own accounts only; international wires earn their own story.",
        "Testable — every criterion becomes a scenario you can actually run."
      ] },
      { type: "p", text: "Three rules keep scenarios useful for years:" },
      { type: "ul", items: [
        "Business language — 'the transfer is rejected', not 'the API returns 400'. The scenario should survive a redesign.",
        "One behavior per scenario — a rejection scenario should not also check receipts; split it into two.",
        "Visible outcome — end on something observable: a balance, a message, a screen. 'The system handles it' is not an outcome."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Copy the story's 'so that' line to the top of your case list — it defines what valuable means.",
        "List the rules the feature must obey: limits, fees, error paths.",
        "Write the happy path first as Given, When, Then.",
        "Add one scenario per remaining rule, including every unhappy path.",
        "Read each scenario aloud to the developer; if it needs code vocabulary to explain, rewrite it."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Writing 'the system works correctly' as a criterion — it cannot fail, so it cannot test anything. Instead, name the exact balance, message, or screen.",
        "Dropping the 'so that' because it feels obvious — without the reason the team optimizes for the wrong thing. Instead, insist on the reason, every story.",
        "Scenarios written in developer vocabulary — 'POST to /transfers with amount' breaks the day the design changes. Instead, keep Gherkin in business words and leave endpoints to the automation.",
        "One giant scenario covering five behaviors — the first failed step buries the other four. Instead, one behavior per scenario, named after the rule it checks.",
        "Treating the story as a fixed contract — that kills the conversation agile runs on. Instead, treat criteria as the current best understanding, firm at sprint start, negotiable before it."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Write the happy-path scenario live in refinement, with the Product Owner and developers watching the words form.",
        "Keep scenarios inside the ticket so developers build against them and reviewers read them.",
        "Map one scenario to each rule; coverage becomes provable instead of promised.",
        "Test exactly what the scenario says first — then go one step beyond it."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A story is a user, a goal, and a reason.",
        "Given sets the stage, When acts, Then shows a visible result.",
        "INVEST is a quick fitness test before a story enters a sprint.",
        "A criterion that cannot fail is decoration, not a criterion."
      ] },
      { type: "quote", text: "Interview tip: for 'how do you turn requirements into tests', walk the transfer example — story, then Given/When/Then, then the refusal case — and finish with your three rules for good scenarios." }
    ]
  }
];
