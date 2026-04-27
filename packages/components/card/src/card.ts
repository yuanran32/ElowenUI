import type { ExtractPropTypes } from 'vue'
import type { PropType } from 'vue'

export type CardVariant = 'default' | 'soft' | 'outline' | 'elevated'

export const cardProps = {
  header: {
    type: String,
    default: '',
  },
  shadow: {
    type: String as () => 'always' | 'hover' | 'never',
    default: 'always',
  },
  variant: {
    type: String as PropType<CardVariant>,
    default: 'default',
  },
} as const

export type CardProps = ExtractPropTypes<typeof cardProps>
