import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Runs before first paint: restores the saved theme so there is no flash
// of the wrong color scheme. Kept tiny and dependency-free.
const themeInitScript = `(function(){try{var t=localStorage.getItem("asserttrue-theme");if(t!=="dark"&&t!=="light"&&t!=="cyber"){t="dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export const metadata: Metadata = {
  title: "assert(true) — Notes from a QA Engineer's Desk",
  description:
    "A software quality assurance blog about test strategy, flaky tests, CI gates, contract testing and the craft of breaking software on purpose — before users do it for free.",
  keywords: [
    "software quality assurance",
    "QA",
    "testing",
    "test automation",
    "flaky tests",
    "CI/CD",
    "playwright",
    "pytest",
    "contract testing",
    "software quality blog",
  ],
  authors: [{ name: "assert(true)" }],
  openGraph: {
    title: "assert(true) — Notes from a QA Engineer's Desk",
    description:
      "Field notes on test strategy, flaky tests, CI gates, and the craft of breaking software on purpose.",
    type: "website",
    siteName: "assert(true)",
  },
  twitter: {
    card: "summary_large_image",
    title: "assert(true) — Notes from a QA Engineer's Desk",
    description:
      "Field notes on test strategy, flaky tests, CI gates, and the craft of breaking software on purpose.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
