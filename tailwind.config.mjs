/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const typography = require("@tailwindcss/typography");
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
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
  plugins: [nextui(), typography()],
  image: {
    domains: ["astro.build"],
  },
};
