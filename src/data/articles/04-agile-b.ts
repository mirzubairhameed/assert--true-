import type { Post } from "../post-types";

export const AGILE_B: Post[] = [
  {
    id: "definition-of-ready-done",
    num: "031",
    title: "Definition of Ready and Definition of Done",
    dek: "Two lists that end the worst meeting fights: what makes a story ready to pull in, and what 'done' means when a developer says the word.",
    date: "2026-05-16",
    read: "4 min",
    category: "Agile & Jira",
    difficulty: "beginner",
    tags: ["definition-of-ready", "definition-of-done", "agile", "sprint"],
    status: "green",
    body: [
      { type: "p", text: "The most expensive sentence in a sprint is 'it is about ninety percent done.' The code exists, so the story looks finished; the demo fails, three bugs land on the final day, and the release slips a week. Two short checklists — Definition of Ready and Definition of Done — exist to make that sentence impossible." },
      { type: "p", text: "The Definition of Ready (DoR) is the entry checklist: what must be true before the team pulls a story into a sprint. The Definition of Done (DoD) is the exit checklist: what must be true before anyone says the word 'done'. Think pre-flight versus landing checks — the pilot does not invent either one mid-air." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "DoR stops doomed stories from entering the sprint: a story without acceptance criteria burns planning time and ships the wrong feature. DoD stops the ninety-percent lie: without a shared exit list, 'done' means 'code pushed' to one person and 'tested on staging' to another. Both lists turn meeting arguments into check marks anyone can read." },
      { type: "h", text: "In practice" },
      { type: "p", text: "A starter Definition of Ready, the list a story must survive before it enters a sprint:" },
      { type: "ul", items: [
        "Acceptance criteria are written and readable by the whole team — not just the Product Owner.",
        "Dependencies are resolved or scheduled; nothing in the sprint waits on another team's API.",
        "Designs are linked, with the critical flows called out for testers.",
        "The story is testable: data, environment, and expected results exist or are named.",
        "The story is sized, and small enough to finish inside one sprint."
      ] },
      { type: "p", text: "The matching Definition of Done, checked before anyone drags the card to Done:" },
      { type: "ul", items: [
        "Code is reviewed and merged to the main branch.",
        "Unit tests exist and pass in the pipeline.",
        "QA has passed the story on staging, against its written acceptance criteria.",
        "Known bugs are fixed or logged as visible tickets — never silent.",
        "Documentation and help text are updated to match the behavior.",
        "The change sits behind a feature flag, or has a rollback plan."
      ] },
      { type: "p", text: "Notice the third line. It is not there to flatter testers; it exists so 'done' cannot be claimed while testing is still pending. When the checklist lives in the ticket template, it does the arguing for you." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Draft the DoD with the whole team in a Retro, and get explicit agreement from the developers.",
        "Build both lists into the ticket template so they appear without anyone remembering them.",
        "In refinement, run each candidate story against the DoR out loud, item by item.",
        "Before marking a story done, read the DoD aloud in a ticket comment.",
        "Review both lists quarterly; a checklist nobody edits is a checklist nobody reads."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Wielding DoR to reject stories for sport — a contract becomes a weapon and refinement becomes a trial. Instead, treat each miss as named work for the Product Owner, not a defeat.",
        "Declaring done with open minor bugs — the board hides debt that the next sprint pays. Instead, log every bug, then decide together what 'done' still allows.",
        "Growing the DoD to fifteen checkboxes — the team stops reading it by week three. Instead, keep six or seven lines, each one preventing a specific escape.",
        "Writing the DoD without QA in the room — this is how 'passed on staging' quietly disappears. Instead, volunteer to draft the testing line yourself.",
        "Treating readiness as the Product Owner's private duty — the whole team eats a bad story. Instead, bring the testability questions that make DoR real."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep both checklists in the ticket template, not on a wiki page nobody opens.",
        "Include 'feature flagged or rollback plan' in the DoD; reversibility makes releases calm.",
        "After any escaped bug, find the DoD line that would have caught it and strengthen that line.",
        "Count how often stories fail DoR; a high rate means refinement needs work, not the checklist."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "DoR filters the input; DoD audits the output.",
        "'Done' is a checklist, not a feeling.",
        "A story without acceptance criteria is not ready, whatever its size.",
        "The strongest DoD line for testers is 'passed on staging.'"
      ] },
      { type: "quote", text: "Interview tip: when a process question comes up, recite a six-line Definition of Done from memory — it signals someone who has lived inside a real team's exit criteria." }
    ]
  },
  {
    id: "jira-for-testers",
    num: "032",
    title: "Jira for Testers: Issues, Workflows, and Filters",
    dek: "Epics, stories, bugs, priorities, fix versions, links, and one JQL filter that finds your own work — the Jira surface a tester touches every single day.",
    date: "2026-05-17",
    read: "5 min",
    category: "Agile & Jira",
    difficulty: "beginner",
    tags: ["jira", "jql", "bug-tracking", "workflow"],
    status: "green",
    body: [
      { type: "p", text: "A new tester inherits a board with 240 tickets, a saved filter called 'urgent FINAL v2 real', and no record of where last week's bugs went. Jira rewards people who know its small set of moving parts — issue types, fields, workflow states, links, and saved filters — and quietly punishes everyone else." },
      { type: "p", text: "Underneath the interface, Jira is a database of work. Every card is an issue with a type, a handful of fields, a position in a workflow, and links to other issues. Learn those four ideas and any team's board becomes readable in an afternoon — including the messy ones." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Testers live in Jira more than any other role: bugs are born there, stories are verified there, and the question 'where do we stand on quality?' is answered from its filters. If you cannot query the board, you answer that question with a shrug. If you can, you answer with numbers." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The five issue types you will actually touch:" },
      { type: "ul", items: [
        "Epic — a large chunk of work spanning sprints, like 'Payments revamp'. Link bugs up to it and patterns become visible.",
        "Story — one user-facing slice of an epic, carrying the acceptance criteria you test at sprint level.",
        "Bug — a defect against a story or the live product, with steps, expected result, and actual result.",
        "Task — work with no user-visible behavior: seed staging data, refresh a test suite, rotate an API key.",
        "Sub-task — a slice of a story or bug, often per discipline: one for UI, one for API, one for test cases."
      ] },
      { type: "p", text: "Four fields do most of the daily work:" },
      { type: "ul", items: [
        "Priority — what to fix first. Set it honestly (Blocker, High, Medium, Low) and defend it with user impact.",
        "Components — the subsystem, like 'checkout' or 'search'. This is how you later pull up every payment bug at once.",
        "Fix version — the release a fix should ship in. It turns your bug list into a release-readiness report.",
        "Labels — free-form tags like 'regression-candidate'. Keep a team dictionary, or three spellings of one label will split your data."
      ] },
      { type: "p", text: "A typical workflow runs To Do, In Progress, In Review, Testing, Done — every team customizes it, so read the board's workflow first. The Testing state is your territory: move an issue out of it only when your checks pass, and bounce it back with a comment naming the failing case if they do not." },
      { type: "p", text: "Links give the board its memory:" },
      { type: "ul", items: [
        "blocks — a bug blocking its story. This is the link that should alarm the standup.",
        "causes / is caused by — ties a bug to the change that produced it.",
        "relates to — a loose association, like a checkout regression relating to the payments epic."
      ] },
      { type: "p", text: "Saved filters are queries you write once and reuse; the query language is JQL. One filter every tester should own: `assignee = currentUser() AND status = \"In Review\" ORDER BY updated DESC` — everything waiting on you right now, newest first. Save it, pin it to your sidebar, and start each morning there." },
      { type: "p", text: "Dashboards combine gadgets into one screen. The two worth building first: a filter-results gadget listing open bugs by component, and a created-versus-resolved chart — the bug burn-down that shows whether the sprint is digging out or digging deeper. Put one on the team screen and quality becomes visible without a status meeting." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Ask for the board's workflow diagram and read the states before filing your first bug.",
        "Copy the team's best-written bug and use it as your field template.",
        "Create the 'waiting on me' JQL filter on day one and save it.",
        "Link every bug to its story with 'blocks' or 'relates to' at filing time.",
        "Build a two-gadget dashboard: open bugs by component, created versus resolved."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Filing bugs without components or fix version — they become unqueryable exactly when reports are due. Instead, fill the fields at creation; future-you runs the queries.",
        "Leaving issues parked in Testing for days — the stale state hides the real queue. Instead, move it or comment on it daily; a stale state is a lie.",
        "Keeping one giant personal filter with a hundred issues — it answers nothing. Instead, maintain three narrow filters: waiting on me, my open bugs, this release's bugs.",
        "Skipping links because the button is small — orphaned bugs lose their stories. Instead, link while the relationship is fresh, the moment you file.",
        "Arguing priority by volume in standup — it burns the fifteen minutes. Instead, set priority in the ticket and defend it in one sentence."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Learn enough JQL to answer two questions from memory: what is waiting on me, and what is open in this release.",
        "Keep a saved filter of bugs fixed this sprint; it drives your regression slice.",
        "Glance at the created-versus-resolved chart daily during hardening weeks.",
        "Standardize label names with the team once, then never free-type a new spelling."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Every issue is a type, some fields, a state, and links.",
        "The Testing state is yours; move it on evidence only.",
        "Saved filters turn a board into answers.",
        "Fix version turns a bug list into release readiness."
      ] },
      { type: "quote", text: "Rule of thumb: a board you cannot query is a board you cannot report from — one saved JQL filter is worth ten status meetings." }
    ]
  },
  {
    id: "testing-inside-the-sprint",
    num: "033",
    title: "Testing Inside the Sprint (Not After It)",
    dek: "Eight days of coding, two days of testing, guaranteed crunch. Here is the same sprint reshaped so QA touches each story the day its code lands.",
    date: "2026-05-19",
    read: "4 min",
    category: "Agile & Jira",
    difficulty: "intermediate",
    tags: ["sprint", "agile-testing", "shift-left", "qa-workflow"],
    status: "green",
    body: [
      { type: "p", text: "Eight days of development, two days of testing: the arithmetic behind every crashed sprint. On day nine the tester receives six finished stories at once, finds twelve bugs, and the team 'carries work over' — again. The pattern has a name, the QA-at-the-end anti-pattern, and a cure that fits inside the sprint you are already running." },
      { type: "p", text: "Testing inside the sprint means each story gets tested the day its code lands, not in a batch at the end. The story finished on day three is tested on day three. Refinement for next sprint happens early this sprint — that is the shift left — and each story's happy path is automated while the feature is still fresh in everyone's head." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Batched testing guarantees crunch: bugs found on day nine surface when there is no time to fix them, so quality decisions turn into release decisions made in a panic. The same bugs found on day three cost an afternoon. The anti-pattern also lets the board lie — a sprint that looks 'done' on day eight has merely untested code." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is the same ten-day sprint, reshaped, as a QA calendar:" },
      { type: "ul", items: [
        "Day 1 — Sprint planning: put a testing estimate beside every story, flag the riskiest one, and confirm the preview environment exists.",
        "Day 2 — Refinement for next sprint in the morning; write cases for story A in the afternoon while its branch builds.",
        "Day 3 — Story A deploys to preview: run its cases the same day. Two bugs filed; both fixed by day four.",
        "Day 4 — Verify both fixes, then automate story A's happy path while the flow is fresh.",
        "Day 5 — Story B lands: test it, plus a regression slice over checkout, because payment code changed.",
        "Day 6 — Triage and automation for story B; nothing on the board is more than two days old.",
        "Day 7 — Story C lands with a design question; ask the Product Owner before testing, not after.",
        "Day 8 — One exploratory hour across the whole increment; the cross-story bug you find here would have been a day-nine surprise.",
        "Day 9 — Run the regression pack over finished work — not six new stories, because nothing piled up.",
        "Day 10 — Support the demo from the test environment, then take one testing question to the Retro."
      ] },
      { type: "p", text: "The arithmetic changes shape: instead of two days holding ten stories, each day holds one. Story A was done on day 3 — the board tells the truth by mid-sprint, and day 9 becomes verification rather than discovery." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "In planning, attach a testing estimate to every story so the load is visible before day one.",
        "Ask developers to paste the preview link into the ticket the moment a branch deploys.",
        "Adopt one rule: no story waits more than a day between code landing and its first test.",
        "Automate each story's happy path inside the same sprint — 'later' never arrives.",
        "Run a small regression slice daily so the increment stays releasable all sprint long."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Accepting the day-nine pile because 'that is how sprints feel' — the crunch becomes tradition. Instead, show a reshaped calendar at the Retro and ask for one change.",
        "Testing only after the story closes — it wastes the days when fixes are cheapest. Instead, test the branch in preview while the story is still In Progress.",
        "Saving automation for a quieter week — the quiet week never comes. Instead, one automated happy path per story, written the same sprint.",
        "Treating refinement as the Product Owner's meeting — untestable stories are manufactured there. Instead, bring testability questions and leave with cases started.",
        "Letting In Review become a parking lot — the column hides aging work from the burn-down. Instead, review its age at standup every day."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Make 'tested the day it lands' a personal law, and tell the team you run it.",
        "Keep each day's testing load near one story; escalate the moment it doubles.",
        "Guard a daily regression slice; it is what keeps day 9 boring — in the good way.",
        "Track the age of items in Testing and raise anything older than a day."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Ten stories on day nine is a decision, not an accident.",
        "A story is truly done the day its code lands and its checks pass.",
        "Automation belongs inside the sprint, one happy path at a time.",
        "Shift left in refinement; untestable stories are cheapest to fix before they exist."
      ] },
      { type: "quote", text: "Rule of thumb: if more than two stories are waiting for their first test, stop and test — the backlog will still be there at the end, the sprint will not." }
    ]
  },
  {
    id: "estimating-testing-work",
    num: "034",
    title: "How to Estimate Testing Work Without Guessing",
    dek: "A five-point story, broken into case writing, execution, a regression slice, and bug verification — plus the push-back line for plans that forget testing exists.",
    date: "2026-05-21",
    read: "4 min",
    category: "Agile & Jira",
    difficulty: "intermediate",
    tags: ["estimation", "story-points", "sprint-planning", "agile"],
    status: "green",
    body: [
      { type: "p", text: "'Quick question — how long will testing take?' If you answer with a number pulled from the air, that number becomes a commitment. Estimating testing work has real inputs: the story's size, your past velocity, a breakdown of the work, and one honest buffer for the things you cannot control. Here is how to produce a number that survives contact with the sprint." },
      { type: "p", text: "Story points measure the relative size of a story, including everything it needs — code, tests, review, fixes. Hours measure time you personally spend. Use points when the team sizes the story, hours when you plan your own day, and past velocity — how much your team actually finished in recent sprints — as the reality check. Points are the suitcase; hours are how long packing takes you." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Underestimated testing stays invisible until day eight: the board looks healthy while test debt piles up, then the final days become crunch. Overestimating wastes capacity and burns your credibility. An estimate built from real inputs also arms you for the planning meeting where someone suggests testing 'can just happen in parallel.'" },
      { type: "h", text: "In practice" },
      { type: "p", text: "Take a five-point story: 'saved payment cards — add a card, edit it, delete it, and pay with a saved card.' Break the testing into its four natural parts:" },
      { type: "ul", items: [
        "Case writing — eight cases covering add, edit, delete, set-default, expired card, duplicate nickname: about 2 hours.",
        "Execution — run them on preview, then again on staging, including one retest cycle: about 3 hours.",
        "Regression slice — saved cards touch checkout, so run the payment smoke pack: about 1 hour.",
        "Bug verification buffer — one found bug per story is normal; hold 90 minutes for retests.",
        "Total — roughly 7.5 hours of testing inside a five-point story. Say the number out loud in planning, before it is assumed for you."
      ] },
      { type: "p", text: "Now check the total against history. If the team finishes about eight points per sprint and your testing log shows testing consistently consumes about a third of each story's effort, then a five-point story with two hours of testing budgeted is not conservative — it is fiction. Velocity is not a weapon pointed at you; it is the record of what actually fit." },
      { type: "p", text: "And when the plan leaves no room, push back with the sentence that ends the debate: 'Two points of testing inside an eight-point story is a lie.' Then show the breakdown above. Numbers with line items get negotiated; vibes get ignored." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Keep a log with five columns — story, points, testing hours spent, bugs found, surprises — one row per story.",
        "Before planning, reread the last three sprints of the log; that is your velocity, not a guess.",
        "In planning, break every story into case writing, execution, regression, and verification.",
        "Add a named buffer for environment flakiness, sized from the last two sprints of evidence.",
        "Read the total aloud in planning and negotiate scope, never the number itself."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Answering hours when the team asks for points — a shared size becomes your personal deadline. Instead, confirm the unit first and estimate in it.",
        "Estimating from the story's title — 'small fix' headlines hide three-day test matrices. Instead, estimate from acceptance criteria, never the label.",
        "Skipping the buffer and absorbing overruns silently — this trains the team to expect free work. Instead, carry a visible buffer line, even a small one.",
        "Estimating once and never comparing — every estimate stays a first guess forever. Instead, check the log against the estimate each sprint and adjust.",
        "Agreeing to test 'in the next sprint' without saying so — that hides a slip inside the board. Instead, name what will not be tested and let the team decide."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Estimate testing in the planning room, not after the sprint has started.",
        "Break every story into the same four parts, so estimates become comparable across sprints.",
        "Quote ranges when environments are flaky: 'six to eight hours, depending on staging.'",
        "Re-estimate out loud when scope grows mid-sprint; announced surprises cost less.",
        "Keep the testing log visible to the team — evidence beats seniority in every argument."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Points size the story; hours plan your day; velocity checks both.",
        "Four parts — cases, execution, regression, verification — and the estimate writes itself.",
        "A named buffer is honesty; a hidden buffer is hope.",
        "Push back with line items, not with feelings."
      ] },
      { type: "quote", text: "Interview tip: when asked how you estimate, walk the four-part breakdown, end on the velocity check, and offer the push-back line — it shows you treat testing as engineered work, not a rounding error." }
    ]
  }
];
