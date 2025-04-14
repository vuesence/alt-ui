<script setup lang="ts">
import { computed } from "vue";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface BaseSelectProps {
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

const props = withDefaults(defineProps<BaseSelectProps>(), {
  modelValue: undefined,
  label: "",
  placeholder: "",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | undefined): void;
  (e: "change", value: string | number | undefined): void;
}>();

const selectedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string | number | undefined) => {
    emit("update:modelValue", newValue);
    emit("change", newValue);
  },
});

const selectedLabel = computed(() => {
  const selectedItem = props.options.find(
    (item) => item.value === props.modelValue,
  );
  return selectedItem ? selectedItem.label : props.placeholder;
});
</script>

<template>
  <div
    class="base-select"
    :class="{
      'base-select--disabled': props.disabled,
    }"
  >
    <label v-if="props.label" class="base-select__label">
      {{ props.label }}
    </label>

    <div
      class="base-select__wrapper"
      :class="{
        'base-select__wrapper--active': selectedValue,
      }"
    >
      <select
        v-model="selectedValue"
        :disabled="props.disabled"
        class="base-select__native"
      >
        <option v-if="props.placeholder" value="" disabled hidden>
          {{ props.placeholder }}
        </option>
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          class="option"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="base-select__display">
        <span class="base-select__display-text">
          {{ selectedLabel }}
        </span>
        <span class="base-select__icon">▼</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--lh-space-2);
}

.base-select__label {
  color: var(--lh-c-text-2);
  font-size: var(--lh-font-size-1);
  margin-bottom: var(--lh-space-2);
}

.base-select__wrapper {
  position: relative;
  width: 100%;
}

.base-select__native {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.base-select__display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--lh-space-3);
  border: 1px solid var(--lh-c-border);
  border-radius: var(--lh-radius-base);
  background: var(--lh-c-surface-1);
  color: var(--lh-c-text-1);
  transition:
    border-color var(--lh-transition-colors),
    box-shadow var(--lh-transition-colors);
}

.base-select__display-text {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-select__icon {
  color: var(--lh-c-text-3);
  margin-left: var(--lh-space-3);
  font-size: var(--lh-font-size-0);
  transition: transform var(--lh-transition-base);
}

.base-select--disabled .base-select__display {
  background: var(--lh-c-surface-2);
  color: var(--lh-c-text-3);
  cursor: not-allowed;
}

.base-select__native:focus + .base-select__display {
  border-color: var(--lh-c-brand-1-500);
  box-shadow: var(--lh-focus-ring);
}

.base-select__native:hover:not(:disabled) + .base-select__display {
  border-color: var(--lh-c-brand-1-400);
}

.option {
  color: var(--lh-c-text-1);
  padding: var(--lh-space-3);
}
</style>
