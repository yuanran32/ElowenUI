import type { ExtractPropTypes, PropType } from 'vue'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type TagSize = 'small' | 'default' | 'large'
export type TagEffect = 'light' | 'solid' | 'outline'

export const tagProps = {
  type: {
    type: String as PropType<TagType>,
    default: 'default',
  },
  size: {
    type: String as PropType<TagSize>,
    default: 'default',
  },
  effect: {
    type: String as PropType<TagEffect>,
    default: 'light',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
} as const

export const tagEmits = {
  close: (event: MouseEvent) => event instanceof MouseEvent,
}

export type TagProps = ExtractPropTypes<typeof tagProps>
