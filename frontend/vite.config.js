import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      host: true,
      port: 3000,
      '/api': {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: true
      }
    }
  },
  plugins: [react()],
})
