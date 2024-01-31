/** @type {import('tailwindcss').Config} */
const typography = require("@tailwindcss/typography");
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        link: "#0000FF",
      },
    },
  },
  darkMode: "class",
  plugins: [typography()],
  image: {
    domains: ["astro.build"],
  },
};
