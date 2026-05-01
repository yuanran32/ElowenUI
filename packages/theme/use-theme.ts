import { lightTheme, type ThemeOptions } from './presets'

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')

  if (!/^[\da-f]{6}$/i.test(normalized)) {
    return null
  }

  const value = Number.parseInt(normalized, 16)

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

const mixWithWhite = (hex: string, ratio: number) => {
  const rgb = hexToRgb(hex)

  if (!rgb) {
    return hex
  }

  const mix = (channel: number) => Math.round(channel + (255 - channel) * ratio)

  return `rgb(${mix(rgb.r)}, ${mix(rgb.g)}, ${mix(rgb.b)})`
}

const alpha = (hex: string, opacity: number) => {
  const rgb = hexToRgb(hex)

  if (!rgb) {
    return hex
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
}

export const createThemeVariables = (options: ThemeOptions = {}) => {
  const theme = {
    ...lightTheme,
    ...options,
  }

  return {
    '--my-color-primary': theme.primary,
    '--my-color-primary-light': theme.mode === 'dark'
      ? alpha(theme.primary, 0.16)
      : mixWithWhite(theme.primary, 0.9),
    '--my-color-primary-border': theme.mode === 'dark'
      ? alpha(theme.primary, 0.36)
      : mixWithWhite(theme.primary, 0.65),
    '--my-radius-base': theme.radius,
    '--my-radius-large': `calc(${theme.radius} + 4px)`,
    '--my-radius-xl': `calc(${theme.radius} + 8px)`,
    '--my-radius-2xl': `calc(${theme.radius} + 12px)`,
  }
}

export const applyTheme = (options: ThemeOptions = {}, target: HTMLElement = document.documentElement) => {
  const theme = {
    ...lightTheme,
    ...options,
  }
  const variables = createThemeVariables(theme)

  target.dataset.theme = theme.mode

  Object.entries(variables).forEach(([key, value]) => {
    target.style.setProperty(key, value)
  })

  return variables
}

