import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { DialogEmit, DialogProps } from './dialog'

const BODY_SCROLL_LOCK_CLASS = 'my-dialog-parent--hidden'

export const useDialog = (props: DialogProps, emit: DialogEmit) => {
  const visible = ref(props.modelValue)

  const lockBodyScroll = () => {
    if (typeof document === 'undefined') {
      return
    }

    document.body.classList.add(BODY_SCROLL_LOCK_CLASS)
  }

  const unlockBodyScroll = () => {
    if (typeof document === 'undefined') {
      return
    }

    document.body.classList.remove(BODY_SCROLL_LOCK_CLASS)
  }

  const open = () => {
    visible.value = true
    lockBodyScroll()
    emit('open')
    emit('opened')
  }

  const close = () => {
    visible.value = false
    unlockBodyScroll()
    emit('update:modelValue', false)
    emit('close')
    emit('closed')
  }

  watch(
    () => props.modelValue,
    (value) => {
      if (value === visible.value) {
        return
      }

      if (value) {
        open()
        return
      }

      visible.value = false
      unlockBodyScroll()
    },
    { immediate: true }
  )

  onMounted(() => {
    if (props.modelValue) {
      lockBodyScroll()
    }
  })

  onBeforeUnmount(() => {
    unlockBodyScroll()
  })

  const dialogStyle = computed(() => {
    const width = typeof props.width === 'number' ? `${props.width}px` : props.width
    return { width }
  })

  const shouldRender = computed(() => props.modelValue || visible.value || !props.destroyOnClose)

  return {
    visible,
    dialogStyle,
    shouldRender,
    close,
  }
}
