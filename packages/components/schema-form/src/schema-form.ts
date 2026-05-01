import type { ExtractPropTypes, PropType } from 'vue'
import type { FormRule } from '../../form'
import type { SelectOption } from '../../select'

export type SchemaFormModel = Record<string, any>
export type SchemaFormComponent = 'input' | 'textarea' | 'select' | 'custom'

export type SchemaFormField = {
  field: string
  label: string
  component: SchemaFormComponent
  placeholder?: string
  options?: SelectOption[]
  rules?: FormRule[]
  dependencies?: string[]
  hidden?: boolean | ((model: SchemaFormModel) => boolean)
  disabled?: boolean | ((model: SchemaFormModel) => boolean)
  slot?: string
}

export const schemaFormProps = {
  modelValue: {
    type: Object as PropType<SchemaFormModel>,
    required: true,
  },
  schema: {
    type: Array as PropType<SchemaFormField[]>,
    default: () => [],
  },
  labelWidth: {
    type: String,
    default: '96px',
  },
} as const

export const schemaFormEmits = {
  'update:modelValue': (value: SchemaFormModel) => typeof value === 'object' && value !== null,
  validate: (valid: boolean) => typeof valid === 'boolean',
}

export type SchemaFormProps = ExtractPropTypes<typeof schemaFormProps>
export type SchemaFormEmits = typeof schemaFormEmits
