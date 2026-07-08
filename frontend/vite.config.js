import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Toutes les requetes front vers /api/... sont redirigé vers le backend sur le port 3000
      '/api': 'http://localhost:3000'
    }
  }
})
