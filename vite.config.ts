import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig(async () => {
  const isNetlify = process.env.NETLIFY === 'true'
  let deployPlugin = nitro()

  if (isNetlify) {
    try {
      const netlifyModule = await import('@netlify/vite-plugin-tanstack-start')
      deployPlugin = netlifyModule.default()
    } catch {
      // fallback to nitro
    }
  }

  return {
    resolve: { tsconfigPaths: true },
    plugins: [tailwindcss(), deployPlugin, tanstackStart(), viteReact()],
  }
})
