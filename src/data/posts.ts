export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang: "ts" | "python" | "yaml" | "bash"; label: string; code: string };

export type PostStatus = "green" | "flaky" | "quarantined" | "draft";

export interface Post {
  id: string;
  num: string;
  title: string;
  dek: string;
  date: string;
  read: string;
  tags: string[];
  status: PostStatus;
  body: Block[];
}

const POST_1: Post = {
  id: "flaky-tests-debt-schedule",
  num: "018",
  title: "Flaky Tests Are a Debt Schedule",
  dek: "A test that fails once in five hundred runs is not bad luck. It is a loan you took out against your future pipeline, accruing interest on every single merge.",
  date: "2026-07-14",
  read: "9 min",
  tags: ["flakiness", "ci", "pytest"],
  status: "green",
  body: [
    {
      type: "p",
      text: "Every team eventually meets the flaky test: it passes locally, fails in CI, passes on retry, and everyone shrugs. The engineering cost is not the red cross on the dashboard — it is the learned behavior that follows. Once people believe a red build might be nobody's fault, they stop treating red as an emergency, and the pipeline quietly loses its only job, which is to be a reliable signal. A flaky suite is worse than no suite, because a lie you half-trust is harder to reject than a truth you can see is missing.",
    },
    {
      type: "p",
      text: "Flakiness is not one bug, it is a family of them, and each member needs a different fix. The usual suspects are shared state between tests and suite-order dependence; timing assumptions buried in sleeps and race conditions; the outside world — networks, clocks, file systems, container startup; and resource leaks that only surface under parallelism. Writing down which category you are dealing with turns an intimidating mystery into a checklist, and most teams discover that eighty percent of their flake comes from just two of these buckets.",
    },
    {
      type: "p",
      text: "The workflow that has survived contact with reality for me is quarantine plus budget. When a test flakes, it does not get a shrug — it gets a ticket and a marker, so its failures stop poisoning the main signal. The suite reports a flake rate as a first-class metric, the same way you track p95 latency, and the number has an owner and a target. You are allowed to ship with quarantined tests; you are not allowed to stop paying down the quarantine list, because that is how debt schedules die.",
    },
    {
      type: "code",
      lang: "python",
      label: "tests/test_checkout_flaky.py",
      code: `import pytest

# Quarantined: tracked in QA-412, flake rate 0.4% over 5000 runs.
# Root cause category: timing assumption (fixed with explicit wait).
@pytest.mark.flaky(reruns=2, condition=IS_CI)
@pytest.mark.timeout(30)
def test_checkout_applies_discount(checkout_page):
    checkout_page.add_item("QA-CLASSIC-TEES")
    checkout_page.apply_code("FLAKE-FREE")

    # Wrong: time.sleep(2)  -- hope is not a wait strategy.
    # Right: wait for the observable state change.
    checkout_page.wait_for_selector(
        "[data-testid=discount-applied]", timeout=5_000
    )
    assert checkout_page.total_text() == "$45.00"`,
    },
    { type: "h", text: "Quick wins that cut flake in half" },
    {
      type: "ul",
      items: [
        "Ban bare sleeps; require condition-based waits with a timeout and a readable error.",
        "Seed all randomness and freeze clocks; chaos is a feature of the system under test, not the test.",
        "Give every test its own temp directory and database schema; the single-writer rule ends most order bugs.",
        "Record rerun counters in CI and chart the flake rate per suite — you cannot burn down what you do not measure.",
      ],
    },
    {
      type: "p",
      text: "None of this is glamorous, and that is the point. Quality engineering is mostly the unglamorous work of making signals trustworthy again. Pay the flake debt on a schedule, in public, and the pipeline becomes something the team believes in — which is the only return that matters on the investment of an automated suite.",
    },
  ],
};

