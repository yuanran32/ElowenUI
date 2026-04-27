import { computed } from 'vue'
import type { ButtonProps } from './button'

export const useButton = (props: ButtonProps) => {
  const isDisabled = computed(() => props.disabled || props.loading)
  const resolvedVariant = computed(() => (props.plain ? 'outline' : props.variant))

  const classes = computed(() => [
    'my-button',
    `my-button--${props.type}`,
    `my-button--${props.size}`,
    `is-${resolvedVariant.value}`,
    {
      'is-disabled': isDisabled.value,
      'is-round': props.round,
      'is-loading': props.loading,
    },
  ])

  return {
    classes,
    isDisabled,
    resolvedVariant,
  }
}
