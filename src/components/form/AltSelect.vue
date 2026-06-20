<script setup lang="ts">
/**
 * @component AltSelect
 * @description Single-select dropdown based on native HTML <select>.
 * Supports single selection, disabled options, placeholder, and label.
 *
 * CSS Classes:
 * - `small` — compact trigger size
 *
 * @cssclass small - Compact trigger with smaller padding and font
 *
 * @example
 * <AltSelect v-model="role" label="Role" :options="roleOptions" placeholder="Select role" />
 */
import { computed } from "vue";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface AltSelectProps {
  /**
   * Current selected value
   */
  modelValue?: string | number;
  /**
   * Array of options to display
   */
  options: SelectOption[];
  /**
   * Label text for the select
   */
  label?: string;
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<AltSelectProps>(), {
  modelValue: undefined,
  label: "",
  placeholder: "",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | undefined): void;
  (e: "change", value: string | number | undefined): void;
}>();

/**
 * Keep original value types (number/string) instead of leaking native string values.
 */
const valueMap = computed(() => {
  const map = new Map<string, string | number>();
  props.options.forEach((option) => {
    map.set(option.value.toString(), option.value);
  });
  return map;
});

const internalValue = computed(() => {
  if (props.modelValue === undefined) {
    return "";
  }

  return props.modelValue.toString();
});

const hasPlaceholder = computed(() => Boolean(props.placeholder));

function handleChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const rawValue = target.value;
  if (rawValue === "") {
    emit("update:modelValue", undefined);
    emit("change", undefined);
    return;
  }

  const finalValue = valueMap.value.get(rawValue) ?? rawValue;
  emit("update:modelValue", finalValue);
  emit("change", finalValue);
}
</script>

<template>
  <div
    class="alt-select"
    :class="{
      'alt-select--disabled': props.disabled,
    }"
  >
    <label v-if="props.label" class="alt-select__label">
      {{ props.label }}
    </label>

    <div class="alt-select__control">
      <select
        class="alt-select__trigger"
        :value="internalValue"
        :disabled="props.disabled"
        @change="handleChange"
      >
        <option v-if="hasPlaceholder" value="" disabled hidden>
          {{ props.placeholder }}
        </option>
        <option
          v-for="option in props.options"
          :key="option.value.toString()"
          :value="option.value.toString()"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <span class="alt-select__indicator" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped>
.alt-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-2);

  .alt-select__label {
    color: var(--alt-c-text-2);
    font-size: var(--alt-font-size-1);
  }
}

.alt-select__control {
  position: relative;
}

.alt-select__trigger {
  appearance: none;
  width: 100%;
  display: block;
  padding: var(--alt-space-3);
  padding-right: calc(var(--alt-space-7) + var(--alt-space-2));
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  background: var(--alt-c-surface-1);
  color: var(--alt-c-text-1);
  font-size: var(--alt-font-size-2);
  cursor: pointer;
  opacity: 0.96;
  transition:
    opacity 0.18s ease,
    border-color 0.15s ease,
    background-color 0.15s ease,
    box-shadow 0.15s ease;

  .alt-select.small & {
    padding: var(--alt-space-2) var(--alt-space-3);
    padding-right: calc(var(--alt-space-6) + var(--alt-space-2));
    font-size: var(--alt-font-size-1);
  }

  &:hover:not(:disabled) {
    border-color: var(--alt-c-brand-1-400);
    background: var(--alt-c-surface-3);
    opacity: 1;
  }

  &:focus-visible {
    border-color: var(--alt-c-brand-1-500);
    box-shadow: var(--alt-focus-ring);
    background: var(--alt-c-surface-1);
    opacity: 1;
    outline: none;
  }

  &:disabled {
    background: var(--alt-c-surface-2);
    color: var(--alt-c-text-3);
    opacity: 0.72;
    cursor: not-allowed;
    white-space: nowrap;
  }
}

.alt-select__indicator {
  position: absolute;
  top: 50%;
  right: var(--alt-space-3);
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--alt-c-text-3);
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition:
    opacity 0.18s ease,
    color 0.15s ease;

  .alt-select.small & {
    right: var(--alt-space-2);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
}

/* Disabled state */
.alt-select--disabled .alt-select__indicator {
  color: var(--alt-c-text-3);
  opacity: 0.6;
}
</style>
