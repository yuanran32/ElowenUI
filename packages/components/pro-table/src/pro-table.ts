import type { ExtractPropTypes, PropType } from 'vue'
import type { SchemaFormField, SchemaFormModel } from '../../schema-form'
import type { TableColumn, TableRowData, TableRowKeyResolver, TableSortState } from '../../table'

export type ProTableRequestParams = {
  page: number
  pageSize: number
  sorter?: {
    key: string
    order: TableSortState['order']
  }
  query?: Record<string, unknown>
}

export type ProTableRequestResult<T extends TableRowData = TableRowData> = {
  data: T[]
  total: number
}

export type ProTableRequest<T extends TableRowData = TableRowData> = (
  params: ProTableRequestParams
) => Promise<ProTableRequestResult<T>> | ProTableRequestResult<T>

export const proTableProps = {
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
  request: {
    type: Function as PropType<ProTableRequest>,
    required: true,
  },
  rowKey: {
    type: [String, Function] as PropType<TableRowKeyResolver>,
    default: 'id',
  },
  query: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
  searchSchema: {
    type: Array as PropType<SchemaFormField[]>,
    default: () => [],
  },
  searchModel: {
    type: Object as PropType<SchemaFormModel>,
    default: () => ({}),
  },
  searchLabelWidth: {
    type: String,
    default: '96px',
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50],
  },
  defaultPage: {
    type: Number,
    default: 1,
  },
  showTotal: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  emptyText: {
    type: String,
    default: 'No data',
  },
  loadingText: {
    type: String,
    default: 'Loading...',
  },
  searchText: {
    type: String,
    default: 'Search',
  },
  resetText: {
    type: String,
    default: 'Reset',
  },
  refreshText: {
    type: String,
    default: 'Refresh',
  },
  retryText: {
    type: String,
    default: 'Retry',
  },
} as const

export const proTableEmits = {
  'update:searchModel': (value: SchemaFormModel) => typeof value === 'object' && value !== null,
  load: (result: ProTableRequestResult) => Array.isArray(result.data),
  error: (error: unknown) => error !== undefined,
  search: (query: SchemaFormModel) => typeof query === 'object' && query !== null,
  reset: () => true,
  pageChange: (page: number, pageSize: number) =>
    Number.isFinite(page) && Number.isFinite(pageSize),
}

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
export type ProTableEmits = typeof proTableEmits
