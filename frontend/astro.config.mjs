import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import node from '@astrojs/node';
import sitemap from "@astrojs/sitemap";

import compress from "astro-compress";

// https://astro.build/config
import compressor from "astro-compressor";


// https://astro.build/config
import critters from "astro-critters";

// https://astro.build/config
export default defineConfig({
  site: "https://astrocket.corentings.dev",
  integrations: [tailwind(), solidJs(), sitemap(), compress({
    css: false
  }),  critters(), compressor()],
  output: "server",
  adapter: node({
    mode: 'standalone'
  })
});