import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/my-page/',  // 添加这一行
  plugins: [react()],
})
