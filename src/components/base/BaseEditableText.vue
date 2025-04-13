<script setup lang="ts">
import { marked } from "marked";
import type { PropType } from "vue";

const modelValue = defineModel<string>();

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: false,
  },
  elementType: {
    type: String,
    default: "div",
  },
  variant: {
    type: String as PropType<"text" | "textarea" | "list" | "tags">,
    default: "text",
  },
  renderMarkdown: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  customClass: {
    type: [String, Array],
    default: "",
  },
});
</script>

<template>
  <textarea
    v-if="
      props.isEditable && props.variant === 'textarea' && !props.renderMarkdown
    "
    v-model="modelValue"
    :class="[
      'input-field',
      'input-field--textarea',
      { 'input-field--content': true },
      props.customClass,
    ]"
    :placeholder="placeholder"
  />
  <input
    v-else-if="props.isEditable && !props.renderMarkdown"
    v-model="modelValue"
    :class="['input-field', 'input-field--text', props.customClass]"
    type="text"
    :placeholder="placeholder"
  />
  <div
    v-else-if="!props.isEditable && props.renderMarkdown"
    class="content content--markdown"
    v-html="marked(modelValue || '')"
  />
  <component
    :is="props.elementType"
    v-else
    :class="['content', 'content--text', props.customClass]"
  >
    {{ modelValue }}
  </component>
</template>

<style scoped>
.input-field {
  outline: none;
  width: 100%;
  font-family: var(--lh-font-family-base);
  font-size: var(--lh-font-size-2);
  line-height: var(--lh-line-height-2);
  color: var(--lh-c-text-1);
  background-color: var(--lh-c-surface-3);
  border: none;
  border-radius: var(--lh-radius-base);
  padding: var(--lh-space-1) var(--lh-space-2);
  transition: var(--lh-transition-all);

  &:hover {
    background-color: var(--lh-c-surface-4);
  }

  &:focus {
    background-color: var(--lh-c-surface-4);
    box-shadow: var(--lh-focus-ring);
  }
}

.input-field--text {
  min-height: var(--lh-space-6);
}

.input-field--textarea {
  resize: vertical;
  min-height: 8rem;
}

.content {
  color: var(--lh-c-text-1);
  line-height: calc(var(--lh-line-height-2) * var(--lh-spacing-scale));
}

.content--text {
  white-space: pre-wrap;
}
</style>
