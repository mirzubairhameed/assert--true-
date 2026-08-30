import type { Post } from "../post-types";

export const MANUAL_A: Post[] = [
  {
    id: "first-test-case-login",
    num: "011",
    title: "Write Your First Test Case: The Login Page",
    dek: "Three fields, one button, and the first test case you will ever write. Here is the full five-part format plus eleven login cases with exact expected results.",
    date: "2026-04-16",
    read: "5 min",
    category: "Manual Testing",
    difficulty: "beginner",
    tags: ["test-cases", "login", "manual-testing"],
    status: "green",
    body: [
      { type: "p", text: "Day one on the job. The lead drops a login page in your lap and says: write me a real test case, not a checklist in your head. That single screen — Email, Password, a Remember me box, a Log in button — is where most testers learn the difference between poking at software and testing it." },
      { type: "p", text: "A test case is a recipe someone else can follow. It records the starting conditions, the exact steps, and the result you should see, so any tester — or the developer at 6 p.m. — can rerun it and reach the same verdict. Notes like 'login works' are not test cases; they are wishes." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "When a bug appears, the case is your evidence: this exact input, on this build, produced this wrong result. When you are on holiday, the case lets a teammate cover your area without pinging you six times. And when an interviewer asks how you would test a login page, the format is half the answer they are listening for." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "A complete case has five parts: a unique ID, a one-behavior title, preconditions, numbered steps, and an expected result specific enough to screenshot. Here is TC-LOGIN-001 written out the way it should live in your test management tool:" },
      { type: "ul", items: [
        "ID: TC-LOGIN-001.",
        "Title: Verify login succeeds with a registered email and the correct password.",
        "Precondition: The account qa.tester@mailbox.dev exists with password 'Tr@ilhead88'; the login page is open; the user is logged out.",
        "Steps: 1. Enter qa.tester@mailbox.dev in the Email field. 2. Enter 'Tr@ilhead88' in the Password field. 3. Click Log in.",
        "Expected result: The dashboard loads within 3 seconds, the header shows the account name, and the URL ends in /dashboard."
      ] },
      { type: "p", text: "One case, one behavior. From there, the humble login page earns its reputation. Run at least these eleven:" },
      { type: "ul", items: [
        "Valid login — registered email plus correct password; expect the dashboard itself, not a generic success message. This is TC-LOGIN-001, the happy path everything else leans on.",
        "Wrong password — correct email with 'Tr@ilhead89'; expect 'Incorrect email or password', the user still on the login page, and no lockout on a first failure.",
        "Empty email — Password filled, Email blank; expect an inline 'Email is required' and no request sent at all, which you can confirm in the browser's Network tab.",
        "Empty password — Email filled, Password blank; expect 'Password is required' and no navigation away from the form.",
        "Invalid email format — 'john@@mail'; expect a format error before the form submits, never a server error page.",
        "Password case sensitivity — 'tr@ilhead88' when the stored password is 'Tr@ilhead88'; expect rejection, because login must compare passwords exactly.",
        "Password below minimum length — 7 characters when the policy says 8; expect a clean rejection that names the rule, with no crash behind it.",
        "SQL-injection-looking input — enter ' OR 1=1 -- as the email with any password; expect the ordinary invalid-credentials message: no success, no error page, no stack trace.",
        "Remember me persistence — log in with Remember me checked, close the browser, come back tomorrow; expect the session restored. Repeat unchecked; expect a fresh login prompt.",
        "Forgot password link — click Forgot password?; expect the reset page with its own email field, and a reset message arriving within a minute for a registered address.",
        "Account lockout — five consecutive wrong passwords; expect 'Account locked. Try again in 15 minutes.', and the correct password refused until that window passes."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Stuffing twelve behaviors into one case — this hides which step actually failed. Instead, write one behavior per case; twelve short cases beat one long one.",
        "Writing expected results like 'login works' — this hides the concrete outcome you were supposed to compare against. Instead, name the screen, the message, or the URL the user should see.",
        "Skipping preconditions — this hides why a pass proves nothing when the account or logged-out state is unknown. Instead, state exactly what must be true before step 1, including the test password.",
        "Reporting 'login is broken' off one failed case — this hides the other nine results that narrow the defect down. Instead, run the set, then file one bug per mismatch with its case ID.",
        "Testing on one machine and one browser only — this hides environment-specific behavior in Safari, on mobile, or on a slow network. Instead, add at least one alternate environment to the set each release."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Draft the cases from the requirement before you open the app; the page will happily distract you into testing only what it shows.",
        "Pair every case with the requirement or story ID so coverage is provable, not vibes.",
        "Keep exact test data in the case — account, password, card number — so anyone can rerun it without asking you.",
        "Log each bug against the case ID and the build number; future you will want the trail.",
        "Grow the set after every incident: any login bug that escapes to production becomes a permanent case."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A test case has five parts: ID, title, preconditions, steps, expected result.",
        "One case, one behavior, one exact expected result.",
        "A login page deserves at least eleven cases: valid, wrong password, empty fields, format, casing, length, injection-looking input, persistence, recovery, lockout.",
        "Vague expectations are untestable; name the exact screen or message."
      ] },
      { type: "quote", text: "Interview tip: 'How would you test a login page?' is the most common opener in QA interviews. Give the five-part format, then the buckets — valid, wrong password, empty fields, injection-looking input, lockout — and you sound like a hire." }
    ]
  },
  {
    id: "positive-vs-negative-testing",
    num: "012",
    title: "Positive and Negative Testing: Breaking on Purpose",
    dek: "Positive testing proves good input works. Negative testing proves bad input is handled politely. The ATM keypad and a food cart show both.",
    date: "2026-04-17",
    read: "4 min",
    category: "Manual Testing",
    difficulty: "beginner",
    tags: ["positive-testing", "negative-testing", "test-design"],
    status: "green",
    body: [
      { type: "p", text: "Type 'banana' into the quantity box of a food cart and press Add. Does the app refuse politely, silently treat it as 1, or white-screen the whole checkout? Positive and negative testing are the two halves of answering that question on purpose instead of by accident." },
      { type: "p", text: "Positive testing feeds the software valid input and expects success: a correct coupon, a right PIN, a real address. Negative testing feeds it invalid input and expects graceful failure: a clear message, no crash, and no broken state left behind. Picture a bouncer at a door — wave in the guests on the list, turn everyone else away without a fight." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Users break things constantly: typos, expired codes, double-clicks, pasted whitespace, the wrong country in the address. Positive cases prove your feature does what it promises; negative cases prove it survives contact with reality. A checkout that handles only the happy path loses the first customer who pastes an old coupon — and everyone watching them complain about it." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Start with an ATM and its 4-digit PIN — the classic negative-testing example, because the machine must never lock out a paying customer by accident or let a stranger cycle guesses forever:" },
      { type: "ul", items: [
        "Positive — the correct PIN '4821'; expect the account menu on the first try.",
        "Negative — a wrong PIN; expect 'Incorrect PIN. 2 attempts remaining.', not a crash, and no hint about which digit was wrong.",
        "Negative — three wrong PINs in a row; expect the card retained or blocked, exactly as the bank's rule states.",
        "Negative — a 3-digit PIN '482'; expect the terminal to refuse Enter until four digits are present.",
        "Negative — Cancel pressed mid-entry; expect the card returned and the half-typed PIN gone from memory."
      ] },
      { type: "p", text: "The same two-sided habit covers a food cart with a promo box. If the rule reads 'SAVE10 takes 10% off orders over $20, one coupon per order', test:" },
      { type: "ul", items: [
        "Positive — SAVE10 on a $30.00 cart; expect the total to drop to $27.00.",
        "Negative — expired code OLDIE5; expect 'This code has expired.' with the total unchanged.",
        "Negative — SAVE10 on an $18.00 cart; expect the minimum-spend message, not a silent discount.",
        "Negative — save10 in lowercase; expect whatever the rule says, then pin that behavior down in the test notes.",
        "Negative — SAVE10 entered twice; expect the second attempt refused, because the rule allows one coupon per order."
      ] },
      { type: "p", text: "Notice the ratio hiding in those lists: one happy path per rule, then the invalid inputs that rule implies. A suite that is all negative burns hours proving the app rejects junk while never checking that it accepts a real customer's money." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Running only negative cases — this hides whether the feature works for the customers it was built for. Instead, always run the happy path first, so a rejection reads as a decision rather than a bug.",
        "Treating negative testing as random abuse — this hides the structured invalids the written rule implies. Instead, derive inputs from the rule: expired, below minimum, duplicate, wrong format.",
        "Filing a rejection as a bug because you expected acceptance — this hides whether the code is right and your assumption wrong. Instead, check the requirement first, then file.",
        "Reusing the same invalid value everywhere — this hides whole classes of failure beyond 'abc' in every field. Instead, vary it: empty, too long, wrong type, pasted spaces.",
        "Judging only the error message — this hides broken state like a refused coupon that still shows a discounted total. Instead, inspect the app's state after every rejection."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Write the positive case first, then one negative case per rule the requirement states.",
        "Aim for roughly one happy path plus three to five negative cases per field or rule; expand only where bugs keep appearing.",
        "Assert the full state after a negative case: message, totals, button states, and what the Network tab saw.",
        "Keep negative cases in the same suite as positive ones so neither half gets skipped when time is short."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Positive proves valid input succeeds; negative proves invalid input fails politely.",
        "Every written rule implies both a happy path and a rejection path.",
        "All-negative suites waste time; start positive, then attack the rules one by one.",
        "After every rejection, check the app's state, not just the message."
      ] },
      { type: "quote", text: "Rule of thumb: if you have only tested what should work, you have tested half the feature — and users seem to spend their worst days in the other half." }
    ]
  },
  {
    id: "equivalence-boundary-techniques",
    num: "013",
    title: "Equivalence Partitioning and Boundary Value Analysis",
    dek: "'Age must be 18 to 60' is one sentence with six sharp test values hiding in it: 17, 18, 19, 59, 60, 61. Learn the two techniques that find them.",
    date: "2026-04-19",
    read: "4 min",
    category: "Manual Testing",
    difficulty: "intermediate",
    tags: ["equivalence-partitioning", "boundary-value-analysis", "test-design"],
    status: "green",
    body: [
      { type: "p", text: "One line in the spec: 'Age must be between 18 and 60.' Six numbers hide inside that sentence — 17, 18, 19, 59, 60, 61 — and they will find more bugs than a thousand random ages ever will." },
      { type: "p", text: "Equivalence partitioning says inputs behave the same within a group, so you test one member per group instead of all of them. Boundary value analysis says bugs cluster at the edges of those groups, so you test the edges hardest. Together they shrink an infinite input space to a handful of sharp values. It is checking a fence: you do not test every plank, you push on the posts." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Developers write comparisons, and comparisons are where off-by-one bugs live: age > 18 instead of age >= 18 locks out every 18-year-old, and length > 20 instead of >= 20 accepts a 21-character password. Requirements hide the same trap: does 'between 18 and 60' include 60? If the spec does not say, that question is worth asking before you run a single test." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Take the age field: integers only, valid from 18 to 60. Three equivalence classes fall straight out:" },
      { type: "ul", items: [
        "Invalid, too young — anything under 18; represent the whole class with 17 and expect 'You must be 18 or older.'",
        "Valid — 18 through 60; represent it with 35 and expect the profile to save.",
        "Invalid, too old — 61 and above; represent it with 61 and expect the same clear rejection."
      ] },
      { type: "p", text: "Then walk the fences. Six boundary values cover each edge from both sides:" },
      { type: "ul", items: [
        "17 — rejected: just outside the lower edge.",
        "18 — accepted: the first valid value, exactly where age > 18 would break.",
        "19 — accepted: the first value safely inside.",
        "59 — accepted: the last value safely inside.",
        "60 — accepted: the last valid value, if 'between' includes it as it should.",
        "61 — rejected: just outside the upper edge."
      ] },
      { type: "p", text: "Passwords repeat the pattern with no new thinking required. If the rule is 8 to 20 characters, the classes are under 8, 8 through 20, and over 20, and the boundaries are:" },
      { type: "ul", items: [
        "7 characters — rejected, with the length rule named in the error.",
        "8 characters — accepted: the minimum works.",
        "20 characters — accepted: the maximum works.",
        "21 characters — rejected, not silently truncated to fit.",
        "1 and 100 characters — a quick sweep of the extremes to see how the field copes."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Testing the middle of the range, age 30 for 18 to 60 — this hides the off-by-one bugs that live only at the edges. Instead, spend the clicks on 17, 18, 60, and 61.",
        "Guessing inclusivity — this hides whether 60 is valid, the exact question the code got wrong. Instead, confirm each endpoint before you write the expected result.",
        "Forcing boundary analysis onto every field — this hides the fact that a country dropdown has no 18-60. Instead, match technique to input: ranges get boundaries, lists get representatives, free text gets size and type checks.",
        "Changing two inputs in one case — this hides which of them caused the failure. Instead, vary one thing per case.",
        "Stopping at how much and ignoring what kind — this hides type failures like 'abc' or 2.5 in a numeric field. Instead, pair the numeric sweep with a few wrong-type probes."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Put the value in the case title: 'TC-AGE-004: age 61 rejected' beats 'old age check' every time a triage person reads it.",
        "Memorize the pattern: any range X to Y hands you six values — X-1, X, X+1, Y-1, Y, Y+1.",
        "Ask about every edge in the story review: is it included, and what should happen exactly on it?",
        "Keep a partition table in the test document so reviewers can see your coverage math, not just your cases."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Partitions decide which values to test; boundaries decide where the bugs actually live.",
        "Every range hides six sharp values: one below, on, and above each edge.",
        "Off-by-one mistakes — >= written as > — are the most common edge bug in real code.",
        "When the spec says 'between', ask whether the endpoints are included."
      ] },
      { type: "quote", text: "Interview tip: for any 'test this field' question, say 'I would partition first, then hit boundaries — for 18 to 60 that means 17, 18, 60, 61, plus one mid-range value.' That sentence separates juniors from hires." }
    ]
  },
  {
    id: "decision-tables-state-transition",
    num: "014",
    title: "Decision Tables and State Transition Testing",
    dek: "Eight combinations of member, coupon, and order size collapse to six rules worth testing — and a shipped order must refuse Cancel. Tables and maps beat guesswork.",
    date: "2026-04-21",
    read: "5 min",
    category: "Manual Testing",
    difficulty: "intermediate",
    tags: ["decision-tables", "state-transition", "test-design"],
    status: "green",
    body: [
      { type: "p", text: "A customer cancelled an order at 11 p.m. — after the parcel was already on the truck. The warehouse picked it anyway, support refunded goods that got delivered the next morning, and the root cause was one missing rule: Cancel should only work before shipping. Flow bugs like that are what state transition testing exists to catch." },
      { type: "p", text: "Two techniques handle rule-heavy software. A decision table lists every combination of conditions and the action each combination triggers, so combinations cannot sneak past untested. A state transition map lists the states a thing can occupy and which moves between them are legal. Think of a board game: the table is the scoring rules, the map is which squares you may move to from where." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Combinations and flows are where requirements go quiet: 'test the discount' says nothing about member plus coupon plus a big order at once. A table forces the question 'what happens when all three are true?' A map forces 'can you cancel a shipped order?' Both answers are usually written nowhere until a tester asks in a bug report — or a customer asks in a refund claim." },
      { type: "h", text: "In practice" },
      { type: "p", text: "First, the table. The store's rules: members get 5% off any order; the coupon SAVE10 gives 10% off but only on orders over $50; member discount and coupon stack. Three yes-or-no conditions make 2 x 2 x 2 = 8 columns:" },
      { type: "ul", items: [
        "Member Y, coupon Y, over $50 Y — 15% off: both stack.",
        "Member Y, coupon Y, over $50 N — 5% off, and the coupon is refused with the minimum-spend message.",
        "Member Y, coupon N, over $50 Y — 5% off.",
        "Member Y, coupon N, over $50 N — 5% off.",
        "Member N, coupon Y, over $50 Y — 10% off.",
        "Member N, coupon Y, over $50 N — no discount; the coupon is refused.",
        "Member N, coupon N, over $50 Y — no discount.",
        "Member N, coupon N, over $50 N — no discount."
      ] },
      { type: "p", text: "Now collapse it. With no coupon and no membership, order size changes nothing, so columns 7 and 8 are one rule. A member without a coupon gets 5% regardless of size, so columns 3 and 4 merge too. Eight columns become six distinct behaviors — and 'order size' stops stealing test time where it cannot matter." },
      { type: "h", text: "State transition: the order lifecycle" },
      { type: "p", text: "Tables handle combinations; maps handle flows. The order's states are Placed, Paid, Shipped, Delivered, and Cancelled, and the legal moves imply the tests:" },
      { type: "ul", items: [
        "Placed to Paid on successful payment; Placed to Cancelled while nothing has been paid.",
        "Paid to Shipped when the warehouse scans the parcel; Paid to Cancelled only before that scan.",
        "Shipped to Delivered on the courier's final scan — and from here on, Cancel must be refused.",
        "Delivered is a dead end: no moves out of it on this map.",
        "Forbidden moves to test: cancel a Shipped order, deliver an order that is only Placed, pay an already-Paid order twice.",
        "Each forbidden move should be refused with a plain reason and the state unchanged — the exact check the 11 p.m. story was missing."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Building the table with vague conditions like 'big order' — this hides the exact threshold the code implements. Instead, copy 'over $50' straight from the requirement into the column headers.",
        "Testing all 2^N combinations when several are identical — this hides the collapse that turns 64 columns into ten real behaviors. Instead, merge identical outcomes and test distinct rules.",
        "Mapping legal paths and never probing illegal ones — this hides the transitions developers never handled. Instead, spend most of the effort on moves that should be impossible.",
        "Letting Cancelled be reachable from anywhere — this hides the rule that shipped orders cannot be cancelled, the exact 11 p.m. bug. Instead, list allowed source states for every action and test one forbidden source.",
        "Skipping the table because the spec is silent — this hides the fact that the silence itself is the finding. Instead, draft the table in story review and let the team argue with it."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Write conditions as questions (member? coupon? over $50?) and actions as concrete outcomes (percentage, message, state).",
        "Keep tables small: past four conditions, split the table or lean on collapsing rules.",
        "Mark a start state and dead-end states on every transition map.",
        "Turn each production incident about a wrong state or combination into a permanent column or transition check."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Decision tables test combinations; state maps test flows.",
        "2^N columns collapse fast: test distinct outcomes, not raw combinations.",
        "The most valuable transition tests are the moves that should be impossible.",
        "Both techniques convert silent requirements into questions you can ask early."
      ] },
      { type: "quote", text: "Rule of thumb: if the feature's rules contain an 'and' — members and coupons and big orders — it wants a decision table; if it has a life story — placed, paid, shipped — it wants a state map." }
    ]
  },
  {
    id: "exploratory-testing-charters",
    num: "015",
    title: "Exploratory Testing: Structure for Unscripted Testing",
    dek: "'Explore the password reset flow for loopholes with expired and reused links' — one charter sentence, a 60-minute timer, and timestamped notes turn clicking into coverage.",
    date: "2026-04-22",
    read: "4 min",
    category: "Manual Testing",
    difficulty: "beginner",
    tags: ["exploratory-testing", "session-based-testing", "charters"],
    status: "green",
    body: [
      { type: "p", text: "Almost every tester's first attempt at exploratory testing looks the same: click around for an hour, find nothing, remember even less. The mistake is not the clicking — it is exploring without a charter, a timer, or notes, then being unable to say what was covered." },
      { type: "p", text: "Exploratory testing means designing and running tests at the same time: you learn the feature, chase whatever looks risky, and document as you go. The structure that keeps it honest is session-based test management — a charter states the target and the risk, a timebox bounds the effort, and a debrief turns notes into decisions. Picture a chef tasting the dish while cooking: freer than the recipe, but with a goal and a clock." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Scripts only find bugs someone predicted. Exploration finds the rest — the sequence nobody wrote a case for, the interaction between two brand-new features, the timing bug that shows up on the third retry. Real teams lean on it when a feature is too fresh for cases, when specs are thin, and in the bug bash before a release." },
      { type: "h", text: "In practice" },
      { type: "p", text: "A charter is one sentence with three slots: Explore [target] for [risk], using [tools or data]. Our example for this session: 'Explore the password reset flow for loopholes, using expired, reused, and tampered reset links. Timebox: 60 minutes.' Here is the session's note file, timestamps included:" },
      { type: "ul", items: [
        "00:05 — Requested a reset link for qa.tester@mailbox.dev; the email lands in 40 seconds, and the link carries a 32-character token.",
        "00:12 — With the developer's help, backdated the token 72 hours; the link now says 'This link has expired.' Expected behavior confirmed.",
        "00:20 — Completed a reset, then reused the same link; the second use is refused. Good.",
        "00:31 — Flipped one character in the token; refused. Requested a link for account A, swapped the receiving email to account B in flight — the link still reset account B. BUG-412 filed with screenshots.",
        "00:47 — Fired five reset requests in a minute; no rate limit, and the inbox flooded. Logged as a risk, not yet a bug.",
        "01:00 — Timer ends. Debrief: six notes, two bugs, coverage of expired, reused, and tampered tokens; rate limiting left for a follow-up charter."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Write the charter before touching the app: target, risk, tools, timebox.",
        "Set a real timer for 60 to 90 minutes and honor it.",
        "Test freely, but timestamp every note as it happens — memory lies by the afternoon.",
        "Screenshot the moment something looks wrong; you will need it for the report.",
        "When the timer ends, stop mid-thought and park unfinished threads in the notes.",
        "Debrief for ten minutes: what was covered, what was found, what deserves another charter."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Calling unstructured clicking 'exploratory' — this hides the difference ad-hoc cannot show: target, timebox, and coverage anyone can audit. Instead, write the charter first; one sentence sharpens the whole hour.",
        "Skipping notes because you will remember — this hides your evidence; by the debrief you have six vibes and zero facts. Instead, timestamp notes as they happen.",
        "Working without a timebox — this hides the session's endpoint, and exploration expands to fill the day. Instead, run 60 to 90 minutes, then stop, even mid-thread.",
        "Skipping the debrief — this hides what you covered and found from the only people who can act on it. Instead, spend ten minutes walking the team through the notes.",
        "Turning the charter into a script halfway through — this hides the freeform chasing that finds unpredicted bugs. Instead, keep the charter a direction, never a route."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a backlog of charters per feature, and pull one whenever a slot opens between scripted suites.",
        "Split big targets: 'password reset' becomes separate charters for tokens, timing, and cross-account tricks.",
        "File bugs during the session, with the charter name in the report so patterns show up later.",
        "Summarize coverage in three buckets: what was tested, what was noticed, what was left untouched."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A charter is target plus risk plus tools, in one sentence.",
        "A 60 to 90 minute timebox is what makes exploration reportable.",
        "Timestamped notes plus a debrief turn an hour of clicking into evidence.",
        "Exploratory is not the opposite of structured; the charter is the structure."
      ] },
      { type: "quote", text: "Interview tip: asked whether exploratory testing is just ad-hoc clicking, answer 'no — charter, timebox, notes, debrief,' and offer the password-reset session as your example." }
    ]
  }
];
