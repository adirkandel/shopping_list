import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: '.',
    rollupOptions: {
      input: {
        background: './src/background/background.ts',
        content: './src/content/content.ts',
        popup: './src/popup/popup.ts',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
});
