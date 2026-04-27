<script setup lang="ts">
import { computed, ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')
const keyword = ref('Hello ElowenUI')
const message = ref('Tag close event not triggered yet.')
const closableTags = ref(['Vue 3', 'TypeScript', 'Vite', 'VitePress'])
const dialogVisible = ref(false)
const selectValue = ref<string | number>()
const formRef = ref()
const formModel = ref({
  name: '',
  framework: undefined as string | undefined,
})
const formResult = ref('尚未提交')

const frameworkOptions = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'Nuxt 3', value: 'nuxt' },
  { label: 'Pinia', value: 'pinia' },
]

const formRules = {
  name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 3, message: '项目名称至少 3 个字符', trigger: 'change' },
  ],
  framework: [{ required: true, message: '请选择技术栈', trigger: 'change' }],
}

const componentCount = computed(() => 10)

const removeTag = (label: string) => {
  closableTags.value = closableTags.value.filter((item) => item !== label)
  message.value = `Closed tag: ${label}`
}

const resetTags = () => {
  closableTags.value = ['Vue 3', 'TypeScript', 'Vite', 'VitePress']
  message.value = 'Tag list has been reset.'
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const submitForm = async () => {
  const valid = await formRef.value?.validate()
  formResult.value = valid
    ? `提交成功：${formModel.value.name} / ${formModel.value.framework}`
    : '表单校验未通过'
}

const resetForm = () => {
  formRef.value?.resetFields()
  formResult.value = '表单已重置'
}
</script>

<template>
  <div class="playground" :data-theme="theme">
    <header class="hero">
      <div>
        <p class="hero__badge">Vue 3 Component Library Demo</p>
        <h1>ElowenUI Playground</h1>
        <p class="hero__desc">
          A lightweight UI component library built with Vue 3, TypeScript, Vite and
          VitePress. This demo highlights reusable component design, plugin-based
          installation, testing coverage and a clean engineering structure.
        </p>
      </div>

      <div class="hero__stats">
        <div class="stat-card">
          <strong>{{ componentCount }}</strong>
          <span>Reusable Components</span>
        </div>
        <div class="stat-card">
          <strong>TS</strong>
          <span>Typed Props / Emits</span>
        </div>
        <div class="stat-card stat-card--theme">
          <strong>{{ theme === 'light' ? 'Light' : 'Dark' }}</strong>
          <span>Theme Mode</span>
          <MyButton size="small" plain @click="toggleTheme">切换主题</MyButton>
        </div>
      </div>
    </header>

    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Button</h2>
          <p>Supports variant, size, round, plain, loading and disabled states.</p>
        </div>
      </div>

      <div class="demo-block">
        <h3>Variants</h3>
        <div class="row">
          <MyButton>Default</MyButton>
          <MyButton type="primary">Primary</MyButton>
          <MyButton type="success">Success</MyButton>
          <MyButton type="warning">Warning</MyButton>
          <MyButton type="danger">Danger</MyButton>
        </div>
      </div>

      <div class="demo-block">
        <h3>Sizes & States</h3>
        <div class="row align-end">
          <MyButton size="small">Small</MyButton>
          <MyButton plain type="primary">Plain</MyButton>
          <MyButton size="large" round type="primary">Large</MyButton>
          <MyButton loading type="success">Loading</MyButton>
          <MyButton disabled>Disabled</MyButton>
        </div>
      </div>

      <div class="demo-block">
        <h3>Visual Styles</h3>
        <div class="row">
          <MyButton type="primary" variant="soft">Soft Primary</MyButton>
          <MyButton type="success" variant="outline">Outline Success</MyButton>
          <MyButton type="warning" variant="ghost">Ghost Warning</MyButton>
          <MyButton type="danger" variant="soft" round>Soft Danger</MyButton>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Input</h2>
          <p>Supports v-model binding, clearable mode, size variations and disabled state.</p>
        </div>
        <div class="value-card">
          <span>Current Value</span>
          <strong>{{ keyword || 'Empty' }}</strong>
        </div>
      </div>

      <div class="grid">
        <div class="demo-block">
          <h3>Interactive Input</h3>
          <div class="column">
            <MyInput v-model="keyword" placeholder="Type something..." clearable />
            <MyInput v-model="keyword" variant="filled" placeholder="Filled input style" clearable />
            <MyInput v-model="keyword" variant="quiet" placeholder="Quiet underline style" clearable />
            <MyInput v-model="keyword" size="large" placeholder="Large clearable input" clearable />
            <MyInput model-value="Disabled state" disabled placeholder="Disabled input" />
          </div>
        </div>

        <div class="demo-block">
          <h3>Use Cases</h3>
          <ul class="feature-list">
            <li>Two-way binding via <code>v-model</code></li>
            <li>Typed emits for input / focus / blur / clear</li>
            <li>Reusable size API for scalable design</li>
            <li>Clear button for improved user experience</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Select</h2>
          <p>Supports single selection, placeholder, clearable, outside click and keyboard navigation.</p>
        </div>
        <div class="value-card">
          <span>Selected Framework</span>
          <strong>{{ selectValue || 'None' }}</strong>
        </div>
      </div>

      <div class="grid">
        <div class="demo-block">
          <h3>Interactive Select</h3>
          <div class="column">
            <MySelect v-model="selectValue" :options="frameworkOptions" placeholder="请选择技术栈" clearable />
            <MySelect v-model="selectValue" :options="frameworkOptions" variant="filled" placeholder="Filled select" clearable />
            <MySelect v-model="selectValue" :options="frameworkOptions" variant="quiet" placeholder="Quiet select" clearable />
            <MySelect :options="frameworkOptions" disabled placeholder="Disabled select" />
          </div>
        </div>

        <div class="demo-block">
          <h3>Keyboard Support</h3>
          <ul class="feature-list">
            <li>ArrowUp / ArrowDown 切换高亮项</li>
            <li>Enter 选中当前项</li>
            <li>ESC 收起下拉面板</li>
            <li>点击外部区域自动关闭</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Form</h2>
          <p>Combines multiple fields, validation rules and exposed methods for business scenarios.</p>
        </div>
        <div class="value-card">
          <span>Submit Result</span>
          <strong>{{ formResult }}</strong>
        </div>
      </div>

      <div class="grid">
        <div class="demo-block">
          <h3>Project Form</h3>
          <MyForm ref="formRef" :model="formModel" :rules="formRules">
            <MyFormItem label="项目名称" prop="name">
              <template #default="{ validate }">
                <MyInput
                  v-model="formModel.name"
                  placeholder="请输入项目名称"
                  @blur="() => validate('blur')"
                  @change="() => validate('change')"
                />
              </template>
            </MyFormItem>

            <MyFormItem label="技术栈" prop="framework">
              <template #default="{ validate }">
                <MySelect
                  v-model="formModel.framework"
                  :options="frameworkOptions"
                  placeholder="请选择技术栈"
                  @change="() => validate('change')"
                  @blur="() => validate('blur')"
                />
              </template>
            </MyFormItem>

            <div class="form-actions">
              <MyButton type="primary" @click="submitForm">提交</MyButton>
              <MyButton plain @click="resetForm">重置</MyButton>
            </div>
          </MyForm>
        </div>

        <div class="demo-block">
          <h3>Validation Features</h3>
          <ul class="feature-list">
            <li>required / min / max / validator 规则</li>
            <li>blur / change 双触发时机</li>
            <li>Form 暴露 validate / resetFields</li>
            <li>Input 与 Select 统一接入表单体系</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Tag</h2>
          <p>Supports type, effect, size, round and closable interaction.</p>
        </div>
        <div class="value-card">
          <span>Event Feedback</span>
          <strong>{{ message }}</strong>
        </div>
      </div>

      <div class="demo-block">
        <h3>Light Tags</h3>
        <div class="row">
          <MyTag>Default</MyTag>
          <MyTag type="primary">Primary</MyTag>
          <MyTag type="success">Success</MyTag>
          <MyTag type="warning">Warning</MyTag>
          <MyTag type="danger">Danger</MyTag>
        </div>
      </div>

      <div class="demo-block">
        <h3>Solid & Closable</h3>
        <div class="row">
          <MyTag effect="solid" type="primary">Solid Primary</MyTag>
          <MyTag effect="solid" type="success" round>Solid Success</MyTag>
          <MyTag effect="solid" type="warning" round>Solid Warning</MyTag>
          <MyTag effect="solid" type="danger">Solid Danger</MyTag>
          <MyTag effect="outline" type="primary">Outline Primary</MyTag>
          <MyTag effect="outline" type="success" round>Outline Success</MyTag>
          <MyTag
            v-for="tag in closableTags"
            :key="tag"
            type="primary"
            round
            closable
            @close="removeTag(tag)"
          >
            {{ tag }}
          </MyTag>
          <MyButton size="small" @click="resetTags">Reset Tags</MyButton>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Alert / Card / Divider</h2>
          <p>These components round out the library with layout and feedback patterns.</p>
        </div>
      </div>

      <div class="grid">
        <div class="demo-block">
          <h3>Alert</h3>
          <div class="column">
            <MyAlert title="Information" description="Useful neutral feedback for users." />
            <MyAlert
              variant="outline"
              type="warning"
              title="Outline Warning"
              description="Outline style keeps the alert lighter inside dense content areas."
            />
            <MyAlert
              variant="solid"
              type="success"
              closable
              title="Success"
              description="Operations can expose close events for user feedback."
            />
          </div>
        </div>

        <div class="demo-block">
          <h3>Card & Divider</h3>
          <MyCard header="Project Summary" shadow="hover" variant="elevated">
            This repository includes docs, playground demos, tests and build output.
            <MyDivider>Highlights</MyDivider>
            <ul class="feature-list">
              <li>Plugin install + named exports</li>
              <li>Typed component APIs</li>
              <li>Documented examples</li>
            </ul>
            <template #footer>
              <MyTag type="success">Interview Ready</MyTag>
            </template>
          </MyCard>
          <div style="margin-top: 14px;">
            <MyCard header="Soft Surface" variant="soft" shadow="never">
              Soft cards work well for dashboards, embedded forms and grouped configuration panels.
            </MyCard>
          </div>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header">
        <div>
          <h2>Dialog</h2>
          <p>Shows deeper interaction design with Teleport, keyboard handling and scroll lock.</p>
        </div>
      </div>

      <div class="demo-block">
        <h3>Open Dialog</h3>
        <div class="row">
          <MyButton type="primary" @click="dialogVisible = true">Open Dialog</MyButton>
        </div>
        <MyDialog v-model="dialogVisible" title="Delete confirmation" variant="elevated">
          This dialog demonstrates overlay interaction, ESC close support, body scroll lock
          and footer slot composition.
          <template #footer>
            <MyButton @click="dialogVisible = false">Cancel</MyButton>
            <MyButton type="danger" @click="dialogVisible = false">Confirm</MyButton>
          </template>
        </MyDialog>
      </div>
    </section>

    <section class="panel panel--summary">
      <h2>Why this project is interview-ready</h2>
      <div class="summary-grid">
        <article class="summary-card">
          <h3>Component Architecture</h3>
          <p>
            Components are split into props, composables and SFCs, making the codebase easier
            to maintain and extend.
          </p>
        </article>
        <article class="summary-card">
          <h3>Interaction Depth</h3>
          <p>
            Dialog, Select and Form add realistic interaction layers with validation, keyboard
            handling and state sync.
          </p>
        </article>
        <article class="summary-card">
          <h3>Engineering Workflow</h3>
          <p>
            The repository includes a playground, documentation site, tests, theming tokens and
            build output, reflecting a more complete component library workflow.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.playground {
  min-height: 100vh;
  padding: 40px;
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--my-color-primary) 18%, transparent), transparent 28%),
    linear-gradient(180deg, color-mix(in srgb, var(--my-color-primary-light) 24%, var(--my-color-white)) 0%, var(--my-color-fill-light) 100%);
  color: var(--my-color-text-primary);
  font-family: Inter, Arial, Helvetica, sans-serif;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.9fr);
  gap: 24px;
  margin-bottom: 28px;
}

