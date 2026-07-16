import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Frontend runs on port 3000 to match the backend's CORS origin.
// /api is proxied to the backend so cookies (refresh token) work same-origin in dev.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: process.env.VITE_API_TARGET || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
