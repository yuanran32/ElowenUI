import { computed } from 'vue'
import type { TagProps } from './tag'

export const useTag = (props: TagProps) => {
  const classes = computed(() => [
    'my-tag',
    `my-tag--${props.type}`,
    `my-tag--${props.size}`,
    `is-${props.effect}`,
    {
      'is-round': props.round,
      'is-closable': props.closable,
    },
  ])

  return {
    classes,
  }
}
