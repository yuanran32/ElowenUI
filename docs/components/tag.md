# Tag 标签

用于内容标记和状态展示，支持语义类型、尺寸、圆角、关闭行为和不同效果。

## 基础用法

<div style="display: flex; flex-wrap: wrap; gap: 12px;">
  <MyTag>Default</MyTag>
  <MyTag type="primary">Primary</MyTag>
  <MyTag type="success">Success</MyTag>
  <MyTag type="warning">Warning</MyTag>
  <MyTag type="danger">Danger</MyTag>
</div>

```vue
<template>
  <MyTag>Default</MyTag>
  <MyTag type="primary">Primary</MyTag>
  <MyTag type="success">Success</MyTag>
  <MyTag type="warning">Warning</MyTag>
  <MyTag type="danger">Danger</MyTag>
</template>
```

## 效果变体

<div style="display: flex; flex-wrap: wrap; gap: 12px;">
  <MyTag type="primary" effect="light">Light</MyTag>
  <MyTag type="primary" effect="solid">Solid</MyTag>
  <MyTag type="primary" effect="outline">Outline</MyTag>
  <MyTag type="success" effect="solid" round>Round Solid</MyTag>
</div>

```vue
<template>
  <MyTag type="primary" effect="light">Light</MyTag>
  <MyTag type="primary" effect="solid">Solid</MyTag>
  <MyTag type="primary" effect="outline">Outline</MyTag>
  <MyTag type="success" effect="solid" round>Round Solid</MyTag>
</template>
```

## 可关闭

<MyTag type="primary" closable>Closable Tag</MyTag>

```vue
<template>
  <MyTag type="primary" closable>Closable Tag</MyTag>
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 标签语义类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `default` |
| `size` | 标签尺寸 | `'small' \| 'default' \| 'large'` | `default` |
| `effect` | 视觉效果 | `'light' \| 'solid' \| 'outline'` | `light` |
| `closable` | 是否显示关闭按钮 | `boolean` | `false` |
| `round` | 是否为圆角胶囊样式 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `close` | 点击关闭按钮时触发 | `MouseEvent` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 标签内容 |
