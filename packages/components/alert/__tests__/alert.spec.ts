import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Alert from '../src/alert.vue'

describe('MyAlert', () => {
  it('renders title and description props', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'Saved',
        description: 'Your changes have been saved.',
        type: 'success',
        variant: 'solid',
      },
    })

    expect(wrapper.text()).toContain('Saved')
    expect(wrapper.text()).toContain('Your changes have been saved.')
    expect(wrapper.classes()).toContain('my-alert--success')
    expect(wrapper.classes()).toContain('is-solid')
  })

  it('renders slots and emits close', async () => {
    const wrapper = mount(Alert, {
      props: {
        closable: true,
        center: true,
      },
      slots: {
        title: 'Slot title',
        default: 'Slot description',
      },
    })

    await wrapper.get('.my-alert__close').trigger('click')

    expect(wrapper.text()).toContain('Slot title')
    expect(wrapper.text()).toContain('Slot description')
    expect(wrapper.classes()).toContain('is-center')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

