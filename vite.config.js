import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/my-page/", // 这里要和你的仓库名一致
  plugins: [react()],
})
