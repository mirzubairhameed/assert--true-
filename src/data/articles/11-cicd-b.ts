import type { Post } from "../post-types";

export const CICD_B: Post[] = [
  {
    id: "jenkins-for-testers",
    num: "084",
    title: "Jenkins for Testers: Jobs, Pipelines, and Nightly Runs",
    dek: "Many companies run their tests on Jenkins, not GitHub — learn freestyle jobs versus Jenkinsfile pipelines, what nightly runs and parameters are for, and where the reports land.",
    date: "2026-08-03",
    read: "5 min",
    category: "CI/CD & Git",
    difficulty: "intermediate",
    tags: ["jenkins", "ci", "nightly-tests"],
    status: "green",
    body: [
      { type: "p", text: "Who runs your regression suite at 2 a.m. while everyone sleeps? At a large share of companies the answer is Jenkins: a self-hosted automation server that has been quietly executing build jobs since long before cloud CI existed — and that will run yours tonight, too." },
      { type: "p", text: "Jenkins is your company's own pipeline machine: the same ideas as GitHub Actions, installed on servers the company controls. Teams pick it when code cannot leave the building, when dozens of legacy jobs already live there, or when they need schedules and parameters that cloud services charge for. A job is one configured task; a build is one execution of it; a parameterized build is a job that asks questions first — which browser, which environment, which suite — and runs your choices." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Walk into an enterprise QA role and the nightly regression, the release smoke, and the cross-browser pack are probably Jenkins jobs with names like shop-regression-nightly. If you cannot trigger one, read its console log, and find its report, you depend on other people for your own evidence. Jenkins also runs what cloud CI cannot see: internal staging behind a VPN, databases with production-shaped data, and the 4 a.m. run that decides whether your day starts with testing or with triage." },
      { type: "h", text: "In practice" },
      { type: "p", text: "A job can be defined two ways. A freestyle job is built by clicking through forms in the Jenkins UI — quick once, invisible later, because the real configuration lives in screenshots and someone's memory. A pipeline job reads a Jenkinsfile: the whole recipe as code, committed to the repo, reviewable like any other file. Teams that survived a Jenkins server migration always choose the Jenkinsfile. Here is a tiny declarative one:" },
      { type: "code", lang: "bash", label: "Jenkinsfile", code: `pipeline {
  agent any
  triggers { cron('0 1 * * *') }
  parameters {
    string(name: 'BROWSER', defaultValue: 'chromium', description: 'Playwright project to run')
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install')  { steps { sh 'npm ci' } }
    stage('Test')     { steps { sh 'npx playwright test --project=' + params.BROWSER } }
  }
  post {
    always {
      junit 'results/junit.xml'
      publishHTML(target: [reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'QA Report'])
    }
  }
}` },
      { type: "p", text: "The stages run in order: pull the code, install dependencies, run the tests for the browser this build was parameterized with. The post block is the part QA cares most about: always means it runs whether the tests passed or failed, junit collects the XML results into Jenkins' trend charts, and publishHTML serves the full report as a clickable page next to the build. The suite's config writes both files on every run. The cron trigger, '0 1 * * *', is the nightly: 1 a.m., every day." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Get the Jenkins URL and an account on day one, and ask which job runs the regression suite.",
        "Open the job and read its parameters before triggering; BROWSER and ENV are dropdowns for a reason.",
        "Click Build with Parameters, choose your environment, and watch the Stage View fill in as stages complete.",
        "On a red build, open the failed stage's console log first — the actual error is usually in the last thirty lines.",
        "Find the JUnit trend and the HTML report link on the build page; screenshots of UI failures live there.",
        "Ask where the Jenkinsfile lives. If the answer is 'nowhere, it is UI config', suggest moving it into the repo."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Rebuilding the whole nightly for one suspected flake — a two-hour suite rerun for a thirty-second test hogs the shared server. Instead, use the parameters to run the single project or test first.",
        "Leaving job configuration only in the UI — one server rebuild and the team's knowledge evaporates. Instead, keep the Jenkinsfile in the repo and change it through pull requests.",
        "Archiving no reports — a red Jenkins build with only a console log sends QA back to reproduce everything by hand. Instead, publish JUnit and HTML reports on every run, pass or fail.",
        "Treating the nightly as unattended truth — a suite that sits red for a week with no owner teaches everyone to ignore red. Instead, put nightly-failure triage on a rotation.",
        "Assuming Jenkins behaves like your local setup — plugin versions, agents, and environment variables all differ. Instead, run your pack once on the actual Jenkins agent before trusting it."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep nightly and pull-request builds separate: the PR gate stays fast, the nightly goes deep.",
        "Parameterize by environment and browser; never bury hard-coded URLs in test code.",
        "Label stages in plain words — Checkout, Install, Test, Publish reports — so the Stage View reads like a checklist.",
        "Keep a documented list of each job's parameters and what a red at each stage usually means.",
        "Clean up old builds periodically; a Jenkins server at 100 percent disk stops running your tests without asking."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Jenkins is self-hosted CI: the same pipeline ideas, inside your company's walls.",
        "Freestyle is click-ops; a Jenkinsfile pipeline lives in the repo and survives server migrations.",
        "Nightly runs and parameterized builds are QA's workhorses — learn to trigger and read both.",
        "Reports published on every run turn Jenkins from a status dot into evidence."
      ] },
      { type: "quote", text: "A nightly suite that sits red for a week and nobody looks at is not a regression suite anymore; it is a night light." }
    ]
  },
  {
    id: "docker-for-testers",
    num: "085",
    title: "Docker Basics for Testers: Images, Containers, Logs",
    dek: "Image is the recipe, container is the running dish — start a whole staging stack with one command, read the logs the UI hides, and test the exact versions production runs.",
    date: "2026-08-05",
    read: "5 min",
    category: "CI/CD & Git",
    difficulty: "intermediate",
    tags: ["docker", "containers", "test-environment"],
    status: "green",
    body: [
      { type: "p", text: "The signup bug reproduced on exactly one laptop: mine. The developer's machine passed, staging passed, and the ticket bounced twice before someone asked which Postgres I was running — version 13, while staging had moved to 15, and a JSONB query behaved differently between them. Two hours of confusion that a two-line compose file would have prevented." },
      { type: "p", text: "Docker packs software so it runs identically everywhere. An image is the recipe: a frozen, versioned snapshot of an application plus everything it needs. A container is one running instance cooked from that recipe — start three containers from the same image and you get three identical, isolated copies. A compose file is the table setting: one YAML file that starts the whole stack — database, backend, frontend — together, with the right versions and ports." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "QA's oldest enemy is the environment you cannot reproduce. With Docker, staging stops being a mystery server and becomes a file in the repo: docker compose up -d starts Postgres 15.4, the API, and the frontend on your machine exactly as they run in production. Bugs stop being 'my machine' versus 'your machine' and become reproducible on demand. The same trick powers automation: your test suite can start a disposable database, run against it, and throw it away." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Five uses cover most of a tester's week:" },
      { type: "ul", items: [
        "One-command environment — a project's twenty-step README collapses into docker compose up -d; spend the saved hour testing.",
        "Version fidelity — run postgres:15.4 because production runs 15.4, not because your laptop happens to hold version 13.",
        "A clean slate between sessions — compose down -v wipes the data, compose up -d rebuilds it; no more testing against three-day-old carts.",
        "Log archaeology — when the UI says 'something went wrong', the container log says the actual error.",
        "Isolation for automation — point your API tests at a container started inside the CI job, then let CI delete it after the run."
      ] },
      { type: "p", text: "The everyday commands, in the order you will type them:" },
      { type: "code", lang: "bash", label: "terminal/compose-session.sh", code: `# Start the whole staging stack in the background
docker compose up -d

# See what is running: names, images, ports, uptime
docker ps

# Follow the app's logs while you test - Ctrl+C stops following
docker logs -f shop-app

# Step inside the database container and run a query by hand
docker exec -it shop-db psql -U qa -d shop

# Stop everything and erase the data for a truly fresh session
docker compose down -v` },
      { type: "p", text: "compose up -d starts every service in the compose file detached, with -d meaning the terminal stays yours. docker ps is the 'who is running' list; if something crashed it will not appear, and docker ps -a shows even stopped containers with their exit codes. docker logs -f streams a container's output like a server console — most 'the app is broken' moments end here with a stack trace. docker exec -it opens a shell inside the running container, which is how you poke the database directly. down -v stops the stack and removes the volumes, the saved data, so the next up starts from nothing." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Install Docker Desktop, then ask the team for the compose file — most repos keep it at the root as docker-compose.yml.",
        "Run docker compose up -d from the repo folder and wait for the pulling messages to stop.",
        "Check docker ps until every service shows Up, then open the frontend port it printed, usually 3000.",
        "Test against this stack instead of shared staging whenever you need a controlled state.",
        "When the frontend fails, run docker logs on the API container before you file the ticket.",
        "Finish sessions with docker compose down -v so tomorrow starts clean."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Confusing image and container — deleting the image does not stop the running container, and edits made inside a container survive only until it is recreated. Instead, treat containers as disposable and images as the source of truth.",
        "Using the latest tag everywhere — 'latest' is a moving target, and your March environment is not March's latest today. Instead, pin versions in the compose file the way production does.",
        "Testing against week-old volumes — leftover data quietly turns a 'clean environment' into a haunted one. Instead, run down -v before any session that needs known state.",
        "Diagnosing from the UI alone — the frontend hides the backend's real error behind a friendly toast. Instead, make docker logs your first stop.",
        "Hand-editing files inside a running container to 'fix' it — those edits vanish on the next recreate and the bug returns. Instead, change the compose file or the image and recreate."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep the compose file in the repo, versioned and reviewed, like any other test asset.",
        "Pin image versions — postgres:15.4, redis:7.2 — to match the environments you are testing.",
        "Learn four commands well: up -d, ps, logs -f, exec -it; they cover most debugging sessions.",
        "Name containers clearly in the compose file so log commands stay typeable from memory.",
        "Rebuild from scratch — down -v, then up -d — weekly to prove the environment still comes up clean."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Image is the recipe; container is a running dish; compose starts the whole table at once.",
        "Reproducible environments kill the 'works on my machine' class of bugs.",
        "Logs and exec put you inside the system the UI only hints at.",
        "Pinned versions make your laptop match staging, and staging match production."
      ] },
      { type: "quote", text: "Interview tip: 'explain image versus container' is a classic — answer that the image is the immutable recipe and the container is a running instance of it, then mention compose for multi-service stacks." }
    ]
  },
  {
    id: "flaky-tests-in-ci",
    num: "086",
    title: "Flaky Tests in CI: Find Them, Fix Them, Trust Again",
    dek: "Same code, different result — count your flake rate, quarantine with a ticket, fix root causes like sleeps and shared data, and never hide a flaky test behind a blind retry.",
    date: "2026-08-07",
    read: "5 min",
    category: "CI/CD & Git",
    difficulty: "advanced",
    tags: ["flaky-tests", "ci", "test-stability"],
    status: "green",
    body: [
      { type: "p", text: "43 of the last 100 builds failed. Bugs found by those failures: three. The other forty were flaky tests — same code, same tests, different outcome on each run — and the team had started merging through red builds out of habit. The suite still ran every night. Nobody believed it anymore." },
      { type: "p", text: "A flaky test is one that can pass and fail on identical code. It is the smoke detector that goes off every time you make toast: technically reacting to something real, useless as an alarm. Flakiness is a property of the test and its environment, not of the product — which is exactly why it can, and must, be fixed." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "The cost is trust, and trust is the whole product. When red builds mean 'maybe a bug, probably toast', developers stop waiting, reviewers stop blocking, and the one real failure that matters sails through a red pipeline and ships. A team with a 10 percent flake rate does not have a small annoyance; it has quietly switched off its early-warning system. Restoring that trust is a maintenance discipline, not a personality trait." },
      { type: "h", text: "In practice" },
      { type: "p", text: "Almost every flake traces back to one of five causes. Learn the one-line fix for each:" },
      { type: "ul", items: [
        "Timing and sleeps — the test waits three seconds and races the app. Fix: wait for the condition itself (element visible, response received), never for a fixed number of seconds.",
        "Shared test data — two runs mutate the same user@example.com record and one loses. Fix: create unique data per run, prefixing emails with a run id.",
        "Order dependence — test 12 passes only because test 11 ran first. Fix: give every test its own setup, and run the suite in random order to prove it.",
        "Environment drift — staging's data, version, or seed changed underneath the tests. Fix: pin the environment with versioned containers, a seed script, and a freshness check.",
        "Third-party flakiness — a real external API times out one run in ten. Fix: stub it at the boundary; if the external call is itself the feature under test, set a sane timeout and expect it consciously."
      ] },
      { type: "p", text: "When a test flakes anyway, follow the protocol instead of the reflex. Quarantine it: mark or move it so it no longer blocks the gate, because an untrusted failure is worse than no signal. Open a ticket in the same hour — a quarantined test without a ticket is a test you deleted with extra steps. Track the flake rate: flaky failures divided by total runs, reviewed weekly; it turns 'CI feels flaky' into 'checkout.spec.ts fails 12 percent of runs and it is ours to fix'. Then fix the root cause using the list above, prove the fix by rerunning the test twenty times, and bring it back into the gate. What you never do is bolt on a blind retry to keep production pipelines green: a retry that masks the flake also masks the real bug that arrives the same week." },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "When a build fails, rerun only the failed tests once; a second failure means treat it as a real bug first.",
        "Confirm the flake: run the suspect test in a loop twenty times locally and record the pass rate.",
        "Sort the cause into the five buckets; sleeps and shared data cover most cases.",
        "Quarantine and ticket it the same hour, with the pass rate and the failure evidence attached.",
        "Fix the root cause, not the symptom — replace the sleep with a wait-for-condition, replace shared data with generated data.",
        "Return the test to the gate and watch the weekly flake rate drop; report the number, not the feeling."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Hitting retry until green and moving on — the suite learns to lie to you politely. Instead, log every retry that was needed and treat repeats as a flake report.",
        "Deleting the flaky test silently — the coverage disappears and the next regression has no witness. Instead, quarantine with a ticket so deletion becomes a decision, not an accident.",
        "Fixing flakes with longer sleeps — you converted a race into a slower race. Instead, wait for conditions and cut fixed waits on sight.",
        "Letting quarantine become a graveyard — six months later the folder holds forty tests nobody remembers. Instead, put a two-week clock on every quarantine: fixed or deleted.",
        "Blaming the CI infrastructure first — 'the runner was weird' is occasionally true and usually unmeasured. Instead, bring the flake-rate number to the conversation."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Publish the flake rate weekly per suite; a number beats a mood in every planning meeting.",
        "Make failures rich — screenshot, trace, network log — so triage takes minutes instead of a reproduction project.",
        "Run new tests twenty times before they join the gate; do not admit flakes through the front door.",
        "Rotate flake triage like on-call duty, so ownership is a habit rather than a favor.",
        "Celebrate the fix, not the retry; the team copies whatever gets praised."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Flaky means same code, different outcome — a test bug, not a product bug.",
        "The cost is trust: ignored red hides real red.",
        "Five causes, five one-line fixes; most flakes are sleeps or shared data.",
        "Quarantine, ticket, measure, fix — and never a blind retry in a production pipeline."
      ] },
      { type: "quote", text: "Interview tip: asked about flaky tests, give the numbers answer — quarantine, ticket, flake-rate metric, root-cause fix — and say plainly that blind retries only teach the pipeline to lie." }
    ]
  }
];