const POST_2: Post = {
  id: "test-pyramid-budget",
  num: "017",
  title: "The Test Pyramid Is a Budget, Not a Law",
  dek: "Chest-thumping about unit test counts is easy. Deciding where each new test belongs — and which regressions you will never automate — is the actual job.",
  date: "2026-06-30",
  read: "8 min",
  tags: ["strategy", "architecture", "playwright"],
  status: "green",
  body: [
    {
      type: "p",
      text: "The test pyramid was drawn as a cost curve: unit tests are cheap and fast, end-to-end tests are expensive and slow, so stack them accordingly. It is good advice for a 2010 monolith and confusing advice for a 2026 product that is one design system, three microservices, and a marketing site glued together. The pyramid's core insight survives — push verification down to the cheapest layer that can catch the bug — but the shape of your suite should be derived from your product, not from a diagram on a conference slide.",
    },
    {
      type: "p",
      text: "Modern stacks bend the pyramid legitimately. A component-driven frontend earns its component-test layer, because rendering regressions live between unit and full E2E. A microservice topology earns contract tests, because they catch integration breaks without needing both services running in the same environment. A checkout flow earns a small, stubborn set of true end-to-end journeys, because the business literally cannot afford for those to be broken. The question is never how many tests you have at each layer; it is which layer catches each class of bug cheapest.",
    },
    {
      type: "p",
      text: "The framing that works for me is a budget per layer: how long may this layer take to run, who owns its failures, and what classes of bug is it responsible for? When a new bug escapes, run a gap analysis — which layer should have caught it, and why did it not? That analysis, repeated over quarters, reshapes the suite far more usefully than any idealized diagram. Suites that grow by accident accrete in the layer that was easiest to write in, not the layer that was right.",
    },
    {
      type: "code",
      lang: "ts",
      label: "e2e/smoke.spec.ts",
      code: `import { test, expect } from "@playwright/test";

// Budget: the whole smoke pack must finish under 90s.
// Scope: the 8 journeys the business cannot lose.
test("guest checkout completes end to end", async ({ page }) => {
  await page.goto("/catalog/qa-classic-tees");

  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Cart" }).click();

  await page.getByLabel("Email").fill("smoke@assert.dev");
  await page.getByRole("button", { name: "Pay" }).click();

  await expect(
    page.getByTestId("order-confirmation")
  ).toContainText("Thanks", { timeout: 10_000 });
});`,
    },
    { type: "h", text: "The kill list" },
    {
      type: "ul",
      items: [
        "Do not unit test constructors, config objects, or getters that return what a field stores — coverage theater.",
        "Do not write an E2E test for a breakage a contract test catches ten times faster.",
        "Do not automate a check you run once a quarter; write a runbook instead.",
        "Do not let any layer exceed its runtime budget without a written exception — slow suites get skipped, and skipped suites rot.",
      ],
    },
    {
      type: "quote",
      text: "Automate decisions, not accidents. Every test in the suite should exist because a specific class of bug was worth a specific cost to catch.",
    },
    {
      type: "p",
      text: "Treat the pyramid as a budgeting tool and the guilt disappears. You are allowed to have more E2E tests than the diagram permits, as long as each one pays rent: it catches bugs the cheaper layers cannot, it runs inside its budget, and someone owns it. That is the whole rule.",
    },
  ],
};

