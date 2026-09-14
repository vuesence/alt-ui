<script setup lang="ts">
/**
 * @component AltDropdownMenu
 * @description Dropdown menu built on AltDropdown with recursive nested panels.
 */
import { nextTick, ref } from "vue";

import DropdownMenuItemButton from "./DropdownMenuItemButton.vue";
import AltDropdown from "./AltDropdown.vue";
import { useDropdownMenuElements } from "../../composables/useDropdownMenuElements";
import { useDropdownMenuKeyboard } from "../../composables/useDropdownMenuKeyboard";
import { useDropdownMenuPositioning } from "../../composables/useDropdownMenuPositioning";
import {
  ROOT_PANEL_KEY,
  useDropdownMenuState,
} from "../../composables/useDropdownMenuState";

export type AltDropdownMenuItemType = "item" | "separator" | "message";
export type AltDropdownMenuIconVariant =
  | "default"
  | "muted"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "secondary"
  | "accent";

export interface AltDropdownMenuItem {
  type?: AltDropdownMenuItemType;
  value: string;
  label?: string;
  icon?: string;
  iconVariant?: AltDropdownMenuIconVariant;
  disabled?: boolean;
  danger?: boolean;
  checked?: boolean;
  rightLabel?: string;
  keepOpenOnSelect?: boolean;
  items?: AltDropdownMenuItem[];
}

interface Props {
  items: AltDropdownMenuItem[];
  triggerLabel?: string;
  triggerTitle?: string;
  triggerIcon?: string;
  triggerClass?: string;
  showTriggerLabel?: boolean;
  menuClass?: string;
  panelClass?: string;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  closeOnSelect?: boolean;
  offset?: number;
  minWidth?: number;
  maxWidth?: number;
  matchTriggerWidth?: boolean;
  viewportPadding?: number;
  submenuOffset?: number;
}

const props = withDefaults(defineProps<Props>(), {
  triggerLabel: "",
  triggerTitle: "",
  triggerIcon: "settings",
  triggerClass: "secondary icon-only",
  showTriggerLabel: false,
  menuClass: "",
  panelClass: "",
  placement: "bottom-end",
  closeOnSelect: true,
  offset: 8,
  minWidth: 220,
  maxWidth: 360,
  matchTriggerWidth: false,
  viewportPadding: 8,
  submenuOffset: 6,
});

const emit = defineEmits<{
  (e: "select", item: AltDropdownMenuItem): void;
  (e: "openChange", isOpen: boolean): void;
}>();

const dropdownRef = ref<InstanceType<typeof AltDropdown> | null>(null);

const state = useDropdownMenuState(() => props.items);
const elements = useDropdownMenuElements();

const {
  isOpen,
  normalizedItems,
  hasActionItems,
  openPanelDescriptors,
  hasNestedItems,
  resolveIconVariant,
  toPathKey,
  buildItemPath,
  isItemPathOpen,
  openSubmenuForPath,
  normalizeOpenPath,
  closeOpenPath,
} = state;

const {
  setMenuSurfaceRef,
  setTriggerRef,
  setPanelRef,
  focusFirstPanelButton,
} = elements;

const positioning = useDropdownMenuPositioning({
  isOpen,
  openPanelDescriptors,
  elements,
  viewportPadding: () => props.viewportPadding,
  submenuOffset: () => props.submenuOffset,
});

const { getPanelStyle, resetPanelPositions } = positioning;

function closeMenu(restoreFocus = false): void {
  closeOpenPath();
  dropdownRef.value?.close({ restoreFocus });
}

function emitSelection(item: AltDropdownMenuItem): void {
  emit("select", item);
  if (!props.closeOnSelect || item.keepOpenOnSelect) {
    return;
  }

  closeMenu(true);
}

function handleItemPointerEnter(
  item: AltDropdownMenuItem,
  itemPath: string[],
  parentPath: string[],
): void {
  if (hasNestedItems(item)) {
    openSubmenuForPath(itemPath);
    return;
  }

  state.openPath.value = normalizeOpenPath(parentPath);
}

function handleItemFocus(
  item: AltDropdownMenuItem,
  itemPath: string[],
  parentPath: string[],
): void {
  if (hasNestedItems(item)) {
    openSubmenuForPath(itemPath);
    return;
  }

  state.openPath.value = normalizeOpenPath(parentPath);
}

function handleItemClick(
  item: AltDropdownMenuItem,
  itemPath: string[],
  parentPath: string[],
): void {
  if (item.type !== "item" || item.disabled) {
    return;
  }

  if (hasNestedItems(item)) {
    openSubmenuForPath(itemPath);
    nextTick(() => {
      focusFirstPanelButton(toPathKey(itemPath));
    });
    return;
  }

  emitSelection(item);
  if (!props.closeOnSelect || item.keepOpenOnSelect) {
    state.openPath.value = normalizeOpenPath(parentPath);
  }
}

function handleOpenChange(nextOpen: boolean): void {
  isOpen.value = nextOpen;
  emit("openChange", nextOpen);

  if (!nextOpen) {
    closeOpenPath();
    resetPanelPositions();
    return;
  }

  nextTick(() => {
    focusFirstPanelButton(ROOT_PANEL_KEY);
  });
}

