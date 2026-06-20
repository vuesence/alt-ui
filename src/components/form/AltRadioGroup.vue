<script setup lang="ts">
/**
 * @component AltRadioGroup
 * @description Radio button group with native input implementation.
 * Supports horizontal/vertical orientation and size variants.
 *
 * @example
 * <AltRadioGroup
 *   v-model="choice"
 *   :items="[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]"
 *   orientation="horizontal"
 * />
 */
import { computed, ref } from "vue";
import { useUniqueId } from "../../utils/useUniqueId";

interface ValueChangeDetails {
  value: string | null;
}

interface RadioItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AltRadioGroupProps {
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

const props = withDefaults(defineProps<AltRadioGroupProps>(), {
  orientation: "vertical",
  size: "md",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
  (e: "valueChange", details: ValueChangeDetails): void;
}>();

const generatedName = useUniqueId("alt-radio-group");
const focusedValue = ref<string | null>(null);
const hoveredValue = ref<string | null>(null);
const focusVisibleValue = ref<string | null>(null);

const groupName = computed(() => {
  if (props.name && props.name.length > 0) {
    return props.name;
  }

  return generatedName;
});

const selectedValue = computed(() => props.modelValue ?? null);

function isItemDisabled(item: RadioItem): boolean {
  return Boolean(props.disabled || item.disabled);
}

function getItemState(itemValue: string): "checked" | "unchecked" {
  return selectedValue.value === itemValue ? "checked" : "unchecked";
}

function updateValue(value: string): void {
  emit("update:modelValue", value);
  emit("valueChange", { value });
}

function handleInputChange(value: string): void {
  updateValue(value);
}

function handleFocus(event: FocusEvent, value: string): void {
  const target = event.target as HTMLInputElement;
  focusedValue.value = value;
  focusVisibleValue.value = target.matches(":focus-visible") ? value : null;
}

function handleBlur(value: string): void {
  if (focusedValue.value === value) {
    focusedValue.value = null;
  }

  if (focusVisibleValue.value === value) {
    focusVisibleValue.value = null;
  }
}

function setHoveredValue(value: string | null): void {
  hoveredValue.value = value;
}
</script>

<template>
  <div
    class="radioGroup__root"
    :class="`radioGroup__root--size_${props.size}`"
    :data-orientation="props.orientation"
    role="radiogroup"
    :aria-orientation="props.orientation"
    :aria-disabled="props.disabled ? 'true' : 'false'"
  >
    <span
      v-if="props.label"
      class="radioGroup__label"
      :class="`radioGroup__label--size_${props.size}`"
    >
      {{ props.label }}
    </span>
    <label
      v-for="item in props.items"
      :key="item.value"
      class="radioGroup__item"
      :class="`radioGroup__item--size_${props.size}`"
      :data-disabled="isItemDisabled(item) || undefined"
      @mouseenter="setHoveredValue(item.value)"
      @mouseleave="setHoveredValue(null)"
    >
      <span
        class="radioGroup__itemControl"
        :class="`radioGroup__itemControl--size_${props.size}`"
        :data-state="getItemState(item.value)"
        :data-disabled="isItemDisabled(item) || undefined"
        :data-focus-visible="focusVisibleValue === item.value || undefined"
        :data-hover="hoveredValue === item.value || undefined"
      />
      <span
        class="radioGroup__itemText"
        :class="`radioGroup__itemText--size_${props.size}`"
      >
        {{ item.label }}
      </span>
      <input
        class="radioGroup__itemHiddenInput"
        type="radio"
        :name="groupName"
        :value="item.value"
        :checked="selectedValue === item.value"
        :disabled="isItemDisabled(item)"
        @change="handleInputChange(item.value)"
        @focus="handleFocus($event, item.value)"
        @blur="handleBlur(item.value)"
      />
    </label>
  </div>
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
  position: relative;
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

.radioGroup__itemHiddenInput {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
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
