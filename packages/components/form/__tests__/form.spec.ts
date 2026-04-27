import { mount } from '@vue/test-utils'
import { defineComponent, reactive, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import Form from '../src/form.vue'
import FormItem from '../src/form-item.vue'
import Input from '../../input/src/input.vue'
import Select from '../../select/src/select.vue'

describe('MyForm', () => {
  const TestForm = defineComponent({
    components: { Form, FormItem, Input, Select },
    setup() {
      const formRef = ref<InstanceType<typeof Form>>()
      const model = reactive({
        name: '',
        framework: undefined as string | undefined,
      })
      const rules = {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, message: '至少 3 个字符', trigger: 'change' },
        ],
        framework: [{ required: true, message: '请选择框架', trigger: 'change' }],
      }
      const options = [
        { label: 'Vue', value: 'vue' },
        { label: 'Nuxt', value: 'nuxt' },
      ]

      return { formRef, model, rules, options }
    },
    template: `
      <Form ref="formRef" :model="model" :rules="rules">
        <FormItem label="名称" prop="name">
          <template #default="{ validate }">
            <Input
              v-model="model.name"
              @blur="() => validate('blur')"
              @change="() => validate('change')"
            />
          </template>
        </FormItem>
        <FormItem label="框架" prop="framework">
          <template #default="{ validate }">
            <Select
              v-model="model.framework"
              :options="options"
              @change="() => validate('change')"
            />
          </template>
        </FormItem>
      </Form>
    `,
  })

  it('validates failure and success', async () => {
    const wrapper = mount(TestForm, { attachTo: document.body })

    expect(await wrapper.vm.formRef?.validate?.()).toBe(false)
    expect(wrapper.text()).toContain('请输入名称')

    await wrapper.get('input').setValue('hello')
    await wrapper.get('input').trigger('change')
    await wrapper.get('.my-select__trigger').trigger('click')
    await wrapper.findAll('.my-select__option')[0].trigger('click')

    expect(await wrapper.vm.formRef?.validate?.()).toBe(true)

    wrapper.unmount()
  })

  it('resets fields', async () => {
    const wrapper = mount(TestForm, { attachTo: document.body })

    await wrapper.get('input').setValue('reset me')
    await wrapper.get('.my-select__trigger').trigger('click')
    await wrapper.findAll('.my-select__option')[0].trigger('click')

    wrapper.vm.formRef?.resetFields?.()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.model.name).toBe('')
    expect(wrapper.vm.model.framework).toBeUndefined()

    wrapper.unmount()
  })

  it('supports linked validation across fields', async () => {
    const LinkedForm = defineComponent({
      components: { Form, FormItem, Input },
      setup() {
        const formRef = ref<InstanceType<typeof Form>>()
        const model = reactive({ password: '', confirmPassword: '' })
        const rules = {
          password: [{ required: true, message: '请输入密码', trigger: 'change' }],
          confirmPassword: [
            {
              trigger: 'change',
              validator: (value: string, currentModel: typeof model) =>
                value === currentModel.password || '两次输入不一致',
            },
          ],
        }
        return { formRef, model, rules }
      },
      template: `
        <Form ref="formRef" :model="model" :rules="rules">
          <FormItem label="密码" prop="password">
            <template #default="{ validate }">
              <Input v-model="model.password" @change="() => validate('change')" />
            </template>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword">
            <template #default="{ validate }">
              <Input v-model="model.confirmPassword" @change="() => validate('change')" />
            </template>
          </FormItem>
        </Form>
      `,
    })

    const wrapper = mount(LinkedForm)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('secret')
    await inputs[0].trigger('change')
    await inputs[1].setValue('other')
    await inputs[1].trigger('change')

    expect(await wrapper.vm.formRef?.validate?.()).toBe(false)
    expect(wrapper.text()).toContain('两次输入不一致')
  })

  it('supports nested field paths and reset', async () => {
    const NestedForm = defineComponent({
      components: { Form, FormItem, Input },
      setup() {
        const formRef = ref<InstanceType<typeof Form>>()
        const model = reactive({
          profile: {
            name: '',
          },
        })
        const rules = {
          'profile.name': [{ required: true, message: '请输入昵称', trigger: 'change' }],
        }

        return { formRef, model, rules }
      },
      template: `
        <Form ref="formRef" :model="model" :rules="rules">
          <FormItem label="昵称" prop="profile.name">
            <template #default="{ validate }">
              <Input v-model="model.profile.name" @change="() => validate('change')" />
            </template>
          </FormItem>
        </Form>
      `,
    })

    const wrapper = mount(NestedForm)

    expect(await wrapper.vm.formRef?.validate?.()).toBe(false)
    expect(wrapper.text()).toContain('请输入昵称')

    await wrapper.get('input').setValue('Elowen')
    await wrapper.get('input').trigger('change')
    expect(await wrapper.vm.formRef?.validate?.()).toBe(true)

    wrapper.vm.formRef?.resetFields?.()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.model.profile.name).toBe('')
  })

  it('revalidates dependent fields when source fields change', async () => {
    const DependencyForm = defineComponent({
      components: { Form, FormItem, Input },
      setup() {
        const formRef = ref<InstanceType<typeof Form>>()
        const model = reactive({ password: '', confirmPassword: '' })
        const rules = {
          password: [{ required: true, message: '请输入密码', trigger: 'change' }],
          confirmPassword: [
            {
              trigger: 'change',
              validator: (value: string, currentModel: typeof model) =>
                value === currentModel.password || '两次输入不一致',
            },
          ],
        }

        return { formRef, model, rules }
      },
      template: `
        <Form ref="formRef" :model="model" :rules="rules">
          <FormItem label="密码" prop="password">
            <template #default="{ validate }">
              <Input v-model="model.password" @change="() => validate('change')" />
            </template>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword" :dependencies="['password']">
            <template #default="{ validate }">
              <Input v-model="model.confirmPassword" @change="() => validate('change')" />
            </template>
          </FormItem>
        </Form>
      `,
    })

    const wrapper = mount(DependencyForm)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('secret')
    await inputs[0].trigger('change')
    await inputs[1].setValue('secret')
    await inputs[1].trigger('change')
    expect(await wrapper.vm.formRef?.validate?.()).toBe(true)

    await inputs[0].setValue('updated')
    await inputs[0].trigger('change')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('两次输入不一致')
  })

  it('keeps only the latest async validation result and exposes field controls', async () => {
    const scrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = scrollIntoView

    const AsyncForm = defineComponent({
      components: { Form, FormItem, Input },
      setup() {
        const formRef = ref<InstanceType<typeof Form>>()
        const model = reactive({ name: '' })
        const rules = {
          name: [
            {
              trigger: 'change',
              validator: async (value: string) => {
                await new Promise((resolve) => setTimeout(resolve, value === 'slow' ? 20 : 0))
                return value === 'taken' ? '名称已存在' : true
              },
            },
          ],
        }

        return { formRef, model, rules }
      },
      template: `
        <Form ref="formRef" :model="model" :rules="rules" scroll-to-error>
          <FormItem label="名称" prop="name">
            <template #default="{ validate, validating }">
              <Input
                v-model="model.name"
                :placeholder="validating ? 'validating' : 'idle'"
                @change="() => validate('change')"
              />
            </template>
          </FormItem>
        </Form>
      `,
    })

    const wrapper = mount(AsyncForm)
    const input = wrapper.get('input')

    await input.setValue('slow')
    await input.trigger('change')
    await input.setValue('taken')
    await input.trigger('change')
    await new Promise((resolve) => setTimeout(resolve, 30))
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('名称已存在')

    wrapper.vm.formRef?.clearValidate?.('name')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).not.toContain('名称已存在')

    wrapper.vm.formRef?.setFieldError?.('name', '手动错误')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('手动错误')
    expect(wrapper.vm.formRef?.getFieldState?.('name')).toEqual({
      error: '手动错误',
      validating: false,
    })

    await wrapper.vm.formRef?.validate?.()
    expect(scrollIntoView).toHaveBeenCalled()
  })
})
