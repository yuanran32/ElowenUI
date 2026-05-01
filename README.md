# ElowenUI

ElowenUI 是一个基于 Vue 3、TypeScript 和 Vite 构建的轻量中后台业务组件库。项目不以复刻大型通用 UI 库为目标，而是在基础组件之上提供 `SchemaForm`、`ProTable`、运行时主题 token 和类型友好的组件 API，用于降低后台系统中表单、查询、表格、弹窗等重复开发成本。

## 特性

- 基于 `Vue 3 + TypeScript + Vite`
- 使用 `VitePress` 构建文档站
- 提供 `play/` 本地 Playground
- 提供 `SchemaForm` 配置化表单，支持输入框、文本域、选择器、自定义插槽、字段校验、联动显隐和动态禁用
- 提供 `ProTable` 业务表格，封装搜索表单、远程请求、分页、页容量切换、服务端排序、刷新、重置、错误重试和请求状态管理
- 提供运行时主题 API，支持主色、圆角和明暗模式切换
- 支持整库安装和具名导出
- 提供单元测试、覆盖率报告和类型检查
- 接入 `GitHub Actions` 持续集成
- 接入 `Changesets` 做版本管理和发包流程
- 组件目录按 `view + types + composables` 方式组织

## 项目定位

`Element Plus` 这类组件库提供的是通用基础组件；ElowenUI 更强调中后台业务抽象：

- 基础组件负责稳定交互和统一视觉。
- `SchemaForm` 负责把表单从模板驱动变成配置驱动，并提供统一校验、字段状态和自定义字段扩展点。
- `ProTable` 负责收敛列表页的搜索、请求、分页、排序、loading、empty、error 和重试流程。
- 主题 token 负责让业务系统可以运行时切换品牌风格。

## 当前组件

| 分类 | 组件 |
| --- | --- |
| 基础输入 | `Button`、`Input`、`Select` |
| 表单抽象 | `Form`、`SchemaForm` |
| 数据展示 | `Table`、`ProTable`、`Tag` |
| 反馈与浮层 | `Alert`、`Dialog` |
| 布局容器 | `Card`、`Divider` |

## 安装依赖

```bash
pnpm install
```

## 安装组件库

```bash
npm install @elowen/elowen-ui
```

或：

```bash
pnpm add @elowen/elowen-ui
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

运行覆盖率测试：

```bash
pnpm test:coverage
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

按需导入：

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

按组件子路径导入：

```ts
import '@elowen/elowen-ui/style.css'
import { MyButton } from '@elowen/elowen-ui/components/button'
import { MySchemaForm } from '@elowen/elowen-ui/components/schema-form'
import { MyProTable } from '@elowen/elowen-ui/components/pro-table'
```

业务组件类型也会随包导出：

```ts
import type {
  SchemaFormField,
  ProTableRequestParams,
  TableColumn,
} from '@elowen/elowen-ui'
```

## 工程流程

### CI

仓库内置了 `GitHub Actions` 持续集成，位于 `.github/workflows/ci.yml`。在推送到 `main/master` 或提交 PR 时会自动执行：

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test:coverage
pnpm build
pnpm docs:build
```

这保证了类型、测试、构建和文档构建链路都能被自动验证。

### 覆盖率

项目使用 `Vitest + @vitest/coverage-v8` 输出覆盖率报告，配置位于 `vitest.config.ts`。当前覆盖率会输出：

- 终端摘要
- `coverage/` HTML 报告
- `lcov` 报告

### 版本管理与发包

项目使用 `Changesets` 管理版本变更和发布流程。

新增一个会影响包版本的改动时，执行：

```bash
pnpm changeset
```

生成的 changeset 文件会放在 `.changeset/` 目录。仓库中的 release workflow 位于 `.github/workflows/release.yml`，推送到 `main/master` 后会：

- 检查是否存在待发布的 changeset
- 自动创建版本 PR
- 合并版本 PR 后调用 `pnpm release` 发包

如果要让 GitHub Actions 真正发布 npm 包，需要在仓库的 `Settings -> Secrets and variables -> Actions` 中配置：

- `NPM_TOKEN`

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
.changeset/     # Changesets 版本变更记录
.github/        # CI / Release 工作流
```

## 发布前检查

正式发包前建议至少确认：

```bash
pnpm typecheck
pnpm test:coverage
pnpm build
pnpm docs:build
pnpm exec changeset status
```

## License

[MIT](./LICENSE)
