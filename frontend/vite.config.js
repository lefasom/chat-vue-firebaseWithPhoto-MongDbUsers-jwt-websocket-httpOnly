import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'node:url';

dotenv.config(); // Carga las variables de entorno desde .env

export default defineConfig({
  plugins: [vue()],
  define: {
    // Exponer las variables de entorno al código del cliente
    // Las variables comenzarán con VITE_
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});