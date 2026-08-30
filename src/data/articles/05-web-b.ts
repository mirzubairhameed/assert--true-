import type { Post } from "../post-types";

export const WEB_B: Post[] = [
  {
    id: "http-status-codes",
    num: "039",
    title: "HTTP Status Codes Every Tester Should Know",
    dek: "The four status-code families and fifteen numbers that carry the real verdict of every request — including the 401 versus 403 line that settles half of all access bugs.",
    date: "2026-05-28",
    read: "5 min",
    category: "Web & API Basics",
    difficulty: "beginner",
    tags: ["http", "status-codes", "api-testing"],
    status: "green",
    body: [
      { type: "p", text: "The weakest sentence in any bug report is 'the page is broken'. The strongest one you can learn to write this week is 'POST /api/orders returns 500 with message total calculation failed'. The difference is one habit: reading the three-digit number the server already sent you." },
      { type: "p", text: "Every HTTP response opens with a status code, and the first digit names its family. 2xx means success, 3xx means go look elsewhere, 4xx means the client asked wrong, 5xx means the server failed. It reads like a postal slip: delivered, forwarded, address unknown, or the sorting office caught fire. Fifteen numbers cover almost everything you will meet in a working week." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Status codes are the cheapest, fastest signal in API testing, and they route the bug for you: a 400 usually indicts the frontend's payload, a 500 indicts the backend, a 403 is a permissions decision. Tickets that name the code reach the right developer in minutes; tickets that say 'error on screen' tour the whole team first." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Keep this list within reach; each line is the code and what it means when you are the tester:" },
      { type: "ul", items: [
        "200 OK — the everyday success; data came back. Check the body actually matches what the screen shows.",
        "201 Created — something new exists, usually after POST; the body or a Location header should identify it.",
        "204 No Content — success with an empty body, common after DELETE or PUT. If the UI still shows the row, you have found a refresh bug.",
        "301 Moved Permanently — the URL changed for good; old links follow it. Verify that bookmarks and cached pages land somewhere sane.",
        "302 Found — a temporary redirect; logins often bounce through one. Confirm the destination is the page the user expected, not an error screen.",
        "304 Not Modified — the cache says nothing changed, so the browser reuses its copy. This is the code behind both fast reloads and 'the fix never arrived' reports.",
        "400 Bad Request — the request itself is malformed or fails validation, usually the frontend's payload. Read the error body before assigning blame.",
        "401 Unauthorized — despite the name, it means unauthenticated: 'who are you?' No token, an expired token, or bad credentials.",
        "403 Forbidden — the opposite question: 'I know exactly who you are, and still no.' The classic wrong-role bug.",
        "404 Not Found — nothing lives at this address: a typo, a deleted record, or a route the frontend guesses wrong.",
        "409 Conflict — the request fights the current state, like paying for a cart that already checked out.",
        "422 Unprocessable Entity — the format was fine, the contents broke a rule: 'email is not valid', 'qty must be at least 1'.",
        "429 Too Many Requests — a rate limit fired. Trigger it on purpose with rapid clicks and check the UI degrades kindly.",
        "500 Internal Server Error — the server crashed on a valid request, almost always a backend bug; the body often names the exception.",
        "502 Bad Gateway and 503 Service Unavailable — infrastructure trouble: a proxy cannot reach the app, or the app is down. Usually a deployment question, not a code question."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Reporting 'login is broken' for every 401 — no token, an expired token, and a wrong password look identical in the UI. Instead, name which of the three it is.",
        "Treating 4xx and 5xx as one bucket called errors — the first digit picks the suspect. Instead, let the family choose the assignee.",
        "Ignoring redirects because the screen stayed green — a 301 to the wrong locale or a 302 onto an error page are real bugs. Instead, read the Location header in the Network tab.",
        "Accepting 200 as automatic proof — a badly designed API can return 200 with an error object inside. Instead, check that the body honors the contract, not just the code.",
        "Writing 'should return 200' for every case — creating a duplicate order should expect 409 if the design says so. Instead, tie each expected code to the requirement."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Learn this line by heart and use it: 401 means who are you; 403 means I know you, still no.",
        "When a code surprises you, open the response body in the Network tab before writing a word of the ticket.",
        "Group expectations in your test plan by family: 2xx happy paths, 4xx negative paths, 5xx crash paths.",
        "Burst-click through rate-limited features on purpose; real users hit 429 before your scripts do.",
        "Copy the exact code and message into every API bug report — one line of paste, an hour of triage saved."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "First digit is the family: success, redirect, client error, server error.",
        "200 returns data, 201 creates, 204 succeeds silently.",
        "401 means unauthenticated; 403 means authenticated but not allowed.",
        "The code routes the bug: 400 to the client team, 500 to the server team."
      ] },
      { type: "quote", text: "Rule of thumb: if you cannot name the status code, you are not done testing the flow — the number is the server's testimony, and your report should quote it." }
    ]
  },
  {
    id: "json-for-testers",
    num: "040",
    title: "JSON for Testers: Read, Validate, and Question Payloads",
    dek: "Objects, arrays, six types, and the four checks that catch real bugs: type mismatches, null versus missing keys, empty versus absent arrays, and '19.99' pretending to be 19.99.",
    date: "2026-05-29",
    read: "4 min",
    category: "Web & API Basics",
    difficulty: "beginner",
    tags: ["json", "api-testing", "payloads"],
    status: "green",
    body: [
      { type: "p", text: "The cart page shows $NaN where the total should be. The API returned 200, the screen rendered, nothing crashed — but somewhere in the payload a price arrived as the string '19.99' instead of the number 19.99, and the arithmetic quietly died. Ten seconds of JSON literacy would have caught it before the ticket was written." },
      { type: "p", text: "JSON is the format APIs use to move data: labeled boxes you can read in any text editor. An object in curly braces holds key-value pairs; an array in square brackets holds an ordered list; values come in exactly six types — string, number, boolean, null, object, array. Objects nest inside arrays, arrays nest inside objects, and that is the entire grammar. The skill is not syntax; it is knowing what to question." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "You will read JSON more than any other artifact in API testing: response bodies, request bodies, Postman collections, config files. It hides quiet bugs — a null where a number belongs, an array that vanished instead of arriving empty, a total that is wrong only if you notice the currency code never came. The UI masks all of it, so the payload is where the truth sits in plain sight." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is a typical order response carrying all six types at once:" },
      { type: "code", lang: "json", label: "api/order-response.json", code: `{
  "id": "ord_84512",
  "status": "paid",
  "giftWrap": false,
  "coupon": null,
  "customer": {
    "id": 42,
    "email": "dana@example.com"
  },
  "items": [
    { "sku": "KB-750", "qty": 2, "price": 19.99 },
    { "sku": "MS-X", "qty": 1, "price": 34.5 }
  ],
  "totals": {
    "subtotal": 74.48,
    "shipping": 4.99,
    "tax": 6.33,
    "grandTotal": 85.8
  },
  "createdAt": "2026-05-29T10:14:03Z"
}` },
      { type: "p", text: "Now run the checks that separate a glance from a test:" },
      { type: "ul", items: [
        "Types match the contract — price is the number 19.99, not the string '19.99'; qty is a number, not '2'. Compare against the API docs or schema, then do the math yourself: 2 * 19.99 plus 34.5 should be the 74.48 subtotal the server claims.",
        "Null versus missing key — coupon is null, meaning the field exists and is empty; a response with no coupon key at all means it was never sent. Frontends routinely treat these two differently, and one of the two is where the crash lives.",
        "Empty array versus absent array — items: [] says the cart is legitimately empty; a missing items key says the API skipped the field. Blank lists and broken loops live in exactly this difference.",
        "Nesting survives the trip — items is an array of objects, totals is an object, and createdAt is a timestamp string in UTC. Confirm the shape matches the documented contract, not just the presence of values.",
        "Required fields exist — id, status, items, and totals present on every response; a missing field is a contract break even when the screen forgives it."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Eyeballing a payload as one blob — the eye finds missing commas, not wrong types. Instead, read key by key, or paste the payload into a formatter or DevTools' Preview tab.",
        "Trusting the UI to reveal type bugs — JavaScript's plus operator happily glues '19.99' and 1 into '19.991'. Instead, judge the raw payload, never the rendered total.",
        "Treating null and missing as interchangeable — one says 'known to be empty', the other says 'not provided', and APIs disagree daily on which to send. Instead, test both shapes where the contract allows.",
        "Forgetting arrays can be empty — one-item test data never meets the empty cart. Instead, run one case with an empty array and one with the key absent.",
        "Editing a payload in DevTools and believing it persisted — local edits vanish on reload. Instead, replay the modified request from Postman and read the server's real answer."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Save one known-good response per endpoint as your reference shape; future payloads get compared against it.",
        "Exercise the extremes of every array you meet: empty, one item, many items — ordering bugs hide in the many.",
        "Flag any money value that arrives as a string; it may render fine today and break the first time someone does arithmetic.",
        "Validate the shape before the values — field names, nesting, and types come first, the numbers second.",
        "Paste raw JSON into tickets instead of screenshots; screenshots of JSON are unreadable and unsearchable."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Six types, two containers, unlimited nesting — that is all of JSON.",
        "null means present but empty; a missing key means never sent.",
        "An empty array and an absent array break different code paths.",
        "'19.99' and 19.99 are different values; check types, not vibes."
      ] },
      { type: "quote", text: "Interview tip: asked how you validate an API response, answer 'status code, schema, field types, nulls, empty collections, and numeric boundaries' — that list is the job on a good day." }
    ]
  },
  {
    id: "rest-apis-explained",
    num: "041",
    title: "REST APIs: Resources, Endpoints, and Conventions",
    dek: "Why every API looks the same — /v1/, plural nouns, IDs in the path, page and limit in the query — plus the endpoint smells that make testing painful.",
    date: "2026-05-31",
    read: "5 min",
    category: "Web & API Basics",
    difficulty: "beginner",
    tags: ["rest", "api-design", "endpoints"],
    status: "green",
    body: [
      { type: "p", text: "Why does almost every API you meet look suspiciously similar — /v1/users, /v1/orders, /v1/orders/42? That uniformity is not laziness. It is REST, a set of conventions that turns an unfamiliar API into a readable map: learn one well-designed API and you can roughly find your way around the next one without a guide." },
      { type: "p", text: "REST stands for Representational State Transfer, but the working idea is smaller: name things as nouns, act on them with HTTP verbs. The resource is the noun — a user, an order, a cart. The URL is its address and the method is the action: GET /orders reads the collection, GET /orders/42 reads one order, POST /orders creates one, PATCH /orders/42 adjusts it, DELETE /orders/42 removes it. Read URLs as sentences: 'the orders collection', 'order number 42'." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Conventions are what make APIs testable. When a team follows them, you can predict an endpoint you have never seen, guess its error behavior, and write tests before reading the code. When a team invents private grammar — verbs in URLs, custom status meanings — every test must be reverse-engineered, and bugs hide inside the surprises." },
      { type: "h", text: "In practice" },
      { type: "p", text: "You will review designs and inherit both kinds of endpoints. Memorize these pairs; the left column costs you test time:" },
      { type: "ul", items: [
        "Bad: POST /createNewOrder — Good: POST /orders. Verbs in URLs duplicate the method and invite /createNewOrder2.",
        "Bad: /order/42 — Good: /orders/42. Plural nouns keep lists and singles consistent: /orders and /orders/42.",
        "Bad: https://api.shop.example/getOrders — Good: GET https://api.shop.example/v1/orders. A version in the path lets v2 ship without breaking every v1 test overnight.",
        "Bad: hiding ownership in the query only — Good: nest to show it: /users/42/orders reads as 'the orders belonging to user 42'.",
        "Bad: returning all 50,000 orders and letting the UI cut them down — Good: paginate with /orders?page=2&limit=50 or a cursor like /orders?after=ord_84512&limit=50.",
        "Bad: /orders?filterType=2&value=paid — Good: filter with readable parameters: /orders?status=paid&from=2026-05-01."
      ] },
      { type: "p", text: "Once the map is predictable, your checks become predictable. On any endpoint, verify three things: the status code matches the action (201 after a POST, 204 after a DELETE), the payload shape matches the contract (names, types, and nesting as documented), and the error bodies are useful — a 400 that says 'qty must be at least 1' instead of an empty 500. REST hands you the expectations for free; testing is holding the API to them." },
      { type: "h", text: "Step by step" },
      { type: "p", text: "Give a new API the same first hour every time:" },
      { type: "ul", items: [
        "Get the docs or OpenAPI spec and skim the resource names before you test anything.",
        "Run the CRUD lap on one resource: list, read one, create, update, delete.",
        "Check the conventions: plural nouns, a version in the path, ids in the path, filters and pagination in the query.",
        "Push the edges of each convention: page 0, limit 1, limit 1000, an id that does not exist, a filter with no matches.",
        "Compare every response against the docs and log each drift, however small; drift is where bugs breed."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Testing only the URLs the UI calls — the frontend touches a fraction of the endpoints. Instead, work from the spec so orphan endpoints with bugs get attention too.",
        "Assuming nesting is decoration — /users/42/orders and /orders/42 can return different authorization decisions. Instead, test both paths against the same data and compare who may see what.",
        "Skipping pagination boundaries — page 999 and limit 1000 are classic crash seats. Instead, put boundary pages in every list test.",
        "Treating the docs as permanent truth — APIs drift from their specs within a sprint. Instead, verify a sample of documented fields on every major flow.",
        "Accepting lazy error bodies — a 400 that says only 'Bad Request' hides which field failed, and that is itself a defect. Instead, require error responses to be specific and safe to display."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a one-page cheat sheet of the app's resources and canonical URLs; every future bug report gets faster.",
        "When invited to a design review, question the URL grammar early — renaming endpoints after release breaks every client and test.",
        "Test collection endpoints at three sizes: empty, one page, several pages.",
        "After creating a resource, confirm it is reachable at the URL the Location header claims."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Resources are nouns, methods are verbs; read URLs as sentences.",
        "Version in the path, plural collections, ids for single items.",
        "Pagination and filtering belong in the query string; test their edges.",
        "Verify three things everywhere: status code, payload shape, error usefulness."
      ] },
      { type: "quote", text: "Interview tip: asked to design a 'cancel order' endpoint, answer PATCH /orders/42 with a status change, or POST /orders/42/cancellation when the action needs an audit trail — either is fine if you can say why." }
    ]
  },
  {
    id: "authn-vs-authz",
    num: "042",
    title: "Authentication vs Authorization: Sessions, Tokens, and OAuth",
    dek: "Login proves who you are; roles decide what you may touch. Sessions, JWTs, and OAuth in plain words, plus the checklist that catches most access-control bugs.",
    date: "2026-06-02",
    read: "5 min",
    category: "Web & API Basics",
    difficulty: "intermediate",
    tags: ["authentication", "authorization", "security"],
    status: "green",
    body: [
      { type: "p", text: "You log in without trouble, click the Orders tab, and the screen answers 403 Forbidden. Your account works, your token is fresh, and the feature is simply closed to your role — three systems agreed on one thing and disagreed on the rest. This is the moment every tester learns that 'logged in' and 'allowed' are two different doors with two different keys." },
      { type: "p", text: "Authentication asks who you are: the email and password step, the OTP text, the fingerprint. Authorization asks what you may do: whether this proven user may read order 84512 or approve a refund. The airport analogy holds: the officer at passport control checks your identity (authentication), and the badge readers after it decide which gates open (authorization). Even the status codes split the two: 401 means unauthenticated, 403 means authenticated but not allowed." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Access control is where the expensive bugs live. A user reading another user's order history is a privacy incident, sometimes a headline, occasionally a fine. It is also where UI-only testing goes blind, because the frontend hides the buttons while the API behind them often still answers anyone holding a token. The reliable check is talking to the API the way a curious customer would." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Three mechanisms cover nearly every app you will test, in plain words:" },
      { type: "ul", items: [
        "Session cookie — after login, the server creates a session, stores it, and hands your browser a cookie. Every request carries it, and the server remembers you until the session expires or you log out. 'Remember me on this computer' is session thinking.",
        "JWT bearer token — login returns a signed ticket: a long encoded string the client sends in the header Authorization: Bearer eyJhbGci.... The server checks the signature instead of consulting a memory, which is why it scales; the ticket carries your user id and role inside, and it expires.",
        "OAuth 2.0 — delegated login, the machinery behind 'Sign in with Google'. You (the user) let the app (the client) ask Google (the provider) for proof of who you are plus a narrow permission; the app never sees your Google password."
      ] },
      { type: "p", text: "Whatever the mechanism, the same short checklist catches most access bugs:" },
      { type: "ul", items: [
        "No token — call a protected endpoint with no Authorization header; expect 401, never a polite 200 carrying someone's data.",
        "Wrong role — sign in as a customer and try an admin action like GET /admin/refunds; expect 403, and confirm the UI hid the button too.",
        "Expired token — replay a token past its lifetime; expect 401 and a clean path back to login, not a hung spinner.",
        "Cross-user access — as user A, request user B's order by id and expect 404 or 403, never the order. Swapping ids like this is called IDOR, and note 090 gives it a full treatment.",
        "Logout behavior — after logging out, replay the old cookie or token; if the server still accepts it, the session never really died.",
        "Token hygiene — the token should travel in a header, not sit in the URL where logs, screenshots, and shoulder-surfers collect it."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Mixing the two words in reports — 'authorization bug' written for a failed login sends triage the wrong way. Instead, write 'authentication fails with valid credentials' or 'authorization lets a customer read admin refunds'.",
        "Trusting the UI as the guard — hidden buttons are decoration; the API is the door. Instead, fire the request directly with the customer's token.",
        "Assuming a valid token means valid access forever — roles change while tokens live. Instead, demote a user mid-session and watch what still opens.",
        "Testing only your own account — you are the least interesting user on the system. Instead, keep a matrix of accounts: customer, admin, deactivated, expired.",
        "Skipping logout and expiry edges — sessions end more often than they begin. Instead, schedule token-expiry tests as first-class cases rather than leftovers."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Build the test-account matrix before your first auth test: who, which role, which state.",
        "Keep one saved request collection per role so replaying a scenario as another user takes seconds.",
        "Record exact status codes in access bug reports; the 401-versus-403 distinction decides who receives the ticket.",
        "Re-run the cross-user check whenever a new endpoint ships; new endpoints are where IDOR is born.",
        "Learn the app's token lifetime and refresh flow by heart; half of all 'random logout' reports are expiry arithmetic."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Authentication is who you are; authorization is what you may do.",
        "401 means unauthenticated; 403 means authenticated but not allowed.",
        "Sessions remember you, JWTs carry signed proof, OAuth delegates to a provider.",
        "Hide the buttons all you like — test the API behind them."
      ] },
      { type: "quote", text: "Interview tip: for 'a user can see another user's order', start with 'that is an IDOR — I would replay the request as user A against user B's id and check the status codes' and you have already separated yourself." }
    ]
  },
];
