# Alert 警告提示

用于展示需要用户关注的状态信息，支持语义类型、标题、描述、关闭按钮和不同视觉样式。

## 基础用法

<MyAlert title="提示信息" description="这是一条基础提示内容。" />

```vue
<template>
  <MyAlert title="提示信息" description="这是一条基础提示内容。" />
</template>
```

## 类型与样式

<div style="display: grid; gap: 12px;">
  <MyAlert type="info" variant="soft" title="Info" description="适合一般说明和状态提醒。" />
  <MyAlert type="success" variant="solid" title="Success" description="适合完成后的积极反馈。" />
  <MyAlert type="warning" variant="outline" title="Warning" description="适合放在复杂内容区中做轻量提醒。" />
  <MyAlert type="error" variant="soft" title="Error" description="适合错误、异常和阻断型信息。" />
</div>

```vue
<template>
  <MyAlert type="info" variant="soft" title="Info" description="适合一般说明和状态提醒。" />
  <MyAlert type="success" variant="solid" title="Success" description="适合完成后的积极反馈。" />
  <MyAlert type="warning" variant="outline" title="Warning" description="适合放在复杂内容区中做轻量提醒。" />
  <MyAlert type="error" variant="soft" title="Error" description="适合错误、异常和阻断型信息。" />
</template>
```

## 可关闭与居中

<MyAlert
  closable
  center
  title="可关闭提示"
  description="点击右侧关闭按钮会触发 close 事件。"
/>

```vue
<template>
  <MyAlert
    closable
    center
    title="可关闭提示"
    description="点击右侧关闭按钮会触发 close 事件。"
  />
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 提示语义类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `info` |
| `variant` | 视觉样式 | `'soft' \| 'outline' \| 'solid'` | `soft` |
| `title` | 标题文本 | `string` | `''` |
| `description` | 描述文本 | `string` | `''` |
| `closable` | 是否显示关闭按钮 | `boolean` | `false` |
| `center` | 是否居中对齐内容 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `close` | 点击关闭按钮时触发 | `MouseEvent` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义描述内容 |
| `title` | 自定义标题内容 |
