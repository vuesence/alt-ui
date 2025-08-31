<script setup lang="ts">
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
    class="alt-select"
    :class="{
      'alt-select--disabled': props.disabled,
    }"
  >
    <label v-if="props.label" class="alt-select__label">
      {{ props.label }}
    </label>

    <select
      v-model="selectedValue"
      :disabled="props.disabled"
    >
      <selectedcontent>
        {{ selectedLabel }}
      </selectedcontent>

      <option v-if="props.placeholder" value="" disabled hidden>
        {{ props.placeholder }}
      </option>
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.alt-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-2);

  label {
    color: var(--alt-c-text-2);
    font-size: var(--alt-font-size-1);
    margin-bottom: var(--alt-space-2);
  }

  select {
    width: 100%;
    appearance: base-select;
    display: flex;
    align-items: center;
    padding: var(--alt-space-3);
    border: 1px solid var(--alt-c-border);
    border-radius: var(--alt-radius-base);
    background: var(--alt-c-surface-1);
    color: var(--alt-c-text-1);
    font-size: var(--alt-font-size-2);
    cursor: pointer;
    transition: var(--alt-transition-colors);

    &:hover:not(:disabled) {
      border-color: var(--alt-c-brand-1-400);
      background: var(--alt-c-surface-2);
    }

    &:focus-visible {
      border-color: var(--alt-c-brand-1-500);
      box-shadow: var(--alt-focus-ring);
      background: var(--alt-c-surface-1);
    }
  }

  selectedcontent {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/* Picker (dropdown) styling */
select::picker(select) {
  border: none;
  border-radius: 0.25rem;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  margin-top: 2px;
}

/* Options styling */
select option {
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
  background: #ffffff;
  color: #475569;
  cursor: pointer;
  transition: background-color 250ms ease-in-out, color 250ms ease-in-out;

  &:hover {
    background: #f8fafc;
  }

  &:checked {
    font-weight: bold;
    /* background: #dbeafe; */
    /* color: #1d4ed8; */
  }

  &:disabled {
    color: #94a3b8;
    cursor: not-allowed;
  }
}

/* Picker icon styling */
select::picker-icon {
  color: #94a3b8;
  margin-left: auto;
  transition: transform 250ms;
}

/* Rotate icon when select is open */
select:open::picker-icon {
  transform: rotate(180deg);
}

/* Disabled state */
.alt-select--disabled {
  select {
    background: var(--alt-c-surface-2);
    color: var(--alt-c-text-3);
    cursor: not-allowed;
  }
}

/* Animation for picker */
select::picker(select) {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 250ms, transform 250ms;
}

select::picker(select):popover-open {
  opacity: 1;
  transform: translateY(0);
}

@starting-style {
  select::picker(select):popover-open {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
