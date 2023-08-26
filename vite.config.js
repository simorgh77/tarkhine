import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  buidl:{
    outDir:'./build',
  },
  base:'/tarkhine/',
  publicDir:'assets'

})
