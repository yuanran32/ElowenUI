import { describe, expect, it } from 'vitest'
import { applyTheme, createThemeVariables } from './use-theme'

describe('theme api', () => {
  it('creates css variables from theme options', () => {
    const variables = createThemeVariables({
      primary: '#16a34a',
      radius: '6px',
      mode: 'light',
    })

    expect(variables['--my-color-primary']).toBe('#16a34a')
    expect(variables['--my-radius-base']).toBe('6px')
  })

  it('applies variables to target element', () => {
    const target = document.createElement('div')
    const variables = applyTheme({ primary: '#16a34a', mode: 'dark' }, target)

    expect(target.dataset.theme).toBe('dark')
    expect(target.style.getPropertyValue('--my-color-primary')).toBe('#16a34a')
    expect(variables['--my-color-primary-light']).toContain('rgba')
  })
})

