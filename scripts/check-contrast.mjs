#!/usr/bin/env node
/**
 * WCAG contrast gate for alt-ui semantic color tokens.
 *
 * Resolves the token graph (tokens/colors.css + theme/*.css) for every
 * shipped theme and checks that each foreground/background pair used by
 * user-facing text or UI meets WCAG 2.1 AA:
 *
 *   - 4.5:1 for normal text
 *   - 3:1   for large text and UI components
 *
 * The list below is intentionally explicit: it mirrors the pairs used by
 * AltButton variants and the functional status colors. Adding a new
 * semantic pair to a component should come with a line here.
 *
 * Usage:
 *   node scripts/check-contrast.mjs
 *
 * Exit code is 1 when any pair falls below its required ratio, so the
 * script can be wired into CI / prepublish as a gate.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const stylesDir = resolve(repoRoot, "src/styles");

/** Minimum ratio for normal text. */
const AA_NORMAL = 4.5;
/** Minimum ratio for large text and UI component boundaries. */
const AA_LARGE = 3;

/**
 * Foreground/background pairs that must hold in every theme.
 * [label, fgToken, bgToken, minRatio]
 */
const PAIRS = [
  // Body text on content surfaces
  ["text-1 on surface-1", "--alt-c-text-1", "--alt-c-surface-1", AA_NORMAL],
  ["text-2 on surface-1", "--alt-c-text-2", "--alt-c-surface-1", AA_NORMAL],
  ["text-3 on surface-1", "--alt-c-text-3", "--alt-c-surface-1", AA_NORMAL],
  ["text-2 on surface-2", "--alt-c-text-2", "--alt-c-surface-2", AA_NORMAL],
  ["text-3 on surface-2", "--alt-c-text-3", "--alt-c-surface-2", AA_NORMAL],

  // Outline button labels on surface-1
  ["primary outline label", "--alt-c-brand-1-600", "--alt-c-surface-1", AA_NORMAL],
  [
    "secondary-brand outline label",
    "--alt-c-brand-2-700",
    "--alt-c-surface-1",
    AA_NORMAL,
  ],
  ["accent outline label", "--alt-c-brand-3-600", "--alt-c-surface-1", AA_NORMAL],

  // Functional status text on surface-1
  ["success text", "--alt-c-success", "--alt-c-surface-1", AA_NORMAL],
  ["warning text", "--alt-c-warning", "--alt-c-surface-1", AA_NORMAL],
  ["danger text", "--alt-c-danger", "--alt-c-surface-1", AA_NORMAL],
  ["info text", "--alt-c-info", "--alt-c-surface-1", AA_NORMAL],
  ["attention text", "--alt-c-attention", "--alt-c-surface-1", AA_NORMAL],

  // White labels on solid (filled) button backgrounds
  ["white on primary solid", "--alt-c-white", "--alt-c-brand-1-solid", AA_NORMAL],
  [
    "white on primary solid hover",
    "--alt-c-white",
    "--alt-c-brand-1-solid-hover",
    AA_NORMAL,
  ],
  [
    "white on primary solid active",
    "--alt-c-white",
    "--alt-c-brand-1-solid-active",
    AA_NORMAL,
  ],
  [
    "white on secondary-brand solid",
    "--alt-c-white",
    "--alt-c-brand-2-solid",
    AA_NORMAL,
  ],
  [
    "white on secondary-brand solid hover",
    "--alt-c-white",
    "--alt-c-brand-2-solid-hover",
    AA_NORMAL,
  ],
  [
    "white on secondary-brand solid active",
    "--alt-c-white",
    "--alt-c-brand-2-solid-active",
    AA_NORMAL,
  ],
  ["white on accent solid", "--alt-c-white", "--alt-c-brand-3-solid", AA_NORMAL],
  [
    "white on accent solid hover",
    "--alt-c-white",
    "--alt-c-brand-3-solid-hover",
    AA_NORMAL,
  ],
  [
    "white on accent solid active",
    "--alt-c-white",
    "--alt-c-brand-3-solid-active",
    AA_NORMAL,
  ],
  ["white on success solid", "--alt-c-white", "--alt-c-success-solid", AA_NORMAL],
  ["white on warning solid", "--alt-c-white", "--alt-c-warning-solid", AA_NORMAL],
  ["white on danger solid", "--alt-c-white", "--alt-c-danger-solid", AA_NORMAL],
  ["white on info solid", "--alt-c-white", "--alt-c-info-solid", AA_NORMAL],
  [
    "white on attention solid",
    "--alt-c-white",
    "--alt-c-attention-solid",
    AA_NORMAL,
  ],
];

