<script setup lang="ts">
/**
 * @component AltInput
 * @description Text input with label, validation states, and v-model support.
 *
 * CSS Classes:
 * - `compact` — reduced padding and font size
 *
 * @cssclass compact - Smaller input size
 *
 * @example
 * <AltInput v-model="email" label="Email" type="email" required />
 *
 * @example
 * <AltInput v-model="name" state="error" placeholder="Enter name" />
 */
import { computed } from "vue";
import AltIcon from "../base/AltIcon.vue";

interface AltInputProps {
  /**
   * The placeholder text for the input
   */
  placeholder?: string;
  /**
   * The type of input (text, number, email, etc.)
   */
  type?: string;
  /**
   * The state of the input (default, error, success)
   */
  state?: "default" | "error" | "success";
  /**
   * The label text for the input
   */
  label?: string;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Show clear button on the right side
   */
  clearable?: boolean;
}

const props = withDefaults(defineProps<AltInputProps>(), {
  placeholder: "",
  type: "text",
  state: "default",
  label: "",
  required: false,
  disabled: false,
  clearable: false,
});

const modelValue = defineModel<string | number | boolean>();

const hasClearButton = computed(() => {
  if (!props.clearable || props.disabled) {
    return false;
  }

  if (modelValue.value === undefined || modelValue.value === null) {
    return false;
  }

  return String(modelValue.value).length > 0;
});

function clearInput() {
  modelValue.value = "";
}

defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="input-wrapper">
    <label v-if="props.label" class="input-label">
      {{ props.label }}
      <span v-if="props.required" class="required">*</span>
    </label>
    <div class="input-control" :class="{ 'has-clear': props.clearable }">
      <input
        v-bind="$attrs"
        v-model="modelValue"
        :type="props.type"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="props.disabled"
        class="base-input alt-input"
        :class="[props.state, { disabled: props.disabled }]"
      />
      <button
        v-if="hasClearButton"
        type="button"
        class="clear-btn"
        aria-label="Clear input"
        @click="clearInput"
      >
        <AltIcon name="interface/cancel" :size="14" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: var(--alt-space-1);
  width: 100%;
}

.input-control {
  position: relative;
  width: 100%;

  &.has-clear {
    .base-input {
      padding-right: calc(var(--alt-space-8) + var(--alt-space-1));
    }
  }
}

.input-label {
  font-size: var(--alt-font-size-1);
  color: var(--alt-c-text-2);
}

.required {
  color: var(--alt-c-danger);
  margin-left: var(--alt-space-1);
}

.base-input {
  width: 100%;
  padding: var(--alt-space-2) var(--alt-space-3);
  font-size: var(--alt-font-size-1);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  background-color: var(--alt-c-surface-1);
  color: var(--alt-c-text-1);
  transition: var(--alt-transition-all);
  outline: none;

  &:focus {
    border-color: var(--alt-c-brand-1-500);
    box-shadow: var(--alt-focus-ring);
  }

  &::placeholder {
    color: var(--alt-c-text-3);
    font-size: var(--alt-font-size-0);
  }

  &:hover:not(.disabled) {
    border-color: var(--alt-c-brand-1-400);
  }

  &.error {
    border-color: var(--alt-c-danger);
    &:focus {
      box-shadow: 0 0 0 3px var(--alt-c-danger);
    }
  }

  &.success {
    border-color: var(--alt-c-success);
  }

  &.disabled {
    background-color: var(--alt-c-surface-2);
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.clear-btn {
  position: absolute;
  top: 50%;
  right: var(--alt-space-2);
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border: none;
  border-radius: var(--alt-radius-sm);
  background: transparent;
  color: var(--alt-c-icon-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color var(--alt-duration-fast) var(--alt-ease-in-out),
    color var(--alt-duration-fast) var(--alt-ease-in-out);

  &:hover {
    background-color: var(--alt-c-surface-2);
    color: var(--alt-c-icon-default);
  }
}
</style>
