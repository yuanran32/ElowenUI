import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Dialog from '../src/dialog.vue'

describe('MyDialog', () => {
  it('renders content when opened', () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        title: 'Dialog title',
      },
      slots: {
        default: 'Dialog body',
      },
      attachTo: document.body,
    })

    expect(document.body.textContent).toContain('Dialog title')
    expect(document.body.textContent).toContain('Dialog body')

    wrapper.unmount()
  })

  it('renders slots', () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
      },
      slots: {
        header: '<div>Custom header</div>',
        default: '<div>Dialog body</div>',
        footer: '<button>Confirm</button>',
      },
      attachTo: document.body,
    })

    expect(document.body.textContent).toContain('Custom header')
    expect(document.body.textContent).toContain('Confirm')

    wrapper.unmount()
  })

  it('emits close on mask click when enabled', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
      },
      attachTo: document.body,
    })

    const overlay = document.body.querySelector('.my-dialog-overlay') as HTMLElement
    overlay.click()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)

    wrapper.unmount()
  })

  it('does not close on mask click when disabled', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        closeOnClickModal: false,
      },
      attachTo: document.body,
    })

    const overlay = document.body.querySelector('.my-dialog-overlay') as HTMLElement
    overlay.click()

    expect(wrapper.emitted('close')).toBeUndefined()

    wrapper.unmount()
  })

  it('emits close on escape key when enabled', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
      },
      attachTo: document.body,
    })

    const dialog = document.body.querySelector('.my-dialog') as HTMLElement
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)

    wrapper.unmount()
  })

  it('does not close on escape when disabled', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        closeOnPressEscape: false,
      },
      attachTo: document.body,
    })

    const dialog = document.body.querySelector('.my-dialog') as HTMLElement
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    expect(wrapper.emitted('close')).toBeUndefined()

    wrapper.unmount()
  })

  it('destroys default slot content on close when enabled', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        destroyOnClose: true,
      },
      slots: {
        default: '<div class="inner">Dialog body</div>',
      },
      attachTo: document.body,
    })

    await wrapper.setProps({ modelValue: false })

    expect(document.body.querySelector('.inner')).toBeNull()

    wrapper.unmount()
  })

  it('traps focus inside dialog and restores focus after close', async () => {
    const opener = document.createElement('button')
    opener.textContent = 'Open'
    document.body.appendChild(opener)
    opener.focus()

    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        showClose: false,
      },
      slots: {
        default: `
          <button class="first-action">First</button>
          <button class="last-action">Last</button>
        `,
      },
      attachTo: document.body,
    })

    await wrapper.vm.$nextTick()
    const first = document.body.querySelector('.first-action') as HTMLButtonElement
    const last = document.body.querySelector('.last-action') as HTMLButtonElement

    first.focus()
    first.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    }))
    expect(document.activeElement).toBe(last)

    last.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    }))
    expect(document.activeElement).toBe(first)

    await wrapper.setProps({ modelValue: false })
    await wrapper.vm.$nextTick()
    expect(document.activeElement).toBe(opener)

    wrapper.unmount()
    opener.remove()
  })
})
