import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(import.meta.dirname, 'github-pages'),
  publicDir: false,
  base: '/physai-translation/',
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  build: {
    ssr: resolve(import.meta.dirname, 'github-pages/entry-server.tsx'),
    outDir: resolve(import.meta.dirname, 'github-pages-prerender'),
    emptyOutDir: true,
  },
});
