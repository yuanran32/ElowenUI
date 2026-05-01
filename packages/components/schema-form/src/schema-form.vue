<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { MyForm, MyFormItem } from '../../form'
import { MyInput } from '../../input'
import { MySelect } from '../../select'
import { schemaFormEmits, schemaFormProps, type SchemaFormModel } from './schema-form'
import { useSchemaForm } from './use-schema-form'

defineOptions({
  name: 'MySchemaForm',
})

const props = defineProps(schemaFormProps)
const emit = defineEmits(schemaFormEmits)
const formRef = ref<InstanceType<typeof MyForm>>()
const innerModel = reactive<SchemaFormModel>({})

const syncInnerModel = (value: SchemaFormModel) => {
  Object.keys(innerModel).forEach((key) => {
    delete innerModel[key]
  })
  Object.assign(innerModel, value)
}

watch(
  () => props.modelValue,
  (value) => {
    syncInnerModel(value)
  },
  { immediate: true, deep: true }
)

const { visibleSchema, rules, isFieldDisabled } = useSchemaForm(props, innerModel)

const updateField = (field: string, value: unknown) => {
  innerModel[field] = value
  emit('update:modelValue', { ...innerModel })
}

const validate = async () => {
  const valid = Boolean(await formRef.value?.validate?.())
  emit('validate', valid)
  return valid
}

const resetFields = () => {
  formRef.value?.resetFields?.()
  emit('update:modelValue', { ...innerModel })
}

const getFieldsValue = () => ({
  ...innerModel,
})

const setFieldsValue = (values: Partial<SchemaFormModel>) => {
  Object.assign(innerModel, values)
  emit('update:modelValue', { ...innerModel })
}

defineExpose({
  validate,
  resetFields,
  getFieldsValue,
  setFieldsValue,
})
</script>

<template>
  <MyForm ref="formRef" :model="innerModel" :rules="rules" :label-width="props.labelWidth">
    <MyFormItem
      v-for="field in visibleSchema"
      :key="field.field"
      :label="field.label"
      :prop="field.field"
    >
      <template #default="{ validate: validateField }">
        <MyInput
          v-if="field.component === 'input'"
          :model-value="innerModel[field.field] ?? ''"
          :placeholder="field.placeholder"
          :disabled="isFieldDisabled(field)"
          clearable
          @update:model-value="(value) => updateField(field.field, value)"
          @blur="() => validateField('blur')"
          @change="() => validateField('change')"
        />

        <textarea
          v-else-if="field.component === 'textarea'"
          class="my-schema-form__textarea"
          :value="innerModel[field.field] ?? ''"
          :placeholder="field.placeholder"
          :disabled="isFieldDisabled(field)"
          @input="(event) => updateField(field.field, (event.target as HTMLTextAreaElement).value)"
          @blur="() => validateField('blur')"
          @change="() => validateField('change')"
        />

        <MySelect
          v-else-if="field.component === 'select'"
          :model-value="innerModel[field.field]"
          :options="field.options ?? []"
          :placeholder="field.placeholder"
          :disabled="isFieldDisabled(field)"
          clearable
          @update:model-value="(value) => updateField(field.field, value)"
          @change="() => validateField('change')"
          @blur="() => validateField('blur')"
        />

        <slot
          v-else-if="field.component === 'custom'"
          :name="field.slot || field.field"
          :field="field"
          :model="innerModel"
          :update-field="updateField"
          :validate="validateField"
        />
      </template>
    </MyFormItem>
  </MyForm>
</template>

<style scoped>
.my-schema-form__textarea {
  width: 100%;
  min-height: 88px;
  box-sizing: border-box;
  border: 1px solid var(--my-color-border);
  border-radius: var(--my-radius-base);
  padding: 10px 12px;
  background: var(--my-color-white);
  color: var(--my-color-text-primary);
  font: inherit;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  transition:
    border-color var(--my-transition-duration) var(--my-transition-ease),
    box-shadow var(--my-transition-duration) var(--my-transition-ease);
}

.my-schema-form__textarea:focus {
  border-color: var(--my-color-primary);
  box-shadow: 0 0 0 3px var(--my-color-primary-light);
}

.my-schema-form__textarea:disabled {
  background: var(--my-color-fill-light);
  color: var(--my-color-text-placeholder);
  cursor: not-allowed;
}
</style>
