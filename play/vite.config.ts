import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@elowen-ui/components': fileURLToPath(
        new URL('../packages/components/index.ts', import.meta.url)
      ),
      '@elowen-ui/utils': fileURLToPath(
        new URL('../packages/utils/index.ts', import.meta.url)
      ),
      '@elowen-ui/elowen-ui': fileURLToPath(
        new URL('../packages/elowen-ui/index.ts', import.meta.url)
      ),
    },
  },
})
