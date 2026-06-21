<script setup lang="ts">
/**
 * @component AltDropdown
 * @description Generic dropdown surface with viewport-aware positioning.
 */
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  useId,
} from "vue";

import AltButton from "./AltButton.vue";

type AltDropdownPlacement =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end";
type AltDropdownPopupRole = "menu" | "dialog" | "listbox";

interface Props {
  triggerLabel?: string;
  triggerTitle?: string;
  triggerIcon?: string;
  triggerClass?: string;
  showTriggerLabel?: boolean;
  menuClass?: string;
  panelClass?: string;
  placement?: AltDropdownPlacement;
  offset?: number;
  minWidth?: number;
  maxWidth?: number;
  matchTriggerWidth?: boolean;
  viewportPadding?: number;
  disabled?: boolean;
  closeOnOutsidePointerDown?: boolean;
  closeOnEscape?: boolean;
  panelRole?: AltDropdownPopupRole;
}

interface CloseOptions {
  restoreFocus?: boolean;
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
  offset: 8,
  minWidth: 220,
  maxWidth: 360,
  matchTriggerWidth: false,
  viewportPadding: 8,
  disabled: false,
  closeOnOutsidePointerDown: true,
  closeOnEscape: true,
  panelRole: "dialog",
});

const emit = defineEmits<{
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
let hasBoundGlobalListeners = false;
let observedOpenState = isOpen.value;

const triggerId = `alt-dropdown-trigger-${useId()}`;
const panelId = `alt-dropdown-panel-${useId()}`;

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

const popupRole = computed(() => {
  if (props.panelRole === "menu" || props.panelRole === "listbox") {
    return props.panelRole;
  }

  return "dialog";
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
  const surfaceWidth = Math.min(maxWidth, Math.max(minWidth, panelRect.width));
  const surfaceHeight = Math.min(panelRect.height, panelMaxHeight.value);

  const alignsEnd = props.placement.endsWith("end");
  const prefersTop = props.placement.startsWith("top");

  let left = alignsEnd ? triggerRect.right - surfaceWidth : triggerRect.left;
  let top = prefersTop
    ? triggerRect.top - surfaceHeight - offset
    : triggerRect.bottom + offset;

  let verticalOrigin = prefersTop ? "bottom" : "top";
  const horizontalOrigin = alignsEnd ? "right" : "left";

  // Keep the panel fully visible: prefer opening upward if needed,
  // then clamp both axes to viewport bounds.
  if (prefersTop && top < padding) {
    const topBelow = triggerRect.bottom + offset;
    if (topBelow + surfaceHeight <= viewportHeight - padding) {
      top = topBelow;
      verticalOrigin = "top";
    }
  } else if (!prefersTop && top + surfaceHeight > viewportHeight - padding) {
    const topAbove = triggerRect.top - surfaceHeight - offset;
    if (topAbove >= padding) {
      top = topAbove;
      verticalOrigin = "bottom";
    }
  }

  top = clamp(
    top,
    padding,
    Math.max(padding, viewportHeight - surfaceHeight - padding),
  );

  left = clamp(
    left,
    padding,
    Math.max(padding, viewportWidth - surfaceWidth - padding),
  );

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

function synchronizeOpenState(): void {
  const nextOpen = isOpen.value;
  if (nextOpen !== observedOpenState) {
    observedOpenState = nextOpen;
    emit("openChange", nextOpen);
  }

  if (nextOpen) {
    bindGlobalListeners();
    return;
  }

  unbindGlobalListeners();
}

function setOpenState(nextOpen: boolean): void {
  if (isOpen.value === nextOpen) {
    return;
  }

  isOpen.value = nextOpen;
  synchronizeOpenState();
}

function open(): void {
  if (props.disabled || isOpen.value) {
    return;
  }

  setOpenState(true);
  nextTick(() => {
    schedulePositionUpdate();
  });
}

function close(options?: CloseOptions): void {
  if (!isOpen.value) {
    return;
  }

  setOpenState(false);
  if (options?.restoreFocus === true) {
    nextTick(() => {
      focusTrigger();
    });
  }
}

function toggle(): void {
  if (isOpen.value) {
    close();
    return;
  }

  open();
}

function handleViewportChange(): void {
  if (!isOpen.value) {
    return;
  }

  schedulePositionUpdate();
}

function handleDocumentPointerDown(event: PointerEvent): void {
  if (!isOpen.value || !props.closeOnOutsidePointerDown) {
    return;
  }

  const target = event.target as Node | null;
  if (target && rootRef.value?.contains(target)) {
    return;
  }

  close();
}

function handleDocumentKeydown(event: KeyboardEvent): void {
  if (
    !isOpen.value ||
    !props.closeOnEscape ||
    event.key !== "Escape"
  ) {
    return;
  }

  event.preventDefault();
  close({ restoreFocus: true });
}

function handleTriggerKeydown(event: KeyboardEvent): void {
  if (props.disabled) {
    return;
  }

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    open();
    nextTick(() => {
      panelRef.value?.focus();
    });
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggle();
  }
}

function bindGlobalListeners(): void {
  if (hasBoundGlobalListeners) {
    return;
  }

  // Track viewport and outside interactions only while menu is open.
  document.addEventListener("pointerdown", handleDocumentPointerDown);
  document.addEventListener("keydown", handleDocumentKeydown);
  window.addEventListener("resize", handleViewportChange);
  window.addEventListener("scroll", handleViewportChange, true);
  hasBoundGlobalListeners = true;
}

function unbindGlobalListeners(): void {
  if (!hasBoundGlobalListeners) {
    return;
  }

  document.removeEventListener("pointerdown", handleDocumentPointerDown);
  document.removeEventListener("keydown", handleDocumentKeydown);
  window.removeEventListener("resize", handleViewportChange);
  window.removeEventListener("scroll", handleViewportChange, true);
  hasBoundGlobalListeners = false;
}

onMounted(() => {
  synchronizeOpenState();
});

onUpdated(() => {
  synchronizeOpenState();
});

onBeforeUnmount(() => {
  unbindGlobalListeners();
  cancelAnimationFrameUpdate();
});

defineExpose({
  open,
  close,
  toggle,
  focusTrigger,
  isOpen,
});
</script>

<template>
  <div ref="rootRef" class="alt-dropdown" :class="menuClass">
    <button
      v-if="$slots.trigger"
      :id="triggerId"
      type="button"
      data-dropdown-trigger="true"
      :class="['slot-trigger', triggerClass]"
      :title="triggerTitle || triggerLabel"
      :aria-label="triggerLabel"
      :aria-haspopup="popupRole"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      :disabled="disabled"
      @click="toggle"
      @keydown="handleTriggerKeydown"
    >
      <slot name="trigger" :is-open="isOpen" />
    </button>

    <AltButton
      v-else
      :id="triggerId"
      data-dropdown-trigger="true"
      :class="triggerClass"
      :icon="triggerIcon"
      :label="showTriggerLabel ? triggerLabel : ''"
      :title="triggerTitle || triggerLabel"
      :aria-label="triggerLabel"
      :aria-haspopup="popupRole"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      :disabled="disabled"
      @click="toggle"
      @keydown="handleTriggerKeydown"
    />

    <Transition name="fade-dropdown">
      <div
        v-if="isOpen"
        :id="panelId"
        ref="panelRef"
        class="panel"
        :class="panelClass"
        :style="panelStyle"
        :role="panelRole"
        :aria-labelledby="triggerId"
        data-dropdown-panel="true"
        tabindex="-1"
      >
        <slot :is-open="isOpen" :close="close" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.alt-dropdown {
  position: relative;
  display: inline-flex;
  max-width: 100%;

  .slot-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: var(--alt-c-disabled-opacity);
    }
  }

  .panel {
    margin: 0;
    min-width: 220px;
    max-width: min(360px, calc(100vw - var(--alt-space-4)));
    max-height: min(70vh, calc(100vh - var(--alt-space-4)));
    background: var(--alt-c-surface-1);
    border: 1px solid var(--alt-c-border);
    border-radius: var(--alt-radius-base);
    box-shadow: var(--alt-shadow-4);
    outline: none;
    position: fixed;
    z-index: var(--alt-z-max);
  }
}

.fade-dropdown-enter-active,
.fade-dropdown-leave-active {
  transition:
    opacity var(--alt-duration-fast) var(--alt-ease-in-out),
    transform var(--alt-duration-fast) var(--alt-ease-in-out);
}

.fade-dropdown-enter-from,
.fade-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
