<script setup lang="ts">
import { MyButton } from '../../button'
import { MyTable } from '../../table'
import { proTableEmits, proTableProps } from './pro-table'
import { useProTable } from './use-pro-table'

defineOptions({
  name: 'MyProTable',
})

const props = defineProps(proTableProps)
const emit = defineEmits(proTableEmits)

const {
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
  changePageSize,
  handleSortChange,
  nextPage,
  prevPage,
} = useProTable(props, emit)

defineExpose({
  reload,
  reset,
  getTableData,
})
</script>

<template>
  <div class="my-pro-table">
    <div class="my-pro-table__toolbar">
      <slot name="toolbar" :reload="reload" :reset="reset" />
      <MyButton size="small" @click="reload">Refresh</MyButton>
    </div>

    <div v-if="error" class="my-pro-table__error">
      <slot name="error" :error="error" :reload="reload">
        Request failed.
      </slot>
    </div>

    <MyTable
      v-else
      :columns="props.columns"
      :data="data"
      :row-key="props.rowKey"
      :loading="loading"
      :sort-state="sortState"
      sort-mode="server"
      border
      stripe
      @sort-change="handleSortChange"
    />

    <div v-if="props.pagination" class="my-pro-table__pager">
      <span v-if="props.showTotal" class="my-pro-table__total">Total {{ total }}</span>
      <span v-else />
      <div class="my-pro-table__pager-actions">
        <label class="my-pro-table__page-size">
          <span>Page size</span>
          <select
            :value="currentPageSize"
            :disabled="loading"
            @change="changePageSize(Number(($event.target as HTMLSelectElement).value))"
          >
            <option v-for="size in props.pageSizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
        </label>
        <MyButton size="small" :disabled="page <= 1 || loading" @click="prevPage">Prev</MyButton>
        <span class="my-pro-table__page">{{ page }} / {{ pageCount }}</span>
        <MyButton size="small" :disabled="page >= pageCount || loading" @click="nextPage">Next</MyButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-pro-table {
  display: grid;
  gap: var(--my-spacing-md);
}

.my-pro-table__toolbar,
.my-pro-table__pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--my-spacing-md);
}

.my-pro-table__error {
  border: 1px solid var(--my-color-danger-border);
  border-radius: var(--my-radius-large);
  padding: var(--my-spacing-xl);
  background: var(--my-color-danger-light);
  color: var(--my-color-danger);
}

.my-pro-table__pager-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--my-spacing-sm);
}

.my-pro-table__page-size {
  display: inline-flex;
  align-items: center;
  gap: var(--my-spacing-sm);
  color: var(--my-color-text-secondary);
  font-size: var(--my-font-size-small);
}

.my-pro-table__page-size select {
  border: 1px solid var(--my-color-border);
  border-radius: var(--my-radius-base);
  padding: 6px 28px 6px 8px;
  background: var(--my-color-white);
  color: var(--my-color-text-primary);
}

.my-pro-table__total,
.my-pro-table__page {
  color: var(--my-color-text-secondary);
  font-size: var(--my-font-size-small);
}
</style>
