<script setup lang="ts">
/**
 * @component AltChip
 * @description Interactive chip/tag component for selections, filters, and labels.
 * Unlike `.alt-badge` (CSS-only), AltChip is a Vue component with slots,
 * events, and interactive states (selectable, removable).
 *
 * CSS Classes (apply on component root):
 * - Variants: `primary`, `secondary`, `accent`, `success`, `warning`, `danger`, `info`, `neutral`
 * - Styles: `soft`, `outline`
 * - Sizes: `small`, `large`
 * - Shape: `pill`
 * - State: `selected` (via class or v-model)
 *
 * @example
 * <AltChip label="Vue 3" removable @remove="onRemove" />
 *
 * @example
 * <AltChip class="primary soft pill" label="Active" />
 *
 * @example
 * <AltChip class="accent outline" selectable v-model="isSelected">
 *   <template #icon><AltIcon name="sparkles" :size="14" /></template>
 *   AI Feature
 * </AltChip>
 *
 * @slot default - Chip content (used when label is not set)
 * @slot icon - Icon or visual before the label
 * @slot remove - Custom remove button content
 */
import { computed } from "vue";
import AltIcon from "./AltIcon.vue";

export interface AltChipProps {
  /** Chip label text */
  label?: string;
  /** Enable remove button */
  removable?: boolean;
  /** Enable click-to-select behavior */
  selectable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Icon name (left side) */
  icon?: string;
}

const props = withDefaults(defineProps<AltChipProps>(), {
  removable: false,
  selectable: false,
  disabled: false,
});

const selected = defineModel<boolean>("selected", { default: false });

const emit = defineEmits<{
  remove: [];
  click: [event: MouseEvent];
}>();

const isInteractive = computed(() => props.selectable || props.removable);

function handleClick(event: MouseEvent) {
  if (props.disabled) return;

  if (props.selectable) {
    selected.value = !selected.value;
  }

  emit("click", event);
}

function handleRemove(event: MouseEvent) {
  event.stopPropagation();
  if (props.disabled) return;
  emit("remove");
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleClick(event as unknown as MouseEvent);
  }

  if (event.key === "Delete" || event.key === "Backspace") {
    if (props.removable) {
      event.preventDefault();
      emit("remove");
    }
  }
}
</script>

<template>
  <span
    class="alt-chip"
    :class="{
      'is-selected': selected,
      'is-disabled': disabled,
      'is-interactive': isInteractive,
    }"
    :role="selectable ? 'option' : undefined"
    :aria-selected="selectable ? selected : undefined"
    :aria-disabled="disabled || undefined"
    :tabindex="isInteractive && !disabled ? 0 : undefined"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot name="icon">
      <AltIcon v-if="icon" :name="icon" :size="14" class="chip-icon" />
    </slot>

    <span class="chip-label">
      <slot>{{ label }}</slot>
    </span>

    <button
      v-if="removable && !disabled"
      type="button"
      class="chip-remove"
      :aria-label="`Remove ${label || ''}`"
      tabindex="-1"
      @click="handleRemove"
    >
      <slot name="remove">
        <svg viewBox="0 0 16 16" fill="none" class="chip-remove-icon">
          <path
            d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </slot>
    </button>
  </span>
</template>

