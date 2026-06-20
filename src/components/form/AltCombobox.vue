<script setup lang="ts">
/**
 * @component AltCombobox
 * @description Lightweight searchable combobox without Ark-UI dependency.
 */
import { computed, onBeforeUnmount, onMounted, onUpdated, ref, useId } from "vue";

type Item = string | Record<string, unknown>;

interface AltComboboxProps {
  title?: string;
  inputPlaceholder?: string;
  items?: Item[];
  modelValue?: string;
  labelKey?: string;
  allowCustomValues?: boolean;
}

const props = withDefaults(defineProps<AltComboboxProps>(), {
  title: "Select",
  inputPlaceholder: "Search...",
  items: () => [],
  modelValue: "",
  labelKey: "label",
  allowCustomValues: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "onItemSelect", value: Item): void;
  (e: "update:inputValue", value: string): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const isOpen = ref(false);
const highlightedIndex = ref(-1);
const inputValue = ref(props.modelValue);
const listboxId = `alt-combobox-list-${useId()}`;

const filteredItems = computed(() => {
  const query = inputValue.value.trim().toLowerCase();
  if (!query) {
    return props.items;
  }

  return props.items.filter((item) => {
    return resolveItemLabel(item).toLowerCase().includes(query);
  });
});

function resolveItemLabel(item: Item): string {
  if (typeof item === "string") {
    return item;
  }

  const value = item[props.labelKey];
  return typeof value === "string" ? value : "";
}

function normalizeHighlightIndex(): void {
  if (filteredItems.value.length === 0) {
    highlightedIndex.value = -1;
    return;
  }

  if (highlightedIndex.value < 0 || highlightedIndex.value >= filteredItems.value.length) {
    highlightedIndex.value = 0;
  }
}

function synchronizeInputWithModel(): void {
  const element = inputRef.value;
  if (!element || document.activeElement === element) {
    return;
  }

  if (inputValue.value !== props.modelValue) {
    inputValue.value = props.modelValue;
  }
}

function openList(): void {
  if (isOpen.value) {
    return;
  }

  isOpen.value = true;
  normalizeHighlightIndex();
}

function closeList(): void {
  isOpen.value = false;
  highlightedIndex.value = -1;
}

function toggleList(): void {
  if (isOpen.value) {
    closeList();
    return;
  }

  openList();
  inputRef.value?.focus();
}

function selectItem(item: Item): void {
  const nextValue = resolveItemLabel(item);
  inputValue.value = nextValue;
  emit("update:inputValue", nextValue);
  emit("update:modelValue", nextValue);
  emit("onItemSelect", item);
  closeList();
}

function clearInput(): void {
  inputValue.value = "";
  emit("update:inputValue", "");
  emit("update:modelValue", "");
  openList();
  inputRef.value?.focus();
}

function setHighlightedIndex(index: number): void {
  highlightedIndex.value = index;
}

function moveHighlight(step: number): void {
  if (filteredItems.value.length === 0) {
    return;
  }

  if (!isOpen.value) {
    openList();
    return;
  }

  const next =
    (highlightedIndex.value + step + filteredItems.value.length) %
    filteredItems.value.length;
  highlightedIndex.value = next;
}

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
  emit("update:inputValue", target.value);
  emit("update:modelValue", target.value);
  openList();
}

function handleFocus(): void {
  openList();
}

function handleBlur(): void {
  if (!props.allowCustomValues) {
    const exactMatch = props.items.find(
      (item) => resolveItemLabel(item).toLowerCase() === inputValue.value.trim().toLowerCase(),
    );
    if (!exactMatch) {
      inputValue.value = props.modelValue;
      emit("update:inputValue", props.modelValue);
      emit("update:modelValue", props.modelValue);
    }
  } else {
    emit("update:modelValue", inputValue.value);
  }

  closeList();
}

function handleInputKeydown(event: KeyboardEvent): void {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveHighlight(1);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveHighlight(-1);
    return;
  }

  if (event.key === "Enter") {
    if (isOpen.value && highlightedIndex.value >= 0) {
      event.preventDefault();
      const highlightedItem = filteredItems.value[highlightedIndex.value];
      if (highlightedItem) {
        selectItem(highlightedItem);
      }
      return;
    }

    if (props.allowCustomValues) {
      emit("update:modelValue", inputValue.value);
    }
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeList();
    return;
  }

  if (event.key === "Tab") {
    closeList();
  }
}

function handleDocumentPointerDown(event: PointerEvent): void {
  if (!isOpen.value) {
    return;
  }

  const target = event.target as Node | null;
  if (target && rootRef.value?.contains(target)) {
    return;
  }

  closeList();
}

onMounted(() => {
  document.addEventListener("pointerdown", handleDocumentPointerDown);
  synchronizeInputWithModel();
});

onUpdated(() => {
  normalizeHighlightIndex();
  synchronizeInputWithModel();
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
});
</script>

