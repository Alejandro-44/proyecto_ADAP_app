import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Usa @ para apuntar a src
    },
  },
  server: {
    host: '0.0.0.0', // Permite que sea accesible desde cualquier IP
    port: process.env.PORT || 3000, // Usa el puerto de entorno o 3000
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 5000, // Usa el puerto de entorno o 5000
  },
});
