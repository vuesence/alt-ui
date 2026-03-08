<script setup lang="ts">
/**
 * @component AltButton
 * @description Universal button component with CSS class-based variant customization.
 * Colored variants render as outline by default; add `solid` for filled background.
 *
 * @cssclass primary - Primary brand color (blue)
 * @cssclass secondary - Neutral secondary style
 * @cssclass secondary-brand - Secondary brand color (teal)
 * @cssclass accent - Accent color (violet) for AI features
 * @cssclass outline - Outline style with brand border
 * @cssclass text - Ghost/text button, no border or background
 * @cssclass success - Green success variant
 * @cssclass warning - Amber warning variant
 * @cssclass danger - Red danger variant
 * @cssclass solid - Filled background (combine with color variant)
 * @cssclass x-small - Extra small size
 * @cssclass small - Small size
 * @cssclass large - Large size
 * @cssclass wide - Full width (100%)
 * @cssclass icon-only - Square icon-only button
 *
 * @cssvar --btn-padding-y - Vertical padding
 * @cssvar --btn-padding-x - Horizontal padding
 * @cssvar --btn-gap - Gap between icon and label
 * @cssvar --btn-font-size - Font size
 * @cssvar --icon-size - Icon dimensions
 *
 * @slot default - Button content (used when label prop is not set)
 *
 * @example
 * <AltButton class="primary solid" label="Save" />
 *
 * @example
 * <AltButton class="danger" icon="delete" label="Delete" />
 *
 * @example
 * <AltButton class="text small" icon="settings" />
 *
 * @dependency vue-router - For `to` prop navigation
 */
import { useRouter } from "vue-router";
import AltSpinner from "./AltSpinner.vue";
import AltIcon from "./AltIcon.vue";

const router = useRouter();

