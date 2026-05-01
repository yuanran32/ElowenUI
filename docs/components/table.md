# Table 表格

用于结构化数据展示，支持排序、选择、空状态、插槽渲染和不同表面风格。

<script setup lang="ts">
import { ref } from 'vue'

const selectedRowKeys = ref<number[]>([2])

const columns = [
  { key: 'name', title: 'Project', ellipsis: true, align: 'center', headerAlign: 'center' },
  { key: 'owner', title: 'Owner', align: 'center', headerAlign: 'center' },
  { key: 'score', title: 'Score', sortable: true, align: 'center', headerAlign: 'center' },
  {
    key: 'status',
    title: 'Status',
    align: 'center',
    headerAlign: 'center',
    formatter: (row: { status: string }) => row.status.toUpperCase(),
  },
]

const rows = [
  { id: 1, name: 'ElowenUI Playground', owner: 'Alice', score: 88, status: 'active' },
  { id: 2, name: 'Design System', owner: 'Bob', score: 95, status: 'disabled' },
  { id: 3, name: 'Landing Page Revamp', owner: 'Cindy', score: 91, status: 'active' },
]

const rowSelectable = (row) => row.status !== 'disabled'
</script>

## 基础用法

<MyTable
  :columns="columns"
  :data="rows"
  border
  stripe
  highlight-current-row
  row-key="id"
/>

```vue
<template>
  <MyTable
    :columns="columns"
    :data="rows"
    border
    stripe
    highlight-current-row
    row-key="id"
  />
</template>
```

## 表面变体

<MyTable
  :columns="columns"
  :data="rows"
  variant="soft"
  stripe
  row-key="id"
/>

```vue
<template>
  <MyTable
    :columns="columns"
    :data="rows"
    variant="soft"
    stripe
    row-key="id"
  />
</template>
```

## 选择与自定义单元格

<MyTable
  v-model:selected-row-keys="selectedRowKeys"
  :columns="columns"
  :data="rows"
  :selectable="rowSelectable"
  border
  variant="elevated"
  max-height="280px"
  row-key="id"
>
  <template #cell-name="{ row }">
    <strong>{{ row.name }}</strong>
  </template>

  <template #cell-status="{ row }">
    <MyTag :type="row.status === 'active' ? 'success' : 'warning'" effect="solid" round>
      {{ row.status }}
    </MyTag>
  </template>
</MyTable>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selectedRowKeys = ref<number[]>([])
</script>

<template>
  <MyTable
    v-model:selected-row-keys="selectedRowKeys"
    :columns="columns"
    :data="rows"
    :selectable="rowSelectable"
    border
    variant="elevated"
    max-height="280px"
    row-key="id"
  >
    <template #cell-name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>

    <template #cell-status="{ row }">
      <MyTag :type="row.status === 'active' ? 'success' : 'warning'" effect="solid" round>
        {{ row.status }}
      </MyTag>
    </template>
  </MyTable>
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `data` | 表格数据源 | `TableRowData[]` | `[]` |
| `columns` | 列配置 | `TableColumn[]` | `[]` |
| `rowKey` | 行唯一标识字段或解析函数 | `string \| ((row, index) => string \| number)` | `'id'` |
| `size` | 表格尺寸 | `'small' \| 'default' \| 'large'` | `default` |
| `variant` | 表面风格 | `'default' \| 'soft' \| 'elevated'` | `default` |
| `stripe` | 是否显示斑马纹 | `boolean` | `false` |
| `border` | 是否显示外边框 | `boolean` | `false` |
| `selectable` | 是否显示选择列，或控制某行是否可选 | `boolean \| ((row, index) => boolean)` | `false` |
| `selectedRowKeys` | 受控选中行 key | `(string \| number)[]` | `[]` |
| `highlightCurrentRow` | 是否高亮当前行 | `boolean` | `false` |
| `emptyText` | 空状态文案 | `string` | `'No data'` |
| `maxHeight` | 最大滚动高度 | `string \| number` | `undefined` |
| `loading` | 是否展示加载态 | `boolean` | `false` |
| `loadingText` | 加载态文案 | `string` | `'Loading...'` |
| `defaultSortKey` | 初始排序列 key | `string` | `''` |
| `defaultSortOrder` | 初始排序顺序 | `'ascending' \| 'descending' \| null` | `null` |
| `sortMode` | 排序模式 | `'client' \| 'server'` | `'client'` |
| `sortState` | 服务端排序受控状态 | `TableSortState` | `undefined` |
| `selectionFixed` | 选择列是否固定在左侧 | `boolean` | `false` |

## TableColumn

| 字段名 | 说明 | 类型 |
| --- | --- | --- |
| `key` | 列唯一 key | `string` |
| `title` | 表头文本 | `string` |
| `dataIndex` | 行数据字段名 | `string` |
| `width` | 列宽 | `string \| number` |
| `align` | 单元格对齐方式 | `'left' \| 'center' \| 'right'` |
| `headerAlign` | 表头对齐方式 | `'left' \| 'center' \| 'right'` |
| `sortable` | 是否可排序 | `boolean` |
| `ellipsis` | 是否省略显示 | `boolean` |
| `formatter` | 自定义显示值格式化函数 | `(row, column, index) => unknown` |
| `sortMethod` | 自定义排序函数 | `(a, b) => number` |
| `fixed` | 固定列方向 | `'left' \| 'right'` |
| `hidden` | 是否隐藏列 | `boolean` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:selectedRowKeys` | 选中项变化时触发 | `(keys) => void` |
| `selectionChange` | 选中行变化时触发 | `(rows, keys) => void` |
| `sortChange` | 排序状态变化时触发 | `({ column, key, order }) => void` |
| `rowClick` | 点击行时触发 | `(row, index) => void` |
| `currentChange` | 当前行变化时触发 | `(row) => void` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `header-{key}` | 自定义某列表头内容 |
| `cell-{key}` | 自定义某列单元格内容 |

## 注意事项

当 `selectable` 是函数时，返回 `false` 的行会禁用复选框；全选会跳过这些行，`selectionChange` 也只返回可选行。
