<script setup lang="ts">
import { cardProps } from './card'
import { useCard } from './use-card'

defineOptions({
  name: 'MyCard',
})

const props = defineProps(cardProps)
const { classes, hasHeader } = useCard(props)
</script>

<template>
  <div :class="classes">
    <div v-if="hasHeader || $slots.header" class="my-card__header">
      <slot name="header">{{ props.header }}</slot>
    </div>
    <div class="my-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="my-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.my-card {
  overflow: hidden;
  border: 1px solid var(--my-color-border-lighter);
  border-radius: var(--my-radius-xl);
  background: var(--my-color-white);
  transition:
    box-shadow var(--my-transition-duration) var(--my-transition-ease),
    transform var(--my-transition-duration) var(--my-transition-ease);
}

.my-card.is-soft {
  background: color-mix(in srgb, var(--my-color-fill-soft) 82%, var(--my-color-white));
}

.my-card.is-outline {
  box-shadow: none;
}

.my-card.is-elevated {
  border-color: transparent;
  box-shadow: var(--my-shadow-lg);
}

.my-card.is-shadow-always {
  box-shadow: var(--my-shadow-md);
}

.my-card.is-shadow-hover:hover {
  box-shadow: var(--my-shadow-md);
  transform: translateY(-2px);
}

.my-card__header,
.my-card__footer {
  padding: 18px 20px;
  background: var(--my-color-fill-soft);
}

.my-card__header {
  border-bottom: 1px solid var(--my-color-border-lighter);
  font-size: 16px;
  font-weight: 700;
  color: var(--my-color-text-primary);
}

.my-card__body {
  padding: 20px;
  color: var(--my-color-text-regular);
  line-height: 1.7;
}

.my-card__footer {
  border-top: 1px solid var(--my-color-border-lighter);
}
</style>
