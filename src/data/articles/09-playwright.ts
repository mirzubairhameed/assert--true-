import type { Post } from "../post-types";

export const PLAYWRIGHT: Post[] = [
  {
    id: "playwright-first-test",
    num: "069",
    title: "Playwright: From Install to Your First Green Test",
    dek: "npm init playwright@latest scaffolds tests, a config, and browser downloads in one minute. Write a two-line goto-and-expect test, then run it headless, headed, debugged, or in UI mode.",
    date: "2026-07-12",
    read: "5 min",
    category: "Playwright",
    difficulty: "beginner",
    tags: ["playwright", "getting-started", "e2e"],
    status: "green",
    body: [
      { type: "p", text: "Monday, 9 a.m. Your lead explains the checkout regression suite runs by hand every release and burns two tester-days per cycle; your task this week is Playwright installed with one test green. It sounds like a project. It is actually a morning." },
      { type: "p", text: "Playwright is an open-source automation library from Microsoft that drives real Chromium, Firefox, and WebKit browsers from a single Node.js process. Think of it as a remote control for the browser: your test file is the hand pressing the buttons, and the browser obeys every time. One scaffold command creates the folders, the config, and a sample test, so you start from something that already runs." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Manual regression of the same forty flows every release is the bill automation exists to cancel, and every large suite began as somebody's first green test. Job posts list Playwright constantly, and 'I set it up from scratch' is a stronger interview line than 'I added tests to an existing suite'. And a tool you installed yourself is a tool you are not afraid to debug." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Install with one command: npm init playwright@latest. The wizard asks a few questions (TypeScript, a tests folder, whether to add a GitHub Actions workflow) and then builds the layout you will live in: tests/ for spec files, playwright.config.ts for shared settings such as baseURL and retries, and a .gitignore entry for test-results/ and playwright-report/. It also downloads the browser binaries, which is why the first install takes a few minutes. Then write the smallest honest spec:" },
      { type: "code", lang: "ts", label: "tests/first.spec.ts", code: `// Setup once: npm init playwright@latest
import { test, expect } from '@playwright/test';

test('home page shows the store name', async ({ page }) => {
  await page.goto('https://qa-shop.example');
  await expect(page).toHaveTitle(/QA Shop/);
});

// Run headless:          npx playwright test
// Watch the browser:     npx playwright test --headed
// Step with inspector:   npx playwright test --debug
// Local dashboard:       npx playwright test --ui
// Record a test:         npx playwright codegen https://qa-shop.example` },
      { type: "p", text: "The same file runs four different ways, and the difference is one flag. npx playwright test runs headless — no window, fastest, the mode CI uses. Add --headed to watch the browser live, --debug to open the Playwright Inspector and step line by line, or --ui to enter UI Mode, a local dashboard with watch mode and run history. Try all four now so the flags feel familiar under pressure." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Run npm init playwright@latest and accept TypeScript plus a tests folder.",
        "Open playwright.config.ts and set baseURL to your test site, so specs can navigate with page.goto('/') instead of full URLs.",
        "Replace the scaffold example with one real screen you know, like the home page.",
        "Run npx playwright test and read the green summary line: one passed.",
        "Run it again with --headed and watch the browser do exactly what the file says.",
        "Break the expectation on purpose by changing the title string, then study the failure report; a test you have seen fail is a test you trust."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Running npx playwright test before browsers are installed — the error reads 'Executable doesn't exist'. Instead, run the install step the scaffold prints.",
        "Creating specs outside the configured folder — the runner only discovers files matching its testDir and spec pattern. Instead, keep specs in tests/ as *.spec.ts.",
        "Writing plain if-statements or console.log checks instead of expect() — silent checks cannot fail a run. Instead, use web-first assertions like toHaveTitle.",
        "Expecting a browser window during a default run — the default is headless, and 'nothing happened' is often a passing headless run. Instead, add --headed to watch.",
        "Deleting the scaffold's example.spec.ts unread — it demonstrates the { page } fixture and the expect import you will type every day. Instead, read it once, then rename it."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Set baseURL in the config; relative navigation lets one config change switch between local and staging.",
        "Commit package.json, playwright.config.ts, and tests/ so teammates get the identical scaffold.",
        "Keep one behavior per test; the first test sets the habit.",
        "Reach for --debug whenever a locator misbehaves instead of guessing from a red error message.",
        "Add test-results/ and playwright-report/ to .gitignore on day one."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "One wizard command produces folders, config, browsers, and a sample test.",
        "page.goto plus expect(page).toHaveTitle is a complete, honest first test.",
        "Headless is the default; --headed, --debug, and --ui are one flag away."
      ] },
      { type: "quote", text: "Interview tip: walk through your first Playwright setup out loud — install wizard, folder layout, the four run modes. Recounting it end to end proves hands-on experience better than any framework buzzword." }
    ]
  },
  {
    id: "playwright-locators-actions",
    num: "070",
    title: "Playwright Locators and Actions: Start With getByRole",
    dek: "Five locator families ranked from strongest to weakest, the five actions that cover most flows, and why the fragile div > span .nth(2) habit breaks on every redesign.",
    date: "2026-07-14",
    read: "5 min",
    category: "Playwright",
    difficulty: "beginner",
    tags: ["playwright", "locators", "selectors"],
    status: "green",
    body: [
      { type: "p", text: "What does a test actually grab when it clicks a button? If your answer is 'a CSS string', today's habit change will cut your automation maintenance in half. The question matters because locators are where suites rot first, and the rot is silent." },
      { type: "p", text: "A locator is a description of an element, not a handle to it: Playwright re-finds the element every time you act, so nothing goes stale after a re-render. Read locators the way an accessibility tree does — button 'Sign in', textbox 'Email' — and they keep working through redesigns. Write them the way CSS does — div > span, second one down — and every layout tweak breaks the suite quietly." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Brittle selectors are the largest single source of automation maintenance, and the damage hides well: the test keeps clicking, just on the wrong element, until a human notices the wrong assertion failing. Teams abandon suites over selector rot, not over hard bugs. Choosing strong locators on day one is far cheaper than rescuing a suite in month six." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Playwright ranks its locator helpers the way you should: getByRole first, because it matches what users and screen readers perceive; getByLabel and getByPlaceholder next for form fields; getByText when the visible words are the identity; getByTestId last, an agreed-on data attribute for when nothing semantic exists. Reach down the list only when the top of it fails you. A login form needs nothing below getByRole:" },
      { type: "code", lang: "ts", label: "tests/auth.spec.ts", code: `import { test, expect } from '@playwright/test';

test('customer logs in with valid credentials', async ({ page }) => {
  await page.goto('https://qa-shop.example/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('dana@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('correct-horse-42');
  await page.getByRole('checkbox', { name: 'Remember me' }).check();
  await page.getByRole('combobox', { name: 'Region' }).selectOption('eu-west');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
});` },
      { type: "p", text: "Five actions cover most flows: click, fill (which clears the field first), selectOption, check, and press for keyboard behavior like .press('Enter'). Now the anti-pattern this note exists to kill: page.locator('div > span').nth(2). It encodes a layout assumption no reader can see, and the third span of that div changes meaning the day a designer adds an icon. If no role fits, ask a developer for a data-testid — that one-line pull request is cheaper than a broken suite." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Open the page you want to automate.",
        "Run npx playwright codegen plus the URL, click around, and copy the locators it suggests.",
        "Rewrite anything it emitted as getByRole with a name option wherever a role exists.",
        "Chain the action you need: fill for text, click for buttons, selectOption for dropdowns, check for boxes.",
        "Add one expect after each action so the step proves something.",
        "Re-run after a visual redesign; role locators should survive it untouched."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Positional picks like .nth(2) and div > span — they encode layout, and layouts change without telling you. Instead, describe by role, label, or testid.",
        "getByText('Sign in') when a heading and a button share the words — strict mode throws because two elements match. Instead, getByRole('button', { name: 'Sign in' }).",
        "Class-based selectors on styled components — generated names like css-1q2w3e change every build. Instead, use a role or a stable data-testid.",
        "Using the deprecated page.type() to enter text — it sends keystrokes you do not need. Instead, fill for values and press only for real keyboard behavior.",
        "Grabbing raw handles with page.$ and storing them — handles go stale after re-render. Instead, always act through locators, which re-query automatically."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Start every locator with getByRole and add { name: ... } to disambiguate.",
        "Ask developers for data-testid attributes when the app exposes no semantics; it is a one-line change per element.",
        "Use filter chains for rows: getByRole('row').filter({ hasText: 'ord_84512' }).getByRole('button', { name: 'Cancel' }) reads like the user's intent.",
        "Run codegen when exploring an unfamiliar page, then tidy what it emits instead of pasting blindly.",
        "Write a short locator style guide in the repo so ten testers produce one dialect."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "getByRole first; getByTestId is the fallback, not the default.",
        "fill, click, selectOption, check, and press cover almost every interaction.",
        "Locators re-find elements on every action, so nothing goes stale.",
        "nth(2)-style picks are a maintenance invoice you send to yourself."
      ] },
      { type: "quote", text: "Interview tip: when asked how you pick selectors, answer in one breath — 'role first, label second, testid last, never position' — and you sound like someone who has inherited a broken suite before." }
    ]
  },
  {
    id: "playwright-assertions-waits",
    num: "071",
    title: "Playwright Assertions and Auto-Waiting",
    dek: "expect().toBeVisible retries for up to five seconds before failing, so the test waits for the app instead of the clock. Four daily assertions, per-assertion timeouts, and the waitForTimeout habit to unlearn.",
    date: "2026-07-15",
    read: "5 min",
    category: "Playwright",
    difficulty: "beginner",
    tags: ["playwright", "assertions", "auto-waiting"],
    status: "green",
    body: [
      { type: "p", text: "The suite passed locally all week and failed in CI twice, on different tests, both after the Pay now click. The shared line turned out to be page.waitForTimeout(3000): on a slower runner the confirmation toast took 3.4 seconds. Someone had patched timing with a sleep, and flakiness had been scheduled into the build." },
      { type: "p", text: "Playwright assertions are web-first and self-retrying: expect(locator).toBeVisible() polls the page until the condition is true or the timeout expires, rather than checking once and giving up. The test waits for the app to be ready instead of for an arbitrary number of milliseconds. It is the difference between a waiter who checks whether your food has arrived and one who stands in the kitchen counting to three. The default budget is five seconds per assertion, and every exhausted retry ends in a crisp error naming the expected condition." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Sleeps fail twice: they tax every passing run with dead time and still fail when reality is slower than the guess. Flaky suites also train teams to hit 'retry' without reading failures, which is exactly how real bugs slip through. Retrying assertions remove the guess and shorten runs at the same time — a rare free lunch. The cost of sleeps is not only flaky reds: suites that teams distrust get skipped, and skipped suites rot until someone deletes them." },
      { type: "h", text: "Seeing it on a real page" },
      { type: "p", text: "Four assertions carry most tests: toBeVisible for something rendered, toHaveText for exact content, toContainText for partial content, and toHaveURL for where the browser landed. Each retries for up to five seconds by default, each accepts its own timeout option for genuinely slow flows, and the timeout belongs to the assertion, not to the whole run. Watch them absorb the timing noise in one checkout test:" },
      { type: "code", lang: "ts", label: "tests/checkout.spec.ts", code: `import { test, expect } from '@playwright/test';

test('paying shows a confirmation and lands on the receipt', async ({ page }) => {
  await page.getByRole('button', { name: 'Pay now' }).click();

  // Retries until the toast renders (default 5 seconds):
  await expect(page.getByText('Order confirmed')).toBeVisible();

  // Retries until the redirect finishes:
  await expect(page).toHaveURL(/receipt/);
  await expect(page.getByRole('heading')).toContainText('Thanks for your order');

  // FORBIDDEN — freezes the test for 3 seconds and proves nothing:
  // await page.waitForTimeout(3000);
});` },
      { type: "p", text: "Two details make this durable. Negative assertions retry too: expect(spinner).toBeHidden() and expect(rows).toHaveCount(0) wait for the UI to settle instead of checking instantly. And the per-assertion timeout is the honest way to handle slow screens: await expect(page.getByText('Report ready')).toBeVisible({ timeout: 15000 }) documents that this one report may take fifteen seconds, without padding the other forty tests in the suite. Assertions also fail with an expected-versus-received diff, which turns most reds into readable sentences." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Perform the action: click Pay now.",
        "Assert the visible milestone with toBeVisible or toHaveText.",
        "Assert the address bar with toHaveURL so a wrong redirect cannot hide.",
        "Give known-slow assertions their own { timeout } instead of raising the global default.",
        "Search the suite for waitForTimeout and replace each sleep with the assertion it was hiding.",
        "Prove the fix with npx playwright test --repeat-each=10 before calling the test stable."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "page.waitForTimeout(3000) before an assertion — every run pays three seconds and slow machines still fail. Instead, let the assertion retry.",
        "Building conditionals around raw DOM reads — a one-shot if-check has no retry and no useful error. Instead, put the condition inside expect().",
        "Raising the global assertion timeout to 30 seconds — slowness now hides everywhere. Instead, extend only the assertion that needs it.",
        "Asserting only the final screen — the toast, the URL, and the heading each catch different bugs. Instead, assert each milestone the user would notice.",
        "Deleting a flaky test instead of fixing its sleep — the coverage disappears but the timing debt remains elsewhere. Instead, find the guess and replace it with a retrying assertion."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep the five-second default; explicit per-assertion timeouts document real slowness instead of burying it.",
        "Always assert the URL after any flow that redirects; toHaveURL catches wrong destinations the pixels cannot.",
        "Use toHaveCount(0) to prove a list emptied, not just that it stopped rendering.",
        "Run --repeat-each=10 locally on any test you just de-flaked, before CI rediscovers it for you."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Assertions poll; sleeps pray.",
        "toBeVisible, toHaveText, toContainText, and toHaveURL are the daily four.",
        "A per-assertion timeout is documentation; global padding is debt."
      ] },
      { type: "quote", text: "Interview tip: when asked how you fix a flaky test, start with 'find the sleep and replace it with an assertion that retries' — it shows you fix causes, not symptoms." }
    ]
  },
  {
    id: "playwright-fixtures-pom",
    num: "072",
    title: "Playwright Fixtures and Page Objects in Practice",
    dek: "The { page } you destructure is a fixture. Build your own with test.extend to hand every spec a logged-in browser, then wrap screens in page objects so locators live in exactly one file.",
    date: "2026-07-16",
    read: "5 min",
    category: "Playwright",
    difficulty: "intermediate",
    tags: ["playwright", "fixtures", "page-object-model"],
    status: "green",
    body: [
      { type: "p", text: "I once pasted the same six lines of UI login into 28 spec files. When the app added a 'trust this device' step to login, I updated 28 files, missed one, and spent a morning chasing a failure that was mine, not the app's. That morning is what fixtures exist to prevent." },
      { type: "p", text: "Fixtures flip the pattern: instead of each test fetching its own setup, the test declares what it needs and Playwright builds a fresh copy per test and tears it down after. The { page } you have been destructuring since your first test is a built-in fixture, and test.extend lets you add your own beside it. Room service is the analogy: the test orders 'authedPage', and the runner prepares a new one for every room." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Setup code duplicated across files multiplies one change into dozens, and UI-driven login is the slowest, flakiest version of that mistake. Centralizing login in a fixture makes the flow change a one-line edit and lets you swap the mechanism — UI login, API login, storageState — without touching a single spec. Pair it with page objects and the same one-place rule extends to locators." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The steadiest pattern logs in through the API, then injects the token into the browser before any page loads. Declare a typed fixture, do the setup work before use(), and hand the value over with await use(...):" },
      { type: "code", lang: "ts", label: "tests/fixtures.ts", code: `import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

type Fixtures = { authedPage: Page };

export const test = base.extend<Fixtures>({
  authedPage: async ({ page }, use) => {
    // Log in through the API — faster and steadier than the UI.
    const res = await page.request.post('/api/login', {
      data: { email: 'dana@example.com', password: 'correct-horse-42' },
    });
    const { token } = await res.json();
    await page.addInitScript((t) => {
      window.localStorage.setItem('auth_token', t);
    }, token);
    await use(page); // the test receives a logged-in browser
  },
});

export { expect };` },
      { type: "p", text: "Specs then ask for the fixture by name: test('saved addresses render', async ({ authedPage }) => { ... }). The sibling approach is storageState: log in once in a setup project, save the session snapshot to auth/user.json, and point use: { storageState } at it for every context. Whichever route you choose, wrap screens in page objects — a LoginPage class owning getByLabel('Email') and a submit method — so a redesign means editing one class while tests keep reading as user intent." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Name the repeated need out loud: 'every spec starts logged in'.",
        "Create tests/fixtures.ts and extend the base test with a typed fixture.",
        "Do the setup before use(): API login, token injection, or loading a storageState snapshot.",
        "Call await use(value) exactly once; anything after it runs as teardown.",
        "Export test and expect from the fixtures file and import them in every spec.",
        "Extract one page object per major screen and drive it through the fixture."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Copy-pasting login steps into every spec — one UI change becomes 28 edits. Instead, let one fixture own the flow.",
        "Logging in through the UI inside the fixture when an API endpoint exists — slower and flakier for zero benefit. Instead, use page.request.post and move on.",
        "Forgetting await use(value) — the test hangs until timeout with no useful error. Instead, treat use() as the handoff and always await it.",
        "Extending the test without a type parameter — autocomplete and safety vanish. Instead, base.extend<Fixtures> with your fixture types.",
        "Turning page objects into junk drawers of assertions and test data — they stop describing screens. Instead, one class per screen, locators and small actions inside, assertions in tests."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Define one fixture per real setup need: authedPage, adminPage, cartWithItems.",
        "Read credentials from environment variables inside the fixture, never from spec files.",
        "Compose fixtures (authedPage builds on page) instead of duplicating their work.",
        "Consider a setup project with storageState when dozens of specs need the same session."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "{ page } is a fixture; test.extend adds yours beside it.",
        "API login plus token injection is the steady route to an authenticated browser.",
        "Page objects localize locators; fixtures localize setup; tests assert."
      ] },
      { type: "quote", text: "Interview tip: 'How do you share login state across tests?' is really a fixtures question — answer with test.extend, page.request for the API login, and storageState for cached sessions, and you have covered what they are asking." }
    ]
  },
  {
    id: "playwright-trace-debugging",
    num: "073",
    title: "Debugging Playwright: Trace Viewer, Screenshots, UI Mode",
    dek: "A failed CI run comes home with a trace: every click, screenshot, network call, and console line. Turn traces on, read them in Trace Viewer, and stop guessing what the browser did.",
    date: "2026-07-18",
    read: "5 min",
    category: "Playwright",
    difficulty: "intermediate",
    tags: ["playwright", "debugging", "trace-viewer"],
    status: "green",
    body: [
      { type: "p", text: "2 a.m. CI run, one red line: 'expect(page.getByText('Order confirmed')).toBeVisible() failed'. It passes on your laptop. Without artifacts you will spend the morning guessing; with a trace you will spend four minutes watching the run happen." },
      { type: "p", text: "A trace is a flight recorder for a test run: every action with its timing, DOM snapshots before and after, screenshots, network requests, and console output, bundled into one trace.zip. Trace Viewer plays it back step by step, so 'green locally, red in CI' turns from a mystery into footage. The config decides when recording happens, and that decision shapes how much guessing your worst day contains." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Most of an automation engineer's debugging life is spent on runs that failed somewhere else. A screenshot tells you where a test died; a trace tells you why — the button the locator missed, the response that 500ed, the element covered by a modal. Traces are cheap to enable and priceless on the day you need them, so the setting belongs in the config from week one." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Three settings do the work: trace set to 'retain-on-failure' (record every run, keep failures only) or 'on-first-retry' (record when a failed test retries, which needs retries: 1), screenshot 'only-on-failure', and video 'retain-on-failure'. Artifacts land in test-results/ and inside the HTML report:" },
      { type: "code", lang: "ts", label: "playwright.config.ts", code: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 1,
  use: {
    baseURL: 'https://qa-shop.example',
    trace: 'retain-on-failure',    // or 'on-first-retry'
    screenshot: 'only-on-failure', // a PNG attached to each failure
    video: 'retain-on-failure',    // keep the film of the fall
  },
});

// Open a saved trace:  npx playwright show-trace test-results/auth/trace.zip
// Or browse runs live: npx playwright test --ui` },
      { type: "p", text: "Open any trace.zip with npx playwright show-trace, or work visually in UI Mode (npx playwright test --ui), which keeps a trace for every local run and updates on save. For a live session, page.pause() inside a test drops you into the Playwright Inspector, where you step through actions and try locators against the real page. In the viewer, the timeline's Network tab and each action's before-and-after snapshots answer the two questions every failure raises: what did the page actually look like, and what did the server actually say?" },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Set trace, retries, screenshot, and video in playwright.config.ts.",
        "Push a commit and let CI run; open the failed run's report artifact.",
        "Find the trace.zip under test-results/ or inside the uploaded report.",
        "Walk the timeline: read each action, its snapshots, and the Network tab.",
        "Fix the locator, assertion, or data issue the footage reveals.",
        "Confirm with npx playwright test --repeat-each=10 locally."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "trace: 'on' for the whole suite — artifacts balloon and runs slow down for tests that would pass anyway. Instead, use 'retain-on-failure' or 'on-first-retry'.",
        "Setting trace to 'on-first-retry' while retries stays 0 — the condition can never trigger. Instead, pair the mode with retries: 1.",
        "Debugging by scattering console.log and sleeps into the spec — you are editing code to simulate evidence. Instead, open the trace.",
        "Reading only the assertion message — it says what failed, the snapshots show why. Instead, step through the timeline before forming a theory.",
        "Leaving video: 'on' in CI — minutes of storage per green run for nothing. Instead, 'retain-on-failure'."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Upload trace and report artifacts on failure in CI so every red run arrives with evidence; note 074 wires this up.",
        "Use page.pause() with --debug for live, line-by-line local sessions.",
        "In UI Mode, let watch mode re-run the spec while you edit it.",
        "Prefer the DOM snapshot over your memory of what the page 'must have' shown."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A trace is the black box: enable it before the crash you cannot replay.",
        "'retain-on-failure' or 'on-first-retry' with retries: 1 is the balanced setup.",
        "show-trace and UI Mode turn debugging into playback."
      ] },
      { type: "quote", text: "Rule of thumb: never argue about a UI bug you cannot replay — the trace is the evidence, and 'works on my machine' ends where the timeline starts." }
    ]
  },
  {
    id: "playwright-in-github-actions",
    num: "074",
    title: "Running Playwright in GitHub Actions",
    dek: "A 20-line workflow turns every pull request into a QA gate: install browsers, run the suite headless, then upload the HTML report and failure traces the moment something breaks.",
    date: "2026-07-20",
    read: "5 min",
    category: "Playwright",
    difficulty: "intermediate",
    tags: ["playwright", "github-actions", "ci"],
    status: "green",
    body: [
      { type: "p", text: "Your suite is green on your laptop. Nobody ships your laptop. Until the tests run on every push, they are a personal habit; once they do, they are a product feature that protects every pull request in the repository." },
      { type: "p", text: "A GitHub Actions workflow is a YAML recipe a fresh Linux runner follows on each trigger: check out the code, install dependencies, run your commands. Recipes live in .github/workflows/ and answer two questions — when (on: push and pull_request) and what (a job with steps). The Playwright recipe has six beats, and one of them is the step beginners always miss." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "A gate that runs only on your machine protects nobody. In CI, the same suite becomes a required check that blocks broken merges, and artifacts give every red run its evidence. The install step is where first attempts die: CI machines lack browser binaries and the system libraries they depend on, which is exactly what the --with-deps flag adds." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The minimal workflow checks out the repo, pins Node, runs npm ci, installs Chromium with its system dependencies, runs the suite, and uploads the report and traces when the job fails:" },
      { type: "code", lang: "yaml", label: ".github/workflows/e2e.yml", code: `name: E2E
on:
  push:
    branches: [main]
  pull_request:

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: \${{ failure() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7` },
      { type: "p", text: "npx playwright install --with-deps chromium downloads the browser and the Ubuntu libraries it needs — a plain npx playwright install often completes the download and then crashes on missing shared libraries. The if: ${{ failure() }} condition ties the upload to red runs, so green pushes pay nothing for artifact storage. The uploaded playwright-report/ contains the HTML report with any trace.zip files inside — download it, run npx playwright show-trace, and the 2 a.m. failure has footage." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Save the file as .github/workflows/e2e.yml and commit it.",
        "Open a pull request and watch the Checks tab start a run.",
        "On red, read the log at the failing step — an install failure and a test failure live in different worlds.",
        "Download the playwright-report artifact from the run summary.",
        "Open the trace.zip files with npx playwright show-trace.",
        "Fix, push, watch the same workflow turn green, then set it as a required check."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Skipping --with-deps — the browser downloads fine, then the run dies on missing system libraries. Instead, install with deps in CI.",
        "Using npm install instead of npm ci — the runner resolves fresh versions instead of the lockfile you tested with. Instead, npm ci, always.",
        "Uploading artifacts on every green run — storage and minutes spent on nothing. Instead, gate the upload with if: ${{ failure() }}.",
        "Hardcoding staging credentials in the YAML — anyone with repo access can read them. Instead, store them as GitHub Actions secrets and read process.env.",
        "Retrying red runs until green without opening the trace — flakiness gets institutionalized. Instead, treat every red as evidence and quarantine what you cannot fix today."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Make the workflow a required status check so merges wait for the verdict.",
        "Pin major action versions (@v4) so an upstream release cannot surprise you.",
        "Keep retention-days short; artifacts are triage material, not an archive.",
        "Shard the suite with a job matrix when it outgrows the merge-check timeout."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Six beats: checkout, Node, npm ci, install --with-deps, test, upload.",
        "if: ${{ failure() }} keeps artifacts tied to evidence.",
        "The PR check is the product; the laptop is only the development loop."
      ] },
      { type: "quote", text: "Interview tip: recite your E2E workflow from memory — checkout to artifact upload — and half of any CI interview question answers itself." }
    ]
  },
];
