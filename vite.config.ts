/*
 * @Author: pan
 * @Date: 2024-03-12 20:28:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-12 20:33:24
 * @Description: 配置文件
 * @FilePath: \blog-view\vite.config.ts
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  define :{
    global:{}
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3030",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()]
})

