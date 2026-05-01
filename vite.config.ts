import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'

const componentEntries = [
  'alert',
  'button',
  'card',
  'dialog',
  'divider',
  'form',
  'input',
  'pro-table',
  'schema-form',
  'select',
  'table',
  'tag',
]

const resolveEntry = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['packages'],
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/types',
      insertTypesEntry: false,
    }),
  ],
  resolve: {
    alias: {
      '@elowen-ui/components': fileURLToPath(new URL('./packages/components/index.ts', import.meta.url)),
      '@elowen-ui/utils': fileURLToPath(new URL('./packages/utils/index.ts', import.meta.url)),
      '@elowen-ui/theme': fileURLToPath(new URL('./packages/theme/index.ts', import.meta.url)),
      '@elowen-ui/elowen-ui': fileURLToPath(new URL('./packages/elowen-ui/index.ts', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolveEntry('./packages/elowen-ui/index.ts'),
        'components/index': resolveEntry('./packages/components/index.ts'),
        ...Object.fromEntries(
          componentEntries.map((name) => [
            `components/${name}/index`,
            resolveEntry(`./packages/components/${name}/index.ts`),
          ])
        ),
      },
      name: 'ElowenUI',
      fileName: (_format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