const props = defineProps({
  to: {
    type: [String, Object],
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  icon: {
    type: String,
    default: "",
  },
  iconRight: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  hideText: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

function click(event: MouseEvent) {
  // If this is a submit button, don't interfere with normal submit behavior
  // The form's @submit.prevent will handle preventing default
  if (props.type === "submit") {
    return;
  }

  if (props.to) {
    const to = typeof props.to === "object" ? props.to : { name: props.to };
    router.push(to);
  } else {
    emit("click", event);
  }
}
</script>

<template>
  <button
    :type="type"
    class="base-button alt-button"
    :disabled="disabled || loading"
    :aria-busy="loading"
    @click="click"
  >
    <AltIcon
      v-if="icon && !loading"
      :name="icon"
      size="auto"
      class="button-icon button-icon--left"
    />
    <AltSpinner v-if="loading" class="spinner spinner--left" />
    <span v-if="label && !hideText" class="button-text">{{ label }}</span>
    <slot v-else />
    <AltIcon
      v-if="iconRight"
      :name="iconRight"
      size="auto"
      class="button-icon button-icon--right"
    />
  </button>
</template>

<style scoped>
.base-button {
  /* Size tokens */
  --icon-size: 1.25em;
  --btn-padding-y: var(--alt-space-3);
  --btn-padding-x: var(--alt-space-6);
  --btn-gap: var(--alt-space-2);
  --btn-font-size: var(--alt-font-size-1);

  font-size: var(--btn-font-size);
  font-variant-numeric: tabular-nums;
  color: var(--alt-c-text-2);
  position: relative;
  display: inline-flex;
  gap: var(--btn-gap);
  align-items: center;
  justify-content: center;
  padding: var(--btn-padding-y) var(--btn-padding-x);
  font-weight: var(--alt-font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: var(--alt-c-surface-2);
  border: 1px solid var(--alt-c-border);
  box-shadow: var(--alt-shadow-1);
  border-radius: var(--alt-radius-md);
  outline: 0;
  width: fit-content;
  transition:
    color var(--alt-duration-fast) var(--alt-ease-in-out),
    background-color var(--alt-duration-fast) var(--alt-ease-in-out),
    border-color var(--alt-duration-fast) var(--alt-ease-in-out),
    box-shadow var(--alt-duration-fast) var(--alt-ease-in-out);
}

.button-text {
  margin-top: 1px;
}

.button-icon {
  flex-shrink: 0;
  transition:
    opacity var(--alt-duration-fast) var(--alt-ease-in-out),
    color var(--alt-duration-fast) var(--alt-ease-in-out);
}

/* Icon always inherits button text color via currentColor */
.base-button :deep(.base-icon) {
  color: currentColor !important;
}

.base-button:hover:not(:disabled) {
  background-color: var(--alt-c-hover-overlay);
  border-color: var(--alt-c-brand-1-300);
}

.base-button:hover:not(:disabled) .button-icon {
  opacity: 1;
}

/* Active state - only color change, no movement */

.base-button:focus-visible {
  box-shadow: var(--alt-focus-ring);
}

/* ============================================
 * VARIANT: PRIMARY (Brand 1)
 * Default: outline style. Add .solid for filled.
 * ============================================ */
.base-button.primary {
  background-color: transparent;
  border-color: var(--alt-c-brand-1-500);
  color: var(--alt-c-brand-1-500);
  box-shadow: var(--alt-shadow-1);
}

.base-button.primary:hover:not(:disabled) {
  background-color: var(--alt-c-brand-soft);
  border-color: var(--alt-c-brand-1-600);
  color: var(--alt-c-brand-1-600);
}

.base-button.primary:active:not(:disabled) {
  background-color: color-mix(in srgb, var(--alt-c-brand-soft) 80%, transparent);
}

.base-button.primary.solid {
  background-color: var(--alt-c-brand-1-500);
  border-color: var(--alt-c-brand-1-500);
  color: var(--alt-c-white);
  box-shadow: var(--alt-shadow-2);
}

.base-button.primary.solid:hover:not(:disabled) {
  background-color: var(--alt-c-brand-hover);
  border-color: var(--alt-c-brand-hover);
  color: var(--alt-c-white);
}

.base-button.primary.solid:active:not(:disabled) {
  background-color: var(--alt-c-brand-active);
  border-color: var(--alt-c-brand-active);
  color: var(--alt-c-white);
}


/* ============================================
 * VARIANT: SECONDARY (Brand 2 - Teal)
 * Default: outline style. Add .solid for filled.
 * ============================================ */
.base-button.secondary-brand {
  background-color: transparent;
  border-color: var(--alt-c-brand-2-500);
  color: var(--alt-c-brand-2-500);
}

.base-button.secondary-brand:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--alt-c-brand-2-500) 10%, transparent);
  color: var(--alt-c-brand-2-600);
}

.base-button.secondary-brand.solid {
  background-color: var(--alt-c-brand-2-500);
  border-color: var(--alt-c-brand-2-500);
  color: var(--alt-c-white);
}

.base-button.secondary-brand.solid:hover:not(:disabled) {
  background-color: var(--alt-c-brand-2-600);
  border-color: var(--alt-c-brand-2-600);
  color: var(--alt-c-white);
}


/* ============================================
 * VARIANT: ACCENT (Brand 3 - Violet)
 * Default: outline style. Add .solid for filled.
 * ============================================ */
.base-button.accent {
  background-color: transparent;
  border-color: var(--alt-c-brand-3-500);
  color: var(--alt-c-brand-3-500);
}

.base-button.accent:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--alt-c-brand-3-500) 10%, transparent);
  color: var(--alt-c-brand-3-600);
}

.base-button.accent.solid {
  background-color: var(--alt-c-brand-3-500);
  border-color: var(--alt-c-brand-3-500);
  color: var(--alt-c-white);
}

.base-button.accent.solid:hover:not(:disabled) {
  background-color: var(--alt-c-brand-3-600);
  border-color: var(--alt-c-brand-3-600);
  color: var(--alt-c-white);
}


/* ============================================
 * VARIANT: SECONDARY (Neutral)
 * ============================================ */
.base-button.secondary {
  background-color: var(--alt-c-surface-2);
  border-color: var(--alt-c-border);
  color: var(--alt-c-text-2);
}

.base-button.secondary:hover:not(:disabled) {
  background-color: var(--alt-c-surface-3);
  color: var(--alt-c-text-1);
}

/* ============================================
 * VARIANT: OUTLINE
 * ============================================ */
.base-button.outline {
  background-color: transparent;
  border-color: var(--alt-c-brand-1-500);
  color: var(--alt-c-brand-1-500);
}

.base-button.outline:hover:not(:disabled) {
  background-color: var(--alt-c-brand-soft);
  color: var(--alt-c-brand-1-600);
}


/* ============================================
 * VARIANT: TEXT (Ghost)
 * ============================================ */
.base-button.text {
  --btn-padding-y: var(--alt-space-2);
  --btn-padding-x: var(--alt-space-3);

  background-color: transparent;
  border-color: transparent;
  color: var(--alt-c-text-2);
  box-shadow: none;
}

