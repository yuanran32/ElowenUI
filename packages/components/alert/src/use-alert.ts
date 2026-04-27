import { computed } from 'vue'
import type { AlertProps } from './alert'

export const useAlert = (props: AlertProps) => {
  const classes = computed(() => [
    'my-alert',
    `my-alert--${props.type}`,
    `is-${props.variant}`,
    {
      'is-center': props.center,
    },
  ])

  const hasTitle = computed(() => Boolean(props.title))
  const hasDescription = computed(() => Boolean(props.description))

  return {
    classes,
    hasTitle,
    hasDescription,
  }
}
