<script setup lang="ts">
/**
 * AltIcon - Universal icon component
 *
 * Supports two modes:
 * - sprite: References icons from SVG sprite file (production)
 * - bundle: Uses bundled SVG content (development)
 *
 * Also supports image icons (PNG, JPG, WebP)
 *
 * @example
 * // SVG icons (square)
 * <AltIcon name="settings" :size="24" />
 * <AltIcon name="user" color="#ff0000" />
 *
 * @example
 * // Image icons (preserves aspect ratio)
 * <AltIcon name="logo" type="image" :size="200" />
 * <AltIcon name="banner" type="image" :size="400" />
 */
import { computed } from "vue";
import { getIconMode, getImageUrl, getSpritePath } from "../../utils/icons";
import { isNumeric } from "../../utils/string-helpers";

type IconType = "svg" | "image";

interface AltIconProps {
  /** Icon name (e.g., "settings", "interface/settings") */
  name: string;
  /**
   * Icon size:
   * - For SVG: applies to both width and height (square)
   * - For images: applies to width only, height is auto (preserves aspect ratio)
   */
  size?: string | number;
  /** Icon color (CSS color value or "default") */
  color?: string;
  /** Custom width (overridden by size) */
  width?: string | number;
  /** Custom height (overridden by size) */
  height?: string | number;
  /** SVG fill color */
  fill?: string;
  /** Icon type: "svg" or "image" */
  type?: IconType;
  /** Override sprite path (sprite mode only) */
  spritePath?: string;
}

const props = withDefaults(defineProps<AltIconProps>(), {
  name: "",
  size: 24,
  color: "default",
  width: 24,
  height: "auto",
  type: "svg",
  spritePath: "",
});

// Check if size should be inherited from CSS (auto/inherit = no inline styles)
const isInheritedSize = computed(() => {
  return props.size === "auto" || props.size === "inherit";
});

// Compute width with size priority
const computedWidth = computed(() => {
  // When inherited, don't set inline width - let CSS handle it
  if (isInheritedSize.value) {
    return undefined;
  }
  if (props.size) {
    return isNumeric(props.size) ? `${Number(props.size)}px` : props.size;
  }
  return isNumeric(props.width) ? `${Number(props.width)}px` : props.width;
});

// Compute height with size priority
// For images: if size is set, height is auto to preserve aspect ratio
// For SVG: height equals width for square icons
const computedHeight = computed(() => {
  // When inherited, don't set inline height - let CSS handle it
  if (isInheritedSize.value) {
    return undefined;
  }

  // For images: preserve aspect ratio when size is set
  if (props.type === "image" && props.size) {
    return "auto";
  }

  // For SVG: use size for both dimensions (square)
  if (props.size) {
    return isNumeric(props.size) ? `${Number(props.size)}px` : props.size;
  }

  if (props.height === "auto") {
    return props.height;
  }

  return isNumeric(props.height) ? `${Number(props.height)}px` : props.height;
});

// Resolve icon color
const iconColor = computed(() => {
  return props.color !== "default" ? props.color : "var(--alt-c-brand-1)";
});

// Extract icon name from path (e.g., "interface/settings" -> "settings")
const iconName = computed(() => {
  return props.name.includes("/") ? props.name.split("/")[1] : props.name;
});

// Compute SVG fill style
const svgFillStyle = computed(() => {
  return props.fill && props.fill !== "currentColor"
    ? { fill: props.fill }
    : {};
});

// Get effective sprite path (prop or global config)
const effectiveSpritePath = computed(() => {
  return props.spritePath || getSpritePath();
});

// Get current icon mode from global config
const iconMode = computed(() => getIconMode());
</script>

<template>
  <svg
    v-if="props.type === 'svg' && iconMode === 'sprite'"
    class="base-icon base-icon--svg"
    :data-name="props.name"
    :style="{
      width: computedWidth,
      minWidth: computedWidth,
      height: computedHeight,
      color: iconColor,
      ...svgFillStyle,
    }"
  >
    <use :href="`${effectiveSpritePath}#icon-${iconName}`" />
  </svg>
  <img
    v-else-if="props.type === 'image'"
    class="base-icon base-icon--image"
    :src="getImageUrl(props.name)"
    :alt="props.name"
    :data-name="props.name"
    :style="{
      width: computedWidth,
      minWidth: computedWidth,
      height: computedHeight,
      color: iconColor,
    }"
  />
</template>

<style scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  transition:
    color var(--alt-transition-colors),
    opacity var(--alt-transition-colors);

  /* Default size when no inline styles (size="auto" or "inherit") */
  width: var(--icon-size, 24px);
  height: var(--icon-size, 24px);
}

.base-icon:hover {
  opacity: 0.8;
}

.base-icon--svg {
  flex-shrink: 0;
  /* fill: currentColor; */
}

.base-icon--image {
  flex-shrink: 0;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
