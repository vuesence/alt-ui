/**
 * Определение колонки таблицы
 */
export interface TableColumnDefinition {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  editable?: boolean;
  type?: "text" | "custom";
  class?: string;
}

/**
 * Определение строки таблицы
 */
export interface TableRowData {
  id?: string | number;
  [key: string]: any;
  rowClass?: string;
}

/**
 * События для таблицы
 */
export interface TableEmits {
  (event: "columnSort", column: TableColumnDefinition): void;
  (event: "update:rows", rows: TableRowData[]): void;
}

/**
 * Определение заголовка таблицы (из app/types/table.ts)
 */
export interface TableHeader {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  // Дополнительные свойства, используемые в BaseEditableTable
  class?: string;
  text?: string; // Если не указано, используется label
  editable?: boolean;
}

/**
 * Определение строки таблицы (из app/types/table.ts)
 * @note Этот тип похож на TableRowData, но имеет обязательное поле id
 */
export interface TableRow {
  id: string | number;
  [key: string]: any;
}
