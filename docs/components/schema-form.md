# SchemaForm 配置表单

`SchemaForm` 面向中后台表单场景，用 schema 描述字段、校验和联动逻辑。它不只是“渲染几个控件”，而是把搜索条件、编辑表单、审批配置这类业务表单沉淀成可复用配置。

<script setup lang="ts">
import { ref } from 'vue'

const userFormRef = ref()
const userModel = ref({
  username: '',
  role: undefined,
  status: 'active',
  reason: '',
  owner: '',
})

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
]

const userSchema = [
  {
    field: 'username',
    label: '用户名',
    component: 'input',
    placeholder: '输入用户名',
    rules: [
      { required: true, message: '请输入用户名', trigger: 'change' },
      {
        trigger: 'change',
        validator: async (value) => {
          await new Promise((resolve) => setTimeout(resolve, 200))
          return value === 'root' ? 'root 是系统保留账号' : true
        },
      },
    ],
  },
  {
    field: 'role',
    label: '角色',
    component: 'select',
    placeholder: '选择角色',
    options: roleOptions,
    rules: [{ required: true, message: '请选择角色', trigger: 'change' }],
  },
  {
    field: 'status',
    label: '状态',
    component: 'select',
    options: [
      { label: '启用', value: 'active' },
      { label: '禁用', value: 'disabled' },
    ],
  },
  {
    field: 'reason',
    label: '禁用原因',
    component: 'textarea',
    placeholder: '状态为禁用时必填',
    hidden: (model) => model.status !== 'disabled',
    disabled: (model) => model.role === 'admin',
    dependencies: ['status', 'role'],
    rules: [
      {
        trigger: 'change',
        validator: (value, model) =>
          model.status !== 'disabled' || Boolean(value) || '请输入禁用原因',
      },
    ],
  },
  {
    field: 'owner',
    label: '负责人',
    component: 'custom',
    slot: 'owner',
  },
]

const validateUserForm = () => userFormRef.value?.validate()
const resetUserForm = () => userFormRef.value?.resetFields()
</script>

## 用户编辑表单

<MySchemaForm ref="userFormRef" v-model="userModel" :schema="userSchema">
  <template #owner="{ model, field, updateField }">
    <MySelect
      :model-value="model[field.field]"
      :options="[
        { label: 'Alice', value: 'Alice' },
        { label: 'Bob', value: 'Bob' },
        { label: 'Cindy', value: 'Cindy' },
      ]"
      placeholder="选择负责人"
      clearable
      @update:model-value="updateField(field.field, $event)"
    />
  </template>
</MySchemaForm>

<div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 16px;">
  <MyButton type="primary" @click="validateUserForm">校验</MyButton>
  <MyButton plain @click="resetUserForm">重置</MyButton>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SchemaFormField } from '@elowen/elowen-ui'

const formRef = ref()
const model = ref({ username: '', role: undefined, status: 'active', reason: '', owner: '' })

const schema: SchemaFormField[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'input',
    rules: [
      { required: true, message: '请输入用户名', trigger: 'change' },
      {
        trigger: 'change',
        validator: async (value) => value === 'root' ? 'root 是系统保留账号' : true,
      },
    ],
  },
  {
    field: 'reason',
    label: '禁用原因',
    component: 'textarea',
    hidden: (model) => model.status !== 'disabled',
    disabled: (model) => model.role === 'admin',
    dependencies: ['status', 'role'],
    rules: [
      {
        trigger: 'change',
        validator: (value, model) =>
          model.status !== 'disabled' || Boolean(value) || '请输入禁用原因',
      },
    ],
  },
  { field: 'owner', label: '负责人', component: 'custom', slot: 'owner' },
]
</script>

<template>
  <MySchemaForm ref="formRef" v-model="model" :schema="schema">
    <template #owner="{ model, field, updateField }">
      <MySelect
        :model-value="model[field.field]"
        :options="ownerOptions"
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

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 字段值变化时触发，返回新的浅拷贝对象 | `(value: SchemaFormModel) => void` |
| `validate` | 调用 `validate()` 后触发 | `(valid: boolean) => void` |

## SchemaFormField

| 字段名 | 说明 | 类型 |
| --- | --- | --- |
| `field` | 字段名 | `string` |
| `label` | 标签 | `string` |
| `component` | 渲染组件 | `'input' \| 'textarea' \| 'select' \| 'custom'` |
| `placeholder` | 占位文本 | `string` |
| `options` | Select 选项 | `SelectOption[]` |
| `rules` | 字段级校验，支持异步 `validator` | `FormRule[]` |
| `dependencies` | 依赖字段变化后重新校验当前字段 | `string[]` |
| `hidden` | 联动显隐 | `boolean \| ((model) => boolean)` |
| `disabled` | 动态禁用 | `boolean \| ((model) => boolean)` |
| `slot` | 自定义插槽名，默认使用 `field` | `string` |

## Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `{slot}` 或 `{field}` | `component: 'custom'` 时渲染自定义字段 | `{ field, model, disabled, updateField, validate }` |

自定义字段需要通过 `updateField(fieldName, value)` 回写数据；如果要接入校验，可以在字段组件的 `blur` 或 `change` 时调用插槽暴露的 `validate(trigger)`。

## Exposes

| 方法名 | 说明 |
| --- | --- |
| `validate()` | 校验整个表单 |
| `validateField(field, trigger?)` | 校验单个字段 |
| `clearValidate(fields?)` | 清除字段错误 |
| `setFieldError(field, message)` | 手动设置字段错误 |
| `getFieldState(field)` | 获取字段错误和校验状态 |
| `resetFields()` | 重置字段 |
| `getFieldsValue()` | 获取当前值 |
| `setFieldsValue(values)` | 批量设置字段值 |
