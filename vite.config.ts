import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'

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
      '@elowen-ui/elowen-ui': fileURLToPath(new URL('./packages/elowen-ui/index.ts', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./packages/elowen-ui/index.ts', import.meta.url)),
      name: 'ElowenUI',
      fileName: 'index',
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
