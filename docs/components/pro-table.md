# ProTable 业务表格

`ProTable` 封装中后台列表页的完整流程：搜索表单、远程请求、请求状态、分页、排序、错误重试、刷新、重置和空状态。

<script setup lang="ts">
import { ref } from 'vue'

const searchModel = ref({
  keyword: '',
  role: undefined,
  status: undefined,
  reason: '',
})

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
]

const searchSchema = [
  {
    field: 'keyword',
    label: '关键词',
    component: 'input',
    placeholder: '搜索用户名或负责人',
    rules: [
      {
        trigger: 'change',
        validator: async (value) => {
          await new Promise((resolve) => setTimeout(resolve, 120))
          return value === 'root' ? 'root 是系统保留账号' : true
        },
      },
    ],
  },
  {
    field: 'status',
    label: '状态',
    component: 'select',
    placeholder: '选择状态',
    options: [
      { label: '启用', value: 'active' },
      { label: '禁用', value: 'disabled' },
    ],
  },
  {
    field: 'role',
    label: '角色',
    component: 'custom',
    placeholder: '选择角色',
  },
  {
    field: 'reason',
    label: '禁用原因',
    component: 'textarea',
    placeholder: '状态为禁用时显示',
    hidden: (model) => model.status !== 'disabled',
  },
]

const columns = [
  { key: 'name', title: '用户名' },
  { key: 'owner', title: '负责人' },
  { key: 'roleText', title: '角色' },
  { key: 'statusText', title: '状态' },
  { key: 'score', title: '活跃度', sortable: true },
]

const users = [
  { id: 1, name: 'Elowen Admin', owner: 'Alice', role: 'admin', status: 'active', score: 92 },
  { id: 2, name: 'Content Operator', owner: 'Bob', role: 'operator', status: 'active', score: 88 },
  { id: 3, name: 'Guest Reviewer', owner: 'Cindy', role: 'guest', status: 'disabled', score: 63 },
  { id: 4, name: 'Risk Auditor', owner: 'Dora', role: 'operator', status: 'disabled', score: 71 },
  { id: 5, name: 'System Owner', owner: 'Evan', role: 'admin', status: 'active', score: 97 },
]

const request = async ({ page, pageSize, sorter, query }) => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const keyword = String(query?.keyword ?? '').trim().toLowerCase()
  const filtered = users.filter((row) => {
    const matchesKeyword = !keyword ||
      row.name.toLowerCase().includes(keyword) ||
      row.owner.toLowerCase().includes(keyword)
    const matchesStatus = !query?.status || row.status === query.status
    const matchesRole = !query?.role || row.role === query.role

    return matchesKeyword && matchesStatus && matchesRole
  })

  const sorted = sorter?.order === 'descending'
    ? [...filtered].sort((a, b) => b.score - a.score)
    : [...filtered].sort((a, b) => a.score - b.score)

  return {
    data: sorted.slice((page - 1) * pageSize, page * pageSize).map((row) => ({
      ...row,
      roleText: roleOptions.find((item) => item.value === row.role)?.label,
      statusText: row.status === 'active' ? '启用' : '禁用',
    })),
    total: filtered.length,
  }
}
</script>

## 用户管理列表页

<MyProTable
  v-model:search-model="searchModel"
  :columns="columns"
  :request="request"
  :search-schema="searchSchema"
  :page-sizes="[2, 5, 10]"
  :page-size="2"
  empty-text="暂无匹配用户"
  search-text="查询"
  reset-text="重置"
  refresh-text="刷新"
  retry-text="重试"
  row-key="id"
>
  <template #search-role="{ model, field, updateField }">
    <MySelect
      :model-value="model[field.field]"
      :options="roleOptions"
      :placeholder="field.placeholder"
      clearable
      @update:model-value="updateField(field.field, $event)"
    />
  </template>
</MyProTable>

```vue
<template>
  <MyProTable
    v-model:search-model="searchModel"
    :columns="columns"
    :request="request"
    :search-schema="searchSchema"
    :page-size="20"
    empty-text="暂无匹配用户"
    row-key="id"
  >
    <template #search-role="{ model, field, updateField }">
      <MySelect
        :model-value="model[field.field]"
        :options="roleOptions"
        @update:model-value="updateField(field.field, $event)"
      />
    </template>
  </MyProTable>
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 表格列配置 | `TableColumn[]` | `[]` |
| `request` | 数据请求函数 | `(params) => Promise<{ data, total }>` | 必填 |
| `rowKey` | 行 key | `string \| function` | `'id'` |
| `query` | 外部查询参数，会与内置搜索表单提交值合并 | `Record<string, unknown>` | `{}` |
| `searchSchema` | 内置搜索表单 schema | `SchemaFormField[]` | `[]` |
| `searchModel` | 内置搜索表单数据，支持 `v-model:search-model` | `Record<string, any>` | `{}` |
| `searchLabelWidth` | 搜索表单标签宽度 | `string` | `'96px'` |
| `pageSize` | 每页条数 | `number` | `10` |
| `pageSizes` | 可选每页条数 | `number[]` | `[10, 20, 50]` |
| `defaultPage` | 默认页码，重置和查询变化时使用 | `number` | `1` |
| `showTotal` | 是否显示总数 | `boolean` | `true` |
| `pagination` | 是否显示分页器 | `boolean` | `true` |
| `immediate` | 是否挂载后立即请求 | `boolean` | `true` |
| `emptyText` | 空状态文案 | `string` | `'No data'` |
| `loadingText` | 加载文案 | `string` | `'Loading...'` |
| `searchText` | 搜索按钮文案 | `string` | `'Search'` |
| `resetText` | 重置按钮文案 | `string` | `'Reset'` |
| `refreshText` | 刷新按钮文案 | `string` | `'Refresh'` |
| `retryText` | 重试按钮文案 | `string` | `'Retry'` |

## Request Params

| 字段名 | 说明 |
| --- | --- |
| `page` | 当前页码 |
| `pageSize` | 每页条数 |
| `sorter` | 当前排序 |
| `query` | 外部 `query` 与搜索表单提交值合并后的查询参数 |

`request` 可以同步返回结果，也可以返回 Promise。组件内部会记录请求顺序，旧请求晚于新请求完成时不会覆盖最新数据。

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:searchModel` | 内置搜索表单值变化时触发 | `(value: SchemaFormModel) => void` |
| `load` | 请求成功时触发 | `(result: { data, total }) => void` |
| `error` | 请求失败时触发 | `(error: unknown) => void` |
| `search` | 点击搜索并通过表单校验后触发 | `(query: SchemaFormModel) => void` |
| `reset` | 点击重置后触发 | `() => void` |
| `pageChange` | 页码或每页条数变化时触发 | `(page: number, pageSize: number) => void` |

## Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `search-{field}` | 搜索表单自定义字段插槽，也支持字段配置中的 `slot` 别名 | `{ field, model, disabled, updateField, validate }` |
| `search-actions` | 自定义查询/重置按钮区 | `{ loading, reset, search, searchModel }` |
| `toolbar` | 表格工具栏左侧区域 | `{ data, error, loading, reload, reset, status }` |
| `error` | 请求失败状态，默认带重试按钮 | `{ error, reload }` |

## Exposes

| 方法名 | 说明 |
| --- | --- |
| `reload()` | 重新请求当前页 |
| `reset()` | 清空搜索表单、重置分页和排序后请求 |
| `submitSearch()` | 校验内置搜索表单，通过后提交查询并回到默认页码 |
| `getTableData()` | 获取当前表格数据 |
