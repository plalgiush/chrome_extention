import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path' 

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const pagesDir = resolve(srcDir, 'pages');

export default defineConfig({
  resolve: {
    alias: {
      '@src': resolve(srcDir),
      '@pages': resolve(pagesDir)
    }
  },
  plugins: [react()],
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: 'dist',
    rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          popup: resolve(pagesDir, 'popup', 'index.html'),
          background: resolve(pagesDir, 'background', 'index.js'),
          content: resolve(pagesDir, 'content', 'index.js'),
        },
        output: {
          entryFileNames: 'src/pages/[name]/index.js'
        }
      }
    }
  }
)
