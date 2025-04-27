<script setup lang="ts">
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
}

const props = withDefaults(defineProps<AltInputProps>(), {
  placeholder: "",
  type: "text",
  state: "default",
  label: "",
  required: false,
  disabled: false,
});

const modelValue = defineModel<string | number | boolean>();
</script>

<template>
  <div class="input-wrapper">
    <label v-if="props.label" class="input-label">
      {{ props.label }}
      <span v-if="props.required" class="required">*</span>
    </label>
    <input
      v-model="modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      class="base-input"
      :class="[props.state, { disabled: props.disabled }]"
    />
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--alt-space-1);
  width: 100%;
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
</style>
