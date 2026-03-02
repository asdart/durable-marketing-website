/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['NewSpirit', 'Georgia', 'serif'],
        sans: ['"Open Runde"', 'system-ui', 'sans-serif'],
      },
      colors: {
        'green-shape': '#519a73',
        'green-700': '#3e7457',
        'yellow-shape': '#fb9f28',
        'yellow-700': '#9f4c04',
        'orange-500': '#ff4b0a',
        'red-shape': '#f8563f',
        'purple': '#7d5d9a',
      },
    },
  },
  plugins: [],
}

