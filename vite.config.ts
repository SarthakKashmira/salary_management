import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react(),
    tailwindcss(),
    tsconfigPaths({ root: import.meta.dirname }),
  ],
})
