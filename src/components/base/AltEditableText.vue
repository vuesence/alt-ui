<script setup lang="ts">
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
    type: String as PropType<"text" | "textarea" | "list" | "tags" | "labResultsTable">,
    default: "text",
  },
  renderMarkdown: {
    type: Boolean,
    default: false,
  },
  renderedHtml: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  customClass: {
    type: [String, Array],
    default: "",
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  collapsedText: {
    type: String,
    default: "Click to expand",
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
  <details
    v-else-if="!props.isEditable && props.renderMarkdown && props.collapsed"
    :open="false"
    class="collapsible-content"
  >
    <summary class="content-summary">
      {{ props.collapsedText }}
    </summary>
    <div class="content content--markdown" v-html="props.renderedHtml" />
  </details>
  <div
    v-else-if="!props.isEditable && props.renderMarkdown"
    class="content content--markdown"
    v-html="props.renderedHtml"
  />
  <details
    v-else-if="!props.isEditable && props.collapsed"
    :open="false"
    class="collapsible-content"
  >
    <summary class="content-summary">
      {{ props.collapsedText }}
    </summary>
    <component
      :is="props.elementType"
      :class="['content', 'content--text', props.customClass]"
    >
      {{ modelValue }}
    </component>
  </details>
  <component
    v-else
    :is="props.elementType"
    :class="['content', 'content--text', props.customClass]"
  >
    {{ modelValue }}
  </component>
</template>

<style scoped>
.input-field {
  outline: none;
  width: 100%;
  font-family: var(--alt-font-family-base);
  font-size: var(--alt-font-size-2);
  line-height: var(--alt-line-height-2);
  color: var(--alt-c-text-1);
  background-color: var(--alt-c-surface-3);
  border: none;
  border-radius: var(--alt-radius-base);
  padding: var(--alt-space-1) var(--alt-space-2);
  transition: var(--alt-transition-all);

  &:hover {
    background-color: var(--alt-c-surface-4);
  }

  &:focus {
    background-color: var(--alt-c-surface-4);
    box-shadow: var(--alt-focus-ring);
  }
}

.input-field--text {
  min-height: var(--alt-space-7);
}

.input-field--textarea {
  resize: vertical;
  min-height: 8rem;
}

.content {
  color: var(--alt-c-text-1);
  line-height: calc(var(--alt-line-height-2) * var(--alt-spacing-scale));
}

.content--text {
  white-space: pre-wrap;
}

.collapsible-content {
  width: 100%;
  color: var(--alt-c-text-1);
}

.content-summary {
  cursor: pointer;
  font-weight: var(--alt-font-weight-medium);
  color: var(--alt-c-text-1);
  padding: var(--alt-space-1) 0;
  border-radius: var(--alt-radius-base);
  margin-bottom: var(--alt-space-4);

  &:hover {
    color: var(--alt-c-brand-1-500);
  }
}
</style>
