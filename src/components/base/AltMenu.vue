<script setup lang="ts">
/**
 * @component AltMenu
 * @description Generic dropdown menu built on AltDropdown / AltDropdownMenu.
 * Supports array-driven items and fully custom content slot mode.
 *
 * @slot trigger - Element that triggers the menu
 * @slot content - Custom menu content (overrides default items rendering)
 * @slot default - Custom item rendering (receives :item scoped prop)
 *
 * @example
 * <AltMenu :items="[{ label: 'Edit' }, { label: 'Delete' }]">
 *   <template #trigger><AltButton class="text" icon="more" /></template>
 * </AltMenu>
 *
 */
import { computed, type PropType, useSlots } from "vue";

import AltDropdown from "./AltDropdown.vue";
import AltDropdownMenu, {
  type AltDropdownMenuItem,
} from "./AltDropdownMenu.vue";

type MenuItem = unknown;

const props = defineProps({
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

const emit = defineEmits<{
  (e: "select", value: string): void;
  (e: "openChange", isOpen: boolean): void;
}>();

const slots = useSlots();

const hasCustomContent = computed(() => {
  return typeof slots.content === "function";
});

function resolveItemValue(item: MenuItem, index: number): string {
  const source = toRecord(item);
  const rawValue = source[props.valueKey];
  if (typeof rawValue === "string" && rawValue.trim().length > 0) {
    return rawValue;
  }
  if (typeof rawValue === "number") {
    return String(rawValue);
  }

  return `item-${index}`;
}

function resolveItemLabel(item: MenuItem): string {
  const source = toRecord(item);
  const rawLabel = source[props.labelKey];
  if (typeof rawLabel === "string") {
    return rawLabel;
  }

  return "";
}

const normalizedItems = computed<AltDropdownMenuItem[]>(() => {
  return props.items.map((item, index) => {
    const source = toRecord(item);

    if (source.divider === true) {
      return {
        type: "separator",
        value: `separator-${index}`,
      };
    }

    return {
      type: "item",
      value: resolveItemValue(item, index),
      label: resolveItemLabel(item),
      icon: typeof source.icon === "string" ? source.icon : undefined,
      disabled: source.disabled === true,
      danger: source.danger === true,
      checked: source.checked === true,
      rightLabel:
        typeof source.rightLabel === "string" ? source.rightLabel : undefined,
      keepOpenOnSelect: source.keepOpenOnSelect === true,
    };
  });
});

const itemLookup = computed(() => {
  const map = new Map<string, MenuItem>();
  props.items.forEach((item, index) => {
    const source = toRecord(item);
    if (source.divider === true) {
      return;
    }

    map.set(resolveItemValue(item, index), item);
  });

  return map;
});

function handleOpenChange(isOpen: boolean): void {
  emit("openChange", isOpen);
}

function handleSelect(item: AltDropdownMenuItem): void {
  if (item.type !== "item") {
    return;
  }

  emit("select", item.value);
}

function toRecord(item: MenuItem): Record<string, unknown> {
  if (item && typeof item === "object") {
    return item as Record<string, unknown>;
  }

  return {};
}
</script>

<template>
  <div class="alt-menu">
    <AltDropdownMenu
      v-if="!hasCustomContent"
      trigger-class="menu-trigger"
      panel-class="menu-content"
      :close-on-select="closeOnSelect"
      :items="normalizedItems"
      @select="handleSelect"
      @open-change="handleOpenChange"
    >
      <template #trigger>
        <span class="menu-trigger-inner">
          <slot name="trigger" />
          <span v-if="showTriggerIndicator" class="menu-indicator">▼</span>
        </span>
      </template>

      <template #item="{ item }">
        <slot name="item" :item="(itemLookup.get(item.value) ?? item) as any">
          <slot :item="(itemLookup.get(item.value) ?? item) as any">
            {{ item.label }}
          </slot>
        </slot>
      </template>
    </AltDropdownMenu>

    <AltDropdown
      v-else
      trigger-class="menu-trigger"
      panel-class="menu-content"
      panel-role="menu"
      @open-change="handleOpenChange"
    >
      <template #trigger>
        <span class="menu-trigger-inner">
          <slot name="trigger" />
          <span v-if="showTriggerIndicator" class="menu-indicator">▼</span>
        </span>
      </template>

      <div class="custom-content">
        <slot name="content" />
      </div>
    </AltDropdown>
  </div>
</template>

<style scoped>
.alt-menu {
  display: inline-flex;
}

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

  .menu-trigger-inner {
    display: inline-flex;
    align-items: center;
    gap: var(--alt-space-2);
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
}

.custom-content {
  min-width: inherit;
}
</style>