.hero__badge {
  display: inline-flex;
  margin: 0 0 12px;
  border-radius: var(--my-radius-round);
  padding: 6px 12px;
  background: var(--my-color-primary-light);
  color: var(--my-color-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0;
  font-size: 40px;
  line-height: 1.1;
}

.hero__desc {
  max-width: 720px;
  margin: 16px 0 0;
  color: var(--my-color-text-regular);
  font-size: 15px;
  line-height: 1.7;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-card,
.value-card,
.summary-card {
  border: 1px solid color-mix(in srgb, var(--my-color-text-primary) 8%, transparent);
  border-radius: var(--my-radius-xl);
  background: color-mix(in srgb, var(--my-color-white) 88%, transparent);
  box-shadow: var(--my-shadow-md);
  backdrop-filter: blur(8px);
}

.stat-card {
  display: flex;
  min-height: 116px;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 20px;
}

.stat-card strong {
  font-size: 28px;
  color: var(--my-color-text-primary);
}

.stat-card span {
  color: var(--my-color-text-secondary);
  font-size: 13px;
}

.stat-card--theme {
  justify-content: space-between;
}

.panel {
  margin-top: 20px;
  border: 1px solid color-mix(in srgb, var(--my-color-text-primary) 8%, transparent);
  border-radius: 24px;
  padding: 24px;
  background: color-mix(in srgb, var(--my-color-white) 92%, transparent);
  box-shadow: var(--my-shadow-md);
}

.panel__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.panel__header h2,
.panel--summary h2 {
  margin: 0;
  font-size: 24px;
}

.panel__header p {
  margin: 8px 0 0;
  color: var(--my-color-text-regular);
  font-size: 14px;
}

.value-card {
  min-width: 220px;
  padding: 16px 18px;
}

.value-card span {
  display: block;
  color: var(--my-color-text-secondary);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value-card strong {
  display: block;
  margin-top: 8px;
  color: var(--my-color-text-primary);
  font-size: 16px;
  line-height: 1.5;
}

.demo-block + .demo-block {
  margin-top: 24px;
}

.demo-block h3 {
  margin: 0 0 14px;
  color: var(--my-color-text-primary);
  font-size: 18px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.align-end {
  align-items: flex-end;
}

.column {
  display: grid;
  gap: 14px;
}

.grid,
.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.feature-list {
  margin: 0;
  padding-left: 18px;
  color: var(--my-color-text-regular);
  line-height: 1.8;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.summary-card {
  padding: 20px;
}

.summary-card h3 {
  margin: 0 0 10px;
  color: var(--my-color-text-primary);
}

.summary-card p {
  margin: 0;
  color: var(--my-color-text-regular);
  line-height: 1.7;
}

.panel--summary {
  margin-bottom: 24px;
}

@media (max-width: 960px) {
  .playground {
    padding: 24px;
  }

  .hero,
  .grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .hero__stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .panel__header {
    flex-direction: column;
  }

  .value-card {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 640px) {
  .hero__stats {
    grid-template-columns: 1fr;
  }
}
</style>
