import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '../src/input.vue'

describe('MyInput', () => {
  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    })

    await wrapper.get('input').setValue('hello')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
    expect(wrapper.emitted('input')?.[0]).toEqual(['hello'])
  })

  it('emits focus and blur events', async () => {
    const wrapper = mount(Input)

    await wrapper.get('input').trigger('focus')
    await wrapper.get('input').trigger('blur')

    expect(wrapper.emitted('focus')).toHaveLength(1)
    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('emits clear when clear button is clicked', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'hello',
        clearable: true,
      },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('input')?.[0]).toEqual([''])
    expect(wrapper.emitted('change')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('does not show clear button when disabled', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'hello',
        clearable: true,
        disabled: true,
      },
    })

    expect(wrapper.find('button').exists()).toBe(false)
  })
})
