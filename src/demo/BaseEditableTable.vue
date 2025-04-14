<script setup lang="ts">
import { BaseButton, BaseIcon, type TableHeader, type TableRow } from "../";
import type { PropType } from "vue";

const modelValue = defineModel<TableRow[]>();

const props = defineProps({
  headers: {
    type: Array as PropType<TableHeader[]>,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  addButtonText: {
    type: String,
    default: "Add Row",
  },
});

function onCellInput(
  event: Event,
  row: TableRow,
  header: TableHeader,
  rowIndex: number,
) {
  const target = event.target as HTMLElement;
  const newValue = target.textContent?.trim() ?? "";

  row[header.key] = newValue;
  modelValue.value![rowIndex] = row;
}

function onCellPaste(event: ClipboardEvent) {
  event.preventDefault();
  const text = event.clipboardData?.getData("text/plain") ?? "";
  document.execCommand("insertText", false, text);
}

function onHeaderClick(header: TableHeader) {
  if (!header.sortable) {
    return;
  }
  // Emit sort event if needed in the future
}

function addRow() {
  const newRow: TableRow = { id: crypto.randomUUID() };
  props.headers.forEach((header) => {
    newRow[header.key] = "";
  });
  modelValue.value.push(newRow);
}

function deleteRow(index: number) {
  modelValue.value = modelValue.value?.filter((_, i) => i !== index);
}
</script>

<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            :class="{
              sortable: header.sortable,
              [header.class!]: !!header.class,
            }"
            @click="onHeaderClick(header)"
          >
            {{ header.text || header.label }}
          </th>
          <th v-if="editable" class="actions-column" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in modelValue"
          :key="row.id ?? rowIndex"
          :class="row.rowClass"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            :class="{
              [header.class!]: !!header.class,
              editable: editable && header.editable,
            }"
          >
            <div
              v-if="editable && header.editable"
              contenteditable
              class="editable-cell"
              @input="(e) => onCellInput(e, row, header, rowIndex)"
              @paste="onCellPaste"
              v-text="row[header.key]"
            />
            <template v-else>
              {{ row[header.key] }}
            </template>
          </td>
          <td v-if="editable" class="actions-column">
            <BaseIcon
              name="delete"
              size="18"
              color="currentColor"
              class="delete-icon"
              @click="deleteRow(rowIndex)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="editable" class="table-actions">
    <BaseButton variant="small" @click="addRow">
      {{ addButtonText }}
    </BaseButton>
  </div>
</template>

<style scoped>
.table-wrapper {
  --lh-font-size-scale: 1;
  --lh-spacing-scale: 1;

  .tooltip & {
    --lh-font-size-scale: 0.8;
    --lh-spacing-scale: 0.8;
  }

  overflow-x: auto;
  width: 100%;
  max-width: 90vw;
  border-radius: var(--lh-radius-lg);
  background-color: var(--lh-c-surface-1);
  box-shadow: var(--lh-shadow-3);

  .hover-card-content & {
    font-size: calc(var(--lh-font-size-0) * var(--lh-spacing-scale));
  }
}

.table {
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
  width: 100%;
  border: 1px solid var(--lh-c-divider);
  font-size: var(--lh-font-size-1);
}

.table th,
.table td {
  padding: calc(var(--lh-space-2) * var(--lh-spacing-scale))
    calc(var(--lh-space-3) * var(--lh-spacing-scale));
  position: relative;
  color: var(--lh-c-text-2);
  text-align: left;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 20%;
    right: 0;
    width: 1px;
    height: 60%;
    background-color: var(--lh-c-border);
  }
}

.table th {
  padding: calc(var(--lh-space-3) * var(--lh-spacing-scale));
  background-color: var(--lh-c-surface-1);
  color: var(--lh-c-text-1);
  font-weight: var(--lh-font-weight-bold);
  border-top: none;
}

.table tr:last-child td {
  border-bottom: none;
}

.table tr:nth-child(even) {
  background-color: var(--lh-c-surface-1);
}

.table tr:nth-child(odd) {
  background-color: var(--lh-c-surface-2);
}

.table tr:hover {
  background-color: var(--lh-c-surface-2);
}

.editable-cell {
  min-height: 1.2em;
  outline: none;
  cursor: text;
  transition: var(--lh-transition-all);
  padding: var(--lh-space-1) var(--lh-space-2);
  border-radius: var(--lh-radius-base);

  &:hover {
    background-color: var(--lh-c-surface-3);
  }

  &:focus {
    background-color: var(--lh-c-surface-4);
    box-shadow: var(--lh-focus-ring);
  }
}

.text-center {
  text-align: center !important;
}

.text-right {
  text-align: right !important;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.actions-column {
  width: 50px;
  text-align: center;
}

.table-actions {
  display: flex;
  justify-content: flex-end;
  padding: var(--lh-space-3);
  border-top: 1px solid var(--lh-c-divider);
}

.delete-icon {
  cursor: pointer;
  color: var(--lh-c-text-3);
  transition: var(--lh-transition-colors);

  &:hover {
    color: var(--lh-c-danger);
  }
}

.add-icon {
  margin-right: var(--lh-space-2);
}
</style>
