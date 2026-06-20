<script setup lang="ts">
/**
 * @component AltTabsTrigger
 * @description Individual tab trigger button. Use inside AltTabs' tabs slot.
 *
 * @example
 * <AltTabsTrigger value="settings">Settings</AltTabsTrigger>
 *
 * @slot default - Tab label content
 */
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue";

import { ALT_TABS_CONTEXT } from "./tabs-context";

const props = withDefaults(
  defineProps<{
    value: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const triggerRef = ref<HTMLButtonElement | null>(null);
const tabsContext = inject(ALT_TABS_CONTEXT, null);

const isSelected = computed(() => {
  if (!tabsContext) {
    return false;
  }

  return tabsContext.isSelected(props.value);
});

const tabIndex = computed(() => {
  if (props.disabled) {
    return -1;
  }

  return isSelected.value ? 0 : -1;
});

onMounted(() => {
  if (!tabsContext || !triggerRef.value) {
    return;
  }

  tabsContext.registerTrigger(props.value, triggerRef.value);
});

onBeforeUnmount(() => {
  if (!tabsContext || !triggerRef.value) {
    return;
  }

  tabsContext.unregisterTrigger(props.value, triggerRef.value);
});

function handleClick(): void {
  if (!tabsContext || props.disabled) {
    return;
  }

  tabsContext.selectTab(props.value);
}

function handleKeydown(event: KeyboardEvent): void {
  if (!tabsContext || props.disabled) {
    return;
  }

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    tabsContext.focusSibling(props.value, "next");
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    tabsContext.focusSibling(props.value, "previous");
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    tabsContext.focusSibling(props.value, "first");
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    tabsContext.focusSibling(props.value, "last");
  }
}
</script>

<template>
  <button
    ref="triggerRef"
    type="button"
    role="tab"
    class="tab-trigger"
    :data-selected="isSelected || undefined"
    :aria-selected="isSelected"
    :aria-disabled="props.disabled || undefined"
    :tabindex="tabIndex"
    :disabled="props.disabled"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.tab-trigger {
  position: relative;
  padding: var(--alt-space-2) var(--alt-space-4);
  border-radius: var(--alt-radius-md);
  border: none;
  background: transparent;
  color: var(--alt-c-text-2);
  font-family: var(--alt-font-family-base);
  font-weight: var(--alt-font-weight-medium);
  cursor: pointer;
  transition: all var(--alt-duration-base) var(--alt-ease-in-out);
}

.tab-trigger:hover {
  color: var(--alt-c-text-1);
  background-color: var(--alt-c-bg-alt);
}

.tab-trigger:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.tab-trigger[data-selected] {
  color: var(--alt-c-text-1);
  background-color: var(--alt-c-bg);
  box-shadow: var(--alt-shadow-1);
}

.tab-trigger:focus-visible {
  outline: none;
  box-shadow: var(--alt-focus-ring);
}
</style>
