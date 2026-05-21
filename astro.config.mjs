import { defineConfig } from "astro/config";

import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [playformInline(), playformCompress(), svelte()],

  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    host: "0.0.0.0",
  },
});
