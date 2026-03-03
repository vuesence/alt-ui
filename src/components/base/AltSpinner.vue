<script setup lang="ts">
/**
 * @component AltSpinner
 * @description Loading spinner with circular animation.
 * Inherits color from parent via currentColor.
 *
 * CSS Classes:
 * - `small` — smaller size (0.75em)
 * - `large` — larger size (1.5em)
 *
 * @cssclass small - Smaller spinner (0.75em)
 * @cssclass large - Larger spinner (1.5em)
 *
 * @example
 * <AltSpinner />
 *
 * @example
 * <AltSpinner class="large" />
 */
defineProps<{
  /** Custom size (CSS value) */
  size?: string;
}>();
</script>

<template>
  <div
    class="alt-spinner"
    role="status"
    aria-label="Loading"
    :style="size ? { width: size, height: size } : undefined"
  >
    <svg viewBox="0 0 50 50">
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  </div>
</template>

<style scoped>
.alt-spinner {
  display: inline-block;
  width: 1em;
  height: 1em;

  &.small {
    width: 0.75em;
    height: 0.75em;
  }

  &.large {
    width: 1.5em;
    height: 1.5em;
  }
}

.alt-spinner svg {
  animation: rotate 2s linear infinite;
  width: 100%;
  height: 100%;
}

.alt-spinner .path {
  stroke: currentColor;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
