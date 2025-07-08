import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    host: '0.0.0.0', // 👈 This allows access from LAN devices
    port: 5173,       // 👈 Optional: change port if needed
    open: true,       // 👈 Optional: opens browser on server start
  },

})
