import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Tag from '../src/tag.vue'

describe('MyTag', () => {
  it('renders slot and visual classes', () => {
    const wrapper = mount(Tag, {
      props: {
        type: 'primary',
        size: 'large',
        effect: 'solid',
        round: true,
      },
      slots: {
        default: 'Vue',
      },
    })

    expect(wrapper.text()).toContain('Vue')
    expect(wrapper.classes()).toContain('my-tag--primary')
    expect(wrapper.classes()).toContain('my-tag--large')
    expect(wrapper.classes()).toContain('is-solid')
    expect(wrapper.classes()).toContain('is-round')
  })

  it('emits close when closable button is clicked', async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
      },
    })

    await wrapper.get('.my-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

