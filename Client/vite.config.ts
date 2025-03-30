import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,  // 👈 Enables access from outside the container
    port: 5173,  // 👈 Ensures Vite runs on the correct port
    strictPort: true, // 👈 Ensures the app fails if port 5173 isn't available
  }
})
