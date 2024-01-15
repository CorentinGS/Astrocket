import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), sitemap(), compress({
    path: ".vercel/output/static",
    css: false
  })],
  output: "hybrid",
  adapter: vercel({
    functionPerRoute: false
  })
});