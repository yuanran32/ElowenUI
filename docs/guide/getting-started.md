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

生成覆盖率报告：

```bash
pnpm test:coverage
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
import {
  MyButton,
  MyInput,
  MySelect,
  MySchemaForm,
  MyProTable,
} from '@elowen/elowen-ui/components'
```

按组件子路径引入：

```ts
import '@elowen/elowen-ui/style.css'
import { MyButton } from '@elowen/elowen-ui/components/button'
import { MySchemaForm } from '@elowen/elowen-ui/components/schema-form'
import { MyProTable } from '@elowen/elowen-ui/components/pro-table'
```

常用类型可以从主包导出：

```ts
import type {
  SchemaFormField,
  ProTableRequestParams,
  TableColumn,
} from '@elowen/elowen-ui'
```

## 当前组件范围

| 分类 | 组件 |
| --- | --- |
| 基础输入 | `Button`、`Input`、`Select` |
| 表单抽象 | `Form`、`SchemaForm` |
| 数据展示 | `Table`、`ProTable`、`Tag` |
| 反馈与浮层 | `Alert`、`Dialog` |
| 布局容器 | `Card`、`Divider` |

其中 `SchemaForm` 和 `ProTable` 是当前项目的业务抽象重点：前者用 schema 收敛表单字段、校验和联动逻辑，后者封装搜索表单、远程请求、分页、服务端排序、刷新、重置和错误重试。
