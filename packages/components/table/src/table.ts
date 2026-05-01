import type { ExtractPropTypes, PropType } from 'vue'

export type TableRowData = Record<string, any>
export type TableRowKey = string | number
export type TableAlign = 'left' | 'center' | 'right'
export type TableSize = 'small' | 'default' | 'large'
export type TableVariant = 'default' | 'soft' | 'elevated'
export type TableSortOrder = 'ascending' | 'descending' | null
export type TableSortMode = 'client' | 'server'
export type TableColumnFixed = 'left' | 'right'
export type TableSelectable = boolean | ((row: TableRowData, index: number) => boolean)
export type TableRowKeyResolver =
  | string
  | ((row: TableRowData, index: number) => TableRowKey)

export type TableColumn = {
  key: string
  title: string
  dataIndex?: string
  width?: string | number
  align?: TableAlign
  headerAlign?: TableAlign
  sortable?: boolean
  ellipsis?: boolean
  hidden?: boolean
  fixed?: TableColumnFixed
  formatter?: (row: TableRowData, column: TableColumn, index: number) => unknown
  sortMethod?: (a: TableRowData, b: TableRowData) => number
}

export type TableSortState = {
  column?: TableColumn
  key: string
  order: TableSortOrder
}

export const tableProps = {
  data: {
    type: Array as PropType<TableRowData[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
  rowKey: {
    type: [String, Function] as PropType<TableRowKeyResolver>,
    default: 'id',
  },
  size: {
    type: String as PropType<TableSize>,
    default: 'default',
  },
  variant: {
    type: String as PropType<TableVariant>,
    default: 'default',
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: [Boolean, Function] as PropType<TableSelectable>,
    default: false,
  },
  selectedRowKeys: {
    type: Array as PropType<TableRowKey[]>,
    default: () => [],
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  emptyText: {
    type: String,
    default: 'No data',
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number | undefined>,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: 'Loading...',
  },
  defaultSortKey: {
    type: String,
    default: '',
  },
  defaultSortOrder: {
    type: String as PropType<TableSortOrder>,
    default: null,
  },
  sortMode: {
    type: String as PropType<TableSortMode>,
    default: 'client',
  },
  sortState: {
    type: Object as PropType<TableSortState | undefined>,
    default: undefined,
  },
  selectionFixed: {
    type: Boolean,
    default: false,
  },
} as const

export const tableEmits = {
  'update:selectedRowKeys': (keys: TableRowKey[]) => Array.isArray(keys),
  'update:sortState': (state: TableSortState) =>
    typeof state.key === 'string' &&
    (state.order === 'ascending' || state.order === 'descending' || state.order === null),
  selectionChange: (rows: TableRowData[], keys: TableRowKey[]) =>
    Array.isArray(rows) && Array.isArray(keys),
  sortChange: (state: TableSortState) =>
    typeof state.key === 'string' &&
    (state.order === 'ascending' || state.order === 'descending' || state.order === null),
  rowClick: (row: TableRowData, index: number) =>
    typeof row === 'object' && row !== null && typeof index === 'number',
  currentChange: (row: TableRowData | undefined) =>
    row === undefined || (typeof row === 'object' && row !== null),
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableEmits = typeof tableEmits
