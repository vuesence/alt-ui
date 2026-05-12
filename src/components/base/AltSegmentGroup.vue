<script setup lang="ts">
/**
 * @component AltSegmentGroup
 * @description Segmented control / tab bar using Ark-UI SegmentGroup.
 * Displays as horizontal tabs with animated indicator.
 * Includes built-in scroll fade effect for mobile overflow.
 *
 * @prop scrollFade - Enable fade hints on scroll edges (default: true)
 * @slot item - Custom item rendering (receives :item scoped prop)
 *
 * @example
 * <AltSegmentGroup v-model="tab" :items="['Overview', 'Details', 'History']" />
 *
 * @dependency @ark-ui/vue - SegmentGroup component
 */
import { SegmentGroup } from "@ark-ui/vue/segment-group";
import type { ComponentPublicInstance, PropType } from "vue";
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

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
const segmentValue = computed({
  get() {
    return modelValue.value ?? props.items[0] ?? "";
  },
  set(value: string) {
    modelValue.value = value;
  },
});

const segmentRootRef = useTemplateRef<ComponentPublicInstance>("segmentRootRef");
const showFadeLeft = ref(false);
const showFadeRight = ref(false);

function getScrollEl(): HTMLElement | null {
  return segmentRootRef.value?.$el ?? null;
}

function updateFadeState() {
  const el = getScrollEl();
  if (!el) {
    return;
  }
  const { scrollLeft, scrollWidth, clientWidth } = el;
  showFadeLeft.value = scrollLeft > 4;
  showFadeRight.value = scrollLeft + clientWidth < scrollWidth - 4;
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (!props.scrollFade) {
    return;
  }
  const el = getScrollEl();
  if (!el) {
    return;
  }
  el.addEventListener("scroll", updateFadeState, { passive: true });
  resizeObserver = new ResizeObserver(updateFadeState);
  resizeObserver.observe(el);
  requestAnimationFrame(updateFadeState);
});

onBeforeUnmount(() => {
  getScrollEl()?.removeEventListener("scroll", updateFadeState);
  resizeObserver?.disconnect();
});
</script>

<template>
  <div
    v-if="scrollFade"
    class="segment-group-wrapper"
    :class="{ 'fade-left': showFadeLeft, 'fade-right': showFadeRight }"
  >
    <SegmentGroup.Root
      ref="segmentRootRef"
      v-model="segmentValue"
      orientation="horizontal"
      class="segment-group scrollable"
    >
      <SegmentGroup.Item
        v-for="item in props.items"
        :key="item"
        :value="item"
        class="item"
      >
        <SegmentGroup.ItemText class="item-text">
          <slot name="item" :item="item">
            {{ item }}
          </slot>
        </SegmentGroup.ItemText>
        <SegmentGroup.ItemControl class="item-control" />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Indicator class="indicator" />
    </SegmentGroup.Root>
  </div>
  <SegmentGroup.Root
    v-else
    v-model="segmentValue"
    orientation="horizontal"
    class="segment-group"
  >
    <SegmentGroup.Item
      v-for="item in props.items"
      :key="item"
      :value="item"
      class="item"
    >
      <SegmentGroup.ItemText class="item-text">
        <slot name="item" :item="item">
          {{ item }}
        </slot>
      </SegmentGroup.ItemText>
      <SegmentGroup.ItemControl class="item-control" />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
    <SegmentGroup.Indicator class="indicator" />
  </SegmentGroup.Root>
</template>

<style scoped>
@import "../../styles/tokens/scrollbar.css";

.segment-group-wrapper {
  position: relative;
  max-width: 100%;
  overflow: hidden;

  /* On mobile/tablet, avoid clipping tab labels during route/layout reflows. */
  .mobile &,
  .tablet & {
    overflow: visible;
  }

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
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  border-bottom: 1px solid var(--alt-c-border);
  overflow-x: hidden;
  overflow-y: hidden;

  &.scrollable {
    /* overflow-x: auto; */
    width: 100%;
  }

  .mobile &,
  .tablet & {
    overflow-x: auto;
    width: 100%;
    gap: var(--alt-space-2);
  }

  .indicator {
    transform: translateY(1px);
    width: var(--width);
    height: 0 !important;
    bottom: 0;
    border-bottom: var(--alt-space-1) solid var(--alt-c-brand-1-500);
    transition: var(--alt-transition-transform);
  }

  .item {
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
