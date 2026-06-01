#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readdirSync, readFileSync, existsSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { extractComponent } from "./extractors/component.js";
import { extractTokens, extractThemeTokens } from "./extractors/tokens.js";
import type { ComponentMetadata } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve alt-ui root (either from dist/ or from src/)
const ALT_UI_ROOT = resolve(__dirname, "../..");
const COMPONENTS_DIR = join(ALT_UI_ROOT, "src/components");
const STYLES_DIR = join(ALT_UI_ROOT, "src/styles");

// Component file registry
interface ComponentEntry {
  name: string;
  filePath: string;
  category: string;
}

function discoverComponents(): ComponentEntry[] {
  const entries: ComponentEntry[] = [];

  const categories: Record<string, string> = {
    base: join(COMPONENTS_DIR, "base"),
    form: join(COMPONENTS_DIR, "form"),
    dialogs: join(COMPONENTS_DIR, "dialogs"),
    onboarding: join(COMPONENTS_DIR, "Onboarding"),
    tour: join(COMPONENTS_DIR, "Tour"),
    theme: join(COMPONENTS_DIR, "ThemeProvider"),
  };

  for (const [category, dir] of Object.entries(categories)) {
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter(f => f.endsWith(".vue"));
    for (const file of files) {
      entries.push({
        name: file.replace(".vue", ""),
        filePath: join(dir, file),
        category,
      });
    }
  }

  return entries;
}

function getAllComponents(): ComponentMetadata[] {
  const entries = discoverComponents();
  return entries.map(e => extractComponent(e.filePath, e.category));
}

function getComponentByName(name: string): ComponentMetadata | undefined {
  const entries = discoverComponents();
  const entry = entries.find(
    e => e.name.toLowerCase() === name.toLowerCase()
      || e.name.replace(/^Alt/, "").toLowerCase() === name.toLowerCase(),
  );
  if (!entry) return undefined;
  return extractComponent(entry.filePath, entry.category);
}

function formatComponentSummary(c: ComponentMetadata): string {
  return `**${c.name}** (${c.category}) — ${c.description || "No description"}`;
}

function formatComponentFull(c: ComponentMetadata): string {
  const parts: string[] = [];

  parts.push(`# ${c.name}\n`);
  parts.push(`**Category:** ${c.category}`);
  parts.push(`**File:** ${c.filePath}`);
  if (c.description) parts.push(`\n${c.description}\n`);

  if (c.props.length > 0) {
    parts.push("\n## Props\n");
    parts.push("| Prop | Type | Required | Default | Description |");
    parts.push("|------|------|----------|---------|-------------|");
    for (const p of c.props) {
      parts.push(`| \`${p.name}\` | \`${p.type}\` | ${p.required ? "Yes" : "No"} | ${p.default ?? "—"} | ${p.description || "—"} |`);
    }
  }

  if (c.events.length > 0) {
    parts.push("\n## Events\n");
    parts.push("| Event | Payload | Description |");
    parts.push("|-------|---------|-------------|");
    for (const e of c.events) {
      parts.push(`| \`${e.name}\` | \`${e.payload}\` | ${e.description || "—"} |`);
    }
  }

  if (c.slots.length > 0) {
    parts.push("\n## Slots\n");
    parts.push("| Slot | Props | Description |");
    parts.push("|------|-------|-------------|");
    for (const s of c.slots) {
      parts.push(`| \`${s.name}\` | ${s.props ?? "—"} | ${s.description || "—"} |`);
    }
  }

  if (c.cssClasses.length > 0) {
    parts.push("\n## CSS Classes\n");
    parts.push("Apply these classes on the component root for customization:\n");
    for (const cl of c.cssClasses) {
      parts.push(`- \`${cl.name}\` — ${cl.description}`);
    }
  }

  if (c.cssVars.length > 0) {
    parts.push("\n## CSS Variables\n");
    parts.push("Component-local CSS custom properties:\n");
    for (const v of c.cssVars) {
      parts.push(`- \`${v.name}\` — ${v.description}`);
    }
  }

  if (c.examples.length > 0) {
    parts.push("\n## Examples\n");
    for (const ex of c.examples) {
      parts.push("```vue");
      parts.push(ex.trim());
      parts.push("```\n");
    }
  }

  if (c.dependencies.length > 0) {
    parts.push(`\n**Dependencies:** ${c.dependencies.join(", ")}`);
  }

  return parts.join("\n");
}

// Create MCP server
const server = new McpServer({
  name: "alt-ui-docs",
  version: "0.1.0",
});

// ─── component.list ────────────────────────────────────────

