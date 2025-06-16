<script setup lang="ts">
// Документация по работе AltCombobox:
/*
 * Основные характеристики AltCombobox:
 *
 * 1. Модель (v-model):
 *    - Принимает массив строк
 *    - При выборе элемента содержит индекс выбранного элемента в массиве items
 *    - Например: ['0'] - выбран первый элемент, ['1'] - второй
 *
 * 2. Входные параметры:
 *    - :items - массив элементов для выбора
 *    - :input-value - текущее значение в поле ввода
 *    - :label-key - ключ для отображения метки элемента
 *
 * 3. События:
 *    - @input-value-change - изменение текста в поле ввода
 *    - @value-change - выбор элемента из списка
 *    - @clear - очистка выбора
 *
 * 4. Особенности работы:
 *    - При поиске передает индекс элемента, а не его ID
 *    - Позволяет множественный выбор (если настроен)
 *    - Автоматически управляет открытием/закрытием списка
 *
 * 5. Рекомендации по использованию:
 *    - Всегда преобразовывать индекс в элемент массива
 *    - Контролировать состояние поля ввода
 *    - Очищать selectedValue после выбора, если нужно
 */

import {
  Combobox,
  createListCollection,
  type ComboboxRootProps,
} from "@ark-ui/vue/combobox";
import { computed, nextTick, ref, watch } from "vue";

// Types
interface ComboboxItem {
  label: string;
  value: any;
  id: string;
  disabled?: boolean;
}

interface AltComboboxProps {
  /**
   * Title text for the combobox
   */
  title?: string;
  /**
   * Placeholder text for the input
   */
  inputPlaceholder?: string;
  /**
   * Key to use for item labels
   */
  labelKey?: string;
  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the combobox is required
   */
  required?: boolean;
  /**
   * Whether to show the select/clear all buttons
   */
  showActions?: boolean;
  /**
   * Maximum height of the dropdown in rem
   */
  maxHeight?: number;
  /**
   * Custom positioning options
   */
  positioning?: {
    placement?:
      | "top"
      | "top-start"
      | "top-end"
      | "bottom"
      | "bottom-start"
      | "bottom-end";
    flip?: boolean;
    overlap?: boolean;
    sameWidth?: boolean;
  };
}

// Props
const props = withDefaults(defineProps<AltComboboxProps>(), {
  title: "Select",
  inputPlaceholder: "Search",
  labelKey: "label",
  disabled: false,
  required: false,
  showActions: false,
  maxHeight: 37.5,
  positioning: () => ({
    placement: "bottom-start",
    flip: true,
    overlap: false,
    sameWidth: true,
  }),
});

// Emits
const emit = defineEmits<{
  "update:modelValue": [value: string[]];
  change: [items: ComboboxItem[]];
  search: [query: string];
}>();

// Models
const items = defineModel<any[]>("items");
const modelValue = defineModel<string[]>("modelValue", { default: [] });

// Refs
const inputValue = ref("");
const filteredItems = ref<ComboboxItem[]>([]);
// const comboboxRef = ref<InstanceType<typeof Combobox.Root> | null>(null);

// Computed
const collection = computed(() =>
  createListCollection({
    items: filteredItems.value,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.id,
    // getDisabled: (item) => item.disabled ?? false,
  }),
);

const selectedItems = computed(() =>
  filteredItems.value.filter((item) => modelValue.value.includes(item.id)),
);

// Methods
function handleInputChange(details: Combobox.InputValueChangeDetails) {
  inputValue.value = details.inputValue;
  emit("search", details.inputValue);

  buildItems();
  filteredItems.value = filteredItems.value.filter((item) =>
    item.label.toLowerCase().includes(details.inputValue.toLowerCase()),
  );
}

function handleValueChange(details: { value: string[] }) {
  modelValue.value = details.value;
  nextTick(() => {
    emit("change", selectedItems.value);
  });
}

function selectAll() {
  if (!props.disabled) {
    modelValue.value = filteredItems.value
      .filter((item) => !item.disabled)
      .map((item) => item.id);
  }
}

function clearAll() {
  if (!props.disabled) {
    modelValue.value = [];
  }
}

function buildItems() {
  filteredItems.value = (items.value || []).map((item, index) => ({
    label: item[props.labelKey],
    value: item,
    id: String(index),
    disabled: item.disabled,
  }));
}

// Watchers
watch(
  () => items.value?.length,
  () => {
    buildItems();
    // Update selected items based on active state
    modelValue.value = filteredItems.value
      .filter((item) => item.value.active)
      .map((item) => item.id);
  },
  { immediate: true },
);

watch(modelValue, () => {
  filteredItems.value.forEach((item) => {
    item.value.active = modelValue.value.includes(item.id);
  });
});
</script>

