# Dialog 对话框

用于展示需要确认、补充信息或承载局部流程的浮层内容，支持 `v-model`、遮罩关闭、`ESC` 关闭和表面变体。

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const softOpen = ref(false)
const customOpen = ref(false)
</script>

## 基础用法

<div style="display: flex; gap: 12px; flex-wrap: wrap;">
  <MyButton type="primary" @click="open = true">打开对话框</MyButton>
  <MyButton variant="soft" @click="softOpen = true">打开 Soft Dialog</MyButton>
</div>

<MyDialog v-model="open" title="删除确认" variant="elevated">
  删除后数据将无法恢复，请确认是否继续。
  <template #footer>
    <MyButton @click="open = false">取消</MyButton>
    <MyButton type="danger" @click="open = false">确认删除</MyButton>
  </template>
</MyDialog>

<MyDialog v-model="softOpen" title="编辑说明" variant="soft" width="640px">
  Soft 风格更适合展示说明、表单和偏轻量的二级流程内容。
</MyDialog>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const softOpen = ref(false)
</script>

<template>
  <MyButton type="primary" @click="open = true">打开对话框</MyButton>
  <MyButton variant="soft" @click="softOpen = true">打开 Soft Dialog</MyButton>

  <MyDialog v-model="open" title="删除确认" variant="elevated">
    删除后数据将无法恢复，请确认是否继续。
    <template #footer>
      <MyButton @click="open = false">取消</MyButton>
      <MyButton type="danger" @click="open = false">确认删除</MyButton>
    </template>
  </MyDialog>

  <MyDialog v-model="softOpen" title="编辑说明" variant="soft" width="640px">
    Soft 风格更适合展示说明、表单和偏轻量的二级流程内容。
  </MyDialog>
</template>
```

## 自定义头部

<MyButton @click="customOpen = true">自定义头部</MyButton>

<MyDialog v-model="customOpen" width="640px">
  <template #header>
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <strong>自定义头部</strong>
      <span style="font-size: 13px; color: var(--my-color-text-secondary);">
        适合承载副标题、描述和状态说明。
      </span>
    </div>
  </template>
  这里可以放更复杂的提示内容、表单或分步流程。
</MyDialog>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const customOpen = ref(false)
</script>

<template>
  <MyButton @click="customOpen = true">自定义头部</MyButton>

  <MyDialog v-model="customOpen" width="640px">
    <template #header>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <strong>自定义头部</strong>
        <span style="font-size: 13px; color: var(--my-color-text-secondary);">
          适合承载副标题、描述和状态说明。
        </span>
      </div>
    </template>
    这里可以放更复杂的提示内容、表单或分步流程。
  </MyDialog>
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 控制显隐 | `boolean` | `false` |
| `title` | 标题文本 | `string` | `''` |
| `width` | 对话框宽度 | `string \| number` | `'520px'` |
| `variant` | 表面风格 | `'default' \| 'soft' \| 'elevated'` | `default` |
| `closeOnClickModal` | 点击遮罩是否关闭 | `boolean` | `true` |
| `closeOnPressEscape` | 按下 `ESC` 是否关闭 | `boolean` | `true` |
| `destroyOnClose` | 关闭后是否销毁默认插槽内容 | `boolean` | `false` |
| `showClose` | 是否显示右上角关闭按钮 | `boolean` | `true` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 显隐变化时触发 | `(value: boolean) => void` |
| `open` | 打开流程开始时触发 | `() => void` |
| `close` | 关闭流程开始时触发 | `() => void` |
| `opened` | 打开流程完成后触发 | `() => void` |
| `closed` | 关闭流程完成后触发 | `() => void` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 对话框主体内容 |
| `header` | 自定义头部内容 |
| `footer` | 自定义底部操作区 |
