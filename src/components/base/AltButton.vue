<script setup lang="ts">
import { useRouter } from "vue-router";
// import { router } from "@/app/router";
// import type { ButtonProps } from "../types/components";
import AltSpinner from "./AltSpinner.vue";

const router = useRouter();

const props = defineProps({
  to: {
    type: [String, Object],
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
});

const emit = defineEmits(["click"]);

function click(event: MouseEvent) {
  // If this is a submit button, don't interfere with normal submit behavior
  // The form's @submit.prevent will handle preventing default
  if (props.type === "submit") {
    return;
  }
  
  if (props.to) {
    const to = typeof props.to === "object" ? props.to : { name: props.to };
    router.push(to);
  } else {
    emit("click", event);
  }
}
</script>

<template>
  <button :type="type" class="base-button alt-button" :disabled="disabled" @click="click">
    <slot />
    <AltSpinner v-if="loading" class="spinner" />
  </button>
</template>

<style scoped>
.base-button {
  font-size: var(--alt-font-size-1);
  font-variant-numeric: tabular-nums;
  color: var(--alt-c-text-3);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--alt-space-3) var(--alt-space-6);
  font-weight: var(--alt-font-weight-regular);
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: var(--alt-c-surface-2);
  border: 1px solid var(--alt-c-brand-1-200);
  box-shadow: var(--alt-shadow-1);
  border-radius: var(--alt-radius-base);
  outline: 0;
  transition:
    color var(--alt-transition-colors),
    background-color var(--alt-transition-colors),
    border-color var(--alt-transition-colors),
    box-shadow var(--alt-transition-colors);

  &:hover:not(:disabled) {
    background-color: var(--alt-c-surface-2);
    border-color: var(--alt-c-brand-1-400);
  }

  &:focus-visible {
    box-shadow: var(--alt-focus-ring);
  }

  &.primary {
    background-color: var(--alt-c-brand-1);
    border-color: var(--alt-c-brand-1);
    color: var(--alt-c-white);

    &:hover:not(:disabled) {
      background-color: var(--alt-c-brand-1-600);
      border-color: var(--alt-c-brand-1-600);
    }
  }

  &.secondary {
    background-color: var(--alt-c-surface-2);
    border-color: var(--alt-c-brand-1-200);
    color: var(--alt-c-text-2);

    &:hover:not(:disabled) {
      background-color: var(--alt-c-surface-3);
      color: var(--alt-c-text-1);
    }
  }

  &.text {
    background-color: transparent;
    border-color: transparent;
    color: var(--alt-c-text-2);
    padding: var(--alt-space-2) var(--alt-space-3);

    &:hover:not(:disabled) {
      background-color: var(--alt-c-surface-2);
      color: var(--alt-c-text-1);
    }
  }

  &.small {
    font-size: var(--alt-font-size-0);
    padding: var(--alt-space-2) var(--alt-space-4);
  }

  &.large {
    font-size: var(--alt-font-size-2);
    padding: var(--alt-space-4) var(--alt-space-8);
  }

  &.wide {
    width: 100%;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.spinner {
  margin-left: var(--alt-space-2);
}
</style>