<template>
  <!-- ref="comboboxRef" -->
  <Combobox.Root
    v-model="modelValue"
    :collection="collection"
    :multiple="true"
    class="cb"
    :input-value="inputValue"
    :disabled="disabled"
    :positioning="positioning"
    @input-value-change="handleInputChange"
    @value-change="handleValueChange"
  >
    <Combobox.Label class="cb-label">
      {{ props.title }}
      <span v-if="required" class="cb-required" aria-hidden="true">*</span>
    </Combobox.Label>

    <Combobox.Control
      class="cb-control"
      :class="{ 'cb-control--disabled': disabled }"
    >
      <div class="cb-input-wrapper">
        <Combobox.Input
          class="cb-input"
          :placeholder="props.inputPlaceholder"
          :value="inputValue"
          :aria-required="required"
          :aria-disabled="disabled"
        />
        <Combobox.ClearTrigger
          v-if="modelValue.length > 0 && !disabled"
          class="cb-clear-trigger"
          aria-label="Clear selection"
        >
          ×
        </Combobox.ClearTrigger>
        <Combobox.Trigger class="cb-trigger" aria-label="Toggle dropdown">
          ▼
        </Combobox.Trigger>
      </div>
    </Combobox.Control>

    <Teleport to="body">
      <Combobox.Positioner class="cb-positioner">
        <Combobox.Content
          class="cb-content"
          :style="{ maxHeight: `${props.maxHeight}rem` }"
        >
          <div v-if="props.showActions" class="cb-actions">
            <button
              class="cb-action-btn"
              type="button"
              :disabled="disabled"
              aria-label="Select all items"
              @click="selectAll"
            >
              Select All
            </button>
            <button
              class="cb-action-btn"
              type="button"
              :disabled="disabled"
              aria-label="Clear all selections"
              @click="clearAll"
            >
              Clear All
            </button>
          </div>

          <Combobox.ItemGroup class="cb-item-group">
            <Combobox.Item
              v-for="item in collection.items"
              :key="item.id"
              :item="item"
              class="cb-item"
              :class="{
                'cb-item--disabled': item.disabled,
              }"
            >
              <div class="cb-item-content">
                <slot name="itemIcon" :item="item.value" />
                <Combobox.ItemText>
                  <slot name="itemLabel" :item="item.value">
                    {{ item.label }}
                  </slot>
                </Combobox.ItemText>
              </div>
              <Combobox.ItemIndicator
                v-if="item.value.active"
                class="cb-item-indicator"
                aria-hidden="true"
              >
                ✓
              </Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>

<style scoped>
.cb {
  width: 100%;
  max-width: 20rem;
}

.cb-label {
  display: inline-flex;
  gap: var(--alt-space-1);
  margin-bottom: var(--alt-space-1);
  font-size: var(--alt-font-size-0);
  color: var(--alt-c-text-2);
}

.cb-required {
  color: var(--alt-c-danger);
}

.cb-control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--alt-space-2);
  width: 100%;
  padding: var(--alt-space-2);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  background-color: var(--alt-c-surface-1);
  transition: all var(--alt-transition-base);
}

.cb-control:focus-within:not(.cb-control--disabled) {
  border-color: var(--alt-c-brand-1);
  box-shadow: var(--alt-shadow-1);
}

.cb-control--disabled {
  background-color: var(--alt-c-surface-2);
  cursor: not-allowed;
}

.cb-input-wrapper {
  display: flex;
  flex: 1;
  min-width: 7.5rem;
  max-width: 100%;
  align-items: center;
  gap: var(--alt-space-1);
  overflow: hidden;
}

.cb-input {
  flex: 1;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: var(--alt-font-size-0);
  color: var(--alt-c-text-1);
  min-width: 0;
}

.cb-input::placeholder {
  color: var(--alt-c-text-3);
}

.cb-input:disabled {
  cursor: not-allowed;
}

.cb-trigger,
.cb-clear-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--alt-c-text-3);
  cursor: pointer;
  transition: color var(--alt-transition-base);
}

.cb-trigger:hover:not(:disabled),
.cb-clear-trigger:hover:not(:disabled) {
  color: var(--alt-c-text-1);
}

.cb-trigger:disabled,
.cb-clear-trigger:disabled {
  cursor: not-allowed;
}

.cb-positioner {
  margin-top: var(--alt-space-1);
  z-index: var(--alt-z-dropdown);
}

.cb-content {
  background-color: var(--alt-c-surface-1);
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  box-shadow: var(--alt-shadow-3);
  padding: var(--alt-space-1);
  overflow-y: auto;
}

.cb-actions {
  display: flex;
  gap: var(--alt-space-2);
  padding: var(--alt-space-2);
  border-bottom: 1px solid var(--alt-c-border);
}

.cb-action-btn {
  flex: 1;
  padding: var(--alt-space-1) var(--alt-space-2);
  border: none;
  background: var(--alt-c-surface-2);
  color: var(--alt-c-text-2);
  border-radius: var(--alt-radius-sm);
  cursor: pointer;
  transition: all var(--alt-transition-base);
}

.cb-action-btn:hover:not(:disabled) {
  background: var(--alt-c-surface-3);
  color: var(--alt-c-text-1);
}

.cb-action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cb-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--alt-space-2) var(--alt-space-3);
  border-radius: var(--alt-radius-sm);
  cursor: pointer;
  user-select: none;
  color: var(--alt-c-text-2);
  background-color: var(--alt-c-surface-1);
  transition: all var(--alt-transition-base);
}

.cb-item[data-highlighted]:not(.cb-item--disabled) {
  background-color: var(--alt-c-surface-2);
  color: var(--alt-c-text-1);
}

.cb-item[data-selected]:not(.cb-item--disabled) {
  color: var(--alt-c-text-1);
}

.cb-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cb-item-content {
  display: flex;
  align-items: center;
  gap: var(--alt-space-3);
}

.cb-item-indicator {
  color: var(--alt-c-brand-1);
  font-size: var(--alt-font-size-00);
}
</style>
