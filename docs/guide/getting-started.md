# 快速开始

这一页说明如何运行当前仓库，以及如何在 Vue 项目中接入 ElowenUI。

## 环境要求

- Node.js 18+
- pnpm 10+

## 安装依赖

```bash
pnpm install
```

## 本地运行

启动 Playground：

```bash
pnpm dev
```

启动文档站：

```bash
pnpm docs:dev
```

## 检查命令

类型检查：

```bash
pnpm typecheck
```

运行测试：

```bash
pnpm test
```

构建组件库：

```bash
pnpm build
```

构建文档站：

```bash
pnpm docs:build
```

## 在 Vue 中使用

整库安装：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ElowenUI from '@elowen/elowen-ui'

createApp(App).use(ElowenUI).mount('#app')
```

按需引入：

```ts
import '@elowen/elowen-ui/style.css'
import { MyButton, MyInput, MySelect, MyDialog } from '@elowen/elowen-ui/components'
```
