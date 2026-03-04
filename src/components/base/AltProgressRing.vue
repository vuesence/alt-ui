<script setup lang="ts">
/**
 * @component AltProgressRing
 * @description Circular progress ring with value/slot in the center.
 * Supports semantic color variants and dynamic color via prop.
 *
 * @example
 * <AltProgressRing :value="75" />
 * <AltProgressRing :value="42" variant="success" :size="80" />
 * <AltProgressRing :value="88" color="var(--alt-c-brand-2-500)">
 *   <template #default="{ percent }">
 *     <span class="custom-label">{{ percent }}</span>
 *   </template>
 * </AltProgressRing>
 */
import { computed } from "vue";

type RingVariant = "brand" | "success" | "warning" | "danger" | "info" | "accent";

interface AltProgressRingProps {
  value?: number;
  max?: number;
  variant?: RingVariant;
  color?: string;
  trackColor?: string;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<AltProgressRingProps>(), {
  value: 0,
  max: 100,
  variant: "brand",
  color: "",
  trackColor: "",
  size: 56,
  strokeWidth: 3.5,
  showValue: true,
  ariaLabel: "",
});

const percent = computed(() => {
  const clamped = Math.min(Math.max(props.value, 0), props.max);
  return Math.round((clamped / props.max) * 100);
});

const radius = computed(() => (36 - props.strokeWidth) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const dashArray = computed(() => {
  const filled = (percent.value / 100) * circumference.value;
  return `${filled} ${circumference.value}`;
});

const ringStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  minWidth: `${props.size}px`,
  minHeight: `${props.size}px`,
  "--ring-color": props.color || undefined,
  "--ring-track": props.trackColor || undefined,
}));

const valueFontSize = computed(() => {
  if (props.size <= 32) {return "0.625rem";}
  if (props.size <= 48) {return "0.75rem";}
  if (props.size <= 64) {return "0.875rem";}
  return "1.125rem";
});
</script>

<template>
  <div
    class="alt-progress-ring"
    :class="[`alt-progress-ring--${variant}`]"
    :style="ringStyle"
    role="progressbar"
    :aria-valuenow="percent"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-label="ariaLabel || undefined"
  >
    <svg viewBox="0 0 36 36" class="ring-svg">
      <circle
        class="ring-track"
        cx="18"
        cy="18"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
      />
      <circle
        class="ring-fill"
        cx="18"
        cy="18"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="0"
        transform="rotate(-90 18 18)"
      />
    </svg>
    <div class="ring-content">
      <slot :percent="percent" :value="value">
        <span v-if="showValue" class="ring-value" :style="{ fontSize: valueFontSize }">
          {{ percent }}
        </span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.alt-progress-ring {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .ring-svg {
    width: 100%;
    height: 100%;
  }

  .ring-track {
    stroke: var(--ring-track, var(--alt-c-surface-3));
  }

  .ring-fill {
    stroke: var(--ring-color, var(--ring-variant-color, var(--alt-c-brand-1-500)));
    transition: stroke-dasharray var(--alt-duration-normal) var(--alt-ease-in-out);
  }

  .ring-content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    pointer-events: none;
  }

  .ring-value {
    font-weight: var(--alt-font-weight-bold);
    color: var(--alt-c-text-1);
    line-height: 1;
  }
}

/* Color variants */
.alt-progress-ring--brand { --ring-variant-color: var(--alt-c-brand-1-500); }
.alt-progress-ring--success { --ring-variant-color: var(--alt-c-success); }
.alt-progress-ring--warning { --ring-variant-color: var(--alt-c-warning); }
.alt-progress-ring--danger { --ring-variant-color: var(--alt-c-danger); }
.alt-progress-ring--info { --ring-variant-color: var(--alt-c-brand-3-500); }
.alt-progress-ring--accent { --ring-variant-color: var(--alt-c-brand-2-500); }
</style>
