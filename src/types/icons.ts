/**
 * Icon loading mode
 * - sprite: Icons loaded from SVG sprite file (recommended for production)
 * - bundle: Icons bundled into JavaScript (good for development)
 */
export type IconMode = "bundle" | "sprite";

/**
 * Icon configuration for build-time sprite generation
 */
export interface IconConfig {
  /** Icon loading mode */
  mode: IconMode;
  /** Glob pattern for SVG icons (bundle mode) */
  svgIconsGlob?: string;
  /** Glob patterns for image files */
  imageGlobs?: string[];
  /** Path to sprite file (sprite mode) */
  spritePath?: string;
  /** Directory containing source icons */
  iconsDirectory?: string;
  /** Output path for generated sprite */
  spriteOutputPath?: string;
}

/**
 * Runtime icon system configuration
 */
export interface IconSystemConfig {
  /** Icon loading mode */
  mode: IconMode;
  /** Glob pattern for SVG icons (bundle mode) - deprecated, uses fixed paths */
  svgIconsGlob?: string;
  /** Glob patterns for image files - deprecated, uses fixed paths */
  imageGlobs?: string[];
  /** Path to sprite file (sprite mode) */
  spritePath?: string;
}
