<script setup lang="ts">
interface BaseInputProps {
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

const props = withDefaults(defineProps<BaseInputProps>(), {
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
  gap: var(--lh-space-1);
  width: 100%;
}

.input-label {
  font-size: var(--lh-font-size-1);
  color: var(--lh-c-text-2);
}

.required {
  color: var(--lh-c-danger);
  margin-left: var(--lh-space-1);
}

.base-input {
  width: 100%;
  padding: var(--lh-space-2) var(--lh-space-3);
  font-size: var(--lh-font-size-1);
  border: 1px solid var(--lh-c-border);
  border-radius: var(--lh-radius-base);
  background-color: var(--lh-c-surface-1);
  color: var(--lh-c-text-1);
  transition: var(--lh-transition-all);
  outline: none;

  &:focus {
    border-color: var(--lh-c-brand-1-500);
    box-shadow: var(--lh-focus-ring);
  }

  &::placeholder {
    color: var(--lh-c-text-3);
    font-size: var(--lh-font-size-0);
  }

  &:hover:not(.disabled) {
    border-color: var(--lh-c-brand-1-400);
  }

  &.error {
    border-color: var(--lh-c-danger);
    &:focus {
      box-shadow: 0 0 0 3px var(--lh-c-danger);
    }
  }

  &.success {
    border-color: var(--lh-c-success);
  }

  &.disabled {
    background-color: var(--lh-c-surface-2);
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>
