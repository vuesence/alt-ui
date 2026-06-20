<script setup lang="ts">
/**
 * @component AltDropdownMenu
 * @description Universal dropdown menu with viewport-aware positioning and keyboard navigation.
 */
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue";

import AltButton from "./AltButton.vue";
import AltIcon from "./AltIcon.vue";

export type AltDropdownMenuItemType = "item" | "separator" | "message";

export interface AltDropdownMenuItem {
  type?: AltDropdownMenuItemType;
  value: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
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
  placement?: "bottom-start" | "bottom-end";
  closeOnSelect?: boolean;
  offset?: number;
  minWidth?: number;
  maxWidth?: number;
  matchTriggerWidth?: boolean;
  viewportPadding?: number;
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
});

const emit = defineEmits<{
  (e: "select", item: AltDropdownMenuItem): void;
  (e: "openChange", isOpen: boolean): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const panelTop = ref(0);
const panelLeft = ref(0);
const panelMinWidth = ref(props.minWidth);
const panelMaxWidth = ref(props.maxWidth);
const panelMaxHeight = ref(560);
const panelTransformOrigin = ref("top right");
const animationFrame = ref<number | null>(null);

const triggerId = `alt-dropdown-trigger-${useId()}`;
const panelId = `alt-dropdown-panel-${useId()}`;

const normalizedItems = computed<AltDropdownMenuItem[]>(() => {
  const result: AltDropdownMenuItem[] = [];

  for (const rawItem of props.items) {
    result.push({
      type: rawItem.type ?? "item",
      value: rawItem.value,
      label: rawItem.label,
      icon: rawItem.icon,
      disabled: rawItem.disabled === true,
      danger: rawItem.danger === true,
    });
  }

  return result;
});

const hasActionItems = computed(() => {
  return normalizedItems.value.some((item) => item.type === "item");
});

const panelStyle = computed(() => {
  return {
    top: `${panelTop.value}px`,
    left: `${panelLeft.value}px`,
    minWidth: `${panelMinWidth.value}px`,
    maxWidth: `${panelMaxWidth.value}px`,
    maxHeight: `${panelMaxHeight.value}px`,
    transformOrigin: panelTransformOrigin.value,
  };
});

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function resolveTriggerButton(): HTMLButtonElement | null {
  return (
    rootRef.value?.querySelector<HTMLButtonElement>(
      '[data-dropdown-trigger="true"]',
    ) ?? null
  );
}

function getFocusableItems(): HTMLButtonElement[] {
  if (!panelRef.value) {
    return [];
  }

  return Array.from(
    panelRef.value.querySelectorAll<HTMLButtonElement>(
      '[data-menu-item="true"]:not(:disabled)',
    ),
  );
}

function focusItemByIndex(index: number): void {
  const items = getFocusableItems();
  if (items.length === 0) {
    return;
  }

  const boundedIndex = clamp(index, 0, items.length - 1);
  items[boundedIndex]?.focus();
}

function focusFirstItem(): void {
  focusItemByIndex(0);
}

function focusLastItem(): void {
  const items = getFocusableItems();
  focusItemByIndex(items.length - 1);
}

function focusTrigger(): void {
  resolveTriggerButton()?.focus();
}

function cancelAnimationFrameUpdate(): void {
  if (animationFrame.value === null) {
    return;
  }

  cancelAnimationFrame(animationFrame.value);
  animationFrame.value = null;
}

function updatePosition(): void {
  if (!isOpen.value) {
    return;
  }

  const trigger = resolveTriggerButton();
  const panel = panelRef.value;
  if (!trigger || !panel) {
    return;
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = Math.max(0, props.viewportPadding);
  const offset = Math.max(0, props.offset);
  const triggerRect = trigger.getBoundingClientRect();

  const minWidth = Math.max(
    props.minWidth,
    props.matchTriggerWidth ? triggerRect.width : 0,
  );
  const maxWidth = Math.max(
    minWidth,
    Math.min(props.maxWidth, viewportWidth - padding * 2),
  );

  panelMinWidth.value = Math.round(minWidth);
  panelMaxWidth.value = Math.round(maxWidth);
  panelMaxHeight.value = Math.round(Math.max(180, viewportHeight - padding * 2));

  const panelRect = panel.getBoundingClientRect();
  const menuWidth = Math.min(maxWidth, Math.max(minWidth, panelRect.width));
  const menuHeight = Math.min(panelRect.height, panelMaxHeight.value);

  let left =
    props.placement === "bottom-end"
      ? triggerRect.right - menuWidth
      : triggerRect.left;
  let top = triggerRect.bottom + offset;
  let verticalOrigin = "top";
  const horizontalOrigin = props.placement === "bottom-end" ? "right" : "left";

  if (top + menuHeight > viewportHeight - padding) {
    const topAbove = triggerRect.top - menuHeight - offset;
    if (topAbove >= padding) {
      top = topAbove;
      verticalOrigin = "bottom";
    } else {
      top = clamp(top, padding, Math.max(padding, viewportHeight - menuHeight - padding));
    }
  }

  left = clamp(left, padding, Math.max(padding, viewportWidth - menuWidth - padding));

  panelTop.value = Math.round(top);
  panelLeft.value = Math.round(left);
  panelTransformOrigin.value = `${verticalOrigin} ${horizontalOrigin}`;
}

function schedulePositionUpdate(): void {
  cancelAnimationFrameUpdate();
  animationFrame.value = requestAnimationFrame(() => {
    animationFrame.value = null;
    updatePosition();
  });
}

function closeMenu(): void {
  if (!isOpen.value) {
    return;
  }

  isOpen.value = false;
}

function openMenu(options?: { focusLast?: boolean }): void {
  if (!hasActionItems.value) {
    return;
  }

  if (!isOpen.value) {
    isOpen.value = true;
  }

  nextTick(() => {
    schedulePositionUpdate();
    if (options?.focusLast) {
      focusLastItem();
      return;
    }

    focusFirstItem();
  });
}

function toggleMenu(): void {
  if (isOpen.value) {
    closeMenu();
    return;
  }

  openMenu();
}

function handleItemClick(item: AltDropdownMenuItem): void {
  if (item.type !== "item" || item.disabled) {
    return;
  }

  emit("select", item);
  if (!props.closeOnSelect) {
    return;
  }

  closeMenu();
  nextTick(() => {
    focusTrigger();
  });
}

function handleViewportChange(): void {
  if (!isOpen.value) {
    return;
  }

  schedulePositionUpdate();
}

function handleDocumentPointerDown(event: PointerEvent): void {
  if (!isOpen.value) {
    return;
  }

  const target = event.target as Node | null;
  if (target && rootRef.value?.contains(target)) {
    return;
  }

  closeMenu();
}

function handleDocumentKeydown(event: KeyboardEvent): void {
  if (event.key !== "Escape" || !isOpen.value) {
    return;
  }

  event.preventDefault();
  closeMenu();
  nextTick(() => {
    focusTrigger();
  });
}

function handleTriggerKeydown(event: KeyboardEvent): void {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    openMenu();
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    openMenu({ focusLast: true });
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleMenu();
  }
}

function handleMenuKeydown(event: KeyboardEvent): void {
  const items = getFocusableItems();
  if (items.length === 0) {
    return;
  }

  if (event.key === "Tab") {
    closeMenu();
    return;
  }

  const activeElement = document.activeElement as HTMLButtonElement | null;
  const currentIndex = activeElement ? items.indexOf(activeElement) : -1;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
    focusItemByIndex(nextIndex);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    const nextIndex =
      currentIndex === -1
        ? items.length - 1
        : (currentIndex - 1 + items.length) % items.length;
    focusItemByIndex(nextIndex);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    focusFirstItem();
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    focusLastItem();
  }
}

