import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    port: 8081, // Set the Vite development server port to 8081
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //  Express.js server URL
        changeOrigin: true,
      },
    },
  },
  publicPath: process.env.BASE_URL,
  plugins: [vue()],

})