import type { Post } from "../post-types";

export const AUTOMATION_B: Post[] = [
  {
    id: "page-object-model",
    num: "065",
    title: "The Page Object Model Without the Ceremony",
    dek: "One class per screen that exposes actions and locators, so tests read like behavior — loginAs(user), then expect the dashboard — and a redesign costs one file, not fourteen.",
    date: "2026-07-06",
    read: "4 min",
    category: "Automation",
    difficulty: "intermediate",
    tags: ["page-object-model", "test-structure", "maintainability"],
    status: "green",
    body: [
      { type: "p", text: "Open a six-month-old automation repo and count the copies of the login routine: fourteen test files, each with its own selectors, its own wait, and its own click order. Then the login page gains a Remember me checkbox. Fourteen files need editing, three get missed, and the suite turns red in ways that have nothing to do with bugs." },
      { type: "p", text: "The page object model gives each screen one class that owns its locators and actions: LoginPage knows where the email field is and how to sign in, and tests simply ask it to. Think of it as the screen's remote control — labeled buttons for what you do, one place to look when the device changes. The name is unglamorous, and the ceremony people attach to it is optional; the two-minute version below is enough for most suites. Tests then read like behavior: log the user in, expect the dashboard." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without page objects, selector duplication spreads copy-paste rot: a redesign means a hundred-file search and replace, and tests describe clicks instead of intent. With them, a redesign costs one file, new tests assemble from existing methods, and a reader can tell what a test verifies without opening the page class. The pattern is also the most common question in automation interviews — 'explain POM' — so it pays twice." },
      { type: "h", text: "In practice" },
      { type: "p", text: "One modern rule settles the oldest debate in this pattern: page objects expose actions and state, and assertions stay in the tests. An older school placed asserts inside page methods, which hides the verdict from the test file. The current rule is simpler — a page returns state (a locator, a text, a count) and the test decides. One small screen, both sides:" },
      { type: "code", lang: "ts", label: "pages/login.page.ts", code: `import { test, expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  emailInput() { return this.page.getByLabel('Email'); }
  passwordInput() { return this.page.getByLabel('Password'); }

  async loginAs(user: { email: string; password: string }) {
    await this.emailInput().fill(user.email);
    await this.passwordInput().fill(user.password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  greeting() { return this.page.getByTestId('user-greeting'); }
}

test('lands on the dashboard after signing in', async ({ page }) => {
  await page.goto('/login');
  const login = new LoginPage(page);
  await login.loginAs({ email: 'ada@example.com', password: 'Correct-Horse-42' });
  await expect(login.greeting()).toBeVisible();
});` },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Start with the screen that appears in the most tests — usually login or the main navigation.",
        "Name the class after the screen (LoginPage, CartPage), never after a test.",
        "Expose actions the user performs (loginAs, addToCart) and state the user could observe (greeting, errorMessage).",
        "Move every selector out of the test file; the test should contain zero raw locators.",
        "Keep assertions in the test; methods return locators or values instead.",
        "Add a method only when a second test needs it — build pages from demand, not speculation."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Placing assertions inside page methods — the test file stops showing what is verified. Instead, return state and assert in tests.",
        "Building one god object for the whole app — every change becomes a merge conflict. Instead, keep one class per screen.",
        "Exposing raw selectors as public fields reused across tests — the page object stops owning its screen. Instead, wrap them in named methods or readonly locators.",
        "Adding speculative methods nobody calls — unused code rots and misleads the next reader. Instead, wait for the second real test to need the flow.",
        "Hiding fixed sleeps inside page actions — timing problems move out of sight. Instead, let locators auto-wait and keep waits visible in tests."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Treat page objects as an API for the screen; rename methods when the screen's purpose changes.",
        "Return locators rather than snapshot values, so assertions retry on fresh queries.",
        "Keep constructors cheap: pass the page in and hold no global state.",
        "Compose shared flows (login then add to cart) in helpers that call page objects, not inside the pages themselves.",
        "Extract shared components — a header, a toast — into their own objects that several pages reuse."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "One class per screen: locators and actions together, tests stay clean.",
        "Tests read like behavior — loginAs(user), then expect the dashboard.",
        "Pages return state; tests assert. Keep the verdict in the test file.",
        "Build from demand; a redesign then costs one file, not fourteen."
      ] },
      { type: "quote", text: "Interview tip: describe the page object model as 'an API for each screen — actions in, state out, assertions in the test' and you sound like someone who has maintained a suite, not just recorded one." }
    ]
  },
  {
    id: "test-data-for-automation",
    num: "066",
    title: "Test Data Strategies for Automated Tests",
    dek: "Why one golden test account wrecks parallel runs, and what to do instead: API-seeded factories, unique identities per run, static fixtures for reads, and scheduled cleanup.",
    date: "2026-07-08",
    read: "4 min",
    category: "Automation",
    difficulty: "intermediate",
    tags: ["test-data", "fixtures", "parallel-execution"],
    status: "green",
    body: [
      { type: "p", text: "Eight parallel workers, one shared golden test account, and a checkout test that empties the cart while seven other tests are mid-read. Which test fails first — and will anyone be able to tell that it was never a real bug?" },
      { type: "p", text: "Automated suites run in parallel now, and parallel tests need parallel data. One golden account shared across forty tests is one photocopier for an office of forty: everyone queues, everyone blames everyone, and the copy quality depends on who went first. The fix is to create what each test needs, per test, with an identity of its own." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Shared data produces failures that look random and then 'pass' on rerun — exactly how flaky suites lose everyone's trust. It also masks real bugs: a test can pass because leftover data happened to fit, not because the code works. And it wrecks environments: leftover QA Bot orders pile into staging dashboards until a demo shows nonsense." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Four strategies cover most suites, and strong teams mix them deliberately:" },
      { type: "ul", items: [
        "API-seeded data — create what the test needs through the app's own endpoints (POST /users, POST /addresses) seconds before the test; fast, realistic, and parallel-safe.",
        "Factory functions — one createUser helper with sensible defaults and optional overrides, so each test declares only what makes it special.",
        "Static fixtures — checked-in files (a product catalog, a sample invoice) for read-only data that no test mutates.",
        "Database seeding — a script loads a scenario directly for edge data the API cannot produce; powerful, but heavier to maintain.",
        "Randomized identities — generate the unique parts (email, coupon code) at runtime whenever uniqueness matters, because in parallel runs it always does."
      ] },
      { type: "p", text: "A factory small enough to keep in your head:" },
      { type: "code", lang: "ts", label: "e2e/helpers/create-user.ts", code: `const API = 'https://staging.shop.example/api';

export async function createUser(overrides: Partial<User> = {}) {
  const suffix = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const user = {
    email: 'user-' + suffix + '@example.com',
    password: 'Correct-Horse-42',
    name: 'QA Bot',
    ...overrides,
  };
  const res = await fetch(API + '/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('createUser failed with status ' + res.status);
  return { ...user, id: (await res.json()).id };
}` },
      { type: "p", text: "Each call returns a user like user-m4x9k2f1@example.com that no other worker can collide with. For cleanup, delete what you created in an after-each hook, or prefix records with the run id and let a nightly sweep remove everything tagged qa-." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "List what each test truly needs: a fresh user, a cart with two items, one unpaid invoice.",
        "Create the minimum through the API in a setup hook; reserve the UI for the behavior under test.",
        "Make every identity unique at creation time — a timestamp plus a random suffix beats a counter.",
        "Clean up in teardown, or tag created records and sweep them on a schedule.",
        "Mark read-only shared data clearly so no test ever mutates it.",
        "When a test needs data the API cannot make, ask for a seed endpoint first."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "One golden account for the whole suite — parallel runs trip over each other and failures look random. Instead, create data per test.",
        "Building data through the UI in every test — slow, and the test breaks when the signup form changes. Instead, seed via API and save the UI for what you are actually testing.",
        "Hardcoding qa@test.com across environments — yesterday's leftover cart breaks today's totals. Instead, generate unique identities per run.",
        "Skipping cleanup — staging fills with QA Bot orders until real dashboards lie. Instead, delete after the test or sweep tagged records nightly.",
        "Sharing mutated data 'just for now' — the temporary share becomes load-bearing within a month. Instead, fix the test's data contract immediately."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Write one factory per entity with defaults; tests declare only their differences.",
        "Derive identities from the run id so leftovers from a failed run are traceable and deletable.",
        "Keep factories versioned next to the tests that use them.",
        "Document in the README which data is safe to mutate and which is read-only.",
        "Assert only on data your test created — never on rows another run may have left behind."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Create data per test, through the API, with unique identities.",
        "Parallel suites die on shared accounts; uniqueness is not optional.",
        "Clean up, or use tagged throwaway records swept on a schedule.",
        "Static fixtures for reads, factories for writes, database seeding for the impossible."
      ] },
      { type: "quote", text: "Interview tip: when asked what makes automation flaky, mention test data collisions in parallel runs — it is a rarer, more senior answer than 'timing issues' alone." }
    ]
  },
  {
    id: "automation-framework-anatomy",
    num: "067",
    title: "Anatomy of an Automation Framework",
    dek: "The seven layers of a maintainable framework — drivers, page objects, tests, data, config, reporting, CI — plus an honest look at when data-driven, keyword, BDD, and hybrid styles pay off.",
    date: "2026-07-09",
    read: "5 min",
    category: "Automation",
    difficulty: "advanced",
    tags: ["framework-design", "bdd", "architecture"],
    status: "green",
    body: [
      { type: "p", text: "The framework took four months to build before its first test ran: a custom driver layer, a keyword engine, an HTML report with pie charts. Then the first real regression arrived, and the team discovered the engine had no way to say 'wait until the toast appears'. Four months of architecture, stopped by one toast." },
      { type: "p", text: "A framework is not magic; it is layers, and each layer exists to isolate one kind of change. A restaurant kitchen works the same way: utilities (gas, water, power), stations, recipes, a prep list per branch, and a pass where every dish is checked before it leaves. Change one wire and only that layer moves — the recipes survive." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without layers, every test talks straight to the driver, so a tool upgrade or a redesign ripples through hundreds of files. Without per-environment config, switching from staging to production means search-and-replace across the suite. Without reporting, a red run tells nobody anything, and real findings die in a CI log. The layers are boring on purpose: they exist so the tests — the interesting part — stay cheap to change." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Seven layers cover every framework worth maintaining: drivers or wrappers (thin helpers over the tool's API, written only where repetition hurts), page objects (one class per screen), test cases (one behavior each), test data (factories, fixtures, cleanup), config (per-environment URLs and timeouts read from one place), reporting (the failure list people actually read), and the CI hook (every pull request, plus a nightly full run). In a repository, those layers sit in predictable folders:" },
      { type: "ul", items: [
        "config/ — staging.ts and production.ts exporting baseUrl, timeouts, and tags; read once at startup.",
        "drivers/ — apiClient.ts and session.ts; thin wrappers, added only when repetition across tests hurts.",
        "pages/ — login.page.ts, cart.page.ts, orders.page.ts; one class per screen, no assertions inside.",
        "tests/ — checkout.spec.ts and friends; one behavior per test, zero raw selectors.",
        "data/ — createUser.ts and orderFactory.ts; the factories and cleanup from the test data strategy.",
        "reports/ — the generated failure list with screenshots and traces, published by the CI job."
      ] },
      { type: "p", text: "Styles earn their complexity differently. Data-driven design — one flow, many rows — pays off when the flow is stable and the variations are data, like fifty login permutations in a table; it turns to noise when each row secretly needs a different flow." },
      { type: "p", text: "Keyword design names every step ('Login', 'Add To Cart') and lets non-programmers compose them. It earns its keep when non-coders genuinely author tests and the vocabulary stays stable; otherwise it becomes an in-house programming language that you now have to maintain." },
      { type: "p", text: "BDD wraps tests in Given/When/Then scenarios that product owners can read. It pays when the whole team actually reads and debates those scenarios, and becomes double bookkeeping when only QA writes the .feature files." },
      { type: "p", text: "Hybrid — most real frameworks — mixes styles: data-driven tables feeding page objects, sometimes with a thin BDD layer on top. Adopt it layer by layer, on purpose, rather than by copying a conference diagram. The config layer alone is worth building on day one:" },
      { type: "code", lang: "ts", label: "config/playwright.config.ts", code: `// staging: BASE_URL=https://staging.shop.example npm test
export default defineConfig({
  timeout: 10_000,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://staging.shop.example',
    screenshot: 'only-on-failure',
  },
});` },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Start from the tool's default template and resist writing custom drivers until real pain appears.",
        "Create the config layer first: one file per environment, URLs and timeouts from environment variables.",
        "Move shared flows into page objects as tests demand them, not before.",
        "Add a data factory per entity when the second test needs the same setup.",
        "Wire reporting you actually read — failure list, screenshots, traces — before wiring anything clever.",
        "Add the CI hook (pull request run plus nightly full run) once the suite is trustworthy."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Building a custom driver layer on day one — you reimplement the tool, worse. Instead, write wrappers only where the tool's API repeats across many files.",
        "Choosing BDD for the tooling rather than the team — Gherkin doubles the writing when only QA reads it. Instead, pick the style by who authors and who reads the tests.",
        "Hardcoding staging URLs inside tests — every environment switch becomes a search-and-replace. Instead, read the base URL from config per environment.",
        "Skipping the reporting layer — a red run with no screenshots sends someone re-running tests by hand. Instead, invest in the report before the suite's hundredth test.",
        "Copying a big company's diagram — layers without real tests behind them are ceremony. Instead, grow each layer when actual tests demand it."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep the folder tree boring and obvious; a new tester should find pages, data, and config within a minute.",
        "Keep one config source per environment, read at startup — never scattered across tests.",
        "Name the layers in the README with the rule for what goes where.",
        "Revisit the style choice (data-driven, keyword, BDD, hybrid) each quarter as the team changes.",
        "Delete wrappers nobody imports; frameworks rot from the unused parts inward."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A framework is seven layers: drivers, pages, tests, data, config, reporting, CI.",
        "Each layer exists to isolate one kind of change.",
        "Data-driven, keyword, BDD, and hybrid each earn their keep in specific team situations.",
        "Grow the framework from real tests, not from a diagram."
      ] },
      { type: "quote", text: "Rule of thumb: the best framework is the tool's default template plus the three layers your tests have genuinely needed twice." }
    ]
  },
  {
    id: "debugging-failing-tests",
    num: "068",
    title: "When a Test Fails: A Debugging Workflow for Flaky Tests",
    dek: "A red test is a patient, not a verdict: reproduce locally, read the trace, isolate with repeat runs, classify the failure, then fix it or file it with evidence attached.",
    date: "2026-07-10",
    read: "4 min",
    category: "Automation",
    difficulty: "intermediate",
    tags: ["debugging", "flaky-tests", "troubleshooting"],
    status: "green",
    body: [
      { type: "p", text: "Three runs out of ten. Same test, same branch, same build — the checkout spec passes three times, fails seven, and the team chat holds three theories. Before anyone guesses, run a workflow that turns the red X into either a fix or a filed bug with evidence." },
      { type: "p", text: "Debugging a failing test is a diagnosis, not a coin flip. Treat the test like a patient: the failure report is the chart, the trace is the X-ray, and isolation tells you whether the illness appears on demand. Diagnosis first, then treatment — or a referral to a bug ticket when the disease is in the app." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Unclassified failures teach a team to ignore red: rerun until green, shrug, move on, and real bugs drown in flake. The reverse error is just as costly: filing 'the app is broken' when the locator drifted wastes a developer's hour and your credibility. A named workflow also survives handoffs: the next person can see what was ruled out and why." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Run the same loop every time, in this order:" },
      { type: "ul", items: [
        "Reproduce locally — run the exact test on your machine against the same environment the run used; a failure you can trigger on demand is half understood.",
        "Read the failure — expected versus actual, screenshot, video, trace; the report names the line and the element, so let it talk first.",
        "Isolate — run the test alone, then again; green alone means interference or a data collision, random results mean flake, consistent red means reproducible.",
        "Classify — locator drift (the element moved or renamed), timing (a missing wait), data (missing or leftover records), environment (staging redeployed mid-run), or a real bug.",
        "Fix what is yours — locator, wait, data setup — with the smallest change that addresses the cause, not the symptom.",
        "Fix or file — an app bug gets a ticket with the trace attached; an unexplained flake gets quarantined with a linked ticket and an owner, never a silent skip."
      ] },
      { type: "p", text: "Concrete commands for the isolate step, using Playwright's name filter and trace viewer:" },
      { type: "code", lang: "bash", label: "scripts/debug-checkout.sh", code: `# Run only the failing test by name
npx playwright test e2e/checkout.spec.ts --grep "adds a promo code"

# Tell flake from failure: run the same test five times
npx playwright test e2e/checkout.spec.ts --grep "adds a promo code" --repeat-each=5

# Record a trace on every attempt, then open it
npx playwright test e2e/checkout.spec.ts --grep "adds a promo code" --trace on
npx playwright show-trace test-results/checkout-adds-a-promo-code/trace.zip` },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Open the CI failure page and read the trace before forming any theory.",
        "Run the single test with --grep locally; never debug inside a three-hundred-test run.",
        "Repeat it five times with --repeat-each to separate flake from consistent failure.",
        "Throttle the network and rerun; timing flakes reproduce under a slow connection.",
        "Run the test headed or in UI mode and pause at the failing step to see the real page."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Rerunning until green and moving on — the suite learns nothing and the flake returns. Instead, record the failure rate and open a ticket.",
        "Debugging from the CI log alone — it names the line, not what the page looked like. Instead, pull the trace, video, or screenshot into the investigation.",
        "Fixing the symptom with a bigger wait — the sleep-versus-condition race returns next week. Instead, name the condition and wait for it.",
        "Muting or skipping tests silently — coverage shrinks invisibly. Instead, quarantine with a linked ticket, an owner, and a review date.",
        "Assuming the app is broken — half of red runs are locator drift, data, or environment. Instead, classify before filing.",
        "Ignoring the environment — staging may have been redeployed mid-run. Instead, check recent deploys and config changes first."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Set trace: 'retain-on-failure' in CI so evidence exists by default on every red run.",
        "Name tests by behavior so --grep finds them in one try.",
        "Keep a one-line note per investigation — symptom, classification, fix; patterns emerge by the tenth flake.",
        "Review the quarantine list weekly; every entry has an owner and an expiry.",
        "When you fix a flake, write the cause in the ticket; future-you is the reader."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Reproduce, read, isolate, classify, fix or file — in that order, every time.",
        "One test, five runs: the fastest way to tell flake from failure.",
        "Traces and screenshots separate debugging from guessing.",
        "Classify before filing: locator, timing, data, environment, or real bug."
      ] },
      { type: "quote", text: "Interview tip: walk through this loop when asked 'a test fails in CI — what do you do?'; the order matters more than any single tool you name." }
    ]
  }
];
