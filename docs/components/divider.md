# Divider 分割线

用于区隔不同内容区域，支持水平/垂直方向、文字位置和虚线样式。

## 基础用法

<div>
  <span>内容一</span>
  <MyDivider />
  <span>内容二</span>
</div>

```vue
<template>
  <div>
    <span>内容一</span>
    <MyDivider />
    <span>内容二</span>
  </div>
</template>
```

## 带文字的分割线

<div style="display: grid; gap: 20px;">
  <MyDivider>默认居中</MyDivider>
  <MyDivider content-position="left">靠左内容</MyDivider>
  <MyDivider content-position="right">靠右内容</MyDivider>
</div>

```vue
<template>
  <MyDivider>默认居中</MyDivider>
  <MyDivider content-position="left">靠左内容</MyDivider>
  <MyDivider content-position="right">靠右内容</MyDivider>
</template>
```

## 垂直与虚线样式

<div style="display: flex; align-items: center;">
  文本 A
  <MyDivider direction="vertical" />
  文本 B
  <MyDivider direction="vertical" />
  文本 C
</div>

<MyDivider dashed>虚线分割</MyDivider>

```vue
<template>
  <div style="display: flex; align-items: center;">
    文本 A
    <MyDivider direction="vertical" />
    文本 B
    <MyDivider direction="vertical" />
    文本 C
  </div>

  <MyDivider dashed>虚线分割</MyDivider>
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `direction` | 分割线方向 | `'horizontal' \| 'vertical'` | `horizontal` |
| `contentPosition` | 文本内容位置 | `'left' \| 'center' \| 'right'` | `center` |
| `dashed` | 是否显示为虚线 | `boolean` | `false` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 水平分割线中间显示的内容 |
