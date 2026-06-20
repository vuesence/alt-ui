<script setup lang="ts">
/**
 * @component AltTooltip
 * @description Universal floating tooltip/popover primitive for AltUI.
 *
 * The component supports:
 * - controlled (`v-model`) and uncontrolled open state
 * - hover/focus interactions
 * - optional click-to-toggle mode
 * - viewport-aware positioning with basic placement flipping
 * - optional arrow rendering
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

type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

interface AltTooltipPositioning {
  placement?: TooltipPlacement;
  gutter?: number;
  strategy?: "absolute" | "fixed";
  offset?: { mainAxis?: number; crossAxis?: number };
}

interface AltTooltipProps {
  modelValue?: boolean;
  positioning?: AltTooltipPositioning;
  openDelay?: number;
  closeDelay?: number;
  showArrow?: boolean;
  openOnClick?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  contentClass?: string;
  positionerStyle?: Record<string, string>;
}

const props = withDefaults(defineProps<AltTooltipProps>(), {
  openDelay: 100,
  closeDelay: 300,
  showArrow: false,
  openOnClick: false,
  interactive: true,
  disabled: false,
  contentClass: "",
  positioning: () => ({
    placement: "top",
    gutter: 8,
    strategy: "fixed",
  }),
  positionerStyle: () => ({}),
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "openChange", value: boolean): void;
}>();

const tooltipId = useId();
const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const internalOpen = ref(false);
const computedPlacement = ref<TooltipPlacement>("top");
const positionTop = ref(0);
const positionLeft = ref(0);
const transformOrigin = ref("bottom center");

let isPointerInsideContent = false;
let openTimeoutId: number | null = null;
let closeTimeoutId: number | null = null;
let hasBoundGlobalListeners = false;
let observedOpenState = false;

const isControlled = computed(() => props.modelValue !== undefined);
const isOpen = computed(() => {
  if (isControlled.value) {
    return Boolean(props.modelValue);
  }

  return internalOpen.value;
});

const positionStrategy = computed(
  () => props.positioning?.strategy ?? "fixed",
);

const positionerInlineStyle = computed(() => {
  return {
    position: positionStrategy.value,
    top: `${positionTop.value}px`,
    left: `${positionLeft.value}px`,
    transformOrigin: transformOrigin.value,
    ...props.positionerStyle,
  };
});

onMounted(() => {
  synchronizeOpenState();
});

onUpdated(() => {
  synchronizeOpenState();
});

onBeforeUnmount(() => {
  unbindGlobalListeners();
  clearOpenTimer();
  clearCloseTimer();
});

function setOpen(nextValue: boolean): void {
  if (props.disabled && nextValue) {
    return;
  }

  if (isOpen.value === nextValue) {
    return;
  }

  if (!isControlled.value) {
    internalOpen.value = nextValue;
  }

  emit("update:modelValue", nextValue);
  emit("openChange", nextValue);
}

function synchronizeOpenState(): void {
  const currentlyOpen = isOpen.value;
  if (currentlyOpen === observedOpenState) {
    if (currentlyOpen) {
      nextTick(updatePosition);
    }
    return;
  }

  observedOpenState = currentlyOpen;
  if (currentlyOpen) {
    bindGlobalListeners();
    nextTick(updatePosition);
    return;
  }

  isPointerInsideContent = false;
  clearOpenTimer();
  clearCloseTimer();
  unbindGlobalListeners();
}

function clearOpenTimer(): void {
  if (openTimeoutId === null) {
    return;
  }

  window.clearTimeout(openTimeoutId);
  openTimeoutId = null;
}

function clearCloseTimer(): void {
  if (closeTimeoutId === null) {
    return;
  }

  window.clearTimeout(closeTimeoutId);
  closeTimeoutId = null;
}

function scheduleOpen(): void {
  clearCloseTimer();
  clearOpenTimer();

  openTimeoutId = window.setTimeout(() => {
    setOpen(true);
  }, Math.max(0, props.openDelay));
}

function scheduleClose(): void {
  if (props.interactive && isPointerInsideContent) {
    return;
  }

  clearOpenTimer();
  clearCloseTimer();

  closeTimeoutId = window.setTimeout(() => {
    setOpen(false);
  }, Math.max(0, props.closeDelay));
}

function handleTriggerMouseEnter(): void {
  if (props.disabled) {
    return;
  }

  scheduleOpen();
}

function handleTriggerMouseLeave(): void {
  scheduleClose();
}

function handleTriggerFocusIn(): void {
  if (props.disabled) {
    return;
  }

  setOpen(true);
}

function handleTriggerFocusOut(event: FocusEvent): void {
  const relatedTarget = event.relatedTarget as Node | null;
  if (
    relatedTarget &&
    (triggerRef.value?.contains(relatedTarget) ||
      contentRef.value?.contains(relatedTarget))
  ) {
    return;
  }

  scheduleClose();
}

function handleTriggerClick(event: MouseEvent): void {
  if (!props.openOnClick) {
    return;
  }

  event.preventDefault();
  if (isOpen.value) {
    setOpen(false);
  } else {
    setOpen(true);
  }
}

function handleTriggerKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape" && isOpen.value) {
    event.preventDefault();
    setOpen(false);
  }
}

function handleContentMouseEnter(): void {
  isPointerInsideContent = true;
  clearCloseTimer();
}

function handleContentMouseLeave(): void {
  isPointerInsideContent = false;
  scheduleClose();
}

function handleContentKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape" && isOpen.value) {
    event.preventDefault();
    setOpen(false);
  }
}

function handleOutsidePointerDown(event: Event): void {
  if (!isOpen.value) {
    return;
  }

  const target = event.target as Node | null;
  if (!target) {
    return;
  }

  if (triggerRef.value?.contains(target) || contentRef.value?.contains(target)) {
    return;
  }

  setOpen(false);
}

function bindGlobalListeners(): void {
  if (hasBoundGlobalListeners) {
    return;
  }

  window.addEventListener("resize", updatePosition);
  window.addEventListener("scroll", updatePosition, true);
  document.addEventListener("pointerdown", handleOutsidePointerDown, true);
  hasBoundGlobalListeners = true;
}

function unbindGlobalListeners(): void {
  if (!hasBoundGlobalListeners) {
    return;
  }

  window.removeEventListener("resize", updatePosition);
  window.removeEventListener("scroll", updatePosition, true);
  document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
  hasBoundGlobalListeners = false;
}

function resolvePlacement(
  placement: TooltipPlacement,
): [primary: "top" | "bottom" | "left" | "right", align: "start" | "center" | "end"] {
  const [primaryRaw, alignRaw] = placement.split("-");
  const primary =
    primaryRaw === "top" ||
    primaryRaw === "bottom" ||
    primaryRaw === "left" ||
    primaryRaw === "right"
      ? primaryRaw
      : "top";
  const align =
    alignRaw === "start" || alignRaw === "end" ? alignRaw : "center";

  return [primary, align];
}

function computeAlignedLeft(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  align: "start" | "center" | "end",
): number {
  if (align === "start") {
    return triggerRect.left;
  }

  if (align === "end") {
    return triggerRect.right - contentRect.width;
  }

  return triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
}

function computeAlignedTop(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  align: "start" | "center" | "end",
): number {
  if (align === "start") {
    return triggerRect.top;
  }

  if (align === "end") {
    return triggerRect.bottom - contentRect.height;
  }

  return triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function computeTransformOrigin(
  primary: "top" | "bottom" | "left" | "right",
  align: "start" | "center" | "end",
): string {
  if (primary === "top") {
    return align === "start"
      ? "bottom left"
      : align === "end"
        ? "bottom right"
        : "bottom center";
  }

  if (primary === "bottom") {
    return align === "start"
      ? "top left"
      : align === "end"
        ? "top right"
        : "top center";
  }

  if (primary === "left") {
    return align === "start"
      ? "top right"
      : align === "end"
        ? "bottom right"
        : "center right";
  }

  return align === "start"
    ? "top left"
    : align === "end"
      ? "bottom left"
      : "center left";
}

function applyAxisOffsets(
  primary: "top" | "bottom" | "left" | "right",
  baseTop: number,
  baseLeft: number,
): { top: number; left: number } {
  const mainAxis = props.positioning?.offset?.mainAxis ?? 0;
  const crossAxis = props.positioning?.offset?.crossAxis ?? 0;

  let top = baseTop;
  let left = baseLeft;

  if (primary === "top") {
    top -= mainAxis;
    left += crossAxis;
  } else if (primary === "bottom") {
    top += mainAxis;
    left += crossAxis;
  } else if (primary === "left") {
    left -= mainAxis;
    top += crossAxis;
  } else {
    left += mainAxis;
    top += crossAxis;
  }

  return { top, left };
}

function updatePosition(): void {
  if (!isOpen.value) {
    return;
  }

  const trigger = triggerRef.value;
  const content = contentRef.value;
  if (!trigger || !content) {
    return;
  }

  const viewportPadding = 8;
  const gutter = props.positioning?.gutter ?? 8;
  const desiredPlacement = props.positioning?.placement ?? "top";
  const [desiredPrimary, desiredAlign] = resolvePlacement(desiredPlacement);
  const triggerRect = trigger.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();

  let primary = desiredPrimary;
  let align = desiredAlign;

  function computeBase(
    direction: "top" | "bottom" | "left" | "right",
  ): { top: number; left: number } {
    if (direction === "top") {
      return {
        top: triggerRect.top - contentRect.height - gutter,
        left: computeAlignedLeft(triggerRect, contentRect, align),
      };
    }

    if (direction === "bottom") {
      return {
        top: triggerRect.bottom + gutter,
        left: computeAlignedLeft(triggerRect, contentRect, align),
      };
    }

    if (direction === "left") {
      return {
        top: computeAlignedTop(triggerRect, contentRect, align),
        left: triggerRect.left - contentRect.width - gutter,
      };
    }

    return {
      top: computeAlignedTop(triggerRect, contentRect, align),
      left: triggerRect.right + gutter,
    };
  }

  let next = computeBase(primary);
  next = applyAxisOffsets(primary, next.top, next.left);

  if (primary === "top" && next.top < viewportPadding) {
    primary = "bottom";
    next = computeBase(primary);
    next = applyAxisOffsets(primary, next.top, next.left);
  } else if (
    primary === "bottom" &&
    next.top + contentRect.height > window.innerHeight - viewportPadding
  ) {
    primary = "top";
    next = computeBase(primary);
    next = applyAxisOffsets(primary, next.top, next.left);
  } else if (primary === "left" && next.left < viewportPadding) {
    primary = "right";
    next = computeBase(primary);
    next = applyAxisOffsets(primary, next.top, next.left);
  } else if (
    primary === "right" &&
    next.left + contentRect.width > window.innerWidth - viewportPadding
  ) {
    primary = "left";
    next = computeBase(primary);
    next = applyAxisOffsets(primary, next.top, next.left);
  }

  const clampedLeft = clamp(
    next.left,
    viewportPadding,
    Math.max(viewportPadding, window.innerWidth - contentRect.width - viewportPadding),
  );
  const clampedTop = clamp(
    next.top,
    viewportPadding,
    Math.max(
      viewportPadding,
      window.innerHeight - contentRect.height - viewportPadding,
    ),
  );

  const scrollX = positionStrategy.value === "absolute" ? window.scrollX : 0;
  const scrollY = positionStrategy.value === "absolute" ? window.scrollY : 0;

  positionLeft.value = Math.round(clampedLeft + scrollX);
  positionTop.value = Math.round(clampedTop + scrollY);
  transformOrigin.value = computeTransformOrigin(primary, align);
  computedPlacement.value =
    align === "center"
      ? primary
      : (`${primary}-${align}` as TooltipPlacement);
}
</script>

<template>
  <div class="alt-tooltip-root" :data-disabled="props.disabled || undefined">
    <span
      ref="triggerRef"
      class="alt-tooltip-trigger"
      :aria-describedby="isOpen ? `alt-tooltip-${tooltipId}` : undefined"
      @mouseenter="handleTriggerMouseEnter"
      @mouseleave="handleTriggerMouseLeave"
      @focusin="handleTriggerFocusIn"
      @focusout="handleTriggerFocusOut"
      @click="handleTriggerClick"
      @keydown="handleTriggerKeydown"
    >
      <slot name="trigger">
        <span class="alt-tooltip-trigger-fallback" />
      </slot>
    </span>
  </div>

  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="contentRef"
      class="alt-tooltip-positioner"
      :style="positionerInlineStyle"
      :data-placement="computedPlacement"
      @mouseenter="handleContentMouseEnter"
      @mouseleave="handleContentMouseLeave"
      @keydown="handleContentKeydown"
    >
      <div
        :id="`alt-tooltip-${tooltipId}`"
        role="tooltip"
        class="alt-tooltip-content"
        :class="props.contentClass"
      >
        <slot name="content">
          <slot />
        </slot>
      </div>
      <span v-if="props.showArrow" class="alt-tooltip-arrow">
        <span class="alt-tooltip-arrow-tip" />
      </span>
    </div>
  </Teleport>
</template>

<style scoped>
.alt-tooltip-root {
  display: inline-flex;
  align-items: center;
}

.alt-tooltip-trigger {
  display: inline-flex;
  align-items: center;
}

.alt-tooltip-trigger-fallback {
  width: 1px;
  height: 1px;
  display: inline-block;
}

.alt-tooltip-positioner {
  z-index: var(--alt-z-dropdown);
  pointer-events: auto;
}

.alt-tooltip-content {
  position: relative;
  background: var(--alt-c-surface-1);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-md);
  box-shadow: var(--alt-shadow-4);
  color: var(--alt-c-text-2);
}

.alt-tooltip-arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  pointer-events: none;
}

.alt-tooltip-arrow-tip {
  width: 10px;
  height: 10px;
  display: block;
  background: var(--alt-c-surface-1);
  border-top: 1px solid var(--alt-c-border);
  border-left: 1px solid var(--alt-c-border);
  transform: rotate(45deg);
}

.alt-tooltip-positioner[data-placement^="top"] .alt-tooltip-arrow {
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
}

.alt-tooltip-positioner[data-placement^="top"] .alt-tooltip-arrow-tip {
  transform: rotate(225deg);
}

.alt-tooltip-positioner[data-placement^="bottom"] .alt-tooltip-arrow {
  left: 50%;
  top: -5px;
  transform: translateX(-50%);
}

.alt-tooltip-positioner[data-placement^="bottom"] .alt-tooltip-arrow-tip {
  transform: rotate(45deg);
}

.alt-tooltip-positioner[data-placement^="left"] .alt-tooltip-arrow {
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
}

.alt-tooltip-positioner[data-placement^="left"] .alt-tooltip-arrow-tip {
  transform: rotate(135deg);
}

.alt-tooltip-positioner[data-placement^="right"] .alt-tooltip-arrow {
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
}

.alt-tooltip-positioner[data-placement^="right"] .alt-tooltip-arrow-tip {
  transform: rotate(-45deg);
}
</style>
