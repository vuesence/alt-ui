<script setup lang="ts">
import { RadioGroup } from "@ark-ui/vue/radio-group";

// Создаем свой интерфейс, вместо импорта
interface ValueChangeDetails {
  value: string | null;
}

interface RadioItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface BaseRadioGroupProps {
  /**
   * Current selected value
   */
  modelValue?: string | null;
  /**
   * Array of radio items
   */
  items: RadioItem[];
  /**
   * Name attribute for the radio group
   */
  name?: string;
  /**
   * Label text for the radio group
   */
  label?: string;
  /**
   * Whether the radio group is disabled
   */
  disabled?: boolean;
  /**
   * Orientation of the radio group
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Size of the radio items
   */
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<BaseRadioGroupProps>(), {
  orientation: "vertical",
  size: "md",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
  (e: "valueChange", details: ValueChangeDetails): void;
}>();
</script>

<template>
  <RadioGroup.Root
    :model-value="props.modelValue"
    :name="props.name"
    :disabled="props.disabled"
    :orientation="props.orientation"
    class="radioGroup__root"
    :class="`radioGroup__root--size_${props.size}`"
    @update:model-value="(value: string | null) => emit('update:modelValue', value)"
    @value-change="(details: ValueChangeDetails) => emit('valueChange', details)"
  >
    <RadioGroup.Label
      v-if="props.label"
      class="radioGroup__label"
      :class="`radioGroup__label--size_${props.size}`"
    >
      {{ props.label }}
    </RadioGroup.Label>
    <RadioGroup.Indicator />
    <RadioGroup.Item
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      class="radioGroup__item"
      :class="`radioGroup__item--size_${props.size}`"
    >
      <RadioGroup.ItemControl
        class="radioGroup__itemControl"
        :class="`radioGroup__itemControl--size_${props.size}`"
      />
      <RadioGroup.ItemText
        class="radioGroup__itemText"
        :class="`radioGroup__itemText--size_${props.size}`"
      >
        {{ item.label }}
      </RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>

<style scoped>
.radioGroup__root {
  display: flex;
  gap: var(--alt-space-4);
}

.radioGroup__root[data-orientation="vertical"] {
  flex-direction: column;
}

.radioGroup__root[data-orientation="horizontal"] {
  flex-direction: row;
  align-items: center;
}

.radioGroup__label {
  color: var(--alt-c-text-1);
  font-weight: var(--alt-font-weight-medium);
}

.radioGroup__item {
  display: flex;
  align-items: center;
  gap: var(--alt-space-2);
  cursor: pointer;
}

.radioGroup__item[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.radioGroup__itemControl {
  width: 16px;
  height: 16px;
  border: 2px solid var(--alt-c-border);
  border-radius: var(--alt-radius-full);
  background-color: var(--alt-c-surface-1);
  transition:
    border-color var(--alt-transition-colors),
    background-color var(--alt-transition-colors);
}

.radioGroup__itemControl[data-state="checked"] {
  border-color: var(--alt-c-brand-1-500);
  background-color: var(--alt-c-brand-1-500);
  box-shadow: inset 0 0 0 3px var(--alt-c-surface-1);
}

.radioGroup__itemControl[data-focus-visible] {
  outline: 2px solid var(--alt-c-brand-1-500);
  outline-offset: 2px;
}

.radioGroup__itemControl[data-hover]:not([data-disabled]) {
  border-color: var(--alt-c-brand-1-400);
}

.radioGroup__itemText {
  color: var(--alt-c-text-1);
  font-size: var(--alt-font-size-1);
}

/* Size Variants */
.radioGroup__root--size_sm .radioGroup__itemControl {
  width: 14px;
  height: 14px;
}

.radioGroup__root--size_lg .radioGroup__itemControl {
  width: 18px;
  height: 18px;
}

.radioGroup__root--size_sm .radioGroup__itemText {
  font-size: var(--alt-font-size-0);
}

.radioGroup__root--size_lg .radioGroup__itemText {
  font-size: var(--alt-font-size-2);
}
</style>
