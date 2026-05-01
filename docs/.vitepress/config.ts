import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: 'ElowenUI',
  description: 'Vue 3 component library docs with demos, typed APIs and testing workflow',
  cleanUrls: true,
  themeConfig: {
    logo: {
      src: '/my-ui-mark.svg',
      alt: 'ElowenUI',
    },
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Guide', link: '/guide/introduce' },
      { text: 'Components', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduce' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Theme', link: '/guide/theme' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Select', link: '/components/select' },
            { text: 'Form', link: '/components/form' },
            { text: 'Tag', link: '/components/tag' },
            { text: 'Alert', link: '/components/alert' },
            { text: 'Card', link: '/components/card' },
            { text: 'Divider', link: '/components/divider' },
            { text: 'Dialog', link: '/components/dialog' },
            { text: 'Table', link: '/components/table' },
            { text: 'SchemaForm', link: '/components/schema-form' },
            { text: 'ProTable', link: '/components/pro-table' },
          ],
        },
      ],
    },
    outline: 'deep',
    outlineTitle: 'On This Page',
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    footer: {
      message: 'Built with VitePress and ElowenUI',
      copyright: 'Copyright 2026 ElowenUI Library',
    },
  },
  vite: {
    resolve: {
      alias: {
        '@elowen-ui/components': fileURLToPath(
          new URL('../../packages/components/index.ts', import.meta.url)
        ),
        '@elowen-ui/utils': fileURLToPath(
          new URL('../../packages/utils/index.ts', import.meta.url)
        ),
        '@elowen-ui/theme': fileURLToPath(
          new URL('../../packages/theme/index.ts', import.meta.url)
        ),
        '@elowen-ui/elowen-ui': fileURLToPath(
          new URL('../../packages/elowen-ui/index.ts', import.meta.url)
        ),
      },
    },
  },
})
