import { withInstall } from '@elowen-ui/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export const MyForm = withInstall(Form, {
  FormItem,
})

export const MyFormItem = withInstall(FormItem)
export default MyForm

export * from './src/form'
export * from './src/form-item'
export * from './src/types'
