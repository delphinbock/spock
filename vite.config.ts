import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const __filename = import.meta.url;
const __dirname = path.dirname(new URL(__filename).pathname);

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.ts',
  },
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@base': path.resolve(__dirname, './src/components/0_base'),
      '@atoms': path.resolve(__dirname, './src/components/1_atoms'),
      '@molecules': path.resolve(__dirname, './src/components/2_molecules'),
      '@organisms': path.resolve(__dirname, './src/components/3_organisms'),
      '@templates': path.resolve(__dirname, './src/components/4_templates'),
      '@pages': path.resolve(__dirname, './src/components/5_pages'),
      '@objs': path.resolve(__dirname, './src/objs'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@libs': path.resolve(__dirname, './src/libs'),
      '@typage': path.resolve(__dirname, './src/types'),
    },
  },
});
