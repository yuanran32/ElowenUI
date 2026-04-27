import type { FormModel } from './types'

const PATH_SEGMENT_RE = /\[(.+?)\]/g

const normalizePath = (path: string) =>
  path
    .replace(PATH_SEGMENT_RE, '.$1')
    .split('.')
    .map((segment) => segment.trim())
    .filter(Boolean)

const isIndexSegment = (segment: string) => /^\d+$/.test(segment)

export const getValueByPath = (model: FormModel, path: string) => {
  if (!path) {
    return model
  }

  return normalizePath(path).reduce<any>((current, segment) => current?.[segment], model)
}

export const setValueByPath = (model: FormModel, path: string, value: any) => {
  const segments = normalizePath(path)
  if (!segments.length) {
    return
  }

  let current: any = model

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index]
    const nextSegment = segments[index + 1]

    if (current[segment] === undefined || current[segment] === null) {
      current[segment] = isIndexSegment(nextSegment) ? [] : {}
    }

    current = current[segment]
  }

  current[segments[segments.length - 1]] = value
}

export const cloneFieldValue = <T>(value: T): T => {
  if (value === undefined || value === null) {
    return value
  }

  if (typeof structuredClone === 'function') {
    return structuredClone(value)
  }

  try {
    return JSON.parse(JSON.stringify(value)) as T
  } catch {
    return value
  }
}
