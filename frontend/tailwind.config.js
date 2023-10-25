/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "black"],
  },
  plugins: [require("daisyui", "tw-elements/dist/plugin.cjs")],
};
