import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Backend API origin. Locally defaults to the dev server; on Railway set BACKEND_URL
// to the backend's private URL, e.g. http://health-insurance.railway.internal:8080
const backend = process.env.BACKEND_URL || 'http://localhost:5000'
const proxy = {
  '/api': {
    target: backend,
    changeOrigin: true
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000', 10),
    allowedHosts: true,
    proxy
  }
})
