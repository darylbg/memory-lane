/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files
    "./public/index.html",        // Include HTML files
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Example: Set `xs` to 480px
      },
      fontFamily: {
        handwriting: ['"Patrick Hand"', 'cursive'], // Add the font here
      },
    },
  },
  plugins: [],
};


