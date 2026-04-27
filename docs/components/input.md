# Input 输入框

用于文本输入，支持 `v-model`、尺寸、清空按钮和不同表面样式。

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Hello ElowenUI')
</script>

## 基础用法

<MyInput v-model="value" placeholder="请输入内容" />

当前输入：`{{ value || '空' }}`

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <MyInput v-model="value" placeholder="请输入内容" />
</template>
```

## 不同表面样式

<div style="display: grid; gap: 12px;">
  <MyInput v-model="value" placeholder="Default input" clearable />
  <MyInput v-model="value" variant="filled" placeholder="Filled input" clearable />
  <MyInput v-model="value" variant="quiet" placeholder="Quiet underline input" clearable />
</div>

```vue
<template>
  <MyInput v-model="value" placeholder="Default input" clearable />
  <MyInput v-model="value" variant="filled" placeholder="Filled input" clearable />
  <MyInput v-model="value" variant="quiet" placeholder="Quiet underline input" clearable />
</template>
```

## 尺寸与禁用

<div style="display: grid; gap: 12px;">
  <MyInput v-model="value" size="small" placeholder="Small input" />
  <MyInput v-model="value" size="large" placeholder="Large input" clearable />
  <MyInput model-value="Disabled input" disabled placeholder="Disabled input" />
</div>

```vue
<template>
  <MyInput v-model="value" size="small" placeholder="Small input" />
  <MyInput v-model="value" size="large" placeholder="Large input" clearable />
  <MyInput model-value="Disabled input" disabled placeholder="Disabled input" />
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string` | `''` |
| `placeholder` | 占位内容 | `string` | `''` |
| `size` | 输入框尺寸 | `'small' \| 'default' \| 'large'` | `default` |
| `variant` | 表面样式 | `'default' \| 'filled' \| 'quiet'` | `default` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否显示清空按钮 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值变化时触发 | `(value: string) => void` |
| `input` | 原始输入行为触发 | `(value: string) => void` |
| `change` | 值变更后触发 | `(value: string) => void` |
| `focus` | 获取焦点时触发 | `FocusEvent` |
| `blur` | 失去焦点时触发 | `FocusEvent` |
| `clear` | 点击清空按钮时触发 | `() => void` |
