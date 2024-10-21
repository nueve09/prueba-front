import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@data': path.resolve(__dirname, './src/data'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  }
})
