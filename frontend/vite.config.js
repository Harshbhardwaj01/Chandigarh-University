import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    fs: { allow: [path.resolve(process.cwd(), '..')] },
    proxy: {
      '/api': process.env.VITE_API_PROXY_TARGET || 'http://localhost:5001',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
  build: { outDir: 'dist' },
});
