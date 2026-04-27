import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(
  component: T,
  extra?: Record<string, any>
): SFCWithInstall<T> => {
  const comp = component as SFCWithInstall<T> & { name?: string }
  const installable = comp as SFCWithInstall<T> & Record<string, any>

  comp.install = (app: App) => {
    const name = comp.name
    if (name) {
      app.component(name, comp)
    }

    if (extra) {
      Object.values(extra).forEach((item) => {
        if (item?.name) {
          app.component(item.name, item)
        }
      })
    }
  }

  if (extra) {
    Object.assign(installable, extra)
  }

  return comp
}

export const withNoopInstall = <T>(component: T): SFCWithInstall<T> => {
  const comp = component as SFCWithInstall<T>
  comp.install = () => undefined
  return comp
}
