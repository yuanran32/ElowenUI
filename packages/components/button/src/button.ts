import type { ExtractPropTypes, PropType } from 'vue'

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'default' | 'large'
export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost'

export const buttonProps = {
  type: {                                                                                 
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default',
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'solid',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
} as const

export const buttonEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
