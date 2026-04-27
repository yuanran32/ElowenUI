import type { ExtractPropTypes, PropType } from 'vue'

export type DividerDirection = 'horizontal' | 'vertical'
export type DividerContentPosition = 'left' | 'center' | 'right'

export const dividerProps = {
  direction: {
    type: String as PropType<DividerDirection>,
    default: 'horizontal',
  },
  contentPosition: {
    type: String as PropType<DividerContentPosition>,
    default: 'center',
  },
  dashed: {
    type: Boolean,
    default: false,
  },
} as const

export type DividerProps = ExtractPropTypes<typeof dividerProps>
