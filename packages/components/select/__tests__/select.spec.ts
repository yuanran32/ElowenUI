import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Select from '../src/select.vue'

const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Pinia', value: 'pinia', disabled: true },
]

describe('MySelect', () => {
  it('toggles dropdown and selects option', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
      },
      attachTo: document.body,
    })

    await wrapper.get('.my-select__trigger').trigger('click')
    expect(document.body.innerHTML).toContain('Nuxt')

    await wrapper.findAll('.my-select__option')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['nuxt'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['nuxt'])
    expect(document.body.innerHTML).not.toContain('Pinia')

    wrapper.unmount()
  })

  it('clears selected value', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: 'vue',
        clearable: true,
        options,
      },
      attachTo: document.body,
    })

    await wrapper.get('.my-select__clear').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([undefined])
    expect(wrapper.emitted('clear')).toHaveLength(1)

    wrapper.unmount()
  })

  it('supports keyboard navigation and escape closing', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
      },
      attachTo: document.body,
    })

    const trigger = wrapper.get('.my-select__trigger')
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['nuxt'])

    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'Escape' })

    expect(wrapper.find('.my-select__dropdown').exists()).toBe(false)

    wrapper.unmount()
  })

  it('closes when clicking outside', async () => {
    const wrapper = mount(Select, {
      props: {
        options,
      },
      attachTo: document.body,
    })

    await wrapper.get('.my-select__trigger').trigger('click')
    document.body.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.my-select__dropdown').exists()).toBe(false)

    wrapper.unmount()
  })
})
