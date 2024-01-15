/** @type {import('tailwindcss').Config} */
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
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'bounce-short': 'bounce 3s ease-in-out 2',
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
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
