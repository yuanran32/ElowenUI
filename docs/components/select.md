# Select 选择器

用于单选场景，支持 `v-model`、清空、禁用、键盘导航和不同表面样式。

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number>()
const options = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'Nuxt 3', value: 'nuxt' },
  { label: 'Pinia', value: 'pinia' },
]
</script>

## 基础用法

<MySelect v-model="value" :options="options" placeholder="请选择框架" />

当前值：`{{ value || '未选择' }}`

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number>()
const options = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'Nuxt 3', value: 'nuxt' },
  { label: 'Pinia', value: 'pinia' },
]
</script>

<template>
  <MySelect v-model="value" :options="options" placeholder="请选择框架" />
</template>
```

## 样式变体

<div style="display: grid; gap: 12px;">
  <MySelect v-model="value" :options="options" placeholder="Default select" clearable />
  <MySelect v-model="value" :options="options" variant="filled" placeholder="Filled select" clearable />
  <MySelect v-model="value" :options="options" variant="quiet" placeholder="Quiet select" clearable />
</div>

```vue
<template>
  <MySelect v-model="value" :options="options" placeholder="Default select" clearable />
  <MySelect v-model="value" :options="options" variant="filled" placeholder="Filled select" clearable />
  <MySelect v-model="value" :options="options" variant="quiet" placeholder="Quiet select" clearable />
</template>
```

## 清空与禁用

<div style="display: grid; gap: 12px;">
  <MySelect v-model="value" :options="options" clearable placeholder="支持清空" />
  <MySelect :options="options" disabled placeholder="禁用状态" />
</div>

```vue
<template>
  <MySelect v-model="value" :options="options" clearable placeholder="支持清空" />
  <MySelect :options="options" disabled placeholder="禁用状态" />
</template>
```

## 交互说明

- 支持 `ArrowUp` / `ArrowDown` 切换高亮项
- 支持 `Enter` 选择当前项
- 支持 `Escape` 收起下拉层
- 点击外部区域会自动关闭

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string \| number \| undefined` | `undefined` |
| `options` | 选项列表 | `SelectOption[]` | `[]` |
| `placeholder` | 占位内容 | `string` | `'请选择'` |
| `variant` | 表面样式 | `'default' \| 'filled' \| 'quiet'` | `default` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否支持清空 | `boolean` | `false` |

## SelectOption

| 字段名 | 说明 | 类型 |
| --- | --- | --- |
| `label` | 选项文案 | `string` |
| `value` | 选项值 | `string \| number` |
| `disabled` | 是否禁用该项 | `boolean` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 选中值变化时触发 | `(value: string \| number \| undefined) => void` |
| `change` | 选项切换时触发 | `(value: string \| number \| undefined) => void` |
| `clear` | 点击清空时触发 | `() => void` |
| `visibleChange` | 下拉显隐变化时触发 | `(visible: boolean) => void` |
| `focus` | 获取焦点时触发 | `FocusEvent` |
| `blur` | 失去焦点时触发 | `FocusEvent` |
