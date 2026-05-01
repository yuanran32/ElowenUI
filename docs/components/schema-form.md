# SchemaForm 配置表单

`SchemaForm` 面向中后台表单场景，通过 schema 配置生成表单项，减少重复模板代码。

<script setup lang="ts">
import { ref } from 'vue'

const model = ref({
  name: '',
  role: undefined,
})

const searchModel = ref({
  keyword: '',
  status: undefined,
  role: undefined,
  remark: '',
})

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
]

const schema = [
  {
    field: 'name',
    label: '用户名',
    component: 'input',
    placeholder: '请输入用户名',
    rules: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  },
  {
    field: 'role',
    label: '角色',
    component: 'select',
    placeholder: '请选择角色',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '访客', value: 'guest' },
    ],
    rules: [{ required: true, message: '请选择角色', trigger: 'change' }],
  },
]

const searchSchema = [
  { field: 'keyword', label: '关键词', component: 'input', placeholder: '搜索用户名' },
  {
    field: 'status',
    label: '状态',
    component: 'select',
    placeholder: '请选择状态',
    options: [
      { label: '启用', value: 'active' },
      { label: '禁用', value: 'disabled' },
    ],
  },
  { field: 'role', label: '角色', component: 'custom', placeholder: '请选择角色' },
  {
    field: 'remark',
    label: '备注',
    component: 'textarea',
    placeholder: '禁用用户备注',
    hidden: (model) => model.status !== 'disabled',
  },
]
</script>

## 基础用法

<MySchemaForm v-model="model" :schema="schema" />

```vue
<script setup lang="ts">
import { ref } from 'vue'

const model = ref({ name: '', role: undefined })
const schema = [
  { field: 'name', label: '用户名', component: 'input' },
  {
    field: 'role',
    label: '角色',
    component: 'select',
    options: [{ label: '管理员', value: 'admin' }],
  },
]
</script>

<template>
  <MySchemaForm v-model="model" :schema="schema" />
</template>
```

## 用户筛选表单

<MySchemaForm v-model="searchModel" :schema="searchSchema">
  <template #role="{ model, field, updateField }">
    <MySelect
      :model-value="model[field.field]"
      :options="roleOptions"
      :placeholder="field.placeholder"
      clearable
      @update:model-value="updateField(field.field, $event)"
    />
  </template>
</MySchemaForm>

```vue
<template>
  <MySchemaForm v-model="searchModel" :schema="searchSchema">
    <template #role="{ model, field, updateField }">
      <MySelect
        :model-value="model[field.field]"
        :options="roleOptions"
        :placeholder="field.placeholder"
        clearable
        @update:model-value="updateField(field.field, $event)"
      />
    </template>
  </MySchemaForm>
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 表单数据 | `Record<string, any>` | 必填 |
| `schema` | 字段配置 | `SchemaFormField[]` | `[]` |
| `labelWidth` | 标签宽度 | `string` | `'96px'` |

## SchemaFormField

| 字段名 | 说明 | 类型 |
| --- | --- | --- |
| `field` | 字段名 | `string` |
| `label` | 标签 | `string` |
| `component` | 渲染组件 | `'input' \| 'textarea' \| 'select' \| 'custom'` |
| `placeholder` | 占位文本 | `string` |
| `options` | Select 选项 | `SelectOption[]` |
| `rules` | 校验规则 | `FormRule[]` |
| `hidden` | 是否隐藏 | `boolean \| ((model) => boolean)` |
| `disabled` | 是否禁用 | `boolean \| ((model) => boolean)` |
| `slot` | 自定义插槽名，默认使用 `field` | `string` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 字段值变化时触发 | `(value) => void` |
| `validate` | 调用 `validate()` 后触发 | `(valid) => void` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `field` / `slot` | `component: 'custom'` 时渲染自定义字段，暴露 `model`、`field`、`updateField`、`validate` |

## Exposes

| 方法名 | 说明 |
| --- | --- |
| `validate()` | 校验表单 |
| `resetFields()` | 重置字段 |
| `getFieldsValue()` | 获取当前值 |
| `setFieldsValue(values)` | 批量设置字段值 |

## 注意事项

`SchemaForm` 内部维护独立的表单模型，不会直接修改传入的 `modelValue` 对象引用。自定义字段需要通过插槽参数里的 `updateField(field, value)` 写回数据，才能保持校验和 `v-model` 同步。
