import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react],
  resolve: {
    alias: {
      '@faq': path.resolve(__dirname, './faq-component/src'),
      '@connect4': path.resolve(__dirname, './connect4-game/src'),
      '@security': path.resolve(__dirname, './security-code-input/src'),
      '@histogram': path.resolve(__dirname, './histogram-visualization/src'),
    }
  }
})

