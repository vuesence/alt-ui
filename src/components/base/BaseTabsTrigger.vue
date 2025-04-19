<script setup lang="ts">
import { Tabs } from "@ark-ui/vue/tabs";

defineProps<{
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
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--alt-c-text-2);
  font-family: var(--alt-font-family-base);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
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
  box-shadow: var(--alt-shadow-2);
}
</style>
