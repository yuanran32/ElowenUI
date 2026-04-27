import type { ExtractPropTypes, PropType } from 'vue'

export type InputSize = 'small' | 'default' | 'large'
export type InputVariant = 'default' | 'filled' | 'quiet'

export const inputProps = {
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'default',
  },
  variant: {
    type: String as PropType<InputVariant>,
    default: 'default',
  },
} as const

export const inputEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string',
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  blur: (event: FocusEvent) => event instanceof FocusEvent,
  clear: () => true,
}

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmits = typeof inputEmits
