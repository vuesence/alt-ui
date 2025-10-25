# Icon System Documentation

The alt-ui icon system supports two modes for loading and displaying icons: **sprite mode** and **bundle mode**.

## Quick Start

### 1. Initialize Icon System

In your main application entry point (e.g., `main.ts`):

```typescript
import { initIconSystem } from "alt-ui";

// Sprite mode (recommended)
initIconSystem({
  mode: "sprite",
  spritePath: "/assets/images/icons-sprite.svg",
});

// OR Bundle mode
initIconSystem({
  mode: "bundle",
  svgIconsGlob: "@/assets/icons/**/*.svg",
  imageGlobs: [
    "@/assets/images/**/*.png",
    "@/assets/images/**/*.webp",
  ],
});
```

### 2. Generate Sprite (for sprite mode)

Create a script to generate the sprite:

```javascript
// scripts/generate-icons-sprite.js
import { generateIconsSprite } from "../submodules/alt-ui/scripts/generate-icons-sprite.js";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

generateIconsSprite({
  iconsDirectory: join(__dirname, "..", "src", "assets", "icons"),
  outputPath: join(__dirname, "..", "public", "assets", "images", "icons-sprite.svg"),
  iconPrefix: "icon",
  verbose: true,
});
```

Add to `package.json`:

```json
{
  "scripts": {
    "generate-icons-sprite": "node scripts/generate-icons-sprite.js"
  }
}
```

### 3. Use Icons in Components

```vue
<template>
  <AltIcon name="settings" :size="24" />
  <AltIcon name="user" :size="32" color="#ff0000" />
  <AltIcon name="logo" type="image" />
</template>

<script setup>
import { AltIcon } from "alt-ui";
</script>
```

## Modes Comparison

### Sprite Mode (Recommended)

**Pros:**

- Smaller bundle size
- Better performance for many icons
- Icons can be cached separately
- Ideal for production

**Cons:**

- Requires build step to generate sprite
- Icons must be generated before use

**Usage:**

```typescript
initIconSystem({
  mode: "sprite",
  spritePath: "/assets/images/icons-sprite.svg",
});
```

### Bundle Mode

**Pros:**

- No build step required
- Icons available immediately
- Good for development

**Cons:**

- Larger bundle size
- Icons loaded even if not used
- Can slow down initial load

**Usage:**

```typescript
initIconSystem({
  mode: "bundle",
  svgIconsGlob: "@/assets/icons/**/*.svg",
  imageGlobs: [
    "@/assets/images/**/*.png",
    "@/assets/images/**/*.jpg",
    "@/assets/images/**/*.webp",
  ],
});
```

## Configuration Options

### `initIconSystem(config)`

```typescript
interface IconSystemConfig {
  mode: "sprite" | "bundle";
  svgIconsGlob?: string;        // For bundle mode
  imageGlobs?: string[];        // For both modes
  spritePath?: string;          // For sprite mode
}
```

### `generateIconsSprite(config)`

```typescript
interface SpriteConfig {
  iconsDirectory: string;       // Path to icons directory
  outputPath: string;           // Output sprite file path
  iconPrefix?: string;          // Prefix for icon IDs (default: "icon")
  verbose?: boolean;            // Log generation info (default: true)
}
```

## AltIcon Component Props

```typescript
interface AltIconProps {
  name: string;                 // Icon name (required)
  size?: string | number;       // Icon size (default: 24)
  color?: string;               // Icon color (default: "default")
  width?: string | number;      // Custom width (default: 24)
  height?: string | number;     // Custom height (default: "auto")
  fill?: string;                // SVG fill color
  type?: "svg" | "image";       // Icon type (default: "svg")
  spritePath?: string;          // Override sprite path
}
```

## Migration Guide

### From Old Bundle System

**Before:**

```typescript
import { loadIcons } from "@/app/utils/icons";
loadIcons();
```

**After:**

```typescript
import { initIconSystem } from "alt-ui";
initIconSystem({
  mode: "bundle",
  svgIconsGlob: "@/assets/icons/**/*.svg",
});
```

### From Old Sprite System

**Before:**

```typescript
// No initialization needed
```

**After:**

```typescript
import { initIconSystem } from "alt-ui";
initIconSystem({
  mode: "sprite",
  spritePath: "/assets/images/icons-sprite.svg",
});
```

## Best Practices

1. **Use sprite mode in production** for better performance
2. **Generate sprite during build** process
3. **Keep icon names consistent** across directories
4. **Use semantic names** for icons (e.g., "user", "settings", not "icon1")
5. **Optimize SVGs** before adding to project
6. **Use appropriate sizes** - don't scale icons too much

## Troubleshooting

### Icons not showing in sprite mode

- Ensure sprite is generated: `pnpm generate-icons-sprite`
- Check sprite path is correct
- Verify sprite file exists in public directory

### Icons not showing in bundle mode

- Check glob patterns match your icon locations
- Ensure icons are in correct directories
- Verify Vite can resolve the paths

### Performance issues

- Switch from bundle to sprite mode
- Reduce number of icons in bundle
- Optimize SVG files
