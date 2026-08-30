import type { Post } from "../post-types";

export const BUGS_A: Post[] = [
  {
    id: "anatomy-of-a-bug-report",
    num: "020",
    title: "The Anatomy of a Bug Report Developers Love",
    dek: "A bug report is a repair manual for one defect. This one walks through the seven sections that let a developer reproduce your bug on the first try.",
    date: "2026-04-29",
    read: "5 min",
    category: "Bugs & Process",
    difficulty: "beginner",
    tags: ["bug-reports", "documentation", "qa-process"],
    status: "green",
    body: [
      { type: "p", text: "A developer opens a ticket titled 'Login broken', reads three words, and sighs. She tries the login page on her laptop, it works fine, and she writes 'cannot reproduce'. The ticket bounces between you and her for three days while the real bug sits in production, untouched. All of that pain traces back to a report that never said which browser, which account, or what error appeared." },
      { type: "p", text: "A bug report is a recipe: anyone who follows it should end up staring at the same broken screen you did. The reader was not in the room when you found the defect, so the report has to replace their memory with facts. Write it like cooking directions for a dish you want served identically in another kitchen. Seven ingredients do most of the work." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Developers burn a surprising share of every sprint just reproducing bugs, and a vague report can double the time to fix one. Worse, weak reports train a team to doubt QA, so tickets get deprioritized on suspicion alone. A complete report flips that: the developer reproduces in two minutes, trusts the rest of your findings, and walks straight to the code. Your credibility compounds with every ticket you file." },
      { type: "h", text: "In practice" },
      { type: "p", text: "These seven sections carry almost every bug report worth reading:" },
      { type: "ul", items: [
        "Title — the defect in one specific sentence. Bad: 'Login broken'. Good: 'Login with valid Google account returns 500 error on iOS Safari 17.2'.",
        "Environment — device, OS, browser and version, app build number, and whether you tested on staging or production.",
        "Preconditions — the state that must exist first: a registered user, an item already in the cart, the VPN switched on.",
        "Steps to reproduce — numbered, exact actions: what you clicked, what you typed, in what order. No verb left vague.",
        "Expected vs actual — what the requirement says should happen, and what actually happened, side by side.",
        "Evidence — a screenshot, a screen recording, console output, or the response body from DevTools, the browser's developer tools. Attach the error text itself, not a description of it.",
        "Severity — the technical impact, from data loss down to cosmetic glitch, plus any workaround you found."
      ] },
      { type: "p", text: "Assembled, the sections read like this:" },
      { type: "ul", items: [
        "Title: Transfer to saved recipient shows 'Insufficient funds' although balance is 500.00 USD",
        "Environment: Samsung Galaxy A54, Android 14, banking app build 4.2.1, staging, Wi-Fi",
        "Precondition: Verified account holds a balance of 500.00 USD and one saved recipient named 'Maria K.'",
        "Steps: 1. Log in. 2. Open Transfers. 3. Pick saved recipient 'Maria K.'. 4. Enter 50.00 and tap Send. 5. Confirm with PIN 1234.",
        "Expected: Confirmation screen reads '50.00 USD sent to Maria K.' and the balance drops to 450.00.",
        "Actual: Red banner says 'Insufficient funds', the transfer is cancelled, and the balance stays at 500.00.",
        "Evidence: Screen recording attached; network trace shows POST /api/transfers returning 402 with code INSUFFICIENT_FUNDS.",
        "Severity: High — transfers are blocked for every user; no workaround found."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Reproduce the bug once more while writing the steps down, so the list matches reality instead of memory.",
        "Capture the environment before you leave the screen: build number, browser version, operating system.",
        "Write the title last, once you know the exact condition, feature, and error.",
        "Paste the actual error message or response body; never paraphrase it from memory.",
        "State the expected result from the requirement, and link that requirement or story in the ticket.",
        "Set severity from user impact, and mention any workaround you discovered.",
        "Read your report back as a stranger would, and fill every gap you find."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Writing 'sometimes' with no data — this hides the frequency that makes a bug believable. Instead, count attempts and report the score, such as 'fails 3 of 10 tries'.",
        "Describing the error instead of pasting it — this hides the exact code and message a developer can search for. Instead, attach the text, screenshot, or response body.",
        "Cramming three defects into one ticket — this hides two of them when the first is fixed and the ticket closes. Instead, file one defect per ticket and cross-link them.",
        "Skipping preconditions — this hides why the developer cannot reproduce with a fresh account. Instead, list every account, setting, and piece of data the defect depends on.",
        "Rating severity by how annoyed you feel — this hides real impact from the triage call. Instead, rank by users blocked, data at risk, or money lost.",
        "Leaving out the build number — this hides whether the defect already died in a later build. Instead, record the exact version you tested, every time."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Search existing tickets before filing; if you find a duplicate, add your fresh evidence as a comment.",
        "Try the same steps on a second browser or device when it is cheap — 'only on Safari' triples the fix speed.",
        "Record a short screen video for anything visual, timing-related, or awkward to describe.",
        "Keep a personal template with the seven sections and fill it in for every single report.",
        "Link the user story so the developer can check intended behavior without leaving the ticket."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A bug report is a recipe, and the developer's kitchen is different from yours.",
        "Seven sections: title, environment, preconditions, steps, expected vs actual, evidence, severity.",
        "Specific titles get fixed; 'login broken' gets ignored.",
        "Attach the evidence itself, never a paraphrase of it."
      ] },
      { type: "quote", text: "Interview tip: when asked what makes a good bug report, answer 'a stranger can reproduce it in two minutes without asking me a question' — then list the seven sections." }
    ]
  },
  {
    id: "bug-life-cycle",
    num: "021",
    title: "The Bug Life Cycle: From New to Closed",
    dek: "One defect, seven states, three people who can act. Follow a bug from New to Closed and learn what Reopened, Deferred, Duplicate, and Rejected mean on a real board.",
    date: "2026-05-01",
    read: "5 min",
    category: "Bugs & Process",
    difficulty: "beginner",
    tags: ["bug-life-cycle", "defect-workflow", "jira"],
    status: "green",
    body: [
      { type: "p", text: "A single defect report can change hands four times before anyone fixes it: you file it, a lead triages it, a developer works on it, and a tester closes it. Each handoff is a state, and the full set of states is called the bug life cycle. Learn it once, and Jira boards, status columns, and standup updates suddenly make sense. Skip it, and you will keep wondering why your 'Fixed' ticket came back wearing a comment that says 'reopened'." },
      { type: "p", text: "Picture a bug as a parcel moving through a courier network. It gets scanned in at the depot (New), routed to the right driver (Assigned), unpacked and worked on (Open), marked repaired (Fixed), inspected on delivery (Retest, Verified), and finally signed for (Closed). Parcels can also be refused at the door (Rejected), matched with one already delivered (Duplicate), or parked at the depot until next week (Deferred)." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "The state tells everyone who owes the next action. When a tester leaves a bug in Open after the developer marked it Fixed, the developer assumes QA never checked, and the release notes quietly lie. When a lead forgets to move New to Assigned, the ticket sits in triage limbo for a week and nobody is accountable. Teams that respect the state machine fix defects faster and argue about them less." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is the main flow, with the action that happens at each arrow and the person who acts:" },
      { type: "ul", items: [
        "New — the tester files the report; it lands unassigned in the triage queue.",
        "New to Assigned — the test lead (or triage group) checks it is valid, sets severity and priority, and assigns an owner.",
        "Assigned to Open — the developer accepts the ticket and starts investigating; the state signals work in progress.",
        "Open to Fixed — the developer ships a fix, marks the ticket Fixed, and notes the build where the fix landed.",
        "Fixed to Retest — the tester picks the ticket up again and re-runs the original steps in that build.",
        "Retest to Verified — the defect no longer reproduces, so the tester confirms the fix with fresh evidence.",
        "Verified to Closed — QA closes the ticket, usually after a quick regression check around the changed code."
      ] },
      { type: "p", text: "Around that spine sit four side states you will meet in your first month:" },
      { type: "ul", items: [
        "Rejected — the developer or lead believes it is not a defect (works as designed); you either agree and close it or reopen with new evidence.",
        "Duplicate — someone already filed the same defect; the tickets are merged, and both reporters get linked to the main one.",
        "Deferred — valid, but not scheduled for this release; the lead pushes it to a later version and records the reason.",
        "Reopened — the fix failed or caused a new problem; the ticket returns to Open with the same developer attached."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "File a complete report so the ticket survives triage on the first pass.",
        "Watch the board daily; a ticket stuck in New for days means triage is the bottleneck, not you.",
        "When you pick up a Fixed ticket, retest the exact original steps first, then explore around the fix.",
        "Verify on the same environment you reported from, or note the difference in your comment.",
        "Close with a one-line comment: build number, retest date, result.",
        "Reopen with evidence rather than commenting on a closed ticket; reopen is a signal, so spend it honestly.",
        "For Rejected tickets you disagree with, bring data: the requirement line, the spec screenshot, or the customer complaint."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Leaving Verified tickets on your personal to-do list — this hides completed work from the team. Instead, close them the same day you verify.",
        "Reopening a closed ticket for a brand-new bug — this muddies the original defect's history. Instead, file a new ticket and link it to the old one.",
        "Marking Fixed on the developer's behalf — this hides whether the fix actually landed in your build. Instead, wait for the note naming the build.",
        "Accepting Rejected without a check — this hides real defects behind 'works as designed'. Instead, read the requirement before you agree.",
        "Changing state without a comment — this hides your evidence from whoever audits the ticket six months later. Instead, write one line per transition."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Learn your team's exact workflow names in Jira; 'In Progress' here may mean Open somewhere else.",
        "Treat triage meetings as your channel for debating severity and priority, and bring numbers.",
        "Keep Deferred tickets visible with a target version so they never rot in silence.",
        "Retest on a clean build and record the build number every time.",
        "Link duplicates in both directions so every reporter hears when the main ticket ships."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "New, Assigned, Open, Fixed, Retest, Verified, Closed is the spine; Rejected, Duplicate, Deferred, Reopened are the branches.",
        "Every state change has exactly one owner.",
        "Reopen means the fix failed — use it with evidence, not frustration.",
        "Closed is a claim you should be able to defend six months later."
      ] },
      { type: "quote", text: "Interview tip: if asked to describe the bug life cycle, walk the happy path first, then add Reopened and Deferred — interviewers listen for the states beginners forget." }
    ]
  },
  {
    id: "severity-vs-priority",
    num: "022",
    title: "Severity vs Priority, With Examples That Make It Stick",
    dek: "Severity is how badly the system is hurt; priority is how fast the business needs it fixed. Four classic examples make the difference impossible to forget.",
    date: "2026-05-03",
    read: "5 min",
    category: "Bugs & Process",
    difficulty: "beginner",
    tags: ["severity", "priority", "triage"],
    status: "green",
    body: [
      { type: "p", text: "Which one blocks a release: a crash on a page that only retired Internet Explorer users can reach, or the wrong company logo on the payment success screen? Every team argues some version of this question, and the argument only ends when two words get separated: severity and priority. They are different scales, set by different people, for different reasons. Mixing them up is one of the classic beginner stumbles in a QA interview." },
      { type: "p", text: "Severity is the technical impact of a defect on the system: does it crash something, corrupt data, or block a core flow? Priority is the business urgency: how soon does the business need it fixed? A hospital analogy works well: severity is how sick the patient is, and priority is the order the triage nurse calls them in. Usually the sickest patient goes first — but not always, and that gap is where the interesting decisions live." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Fix order is a business decision, and severity alone cannot make it. If QA rates everything Critical, the word stops meaning anything and developers stop trusting the scale. If priority gets decided without severity input, the team spends a week polishing a cosmetic button while a data-loss bug waits in line. Knowing both scales lets you argue with evidence instead of volume." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The two scales come from different people. Severity is set by QA, because judging technical impact is a testing skill; priority is set by the product owner or the business side, because only they know what customers and deadlines need. In Jira the two live side by side as separate fields, and they never have to match. Put them on a 2x2 grid — impact on one axis, urgency on the other — and four classic examples fall into place:" },
      { type: "ul", items: [
        "High severity, high priority: checkout crashes when users tap Pay. Every customer is blocked from giving you money — drop everything and fix it now.",
        "Low severity, low priority: a typo in the legal policy page footer. It looks unprofessional, but nothing breaks; fold it into the next content sweep.",
        "High severity, low priority: the abandoned legacy Internet Explorer marketing page crashes on load. Technically a crash, but the page gets about twelve visits a month and the browser is retired — schedule the fix or retire the page.",
        "Low severity, high priority: the payment success page shows the old company logo during rebrand week. Nothing malfunctions, but every customer sees the brand error — hotfix the image today."
      ] },
      { type: "p", text: "Read those four until you can predict a fifth. The pattern: severity comes from the system, priority comes from the business, and the two are independent. A real scenario shows it — the day after a rebrand goes live, a typo nobody noticed for a year suddenly outranks a crash on a page nobody visits." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Ask what function the defect damages: a core flow, stored data, what users see, or just polish.",
        "Ask how many users will meet it: everyone, one persona, or visitors on a deprecated browser.",
        "Ask whether a workaround exists; a crash with a workaround is rarely as severe as one without.",
        "Write the severity with a one-line reason on the ticket, so triage can challenge it with facts.",
        "Let the product owner set priority, and supply business context — 'checkout', 'rebrand week' — without demanding a ranking."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Marking every defect you file Critical — this hides the genuinely critical ones in the pile. Instead, save the top level for blocked flows and data loss.",
        "Treating severity and priority as one field — this hides the business reason behind the fix order. Instead, keep both values visible and let each side own one.",
        "Letting priority quietly overwrite severity — this hides technical risk from the roadmap. Instead, record when a high-severity defect is deliberately scheduled late.",
        "Judging severity only by user counts — this hides crashes that hit one user but corrupt their data. Instead, weigh per-user impact and user counts separately.",
        "Arguing in ticket comments without evidence — this hides the real tradeoff from the decision maker. Instead, bring numbers: affected flows, visit counts, revenue per hour."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Agree on a written severity scale with an example for each level, so filing does not depend on mood.",
        "Propose severity during triage and let the team dispose; QA advises, the business decides priority.",
        "Use the 2x2 grid in sprint planning to sort the fix-order debate quickly.",
        "When priority and severity clash loudly, write the reason into the ticket so the decision survives staff changes."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Severity is technical impact, set by QA; priority is business urgency, set by the product side.",
        "The four classics: checkout crash, policy typo, legacy IE crash, rebrand logo.",
        "High severity can carry low priority, and the reverse is just as real.",
        "A severity rating you inflate is a severity rating nobody reads."
      ] },
      { type: "quote", text: "Interview tip: close your answer with the crisp version — severity is how bad the defect is for the system, priority is how soon the business needs it fixed — then give the logo-on-payment-page example." }
    ]
  },
  {
    id: "reproduce-bugs-reliably",
    num: "023",
    title: "How to Reproduce Bugs Reliably (and Report When You Cannot)",
    dek: "The bug happened once and never again — or so it seems. Learn to control variables, count attempts, capture evidence, and report '3 of 10 attempts' with confidence.",
    date: "2026-05-04",
    read: "5 min",
    category: "Bugs & Process",
    difficulty: "beginner",
    tags: ["reproducing-bugs", "intermittent-bugs", "evidence"],
    status: "green",
    body: [
      { type: "p", text: "Three testers watch the same screen. For two of them, the 'Apply coupon' button works on every attempt; for the third, the total drops to zero on the second try and checkout dies. The bug is real, it is in production, and it is intermittent — the kind that refuses to happen for anyone else. What you do in the next thirty minutes decides whether this defect gets fixed or buried under 'cannot reproduce'." },
      { type: "p", text: "Reproducibility is the difference between a bug report and a ghost story. A reliable reproduction strips away everything that does not matter until only the trigger remains, the way a detective narrows a suspect list: same room, same key, same time. You are not trying to make the bug look more dramatic. You are trying to make it happen on command, for anyone, including you tomorrow." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Developers cannot fix what they cannot see, and intermittent bugs get the lowest fix priority precisely because they look rare. A tester who can say 'fails 3 of 10 attempts, always on the second coupon in the same session' turns a ghost story into a target. Unreproducible bugs also cost the team twice: time filing and rejecting the first report, then time re-filing it next week when someone else finally hits it." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Reliable reproduction starts with control. Before you call a bug flaky, remove the usual suspects:" },
      { type: "ul", items: [
        "Follow your own written steps exactly — do not improvise between attempts, because the improvisation may be the trigger.",
        "Start from a clean state: a fresh incognito session, a logged-out start, a cleared cache, or a brand-new test account.",
        "Use fresh test data on each attempt; yesterday's half-finished order is not the same input as a new one.",
        "Note the environment every time: build number, browser, device, network condition, and the time of day.",
        "Capture logs and network traffic while you reproduce, not after — keep the browser DevTools Network tab recording.",
        "Record the screen for anything intermittent; the moment you stop recording is usually the moment it happens."
      ] },
      { type: "p", text: "When the bug still skips attempts, stop repeating and start investigating:" },
      { type: "ul", items: [
        "Count occurrences — run the same steps ten times and write down the score; '3 of 10' is evidence, 'sometimes' is noise.",
        "Note timing and pattern — does it fail after an idle session, on the second attempt, or around midnight? Intervals point at cache and scheduled jobs.",
        "Capture a HAR file — a recording of the browser's network traffic — plus server logs for one passing run and one failing run, then diff them; the difference is the suspect.",
        "Form hypotheses and test one at a time: a cached response, a race between two requests, one specific data value, a slow network.",
        "Change a single variable per attempt — network, account, data, browser — so a pattern can actually emerge."
      ] },
      { type: "p", text: "And when you still cannot reproduce it on command, report it anyway. Include the evidence from the one time it happened, your attempt count, and the conditions: 'Occurred on 3 of 10 attempts on build 2.4.0, Chrome 121, always after reusing a coupon in the same session.' A documented cannot-reproduce with numbers is a real report; silence is not." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Reproduce once, write the steps down, then reproduce again following only what you wrote.",
        "Strip the steps to the minimum set that still triggers the defect.",
        "Pin down every variable you can: account, data, browser, build, network.",
        "Run a batch of attempts — ten is a good number — and count hits and misses.",
        "Record screen, logs, and network for at least one failure.",
        "Write the report with the frequency in it, not the word 'sometimes'.",
        "Attach your reproduction notes to the ticket for whoever picks it up next."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Reporting 'it happened once, good luck' — this hides the pattern that would make the defect fixable. Instead, run ten attempts and report the count.",
        "Clicking faster instead of observing — this hides the actual trigger under more randomness. Instead, slow down and change one variable at a time.",
        "Reusing stale test data across attempts — this hides defects that only appear on first-run data. Instead, create fresh data per attempt or reset it.",
        "Closing your own ticket after two quick tries — this hides a defect users will still hit in production. Instead, report with evidence, frequency, and environment.",
        "Reproducing only on your machine — this hides environment-specific triggers like browser zoom or OS locale. Instead, repeat once on a different browser or device before filing."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a screenshot or HAR file from every unreproducible sighting; evidence ages better than memory.",
        "Ask what was different: time of day, device, account age, network type.",
        "Pair logs with timestamps so a passing run and a failing run can be compared line by line.",
        "Revisit old cannot-reproduce tickets after each release; new builds sometimes confess."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Control variables, count attempts, capture evidence while it happens.",
        "'3 of 10 attempts' beats 'sometimes' every single time.",
        "Cache, races, and data are the usual suspects behind intermittence.",
        "Cannot reproduce is a finding, not an ending — report it with numbers."
      ] },
      { type: "quote", text: "Rule of thumb: a defect you cannot reproduce is still a defect you observed — report the evidence, the count, and the environment, and let the numbers argue for you." }
    ]
  }
];
