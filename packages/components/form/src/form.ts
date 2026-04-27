import type { ExtractPropTypes, PropType } from 'vue'
import type { FormModel, FormRules, ValidateResult } from './types'

export const formProps = {
  model: {
    type: Object as PropType<FormModel>,
    required: true,
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({}),
  },
  labelWidth: {
    type: String,
    default: '96px',
  },
  scrollToError: {
    type: Boolean,
    default: false,
  },
  scrollBehavior: {
    type: String as PropType<ScrollBehavior>,
    default: 'smooth',
  },
} as const

export const formEmits = {
  validate: (result: ValidateResult) => typeof result.valid === 'boolean',
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmits = typeof formEmits
