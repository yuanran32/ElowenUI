<script setup lang="ts">
import { buttonEmits, buttonProps } from './button'
import { useButton } from './use-button'

defineOptions({
  name: 'MyButton',
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const { classes, isDisabled } = useButton(props)

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button :class="classes" :disabled="isDisabled" @click="(event) => handleClick(event)">
    <span v-if="props.loading" class="my-button__spinner" />
    <span class="my-button__content">
      <slot>Button</slot>
    </span>
  </button>
</template>

<style scoped>
.my-button {
  --my-button-color: var(--my-color-text-primary);
  --my-button-bg: var(--my-color-white);
  --my-button-border: var(--my-color-border);
  --my-button-shadow: var(--my-shadow-sm);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--my-spacing-sm);
  min-width: 96px;
  border: 1px solid var(--my-button-border);
  border-radius: var(--my-radius-base);
  padding: 10px 18px;
  background: var(--my-button-bg);
  color: var(--my-button-color);
  font-size: var(--my-font-size-base);
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition:
    all var(--my-transition-duration) var(--my-transition-ease),
    box-shadow var(--my-transition-duration) var(--my-transition-ease),
    transform var(--my-transition-duration) var(--my-transition-ease);
}

.my-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--my-button-shadow);
}

.my-button:active {
  transform: translateY(0);
}

.my-button--small {
  min-width: 82px;
  padding: 8px 14px;
  font-size: var(--my-font-size-small);
}

.my-button--large {
  min-width: 110px;
  padding: 12px 22px;
  font-size: var(--my-font-size-large);
}

.my-button--primary {
  --my-button-border: var(--my-color-primary);
  --my-button-color: var(--my-color-primary);
  --my-button-shadow: 0 10px 24px rgba(64, 158, 255, 0.2);
}

.my-button--success {
  --my-button-border: var(--my-color-success);
  --my-button-color: var(--my-color-success);
  --my-button-shadow: 0 10px 24px rgba(103, 194, 58, 0.18);
}

.my-button--warning {
  --my-button-border: var(--my-color-warning);
  --my-button-color: var(--my-color-warning);
  --my-button-shadow: 0 10px 24px rgba(230, 162, 60, 0.18);
}

.my-button--danger {
  --my-button-border: var(--my-color-danger);
  --my-button-color: var(--my-color-danger);
  --my-button-shadow: 0 10px 24px rgba(245, 108, 108, 0.18);
}

.my-button.is-solid {
  --my-button-color: var(--my-color-text-primary);
}

.my-button--primary.is-solid {
  --my-button-bg: var(--my-color-primary);
  --my-button-color: #ffffff;
}

.my-button--success.is-solid {
  --my-button-bg: var(--my-color-success);
  --my-button-color: #ffffff;
}

.my-button--warning.is-solid {
  --my-button-bg: var(--my-color-warning);
  --my-button-color: #ffffff;
}

.my-button--danger.is-solid {
  --my-button-bg: var(--my-color-danger);
  --my-button-color: #ffffff;
}

.my-button.is-soft {
  border-color: transparent;
}

.my-button--default.is-soft {
  --my-button-bg: var(--my-color-fill-light);
}

.my-button--primary.is-soft {
  --my-button-bg: var(--my-color-primary-light);
}

.my-button--success.is-soft {
  --my-button-bg: var(--my-color-success-light);
}

.my-button--warning.is-soft {
  --my-button-bg: var(--my-color-warning-light);
}

.my-button--danger.is-soft {
  --my-button-bg: var(--my-color-danger-light);
}

.my-button.is-outline {
  --my-button-bg: var(--my-color-white);
}

.my-button.is-ghost {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.my-button.is-ghost:hover {
  background: var(--my-color-fill-light);
}

.my-button.is-round {
  border-radius: var(--my-radius-round);
}

.my-button.is-loading,
.my-button.is-disabled,
.my-button:disabled {
  opacity: 0.72;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.my-button__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: my-button-rotate 0.75s linear infinite;
}

.my-button__content {
  display: inline-flex;
  align-items: center;
}

@keyframes my-button-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
