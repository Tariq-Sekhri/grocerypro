import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// During `npm run dev`, API calls stay same-origin and are proxied to the
// backend, the same way the production web build is served by the backend.
const backend = process.env.GROCERYPRO_API_URL ?? "http://127.0.0.1:3033";

// `npm run demo` answers API calls with fake data for screenshots. The demo
// code is only imported when that flag is set.
const demo = process.env.GROCERYPRO_DEMO === "1";
const demoPlugins = demo ? [(await import("./demo/mock-backend.ts")).demoBackend()] : [];

export default defineConfig({
  // Both the web app and Capacitor serve assets from their origin root.
  base: "/",
  plugins: [...demoPlugins, react()],
  resolve: {
    alias: { "@shared": fileURLToPath(new URL("../shared", import.meta.url)) },
  },
  server: {
    port: demo ? 5180 : 5173,
    fs: { allow: [".."] },
    proxy: demo ? undefined : {
      "/v1": backend,
      "/health": backend,
      "/socket.io": { target: backend, ws: true },
    },
  },
  build: { outDir: "dist", emptyOutDir: true, target: "es2020" },
});
