import type { Post } from "../post-types";

export const PLATFORMS_A: Post[] = [
  {
    id: "performance-testing-vocabulary",
    num: "087",
    title: "Performance Testing: The Vocabulary of Load, Stress, Spike, Soak",
    dek: "One user, instant page; two hundred users, forty seconds. The five kinds of performance testing, the metrics that matter, and why the median response time lies.",
    date: "2026-08-08",
    read: "5 min",
    category: "Performance & Security",
    difficulty: "beginner",
    tags: ["performance-testing", "load-testing", "stress-testing", "metrics"],
    status: "green",
    body: [
      { type: "p", text: "The demo was perfect: one tester clicking through the new product page, every response instant. On launch day, two hundred customers opened the same page in the same minute and it took forty seconds to load; the mobile app timed out first. The developer had written an N+1 query — one database call per product review — invisible with one user, fatal with two hundred. Performance testing is how you find that bug before your customers do." },
      { type: "p", text: "Performance testing is not one activity but a family of them, and each type answers a different question. Think of a highway engineer: she studies the normal rush hour, pushes traffic until the road jams, models a stadium emptying all at once, and watches the asphalt across a whole summer. Testers use the same idea, which is why the vocabulary matters — load, stress, spike, soak, and volume are not synonyms. They are five different appointments." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Without the vocabulary, requests go mushy. 'Can you make it faster?' produces a week of guessing; 'Can we survive 500 concurrent users with a p95 under one second?' produces a test plan. In a real job you will hear 'did anyone soak this build?' in release meetings, and the go/no-go call will hang on percentiles and error rates, not on how the page felt on your laptop." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Map each test type to the question it answers before you run anything:" },
      { type: "ul", items: [
        "Load test — can the system handle the traffic we expect on a normal Tuesday? Run at predicted peak, for example 200 virtual users for one hour, and measure response times and errors.",
        "Stress test — where does it break, and how? Push beyond expected load step by step until errors or slowdowns appear, then report the breaking point and what failed first.",
        "Spike test — will it survive a flash sale? Jump from 50 users to 2,000 in thirty seconds, hold there, then watch how quickly the system recovers to normal.",
        "Soak test (also called endurance) — does it stay healthy for hours? Run moderate load for 8 hours and watch for memory leaks, drained connection pools, and disks filling with log files.",
        "Volume test — does it still work with huge data? Fill a table with a million rows or a catalog with 100,000 products, then check that searches, filters, and pages stay fast."
      ] },
      { type: "p", text: "Whichever type you run, three metrics carry the story:" },
      { type: "ul", items: [
        "Response time percentiles — p50 is the median: half of all requests finish faster than it. p95 means 95 percent of requests finish under that number, and p99 exposes the unlucky tail. The median lies; a 300 ms p50 can hide a 9-second p99, and the users in that tail are the ones who never come back.",
        "Throughput (RPS) — requests per second the system actually serves while staying healthy. If throughput stops climbing as you add users, something is saturated.",
        "Error rate — the percentage of failed requests. A fast 500 is still a failure, and most teams treat anything above 1 percent under load as a stop sign."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Trusting the average — averages hide the worst experience your users actually have. Instead, report p95 and p99 next to the average.",
        "Testing with a single user — one user proves the feature works, not that it scales; the N+1 story happens exactly here. Instead, test at expected peak before launch.",
        "Writing scripts with no think time — robot users that fire requests back to back measure the server, not people. Instead, add a pause between actions, the way real shoppers pause.",
        "Skipping the soak test — memory leaks show up at hour six, not minute six. Instead, schedule one long soak before a major release.",
        "Watching only response times — a system can slow down politely or fail loudly. Instead, put errors and throughput in the same report as speed."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Define expected traffic with real analytics numbers before you write a script, not after.",
        "Agree a pass/fail threshold with the team first, for example p95 under 500 ms and error rate under 1 percent.",
        "Use a staging environment with production-like data volume; a 200-row table tells you nothing about a 2-million-row one.",
        "Rerun the exact same scenario after the fix so the before-and-after numbers are comparable.",
        "Save scripts and results with the release notes; performance regressions argue better with history."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Load = expected traffic, stress = past the limit, spike = sudden jump, soak = hours, volume = big data.",
        "p95 and error rate tell the truth the average hides.",
        "A page that works for one user says nothing about 200.",
        "Name the question first; the test type follows from it."
      ] },
      { type: "quote", text: "Interview tip: name the five types and attach a question to each — 'soak is how you catch memory leaks' is the sentence interviewers wait to hear." }
    ]
  },
  {
    id: "k6-first-load-test",
    num: "088",
    title: "Your First Load Test With k6",
    dek: "From zero to a real load test: install k6, script ten virtual users against a checkout API, set a p95 threshold, and read the summary like a tester.",
    date: "2026-08-09",
    read: "5 min",
    category: "Performance & Security",
    difficulty: "intermediate",
    tags: ["k6", "load-testing", "performance-testing"],
    status: "green",
    body: [
      { type: "p", text: "Monday standup, one sentence: 'Staging felt slow when the whole team clicked around at once — can you put some load on it before Thursday's release?' Heads nod toward you. You have never run a load test. Here is the shortest honest path from nothing to a real result with k6." },
      { type: "p", text: "k6 is a free, open-source load testing tool from Grafana Labs. You write a small script that describes one user journey, and k6 spawns any number of virtual users to repeat it, then prints timing and error statistics. Each virtual user is a robot customer: it opens the connection, performs the journey, rests, and goes again until the timer stops. Install it with brew install k6 on macOS or choco install k6 on Windows, then confirm the setup with k6 version." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Clicking around manually cannot find the cliff where the app falls over, because your finger is one user. k6 makes the cliff measurable and repeatable, and thresholds turn performance into pass/fail like any other assertion — the run fails if p95 is too slow, so 'it felt fine' stops being the only evidence. That is also why k6 fits CI: the same script that ran on your laptop can gate a release." },
      { type: "h", text: "In practice" },
      { type: "p", text: "A first script needs three parts: options (how many users, how long, what counts as passing), a default function (what each virtual user does), and checks (assertions on the response). Save this as load/checkout.js and run it with k6 run load/checkout.js:" },
      { type: "code", lang: "ts", label: "load/checkout.js", code: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://staging.shop.example/api/cart');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body mentions items': (r) => r.body.indexOf('items') !== -1,
  });
  sleep(1);
}` },
      { type: "p", text: "vus is the number of virtual users, duration is how long they run, and sleep(1) is think time so the robots behave a little more like shoppers. When the run ends, k6 prints a summary. Read it in this order:" },
      { type: "ul", items: [
        "http_req_duration — the timing table. Find the p(95) row: it must sit under your 500 ms threshold, and it is the number to report to the team.",
        "http_req_failed — the percentage of requests that errored; 0.00% is the goal, and the threshold above fails the run past 1 percent.",
        "checks — how many of your check() assertions passed. A fast error page that returns the wrong body is caught here, not in the timings.",
        "iterations — how many times the whole journey ran end to end; use it to confirm the test actually did work and nothing short-circuited.",
        "thresholds — the closing lines restate each threshold as passed or failed, and k6 exits with an error code on failure, which is what makes it CI-friendly."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Pointing k6 at production — ten virtual users against a live checkout is a small denial-of-service you launched yourself. Instead, always run against staging or a dedicated load environment.",
        "Load testing someone else's API — traffic you were not invited to send looks like an attack, can get your IP banned, and may breach the provider's terms. Instead, test only systems you own or have written permission to test.",
        "Inventing thresholds alone — 500 ms means nothing until the product team agrees users should not wait longer. Instead, set thresholds with dev and product before the first run.",
        "Asserting only on the status code — some apps return 200 with a broken body. Instead, check something real in the response, as the second check in the script does.",
        "Treating one green run as proof — networks hiccup and caches warm up. Instead, rerun the same script twice and compare the numbers before you report."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Start small: 5 to 10 virtual users for 30 seconds proves the script works before you scale up.",
        "Use stages to ramp traffic up and down instead of starting at full strength, which mimics how real users arrive.",
        "Keep load scripts in the repository next to the code they protect, and name them after the journey they simulate.",
        "Give the load environment production-like data volume, or your percentiles will flatter the app.",
        "Record the run date, script version, and result with each release so trends stay visible."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "options set who and how long, the default function is the journey, thresholds decide pass or fail.",
        "Read p(95) and http_req_failed first; everything else is context.",
        "Staging only, with permission, every single time."
      ] },
      { type: "quote", text: "Interview tip: 'vus is how many fake users, duration is how long, thresholds decide pass or fail' — that one sentence tells an interviewer you have actually run k6." }
    ]
  },
  {
    id: "security-testing-basics",
    num: "089",
    title: "Security Testing for Beginners: Think Like an Attacker",
    dek: "You already own the only tools you need: a browser and two accounts. Six beginner security checks with exact steps, plus the one ethics rule that keeps you employed.",
    date: "2026-08-11",
    read: "5 min",
    category: "Performance & Security",
    difficulty: "beginner",
    tags: ["security-testing", "owasp", "idor", "manual-testing"],
    status: "green",
    body: [
      { type: "p", text: "What does an attacker see when they open your app? Not the shiny features — the assumptions. 'Nobody will change the order number in that URL.' 'Nobody will paste that into the search box.' Security testing is the discipline of testing those assumptions on purpose, and your first pass needs nothing but a browser and two accounts." },
      { type: "p", text: "Think of the attacker as a burglar who skips the front door with its welcome mat and walks the fence line looking for a side gate nobody bothered to latch. Developers build the front door carefully; the gate — a URL parameter, a hidden form field, a forgotten admin page — is where the assumptions live. Your job is to walk the fence politely and report every gate that opens." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Broken access control — the gate problem — tops the OWASP Top 10 for a reason: it is common, and it leaks real customer data. Teams assume the user interface hides things, but the browser is a client you do not control; anything the server sends can be read and changed. Finding an IDOR before launch is a quiet save. Finding one after launch is an incident, a customer email, and sometimes a regulator." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Six checks, zero tools. Run them with a plain user account and keep a second account handy for comparison:" },
      { type: "ul", items: [
        "IDOR (Insecure Direct Object Reference) — log in as user A and open an order at /orders/1042. Change the URL to /orders/1043. If you see another customer's order, the server forgot to check whose order it is; that is a critical finding, and screenshots from both accounts prove it.",
        "Forced browsing — while logged in as a plain user, type /admin, /admin/users, and /internal/reports into the address bar. A redirect to login or a 403 page is correct; a rendered admin panel is not.",
        "Auth bypass — pick an API call from the Network tab, such as /api/v1/orders, and open it in a fresh private window with no token. A 401 or 403 is the server working; a 200 with data means the endpoint trusts whoever asks.",
        "Hidden field tampering — on the cart page, open DevTools and look for inputs like price or userId marked hidden. Change 199.00 to 1.00 and submit. If the order saves at 1.00, the server trusted the client's numbers.",
        "Input injection curiosity — type a single quote into a search box and watch for a raw SQL error; type <b>bold</b> into a comment field and see whether the page renders it. An error quoting SQL and HTML that executes are both findings; stop at the first harmless probe.",
        "Secrets in page source — run view-source and search for api_key, secret, token, and password. Then check the Network tab for tokens sitting in URLs, where logs and browser history will happily copy them."
      ] },
      { type: "p", text: "One rule comes before every check on that list, and it is not negotiable: only test what you are authorized to test. That means your own project, your company's staging environment, or a system covered by written permission such as a bug bounty scope. Probing a site you do not own is illegal in many countries even with good intentions, and 'I was just testing' will not protect you. When in doubt, ask your lead first." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Reporting 'user data is visible' without evidence — a security bug needs exact URLs, two accounts, and screenshots, or the developer cannot reproduce it. Instead, attach the before-and-after pair.",
        "Treating a hidden UI as protection — hiding the button does not remove the action; the API behind it is the real target. Instead, test the endpoint directly.",
        "Escalating a probe into damage — on shared staging, a payload that wipes or mass-changes data hurts your own team. Instead, keep every probe harmless and stop at proof.",
        "Testing production without permission — even a read-only probe against a live system can trip alarms and cost trust. Instead, ask where the safe environment is.",
        "Sitting on a critical find to write it up beautifully — data exposure is a stopwatch, not a backlog item. Instead, ping the developer immediately, then file the report."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep two test accounts (one admin, one plain user) in every environment you test.",
        "Add an IDOR check to your checklist for every list or detail page; it takes two minutes.",
        "Learn the OWASP Top 10 as a tester's checklist — it turns these instincts into a vocabulary the whole team shares.",
        "Log exact steps, URLs, and payloads in the bug report; security findings live and die by reproducibility.",
        "Pair with the developer on the fix and retest the endpoint yourself before it closes."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Attackers abuse assumptions, so list the assumptions and test each one.",
        "Six zero-tool checks: IDOR, forced browsing, auth bypass, hidden fields, injection curiosity, leaked secrets.",
        "Authorization bugs live in URLs and APIs, not in the buttons you can see.",
        "Authorization to test comes first; curiosity comes second."
      ] },
      { type: "quote", text: "Interview tip: when asked how you would security-test a web app, start with 'two accounts and change the ID in the URL' — the IDOR story is the one interviewers remember." }
    ]
  },
  {
    id: "owasp-top-ten-for-testers",
    num: "090",
    title: "The OWASP Top 10, Translated for Testers",
    dek: "The OWASP Top 10 reads like a policy document. Translated: six risk categories, six concrete probes, and the exact things to type and click on your next test pass.",
    date: "2026-08-13",
    read: "5 min",
    category: "Performance & Security",
    difficulty: "intermediate",
    tags: ["owasp", "security-testing", "web-security"],
    status: "green",
    body: [
      { type: "p", text: "The OWASP Top 10 is a ranked list of the ten most critical web application security risks, published by the Open Worldwide Application Security Project, a nonprofit that refreshes it every few years. Security teams quote it by number, and penetration test reports are organized by it. Six of the ten entries will cross your desk in a normal first year; the other four mostly belong to architects and dependency scanners." },
      { type: "p", text: "For a tester, the Top 10 is less a reading assignment than a ready-made checklist. Each entry is a category of mistake, and each category becomes a probe — a specific thing you type, click, or change to see whether the mistake is present. You do not need to exploit anything; you need to demonstrate that the door is open." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Interviewers bring it up, security reviews ask what you checked against OWASP, and bug reports that carry an entry number get taken seriously faster because everyone shares the vocabulary. Knowing the categories also stops the classic beginner error of calling every oddity a 'hacking bug' — a leaked stack trace and an IDOR are different entries with different fixes." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here are the six entries a beginner actually meets, each with the probe that tests it:" },
      { type: "ul", items: [
        "A01 Broken Access Control — users reach data or actions that are not theirs. Probe: run the IDOR checklist — two accounts, swap the IDs in URLs and API requests, open admin pages as a plain user, and try a DELETE on a record that belongs to the other account.",
        "A02 Cryptographic Failures — secrets protected badly or not at all. Probe: is the login page plain http? Does any request carry a password in a URL? Does a password reset link follow a guessable pattern? Each yes means data is traveling or resting unprotected.",
        "A03 Injection — untrusted input reaches an interpreter such as SQL. Probe: type a single quote into search and name fields and watch for raw SQL errors or stack traces; the error message itself is the finding, because it shows input reached the database unfiltered.",
        "A05 Security Misconfiguration — defaults and debug settings left on. Probe: trigger a deliberate error and read what comes back — a full stack trace with file paths and versions is a finding; then try admin/admin on any login screen you meet.",
        "A07 Identification and Authentication Failures — the system cannot reliably tell who is who. Probe: enter ten wrong passwords and watch for a lockout or delay; check whether 'password1' is accepted; decode a JWT at jwt.io and look for editable claims like role:admin.",
        "A09 Security Logging and Monitoring Failures — nobody would notice an attack in progress. Probe: after your deliberate failed logins and 403s, ask whether anything alerted and whether logs captured user, IP, and timestamp. If the answer is no, that is the finding."
      ] },
      { type: "p", text: "The other four entries — A04 Insecure Design, A06 Vulnerable Components, A08 Software and Data Integrity Failures, and A10 Server-Side Request Forgery — still exist; they simply surface later in a tester's career, usually as design review questions or dependency audit findings." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Calling any odd behavior 'injection' — input echoing back is not injection; something must reach an interpreter and misbehave. Instead, bring the error message as evidence and quote it exactly.",
        "Copying attack payloads from the internet onto shared staging — a payload that mass-deletes rows hurts your own team's environment. Instead, use the smallest probe that proves the point.",
        "Testing only what the browser shows — the browser is a thin client; the API traffic in the Network tab is where A01 and A02 usually live. Instead, test the endpoints directly.",
        "Skipping A09 because logs feel boring — breaches are measured in detection time, and 'nobody noticed' is a boardroom sentence. Instead, ask about alerting in every release review.",
        "Reporting without the entry number — 'login is bad' gets triaged slower than 'A07: no lockout after 20 failed passwords'. Instead, put the OWASP number in the bug title."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Map each new feature to the entries that could apply before you test; a payments page raises A01, A02, and A03 at minimum.",
        "Spend ten minutes learning to read a JWT — decoding is free and A07 checks become quick.",
        "Keep every probe harmless, and note in the bug report exactly what was and was not done.",
        "Rerun your probes after the fix and record the result in the ticket so the closure is provable.",
        "Treat the Top 10 as a vocabulary course: the numbers let QA, developers, and security talk in one language."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "The OWASP Top 10 is the industry's shared list of web security risks, quoted by number.",
        "A01, A02, A03, A05, A07, and A09 are the entries beginners meet first.",
        "Every entry translates into a concrete probe, not a theory.",
        "A finding with a number, a probe, and evidence moves fastest."
      ] },
      { type: "quote", text: "Interview tip: name two entries and attach the probe you would run — 'A07? I check lockout and try weak passwords' beats reciting the list from memory." }
    ]
  }
];
