import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // 读取仓库根目录的 .env.local（与 .env.example 同级）
  envDir: '../',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'pushME — AI 项目经理',
        short_name: 'pushME',
        description: '拆解、监督、质疑、评估你的任务执行',
        theme_color: '#1e1b4b',
        background_color: '#0f172a',
        display: 'standalone',
        lang: 'zh-CN',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],
      },
    }),
  ],
})
