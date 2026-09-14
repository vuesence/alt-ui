<script setup lang="ts">
/**
 * @component DropdownMenuItemButton
 * @description Renders a single actionable (or fallback) dropdown menu item
 * button for the root panel and recursive submenu panels.
 */
import AltIcon from "./AltIcon.vue";
import type {
  AltDropdownMenuItem,
  AltDropdownMenuIconVariant,
} from "./AltDropdownMenu.vue";

interface Props {
  item: AltDropdownMenuItem;
  level: number;
  path: string[];
  pathKey: string;
  hasSubmenu: boolean;
  isSubmenuOpen: boolean;
  iconVariant: AltDropdownMenuIconVariant;
  submenu?: boolean;
  register: (pathKey: string, element: unknown) => void;
}

const props = withDefaults(defineProps<Props>(), {
  submenu: false,
});
</script>

<template>
  <button
    :ref="(element) => props.register(props.pathKey, element)"
    type="button"
    class="item"
    :class="{
      danger: item.danger,
      'submenu-open': isSubmenuOpen,
      'submenu-item': submenu,
    }"
    :disabled="item.disabled"
    role="menuitem"
    tabindex="-1"
    data-menu-item="true"
    :data-path-key="pathKey"
    :aria-haspopup="hasSubmenu ? 'menu' : undefined"
    :aria-expanded="hasSubmenu ? isSubmenuOpen : undefined"
  >
    <slot
      name="item"
      :item="item"
      :has-submenu="hasSubmenu"
      :level="level"
      :path="path"
    >
      <span class="item-main">
        <AltIcon
          v-if="item.icon"
          :name="item.icon"
          :size="18"
          :variant="iconVariant"
          class="icon"
        />
        <span class="label">{{ item.label }}</span>
      </span>
      <span class="item-meta">
        <span v-if="item.rightLabel" class="right-label">
          {{ item.rightLabel }}
        </span>
        <AltIcon
          v-if="item.checked"
          name="interface/check"
          :size="16"
          variant="success"
          class="check-icon"
        />
        <AltIcon
          v-if="hasSubmenu"
          name="chevron-right"
          :size="16"
          variant="muted"
          class="submenu-indicator"
        />
      </span>
    </slot>
  </button>
</template>

<style scoped>
.item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--alt-space-3);
  cursor: pointer;
  padding: var(--alt-space-3) var(--alt-space-4);
  color: var(--alt-c-text-2);
  border: none;
  background: transparent;
  text-align: left;
  font-size: var(--alt-font-size-1);
  font-weight: var(--alt-font-weight-medium);
  letter-spacing: var(--alt-letter-spacing-wide);

  .item-main {
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: var(--alt-space-3);
    flex: 1;
  }

  .icon {
    flex-shrink: 0;
  }

  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-meta {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: var(--alt-space-2);
    flex-shrink: 0;
  }

  .right-label {
    color: var(--alt-c-text-3);
    font-size: var(--alt-font-size-1);
    font-weight: var(--alt-font-weight-medium);
    letter-spacing: normal;
  }

  &:hover:enabled,
  &:focus-visible,
  &.submenu-open {
    background: var(--alt-c-surface-2);
    color: var(--alt-c-text-1);
    outline: none;
  }

  &:disabled {
    opacity: var(--alt-c-disabled-opacity);
    cursor: not-allowed;
  }

  &.danger {
    color: var(--alt-c-danger);
  }
}
</style>
