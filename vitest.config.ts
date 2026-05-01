import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@elowen-ui/components': fileURLToPath(new URL('./packages/components/index.ts', import.meta.url)),
      '@elowen-ui/utils': fileURLToPath(new URL('./packages/utils/index.ts', import.meta.url)),
      '@elowen-ui/theme': fileURLToPath(new URL('./packages/theme/index.ts', import.meta.url)),
      '@elowen-ui/elowen-ui': fileURLToPath(new URL('./packages/elowen-ui/index.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['packages/components/**/src/*.{ts,vue}'],
      thresholds: {
        lines: 60,
        functions: 75,
        branches: 75,
        statements: 60,
      },
    },
  },
})
