# ProTable 业务表格

`ProTable` 封装中后台列表页常见流程：远程请求、loading、分页、排序、错误态和刷新。

<script setup lang="ts">
import { ref } from 'vue'

const query = ref({
  keyword: '',
})

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'score', title: 'Score', sortable: true },
]

const request = async ({ page, pageSize, query }) => {
  const rows = [
    { id: page * 10 + 1, name: 'Elowen Admin', score: 92 },
    { id: page * 10 + 2, name: 'Design System', score: 88 },
  ].filter((row) => !query?.keyword || row.name.includes(String(query.keyword)))

  return {
    data: rows,
    total: pageSize * 3,
  }
}
</script>

## 基础用法

<MyProTable :columns="columns" :request="request" row-key="id" />

```vue
<template>
  <MyProTable :columns="columns" :request="request" row-key="id" />
</template>
```

## 查询与分页

<MyProTable
  :columns="columns"
  :request="request"
  :query="query"
  :page-sizes="[10, 20, 50]"
  :page-size="10"
  row-key="id"
/>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const query = ref({ keyword: '' })
</script>

<template>
  <MyProTable
    :columns="columns"
    :request="request"
    :query="query"
    :page-sizes="[10, 20, 50]"
    :page-size="10"
    row-key="id"
  />
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 表格列配置 | `TableColumn[]` | `[]` |
| `request` | 数据请求函数 | `(params) => Promise<{ data, total }>` | 必填 |
| `rowKey` | 行 key | `string \| function` | `'id'` |
| `query` | 查询参数 | `Record<string, unknown>` | `{}` |
| `pageSize` | 每页条数 | `number` | `10` |
| `pageSizes` | 可选每页条数 | `number[]` | `[10, 20, 50]` |
| `defaultPage` | 默认页码，重置和查询变化时使用 | `number` | `1` |
| `showTotal` | 是否显示总数 | `boolean` | `true` |
| `pagination` | 是否显示分页器 | `boolean` | `true` |
| `immediate` | 是否挂载后立即请求 | `boolean` | `true` |

## Request Params

| 字段名 | 说明 |
| --- | --- |
| `page` | 当前页码 |
| `pageSize` | 每页条数 |
| `sorter` | 当前排序 |
| `query` | 查询参数 |

请求存在并发竞态保护：当分页、排序或查询快速触发多次请求时，只有最后一次请求的结果会写入表格状态。

## Events

| 事件名 | 说明 |
| --- | --- |
| `load` | 请求成功时触发 |
| `error` | 请求失败时触发 |
| `pageChange` | 页码或每页条数变化时触发 |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `toolbar` | 工具栏左侧区域 |
| `error` | 请求失败状态 |

## Exposes

| 方法名 | 说明 |
| --- | --- |
| `reload()` | 重新请求当前页 |
| `reset()` | 重置分页和排序后请求 |
| `getTableData()` | 获取当前表格数据 |