server.tool(
  "component_list",
  "List all alt-ui components with basic info",
  {
    category: z.string().optional().describe("Filter by category: base, form, dialogs, onboarding, tour, theme"),
  },
  async ({ category }) => {
    const all = getAllComponents();
    const filtered = category
      ? all.filter(c => c.category === category)
      : all;

    const text = filtered.map(c => {
      const info = [formatComponentSummary(c)];
      if (c.props.length > 0) info.push(`  Props: ${c.props.map(p => p.name).join(", ")}`);
      if (c.cssClasses.length > 0) info.push(`  CSS classes: ${c.cssClasses.map(cl => cl.name).join(", ")}`);
      return info.join("\n");
    }).join("\n\n");

    return { content: [{ type: "text" as const, text: `## Components (${filtered.length})\n\n${text}` }] };
  },
);

// ─── component.get ─────────────────────────────────────────

server.tool(
  "component_get",
  "Get full documentation for a specific component",
  {
    name: z.string().describe("Component name (e.g. 'AltButton', 'Button', 'AltInput')"),
  },
  async ({ name }) => {
    const component = getComponentByName(name);
    if (!component) {
      return { content: [{ type: "text" as const, text: `Component "${name}" not found. Use component_list to see available components.` }] };
    }
    return { content: [{ type: "text" as const, text: formatComponentFull(component) }] };
  },
);

// ─── component.search ──────────────────────────────────────

