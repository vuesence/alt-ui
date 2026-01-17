/// <reference types="vite/client" />

/**
 * Icon System for alt-ui
 *
 * Supports two modes:
 * - sprite: SVG icons loaded from sprite file, images loaded via Vite (recommended)
 * - bundle: Both SVG icons and images bundled into JavaScript (dev mode)
 *
 * In sprite mode:
 * - SVG icons use sprite file for optimal performance
 * - Images (PNG, JPG, JPEG, WebP) are loaded directly with Vite's import.meta.glob
 * - Images get hash in URL for cache busting
 *
 * @example
 * // Sprite mode (recommended)
 * initIconSystem({
 *   mode: "sprite",
 *   spritePath: "/assets/images/icons-sprite.svg"
 * });
 *
 * @example
 * // Bundle mode
 * initIconSystem({
 *   mode: "bundle"
 * });
 */

import type { IconMode, IconSystemConfig } from "../types/icons";

// Storage for loaded icons and images
const svgResources = new Map<string, string>();
const imageResources = new Map<string, string>();

// Current icon system configuration
let iconMode: IconMode = "sprite";
let spritePath = "/assets/images/icons-sprite.svg";

/**
 * @deprecated Use IconSystemConfig instead
 */
interface LoadIconsConfig {
  mode?: IconMode;
  svgIconsGlob?: string;
  imageGlobs?: string[];
  spritePath?: string;
}

/**
 * Initialize the icon system with specified configuration
 *
 * @param config - Icon system configuration
 *
 * @example
 * initIconSystem({
 *   mode: "sprite",
 *   spritePath: "/assets/images/icons-sprite.svg"
 * });
 */
async function initIconSystem(config: IconSystemConfig): Promise<void> {
  iconMode = config.mode;

  if (config.spritePath) {
    spritePath = config.spritePath;
  }

  if (config.mode === "bundle") {
    await loadIconsBundle();
  } else if (config.mode === "sprite") {
    // Load images even in sprite mode (SVG icons use sprite, images use direct URLs)
    loadImagesBundle();
  }
}

/**
 * Load images (PNG, JPG, JPEG, WebP) from @/assets/images/
 * Used in both sprite and bundle modes
 */
function loadImagesBundle(): void {
  // Load PNG images
  const pngModules = import.meta.glob("@/assets/images/**/*.png", {
    query: "?url",
    import: "default",
    eager: true,
  });

  for (const [fileName, module] of Object.entries(pngModules)) {
    const extension = fileName.slice(fileName.lastIndexOf("."));
    const name = fileName.slice(
      fileName.lastIndexOf("/") + 1,
      -extension.length
    );
    imageResources.set(name, module as string);
  }

  // Load JPG images
  const jpgModules = import.meta.glob("@/assets/images/**/*.jpg", {
    query: "?url",
    import: "default",
    eager: true,
  });

  for (const [fileName, module] of Object.entries(jpgModules)) {
    const extension = fileName.slice(fileName.lastIndexOf("."));
    const name = fileName.slice(
      fileName.lastIndexOf("/") + 1,
      -extension.length
    );
    imageResources.set(name, module as string);
  }

  // Load JPEG images
  const jpegModules = import.meta.glob("@/assets/images/**/*.jpeg", {
    query: "?url",
    import: "default",
    eager: true,
  });

  for (const [fileName, module] of Object.entries(jpegModules)) {
    const extension = fileName.slice(fileName.lastIndexOf("."));
    const name = fileName.slice(
      fileName.lastIndexOf("/") + 1,
      -extension.length
    );
    imageResources.set(name, module as string);
  }

  // Load WebP images
  const webpModules = import.meta.glob("@/assets/images/**/*.webp", {
    query: "?url",
    import: "default",
    eager: true,
  });

  for (const [fileName, module] of Object.entries(webpModules)) {
    const extension = fileName.slice(fileName.lastIndexOf("."));
    const name = fileName.slice(
      fileName.lastIndexOf("/") + 1,
      -extension.length
    );
    imageResources.set(name, module as string);
  }

  console.log(`✓ Loaded ${imageResources.size} images`);
}

/**
 * Load icons in bundle mode
 * Note: import.meta.glob requires static literals, cannot use dynamic patterns
 * Icons are loaded from predefined paths: @/assets/icons/ and @/assets/images/
 * Using eager: false to prevent including all SVGs in main bundle when not used
 */
async function loadIconsBundle(): Promise<void> {
  // Load SVG icons lazily to avoid bundling when not used
  const svgModules = import.meta.glob("@/assets/icons/**/*.svg", {
    query: "?raw",
    import: "default",
  });

  // Load all modules
  const entries = await Promise.all(
    Object.entries(svgModules).map(async ([fileName, loader]) => {
      const module = await loader();
      const name = fileName.slice(fileName.lastIndexOf("/") + 1, -4);
      return [name, module as string] as const;
    })
  );

  for (const [name, content] of entries) {
    svgResources.set(name, content);
  }

  console.log(`✓ Loaded ${svgResources.size} SVG icons in bundle mode`);

  // Load images as well
  loadImagesBundle();
}

/**
 * Get SVG icon content by name (bundle mode only)
 *
 * @param name - Icon name (with or without directory prefix)
 * @returns SVG content string or undefined
 *
 * @example
 * const iconContent = getSvgIcon("settings");
 */
function getSvgIcon(name: string): string | undefined {
  if (iconMode === "sprite") {
    return undefined;
  }

  const iconName = name.includes("/") ? name.split("/")[1] : name;
  return svgResources.get(iconName);
}

/**
 * Get image URL by name
 *
 * @param name - Image name or full URL
 * @returns Image URL
 *
 * @example
 * const imageUrl = getImageUrl("logo");
 */
function getImageUrl(name: string): string | undefined {
  if (name.startsWith("http")) {
    return name;
  }
  return imageResources.get(name);
}

/**
 * Get current icon mode
 *
 * @returns Current icon mode ("sprite" or "bundle")
 */
function getIconMode(): IconMode {
  return iconMode;
}

/**
 * Get configured sprite path
 *
 * @returns Sprite file path
 */
function getSpritePath(): string {
  return spritePath;
}

/**
 * @deprecated Use initIconSystem instead
 *
 * Legacy function for backward compatibility
 */
function loadIcons(config?: LoadIconsConfig): void {
  console.warn("loadIcons is deprecated. Use initIconSystem instead.");
  if (config) {
    initIconSystem({
      mode: config.mode || "sprite",
      svgIconsGlob: config.svgIconsGlob,
      imageGlobs: config.imageGlobs,
      spritePath: config.spritePath,
    });
  }
}

export {
  getIconMode,
  getImageUrl,
  getSpritePath,
  getSvgIcon,
  initIconSystem,
  loadIcons,
  svgResources,
};
export type { IconSystemConfig, LoadIconsConfig };
