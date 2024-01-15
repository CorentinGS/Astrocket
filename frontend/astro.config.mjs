import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";
import node from '@astrojs/node';

// https://astro.build/config
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config

let adapter;

if (process.env.NODE_ENV === 'production') {
  adapter = vercel({
    functionPerRoute: false
  });
} else if (process.env.NODE_ENV === 'docker') {
  adapter = node({
    mode: 'standalone',
  });
}
export default defineConfig({
  integrations: [tailwind(), solidJs(), sitemap(), compress({
    path: ".vercel/output/static",
    css: false
  })],
  output: "server",
  adapter: adapter
});