const POST_3: Post = {
  id: "shift-left-without-chaos",
  num: "016",
  title: "Shift-Left Without Shifting Chaos",
  dek: "Testing earlier only helps if the feedback is fast, kind, and actionable. A five-minute lint gate beats a forty-minute suite nobody runs locally.",
  date: "2026-06-12",
  read: "7 min",
  tags: ["process", "devex", "jest"],
  status: "green",
  body: [
    {
      type: "p",
      text: "Shift-left means moving quality work earlier: reviewing acceptance criteria before code exists, turning examples into executable checks, and catching bugs at the desk instead of the release war room. Done well, it is the cheapest quality intervention that exists, because the cost of a fix grows roughly an order of magnitude per stage it survives. Done badly, it means dumping a forty-minute test suite into pre-push hooks and wondering why developers start pushing with --no-verify.",
    },
    {
      type: "p",
      text: "The failure mode is always the same: the developer experience tax. If the local loop takes longer than two minutes, people stop running it. If the suite is flaky, people stop trusting it. If failure output is a wall of red with no pointer to the actual broken behavior, people start re-running instead of reading. Every one of those is a tax on the exact people you asked to adopt testing earlier, and taxes get avoided. Shift-left initiatives fail socially before they fail technically.",
    },
    {
      type: "p",
      text: "The fix is a ladder, ordered by how fast each rung returns. Typecheck and lint run in seconds on save. Affected-only unit tests run on pre-push and finish in about a minute. Contract and integration tests run on the pull request, in parallel, in a clean environment. The full E2E pack runs after merge or nightly, where slow and occasionally flaky is tolerable. Each rung gets stricter and slower, and nothing slow ever blocks the fast loop.",
    },
    {
      type: "code",
      lang: "ts",
      label: "cart.test.ts",
      code: `import { buildCart } from "@/test/factories/cart";
import { applyDiscount } from "./cart";

// Arrange - Act - Assert, with a factory doing the arranging.
it("stacks a percentage discount after a fixed one", () => {
  const cart = buildCart({
    items: [{ sku: "QA-TEE", price: 5000, qty: 2 }],
    discounts: [
      { code: "FIXED5", kind: "fixed", amount: 500 },
      { code: "PCT10", kind: "percent", rate: 0.10 },
    ],
  });

  const total = applyDiscount(cart).totalCents;

  expect(total).toBe(8500); // (10000 - 500) - 10%
});`,
    },
    { type: "h", text: "The shift-left checklist" },
    {
      type: "ul",
      items: [
        "Turn each acceptance criterion into a named test before implementation starts — example mapping, not paperwork.",
        "Keep the pre-push loop under two minutes by testing only code your change actually touches.",
        "Write failure messages for the reader having a bad day: what broke, what was expected, what was received, which ticket owns it.",
        "Treat a red build owned by nobody as the incident it is — the first person available re-triggers, the author explains.",
      ],
    },
    {
      type: "p",
      text: "Culture is the multiplier here. A failing pull request should read as a conversation the pipeline is having with the author, not an accusation from a machine. Teams where red builds are discussed calmly fix them fast; teams where red is shameful hide them, and hidden red is how releases get burned. Shift-left is a promise about feedback speed and kindness — keep both, and the earlier testing pays for itself within a sprint.",
    },
  ],
};

const POST_4: Post = {
  id: "assertions-that-fail-well",
  num: "015",
  title: "Assertions That Fail Well",
  dek: "An assertion is an error message you write for a future engineer having a bad day. Write it like it's a gift.",
  date: "2026-05-27",
  read: "6 min",
  tags: ["craft", "jest", "hypothesis"],
  status: "green",
  body: [
    {
      type: "p",
      text: "The average assertion fails once when the author is watching, and a hundred more times when they are not — usually in a pipeline at 2 a.m., in front of someone who did not write it. Every failure is a message from the past, and most suites send messages like `expected false to be true`, which is technically accurate and completely useless. Debugging time is a function of how much context the failure carries, so a good assertion is not a correctness tool only; it is a communication tool.",
    },
    {
      type: "p",
      text: "Three principles carry most of the weight. First, one concept per assertion: a test named reports_overdue_invoices should not also be the place you discover date serialization broke. Second, assert on semantic fields, not whole objects — comparing an entire 40-field payload means every unrelated change breaks the message and buries the real delta. Third, attach context the reader cannot reconstruct: the input, the request id, the expected-versus-actual diff, the ticket that owns the behavior.",
    },
    {
      type: "code",
      lang: "ts",
      label: "invoice.test.ts",
      code: `// Fails poorly: a mystery for the 2 a.m. pager.
expect(result).toBeTruthy();

// Fails well: same check, now with a diagnosis.
expect(result, \`invoice \${invoice.id} should be overdue
  dueDate:  \${invoice.dueDate.toISOString()}
  now:      \${clock.now().toISOString()}
  expected status: overdue
  received status: \${result.status}\`
).toMatchObject({ status: "overdue", balanceCents: 0 });`,
    },
    {
      type: "p",
      text: "Snapshots deserve a paragraph of their own, because they are assertions wearing a disguise. A snapshot is fine when it is reviewed like code, named like a variable, and pruned like a garden. It is a hazard when it is a 4,000-line blob that someone blind-accepted in a rush, because from that day on the test asserts that reality is whatever it currently is — the suite equivalent of moving the target onto the arrow.",
    },
    {
      type: "p",
      text: "When examples run out, invariants take over. Property-based testing — Hypothesis in Python, fast-check in TypeScript — generates hundreds of inputs and asserts relationships that must always hold: serializing then deserializing is the identity, applying a refund never exceeds the charge, sorting never loses an element. It finds the off-by-one you could not imagine and, just as valuable, it forces you to state your function's contract out loud, which is where half the bugs die of exposure.",
    },
    {
      type: "code",
      lang: "python",
      label: "tests/test_serialization.py",
      code: `from hypothesis import given, strategies as st

@given(st.dates(), st.integers(min_value=0, max_value=10**9))
def test_invoice_roundtrip_is_identity(due_date, balance_cents):
    invoice = Invoice(due_date=due_date, balance_cents=balance_cents)
    restored = Invoice.from_json(invoice.to_json())
    assert restored == invoice  # invariant, not an example`,
    },
  ],
};

