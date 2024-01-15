import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";
import node from '@astrojs/node';

// https://astro.build/config

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config

export default defineConfig({
  site: "https://astrocket.corentings.dev",
  integrations: [tailwind(), solidJs(), sitemap(), compress({
    css: false
  })],
  output: "server",
  adapter: node({
    mode: 'standalone',
  })
});