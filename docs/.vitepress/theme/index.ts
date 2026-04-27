import DefaultTheme from 'vitepress/theme'
import ElowenUI from '@elowen-ui/elowen-ui'
import HomeLanding from './components/HomeLanding.vue'
import './style.css'

import type { Theme } from 'vitepress'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElowenUI)
    app.component('HomeLanding', HomeLanding)
  },
}

export default theme
