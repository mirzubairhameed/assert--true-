import type { Post } from "../post-types";

export const API_B: Post[] = [
  {
    id: "rest-assured-setup",
    num: "048",
    title: "REST Assured: Getting Started With Java",
    dek: "Add one dependency to a Maven project, meet the given/when/then style, and run a first test that GETs a user and checks the status code and the email field.",
    date: "2026-06-10",
    read: "4 min",
    category: "API Testing",
    difficulty: "intermediate",
    tags: ["rest-assured", "java", "setup"],
    status: "green",
    body: [
      { type: "p", text: "A Java project can look like a wall to a tester who has lived in Postman: folders, an XML file, and words like Maven everywhere. The wall is smaller than it looks. You need one project, one dependency block, and one test class, and then you are sending your first request from Java — with assertions that read like sentences." },
      { type: "p", text: "REST Assured is a Java library for calling APIs; Maven is the build tool that downloads it for you. You describe what the project needs in pom.xml (the XML file Maven reads), and Maven fetches the libraries into the project. For API testing you add two entries: io.rest-assured:rest-assured for the requests, and org.junit.jupiter:junit-jupiter so JUnit 5 can run your tests. Reload the file in the IDE and the libraries are simply there." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Postman is where API testing starts; a programming language is where it scales. In REST Assured the given/when/then style you may know from Gherkin becomes executable: given the preconditions (headers, auth), when the action runs (a method on a path), then the expectations must hold (status, fields). Hundreds of such tests run in one command, in CI, on every merge — and the skill transfers to any team that tests APIs in code." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Create a new Maven project, paste the two dependencies into pom.xml, let the IDE load them, then write this test class under src/test/java:" },
      { type: "code", lang: "java", label: "src/test/java/FirstApiTest.java", code: `import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;
import static org.hamcrest.Matchers.notNullValue;

public class FirstApiTest {

    @Test
    public void userOneHasAnEmail() {
        RestAssured.baseURI = "https://jsonplaceholder.typicode.com";

        RestAssured.given()
            .when().get("/users/1")
            .then().statusCode(200)
            .body("email", notNullValue());
    }
}` },
      { type: "p", text: "Read it as a sentence: given nothing special, when GET /users/1 is sent, then the status must be 200 and the email field must not be null. The statusCode and body calls are the response assertions, and body takes a JSON path (a dot path into the response) plus a matcher. The matcher here, notNullValue, is a Hamcrest matcher — a readable comparison word such as equalTo, hasSize, greaterThan, or notNullValue that fails with a message explaining what actually arrived. Right-click the class and run it; a green bar is your first Java API test." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Install a JDK (17 or newer) and an IDE such as IntelliJ IDEA Community Edition, which is free.",
        "Create a Maven project and open pom.xml.",
        "Add the io.rest-assured:rest-assured dependency (version 5.x) and the org.junit.jupiter:junit-jupiter dependency.",
        "Let Maven reload so both libraries appear under External Libraries.",
        "Create the class under src/test/java and paste the test.",
        "Run it from the arrow next to the class; then change /users/1 to /users/999 and watch it fail with a readable message."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Mixing REST Assured 4 and 5 snippets from old tutorials — package names moved between versions and half the internet's examples will not compile. Instead, match every import to one version.",
        "Skipping the JUnit dependency — REST Assured only builds requests; JUnit is what runs them and reports green or red. Instead, add both before debugging anything.",
        "Hardcoding the base URL in every test — one environment change breaks the suite in thirty places. Instead, set RestAssured.baseURI once in a shared setup.",
        "Sending requests with no then() — a request without assertions is an expensive way to generate traffic. Instead, give every test at least a status code.",
        "Quitting at the first compile error — Java error messages point at a line number and a missing import. Instead, read the first error, fix the import, re-run."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep one base test class that sets baseURI and common headers, so the tests themselves stay short.",
        "Use the jsonplaceholder API while learning — no keys, no cost, stable data.",
        "Name tests after the expectation, like userOneHasAnEmail, so failure reports read themselves.",
        "Run tests from the IDE first, then from Maven with mvn test, so you know both entry points work."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Maven plus two dependencies is the whole setup — no framework ceremony.",
        "given/when/then turns an HTTP call into a readable, runnable sentence.",
        "Hamcrest matchers are the vocabulary of response assertions."
      ] },
      { type: "quote", text: "Interview tip: if you say you know REST Assured, be ready to sketch given-when-then from memory — interviewers care more about the shape than the exact syntax." }
    ]
  },
  {
    id: "rest-assured-crud-example",
    num: "049",
    title: "REST Assured: A Complete CRUD Test Example",
    dek: "One test walks a user through create, read, update, and delete: 201 with a captured id, verified fields, a 204 delete, and a 404 to prove the user is really gone.",
    date: "2026-06-12",
    read: "4 min",
    category: "API Testing",
    difficulty: "advanced",
    tags: ["rest-assured", "crud", "java"],
    status: "green",
    body: [
      { type: "p", text: "A tester once deleted a demo user with Postman to confirm a delete bug and reported back 'delete works'. It worked because that one request worked once. Two days later the team discovered the update endpoint was broken too, and nothing in the ticket history proved anything either way. CRUD deserves one test that walks all four verbs and remembers the trail." },
      { type: "p", text: "CRUD is the four things an API can do to a resource: Create, Read, Update, Delete. A good CRUD test performs them in order against the same record, using the id that Create hands back. That id is the thread: create the user, read it back, update it, delete it, then read it again to confirm it is gone. One green run proves the resource's whole life." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Each verb can pass alone and fail in company. A DELETE that returns 204 but leaves the row readable is invisible if you never GET again. A PUT that returns 200 but writes nothing is invisible if you do not verify the field. Sequencing the four calls in one test — with the captured id threaded through them — closes both gaps and mirrors exactly what a real client does." },
      { type: "h", text: "A worked example" },
      { type: "p", text: "Here is the whole life of a user in one JUnit test:" },
      { type: "code", lang: "java", label: "src/test/java/UserCrudTest.java", code: `import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import org.junit.jupiter.api.Test;

public class UserCrudTest {
    @Test
    public void fullCrudCycle() {
        String base = "https://api.shop.example/v1";
        // CREATE — expect 201, capture id via jsonPath
        String id = given().contentType("application/json")
            .body("{\\"name\\": \\"Asha\\", \\"role\\": \\"qa\\"}").when().post(base + "/users")
            .then().statusCode(201).body("role", equalTo("qa"))
            .extract().jsonPath().getString("id");
        // READ — expect 200 and the name we sent
        when().get(base + "/users/" + id)
            .then().statusCode(200).body("name", equalTo("Asha"));
        // UPDATE — expect 200 and the new name
        given().contentType("application/json").body("{\\"name\\": \\"Asha K\\"}")
            .when().put(base + "/users/" + id)
            .then().statusCode(200).body("name", equalTo("Asha K"));
        // DELETE — expect 204, then GET expects 404
        when().delete(base + "/users/" + id).then().statusCode(204);
        when().get(base + "/users/" + id).then().statusCode(404);
    }
}` },
      { type: "p", text: "The static imports at the top (given, when, then, equalTo) pull those names directly into the file, which is why the test reads like a sentence instead of RestAssured.given() on every line. Follow the id: extract().jsonPath().getString('id') saves it from the 201 response, every later call appends it to the path, and the final GET expects 404 — proof that the delete really deleted. Note the status codes doing the talking: 201 created, 200 read and updated, 204 deleted, 404 gone." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Create with a minimal valid body; expect 201 and capture the id from the response.",
        "Read the record back and assert the fields you sent, not just the status code.",
        "Update one field; expect 200 and assert the field came back changed.",
        "Delete; expect 204 (or 200, whichever your API's convention is) — find out and assert it exactly.",
        "GET the deleted id and expect 404; this line catches fake deletes.",
        "Keep the sequence in one test so the trail is provable, and note the cleanup path if it fails midway."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Testing each verb in a separate test with fresh ids — a broken update then looks like a broken create on the next run. Instead, chain one lifecycle in one test.",
        "Trusting a 204 without the follow-up GET — soft-deleted rows and hidden flags both answer 204. Instead, verify 404 after every delete.",
        "Sending a PUT with a body but asserting nothing — a 200 that changed nothing is the classic silent failure. Instead, assert the changed field came back changed.",
        "Reusing a captured id across runs — yesterday's record is already deleted. Instead, create fresh state inside the same test.",
        "Assuming delete is instant — the read-back can race an asynchronous delete and flake. Instead, retry the 404 briefly or confirm the API's delete model."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep CRUD tests in one class per resource so reviewers see the full lifecycle together.",
        "Extract the base URL and shared headers into setup code so the four verbs stay the star.",
        "Assert the status code before the fields; a wrong code makes every field assertion meaningless.",
        "End tests by deleting what you created, where the API allows it — leave the environment as you found it."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "CRUD is a lifecycle: create, read, update, delete, and prove the delete.",
        "The captured id is the thread that ties the four calls together.",
        "204 is a promise; the follow-up GET is the proof."
      ] },
      { type: "quote", text: "Interview tip: asked how you would test a delete endpoint, answer 'delete it, expect 204, then GET it and expect 404' — that one line separates you from the checkbox testers." }
    ]
  },
  {
    id: "json-schema-validation",
    num: "050",
    title: "Validating API Responses With JSON Schema",
    dek: "Stop eyeballing 40 fields. One JSON Schema describes what an order must look like — types, required keys, allowed statuses — and one line validates every response against it.",
    date: "2026-06-14",
    read: "4 min",
    category: "API Testing",
    difficulty: "intermediate",
    tags: ["json-schema", "api-testing", "contract-testing"],
    status: "green",
    body: [
      { type: "p", text: "Forty fields, three nested arrays, one response that changes shape with every order state — and a tester opening each body and checking fields one by one. Field 41 gets missed; it always does. JSON Schema exists so a machine does that checking: all of it, every run, in one line." },
      { type: "p", text: "A JSON Schema is a contract for shape and types: which fields must exist, what type each must be, and which values are allowed. The API promises its responses fit the schema; your test holds the document and checks every response against it. Instead of forty hand-written assertions you write one file, then ask one question: does this body match? A new optional field added by the developers does not break it, because a contract about required things survives optional additions." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Hand-checking fields does not scale and it drifts: this sprint you check 12 fields, next sprint 15, and the one you forget is the one that changed. Schema validation also catches the failures status codes hide — a 200 response where total is a string, or status is 'shipped' when the contract says 'shipped_out', or items missing entirely. It is the fastest way to assert on a big payload without snapshot rot." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is a schema for an order object. Read it as: this must be an object with these four keys, of these types, and status can only be one of four words:" },
      { type: "code", lang: "json", label: "schemas/order.schema.json", code: `{
  "type": "object",
  "required": ["id", "status", "items", "total"],
  "properties": {
    "id": { "type": "integer" },
    "status": {
      "type": "string",
      "enum": ["created", "preparing", "delivered", "cancelled"]
    },
    "items": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["sku", "quantity"],
        "properties": {
          "sku": { "type": "string" },
          "quantity": { "type": "integer", "minimum": 1 }
        }
      }
    },
    "total": { "type": "number" }
  }
}` },
      { type: "p", text: "To run it from Postman, store the schema text in an environment variable named orderSchema, then put this in the Tests tab of the request:" },
      { type: "code", lang: "ts", label: "postman/tests/order-schema-test.js", code: `pm.test('order body matches the order schema', () => {
  pm.response.to.have.jsonSchema(JSON.parse(pm.environment.get('orderSchema')));
});` },
      { type: "p", text: "That single call validates every required key, every type, and the enum. In REST Assured the same check is one matcher: .body(matchesJsonSchemaInClasspath('schemas/order.schema.json')) with the file sitting in the test resources folder. Either way, shape lives in a reviewed file and the test stays one line — when the contract changes, you edit the schema instead of forty assertions." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Write the schema for one endpoint; start with required keys and types only.",
        "Store it where tests can read it — a schemas folder in the repo or a Postman environment variable.",
        "Validate one real response to shake out typos before trusting the schema.",
        "Add enums for fields with a fixed set of values, like status.",
        "Add nested schemas for arrays that carry objects, like items.",
        "Run schema validation on every response in a collection run, so shape always has a guard."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Writing the schema from memory instead of from a real response — guessed field names fail forever. Instead, capture one live response and build the schema beside it.",
        "Marking every field required — then any innocent optional addition breaks the contract and the suite. Instead, require only what the business needs.",
        "Expecting the schema to check values — a schema proves total is a number, not that it is 42.50. Instead, pair the schema with the two or three value assertions that matter.",
        "One giant schema for every endpoint — unmaintainable and wrong at the edges. Instead, one schema per response shape.",
        "Forgetting the error responses — a failure body with no structure leaks stack traces and confuses clients. Instead, give errors a schema too."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep schema files next to the tests in version control so contract changes show up in reviews.",
        "Start minimal — required, type, enum — and add minItems or patterns only when they catch real bugs.",
        "When a response breaks the schema, save the body as evidence; it is usually a real regression.",
        "Name schema files after the response they describe: order.schema.json, not final-v2.schema.json."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A schema is a machine-checked contract for shape and types.",
        "One validation line replaces dozens of hand-written field checks.",
        "Schemas check structure; value assertions check meaning — use both."
      ] },
      { type: "quote", text: "Rule of thumb: hand-checking more than five fields means stop and write the schema — the machine then checks all of them, every run, for free." }
    ]
  },
  {
    id: "api-mocking-and-stubbing",
    num: "051",
    title: "Mocking and Stubbing APIs for Testing",
    dek: "The payment gateway charges per call and never fails on cue. A WireMock stub answers POST /pay with a 502 and a 3-second delay, so you can test the ugly paths.",
    date: "2026-06-15",
    read: "4 min",
    category: "API Testing",
    difficulty: "intermediate",
    tags: ["mocking", "wiremock", "test-doubles"],
    status: "green",
    body: [
      { type: "p", text: "The payment gateway works — until you need it to fail. You want to see what checkout does when the charge times out, but the sandbox only ever returns success, the real gateway bills per call, and yesterday it was down for an hour so the whole test session died. You cannot schedule a failure in someone else's API. You can, however, fake one." },
      { type: "p", text: "Mocking (also called stubbing) means standing up a fake server that answers with responses you choose. Point the application's payment URL at the fake, and your tests control the reply: instant success, a 502, a ten-second delay, whatever the scenario needs. The tools, one line each: Postman Mock Server (a mock per collection, zero setup), WireMock (a runnable fake server with rich stubs), MSW (intercepts requests in the browser or Node for frontend tests)." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Third-party dependencies are the tests you cannot script: they are slow, rate-limited, occasionally flaky, and sometimes cost real money per call. A mock removes all four problems at once and, more importantly, puts the failure paths on demand — the 502 from a gateway, the timeout, the duplicate webhook. Those paths are exactly where real incidents live, and the real API will never let you trigger them politely." },
      { type: "h", text: "In practice" },
      { type: "p", text: "WireMock keeps each fake answer in a stub mapping file. This one says: any POST to /pay whose body mentions card_number gets a 502 after a 3-second delay:" },
      { type: "code", lang: "json", label: "wiremock/mappings/pay-gateway-down.json", code: `{
  "request": {
    "method": "POST",
    "url": "/pay",
    "bodyPatterns": [
      { "contains": "card_number" }
    ]
  },
  "response": {
    "status": 502,
    "jsonBody": {
      "error": "gateway_unavailable",
      "retry": true
    },
    "fixedDelayMilliseconds": 3000
  }
}` },
      { type: "p", text: "Start WireMock (it defaults to port 8080), point the checkout's gateway base URL at http://localhost:8080 for this test run, and place an order. The app sends its real request, the stub answers 502 after three seconds, and now you watch what users would feel: the retry, the message, the order state. Change one value in the mapping — status 200 with a fixed jsonBody for the success path, or a 30000 delay to force a client timeout — and the same file serves the whole failure catalogue." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Pick the dependency you cannot control (payment, SMS, maps) and list the responses you need from it.",
        "Start the mock tool and write one stub for the happy path first.",
        "Point the app or test at the mock base URL through configuration, never by editing code.",
        "Run the real flow once against the mock and confirm the app behaves.",
        "Add the failure stubs: 500, 502, timeout, malformed body.",
        "Keep the stub files in the repo so the whole team tests the same failures."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Mocking the API you are testing — a fake of your own service proves nothing about your own service. Instead, mock only third-party or not-yet-built dependencies.",
        "Testing only the happy mock — a fake that always returns 200 hides the retry logic you were supposed to verify. Instead, stub the failures on purpose.",
        "Letting mock drift grow — the real gateway changed its error shape in March and your stub still answers last year's version. Instead, re-check stubs against real responses every release.",
        "Committing the mock URL into production configuration — one bad deploy and checkout talks to localhost. Instead, switch base URLs per environment.",
        "Forgetting latency in the mock — instant fakes hide spinner and timeout behavior. Instead, add fixedDelayMilliseconds wherever timing matters."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep one mappings folder per third-party API so the failure scenarios are reusable across tests.",
        "Name stubs after the scenario: pay-gateway-down, pay-timeout, pay-duplicate-webhook.",
        "Run at least one suite against the real sandbox each release so the mocks stay honest.",
        "Document the mock setup in the repo README so developers and testers hit the same fake."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Mock what you cannot control; test what you can.",
        "Failure paths need fakes — the real API will not fail on cue.",
        "A stub file in version control is a reusable test fixture."
      ] },
      { type: "quote", text: "Interview tip: when asked how to test a payment flow, describe the mock — 'point the gateway URL at a stub that can answer 200, 502, or a timeout on demand' — and you sound like someone who has shipped." }
    ]
  },
  {
    id: "api-testing-checklist",
    num: "052",
    title: "The API Testing Checklist (and the Mistakes to Avoid)",
    dek: "Before release, walk the whole API once: auth codes, a CRUD matrix, validation errors, pagination, idempotent updates, concurrency, rate limits, error shape, and a latency budget.",
    date: "2026-06-16",
    read: "4 min",
    category: "API Testing",
    difficulty: "beginner",
    tags: ["api-testing", "checklist", "best-practices"],
    status: "green",
    body: [
      { type: "p", text: "The mistake sounds harmless: 'we tested the API — everything returns 200.' Then the release goes out where the list endpoint ignores page=2, PUT doubles a record when retried, the fourth request in a second earns a naked 502 with no error body, and expired tokens leak stack traces. Every one of those was one checklist line away from being caught." },
      { type: "p", text: "A checklist is not bureaucracy; it is the difference between testing what you remembered and testing what APIs are made of. Walk it before every release that touches an endpoint. For a mid-size API it takes about an hour, and it is the highest-yield hour in API testing." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Feature-level tests cover what the ticket described. The checklist covers what the platform promises: status codes, pagination, idempotency, rate limits, error shape, latency. Those are the areas where regressions are silent — the UI can look perfect while page 2 of the orders list quietly returns page 1 again." },
      { type: "h", text: "In practice" },
      { type: "p", text: "The pre-release API checklist — every line is a request you actually send:" },
      { type: "ul", items: [
        "Auth — no token gets 401, an expired token gets 401, a valid token on someone else's resource gets 403.",
        "CRUD matrix — create, read, update, delete for each resource, with the right codes (201, 200, 200, 204).",
        "Validation — malformed and missing fields get 400 or 422 with messages that name the field, never a bare 500.",
        "Not-found paths — unknown ids get 404 with the standard error body, on every endpoint.",
        "Pagination — page 1, page 2, an out-of-range page, and a huge page size all behave and agree on the response shape.",
        "Idempotency — the same PUT twice ends in one unchanged record; a retried POST does not double-charge (idempotent means repeating the call has the same effect as calling it once).",
        "Concurrency — two updates to one record in parallel resolve sensibly, with no lost writes and no deadlocks.",
        "Rate limits — the 429 arrives with a Retry-After header and a body that says so, before the hard limit bites.",
        "Error format — every failure uses the same error structure: code, message, and nothing that leaks a stack trace.",
        "Latency budget — the main list and detail endpoints answer inside their agreed budget, measured, not guessed."
      ] },
      { type: "p", text: "Two checklist lines, run by hand in a terminal — replay the write twice, then prove the result instead of trusting the response:" },
      { type: "code", lang: "bash", label: "bash/checklist-idempotency.sh", code: `# Idempotency: the same PUT twice must leave exactly one unchanged record
curl -s -X PUT https://api.shop.example/v1/orders/84512 \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"status": "paid"}'
curl -s -X PUT https://api.shop.example/v1/orders/84512 \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"status": "paid"}'

# Then verify in the database, not on the screen:
psql $DB_URL -c "SELECT COUNT(*) FROM orders WHERE id = 84512;"
# 1 — a second row here is the double-write bug the checklist exists for.` },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Copy the checklist into the release ticket and fill it in as you go, with evidence per line.",
        "Run the CRUD matrix first — it doubles as the smoke pass.",
        "Do the negative lines next: auth, validation, not-found, rate limit.",
        "Save each interesting request into the collection so the next release starts from a reusable suite.",
        "File one ticket per failed line, with the request and response attached.",
        "Re-run only the failed lines after fixes, then the full list before sign-off."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Testing only the 200s — the 401s, 404s, and 429s are where platforms actually fail. Instead, treat the negative lines as the checklist's reason to exist.",
        "Asserting whole payloads — snapshot tests rot with every added field and bury real differences in noise. Instead, assert the status plus the fields you rely on.",
        "Ignoring response headers — Content-Type, Retry-After, and the rate-limit headers are part of the contract. Instead, read headers on every checked line.",
        "Assuming field order — JSON objects are unordered, and a test that expects the first field to be id breaks on a refactor. Instead, look fields up by name.",
        "Skipping idempotency — retried writes are a fact of mobile networks, and double charges become support tickets. Instead, replay the write and count the records.",
        "Running the checklist once and archiving it — APIs drift between releases. Instead, re-run it every release, or automate it as a collection in CI."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Automate the checklist as a Postman collection or a REST Assured suite and run it in CI, so it never depends on memory.",
        "Keep one environment per stage and run the same checklist against dev before staging.",
        "Attach evidence — status code, timing, and a body snippet — to every checklist line in the release ticket.",
        "Add a line the day a checklist miss ships; the list should grow from real incidents."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Feature tests prove the ticket; the checklist proves the platform.",
        "The four silent killers: only-200 testing, whole-payload assertions, ignored headers, field-order assumptions.",
        "One hour of checklist beats one week of post-release triage."
      ] },
      { type: "quote", text: "Interview tip: asked 'how do you know an API is ready?', answer with the checklist — auth, CRUD, validation, pagination, idempotency, rate limits, error shape, latency — and you have given the complete answer." }
    ]
  },
];