function bindGlobalListeners(): void {
  document.addEventListener("pointerdown", handleDocumentPointerDown);
  document.addEventListener("keydown", handleDocumentKeydown);
  window.addEventListener("resize", handleViewportChange);
  window.addEventListener("scroll", handleViewportChange, true);
}

function unbindGlobalListeners(): void {
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
  document.removeEventListener("keydown", handleDocumentKeydown);
  window.removeEventListener("resize", handleViewportChange);
  window.removeEventListener("scroll", handleViewportChange, true);
}

watch(isOpen, (nextOpen) => {
  emit("openChange", nextOpen);
  if (nextOpen) {
    bindGlobalListeners();
    return;
  }

  unbindGlobalListeners();
});

onBeforeUnmount(() => {
  unbindGlobalListeners();
  cancelAnimationFrameUpdate();
});
</script>

<template>
  <div ref="rootRef" class="alt-dropdown" :class="menuClass">
    <AltButton
      :id="triggerId"
      data-dropdown-trigger="true"
      :class="triggerClass"
      :icon="triggerIcon"
      :label="showTriggerLabel ? triggerLabel : ''"
      :title="triggerTitle || triggerLabel"
      :aria-label="triggerLabel"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      @click="toggleMenu"
      @keydown="handleTriggerKeydown"
    />

    <Transition name="fade-menu">
      <div
        v-if="isOpen"
        :id="panelId"
        ref="panelRef"
        class="panel"
        :class="panelClass"
        :style="panelStyle"
        role="menu"
        :aria-labelledby="triggerId"
        @keydown="handleMenuKeydown"
      >
        <template v-for="item in normalizedItems" :key="item.value">
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
            type="button"
            class="item"
            :class="{ danger: item.danger }"
            :disabled="item.disabled"
            role="menuitem"
            tabindex="-1"
            data-menu-item="true"
            @click="handleItemClick(item)"
          >
            <AltIcon v-if="item.icon" :name="item.icon" :size="16" />
            <span>{{ item.label }}</span>
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.alt-dropdown {
  position: relative;
  display: inline-flex;
  max-width: 100%;

  .panel {
    margin: 0;
    min-width: 220px;
    max-width: min(360px, calc(100vw - var(--alt-space-4)));
    max-height: min(70vh, calc(100vh - var(--alt-space-4)));
    overflow-y: auto;
    background: var(--alt-c-surface-1);
    border: 1px solid var(--alt-c-border);
    border-radius: var(--alt-radius-base);
    box-shadow: var(--alt-shadow-4);
    padding: var(--alt-space-2) 0;
    outline: none;
    position: fixed;
    z-index: var(--alt-z-max);
  }

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--alt-space-2);
    cursor: pointer;
    padding: var(--alt-space-3) var(--alt-space-4);
    color: var(--alt-c-text-1);
    border: none;
    background: transparent;
    font: inherit;
    text-align: left;

    &:hover:enabled,
    &:focus-visible {
      background: var(--alt-c-surface-2);
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

.fade-menu-enter-active,
.fade-menu-leave-active {
  transition:
    opacity var(--alt-duration-fast) var(--alt-ease-in-out),
    transform var(--alt-duration-fast) var(--alt-ease-in-out);
}

.fade-menu-enter-from,
.fade-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
