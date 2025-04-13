<script setup lang="ts">
import {
  Combobox,
  createListCollection,
  type ComboboxRootProps,
} from "@ark-ui/vue/combobox";
import { computed, nextTick, ref, watch } from "vue";

// Types
interface ComboboxItem {
  [key: string]: any;
  // label: string;
  // value: any;
  // id: string;
  // disabled?: boolean;
}

interface BaseComboboxProps {
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
  // /**
  //  * Whether the combobox is required
  //  */
  // required?: boolean;
  multiple?: boolean;
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
const props = withDefaults(defineProps<BaseComboboxProps>(), {
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
  "update:selectedItemKeys": [value: string[]];
  // "update:selectedItems": [items: ComboboxItem[]];
  change: [items: ComboboxItem[]];
  // search: [query: string];
  onItemSelect: [item: ComboboxItem];
}>();

// Models
const items = defineModel<any[]>("items", { default: [] });
const selectedItemKeys = defineModel<string[]>("selectedItemKeys", {
  default: [],
});
const inputValue = defineModel<string>("inputValue", { default: "" });
// const inputValue1 = ref("");
// const selectedItems = defineModel<ComboboxItem[]>("selectedItems", {
//   default: () => [],
// });

// Refs
// const filteredItems = ref<ComboboxItem[]>([]);
// const comboboxRef = ref<InstanceType<typeof Combobox.Root> | null>(null);

// setInterval(() => {
//   console.log("inputValue", inputValue.value);
// }, 1000);

// Computed
const collection = computed(() =>
  createListCollection({
    items: items.value,
    itemToString: (item) => item[props.labelKey],
    itemToValue: (item) => item[props.labelKey],
  }),
);

// const selectedItems = computed(() =>
//   filteredItems.value.filter((item) => selectedItemKeys.value.includes(item.id)),
// );

// Methods
// function handleInputChange(details: Combobox.InputValueChangeDetails) {
//   // console.log("inputValue", details.inputValue);
//   inputValue.value = details.inputValue;
//   emit("update:inputValue", details.inputValue);
// }

function handleInputChange(details) {
  console.log("BaseCombobox: handleValueChange called", details);

  // selectedItemKeys.value = details.value;

  // Update selectedItems based on the new selectedItemKeys
  // const newSelectedItems = items.value.filter((item) =>
  //   selectedItemKeys.value.includes(item[props.labelKey]),
  // );
  // selectedItems.value = newSelectedItems;

  nextTick(() => {
    // emit("change", newSelectedItems);
  });
}

function handleItemSelect(item: ComboboxItem) {
  console.log("BaseCombobox: handleItemSelect called", item);
  emit("onItemSelect", item);

  // Ensure the item is selected in selectedItemKeys
  const itemKey = item[props.labelKey];
  if (!selectedItemKeys.value.includes(itemKey)) {
    selectedItemKeys.value.push(itemKey);
  }

  // Emit the selected item
  // emit("on-item-select", item);
}

// function selectAll() {
//   if (!props.disabled) {
//     selectedItemKeys.value = filteredItems.value
//       .filter((item) => !item.disabled)
//       .map((item) => item.id);
//   }
// }

// function clearAll() {
//   if (!props.disabled) {
//     selectedItemKeys.value = [];
//     selectedItems.value = [];
//     inputValue.value = "";
//     emit("change", []);
//   }
// }

// function buildItems() {
//   filteredItems.value = (items.value || []).map((item, index) => ({
//     label: item[props.labelKey],
//     value: item,
//     id: String(index),
//     disabled: item.disabled,
//   }));
// }

// Watchers
// watch(
//   () => items.value?.length,
//   () => {
//     buildItems();
//     // Update selected items based on active state
//     selectedItemKeys.value = filteredItems.value
//       .filter((item) => item.value.active)
//       .map((item) => item.id);
//   },
//   { immediate: true },
// );

// watch(selectedItemKeys, () => {
//   filteredItems.value.forEach((item) => {
//     item.value.active = selectedItemKeys.value.includes(item.id);
//   });
// });
</script>

<template>
  <!-- ref="comboboxRef" -->
  <!-- v-model="selectedItemKeys" -->
  <!-- :input-value="inputValue" -->
  <!-- v-model:input-value="inputValue" -->
  <Combobox.Root
    :input-value="inputValue"
    :collection="collection"
    :multiple="false"
    selection-behavior="preserve"
    class="cb"
    :disabled="disabled"
    :positioning="positioning"
    @input-value-change="handleInputChange"
  >
    <!-- @input-value-change="handleInputChange" -->
    <!-- @value-change="handleValueChange" -->
    <Combobox.Label class="cb-label">
      {{ props.title }}
      <!-- <span v-if="required" class="cb-required" aria-hidden="true">*</span> -->
    </Combobox.Label>

    <Combobox.Control
      class="cb-control"
      :class="{ 'cb-control--disabled': disabled }"
    >
      <div class="cb-input-wrapper">
        <!-- :value="inputValue" -->
        <Combobox.Input
          class="cb-input"
          placeholder="hello"
          :aria-disabled="disabled"
        />
        <!-- :placeholder="props.inputPlaceholder" -->
        <Combobox.ClearTrigger
          v-if="selectedItemKeys.length > 0 && !disabled"
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
          <!-- <div v-if="props.showActions" class="cb-actions">
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
          </div> -->

          <Combobox.ItemGroup class="cb-item-group">
            <Combobox.Item
              v-for="item in collection.items"
              :key="item.id"
              :item="item"
              class="cb-item"
              :class="{
                'cb-item--disabled': item.disabled,
              }"
              @click="handleItemSelect(item)"
            >
              <!-- @select="handleItemSelect(item)" -->
              <div class="cb-item-content">
                <!-- <slot name="itemIcon" :item="item.value" /> -->
                <Combobox.ItemText>
                  <slot name="itemLabel" :item="item">
                    {{ item[labelKey] }}
                  </slot>
                </Combobox.ItemText>
              </div>
              <!-- <Combobox.ItemIndicator
                v-if="item.value.active"
                class="cb-item-indicator"
                aria-hidden="true"
              >
                ✓
              </Combobox.ItemIndicator> -->
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
  gap: var(--lh-space-1);
  margin-bottom: var(--lh-space-1);
  font-size: var(--lh-font-size-0);
  color: var(--lh-c-text-2);
}

