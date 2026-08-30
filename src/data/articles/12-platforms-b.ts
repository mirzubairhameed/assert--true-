import type { Post } from "../post-types";

export const PLATFORMS_B: Post[] = [
  {
    id: "cross-browser-testing",
    num: "091",
    title: "Cross-Browser Testing: Strategy, Tools, and Priorities",
    dek: "Chrome says it works; Safari disagrees. How to build a browser matrix from analytics, the five bugs you will meet first, and when a tool like BrowserStack earns its price.",
    date: "2026-08-14",
    read: "5 min",
    category: "Performance & Security",
    difficulty: "beginner",
    tags: ["cross-browser", "safari", "browserstack", "playwright"],
    status: "green",
    body: [
      { type: "p", text: "My first week of testing, I signed off a pricing page after checking it in Chrome — my Chrome, my laptop, my screen. Three days later a customer on Safari sent a screenshot: the pricing grid had collapsed into one skinny column and the sticky header floated mid-page. The bug had existed for weeks; nobody had ever looked." },
      { type: "p", text: "Cross-browser testing means verifying the product behaves in the browsers your users actually use. Browsers are not interchangeable: Chrome and Edge run on Blink, Safari on WebKit, Firefox on Gecko, and small engine differences turn into visible bugs. Most browsers are evergreen now — they update themselves silently — so the version gaps have narrowed, but the engine gaps never left." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Analytics, not habit, decides how much each browser matters: if 4 percent of your traffic is Safari, that is 4 percent of customers who can hit a WebKit-only bug. Safari deserves special suspicion — date inputs render differently, position: sticky misbehaves in some versions — and on iOS every browser is WebKit underneath, no matter which app icon it wears. And while Internet Explorer is dead, corporate intranets keep zombie copies alive through Edge's IE mode, so 'we do not support IE' needs an actual decision behind it, not a shrug." },
      { type: "h", text: "In practice" },
      { type: "p", text: "These are the five cross-browser bugs a beginner meets first, and where they hide:" },
      { type: "ul", items: [
        "CSS grid gap collapses on older Safari — a layout built with grid and gap stacks into a single column where support is missing. Check any grid-based page in Safari before sign-off.",
        "Date input format — the browser and locale decide whether a date field shows day-month-year or month-day-year, and Safari's picker looks nothing like Chrome's. Never assert on the rendered format; test the value the form submits.",
        "Font fallback — when the custom font fails to load, the fallback font is wider, buttons wrap, and layouts shift. Hard-refresh with the cache disabled to see what first-time visitors see.",
        "Autoplay policy — Chrome and Safari block videos that would play with sound, so a hero video set to autoplay simply never starts. Verify that playback controls exist and that pressing play works.",
        "backdrop-filter — the frosted-glass effect behind modals is unsupported or patchy in some versions, leaving a solid or invisible overlay. Open a modal in Safari and Firefox and look at what sits behind it."
      ] },
      { type: "h", text: "Step by step" },
      { type: "ul", items: [
        "Pull the top five browsers and versions from real analytics; that list is your matrix, ranked by traffic.",
        "Smoke the critical path (login, search, checkout) in your main browser first to confirm the build is testable at all.",
        "Repeat the same path in Safari and Firefox, watching layout, dates, and media.",
        "Add one mobile check: a real phone or an emulator, iOS and Android if you can, because mobile webviews are browsers too.",
        "Note every difference, then triage with the team: genuine bug, acceptable engine difference, or by design.",
        "When the matrix outgrows your desk — older versions, Safari on Windows, many operating systems — add BrowserStack for breadth or a Playwright matrix (Chromium, Firefox, WebKit) for repeatable automated coverage."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Testing only Chrome — your users did not agree to use your browser. Instead, let analytics pick the matrix and revisit it every quarter.",
        "Treating every pixel difference as a bug — fonts antialias differently and scrollbars vary by platform. Instead, agree with the team what 'same behavior' means and file only real defects.",
        "Ignoring mobile webviews — an in-app browser on iOS is WebKit with quirks of its own, not your desktop Chrome. Instead, include one webview check per release.",
        "Forgetting evergreen updates — an overnight browser update can break a layout that passed yesterday. Instead, rerun the matrix on major browser releases.",
        "Skipping the oldest supported browser named in the requirements — if the spec says Safari 14, 'it works in Safari 17' is not an answer. Instead, test the floor the spec promises."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Keep a one-page browser support matrix in the test plan with traffic percentages next to each browser.",
        "Automate the smoke path with Playwright across its three engines once manual passes get repetitive.",
        "Screenshot-compare the key pages across browsers; visual drift shows up before anyone reports it.",
        "When a bug is engine-specific, name the browser and version in the ticket: 'Safari 16, position: sticky' gets fixed faster than 'layout broken'."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Analytics decides the matrix; habit does not.",
        "Safari and mobile webviews are where Chrome-tested layouts go to die.",
        "Evergreen does not mean identical — engines still differ.",
        "Start manual and small; add BrowserStack or a Playwright matrix when the combinations multiply."
      ] },
      { type: "quote", text: "Interview tip: 'I build the browser matrix from analytics, smoke the top three manually, and automate the rest' — that sentence shows strategy, not tool worship." }
    ]
  },
  {
    id: "mobile-testing-basics",
    num: "092",
    title: "Mobile Testing: Real Devices, Emulators, and What to Check",
    dek: "A payment passed on desktop and hung when a real phone rang mid-checkout. Emulators versus real devices, how to pick a device matrix, and a ten-check mobile smoke.",
    date: "2026-08-15",
    read: "4 min",
    category: "Performance & Security",
    difficulty: "beginner",
    tags: ["mobile-testing", "android", "ios", "device-matrix"],
    status: "green",
    body: [
      { type: "p", text: "The payment screen had passed every desktop test, twice. Then a tester called the app mid-payment on a real phone: the incoming-call banner slid over the Confirm button, the tap landed wrong, and the transaction hung in limbo. Desktop never shows you that. Mobile testing exists for everything a desk-bound browser cannot do to your product." },
      { type: "p", text: "You have three ways to run mobile tests. An emulator (Android) is software that imitates the device's hardware and operating system; a simulator (iOS) imitates the operating system's behavior without real hardware. Both are fast and cheap, and they catch logic and layout bugs. A real device catches what only hardware can produce: real radio networks, interrupts like calls and low battery, the camera, GPS, and GPU rendering quirks. A serious mobile pass uses both." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "For most products the phone is the front door, and the device matrix has to reflect reality. Pull the top devices and OS versions from analytics or the app's own telemetry: if half your users are on mid-range Samsung Galaxy A models, that matters more than the newest flagship. Cover the top devices, add one small screen and one old OS version at the edge of support, and accept that you cannot own them all — cloud device farms exist for exactly that reason." },
      { type: "h", text: "In practice" },
      { type: "p", text: "This is a ten-item mobile smoke that catches the bugs desktop never shows. Run it on at least one real device every release:" },
      { type: "ul", items: [
        "Cold start — install fresh and launch; the app should reach a usable screen without a long blank hang.",
        "Smallest screen — run the core flow on the smallest supported display; buttons must stay tappable, not truncated.",
        "Interrupt mid-flow — place a call or send a notification during checkout; the app must resume with the cart intact.",
        "Permission popups — deny the camera or location on first ask; the app must explain itself, not crash or nag in a loop.",
        "Push notification — tap a notification and confirm it deep-links to the right screen for the right logged-in user.",
        "Network switch — start a download on wifi, then move to 5G mid-transfer; the loading state should recover, not stall forever.",
        "Offline behavior — switch on airplane mode and load a screen; expect a clear message and a retry that works once the network returns.",
        "Rotation — rotate portrait to landscape mid-form; typed text must survive and the layout must reflow.",
        "Notch and safe areas — on a notched device, check that no content hides under the notch or the home indicator.",
        "Background and resume — background the app for ten minutes, then return; the session should still be valid, or the re-login should be graceful."
      ] },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Trusting the emulator alone — it has a perfect network, a full battery, and no incoming calls; the nastiest bugs live on hardware. Instead, put every release on at least one real device.",
        "Testing only your own phone — your flagship is not your audience. Instead, borrow or rent the top device from the analytics list.",
        "Ignoring OS versions — Android fragmentation means the oldest supported version behaves differently. Instead, run the smoke once on the oldest OS you claim to support.",
        "Forgetting the on-screen keyboard — it covers half the screen and the field you are typing into. Instead, watch focus and scrolling in every form.",
        "Skipping the upgrade path — users update over the old version; they do not reinstall. Instead, install the previous release, upgrade over it, and check that saved data survives."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Build the matrix from device analytics: top phones, one small screen, one old OS.",
        "Keep one cheap, slow Android in the rotation; low-end hardware exposes performance problems that office wifi hides.",
        "Use cloud device farms (BrowserStack, Firebase Test Lab) for breadth you cannot keep in a drawer.",
        "Put OS version, model, and app build number in every mobile bug report — 'iPhone, it crashed' is not reproducible."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Emulators find logic bugs; real devices find life bugs: interrupts, networks, batteries.",
        "The matrix comes from analytics — top devices, small screen, old OS.",
        "The ten-item smoke catches what desktop testing never will.",
        "Interrupt the app on purpose; users certainly will."
      ] },
      { type: "quote", text: "Interview tip: 'real devices for interrupts and networks, emulators for speed, analytics for the matrix' — three clauses that tell an interviewer you have done mobile." }
    ]
  },
  {
    id: "accessibility-testing-basics",
    num: "093",
    title: "Accessibility Testing: The Basics Every QA Should Know",
    dek: "About one user in seven needs accessibility testing to use your product at all. An eight-check zero-tool pass, the 4.5:1 contrast rule, and where axe and Lighthouse fit.",
    date: "2026-08-17",
    read: "5 min",
    category: "Performance & Security",
    difficulty: "beginner",
    tags: ["accessibility", "a11y", "wcag", "keyboard-navigation"],
    status: "green",
    body: [
      { type: "p", text: "Roughly one person in seven lives with a disability that affects how they use the web — about 10 to 15 percent of your users before you count a broken wrist or a lost pair of glasses. Accessibility testing checks that the product works for them. Most of the first pass requires no tools at all: just a keyboard, your eyes, and a little patience." },
      { type: "p", text: "Accessibility (shortened to a11y — the letter a, eleven letters, the letter y) means a product is usable by people who navigate by keyboard, read with a screen reader, see low contrast poorly, or cannot use a mouse at all. The rules live in the Web Content Accessibility Guidelines (WCAG), the standard behind most accessibility laws. It works like a curb cut on a sidewalk: built for wheelchairs, used daily by parents with strollers and travelers with suitcases. Captions, contrast, and keyboard support improve the product for everyone." },
      { type: "h", text: "Why it matters" },
      { type: "p", text: "Three reasons, in the order a manager cares: real users (10 to 15 percent is a market, not an edge case), legal risk (accessibility demand letters and lawsuits are routine in e-commerce and government, and the European Accessibility Act tightens the rules further), and plain UX — high contrast helps every commuter in sunlight, and visible focus helps every power user. Skipping accessibility is how a product loses customers who were already trying to pay." },
      { type: "h", text: "In practice" },
      { type: "p", text: "This eight-item pass uses nothing but a browser. Run it on the most common screens — signup, checkout, search:" },
      { type: "ul", items: [
        "Keyboard-only pass — put the mouse away and Tab through the whole form: every field, link, and button must be reachable, in an order that matches the visual layout, and operable with Enter and Space.",
        "Visible focus — while tabbing, you must always see which element has focus. If a style sheet removed the focus outline and nothing replaced it, keyboard users are navigating blind; that is a bug.",
        "Labels on inputs — every input needs a visible label tied to it, so clicking the label focuses the field. Hint text inside the field disappears the moment you start typing and is not a label.",
        "Alt text — meaningful images need alt text that describes their purpose; decorative images should have empty alt so screen readers skip them. Alt text like 'image' or 'photo' fails both ways.",
        "Contrast — grey-on-white text is the classic failure; the rule of thumb is 4.5:1 for normal text and 3:1 for large text. If you squint and the text vanishes, it fails.",
        "Heading order — headings should step down without skipping levels, h1 to h2 to h3, because screen reader users navigate a page by jumping between headings.",
        "Form errors announced — submit an empty form: errors must appear as text next to the fields, and focus should move to them. A red border alone tells a screen reader user nothing.",
        "Zoom — set the browser zoom to 200 percent; content must reflow without clipping, and nothing should force sideways scrolling."
      ] },
      { type: "p", text: "When the manual pass is done, two free tools pick up the rest: the axe DevTools browser extension flags violations on the open page with fix hints, and Lighthouse, built into Chrome DevTools, scores accessibility and lists quick wins. Treat both as assistants, not judges — automated tools catch a minority of real issues and none of the judgment calls." },
      { type: "h", text: "Common mistakes" },
      { type: "ul", items: [
        "Running only the scanner — automated tools catch roughly a third of issues and cannot judge whether alt text is meaningful. Instead, keep the keyboard pass as the backbone of every release.",
        "Conveying errors with color alone — a red border is invisible to colorblind users. Instead, pair color with text, an icon, or both.",
        "Testing with the mouse still plugged in — hands default to habits. Instead, physically move the mouse away before the pass.",
        "Leaving keyboard traps — a modal that keeps focus forever, or a widget you can tab into but never out of, strands keyboard users. Instead, test open, tab around, and close on every dialog.",
        "Treating accessibility as a final sprint — bolted-on accessibility is expensive and always late. Instead, add the eight-item pass to your definition of done for UI stories."
      ] },
      { type: "h", text: "Best practices" },
      { type: "ul", items: [
        "Reference WCAG numbers in bug reports — '1.4.3 Contrast (Minimum)' tells the developer exactly which rule failed.",
        "Try a screen reader once per release (VoiceOver on macOS, Narrator on Windows); slow, humbling, and irreplaceable.",
        "Check disabled states and grey hint text too — low-contrast grey hides information from low-vision users.",
        "Keep a saved checklist per widget type (form, modal, table) so the pass takes minutes, not hours."
      ] },
      { type: "h", text: "Key takeaways" },
      { type: "ul", items: [
        "Accessibility serves 10 to 15 percent of users and, increasingly, the law.",
        "Keyboard, focus, labels, alt, contrast, headings, errors, zoom — eight checks, zero tools.",
        "Automated tools find a third of the problems; a thoughtful human finds the rest.",
        "The curb-cut effect is real: accessible design improves the product for everyone."
      ] },
      { type: "quote", text: "Interview tip: 'I start with keyboard-only navigation and a contrast check, then run axe' — it shows you test accessibility by hand first, not by plugin alone." }
    ]
  }
];
