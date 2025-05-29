import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(),[svgr()]],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // replace with your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
