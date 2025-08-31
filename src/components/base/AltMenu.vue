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
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <Menu.Root :close-on-select="closeOnSelect">
    <Menu.Trigger class="menu-trigger">
      <slot name="trigger" />
      <Menu.Indicator v-if="showTriggerIndicator" class="menu-indicator"
        >▼</Menu.Indicator
      >
    </Menu.Trigger>
    <Menu.Positioner class="menu-positioner">
      <Menu.Content class="menu-content">
        <!-- Use custom content slot if provided, otherwise use default items rendering -->
        <slot name="content">
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
        </slot>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>

<style scoped>
.menu-trigger {
  display: flex;
  align-items: center;
  gap: var(--alt-space-2);
  cursor: pointer;
  padding: var(--alt-space-2) var(--alt-space-3);
  border-radius: var(--alt-radius-base);
  transition: background-color var(--alt-transition-fast);
  &:focus-visible {
    outline: 1px solid var(--alt-c-brand-2);
  }
}

.menu-trigger:hover {
  background-color: var(--alt-c-surface-2);
}

.menu-indicator {
  font-size: var(--alt-font-size-00);
  transition: transform var(--alt-transition-fast);
}

[data-expanded] .menu-indicator {
  transform: rotate(180deg);
}

.menu-positioner {
  position: relative;
  z-index: var(--alt-z-dropdown);
}

.menu-content {
  background-color: var(--alt-c-surface-1);
  border-radius: var(--alt-radius-base);
  border: 1px solid var(--alt-c-border);
  box-shadow: var(--alt-shadow-3);
  min-width: 180px;
  transform-origin: top;
  animation: menuSlide var(--alt-transition-base);
  z-index: var(--alt-z-dropdown);
  &:focus-visible {
    outline: 1px solid var(--alt-c-brand-2);
  }
  .menu-item {
    padding: var(--alt-space-2) var(--alt-space-3);
    cursor: pointer;
    &:hover {
      background-color: var(--alt-c-surface-2);
    }
  }
}
</style>
