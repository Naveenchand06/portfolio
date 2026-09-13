import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Defaults to 5173; an assigned PORT wins so the preview tooling can
  // move off a port another project is already holding.
  server: { port: Number(process.env.PORT) || 5173 },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion') || id.includes('motion-dom')) return 'motion'
        },
      },
    },
  },
})