server.tool(
  "component_search",
  "Search components by keyword in name, description, props, or CSS classes",
  {
    query: z.string().describe("Search keyword"),
  },
  async ({ query }) => {
    const all = getAllComponents();
    const q = query.toLowerCase();

    const matches = all.filter(c =>
      c.name.toLowerCase().includes(q)
      || c.description.toLowerCase().includes(q)
      || c.props.some(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      || c.cssClasses.some(cl => cl.name.toLowerCase().includes(q) || cl.description.toLowerCase().includes(q))
      || c.slots.some(s => s.name.toLowerCase().includes(q)),
    );

    if (matches.length === 0) {
      return { content: [{ type: "text" as const, text: `No components found matching "${query}".` }] };
    }

    const text = matches.map(formatComponentSummary).join("\n");
    return { content: [{ type: "text" as const, text: `## Search results for "${query}" (${matches.length})\n\n${text}` }] };
  },
);

// ─── component.props ───────────────────────────────────────

server.tool(
  "component_props",
  "Get props for a specific component",
  {
    name: z.string().describe("Component name"),
  },
  async ({ name }) => {
    const component = getComponentByName(name);
    if (!component) {
      return { content: [{ type: "text" as const, text: `Component "${name}" not found.` }] };
    }

    if (component.props.length === 0) {
      return { content: [{ type: "text" as const, text: `${component.name} has no props.` }] };
    }

    const lines = [`## ${component.name} Props\n`];
    lines.push("| Prop | Type | Required | Default | Description |");
    lines.push("|------|------|----------|---------|-------------|");
    for (const p of component.props) {
      lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.required ? "Yes" : "No"} | ${p.default ?? "—"} | ${p.description || "—"} |`);
    }

    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  },
);

// ─── component.css-classes ─────────────────────────────────

server.tool(
  "component_css_classes",
  "Get available CSS class variants for a component",
  {
    name: z.string().describe("Component name"),
  },
  async ({ name }) => {
    const component = getComponentByName(name);
    if (!component) {
      return { content: [{ type: "text" as const, text: `Component "${name}" not found.` }] };
    }

    if (component.cssClasses.length === 0) {
      return { content: [{ type: "text" as const, text: `${component.name} does not have CSS class variants. Use props for customization.` }] };
    }

    const lines = [`## ${component.name} CSS Classes\n`];
    lines.push("Apply these classes on the component for customization:\n");
    for (const cl of component.cssClasses) {
      lines.push(`- \`${cl.name}\` — ${cl.description}`);
    }

    if (component.examples.length > 0) {
      lines.push("\n### Examples\n");
      for (const ex of component.examples) {
        lines.push("```vue");
        lines.push(ex.trim());
        lines.push("```\n");
      }
    }

    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  },
);

// ─── tokens.list ───────────────────────────────────────────

server.tool(
  "tokens_list",
  "List design token categories",
  {},
  async () => {
    const categories = extractTokens(STYLES_DIR);
    const text = categories.map(c =>
      `- **${c.name}** (${c.file}) — ${c.tokens.length} tokens`,
    ).join("\n");

    return { content: [{ type: "text" as const, text: `## Design Token Categories\n\n${text}` }] };
  },
);

// ─── tokens.get ────────────────────────────────────────────

server.tool(
  "tokens_get",
  "Get all tokens in a category",
  {
    category: z.string().describe("Token category: colors, typography, spacing, effects, scrollbar"),
  },
  async ({ category }) => {
    const categories = extractTokens(STYLES_DIR);
    const cat = categories.find(c => c.name === category);

    if (!cat) {
      return { content: [{ type: "text" as const, text: `Category "${category}" not found. Available: ${categories.map(c => c.name).join(", ")}` }] };
    }

    const lines = [`## ${cat.name} tokens (${cat.tokens.length})\n`];
    for (const t of cat.tokens) {
      lines.push(`- \`${t.name}\`: \`${t.value}\`${t.description ? ` — ${t.description}` : ""}`);
    }

    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  },
);

// ─── tokens.search ─────────────────────────────────────────

server.tool(
  "tokens_search",
  "Search tokens by name or value",
  {
    query: z.string().describe("Search query (token name or value)"),
  },
  async ({ query }) => {
    const categories = extractTokens(STYLES_DIR);
    const q = query.toLowerCase();

    const matches: Array<{ category: string; name: string; value: string }> = [];

    for (const cat of categories) {
      for (const t of cat.tokens) {
        if (t.name.toLowerCase().includes(q) || t.value.toLowerCase().includes(q)) {
          matches.push({ category: cat.name, name: t.name, value: t.value });
        }
      }
    }

    if (matches.length === 0) {
      return { content: [{ type: "text" as const, text: `No tokens found matching "${query}".` }] };
    }

    const lines = [`## Token search: "${query}" (${matches.length} results)\n`];
    for (const m of matches) {
      lines.push(`- \`${m.name}\`: \`${m.value}\` (${m.category})`);
    }

    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  },
);

// ─── tokens.themes ─────────────────────────────────────────

server.tool(
  "tokens_themes",
  "Get semantic tokens for a specific theme (light, dark, contrast)",
  {
    theme: z.string().optional().describe("Theme name: light, dark, contrast, system. Omit for all."),
  },
  async ({ theme }) => {
    const themes = extractThemeTokens(STYLES_DIR);

    if (theme) {
      const tokens = themes[theme];
      if (!tokens) {
        return { content: [{ type: "text" as const, text: `Theme "${theme}" not found. Available: ${Object.keys(themes).join(", ")}` }] };
      }

      const lines = [`## ${theme} theme tokens (${tokens.length})\n`];
      for (const t of tokens) {
        lines.push(`- \`${t.name}\`: \`${t.value}\``);
      }
      return { content: [{ type: "text" as const, text: lines.join("\n") }] };
    }

    const lines = ["## Theme tokens\n"];
    for (const [name, tokens] of Object.entries(themes)) {
      lines.push(`### ${name} (${tokens.length} tokens)\n`);
      for (const t of tokens) {
        lines.push(`- \`${t.name}\`: \`${t.value}\``);
      }
      lines.push("");
    }

    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  },
);

// ─── badge.classes ─────────────────────────────────────────

server.tool(
  "badge_classes",
  "Get available CSS classes for the .alt-badge utility (CSS-only component)",
  {},
  async () => {
    const badgePath = join(STYLES_DIR, "base/badge.css");
    if (!existsSync(badgePath)) {
      return { content: [{ type: "text" as const, text: "Badge CSS file not found." }] };
    }

    const content = readFileSync(badgePath, "utf-8");

    // Extract JSDoc header
    const headerMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    const header = headerMatch
      ? headerMatch[1].split("\n").map(l => l.replace(/^\s*\*\s?/, "").trim()).filter(Boolean).join("\n")
      : "";

    return {
      content: [{
        type: "text" as const,
        text: `## .alt-badge CSS Classes\n\n${header}\n\n### Usage\n\n\`\`\`html\n<span class="alt-badge success">Active</span>\n<span class="alt-badge danger soft pill">Critical</span>\n<span class="alt-badge info outline with-dot">Info</span>\n\`\`\`\n\n### Sizes\n- \`xs\` — extra small\n- \`sm\` — small\n- (default) — medium\n- \`lg\` — large\n\n### Variants\n- \`success\` — green\n- \`warning\` — amber\n- \`attention\` — orange\n- \`danger\` / \`critical\` — red\n- \`info\` — blue\n- \`brand\` — brand color\n- \`neutral\` — gray\n\n### Modifiers\n- \`soft\` — subtle background with colored text\n- \`outline\` — transparent background with colored border\n- \`pill\` — fully rounded shape\n- \`with-dot\` — adds dot indicator before text`,
      }],
    };
  },
);

// ─── Start server ──────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