.base-button.text:hover:not(:disabled) {
  background-color: var(--alt-c-hover-overlay);
  color: var(--alt-c-text-1);
}

/* ============================================
 * VARIANT: SUCCESS
 * Default: outline style. Add .solid for filled.
 * ============================================ */
.base-button.success {
  background-color: transparent;
  border-color: var(--alt-c-success);
  color: var(--alt-c-success);
}

.base-button.success:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--alt-c-success) 10%, transparent);
  color: var(--alt-c-success-600, color-mix(in srgb, var(--alt-c-success) 85%, black));
}

.base-button.success.solid {
  background-color: var(--alt-c-success);
  border-color: var(--alt-c-success);
  color: var(--alt-c-white);
}

.base-button.success.solid:hover:not(:disabled) {
  background-color: var(--alt-c-success-600, color-mix(in srgb, var(--alt-c-success) 85%, black));
  border-color: var(--alt-c-success-600, color-mix(in srgb, var(--alt-c-success) 85%, black));
  color: var(--alt-c-white);
}


/* ============================================
 * VARIANT: WARNING
 * Default: outline style. Add .solid for filled.
 * ============================================ */
.base-button.warning {
  background-color: transparent;
  border-color: var(--alt-c-warning);
  color: var(--alt-c-warning);
}

.base-button.warning:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--alt-c-warning) 10%, transparent);
  color: var(--alt-c-warning-600, color-mix(in srgb, var(--alt-c-warning) 85%, black));
}

.base-button.warning.solid {
  background-color: var(--alt-c-warning);
  border-color: var(--alt-c-warning);
  color: var(--alt-c-white);
}

.base-button.warning.solid:hover:not(:disabled) {
  background-color: var(--alt-c-warning-600, color-mix(in srgb, var(--alt-c-warning) 85%, black));
  border-color: var(--alt-c-warning-600, color-mix(in srgb, var(--alt-c-warning) 85%, black));
  color: var(--alt-c-white);
}


/* ============================================
 * VARIANT: DANGER
 * Default: outline style. Add .solid for filled.
 * ============================================ */
.base-button.danger {
  background-color: transparent;
  border-color: var(--alt-c-danger);
  color: var(--alt-c-danger);
}

.base-button.danger:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--alt-c-danger) 10%, transparent);
  color: var(--alt-c-danger-600, color-mix(in srgb, var(--alt-c-danger) 85%, black));
}

.base-button.danger.solid {
  background-color: var(--alt-c-danger);
  border-color: var(--alt-c-danger);
  color: var(--alt-c-white);
}

.base-button.danger.solid:hover:not(:disabled) {
  background-color: var(--alt-c-danger-600, color-mix(in srgb, var(--alt-c-danger) 85%, black));
  border-color: var(--alt-c-danger-600, color-mix(in srgb, var(--alt-c-danger) 85%, black));
  color: var(--alt-c-white);
}


/* ============================================
 * SIZES
 * ============================================ */
.base-button.x-small {
  --icon-size: 12px;
  --btn-padding-y: var(--alt-space-1);
  --btn-padding-x: var(--alt-space-2);
  --btn-gap: var(--alt-space-1);
  --btn-font-size: var(--alt-font-size-00);
}

.base-button.small {
  --icon-size: 16px;
  --btn-padding-y: var(--alt-space-2);
  --btn-padding-x: var(--alt-space-3);
  --btn-gap: var(--alt-space-1);
  --btn-font-size: var(--alt-font-size-0);
}

.base-button.large {
  --icon-size: 1.5em;
  --btn-padding-y: var(--alt-space-4);
  --btn-padding-x: var(--alt-space-8);
  --btn-gap: var(--alt-space-3);
  --btn-font-size: var(--alt-font-size-2);
}

/* ============================================
 * MODIFIERS
 * ============================================ */
.base-button.wide {
  width: 100%;
}

.base-button.icon-only {
  --icon-size: 20px;
  --btn-padding-x: var(--btn-padding-y);
  aspect-ratio: 1;
}

.base-button:disabled {
  opacity: var(--alt-c-disabled-opacity);
  cursor: not-allowed;
}

/* ============================================
 * SPINNER
 * ============================================ */
.spinner {
  --icon-size: 1em;
}

.spinner--left {
  margin-right: var(--alt-space-1);
}
</style>
