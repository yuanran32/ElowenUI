import { computed } from 'vue'
import type { InputProps } from './input'

export const useInput = (props: InputProps) => {
  const classes = computed(() => [
    'my-input',
    `my-input--${props.size}`,
    `is-${props.variant}`,
    {
      'is-disabled': props.disabled,
    },
  ])

  const showClear = computed(
    () => props.clearable && !props.disabled && props.modelValue.length > 0
  )

  return {
    classes,
    showClear,
  }
}
