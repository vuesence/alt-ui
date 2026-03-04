<script setup lang="ts">
/**
 * @component AltProgress
 * @description Linear progress bar with optional label.
 * Supports semantic color variants and indeterminate state.
 *
 * @example
 * <AltProgress :value="75" />
 * <AltProgress :value="30" variant="danger" size="sm" />
 * <AltProgress indeterminate variant="brand" />
 */
import { computed } from "vue";

type ProgressVariant = "brand" | "success" | "warning" | "danger" | "info" | "accent";
type ProgressSize = "xs" | "sm" | "md" | "lg";

interface AltProgressProps {
  /** Current progress value (0-100) */
  value?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Semantic color variant */
  variant?: ProgressVariant;
  /** Bar height preset */
  size?: ProgressSize;
  /** Show indeterminate animation instead of value */
  indeterminate?: boolean;
  /** Whether to show percentage text */
  showLabel?: boolean;
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

const props = withDefaults(defineProps<AltProgressProps>(), {
  value: 0,
  max: 100,
  variant: "brand",
  size: "md",
  indeterminate: false,
  showLabel: false,
  ariaLabel: "",
});

const percent = computed(() => {
  if (props.indeterminate) {
    return 0;
  }
  const clamped = Math.min(Math.max(props.value, 0), props.max);
  return Math.round((clamped / props.max) * 100);
});
</script>

<template>
  <div
    class="alt-progress"
    :class="[`alt-progress--${props.size}`, `alt-progress--${props.variant}`]"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : percent"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-label="ariaLabel || undefined"
  >
    <div class="alt-progress__track">
      <div
        class="alt-progress__fill"
        :class="{ 'alt-progress__fill--indeterminate': indeterminate }"
        :style="indeterminate ? undefined : { width: `${percent}%` }"
      />
    </div>
    <span v-if="showLabel && !indeterminate" class="alt-progress__label">
      {{ percent }}%
    </span>
  </div>
</template>

<style scoped>
.alt-progress {
  display: flex;
  align-items: center;
  gap: var(--alt-space-2);
  width: 100%;

  .alt-progress__track {
    flex: 1;
    background: var(--alt-c-surface-3);
    border-radius: var(--alt-radius-full);
    overflow: hidden;
  }

  .alt-progress__fill {
    height: 100%;
    border-radius: var(--alt-radius-full);
    transition: width var(--alt-duration-normal) var(--alt-ease-in-out);
    background: var(--progress-color, var(--alt-c-brand-1-500));
  }

  .alt-progress__fill--indeterminate {
    width: 30%;
    animation: progress-indeterminate 1.5s ease-in-out infinite;
  }

  .alt-progress__label {
    font-size: var(--alt-font-size-000);
    font-weight: var(--alt-font-weight-semibold);
    color: var(--alt-c-text-2);
    min-width: 2.5em;
    text-align: right;
    flex-shrink: 0;
  }
}

/* Size variants */
.alt-progress--xs .alt-progress__track { height: 3px; }
.alt-progress--sm .alt-progress__track { height: 5px; }
.alt-progress--md .alt-progress__track { height: 8px; }
.alt-progress--lg .alt-progress__track { height: 12px; }

/* Color variants */
.alt-progress--brand { --progress-color: var(--alt-c-brand-1-500); }
.alt-progress--success { --progress-color: var(--alt-c-success); }
.alt-progress--warning { --progress-color: var(--alt-c-warning); }
.alt-progress--danger { --progress-color: var(--alt-c-danger); }
.alt-progress--info { --progress-color: var(--alt-c-brand-3-500); }
.alt-progress--accent { --progress-color: var(--alt-c-brand-2-500); }

@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
</style>
