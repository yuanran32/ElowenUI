import { computed } from 'vue'
import type { DividerProps } from './divider'

export const useDivider = (props: DividerProps) => {
  const classes = computed(() => [
    'my-divider',
    `my-divider--${props.direction}`,
    `is-${props.contentPosition}`,
    {
      'is-dashed': props.dashed,
      'has-content': props.direction === 'horizontal',
    },
  ])

  return {
    classes,
  }
}
