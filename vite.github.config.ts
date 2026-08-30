import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(import.meta.dirname, 'github-pages'),
  publicDir: resolve(import.meta.dirname, 'public'),
  base: '/physai-translation/',
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  build: {
    outDir: resolve(import.meta.dirname, 'github-pages-dist'),
    emptyOutDir: true,
  },
});
