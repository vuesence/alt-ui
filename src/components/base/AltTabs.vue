<script setup lang="ts">
/**
 * @component AltTabs
 * @description Tab container component with keyboard navigation support.
 * Use together with AltTabsTrigger.
 *
 * @example
 * <AltTabs v-model="activeTab">
 *   <template #tabs>
 *     <AltTabsTrigger value="tab1">Tab 1</AltTabsTrigger>
 *     <AltTabsTrigger value="tab2">Tab 2</AltTabsTrigger>
 *   </template>
 *   <template #content="{ activeValue }">
 *     <div v-if="activeValue === 'tab1'">Content 1</div>
 *     <div v-else-if="activeValue === 'tab2'">Content 2</div>
 *   </template>
 * </AltTabs>
 *
 * @slot tabs - Tab trigger buttons
 * @slot content - Tab content panels
 * @slot default - Alternative to content slot, receives { activeValue }
 */
import { computed, provide, ref } from "vue";

import { ALT_TABS_CONTEXT } from "./tabs-context";

const props = defineProps<{ modelValue?: string }>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const triggerEntries: Array<{ value: string; element: HTMLElement }> = [];
const uncontrolledValue = ref(props.modelValue ?? "");
const isControlled = computed(() => props.modelValue !== undefined);
const activeValue = computed(() => {
  if (isControlled.value) {
    return props.modelValue ?? "";
  }

  return uncontrolledValue.value;
});

function setActiveValue(value: string): void {
  if (!isControlled.value) {
    uncontrolledValue.value = value;
  }

  emit("update:modelValue", value);
}

function isSelected(value: string): boolean {
  return activeValue.value === value;
}

function selectTab(value: string): void {
  if (activeValue.value === value) {
    return;
  }

  setActiveValue(value);
}

function registerTrigger(value: string, element: HTMLElement): void {
  const exists = triggerEntries.some(
    (entry) => entry.value === value && entry.element === element,
  );
  if (exists) {
    return;
  }

  triggerEntries.push({ value, element });
  if (!isControlled.value && !uncontrolledValue.value) {
    uncontrolledValue.value = value;
  }
}

function unregisterTrigger(value: string, element: HTMLElement): void {
  const index = triggerEntries.findIndex((entry) => {
    return entry.value === value && entry.element === element;
  });
  if (index === -1) {
    return;
  }

  triggerEntries.splice(index, 1);

  if (!isControlled.value && uncontrolledValue.value === value) {
    uncontrolledValue.value = triggerEntries[0]?.value ?? "";
  }
}

function focusSibling(
  currentValue: string,
  direction: "next" | "previous" | "first" | "last",
): void {
  if (triggerEntries.length === 0) {
    return;
  }

  const entries = triggerEntries;
  if (direction === "first") {
    entries[0].element.focus();
    selectTab(entries[0].value);
    return;
  }

  if (direction === "last") {
    const last = entries[entries.length - 1];
    last.element.focus();
    selectTab(last.value);
    return;
  }

  const currentIndex = entries.findIndex((entry) => entry.value === currentValue);
  if (currentIndex === -1) {
    return;
  }

  const delta = direction === "next" ? 1 : -1;
  const nextIndex = (currentIndex + delta + entries.length) % entries.length;
  const nextEntry = entries[nextIndex];
  nextEntry.element.focus();
  selectTab(nextEntry.value);
}

provide(ALT_TABS_CONTEXT, {
  activeValue,
  selectTab,
  isSelected,
  registerTrigger,
  unregisterTrigger,
  focusSibling,
});
</script>

<template>
  <div class="tabs-root">
    <div class="tabs-list" role="tablist" aria-orientation="horizontal">
      <slot name="tabs"></slot>
    </div>
    <slot name="content" :active-value="activeValue">
      <slot :active-value="activeValue"></slot>
    </slot>
  </div>
</template>

<style scoped>
.tabs-list {
  display: flex;
  gap: var(--alt-space-0);
  padding: var(--alt-space-1);
  background-color: var(--alt-c-bg);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-lg);
  margin-bottom: var(--alt-space-4);
  box-shadow: var(--alt-shadow-1);
}
</style>
