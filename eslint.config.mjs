// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig({
  tailwindcss: {
    settings: {
      tailwindConfig: './tailwind.config.ts',
    },
    overrides: {
      'tailwindcss/no-unknown-classes': 'off',
    },
  },
})