<template>
  <div ref="rootRef" class="alt-combobox">
    <label v-if="title" class="alt-combobox-label">
      {{ title }}
    </label>

    <div class="alt-combobox-control" :class="{ 'alt-combobox-control--open': isOpen }">
      <input
        ref="inputRef"
        class="alt-combobox-input"
        type="text"
        :value="inputValue"
        :placeholder="inputPlaceholder"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-controls="listboxId"
        aria-autocomplete="list"
        :aria-activedescendant="
          highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined
        "
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleInputKeydown"
      />

      <button
        v-if="inputValue.length > 0"
        type="button"
        class="alt-combobox-clear-trigger"
        :aria-label="`${title} clear`"
        @mousedown.prevent
        @click="clearInput"
      >
        ×
      </button>
      <button
        type="button"
        class="alt-combobox-trigger"
        :aria-label="`${title} toggle`"
        @mousedown.prevent
        @click="toggleList"
      >
        <span aria-hidden="true">▼</span>
      </button>
    </div>

    <Transition name="alt-combobox-fade">
      <ul
        v-if="isOpen"
        :id="listboxId"
        class="alt-combobox-content"
        role="listbox"
      >
        <li v-if="filteredItems.length === 0" class="alt-combobox-empty">
          No results found
        </li>
        <li
          v-for="(item, index) in filteredItems"
          :id="`${listboxId}-option-${index}`"
          :key="`${resolveItemLabel(item)}-${index}`"
          role="option"
          :aria-selected="highlightedIndex === index"
        >
          <button
            type="button"
            class="alt-combobox-item"
            :class="{
              'is-highlighted': highlightedIndex === index,
              'is-selected': resolveItemLabel(item) === inputValue,
            }"
            @mousedown.prevent
            @mouseenter="setHighlightedIndex(index)"
            @click="selectItem(item)"
          >
            <span class="alt-combobox-item-text">
              {{ resolveItemLabel(item) }}
            </span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.alt-combobox {
  position: relative;
  width: 100%;
}

.alt-combobox-label {
  display: block;
  margin-bottom: var(--alt-space-2);
  font-weight: var(--alt-font-weight-medium);
  color: var(--alt-c-text-2);
}

.alt-combobox-control {
  display: flex;
  width: 100%;
  min-height: 40px;
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  background: var(--alt-c-surface-1);
  transition:
    border-color var(--alt-duration-fast) var(--alt-ease-in-out),
    box-shadow var(--alt-duration-fast) var(--alt-ease-in-out);
}

.alt-combobox-control--open,
.alt-combobox-control:focus-within {
  border-color: var(--alt-c-brand-1-500);
  box-shadow: var(--alt-focus-ring);
}

.alt-combobox-input {
  flex: 1;
  min-width: 0;
  height: 38px;
  padding: 0 var(--alt-space-3);
  border: none;
  background: transparent;
  color: var(--alt-c-text-1);
  font-size: var(--alt-font-size-1);
}

.alt-combobox-input:focus {
  outline: none;
}

.alt-combobox-clear-trigger,
.alt-combobox-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  border: none;
  background: transparent;
  color: var(--alt-c-text-2);
  cursor: pointer;
  font-size: var(--alt-font-size-2);
}

.alt-combobox-clear-trigger:hover,
.alt-combobox-trigger:hover {
  color: var(--alt-c-text-1);
}

.alt-combobox-content {
  position: absolute;
  top: calc(100% + var(--alt-space-1));
  left: 0;
  right: 0;
  z-index: var(--alt-z-dropdown);
  max-height: 280px;
  margin: 0;
  padding: var(--alt-space-1) 0;
  list-style: none;
  overflow-y: auto;
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  background: var(--alt-c-surface-1);
  box-shadow: var(--alt-shadow-3);
}

.alt-combobox-empty {
  padding: var(--alt-space-2) var(--alt-space-3);
  color: var(--alt-c-text-3);
  font-size: var(--alt-font-size-1);
}

.alt-combobox-item {
  width: 100%;
  border: none;
  background: transparent;
  padding: var(--alt-space-2) var(--alt-space-3);
  text-align: left;
  cursor: pointer;
  color: var(--alt-c-text-1);
}

.alt-combobox-item.is-highlighted,
.alt-combobox-item:hover {
  background: var(--alt-c-surface-2);
}

.alt-combobox-item.is-selected .alt-combobox-item-text {
  font-weight: var(--alt-font-weight-medium);
}

.alt-combobox-item-text {
  font-size: var(--alt-font-size-1);
}

.alt-combobox-fade-enter-active,
.alt-combobox-fade-leave-active {
  transition:
    opacity var(--alt-duration-fast) var(--alt-ease-in-out),
    transform var(--alt-duration-fast) var(--alt-ease-in-out);
}

.alt-combobox-fade-enter-from,
.alt-combobox-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
