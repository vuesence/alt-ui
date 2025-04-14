<script setup lang="ts">
import { Menu } from "@ark-ui/vue/menu";
import { type PropType } from "vue";

interface MenuItem {
  [key: string]: any;
}

defineProps({
  items: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  labelKey: {
    type: String,
    default: "label",
  },
  valueKey: {
    type: String,
    default: "value",
  },
  showTriggerIndicator: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Menu.Root>
    <Menu.Trigger class="menu-trigger">
      <slot name="trigger" />
      <Menu.Indicator v-if="showTriggerIndicator" class="menu-indicator"
        >▼</Menu.Indicator
      >
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class="menu-content">
        <Menu.Item
          v-for="item in items"
          :key="item[labelKey]"
          :value="item[valueKey]"
          class="menu-item"
        >
          <slot :item="item">
            {{ item[labelKey] }}
          </slot>
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>

<style scoped>
.menu-trigger {
  display: flex;
  align-items: center;
  gap: var(--lh-space-2);
  cursor: pointer;
  padding: var(--lh-space-2) var(--lh-space-3);
  border-radius: var(--lh-radius-base);
  transition: background-color var(--lh-transition-fast);
  &:focus-visible {
    outline: 1px solid var(--lh-c-brand-2);
  }
}

.menu-trigger:hover {
  background-color: var(--lh-c-surface-2);
}

.menu-indicator {
  font-size: var(--lh-font-size-00);
  transition: transform var(--lh-transition-fast);
}

[data-expanded] .menu-indicator {
  transform: rotate(180deg);
}

.menu-content {
  background-color: var(--lh-c-surface-1);
  border-radius: var(--lh-radius-base);
  box-shadow: var(--lh-shadow-2);
  min-width: 180px;
  transform-origin: top;
  animation: menuSlide var(--lh-transition-base);
  &:focus-visible {
    outline: 1px solid var(--lh-c-brand-2);
  }
  .menu-item {
    padding: var(--lh-space-2) var(--lh-space-3);
    cursor: pointer;
    &:hover {
      background-color: var(--lh-c-surface-2);
    }
  }
}
</style>
