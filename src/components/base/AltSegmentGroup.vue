<script setup lang="ts">
/**
 * @component AltSegmentGroup
 * @description Segmented control / tab bar with animated indicator.
 * Displays as horizontal tabs with animated indicator.
 * Includes built-in scroll fade effect for mobile overflow.
 *
 * @prop scrollFade - Enable fade hints on scroll edges (default: true)
 * @slot item - Custom item rendering (receives :item scoped prop)
 *
 * @example
 * <AltSegmentGroup v-model="tab" :items="['Overview', 'Details', 'History']" />
 */
import type { PropType } from "vue";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
} from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  scrollFade: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel<string>();
const segmentRootRef = ref<HTMLElement | null>(null);
const itemRefs = new Map<string, HTMLButtonElement>();
const showFadeLeft = ref(false);
const showFadeRight = ref(false);
const indicatorWidth = ref(0);
const indicatorTranslateX = ref(0);
const indicatorVisible = ref(false);

const selectedValue = computed(() => {
  const current = modelValue.value;
  if (current && props.items.includes(current)) {
    return current;
  }

  return props.items[0] ?? "";
});

function getScrollEl(): HTMLElement | null {
  return segmentRootRef.value;
}

function updateFadeState() {
  if (!props.scrollFade) {
    showFadeLeft.value = false;
    showFadeRight.value = false;
    return;
  }

  const el = getScrollEl();
  if (!el) {
    return;
  }
  const { scrollLeft, scrollWidth, clientWidth } = el;
  showFadeLeft.value = scrollLeft > 4;
  showFadeRight.value = scrollLeft + clientWidth < scrollWidth - 4;
}

function setItemRef(element: HTMLButtonElement | null, item: string): void {
  if (!element) {
    itemRefs.delete(item);
    return;
  }

  itemRefs.set(item, element);
}

function updateIndicator(): void {
  const currentItem = selectedValue.value;
  const currentElement = itemRefs.get(currentItem);
  if (!currentItem || !currentElement) {
    indicatorVisible.value = false;
    return;
  }

  indicatorWidth.value = currentElement.offsetWidth;
  indicatorTranslateX.value = currentElement.offsetLeft;
  indicatorVisible.value = true;
}

function commitSelection(value: string): void {
  modelValue.value = value;
}

function handleItemClick(item: string): void {
  if (selectedValue.value === item) {
    return;
  }

  commitSelection(item);
}

function focusByOffset(currentItem: string, offset: number): void {
  if (props.items.length === 0) {
    return;
  }

  const currentIndex = props.items.indexOf(currentItem);
  if (currentIndex === -1) {
    return;
  }

  const nextIndex = (currentIndex + offset + props.items.length) % props.items.length;
  const nextItem = props.items[nextIndex];
  itemRefs.get(nextItem)?.focus();
  commitSelection(nextItem);
}

function handleItemKeydown(event: KeyboardEvent, item: string): void {
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    focusByOffset(item, 1);
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    focusByOffset(item, -1);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    const first = props.items[0];
    if (!first) {
      return;
    }

    itemRefs.get(first)?.focus();
    commitSelection(first);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    const last = props.items[props.items.length - 1];
    if (!last) {
      return;
    }

    itemRefs.get(last)?.focus();
    commitSelection(last);
  }
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  const el = getScrollEl();
  if (!el) {
    return;
  }

  el.addEventListener("scroll", updateFadeState, { passive: true });
  resizeObserver = new ResizeObserver(() => {
    updateFadeState();
    updateIndicator();
  });
  resizeObserver.observe(el);

  requestAnimationFrame(() => {
    updateFadeState();
    updateIndicator();
  });
});

onUpdated(() => {
  updateFadeState();
  updateIndicator();
});

onBeforeUnmount(() => {
  getScrollEl()?.removeEventListener("scroll", updateFadeState);
  resizeObserver?.disconnect();
});
</script>

