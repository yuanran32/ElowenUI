<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { tableEmits, tableProps, type TableColumn } from './table'
import { useTable } from './use-table'

defineOptions({
  name: 'MyTable',
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const {
  allSelected,
  containerStyle,
  getCellValue,
  getColumnFixedStyle,
  getColumnStyle,
  getDisplayValue,
  getFixedColumnClasses,
  getSortOrder,
  getSelectionFixedStyle,
  handleRowClick,
  isCurrentRow,
  isIndeterminate,
  isRowSelectable,
  isRowSelected,
  resolveRowKey,
  sortedData,
  toggleAllSelection,
  toggleRowSelection,
  toggleSort,
  visibleColumns,
} = useTable(props, emit)

const selectAllRef = ref<HTMLInputElement>()

const classes = computed(() => [
  'my-table',
  `my-table--${props.size}`,
  `is-${props.variant}`,
  {
    'is-striped': props.stripe,
    'is-bordered': props.border,
  },
])

const syncIndeterminate = async () => {
  await nextTick()
  if (selectAllRef.value) {
    selectAllRef.value.indeterminate = isIndeterminate.value
  }
}

const getAlignClass = (align?: TableColumn['align']) => {
  if (align === 'center') {
    return 'is-center'
  }

  if (align === 'right') {
    return 'is-right'
  }

  return 'is-left'
}

const getHeaderAlignClass = (column: TableColumn) =>
  getAlignClass(column.headerAlign || column.align)

const getAriaSort = (column: TableColumn) => {
  const order = getSortOrder(column)

  if (order === 'ascending') {
    return 'ascending'
  }

  if (order === 'descending') {
    return 'descending'
  }

  return column.sortable ? 'none' : undefined
}

watch([allSelected, isIndeterminate], () => {
  syncIndeterminate()
}, { immediate: true })
</script>

<template>
  <div :class="classes">
    <div class="my-table__container" :style="containerStyle">
      <table class="my-table__inner">
        <thead>
          <tr>
            <th
              v-if="props.selectable"
              :class="[
                'my-table__selection-cell',
                { 'is-fixed-left is-fixed-left-last': props.selectionFixed },
              ]"
              :style="getSelectionFixedStyle()"
            >
              <input
                ref="selectAllRef"
                class="my-table__checkbox"
                type="checkbox"
                aria-label="Select all rows"
                :checked="allSelected"
                :disabled="!sortedData.some((row, index) => isRowSelectable(row, index))"
                @change="toggleAllSelection(($event.target as HTMLInputElement).checked)"
              />
            </th>

            <th
              v-for="column in visibleColumns"
              :key="column.key"
              :class="[
                'my-table__header-cell',
                getHeaderAlignClass(column),
                ...getFixedColumnClasses(column),
                { 'is-sortable': column.sortable },
              ]"
              :style="[getColumnStyle(column), getColumnFixedStyle(column)]"
              :aria-sort="getAriaSort(column)"
            >
              <button
                v-if="column.sortable"
                class="my-table__sorter"
                type="button"
                @click="toggleSort(column)"
              >
                <slot :name="`header-${column.key}`" :column="column">
                  {{ column.title }}
                </slot>
                <span class="my-table__sort-icons" aria-hidden="true">
                  <span
                    class="my-table__sort-icon"
                    :class="{ 'is-active': getSortOrder(column) === 'ascending' }"
                  >
                    ^
                  </span>
                  <span
                    class="my-table__sort-icon"
                    :class="{ 'is-active': getSortOrder(column) === 'descending' }"
                  >
                    v
                  </span>
                </span>
              </button>

              <template v-else>
                <slot :name="`header-${column.key}`" :column="column">
                  {{ column.title }}
                </slot>
              </template>
            </th>
          </tr>
        </thead>

        <tbody v-if="props.loading">
          <tr>
            <td
              class="my-table__loading"
              :colspan="visibleColumns.length + (props.selectable ? 1 : 0)"
            >
              <slot name="loading">
                {{ props.loadingText }}
              </slot>
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="sortedData.length">
          <tr
            v-for="(row, rowIndex) in sortedData"
            :key="resolveRowKey(row, rowIndex)"
            :class="[
              'my-table__row',
              {
                'is-current': isCurrentRow(row, rowIndex),
                'is-selection-disabled': props.selectable && !isRowSelectable(row, rowIndex),
              },
            ]"
            @click="handleRowClick(row, rowIndex)"
          >
            <td
              v-if="props.selectable"
              :class="[
                'my-table__selection-cell',
                { 'is-fixed-left is-fixed-left-last': props.selectionFixed },
              ]"
              :style="getSelectionFixedStyle()"
              @click.stop
            >
              <input
                class="my-table__checkbox"
                type="checkbox"
                aria-label="Select row"
                :checked="isRowSelected(row, rowIndex)"
                :disabled="!isRowSelectable(row, rowIndex)"
                @change="toggleRowSelection(row, rowIndex, ($event.target as HTMLInputElement).checked)"
              />
            </td>

            <td
              v-for="column in visibleColumns"
              :key="column.key"
              :class="[
                'my-table__cell',
                getAlignClass(column.align),
                ...getFixedColumnClasses(column),
                { 'is-ellipsis': column.ellipsis },
              ]"
              :style="[getColumnStyle(column), getColumnFixedStyle(column)]"
            >
              <slot
                :name="`cell-${column.key}`"
                :column="column"
                :display-value="getDisplayValue(row, column, rowIndex)"
                :index="rowIndex"
                :row="row"
                :value="getCellValue(row, column)"
              >
                {{ getDisplayValue(row, column, rowIndex) }}
              </slot>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td
              class="my-table__empty"
              :colspan="visibleColumns.length + (props.selectable ? 1 : 0)"
            >
              {{ props.emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.my-table {
  width: 100%;
  border-radius: var(--my-radius-large);
  background: var(--my-color-white);
}

.my-table.is-soft {
  background: color-mix(in srgb, var(--my-color-fill-soft) 72%, var(--my-color-white));
}

.my-table.is-elevated {
  box-shadow: var(--my-shadow-md);
}

.my-table__container {
  overflow: auto;
  border-radius: inherit;
}

.my-table__inner {
  display: table;
  margin: 0;
  min-width: 100%;
  width: 100%;
  overflow: visible;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  color: var(--my-color-text-primary);
}

.my-table__header-cell,
.my-table__cell,
.my-table__selection-cell {
  border-bottom: 1px solid var(--my-color-border-lighter);
  background: var(--my-color-white);
}

.my-table__header-cell.is-fixed-left,
.my-table__header-cell.is-fixed-right,
.my-table__cell.is-fixed-left,
.my-table__cell.is-fixed-right,
.my-table__selection-cell.is-fixed-left {
  z-index: 2;
}

.my-table__header-cell {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0;
  background: var(--my-color-fill-soft);
  font-size: var(--my-font-size-small);
  font-weight: 700;
  color: var(--my-color-text-secondary);
}

.my-table.is-soft .my-table__header-cell {
  background: color-mix(in srgb, var(--my-color-primary-light) 58%, var(--my-color-white));
}

.my-table.is-soft .my-table__header-cell,
.my-table.is-soft .my-table__cell,
.my-table.is-soft .my-table__selection-cell {
  background: transparent;
}

.my-table__selection-cell {
  width: 52px;
  min-width: 52px;
  padding: 0 16px;
  text-align: center;
}

.is-fixed-left,
.is-fixed-right {
  position: sticky;
}

.is-fixed-left {
  box-shadow: inset -1px 0 0 var(--my-color-border-lighter);
}

.is-fixed-right {
  box-shadow: inset 1px 0 0 var(--my-color-border-lighter);
}

.is-fixed-left-last::after,
.is-fixed-right-first::before {
  position: absolute;
  top: 0;
  width: 12px;
  height: 100%;
  content: '';
  pointer-events: none;
}

.is-fixed-left-last::after {
  right: -12px;
  background: linear-gradient(90deg, rgba(15, 23, 42, 0.12), transparent);
}

.is-fixed-right-first::before {
  left: -12px;
  background: linear-gradient(270deg, rgba(15, 23, 42, 0.12), transparent);
}

.my-table__sorter,
.my-table__header-cell > :deep(*) {
  width: 100%;
}

.my-table__sorter {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--my-spacing-sm);
  border: none;
  padding: 16px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.my-table__sort-icons {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 0.9;
}

.my-table__sort-icon {
  color: var(--my-color-text-placeholder);
  font-size: 11px;
}

.my-table__sort-icon.is-active {
  color: var(--my-color-primary);
}

.my-table__cell {
  padding: 16px;
  color: var(--my-color-text-regular);
  font-size: var(--my-font-size-base);
  line-height: 1.6;
  transition:
    background var(--my-transition-duration) var(--my-transition-ease),
    color var(--my-transition-duration) var(--my-transition-ease);
}

.my-table__row:hover .my-table__cell,
.my-table__row:hover .my-table__selection-cell {
  background: var(--my-color-fill-soft);
}

.my-table.is-striped .my-table__row:nth-child(even) .my-table__cell,
.my-table.is-striped .my-table__row:nth-child(even) .my-table__selection-cell {
  background: color-mix(in srgb, var(--my-color-fill-soft) 72%, var(--my-color-white));
}

.my-table__row.is-current .my-table__cell,
.my-table__row.is-current .my-table__selection-cell {
  background: var(--my-color-primary-light);
}

.my-table.is-bordered {
  border: 1px solid var(--my-color-border-light);
}

.my-table.is-bordered .my-table__header-cell,
.my-table.is-bordered .my-table__cell,
.my-table.is-bordered .my-table__selection-cell {
  border-right: 1px solid var(--my-color-border-lighter);
}

.my-table.is-bordered .my-table__header-cell:last-child,
.my-table.is-bordered .my-table__cell:last-child {
  border-right: none;
}

.my-table__checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--my-color-primary);
  cursor: pointer;
}

.my-table__checkbox:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.my-table__row.is-selection-disabled .my-table__cell,
.my-table__row.is-selection-disabled .my-table__selection-cell {
  color: var(--my-color-text-placeholder);
}

.my-table__empty {
  padding: 36px 16px;
  color: var(--my-color-text-placeholder);
  text-align: center;
}

.my-table__loading {
  padding: 42px 16px;
  color: var(--my-color-text-secondary);
  text-align: center;
}

.my-table--small .my-table__sorter,
.my-table--small .my-table__cell {
  padding: 12px;
}

.my-table--small .my-table__cell {
  font-size: var(--my-font-size-small);
}

.my-table--large .my-table__sorter,
.my-table--large .my-table__cell {
  padding: 20px;
}

.my-table--large .my-table__cell {
  font-size: var(--my-font-size-large);
}

.is-left {
  text-align: left;
}

.is-center {
  text-align: center;
}

.is-right {
  text-align: right;
}

.is-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .my-table__selection-cell {
    width: 44px;
    min-width: 44px;
    padding: 0 10px;
  }

  .my-table__sorter,
  .my-table__cell {
    padding: 12px;
  }
}
</style>
