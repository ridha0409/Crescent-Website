import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from https://ridha0409.github.io/Crescent-Website/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Crescent-Website/' : '/',
}))
