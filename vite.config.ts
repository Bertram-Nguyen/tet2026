import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Quan trọng: Đặt base là './' để đường dẫn tương đối, giúp web chạy được trong mọi thư mục con (ví dụ: username.github.io/repo-name)
  base: './', 
})