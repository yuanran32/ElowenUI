import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Divider from '../src/divider.vue'

describe('MyDivider', () => {
  it('renders horizontal divider with text', () => {
    const wrapper = mount(Divider, {
      props: {
        dashed: true,
        contentPosition: 'left',
      },
      slots: {
        default: 'Section',
      },
    })

    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
    expect(wrapper.classes()).toContain('is-dashed')
    expect(wrapper.classes()).toContain('is-left')
    expect(wrapper.text()).toContain('Section')
  })

  it('renders vertical divider without slot text', () => {
    const wrapper = mount(Divider, {
      props: {
        direction: 'vertical',
      },
      slots: {
        default: 'Hidden',
      },
    })

    expect(wrapper.classes()).toContain('my-divider--vertical')
    expect(wrapper.text()).not.toContain('Hidden')
  })
})

