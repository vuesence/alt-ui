<script setup lang="ts">
/**
 * @component AltJsonTreeView
 * @description Wrapper over Ark-UI JsonTreeView for displaying JSON data
 * in a collapsible tree format. Designed for admin interfaces.
 *
 * CSS Classes (apply on component root):
 * - `compact` — reduced padding and font size
 * - `bordered` — visible border around the tree
 * - `monospace` — force monochrome monospace style
 *
 * @example
 * <AltJsonTreeView :data="healthRecord" />
 *
 * @example
 * <AltJsonTreeView
 *   :data="apiResponse"
 *   :default-expanded-depth="2"
 *   :collapse-strings-after-length="80"
 *   class="compact bordered"
 * />
 *
 * @example
 * <AltJsonTreeView
 *   :data="userData"
 *   :quotes-on-keys="true"
 *   :max-preview-items="5"
 *   selection-mode="multiple"
 *   @selection-change="onSelect"
 * />
 *
 * @dependency @ark-ui/vue - JsonTreeView component
 */
import { JsonTreeView } from "@ark-ui/vue/json-tree-view";

export interface AltJsonTreeViewProps {
  /** JSON data to display */
  data: object;
  /** Number of levels to expand by default */
  defaultExpandedDepth?: number;
  /** Specific node IDs to expand by default */
  defaultExpandedValue?: string[];
  /** Show quotes around object keys */
  quotesOnKeys?: boolean;
  /** Max items to show in collapsed object/array preview */
  maxPreviewItems?: number;
  /** Truncate strings longer than this */
  collapseStringsAfterLength?: number;
  /** Group array items after this length */
  groupArraysAfterLength?: number;
  /** Show non-enumerable properties */
  showNonenumerable?: boolean;
  /** Selection mode */
  selectionMode?: "single" | "multiple";
  /** Expand/collapse on click */
  expandOnClick?: boolean;
  /** Lazy mount collapsed content */
  lazyMount?: boolean;
}

const props = withDefaults(defineProps<AltJsonTreeViewProps>(), {
  defaultExpandedDepth: 1,
  quotesOnKeys: false,
  maxPreviewItems: 5,
  expandOnClick: true,
  lazyMount: false,
});

const emit = defineEmits<{
  "selection-change": [details: { selectedValue: string[] }];
  "expanded-change": [details: { expandedValue: string[] }];
}>();
</script>

<template>
  <div class="alt-json-tree-view">
    <JsonTreeView.Root
      :data="props.data"
      :default-expanded-depth="props.defaultExpandedDepth"
      :default-expanded-value="props.defaultExpandedValue"
      :quotes-on-keys="props.quotesOnKeys"
      :max-preview-items="props.maxPreviewItems"
      :collapse-strings-after-length="props.collapseStringsAfterLength"
      :group-arrays-after-length="props.groupArraysAfterLength"
      :show-nonenumerable="props.showNonenumerable"
      :selection-mode="props.selectionMode"
      :expand-on-click="props.expandOnClick"
      :lazy-mount="props.lazyMount"
      @selection-change="(d: { selectedValue: string[] }) => emit('selection-change', d)"
      @expanded-change="(d: { expandedValue: string[] }) => emit('expanded-change', d)"
    >
      <JsonTreeView.Tree>
        <template #arrow>
          <svg class="tree-arrow" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </template>
      </JsonTreeView.Tree>
    </JsonTreeView.Root>
  </div>
</template>

<style scoped>
.alt-json-tree-view {
  --tree-font-size: var(--alt-font-size-0);
  --tree-line-height: var(--alt-line-height-2);
  --tree-indent: var(--alt-space-5);
  --tree-padding: var(--alt-space-4);

  font-family: var(--alt-font-family-mono);
  font-size: var(--tree-font-size);
  line-height: var(--tree-line-height);
  color: var(--alt-c-text-1);
  padding: var(--tree-padding);
  background: var(--alt-c-surface-1);
  border-radius: var(--alt-radius-md);
  overflow: auto;
}

/* Compact variant */
.alt-json-tree-view.compact {
  --tree-font-size: var(--alt-font-size-000);
  --tree-indent: var(--alt-space-4);
  --tree-padding: var(--alt-space-2);
}

/* Bordered variant */
.alt-json-tree-view.bordered {
  border: 1px solid var(--alt-c-border);
}

/* Monospace variant */
.alt-json-tree-view.monospace :deep([data-part="value"]) {
  color: var(--alt-c-text-1);
}

/* Arrow icon */
.tree-arrow {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--alt-c-text-3);
  transition: transform var(--alt-duration-fast) var(--alt-ease-in-out);
  flex-shrink: 0;
}

/* Ark-UI data-part styling */
.alt-json-tree-view :deep([data-scope="tree-view"]) {
  font-family: inherit;
}

.alt-json-tree-view :deep([data-part="branch-content"]) {
  padding-left: var(--tree-indent);
}

.alt-json-tree-view :deep([data-part="branch-control"]) {
  display: flex;
  align-items: center;
  gap: var(--alt-space-1);
  cursor: pointer;
  padding: var(--alt-space-0) 0;
  border-radius: var(--alt-radius-sm);
  transition: background-color var(--alt-duration-fast) var(--alt-ease-in-out);

  &:hover {
    background-color: var(--alt-c-surface-2);
  }
}

.alt-json-tree-view :deep([data-part="branch-indicator"]) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alt-json-tree-view :deep([data-part="branch-indicator"][data-state="open"]) .tree-arrow {
  transform: rotate(90deg);
}

.alt-json-tree-view :deep([data-part="item"]) {
  display: flex;
  align-items: center;
  gap: var(--alt-space-1);
  padding: var(--alt-space-0) 0;
  padding-left: calc(0.875rem + var(--alt-space-1));

  &[data-selected] {
    background-color: var(--alt-c-brand-soft);
    border-radius: var(--alt-radius-sm);
  }
}

/* JSON value type colors */
.alt-json-tree-view :deep([data-type="string"]) {
  color: var(--alt-c-success);
}

.alt-json-tree-view :deep([data-type="number"]) {
  color: var(--alt-c-brand-1-500);
}

.alt-json-tree-view :deep([data-type="boolean"]) {
  color: var(--alt-c-brand-3-500);
}

.alt-json-tree-view :deep([data-type="null"]),
.alt-json-tree-view :deep([data-type="undefined"]) {
  color: var(--alt-c-text-3);
  font-style: italic;
}

/* Branch indent guide */
.alt-json-tree-view :deep([data-part="branch-indent-guide"]) {
  border-left: 1px solid var(--alt-c-border);
  margin-left: 0.4375rem;
}
</style>
