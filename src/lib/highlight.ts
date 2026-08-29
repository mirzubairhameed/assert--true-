/**
 * Tiny regex-based tokenizer for the snippet library.
 * Produces spans instead of HTML strings, so nothing is ever
 * passed through dangerouslySetInnerHTML.
 */

export type Token = { text: string; cls?: string };

const KEYWORDS: Record<string, string[]> = {
  ts: [
    "import", "from", "export", "default", "const", "let", "var", "function",
    "return", "if", "else", "for", "of", "in", "while", "await", "async",
    "new", "class", "extends", "type", "interface", "as", "try", "catch",
    "finally", "throw", "typeof", "switch", "case", "break", "continue",
    "test", "expect", "describe", "beforeEach", "afterEach", "it",
  ],
  python: [
    "import", "from", "def", "return", "if", "elif", "else", "for", "while",
    "in", "not", "and", "or", "with", "as", "class", "try", "except",
    "finally", "raise", "yield", "lambda", "pass", "assert", "async",
    "await", "global", "None", "True", "False",
  ],
  yaml: ["true", "false", "null", "on", "off"],
  bash: [
    "if", "then", "else", "fi", "for", "in", "do", "done", "while", "case",
    "esac", "function", "return", "export", "local", "echo", "exit",
  ],
};

const CONSTANTS = new Set([
  "true", "false", "null", "undefined", "None", "True", "False", "this",
]);

function buildRegex(lang: string): RegExp {
  const hashComment = lang === "python" || lang === "yaml" || lang === "bash";
  const parts: string[] = [];

  if (lang === "ts" || lang === "js" || lang === "tsx") {
    parts.push("\\/\\*[\\s\\S]*?\\*\\/"); // block comment
    parts.push("//[^\\n]*"); // line comment
  }
  if (hashComment) {
    parts.push("#[^\\n]*"); // hash comment
  }
  // strings: double, single, template
  parts.push("\"(?:[^\"\\\\\\n]|\\\\.)*\"");
  parts.push("'(?:[^'\\\\\\n]|\\\\.)*'");
  parts.push("`(?:[^`\\\\]|\\\\.)*`");
  // decorators / directives
  parts.push("@[A-Za-z_][\\w.]*");
  // numbers
  parts.push("\\b\\d[\\w.]*\\b");
  // identifiers (classified after)
  parts.push("[A-Za-z_$][\\w$]*");

  return new RegExp(parts.join("|"), "g");
}

export function tokenize(code: string, lang: string): Token[] {
  const kw = new Set(KEYWORDS[lang] ?? KEYWORDS.ts);
  const re = buildRegex(lang);
  const tokens: Token[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(code)) !== null) {
    if (m.index > last) {
      tokens.push({ text: code.slice(last, m.index) });
    }
    const text = m[0];
    let cls: string | undefined;

    if (text.startsWith("/*") || text.startsWith("//") || text.startsWith("#")) {
      cls = "tk-com";
    } else if (
      (text.startsWith('"') && text.endsWith('"')) ||
      (text.startsWith("'") && text.endsWith("'")) ||
      (text.startsWith("`") && text.endsWith("`"))
    ) {
      cls = "tk-str";
    } else if (text.startsWith("@")) {
      cls = "tk-dec";
    } else if (/^\d/.test(text)) {
      cls = "tk-num";
    } else if (kw.has(text)) {
      cls = "tk-kw";
    } else if (CONSTANTS.has(text)) {
      cls = "tk-num";
    } else if (code[m.index + text.length] === "(") {
      cls = "tk-fn";
    }

    tokens.push({ text, cls });
    last = m.index + text.length;
    if (re.lastIndex === m.index) re.lastIndex++; // safety for zero-length matches
  }

  if (last < code.length) {
    tokens.push({ text: code.slice(last) });
  }
  return tokens;
}
