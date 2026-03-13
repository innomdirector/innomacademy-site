import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setupTests.js',
    css: true,
  },
  server: {
    open: true, // Opens in default browser
    // To open in a specific browser, use:
    // open: 'msedge', // for Microsoft Edge
    // open: 'chrome', // for Google Chrome
  },
})
