<script setup lang="ts">
import { Tabs } from "@ark-ui/vue/tabs";
import { ref } from "vue";

const value = ref("tab2");
</script>

<template>
  <Tabs.Root v-model="value">
    <Tabs.List class="tabs-list">
      <slot name="tabs"></slot>
    </Tabs.List>
    <slot name="content">
      <slot></slot>
    </slot>
  </Tabs.Root>
</template>

<style scoped>
.tabs-list {
  display: flex;
  gap: 2px;
  padding: 4px;
  background-color: var(--alt-c-bg);
  border: 1px solid var(--alt-c-border);
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: var(--alt-shadow-1);
}
</style>
