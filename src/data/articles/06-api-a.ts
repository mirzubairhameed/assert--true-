import type { Post } from "../post-types";

export const API_A: Post[] = [
  {
    id: "api-testing-101",
    num: "043",
    title: "API Testing 101: Start Testing Before the UI Exists",
    dek: "The UI is two sprints away and the backend is live. Here is what to test first: happy paths, status codes, payload shapes, errors, auth, and the ugly edge cases.",
    date: "2026-06-03",
    read: "5 min",
    category: "API Testing",
    difficulty: "beginner",
    tags: ["api-testing", "status-codes", "test-strategy"],
    status: "green",
    body: [
      { type: "p", text: "It is day one on the shop team and the lead says the sentence every new tester should learn to love: 'The orders backend is deployed. The new UI is two sprints out. Start testing the API.' No screen to click, no page to load — just a base URL, a token, and a payload. This is where a lot of real testing happens, and it is the part beginners skip." },
      { type: "p", text: "Think of the API as the kitchen of a restaurant while the dining room is still being painted. The kitchen is already cooking, and you can walk in and taste the food directly. Calling an endpoint shows you exactly what the system does with your request — no buttons, styling, or JavaScript in between — and what comes back is the truth: a status code, some headers, and a body." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Every UI click ends in an API call, so API bugs are user bugs even when the screen looks fine. Suppose the loyalty discount lives in the order service: POST /orders takes 10% off carts over 50 dollars. A UI test clicks through checkout and passes, because the page shows a total — but the API computed the discount as 4.50 instead of 5.00, and the UI displayed the wrong number without a word. A UI-first team misses the bug; an API-first team catches it with one direct call and an assertion on the total field. The business rules live in the API, so that is where the testing starts." },
      { type: "h", text: "In practice" },
      { type: "p", text: "For a demo shop API at https://api.shop.example/v1, here is the first-week tour — one request per line:" },
      { type: "ul", items: [
        "Happy path — POST /orders with a valid cart; expect 201 Created and a body containing an id and a status field.",
        "Read back what you wrote — GET /orders/84512 right after creating it; expect 200 and the same values you posted.",
        "Status codes — GET /orders/999999, an order that does not exist; expect 404, not 200 with an empty body.",
        "Payload shape — GET /orders and confirm the response is an array where every element has id, total, status, and created_at.",
        "Error handling — POST /orders with the quantity field missing; expect 400 or 422 with a message that names the field.",
        "Authentication — call GET /orders with no token and expect 401; use another customer's token on their order and expect 403.",
        "Empty results — a fresh account calls GET /orders; expect an empty array, not null and not an error.",
        "Extreme payloads — a cart with 500 line items; expect a clean rejection (413 or 400), not a request that hangs."
      ] },
      { type: "p", text: "That happy-path line, as a raw request you can replay and vary all week:" },
      { type: "code", lang: "bash", label: "bash/first-order.sh", code: `# Happy path: create an order straight against the API
curl -i -X POST https://api.shop.example/v1/orders \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"cart_id": 881, "items": [{"sku": "QA-TEE", "qty": 2}]}'

# Expect: HTTP/1.1 201 Created and a body containing "id" and "status" —
# then change one thing per replay (drop qty, bad token, unknown cart_id).` },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Get three things from the developer: the base URL, a valid token, and the documentation (an OpenAPI or Swagger page is ideal).",
        "Install Postman and send the happy-path request once before you vary anything.",
        "Change one thing per request: drop a field, add a field, send a string where a number belongs.",
        "Check the status code first, then the body, then the fields other teams rely on.",
        "Record each request and result in a simple sheet: URL, input, expected, actual.",
        "Report failures as endpoints and payloads — 'POST /orders with quantity missing returns 500' is a fixable ticket."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Testing through the UI and calling it API testing — a passing checkout page tells you nothing about status codes or error bodies. Instead, call the endpoint directly.",
        "Stopping at the happy path — the 200s are half-tested by developers already. Instead, spend your time on the 400s, 401s, and 404s.",
        "Trusting the displayed total — the UI shows whatever the API returns, including a wrong discount. Instead, assert on the numbers in the response body.",
        "Ignoring auth — an endpoint that answers without a token is a security incident, not a convenience. Instead, make the no-token and wrong-user calls on day one.",
        "Skipping odd sizes — empty lists and huge carts are where pagination and limits break. Instead, include both in the first pass."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Test the contract, not just the feature: status code, payload shape, and error format for every endpoint you touch.",
        "Keep a saved collection of these requests so week two starts from evidence instead of memory.",
        "Pair every bug with the raw request and response — API tickets reproduce faster than UI tickets.",
        "Ask which fields other consumers depend on; those are the first ones to assert on."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "You can test real business logic before a single screen exists.",
        "Check six things first: happy path, status codes, shape, errors, auth, edge cases.",
        "The UI is a display; the API is where the math and the rules live."
      ] },
      { type: "quote", text: "Interview tip: when asked how you would test without a UI, walk through status codes, payload shape, error handling, and auth in that order — the sequence itself signals you have done it." }
    ]
  },
  {
    id: "postman-first-request",
    num: "044",
    title: "Postman: Your First Request in Five Minutes",
    dek: "Install Postman, send a GET to a public test API, read every response pane, then build a real POST with JSON body and headers — plus the curl twin for comparison.",
    date: "2026-06-04",
    read: "5 min",
    category: "API Testing",
    difficulty: "beginner",
    tags: ["postman", "http", "getting-started"],
    status: "green",
    body: [
      { type: "p", text: "Five minutes. That is the honest budget for this note: from a machine without Postman to a sent request and a read response. Postman is free to download from postman.com for Windows, macOS, and Linux, and it lets you skip the sign-in screen and go straight to the workspace where requests live." },
      { type: "p", text: "Think of Postman as a cockpit for HTTP. A browser decides which requests to send and hides the replies; Postman lets you fly manually — choose the method, type the URL, attach a body, press Send, and watch the raw response come back. It is the tool most API teams expect you to open on day one." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "The API does not care about your frontend, so you should be able to test it without one. Postman hands you that independence plus a readable record: the status, the time, the size, and the body of every call. When a developer asks 'what did the API actually return?', the answer is one screenshot away instead of a guess." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Send your first request: click New (or the + tab), pick HTTP Request, set the method dropdown to GET, type https://jsonplaceholder.typicode.com/posts/1, and press Send. That public practice API always answers with a fake blog post, so nobody minds how often you call it. Now read the response half of the window — every area matters:" },
      { type: "ul", items: [
        "Method dropdown — GET, POST, PUT, PATCH, DELETE; GET only reads, so it is safe to repeat freely.",
        "URL bar with the Send button — the full address of the resource, query string included.",
        "Params tab — fills in automatically from the URL; a query like ?limit=10 appears here as key-value rows.",
        "Headers tab — request headers as rows, such as Authorization: Bearer plus your token.",
        "Body tab — for POST and PUT; choose raw and JSON, then type the payload.",
        "Status line — 200 OK here; anything in the 400s or 500s is the story.",
        "Time and Size — 143 ms and 289 B are healthy numbers; a slow, tiny response is a finding, not a fluke.",
        "Response body with Pretty and Raw views — Pretty indents the JSON so you can read it; Raw shows the exact bytes."
      ] },
      { type: "p", text: "Now send something instead of only reading. Change the method to POST, use a URL like https://api.deliver-eats.example/v1/orders, open Headers and add two rows — Content-Type: application/json, and Authorization: Bearer followed by a space and your token. Then open Body, choose raw and JSON, and paste '{\"item_id\": 12, \"quantity\": 2, \"delivery_address\": \"221B Baker Street\"}'. The same request written as a curl command — worth knowing, because bug tickets and CI logs speak curl — looks like this:" },
      { type: "code", lang: "bash", label: "terminal/create-order-curl.sh", code: `# The same POST you built in Postman, written for a terminal
curl -X POST 'https://api.deliver-eats.example/v1/orders' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.dev-token' \\
  -d '{"item_id": 12, "quantity": 2, "delivery_address": "221B Baker Street"}'` },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Download and install Postman, open it, and skip everything that is not the workspace.",
        "Click the + tab to create a request; it starts as GET with an empty URL.",
        "Paste https://jsonplaceholder.typicode.com/posts/1 and press Send; find 200 OK in the status line.",
        "Toggle Pretty and Raw once so you recognize both views later.",
        "Build the POST: method, URL, the two header rows, the JSON body, Send.",
        "Save the request (Ctrl+S) into a collection called deliver-eats so it survives the restart."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Pasting a token without the word Bearer — the Authorization header is the prefix, a space, then the token; missing the prefix usually means a 401 with no clue why. Instead, copy the full header value from the docs.",
        "Sending a JSON body without Content-Type: application/json — the server may answer 415 Unsupported Media Type, and the bug is in the request, not the API. Instead, set the header before debugging the payload.",
        "Reading only the body — a friendly 200 body can hide a 7-second Time value or a missing header. Instead, sweep status, time, size, body in that order.",
        "Practicing on a real API with real data — practice endpoints like jsonplaceholder exist so mistakes are free. Instead, learn on fake data and move to staging later.",
        "Rebuilding the same request every morning — unsent work evaporates. Instead, save each request the moment it works."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Use the public jsonplaceholder API for practice — it accepts GET, POST, PUT, and DELETE with no setup.",
        "Name saved requests after the behavior they check: 'create order returns 201', not request3.",
        "Keep the response Time value in your habit loop; it is the cheapest performance signal you own.",
        "Copy a request as curl (right-click the request) when a developer needs to reproduce outside Postman."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A request is four things: method, URL, headers, body — Postman gives each a box.",
        "Read responses in order: status, time, size, body.",
        "If you can send it in Postman, you can write it in curl — same request, different cockpit."
      ] },
      { type: "quote", text: "Interview tip: walk an interviewer through your first Postman request — method, URL, headers, body, then status and body of the response — and you have answered 'how do you test an API?' in under a minute." }
    ]
  },
  {
    id: "postman-collections-environments",
    num: "045",
    title: "Postman Collections, Environments, and Variables",
    dek: "Folders for requests, variables for everything that changes: build a shop API collection with dev and staging environments, then run it against a CSV of logins.",
    date: "2026-06-06",
    read: "4 min",
    category: "API Testing",
    difficulty: "beginner",
    tags: ["postman", "collections", "environments", "test-data"],
    status: "green",
    body: [
      { type: "p", text: "The mistake: a tester keeps one Postman tab per environment, retypes the staging URL into every request before a release check, and pastes a token straight into the Headers tab of 23 requests. Then the dev token gets rotated and all 23 requests break at once. Collections and environments exist to make that afternoon impossible." },
      { type: "p", text: "A collection is a binder: saved requests grouped in folders, in the order a feature works. An environment is a variable sheet the requests point at — the URL field reads {{base_url}}/v1/orders and the Authorization header reads Bearer {{api_token}}, while the real values live in the selected environment. Switch dev to staging and every request retargets itself; nothing gets edited, nothing gets retyped." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Hardcoded values are how credentials leak into screenshots and repositories, and how a dev-only bug gets reported against staging because the wrong URL was pasted. Variables also make a collection runnable: the Collection Runner can execute the whole binder in order, once per row of a data file — which is how 20 login cases become one click instead of 20 slow, error-prone ones. As a bonus, switching environments is also the cheapest way to prove a bug is environmental rather than real: if it happens on dev but not staging, the ticket starts with evidence instead of an argument." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Structure a shop API collection in feature folders — Auth (login, refresh), Users (get me, update profile), Orders (create, list, cancel) — and keep nothing literal in the requests. Then create two environments, dev and staging, each holding the same variable names with different values. The exported dev environment looks like this:" },
      { type: "code", lang: "json", label: "postman/environments/deliver-eats-dev.json", code: `{
  "name": "deliver-eats dev",
  "values": [
    {
      "key": "base_url",
      "value": "https://api.dev.deliver-eats.example",
      "type": "default",
      "enabled": true
    },
    {
      "key": "api_token",
      "value": "dev-6f2a91c0-rotating-token",
      "type": "secret",
      "enabled": true
    }
  ],
  "_postman_variable_scope": "environment"
}` },
      { type: "p", text: "To run the binder: open the collection, click Run, and the Collection Runner fires each request in folder order, marking pass and fail per row. Turn on Save responses and you get a run record to attach to the release ticket. Add a data file and the runner repeats the run once per row: a CSV with the columns username,password,expected_status and 15 rows runs all 15 login cases, and each request reads the current row through {{username}} and {{password}}." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Create a collection named after the product, then add folders Auth, Users, Orders.",
        "Save every working request into the right folder the moment it works.",
        "Replace every URL and token with {{base_url}} and {{api_token}} as you save.",
        "Create dev and staging environments; keep the variable names identical and change only the values.",
        "Select the environment from the top-right dropdown before you run anything.",
        "Open the runner once a week and execute the whole collection as a smoke pass."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Pasting tokens directly into request headers — the value now lives in 20 places, including your screenshots. Instead, reference {{api_token}} and store the value once, marked as secret type.",
        "One mega-folder with 40 loose requests — order and ownership are lost. Instead, mirror the feature structure: Auth, Users, Orders.",
        "Different variable names per environment — {{dev_url}} in dev and {{staging_url}} in staging means switching still edits requests. Instead, identical names, different values.",
        "Committing real tokens in shared environments — an environment JSON with a production token is an incident waiting for export. Instead, keep secrets out of exports and rotate them.",
        "Ignoring data-file mismatches — a CSV column that does not match a variable name silently sends the literal string {{username}}. Instead, run two rows first and read the request log."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep environment names boring and obvious: dev, staging, prod-readonly.",
        "Mark token variables as secret so Postman masks them in logs and exports.",
        "Give every collection a one-request smoke folder that proves the environment is reachable before a long run.",
        "Version-control exported collections and environments so API changes show up in code review."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Collections organize requests; environments organize values; requests reference both through {{variables}}.",
        "A token belongs in exactly one place per environment, never in a request.",
        "The Collection Runner plus a CSV turns a folder of requests into a data-driven test suite."
      ] },
      { type: "quote", text: "Rule of thumb: retype a value twice and it wants to be a variable; retype it in two different requests and it wants to be an environment variable." }
    ]
  },
  {
    id: "postman-test-scripts",
    num: "046",
    title: "Postman Test Scripts: Asserting on Responses",
    dek: "A response without assertions is a shrug. Write pm.test checks for status, speed, and body fields, then chain requests by saving the new order id.",
    date: "2026-06-08",
    read: "4 min",
    category: "API Testing",
    difficulty: "intermediate",
    tags: ["postman", "assertions", "javascript"],
    status: "green",
    body: [
      { type: "p", text: "A response comes back green: 200 OK, 41 KB, a body full of fields. The tester screenshots it and moves on. Two weeks later the same endpoint starts returning 200 with an empty items array, every downstream report goes blank, and nobody notices until a customer calls. The response always looked fine in that tab; nothing was checking it." },
      { type: "p", text: "Postman's Tests tab fixes that. It is a small script area that runs automatically after each response, written in JavaScript against a built-in object called pm. Think of it as a spell-checker that runs while you type: the request still returns, but now something reads the answer back and objects when it is wrong. Each check is a pm.test call — a name plus a function — and Postman marks each one pass or fail in the response's Test Results area." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Reading responses by eye does not scale and does not survive a bad day. Assertions turn a request into a test: it can now fail, and a failure in the runner or in CI is loud instead of invisible. The Tests tab is also the bridge between requests — a create call can capture the new id and hand it to the next request, so your collection becomes a flow (login, create order, fetch order, cancel order) instead of forty isolated calls." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Open a request that creates an order and put this in the Tests tab:" },
      { type: "code", lang: "ts", label: "postman/tests/create-order-tests.js", code: `// Runs after every response for this request
pm.test('status is 201 Created', () => {
  pm.response.to.have.status(201);
});

pm.test('responds within 500 ms', () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test('body has an id and a created status', () => {
  const body = pm.response.json();
  pm.expect(body.id).to.be.a('number');
  pm.expect(body.status).to.eql('created');
});

// Chaining: save the new id for the next request in the folder
const created = pm.response.json();
pm.environment.set('orderId', created.id);` },
      { type: "p", text: "The first three tests guard the response: the status, the speed, and the two body fields the team relies on. The last two lines are the chaining trick — pm.environment.set stores the new id under a variable name, and the very next request reads GET {{base_url}}/v1/orders/{{orderId}} to fetch what was just created. Re-run the whole folder in the Collection Runner and the flow now proves itself end to end, with each assertion in the Test Results column." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Send the request once and read the body, so you assert on real field names instead of guessed ones.",
        "Start with status: pm.response.to.have.status(201) is one line and catches most regressions.",
        "Parse the body with pm.response.json() and assert the two or three fields your feature needs.",
        "Add a time budget with pm.response.responseTime on endpoints where slowness has bitten before.",
        "Capture ids with pm.environment.set right after you create something, and use the variable in the next request.",
        "Run the folder in the Collection Runner and watch the Test Results column, not just the status codes."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Asserting nothing because the status was 200 — a 200 with a wrong body is the bug that ships. Instead, pair every status check with at least one body check.",
        "Copying assertions from a tutorial without changing the field names — a test that reads body.user_id on an API that returns body.id passes loudly and proves nothing. Instead, read one real response first.",
        "Saving the whole response into a variable for later — payloads are big and go stale. Instead, extract exactly one id or one field.",
        "Hardcoding a captured id like 84512 into the next request — it works once, then the record is deleted or cleaned up. Instead, chain through {{orderId}}.",
        "Writing ten tests that check the same thing — a wall of green gets skimmed and real failures hide in it. Instead, three precise tests per request."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Name tests after the expectation: 'cancelled order returns status cancelled', not test1.",
        "Keep the parse-and-assert pattern: one pm.response.json() call, then plain expectations on its fields.",
        "Set time budgets only where users feel latency, so slow-but-fine endpoints stay green.",
        "When a test fails, open the Postman console (View, then Show Postman Console) to see the exact values the assertions saw."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A response without an assertion is a screenshot, not a test.",
        "pm.test(name, function) is the whole syntax; status, time, and body cover most checks.",
        "Chaining through environment variables turns requests into a flow that proves itself."
      ] },
      { type: "quote", text: "Interview tip: mention that Postman tests are plain JavaScript with the pm object, then give the status-plus-body one-two as the minimum any request should assert." }
    ]
  },
  {
    id: "api-assertions-guide",
    num: "047",
    title: "What to Assert in API Tests: Status, Body, Schema, Speed",
    dek: "Assert on purpose: status code, the three body fields your feature needs, the Content-Type header, a 500 ms speed budget, and a schema — not the whole payload snapshot.",
    date: "2026-06-09",
    read: "4 min",
    category: "API Testing",
    difficulty: "intermediate",
    tags: ["api-testing", "assertions", "quality"],
    status: "green",
    body: [
      { type: "p", text: "What makes an API test fail? Not the status code alone, and not the whole body either. The senior answer is a short list that fits on a sticky note: the status code, the few body fields your feature depends on, the Content-Type header, a time budget, and the shape of the payload (a schema). Assert on exactly those, and your tests fail only when something that matters changed." },
      { type: "p", text: "Think of assertions as the questions you ask a courier delivering a parcel. Right address? That is the status code and the resource id. Right contents — at least the things you ordered? Those are the body fields you rely on. Sealed and labeled correctly? That is Content-Type and the other headers. On time? The response time. And does the box match the packing slip? That is the schema. You never weigh every item against last week's parcel; you check what the delivery promises." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Weak assertions waste the test in both directions. Assert the entire payload as one deep-equal snapshot and every innocent change — a new field, a reordered list — turns the suite red, so the team stops trusting it and starts deleting tests. Assert only 'a response arrived' and the suite stays green through genuine breakage, which is worse. The strong middle path pins down status, the fields other code consumes, the header that promises JSON, and a speed budget." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is the sticky note as code — plain TS-flavored pseudo that ports to any tool, because the ideas matter more than the syntax:" },
      { type: "code", lang: "ts", label: "tests/api/order-assertions.ts", code: `// Assertion menu for GET /v1/orders/84512 (pseudo-code; ideas port to any tool)
const start = Date.now();
const res = await request.get(base + '/v1/orders/84512');
const elapsed = Date.now() - start;

expect(res.status()).toBe(200);                                     // 1. the door opened
expect(res.headers()['content-type']).toContain('application/json'); // 2. it is JSON
const body = await res.json();
expect(Array.isArray(body.items)).toBe(true);                       // 3. shape: items is a list
expect(body.items[0].status).toBe('preparing');                     // 4. the field we rely on
expect(body.total).toBeCloseTo(42.5, 2);                            // 5. money: compare loosely
expect(elapsed).toBeLessThan(500);                                  // 6. speed budget` },
      { type: "p", text: "Notice what the example refuses to do. It never deep-equals the entire 40-field body — that snapshot assertion is the weak version, and it dies the day a developer adds a loyalty_points field. It checks that items is an array plus the two fields the checkout page actually renders. Compare the pairs: weak is expect(body).toEqual(recordedJson); strong is expect(body.status).toBe('preparing'). Weak is 'it responded'; strong is 'it responded with 200, as JSON, with the total 42.5, within 500 ms'." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Decide, per endpoint, which fields other code actually consumes; those get assertions.",
        "Assert status first and specifically — 200 for reads, 201 for creates, 204 for deletes.",
        "Check that Content-Type contains application/json whenever the client parses JSON.",
        "Add shape checks (array, object, required fields) before adding value checks.",
        "Compare numbers with tolerance — money often arrives as 42.5, not 42.50.",
        "Set a time budget only where latency has a user, and include the measured time in the failure message."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Snapshot-asserting the entire body — any new field turns every test red and the suite becomes noise. Instead, assert fields by name.",
        "Asserting only the status code — a 200 with status 'failed' inside has fooled more than one dashboard. Instead, read at least one business field.",
        "Ignoring response headers — Content-Type decides whether the JSON parser will even run. Instead, assert the header whenever you parse.",
        "Exact equality on floats — 0.1 plus 0.2 does not equal 0.3 in any language. Instead, use close-to with a tolerance.",
        "No time assertion anywhere — then the first latency incident is reported by a customer. Instead, budget the critical reads.",
        "Skipping the schema on large payloads — forty hand-checked fields guarantee one gets forgotten. Instead, validate shape once with a schema."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Adopt a fixed assertion order — status, headers, shape, values, time — so reviews can check intent fast.",
        "Keep a shared helper for the status-plus-content-type pair instead of retyping it in every test.",
        "Assert on fields by their meaning to the user: total, status, eta_minutes.",
        "When a field proves flaky, ask whether it belongs in the contract before deleting the assertion."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Five assertion targets: status, chosen body fields, Content-Type, response time, schema.",
        "Whole-payload equality is brittleness dressed up as thoroughness.",
        "A test is strong when it fails exactly when the contract breaks."
      ] },
      { type: "quote", text: "Interview tip: answer 'what do you assert on?' with the five targets in order, then explain why whole-body snapshots rot — that two-part answer marks you as someone who has maintained a suite." }
    ]
  },
];
