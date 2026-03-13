import js from '@eslint/js'
import { defineConfig } from 'eslint/config'

const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  global: 'readonly',
  localStorage: 'readonly',
  fetch: 'readonly',
  FormData: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  console: 'readonly',
}

const vitestGlobals = {
  describe: 'readonly',
  it: 'readonly',
  expect: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  vi: 'readonly',
}

export default defineConfig([
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: browserGlobals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-empty': 'off',
    },
  },
  {
    files: ['**/*.test.{js,jsx}', 'src/test/**/*.{js,jsx}'],
    languageOptions: {
      globals: vitestGlobals,
    },
  },
])
