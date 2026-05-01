<script setup lang="ts">
import { computed, ref } from 'vue'
import { MyButton } from '../../button'
import { MySchemaForm } from '../../schema-form'
import { MyTable } from '../../table'
import { proTableEmits, proTableProps } from './pro-table'
import { useProTable } from './use-pro-table'

defineOptions({
  name: 'MyProTable',
})

const props = defineProps(proTableProps)
const emit = defineEmits(proTableEmits)
const searchFormRef = ref<InstanceType<typeof MySchemaForm>>()

const {
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
  changePageSize,
  handleSortChange,
  nextPage,
  prevPage,
} = useProTable(props, emit)

const searchSlotFields = computed(() =>
  props.searchSchema.filter((field) => field.component === 'custom')
)

const getSchemaSlotName = (field: { field: string; slot?: string }) => field.slot || field.field

const getSearchSlotName = (field: { field: string; slot?: string }) =>
  `search-${getSchemaSlotName(field)}`

const handleSubmitSearch = async () => {
  const valid = props.searchSchema.length
    ? await searchFormRef.value?.validate?.()
    : true

  if (!valid) {
    return undefined
  }

  return submitSearch()
}

const handleReset = () => {
  searchFormRef.value?.clearValidate?.()
  return reset()
}

defineExpose({
  reload,
  reset: handleReset,
  submitSearch: handleSubmitSearch,
  getTableData,
})
</script>

<template>
  <div class="my-pro-table">
    <div v-if="props.searchSchema.length" class="my-pro-table__search">
      <MySchemaForm
        ref="searchFormRef"
        :model-value="searchModel"
        :schema="props.searchSchema"
        :label-width="props.searchLabelWidth"
        @update:model-value="updateSearchModel"
      >
        <template
          v-for="field in searchSlotFields"
          #[getSchemaSlotName(field)]="slotProps"
          :key="field.field"
        >
          <slot :name="getSearchSlotName(field)" v-bind="slotProps" />
        </template>
      </MySchemaForm>

      <div class="my-pro-table__search-actions">
        <slot
          name="search-actions"
          :loading="loading"
          :reset="handleReset"
          :search="handleSubmitSearch"
          :search-model="searchModel"
        >
          <MyButton type="primary" :loading="loading" @click="handleSubmitSearch">
            {{ props.searchText }}
          </MyButton>
          <MyButton plain :disabled="loading" @click="handleReset">
            {{ props.resetText }}
          </MyButton>
        </slot>
      </div>
    </div>

    <div class="my-pro-table__toolbar">
      <div class="my-pro-table__toolbar-left">
        <slot
          name="toolbar"
          :data="data"
          :error="error"
          :loading="loading"
          :reload="reload"
          :reset="handleReset"
          :status="requestStatus"
        />
      </div>
      <div class="my-pro-table__toolbar-actions">
        <span class="my-pro-table__status" :data-status="requestStatus">
          {{ requestStatus }}
        </span>
        <MyButton size="small" :disabled="loading" @click="reload">
          {{ props.refreshText }}
        </MyButton>
        <MyButton size="small" plain :disabled="loading" @click="handleReset">
          {{ props.resetText }}
        </MyButton>
      </div>
    </div>

    <div v-if="error" class="my-pro-table__error">
      <slot name="error" :error="error" :reload="reload">
        <span>Request failed.</span>
        <MyButton size="small" type="danger" @click="reload">
          {{ props.retryText }}
        </MyButton>
      </slot>
    </div>

    <MyTable
      v-else
      :columns="props.columns"
      :data="data"
      :row-key="props.rowKey"
      :loading="loading"
      :loading-text="props.loadingText"
      :empty-text="props.emptyText"
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

.my-pro-table__search {
  display: grid;
  gap: var(--my-spacing-md);
  border: 1px solid var(--my-color-border-light);
  border-radius: var(--my-radius-large);
  padding: var(--my-spacing-lg);
  background: var(--my-color-fill-soft);
}

.my-pro-table__search-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--my-spacing-sm);
}

.my-pro-table__toolbar,
.my-pro-table__pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--my-spacing-md);
}

.my-pro-table__toolbar-left {
  min-width: 0;
}

.my-pro-table__toolbar-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--my-spacing-sm);
}

.my-pro-table__status {
  border-radius: var(--my-radius-round);
  padding: 4px 10px;
  background: var(--my-color-fill-soft);
  color: var(--my-color-text-secondary);
  font-size: var(--my-font-size-small);
  text-transform: capitalize;
}

.my-pro-table__status[data-status='loading'] {
  color: var(--my-color-primary);
}

.my-pro-table__status[data-status='error'] {
  color: var(--my-color-danger);
}

.my-pro-table__error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--my-spacing-md);
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

@media (max-width: 768px) {
  .my-pro-table__toolbar,
  .my-pro-table__pager {
    align-items: stretch;
    flex-direction: column;
  }

  .my-pro-table__toolbar-actions,
  .my-pro-table__pager-actions,
  .my-pro-table__search-actions {
    justify-content: flex-end;
    flex-wrap: wrap;
  }
}
</style>