<template>
  <div
    class="segment-group-wrapper"
    :class="{
      'fade-enabled': props.scrollFade,
      'fade-left': props.scrollFade && showFadeLeft,
      'fade-right': props.scrollFade && showFadeRight,
    }"
  >
    <div
      ref="segmentRootRef"
      class="segment-group"
      :class="{ scrollable: props.scrollFade }"
      role="tablist"
      aria-orientation="horizontal"
    >
      <button
        v-for="(item, index) in props.items"
        :key="item"
        :ref="
          (element) => setItemRef(element as HTMLButtonElement | null, item)
        "
        type="button"
        role="tab"
        class="item"
        :data-state="selectedValue === item ? 'checked' : 'unchecked'"
        :aria-selected="selectedValue === item"
        :tabindex="selectedValue === item || (selectedValue === '' && index === 0) ? 0 : -1"
        @click="handleItemClick(item)"
        @keydown="handleItemKeydown($event, item)"
      >
        <span class="item-text">
          <slot name="item" :item="item">
            {{ item }}
          </slot>
        </span>
        <span class="item-control" aria-hidden="true" />
      </button>

      <span
        class="indicator"
        :style="{
          '--width': `${indicatorWidth}px`,
          transform: `translateX(${indicatorTranslateX}px) translateY(1px)`,
          opacity: indicatorVisible ? '1' : '0',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
@import "../../styles/tokens/scrollbar.css";

.segment-group-wrapper {
  position: relative;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  flex-shrink: 0;
  overflow: hidden;

  /* On mobile/tablet, avoid clipping tab labels during route/layout reflows. */
  /* .mobile &,
  .tablet & {
    overflow: visible;
  } */

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: -1px;
    width: 48px;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity var(--alt-duration-fast) var(--alt-ease-in-out);
  }

  &::before {
    left: -1px;
    background: linear-gradient(
      to right,
      var(--scroll-fade-bg, var(--alt-c-bg)) 0%,
      transparent 100%
    );
  }

  &::after {
    right: -1px;
    background: linear-gradient(
      to left,
      var(--scroll-fade-bg, var(--alt-c-bg)) 0%,
      transparent 100%
    );
  }

  &.fade-left::before {
    opacity: 1;
  }

  &.fade-right::after {
    opacity: 1;
  }
}

.segment-group {
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  border-bottom: 1px solid var(--alt-c-border);
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
  overflow-x: hidden;
  overflow-y: hidden;

  &.scrollable {
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .mobile &,
  .tablet & {
    gap: var(--alt-space-2);
  }

  .indicator {
    position: absolute;
    left: 0;
    transform: translateY(1px);
    width: var(--width);
    height: 0 !important;
    bottom: 0;
    pointer-events: none;
    border-bottom: var(--alt-space-1) solid var(--alt-c-brand-1-500);
    transition:
      transform var(--alt-transition-base),
      width var(--alt-transition-base),
      opacity var(--alt-transition-base);
  }

  .item {
    appearance: none;
    border: none;
    background: transparent;
    font-size: var(--alt-font-size-2);
    font-weight: var(--alt-font-weight-medium);
    line-height: var(--alt-line-height-2);
    padding: var(--alt-space-2) var(--alt-space-3);
    color: var(--alt-c-text-3);
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    transition: var(--alt-transition-colors);
    user-select: none;

    flex-shrink: 0;
    max-width: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;

    min-width: 5rem;

    &[data-state="checked"] {
      color: var(--alt-c-text-1);
      font-weight: var(--alt-font-weight-bold);
    }

    &[data-disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:hover:not([data-disabled]) {
      color: var(--alt-c-text-2);
    }

    &:focus-visible {
      outline: 2px solid var(--alt-c-brand-1-500);
      outline-offset: var(--alt-space-1);
    }
  }

  .mobile & {
    .item {
      padding: var(--alt-space-2) var(--alt-space-2);
      font-size: var(--alt-font-size-1);
      min-width: max-content;
    }
  }
}
</style>
