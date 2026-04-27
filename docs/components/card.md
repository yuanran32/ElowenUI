# Card 卡片

用于承载内容和信息分组，支持不同表面风格、阴影策略和头尾插槽。

## 基础用法

<MyCard header="卡片标题">
  这是卡片主体内容，适合承载摘要、说明和局部操作区域。
</MyCard>

```vue
<template>
  <MyCard header="卡片标题">
    这是卡片主体内容，适合承载摘要、说明和局部操作区域。
  </MyCard>
</template>
```

## 表面风格

<div style="display: grid; gap: 16px;">
  <MyCard header="Default Surface">默认卡片适合绝大多数内容区。</MyCard>
  <MyCard header="Soft Surface" variant="soft" shadow="never">Soft 卡片更适合嵌入式表单与分组内容。</MyCard>
  <MyCard header="Outline Surface" variant="outline" shadow="never">Outline 卡片强调边界，不强调层级。</MyCard>
  <MyCard header="Elevated Surface" variant="elevated" shadow="hover">Elevated 卡片适合首页卡片和重点内容展示。</MyCard>
</div>

```vue
<template>
  <MyCard header="Default Surface">默认卡片适合绝大多数内容区。</MyCard>
  <MyCard header="Soft Surface" variant="soft" shadow="never">Soft 卡片更适合嵌入式表单与分组内容。</MyCard>
  <MyCard header="Outline Surface" variant="outline" shadow="never">Outline 卡片强调边界，不强调层级。</MyCard>
  <MyCard header="Elevated Surface" variant="elevated" shadow="hover">Elevated 卡片适合首页卡片和重点内容展示。</MyCard>
</template>
```

## 头尾插槽

<MyCard>
  <template #header>自定义头部</template>
  这里是卡片主体内容。
  <template #footer>
    <MyTag type="success">Footer Slot</MyTag>
  </template>
</MyCard>

```vue
<template>
  <MyCard>
    <template #header>自定义头部</template>
    这里是卡片主体内容。
    <template #footer>
      <MyTag type="success">Footer Slot</MyTag>
    </template>
  </MyCard>
</template>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `header` | 头部标题文本 | `string` | `''` |
| `shadow` | 阴影策略 | `'always' \| 'hover' \| 'never'` | `always` |
| `variant` | 表面风格 | `'default' \| 'soft' \| 'outline' \| 'elevated'` | `default` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 卡片主体内容 |
| `header` | 自定义头部内容 |
| `footer` | 自定义底部内容 |
