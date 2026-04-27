# ElowenUI

ElowenUI 是一个基于 Vue 3、TypeScript 和 Vite 构建的轻量组件库项目，包含组件源码、文档站、Playground、测试和构建配置。

## 特性

- 基于 `Vue 3 + TypeScript + Vite`
- 使用 `VitePress` 构建文档站
- 提供 `play/` 本地 Playground
- 支持整库安装和具名导出
- 提供基础测试和类型声明输出
- 组件目录按 `view + types + composables` 方式组织


## 安装依赖

```bash
pnpm install
```

## 本地开发

启动 Playground：

```bash
pnpm dev
```

启动文档站：

```bash
pnpm docs:dev
```

## 构建与检查

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

## 使用方式

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

## 项目结构

```txt
packages/
  components/   # 组件源码、测试、类型定义、组合式逻辑
  elowen-ui/    # 组件库入口与 installer
  theme/        # 主题变量与基础样式
  utils/        # 通用工具
docs/           # VitePress 文档站
play/           # 本地 Playground
dist/           # 构建产物
```
