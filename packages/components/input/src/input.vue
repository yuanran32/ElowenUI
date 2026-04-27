<script setup lang="ts">
import { inputEmits, inputProps } from './input'
import { useInput } from './use-input'

defineOptions({
  name: 'MyInput',
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const { classes, showClear } = useInput(props)

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('input', '')
  emit('change', '')
  emit('clear')
}
</script>

<template>
  <div class="my-input-wrapper">
    <input
      :class="classes"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="(event) => handleInput(event)"
      @change="(event) => handleChange(event)"
      @focus="(event) => handleFocus(event)"
      @blur="(event) => handleBlur(event)"
    />
    <button
      v-if="showClear"
      class="my-input__clear"
      type="button"
      aria-label="clear input"
      @click="handleClear"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.my-input-wrapper {
  position: relative;
  width: 100%;
}

.my-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--my-color-border);
  border-radius: var(--my-radius-base);
  padding: 10px 36px 10px 12px;
  background: var(--my-color-white);
  font-size: var(--my-font-size-base);
  color: var(--my-color-text-primary);
  outline: none;
  transition:
    border-color var(--my-transition-duration) var(--my-transition-ease),
    box-shadow var(--my-transition-duration) var(--my-transition-ease);
}

.my-input:focus {
  border-color: var(--my-color-primary);
  box-shadow: 0 0 0 3px var(--my-color-primary-light);
}

.my-input.is-filled {
  border-color: transparent;
  background: var(--my-color-fill-light);
}

.my-input.is-filled:focus {
  border-color: transparent;
}

.my-input.is-quiet {
  border-width: 0 0 1px;
  border-radius: 0;
  padding-left: 0;
  padding-right: 28px;
  background: transparent;
}

.my-input.is-quiet:focus {
  box-shadow: 0 2px 0 0 var(--my-color-primary);
}

.my-input--small {
  min-height: 32px;
  padding-top: 7px;
  padding-bottom: 7px;
  font-size: var(--my-font-size-small);
}

.my-input--default {
  min-height: 40px;
}

.my-input--large {
  min-height: 46px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: var(--my-font-size-large);
}

.my-input.is-disabled,
.my-input:disabled {
  background: var(--my-color-fill-light);
  color: var(--my-color-text-placeholder);
  cursor: not-allowed;
}

.my-input__clear {
  position: absolute;
  top: 50%;
  right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: var(--my-color-primary-light);
  color: var(--my-color-primary);
  font-size: var(--my-font-size-base);
  line-height: 1;
  cursor: pointer;
  transform: translateY(-50%);
  transition: all var(--my-transition-duration) var(--my-transition-ease);
}

.my-input__clear:hover {
  background: var(--my-color-primary);
  color: #ffffff;
}
</style>
