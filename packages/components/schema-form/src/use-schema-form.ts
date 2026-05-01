import { computed } from 'vue'
import type { FormRules } from '../../form'
import type { SchemaFormField, SchemaFormModel, SchemaFormProps } from './schema-form'

const resolveBoolean = (
  value: SchemaFormField['hidden'] | SchemaFormField['disabled'],
  model: SchemaFormModel
) => {
  if (typeof value === 'function') {
    return value(model)
  }

  return Boolean(value)
}

export const useSchemaForm = (props: SchemaFormProps, model: SchemaFormModel) => {
  const visibleSchema = computed(() =>
    props.schema.filter((field) => !resolveBoolean(field.hidden, model))
  )

  const rules = computed<FormRules>(() =>
    props.schema.reduce<FormRules>((result, field) => {
      if (field.rules?.length) {
        result[field.field] = field.rules
      }

      return result
    }, {})
  )

  const isFieldDisabled = (field: SchemaFormField) => resolveBoolean(field.disabled, model)

  return {
    visibleSchema,
    rules,
    isFieldDisabled,
  }
}
