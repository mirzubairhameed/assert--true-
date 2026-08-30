import type { Post } from "../post-types";

export const MANUAL_B: Post[] = [
  {
    id: "smoke-testing-explained",
    num: "016",
    title: "Smoke Testing: Should You Even Test This Build?",
    dek: "Build 4.7.2-rc1 lands at 9 a.m. and your deadline is Friday. Fifteen to twenty-five smoke checks in twenty minutes decide whether the build deserves deep-testing hours.",
    date: "2026-04-23",
    read: "4 min",
    category: "Manual Testing",
    difficulty: "beginner",
    tags: ["smoke-testing", "build-acceptance", "checklists"],
    status: "green",
    body: [
      { type: "p", text: "9:12 a.m. The mobile team drops build 4.7.2-rc1 into the release channel with the note 'tax fix included.' You have six hours of testing booked on this build today. Before spending any of them, you owe the build twenty minutes of smoke." },
      { type: "p", text: "Smoke testing — also called build acceptance testing — is a short, wide, shallow pass across the most critical paths, run on every new build, to answer one question: is this build worth testing at all? The name comes from hardware: power on a fresh circuit board, and if smoke rises, skip the detailed diagnostics. Fifteen to twenty-five checks, fifteen to thirty minutes, the same list every time." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "A build with a dead login wastes everything run after it. The smoke pass catches that in minute four instead of hour three, keeps the word 'tested' meaningful inside the team, and hands you evidence to reject a build without politics. Teams that skip smoke routinely spend entire afternoons deep-testing a build that could not even open a cart." },
      { type: "h", text: "In practice" },
      { type: "p", text: "A smoke checklist touches every critical surface once — never deeply. For the food-delivery app, here are the first checks of its 18-item list:" },
      { type: "ul", items: [
        "App launches on both supported devices; splash to home in under 5 seconds.",
        "Settings shows version 4.7.2-rc1, matching the tag posted in the channel.",
        "Login works with the standard account qa.tester@mailbox.dev; logout returns to the login screen.",
        "One order end-to-end: add a dish to the cart, pay with the sandbox card, receive a confirmation number.",
        "The home feed scrolls twenty screens with no crash, freeze, or blank tiles.",
        "Search for 'sushi' returns results; tapping one opens the restaurant page.",
        "Force-quit the app mid-checkout and reopen; the cart is still there.",
        "Airplane mode on: a friendly offline message appears, never a white screen.",
        "Images and icons render on home and menu screens; no overlapping layout.",
        "The build's two claimed fixes — tax total and a payment-screen crash — spot-check green.",
        "Console shows no crash logs for the entire pass."
      ] },
      { type: "p", text: "Suppose smoke dies at check four: payment errors out for every card. You post to the channel: 'Smoke on 4.7.2-rc1: 13 of 18 checks passed. Blocking: checkout fails for all payment methods — screenshots and console log attached. The tax fix itself verified green. Rejecting this build; ready to rerun the moment 4.7.2-rc2 lands.' Two sentences of fact, attached evidence, nobody's weekend disturbed. That is what a smoke result is for." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Letting the smoke list swell to 60 checks — this hides the 20-minute pass inside a second regression suite nobody runs. Instead, 15 to 25 checks in 15 to 30 minutes, hard limit.",
        "Going deep before smoke passes — this hides the waste; an hour on the tax fix inside a build whose login is dead is an hour gone. Instead, smoke first, deep second.",
        "Skipping smoke on 'small' builds — this hides the fact that small diffs have taken down login screens before. Instead, every build gets the list, even rc2 landing fifteen minutes later.",
        "Running smoke from memory — this hides the drift that shrinks coverage a little every week. Instead, keep the checklist in the wiki and update it when a critical flow changes.",
        "Reporting 'it seems mostly fine' — this hides the count and evidence a rejection decision needs. Instead, post passed, blocked, and the attachments."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Order the checks so the cheapest ones cover the most: launch, login, one core transaction, done.",
        "End the list with the specific fixes claimed in the build notes, every single time.",
        "Post results in a fixed format so the team can compare builds at a glance.",
        "Reject only for crashes or a dead critical flow; minor visual issues go to the bug backlog with the build number attached."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Smoke answers 'is this build testable?' in 15 to 30 minutes.",
        "15 to 25 checks, wide and shallow, the same list on every build.",
        "Reject with a count and evidence, never with adjectives.",
        "Smoke before deep work, every build, including the small ones."
      ] },
      { type: "quote", text: "Interview tip: asked what you test first when a build is late and the release is tomorrow, start with the smoke pass and its exact contents — 'everything important' is the answer that ends interviews." }
    ]
  },
  {
    id: "sanity-testing-vs-smoke",
    num: "017",
    title: "Sanity Testing: The Quick Confidence Check",
    dek: "A one-line coupon fix lands at 4:40 p.m. A ten-minute sanity pass — six checks on the coupon flow — proves the fix works without rerunning two hundred regression cases.",
    date: "2026-04-25",
    read: "4 min",
    category: "Manual Testing",
    difficulty: "beginner",
    tags: ["sanity-testing", "smoke-testing", "regression-testing"],
    status: "green",
    body: [
      { type: "p", text: "A developer fixes the coupon bug at 4:40 p.m. and the new build lands at 5:00. Do you rerun two hundred regression cases, or shake hands and go home? Neither — you run a sanity pass, and it takes ten minutes." },
      { type: "p", text: "Sanity testing is a narrow, quick check of the changed module after a small fix: does the fix work, and did it obviously disturb its neighbors? It sits between two bigger nets. Smoke is wide and shallow across the whole build; regression is broad and thorough across everything a change could touch. Sanity is the focused middle: the cabinet was repaired, so check that cabinet and the drawer beside it — not the whole house." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Full regression after every one-line fix is impossible: the suite takes a day, the fix took an hour. No testing at all is how a coupon fix ships with the totals row happily showing a negative discount. Sanity is the honest middle that stops small changes from getting a free pass — and it fits inside a coffee break." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The bug read 'coupon code SAVE10 rejected on Android.' The fix note says coupon validation now trims whitespace and accepts lowercase. Sanity the coupon flow only:" },
      { type: "ul", items: [
        "SAVE10 on a $30.00 cart — accepted, and the total drops to $27.00.",
        "save10 lowercase, and ' SAVE10 ' padded with spaces — both accepted; this is what the fix changed.",
        "EXPIRED5 — still rejected with the expired message; the fix did not open the door to dead codes.",
        "Apply SAVE10, then remove it — the total returns to $30.00 and the input clears.",
        "SAVE10 stacked with the member discount — both apply and the math adds up.",
        "One glance at a coupon-free cart — the totals row looks untouched."
      ] },
      { type: "p", text: "Six checks, ten minutes, and the fix has proof. The screenshot of the $27.00 total goes into the ticket as verification evidence." },
      { type: "p", text: "Keep the three words straight — each answers a different question:" },
      { type: "ul", items: [
        "Smoke — wide and shallow, whole build, 15 to 30 minutes, every new build. Question answered: is this build testable at all?",
        "Sanity — narrow and slightly deeper, changed module only, about 10 to 15 minutes, after a small fix. Question answered: does the fix work, and did it disturb its neighborhood?",
        "Regression — broad and thorough, everything affected, hours. Question answered: did this change break anything that already worked? Runs before release, after major changes, or nightly.",
        "The escalations matter too: a failed smoke rejects the build; a failed sanity pulls in the regression suite; a failed regression postpones the release or triggers a fix."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Using 'smoke' and 'sanity' as synonyms in standup — this hides which gate actually failed once the words blur. Instead, agree on the definitions and say which one you ran.",
        "Sanity checking only the fixed line — this hides breakage in the totals component that shares the coupon code. Instead, always include the immediate neighbors.",
        "Skipping sanity because the fix is trivial — this hides the checkout totals that 'trivial' fixes have broken more than once. Instead, ten minutes, every time.",
        "Rerunning full regression when sanity would do — this hides the ten-minute answer inside a day-long run. Instead, escalate to regression only when sanity finds trouble or the change is structural.",
        "Leaving no evidence — this hides whether the pass ever happened; 'sanity passed' is a rumor. Instead, attach the screenshot and the build number to the ticket."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a one-page sanity list per module so the pass takes minutes, not improvisation.",
        "Read the fix diff or ask the developer what else the change touched before choosing checks.",
        "Timebox 10 to 15 minutes and record pass or fail per check.",
        "If sanity finds anything, stop and pull the impacted-area regression suite instead of arguing with the result."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Sanity is narrow and quick: does the fix work, and did it break its neighbors?",
        "Smoke is wide and shallow; sanity is narrow and focused; regression is broad and deep.",
        "Every fix earns at least a sanity pass — small diffs get no free ride.",
        "A failed sanity is a trigger for regression, not a verdict to debate."
      ] },
      { type: "quote", text: "Rule of thumb: smoke asks 'can we test this build?', sanity asks 'does the fix hold?', regression asks 'what else did we break?' — three questions, three sizes of net." }
    ]
  },
  {
    id: "regression-testing-guide",
    num: "018",
    title: "Regression Testing: Protecting What Already Works",
    dek: "Sales tax changed from 7% to 7.5%, and the invoice PDF printed wrong totals for two weeks — the report nobody retested. Regression testing exists so it never repeats.",
    date: "2026-04-27",
    read: "4 min",
    category: "Manual Testing",
    difficulty: "beginner",
    tags: ["regression-testing", "test-suite", "release-testing"],
    status: "green",
    body: [
      { type: "p", text: "The change looked harmless: sales tax moves from 7% to 7.5% in one config line. Two weeks later finance calls — every invoice PDF still printed the old total, because the PDF generator kept its own rounding and nobody retested a 'report.' The tax fix worked; the invoice died quietly. That gap is exactly what regression testing exists to close." },
      { type: "p", text: "Regression testing means rerunning existing tests after a change to confirm the old behavior still holds. You are not testing the new code — you are testing everything the new code could have disturbed. It is renovating one room and then checking the whole floor's power and water, because walls hide pipes you cannot see." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Code is interconnected: one config line touched checkout totals, the refund email, the CSV export, and a PDF nobody had opened since spring. Users forgive a missing new feature; they do not forgive a feature that used to work. Regression testing is how a team keeps yesterday's promises while shipping today's." },
      { type: "h", text: "In practice" },
      { type: "p", text: "You cannot rerun 3,000 cases after every commit, so choose the suite deliberately. Three sizes, largest first:" },
      { type: "ul", items: [
        "Full regression — every case in the library. Reserve it for release candidates, framework or SDK upgrades, and anything touching shared core code. It is expensive, so schedule it instead of improvising it.",
        "Impacted-area regression — the modules the change touches plus their direct neighbors. The tax change pulls in checkout totals, the invoice PDF, the refund email, the CSV export, and order history. This is the weekday default.",
        "Risk-based regression — when time is short, rank features by usage times damage: login, cart, checkout, and payments get full passes while settings pages get spot checks. Shallow coverage everywhere is worse than deep coverage on what hurts.",
        "Feed the suite from history: every bug that ever escaped becomes a permanent regression case. The invoice PDF case exists now, and it runs forever."
      ] },
      { type: "h", text: "When to run it" },
      { type: "ul", items: [
        "Per release candidate — full or risk-based, before the build reaches anyone outside the team.",
        "Per merge to main — the impacted-area suite in CI, so breakage is caught the day it lands.",
        "Nightly — the full suite on a schedule when per-merge runs would take longer than the day has.",
        "After every production hotfix — the area the hotfix touched, before anyone exhales.",
        "Before handing a build to another team — nothing burns trust like UAT finding yesterday's bug."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Declaring a change too small for regression — this hides the blast radius; a 0.5% tax change broke a PDF. Instead, size the suite by what the change touches, not by diff lines.",
        "Letting the suite rot — this hides real failures inside noise from features deleted last year. Instead, prune quarterly; a red result must always mean something.",
        "Rerunning only the feature you changed — this hides the neighbors where the bug actually lives: PDF, export, email. Instead, always include the modules the change feeds.",
        "Keeping regression manual-only — this hides the suite behind deadline pressure, and a two-day manual run gets skipped. Instead, automate the stable core and save humans for the fiddly parts.",
        "Living with flaky tests — this hides genuine red inside random red until nobody trusts the suite. Instead, fix or quarantine flakes the same week."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Tag every case by module so an impacted-area pull takes minutes, not archaeology.",
        "Make a green suite a team rule: any failure gets investigated the day it appears.",
        "Track suite runtime; once regression outgrows a day, split it into tiers that can run separately.",
        "Pair regression with a smoke gate so hours are never spent deep-testing a dead build."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Regression protects existing behavior; new features get their own fresh cases.",
        "Choose the suite deliberately: full, impacted-area, or risk-based.",
        "Every escaped bug becomes a permanent regression case.",
        "Run it per release, per merge, or nightly — always on purpose, never with leftover time."
      ] },
      { type: "quote", text: "Interview tip: 'What would you regression test after a tax-rate change?' is a real question. Answer 'checkout totals, invoice PDF, refund email, exports — impacted area first, risk-ranked' and watch the interviewer relax." }
    ]
  },
  {
    id: "retesting-vs-regression",
    num: "019",
    title: "Retesting vs Regression Testing: Close the Loop",
    dek: "QA-101 moves to Ready for testing at 2 p.m. Retest the bug with the original steps, then run the checkout regression — two different questions, two written verdicts.",
    date: "2026-04-28",
    read: "4 min",
    category: "Manual Testing",
    difficulty: "beginner",
    tags: ["retesting", "regression-testing", "bug-life-cycle"],
    status: "green",
    body: [
      { type: "p", text: "Tuesday, 2:00 p.m. Ticket QA-101 — 'discount applied twice when the coupon is entered twice' — moves to Ready for testing, and the developer's note says the coupon now deactivates after its first use. What you do in the next forty minutes is two separate jobs, and mixing them up is how bad releases happen." },
      { type: "p", text: "Retesting checks that this bug is fixed: rerun the exact case that failed, with the original data, and look for the expected result. Regression checks that the fix broke nothing else: rerun the neighborhood the change touched. The dentist fills the one cavity and then taps the teeth beside it — the first is retesting, the second is regression. Different questions, different cases, different verdicts." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Conflate the two and tickets close on a developer's screenshot without anyone running the case — or entire suites rerun for fixes that needed six checks. The tracker's status flow depends on the split: retest passes, the bug moves to Verified and then Closed; retest fails, it goes straight back to Reopened with evidence. Regression results, meanwhile, belong to the release, not to the ticket." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Here is the Tuesday timeline, done properly — retest first, then regression, both on build 4.7.3:" },
      { type: "ul", items: [
        "2:00 p.m. — QA-101 moves to Ready for testing; the fix note says the coupon code deactivates after first use.",
        "2:05 — Retest: rerun the original failing case exactly — a $40.00 cart, enter SAVE10, enter SAVE10 again. Expected: the second entry refused with 'Coupon already applied.' Pass.",
        "2:10 — Retest the edge the fix implies: enter SAVE10, remove it, re-enter. Expected: accepted once, refused on the duplicate. Pass — screenshot into the ticket, QA-101 moves to Verified.",
        "2:15 — Regression: the checkout neighborhood the fix touched — expired codes still rejected, removing a coupon restores the total, two different coupons cannot stack, the confirmation email shows the discount once.",
        "2:40 — Regression finds one failure: removing SAVE10 leaves the discounted line total in place. New bug QA-140, linked to QA-101, filed with steps and a screenshot.",
        "Outcome: the retest answered 'is the bug fixed?' — yes. The regression answered 'did the fix break anything else?' — also yes, one thing. Both answers now exist in writing, on two different tickets."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Marking a bug Verified from the developer's screenshot — this hides the difference between a claim and a test. Instead, run the original case yourself on the fixed build.",
        "Retesting with brand-new data — this hides whether the reported defect actually closed; the bug reproduced with a $40.00 cart and SAVE10. Instead, replay the original steps first, then add edges the fix created.",
        "Skipping regression because the fix looks tiny — this hides the neighbors the change touched; coupon validation sits beside the totals component. Instead, give the neighborhood a pass every time.",
        "Reopening the ticket for a different bug found during regression — this hides two separate histories in one messy record. Instead, file a new bug, link it, and keep the statuses honest.",
        "Doing all of this silently — this hides whether verification ever happened; an unverifiable 'fixed' is a rumor with a status. Instead, comment the retest result and regression scope in the ticket."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Retest with the original steps and data first, then one or two edges the fix created.",
        "Attach evidence — screenshot or console log — to the Verified comment.",
        "Keep a small ready-made regression pack per module so the neighborhood check takes minutes.",
        "Agree with the team on the status words — Fixed, Verified, Closed, Reopened — and on who is allowed to move each one."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Retesting asks 'is this bug fixed?'; regression asks 'did the fix break anything else?'",
        "The retest result lives on the ticket; regression results live on the release.",
        "Retest passes: Verified, then Closed. Retest fails: Reopened with evidence.",
        "A fix is not done until both questions have written answers."
      ] },
      { type: "quote", text: "Interview tip: 'What is the difference between retesting and regression testing?' is a top-three manual QA question. Answer with the two questions each one asks, then the Tuesday ticket as your example." }
    ]
  }
];
