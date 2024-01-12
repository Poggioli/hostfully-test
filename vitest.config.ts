import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul', // or 'v8'
      exclude: [
        '**/src/service/api.ts',
        '**/src/lib/utils.ts',
        '**/src/components/ui/**/*',
        '.eslintrc.cjs ',
        'tailwind.config.js',
      ]
    },
  },
})