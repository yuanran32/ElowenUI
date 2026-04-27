<script setup lang="ts">
import { tagEmits, tagProps } from './tag'
import { useTag } from './use-tag'

defineOptions({
  name: 'MyTag',
})

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const { classes } = useTag(props)

const handleClose = (event: MouseEvent) => {
  emit('close', event)
}
</script>

<template>
  <span :class="classes">
    <span class="my-tag__content">
      <slot>Tag</slot>
    </span>
    <button v-if="props.closable" class="my-tag__close" type="button" @click="handleClose">
      ×
    </button>
  </span>
</template>

<style scoped>
.my-tag {
  --my-tag-color: var(--my-color-text-regular);
  --my-tag-bg: var(--my-color-fill-light);
  --my-tag-border: var(--my-color-border-light);

  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--my-tag-border);
  border-radius: var(--my-radius-base);
  padding: 6px 10px;
  background: var(--my-tag-bg);
  color: var(--my-tag-color);
  font-size: var(--my-font-size-small);
  line-height: 1;
}

.my-tag--small {
  padding: 4px 8px;
  font-size: 11px;
}

.my-tag--large {
  padding: 8px 12px;
  font-size: 13px;
}

.my-tag.is-round {
  border-radius: var(--my-radius-round);
}

.my-tag--primary {
  --my-tag-color: var(--my-color-primary);
  --my-tag-bg: var(--my-color-primary-light);
  --my-tag-border: var(--my-color-primary-border);
}

.my-tag--success {
  --my-tag-color: var(--my-color-success);
  --my-tag-bg: var(--my-color-success-light);
  --my-tag-border: var(--my-color-success-border);
}

.my-tag--warning {
  --my-tag-color: var(--my-color-warning);
  --my-tag-bg: var(--my-color-warning-light);
  --my-tag-border: var(--my-color-warning-border);
}

.my-tag--danger {
  --my-tag-color: var(--my-color-danger);
  --my-tag-bg: var(--my-color-danger-light);
  --my-tag-border: var(--my-color-danger-border);
}

.my-tag.is-solid {
  color: #ffffff;
}

.my-tag--primary.is-solid {
  --my-tag-bg: var(--my-color-primary);
  --my-tag-border: var(--my-color-primary);
}

.my-tag--success.is-solid {
  --my-tag-bg: var(--my-color-success);
  --my-tag-border: var(--my-color-success);
}

.my-tag--warning.is-solid {
  --my-tag-bg: var(--my-color-warning);
  --my-tag-border: var(--my-color-warning);
}

.my-tag--danger.is-solid {
  --my-tag-bg: var(--my-color-danger);
  --my-tag-border: var(--my-color-danger);
}

.my-tag.is-outline {
  background: transparent;
}

.my-tag--default.is-outline {
  --my-tag-color: var(--my-color-text-regular);
  --my-tag-border: var(--my-color-border);
}

.my-tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: currentColor;
  cursor: pointer;
  opacity: 0.75;
  line-height: 1;
}

.my-tag__close:hover {
  background: var(--my-color-hover-mask);
  opacity: 1;
}
</style>
