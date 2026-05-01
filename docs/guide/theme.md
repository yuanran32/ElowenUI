# 主题配置

ElowenUI 基于 CSS 变量组织样式，同时提供运行时主题 API，用于切换主色、圆角和明暗模式。

## 运行时切换

```ts
import { applyTheme } from '@elowen/elowen-ui'

applyTheme({
  primary: '#16a34a',
  radius: '6px',
  mode: 'dark',
})
```

## 设计目标

- 基础组件只消费 CSS 变量。
- 业务系统可以在运行时注入品牌色。
- 明暗模式通过 `data-theme` 与变量共同控制。

## ThemeOptions

| 字段名 | 说明 | 类型 |
| --- | --- | --- |
| `primary` | 主色 | `string` |
| `radius` | 基础圆角 | `string` |
| `mode` | 主题模式 | `'light' \| 'dark'` |

