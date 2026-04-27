import type { ExtractPropTypes, PropType } from 'vue'

export type AlertType = 'info' | 'success' | 'warning' | 'error'
export type AlertVariant = 'soft' | 'outline' | 'solid'

export const alertProps = {
  type: {
    type: String as PropType<AlertType>,
    default: 'info',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  variant: {
    type: String as PropType<AlertVariant>,
    default: 'soft',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
} as const

export const alertEmits = {
  close: (event: MouseEvent) => event instanceof MouseEvent,
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
