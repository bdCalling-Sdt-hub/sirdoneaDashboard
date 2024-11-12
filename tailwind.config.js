/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F3F3F3",
        "secondary-color": "#2B4257",
        "base-color": "#0C0C0C",
        "highlight-color": "#2F87FC",
        "input-color": "#FCC1BE",
      },
    },
  },
  plugins: [],
};
