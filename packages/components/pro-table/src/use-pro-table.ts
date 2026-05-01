import { computed, onMounted, ref, watch } from 'vue'
import type { TableRowData, TableSortState } from '../../table'
import type { ProTableProps, ProTableRequestParams, ProTableRequestResult } from './pro-table'

export const useProTable = (props: ProTableProps, emit: any) => {
  const data = ref<TableRowData[]>([])
  const total = ref(0)
  const page = ref(props.defaultPage)
  const currentPageSize = ref(props.pageSize)
  const loading = ref(false)
  const error = ref<unknown>()
  const sortState = ref<TableSortState>({
    key: '',
    order: null,
  })
  let requestId = 0

  const pageCount = computed(() => Math.max(1, Math.ceil(total.value / currentPageSize.value)))

  const requestParams = computed<ProTableRequestParams>(() => ({
    page: page.value,
    pageSize: currentPageSize.value,
    sorter: sortState.value.key
      ? {
          key: sortState.value.key,
          order: sortState.value.order,
        }
      : undefined,
    query: props.query,
  }))

  const load = async () => {
    const currentId = ++requestId
    loading.value = true
    error.value = undefined

    try {
      const result = await props.request(requestParams.value) as ProTableRequestResult
      if (currentId !== requestId) {
        return undefined
      }

      data.value = result.data
      total.value = result.total
      emit('load', result)
      return result
    } catch (currentError) {
      if (currentId !== requestId) {
        return undefined
      }

      data.value = []
      total.value = 0
      error.value = currentError
      emit('error', currentError)
      return undefined
    } finally {
      if (currentId === requestId) {
        loading.value = false
      }
    }
  }

  const reload = () => load()

  const reset = () => {
    page.value = props.defaultPage
    sortState.value = {
      key: '',
      order: null,
    }
    return load()
  }

  const getTableData = () => [...data.value]

  const handleSortChange = (state: TableSortState) => {
    sortState.value = state
    page.value = props.defaultPage
    load()
  }

  const changePage = (nextPage: number) => {
    const normalizedPage = Math.min(Math.max(1, nextPage), pageCount.value)
    if (normalizedPage === page.value) {
      return
    }

    page.value = normalizedPage
    emit('pageChange', page.value, currentPageSize.value)
    load()
  }

  const changePageSize = (nextPageSize: number) => {
    if (!Number.isFinite(nextPageSize) || nextPageSize <= 0) {
      return
    }

    currentPageSize.value = nextPageSize
    page.value = props.defaultPage
    emit('pageChange', page.value, currentPageSize.value)
    load()
  }

  const nextPage = () => {
    changePage(page.value + 1)
  }

  const prevPage = () => {
    changePage(page.value - 1)
  }

  watch(
    () => props.query,
    () => {
      page.value = props.defaultPage
      load()
    },
    { deep: true }
  )

  watch(
    () => props.pageSize,
    (value) => {
      currentPageSize.value = value
      page.value = props.defaultPage
      load()
    }
  )

  onMounted(() => {
    if (props.immediate) {
      load()
    }
  })

  return {
    data,
    total,
    page,
    currentPageSize,
    pageCount,
    loading,
    error,
    sortState,
    reload,
    reset,
    getTableData,
    handleSortChange,
    changePageSize,
    nextPage,
    prevPage,
  }
}
