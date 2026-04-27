# Button 按钮

用于触发操作。支持语义类型、尺寸、圆角、加载态，以及统一的视觉变体。

## 基础用法

<div style="display: flex; flex-wrap: wrap; gap: 12px;">
  <MyButton>Default</MyButton>
  <MyButton type="primary">Primary</MyButton>
  <MyButton type="success">Success</MyButton>
  <MyButton type="warning">Warning</MyButton>
  <MyButton type="danger">Danger</MyButton>
</div>

```vue
<template>
  <MyButton>Default</MyButton>
  <MyButton type="primary">Primary</MyButton>
  <MyButton type="success">Success</MyButton>
  <MyButton type="warning">Warning</MyButton>
  <MyButton type="danger">Danger</MyButton>
</template>
```

## 视觉变体

`variant` 用于控制同一语义类型下的视觉风格。

<div style="display: flex; flex-wrap: wrap; gap: 12px;">
  <MyButton type="primary" variant="solid">Solid</MyButton>
  <MyButton type="primary" variant="soft">Soft</MyButton>
  <MyButton type="primary" variant="outline">Outline</MyButton>
  <MyButton type="primary" variant="ghost">Ghost</MyButton>
</div>

```vue
<template>
  <MyButton type="primary" variant="solid">Solid</MyButton>
  <MyButton type="primary" variant="soft">Soft</MyButton>
  <MyButton type="primary" variant="outline">Outline</MyButton>
  <MyButton type="primary" variant="ghost">Ghost</MyButton>
</template>
```

## 尺寸与状态

<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px;">
  <MyButton size="small">Small</MyButton>
  <MyButton size="large" round type="primary">Large Round</MyButton>
  <MyButton loading type="success">Loading</MyButton>
  <MyButton disabled>Disabled</MyButton>
  <MyButton plain type="primary">Plain Alias</MyButton>
</div>

```vue
<template>
  <MyButton size="small">Small</MyButton>
  <MyButton size="large" round type="primary">Large Round</MyButton>
  <MyButton loading type="success">Loading</MyButton>
  <MyButton disabled>Disabled</MyButton>
  <MyButton plain type="primary">Plain Alias</MyButton>
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 按钮语义类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `default` |
| `variant` | 视觉变体 | `'solid' \| 'soft' \| 'outline' \| 'ghost'` | `solid` |
| `size` | 按钮尺寸 | `'small' \| 'default' \| 'large'` | `default` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `plain` | 兼容旧用法，等价于 `variant="outline"` | `boolean` | `false` |
| `round` | 是否为圆角胶囊按钮 | `boolean` | `false` |
| `loading` | 是否显示加载态 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `MouseEvent` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 按钮内容 |
