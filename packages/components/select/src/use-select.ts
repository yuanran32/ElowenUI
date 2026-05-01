import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import type { SelectOption, SelectProps, SelectValue } from './select'

let selectSeed = 0

export const useSelect = (props: SelectProps, emit: any, rootRef: Ref<HTMLElement | undefined>) => {
  const visible = ref(false)
  const hoveredIndex = ref(-1)
  const triggerRef = ref<HTMLButtonElement>()
  const dropdownId = `my-select-dropdown-${++selectSeed}`
  const optionIdPrefix = `${dropdownId}-option`

  const selectedIndex = computed(() =>
    props.options.findIndex((option) => option.value === props.modelValue)
  )

  const selectedOption = computed(() => props.options[selectedIndex.value])
  const hasValue = computed(() => selectedIndex.value >= 0)
  const showClear = computed(() => props.clearable && !props.disabled && hasValue.value)

  const setHoveredIndex = (index: number) => {
    hoveredIndex.value = index
  }

  const syncHoveredIndex = () => {
    hoveredIndex.value = selectedIndex.value
  }

  const open = () => {
    if (props.disabled || visible.value) {
      return
    }

    visible.value = true
    syncHoveredIndex()
    emit('visibleChange', true)
  }

  const close = () => {
    if (!visible.value) {
      return
    }

    visible.value = false
    emit('visibleChange', false)
  }

  const toggle = () => {
    if (visible.value) {
      close()
      return
    }

    open()
  }

  const selectOption = (option: SelectOption) => {
    if (props.disabled || option.disabled) {
      return
    }

    emit('update:modelValue', option.value)
    emit('change', option.value)
    close()
  }

  const clear = () => {
    if (!showClear.value) {
      return
    }

    emit('update:modelValue', undefined)
    emit('change', undefined)
    emit('clear')
    close()
    triggerRef.value?.focus()
  }

  const moveHovered = (step: number) => {
    const enabledIndexes = props.options
      .map((option, index) => (option.disabled ? -1 : index))
      .filter((index) => index >= 0)

    if (!enabledIndexes.length) {
      return
    }

    const currentPosition = enabledIndexes.indexOf(hoveredIndex.value)
    const nextPosition = currentPosition === -1
      ? step > 0
        ? 0
        : enabledIndexes.length - 1
      : (currentPosition + step + enabledIndexes.length) % enabledIndexes.length

    hoveredIndex.value = enabledIndexes[nextPosition]
  }

  const moveToEdge = (edge: 'first' | 'last') => {
    const enabledIndexes = props.options
      .map((option, index) => (option.disabled ? -1 : index))
      .filter((index) => index >= 0)

    if (!enabledIndexes.length) {
      return
    }

    hoveredIndex.value = edge === 'first'
      ? enabledIndexes[0]
      : enabledIndexes[enabledIndexes.length - 1]
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (props.disabled) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!visible.value) {
        open()
      }
      moveHovered(1)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!visible.value) {
        open()
      }
      moveHovered(-1)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (!visible.value) {
        open()
        return
      }

      const option = props.options[hoveredIndex.value]
      if (option) {
        selectOption(option)
      }
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      triggerRef.value?.blur()
      return
    }

    if (event.key === 'Tab') {
      close()
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      if (!visible.value) {
        open()
      }
      moveToEdge('first')
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      if (!visible.value) {
        open()
      }
      moveToEdge('last')
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null
    if (!target || !rootRef.value) {
      return
    }

    if (!rootRef.value.contains(target)) {
      close()
    }
  }

  const handleFocus = (event: FocusEvent) => {
    emit('focus', event)
  }

  const handleBlur = (event: FocusEvent) => {
    const nextTarget = event.relatedTarget as Node | null
    if (!nextTarget || !rootRef.value?.contains(nextTarget)) {
      close()
      emit('blur', event)
    }
  }

  watch(
    () => props.modelValue,
    () => {
      syncHoveredIndex()
    },
    { immediate: true }
  )

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    visible,
    hoveredIndex,
    triggerRef,
    dropdownId,
    optionIdPrefix,
    selectedOption,
    showClear,
    toggle,
    open,
    close,
    clear,
    selectOption,
    setHoveredIndex,
    handleKeydown,
    handleFocus,
    handleBlur,
  }
}
