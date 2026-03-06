import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/crypto-dashboard/', // Asegura que los recursos se carguen correctamente en GitHub Pages
  plugins: [react()],
})