.cb-required {
  color: var(--lh-c-danger);
}

.cb-control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--lh-space-2);
  width: 100%;
  padding: var(--lh-space-2);
  border: 1px solid var(--lh-c-border);
  border-radius: var(--lh-radius-base);
  background-color: var(--lh-c-surface-1);
  transition: all var(--lh-transition-base);
}

.cb-control:focus-within:not(.cb-control--disabled) {
  border-color: var(--lh-c-brand-1);
  box-shadow: var(--lh-shadow-1);
}

.cb-control--disabled {
  background-color: var(--lh-c-surface-2);
  cursor: not-allowed;
}

.cb-input-wrapper {
  display: flex;
  flex: 1;
  min-width: 7.5rem;
  max-width: 100%;
  align-items: center;
  gap: var(--lh-space-1);
  overflow: hidden;
}

.cb-input {
  flex: 1;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: var(--lh-font-size-0);
  color: var(--lh-c-text-1);
  min-width: 0;
}

.cb-input::placeholder {
  color: var(--lh-c-text-3);
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
  color: var(--lh-c-text-3);
  cursor: pointer;
  transition: color var(--lh-transition-base);
}

.cb-trigger:hover:not(:disabled),
.cb-clear-trigger:hover:not(:disabled) {
  color: var(--lh-c-text-1);
}

.cb-trigger:disabled,
.cb-clear-trigger:disabled {
  cursor: not-allowed;
}

.cb-positioner {
  margin-top: var(--lh-space-1);
  z-index: var(--lh-z-dropdown);
}

.cb-content {
  background-color: var(--lh-c-surface-1);
  border: 1px solid var(--lh-c-border);
  border-radius: var(--lh-radius-base);
  box-shadow: var(--lh-shadow-3);
  padding: var(--lh-space-1);
  overflow-y: auto;
}

.cb-actions {
  display: flex;
  gap: var(--lh-space-2);
  padding: var(--lh-space-2);
  border-bottom: 1px solid var(--lh-c-border);
}

.cb-action-btn {
  flex: 1;
  padding: var(--lh-space-1) var(--lh-space-2);
  border: none;
  background: var(--lh-c-surface-2);
  color: var(--lh-c-text-2);
  border-radius: var(--lh-radius-sm);
  cursor: pointer;
  transition: all var(--lh-transition-base);
}

.cb-action-btn:hover:not(:disabled) {
  background: var(--lh-c-surface-3);
  color: var(--lh-c-text-1);
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
  padding: var(--lh-space-2) var(--lh-space-3);
  border-radius: var(--lh-radius-sm);
  cursor: pointer;
  user-select: none;
  color: var(--lh-c-text-2);
  background-color: var(--lh-c-surface-1);
  transition: all var(--lh-transition-base);
}

.cb-item[data-highlighted]:not(.cb-item--disabled) {
  background-color: var(--lh-c-surface-2);
  color: var(--lh-c-text-1);
}

.cb-item[data-selected]:not(.cb-item--disabled) {
  color: var(--lh-c-text-1);
}

.cb-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cb-item-content {
  display: flex;
  align-items: center;
  gap: var(--lh-space-3);
}

.cb-item-indicator {
  color: var(--lh-c-brand-1);
  font-size: var(--lh-font-size-00);
}
</style>
