<script setup lang="ts">
/**
 * @component AltCheckbox
 * @description Checkbox component with native input implementation.
 * Supports checked, unchecked, and indeterminate states.
 *
 * The public contract is intentionally strict:
 * - incoming state via `modelValue`
 * - outgoing changes via `update:modelValue`
 *
 * We do not keep legacy aliases to avoid ambiguous state ownership.
 *
 * @slot default - Additional label content after the label text
 *
 * @example
 * <AltCheckbox v-model="agreed" label="I agree to terms" />
 *
 * @example
 * <AltCheckbox v-model="selectAll" :indeterminate="isPartial" />
 */
import { computed, nextTick, ref } from "vue";
import AltIcon from "../base/AltIcon.vue";

interface AltCheckboxProps {
  /**
   * Current checked state
   */
  modelValue?: boolean;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is in indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Label text for the checkbox
   */
  label?: string;
}

const props = withDefaults(defineProps<AltCheckboxProps>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocusVisible = ref(false);
const transientChecked = ref<boolean | null>(null);
const resolvedChecked = computed(() => {
  if (transientChecked.value !== null) {
    return transientChecked.value;
  }

  return props.modelValue;
});

const checkboxState = computed(() => {
  if (props.indeterminate) {
    return "indeterminate";
  }

  return resolvedChecked.value ? "checked" : "unchecked";
});

function updateValue(value: boolean): void {
  emit("update:modelValue", value);
}

function handleChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  const nextValue = target.checked;

  // Use transient state for immediate feedback, then reconcile with model.
  transientChecked.value = nextValue;
  updateValue(nextValue);

  // Parent model is authoritative for controlled usage.
  nextTick(() => {
    transientChecked.value = null;

    if (!inputRef.value) {
      return;
    }

    inputRef.value.checked = props.modelValue;
  });
}

function handleFocus(event: FocusEvent): void {
  const target = event.target as HTMLInputElement;
  isFocusVisible.value = target.matches(":focus-visible");
}

function handleBlur(): void {
  isFocusVisible.value = false;
}
</script>

<template>
  <label
    class="base-checkbox"
    :data-disabled="props.disabled || undefined"
  >
    <span
      class="checkbox-control"
      :data-state="checkboxState"
      :data-focus-visible="isFocusVisible || undefined"
    >
      <AltIcon
        v-if="checkboxState === 'checked'"
        name="check"
        size="16"
        class="checkbox-icon"
      />
      <AltIcon
        v-else-if="checkboxState === 'indeterminate'"
        name="minus"
        size="16"
        class="checkbox-icon"
      />
    </span>
    <span class="checkbox-label">
      <span v-if="props.label">{{ props.label }}</span>
      <slot />
    </span>
    <input
      ref="inputRef"
      class="checkbox-hidden-input"
      type="checkbox"
      :checked="resolvedChecked"
      :indeterminate="props.indeterminate"
      :disabled="props.disabled"
      :aria-checked="props.indeterminate ? 'mixed' : resolvedChecked"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </label>
</template>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--alt-space-2);
  cursor: pointer;
  user-select: none;
  position: relative;
}

.base-checkbox[data-disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-hidden-input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
}

.checkbox-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-sm);
  background-color: var(--alt-c-surface-2);
  transition:
    background-color var(--alt-transition-colors),
    border-color var(--alt-transition-colors);
  position: relative;
}

.checkbox-control[data-state="checked"],
.checkbox-control[data-state="indeterminate"] {
  border-color: var(--alt-c-brand-1-500);
}

.checkbox-icon {
  color: var(--alt-c-brand-1-500);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 13px;
  height: 13px;
  stroke-width: 3;
}

.checkbox-label {
  color: var(--alt-c-text-2);
  font-size: var(--alt-font-size-1);
  display: flex;
  align-items: center;
  gap: var(--alt-space-2);
  cursor: pointer;
}

.base-checkbox[data-disabled] .checkbox-label {
  color: var(--alt-c-text-3);
  cursor: not-allowed;
}

/* Focus styles */
.checkbox-control[data-focus-visible] {
  outline: 2px solid var(--alt-c-brand-1-500);
  outline-offset: 2px;
}

/* Hover styles */
/* .checkbox-control[data-hover]:not([data-disabled]) {
  border-color: var(--alt-c-brand-1-400);
} */

/* .checkbox-label[data-hover]:not([data-disabled]) {
  color: var(--alt-c-brand-1-500);
} */
</style>
