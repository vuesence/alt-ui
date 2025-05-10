<script setup lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { Combobox, createListCollection } from '@ark-ui/vue/combobox'
import { computed, ref, watch } from 'vue'

// Define type for items
type Item = string | Record<string, any>

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Select'
  },
  inputPlaceholder: {
    type: String,
    default: 'Search...'
  },
  items: {
    type: Array as () => Item[],
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  allowCustomValues: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'onItemSelect', 'update:inputValue'])

// State
const allItems = ref<Item[]>(props.items)
const filteredItems = ref<Item[]>(props.items)
const inputValue = ref(props.modelValue || '')

// Initialize state when props change
watch(() => props.items, (newItems) => {
  allItems.value = newItems
  filteredItems.value = newItems
})

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue || ''
}, { immediate: true })

// Create collection
const collection = computed(() => createListCollection({ 
  items: filteredItems.value,
  itemToString: (item: Item) => typeof item === 'string' ? item : item[props.labelKey] || ''
}))

// Handle input change
const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  const value = details.inputValue
  inputValue.value = value
  emit('update:inputValue', value)
  emit('update:modelValue', value)
  
  // Не фильтруем элементы, всегда показываем полный список
  filteredItems.value = allItems.value
}

// Handle value change when selecting from dropdown
const handleValueChange = (details: Combobox.ValueChangeDetails) => {
  if (details.value && details.value.length > 0) {
    const item = details.value[0]
    const value = typeof item === 'string' ? item : item[props.labelKey]
    emit('update:modelValue', value)
    emit('onItemSelect', item)
  }
}

// Handle blur event to ensure custom value is preserved
const handleBlur = () => {
  if (inputValue.value) {
    emit('update:modelValue', inputValue.value)
  }
}
</script>

<template>
  <Combobox.Root 
    class="alt-combobox"
    :collection="collection" 
    :input-value="inputValue"
    :allow-custom-value="allowCustomValues"
    @input-value-change="handleInputChange"
    @value-change="handleValueChange"
  >
    <Combobox.Label class="alt-combobox-label">{{ title }}</Combobox.Label>
    <Combobox.Control class="alt-combobox-control">
      <Combobox.Input 
        class="alt-combobox-input" 
        :placeholder="inputPlaceholder" 
        @blur="handleBlur"
      />
      <Combobox.ClearTrigger class="alt-combobox-clear-trigger">×</Combobox.ClearTrigger>
      <Combobox.Trigger class="alt-combobox-trigger">▼</Combobox.Trigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner class="alt-combobox-positioner">
        <Combobox.Content class="alt-combobox-content">
          <Combobox.ItemGroup class="alt-combobox-item-group">
            <Combobox.Item 
              class="alt-combobox-item"
              v-for="item in collection.items" 
              :key="typeof item === 'string' ? item : item[labelKey]" 
              :item="item"
            >
              <Combobox.ItemText class="alt-combobox-item-text">
                {{ typeof item === 'string' ? item : item[labelKey] }}
              </Combobox.ItemText>
              <!-- <Combobox.ItemIndicator class="alt-combobox-item-indicator">✓</Combobox.ItemIndicator> -->
            </Combobox.Item>
            <!-- <div v-if="collection.items.length === 0" class="empty-message">
              No results found
            </div> -->
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>

<style scoped>
.empty-message {
  padding: 8px 12px;
  color: #999;
  text-align: center;
  font-style: italic;
}

/* Combobox base styles */
:deep(.ark-combobox__root),
.alt-combobox {
  position: relative;
  width: 100%;
}

:deep(.ark-combobox__label),
.alt-combobox-label {
  display: block;
  margin-bottom: var(--alt-space-2);
  font-weight: var(--alt-font-weight-medium);
}

:deep(.ark-combobox__control),
.alt-combobox-control {
  display: flex;
  width: 100%;
  height: 40px;
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  background: var(--alt-c-surface-1);
  overflow: hidden;
}

:deep(.ark-combobox__input),
.alt-combobox-input {
  flex: 1;
  height: 100%;
  padding: 0 var(--alt-space-3);
  border: none;
  background: transparent;
  color: var(--alt-c-text-1);
  font-size: var(--alt-font-size-1);
}

:deep(.ark-combobox__input:focus),
.alt-combobox-input:focus {
  outline: none;
}

:deep(.ark-combobox__trigger),
.alt-combobox-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--alt-c-text-2);
  cursor: pointer;
}

:deep(.ark-combobox__clear-trigger),
.alt-combobox-clear-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--alt-c-text-2);
  cursor: pointer;
}

:deep(.ark-combobox__content),
.alt-combobox-content {
  /* width: var(--width, 260px); */
  /* max-height: var(--height, 360px); */
  overflow-y: auto;
  border: 1px solid var(--alt-c-border);
  border-radius: var(--alt-radius-base);
  background: var(--alt-c-surface-1);
  box-shadow: var(--alt-shadow-md);
  z-index: 1000;
}

:deep(.ark-combobox__item-group),
.alt-combobox-item-group {
  padding: var(--alt-space-1) 0;
}

:deep(.ark-combobox__item-group-label) {
  padding: var(--alt-space-1) var(--alt-space-3);
  font-size: var(--alt-font-size-0);
  font-weight: var(--alt-font-weight-medium);
  color: var(--alt-c-text-2);
}

:deep(.ark-combobox__item),
.alt-combobox-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--alt-space-2) var(--alt-space-3);
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
}

:deep(.ark-combobox__item[data-selected]),
.alt-combobox-item[data-selected] {
  background: var(--alt-c-surface-2);
}

:deep(.ark-combobox__item[data-highlighted]),
.alt-combobox-item[data-highlighted] {
  background: var(--alt-c-surface-2);
}

:deep(.ark-combobox__item-text),
.alt-combobox-item-text {
  color: var(--alt-c-text-1);
  font-size: var(--alt-font-size-1);
}

:deep(.ark-combobox__item-indicator),
.alt-combobox-item-indicator {
  color: var(--alt-c-brand-1-500);
}
</style>
