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
@import "../../styles/tokens/scrollbar.css";

.segment-group {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  border-bottom: 1px solid var(--alt-c-border);
  overflow-x: hidden;
  overflow-y: hidden;
  .mobile &,
  .tablet & {
    overflow-x: auto;
    width: 100%;
    gap: var(--alt-space-2);
  }

  .indicator {
    transform: translateY(1px);
    width: var(--width);
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
