import { computed, ref, watch, type CSSProperties } from 'vue'
import type {
  TableColumn,
  TableColumnFixed,
  TableProps,
  TableRowData,
  TableRowKey,
  TableSortOrder,
  TableSortState,
} from './table'

const toSizeValue = (value?: string | number) => {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

const compareValues = (left: unknown, right: unknown) => {
  if (left === right) {
    return 0
  }

  if (left === undefined || left === null) {
    return -1
  }

  if (right === undefined || right === null) {
    return 1
  }

  if (typeof left === 'number' && typeof right === 'number') {
    return left - right
  }

  return String(left).localeCompare(String(right))
}

const DEFAULT_FIXED_WIDTH = 160
const SELECTION_COLUMN_WIDTH = 52

export const useTable = (props: TableProps, emit: any) => {
  const sortKey = ref(props.sortState?.key ?? props.defaultSortKey)
  const sortOrder = ref<TableSortOrder>(props.sortState?.order ?? props.defaultSortOrder)
  const currentRowKey = ref<TableRowKey>()
  const isSortControlled = computed(() => props.sortState !== undefined)

  const visibleColumns = computed(() => props.columns.filter((column) => !column.hidden))

  const getColumnWidthValue = (column: TableColumn) => {
    if (typeof column.width === 'number') {
      return column.width
    }

    if (typeof column.width === 'string') {
      const parsed = Number.parseFloat(column.width)
      return Number.isFinite(parsed) ? parsed : DEFAULT_FIXED_WIDTH
    }

    return DEFAULT_FIXED_WIDTH
  }

  const fixedMeta = computed(() => {
    const leftOffsets = new Map<string, number>()
    const rightOffsets = new Map<string, number>()
    const leftKeys: string[] = []
    const rightKeys: string[] = []
    let leftOffset = props.selectable && props.selectionFixed ? SELECTION_COLUMN_WIDTH : 0
    let rightOffset = 0

    visibleColumns.value.forEach((column) => {
      if (column.fixed === 'left') {
        leftOffsets.set(column.key, leftOffset)
        leftKeys.push(column.key)
        leftOffset += getColumnWidthValue(column)
      }
    })

    for (let index = visibleColumns.value.length - 1; index >= 0; index -= 1) {
      const column = visibleColumns.value[index]
      if (column.fixed === 'right') {
        rightOffsets.set(column.key, rightOffset)
        rightKeys.unshift(column.key)
        rightOffset += getColumnWidthValue(column)
      }
    }

    return {
      leftOffsets,
      rightOffsets,
      lastLeftKey: leftKeys[leftKeys.length - 1],
      firstRightKey: rightKeys[0],
    }
  })

  const resolveRowKey = (row: TableRowData, index: number) => {
    if (typeof props.rowKey === 'function') {
      return props.rowKey(row, index)
    }

    return row[props.rowKey] ?? index
  }

  const getCellValue = (row: TableRowData, column: TableColumn) => {
    const field = column.dataIndex || column.key
    return row[field]
  }

  const getDisplayValue = (row: TableRowData, column: TableColumn, index: number) => {
    const value = column.formatter
      ? column.formatter(row, column, index)
      : getCellValue(row, column)

    if (value === undefined || value === null || value === '') {
      return '-'
    }

    return value
  }

  const currentSortColumn = computed(() =>
    visibleColumns.value.find((column) => column.key === sortKey.value)
  )

  const setSortState = (nextState: TableSortState) => {
    sortKey.value = nextState.key
    sortOrder.value = nextState.order
    emit('update:sortState', nextState)
  }

  const sortedData = computed(() => {
    if (props.sortMode === 'server' || !currentSortColumn.value || !sortOrder.value) {
      return [...props.data]
    }

    const direction = sortOrder.value === 'ascending' ? 1 : -1
    const sortColumn = currentSortColumn.value

    return props.data
      .map((row, index) => ({ row, index }))
      .sort((left, right) => {
        const result = sortColumn.sortMethod
          ? sortColumn.sortMethod(left.row, right.row)
          : compareValues(getCellValue(left.row, sortColumn), getCellValue(right.row, sortColumn))

        if (result === 0) {
          return left.index - right.index
        }

        return result * direction
      })
      .map((item) => item.row)
  })

  const selectedKeySet = computed(() => new Set(props.selectedRowKeys))
  const selectableRowKeys = computed(() =>
    sortedData.value.map((row, index) => resolveRowKey(row, index))
  )

  const allSelected = computed(
    () =>
      selectableRowKeys.value.length > 0 &&
      selectableRowKeys.value.every((key) => selectedKeySet.value.has(key))
  )

  const isIndeterminate = computed(
    () =>
      selectableRowKeys.value.some((key) => selectedKeySet.value.has(key)) && !allSelected.value
  )

  const emitSelection = (nextKeys: TableRowKey[]) => {
    const normalizedKeys = Array.from(new Set(nextKeys))
    const selectedRows = props.data.filter((row, index) =>
      normalizedKeys.includes(resolveRowKey(row, index))
    )

    emit('update:selectedRowKeys', normalizedKeys)
    emit('selectionChange', selectedRows, normalizedKeys)
  }

  const toggleRowSelection = (row: TableRowData, index: number, checked: boolean) => {
    const rowKey = resolveRowKey(row, index)
    const nextKeys = new Set(props.selectedRowKeys)

    if (checked) {
      nextKeys.add(rowKey)
    } else {
      nextKeys.delete(rowKey)
    }

    emitSelection(Array.from(nextKeys))
  }

  const toggleAllSelection = (checked: boolean) => {
    if (!checked) {
      emitSelection([])
      return
    }

    emitSelection(selectableRowKeys.value)
  }

  const toggleSort = (column: TableColumn) => {
    if (!column.sortable) {
      return
    }

    let nextKey = sortKey.value
    let nextOrder = sortOrder.value

    if (sortKey.value !== column.key) {
      nextKey = column.key
      nextOrder = 'ascending'
    } else if (sortOrder.value === 'ascending') {
      nextOrder = 'descending'
    } else if (sortOrder.value === 'descending') {
      nextOrder = null
      nextKey = ''
    } else {
      nextOrder = 'ascending'
    }

    const state: TableSortState = {
      column,
      key: nextKey,
      order: nextOrder,
    }

    if (!isSortControlled.value) {
      sortKey.value = nextKey
      sortOrder.value = nextOrder
    }

    setSortState(state)
    emit('sortChange', state)
  }

  const getSortOrder = (column: TableColumn) =>
    sortKey.value === column.key ? sortOrder.value : null

  const isRowSelected = (row: TableRowData, index: number) =>
    selectedKeySet.value.has(resolveRowKey(row, index))

  const handleRowClick = (row: TableRowData, index: number) => {
    if (props.highlightCurrentRow) {
      currentRowKey.value = resolveRowKey(row, index)
      emit('currentChange', row)
    }

    emit('rowClick', row, index)
  }

  const isCurrentRow = (row: TableRowData, index: number) =>
    props.highlightCurrentRow && currentRowKey.value === resolveRowKey(row, index)

  const getColumnStyle = (column: TableColumn): CSSProperties => ({
    width: toSizeValue(column.width),
  })

  const getColumnFixedStyle = (column: TableColumn): CSSProperties => {
    if (column.fixed === 'left') {
      return {
        position: 'sticky',
        left: `${fixedMeta.value.leftOffsets.get(column.key) ?? 0}px`,
        zIndex: 3,
      }
    }

    if (column.fixed === 'right') {
      return {
        position: 'sticky',
        right: `${fixedMeta.value.rightOffsets.get(column.key) ?? 0}px`,
        zIndex: 3,
      }
    }

    return {}
  }

  const getSelectionFixedStyle = (): CSSProperties => {
    if (!props.selectable || !props.selectionFixed) {
      return {}
    }

    return {
      position: 'sticky',
      left: '0px',
      zIndex: 4,
    }
  }

  const getFixedColumnClasses = (column?: TableColumn) => {
    if (!column?.fixed) {
      return []
    }

    return [
      `is-fixed-${column.fixed}`,
      {
        'is-fixed-left-last':
          column.fixed === 'left' && fixedMeta.value.lastLeftKey === column.key,
        'is-fixed-right-first':
          column.fixed === 'right' && fixedMeta.value.firstRightKey === column.key,
      },
    ]
  }

  const containerStyle = computed<CSSProperties>(() => ({
    maxHeight: toSizeValue(props.maxHeight),
  }))

  watch(
    () => props.sortState,
    (state) => {
      if (!state) {
        return
      }

      sortKey.value = state.key
      sortOrder.value = state.order
    },
    { deep: true }
  )

  watch(
    () => props.data,
    (rows) => {
      if (!rows.length) {
        currentRowKey.value = undefined
      }
    }
  )

  return {
    allSelected,
    containerStyle,
    getColumnFixedStyle,
    getCellValue,
    getFixedColumnClasses,
    getColumnStyle,
    getDisplayValue,
    getSortOrder,
    getSelectionFixedStyle,
    handleRowClick,
    isCurrentRow,
    isIndeterminate,
    isRowSelected,
    resolveRowKey,
    sortedData,
    toggleAllSelection,
    toggleRowSelection,
    toggleSort,
    visibleColumns,
  }
}
