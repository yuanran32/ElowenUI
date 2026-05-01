# 项目介绍

`ElowenUI` 是一个面向 Vue 3 中后台场景的轻量业务组件库，重点展示组件封装、类型设计、文档组织、测试、构建流程和业务抽象能力。

它不是为了替代 Element Plus，而是在基础组件之上继续封装后台系统高频模式：配置化表单、远程表格、统一校验、主题 token 和可复用交互。

当前仓库已经覆盖：

- 组件源码
- 统一入口与安装方式
- Playground 联调环境
- VitePress 文档站
- 基础测试
- 库模式构建和类型声明输出
- `SchemaForm` 配置化表单
- `ProTable` 业务表格
- 运行时主题 API

## 设计目标

### 统一的 API 风格

组件尽量保持一致的使用体验：

- 相似的 `size`、`variant`、`disabled` 等命名
- 明确的 `Props / Emits` 类型
- 尽量直观的插槽和事件设计

### 面向真实交互

当前仓库更关注真实业务中会反复出现的交互，而不是只做静态样式：

- `Input` / `Select` 的双向绑定和清空能力
- `Form` 的字段校验和方法暴露
- `Dialog` 的遮罩关闭、键盘关闭和滚动锁定
- `Table` 的排序、选择、空状态和固定列逻辑
- `SchemaForm` 的 schema 渲染、动态显隐、表单方法暴露
- `ProTable` 的请求、分页、排序、错误态和刷新

### 区别于通用 UI 库

通用 UI 库通常解决“单个组件如何展示和交互”的问题；ElowenUI 更关注“后台页面如何少写重复代码”：

- 表单字段由 schema 管理，而不是每个页面重复写模板。
- 表格请求协议统一，分页和排序状态由组件托管。
- 主题通过 CSS token 和运行时 API 注入，适合多后台项目复用。

### 可维护的目录结构

组件目录通常拆成三层：

- `*.vue`：结构和样式
- `*.ts`：Props、Emits 和类型定义
- `use-*.ts`：组合式逻辑

这种组织方式更适合后续扩展和协作维护。

## 当前范围

### 输入与表单

- `Button`
- `Input`
- `Select`
- `Form`
- `SchemaForm`

### 反馈与浮层

- `Alert`
- `Dialog`
- `Tag`

### 展示与布局

- `Card`
- `Divider`
- `Table`
- `ProTable`

## 工程能力

除了组件本身，仓库还覆盖了组件库开发常见的几个环节：

- `Playground`：本地联调和交互演示
- `VitePress`：文档和示例展示
- `Vitest + Vue Test Utils`：关键行为验证
- `Vite lib mode`：输出可消费的库产物

## 下一步阅读

- 从 [快速开始](/guide/getting-started) 查看运行方式和接入方式
