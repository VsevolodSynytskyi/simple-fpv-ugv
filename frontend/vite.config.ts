import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '')
  const piHost = env.PI_HOST

  if (!piHost) {
    throw new Error(
      'PI_HOST is not set. Copy .env.example to .env at the repo root.',
    )
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: '../backend/static',
      emptyOutDir: true,
    },
    server: {
      proxy: {
        '/video': `http://${piHost}:8000`,
        '/ws': {
          target: `ws://${piHost}:8000`,
          ws: true,
        },
      },
    },
  }
})
