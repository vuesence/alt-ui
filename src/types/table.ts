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
  text?: string;
  label?: string;
  sortable?: boolean;
  editable?: boolean;
  class?: string;
}

/**
 * Определение строки таблицы (из app/types/table.ts)
 * @note Этот тип похож на TableRowData, но имеет обязательное поле id
 */
export interface TableRow {
  id?: string;
  rowClass?: string;
  [key: string]: any;
}
