<script setup lang="ts">
/**
 * @component AltDropdownMenu
 * @description Dropdown menu built on AltDropdown with recursive nested panels.
 */
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";

import AltDropdown from "./AltDropdown.vue";
import AltIcon from "./AltIcon.vue";

export type AltDropdownMenuItemType = "item" | "separator" | "message";
type AltDropdownMenuIconVariant =
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

interface SubmenuPanelDescriptor {
  key: string;
  level: number;
  parentPath: string[];
  items: AltDropdownMenuItem[];
}

interface SubmenuPanelPosition {
  top: number;
  left: number;
  transformOrigin: string;
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

const ROOT_PANEL_KEY = "__root__";
const PATH_SEPARATOR = "::";

const dropdownRef = ref<InstanceType<typeof AltDropdown> | null>(null);
const menuSurfaceRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const openPath = ref<string[]>([]);
const panelPositions = ref<Record<string, SubmenuPanelPosition>>({});
const panelAnimationFrame = ref<number | null>(null);
const panelRefs = new Map<string, HTMLElement>();
const triggerRefs = new Map<string, HTMLButtonElement>();

const iconVariantMap: Record<string, AltDropdownMenuIconVariant> = {
  settings: "brand",
  "account/settings": "brand",
  "account/profile": "brand",
  people: "brand",
  wallet: "success",
  "interface/bell": "warning",
  logout: "danger",
  download: "info",
  ai: "accent",
};

const normalizedItems = computed<AltDropdownMenuItem[]>(() => {
  return props.items.map((item) => normalizeItem(item));
});

const hasActionItems = computed(() => {
  return normalizedItems.value.some((item) => item.type === "item");
});

const itemByPathKey = computed(() => {
  const map = new Map<string, AltDropdownMenuItem>();

  function walk(items: AltDropdownMenuItem[], parentPath: string[]): void {
    for (const item of items) {
      const itemPath = buildItemPath(parentPath, item.value);
      map.set(toPathKey(itemPath), item);
      if (Array.isArray(item.items) && item.items.length > 0) {
        walk(item.items, itemPath);
      }
    }
  }

  walk(normalizedItems.value, []);
  return map;
});

const openPanelDescriptors = computed<SubmenuPanelDescriptor[]>(() => {
  const descriptors: SubmenuPanelDescriptor[] = [];
  for (let depth = 0; depth < openPath.value.length; depth += 1) {
    const parentPath = openPath.value.slice(0, depth + 1);
    const parentItem = findItemByPath(parentPath);
    if (!parentItem || !hasNestedItems(parentItem)) {
      break;
    }

    descriptors.push({
      key: toPathKey(parentPath),
      level: depth + 1,
      parentPath,
      items: parentItem.items ?? [],
    });
  }

  return descriptors;
});

function normalizeItem(item: AltDropdownMenuItem): AltDropdownMenuItem {
  // Normalize recursive input once, so rendering and keyboard logic
  // can rely on a predictable item shape.
  return {
    type: item.type ?? "item",
    value: item.value,
    label: item.label,
    icon: item.icon,
    iconVariant: item.iconVariant,
    disabled: item.disabled === true,
    danger: item.danger === true,
    checked: item.checked === true,
    rightLabel: item.rightLabel,
    keepOpenOnSelect: item.keepOpenOnSelect === true,
    items: Array.isArray(item.items)
      ? item.items.map((nested) => normalizeItem(nested))
      : undefined,
  };
}

function hasNestedItems(item: AltDropdownMenuItem): boolean {
  if (item.type !== "item" || !Array.isArray(item.items)) {
    return false;
  }

  return item.items.some((nested) => nested.type === "item");
}

function resolveIconVariant(item: AltDropdownMenuItem): AltDropdownMenuIconVariant {
  if (item.iconVariant) {
    return item.iconVariant;
  }

  if (item.danger) {
    return "danger";
  }

  if (item.icon && iconVariantMap[item.icon]) {
    return iconVariantMap[item.icon];
  }

  return "brand";
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function toPathKey(path: string[]): string {
  return path.join(PATH_SEPARATOR);
}

function fromPathKey(pathKey: string): string[] {
  if (!pathKey || pathKey === ROOT_PANEL_KEY) {
    return [];
  }

  return pathKey.split(PATH_SEPARATOR);
}

function buildItemPath(parentPath: string[], value: string): string[] {
  return [...parentPath, value];
}

function findItemByPath(path: string[]): AltDropdownMenuItem | null {
  if (path.length === 0) {
    return null;
  }

  let levelItems = normalizedItems.value;
  let current: AltDropdownMenuItem | null = null;
  for (const value of path) {
    current = levelItems.find((item) => item.value === value) ?? null;
    if (!current) {
      return null;
    }
    levelItems = Array.isArray(current.items) ? current.items : [];
  }

  return current;
}

function normalizeOpenPath(path: string[]): string[] {
  const normalizedPath: string[] = [];
  for (const value of path) {
    const candidatePath = [...normalizedPath, value];
    const candidateItem = findItemByPath(candidatePath);
    if (!candidateItem || !hasNestedItems(candidateItem)) {
      break;
    }
    normalizedPath.push(value);
  }

  return normalizedPath;
}

function isItemPathOpen(itemPath: string[]): boolean {
  return itemPath.every((value, index) => openPath.value[index] === value);
}

function setTriggerRef(pathKey: string, element: unknown): void {
  if (!element) {
    triggerRefs.delete(pathKey);
    return;
  }

  if (element instanceof HTMLButtonElement) {
    triggerRefs.set(pathKey, element);
  }
}

function setPanelRef(panelKey: string, element: unknown): void {
  if (!element) {
    panelRefs.delete(panelKey);
    return;
  }

  if (element instanceof HTMLElement) {
    panelRefs.set(panelKey, element);
  }
}

function getPanelElement(panelKey: string): HTMLElement | null {
  if (panelKey === ROOT_PANEL_KEY) {
    return menuSurfaceRef.value;
  }

  return panelRefs.get(panelKey) ?? null;
}

function getPanelButtons(panelKey: string): HTMLButtonElement[] {
  const panel = getPanelElement(panelKey);
  if (!panel) {
    return [];
  }

  return Array.from(
    panel.querySelectorAll<HTMLButtonElement>(
      'button[data-menu-item="true"]:not(:disabled)',
    ),
  );
}

function focusPanelButton(panelKey: string, index: number): void {
  const buttons = getPanelButtons(panelKey);
  if (buttons.length === 0) {
    return;
  }

  const boundedIndex = clamp(index, 0, buttons.length - 1);
  buttons[boundedIndex]?.focus();
}

function focusFirstPanelButton(panelKey: string): void {
  focusPanelButton(panelKey, 0);
}

function focusLastPanelButton(panelKey: string): void {
  const buttons = getPanelButtons(panelKey);
  focusPanelButton(panelKey, buttons.length - 1);
}

function openSubmenuForPath(itemPath: string[]): void {
  const item = findItemByPath(itemPath);
  if (!item || !hasNestedItems(item)) {
    openPath.value = normalizeOpenPath(itemPath.slice(0, -1));
    return;
  }

  openPath.value = itemPath;
}

function closeMenu(restoreFocus = false): void {
  openPath.value = [];
  dropdownRef.value?.close({ restoreFocus });
}

function handleOpenChange(nextOpen: boolean): void {
  isOpen.value = nextOpen;
  emit("openChange", nextOpen);

  if (!nextOpen) {
    openPath.value = [];
    panelPositions.value = {};
    return;
  }

  nextTick(() => {
    focusFirstPanelButton(ROOT_PANEL_KEY);
  });
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

  openPath.value = normalizeOpenPath(parentPath);
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

  openPath.value = normalizeOpenPath(parentPath);
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
    openPath.value = normalizeOpenPath(parentPath);
  }
}

function handlePanelKeydown(panelKey: string, event: KeyboardEvent): void {
  const panelButtons = getPanelButtons(panelKey);
  if (panelButtons.length === 0) {
    return;
  }

  if (event.key === "Tab") {
    closeMenu();
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu(true);
    return;
  }

  const activeElement = document.activeElement as HTMLButtonElement | null;
  const currentIndex = activeElement ? panelButtons.indexOf(activeElement) : -1;
  const focusedPathKey = activeElement?.dataset.pathKey ?? "";
  const focusedItem = itemByPathKey.value.get(focusedPathKey) ?? null;
  const focusedPath = fromPathKey(focusedPathKey);
  const panelParentPath =
    panelKey === ROOT_PANEL_KEY ? [] : fromPathKey(panelKey);

  if (event.key === "ArrowDown") {
    event.preventDefault();
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % panelButtons.length;
    focusPanelButton(panelKey, nextIndex);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    const nextIndex =
      currentIndex === -1
        ? panelButtons.length - 1
        : (currentIndex - 1 + panelButtons.length) % panelButtons.length;
    focusPanelButton(panelKey, nextIndex);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    focusFirstPanelButton(panelKey);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    focusLastPanelButton(panelKey);
    return;
  }

  if (event.key === "ArrowRight" && focusedItem && focusedPath.length > 0) {
    if (!hasNestedItems(focusedItem)) {
      return;
    }

    event.preventDefault();
    openSubmenuForPath(focusedPath);
    nextTick(() => {
      focusFirstPanelButton(toPathKey(focusedPath));
    });
    return;
  }

  if (event.key === "ArrowLeft") {
    if (panelKey === ROOT_PANEL_KEY) {
      if (openPath.value.length === 0) {
        return;
      }

      event.preventDefault();
      openPath.value = openPath.value.slice(0, -1);
      return;
    }

    event.preventDefault();
    const parentPath = fromPathKey(panelKey);
    openPath.value = normalizeOpenPath(parentPath.slice(0, -1));
    nextTick(() => {
      triggerRefs.get(panelKey)?.focus();
    });
    return;
  }

  if ((event.key === "Enter" || event.key === " ") && focusedItem) {
    event.preventDefault();
    handleItemClick(focusedItem, focusedPath, panelParentPath);
  }
}

function cancelPanelPositionFrame(): void {
  if (panelAnimationFrame.value === null) {
    return;
  }

  cancelAnimationFrame(panelAnimationFrame.value);
  panelAnimationFrame.value = null;
}

function updatePanelPosition(panelKey: string): void {
  const trigger = triggerRefs.get(panelKey);
  const panel = panelRefs.get(panelKey);
  if (!trigger || !panel) {
    return;
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = Math.max(0, props.viewportPadding);
  const offset = Math.max(4, props.submenuOffset);
  const triggerRect = trigger.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();

  let left = triggerRect.right + offset;
  let top = triggerRect.top;
  let horizontalOrigin = "left";

  // Prefer opening submenu to the right, but flip to the left if it would
  // overflow viewport. Then clamp both axes for edge-safe positioning.
  if (left + panelRect.width > viewportWidth - padding) {
    left = triggerRect.left - panelRect.width - offset;
    horizontalOrigin = "right";
  }

  left = clamp(
    left,
    padding,
    Math.max(padding, viewportWidth - panelRect.width - padding),
  );

  if (top + panelRect.height > viewportHeight - padding) {
    top = triggerRect.bottom - panelRect.height;
  }

  top = clamp(
    top,
    padding,
    Math.max(padding, viewportHeight - panelRect.height - padding),
  );

  panelPositions.value = {
    ...panelPositions.value,
    [panelKey]: {
      top: Math.round(top),
      left: Math.round(left),
      transformOrigin: `top ${horizontalOrigin}`,
    },
  };
}

function schedulePanelPositionUpdate(): void {
  cancelPanelPositionFrame();
  panelAnimationFrame.value = requestAnimationFrame(() => {
    panelAnimationFrame.value = null;
    openPanelDescriptors.value.forEach((descriptor) => {
      updatePanelPosition(descriptor.key);
    });
  });
}

function getPanelStyle(panelKey: string): Record<string, string> {
  const position = panelPositions.value[panelKey];
  if (!position) {
    return {};
  }

  return {
    top: `${position.top}px`,
    left: `${position.left}px`,
    transformOrigin: position.transformOrigin,
  };
}

function handleSubmenuViewportChange(): void {
  if (!isOpen.value || openPanelDescriptors.value.length === 0) {
    return;
  }

  schedulePanelPositionUpdate();
}

function bindSubmenuListeners(): void {
  window.addEventListener("resize", handleSubmenuViewportChange);
  window.addEventListener("scroll", handleSubmenuViewportChange, true);
}

function unbindSubmenuListeners(): void {
  window.removeEventListener("resize", handleSubmenuViewportChange);
  window.removeEventListener("scroll", handleSubmenuViewportChange, true);
}

watch(
  normalizedItems,
  () => {
    openPath.value = normalizeOpenPath(openPath.value);
  },
  { deep: true },
);

watch(
  openPanelDescriptors,
  () => {
    if (!isOpen.value || openPanelDescriptors.value.length === 0) {
      panelPositions.value = {};
      return;
    }

    nextTick(() => {
      schedulePanelPositionUpdate();
    });
  },
  { deep: true },
);

watch(
  () => [isOpen.value, openPanelDescriptors.value.length] as const,
  ([open, panelCount]) => {
    if (open && panelCount > 0) {
      bindSubmenuListeners();
      return;
    }

    unbindSubmenuListeners();
    cancelPanelPositionFrame();
  },
);

onBeforeUnmount(() => {
  unbindSubmenuListeners();
  cancelPanelPositionFrame();
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
      ref="menuSurfaceRef"
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

        <button
          v-else
          :ref="(element) => setTriggerRef(toPathKey([item.value]), element)"
          type="button"
          class="item"
          :class="{
            danger: item.danger,
            'submenu-open': isItemPathOpen([item.value]),
          }"
          :disabled="item.disabled"
          role="menuitem"
          tabindex="-1"
          data-menu-item="true"
          :data-path-key="toPathKey([item.value])"
          :aria-haspopup="hasNestedItems(item) ? 'menu' : undefined"
          :aria-expanded="hasNestedItems(item) ? isItemPathOpen([item.value]) : undefined"
          @pointerenter="handleItemPointerEnter(item, [item.value], [])"
          @focus="handleItemFocus(item, [item.value], [])"
          @click="handleItemClick(item, [item.value], [])"
        >
          <slot
            name="item"
            :item="item"
            :has-submenu="hasNestedItems(item)"
            :level="0"
            :path="[item.value]"
          >
            <span class="item-main">
              <AltIcon
                v-if="item.icon"
                :name="item.icon"
                :size="18"
                :variant="resolveIconVariant(item)"
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
                v-if="hasNestedItems(item)"
                name="chevron-right"
                :size="16"
                variant="muted"
                class="submenu-indicator"
              />
            </span>
          </slot>
        </button>
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

        <button
          v-else
          :ref="(element) => setTriggerRef(toPathKey(buildItemPath(descriptor.parentPath, item.value)), element)"
          type="button"
          class="item submenu-item"
          :class="{
            danger: item.danger,
            'submenu-open': isItemPathOpen(buildItemPath(descriptor.parentPath, item.value)),
          }"
          :disabled="item.disabled"
          role="menuitem"
          tabindex="-1"
          data-menu-item="true"
          :data-path-key="toPathKey(buildItemPath(descriptor.parentPath, item.value))"
          :aria-haspopup="hasNestedItems(item) ? 'menu' : undefined"
          :aria-expanded="hasNestedItems(item) ? isItemPathOpen(buildItemPath(descriptor.parentPath, item.value)) : undefined"
          @pointerenter="handleItemPointerEnter(item, buildItemPath(descriptor.parentPath, item.value), descriptor.parentPath)"
          @focus="handleItemFocus(item, buildItemPath(descriptor.parentPath, item.value), descriptor.parentPath)"
          @click="handleItemClick(item, buildItemPath(descriptor.parentPath, item.value), descriptor.parentPath)"
        >
          <slot
            name="item"
            :item="item"
            :has-submenu="hasNestedItems(item)"
            :level="descriptor.level"
            :path="buildItemPath(descriptor.parentPath, item.value)"
          >
            <span class="item-main">
              <AltIcon
                v-if="item.icon"
                :name="item.icon"
                :size="18"
                :variant="resolveIconVariant(item)"
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
                v-if="hasNestedItems(item)"
                name="chevron-right"
                :size="16"
                variant="muted"
                class="submenu-indicator"
              />
            </span>
          </slot>
        </button>
      </template>
    </div>
  </AltDropdown>
</template>

<style scoped>
.alt-dropdown-menu {
  .menu-surface,
  .submenu-panel {
    min-width: 220px;
    max-width: min(360px, calc(100vw - var(--alt-space-4)));
    max-height: min(70vh, calc(100vh - var(--alt-space-4)));
    padding: var(--alt-space-2) 0;
    overflow-y: auto;
    background: var(--alt-c-surface-1);
  }

  .submenu-panel {
    position: fixed;
    border: 1px solid var(--alt-c-border);
    border-radius: var(--alt-radius-base);
    box-shadow: var(--alt-shadow-4);
    z-index: calc(var(--alt-z-max) + 1);
    animation: fadeMenuIn var(--alt-duration-fast) var(--alt-ease-in-out);
  }

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
