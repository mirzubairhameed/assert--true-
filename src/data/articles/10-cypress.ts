import type { Post } from "../post-types";

export const CYPRESS: Post[] = [
  {
    id: "cypress-first-test",
    num: "075",
    title: "Cypress: From Install to Your First Green Test",
    dek: "One npm install, one open command, and a runner appears with your specs listed. Write a two-line visit-and-contains test, learn the cypress folder layout, and go green before coffee.",
    date: "2026-07-21",
    read: "5 min",
    category: "Cypress",
    difficulty: "beginner",
    tags: ["cypress", "getting-started", "e2e"],
    status: "green",
    body: [
      { type: "p", text: "npm i cypress -D. npx cypress open. A control panel appears on your machine, lists every spec in the repo, and one click runs it in a real browser you can watch. No server to start, no config file to write first — the runner is the product." },
      { type: "p", text: "Cypress is an all-in-one end-to-end testing tool: runner, assertion helpers, command log, and time travel shipped together. Where other tools hand you an engine to build a car around, Cypress arrives as the whole car. That design makes the first day unusually short — install, open, click a spec, watch it drive — and that speed is a feature, not a toy." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Motivation is a testing-tool feature. A beginner who watches the browser click itself in minute five keeps going; one who debugs a scaffold for an hour often quits. The command log — every step with a DOM snapshot you can click back into — also teaches how the app actually works, which is precisely what a new QA hire is paid to learn." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Install as a dev dependency, then let the first open scaffold the folders: cypress/e2e/ holds specs, cypress/fixtures/ holds seed data like orders.json, cypress/support/ holds shared commands, and cypress.config.ts is the one settings file. Set baseUrl there once and every cy.visit can take a relative path. Then write the smallest honest test:" },
      { type: "code", lang: "ts", label: "cypress/e2e/first.cy.ts", code: `describe('home page', () => {
  it('shows the store name', () => {
    cy.visit('/');
    cy.contains('h1', 'QA Shop').should('be.visible');
  });
});

// cypress.config.ts needs one line inside e2e: baseUrl: 'https://qa-shop.example'
// Install first:  npm i cypress -D
// Open the runner: npx cypress open
// Run headless:    npx cypress run` },
      { type: "p", text: "Click the spec in the sidebar and the runner drives the browser while the command log fills on the left — each command expands to show the page as it looked at that moment, which is the time-travel feature. This all-in-one experience is Cypress's signature: assertions, retries, screenshots, and the log come with zero assembly. The same specs run without the interface as npx cypress run, the headless mode CI uses." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Run npm i cypress -D, then npx cypress open, and choose E2E Testing.",
        "Let the wizard scaffold the cypress/ folders and example specs.",
        "Set baseUrl in cypress.config.ts to your test environment.",
        "Replace one example spec with a real screen: cy.visit plus cy.contains.",
        "Click the spec in the runner and read each command's snapshot as it passes.",
        "Break it on purpose — change 'QA Shop' to nonsense — and study the failing command, its snapshot, and the screenshot."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Typing full URLs into every cy.visit — environments stop being swappable. Instead, set baseUrl once and navigate with relative paths.",
        "Hunting for cypress/integration from old tutorials — since version 10 specs live in cypress/e2e. Instead, follow the current scaffold.",
        "Naming specs without the .cy.ts suffix — the specPattern will not discover them. Instead, keep the naming convention.",
        "Judging stability by rerunning the GUI manually and eyeballing it — flakes hide that way. Instead, use npx cypress run and read its summary.",
        "Deleting every example spec without reading one — they demonstrate command patterns you will reuse. Instead, skim one, then prune."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "One describe block per page or flow, with it() names that state the behavior.",
        "Keep seed data in cypress/fixtures and load it with cy.fixture().",
        "Commit the scaffold and config so teammates get the same runner experience.",
        "Use the command log's snapshots as your first debugging tool before opening DevTools."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "npm i cypress -D plus npx cypress open is the entire bootstrap.",
        "cy.visit plus cy.contains makes a complete first test.",
        "baseUrl in cypress.config.ts keeps specs environment-free."
      ] },
      { type: "quote", text: "Interview tip: naming the cypress/e2e, fixtures, and support trio in your answer signals real project experience — tutorials rarely linger on folder layout, but every real repo has one." }
    ]
  },
  {
    id: "cypress-query-and-interact",
    num: "076",
    title: "Cypress: Querying and Interacting With cy.get and cy.contains",
    dek: "cy.get finds, .type types, .should asserts: one chain that retries until the element is ready. Learn why Cypress code has no const elements and no awaits, and why that is a feature.",
    date: "2026-07-22",
    read: "5 min",
    category: "Cypress",
    difficulty: "beginner",
    tags: ["cypress", "cy-get", "chaining"],
    status: "green",
    body: [
      { type: "p", text: "Where is the await? Every Cypress command looks like it finishes instantly, yet nothing has run by the time the next line is read. Every newcomer asks this in week one, and the answer is the moment Cypress stops feeling like magic and starts being usable." },
      { type: "p", text: "Cypress commands are queued, not executed on the spot: cy.get() adds a step to a list, and the runner works through the list after your file finishes loading. Queries also retry — cy.get('button') keeps looking until the button exists or the four-second command timeout expires. Handing an order slip to a barista is the model: you never hold the cup; the queue does the work and calls you when it is ready." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "The queue is why Cypress code has no const element handles and no awaits — and newcomers who add them produce code that reviews well and fails strangely. cy.get returns a chain, not an element; storing it freezes a moment instead of keeping the retry. Once that mental model clicks, the flaky-looking tests mostly disappear on their own." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "cy.get finds by selector, cy.contains finds by visible text, actions chain off either, and .should asserts with automatic retry. One login flow shows the whole grammar:" },
      { type: "code", lang: "ts", label: "cypress/e2e/auth.cy.ts", code: `describe('login', () => {
  it('signs in a returning customer', () => {
    cy.visit('/login');

    cy.get('input[name=email]')
      .type('dana@example.com')
      .should('have.value', 'dana@example.com');
    cy.get('input[name=password]').type('correct-horse-42');
    cy.contains('button', 'Sign in').click();

    cy.contains('h1', 'Welcome back').should('be.visible');
    cy.get('[data-cy=sign-out]').should('be.visible');
  });
});` },
      { type: "p", text: "The two anti-patterns arrive together: const saveBtn = cy.get('[data-cy=save]') stores a chain, and await cy.get(...) awaits nothing useful — commands are not promises you own. Instead, query at the moment of use and let the queue order everything; when you truly need a value, .then((value) => { ... }) transforms it inside the chain, and .as('alias') names it for later (note 078 goes deeper). Sleeps are the same mistake in disguise: cy.wait(3000) is a guess, while .should('be.visible') is a retry." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "cy.visit the page.",
        "Query with the most human handle available: text via cy.contains, attributes via cy.get.",
        "Chain the action: .type, .click, .check, or .select.",
        "Chain .should immediately to prove the state you meant to create.",
        "Add .and() for sibling conditions on the same element instead of new queries.",
        "Rerun with the runner open and read each command's snapshot until the flow is green."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Storing chains in const and reusing them later — the stored chain keeps an old moment alive and skips retries. Instead, query where you act.",
        "Wrapping specs in async/await — Cypress commands are not promises you own, so the keyword adds noise and nothing else. Instead, write straight-line chains.",
        "Selectors by style like .btn-primary — classnames churn with every redesign. Instead, use data-cy attributes or visible text.",
        "cy.wait(3000) where an assertion would do — the number waits blind while .should retries. Instead, assert.",
        "One it() covering login, search, and checkout — a failure anywhere muddies every report. Instead, one behavior per test."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Agree on one attribute convention with developers (data-cy is the house style) and use it when text is not unique.",
        "Prefer cy.contains for anything a user would read; reserve selectors for structure.",
        "Raise timeouts per command with { timeout: 10000 } for known-slow elements, not globally.",
        "Use .and() to batch related assertions so one command log entry tells the whole story."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Commands queue and retry; that replaces both await and sleep.",
        "cy.get for structure, cy.contains for meaning, .should for proof.",
        "Never store a chain; query at the moment of use."
      ] },
      { type: "quote", text: "Interview tip: 'Why does Cypress not need await?' is a real junior interview question — answer 'commands are queued and queries retry', and you sound like someone who read past page one of the docs." }
    ]
  },
  {
    id: "cypress-intercept-stubbing",
    num: "077",
    title: "Cypress: Controlling the Network With cy.intercept",
    dek: "cy.intercept can watch a real request, replace its response with a fixture, or block it. Alias it, cy.wait for it, and test the edge cases no staging server can produce on demand.",
    date: "2026-07-24",
    read: "5 min",
    category: "Cypress",
    difficulty: "intermediate",
    tags: ["cypress", "cy-intercept", "network"],
    status: "green",
    body: [
      { type: "p", text: "The staging API went down at 3 p.m. and the whole E2E suite went red, although the frontend had not changed. A teammate stubbed GET /api/orders with two lines and spent the afternoon testing the empty-state screen the real API had never once returned. The outage became the best demo of why cy.intercept exists." },
      { type: "p", text: "cy.intercept sits between the app and the network with three postures: spy (let the request through and record it), stub (answer with your own status and body), or modify. Alias the intercept with .as('orders') and cy.wait('@orders') syncs your assertions to the network event instead of to a clock. It is a phone tap you can upgrade into a fake phone line whenever the real caller cannot be booked." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Stubs decouple UI tests from backend mood and let you summon states no staging server can produce on demand: a 500, an empty list, a slow response with a spinner. The danger is symmetrical: stub everything and your suite proves only that your mocks render — if the API renames total to grandTotal tomorrow, a fully stubbed suite stays green while production breaks." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Set the intercept before navigation, alias it, visit, wait for the alias, then assert the UI against the values you injected:" },
      { type: "code", lang: "ts", label: "cypress/e2e/orders.cy.ts", code: `describe('order history', () => {
  it('renders the orders list from the API payload', () => {
    cy.intercept('GET', '/api/orders', {
      statusCode: 200,
      body: [
        { id: 'ord_84512', status: 'paid', total: 85.8 },
        { id: 'ord_84513', status: 'shipped', total: 12 },
      ],
    }).as('orders');

    cy.visit('/account/orders');
    cy.wait('@orders'); // the UI and the network are now in sync

    cy.contains('ord_84512').should('be.visible');
    cy.contains('$85.80').should('be.visible');
  });
});` },
      { type: "p", text: "Keep the stub honest and the scope narrow. Copy payload shapes from the real Network tab into cypress/fixtures/orders.json rather than inventing them, and reserve stubs for the branches reality rarely shows: a 500 body, an empty array, a delay: 2000 to exercise the spinner. Keep at least one thin smoke run against real services so contract changes still surface — a suite of only mocks is a suite that tests mocks." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Find the real request in DevTools: method, path, response shape.",
        "cy.intercept('GET', '/api/orders', { ... }) with a fixture or literal body, placed before cy.visit.",
        "Alias it: .as('orders').",
        "cy.visit the page, then cy.wait('@orders').",
        "Assert the rendered UI against the stubbed values, including the money formatting.",
        "Duplicate the test with a 500 body and an empty array for the edge branches."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Stubbing every endpoint in every test — the suite ends up testing your mocks. Instead, stub edge cases and keep real smoke coverage.",
        "cy.wait(3000) with a number instead of cy.wait('@orders') — one is a guess, the other an event. Instead, wait on the alias.",
        "Intercepting after cy.visit — the app may fire the request before the wire is in place. Instead, set intercepts first.",
        "Inventing payload shapes — the UI under test drifts from production reality. Instead, copy real responses into fixtures.",
        "Asserting only that 'the list renders' — the 500 and empty branches are one line away while you are here. Instead, cover them now."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Store stubs as JSON fixtures and reuse them across specs.",
        "Give each edge case its own it(): one for the 500, one for empty, one for slow.",
        "Use intercept as a spy (no body) to assert the frontend asked for the right query parameters.",
        "Name aliases after endpoints ('orders', 'profile') so the command log reads itself."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Intercept before visit, alias with .as(), wait with cy.wait('@alias').",
        "Stub the states staging cannot summon: 500s, empties, slowness.",
        "Mocks are seasoning, not the meal — keep real smoke coverage."
      ] },
      { type: "quote", text: "Interview tip: when asked about test stability, say that cy.intercept removes backend nondeterminism — then name the trade-off yourself: stubbed suites still need a thin real-API run or they only test mocks." }
    ]
  },
  {
    id: "cypress-custom-commands",
    num: "078",
    title: "Cypress: Custom Commands and Aliases",
    dek: "Twelve lines of login pasted into forty specs is a maintenance bill. Put the flow in Cypress.Commands.add once, call cy.login everywhere, and use .as() aliases to name what matters.",
    date: "2026-07-26",
    read: "5 min",
    category: "Cypress",
    difficulty: "intermediate",
    tags: ["cypress", "custom-commands", "aliases"],
    status: "green",
    body: [
      { type: "p", text: "By March, the same 12 lines of login code lived in 41 spec files. Then the app added a 'trust this device' step, and someone had to find, update, and re-verify all 41. The fix itself took twenty minutes — once the flow existed in exactly one place." },
      { type: "p", text: "Cypress.Commands.add teaches the cy object a new verb: define cy.login once, and every spec reads like the user story instead of the choreography. Aliases are the same idea at smaller scale — .as() gives a name to an element, a value, or a network route, and @ reads it back later. Teach the robot one word, and label the boxes it hands you." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Reuse is what keeps a suite maintainable past ten specs, and readability is what keeps it reviewable. Commands centralize flows; aliases remove the awkward middle ground where you would otherwise store chains or re-query awkwardly. Both are also standard interview territory for automation roles, so they pay twice." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Commands live in cypress/support/commands.ts, which cypress/support/e2e.ts imports on every run. Declare the type so TypeScript and autocomplete recognize cy.login, then define the flow and end it with an assertion:" },
      { type: "code", lang: "ts", label: "cypress/support/commands.ts", code: `/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.contains('button', 'Sign in').click();
  cy.contains('h1', 'Welcome back').should('be.visible');
});

// Any spec can now start with: cy.login('qa@shop.test', 'correct-horse-42');` },
      { type: "p", text: "Aliases cover the rest: cy.get('[data-cy=checkout]').as('checkout') then cy.get('@checkout') re-queries by name; cy.intercept(...).as('orders') names a route (note 077); cy.wrap(user.email).as('email') names a value, read back inside a function () {} callback as this.email. One trap worth memorizing: this.email does not exist inside arrow-function callbacks — use a regular function or read the alias with cy.get('@email'). When the suite grows, explore cy.session(), which caches the login so cy.login does not repeat the UI dance for every test." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Spot the flow repeated across specs — typically login.",
        "Move it into Cypress.Commands.add('login', ...) in cypress/support/commands.ts.",
        "Declare it in the Cypress Chainable interface so cy.login type-checks.",
        "Replace every copy with cy.login('qa@shop.test', 'correct-horse-42').",
        "End the command with a .should() so the promised state is proven before specs continue.",
        "Alias whatever a later step needs — element, value, or route — and read it back with @."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "A command for every tiny step — cy.clickSubmitButton() hides the user journey inside the helper. Instead, commands for repeated flows, plain chains elsewhere.",
        "Defining the command without the Chainable declaration — TypeScript rejects cy.login in every spec. Instead, extend the namespace in commands.ts.",
        "Reading this.myAlias inside an arrow callback — it is undefined there. Instead, use function () {} or cy.get('@myAlias').",
        "Hiding a sleep inside a command — the call site looks tidy and stays flaky. Instead, let the final .should() do the waiting.",
        "One mega-command doing login, add-to-cart, and checkout — a checkout bug reruns everything. Instead, one command per flow."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Name commands after user intent (login, addToCart), not after clicks.",
        "End every command with an assertion so specs continue from a proven state.",
        "Parameterize credentials from env or fixtures — no hard-coded passwords in support files.",
        "Adopt cy.session() once the suite grows; cached sessions cut minutes off big runs."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Cypress.Commands.add teaches cy a verb; cypress/support/commands.ts is its home.",
        ".as() names elements, values, and routes; @ reads them back.",
        "One command per flow, each ending in a proven state."
      ] },
      { type: "quote", text: "Interview tip: 'How do you avoid copy-pasted setup in Cypress?' — answer with Cypress.Commands.add, the support folder, and cy.session for cached logins, in that order." }
    ]
  },
  {
    id: "playwright-vs-cypress",
    num: "079",
    title: "Playwright vs Cypress: How to Choose, Honestly",
    dek: "Same job, different machines: out-of-process Playwright drives any language and every tab; in-browser Cypress owns one tab and one language. Six honest dimensions and a constraint-based verdict.",
    date: "2026-07-27",
    read: "5 min",
    category: "Cypress",
    difficulty: "beginner",
    tags: ["playwright", "cypress", "tool-choice"],
    status: "green",
    body: [
      { type: "p", text: "'We get to pick one automation tool next quarter — which one?' The honest answer is a constraint list, not a brand. Both tools are excellent, both are hireable, and each is the wrong choice for some team." },
      { type: "p", text: "The differences trace back to one architectural bet. Playwright runs outside the browser and drives Chromium, Firefox, and WebKit over a protocol, so it can control anything a browser can do — new tabs, multiple origins, separate contexts. Cypress executes inside the browser, sharing the page's own world, which buys a uniquely smooth runner and costs reach. Nearly everything on this page follows from that one choice." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "A tool choice is a year-long commitment: specs, CI setup, skills, hiring, and the team's habits all stick to it, and switching later costs real sprints. Hype posts argue from feature lists; teams should argue from their own constraints — the app's architecture, the team's languages, the CI budget, and how much of the product lives in iframes." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Feel the two grammars side by side before the verdicts — same login flow, two dialects:" },
      { type: "code", lang: "ts", label: "comparison/side-by-side.ts", code: `// tests/auth.spec.ts (Playwright)
test('sign in', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('qa@shop.test');
  await page.getByLabel('Password').fill('correct-horse-42');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
});

// cypress/e2e/auth.cy.ts (Cypress)
it('signs in', () => {
  cy.visit('/login');
  cy.get('input[name=email]').type('qa@shop.test');
  cy.get('input[name=password]').type('correct-horse-42');
  cy.contains('button', 'Sign in').click();
  cy.contains('h1', 'Welcome back').should('be.visible');
});` },
      { type: "p", text: "Six dimensions decide most team debates, each with a concrete verdict:" },
      { type: "ul", items: [
        "Architecture — Playwright drives browsers out-of-process: new tabs, popup flows, and multiple origins work in one test. Cypress runs in-browser in a single tab and origin, so multi-tab flows need workarounds. Verdict: if your flows open tabs or cross domains, this dimension decides it.",
        "Languages — Playwright speaks TypeScript, JavaScript, Python, Java, and .NET; Cypress is JavaScript and TypeScript only. Verdict: mixed-skill teams lean Playwright; frontend-aligned teams lose nothing with Cypress.",
        "Parallelism — Playwright parallelizes for free with workers plus free CI sharding; open-source Cypress runs serially, and parallel runs require Cypress Cloud, historically the paid dashboard. Verdict: large suites on a budget favor Playwright.",
        "iframes and multi-tab — Playwright's frameLocator and page APIs handle embedded frames and new pages natively; Cypress handles iframes only with effort and cannot drive real new tabs. Verdict: payment SDKs and editor widgets push you to Playwright.",
        "Learning curve — Cypress's all-in-one runner with time travel is the gentlest start in the field; Playwright's UI Mode and Trace Viewer are close behind but assume fixtures and config concepts up front. Verdict: Cypress on-ramps faster; Playwright pays off as the suite grows.",
        "Ecosystem — Playwright has Microsoft's release cadence and a multi-language community; Cypress is mature with excellent docs, plugins, and a large installed base. Verdict: both safe; job ads list both, so neither is a career risk."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Choosing from hype instead of constraints — someone else's perfect tool was shaped by their app, not yours. Instead, write your constraint list first.",
        "Comparing syntax length instead of running each tool against your hardest real page — the third-party iframe checkout is the real benchmark. Instead, prototype the nasty flow.",
        "Assuming Cypress cannot parallelize at all — Cypress Cloud does it, for money. Instead, price the budget question honestly.",
        "Migrating an old suite line by line — each tool has its own idioms, and ported habits read badly in both. Instead, rewrite ten specs natively before judging."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Write the constraints down first: team languages, app architecture, CI budget, iframe and tab needs.",
        "Prototype one genuinely hard flow in each tool before committing.",
        "Whichever wins, adopt its idioms — fixtures in Playwright, commands in Cypress — instead of porting habits.",
        "Learn both to reading level; the job market expects you to recognize either."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "One architectural bet explains it all: out-of-process freedom versus in-browser smoothness.",
        "Parallelism is free in Playwright and paid in Cypress Cloud.",
        "Iframe-heavy or multi-tab flows push you to Playwright.",
        "Both are hireable skills; constraints, not hype, should sign the decision."
      ] },
      { type: "quote", text: "Interview tip: 'Playwright or Cypress?' is a trap question — answer with your constraints ('our checkout lives in a payment iframe, so Playwright') and you sound senior whichever way you chose." }
    ]
  },
];
