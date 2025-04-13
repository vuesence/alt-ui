<script setup lang="ts">
import { SegmentGroup } from "@ark-ui/vue/segment-group";
import type { PropType } from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const modelValue = defineModel<string>();
</script>

<template>
  <SegmentGroup.Root
    v-model="modelValue"
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
@import "@/ui/styles/tokens/scrollbar.css";

.segment-group {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  border-bottom: 1px solid var(--lh-c-border);
  overflow-x: hidden;
  overflow-y: hidden;
  .mobile &,
  .tablet & {
    overflow-x: auto;
    width: 100%;
    gap: var(--lh-space-2);
  }

  .indicator {
    transform: translateY(1px);
    width: var(--width);
    bottom: 0;
    border-bottom: var(--lh-space-1) solid var(--lh-c-brand-1-500);
    transition: var(--lh-transition-transform);
  }

  .item {
    font-size: var(--lh-font-size-2);
    font-weight: var(--lh-font-weight-medium);
    line-height: var(--lh-line-height-2);
    padding: var(--lh-space-2) var(--lh-space-3);
    color: var(--lh-c-text-3);
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    transition: var(--lh-transition-colors);
    user-select: none;

    flex-shrink: 0;
    max-width: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;

    min-width: 5rem;

    &[data-state="checked"] {
      color: var(--lh-c-text-1);
      font-weight: var(--lh-font-weight-bold);
    }

    &[data-disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:hover:not([data-disabled]) {
      color: var(--lh-c-text-2);
    }

    &:focus-visible {
      outline: 2px solid var(--lh-c-brand-1-500);
      outline-offset: var(--lh-space-1);
    }
  }

  .mobile & {
    .item {
      padding: var(--lh-space-2) var(--lh-space-2);
      font-size: var(--lh-font-size-1);
      min-width: max-content;
    }
  }
}
</style>
