<script setup lang="ts">
import { Checkbox, type CheckboxCheckedState } from "@ark-ui/vue/checkbox";
import { computed } from "vue";
import { AltIcon } from "../base";

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

const checked = computed({
  get: () => (props.indeterminate ? "indeterminate" : props.modelValue),
  set: (value: CheckboxCheckedState) => {
    if (value !== "indeterminate") {
      emit("update:modelValue", value);
    }
  },
});
</script>

<template>
  <Checkbox.Root
    v-model:checked="checked"
    :disabled="props.disabled"
    class="base-checkbox"
  >
    <Checkbox.Control class="checkbox-control">
      <Checkbox.Indicator>
        <AltIcon name="check" size="16" class="checkbox-icon" />
      </Checkbox.Indicator>
      <Checkbox.Indicator indeterminate>
        <AltIcon name="minus" size="16" class="checkbox-icon" />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class="checkbox-label">
      <span v-if="props.label">{{ props.label }}</span>
      <slot />
    </Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--alt-space-2);
  cursor: pointer;
  user-select: none;
}

.base-checkbox[data-disabled] {
  cursor: not-allowed;
  opacity: 0.6;
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
