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
- `SchemaForm` 配置化表单：输入框、文本域、选择器、自定义字段、异步校验、联动显隐、动态禁用
- `ProTable` 业务表格：搜索表单、远程请求、分页、页容量切换、服务端排序、错误重试、刷新和重置
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
- `SchemaForm` 的 schema 渲染、文本域、自定义字段插槽、动态显隐、动态禁用、字段依赖校验和表单方法暴露
- `ProTable` 的搜索表单校验、请求并发保护、分页、页容量切换、服务端排序、错误态、刷新和重置

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

## 业务组件重点

### SchemaForm

`SchemaForm` 使用 `SchemaFormField[]` 描述表单字段，目前支持 `input`、`textarea`、`select` 和 `custom` 四类字段。字段可以声明 `rules` 做同步或异步校验，也可以通过 `hidden`、`disabled` 和 `dependencies` 处理联动场景。组件会暴露 `validate`、`validateField`、`clearValidate`、`setFieldError`、`getFieldState`、`resetFields`、`getFieldsValue` 和 `setFieldsValue` 等方法，方便页面在提交、重置和服务端错误回填时使用。

### ProTable

`ProTable` 把列表页的搜索、请求、分页和排序集中起来。组件接收 `request(params)`，内部维护 `page`、`pageSize`、`sorter`、搜索表单提交值和请求状态。它会把外部 `query` 与内置搜索表单值合并后传给请求函数，并在请求失败时展示错误区域和重试入口。当前实现也处理了请求返回顺序问题，旧请求晚于新请求返回时不会覆盖最新数据。

## 工程能力

除了组件本身，仓库还覆盖了组件库开发常见的几个环节：

- `Playground`：本地联调和交互演示
- `VitePress`：文档和示例展示
- `Vitest + Vue Test Utils`：关键行为验证
- `Vite lib mode`：输出可消费的库产物

## 下一步阅读

- 从 [快速开始](/guide/getting-started) 查看运行方式和接入方式
