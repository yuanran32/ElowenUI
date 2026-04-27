<script setup lang="ts">
import { computed, provide, reactive } from 'vue'
import { formEmits, formProps } from './form'
import {
  formContextKey,
  type FormFieldState,
  type FormItemContext,
  type FormTrigger,
  type ValidateResult,
} from './types'

defineOptions({
  name: 'MyForm',
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const items = reactive(new Map<string, FormItemContext>())

const registerItem = (item: FormItemContext) => {
  items.set(item.prop, item)
}

const unregisterItem = (prop: string) => {
  items.delete(prop)
}

const validateField = async (prop: string, trigger?: FormTrigger) => {
  const item = items.get(prop)
  if (!item) {
    return ''
  }

  return item.validate(trigger)
}

const clearValidate = (props?: string | string[]) => {
  if (!props) {
    items.forEach((item) => item.clearError())
    return
  }

  const keys = Array.isArray(props) ? props : [props]
  keys.forEach((prop) => items.get(prop)?.clearError())
}

const setFieldError = (prop: string, message: string) => {
  items.get(prop)?.setError(message)
}

const getFieldState = (prop: string): FormFieldState => {
  const item = items.get(prop)

  if (!item) {
    return {
      error: '',
      validating: false,
    }
  }

  return item.getState()
}

const scrollToField = (prop: string) => {
  const target = items.get(prop)?.el
  target?.scrollIntoView?.({
    behavior: props.scrollBehavior,
    block: 'center',
  })
}

provide(formContextKey, {
  model: props.model,
  rules: props.rules,
  registerItem,
  unregisterItem,
  validateField,
})

const formStyle = computed(() => ({
  '--my-form-label-width': props.labelWidth,
}))

const validate = async (): Promise<boolean> => {
  const entries = await Promise.all(
    Array.from(items.values()).map(async (item) => [item.prop, await item.validate()] as const)
  )

  const errors = Object.fromEntries(entries.filter(([, message]) => message))
  const result: ValidateResult = {
    valid: Object.keys(errors).length === 0,
    errors,
  }

  emit('validate', result)

  if (!result.valid && props.scrollToError) {
    const firstErrorProp = Object.keys(errors)[0]
    if (firstErrorProp) {
      scrollToField(firstErrorProp)
    }
  }

  return result.valid
}

const resetFields = () => {
  items.forEach((item) => item.resetField())
}

defineExpose({
  validate,
  resetFields,
  validateField,
  clearValidate,
  setFieldError,
  getFieldState,
  scrollToField,
})
</script>

<template>
  <form class="my-form" :style="formStyle" @submit.prevent>
    <slot />
  </form>
</template>

<style scoped>
.my-form {
  display: grid;
  gap: 18px;
}
</style>
