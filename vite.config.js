import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/my-page/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'i18next', 'react-i18next'],
          'three-core': ['three'],
          'three-addons': ['three/examples/jsm/controls/OrbitControls', 'three/examples/jsm/loaders/RGBELoader'],
        },
      },
    },
  },
})
