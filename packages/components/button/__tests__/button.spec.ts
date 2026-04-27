import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from '../src/button.vue'

describe('MyButton', () => {
  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
