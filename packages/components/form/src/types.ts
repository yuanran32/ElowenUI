import type { InjectionKey } from 'vue'

export type FormModel = Record<string, any>

export type FormTrigger = 'blur' | 'change'

export type FormRule = {
  required?: boolean
  min?: number
  max?: number
  message?: string
  trigger?: FormTrigger | FormTrigger[]
  validator?: (value: any, model: FormModel) => boolean | string | Promise<boolean | string>
}

export type FormRules = Record<string, FormRule[]>

export type ValidateResult = {
  valid: boolean
  errors: Record<string, string>
}

export type FormFieldState = {
  error: string
  validating: boolean
}

export type FormItemContext = {
  prop: string
  validate: (trigger?: FormTrigger) => Promise<string>
  resetField: () => void
  setError: (message: string) => void
  clearError: () => void
  el?: HTMLElement | null
  getState: () => FormFieldState
}

export type FormContext = {
  model: FormModel
  rules: FormRules
  registerItem: (item: FormItemContext) => void
  unregisterItem: (prop: string) => void
  validateField: (prop: string, trigger?: FormTrigger) => Promise<string>
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')
