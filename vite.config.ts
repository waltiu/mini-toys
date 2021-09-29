import { defineConfig } from 'vite'
const path = require('path');
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@React': path.resolve(__dirname, '@Toy/React'),
    }
  }
})
