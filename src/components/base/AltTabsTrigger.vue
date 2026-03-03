<script setup lang="ts">
/**
 * @component AltTabsTrigger
 * @description Individual tab trigger button. Use inside AltTabs' tabs slot.
 *
 * @example
 * <AltTabsTrigger value="settings">Settings</AltTabsTrigger>
 *
 * @slot default - Tab label content
 * @dependency @ark-ui/vue - Tabs component
 */
import { Tabs } from "@ark-ui/vue/tabs";

defineProps<{
  /** Tab value identifier */
  value: string;
}>();
</script>

<template>
  <Tabs.Trigger :value="value" class="tab-trigger">
    <slot></slot>
  </Tabs.Trigger>
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
