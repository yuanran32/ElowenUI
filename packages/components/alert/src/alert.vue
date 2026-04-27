<script setup lang="ts">
import { alertEmits, alertProps } from './alert'
import { useAlert } from './use-alert'

defineOptions({
  name: 'MyAlert',
})

const props = defineProps(alertProps)
const emit = defineEmits(alertEmits)

const { classes, hasTitle, hasDescription } = useAlert(props)

const handleClose = (event: MouseEvent) => {
  emit('close', event)
}
</script>

<template>
  <div :class="classes" role="alert">
    <div class="my-alert__content">
      <div v-if="hasTitle || $slots.title" class="my-alert__title">
        <slot name="title">{{ props.title }}</slot>
      </div>
      <div v-if="hasDescription || $slots.default" class="my-alert__description">
        <slot>{{ props.description }}</slot>
      </div>
    </div>
    <button
      v-if="props.closable"
      class="my-alert__close"
      type="button"
      aria-label="close alert"
      @click="handleClose"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.my-alert {
  --my-alert-color: var(--my-color-primary);
  --my-alert-bg: var(--my-color-primary-light);
  --my-alert-border: var(--my-color-primary-border);

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--my-spacing-md);
  border: 1px solid var(--my-alert-border);
  border-radius: var(--my-radius-large);
  padding: 14px 16px;
  background: var(--my-alert-bg);
  color: var(--my-alert-color);
}

.my-alert--info {
  --my-alert-color: var(--my-color-primary);
  --my-alert-bg: var(--my-color-primary-light);
  --my-alert-border: var(--my-color-primary-border);
}

.my-alert--success {
  --my-alert-color: var(--my-color-success);
  --my-alert-bg: var(--my-color-success-light);
  --my-alert-border: var(--my-color-success-border);
}

.my-alert--warning {
  --my-alert-color: var(--my-color-warning);
  --my-alert-bg: var(--my-color-warning-light);
  --my-alert-border: var(--my-color-warning-border);
}

.my-alert--error {
  --my-alert-color: var(--my-color-danger);
  --my-alert-bg: var(--my-color-danger-light);
  --my-alert-border: var(--my-color-danger-border);
}

.my-alert.is-outline {
  background: transparent;
}

.my-alert.is-solid {
  color: #ffffff;
}

.my-alert--info.is-solid {
  --my-alert-bg: var(--my-color-primary);
  --my-alert-border: var(--my-color-primary);
}

.my-alert--success.is-solid {
  --my-alert-bg: var(--my-color-success);
  --my-alert-border: var(--my-color-success);
}

.my-alert--warning.is-solid {
  --my-alert-bg: var(--my-color-warning);
  --my-alert-border: var(--my-color-warning);
}

.my-alert--error.is-solid {
  --my-alert-bg: var(--my-color-danger);
  --my-alert-border: var(--my-color-danger);
}

.my-alert.is-center {
  text-align: center;
}

.my-alert__content {
  flex: 1;
  min-width: 0;
}

.my-alert__title {
  font-size: var(--my-font-size-large);
  font-weight: 700;
  line-height: 1.4;
}

.my-alert__description {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--my-color-text-regular);
}

.my-alert.is-solid .my-alert__description {
  color: rgba(255, 255, 255, 0.82);
}

.my-alert__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: currentColor;
  cursor: pointer;
  opacity: 0.75;
  transition: all var(--my-transition-duration) var(--my-transition-ease);
}

.my-alert__close:hover {
  background: var(--my-color-hover-mask);
  opacity: 1;
}
</style>
