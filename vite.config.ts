import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base를 './'로 두면 GitHub Pages 저장소 이름(주소)과 상관없이 동작한다.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
