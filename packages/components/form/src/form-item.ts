import type { ExtractPropTypes, PropType } from 'vue'

export const formItemProps = {
  label: {
    type: String,
    default: '',
  },
  prop: {
    type: String,
    default: '',
  },
  dependencies: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