const { handlePanelKeydown } = useDropdownMenuKeyboard({
  state,
  elements,
  closeMenu,
  handleItemClick,
});
</script>

<template>
  <AltDropdown
    v-if="hasActionItems"
    ref="dropdownRef"
    class="alt-dropdown-menu"
    :menu-class="menuClass"
    :panel-class="panelClass"
    :trigger-label="triggerLabel"
    :trigger-title="triggerTitle"
    :trigger-icon="triggerIcon"
    :trigger-class="triggerClass"
    :show-trigger-label="showTriggerLabel"
    :placement="placement"
    :offset="offset"
    :min-width="minWidth"
    :max-width="maxWidth"
    :match-trigger-width="matchTriggerWidth"
    :viewport-padding="viewportPadding"
    panel-role="menu"
    @open-change="handleOpenChange"
  >
    <template v-if="$slots.trigger" #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps" />
    </template>

    <div
      :ref="setMenuSurfaceRef"
      class="menu-surface"
      @keydown="handlePanelKeydown(ROOT_PANEL_KEY, $event)"
    >
      <template v-for="item in normalizedItems" :key="`root-${item.value}`">
        <hr
          v-if="item.type === 'separator'"
          class="separator"
          role="separator"
        />

        <p v-else-if="item.type === 'message'" class="message">
          {{ item.label }}
        </p>

        <DropdownMenuItemButton
          v-else
          :item="item"
          :level="0"
          :path="[item.value]"
          :path-key="toPathKey([item.value])"
          :has-submenu="hasNestedItems(item)"
          :is-submenu-open="isItemPathOpen([item.value])"
          :icon-variant="resolveIconVariant(item)"
          :register="setTriggerRef"
          @pointerenter="handleItemPointerEnter(item, [item.value], [])"
          @focus="handleItemFocus(item, [item.value], [])"
          @click="handleItemClick(item, [item.value], [])"
        >
          <template v-if="$slots.item" #item="slotProps">
            <slot name="item" v-bind="slotProps" />
          </template>
        </DropdownMenuItemButton>
      </template>
    </div>

    <div
      v-for="descriptor in openPanelDescriptors"
      :key="descriptor.key"
      :ref="(element) => setPanelRef(descriptor.key, element)"
      class="submenu-panel"
      :style="getPanelStyle(descriptor.key)"
      role="menu"
      @keydown="handlePanelKeydown(descriptor.key, $event)"
    >
      <template
        v-for="item in descriptor.items"
        :key="`${descriptor.key}-${item.value}`"
      >
        <hr
          v-if="item.type === 'separator'"
          class="separator"
          role="separator"
        />

        <p v-else-if="item.type === 'message'" class="message">
          {{ item.label }}
        </p>

        <DropdownMenuItemButton
          v-else
          :item="item"
          :level="descriptor.level"
          :path="buildItemPath(descriptor.parentPath, item.value)"
          :path-key="
            toPathKey(buildItemPath(descriptor.parentPath, item.value))
          "
          :has-submenu="hasNestedItems(item)"
          :is-submenu-open="
            isItemPathOpen(buildItemPath(descriptor.parentPath, item.value))
          "
          :icon-variant="resolveIconVariant(item)"
          submenu
          :register="setTriggerRef"
          @pointerenter="
            handleItemPointerEnter(
              item,
              buildItemPath(descriptor.parentPath, item.value),
              descriptor.parentPath,
            )
          "
          @focus="
            handleItemFocus(
              item,
              buildItemPath(descriptor.parentPath, item.value),
              descriptor.parentPath,
            )
          "
          @click="
            handleItemClick(
              item,
              buildItemPath(descriptor.parentPath, item.value),
              descriptor.parentPath,
            )
          "
        >
          <template v-if="$slots.item" #item="slotProps">
            <slot name="item" v-bind="slotProps" />
          </template>
        </DropdownMenuItemButton>
      </template>
    </div>
  </AltDropdown>
</template>

<style scoped>
.alt-dropdown-menu {
  :deep(.panel) {
    border: 0;
    box-shadow: none;
    background: transparent;
    padding: 0;
    overflow: visible;
  }

  .menu-surface,
  .submenu-panel {
    min-width: 220px;
    max-width: min(360px, calc(100vw - var(--alt-space-4)));
    max-height: min(70vh, calc(100vh - var(--alt-space-4)));
    /* padding: var(--alt-space-2) 0; */
    overflow-y: auto;
    background: var(--alt-c-surface-1);
    border: 1px solid var(--alt-dropdown-menu-border-color, var(--alt-c-border));
    border-radius: var(--alt-radius-base);
    box-shadow: var(--alt-dropdown-menu-shadow, var(--alt-shadow-4));
  }

  .submenu-panel {
    position: fixed;
    z-index: calc(var(--alt-z-max) + 1);
    animation: fadeMenuIn var(--alt-duration-fast) var(--alt-ease-in-out);
  }

  .separator {
    margin: var(--alt-space-1) var(--alt-space-2);
    height: 1px;
    background-color: var(--alt-c-border);
    border: 0;
  }

  .message {
    margin: 0;
    padding: var(--alt-space-2) var(--alt-space-4);
    color: var(--alt-c-text-3);
    font-size: var(--alt-font-size-0);
  }
}

@keyframes fadeMenuIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
