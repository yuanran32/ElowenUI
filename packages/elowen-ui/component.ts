import { MyAlert } from '../components/alert'
import { MyButton } from '../components/button'
import { MyCard } from '../components/card'
import { MyDialog } from '../components/dialog'
import { MyDivider } from '../components/divider'
import { MyForm, MyFormItem } from '../components/form'
import { MyInput } from '../components/input'
import { MySelect } from '../components/select'
import { MySchemaForm } from '../components/schema-form'
import { MyTable } from '../components/table'
import { MyProTable } from '../components/pro-table'
import { MyTag } from '../components/tag'

import type { Plugin } from 'vue'

export default [
  MyButton,
  MyInput,
  MySelect,
  MyForm,
  MyFormItem,
  MyTag,
  MyAlert,
  MyCard,
  MyDivider,
  MyDialog,
  MyTable,
  MySchemaForm,
  MyProTable,
] as Plugin[]
