# Form 表单

用于统一管理表单数据、校验规则和重置流程，适合与 `Input`、`Select` 等输入组件配合使用。

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
const form = reactive({
  name: '',
  framework: undefined as string | undefined,
})

const rules = {
  name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 3, message: '项目名称至少 3 个字符', trigger: 'change' },
  ],
  framework: [{ required: true, message: '请选择技术栈', trigger: 'change' }],
}

const options = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'Nuxt 3', value: 'nuxt' },
  { label: 'Pinia', value: 'pinia' },
]

const submit = async () => {
  const valid = await formRef.value?.validate()
  if (valid) {
    window.alert(`提交成功：${JSON.stringify(form)}`)
  }
}
</script>

## 基础用法

<MyForm ref="formRef" :model="form" :rules="rules">
  <MyFormItem label="项目名称" prop="name">
    <template #default="{ validate }">
      <MyInput
        v-model="form.name"
        placeholder="请输入项目名称"
        @blur="() => validate('blur')"
        @change="() => validate('change')"
      />
    </template>
  </MyFormItem>

  <MyFormItem label="技术栈" prop="framework">
    <template #default="{ validate }">
      <MySelect
        v-model="form.framework"
        :options="options"
        placeholder="请选择技术栈"
        @change="() => validate('change')"
        @blur="() => validate('blur')"
      />
    </template>
  </MyFormItem>

  <div style="display: flex; justify-content: flex-end; gap: 12px;">
    <MyButton type="primary" @click="submit">提交</MyButton>
    <MyButton plain @click="formRef?.resetFields()">重置</MyButton>
  </div>
</MyForm>

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
const form = reactive({
  name: '',
  framework: undefined,
})

const rules = {
  name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 3, message: '项目名称至少 3 个字符', trigger: 'change' },
  ],
  framework: [{ required: true, message: '请选择技术栈', trigger: 'change' }],
}

const options = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'Nuxt 3', value: 'nuxt' },
  { label: 'Pinia', value: 'pinia' },
]
</script>

<template>
  <MyForm ref="formRef" :model="form" :rules="rules">
    <MyFormItem label="项目名称" prop="name">
      <template #default="{ validate }">
        <MyInput
          v-model="form.name"
          placeholder="请输入项目名称"
          @blur="() => validate('blur')"
          @change="() => validate('change')"
        />
      </template>
    </MyFormItem>

    <MyFormItem label="技术栈" prop="framework">
      <template #default="{ validate }">
        <MySelect
          v-model="form.framework"
          :options="options"
          placeholder="请选择技术栈"
          @change="() => validate('change')"
          @blur="() => validate('blur')"
        />
      </template>
    </MyFormItem>

    <div style="display: flex; justify-content: flex-end; gap: 12px;">
      <MyButton type="primary">提交</MyButton>
      <MyButton plain>重置</MyButton>
    </div>
  </MyForm>
</template>
```

## 规则能力

支持以下校验能力：

- `required`
- `min`
- `max`
- `validator`
- `trigger: 'blur' | 'change' | Array<'blur' | 'change'>`

适合处理必填、长度限制、自定义同步校验和异步校验等场景。

## Form Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model` | 表单数据对象 | `Record<string, any>` | 必填 |
| `rules` | 表单校验规则集合 | `Record<string, FormRule[]>` | `{}` |
| `labelWidth` | 标签宽度 | `string` | `'96px'` |

## FormItem Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 标签文本 | `string` | `''` |
| `prop` | 字段名，对应 `model` 和 `rules` 中的 key | `string` | `''` |
| `required` | 是否强制显示必填标记 | `boolean` | `false` |

## FormRule

| 字段名 | 说明 | 类型 |
| --- | --- | --- |
| `required` | 是否必填 | `boolean` |
| `min` | 最小长度 | `number` |
| `max` | 最大长度 | `number` |
| `message` | 校验失败提示文案 | `string` |
| `trigger` | 触发时机 | `'blur' \| 'change' \| Array<'blur' \| 'change'>` |
| `validator` | 自定义校验函数 | `(value, model) => boolean \| string \| Promise<boolean \| string>` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `validate` | 表单整体校验完成后触发 | `({ valid, errors }) => void` |

## Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `validate` | 校验整个表单 | `() => Promise<boolean>` |
| `resetFields` | 重置所有字段与错误状态 | `() => void` |
| `validateField` | 单独校验某个字段 | `(prop: string, trigger?: 'blur' \| 'change') => Promise<string>` |
