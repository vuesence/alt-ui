<script setup lang="ts">
/**
 * @component AltToggleGroup
 * @description Toggle button group with optional radio-like behavior.
 *
 * @slot item - Custom item rendering (receives :item scoped prop)
 *
 * @example
 * <AltToggleGroup v-model="selected" :items="['Option A', 'Option B', 'Option C']" />
 */
import { computed, type PropType } from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  radioGroupMode: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel<string>();
const itemRefs = new Map<string, HTMLButtonElement>();
const selectedValue = computed(() => {
  const current = modelValue.value;
  if (current && props.items.includes(current)) {
    return current;
  }

  if (props.radioGroupMode) {
    return props.items[0] ?? "";
  }

  return "";
});

function isSelected(item: string): boolean {
  return selectedValue.value === item;
}

function setItemRef(element: HTMLButtonElement | null, item: string): void {
  if (!element) {
    itemRefs.delete(item);
    return;
  }

  itemRefs.set(item, element);
}

function commitSelection(nextValue: string): void {
  modelValue.value = nextValue;
}

function handleItemClick(item: string): void {
  const currentlySelected = isSelected(item);
  if (currentlySelected) {
    if (props.radioGroupMode) {
      return;
    }

    commitSelection("");
    return;
  }

  commitSelection(item);
}

function focusItemByOffset(currentItem: string, offset: number): void {
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
  handleItemClick(nextItem);
}

function handleItemKeydown(event: KeyboardEvent, item: string): void {
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    focusItemByOffset(item, 1);
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    focusItemByOffset(item, -1);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    const first = props.items[0];
    if (!first) {
      return;
    }

    itemRefs.get(first)?.focus();
    handleItemClick(first);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    const last = props.items[props.items.length - 1];
    if (!last) {
      return;
    }

    itemRefs.get(last)?.focus();
    handleItemClick(last);
  }
}
</script>

<template>
  <div class="toggle-group-root" role="group">
    <button
      v-for="(item, index) in items"
      :key="index"
      :ref="(element) => setItemRef(element as HTMLButtonElement | null, item)"
      type="button"
      class="toggle-group-item"
      :data-state="isSelected(item) ? 'on' : 'off'"
      :aria-pressed="isSelected(item)"
      :tabindex="isSelected(item) || (selectedValue === '' && index === 0) ? 0 : -1"
      @click="handleItemClick(item)"
      @keydown="handleItemKeydown($event, item)"
    >
      <slot name="item" :item="item">
        {{ item }}
      </slot>
    </button>
  </div>
</template>

<style scoped>
.toggle-group-root {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--alt-space-4);
}

.toggle-group-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  background: var(--alt-c-surface-1);
  color: var(--alt-c-text-2);
  font-size: var(--alt-font-size-1);
  font-weight: var(--alt-font-weight-medium);
  cursor: pointer;
  transition:
    background-color var(--alt-transition-colors),
    color var(--alt-transition-colors),
    border-color var(--alt-transition-colors);
}

.toggle-group-item:hover {
  border-color: var(--alt-c-brand-1-400);
}

.toggle-group-item[data-state="on"] {
  color: var(--alt-c-text-1);
  border-color: var(--alt-c-brand-1-500);
  background: var(--alt-c-bg-alt);
}

.toggle-group-item:focus-visible {
  outline: 2px solid var(--alt-c-brand-1-500);
  outline-offset: 2px;
}
</style>
