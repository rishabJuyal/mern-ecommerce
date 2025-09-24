import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',  // Ensures the app is accessible from local network
    port: 5173,        // Optional: Set the port explicitly, or leave it to default
  },
})
