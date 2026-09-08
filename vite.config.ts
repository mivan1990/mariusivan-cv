import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CV-ul e static pur — fara backend. outDir pointeaza in /dist
// pentru livrarea pe /var/www/cv/dist pe VPS.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    // 5173 ramane portul obisnuit pentru `npm run dev`; PORT il suprascrie
    // cand serverul e pornit de altcineva (preview-ul agentului) si 5173 e ocupat.
    port: Number(process.env.PORT) || 5173,
  },
})
