<script setup lang="ts">
/**
 * @component AltTabs
 * @description Tab container component wrapping Ark-UI Tabs.
 * Use with AltTabsTrigger for tab headers.
 *
 * @example
 * <AltTabs v-model="activeTab">
 *   <template #tabs>
 *     <AltTabsTrigger value="tab1">Tab 1</AltTabsTrigger>
 *     <AltTabsTrigger value="tab2">Tab 2</AltTabsTrigger>
 *   </template>
 *   <template #content>
 *     <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *     <Tabs.Content value="tab2">Content 2</Tabs.Content>
 *   </template>
 * </AltTabs>
 *
 * @slot tabs - Tab trigger buttons
 * @slot content - Tab content panels
 * @slot default - Alternative to content slot
 * @dependency @ark-ui/vue - Tabs component
 */
import { ref, watch } from "vue";
import { Tabs } from "@ark-ui/vue/tabs";

const props = withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: "",
});

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const activeValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (v) => {
    activeValue.value = v ?? "";
  },
  { immediate: true },
);

watch(activeValue, (v) => {
  emit("update:modelValue", v);
});

function handleValueUpdate(v: string) {
  activeValue.value = v;
}
</script>

<template>
  <Tabs.Root
    :model-value="activeValue"
    @update:model-value="handleValueUpdate"
  >
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
  gap: var(--alt-space-0);
  padding: var(--alt-space-1);
  background-color: var(--alt-c-bg);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-lg);
  margin-bottom: var(--alt-space-4);
  box-shadow: var(--alt-shadow-1);
}
</style>
