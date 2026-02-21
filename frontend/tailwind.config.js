/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offmarket: {
          blue: '#3d71e7',
          yellow: '#ffc200',
          dark: '#212121',
          light: '#f1f3f6',
          gray: '#878787',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}