# ElowenUI

ElowenUI 是一个基于 Vue 3、TypeScript 和 Vite 构建的轻量组件库项目。仓库包含组件源码、文档站、Playground、测试、类型声明产物，以及基础的 CI / 覆盖率 / 发布流程。

## 特性

- 基于 `Vue 3 + TypeScript + Vite`
- 使用 `VitePress` 构建文档站
- 提供 `play/` 本地 Playground
- 支持整库安装和具名导出
- 提供单元测试、覆盖率报告和类型检查
- 接入 `GitHub Actions` 持续集成
- 接入 `Changesets` 做版本管理和发包流程
- 组件目录按 `view + types + composables` 方式组织

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
import { MyButton, MyInput, MySelect, MyDialog } from '@elowen/elowen-ui/components'
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
