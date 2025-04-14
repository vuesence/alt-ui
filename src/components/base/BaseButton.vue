<script setup lang="ts">
import { useRouter } from "vue-router";
// import { router } from "@/app/router";
// import type { ButtonProps } from "../types/components";
import BaseSpinner from "./BaseSpinner.vue";

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
});

const emit = defineEmits(["click"]);

function click(event: MouseEvent) {
  if (props.to) {
    const to = typeof props.to === "object" ? props.to : { name: props.to };
    router.push(to);
  } else {
    emit("click", event);
  }
}
</script>

<template>
  <button class="base-button" :disabled="disabled" @click="click">
    <slot />
    <BaseSpinner v-if="loading" class="spinner" />
  </button>
</template>

<style scoped>
.base-button {
  font-size: var(--lh-font-size-1);
  font-variant-numeric: tabular-nums;
  color: var(--lh-c-text-3);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--lh-space-3) var(--lh-space-6);
  font-weight: var(--lh-font-weight-regular);
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: var(--lh-c-surface-2);
  border: 1px solid var(--lh-c-brand-1-200);
  box-shadow: var(--lh-shadow-1);
  border-radius: var(--lh-radius-base);
  outline: 0;
  transition:
    color var(--lh-transition-colors),
    background-color var(--lh-transition-colors),
    border-color var(--lh-transition-colors),
    box-shadow var(--lh-transition-colors);

  &:hover:not(:disabled) {
    background-color: var(--lh-c-surface-2);
    border-color: var(--lh-c-brand-1-400);
  }

  &:focus-visible {
    box-shadow: var(--lh-focus-ring);
  }

  &.primary {
    background-color: var(--lh-c-brand-1);
    border-color: var(--lh-c-brand-1);
    color: var(--lh-c-white);

    &:hover:not(:disabled) {
      background-color: var(--lh-c-brand-1-600);
      border-color: var(--lh-c-brand-1-600);
    }
  }

  &.secondary {
    background-color: var(--lh-c-surface-2);
    border-color: var(--lh-c-brand-1-200);
    color: var(--lh-c-text-2);

    &:hover:not(:disabled) {
      background-color: var(--lh-c-surface-3);
      color: var(--lh-c-text-1);
    }
  }

  &.text {
    background-color: transparent;
    border-color: transparent;
    color: var(--lh-c-text-2);
    padding: var(--lh-space-2) var(--lh-space-3);

    &:hover:not(:disabled) {
      background-color: var(--lh-c-surface-2);
      color: var(--lh-c-text-1);
    }
  }

  &.small {
    font-size: var(--lh-font-size-0);
    padding: var(--lh-space-2) var(--lh-space-4);
  }

  &.large {
    font-size: var(--lh-font-size-2);
    padding: var(--lh-space-4) var(--lh-space-8);
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
  margin-left: var(--lh-space-2);
}
</style>
