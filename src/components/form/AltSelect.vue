<script setup lang="ts">
import { computed } from "vue";
import { Select, createListCollection } from "@ark-ui/vue/select";

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

// Create a map for fast value lookup
const valueMap = computed(() => {
  const map = new Map<string, string | number>();
  props.options.forEach(option => {
    map.set(option.value.toString(), option.value);
  });
  return map;
});

// Convert options to ark-ui collection format
const collection = computed(() =>
  createListCollection({
    items: props.options.map(option => ({
      ...option,
      value: option.value.toString(), // ark-ui expects string values
    })),
  })
);

// Convert modelValue to ark-ui format (array of strings)
const internalValue = computed({
  get: () => props.modelValue !== undefined ? [props.modelValue.toString()] : [],
  set: (newValue: string[]) => {
    const value = newValue.length > 0 ? newValue[0] : undefined;
    if (value !== undefined) {
      // Use map for O(1) lookup instead of O(n) find
      const finalValue = valueMap.value.get(value) ?? value;
      emit("update:modelValue", finalValue);
      emit("change", finalValue);
    } else {
      emit("update:modelValue", undefined);
      emit("change", undefined);
    }
  },
});
</script>

<template>
  <div
    class="alt-select"
    :class="{
      'alt-select--disabled': props.disabled,
    }"
  >
    <Select.Root
      :collection="collection"
      v-model="internalValue"
      :disabled="props.disabled"
      :close-on-select="true"
    >
      <Select.Label v-if="props.label" class="alt-select__label">
        {{ props.label }}
      </Select.Label>

      <Select.Control>
        <Select.Trigger class="alt-select__trigger">
          <Select.ValueText :placeholder="props.placeholder" />
          <Select.Indicator class="alt-select__indicator">
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
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>

      <Select.Positioner class="alt-select__positioner">
        <Select.Content class="alt-select__content">
          <Select.ItemGroup>
            <Select.Item
              v-for="item in collection.items"
              :key="item.value"
              :item="item"
              :disabled="item.disabled"
              class="alt-select__item"
            >
              <Select.ItemText>{{ item.label }}</Select.ItemText>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>

      <Select.HiddenSelect />
    </Select.Root>
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

  .alt-select__trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--alt-space-3);
    border: 1px solid var(--alt-c-border);
    border-radius: var(--alt-radius-base);
    background: var(--alt-c-surface-1);
    color: var(--alt-c-text-1);
    font-size: var(--alt-font-size-2);
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;

    .small & {
      padding: var(--alt-space-2) var(--alt-space-3);
      font-size: var(--alt-font-size-1);
    }

    &:hover:not(:disabled) {
      border-color: var(--alt-c-brand-1-400);
      background: var(--alt-c-surface-3);
    }

    &:focus-visible {
      border-color: var(--alt-c-brand-1-500);
      box-shadow: var(--alt-focus-ring);
      background: var(--alt-c-surface-1);
    }
  }

  .alt-select__positioner {
    z-index: var(--alt-z-dropdown) !important;
  }

  .alt-select__indicator {
    color: var(--alt-c-text-3);
    transition: transform var(--alt-transition-fast);
    display: flex;
    align-items: center;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  .alt-select__content {
    border: 1px solid var(--alt-c-border);
    border-radius: var(--alt-radius-base);
    background: var(--alt-c-surface-1);
    box-shadow: var(--alt-shadow-2);
    margin-top: var(--alt-space-1);
  }

  .alt-select__item {
    display: flex;
    align-items: center;
    padding: var(--alt-space-3) var(--alt-space-4);
    font-size: var(--alt-font-size-2);
    color: var(--alt-c-text-1);
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover,
    &[data-highlighted] {
      background: var(--alt-c-surface-3);
    }

    &:focus-visible {
      background: var(--alt-c-surface-3);
    }

    &[data-disabled] {
      color: var(--alt-c-text-3);
      cursor: not-allowed;

      &:hover,
      &[data-highlighted] {
        background: transparent;
      }
    }

    &[data-selected] {
      font-weight: var(--alt-font-weight-medium);
    }
  }
}

/* Disabled state */
.alt-select--disabled {
  .alt-select__trigger {
    background: var(--alt-c-surface-2);
    color: var(--alt-c-text-3);
    cursor: not-allowed;
  }
}
</style>
