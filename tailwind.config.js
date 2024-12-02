/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fred: {
          500: "#C94E4E",
          700: "#A0153E"
        },
        fblue: {
          700: "#00224D"
        },
        fgray: {
          100: "#F7F7F7",
          200: "#E9E9E9",
          400: "#B9B9B9",
          600: "#868686",
          800: "#3E3E3E"
        }
      },
    },
  },
  plugins: [],
};
