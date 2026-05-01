import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Card from '../src/card.vue'

describe('MyCard', () => {
  it('renders header prop and default slot', () => {
    const wrapper = mount(Card, {
      props: {
        header: 'Project',
        variant: 'elevated',
        shadow: 'hover',
      },
      slots: {
        default: 'Card body',
      },
    })

    expect(wrapper.text()).toContain('Project')
    expect(wrapper.text()).toContain('Card body')
    expect(wrapper.classes()).toContain('is-elevated')
    expect(wrapper.classes()).toContain('is-shadow-hover')
  })

  it('renders header and footer slots', () => {
    const wrapper = mount(Card, {
      slots: {
        header: '<strong>Custom header</strong>',
        default: 'Body',
        footer: '<button>Action</button>',
      },
    })

    expect(wrapper.text()).toContain('Custom header')
    expect(wrapper.text()).toContain('Action')
  })
})

