import type { Post } from "../post-types";

export const WEB_A: Post[] = [
  {
    id: "how-the-web-works",
    num: "035",
    title: "How the Web Works: A Tester's Tour of Browser and Server",
    dek: "Follow one click of the Pay button through DNS, TCP, TLS, HTTP, the server, and the database — plus the Network tab habits that turn mysteries into bug reports.",
    date: "2026-05-22",
    read: "5 min",
    category: "Web & API Basics",
    difficulty: "beginner",
    tags: ["http", "browser", "networking"],
    status: "green",
    body: [
      { type: "p", text: "The developer closed your ticket with 'fixed, please verify'. You open the same page and see the same broken layout, so you re-open the ticket. The developer opens the same page and sees a fixed one. You are both telling the truth: your browser was still holding a cached stylesheet from yesterday, and neither of you had a map of what happens between a click and a page." },
      { type: "p", text: "Every page you test is a conversation between two programs, and it follows the same route every time. Think of mailing a letter: DNS is the address book that turns a name into a street address, TCP is the courier who confirms delivery, TLS is the sealed envelope, HTTP is the letter itself, and the server is the office that reads it and replies. The full trip runs browser, DNS lookup, TCP connection, TLS handshake, HTTP request, server application, database, response, render — and every hop leaves a trace you can inspect." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without this map you can only say 'the page looks wrong'; with it you can say 'POST /orders returned 500 after eight seconds'. Half of a web tester's daily toolkit sits on this route: the Network tab, status codes, caching, and CORS. It is also how you learn which layer betrayed you — the network, the application, the database, or your own browser's cache." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Walk one 'user clicks Pay' click on a food-delivery cart through every layer:" },
      { type: "ul", items: [
        "The click runs JavaScript in the browser, which builds a request: POST https://api.deliver-eats.example/v1/orders with the cart contents in the body.",
        "DNS lookup — the browser asks a name server where api.deliver-eats.example lives and gets back an address like 203.0.113.20.",
        "TCP and TLS — the browser opens a connection to that address and encrypts it; this is the padlock in the address bar.",
        "The request travels — method POST, path /v1/orders, headers such as Authorization: Bearer eyJ... and Content-Type: application/json, and a body with two pizzas and a delivery address.",
        "The application server validates the cart, checks stock, computes the total, and decides the order is allowed.",
        "The database — the app inserts an order row and gets back order id 84512.",
        "The response travels back over the same connection: 201 Created, with the new order as JSON.",
        "The browser renders — the cart screen is replaced by the confirmation screen."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Open DevTools with F12 and switch to the Network tab before you touch the app.",
        "Click Pay once, find the request named orders, and read the Status column first: 201 is healthy, anything else is the story.",
        "Click the request and read the Payload tab (what was sent) and the Response tab (what came back).",
        "Open the Timing tab to see whether the wait was the server or the network.",
        "When a 'fixed' bug still looks alive, hard-refresh with Ctrl+Shift+R to force fresh files before you re-open the ticket.",
        "Paste the method, URL, status code, and response body into the bug report — a ticket that says 500 with the server's message beats one that says the button does nothing."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Reporting 'the site is down' without opening the Network tab — the request may be fine and the rendering broken. Instead, name the failing request and its status code.",
        "Retesting a fix over a stale cache — yesterday's files made a dead bug look alive here and nearly caused a false reopen. Instead, hard-refresh or try the flow in an incognito window first.",
        "Blaming the API when the browser blocks the response — a CORS error means the browser refused a cross-origin reply, and the same call in Postman can succeed. Instead, read the console message before filing 'API broken'.",
        "Assuming a rendered page means a healthy flow — a 302 redirect may have quietly routed the browser somewhere you never meant to test. Instead, check which URL actually responded.",
        "Calling every slow page a network problem — the Timing tab often shows the server ate six of the seven seconds. Instead, report which phase was slow."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep the Network tab open by default whenever you test anything that talks to a server.",
        "Filter the log by Fetch/XHR so images and fonts step aside and the API calls stay visible.",
        "Save the traffic as a HAR file when a developer needs evidence they can replay.",
        "Learn four status codes cold — 200, 201, 404, 500 — and add the rest one bug at a time.",
        "Capture method, URL, status, and response body before you write a single sentence of the ticket."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Every click is a request, and every request carries a status code you can read.",
        "DNS finds the address, TCP and TLS make the call safe, HTTP does the talking.",
        "The server is two moving parts — application logic and a database — and bugs live in both.",
        "The Network tab plus cache awareness turns 'looks broken' into a fixable report."
      ] },
      { type: "quote", text: "Interview tip: when asked how the web works, walk one click through DNS, TCP, TLS, HTTP, server, database, response, render — the sequence itself is the answer they are listening for." }
    ]
  },
  {
    id: "browser-devtools-for-testers",
    num: "036",
    title: "Browser DevTools: The Tester's Swiss Army Knife",
    dek: "Six DevTools moves every tester needs: reading console errors, spotting failing requests, faking a phone, throttling to Slow 3G, inspecting cookies, and checking data-testid attributes.",
    date: "2026-05-23",
    read: "5 min",
    category: "Web & API Basics",
    difficulty: "beginner",
    tags: ["devtools", "browser", "debugging"],
    status: "green",
    body: [
      { type: "p", text: "What tool is already installed on every machine you will ever test on, costs nothing, and answers half the questions a developer will ask you? Browser DevTools — and most junior testers only open it by accident. Press F12, or right-click and choose Inspect, and the page stops being a surface and starts showing its instruments." },
      { type: "p", text: "Think of DevTools as the diagnostic port a mechanic plugs into under your dashboard. The driver sees a speedometer; the mechanic sees sensor readings. To your users the page is buttons and text; to you, with DevTools open, it is JavaScript errors, network traffic, stored cookies, device sizes, and the raw structure of the page." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Developers ask questions DevTools answers on the spot: what did the API return, is there a JavaScript error, is that element even in the page? A tester who pastes those answers into the ticket ends the 'could not reproduce' ping-pong. The panels also guard against two classics: reporting a bug that was really a cached script, and filing 'slow' when the connection, not the app, was the culprit." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Six moves cover most of a tester's week. Learn each with its exact panel:" },
      { type: "ul", items: [
        "Console for JavaScript errors — open the Console panel and reload the page, then read the red lines. 'Uncaught TypeError: Cannot read properties of undefined' appearing exactly when the screen goes blank is usually your bug, file and line included.",
        "Network tab for failing requests — reload with the panel open, sort by the Status column, and inspect the red rows: status code, request payload, response body, and timing are four fifths of a bug report already written.",
        "Device toolbar for mobile viewports — press Ctrl+Shift+M or click the phone icon, pick iPhone SE from the dimensions dropdown, and test layout and tap targets at 375 pixels wide without owning the phone.",
        "Network throttling for loader testing — in the Network panel switch No throttling to Slow 3G and reload; now you can watch whether the spinner appears, holds, and hands over to content instead of a half-painted page.",
        "Application tab for cookies and localStorage — expand Storage, open Cookies and Local Storage, and read the real keys and values. 'The user is still logged in' is usually one session value you can watch being set and surviving logout.",
        "Elements tab for data-testid attributes — right-click the element, choose Inspect, and search the DOM for data-testid='checkout-pay-button'. Automation lives and dies by these hooks, so missing or duplicated test ids deserve a ticket of their own."
      ] },
      { type: "p", text: "When a request fails, the Network tab hands you the story in two clicks. Here is a realistic response body behind a broken checkout — the status line read 500 Internal Server Error on POST /api/orders:" },
      { type: "code", lang: "json", label: "devtools/network/orders-500.json", code: `{
  "status": 500,
  "error": "Internal Server Error",
  "message": "Order total calculation failed: currency must not be null",
  "path": "/api/orders",
  "timestamp": "2026-05-23T14:02:11Z"
}` },
      { type: "h", text: "Step by step" },
      { type: "p", text: "When a bug hits, package what DevTools saw so a developer can replay it:" },
      { type: "ul", items: [
        "Reproduce the bug with the Network panel recording, and check the red record dot is on.",
        "Right-click in the network log and choose Save all as HAR with content.",
        "Screenshot the Console panel if any red errors appeared during the run.",
        "Note the failing request's method, URL, status code, and the key line of its response body.",
        "Paste everything under a 'Technical evidence' heading in the ticket.",
        "Repeat the same steps in an incognito window to rule out extensions and a warm cache."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Judging by the UI alone — DevTools left closed is how a 500 hides behind a friendly error toast. Instead, treat every red network row as a candidate bug.",
        "Reading the console only after the failure — many errors log early and detonate later. Instead, clear the console and reload so the log matches the run you are testing.",
        "Taking throttling numbers literally — Slow 3G is a simulation, not your user's subway ride. Instead, use it to verify loader states, not to promise real-world timings.",
        "Editing values in Elements and walking away — live edits vanish on reload and were never bugs. Instead, confirm the oddity survives a fresh reload before filing.",
        "Trusting the device toolbar for everything — it fakes size and touch, not the GPU, the OS, or a carrier's quirks. Instead, run a final pass on a real phone for layout-critical screens."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Learn the shortcuts: F12 to open, Ctrl+Shift+M for device mode, and Ctrl+Shift+P inside DevTools for the command menu.",
        "Keep the Disable cache checkbox ticked in the Network tab during regression passes so you always test fresh files.",
        "Filter the network log with the Fetch/XHR button when only the API calls matter.",
        "Use Copy response from the right-click menu instead of paraphrasing JSON in the ticket.",
        "Spend ten minutes a week inside one panel you have never used; the tool repays coverage quickly."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "DevTools turns guesses into evidence, on every machine, for free.",
        "Console for errors, Network for requests, Application for storage, Elements for the DOM.",
        "Device toolbar and Slow 3G simulate phones and bad networks well enough to find real bugs.",
        "A ticket with a status code and a response body rarely bounces back."
      ] },
      { type: "quote", text: "Interview tip: 'How do you debug a failing page?' is really asking whether you reach for DevTools first — name the Console, Network, and Application panels and you sound like someone who already does the job." }
    ]
  },
  {
    id: "what-is-an-api",
    num: "037",
    title: "What Is an API? A Tester's Introduction",
    dek: "The restaurant analogy that makes APIs click: menu as contract, waiter as request, kitchen as server — then a real /api/orders example showing why the UI is only a shell.",
    date: "2026-05-25",
    read: "5 min",
    category: "Web & API Basics",
    difficulty: "beginner",
    tags: ["api", "rest", "http"],
    status: "green",
    body: [
      { type: "p", text: "You sit down, pick the margherita from the menu, and tell the waiter. Twenty minutes later, pizza. You never entered the kitchen, never touched the oven, and never needed to know the chef's rules. Software works the same way, and the waiter has a technical name: an API." },
      { type: "p", text: "API stands for Application Programming Interface — a published set of requests one program may send to another, and the replies it will get. In the restaurant, the menu is the contract: it lists what you may order and roughly what arrives. The kitchen is the server: it does the real work and returns a result. The dining room — the user interface you click through — is optional; you can question the kitchen directly." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "UI testing inspects the dining room; API testing interrogates the kitchen. API checks run faster because nothing has to render, stay stable because a redesign cannot move the menu, and catch logic bugs early — a discount that computes wrong is wrong whether or not the button is pretty. And you can start before the UI exists: the moment /api/orders answers, you can test." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Open a food-delivery app's order history. The screen is a shell whose only job is to call GET /api/orders and draw whatever returns — the truth about your orders lives in the payload. Every conversation has two sides with named parts:" },
      { type: "ul", items: [
        "Request method — the verb. GET /api/orders says 'list my orders'; POST would say 'create a new one'.",
        "Request URL — the address of the resource, like https://api.deliver-eats.example/api/orders.",
        "Request headers — metadata that travels with the call: Authorization: Bearer eyJ... proves who you are; Content-Type: application/json declares the format.",
        "Request body — optional extra data: empty for a GET, full of cart items for a POST.",
        "Response status — the one-line verdict: 200 OK means here is your data; 401 means identify yourself first.",
        "Response headers — server metadata such as content type, caching rules, sometimes a refreshed token.",
        "Response body — the payload itself: your orders as JSON, ready for the app to draw.",
        "The contract — the docs or OpenAPI spec saying which of the above are legal. When the server breaks the contract, that is a bug no screenshot can show."
      ] },
      { type: "p", text: "Notice what this buys you: when the history screen shows yesterday's orders, the payload will say so too, and you will know within seconds whether to file the bug against the frontend or the backend." },
      { type: "h", text: "Step by step" },
      { type: "p", text: "See it yourself on any app you test today:" },
      { type: "ul", items: [
        "Open DevTools and go to the Network panel.",
        "Trigger the feature you care about, like loading Order History.",
        "Click the Fetch/XHR filter and find the request to /api/orders.",
        "Read the four request parts, then the status and the body.",
        "Replay the same call in Postman or curl with the same headers and compare answers.",
        "Change one thing — an expired token, a page number — and watch how the status changes."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Judging the API by the UI — a pretty screen can hide a 500 and a blank screen can hide a perfect response. Instead, open the network response before you file anything.",
        "Assuming the menu is the meal — documented contracts and actual responses drift apart every sprint. Instead, test what arrives, not only what the docs promise.",
        "Testing only through the UI because users do — users do, but logic bugs are cheaper in the kitchen. Instead, hit the API directly for edge cases and data checks.",
        "Ignoring headers — the Authorization header decides whether you are even talking to the right kitchen. Instead, capture headers whenever a call behaves differently than expected.",
        "Assuming a mismatch means a backend bug — sometimes the response is right and the screen lies. Instead, name which side failed in the ticket; developers will thank you."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Learn one real response per feature by heart; it teaches the domain faster than any tutorial.",
        "Keep a running list of endpoints you discover while testing; it grows into your API test plan.",
        "Compare response bodies against the acceptance criteria, never against the screen.",
        "When UI and API disagree, say in the ticket which one you believe and why.",
        "Ask for the OpenAPI spec early; testing against a published contract beats guessing."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "An API is a published contract between the requests you may send and the replies you will get.",
        "Requests have method, URL, headers, body; responses have status, headers, body.",
        "The UI is a shell; the payload is the truth about your data.",
        "API testing is faster, steadier, and available before the first screen exists."
      ] },
      { type: "quote", text: "Interview tip: explain the waiter analogy in two sentences, name the four parts of a request, and you have answered 'what is an API' better than most candidates ever do." }
    ]
  },
  {
    id: "http-methods",
    num: "038",
    title: "HTTP Methods Explained: GET, POST, PUT, PATCH, DELETE",
    dek: "Five verbs that decide what a request does to your data — and why double-clicking Pay creates two orders while repeating a PUT changes nothing.",
    date: "2026-05-27",
    read: "4 min",
    category: "Web & API Basics",
    difficulty: "beginner",
    tags: ["http", "api-testing", "curl"],
    status: "green",
    body: [
      { type: "p", text: "Two orders. One payment. Screenshots in the support inbox, an escalation by lunch, and a root cause you can recite in your sleep: a double-tapped Pay button fired POST /orders twice, and nobody on the team could say out loud what POST does when you send it twice." },
      { type: "p", text: "HTTP methods are the verbs of an API — each one tells the server what to do with a resource. Picture a whiteboard: GET reads it without touching a marker, POST pins up a brand-new sheet, PUT erases a sheet and rewrites it word for word, PATCH corrects one line, DELETE takes the sheet down. Two properties matter for testing: safe means the request changes nothing, and idempotent means sending it twice leaves the same result as sending it once." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Method semantics decide what your test data looks like after the call, so they decide what you verify. A repeated POST that creates two orders may be the bug; a repeated PUT that changes nothing is the promise working as designed. If you report 'the API is broken' without naming which guarantee broke, the first hour of every bug call becomes a vocabulary lesson." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here are the five methods fired at a shop's orders API exactly as you would run them with curl:" },
      { type: "code", lang: "bash", label: "scripts/orders-api-curl.sh", code: `# List paid orders - GET is safe: repeat it, change nothing
curl "https://api.shop.example/v1/orders?status=paid"

# Create an order - POST is not idempotent: fire it twice, get two orders
curl -X POST "https://api.shop.example/v1/orders" -H "Content-Type: application/json" -H "Authorization: Bearer qa-token-123" -d '{"customerId": 42, "items": [{"sku": "KB-750", "qty": 2}]}'

# Replace order 5001 wholesale - PUT is idempotent: same result every run
curl -X PUT "https://api.shop.example/v1/orders/5001" -H "Content-Type: application/json" -d '{"customerId": 42, "items": [{"sku": "KB-750", "qty": 2}], "status": "paid"}'

# Adjust one field on order 5001 - PATCH touches only what you send
curl -X PATCH "https://api.shop.example/v1/orders/5001" -H "Content-Type: application/json" -d '{"status": "shipped"}'

# Remove order 5001
curl -X DELETE "https://api.shop.example/v1/orders/5001"` },
      { type: "p", text: "Run the POST twice and count the orders: two is correct, because POST makes no promises about repeats — that is why the Pay button disables itself while the first request is in flight. Run the PUT twice: one order, identical state both times, because PUT promises the same result on every run." },
      { type: "h", text: "Step by step" },
      { type: "p", text: "Probe the guarantees yourself; they take minutes:" },
      { type: "ul", items: [
        "Send POST /orders once and note the new id.",
        "Send the identical POST again and compare — two ids is expected behavior, and duplicate protection, if required, belongs in a documented layer.",
        "Send PUT /orders/5001 twice with the same full body and confirm the second run changes nothing.",
        "Send PATCH changing only the status, then confirm every untouched field kept its old value.",
        "Send DELETE twice: the first should succeed, and the second should return 404 or the same success code — the bug is a 500 or a resurrected order.",
        "Check the response codes: 201 after POST, 200 or 204 after PUT and DELETE, not a bare 200 everywhere."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Using GET to change data, like /addToCart?item=42 — GET requests get cached, prefetched, and retried by browsers, so the side effect ambushes you. Instead, reserve GET strictly for reads.",
        "Treating PUT and PATCH as synonyms — PUT replaces the whole resource, so any field you omit may be wiped. Instead, send the complete object for PUT and only the changed fields for PATCH.",
        "Calling a repeated POST a backend bug too fast — the guard may belong in the disabled button, not the server. Instead, report the behavior and ask which layer should own the duplicate check.",
        "Ignoring what the method promised — POST should answer 201 and identify the new resource, not 200 and silence. Instead, assert on the method's contract.",
        "Testing DELETE against data you need — exploratory deletes can be unrecoverable. Instead, create a throwaway order and delete that."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Memorize the table once: GET is safe; PUT and DELETE are idempotent; POST is neither.",
        "When you meet a button that can be clicked twice, fire the request twice on purpose and see what survives.",
        "Watch the Network tab to learn which method each screen actually uses; a UI that reads with POST or writes with GET is a finding.",
        "Keep one saved curl per method for your main API; reproducing bugs becomes a thirty-second job."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Methods are verbs: read, create, replace, adjust, remove.",
        "Safe means no side effects; idempotent means repeatable with the same result.",
        "Double-POST makes two orders; double-PUT makes none extra.",
        "Assert what the method promises — 201 after create, 204 after a clean delete."
      ] },
      { type: "quote", text: "Interview tip: 'PUT versus PATCH?' comes up constantly — answer 'full replace versus partial update, and PUT is idempotent while POST and PATCH make no such promise' and watch the interviewer relax." }
    ]
  },
];
