import type { ExtractPropTypes, PropType } from 'vue'

export type SelectValue = string | number
export type SelectVariant = 'default' | 'filled' | 'quiet'

export type SelectOption = {
  label: string
  value: SelectValue
  disabled?: boolean
}

export const selectProps = {
  modelValue: {
    type: [String, Number] as PropType<SelectValue | undefined>,
    default: undefined,
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<SelectVariant>,
    default: 'default',
  },
} as const

export const selectEmits = {
  'update:modelValue': (value: SelectValue | undefined) =>
    value === undefined || typeof value === 'string' || typeof value === 'number',
  change: (value: SelectValue | undefined) =>
    value === undefined || typeof value === 'string' || typeof value === 'number',
  clear: () => true,
  visibleChange: (visible: boolean) => typeof visible === 'boolean',
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  blur: (event: FocusEvent) => event instanceof FocusEvent,
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectEmits = typeof selectEmits
