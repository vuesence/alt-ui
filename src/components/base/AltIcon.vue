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
 * <AltIcon name="settings" :size="24" />
 * <AltIcon name="user" color="#ff0000" />
 * <AltIcon name="logo" type="image" />
 */
import { computed } from "vue";
import { getIconMode, getImageUrl, getSpritePath, getSvgIcon } from "../../utils/icons";
import { isNumeric } from "../../utils/string-helpers";

type IconType = "svg" | "image";

interface AltIconProps {
  /** Icon name (e.g., "settings", "interface/settings") */
  name: string;
  /** Icon size (applies to both width and height) */
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

// Compute width with size priority
const computedWidth = computed(() => {
  if (props.size) {
    return isNumeric(props.size) ? `${Number(props.size)}px` : props.size;
  }
  return isNumeric(props.width) ? `${Number(props.width)}px` : props.width;
});

// Compute height with size priority
const computedHeight = computed(() => {
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

// Get bundled SVG content (bundle mode only)
const bundledSvgContent = computed(() => {
  if (iconMode.value === "bundle" && props.type === "svg") {
    return getSvgIcon(props.name);
  }
  return undefined;
});
</script>

<template>
  <svg
    v-if="props.type === 'svg' && iconMode === 'sprite'"
    class="base-icon base-icon--svg"
    :data-name="props.name"
    :style="{
      width: computedWidth,
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
}

.base-icon:hover {
  opacity: 0.8;
}

.base-icon--svg {
  flex-shrink: 0;
  /* fill: currentColor; */
}
</style>
