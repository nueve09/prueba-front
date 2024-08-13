/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-gray": "#353535",
        "secondary-gray": "#2a2a2a",
        "light-gray": "#e8e8e8",
        "primary-blue": "#54cedf",
        "secondary-blue": "#2714a2",
        "light-blue": "#ccccef"
      }
    },
  },
  plugins: [],
}