/**
 * AltButton must keep wiring its variants to the AA-safe tokens.
 * Without this, the token gate could stay green while the component
 * silently falls back to a low-contrast primitive shade.
 */
const COMPONENT_WIRING = [
  {
    file: "src/components/base/AltButton.vue",
    mustContain: [
      "var(--alt-c-brand-1-solid)",
      "var(--alt-c-brand-2-solid)",
      "var(--alt-c-brand-2-700)",
      "var(--alt-c-brand-3-solid)",
    ],
  },
];

function read(relativePath) {
  return readFileSync(resolve(stylesDir, relativePath), "utf8");
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Extract `--token: value;` declarations into a Map. Last one wins. */
function parseDeclarations(css) {
  const declarations = new Map();
  const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;
  while ((match = re.exec(stripComments(css)))) {
    declarations.set(match[1], match[2].trim());
  }
  return declarations;
}

function merge(...maps) {
  const merged = new Map();
  for (const map of maps) {
    for (const [key, value] of map) {
      merged.set(key, value);
    }
  }
  return merged;
}

function hexToRgb(hex) {
  let value = hex.replace("#", "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fgHex, bgHex) {
  const fg = relativeLuminance(fgHex);
  const bg = relativeLuminance(bgHex);
  const [lighter, darker] = fg > bg ? [fg, bg] : [bg, fg];
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Resolve a token to a hex color by following `var(--x)` chains.
 * Returns null for values the gate cannot reason about (color-mix, rgba).
 */
function resolveToken(name, declarations, seen = new Set()) {
  const raw = declarations.get(name);
  if (!raw) {
    return null;
  }
  if (seen.has(name)) {
    return null;
  }
  seen.add(name);

  const varMatch = raw.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/i);
  if (varMatch) {
    return resolveToken(varMatch[1], declarations, seen);
  }

  const hexMatch = raw.match(/#[0-9a-f]{3,8}\b/i);
  return hexMatch ? hexMatch[0] : null;
}

function buildTheme(themeFile) {
  return merge(parseDeclarations(read("tokens/colors.css")), parseDeclarations(read(themeFile)));
}

const themes = {
  light: buildTheme("theme/light.css"),
  dark: buildTheme("theme/dark.css"),
  contrast: buildTheme("theme/contrast.css"),
};

let failures = 0;

function line(text) {
  process.stdout.write(`${text}\n`);
}

for (const [themeName, declarations] of Object.entries(themes)) {
  line(`\n${themeName.toUpperCase()}`);
  line("-".repeat(74));
  line(
    `${"pair".padEnd(34)}${"fg".padEnd(10)}${"bg".padEnd(10)}${"ratio".padEnd(8)}result`,
  );

  for (const [label, fgToken, bgToken, min] of PAIRS) {
    const fg = resolveToken(fgToken, declarations);
    const bg = resolveToken(bgToken, declarations);

    if (!fg || !bg) {
      failures += 1;
      line(
        `${label.padEnd(34)}${(fg ?? "?").padEnd(10)}${(bg ?? "?").padEnd(10)}${"—".padEnd(8)}MISSING TOKEN`,
      );
      continue;
    }

    const ratio = contrastRatio(fg, bg);
    const pass = ratio >= min;
    if (!pass) {
      failures += 1;
    }
    line(
      `${label.padEnd(34)}${fg.padEnd(10)}${bg.padEnd(10)}${ratio.toFixed(2).padEnd(8)}${
        pass ? "PASS" : `FAIL (min ${min})`
      }`,
    );
  }
}

line("\nCOMPONENT WIRING");
line("-".repeat(74));
for (const check of COMPONENT_WIRING) {
  const source = readFileSync(resolve(repoRoot, check.file), "utf8");
  const missing = check.mustContain.filter((token) => !source.includes(token));
  if (missing.length > 0) {
    failures += 1;
    line(`FAIL ${check.file} is missing: ${missing.join(", ")}`);
  } else {
    line(`PASS ${check.file} uses the AA-safe variant tokens`);
  }
}

line("");
if (failures > 0) {
  line(`Contrast gate failed: ${failures} problem(s).`);
  process.exit(1);
}
line("Contrast gate passed: all pairs meet WCAG AA.");
