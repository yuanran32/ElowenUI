<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { dialogEmits, dialogProps } from './dialog'
import { useDialog } from './use-dialog'

defineOptions({
  name: 'MyDialog',
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)
const dialogRef = ref<HTMLDivElement>()
let previousActiveElement: HTMLElement | null = null
const dialogClasses = computed(() => ['my-dialog', `is-${props.variant}`])

const { visible, dialogStyle, shouldRender, close } = useDialog(props, emit)

const focusDialog = async () => {
  await nextTick()
  dialogRef.value?.focus()
}

const getFocusableElements = () => {
  if (!dialogRef.value) {
    return []
  }

  return Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',')
    )
  ).filter((element) => !element.hasAttribute('disabled'))
}

const restoreFocus = async () => {
  await nextTick()
  previousActiveElement?.focus?.()
  previousActiveElement = null
}

const trapFocus = (event: KeyboardEvent) => {
  const focusableElements = getFocusableElements()

  if (!focusableElements.length) {
    event.preventDefault()
    dialogRef.value?.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement

  if (!dialogRef.value?.contains(activeElement)) {
    event.preventDefault()
    firstElement.focus()
    return
  }

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
    return
  }

  if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

watch(
  () => visible.value,
  (value) => {
    if (value) {
      previousActiveElement = document.activeElement as HTMLElement | null
      focusDialog()
      return
    }

    restoreFocus()
  },
  { immediate: true }
)

const handleMaskClick = () => {
  if (props.closeOnClickModal) {
    close()
  }
}

const handleClose = () => {
  close()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.stopPropagation()
    trapFocus(event)
    return
  }

  if (event.key === 'Escape' && props.closeOnPressEscape) {
    event.stopPropagation()
    close()
  }
}

const handleDocumentKeydown = (event: KeyboardEvent) => {
  if (!visible.value) {
    return
  }

  handleKeydown(event)
}

onMounted(() => {
  document.addEventListener('keydown', handleDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleDocumentKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="shouldRender"
      v-show="visible"
      class="my-dialog-overlay"
      @click="handleMaskClick"
    >
      <div
        ref="dialogRef"
        :class="dialogClasses"
        :style="dialogStyle"
        role="dialog"
        aria-modal="true"
        :aria-label="props.title || 'Dialog'"
        tabindex="-1"
        @click.stop
        @keydown="handleKeydown"
      >
        <header v-if="props.title || $slots.header || props.showClose" class="my-dialog__header">
          <div v-if="props.title || $slots.header" class="my-dialog__title">
            <slot name="header">{{ props.title }}</slot>
          </div>
          <button
            v-if="props.showClose"
            class="my-dialog__close"
            type="button"
            aria-label="close dialog"
            @click="handleClose"
          >
            ×
          </button>
        </header>

        <section class="my-dialog__body">
          <slot v-if="visible || !props.destroyOnClose" />
        </section>

        <footer v-if="$slots.footer" class="my-dialog__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.my-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--my-z-index-dialog);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--my-spacing-2xl);
  background: var(--my-color-overlay);
}

.my-dialog {
  width: min(100%, 520px);
  max-height: min(100%, 80vh);
  overflow: auto;
  border: 1px solid color-mix(in srgb, var(--my-color-text-primary) 8%, transparent);
  border-radius: var(--my-radius-2xl);
  background: var(--my-color-white);
  box-shadow: var(--my-shadow-lg);
  outline: none;
}

.my-dialog.is-soft {
  background: color-mix(in srgb, var(--my-color-fill-soft) 76%, var(--my-color-white));
}

.my-dialog.is-elevated {
  border-color: transparent;
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.24);
}

.my-dialog__header,
.my-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--my-spacing-md);
  padding: var(--my-spacing-xl) var(--my-spacing-2xl);
}

.my-dialog__header {
  border-bottom: 1px solid var(--my-color-border-lighter);
}

.my-dialog__title {
  flex: 1;
  min-width: 0;
  color: var(--my-color-text-primary);
  font-size: var(--my-font-size-title);
  font-weight: 700;
  line-height: 1.4;
}

.my-dialog__body {
  padding: var(--my-spacing-2xl);
  color: var(--my-color-text-regular);
  font-size: var(--my-font-size-base);
  line-height: 1.75;
}

.my-dialog__footer {
  justify-content: flex-end;
  border-top: 1px solid var(--my-color-border-lighter);
}

.my-dialog__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--my-color-text-secondary);
  font-size: 18px;
  cursor: pointer;
  transition:
    background var(--my-transition-duration) var(--my-transition-ease),
    color var(--my-transition-duration) var(--my-transition-ease);
}

.my-dialog__close:hover {
  background: var(--my-color-primary-light);
  color: var(--my-color-primary);
}

:global(body.my-dialog-parent--hidden) {
  overflow: hidden;
}
</style>
