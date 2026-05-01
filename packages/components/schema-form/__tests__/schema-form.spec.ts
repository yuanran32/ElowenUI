import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import SchemaForm from '../src/schema-form.vue'
import type { SchemaFormField } from '../src/schema-form'

const schema: SchemaFormField[] = [
  {
    field: 'name',
    label: '名称',
    component: 'input',
    placeholder: '请输入名称',
    rules: [{ required: true, message: '请输入名称', trigger: 'change' }],
  },
  {
    field: 'role',
    label: '角色',
    component: 'select',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '访客', value: 'guest' },
    ],
    rules: [{ required: true, message: '请选择角色', trigger: 'change' }],
  },
]

describe('MySchemaForm', () => {
  it('renders fields from schema and updates model', async () => {
    const Demo = defineComponent({
      components: { SchemaForm },
      setup() {
        const model = ref({ name: '', role: undefined as string | undefined })
        return { model, schema }
      },
      template: '<SchemaForm v-model="model" :schema="schema" />',
    })

    const wrapper = mount(Demo, { attachTo: document.body })

    await wrapper.get('input').setValue('Elowen')
    await wrapper.get('.my-select__trigger').trigger('click')
    await wrapper.findAll('.my-select__option')[0].trigger('click')

    expect(wrapper.vm.model).toEqual({ name: 'Elowen', role: 'admin' })

    wrapper.unmount()
  })

  it('validates fields and exposes helpers', async () => {
    const Demo = defineComponent({
      components: { SchemaForm },
      setup() {
        const formRef = ref<InstanceType<typeof SchemaForm>>()
        const model = ref({ name: '', role: undefined as string | undefined })
        return { formRef, model, schema }
      },
      template: '<SchemaForm ref="formRef" v-model="model" :schema="schema" />',
    })

    const wrapper = mount(Demo, { attachTo: document.body })

    expect(await wrapper.vm.formRef!.validate()).toBe(false)
    expect(wrapper.text()).toContain('请输入名称')

    wrapper.vm.formRef!.setFieldsValue({ name: 'Elowen', role: 'guest' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formRef!.getFieldsValue()).toEqual({ name: 'Elowen', role: 'guest' })
    expect(await wrapper.vm.formRef!.validate()).toBe(true)

    wrapper.unmount()
  })

  it('supports dynamic hidden and disabled fields', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        modelValue: { name: 'Elowen', role: 'guest', locked: 'yes' },
        schema: [
          ...schema,
          {
            field: 'secret',
            label: '密钥',
            component: 'input',
            hidden: (model) => model.role === 'guest',
          },
          {
            field: 'locked',
            label: '锁定',
            component: 'input',
            disabled: true,
          },
        ],
      },
    })

    expect(wrapper.text()).not.toContain('密钥')
    expect(wrapper.findAll('input').at(1)?.attributes('disabled')).toBeDefined()
  })

  it('does not mutate the incoming model object directly', async () => {
    const model = { name: '', role: undefined as string | undefined }
    const wrapper = mount(SchemaForm, {
      props: {
        modelValue: model,
        schema,
      },
    })

    await wrapper.get('input').setValue('Elowen')

    const updates = wrapper.emitted('update:modelValue')
    expect(model).toEqual({ name: '', role: undefined })
    expect(updates?.[0][0]).toEqual({ name: 'Elowen', role: undefined })
    expect(updates?.[0][0]).not.toBe(model)
  })

  it('supports textarea and custom slot fields', async () => {
    const Demo = defineComponent({
      components: { SchemaForm },
      setup() {
        const model = ref({ remark: '', owner: '' })
        const extendedSchema: SchemaFormField[] = [
          { field: 'remark', label: '备注', component: 'textarea' },
          { field: 'owner', label: '负责人', component: 'custom' },
        ]
        return { model, extendedSchema }
      },
      template: `
        <SchemaForm v-model="model" :schema="extendedSchema">
          <template #owner="{ model, field, updateField }">
            <button class="owner-picker" type="button" @click="updateField(field.field, 'Alice')">
              {{ model.owner || '选择负责人' }}
            </button>
          </template>
        </SchemaForm>
      `,
    })

    const wrapper = mount(Demo)

    await wrapper.get('textarea').setValue('需要跟进')
    await wrapper.get('.owner-picker').trigger('click')

    expect(wrapper.vm.model).toEqual({ remark: '需要跟进', owner: 'Alice' })
  })
})
