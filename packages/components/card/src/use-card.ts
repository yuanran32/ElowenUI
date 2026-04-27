import { computed } from 'vue'
import type { CardProps } from './card'

export const useCard = (props: CardProps) => {
  const classes = computed(() => [
    'my-card',
    `is-${props.variant}`,
    {
      'is-shadow-always': props.shadow === 'always',
      'is-shadow-hover': props.shadow === 'hover',
      'is-shadow-never': props.shadow === 'never',
    },
  ])

  const hasHeader = computed(() => Boolean(props.header))

  return {
    classes,
    hasHeader,
  }
}
