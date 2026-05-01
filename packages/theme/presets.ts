export type ThemeMode = 'light' | 'dark'

export type ThemeOptions = {
  primary?: string
  radius?: string
  mode?: ThemeMode
}

export const lightTheme: Required<ThemeOptions> = {
  primary: '#409eff',
  radius: '10px',
  mode: 'light',
}

export const darkTheme: Required<ThemeOptions> = {
  primary: '#409eff',
  radius: '10px',
  mode: 'dark',
}

export const themePresets = {
  light: lightTheme,
  dark: darkTheme,
}

