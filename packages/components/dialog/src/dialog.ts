import type { ExtractPropTypes, PropType } from 'vue'

export type DialogWidth = string | number
export type DialogVariant = 'default' | 'soft' | 'elevated'
export type DialogEmit = {
  (event: 'update:modelValue', value: boolean): void
  (event: 'open'): void
  (event: 'close'): void
  (event: 'opened'): void
  (event: 'closed'): void
}

export const dialogProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number] as PropType<DialogWidth>,
    default: '520px',
  },
  variant: {
    type: String as PropType<DialogVariant>,
    default: 'default',
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
} as const

export const dialogEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  open: () => true,
  close: () => true,
  opened: () => true,
  closed: () => true,
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogEmits = typeof dialogEmits
