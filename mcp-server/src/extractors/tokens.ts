import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import type { TokenCategory, TokenMetadata } from "../types.js";

const cache = new Map<string, { mtime: number; data: TokenCategory }>();

export function extractTokens(stylesDir: string): TokenCategory[] {
  const categories: TokenCategory[] = [];

  const tokensDir = join(stylesDir, "tokens");
  const files = readdirSync(tokensDir).filter(f => f.endsWith(".css"));

  for (const file of files) {
    const filePath = join(tokensDir, file);
    const stat = statSync(filePath);
    const cached = cache.get(filePath);

    if (cached && cached.mtime === stat.mtimeMs) {
      categories.push(cached.data);
      continue;
    }

    const content = readFileSync(filePath, "utf-8");
    const tokens = extractCssCustomProperties(content);
    const categoryName = file.replace(".css", "");

    const category: TokenCategory = {
      name: categoryName,
      file: `src/styles/tokens/${file}`,
      tokens,
    };

    cache.set(filePath, { mtime: stat.mtimeMs, data: category });
    categories.push(category);
  }

  return categories;
}

function extractCssCustomProperties(content: string): TokenMetadata[] {
  const tokens: TokenMetadata[] = [];
  const lines = content.split("\n");

  let lastComment = "";

  for (const line of lines) {
    const trimmed = line.trim();

    // Capture comments
    if (trimmed.startsWith("/*") && trimmed.endsWith("*/")) {
      lastComment = trimmed.replace(/^\/\*\s*/, "").replace(/\s*\*\/$/, "").trim();
      continue;
    }

    // Match --alt-* property declarations
    const propMatch = trimmed.match(/^(--alt-[\w-]+):\s*(.+?);?\s*$/);
    if (propMatch) {
      tokens.push({
        name: propMatch[1],
        value: propMatch[2].replace(/;$/, "").trim(),
        description: lastComment || undefined,
      });
      lastComment = "";
    } else if (trimmed && !trimmed.startsWith("/*") && !trimmed.startsWith("*")) {
      lastComment = "";
    }
  }

  return tokens;
}

export function extractThemeTokens(stylesDir: string): Record<string, TokenMetadata[]> {
  const themes: Record<string, TokenMetadata[]> = {};
  const themeDir = join(stylesDir, "theme");

  try {
    const files = readdirSync(themeDir).filter(f => f.endsWith(".css"));
    for (const file of files) {
      const content = readFileSync(join(themeDir, file), "utf-8");
      const themeName = file.replace(".css", "");
      themes[themeName] = extractCssCustomProperties(content);
    }
  } catch {
    // theme dir may not exist
  }

  return themes;
}
