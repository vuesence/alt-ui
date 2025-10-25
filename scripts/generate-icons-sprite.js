/**
 * SVG Sprite Generator for alt-ui
 *
 * Generates an optimized SVG sprite from a directory of SVG icons.
 * Can be used as a module or run directly from command line.
 *
 * @module generate-icons-sprite
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Extract SVG content and viewBox from SVG string
 *
 * @param {string} svgString - Raw SVG file content
 * @returns {{content: string, viewBox: string}} Extracted content and viewBox
 */
function extractSvgContent(svgString) {
  // Remove XML declaration and comments
  const content = svgString
    .replaceAll(/<\?xml[^>]*\?>/g, "")
    .replaceAll(/<!--[\s\S]*?-->/g, "")
    .trim();

  // Extract content between <svg> tags
  const svgMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!svgMatch) {
    return { content: "", viewBox: "0 0 24 24" };
  }

  // Extract viewBox attribute
  const viewBoxMatch = content.match(/viewBox=["']([^"']*)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

  return {
    content: svgMatch[1].trim(),
    viewBox,
  };
}

/**
 * Recursively get all SVG files from directory
 *
 * @param {string} dir - Directory path to search
 * @param {string[]} fileList - Accumulated list of file paths
 * @returns {string[]} Array of SVG file paths
 */
function getAllSvgFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      getAllSvgFiles(filePath, fileList);
    } else if (file.endsWith(".svg")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Generate SVG sprite from directory of SVG icons
 *
 * @param {Object} config - Configuration object
 * @param {string} config.iconsDirectory - Path to directory containing SVG icons
 * @param {string} config.outputPath - Path where sprite will be saved
 * @param {string} [config.iconPrefix="icon"] - Prefix for icon IDs in sprite
 * @param {boolean} [config.verbose=true] - Whether to log generation info
 * @returns {{iconsCount: number, outputPath: string}} Generation result
 *
 * @example
 * generateIconsSprite({
 *   iconsDirectory: "./src/assets/icons",
 *   outputPath: "./public/icons-sprite.svg",
 *   iconPrefix: "icon",
 *   verbose: true
 * });
 */
export function generateIconsSprite(config) {
  const {
    iconsDirectory,
    outputPath,
    iconPrefix = "icon",
    verbose = true,
  } = config;

  if (!iconsDirectory || !outputPath) {
    throw new Error("iconsDirectory and outputPath are required");
  }

  if (verbose) {
    console.log("Generating SVG sprite...");
    console.log(`  Icons directory: ${iconsDirectory}`);
    console.log(`  Output path: ${outputPath}`);
  }

  // Get all SVG files from directory
  const svgFiles = getAllSvgFiles(iconsDirectory);
  const symbols = [];

  // Process each SVG file
  svgFiles.forEach((filePath) => {
    const relativePath = relative(iconsDirectory, filePath);
    const iconName = relativePath.replaceAll("\\", "/").replace(".svg", "");
    const name = iconName.split("/").pop();

    try {
      const content = readFileSync(filePath, "utf8");
      const { content: svgContent, viewBox } = extractSvgContent(content);

      // Create symbol element with proper indentation
      const symbol = `  <symbol id="${iconPrefix}-${name}" viewBox="${viewBox}">
${svgContent
  .split("\n")
  .map((line) => `    ${line}`)
  .join("\n")}
  </symbol>`;

      symbols.push(symbol);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error.message);
    }
  });

  // Generate final sprite file
  const sprite = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
${symbols.join("\n")}
</svg>`;

  writeFileSync(outputPath, sprite, "utf8");

  if (verbose) {
    console.log(`✓ Generated SVG sprite with ${symbols.length} icons`);
  }

  return {
    iconsCount: symbols.length,
    outputPath,
  };
}

// Run directly if executed as script
if (import.meta.url === `file://${process.argv[1]}`) {
  const defaultConfig = {
    iconsDirectory: join(__dirname, "..", "..", "..", "src", "assets", "icons"),
    outputPath: join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "assets",
      "images",
      "icons-sprite.svg"
    ),
    iconPrefix: "icon",
    verbose: true,
  };

  generateIconsSprite(defaultConfig);
}
