import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path');


// https://vitejs.dev/config/
export default defineConfig({
  build:{
    lib:{
      entry:path.resolve(__dirname, 'lib/index.js'),
      name:'toys',
      fileName: (format) => `toys.${format}.js`
    }
  },
  plugins: [react()],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, 'lib/'),
    }
  }
})
