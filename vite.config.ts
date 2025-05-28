import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src'),  // Теперь корень — папка `src`
  publicDir: path.resolve(__dirname, 'public'),  // Укажите явно папку с публичными файлами
  build: {
    outDir: path.resolve(__dirname, 'dist'),  // Куда складывать билд
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.html'),  // Входной файл
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Алиасы для путей
    },
  },
  optimizeDeps: {
    include: ['react-router-dom']
  },
});