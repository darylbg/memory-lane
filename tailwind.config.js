/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files
    "./public/index.html",        // Include HTML files
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "violet_evergarden": "var(--background-url)",
      // }
    },
  },
  plugins: [],
};