const POST_5: Post = {
  id: "contract-testing-peace-treaty",
  num: "014",
  title: "Contract Testing: A Peace Treaty for Microservices",
  dek: "Integration test sprawl grows until two teams' staging environments meet. Contracts let the consumer and provider agree — in CI, not in a Slack thread.",
  date: "2026-05-08",
  read: "8 min",
  tags: ["api", "contract", "ci"],
  status: "green",
  body: [
    {
      type: "p",
      text: "Cross-service testing starts polite and ends in scheduling therapy. Team A's end-to-end suite needs Team B's service, which needs Team C's database, which is being migrated this sprint, so the suite gets skipped, and the skipped suite gets deleted, and the deleted integration is rediscovered by an incident commander at 3 a.m. The problem is not laziness; it is that full-stack integration tests require three teams' calendars, environments, and deploy trains to align — an agreement that decays weekly.",
    },
    {
      type: "p",
      text: "Consumer-driven contract testing replaces the shared environment with a shared artifact. The consumer writes a test that records exactly what it asks of the provider — endpoints, request shapes, response fields it actually reads, status codes it handles — and publishes that recording as a contract. The provider then verifies the contract inside its own pipeline, with its own real implementation and no consumer in sight. A break fails the provider's build before the consumer ever deploys, and the negotiation happens in code review instead of incident review.",
    },
    {
      type: "code",
      lang: "ts",
      label: "pact/consumer.test.ts",
      code: `import { PactV3, MatchersV3 as m } from "@pact-foundation/pact";

// Consumer side: define what checkout NEEDS from pricing.
const provider = new PactV3({ consumer: "checkout", provider: "pricing" });

it("quotes a unit price for a known sku", async () => {
  await provider
    .given("sku QA-TEE exists with price 5000")
    .uponReceiving("a price quote request")
    .withRequest({ method: "GET", path: "/prices/QA-TEE" })
    .willRespondWith({
      status: 200,
      body: { unitCents: m.integer(5000), currency: m.term("USD", /USD|EUR/) },
    })
    .executeTest(async (mock) => {
      const quote = await fetchQuote(mock.serverUrl, "QA-TEE");
      expect(quote.unitCents).toBe(5000);
    });
});`,
    },
    {
      type: "p",
      text: "If a broker feels heavy, the schema-first alternative gets you most of the peace: publish an OpenAPI or JSON Schema definition, verify responses against it in the consumer's tests, and run a backwards-compatibility diff of the schema in the provider's CI. The diff gate is the quiet hero — it turns the question can we rename this field into a red or green build instead of a judgment call made under deadline pressure at 6 p.m. on a Friday.",
    },
    {
      type: "code",
      lang: "python",
      label: "tests/test_pricing_contract.py",
      code: `import jsonschema

PRICING_SCHEMA = {
    "type": "object",
    "required": ["unitCents", "currency"],
    "properties": {
        "unitCents": {"type": "integer", "minimum": 0},
        "currency": {"enum": ["USD", "EUR"]},
    },
    "additionalProperties": False,
}

def test_pricing_response_matches_published_schema(pricing_stub):
    response = pricing_stub.get("/prices/QA-TEE").json()
    jsonschema.validate(response, PRICING_SCHEMA)  # fails loudly on drift`,
    },
    { type: "h", text: "Rollout notes from the field" },
    {
      type: "ul",
      items: [
        "Start with the noisiest cross-team integration — the one that pages people across org charts.",
        "Version contracts and keep at most two alive; archaeology is not a compatibility strategy.",
        "Fail the provider build on contract breakage on day one; a soft gate teaches everyone the gate is decorative.",
        "Canary with compatibility headers before full cutover, so an unnoticed consumer can scream before it dies.",
      ],
    },
  ],
};

