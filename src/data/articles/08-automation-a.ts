import type { Post } from "../post-types";

export const AUTOMATION_A: Post[] = [
  {
    id: "what-is-test-automation",
    num: "061",
    title: "What Is Test Automation? What to Automate, What to Leave Alone",
    dek: "Scripts can click, fill, and verify a checkout every night without a human. Here is how to decide what deserves automation and what to keep testing by hand.",
    date: "2026-06-30",
    read: "5 min",
    category: "Automation",
    difficulty: "beginner",
    tags: ["test-automation", "automation-roi", "regression"],
    status: "green",
    body: [
      { type: "p", text: "Ninth release of the quarter, and the checklist has not changed: log in, search a product, add it to the cart, pay with a test card, confirm the order screen. Forty minutes of careful clicking, every single time, done by whichever tester is free. The steps never vary — only the build does." },
      { type: "p", text: "Test automation is code that runs those steps for you: it opens a browser, fills the form, clicks the button, and checks the result the same way on every run. Picture a patient robot with a photographic memory — it never gets bored, never skips a step, and never misremembers the expected result. What it cannot do is look at a screen and feel that something seems off. That judgment stays with you." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without a deliberate filter, teams automate badly: they record every flow they can click, spend months maintaining scripts for screens that change weekly, and still ship bugs the suite never noticed. The value of automation is not the number of tests — it is the hours of human attention returned every week. A suite that saves four hours per release while demanding six hours of script repair is a cost center wearing a test suite's badge." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The filter that works is return on investment. Estimate what a flow costs to build and to maintain, estimate the hours it saves per month, and automate only when the second number clearly wins. Run every candidate through the same pairs:" },
      { type: "ul", items: [
        "Automate the login smoke check that gates every build. Leave manual the first-time sign-in with Google on a brand-new device — consent screens change without warning.",
        "Automate the checkout happy path with a test card, every night. Leave manual the judgment call of whether the confirmation page feels trustworthy.",
        "Automate data-heavy checks — fifty rows render in the orders table and totals match the API. Leave manual the exploratory passes where you do not know the expected result until you see it.",
        "Automate form validation rules: empty email, bad email, short password. Leave alone the one-off migration check you will never run again.",
        "Automate stable screens that have not changed in months. Leave alone the redesigned dashboard still moving weekly under the designers' hands.",
        "Automate flows where a missed regression costs money: payment, refunds, password reset. Leave alone flows a human tests faster than the script takes to write."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "List the checks you personally repeat every release and mark the ones with identical steps each time.",
        "Score each candidate: hours it eats per month, how stable the screen is, how costly a missed bug would be.",
        "Pick one high-value, stable, boring flow — login or checkout smoke — and automate exactly that.",
        "Run it on every build for two weeks and record both the time it saved and the time it demanded.",
        "Add the next flow only after the first has run green without babysitting.",
        "Review the list quarterly and retire scripts for flows that stopped earning their keep."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Automating everything that can be clicked — maintenance eats every hour saved. Instead, automate stable, repetitive, high-value flows and keep the rest manual.",
        "Recording a script and shipping it the same day — recorded selectors break at the first redesign. Instead, rewrite each step with deliberate locators before merging.",
        "Chasing 100 percent automation — usability, exploratory, and visual judgment stay human. Instead, target the regression pack, not the entire test strategy.",
        "Measuring success by test count — nine hundred flaky tests are worse than forty reliable ones. Instead, measure hours saved and how often people trust the results.",
        "Automating a feature while it still changes weekly — you rewrite the script three times before the feature settles. Instead, test it manually while it moves and automate once it holds."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a written 'do not automate' list with reasons; it ends the same debate every sprint.",
        "Prefer flows you would run as a smoke pack on every build — they pay rent fastest.",
        "Re-run the ROI math when a flow starts changing often; automation decisions have expiry dates.",
        "Pair every automated area with a manual exploratory pass so judgment stays sharp.",
        "Track maintenance time next to run time; a script's real price is both added together."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Automation is a robot for repetitive, stable, high-value checks — not a replacement for a tester.",
        "The filter is ROI: build and maintenance cost versus hours returned.",
        "Exploratory, one-off, fast-changing, and usability checks stay human.",
        "A small trusted suite beats a large flaky one every time."
      ] },
      { type: "quote", text: "Interview tip: when asked what you would automate first, answer 'stable, repetitive, high-value — login and checkout smoke' and then name what you would never automate; the second half is the part interviewers remember." }
    ]
  },
  {
    id: "locators-that-dont-break",
    num: "062",
    title: "Locators That Do Not Break: IDs, Roles, CSS, and XPath",
    dek: "The locator priority ladder that survives redesigns: data-testid and aria-label first, role plus name second, stable id third — and why absolute XPath and generated ids always die.",
    date: "2026-07-02",
    read: "4 min",
    category: "Automation",
    difficulty: "beginner",
    tags: ["locators", "css-selectors", "xpath"],
    status: "green",
    body: [
      { type: "p", text: "Why did thirty tests fail the morning after a redesign that changed no behavior at all? The developers renamed CSS classes, and the tests were finding the Pay button through class names like btn-primary-v2. The app worked fine; the tests' addresses simply stopped matching." },
      { type: "p", text: "A locator is how a script addresses one element on the page — by test id, role, name, id, class, or position. Finding a person works the same way: 'my brother Aadil' is a stable address, while 'the tall man third from the left in last year's photo' fails at the next group picture. Suites built on positions and generated names fail the same way, and in bulk." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Locator drift is the leading cause of false failures in UI automation: the app is fine, the address is stale, and the suite cries wolf until nobody reads it. Absolute XPath like //div[2]/span[3] dies the moment a developer adds one wrapper div. Auto-generated ids like css-1x2y3z change on every rebuild. Every locator you write is a promise to maintain, so choose addresses that survive normal design work." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Teams that keep suites green agree on a priority ladder and review new tests against it:" },
      { type: "ul", items: [
        "First: dedicated test hooks — data-testid='cart-total' or aria-label='Search products'. They exist to be found, are invisible to users, and change only when someone means to change them.",
        "Second: role plus accessible name — getByRole('button', { name: 'Pay now' }). You are asking the way a screen reader asks, so every such locator doubles as an accessibility check.",
        "Third: a stable, human-written id — id='order-confirm-dialog'. Authored with intent, usually safe.",
        "Fourth: a CSS class combination such as '.checkout-summary .order-total', and only for markup that has been stable for months.",
        "Last resort: XPath, text-anchored if at all — //button[normalize-space()='Pay now'] — never position-based."
      ] },
      { type: "p", text: "The same four addresses in code, with one bad neighbor for contrast:" },
      { type: "code", lang: "ts", label: "e2e/cart.spec.ts", code: `// Good: dedicated test hook — survives any layout change
await page.getByTestId('cart-total');

// Good: role + accessible name — reads like a user would
await page.getByRole('button', { name: 'Pay now' });

// Good: stable, human-written id
await page.locator('#order-confirm-dialog');

// Bad: position-based XPath — dies when one wrapper div is added
// await page.locator('//div[2]/span[3]/button');` },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Right-click the element, choose Inspect, and read the surrounding markup before writing any locator.",
        "Search the DOM for a data-testid; if it is missing, file a ticket to add one instead of reaching for XPath.",
        "Prefer getByRole with the name a user actually sees, and confirm the match is unique before building on it.",
        "Paste the locator into a one-line test and run it in isolation before attaching logic to it.",
        "Ban position-based XPath and generated class names in code review — both are known debt.",
        "When a locator breaks, repair its meaning (role, name, test id), never its position."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Keeping whatever the recorder emitted — recorders love //div[2]/span[3]. Instead, rewrite every locator by hand before merging.",
        "Trusting generated classes like css-1x2y3z — the build regenerates them per deploy. Instead, hook onto test ids or roles.",
        "Locating by visible text alone on marketing pages — 'Buy now' becomes 'Get yours' next sprint. Instead, ask for a data-testid wherever copy changes often.",
        "Duplicating one fragile locator across twelve files — one redesign becomes a twelve-file fix. Instead, keep locators in page objects so the fix lands once.",
        "Assuming uniqueness without checking — a second hidden match makes strict mode throw at the worst moment. Instead, verify the match count while you develop."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Make data-testid part of the definition of done for any component an automated test touches.",
        "Prefer role-based locators even when test ids exist — stability and accessibility in one line.",
        "Publish the priority ladder in the team README and review new tests against it.",
        "Search the suite each sprint for locator strings starting with '//'; every hit is debt with a deadline.",
        "When a test id and a role both fit, prefer the role — it keeps working even if the attribute is dropped later."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A locator is an address; choose addresses that survive redesigns.",
        "Priority: data-testid and aria-label, then role plus name, then stable id, then CSS, XPath last.",
        "Absolute XPath and auto-generated ids are the two fastest routes to a flaky suite.",
        "Role-based locators check accessibility and stability at the same time."
      ] },
      { type: "quote", text: "Rule of thumb: a good locator answers 'what is this element for?'; a bad one answers 'where does it happen to sit today?'" }
    ]
  },
  {
    id: "waits-explained",
    num: "063",
    title: "Waits: Why Sleep Ruins Tests (and What to Use Instead)",
    dek: "A hardcoded sleep is a race: too short is flaky, too long is slow. Implicit waits, explicit waits, and the auto-waiting that makes most fixed pauses obsolete.",
    date: "2026-07-03",
    read: "4 min",
    category: "Automation",
    difficulty: "beginner",
    tags: ["waits", "flaky-tests", "playwright"],
    status: "green",
    body: [
      { type: "p", text: "Three seconds. A developer measured the checkout spinner once — fast laptop, empty staging server — and hardcoded sleep(3) after the click. On the day the API takes four seconds, the test fails; on the two hundred days it takes half a second, the test wastes two and a half seconds every single run." },
      { type: "p", text: "A fixed sleep is a race: you are betting the app finishes inside your guess. Waiting for a kettle is the better model — either count to thirty blind, or watch for the click that says it is done. Automation has names for both approaches: sleeps are the blind count, and condition-based waits watch for the state you actually care about." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Too short, and the suite flakes: the toast has not rendered, the row has not loaded, the test fails, and nobody trusts red anymore. Too long, and the suite crawls: two hundred tests padding three unnecessary seconds each burn ten extra minutes per run, every run. Race conditions produce the worst kind of failure — intermittent, environment-dependent, and blamed on everything except the sleep." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Three wait mechanisms cover everything a beginner needs:" },
      { type: "ul", items: [
        "Implicit wait — a global default timeout: the driver polls for any element up to N seconds before declaring it absent. Set it once in config; do not lean on it for timing-critical steps.",
        "Explicit wait — one condition plus one timeout for one specific step: waitForSelector in Selenium-style code, expect(...).toBeVisible() in Playwright, cy.get('.toast').should('be.visible') in Cypress.",
        "Auto-waiting — Playwright and Cypress check that an element is visible, enabled, stable, and receiving events before every action, which makes most manual waits unnecessary."
      ] },
      { type: "p", text: "The same step written both ways — the version that races and the version that waits for the outcome:" },
      { type: "code", lang: "ts", label: "e2e/checkout.spec.ts", code: `// Bad: a fixed sleep is a race you eventually lose
await page.getByRole('button', { name: 'Pay now' }).click();
await page.waitForTimeout(3000);
expect(await page.textContent('.toast')).toContain('Order placed');

// Good: wait for the condition, not for a guess
await page.getByRole('button', { name: 'Pay now' }).click();
const toast = page.getByRole('status');
await expect(toast).toHaveText('Order placed');` },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Run the failing test and watch the page at the moment of failure; note what is still loading.",
        "Name the condition you were really waiting for: toast visible, row count is five, button enabled, spinner gone.",
        "Replace every fixed sleep with an explicit wait on that condition.",
        "Set one sane global timeout in config (ten seconds is a start) and resist raising it after each flake.",
        "Rerun the test five times against a throttled connection; a pass every time means the wait is real.",
        "When a step still seems to need a sleep, ask what state the app is actually emitting — there is usually an un-waited-for condition."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Adding a bigger sleep after a flake — three seconds becomes eight, the suite slows, and the race survives. Instead, find the condition the sleep was guessing at.",
        "Setting a huge implicit wait globally — every genuinely absent element now costs thirty seconds. Instead, keep the global timeout modest and wait explicitly where it matters.",
        "Waiting for DOM presence when the user sees something else — an attached element can still be invisible. Instead, wait on the visible outcome you will assert anyway.",
        "Stacking sleeps on top of an auto-waiting framework — the fixed pause just burns seconds before the real wait begins. Instead, delete it and let actions and assertions retry.",
        "Asserting immediately after a click that triggers a network call — the toast has not rendered yet. Instead, assert with toBeVisible, which retries until the timeout."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Treat every waitForTimeout in a code review as a question: which condition is this pretending to be?",
        "Wait on the thing you will assert on; the wait and the check become one line.",
        "Keep one global timeout in config and override per step only with a written reason.",
        "Test waits under a throttled connection, not just on fast CI hardware where races hide.",
        "Delete waits you no longer need when upgrading a flow; dead waits hide for years."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "sleep(3) is a race: too short is flaky, too long is slow, and both are guesses.",
        "Implicit waits are a global fallback; explicit waits name one condition with one timeout.",
        "Auto-waiting frameworks make most manual waits obsolete — use them.",
        "Wait for conditions, never durations."
      ] },
      { type: "quote", text: "Interview tip: when asked why a test is flaky, say 'the sleep was racing the app, so we replaced durations with conditions' — it is a shorter, stronger answer than blaming the network." }
    ]
  },
  {
    id: "assertions-in-automation",
    num: "064",
    title: "Assertions in Automation: Making Failures Speak",
    dek: "Assertions decide pass or fail, so they should fail loudly: one behavior per test, observable outcomes, and expected versus actual in every failure message.",
    date: "2026-07-04",
    read: "4 min",
    category: "Automation",
    difficulty: "beginner",
    tags: ["assertions", "test-design", "reporting"],
    status: "green",
    body: [
      { type: "p", text: "The nightly run failed at 2 a.m. with one line: expected true, got false. No field name, no expected value, no clue which of the nine checks inside that test had died. Four engineers spent the morning guessing; the fix turned out to be one line, and the diagnosis cost a day." },
      { type: "p", text: "An assertion is the checkpoint that decides pass or fail — everything else in a test is arrangement and action. A weak assertion is a smoke alarm with no location: you know something is wrong, somewhere. A strong one tells you the room, the expected reading, and the actual one." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Weak assertions fail silently in both directions. toBeTruthy on an object passes for the wrong reason — the object exists but holds the wrong total — and it fails with no story. Tests that assert five behaviors at once hide three failures behind the first. In CI at scale, failure messages are the only thing most people read: a message with expected versus actual ends an investigation, and a message without one starts it." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Three rules cover most of it: one behavior per test, observable outcomes over internals, and failure messages that carry expected versus actual. Assert on the state change a user would notice — the toast appearing, the row count doubling — not on the variable your script happened to capture mid-flight. Watch the difference on one checkout toast:" },
      { type: "code", lang: "ts", label: "e2e/orders.spec.ts", code: `// Weak: passes for the wrong reason, fails without a story
const result = await page.textContent('.toast');
expect(result).toBeTruthy();

// Strong: names the outcome and reports expected vs actual
const toast = page.getByRole('status');
await expect(toast, 'toast after paying').toHaveText('Order placed');

// Observable outcome #2: the row count the user can see
await expect(page.getByTestId('order-row')).toHaveCount(2);` },
      { type: "p", text: "One fork worth knowing: hard assertions stop the test at the first failure; soft assertions — expect.soft in Playwright, SoftAssert in TestNG — collect several and report them together, useful on long forms where one run should surface every broken field. Use soft assertions sparingly, though: a run that reports eight failures reads better than one that stops at the first, but it also hides step dependencies." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Write the test title as a behavior, then make the deciding assertion mirror it word for word.",
        "Assert on what a user can see or receive: toast text, row count, URL, status code.",
        "Prefer built-in matchers — toHaveText, toContainText, toHaveCount — over manual boolean comparisons; they print expected versus actual for free.",
        "Add a short description argument to assertions on busy pages so the report reads like a sentence.",
        "Remove duplicated assertions that re-verify earlier steps; one behavior per test.",
        "Break the build on purpose and read your own failure message as a stranger would."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Asserting toBeTruthy on an object — existence is not correctness, and the failure says nothing. Instead, assert the value with a specific matcher.",
        "Packing five behaviors into one test — the first failure masks the rest. Instead, split into one behavior per test.",
        "Asserting on internals such as component state or a mid-script variable — refactoring breaks the test with no visible change. Instead, assert observable outcomes.",
        "Writing assertions that cannot fail — comparing data you just injected against itself. Instead, derive the expected value independently of the test's own actions.",
        "Leaving expected and actual out of custom messages — 'check failed' sends the next reader digging. Instead, include both values in the message."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Use the framework's matchers; they format failures better than any hand-written message.",
        "Follow arrange, act, assert so the deciding check sits at the end where readers expect it.",
        "Soft-assert long forms so one run reports every invalid field; hard-assert flows where later steps depend on earlier ones.",
        "Keep the assertion count honest — every assertion should be able to fail meaningfully.",
        "Review new tests by reading only their assertions; if the verdicts are unclear, the test is not done."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "An assertion decides pass or fail; write it so a stranger can read the failure.",
        "Assert observable outcomes — toast text, row counts, URLs — not internal variables.",
        "One behavior per test, with one clear assertion deciding it.",
        "Hard assertions stop at the first failure; soft assertions collect them all."
      ] },
      { type: "quote", text: "Rule of thumb: if a failing test cannot tell you what it expected and what it got, it is not finished being written." }
    ]
  }
];
