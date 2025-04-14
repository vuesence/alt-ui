<script setup lang="ts">
import { computed } from "vue";
import { getImageUrl, getSvgIcon } from "../../utils/icons";
import { isNumeric } from "../../utils/string-helpers";

// Define a more strict type for icon types
type IconType = "svg" | "image";

// Define props with more explicit typing
interface BaseIconProps {
  name: string;
  size?: string | number;
  color?: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
  type?: IconType;
}

const props = withDefaults(defineProps<BaseIconProps>(), {
  name: "",
  size: 24,
  color: "default",
  width: 24,
  height: "auto",
  type: "svg",
});

// Compute dimensions with more explicit size handling
const computedWidth = computed(() => {
  // If size is provided, use it as the primary dimension
  if (props.size) {
    // Check if size is numeric (including numeric strings)
    return isNumeric(props.size) ? `${Number(props.size)}px` : props.size;
  }

  // Same for width
  return isNumeric(props.width) ? `${Number(props.width)}px` : props.width;
});

const computedHeight = computed(() => {
  // If size is provided, use it as the primary dimension
  if (props.size) {
    return isNumeric(props.size) ? `${Number(props.size)}px` : props.size;
  }

  if (props.height === "auto") {
    return props.height;
  }

  return isNumeric(props.height) ? `${Number(props.height)}px` : props.height;
});

// More robust color computation
const iconColor = computed(() => {
  return props.color !== "default" ? props.color : "var(--lh-c-brand-1)";
});

// Determine if icon is an SVG
const isSvgIcon = computed(() => getSvgIcon(props.name));

// Compute fill style dynamically
const svgFillStyle = computed(() => {
  return props.fill && props.fill !== "currentColor"
    ? { fill: props.fill }
    : {};
});
</script>

<template>
  <div
    v-if="isSvgIcon"
    class="base-icon base-icon--svg"
    :data-name="props.name"
    :style="{
      width: computedWidth,
      height: computedHeight,
      color: iconColor,
      ...svgFillStyle,
    }"
    v-html="getSvgIcon(props.name)"
  />
  <img
    v-else
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
    color var(--lh-transition-colors),
    opacity var(--lh-transition-colors);
}

.base-icon:hover {
  opacity: 0.8;
}

.base-icon--svg {
  flex-shrink: 0;
}

.base-icon--svg:deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
