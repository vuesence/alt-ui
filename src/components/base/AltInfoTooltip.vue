<script setup lang="ts">
/**
 * @component AltInfoTooltip
 * @description Info icon tooltip component built on top of AltTooltip.
 * Shows contextual helper text on hover/focus and supports touch toggling.
 *
 * @example
 * <AltInfoTooltip
 *   text="User hint"
 *   :positioning="{ placement: 'top' }"
 * />
 *
 * @slot default - Tooltip content (falls back to `text` prop)
 */

import { computed, onMounted, ref } from "vue";
import AltIcon from "./AltIcon.vue";
import AltTooltip from "./AltTooltip.vue";

export interface AltInfoTooltipProps {
  /** Tooltip text */
  text?: string;

  /** Positioning options */
  positioning?: {
    placement?: "top" | "bottom" | "left" | "right";
    gutter?: number;
    strategy?: "absolute" | "fixed";
    offset?: { mainAxis?: number; crossAxis?: number };
  };

  /** Delay before showing tooltip (ms). Default: 100 */
  openDelay?: number;

  /** Delay before hiding tooltip (ms). Default: 300 */
  closeDelay?: number;

  /** Show tooltip arrow. Default: false */
  showArrow?: boolean;

  /** Icon size in pixels. Default: 16 */
  size?: number;

  /** Icon color (CSS variable or hex). Default: var(--alt-c-text-3) */
  iconColor?: string;
}

const props = defineProps<AltInfoTooltipProps>();

const isTooltipOpen = ref(false);
const isTouchDevice = ref(false);

onMounted(() => {
  isTouchDevice.value = "ontouchstart" in window || navigator.maxTouchPoints > 0;
});

const resolvedOpenDelay = computed(() => {
  if (isTouchDevice.value) {
    return 0;
  }

  return props.openDelay || 100;
});

const resolvedCloseDelay = computed(() => {
  if (isTouchDevice.value) {
    return 0;
  }

  return props.closeDelay || 300;
});

/**
 * Touch screens do not have reliable hover state.
 * We toggle tooltip visibility on touch start.
 */
function handleTouchStart(event: TouchEvent): void {
  if (isTouchDevice.value) {
    event.preventDefault();
    isTooltipOpen.value = !isTooltipOpen.value;
  }
}
</script>

<template>
  <AltTooltip
    v-model="isTooltipOpen"
    :positioning="props.positioning"
    :open-delay="resolvedOpenDelay"
    :close-delay="resolvedCloseDelay"
    :show-arrow="props.showArrow"
    content-class="info-tooltip-content"
  >
    <template #trigger>
      <button
        type="button"
        class="info-tooltip-trigger"
        @touchstart="handleTouchStart"
      >
        <AltIcon
          name="info"
          :size="props.size || 16"
          :color="props.iconColor || 'var(--alt-c-text-3)'"
          class="info-icon"
        />
      </button>
    </template>
    <template #content>
      <div class="tooltip-content">
        <slot>{{ props.text }}</slot>
      </div>
    </template>
  </AltTooltip>
</template>

<style scoped>
.info-tooltip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  color: inherit;
  transition: color var(--alt-transition-colors);
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover .info-icon {
    color: var(--alt-c-text-2);
  }

  /* Touch feedback state */
  &:active .info-icon {
    color: var(--alt-c-text-2);
  }

  &:focus-visible {
    outline: 2px solid var(--alt-c-border);
    outline-offset: 2px;
    border-radius: var(--alt-radius-sm);
  }

  @media (pointer: coarse) {
    min-width: 44px;
    min-height: 44px;
  }
}

.tooltip-content {
  padding: var(--alt-space-3);
  font-size: var(--alt-font-size-0);
  color: var(--alt-c-text-2);
  line-height: var(--alt-line-height-2);
  overflow-wrap: break-word;
  max-width: 300px;
}
</style>