<style scoped>
.alt-chip {
  --chip-height: 1.75rem;
  --chip-padding-x: var(--alt-space-3);
  --chip-gap: var(--alt-space-1);
  --chip-font-size: var(--alt-font-size-0);
  --chip-radius: var(--alt-radius-md);
  --chip-bg: var(--alt-c-surface-2);
  --chip-color: var(--alt-c-text-2);
  --chip-border-color: var(--alt-c-divider);

  display: inline-flex;
  align-items: center;
  gap: var(--chip-gap);
  height: var(--chip-height);
  padding: 0 var(--chip-padding-x);
  font-size: var(--chip-font-size);
  font-weight: var(--alt-font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  color: var(--chip-color);
  background-color: var(--chip-bg);
  border: 1px solid var(--chip-border-color);
  border-radius: var(--chip-radius);
  transition:
    color var(--alt-duration-fast) var(--alt-ease-in-out),
    background-color var(--alt-duration-fast) var(--alt-ease-in-out),
    border-color var(--alt-duration-fast) var(--alt-ease-in-out),
    box-shadow var(--alt-duration-fast) var(--alt-ease-in-out);

  &.is-interactive {
    cursor: pointer;
    user-select: none;

    &:hover:not(.is-disabled) {
      background-color: var(--alt-c-surface-3);
      border-color: var(--alt-c-brand-1-300);
    }

    &:focus-visible {
      box-shadow: var(--alt-focus-ring);
    }
  }

  &.is-selected {
    --chip-bg: var(--alt-c-brand-soft);
    --chip-color: var(--alt-c-brand-1-600);
    --chip-border-color: var(--alt-c-brand-1-400);
  }

  &.is-disabled {
    opacity: var(--alt-c-disabled-opacity, 0.5);
    cursor: not-allowed;
  }
}

/* ============================================
   Sizes
   ============================================ */

.alt-chip.small {
  --chip-height: 1.375rem;
  --chip-padding-x: var(--alt-space-2);
  --chip-font-size: var(--alt-font-size-00);
}

.alt-chip.large {
  --chip-height: 2.25rem;
  --chip-padding-x: var(--alt-space-4);
  --chip-font-size: var(--alt-font-size-1);
}

/* ============================================
   Shape
   ============================================ */

.alt-chip.pill {
  --chip-radius: var(--alt-radius-full);
}

/* ============================================
   Color variants
   ============================================ */

.alt-chip.primary {
  --chip-bg: var(--alt-c-brand-1-500);
  --chip-color: var(--alt-c-white);
  --chip-border-color: var(--alt-c-brand-1-500);
}

.alt-chip.secondary {
  --chip-bg: var(--alt-c-surface-2);
  --chip-color: var(--alt-c-text-2);
  --chip-border-color: var(--alt-c-border);
}

.alt-chip.accent {
  --chip-bg: var(--alt-c-brand-3-500);
  --chip-color: var(--alt-c-white);
  --chip-border-color: var(--alt-c-brand-3-500);
}

.alt-chip.success {
  --chip-bg: var(--alt-c-success);
  --chip-color: var(--alt-c-white);
  --chip-border-color: var(--alt-c-success);
}

.alt-chip.warning {
  --chip-bg: var(--alt-c-warning);
  --chip-color: var(--alt-c-white);
  --chip-border-color: var(--alt-c-warning);
}

.alt-chip.danger {
  --chip-bg: var(--alt-c-danger);
  --chip-color: var(--alt-c-white);
  --chip-border-color: var(--alt-c-danger);
}

.alt-chip.info {
  --chip-bg: var(--alt-c-info);
  --chip-color: var(--alt-c-white);
  --chip-border-color: var(--alt-c-info);
}

.alt-chip.neutral {
  --chip-bg: var(--alt-c-gray-400);
  --chip-color: var(--alt-c-white);
  --chip-border-color: var(--alt-c-gray-400);
}

/* ============================================
   Soft modifier
   ============================================ */

.alt-chip.soft {
  --chip-bg: var(--alt-c-gray-100);
  --chip-color: var(--alt-c-gray-600);
  --chip-border-color: transparent;
}

.alt-chip.soft.primary {
  --chip-bg: var(--alt-c-brand-soft);
  --chip-color: var(--alt-c-brand-1-600);
}

.alt-chip.soft.accent {
  --chip-bg: var(--alt-c-brand-3-soft);
  --chip-color: var(--alt-c-brand-3-600);
}

.alt-chip.soft.success {
  --chip-bg: var(--alt-c-success-soft);
  --chip-color: var(--alt-c-success);
}

.alt-chip.soft.warning {
  --chip-bg: var(--alt-c-warning-soft);
  --chip-color: var(--alt-c-warning);
}

.alt-chip.soft.danger {
  --chip-bg: var(--alt-c-danger-soft);
  --chip-color: var(--alt-c-danger);
}

.alt-chip.soft.info {
  --chip-bg: var(--alt-c-info-soft);
  --chip-color: var(--alt-c-info);
}


/* ============================================
   Outline modifier
   ============================================ */

.alt-chip.outline {
  --chip-bg: transparent;
  --chip-color: var(--alt-c-text-2);
  --chip-border-color: currentColor;
}

.alt-chip.outline.primary {
  --chip-color: var(--alt-c-brand-1-500);
}

.alt-chip.outline.accent {
  --chip-color: var(--alt-c-brand-3-500);
}

.alt-chip.outline.success {
  --chip-color: var(--alt-c-success);
}

.alt-chip.outline.warning {
  --chip-color: var(--alt-c-warning);
}

.alt-chip.outline.danger {
  --chip-color: var(--alt-c-danger);
}

.alt-chip.outline.info {
  --chip-color: var(--alt-c-info);
}

/* ============================================
   Internal elements
   ============================================ */

.chip-icon {
  flex-shrink: 0;
}

.chip-icon :deep(.base-icon) {
  color: currentColor;
}

.chip-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.chip-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  margin-left: var(--alt-space-0);
  margin-right: calc(var(--alt-space-1) * -1);
  padding: 0;
  border: none;
  background: none;
  color: currentColor;
  opacity: 0.6;
  cursor: pointer;
  border-radius: var(--alt-radius-full);
  transition: opacity var(--alt-duration-fast) var(--alt-ease-in-out),
    background-color var(--alt-duration-fast) var(--alt-ease-in-out);

  &:hover {
    opacity: 1;
    background-color: color-mix(in srgb, currentColor 15%, transparent);
  }
}

.chip-remove-icon {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
