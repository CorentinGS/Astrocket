/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  jit: true,
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Syne',
          'Nunito',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],


  daisyui: {
    themes: [
      "cupcake",
      "dark",
      {
        catpuccin: {
          primary: "#f5e0dc",
          "primary-content": "#000000",
          secondary: "#eebbc3",
          "secondary-content": "#1B1B18",
          accent: "#d4939d",
          "accent-content": "#000000",
          neutral: "#313244",
          "neutral-content": "#cdd6f4",
          "base-100": "#1e1e2e",
          "base-200": "#181825",
          "base-content": "#cdd6f4",
          info: "#89b4fa",
          "info-content": "#000000",
          success: "#a6e3a1",
          "success-content": "#000000",
          warning: "#fab387",
          "warning-content": "#000000",
          error: "#f38ba8",
          "error-content": "#000000",
        },
      },
    ],
  },
};
