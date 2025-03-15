
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // This covers all JavaScript/TypeScript files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),],
}