const POST_6: Post = {
  id: "ci-performance-budgets",
  num: "013",
  title: "CI Should Fail on Performance Regressions",
  dek: "You have lint, type, and unit gates. Then a latency regression ships because staging Wi-Fi felt fine. Put a number on fine.",
  date: "2026-04-21",
  read: "7 min",
  tags: ["ci", "performance", "k6"],
  status: "flaky",
  body: [
    {
      type: "p",
      text: "Performance bugs are the only class of defect that arrives politely, stays forever, and compounds interest. No one notices the extra 40 milliseconds on the invoice endpoint; then it sits in the hot path of a batch job, the batch overruns its window, the window slips into business hours, and suddenly the release train is delayed by something that could have been a red build eight weeks earlier. A regression you do not measure is a regression you have scheduled.",
    },
    {
      type: "p",
      text: "The fix is a budget, expressed in the same units the pipeline already speaks. Pick the numbers users actually feel: p95 latency per critical endpoint, bundle size per route, Largest Contentful Paint and Interaction to Next Paint on the top five pages. Then make the budget a gate: a pull request that pushes p95 past the line fails, with a comment showing the delta. Vague vibes produce vague performance; a number with an owner produces decisions.",
    },
    {
      type: "code",
      lang: "yaml",
      label: ".github/workflows/perf.yml",
      code: `name: perf-budget
on: [pull_request]

jobs:
  k6-thresholds:
    runs-on: [self-hosted, perf-stable]   # dedicated runner: low noise
    steps:
      - uses: actions/checkout@v4
      - run: docker compose up -d app
      - run: k6 run --quiet load/checkout.js
        env:
          BASE_URL: http://localhost:8080
      # k6 thresholds inside load/checkout.js:
      #   thresholds: {
      #     http_req_duration: ["p(95)<180"],   # ms, budget from SLO
      #     http_req_failed:   ["rate<0.001"],
      #   }`,
    },
    {
      type: "p",
      text: "Noise is the entire difficulty. A shared CI runner with unpredictable neighbors will produce a histogram of lies, so budget checks run on a dedicated machine with warmed caches and a fixed throttle profile. Take several runs and compare percentiles, not bests — the best case is marketing, the 95th percentile is the truth. And automate the baseline: when a budget improves deliberately, a PR updates the recorded baseline, so the gate ratchets forward instead of anyone hand-editing thresholds to make a build pass.",
    },
    {
      type: "p",
      text: "Finally, be explicit about the fail margin. Failing a build for a 0.4 percent jitter teaches the team to override the gate, so set the hard fail at something like 10 percent over budget and the warning band below it, where the build goes yellow and posts a trend chart. The goal is not to catch every nanosecond — it is to make sure the conversation happens in the pull request, while the change that caused the regression is still warm in someone's working memory.",
    },
  ],
};

export const POSTS: Post[] = [POST_1, POST_2, POST_3, POST_4, POST_5, POST_6];

export interface ArchiveEntry {
  num: string;
  title: string;
  date: string;
  tags: string[];
  status: PostStatus;
  postId?: string;
}

export const ARCHIVE_DRAFTS: ArchiveEntry[] = [
  {
    num: "011",
    title: "Mutation Testing Won't Save You (But It Will Humble You)",
    date: "2026-02-02",
    tags: ["mutation", "coverage"],
    status: "draft",
  },
  {
    num: "010",
    title: "The Monday Test Data Cookbook",
    date: "2026-01-19",
    tags: ["test data", "fixtures"],
    status: "draft",
  },
  {
    num: "009",
    title: "Accessibility Is a Test Suite, Not an Audit",
    date: "2026-01-05",
    tags: ["a11y", "axe-core"],
    status: "draft",
  },
  {
    num: "008",
    title: "QA Notes on AI-Generated Code",
    date: "2025-12-15",
    tags: ["ai", "review"],
    status: "draft",
  },
];
