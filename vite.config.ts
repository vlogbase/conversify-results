import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Removed lovable-tagger branding plugin
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // The componentTagger() plugin has been removed to disable the "edit with lovable" branding.
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
