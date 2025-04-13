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
  color: var(--lh-c-text-2);
  font-family: var(--lh-font-family-base);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
}

.tab-trigger:hover {
  color: var(--lh-c-text-1);
  background-color: var(--lh-c-bg-alt);
}

.tab-trigger[data-selected] {
  color: var(--lh-c-text-1);
  background-color: var(--lh-c-bg);
  box-shadow: var(--lh-shadow-1);
}

.tab-trigger:focus-visible {
  outline: none;
  box-shadow: var(--lh-shadow-2);
}
</style>
