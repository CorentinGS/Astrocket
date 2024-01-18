import {
  defineConfig,
  sharpImageService,
  squooshImageService,
} from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

import compress from "astro-compress";

// https://astro.build/config
import compressor from "astro-compressor";

import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
import critters from "astro-critters";

// https://astro.build/config
export default defineConfig({
  image: {
    service:
      process.env.NODE_ENV === "production"
        ? sharpImageService()
        : squooshImageService(),
  },
  prefetch: true,
  site: "https://astrocket.corentings.dev",
  integrations: [
    tailwind(),
    solidJs(),
    sitemap(),
    compress({}),
    compressor(),
    AstroPWA({
      mode: "production",
      registerType: "autoUpdate",
      scope: "/",
      base: "/",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Astrocket",
        short_name: "Astrocket",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/favicons/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicons/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicons/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\//],
      },
    }),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
