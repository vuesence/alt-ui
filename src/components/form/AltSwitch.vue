<script setup lang="ts">
/**
 * @component AltSwitch
 * @description Toggle switch with native input implementation.
 *
 * This component intentionally uses a strict single-source API:
 * - `modelValue` for incoming state
 * - `update:modelValue` for outgoing state changes
 *
 * We do NOT keep legacy aliases (`checked`, `checked-change`) to avoid
 * ambiguous data flow and hidden regressions in host apps.
 *
 * CSS Classes:
 * - `small` — compact switch size
 *
 * @cssclass small - Smaller switch dimensions
 *
 * @example
 * <AltSwitch v-model="enabled" label="Enable notifications" />
 */
import { computed, nextTick, ref } from "vue";

interface AltSwitchProps {
  /**
   * Current checked state
   */
  modelValue?: boolean;
  /**
   * Label text for the switch
   */
  label?: string;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<AltSwitchProps>(), {
  modelValue: false,
  label: "",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "change", value: boolean): void;
}>();

const isHovered = ref(false);
const isFocusVisible = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const transientChecked = ref<boolean | null>(null);
const resolvedChecked = computed(() => {
  if (transientChecked.value !== null) {
    return transientChecked.value;
  }

  return props.modelValue;
});
const switchState = computed(() => (resolvedChecked.value ? "checked" : "unchecked"));

function updateValue(value: boolean): void {
  emit("update:modelValue", value);
  emit("change", value);
}

function handleChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  const nextValue = target.checked;

  // Keep immediate visual feedback from the native event,
  // but treat parent model as the final source of truth.
  transientChecked.value = nextValue;
  updateValue(nextValue);

  // Reconcile in the next render tick: parent may accept or reject
  // the update; both cases resolve to the parent model value.
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

function setHovered(value: boolean): void {
  isHovered.value = value;
}
</script>

<template>
  <label
    class="switch-root"
    :data-disabled="props.disabled || undefined"
    @mouseenter="setHovered(true)"
    @mouseleave="setHovered(false)"
  >
    <span
      class="control"
      :data-state="switchState"
      :data-checked="resolvedChecked || undefined"
      :data-disabled="props.disabled || undefined"
      :aria-checked="resolvedChecked"
      :data-focus-visible="isFocusVisible || undefined"
      :data-hover="isHovered || undefined"
    >
      <span
        class="thumb"
        :data-state="switchState"
        :data-checked="resolvedChecked || undefined"
      />
    </span>
    <span v-if="props.label" class="label">
      {{ props.label }}
    </span>
    <input
      ref="inputRef"
      class="switch-hidden-input"
      type="checkbox"
      role="switch"
      :checked="resolvedChecked"
      :disabled="props.disabled"
      :aria-checked="resolvedChecked"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </label>
</template>

<style scoped>
.switch-root {
  display: flex;
  position: relative;
  align-items: center;
  gap: var(--alt-space-2);
}

.switch-hidden-input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
}

.label {
  color: var(--alt-c-text-1);
  font-weight: var(--alt-font-weight-medium);
  font-size: var(--alt-font-size-2);
}

.control {
  background-color: var(--alt-c-surface-5);
  border-radius: var(--alt-radius-full);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 2.75rem;
  height: 1.5rem;
  padding: 0.125rem;
  transition: background-color var(--alt-transition-base) var(--alt-ease-in-out);
}

.control:is(
    :checked,
    [data-checked],
    [aria-checked="true"],
    [data-state="checked"]
  ) {
  background: var(--alt-c-brand-1-600);
}

.control[data-focus-visible] {
  outline: 2px solid var(--alt-c-brand-1-500);
  outline-offset: 2px;
}

.control[data-hover]:not([data-disabled]) {
  background-color: var(--alt-c-brand-1-400);
}

.thumb {
  background: var(--alt-c-white);
  border-radius: var(--alt-radius-full);
  box-shadow: var(--alt-shadow-1);
  width: 1.25rem;
  height: 1.25rem;
  transition:
    transform var(--alt-transition-base) var(--alt-ease-in-out),
    background-color var(--alt-transition-base) var(--alt-ease-in-out);
}

.thumb:is(
    :checked,
    [data-checked],
    [aria-checked="true"],
    [data-state="checked"]
  ) {
  transform: translateX(1.25rem);
}

.switch-root.small {
  .control {
    width: 1.925rem;
    height: 1.05rem;
    padding: 0.0875rem;
  }

  .thumb {
    width: 0.875rem;
    height: 0.875rem;
  }

  .thumb:is(
      :checked,
      [data-checked],
      [aria-checked="true"],
      [data-state="checked"]
    ) {
    transform: translateX(0.875rem);
  }

  .label {
    font-size: var(--alt-font-size-1);
  }
}
</style>
