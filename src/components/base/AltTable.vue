<script setup lang="ts">
/**
 * @component AltTable
 * @description Data table with sortable columns, editable cells, and custom slot rendering.
 *
 * CSS Classes:
 * - `compact` — reduced padding
 * - `striped` — alternating row colors (default behavior)
 *
 * @slot header-{key} - Custom header cell for column with matching key
 * @slot cell-{key} - Custom cell rendering (receives :row and :column props)
 * @slot empty - Custom empty state content
 * @slot loading - Custom loading state content
 *
 * @cssvar --alt-font-size-scale - Font size multiplier (used in tooltip/hovercard contexts)
 * @cssvar --alt-spacing-scale - Spacing multiplier
 *
 * @example
 * <AltTable :columns="columns" :data="rows">
 *   <template #cell-actions="{ row }">
 *     <AltButton class="text x-small" icon="edit" @click="edit(row)" />
 *   </template>
 * </AltTable>
 */
import { computed } from "vue";
import type { TableColumnDefinition, TableEmits, TableRowData } from "../../types/table";

const props = withDefaults(
  defineProps<{
    columns: TableColumnDefinition[];
    data: TableRowData[];
    isEditable?: boolean;
    isLoading?: boolean;
    emptyStateMessage?: string;
  }>(),
  {
    isEditable: false,
    isLoading: false,
    emptyStateMessage: "No data available",
  },
);

const emit = defineEmits<TableEmits>();

// Computed to check if table has data
const hasTableData = computed(() => props.data.length > 0);

// Handler for column sorting
function handleColumnSort(column: TableColumnDefinition) {
  if (column.sortable) {
    emit("columnSort", column);
  }
}

// Handler for cell value update
function updateCellValue(
  event: Event,
  row: TableRowData,
  column: TableColumnDefinition,
  rowIndex: number,
) {
  const target = event.target as HTMLElement;
  const newValue = target.textContent?.trim() ?? "";

  const updatedRows = [...props.data];
  updatedRows[rowIndex] = { ...row, [column.key]: newValue };
  emit("update:rows", updatedRows);
}

// Prevent unwanted formatting on paste
function handleCellPaste(event: ClipboardEvent) {
  event.preventDefault();
  const plainText = event.clipboardData?.getData("text/plain") ?? "";
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(plainText));
    range.collapse(false);
  }
}
</script>

<template>
  <div class="base-table-wrapper">
    <!-- Table with data -->
    <table v-if="hasTableData" class="base-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              `text-${column.align || 'left'}`,
              { 'is-sortable': column.sortable },
            ]"
            :aria-sort="column.sortable ? (column.sortDirection || 'none') : undefined"
            @click="handleColumnSort(column)"
          >
            <slot
              v-if="column.type === 'custom'"
              :name="`header-${column.key}`"
              :column="column"
            >
              {{ column.label }}
            </slot>
            <template v-else>
              {{ column.label }}
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="row.id ?? rowIndex"
          :class="row.rowClass"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="[
              `text-${column.align || 'left'}`,
              column.class,
              { 'is-editable': isEditable && column.editable !== false },
            ]"
          >
            <slot :name="`cell-${column.key}`" :row="row" :column="column">
              <div
                v-if="isEditable && column.editable !== false"
                contenteditable
                class="editable-cell"
                @input="(e) => updateCellValue(e, row, column, rowIndex)"
                @paste="handleCellPaste"
                v-text="row[column.key]"
              />
              <template v-else>
                {{ row[column.key] }}
              </template>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty State -->
    <div v-else-if="!isLoading" class="table-empty-state">
      <slot name="empty">
        {{ emptyStateMessage }}
      </slot>
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="table-loading-state">
      <slot name="loading">Loading...</slot>
    </div>
  </div>
</template>

<style scoped>
.base-table-wrapper {
  --alt-font-size-scale: 1;
  --alt-spacing-scale: 1;
  .tooltip & {
    --alt-font-size-scale: 0.8;
    --alt-spacing-scale: 0.8;
  }
  overflow-x: auto;
  width: 100%;
  max-width: 90vw;
  border-radius: var(--alt-radius-lg);
  background-color: var(--alt-c-surface-1);
  box-shadow: var(--alt-shadow-3);
  .hover-card-content & {
    font-size: calc(var(--alt-font-size-0) * var(--alt-spacing-scale));
  }
}

.base-table {
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
  width: 100%;
  border: 1px solid var(--alt-c-divider);
  font-size: var(--alt-font-size-1);
}

.base-table th,
.base-table td {
  padding: calc(var(--alt-space-2) * var(--alt-spacing-scale))
    calc(var(--alt-space-3) * var(--alt-spacing-scale));
  position: relative;
  color: var(--alt-c-text-2);
}

.base-table th,
.base-table td {
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 20%;
    right: 0;
    width: 1px;
    height: 60%;
    background-color: var(--alt-c-border);
  }
}

.base-table th {
  padding: calc(var(--alt-space-3) * var(--alt-spacing-scale));
  background-color: var(--alt-c-surface-1);
  color: var(--alt-c-text-1);
  font-weight: var(--alt-font-weight-bold);
  border-top: none;
}

.base-table tr:last-child td {
  border-bottom: none;
}

.base-table tr:nth-child(even) {
  background-color: var(--alt-c-surface-1);
}

.base-table tr:nth-child(odd) {
  background-color: var(--alt-c-surface-2);
}

.base-table tr:hover {
  background-color: var(--alt-c-surface-2);
}

.base-table tr.warning {
  background-color: var(--alt-c-brand-3-50);
  [data-theme="dark"] & {
    background-color: var(--alt-c-brand-3-900);
  }
}
.base-table tr.danger {
  background-color: var(--alt-c-brand-3-200);
  [data-theme="dark"] & {
    background-color: var(--alt-c-brand-3-800);
  }
}

.editable-cell {
  min-height: 1.2em;
  outline: none;
  cursor: text;
  transition: var(--alt-transition-all);

  &:hover {
    background-color: var(--alt-c-surface-3);
  }

  &:focus {
    background-color: var(--alt-c-surface-4);
    box-shadow: var(--alt-focus-ring);
  }
}

.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.nowrap {
  white-space: nowrap;
}

.is-sortable {
  cursor: pointer;
}

.table-empty-state,
.table-loading-state {
  text-align: center;
  padding: calc(var(--alt-space-6) * var(--alt-spacing-scale));
  color: var(--alt-c-text-2);
  background-color: var(--alt-c-surface-1);
}
</style>
