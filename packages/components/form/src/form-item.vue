<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import { formItemProps } from './form-item'
import { cloneFieldValue, getValueByPath, setValueByPath } from './path'
import { formContextKey, type FormRule, type FormTrigger } from './types'

defineOptions({
  name: 'MyFormItem',
})

const props = defineProps(formItemProps)
const slots = useSlots()
const form = inject(formContextKey, null)
const itemRef = ref<HTMLDivElement>()
const errorMessage = ref('')
const validating = ref(false)
const hasValidated = ref(false)
const initialValue = props.prop
  ? cloneFieldValue(getValueByPath(form?.model ?? {}, props.prop))
  : undefined
let validationSequence = 0

const rules = computed(() => {
  if (!props.prop || !form) {
    return [] as FormRule[]
  }

  return form.rules[props.prop] ?? []
})

const isRequired = computed(() => props.required || rules.value.some((rule) => rule.required))

const fieldValue = computed(() => {
  if (!props.prop || !form) {
    return undefined
  }

  return getValueByPath(form.model, props.prop)
})

const dependencyValues = computed(() =>
  props.dependencies.map((dependency) => getValueByPath(form?.model ?? {}, dependency))
)

const getRulesByTrigger = (trigger?: FormTrigger) => {
  if (!trigger) {
    return rules.value
  }

  return rules.value.filter((rule) => {
    if (!rule.trigger) {
      return true
    }

    return Array.isArray(rule.trigger)
      ? rule.trigger.includes(trigger)
      : rule.trigger === trigger
  })
}

const getFallbackMessage = (rule: FormRule) => {
  if (rule.required) {
    return props.label ? `请输入${props.label}` : '该字段不能为空'
  }

  if (typeof rule.min === 'number') {
    return `${props.label || '字段'}长度不能小于 ${rule.min}`
  }

  if (typeof rule.max === 'number') {
    return `${props.label || '字段'}长度不能大于 ${rule.max}`
  }

  return `${props.label || '字段'}校验失败`
}

const validate = async (trigger?: FormTrigger) => {
  const currentSequence = ++validationSequence
  const activeRules = getRulesByTrigger(trigger)
  const value = fieldValue.value

  hasValidated.value = true
  validating.value = activeRules.length > 0

  for (const rule of activeRules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      errorMessage.value = rule.message || getFallbackMessage(rule)
      validating.value = false
      return errorMessage.value
    }

    if (typeof value === 'string' || Array.isArray(value)) {
      if (typeof rule.min === 'number' && value.length < rule.min) {
        errorMessage.value = rule.message || getFallbackMessage(rule)
        validating.value = false
        return errorMessage.value
      }

      if (typeof rule.max === 'number' && value.length > rule.max) {
        errorMessage.value = rule.message || getFallbackMessage(rule)
        validating.value = false
        return errorMessage.value
      }
    }

    if (rule.validator) {
      const result = await rule.validator(value, form?.model ?? {})

      if (currentSequence !== validationSequence) {
        return errorMessage.value
      }

      if (result !== true) {
        errorMessage.value =
          typeof result === 'string' ? result : rule.message || getFallbackMessage(rule)
        validating.value = false
        return errorMessage.value
      }
    }
  }

  if (currentSequence !== validationSequence) {
    return errorMessage.value
  }

  errorMessage.value = ''
  validating.value = false
  return ''
}

const resetField = () => {
  if (props.prop && form) {
    validationSequence += 1
    setValueByPath(form.model, props.prop, cloneFieldValue(initialValue))
  }

  errorMessage.value = ''
  validating.value = false
  hasValidated.value = false
}

const setError = (message: string) => {
  validationSequence += 1
  errorMessage.value = message
  validating.value = false
  hasValidated.value = true
}

const clearError = () => {
  validationSequence += 1
  errorMessage.value = ''
  validating.value = false
}

const getState = () => ({
  error: errorMessage.value,
  validating: validating.value,
})

watch(
  dependencyValues,
  () => {
    if ((hasValidated.value || errorMessage.value) && props.dependencies.length) {
      validate('change')
    }
  },
  { deep: true }
)

onMounted(() => {
  if (props.prop && form) {
    form.registerItem({
      prop: props.prop,
      validate,
      resetField,
      setError,
      clearError,
      el: itemRef.value,
      getState,
    })
  }
})

onBeforeUnmount(() => {
  if (props.prop && form) {
    form.unregisterItem(props.prop)
  }
})
</script>

<template>
  <div
    ref="itemRef"
    class="my-form-item"
    :class="{ 'is-error': errorMessage, 'is-validating': validating }"
  >
    <label v-if="props.label" class="my-form-item__label">
      <span v-if="isRequired" class="my-form-item__asterisk">*</span>
      {{ props.label }}
    </label>
    <div class="my-form-item__content">
      <slot
        :validate="validate"
        :error="errorMessage"
        :validating="validating"
        :set-error="setError"
        :clear-error="clearError"
        :model-value="fieldValue"
      />
      <div v-if="errorMessage" class="my-form-item__error">{{ errorMessage }}</div>
      <div v-else-if="validating" class="my-form-item__extra">Validating...</div>
      <div v-else-if="slots.extra" class="my-form-item__extra">
        <slot name="extra" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-form-item {
  display: grid;
  grid-template-columns: var(--my-form-label-width, 96px) minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

.my-form-item__label {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  min-height: 40px;
  color: #303133;
  font-size: 14px;
}

.my-form-item.is-validating .my-form-item__label {
  color: var(--my-color-primary, #409eff);
}

.my-form-item__asterisk {
  color: #f56c6c;
}

.my-form-item__content {
  display: grid;
  gap: 6px;
}

.my-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1.5;
}

.my-form-item__extra {
  color: #909399;
  font-size: 12px;
  line-height: 1.5;
}
</style>
