import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    flowbiteReact(),
  ],
  root: path.resolve(__dirname, "./"),
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    emptyOutDir: true, // ensures dist is cleaned before build
  },
  // creates lib alias for easy import of shared assets
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "src/lib"),
    },
  },
});
