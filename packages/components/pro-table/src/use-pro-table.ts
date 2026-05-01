import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { SchemaFormModel } from '../../schema-form'
import type { TableRowData, TableSortState } from '../../table'
import type { ProTableProps, ProTableRequestParams, ProTableRequestResult } from './pro-table'

export const useProTable = (props: ProTableProps, emit: any) => {
  const data = ref<TableRowData[]>([])
  const total = ref(0)
  const page = ref(props.defaultPage)
  const currentPageSize = ref(props.pageSize)
  const searchModel = reactive<SchemaFormModel>({})
  const submittedSearchModel = ref<SchemaFormModel>({})
  const loading = ref(false)
  const error = ref<unknown>()
  const loaded = ref(false)
  const sortState = ref<TableSortState>({
    key: '',
    order: null,
  })
  let requestId = 0
  let isFirstSearchModelSync = true

  const pageCount = computed(() => Math.max(1, Math.ceil(total.value / currentPageSize.value)))
  const requestStatus = computed(() => {
    if (loading.value) {
      return 'loading'
    }

    if (error.value) {
      return 'error'
    }

    return loaded.value ? 'success' : 'idle'
  })

  const requestParams = computed<ProTableRequestParams>(() => ({
    page: page.value,
    pageSize: currentPageSize.value,
    sorter: sortState.value.key
      ? {
          key: sortState.value.key,
          order: sortState.value.order,
        }
      : undefined,
    query: {
      ...props.query,
      ...submittedSearchModel.value,
    },
  }))

  const syncSearchModel = (value: SchemaFormModel) => {
    Object.keys(searchModel).forEach((key) => {
      delete searchModel[key]
    })
    Object.assign(searchModel, value)
  }

  const updateSearchModel = (value: SchemaFormModel) => {
    syncSearchModel(value)
    emit('update:searchModel', { ...searchModel })
  }

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
      loaded.value = true
      emit('load', result)
      return result
    } catch (currentError) {
      if (currentId !== requestId) {
        return undefined
      }

      data.value = []
      total.value = 0
      error.value = currentError
      loaded.value = true
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
    syncSearchModel({})
    submittedSearchModel.value = {}
    emit('update:searchModel', {})
    emit('reset')
    return load()
  }

  const submitSearch = () => {
    page.value = props.defaultPage
    submittedSearchModel.value = { ...searchModel }
    emit('search', submittedSearchModel.value)
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

  watch(
    () => props.searchModel,
    (value) => {
      syncSearchModel(value)
      if (isFirstSearchModelSync) {
        submittedSearchModel.value = { ...value }
        isFirstSearchModelSync = false
      }
    },
    { immediate: true, deep: true }
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
    searchModel,
    loading,
    error,
    requestStatus,
    sortState,
    reload,
    reset,
    submitSearch,
    updateSearchModel,
    getTableData,
    handleSortChange,
    changePageSize,
    nextPage,
    prevPage,
  }
}
