import type { Post } from "../post-types";

export const CICD_A: Post[] = [
  {
    id: "ci-cd-for-testers",
    num: "080",
    title: "CI/CD for Testers: The Pipeline You Depend On",
    dek: "Build, unit tests, staging, your E2E pack, production — walk the five stages of a real pipeline and see exactly which parts of it QA owns, tests, and triages.",
    date: "2026-07-28",
    read: "5 min",
    category: "CI/CD & Git",
    difficulty: "beginner",
    tags: ["ci-cd", "pipeline", "qa-workflow"],
    status: "green",
    body: [
      { type: "p", text: "Monday, 9:05 a.m. You open the staging site to start regression and the checkout button throws a 500. Slack already says it: the build has been red since Saturday and nobody looked. That red cross on the pipeline page is the earliest QA signal your team owns, and learning to read the machine that produces it is a career skill, not a DevOps chore." },
      { type: "p", text: "CI/CD is a conveyor belt for code changes. A developer merges work and machines do the rest: build the app, run automatic tests, install the result on a server. Continuous integration (CI) means changes merge small and often, each one built and tested the moment it lands. Continuous delivery means the machine keeps a releasable build ready and a human presses the button. Continuous deployment means even the button is gone — every passing build ships itself." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Testers live at the end of that belt, so the belt decides what you receive and when. A green pipeline hands you a tested, freshly deployed build; a red one hands you the bug report before your coffee is done. Ignore it and you will spend whole days testing builds that were already broken, or chasing bugs that another team fixed hours ago. The pipeline is also where your evidence lives: test reports, screenshots, and logs from every run, stored automatically as artifacts." },
      { type: "h", text: "In practice" },
      { type: "p", text: "A realistic pipeline for a web product has five stages. Notice how much of it is QA's property:" },
      { type: "ul", items: [
        "Build — the code compiles into a runnable app and gets a version number like build 1842. QA owns: knowing which build number sits on staging before you test anything.",
        "Unit tests — developers' fast checks on functions and classes. QA owns: watching the pass rate, because a sudden dip is an early warning for your regression plan.",
        "Deploy to staging — the passing build installs on the test server, usually with fresh sample data. QA owns: a ten-minute smoke test to confirm the deployment actually works before the team invests a day in it.",
        "E2E and API pack — the longer automated suite that drives real user flows through the browser and over HTTP. QA owns: writing, maintaining, and triaging these tests. This is the team's test automation, not a developer side project.",
        "Deploy to production — after approval, the same build ships to real users. QA owns: a production smoke pass and a check that the release notes match what actually changed."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Find the pipeline page on day one and bookmark it — GitHub Checks, Jenkins, or GitLab CI all show the same shape.",
        "Before testing, confirm the staging build number changed and the pipeline is green.",
        "When the build goes red, read the failed stage first: build errors are developer work, a failed E2E stage is your ticket.",
        "Open the artifacts of a failed run and download the report or screenshots before you reproduce anything by hand.",
        "Ask who owns each stage, and claim the E2E and API stage out loud if nobody does.",
        "On release day, run your production smoke pass from the same short checklist every time."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Testing whatever sits on staging without checking the pipeline — you may be testing Thursday's build. Instead, confirm the latest green run deployed the build you think you are testing.",
        "Treating a red build as 'a developer problem' — a red E2E stage is your own suite speaking, and ignoring it trains the team to ignore you. Instead, triage the failure and post a first impression in the channel within the hour.",
        "Reproducing every failure by hand before reading the report — the pipeline already collected logs, screenshots, and traces. Instead, read the evidence first, then reproduce only what it leaves unclear.",
        "Keeping pipeline knowledge in one person's head — the day that person is on leave, releases stall. Instead, write a one-page 'how our pipeline works' note and keep it current.",
        "Assuming green means correct — the pipeline only checks what the tests cover. Instead, ask what the automated pack does not reach and plan manual coverage there."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Learn the stage names and what a red result means at each one; you will work — and be treated — like an owner.",
        "Check the pipeline before your first test of the day, the way a pilot checks instruments.",
        "Keep a staging smoke list of five checks you can run in ten minutes after every deployment.",
        "Feed findings back into the belt: when a manual find becomes an automated case in the E2E stage, the whole team gets faster.",
        "Ask for the E2E stage to run on every pull request, not only nightly; early signal beats late signal."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "CI builds and tests every change; delivery keeps a release ready, deployment ships it automatically.",
        "A red build is the fastest QA signal the team has — treat it as yours.",
        "Artifacts are evidence: reports, screenshots, and logs beat memory in every argument.",
        "The E2E and API stage belongs to QA; own it visibly."
      ] },
      { type: "quote", text: "The pipeline never has a bad morning. It tells the same truth every single time — the only question is whether anyone looked." }
    ]
  },
  {
    id: "git-for-testers",
    num: "081",
    title: "Git for Testers: Clone, Branch, Commit, Pull Request",
    dek: "Seven Git commands and one browser click carry a tester through a normal working day — clone, branch, commit, push, pull request — plus the calm way out of a merge conflict.",
    date: "2026-07-30",
    read: "5 min",
    category: "CI/CD & Git",
    difficulty: "beginner",
    tags: ["git", "version-control", "pull-request"],
    status: "green",
    body: [
      { type: "p", text: "Eight moves. That is the whole daily loop of Git for a working tester: pull, branch, check, add, commit, push, open a pull request, pull again. Every test script, fixture file, and checklist worth keeping lives in the repository, so those eight moves are also your ticket to being treated as part of the engineering team." },
      { type: "p", text: "Git is a time machine with a shared calendar. A repository holds the project's files plus every version ever saved, and a branch is a parallel draft where your changes wait until the team accepts them. You work on your branch, save snapshots called commits, and publish them with a push. Others do the same, and a pull request is where the drafts meet and get reviewed before landing on the main branch." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Test code is code. Your Playwright specs, your CSV fixtures, your API collections, and your test plan documents all live in the repo next to the product, versioned exactly the same way. A tester who cannot branch and commit waits days for someone else to change a locator; a tester who can does it in five minutes with a clean paper trail. There is also self-defense: the commit history proves what changed, when, and why, which settles a lot of arguments before they start." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Here is the loop as a sequence you could pin above your desk. The comments are the parts beginners skip and seniors never do:" },
      { type: "code", lang: "bash", label: "terminal/daily-git-loop.sh", code: `# 1. Sync with the team before you start
git pull origin main

# 2. Cut a branch so main never holds half-finished work
git switch -c qa/regression-pack

# 3. See which files you have changed while you worked
git status

# 4. Stage only the files you mean to share
git add tests/checkout.spec.ts fixtures/refund-codes.csv

# 5. Commit with a message that says why, not just what
git commit -m "Add refund fixtures for the QA-142 regression pack"

# 6. Publish your branch; GitHub prints a link in the output
git push -u origin qa/regression-pack

# 7. Open that link in the browser and create the pull request

# 8. Tomorrow, start again at step 1
git pull origin main` },
      { type: "p", text: "Sooner or later step 1 stops being polite: Git says you and a teammate changed the same lines. That is a merge conflict, not an error. Run git status to see the guilty files, open one, and find the markers — a line of < marks your version, a line of = divides the two, and a line of > marks theirs. Keep the lines that make sense together, delete the marker lines, then git add the file and commit. Small branches and frequent pulls keep this rare." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Run git config --global user.name and user.email once, so every commit you make is attributed to you.",
        "Clone the repo with git clone and cd into the folder; that copy is yours and yours alone.",
        "Never work directly on main; branch first, even for a one-line fix to a test.",
        "Commit small: one fix or one file group per commit, so a bad change can be undone alone.",
        "Pull before you start and before you push; most conflicts are just two stale copies meeting.",
        "When anything feels lost, run git status first — it tells you where you are, and nothing that was committed is ever gone."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Committing straight to main — one broken push blocks every teammate at once. Instead, branch even for small edits and let the pull request be the checkpoint.",
        "Writing 'fix' or 'update' as the commit message — in six weeks nobody, including you, will know what it did. Instead, use the 'Add refund fixtures for QA-142' shape: what and why.",
        "Staging everything with git add . — secret tokens, 300 MB logs, and editor junk ride along. Instead, name the files you intend to share.",
        "Resolving a conflict by copying the whole file from one side — that silently erases a teammate's work. Instead, read all three marker sections and choose deliberately.",
        "Committing passwords or API keys 'just to test' — history keeps them forever, even after a later delete. Instead, keep secrets in environment variables or your team's vault."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Name branches after tickets: qa/qa-142-regression-pack links your work to the story without anyone asking.",
        "Pull, branch, work, pull, push — the two pulls cost seconds and prevent most pain.",
        "Read git log --oneline before you start; a two-minute history read often explains the bug you were about to chase.",
        "Keep test data and test code in the same repo, so one checkout reproduces your whole testing setup.",
        "Run git diff before every commit; reading your own change catches half the accidents for free."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "The daily loop is eight steps, and two of them are just pulling.",
        "Branches keep main clean; small commits keep history readable.",
        "A merge conflict is text with markers, not a crisis.",
        "Test code, fixtures, and docs belong in the repo like any other code."
      ] },
      { type: "quote", text: "A repository is the team's memory: every commit message you write today is a note to whoever debugs this at midnight in six months." }
    ]
  },
  {
    id: "github-workflow-for-testers",
    num: "082",
    title: "GitHub for Testers: Pull Requests and Reviews",
    dek: "The PR page has four tabs and a review box — learn what QA reads in each, the six-point checklist before you approve, and how to link your test evidence.",
    date: "2026-08-01",
    read: "5 min",
    category: "CI/CD & Git",
    difficulty: "beginner",
    tags: ["github", "pull-request", "code-review"],
    status: "green",
    body: [
      { type: "p", text: "A pull request titled 'small cleanup' merged last Thursday with one approving review and green checks. The cleanup had reordered the discount lines in the cart service, and by Saturday every coupon over fifty dollars applied twice. Nobody had opened the Files changed tab with the acceptance criteria in hand — the approval had been a social gesture, not a review." },
      { type: "p", text: "A pull request (PR) is a proposal: here are my commits, please compare them to main and decide. GitHub shows that proposal on a single page. The Conversation tab holds the description and the discussion; Files changed shows the diff, with every added line in green and every removed line in red; the Checks tab shows what the automated pipelines said. Your review is one of the inputs the team uses to merge — or to send the work back." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Automated checks prove the code runs; they cannot prove the feature matches what the customer asked for. That gap is QA's home turf. Reviewing PRs puts you in front of changes days before they reach staging, catches missing acceptance criteria while they are cheap to add, and tells you exactly what to add to the regression pack. It also changes how the team sees QA: not a gatekeeper at the end, but a reviewer at the door." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Work the page in order, then run this checklist before you click anything:" },
      { type: "ul", items: [
        "Acceptance criteria first — open the linked ticket and read the criteria before the diff; then confirm every criterion has a line of code, or a test, that claims to meet it.",
        "Diff against the criteria, not against taste — style opinions waste review time; behavior changes to payments, auth, or shared helpers deserve the scrutiny.",
        "Test coverage — does the PR add or update tests? Which of the changed branches do they actually exercise? Name the gap in a comment if the honest answer is none.",
        "Risky-change scan — database migrations, changed defaults, retry loops, and permission checks fail quietly; flag them for a closer look.",
        "Checks tab — confirm every required check is green and that the QA gate ran on this exact commit, not a stale one.",
        "Description completeness — does the PR say how to test it, with screenshots or a staging URL? Missing evidence is a fair reason to request changes."
      ] },
      { type: "p", text: "Reviews flow both ways. When your own test code or fix is ready, open the PR and use the Reviewers field to request a specific teammate — a generic request sits unread for hours. Then write a description that does the reviewer's work: what changed, why, the ticket link, and how you tested it. Paste your evidence straight into the description: the staging URL, a screenshot of the fixed screen, the API response that used to fail. A PR that carries its own evidence gets reviewed in minutes, not days." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Read the ticket and the PR description before the diff; know what should be true first.",
        "Skim Files changed top to bottom once for shape, then again slowly for behavior.",
        "Open each red, deleted line and ask what used the code that just disappeared.",
        "Run the PR's own test instructions on the preview or staging deployment if one exists.",
        "Leave specific comments anchored to lines: 'this ignores the coupon cap from AC-3' beats 'looks risky'.",
        "Finish with an explicit verdict — Approve, Request changes, or Comment. A silent review is not a review."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Rubber-stamping with LGTM between meetings — your approval is a signature, and Thursday's coupon bug wore one. Instead, approve only after reading the diff against the criteria, even if it takes twenty minutes.",
        "Reviewing only the happy path — the error branches in the diff are where merged PRs fail. Instead, hunt the if and catch blocks on purpose.",
        "Arguing formatting during a behavior review — tabs are what automated lint checks are for. Instead, spend your comments on requirements, coverage, and risk.",
        "Approving by commit message — 'fix cart bug' tells you nothing about what else changed in the same push. Instead, read the whole diff every time.",
        "Testing only on your own laptop — your machine carries three weeks of local data the PR never saw. Instead, use the PR's staging or preview environment."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a personal review checklist in your notes app and run it in the same order every time.",
        "Ask questions in comments; 'what happens when the cart is empty?' teaches more than 'wrong'.",
        "Link the Jira ticket in your review so the acceptance criteria stay one click away.",
        "Review early in the day; PRs reviewed within hours merge faster and conflict less.",
        "Add every merged PR's change to your regression risk list — today's diff is next month's regression test."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "A PR review is QA's earliest and cheapest chance to catch a requirement gap.",
        "Read the criteria first, the diff second, the checks third — in that order.",
        "Evidence in the PR description is a gift to the reviewer and to future you.",
        "Never approve what you have not read; LGTM is a signature."
      ] },
      { type: "quote", text: "Interview tip: when asked how QA fits into code reviews, describe reviewing the diff against acceptance criteria and flagging coverage gaps — that answer separates you from candidates who think reviews are developers-only." }
    ]
  },
  {
    id: "github-actions-qa-gate",
    num: "083",
    title: "GitHub Actions: Build Your First QA Gate",
    dek: "Workflow, job, step, runner, trigger, secrets — learn the six words behind a QA gate, then copy a 19-line workflow that lints and runs your test pack on every pull request.",
    date: "2026-08-02",
    read: "5 min",
    category: "CI/CD & Git",
    difficulty: "intermediate",
    tags: ["github-actions", "ci", "test-automation"],
    status: "green",
    body: [
      { type: "p", text: "For two months our API test suite ran exactly when I remembered to run it, which turned out to be almost never. The repo had forty tests, the laptops had three different Node versions, and the day a checkout bug reached staging, all forty tests were green — on my machine. Building the gate took one file and an afternoon." },
      { type: "p", text: "GitHub Actions is a robot that reacts to events in your repository. Six words explain it. A workflow is a recipe file you commit under .github/workflows. A job is one section of that recipe, running on one machine. A step is a single instruction inside a job. A runner is the borrowed Linux machine that does the work. A trigger declares which event starts everything — for QA, that event is on: pull_request. Secrets are values the workflow can read but the code cannot, stored in the repo's settings." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "A gate means the checks run on every pull request, on a clean machine, before anyone can merge. Laptops lie: they hold caches, leftover databases, and env files nobody remembers creating. A runner does not. A green check on a pull request becomes a shared fact the whole team can act on, and when a run fails, the uploaded report replaces an hour of 'can you send me your logs?' messages." },
      { type: "h", text: "In practice" },
      { type: "p", text: "This is a complete, minimal QA gate. Lint runs first because it is fast, then the API pack; the report uploads as an artifact whenever something fails:" },
      { type: "code", lang: "yaml", label: ".github/workflows/qa.yml", code: `name: QA gate
on: pull_request
jobs:
  qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx eslint .
      - run: npx playwright test tests/api --reporter=list
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: qa-report
          path: playwright-report/
          retention-days: 7` },
      { type: "p", text: "Read it top to bottom. The trigger is on: pull_request, so every PR spawns a run; the job qa borrows one Ubuntu runner; each dash is a step. npm ci installs exactly what the lockfile says, which is why it beats npm install in CI. The upload-artifact step carries if: failure(), so the Playwright report — screenshots, errors, timings — attaches to the run only when something breaks, and stays downloadable for seven days. Secrets never belong in this file: store them under the repo's Settings, Secrets and variables, then read them inside a step through the secrets context; the workflow file itself stays safe to commit." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Create .github/workflows/qa.yml on a branch; the folder name is exact and lowercase.",
        "Paste the workflow above and adjust the test command to your real pack — one test is fine to start.",
        "Push the branch and open a pull request; the Checks tab appears within seconds.",
        "Break a test on purpose and watch the run go red, then read the failed step's log to find the assertion.",
        "Open the run's summary page and download the qa-report artifact to see the failure like a tester, not a stack trace.",
        "Ask your admin to make the qa check required before merging; that turns a habit into a gate."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Hard-coding passwords into the workflow file — history keeps them and forks can see them. Instead, put values in Settings, Secrets and variables and read them as secrets in steps.",
        "Triggering only on push to main — by then the damage is already merged. Instead, run on pull_request so the signal arrives before the merge.",
        "Skipping the dependency install or using npm install — the runner has no idea which versions your code needs. Instead, always npm ci from the lockfile.",
        "Letting the gate grow to an hour — teams start merging anyway and the gate quietly stops mattering. Instead, keep the PR pack fast and move long suites to a schedule.",
        "Failing runs with no artifacts — a red cross with no report is just a riddle. Instead, upload reports and screenshots on failure, every time."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Pin action versions with a tag like @v4 so a surprise release cannot break your gate.",
        "Name the workflow and job clearly; the check appears on every PR as 'QA gate / qa'.",
        "Keep one small job of lint plus fast tests as the gate; grow coverage, not wait time.",
        "Commit workflow changes through a pull request too — the gate should test its own changes.",
        "Check the Checks tab before you start manual testing; a red gate explains bugs before you hunt them."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Workflow, job, step, runner, trigger, secrets — six words cover the whole model.",
        "on: pull_request is what turns a check into a gate instead of a diary.",
        "Clean runners beat laptops: no caches, no leftovers, no 'works for me'.",
        "Artifacts on failure turn a red cross into a report you can act on."
      ] },
      { type: "quote", text: "Interview tip: asked how you would add automated tests to a pull request process, answer with a workflow triggered on pull_request, a clean runner, fast checks, and reports uploaded on failure — that is an answer from someone who has done it." }
    ]
  }
];
